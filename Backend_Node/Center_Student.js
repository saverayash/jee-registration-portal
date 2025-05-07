const express = require('express');
const router = express.Router();
const client = require('./Client');

router.get('/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const centerResult = await client.query(
            'SELECT Center_ID FROM Center WHERE Admin_ID = $1',
            [id]
        );

        if (centerResult.rows.length === 0) {
            return res.status(404).json({ error: 'Center not found for the provided Admin_ID' });
        }

        const centerId = centerResult.rows[0].center_id;

        const result = await client.query(`
            SELECT 
                s.ID, 
                s.First_Name, 
                s.Last_Name,
                CASE 
                    WHEN m.Center_ID = $1 THEN 'Main Center'
                    WHEN a.Center_ID = $1 THEN 'Advance Center'
                END AS Assignment_Type
            FROM Student s
            LEFT JOIN Main_center m ON s.ID = m.ID
            LEFT JOIN Adv_center a ON s.ID = a.ID
            WHERE m.Center_ID = $1 OR a.Center_ID = $1
        `, [centerId]);

        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching students for center:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
