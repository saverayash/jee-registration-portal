const express = require('express');
const router = express.Router();
const client = require('./Client');

router.get('/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const centerResult = await client.query(
            'SELECT Centre_ID FROM Centre WHERE Centre_ID = $1',
            [id]
        );

        if (centerResult.rows.length === 0) {
            return res.status(404).json({ error: 'Center not found' });
        }

        const result = await client.query(`
            SELECT 
                s.Student_Id,
                s.First_Name,
                s.Last_Name,
                'Main Center' AS Assignment_Type
            FROM Student s
            WHERE s.Main_Centre = $1

            UNION ALL

            SELECT 
                s.Student_Id,
                s.First_Name,
                s.Last_Name,
                'Advance Center' AS Assignment_Type
            FROM Student s
            WHERE s.Adv_Centre = $1
        `, [id]);

        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching students for center:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});


module.exports = router;
