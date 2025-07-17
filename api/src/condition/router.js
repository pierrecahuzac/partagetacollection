const express = require("express");
const router = express.Router();
const conditionController = require('./controller');
const jwtService = require("../middleware/jwtService");

router.get('', jwtService.decodedJWT, conditionController.findAll)


module.exports = router