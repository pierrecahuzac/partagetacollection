const express = require("express");
const router = express.Router();

const userController = require('./controller');
const jwtService = require("../middleware/jwtService");

router.get('', jwtService.decodedJWT, userController.findOne)


module.exports = router