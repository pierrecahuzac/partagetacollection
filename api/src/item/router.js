const express = require("express");
const router = express.Router();

const itemController = require("./controller"); // Votre fichier de contrôleur
const multer = require("multer");
const jwtService = require("../middleware/jwt/jwtService");


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get("/", jwtService.decodeJWT, itemController.getAllItems);
router.get("/:id", jwtService.decodeJWT, itemController.findOne);
router.delete("/:id", jwtService.decodeJWT, itemController.delete);
router.put("/:id", jwtService.decodeJWT, itemController.update);
router.post(
  "/:id/favorites",
  jwtService.decodeJWT,
  itemController.addToFavorites
);
router.post(
  "/create",
  jwtService.decodeJWT,
  upload.fields([
    { name: "newItem", maxCount: 1 }, // maxCount: 1 car c'est un seul objet JSON
    { name: "files", maxCount: 10 }, // maxCount: le nombre maximal de fichiers que vous attendez
  ]),
  itemController.create
);

module.exports = router;
