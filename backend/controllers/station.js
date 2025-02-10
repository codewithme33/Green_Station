const Station = require("../models/Station");


const getAllStations = async (req, res) => {
    try {
        const stations = await Station.find();
        res.json(stations);
    } catch (error) {
        res.status(500).json({ error: "Error fetching stations" });
    }
};


const getNearbyStations = async (req, res) => {
    const { latitude, longitude, maxDistance = 5000 } = req.query;

    if (!latitude || !longitude) {
        return res.status(400).json({ error: "Latitude and Longitude are required" });
    }

    try {
        const nearbyStations = await Station.find({
            location: {
                $near: {
                    $geometry: { type: "Point", coordinates: [parseFloat(longitude), parseFloat(latitude)] },
                    $maxDistance: parseInt(maxDistance), // Convert maxDistance to number
                },
            },
        });

        res.json(nearbyStations);
    } catch (error) {
        res.status(500).json({ error: "Error fetching nearby stations" });
    }
};


const createStation = async (req, res) => {
    try {
        const { name, latitude, longitude, queueStatus, hasGreenPoints } = req.body;

        const newStation = new Station({
            name,
            location: { type: "Point", coordinates: [parseFloat(longitude), parseFloat(latitude)] },
            queueStatus,
            hasGreenPoints,
        });

        await newStation.save();
        res.status(201).json(newStation);
    } catch (error) {
        res.status(500).json({ error: "Error creating station" });
    }
};

module.exports = { getAllStations, getNearbyStations, createStation };
