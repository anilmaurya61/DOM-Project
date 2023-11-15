const createdIssueBtn = document.getElementById("create-issue-btn");
const getIssueBtn = document.getElementById("get-issue-btn");
const deleteIssueBtn = document.getElementById("delete-issue-btn");
const container = document.querySelector(".issuesBox");
const saveIssueBtn = document.querySelector(".new-issue-btn");

let issueHtml = `
<div class="issue-container">
    <div class="issues">
        <h3>Found a Bug</h3>
        <div class="issue-description">
            <p class="description">This is the description of the issue...</p>
        </div>
        <p class="info">#4 opened 1 hour ago by anilmaurya61</p>
    </div>
    <div class="issues-btn">
        <span><a id="update-issue-btn" href="#" onclick="updateIssue(event)">Update</a></span>
        <span><a id="delete-issue-btn" href="#" onclick="deleteIssue(event)">Delete</a></span>
    </div>
</div>
`;

let parser = new DOMParser();
let issueElement = parser.parseFromString(issueHtml, 'text/html').body.firstChild;


function calcTime(time) {

    let startTime = new Date(time);

    let currentDate = new Date();
    if (!isNaN(startTime.getTime())) {
        let timeDifferenceInMilliseconds = currentDate - startTime;
        if (timeDifferenceInMilliseconds >= 24 * 60 * 60 * 1000) {
            let timeDifferenceInDays = (timeDifferenceInMilliseconds / (1000 * 60 * 60 * 24)).toFixed(0);
            return `${timeDifferenceInDays} days`;
        } else {
            let timeDifferenceInHours = (timeDifferenceInMilliseconds / (1000 * 60 * 60)).toFixed(0);
            return `${timeDifferenceInHours} hours`;
        }
    } else {
        return "#";
    }
}

function appendIssues(issues) {
    for (let i = 0; i < issues.length; i++) {
        let issue = issues[i];
        let time = calcTime(issue.time);

        let issueElement = document.createElement('div');
        issueElement.innerHTML = issueHtml;

        issueElement.querySelector('.issues h3').innerText = issue.issueTitle;
        issueElement.querySelector('.description').innerText = issue.issueDescription;
        issueElement.querySelector('.info').innerText = `#${issue.issueNumber} opened ${time} ago by anilmaurya61`;

        let updateButton = issueElement.querySelector('#update-issue-btn');
        updateButton.setAttribute('onclick', `updateIssue(event, '${issue.issueTitle}', ${issue.issueNumber}, '${issue.issueDescription}')`);

        let deleteButton = issueElement.querySelector('#delete-issue-btn');
        deleteButton.setAttribute('onclick', `deleteIssue(${issue.issueNumber})`);

        container.appendChild(issueElement);
    }
}

function getIssueList(issues) {
    let issuesList = [];
    for (let i = 0; i < issues.length; i++) {
        const issue = issues[i];
        issuesList.push({
            "issueNumber": issue.number,
            "issueTitle": issue.title,
            "issueDescription": issue.body,
            "time": issue.created_at
        });
    }
    return issuesList;
}

document.addEventListener("DOMContentLoaded", async () => {
    try {
        let response = await fetch('/issues');
        let issues = await response.json();
        let issuesList = getIssueList(issues);
        appendIssues(issuesList);
    } catch (error) {
        console.error("Error fetching issues:", error);
    }
});

getIssueBtn.addEventListener("click", async () => {
    location.reload();
})

createdIssueBtn.addEventListener("click", () => {
    document.querySelector(".issues-input").style.display = "block";
})

saveIssueBtn.addEventListener("click", async () => {
    let title = document.getElementById('issue-title').value;
    let description = document.getElementById('issue-description').value;
    console.log(description, title);
    let response = await fetch('./issues', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "issueTitle": title,
            "issueDescription": description
        }),
    });

    if (response.ok) {
        console.log("Issue saved successfully");
    } else {
        console.error("Failed to save issue");
    }
});

function updateIssue(event, title, issueNumber, description) {

    document.querySelector(".issues-input").style.display = "block";

    document.getElementById('issue-title').value = title;
    document.getElementById('issue-description').value = description;

    const newIssueBtn = document.querySelector('.new-issue-btn');
    newIssueBtn.classList.remove('new-issue-btn');

    document.querySelector(".patch-issue-btn").addEventListener('click', async () => {

        let title = document.getElementById('issue-title').value;
        let description = document.getElementById('issue-description').value;

        let response = await fetch(`./issues/${issueNumber}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "issueTitle": title,
                "issueDescription": description,
            }),
        });
    });
    event.preventDefault();
}

async function deleteIssue(issueNumber) {
    let response = await fetch(`./issues/delete/${issueNumber}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
        },
    });
}