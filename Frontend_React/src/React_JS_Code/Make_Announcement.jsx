import React, { useState } from 'react';
import axios from 'axios';

function Make_Announcement() {
    const [announcement, setAnnouncement] = useState('');
    const [status, setStatus] = useState(1); // 1 = active, 0 = inactive
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/make_announcement', {
                announcement,
                status
            });
            setMessage(response.data.message);
            setAnnouncement('');
            setStatus(1);
        } catch (error) {
            setMessage(error.response?.data?.message || 'Error submitting announcement');
            console.error(error);
        }
    };

    return (
        <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px' }}>
            <h2>Add New Announcement</h2>
            {message && <p style={{ color: 'green' }}>{message}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Announcement:</label><br />
                    <textarea
                        value={announcement}
                        onChange={(e) => setAnnouncement(e.target.value)}
                        rows="4"
                        style={{ width: '100%' }}
                        required
                    />
                </div>
                <div style={{ marginTop: '10px' }}>
                    <label>Status:</label>
                    <select value={status} onChange={(e) => setStatus(parseInt(e.target.value))}>
                        <option value={1}>Active</option>
                        <option value={0}>Inactive</option>
                    </select>
                </div>
                <button type="submit" style={{
                    marginTop: '15px',
                    padding: '10px 20px',
                    backgroundColor: '#007BFF',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer'
                }}>
                    Submit
                </button>
            </form>
        </div>
    );
}

export default  Make_Announcement;
