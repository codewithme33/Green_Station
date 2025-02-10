const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    stationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Station' },
    timeSlot: Date
});
module.exports = mongoose.model('Booking', bookingSchema);