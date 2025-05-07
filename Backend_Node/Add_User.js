const express = require('express');
const router = express.Router();
const client = require('./Client');

router.post('/', async (req, res) => {
    const { role, ...data } = req.body;

    try {
        if (role === 'Centre') {
            const {
                Center_ID, Center_Name, Address, Building_Name, Pincode,
                Center_Admin, Admin_ID, Admin_Password, Admin_Number, Admin_Email
            } = data;

            await client.query(
                `INSERT INTO Center (Center_ID, Center_Name, Address, Building_Name, Pincode, Center_Admin, Admin_ID, Admin_Password, Admin_Number, Admin_Email)
                 VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`,
                [Center_ID, Center_Name, Address, Building_Name, Pincode, Center_Admin, Admin_ID, Admin_Password, Admin_Number, Admin_Email]
            );

        } else if (role === 'Paper_Setter') {
            const {
                Paper_Setter_ID, Paper_ID, Login_Password, Full_Name,
                Qualification, College_University, Email_id
            } = data;

            await client.query(
                `INSERT INTO Paper_Setter (Paper_Setter_ID, Paper_ID, Login_Password, Full_Name, Qualification, College_University, Email_id)
                 VALUES ($1,$2,$3,$4,$5,$6,$7)`,
                [Paper_Setter_ID, Paper_ID, Login_Password, Full_Name, Qualification, College_University, Email_id]
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
