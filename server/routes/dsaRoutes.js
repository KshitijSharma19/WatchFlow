const express = require("express");
const router = express.Router();
const { getOrGenerateDsaSolution } = require("../controllers/dsaSolutionController");

// Open endpoint to fetch or generate optimal DSA solution for any problem
router.post("/solution", getOrGenerateDsaSolution);

module.exports = router;
