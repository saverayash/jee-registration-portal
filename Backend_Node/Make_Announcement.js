const express = require('express');
const router = express.Router();
const client = require('./Client'); 

router.post('/', async (req, res) => {
    const { announcement, status } = req.body;

    if (!announcement || status === undefined) {
        return res.status(400).json({ message: 'Announcement and status are required' });
    }

    try {
        const insertQuery = `INSERT INTO Announcement (Announcement, Status) VALUES ($1, $2)`;
        await client.query(insertQuery, [announcement, status]);
        res.status(200).json({ message: 'Announcement added successfully' });
    } catch (err) {
        console.error('Error adding announcement:', err);
        res.status(500).json({ message: 'Failed to add announcement', error: err.stack });
    }
});

module.exports = router;
