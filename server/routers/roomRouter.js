const express = require("express");
const router = express.Router();
const roomController = require("../controllers/roomController");
const auth = require("../middlewares/auth");

router.post("/create", auth, roomController.createRoom);
router.get("/getAll", auth, roomController.getAll);
router.get("/getOne", auth, roomController.getOne);
router.put("/update", auth, roomController.update);
router.put("/softDelete", auth, roomController.softDelete);
router.delete("/hardDelete", auth, roomController.hardDelete);

router.get("/getAllByCity", auth, roomController.getAllByCity);
router.get("/getAllByState", auth, roomController.getAllByState);
router.get("/getAllByHotel", auth, roomController.getAllByHotel);

module.exports = router;