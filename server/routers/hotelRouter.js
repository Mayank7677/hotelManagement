const express = require("express");
const router = express.Router();
const hotelController = require("../controllers/hotelController");
const auth = require("../middlewares/auth");

router.post("/create", auth, hotelController.create);
router.get("/getAll", auth, hotelController.getAll);
// router.get("/getOne", auth, hotelController.getOne);
// router.put("/update", auth, hotelController.update);
router.put("/softDelete", auth, hotelController.softDelete);
router.delete("/hardDelete", auth, hotelController.hardDelete);

module.exports = router;