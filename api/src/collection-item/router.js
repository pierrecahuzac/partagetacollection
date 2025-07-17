const express = require("express");
const router = express.Router();
const jwtService = require("../middleware/jwtService");

const collectionItemController = require("./controller");

router.post('/', jwtService.decodedJWT, 
   
     collectionItemController.create
)

module.exports = router