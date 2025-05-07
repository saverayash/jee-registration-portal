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
            `SELECT * FROM Result WHERE ID = $1 AND Published = TRUE`,
            [id]
        );
        if (result.rows.length === 0) {
            return res.status(403).json({ error: 'Result not published or not found.' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error('Error fetching student result:', err);
        res.status(500).json({ error: 'Failed to fetch result.' });
    }
});

module.exports = router;
