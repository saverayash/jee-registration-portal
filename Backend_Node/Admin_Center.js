const express = require('express');
const router = express.Router();
const client = require('./Client');

router.get('/centers', async (req, res) => {
    try {
        const result = await client.query('SELECT * FROM Center');
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching centers', err);
        res.status(500).json({ error: 'Failed to fetch centers' });
    }
});

router.get('/students', async (req, res) => {
    try {
        const result = await client.query('SELECT ID FROM Student');
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching students', err);
        res.status(500).json({ error: 'Failed to fetch students' });
    }
});

router.post('/assign/main', async (req, res) => {
    const { studentId, centerId, status } = req.body;
    try {
        await client.query(`
            INSERT INTO Main_center (ID, Center_ID, Status)
            VALUES ($1, $2, $3)
            ON CONFLICT (ID) DO UPDATE SET Center_ID = $2, Status = $3
        `, [studentId, centerId, status]);
        res.json({ message: 'Main Center assigned successfully' });
    } catch (err) {
        console.error('Error assigning main center', err);
        res.status(500).json({ error: 'Failed to assign main center' });
    }
});

router.post('/assign/advance', async (req, res) => {
    const { studentId, centerId } = req.body;
    try {
        await client.query(`
            INSERT INTO Adv_center (ID, Center_ID)
            VALUES ($1, $2)
            ON CONFLICT (ID) DO UPDATE SET Center_ID = $2
        `, [studentId, centerId]);
        res.json({ message: 'Advance Center assigned successfully' });
    } catch (err) {
        console.error('Error assigning advance center', err);
        res.status(500).json({ error: 'Failed to assign advance center' });
    }
});

module.exports = router;
