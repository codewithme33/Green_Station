const Booking = require('../models/Booking.js');
const Station = require('../models/Station.js');

let ioInstance;

exports.setSocketIo = (io) => { 
    ioInstance = io;
};


const calculateWaitTime = async (stationId) => {
    const station = await Station.findById(stationId);
    if (!station) return null;

    const chargingTimePerEV = 30; 
    return station.queueStatus * chargingTimePerEV;
};


exports.bookSlot = async (req, res) => {
    try {
        const { userId, stationId, timeSlot } = req.body;

        const station = await Station.findById(stationId);
        if (!station) return res.status(404).json({ message: 'Station not found' });

        const existingBooking = await Booking.findOne({ userId, stationId, timeSlot });
        if (existingBooking) return res.status(400).json({ message: 'Slot already booked' });

        const booking = new Booking({ userId, stationId, timeSlot });
        await booking.save();

        station.queueStatus += 1;
        await station.save();

        const estimatedWaitTime = await calculateWaitTime(stationId);

        if (ioInstance) {
            ioInstance.emit('queueUpdate', { 
                stationId, 
                queueStatus: station.queueStatus, 
                estimatedWaitTime 
            });
        }

        res.status(201).json({ message: 'Slot booked successfully', booking, estimatedWaitTime });
    } catch (error) {
        res.status(500).json({ message: 'Error booking slot', error });
    }
};


exports.getEstimatedRefillTime = async (req, res) => {
    try {
        const { stationId } = req.params;
        const estimatedWaitTime = await calculateWaitTime(stationId);

        if (estimatedWaitTime === null) return res.status(404).json({ message: 'Station not found' });

        res.json({ stationId, estimatedWaitTime });
    } catch (error) {
        res.status(500).json({ message: 'Error calculating refill time', error });
    }
};



exports.cancelBooking = async (req, res) => {
    try {
        const { bookingId } = req.params;

        const booking = await Booking.findByIdAndDelete(bookingId);
        if (!booking) return res.status(404).json({ message: 'Booking not found' });

        const station = await Station.findById(booking.stationId);
        if (station) {
            station.queueStatus -= 1;
            await station.save();

            const estimatedWaitTime = await calculateWaitTime(station._id);

            if (ioInstance) {
                ioInstance.emit('queueUpdate', { 
                    stationId: station._id, 
                    queueStatus: station.queueStatus, 
                    estimatedWaitTime 
                });
            }
        }

        res.json({ message: 'Booking cancelled successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error cancelling booking', error });
    }
};

