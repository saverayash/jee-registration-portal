const express = require('express');
const router = express.Router();
const client = require('./Client'); 
const jwt = require('jsonwebtoken');

const roleConfigs = {
    Student: { table: 'Student', idCol: 'ID', passCol: 'Password' },
    Admin: { table: 'Admin', idCol: 'Admin_ID', passCol: 'Password' },
    Paper_Setter: { table: 'Paper_Setter', idCol: 'Paper_Setter_ID', passCol: 'Login_Password' },
    Centre: { table: 'Center', idCol: 'Admin_ID', passCol: 'Admin_Password' }
};

router.post('/', async (req, res) => {
    const { oldPassword, newPassword, id, role } = req.body;

   // console.log(oldPassword + " " + newPassword + " " + id + " " + role);

    if (!roleConfigs[role]) {
        return res.status(400).json({ message: 'Invalid role' });
    }

    const { table, idCol, passCol } = roleConfigs[role];

    try {
        const selectQuery = `SELECT * FROM ${table} WHERE ${idCol} = $1 AND ${passCol} = $2`;
        const selectValues = [id, oldPassword];
        const selectResult = await client.query(selectQuery, selectValues);

        if (selectResult.rows.length === 0) {
            return res.status(401).json({ message: 'Old password is incorrect' });
        }

        const updateQuery = `UPDATE ${table} SET ${passCol} = $1 WHERE ${idCol} = $2`;
        const updateValues = [newPassword, id];
        await client.query(updateQuery, updateValues);

        return res.json({ message: 'Password updated successfully' });
    } catch (err) {
        console.error('Error during password change:', err);
        res.status(500).json({ message: 'An error occurred', error: err.stack });
    }
});

module.exports = router;
