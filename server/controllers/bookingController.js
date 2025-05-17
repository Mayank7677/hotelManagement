const bookingModel = require("../models/bookingModel");

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
      // status: "booked",
      $or: [
        {
          checkInDate: { $lt: new Date(checkOutDate) },
          checkOutDate: { $gt: new Date(checkInDate) },
        },
      ],
    }); 
    console.log( 'bjjb' ,conflict)

    if (conflict) {
      return res.status(200).json({ message: "Room is already booked for these dates" });
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
      userId: req.user._id,
    });    
    const save = await booking.save();
    res.status(201).json({ message: "Room Booked Successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.checkAvailability = async (req, res) => {
  console.log(req.body)
  try {
    const { roomId, checkInDate, checkOutDate } = req.body;
    console.log(new Date(checkInDate), new Date(checkOutDate))
    
    const bookings = await bookingModel.find({
      roomId: roomId,
    });
    console.log(bookings);


    const conflict = await bookingModel.findOne({
      roomId,  
      status: "booked",
      checkInDate: { $lt: new Date(checkOutDate) },
      checkOutDate: { $gt: new Date(checkInDate) },
    } )
    console.log( 'dfwvwsfrsfswf--------------------', conflict)

    if (conflict) {
      return res.status(200).json({ available: false });
    }
    console.log('------------------')

    res.status(200).json({ available: true });
  } catch (error) {        
    res.status(500).json({ error: error.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    const booking = await bookingModel
      .find()
      .populate(
        "hotelId",
        "name address status totalRoom description contactNumber contactEmail"
      )
      .populate(
        "roomId",
        "name address status totalRoom description contactNumber contactEmail roomNumber"
      )
      .populate("userId", "name email age phone role status");

    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// for admin

exports.approved = async (req, res) => {
  console.log(req.query)
  try {
    const { id } = req.query;
    const approved = await bookingModel.findByIdAndUpdate(
      id,
      {
        status: "booked",
      },
      { new: true }
    );

    res.status(200).json({ message: "Approved", approved });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.pending = async (req, res) => {
  try {
    const { id } = req.query;
    const pending = await bookingModel.findByIdAndUpdate(
      id,
      {
        status: "pending",
      },
      { new: true }
    );

    res.status(200).json({ message: "Pending", pending });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.cancelled = async (req, res) => {
  try {
    const { id } = req.query;
    const cancelled = await bookingModel.findByIdAndUpdate(
      id,
      {
        status: "cancelled",
      },
      { new: true }
    );

    res.status(200).json({ message: "Cancelled", cancelled });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// --------------------------------------------------

exports.getUserBookings = async (req, res) => {
  try {
    const userId = req.user._id;
    const bookings = await bookingModel
      .find({ userId })
      .populate("hotelId", "name address status totalRoom description contactNumber contactEmail")
      .populate("roomId", "name address status totalRoom description contactNumber contactEmail roomNumber images")
      .populate("userId", "name email age phone role status");

    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

exports.  confirmBookingUser = async (req, res) => {
  // console.log(req.headers)
  // console.log(req.query)
  try {
    const { id } = req.query;
    const confirm = await bookingModel.findByIdAndUpdate(
      id,   
      {
        isChecking: "confirm",
      },
      { new: true }
    );

    res.status(200).json({ message: "Confirmed", confirm });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

exports.cancelBookingUser = async (req, res) => {
  try {
    const { id } = req.query;
    const cancel = await bookingModel.findByIdAndUpdate(
      id,
      {
        isChecking: "cancelled",
      },
      { new: true }
    );

    res.status(200).json({ message: "Cancelled", cancel });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
