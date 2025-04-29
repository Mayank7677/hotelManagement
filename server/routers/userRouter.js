const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();

router.post("/signup", userController.signup);
router.post("/login", userController.login);
router.post("/verifyOtp", userController.verifyOtp);
router.post("/resetPass", userController.resetPassword);
router.post("/newPass", userController.newPassword);

module.exports = router;