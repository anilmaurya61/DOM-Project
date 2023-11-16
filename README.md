# GitHub API CRUD Application

This application allows you to perform CRUD operations on GitHub issues for a specific repository using the GitHub API.

## Prerequisites

Before you begin, ensure you have the following:

- GitHub Personal Access Token: Generate a token with the necessary permissions to access and modify issues in your repository.

- Repository Owner and Name: Identify the owner and name of the repository where you want to perform CRUD operations.

- Port: Choose a port number for running the application locally. (e.g., 8080)

- Environment Variables: Create a `.env` file in the project root with the following variables:

  ```env
  ACCESS_TOKEN=your_github_personal_access_token
  OWNER=repository_owner
  REPO=repository_name
  PORT=chosen_port
  ```
  
### Installation
  1. Clone the repository:
  ```ruby
    git clone https://github.com/anilmaurya61/DOM-project.git
  ```
  2. Navigate to the project directory:
  ```ruby
    cd DOM-project
  ```
  3. Install dependencies:
  ```ruby
    npm install
  ```
  4. Start the application:
  ```ruby
    npm start
  ```
