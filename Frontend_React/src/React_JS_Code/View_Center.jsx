import React, { useEffect, useState } from 'react';
import axios from 'axios';

function StudentCenters() {
    const [mainCenter, setMainCenter] = useState(null);
    const [advCenter, setAdvCenter] = useState(null);
    const [error, setError] = useState('');

    const studentId = localStorage.getItem('id'); 
    useEffect(() => {
        const fetchCenters = async () => {
            try {
                const res = await axios.get(`http://localhost:3000/view_center/${studentId}`);
                setMainCenter(res.data.mainCenter);
                setAdvCenter(res.data.advCenter);
            } catch (err) {
                console.error(err);
                setError('Failed to fetch centers');
            }
        };

        if (studentId) fetchCenters();
    }, [studentId]);

    return (
        <div style={{ maxWidth: '600px', margin: '40px auto', fontFamily: 'Arial' }}>
            <h2>Assigned Centers</h2>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            <div style={{ marginTop: '20px' }}>
                <h3>Main Center</h3>
                {mainCenter ? (
                    <div>
                        <p><strong>Name:</strong> {mainCenter.center_name}</p>
                        <p><strong>Address:</strong> {mainCenter.address}</p>
                        <p><strong>Status:</strong> {mainCenter.status}</p>
                    </div>
                ) : <p>No Main Center Assigned</p>}
            </div>

            <div style={{ marginTop: '30px' }}>
                <h3>Advance Center</h3>
                {advCenter ? (
                    <div>
                        <p><strong>Name:</strong> {advCenter.center_name}</p>
                        <p><strong>Address:</strong> {advCenter.address}</p>
                    </div>
                ) : <p>No Advance Center Assigned</p>}
            </div>
        </div>
    );
}

export default StudentCenters;
