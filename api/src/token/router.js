const express = require("express");
const router = express.Router();

const tokenController = require("./controller");

router.post("/token-password-validation/:token",tokenController.tokenPasswordValidation);

module.exports = router;
