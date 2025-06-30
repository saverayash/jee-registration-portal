import React, { useEffect, useState } from 'react';
import axios from 'axios';

function StudentAnnouncements() {
    const [announcements, setAnnouncements] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchAnnouncements = async () => {
            try {
                const response = await axios.get('http://localhost:3000/announcement'); // Use GET
                setAnnouncements(response.data);
            } catch (err) {
                console.error(err);
                setError('Failed to load announcements.');
            }
        };

        fetchAnnouncements();
    }, []);

    return (
        <div style={{ maxWidth: '700px', margin: '40px auto', padding: '20px', fontFamily: 'Arial' }}>
            <h2>Latest Announcements</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {announcements.length === 0 ? (
                <p>No announcements available.</p>
            ) : (
                <ul style={{ listStyleType: 'none', padding: 0 }}>
                    {announcements.map((item, index) => (
                        <li key={index} style={{
                            backgroundColor: '#f1f1f1',
                            margin: '10px 0',
                            padding: '15px',
                            borderRadius: '8px'
                        }}>
                            {item.announcement_text}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default StudentAnnouncements;
