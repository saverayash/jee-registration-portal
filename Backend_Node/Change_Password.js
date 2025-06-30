const express = require('express');
const router = express.Router();
const client = require('./Client'); 
const jwt = require('jsonwebtoken');

const roleConfigs = {
    Student: { table: 'student', idCol: 'student_id', passCol: 'password' },
    Admin: { table: 'admin', idCol: 'admin_id', passCol: 'password' },
    Paper_Setter: { table: 'paper_setter', idCol: 'paper_setter_id', passCol: 'password' },
    Centre: { table: 'centre', idCol: 'centre_id', passCol: 'centre_password' }
};

router.post('/', async (req, res) => {
    const { oldPassword, newPassword, id, role } = req.body;

    if (!role || !roleConfigs[role]) {
        return res.status(400).json({ message: 'Invalid role' });
    }

    const { table, idCol, passCol } = roleConfigs[role];

    try {
        // Step 1: Verify old password
        const selectQuery = `SELECT * FROM ${table} WHERE ${idCol} = $1 AND ${passCol} = $2`;
        const selectValues = [id, oldPassword];
        const selectResult = await client.query(selectQuery, selectValues);

        if (selectResult.rows.length === 0) {
            return res.status(401).json({ message: 'Old password is incorrect' });
        }

        // Step 2: Update to new password
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
