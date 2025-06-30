import React, { useState } from 'react';
import axios from 'axios';

function Add_User() {
    const [role, setRole] = useState('');
    const [formData, setFormData] = useState({});

    const handleRoleChange = (e) => {
        setRole(e.target.value);
        setFormData({});
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:3000/add_user`, {
                role,
                ...formData
            });
            alert(`${role} added successfully`);
            console.log(response.data);
        } catch (err) {
            console.error(err);
            alert('Error adding user');
        }
    };

    return (
        <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px', fontFamily: 'Arial' }}>
            <h2>Add User</h2>

            <div style={{ marginBottom: '20px' }}>
                <label>Select Role: </label>
                <select value={role} onChange={handleRoleChange}>
                    <option value="">-- Choose --</option>
                    <option value="Centre">Centre</option>
                    <option value="Paper_Setter">Paper Setter</option>
                </select>
            </div>

            {role === 'Centre' && (
                <form onSubmit={handleSubmit}>
                    <input name="Center_ID" placeholder="Centre ID" onChange={handleChange} required /><br />
                    <input name="Center_Name" placeholder="Centre Name" onChange={handleChange} required /><br />
                    <input name="Building_Name" placeholder="Building Name" onChange={handleChange} /><br />

                    <input name="area" placeholder="Area" onChange={handleChange} required /><br />
                    <input name="city_id" placeholder="City ID" onChange={handleChange} required /><br />
                    <input name="Pincode" placeholder="Pincode" onChange={handleChange} required /><br />

                    <input name="Admin_ID" placeholder="Centre Admin ID" onChange={handleChange} required /><br />
                    <input name="Admin_Password" placeholder="Admin Password" onChange={handleChange} required type="password" /><br />
                    <input name="Admin_Number" placeholder="Admin Phone" onChange={handleChange} required /><br />
                    <input name="Admin_Email" placeholder="Admin Email" onChange={handleChange} required /><br />

                    <button type="submit">Add Centre</button>
                </form>
            )}

            {role === 'Paper_Setter' && (
                <form onSubmit={handleSubmit}>
                    <input name="Paper_Setter_ID" placeholder="Paper Setter ID" onChange={handleChange} required /><br />
                    <input name="Paper_ID" placeholder="Paper ID" onChange={handleChange} required /><br />
                    <input name="Login_Password" placeholder="Login Password" onChange={handleChange} required type="password" /><br />
                    <input name="Full_Name" placeholder="Full Name" onChange={handleChange} required /><br />
                    <input name="Qualification" placeholder="Qualification" onChange={handleChange} /><br />
                    <input name="College_University" placeholder="College / University" onChange={handleChange} /><br />
                    <input name="Email_id" placeholder="Email ID" onChange={handleChange} /><br />
                    <button type="submit">Add Paper Setter</button>
                </form>
            )}
        </div>
    );
}

export default Add_User;
