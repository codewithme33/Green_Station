const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");

router.get("/google", authController.googleAuth);
router.get("/google/callback", authController.googleCallback);
router.get("/user", authController.getUser);
router.get("/logout", authController.logout);

module.exports = router;
