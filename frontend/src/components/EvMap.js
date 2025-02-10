import React, { useEffect, useState } from "react";
import axios from "axios";
import io from "socket.io-client";

const socket = io(process.env.REACT_APP_BACKEND_URL);

const EVMap = () => {
    const [stations, setStations] = useState([]);

    useEffect(() => {
        const fetchStations = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/stations`);
                setStations(res.data);
            } catch (error) {
                console.error("Error fetching stations:", error);
            }
        };

        fetchStations();

        socket.on("queueUpdate", (data) => {
            setStations((prevStations) =>
                prevStations.map((station) =>
                    station._id === data.stationId ? { ...station, queueStatus: data.queueStatus } : station
                )
            );
        });

        return () => {
            socket.off("queueUpdate");
        };
    }, []);

    return (
        <div>
            {stations.map((station) => (
                <div key={station._id}>
                    <h3>{station.name}</h3>
                    <p>Queue Status: {station.queueStatus}</p>
                </div>
            ))}
        </div>
    );
};

export default EVMap;
