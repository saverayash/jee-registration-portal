const express = require('express');
const router = express.Router();
const client = require('./Client'); 

router.get('/:studentId', async (req, res) => {
    const { studentId } = req.params;

    try {
        const mainQuery = `
            SELECT m.Center_ID, c.Center_Name, c.Address, m.Status
            FROM Main_center m
            JOIN Center c ON m.Center_ID = c.Center_ID
            WHERE m.ID = $1
        `;
        const mainResult = await client.query(mainQuery, [studentId]);

        const advQuery = `
            SELECT a.Center_ID, c.Center_Name, c.Address
            FROM Adv_center a
            JOIN Center c ON a.Center_ID = c.Center_ID
            WHERE a.ID = $1
        `;
        const advResult = await client.query(advQuery, [studentId]);

        res.json({
            mainCenter: mainResult.rows[0] || null,
            advCenter: advResult.rows[0] || null
        });

    } catch (error) {
        console.error('Error fetching center info:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
