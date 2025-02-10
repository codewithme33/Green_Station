import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import AuthContext from "../context/AuthContext";

const Booking = ({ stationId }) => {
    const { user } = useContext(AuthContext);
    const [timeSlot, setTimeSlot] = useState("");
    const [queueStatus, setQueueStatus] = useState(0);
    const [estimatedWaitTime, setEstimatedWaitTime] = useState(0);

    useEffect(() => {
        const fetchQueueStatus = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/bookings/estimated-refill/${stationId}`);
                setQueueStatus(res.data.queueStatus);
                setEstimatedWaitTime(res.data.estimatedWaitTime);
            } catch (error) {
                console.error("Error fetching queue status:", error);
            }
        };

        fetchQueueStatus();
    }, [stationId]);

    const handleBooking = async () => {
        if (!user) {
            alert("Please log in to book a slot");
            return;
        }

        try {
            const res = await axios.post(
                `${process.env.REACT_APP_BACKEND_URL}/api/bookings/book`,
                { userId: user._id, stationId, timeSlot },
                { withCredentials: true }
            );
            alert("Slot booked successfully!");
            setQueueStatus(res.data.queueStatus);
            setEstimatedWaitTime(res.data.estimatedWaitTime);
        } catch (error) {
            alert("Error booking slot");
        }
    };

    return (
        <div>
            <h3>Queue Status: {queueStatus}</h3>
            <h4>Estimated Wait Time: {estimatedWaitTime} min</h4>
            <input type="time" value={timeSlot} onChange={(e) => setTimeSlot(e.target.value)} />
            <button onClick={handleBooking}>Book Slot</button>
        </div>
    );
};

export default Booking;
