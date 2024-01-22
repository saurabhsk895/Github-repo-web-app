# GitHub User Repository Viewer

## Overview

This web application allows users to view repositories of a GitHub user by entering their username. It utilizes the GitHub API to fetch user details and repositories dynamically.

## Features

1. **User Profile Display:**
   - Upon entering a GitHub username and clicking the "Get Repositories" button, the application fetches and displays the user's profile information, including their avatar, name, bio, and location.

2. **Repository Listing:**
   - The application fetches the repositories of the specified GitHub user and displays them in a clean card-based layout. Each card includes the repository name, description, and a list of programming languages used.

3. **Dynamic Pagination:**
   - The repositories are paginated to enhance user experience. The app dynamically adjusts the pagination based on the total number of repositories, ensuring an efficient and user-friendly browsing experience.

## Why GitHub API?

The GitHub API is utilized to access information about a GitHub user and their repositories in a programmatic way. This allows the application to dynamically fetch and display up-to-date data directly from GitHub. The API is crucial for real-time information retrieval, ensuring users get the latest details without the need for manual updates.

## How to Use

1. Enter the GitHub username in the provided input field.
2. Click the "Get Repositories" button.
3. Explore the displayed user profile and repositories.

## Technologies Used

- HTML
- CSS (Bootstrap for styling)
- JavaScript
- GitHub API

## Notes

- This application is built as part of an assignment and serves as a simple GitHub repository viewer.
- The use of the GitHub API requires a valid personal access token for authentication.
- Pagination is implemented to manage large sets of repositories effectively.

Feel free to explore, contribute, and enhance this application for more advanced features!
