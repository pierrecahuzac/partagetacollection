const express = require("express");
const router = express.Router();
const adminController = require("./controller");
const jwtService = require("../middleware/jwt/jwtService");
router.get("/allUsers", jwtService.decodeJWT, adminController.getAllUser);

module.exports = router;
