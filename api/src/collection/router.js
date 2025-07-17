const express = require("express");
const router = express.Router();
const multer = require("multer");
const collectionController = require("./controller");
const jwtService = require("../middleware/jwtService");

// Configuration de Multer
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    const fileNameCleaned = file.originalname.replace(/ /g, "_");
    const newFileName = `${Date.now()}-${fileNameCleaned}`;

    cb(null, newFileName);
  },
});

const upload = multer({ storage: storage });
router.patch(
  "/:id/items",
  jwtService.decodedJWT, 
  
  collectionController.addItemsToCollection
);
// router.get("/:id", jwtService.decodedJWT, collectionController.findOne);
router.get(
  "/user-collection",
  jwtService.decodedJWT,
  collectionController.findAllUserCollection
);
router.get(
  "/user-collection/:id",
  jwtService.decodedJWT,
  collectionController.findOne
);
router.post(
  "/create",
  jwtService.decodedJWT,
  upload.fields([{ name: "files", maxCount: 10 }]),
  collectionController.create
);
router.delete(
  "/:id/delete",
  jwtService.decodedJWT, 
  collectionController.delete
);


module.exports = router;
