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
    console.log('Issue get successfully:', response.data);
  } catch (error) {
    console.error('Error creating issue:', error.message);
  }
}


async function createdIssue() {
  const octokit = new Octokit({
    auth: ACCESS_TOKEN
  })
  try {
    await octokit.request('POST /repos/{owner}/{repo}/issues', {
      owner: OWNER,
      repo: REPO,
      title: 'Found a bug 3',
      body: 'Problem With Images.',
    })
  }
  catch (e) {
    console.log(e);
  }
}

async function updateIssue() {
  const octokit = new Octokit({
    auth: ACCESS_TOKEN
  })

  await octokit.request('PATCH /repos/{owner}/{repo}/issues/{issue_number}', {
    owner: OWNER,
    repo: REPO,
    issue_number: '2',
    title: 'This is Dheeraj',
  })
}

async function lockIssue() {
const octokit = new Octokit({
  auth: ACCESS_TOKEN
})

await octokit.request('PUT /repos/{owner}/{repo}/issues/{issue_number}/lock', {
  owner: OWNER,
  repo: REPO,
  issue_number: '1',
  lock_reason: 'off-topic',
  headers: {
    'X-GitHub-Api-Version': '2022-11-28'
  }
})
}

async function unlockIssue(){
const octokit = new Octokit({
  auth: ACCESS_TOKEN
})

await octokit.request('DELETE /repos/{owner}/{repo}/issues/{issue_number}/lock', {
  owner: OWNER,
    repo: REPO,
    issue_number: '1',
  headers: {
    'X-GitHub-Api-Version': '2022-11-28'
  }
})
}

// getIssues();
// createdIssue();
// updateIssue();
// lockIssue();
// unlockIssue();