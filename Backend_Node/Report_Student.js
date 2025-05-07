const express = require('express');
const router = express.Router();
const client = require('./Client');

router.post('/', async (req, res) => {
    const { studentId, adminId } = req.body;

    try {
        const centerResult = await client.query(
            'SELECT Center_ID FROM Center WHERE Admin_ID = $1',
            [adminId]
        );

        if (centerResult.rows.length === 0) {
            return res.status(404).json({ error: 'Center not found for the provided Admin_ID' });
        }

        const centerId = centerResult.rows[0].center_id;

        const update = await client.query(
            'UPDATE Main_center SET Status = 1 WHERE ID = $1 AND Center_ID = $2',
            [studentId, centerId]
        );
        
        if (update.rowCount === 0) {
            return res.status(404).json({ error: 'Student not found in this center or not a main student.' });
        }
        res.json({ message: 'Student reported successfully.' });
    } catch (err) {
        console.error('Error reporting student:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/see', async (req, res) => {
    try {
        const reported = await client.query(`
            SELECT s.ID, s.First_Name, s.Last_Name, m.Status
            FROM Student s
            INNER JOIN Main_center m ON s.ID = m.ID
            WHERE m.Status = 1
        `);

        res.json(reported.rows);
    } catch (err) {
        console.error('Error fetching reported students:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});


module.exports = router;
