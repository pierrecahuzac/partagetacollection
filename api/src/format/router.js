const express = require("express");
const router = express.Router();
const formatController = require("./controller");
const jwtService = require("../middleware/jwtService");

router.get("", jwtService.decodedJWT, formatController.findAll);

module.exports = router;
