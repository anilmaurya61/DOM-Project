const createdIssueBtn = document.getElementById("create-issue-btn");
const getIssueBtn = document.getElementById("get-issue-btn");
const container = document.querySelector(".issuesBox");
const saveIssueBtn = document.querySelector(".save-btn");
const message = document.querySelector(".success-msg");


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

// Function for popupBox
async function popupBox(title, text) {
    await Swal.fire({
        icon: 'success',
        title: title,
        text: text,
        timer: 1500,
        timerProgressBar: true,
        showConfirmButton: false,
    });
}

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
    container.innerHTML = '';

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

async function getIssue(event){
    let response = await fetch('/issues');
    let issues = await response.json();

    let issuesList = getIssueList(issues.data);
    appendIssues(issuesList);
    event.stopImmediatePropagation();
}
document.addEventListener("DOMContentLoaded", async (event) => {
    try {
       getIssue(event)
    } catch (error) {
        console.error("Error fetching issues:", error);
    }
});

getIssueBtn.addEventListener("click", async (event) => {
    getIssue(event);
});

createdIssueBtn.addEventListener("click", (event) => {
    document.querySelector(".issues-input").style.display = "block";
    saveIssueBtn.classList.add("new-issue-btn");
    event.stopImmediatePropagation();
});

saveIssueBtn.addEventListener("click", async (event) => {
    let title = document.getElementById('issue-title').value;
    let description = document.getElementById('issue-description').value;
    document.querySelector('.issues-input').style.display = 'none';

    try {
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

        if (response.status == 200) {
            await popupBox("Issue Created!", "Issue Created successfully.")
            await Swal.close();
            location.reload();
        }
    } catch (error) {
        console.error('Error creating issue:', error);
    }
    event.stopImmediatePropagation();
});

function updateIssue(event, title, issueNumber, description) {
    document.querySelector(".issues-update").style.display = "block";

    document.getElementById('updated-issue-title').value = title;
    document.getElementById('updated-issue-description').value = description;

    document.querySelector(".update-btn").addEventListener('click', async () => {
        let updatedTitle = document.getElementById('updated-issue-title').value;
        let updatedDescription = document.getElementById('updated-issue-description').value;

        try {
            let response = await fetch(`./issues/${issueNumber}`, {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    "issueTitle": updatedTitle,
                    "issueDescription": updatedDescription,
                }),
            });
            if (response.status == 200) {
                await popupBox("Issue Updated!", "Issue Updated successfully.")
                await Swal.close();
                location.reload();
            }
        } catch (error) {
            console.error('Error updating issue:', error);
        }
    });
}

async function deleteIssue(issueNumber) {
    try {
        let response = await fetch(`./issues/delete/${issueNumber}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (response.status == 200) {
            await popupBox("Issue Deleted!", "Issue Deleted successfully.")
            await Swal.close();
            location.reload();
        }
    } catch (error) {
        location.reload();
        console.error('Error deleting issue:', error);
    }
}
