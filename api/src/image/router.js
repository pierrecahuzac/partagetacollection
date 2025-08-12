const express = require("express");
const router = express.Router();
const imageController = require('./controller');
const jwtService = require("../middleware/jwt/jwtService");

router.get('/image/create', jwtService.decodeJWT, imageController.create)



module.exports = router