const Booking = require('../models/Booking');
const Station = require('../models/Station');

let ioInstance; 

exports.setSocketIo = (io) => { 
    ioInstance = io;
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

        if (ioInstance) {
            ioInstance.emit('queueUpdate', { stationId, queueStatus: station.queueStatus });
        }

        res.status(201).json({ message: 'Slot booked successfully', booking });
    } catch (error) {
        res.status(500).json({ message: 'Error booking slot', error });
    }
};

exports.getUserBookings = async (req, res) => {
    try {
        const { userId } = req.params;
        const bookings = await Booking.find({ userId }).populate('stationId');
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching bookings', error });
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
            if (ioInstance) {
                ioInstance.emit('queueUpdate', { stationId: station._id, queueStatus: station.queueStatus });
            }
        }

        res.json({ message: 'Booking cancelled successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error cancelling booking', error });
    }
};
