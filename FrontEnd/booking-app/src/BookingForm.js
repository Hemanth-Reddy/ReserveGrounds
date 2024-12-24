import React, { useState } from 'react';
import axios from 'axios';
import './BookingUI.css'; // Import the CSS file

const BookingForm = () => {
    const [facility, setFacility] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [conflictingBookings, setConflictingBookings] = useState([]); // State to store conflicting bookings

    const handleSubmit = async (e) => {
        e.preventDefault();
        setConflictingBookings([]); // Clear previous conflicts
        try {
            const response = await axios.post('http://localhost:8080/api/bookings', {
                facility,
                startTime,
                endTime,
            });
            alert(response.data); // Booking success message
        } catch (err) {
            if (err.response && err.response.status === 400) {
                const errorMessage = err.response.data;
                if (errorMessage.conflictingBookings) {
                    setConflictingBookings(errorMessage.conflictingBookings); // Set the conflicting bookings from the response
                } else {
                    alert(errorMessage); // Generic error message
                }
            } else {
                console.error(err);
                alert('An unexpected error occurred.');
            }
        }
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <h2>Create Booking</h2>
                <label>Facility:</label>
                <select value={facility} onChange={(e) => setFacility(e.target.value)}>
                    <option value="">Select Facility</option>
                    <option value="Cricket Ground 1">Cricket Ground 1</option>
                    <option value="Cricket Ground 2">Cricket Ground 2</option>
                    <option value="Party Hall">Party Hall</option>
                    <option value="Batting Cage">Batting Cage</option>
                </select>
                <label>Start Time:</label>
                <input type="datetime-local" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
                <label>End Time:</label>
                <input type="datetime-local" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
                <button type="submit">Create Booking</button>
            </form>

            {conflictingBookings.length > 0 && (
                <div>
                    <h3>Conflicting Bookings:</h3>
                    <ul>
                        {conflictingBookings.map((booking, index) => {
                            const { facility, startTime, endTime } = booking;
                            const formattedStartTime = new Date(startTime).toLocaleString();
                            const formattedEndTime = new Date(endTime).toLocaleString();
                            
                            return (
                                <li key={index}>
                                    <strong>Facility:</strong> {facility}<br />
                                    <strong>Start Time:</strong> {formattedStartTime}<br />
                                    <strong>End Time:</strong> {formattedEndTime}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default BookingForm;
