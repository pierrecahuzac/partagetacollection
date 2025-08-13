const express = require("express");
const router = express.Router();
const formatController = require("./controller");
const jwtService = require("../middleware/jwt/jwtService");

router.get("/", jwtService.decodeJWT, formatController.findAll);

module.exports = router;
