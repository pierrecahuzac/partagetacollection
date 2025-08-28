const express = require("express");
const router = express.Router();

const mailRouter = require("./src/mail/router");
const authRouter = require("./src/auth/router");
const adminRouter = require("./src/admin/router");
const itemRouter = require("./src/item/router");
const formatRouter = require("./src/format/router");
const collectionStatusRouter = require("./src/collection-status/router");
const userRouter = require("./src/user/router");
const collectionRouter = require("./src/collection/router");
const conditionRouter = require("./src/condition/router");
const collectionItemRouter = require("./src/collection-item/router");
const collectionVisibilityRouter = require("./src/collection-visibility/router");

router.get("/api", (req, res) => {
  return res.status(200).json("accueil de l'api");
});

router.use("/api/auth", authRouter);
router.use("/api/collection-status", collectionStatusRouter);
router.use("/api/item", itemRouter);
router.use("/api/collection", collectionRouter);
router.use("/api/format-type", formatRouter);
router.use("/api/user", userRouter);
router.use("/api/condition", conditionRouter);
router.use("/api/collection-item", collectionItemRouter);
router.use("/api/admin", adminRouter);
router.use("/api/mail", mailRouter);
router.use("/api/collection-visibility", collectionVisibilityRouter);

module.exports = router;
