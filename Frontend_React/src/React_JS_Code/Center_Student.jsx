import React, { useEffect, useState } from 'react';
import axios from 'axios';

function CenterStudentList() {
    const [students, setStudents] = useState([]);
    const [id, setId] = useState(localStorage.getItem('id')); 
    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const res = await axios.get(`http://localhost:3000/center_student/${id}`);
                setStudents(res.data);
            } catch (error) {
                console.error("Failed to fetch students:", error);
            }
        };

        if (id) {
            fetchStudents();
        }
    }, [id]);

    return (
        <div style={{ padding: '20px' }}>
            <h2>Students Assigned to Your Center</h2>
            {students.length === 0 ? (
                <p>No students found for this center.</p>
            ) : (
                <table border="1" cellPadding="10">
                    <thead>
                        <tr>
                            <th>Student ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Assignment Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((s) => (
                            <tr key={s.id}>
                                <td>{s.student_id}</td>
                                <td>{s.first_name}</td>
                                <td>{s.last_name}</td>
                                <td>{s.assignment_type}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default CenterStudentList;
