const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/booking.js');


router.post('/book', bookingController.bookSlot);
router.get('/user/:userId', bookingController.getUserBookings);
router.delete('/cancel/:bookingId', bookingController.cancelBooking);

module.exports = router;
