const express = require("express");
const router = express.Router();
const multer = require("multer");
const collectionController = require("./controller");
const jwtService = require("../middleware/jwt/jwtService");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
router.patch(
  "/:id/items",
  jwtService.decodeJWT,   
  collectionController.addItemsToCollection
);

router.get(
  "/user-collection",
  jwtService.decodeJWT,
  collectionController.findAllUserCollection
);
router.get(
  "/user-collection/:id",
  jwtService.decodeJWT,
  collectionController.findOne
);
router.post(
  "/create",
  jwtService.decodeJWT,
  upload.fields([{ name: "files", maxCount: 10 }]),
  collectionController.create
);
router.delete(
  "/:id/delete",
  jwtService.decodeJWT, 
  collectionController.delete
);


module.exports = router;
