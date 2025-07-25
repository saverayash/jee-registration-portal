import React, { useState, useEffect } from 'react';
import axios from 'axios';

function See_ReportedStudent() {
    const [reportedStudents, setReportedStudents] = useState([]);
    const adminId = localStorage.getItem('id'); 

    const fetchReportedStudents = async () => {
        try {
            const res = await axios.get(`http://localhost:3000/report/reported`);
            setReportedStudents(res.data);
        } catch (err) {
            console.error('Error fetching reported students:', err);
        }
    };

    useEffect(() => {
        fetchReportedStudents();
    }, [adminId]);

    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
            <h3>Reported Students</h3>
            {reportedStudents.length === 0 ? (
                <p>No reported students.</p>
            ) : (
                reportedStudents.map((student) => (
                    <div
                        key={`${student.student_id}-${student.status}`}
                        style={{ border: '1px solid #ccc', padding: '10px', marginTop: '10px' }}
                    >
                        <p><strong>ID:</strong> {student.student_id}</p>
                        <p><strong>Name:</strong> {student.first_name} {student.last_name}</p>
                        <p><strong>Reported For:</strong> {student.status} Center</p>
                    </div>
                ))
            )}
        </div>
    );
}

export default See_ReportedStudent;
