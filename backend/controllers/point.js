const Points = require('../models/Point.js');
const User = require('../models/User.js');


exports.earnPoints = async (req, res) => {
    try {
        const { userId, points } = req.body;

        let userPoints = await Points.findOne({ userId });

        if (!userPoints) {
            userPoints = new Points({ userId, totalPoints: points, transactions: [{ type: 'earned', points }] });
        } else {
            userPoints.totalPoints += points;
            userPoints.transactions.push({ type: 'earned', points });
        }

        await userPoints.save();
        res.status(200).json({ success: true, message: 'Points added successfully', userPoints });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


exports.redeemPoints = async (req, res) => {
    try {
        const { userId, points } = req.body;

        let userPoints = await Points.findOne({ userId });

        if (!userPoints || userPoints.totalPoints < points) {
            return res.status(400).json({ success: false, message: 'Not enough points' });
        }

        userPoints.totalPoints -= points;
        userPoints.transactions.push({ type: 'redeemed', points });

        await userPoints.save();
        res.status(200).json({ success: true, message: 'Points redeemed', userPoints });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


exports.donatePoints = async (req, res) => {
    try {
        const { userId, points } = req.body;

        let userPoints = await Points.findOne({ userId });

        if (!userPoints || userPoints.totalPoints < points) {
            return res.status(400).json({ success: false, message: 'Not enough points' });
        }

        userPoints.totalPoints -= points;
        userPoints.transactions.push({ type: 'donated', points });

        await userPoints.save();
        res.status(200).json({ success: true, message: 'Points donated for tree plantation', userPoints });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


exports.getUserPoints = async (req, res) => {
    try {
        const { userId } = req.params;

        const userPoints = await Points.findOne({ userId }).populate('userId', 'name email');

        if (!userPoints) {
            return res.status(404).json({ success: false, message: 'User points not found' });
        }

        res.status(200).json({ success: true, userPoints });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
