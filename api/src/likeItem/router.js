const express = require("express");
const router = express.Router();

const likeItemController = require("./controller"); 
const jwtService = require("../middleware/jwt/jwtService");



router.get("/getAllUserFavoritesItems", jwtService.decodeJWT, likeItemController.getAllUserFavoritesItems);
router.delete("/deleteItemFromFavorites/:itemId", jwtService.decodeJWT, likeItemController.deleteItemFromFavorites)

module.exports = router;
