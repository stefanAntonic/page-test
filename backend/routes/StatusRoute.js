const express = require("express");
const { getStatus, createStatus } = require("../controllers/statusController");

const router = express.Router();

router.route("/").get(getStatus).post(createStatus);

module.exports = router;
