const express = require("express");
const router = express.Router();
const itemController = require("./controller"); // Votre fichier de contrôleur
const multer = require("multer");
const jwtService = require("../middleware/jwtService");

const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    const fileNameCleaned = file.originalname.replace(/ /g, "_");
    const newFileName = `${Date.now()}-${fileNameCleaned}`;

    cb(null, newFileName);
  },
});
const upload = multer({ storage: storage });

router.get("", jwtService.decodedJWT, itemController.getAllItems);
router.get("/:id", jwtService.decodedJWT, itemController.findOne);
router.delete("/:id", jwtService.decodedJWT, itemController.delete);
router.post(
  "/create",
  jwtService.decodedJWT,
  upload.fields([
    { name: "newItem", maxCount: 1 }, // maxCount: 1 car c'est un seul objet JSON
    { name: "files", maxCount: 10 }, // maxCount: le nombre maximal de fichiers que vous attendez
  ]),
  itemController.create
);

module.exports = router;
