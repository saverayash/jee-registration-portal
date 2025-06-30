const express = require('express');
const router = express.Router();
const client = require('./Client'); 

router.get('/:paperId', async (req, res) => {
    const { paperId } = req.params;
console.log(paperId);
    try {
        const result = await client.query(`
            SELECT Que_No, Option_A, Option_B, Option_C, Option_D, Correct_Answer
            FROM Question
            WHERE Paper_ID = $1 
            ORDER BY Que_No
        `, [paperId]);
        console.log(result.rows);

        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching questions:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
