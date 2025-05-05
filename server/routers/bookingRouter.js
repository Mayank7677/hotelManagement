const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingController");
const auth = require("../middlewares/auth");

router.post('/checkAvailability', auth, bookingController.checkAvailability);
router.post('/bookRoom', auth, bookingController.bookRoom);

module.exports = router;