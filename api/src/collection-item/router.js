const express = require("express");
const router = express.Router();
const jwtService = require("../middleware/jwtService");

const collectionItemController = require("./controller");

router.post('/', jwtService.decodedJWT,    
     collectionItemController.create
)
router.get('/:id', jwtService.decodedJWT,    
     collectionItemController.findOne
)

module.exports = router