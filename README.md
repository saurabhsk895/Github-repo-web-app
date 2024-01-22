# GitHub Repository Web App

## Overview

This web application allows you to fetch and display repositories of a GitHub user. It provides a user-friendly interface to explore a user's profile, repositories, and pagination features.

## Features

- **Profile Information:** View the user's avatar, name, bio, and location.

- **Repositories:** Fetch and display the repositories of a GitHub user with details like repository name, description, and programming languages used.

- **Pagination:** Navigate through the user's repositories using pagination controls.


### Instructions

1. Clone the repository to your local machine:

    ```bash
    git clone https://github.com/saurabhsk895/Github-repo-web-app.git
    ```

2. Navigate to the project directory:

    ```bash
    cd Github-repo-web-app
    ```

3. Open the `script.js` file in a code editor.

4. Locate the following line:

    ```script.js
    const accessToken = 'YOUR_PERSONAL_ACCESS_TOKEN'; 
    ``` (at lines 6 and 102),

5. Replace `'YOUR_PERSONAL_ACCESS_TOKEN'` with your GitHub Personal Access Token. You can generate a token [here](https://github.com/settings/tokens).

6. Save the changes.

### Notes

- The application uses Bootstrap for styling, jQuery for DOM manipulation, and the GitHub API for fetching user data and repositories.

- Ensure that your Personal Access Token has the necessary permissions to access public user information.
