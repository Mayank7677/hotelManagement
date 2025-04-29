const { assign } = require("nodemailer/lib/shared");
const locationModel = require("../models/locationModel");

exports.create = async (req, res) => {
  try {
    const { city, state } = req.body;

    const checkCity = await locationModel.findOne({ city });

    if (checkCity) {
      return res.status(400).json({ message: "Location already exists" });
    }

    const location = {
      city,
      state,
      assignedBy: req.user._id,
    };

    const newLocation = new locationModel(location);
    const save = await newLocation.save();
    res.status(201).json({ message: "Location added successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    const location = await locationModel
      .find()
      .populate("assignedBy", "name email age phone role status");

    res.status(200).json(location);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getOne = async (req, res) => {
  try {
    const { id } = req.query;

    if (!id) {
      return res.status(404).json({ message: "Please provide an id" });
    }

    const location = await locationModel
      .findById(id)
      .populate("assignedBy", "name email age phone role status");

    if (!location) {
      return res.status(404).json({ message: "No Location found" });
    }

    res.status(200).json(location);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateLocation = async (req, res) => {
  try {
    const { id } = req.query;
    const { city, state } = req.body;

    if (!id) {
      return res.status(404).json({ message: "Please provide an id" });
    }

    const location = await locationModel.findById(id);
    if (!location) {
      return res.status(404).json({ message: "No Location found" });
    }

    const updateLocation = await locationModel.findByIdAndUpdate(
      id,
      {
        city,
        state,
      },
      { new: true }
    );

    return res
      .status(200)
      .json({ message: "Location updated", location: updateLocation });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.softDelete = async (req, res) => {
  try {
    const { id } = req.query;

    if (!id) {
      return res.status(404).json({ message: "Please provide an id" });
    }

    const location = await locationModel.findById(id);
    if (!location) {
      return res.status(404).json({ message: "No Location found" });
    }

    let status = "";
    if (location.status === "active") status = "inactive";
    else status = "active";

    const updateLocation = await locationModel.findByIdAndUpdate(
      id,
      {
        status,
      },
      { new: true }
    );

    return res
      .status(200)
      .json({ message: "Location updated", location: updateLocation });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.hardDelete = async (req, res) => {
  try {
    const { id } = req.query;

    if (!id) {
      return res.status(404).json({ message: "Please provide an id" });
    }

    const location = await locationModel.findById(id);
    if (!location) {
      return res.status(404).json({ message: "No Location found" });
    }

    const updateLocation = await locationModel.findByIdAndDelete(id);

    return res
      .status(200)
      .json({ message: "Location deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
