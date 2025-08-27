const express = require("express");
const router = express.Router();
const jwtService = require("../middleware/jwt/jwtService");

const mailController = require("./controller");

router.post("/", jwtService.decodeJWT, mailController.sendMail);

module.exports = router;
