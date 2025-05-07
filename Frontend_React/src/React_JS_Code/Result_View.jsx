import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Result_View() {
    const [result, setResult] = useState(null);
    const [message, setMessage] = useState('');
    const studentId = localStorage.getItem('id'); 

    useEffect(() => {
        const fetchResult = async () => {
            try {
                const res = await axios.get(`http://localhost:3000/result/${studentId}`);
                setResult(res.data);
            } catch (err) {
                console.error(err);
                setMessage(err.response?.data?.error || 'Unable to fetch result');
            }
        };
        fetchResult();
    }, [studentId]);

    return (
        <div style={{ padding: '20px' }}>
            <h2>Your Result</h2>
            {message && <p>{message}</p>}
            {result && (
                <table border="1" cellPadding="10">
                    <thead>
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
                        <tr>
                            <td>{result.physics_mark}</td>
                            <td>{result.chemistry_mark}</td>
                            <td>{result.maths_mark}</td>
                            <td>{result.air}</td>
                            <td>{result.category_rank}</td>
                            <td>{result.qualification_status ? 'Yes' : 'No'}</td>
                        </tr>
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default Result_View;
