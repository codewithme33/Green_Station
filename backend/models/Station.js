const mongoose = require("mongoose");

const stationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: {
        type: { type: String, default: "Point" },
        coordinates: { type: [Number], required: true }, 
    },
    queueStatus: { type: Number, default: 0 }, 
    hasGreenPoints: { type: Boolean, default: false },
});


stationSchema.index({ location: "2dsphere" });

const Station = mongoose.model("Station", stationSchema);
module.exports = Station;
