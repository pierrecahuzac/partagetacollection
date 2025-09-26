const express = require("express");
const router = express.Router();

const userController = require('./controller');
const jwtService = require("../middleware/jwt/jwtService");

router.get('/', jwtService.decodeJWT, userController.findOne)
router.post('/searchUser', jwtService.decodeJWT, userController.findOneByEmail)


module.exports = router