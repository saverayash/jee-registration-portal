import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Report_Student() {
    const [studentId, setStudentId] = useState('');
    const [centerType, setCenterType] = useState('main'); 
    const [message, setMessage] = useState('');
    const [reportedStudents, setReportedStudents] = useState([]);

    const centreAdmin = localStorage.getItem('id'); 

    const handleReport = async () => {
        try {
            const res = await axios.post('http://localhost:3000/report', {
                studentId,
                centreAdmin,
                type: centerType
            });
            setMessage(res.data.message);
            setStudentId('');
            fetchReportedStudents(); 
        } catch (err) {
            console.error(err);
            setMessage(err.response?.data?.error || 'Failed to report student.');
        }
    };

    const fetchReportedStudents = async () => {
        try {
            const res = await axios.get('http://localhost:3000/report/reported');
            setReportedStudents(res.data);
        } catch (err) {
            console.error('Error fetching reported students:', err);
        }
    };

    useEffect(() => {
        fetchReportedStudents();
    }, []);

    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
            <h2>Report a Student</h2>

            <input
                type="number"
                placeholder="Enter Student ID"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                style={{ width: '100%', marginBottom: '10px' }}
            />

            <select 
                value={centerType}
                onChange={(e) => setCenterType(e.target.value)}
                style={{ width: '100%', marginBottom: '10px' }}
            >
                <option value="main">Main Center</option>
                <option value="advance">Advance Center</option>
            </select>

            <button onClick={handleReport} style={{ padding: '8px 16px' }}>Report</button>
            {message && <p style={{ color: 'green' }}>{message}</p>}

            <h3>Reported Students</h3>
            {reportedStudents.length === 0 ? (
                <p>No reported students.</p>
            ) : (
                reportedStudents.map((student) => (
                    <div key={student.student_id} style={{ border: '1px solid #ccc', padding: '10px', marginTop: '10px' }}>
                        <p><strong>ID:</strong> {student.student_id}</p>
                        <p><strong>Name:</strong> {student.first_name} {student.last_name}</p>
                        <p><strong>Status:</strong> Reported for {student.status} center</p>
                    </div>
                ))
            )}
        </div>
    );
}

export default Report_Student;
