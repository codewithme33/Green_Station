const express = require('express');
const { earnPoints, redeemPoints, donatePoints, getUserPoints } = require('../controllers/point.js');
const router = express.Router();

router.post('/earn', earnPoints);
router.post('/redeem', redeemPoints);
router.post('/donate', donatePoints);
router.get('/:userId', getUserPoints);

module.exports = router;
