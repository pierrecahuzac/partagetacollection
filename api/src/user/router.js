const express = require("express");
const router = express.Router();

const userController = require('./controller');
const jwtService = require("../middleware/jwt/jwtService");

router.get('/user', jwtService.decodeJWT, userController.findOne)


module.exports = router