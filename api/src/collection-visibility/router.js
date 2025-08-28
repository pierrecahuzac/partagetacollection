const express = require("express");
const router = express.Router();
const collectionVisibilityController = require('./controller');
const jwtService = require("../middleware/jwt/jwtService");

router.get('/',jwtService.decodeJWT, collectionVisibilityController.findAll)


module.exports = router