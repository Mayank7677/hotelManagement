const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const fileUpload = require("express-fileupload");

const userRouter = require("./routers/userRouter");
const locationRouter = require('./routers/locationRouter')
const stateRouter = require('./routers/stateRouter')
const hotelRouter = require('./routers/hotelRouter');
const roomRouter = require('./routers/roomRouter');


mongoose.connect("mongodb://localhost:27017/hotelManagement");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());


app.use("/users", userRouter);
app.use("/locations", locationRouter);
app.use("/states", stateRouter);
app.use("/hotels", hotelRouter);
app.use("/rooms", roomRouter);

app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(7070, () => {
  console.log("server is running on port 7070");
});
