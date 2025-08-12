const express = require("express");
const router = express.Router();
const collectionStatusController = require('./controller');
const jwtService = require("../middleware/jwt/jwtService");

router.get('/collection-statuses',jwtService.decodeJWT, collectionStatusController.findAll)


module.exports = router