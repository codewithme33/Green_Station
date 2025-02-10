const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/booking.js');

/* console.log(bookingController) */
router.post('/book', bookingController.bookSlot);
router.get('/user/:userId', bookingController.bookSlot);
router.delete('/cancel/:bookingId', bookingController.cancelBooking);
router.get('/estimated-refill/:stationId', bookingController.getEstimatedRefillTime);

module.exports = router;
