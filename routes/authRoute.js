const express = require("express");
const {
  signUp,
  signIn,
  updateUserAuth,
  fetchLoggedInUser,
} = require("../controllers/authController");
const router = express.Router();

router
  .post("/signUp", signUp)
  .post("/signIn", signIn)
  .get("/:id", fetchLoggedInUser)
  .patch("/:id", updateUserAuth);

module.exports = router;
