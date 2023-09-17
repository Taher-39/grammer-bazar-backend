const express = require("express");
const {
  postBrandsCntlr,
  getAllBrandsCntlr,
} = require("../controllers/brandController");
const router = express.Router();

router.post("/", postBrandsCntlr).get("/", getAllBrandsCntlr);

module.exports = router;
