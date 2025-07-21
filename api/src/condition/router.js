const express = require("express");
const router = express.Router();
const conditionController = require('./controller');
const jwtService = require("../middleware/jwt/jwtService");

router.get('', jwtService.decodeJWT, conditionController.findAll)


module.exports = router