const express = require('express');
const router = express.Router();
const client = require('./Client');

router.get('/', async (req, res) => {
    try {
        const result = await client.query(`
            SELECT a.announcement_id, a.announcement_text, a.status, a.admin_id, ad.email_id AS admin_email
            FROM Announcement a
            JOIN Admin ad ON a.admin_id = ad.admin_id
            WHERE a.status = TRUE
            ORDER BY a.announcement_id DESC
        `);
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching announcements:', err);
        res.status(500).json({ message: 'Failed to fetch announcements', error: err.stack });
    }
});

module.exports = router;
