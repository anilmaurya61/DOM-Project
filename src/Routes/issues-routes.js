const { Octokit } = require('@octokit/core');
const express = require('express');
const router = express.Router();

require('dotenv').config()
const { ACCESS_TOKEN, OWNER, REPO } = process.env;


router.get('/', async (req, res) => {
    const octokit = new Octokit({
        auth: ACCESS_TOKEN
    });

    try {
        const response = await octokit.request('GET /repos/anilmaurya61/DOM-project/issues', {
            owner: OWNER,
            repo: REPO,
        });
        res.status(200).json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.post('/', async (req, res) => {
    const { issueTitle, issueDescription } = req.body;
    const octokit = new Octokit({
        auth: ACCESS_TOKEN
    })
    try {
        let response = await octokit.request('POST /repos/{owner}/{repo}/issues', {
            owner: OWNER,
            repo: REPO,
            title: issueTitle,
            body: issueDescription,
        })
        res.status(200).json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.patch('/:issueNumber', async (req, res) => {
    try {
        const { issueNumber } = req.params;
        const { issueTitle, issueDescription } = req.body;
        const octokit = new Octokit({
            auth: ACCESS_TOKEN
        })

        let response = await octokit.request('PATCH /repos/{owner}/{repo}/issues/{issue_number}', {
            owner: OWNER,
            repo: REPO,
            issue_number: issueNumber,
            title: issueTitle,
            body: issueDescription,
        })
        res.status(200).json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.patch('/delete/:issueNumber', async (req, res) => {
    try {
        const { issueNumber } = req.params
        const octokit = new Octokit({
            auth: ACCESS_TOKEN
        })

        let response = await octokit.request('PATCH /repos/{owner}/{repo}/issues/{issue_number}', {
            owner: OWNER,
            repo: REPO,
            issue_number: issueNumber,
            state: 'closed',
            state_reason: 'completed',
            headers: {
                'X-GitHub-Api-Version': '2022-11-28'
            }
        })
        res.status(200).json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
