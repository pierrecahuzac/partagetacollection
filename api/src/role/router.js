const express = require("express");
const router = express.Router();
const roleController = require("./controller");
const jwtService = require("../middleware/jwt/jwtService");

router.get("/", jwtService.decodeJWT, roleController.findAll);

module.exports = router;
