import React, { useState } from 'react';
import axios from 'axios';

function Publish_Result() {
    const [message, setMessage] = useState('');

    const handlePublish = async () => {
        try {
            const res = await axios.post('http://localhost:3000/result');
            setMessage(res.data.message);
        } catch (err) {
            console.error(err);
            setMessage('Failed to publish results.');
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Publish Results</h2>
            <button onClick={handlePublish}>Publish Result</button>
            {message && <p>{message}</p>}
        </div>
    );
}

export default Publish_Result;
