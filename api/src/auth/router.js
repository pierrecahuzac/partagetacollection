const express = require("express");
const router = express.Router();
const authController = require('./controller')

router.post('/signin',authController.signin )
router.post('/signup',authController.signup )
router.post('/logout', authController.logout )
router.post('/password-reset', authController.passwordReset )



module.exports = router;