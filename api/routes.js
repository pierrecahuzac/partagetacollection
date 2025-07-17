
const express = require("express");
const router = express.Router();

const authRouter = require("./src/auth/router");
const itemRouter = require("./src/item/router");
const formatRouter = require("./src/format/router");
const collectionStatusRouter = require("./src/collection-status/router");
const userRouter = require('./src/user/router');
const collectionRouter = require('./src/collection/router');

router.get("/", (req, res) => {
  return res.status(200).json("accueil de l'api");
});

router.use("/api/auth", authRouter);
router.use("/api/collection-status", collectionStatusRouter);
router.use("/api/item", itemRouter);
router.use("/api/collection", collectionRouter);
router.use("/api/format-type", formatRouter);
router.use("/api/user", userRouter);

module.exports = router;