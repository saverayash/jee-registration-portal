const express = require('express');
const router = express.Router();
const client = require('./Client');

// 📩 Student submits a query
router.post('/ask', async (req, res) => {
    const { query_text, student_id, paper_setter_id } = req.body;

    if (!query_text || !student_id || !paper_setter_id) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        await client.query(
            `INSERT INTO Query (Query_Text, Student_Id, Paper_Setter_Id) VALUES ($1, $2, $3)`,
            [query_text, student_id, paper_setter_id]
        );
        res.json({ message: 'Query submitted successfully' });
    } catch (err) {
        console.error('Error submitting query:', err);
        res.status(500).json({ message: 'Failed to submit query' });
    }
});

// 📝 Paper Setter responds to a query
router.post('/respond', async (req, res) => {
    const { query_id, response_text } = req.body;
    if (!query_id || !response_text) {
        return res.status(400).json({ message: 'Query ID and response are required.' });
    }

    try {
        await client.query(
            `UPDATE Query SET Response_Text = $1 WHERE Query_Id = $2`,
            [response_text, query_id]
        );
        res.json({ message: 'Response submitted successfully' });
    } catch (err) {
        console.error('Error responding to query:', err);
        res.status(500).json({ message: 'Failed to respond' });
    }
});

// 📥 Student views their queries
router.get('/student/:id', async (req, res) => {
    try {
        const result = await client.query(
            `SELECT * FROM Query WHERE Student_Id = $1 ORDER BY Query_Id DESC`,
            [req.params.id]
        );
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching student queries:', err);
        res.status(500).json({ message: 'Failed to fetch queries' });
    }
});

// 📥 Paper Setter views queries sent to them
router.get('/paper_setter/:id', async (req, res) => {
    try {
        const result = await client.query(
            `SELECT * FROM Query WHERE Paper_Setter_Id = $1 ORDER BY Query_Id DESC`,
            [req.params.id]
        );
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching queries:', err);
        res.status(500).json({ message: 'Failed to fetch queries' });
    }
});

module.exports = router;
