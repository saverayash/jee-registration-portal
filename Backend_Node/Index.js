const express = require('express');
const router = express.Router();
const client = require('./Client'); 
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'yashsavera762';



router.post('/login', async (req, res) => {
    const { id, password } = req.body;
   // console.log('Form data received:', { id, password });

    const roleConfigs = {
        Student: { table: 'Student', idCol: 'ID', passCol: 'Password' },
        Admin: { table: 'Admin', idCol: 'Admin_ID', passCol: 'Password' },
        Paper_Setter: { table: 'Paper_Setter', idCol: 'Paper_Setter_ID', passCol: 'Login_Password' },
        Centre: { table: 'Center', idCol: 'Admin_ID', passCol: 'Admin_Password' }
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
        id, password, first_name, mid_name, last_name, dob, gender, category,
        hsc_board_name, hsc_seat_no, adhar_card_no, email, address, pincode
    } = req.body;

    console.log('Signup data received:', req.body);

    try {
        const checkQuery = 'SELECT * FROM Student WHERE ID = $1';
        const checkValues = [id];
        const checkResult = await client.query(checkQuery, checkValues);

        if (checkResult.rows.length > 0) {
            return res.status(400).json({ message: 'Student ID already exists' });
        }

        const insertQuery = `
            INSERT INTO Student (ID, Password, First_Name, Mid_Name, Last_Name, DOB, Gender, Category,
                HSC_Board_Name, HSC_Seat_No, Adhar_Card_No, Email, Address, Pincode)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
        `;
        const insertValues = [
            id, password, first_name, mid_name, last_name, dob, gender, category,
            hsc_board_name, hsc_seat_no, adhar_card_no, email, address, pincode
        ];

        await client.query(insertQuery, insertValues);
        res.status(201).json({ message: 'Signup successful' });
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ message: 'An error occurred during signup', error: err.stack });
    }
});

module.exports = router;
