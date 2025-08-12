const express = require("express");
const router = express.Router();
const jwtService = require("../middleware/jwt/jwtService");

const collectionItemController = require("./controller");

router.post('/create', jwtService.decodeJWT,    
     collectionItemController.create
)
router.get('/:id', jwtService.decodeJWT,    
     collectionItemController.findOne
)
router.delete('/:id',jwtService.decodeJWT,     collectionItemController.delete )

module.exports = router