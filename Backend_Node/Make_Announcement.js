const express = require('express');
const router = express.Router();
const client = require('./Client');

router.post('/', async (req, res) => {
    const { announcement_text, status, admin_id } = req.body;

    if (!announcement_text || status === undefined || !admin_id) {
        return res.status(400).json({ message: 'announcement_text, status, and admin_id are required' });
    }

    try {
        const insertQuery = `
            INSERT INTO Announcement (Announcement_Text, Status, Admin_Id)
            VALUES ($1, $2, $3)
        `;
        const values = [announcement_text, status, admin_id];

        await client.query(insertQuery, values);
        res.status(200).json({ message: 'Announcement added successfully' });
    } catch (err) {
        console.error('Error adding announcement:', err);
        res.status(500).json({ message: 'Failed to add announcement', error: err.stack });
    }
});

module.exports = router;
