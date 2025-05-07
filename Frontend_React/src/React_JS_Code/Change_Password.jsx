import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Change_Password() {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleChangePassword = async (e) => {
        e.preventDefault();

        try {
            const id=localStorage.getItem('id');
            const token = localStorage.getItem('token');
            const role=localStorage.getItem('role');
            if (!token) {
                setMessage('You must be logged in');
                return;
            }

            const response = await axios.post('http://localhost:3000/change_password', {
                oldPassword,
                newPassword,
                id,
                role,
            });

            setMessage(response.data.message);
        } catch (err) {
            console.error(err);
            setMessage(err.response?.data?.message || 'Error changing password');
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Change Password</h2>
            <form onSubmit={handleChangePassword}>
                <div>
                    <label>Old Password:</label>
                    <input
                        type="password"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>New Password:</label>
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Change Password</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default Change_Password;
