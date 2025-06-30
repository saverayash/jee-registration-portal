import React, { useEffect, useState } from 'react';
import axios from 'axios';

function PaperView() {
    const [questions, setQuestions] = useState([]);
    const [paperId, setPaperId] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const fetchQuestions = async () => {
        try {
            const res = await axios.get(`http://localhost:3000/paper/${paperId}`);
            setQuestions(res.data);
            setSubmitted(true);
        } catch (err) {
            console.error('Failed to fetch questions', err);
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>View Paper</h2>
            <input
                type="number"
                placeholder="Paper ID"
                value={paperId}
                onChange={(e) => setPaperId(e.target.value)}
                style={{ marginRight: '10px' }}
            />
            
            <button onClick={fetchQuestions}>View Questions</button>

            {submitted && questions.length === 0 && <p>No questions found.</p>}

            {questions.map((q, index) => (
                <div key={index} style={{ marginTop: '20px', border: '1px solid #ccc', padding: '10px' }}>
                    <p><strong>Q{q.que_no}.</strong></p>
                    <ul>
                        <li>A. {q.option_a}</li>
                        <li>B. {q.option_b}</li>
                        <li>C. {q.option_c}</li>
                        <li>D. {q.option_d}</li>
                        <li>Correct Answer : {q.correct_answer}</li>
                    </ul>
                </div>
            ))}
        </div>
    );
}

export default PaperView;
