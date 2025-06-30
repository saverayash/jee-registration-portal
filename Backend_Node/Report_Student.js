const express = require('express');
const router = express.Router();
const client = require('./Client');

// Unified student report route for main/advance center
router.post('/', async (req, res) => {
    const { studentId, centreAdmin, type } = req.body;

    if (!['main', 'advance'].includes(type)) {
        return res.status(400).json({ error: 'Invalid center type. Use "main" or "advance".' });
    }

    try {
        const centerRes = await client.query(
            'SELECT Centre_ID FROM Centre WHERE Centre_Id = $1',
            [centreAdmin]
        );

        if (centerRes.rows.length === 0) {
            return res.status(404).json({ error: 'Center not found for this admin.' });
        }

        const centreId = centerRes.rows[0].centre_id;

        const column = type === 'main' ? 'Main_Centre_Status' : 'Adv_Centre_Status';
        const fk = type === 'main' ? 'Main_Centre' : 'Adv_Centre';

        const update = await client.query(
            `UPDATE Student SET ${column} = 1 WHERE Student_Id = $1 AND ${fk} = $2`,
            [studentId, centreId]
        );

        if (update.rowCount === 0) {
            return res.status(400).json({ error: `Student is not assigned to this ${type} center.` });
        }

        res.json({ message: `Student reported successfully for ${type} center.` });
    } catch (err) {
        console.error('Error reporting student:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Optional: get all reported students (main or advance)
router.get('/reported', async (req, res) => {
    try {
        const result = await client.query(`
            SELECT Student_Id, First_Name, Last_Name, 
                   CASE 
                       WHEN Main_Centre_Status = 1 THEN 'Main'
                       WHEN Adv_Centre_Status = 1 THEN 'Advance'
                   END AS Status
            FROM Student
            WHERE Main_Centre_Status = 1 OR Adv_Centre_Status = 1
        `);

        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching reported students:', err);
        res.status(500).json({ error: 'Failed to fetch reported students' });
    }
});

module.exports = router;
