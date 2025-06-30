const express = require('express');
const router = express.Router();
const client = require('./Client');

router.post('/', async (req, res) => {
    const { role, ...data } = req.body;

    try {
        if (role === 'Centre') {
            const {
                Centre_Name, Centre_Admin, Centre_Password,
                Centre_Number, Centre_Email, Area, City_Id, Pincode
            } = data;

            // 1. Insert into Address table
            const addressResult = await client.query(
                `INSERT INTO Address (Area, City_Id, Pincode)
                 VALUES ($1, $2, $3) RETURNING Address_Id`,
                [Area, City_Id, Pincode]
            );
            const address_id = addressResult.rows[0].address_id;

            // 2. Insert into Centre table
            await client.query(
                `INSERT INTO Centre (Centre_Name, Centre_Admin, Centre_Password, Centre_Number, Centre_Email)
                 VALUES ($1, $2, $3, $4, $5)`,
                [Centre_Name, Centre_Admin, Centre_Password, Centre_Number, Centre_Email]
            );

        } else if (role === 'Paper_Setter') {
            const {
                Paper_Setter_Id,Password, Full_Name, Qualification,
                University, Email_Id
            } = data;

            await client.query(
                `INSERT INTO Paper_Setter (Paper_Setter_Id,Password, Full_Name, Qualification, University, Email_Id)
                 VALUES ($1, $2, $3, $4, $5,$6)`,
                [Paper_Setter_Id,Password, Full_Name, Qualification, University, Email_Id]
            );

        } else {
            return res.status(400).json({ message: 'Invalid role' });
        }

        res.status(201).json({ message: `${role} added successfully` });
    } catch (err) {
        console.error('Error inserting user:', err);
        res.status(500).json({ message: 'Error adding user', error: err.stack });
    }
});

module.exports = router;
