import React, { useEffect, useState } from 'react';
import axios from 'axios';

function PaperSetterResponse() {
    const [queries, setQueries] = useState([]);
    const [responses, setResponses] = useState({});
    const [message, setMessage] = useState('');
    const [paperSetterId,setPaperSetterId]=useState('');

    useEffect(() => {
            const id = localStorage.getItem('id');
            if (id) {
                setPaperSetterId(id);
            }
        }, []);

        useEffect(() => {
            fetchQueries();
        }, [paperSetterId]);

    const fetchQueries = async () => {
        try {
            const res = await axios.post(`http://localhost:3000/q/paper_setter/${paperSetterId}`);
            setQueries(res.data);
        } catch (err) {
            console.error('Error fetching queries', err);
        }
    };

    

    const handleResponse = async (queryId) => {
        try {
            await axios.post('http://localhost:3000/q/respond', {
                queryId,
                responseText: responses[queryId] || ''
            });
            setMessage('Response submitted');
            fetchQueries();
        } catch (err) {
            console.error(err);
            setMessage('Failed to respond');
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
            <h2>Student Queries</h2>
            {queries.map((q) => (
                <div key={q.query_id} style={{ marginBottom: '20px', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
                    <p><strong>Student ID:</strong> {q.student_id}</p>
                    <p><strong>Query:</strong> {q.query_text}</p>
                    <p><strong>Response:</strong> {q.response_text || 'No response yet'}</p>
                    {!q.response_text && (
                        <>
                            <textarea
                                rows="3"
                                placeholder="Write your response"
                                onChange={(e) => setResponses({ ...responses, [q.query_id]: e.target.value })}
                                style={{ width: '100%' }}
                            />
                            <button onClick={() => handleResponse(q.query_id)}>Submit Response</button>
                        </>
                    )}
                </div>
            ))}
            {message && <p>{message}</p>}
        </div>
    );
}

export default PaperSetterResponse;
