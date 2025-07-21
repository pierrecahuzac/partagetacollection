const express = require("express");
const router = express.Router();
const authController = require('./controller')
const jwtService = require('../middleware/jwt/jwtService')
router.post('/signin',authController.signin )
router.post('/signup',authController.signup )
router.post('/logout', jwtService.decodeJWT, authController.logout )



module.exports = router;