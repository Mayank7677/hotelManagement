const bookingModel = require("../models/BookingModel");

exports.bookRoom = async (req, res) => {
  console.log(req.body);
  try {
    const {
      hotelId,
      roomId,
      checkInDate,
      checkOutDate,
      numberOfGuests,
      totalAmount,
      userName,
      userPhone,
    } = req.body;

    const conflict = await bookingModel.findOne({
      roomId,
      status: "booked",
      $or: [
        {
          checkInDate: { $lt: new Date(checkOutDate) },
          checkOutDate: { $gt: new Date(checkInDate) },
        },
      ],
    });

    if (conflict) {
      return res.status(200).json({ message: "Room is already booked" });
    }

    const booking = new bookingModel({
      hotelId,
      roomId,
      checkInDate,
      checkOutDate,
      numberOfGuests,
      totalAmount,
      userName,
      userPhone,
      assignedBy: req.user._id,
    });

    const save = await booking.save();
    res.status(201).json({ message: "Room Booked Successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.checkAvailability = async (req, res) => {
  try {
    const { roomId, checkInDate, checkOutDate } = req.body;

    const conflict = await bookingModel.findOne({
      roomId,
      status: "booked",
      $or: [
        {
          checkInDate: { $lt: new Date(checkOutDate) },
          checkOutDate: { $gt: new Date(checkInDate) },
        },
      ],
    });

    if (conflict) {
      return res.status(200).json({ available: false });
    }

    res.status(200).json({ available: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
