const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");

const userRouter = require("./routers/userRouter");
const locationRouter = require('./routers/locationRouter')
const stateRouter = require('./routers/stateRouter')
const hotelRouter = require('./routers/hotelRouter')

mongoose.connect("mongodb://localhost:27017/hotelManagement");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRouter);
app.use("/locations", locationRouter);
app.use("/states", stateRouter);
app.use("/hotels", hotelRouter);

app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(7070, () => {
  console.log("server is running on port 7070");
});
