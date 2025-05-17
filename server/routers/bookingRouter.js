const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingController");
const auth = require("../middlewares/auth");

router.post('/checkAvailability',  bookingController.checkAvailability);
router.post('/bookRoom', auth, bookingController.bookRoom);
router.get('/booked' , auth, bookingController.approved);
router.get('/cancelled' , auth, bookingController.cancelled);
router.get('/pending', auth, bookingController.pending);
router.get('/getAll', auth, bookingController.getAll);
router.put("/confirmBookingUser", auth, bookingController.confirmBookingUser);
router.put("/cancelBookingUser", auth, bookingController.cancelBookingUser);
router.get("/getUserBookings", auth, bookingController.getUserBookings);

module.exports = router;