const express = require("express");
const { signUp, signIn } = require("../controllers/authController");
const router = express.Router();

router.post("/signUp", signUp).post("/signIn", signIn);

module.exports = router;
