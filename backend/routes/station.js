const express = require("express");
const { getAllStations, getNearbyStations, createStation } = require("../controllers/station.js");

const router = express.Router();

router.get("/", getAllStations);
router.get("/nearby", getNearbyStations);
router.post("/", createStation);

module.exports = router;
