const mongoose = require('mongoose');

const PointsSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    totalPoints: { type: Number, default: 0 },
    transactions: [
        {
            type: { type: String, enum: ['earned', 'redeemed', 'donated'], required: true },
            points: { type: Number, required: true },
            date: { type: Date, default: Date.now }
        }
    ]
});

module.exports = mongoose.model('Points', PointsSchema);
