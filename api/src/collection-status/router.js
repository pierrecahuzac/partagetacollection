const express = require("express");
const router = express.Router();
const collectionStatusController = require('./controller');
const jwtService = require("../middleware/jwt/jwtService");

router.get('',jwtService.decodeJWT, collectionStatusController.findAll)
// router.get('/api/item', ItemController.getAllItems)
// router.get('/api/item', ItemController.getAllItems)
// router.get('/api/item', ItemController.getAllItems)

module.exports = router