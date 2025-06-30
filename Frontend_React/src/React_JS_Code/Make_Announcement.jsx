import React, { useState } from 'react';
import axios from 'axios';

function Make_Announcement() {
    const [announcementText, setAnnouncementText] = useState('');
    const [status, setStatus] = useState(true); // boolean
    const [adminId, setAdminId] = useState(''); // must be filled
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/make_announcement', {
                announcement_text: announcementText,
                status,
                admin_id: parseInt(adminId)
            });
            setMessage(response.data.message);
            setAnnouncementText('');
            setStatus(true);
            setAdminId('');
        } catch (error) {
            setMessage(error.response?.data?.message || 'Error submitting announcement');
            console.error(error);
        }
    };

    return (
        <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px' }}>
            <h2>Add New Announcement</h2>
            {message && <p style={{ color: message.includes('success') ? 'green' : 'red' }}>{message}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Announcement:</label><br />
                    <textarea
                        value={announcementText}
                        onChange={(e) => setAnnouncementText(e.target.value)}
                        rows="4"
                        style={{ width: '100%' }}
                        required
                    />
                </div>

                <div style={{ marginTop: '10px' }}>
                    <label>Status:</label>
                    <select value={status} onChange={(e) => setStatus(e.target.value === 'true')}>
                        <option value="true">Active</option>
                        <option value="false">Inactive</option>
                    </select>
                </div>

                <div style={{ marginTop: '10px' }}>
                    <label>Admin ID:</label>
                    <input
                        type="number"
                        value={adminId}
                        onChange={(e) => setAdminId(e.target.value)}
                        required
                    />
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

export default Make_Announcement;
