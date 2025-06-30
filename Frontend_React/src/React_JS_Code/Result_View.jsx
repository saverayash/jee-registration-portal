import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Result_View() {
    const [results, setResults] = useState([]);
    const [message, setMessage] = useState('');
    const studentId = localStorage.getItem('id'); 

    useEffect(() => {
        const fetchResult = async () => {
            try {
                const res = await axios.get(`http://localhost:3000/result/${studentId}`);
                setResults(res.data); // expects an array now
            } catch (err) {
                console.error(err);
                setMessage(err.response?.data?.error || 'Unable to fetch results');
            }
        };
        if (studentId) fetchResult();
    }, [studentId]);

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial' }}>
            <h2>Your Results</h2>
            {message && <p style={{ color: 'red' }}>{message}</p>}

            {results.length > 0 ? (
                <table border="1" cellPadding="10" style={{ borderCollapse: 'collapse', width: '100%' }}>
                    <thead style={{ backgroundColor: '#f2f2f2' }}>
                        <tr>
                            <th>Physics</th>
                            <th>Chemistry</th>
                            <th>Maths</th>
                            <th>AIR</th>
                            <th>Category Rank</th>
                            <th>Qualified</th>
                        </tr>
                    </thead>
                    <tbody>
                        {results.map((r, index) => (
                            <tr key={index}>
                                <td>{r.physics_mark}</td>
                                <td>{r.chemistry_mark}</td>
                                <td>{r.maths_mark}</td>
                                <td>{r.air}</td>
                                <td>{r.category_rank}</td>
                                <td>{r.qualification_status ? 'Yes' : 'No'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                !message && <p>No results found.</p>
            )}
        </div>
    );
}

export default Result_View;
