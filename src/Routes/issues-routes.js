const express = require('express');
const router = express.Router();
const { getIssues, createIssue, updateIssue, lockIssue } = require('../Routes/issues')

router.get('/', async (req, res) => {
    try {
        let issues = await getIssues();
        res.status(200).json(issues);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.post('/', async (req, res) => {
    try {
        const { issueTitle, issueDescription } = req.body;
        let result = await createIssue(issueTitle, issueDescription);
        res.status(201).json(result); 
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.patch('/:issueNumber', async (req, res) => {
    try {
        const { issueNumber } = req.params;
        const { issueTitle, issueDescription } = req.body;
        let result = await updateIssue(issueNumber, issueTitle, issueDescription);
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
