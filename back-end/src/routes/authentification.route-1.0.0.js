const express = require('express');
const authController = require('../controllers/auth.controller-1.0.0');
const authMiddleware = require('../middlewares/auth.middleware-1.0.0');

const router = express.Router();

router.get("/user-info", authMiddleware([]), authController.userInfo);

router.post("/login", authController.login);

router.post("/register", authController.register);

router.post("/logout", authMiddleware([]), authController.logout);

module.exports = router;