import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Admin_Center() {
    const [students, setStudents] = useState([]);
    const [centers, setCenters] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState('');
    const [mainCenter, setMainCenter] = useState('');
    const [mainStatus, setMainStatus] = useState(1);
    const [advCenter, setAdvCenter] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const studentRes = await axios.get('http://localhost:3000/admin_center/students');
            const centerRes = await axios.get('http://localhost:3000/admin_center/centers');
            setStudents(studentRes.data);
            setCenters(centerRes.data);
        };
        fetchData();
    }, []);

    const assignCenters = async () => {
        try {
            await axios.post('http://localhost:3000/admin_center/assign/main', {
                studentId: selectedStudent,
                centerId: mainCenter,
                status: mainStatus
            });

            await axios.post('http://localhost:3000/admin_center/assign/advance', {
                studentId: selectedStudent,
                centerId: advCenter
            });

            setMessage('Centers assigned successfully!');
        } catch (err) {
            console.error(err);
            setMessage('Error assigning centers');
        }
    };

    return (
        <div style={{ maxWidth: '700px', margin: '40px auto' }}>
            <h2>Assign Centers to Student</h2>
            <div style={{ marginBottom: '20px' }}>
                <label>Choose Student:</label>
                <select onChange={(e) => setSelectedStudent(e.target.value)} value={selectedStudent}>
                    <option value="">--Select Student--</option>
                    {students.map((s) => (
                        <option key={s.id} value={s.id}>
                            {s.name} (ID: {s.id})
                        </option>
                    ))}
                </select>
            </div>

            <div style={{ marginBottom: '20px' }}>
                <label>Main Center:</label>
                <select onChange={(e) => setMainCenter(e.target.value)} value={mainCenter}>
                    <option value="">--Select Main Center--</option>
                    {centers.map((c) => (
                        <option key={c.center_id} value={c.center_id}>
                            {c.center_name}
                        </option>
                    ))}
                </select>
                <input
                    type="number"
                    placeholder="Status"
                    value={mainStatus}
                    onChange={(e) => setMainStatus(e.target.value)}
                    style={{ marginLeft: '10px', width: '80px' }}
                />
            </div>

            <div style={{ marginBottom: '20px' }}>
                <label>Advance Center:</label>
                <select onChange={(e) => setAdvCenter(e.target.value)} value={advCenter}>
                    <option value="">--Select Advance Center--</option>
                    {centers.map((c) => (
                        <option key={c.center_id} value={c.center_id}>
                            {c.center_name}
                        </option>
                    ))}
                </select>
            </div>

            <button onClick={assignCenters}>Assign</button>

            {message && <p style={{ marginTop: '20px' }}>{message}</p>}
        </div>
    );
}

export default Admin_Center;
