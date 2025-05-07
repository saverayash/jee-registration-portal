const express = require('express');
const router = express.Router();
const client = require('./Client'); 

router.get('/:paperId/:langId', async (req, res) => {
    const { paperId, langId } = req.params;

    try {
        const result = await client.query(`
            SELECT Que_No, Choice_A, Choice_B, Choice_C, Choice_D, Correct_Choice
            FROM Question_Set
            WHERE Paper_ID = $1 AND Language_ID = $2
            ORDER BY Que_No
        `, [paperId, langId]);

        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching questions:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
