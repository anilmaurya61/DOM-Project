const { Octokit } = require('@octokit/core');
require('dotenv').config()

const { ACCESS_TOKEN, OWNER, REPO } = process.env;


async function getIssues() {
  const octokit = new Octokit({
    auth: ACCESS_TOKEN
  });

  try {
    const response = await octokit.request('GET /repos/anilmaurya61/DOM-project/issues', {
      owner: OWNER,
      repo: REPO,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}


async function createIssue(issueTitle, issueDescription) {
  const octokit = new Octokit({
    auth: ACCESS_TOKEN
  })
  try {
    await octokit.request('POST /repos/{owner}/{repo}/issues', {
      owner: OWNER,
      repo: REPO,
      title: issueTitle,
      body: issueDescription,
    })
  }
  catch (e) {
    throw e;
  }
}

async function updateIssue(issueNumber, newTitle, newDescription) {
  const octokit = new Octokit({
    auth: ACCESS_TOKEN
  })

  await octokit.request('PATCH /repos/{owner}/{repo}/issues/{issue_number}', {
    owner: OWNER,
    repo: REPO,
    issue_number: issueNumber,
    title: newTitle,
    body: newDescription,
  })
}

async function deleteIssue(issueNumber) {
  const octokit = new Octokit({
    auth: ACCESS_TOKEN
  })

  await octokit.request('PATCH /repos/{owner}/{repo}/issues/{issue_number}', {
    owner: OWNER,
    repo: REPO,
    issue_number: issueNumber,
    state: 'closed',
    state_reason: 'completed',
    headers: {
      'X-GitHub-Api-Version': '2022-11-28'
    }
  })
}

module.exports = { getIssues, createIssue, updateIssue, deleteIssue }