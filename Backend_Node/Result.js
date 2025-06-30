const express = require('express');
const router = express.Router();
const client = require('./Client');

router.post('/', async (req, res) => {
    try {
        await client.query(`UPDATE Result SET Published = TRUE`);
        res.json({ message: 'Results published successfully.' });
    } catch (err) {
        console.error('Error publishing results:', err);
        res.status(500).json({ error: 'Failed to publish results.' });
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const result = await client.query(
            `SELECT * FROM Result WHERE Student_Id = $1`,
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'No results found for this student.' });
        }

        res.json(result.rows); // return array of results
    } catch (err) {
        console.error('Error fetching student results:', err);
        res.status(500).json({ error: 'Failed to fetch results.' });
    }
});

module.exports = router;
