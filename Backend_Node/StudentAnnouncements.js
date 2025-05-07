const express = require('express');
const router = express.Router();
const client = require('./Client'); 

router.post('/', async (req, res) => {
    try {
        const result = await client.query(`SELECT * FROM Announcement WHERE Status = 1`);
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching announcements:', err);
        res.status(500).json({ message: 'Failed to fetch announcements', error: err.stack });
    }
});

module.exports = router;
