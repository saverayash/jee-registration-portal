const express = require('express');
const router = express.Router();
const client = require('./Client');

router.post('/ask', async (req, res) => {
    const { queryText, studentId, paperSetterId } = req.body;
    console.log(req.body);
    try {
        await client.query(
            `INSERT INTO Query (Query_Text, Student_ID, Paper_Setter_ID) VALUES ($1, $2, $3)`,
            [queryText, studentId, paperSetterId]
        );
        res.json({ message: 'Query submitted successfully' });
    } catch (err) {
        console.error('Error submitting query:', err);
        res.status(500).json({ message: 'Failed to submit query' });
    }
});

router.post('/respond', async (req, res) => {
    const { queryId, responseText } = req.body;
    try {
        await client.query(
            `UPDATE Query SET Response_Text = $1 WHERE Query_ID = $2`,
            [responseText, queryId]
        );
        res.json({ message: 'Response submitted successfully' });
    } catch (err) {
        console.error('Error responding to query:', err);
        res.status(500).json({ message: 'Failed to respond' });
    }
});

router.post('/student/:id', async (req, res) => {
    
    try {
        const result = await client.query(
            `SELECT * FROM Query WHERE Student_ID = $1`,
            [req.params.id]
        );
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching student queries:', err);
        res.status(500).json({ message: 'Failed to fetch queries' });
    }
});

router.post('/paper_setter/:id', async (req, res) => {
    try {
        const result = await client.query(
            `SELECT * FROM Query WHERE Paper_Setter_ID = $1`,
            [req.params.id]
        );
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching queries:', err);
        res.status(500).json({ message: 'Failed to fetch queries' });
    }
});
// router.get('/student/:id', async (req, res) => {
//     try {
//         const result = await client.query(
//             `SELECT * FROM Query WHERE Student_ID = $1`,
//             [req.params.id]
//         );
//         res.json(result.rows);
//     } catch (err) {
//         res.status(500).json({ message: 'Failed to fetch student queries' });
//     }
// });

// router.get('/paper_setter/:id', async (req, res) => {
//     try {
//         const result = await client.query(
//             `SELECT * FROM Query WHERE Paper_Setter_ID = $1`,
//             [req.params.id]
//         );
//         res.json(result.rows);
//     } catch (err) {
//         res.status(500).json({ message: 'Failed to fetch queries' });
//     }
// });

module.exports = router;
