import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function StudentQuery() {
    const [queryText, setQueryText] = useState('');
    const [paperSetterId, setPaperSetterId] = useState('');
    const [studentId,setStudentId]=useState('');
    const [message, setMessage] = useState('');
    const [queries, setQueries] = useState([]);
    useEffect(() => {
        const id = localStorage.getItem('id');
        if (id) {
            setStudentId(id);
        }
    }, []);
    const handleSubmit = async (e) => {
       
        e.preventDefault();
        try {
            await axios.post('http://localhost:3000/q/ask', {
                queryText,
                studentId,
                paperSetterId
            });
            setMessage('Query submitted successfully.');
            setQueryText('');
            fetchQueries();
        } catch (err) {
            console.error(err);
            setMessage('Failed to submit query.');
        }
    };

    const fetchQueries = async () => {
        try {
            const res = await axios.post(`http://localhost:3000/q/student/${studentId}`);
            setQueries(res.data);
            //console.log(res);
        } catch (err) {
            console.error('Error fetching queries', err);
        }
    };

    useEffect(() => {
        fetchQueries();
    }, [studentId]);

    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
            <h2>Ask a Query</h2>
            <form onSubmit={handleSubmit}>
                <textarea
                    rows="4"
                    placeholder="Enter your query"
                    value={queryText}
                    onChange={(e) => setQueryText(e.target.value)}
                    required
                    style={{ width: '100%', marginBottom: '10px' }}
                />
                <input
                    type="number"
                    placeholder="Paper Setter ID"
                    value={paperSetterId}
                    onChange={(e) => setPaperSetterId(e.target.value)}
                    required
                    style={{ width: '100%', marginBottom: '10px' }}
                />
                <button type="submit">Submit</button>
            </form>
            {message && <p>{message}</p>}

            <h3>Your Queries</h3>
            {queries.map((q) => (
                <div key={q.query_id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
                    <p><strong>Query:</strong> {q.query_text}</p>
                    <p><strong>Response:</strong> {q.response_text || 'Pending'}</p>
                </div>
            ))}
        </div>
    );
}

export default StudentQuery;
