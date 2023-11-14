const express = require('express');
const router = express.Router();
const { getIssues, createdIssue, updateIssue, lockIssue } = require('../Routes/issues')

router.get('/', async (req, res) => {
    try {
        let result = await getIssues();
        res.status(200).json(result);
    } catch (error) {
        console.error("Error in handling the request:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});



module.exports = router;