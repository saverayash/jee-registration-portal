const express = require('express');
const router = express.Router();
const client = require('./Client');

router.get('/:id', async (req, res) => {
    const studentId = req.params.id;

    try {
        const studentQuery = await client.query(
            `SELECT Main_Centre, Adv_Centre FROM Student WHERE Student_Id = $1`,
            [studentId]
        );

        if (studentQuery.rows.length === 0) {
            return res.status(404).json({ error: 'Student not found' });
        }

        const { main_centre, adv_centre } = studentQuery.rows[0];

        // Fetch Main Centre details
        const mainCenterQuery = main_centre
            ? await client.query(
                  `SELECT Centre_Name, Centre_Email, Centre_Number FROM Centre WHERE Centre_Id = $1`,
                  [main_centre]
              )
            : { rows: [] };

        // Fetch Advance Centre details
        const advCenterQuery = adv_centre
            ? await client.query(
                  `SELECT Centre_Name, Centre_Email, Centre_Number FROM Centre WHERE Centre_Id = $1`,
                  [adv_centre]
              )
            : { rows: [] };

        res.json({
            mainCenter: mainCenterQuery.rows[0] || null,
            advCenter: advCenterQuery.rows[0] || null,
        });
    } catch (err) {
        console.error('Error fetching center details:', err);
        res.status(500).json({ error: 'Error fetching center details' });
    }
});

module.exports = router;
