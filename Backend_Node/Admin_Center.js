const express = require('express');
const router = express.Router();
const client = require('./Client');

// ========================
// Get all centers
// ========================
router.get('/centers', async (req, res) => {
    try {
        const result = await client.query('SELECT * FROM Centre');
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching centers:', err);
        res.status(500).json({ error: 'Failed to fetch centers' });
    }
});

// ========================
// Get all students
// ========================
router.get('/students', async (req, res) => {
    try {
        const result = await client.query('SELECT student_id, first_name, last_name FROM Student');
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching students:', err);
        res.status(500).json({ error: 'Failed to fetch students' });
    }
});

// ========================
// Assign main center
// ========================
router.post('/assign/main', async (req, res) => {
    const { studentId, centerId } = req.body;

    try {
        await client.query(
            `UPDATE Student SET Main_Centre = $1 WHERE Student_Id = $2`,
            [centerId, studentId]
        );
        res.json({ message: 'Main Center assigned successfully' });
    } catch (err) {
        console.error('Error assigning main center:', err);
        res.status(500).json({ error: 'Failed to assign main center' });
    }
});

// ========================
// Assign advance center
// ========================
router.post('/assign/advance', async (req, res) => {
    const { studentId, centerId } = req.body;

    try {
        await client.query(
            `UPDATE Student SET Adv_Centre = $1 WHERE Student_Id = $2`,
            [centerId, studentId]
        );
        res.json({ message: 'Advance Center assigned successfully' });
    } catch (err) {
        console.error('Error assigning advance center:', err);
        res.status(500).json({ error: 'Failed to assign advance center' });
    }
});

module.exports = router;
