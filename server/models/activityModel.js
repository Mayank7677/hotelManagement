const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
    },
    ipAddress: {
      type: String,
    },
    systemName: {
      type: String,
    },
    action: {
      type: String,
      enum: ["login", "logout", "sigin"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('activity' , activitySchema)
