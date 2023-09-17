const express = require("express");
const {
  postCategoryCntlr,
  getCategoryCntlr,
} = require("../controllers/categoryController");
const router = express.Router();

router.post("/", postCategoryCntlr).get("/", getCategoryCntlr);

module.exports = router;
