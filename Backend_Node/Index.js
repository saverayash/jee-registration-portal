const express = require('express');
const router = express.Router();
const client = require('./Client'); 
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'yashsavera762';

// ===================== LOGIN =====================
router.post('/login', async (req, res) => {
    const { id, password } = req.body;

    const roleConfigs = {
        Student: { table: 'student', idCol: 'student_id', passCol: 'password' },
        Admin: { table: 'admin', idCol: 'admin_id', passCol: 'password' },
        Paper_Setter: { table: 'paper_setter', idCol: 'paper_setter_id', passCol: 'password' },
        Centre: { table: 'centre', idCol: 'centre_id', passCol: 'centre_password' }
    };

    try {
        for (const role in roleConfigs) {
            const { table, idCol, passCol } = roleConfigs[role];
            const query = `SELECT * FROM ${table} WHERE ${idCol} = $1 AND ${passCol} = $2`;
            const values = [id, password];

            const result = await client.query(query, values);

            if (result.rows.length > 0) {
                const user = result.rows[0];
                const token = jwt.sign(
                    { id: user[idCol], role },
                    SECRET_KEY,
                    { expiresIn: '1h' }
                );
                return res.json({ message: 'Login successful', role, token });
            }
        }
        res.status(401).json({ message: 'Invalid ID or password' });
    } catch (err) {
        console.error('Error during login:', err);
        res.status(500).json({ message: 'An error occurred', error: err.stack });
    }
});

router.post('/signup', async (req, res) => {
    const {
        id, password, first_name, middle_name, last_name, dob, gender, category,
        hsc_board_name, hsc_seat_no, aadhar_card_no, email, phone_no,
        area, city_id, pincode
    } = req.body;

    try {
        // Use id for student_id
        const checkQuery = 'SELECT * FROM Student WHERE student_id = $1';
        const checkResult = await client.query(checkQuery, [id]);

        if (checkResult.rows.length > 0) {
            return res.status(400).json({ message: 'Student ID already exists' });
        }

        const addressQuery = `
            INSERT INTO Address (area, city_id, pincode)
            VALUES ($1, $2, $3) RETURNING address_id
        `;
        const addressValues = [area, city_id, pincode];
        const addressResult = await client.query(addressQuery, addressValues);
        const address_id = addressResult.rows[0].address_id;

        const insertQuery = `
            INSERT INTO Student (
                student_id, password, first_name, middle_name, last_name, dob, gender, category,
                hsc_board_name, hsc_seat_no, aadhar_card_no, email, phone_no,
                adv_centre, main_centre, address_id, main_centre_status, adv_centre_status
            ) VALUES (
                $1, $2, $3, $4, $5, $6, $7, $8,
                $9, $10, $11, $12, $13,
                NULL, NULL, $14, 0, 0
            )
        `;

        const insertValues = [
            id, password, first_name, middle_name, last_name, dob, gender, category,
            hsc_board_name, hsc_seat_no, aadhar_card_no, email, phone_no,
            address_id
        ];

        await client.query(insertQuery, insertValues);
        res.status(201).json({ message: 'Signup successful' });
    } catch (err) {
        console.error('Signup Error:', err);
        res.status(500).json({ message: 'An error occurred during signup', error: err.stack });
    }
});

// ===================== COUNTRY =====================
router.get('/countries', async (req, res) => {
    try {
        const result = await client.query('SELECT * FROM Country ORDER BY country_name');
        // console.log(result.rows);
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching countries:', err);
        res.status(500).json({ error: 'Failed to fetch countries' });
    }
});

// ===================== STATE =====================
router.get('/states/:countryId', async (req, res) => {
    const { countryId } = req.params;
    try {
        const result = await client.query('SELECT * FROM State WHERE country_id = $1 ORDER BY state_name', [countryId]);
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching states:', err);
        res.status(500).json({ error: 'Failed to fetch states' });
    }
});

// ===================== DISTRICT =====================
router.get('/districts/:stateId', async (req, res) => {
    const { stateId } = req.params;
    try {
        const result = await client.query('SELECT * FROM District WHERE state_id = $1 ORDER BY district_name', [stateId]);
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching districts:', err);
        res.status(500).json({ error: 'Failed to fetch districts' });
    }
});

// ===================== CITY =====================
router.get('/cities/:districtId', async (req, res) => {
    const { districtId } = req.params;
    try {
        const result = await client.query('SELECT * FROM City WHERE district_id = $1 ORDER BY city_name', [districtId]);
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching cities:', err);
        res.status(500).json({ error: 'Failed to fetch cities' });
    }
});
module.exports = router;
