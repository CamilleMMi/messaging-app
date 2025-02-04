const express = require("express");
const authController = require("../controllers/auth.controller-1.0.0");

const router = express.Router();

router.get("/signup", authController.signUp);

router.get("/signin");

router.get("/signout");

module.exports = router;