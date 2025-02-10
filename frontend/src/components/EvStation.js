import React, { useEffect, useState } from "react";
import axios from "axios";

function EVStation({ station }) {
    const [estimatedTime, setEstimatedTime] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:5000/api/bookings/estimated-refill/${station._id}`)
            .then(response => {
                setEstimatedTime(response.data.estimatedWaitTime);
            })
            .catch(error => console.error("Error fetching estimated time:", error));
    }, [station._id]);

    return (
        <div className="station-card">
            <h3>{station.name}</h3>
            <p>Location: {station.location.coordinates.join(", ")}</p>
            <p>Queue Status: {station.queueStatus} EVs waiting</p>
            <p>Estimated Wait Time: {estimatedTime ? `${estimatedTime} mins` : "Calculating..."}</p>
        </div>
    );
}

export default EVStation;
