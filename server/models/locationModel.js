const mongoose = require("mongoose");

const locationSchema = mongoose.Schema({
  city: {
    type: String,
    required: true,
  },

  state: {
    type: String,
    required: true,
  },

  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active",
  },

  assignedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
});

module.exports = mongoose.model("locations", locationSchema);
