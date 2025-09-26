const express = require("express");
const router = express.Router();
const authController = require("./controller");
const jwtService = require("../middleware/jwt/jwtService");

router.post("/signin", authController.signin);
router.post("/signup", authController.signup);
router.post("/logout", authController.logout);
router.post("/forgot-password", authController.forgotPassword);
router.post("/reset-password", authController.resetPassword);
router.delete(
  "/delete-account",
  jwtService.decodeJWT,
  authController.deleteAccount
);

module.exports = router;
