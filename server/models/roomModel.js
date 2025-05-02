const mongoose = require("mongoose");

const roomSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    locationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "locations",
    },
    stateId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "states",
    },
    hotelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "hotels",
    },
    assignedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  },
  { timestamps: true, versionKey: false }
);
