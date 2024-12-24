import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './BookingUI.css'; // Import the CSS file

const BookingList = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/bookings');
                setBookings(response.data);
            } catch (err) {
                setError('Failed to load bookings');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchBookings();
    }, []);

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="container booking-list">
            <h2>Bookings</h2>
            <ul>
                {bookings.map((booking) => (
                    <li key={booking.id}>
                        <div>
                            {booking.facility} - {new Date(booking.startTime).toLocaleString()} to {new Date(booking.endTime).toLocaleString()}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BookingList;
