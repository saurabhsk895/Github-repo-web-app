const perPage = 10; // Number of repositories to display per page
let currentPage = 1; 

function getRepository() {
  const username = document.getElementById('username').value;
  const accessToken = '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'; // personal access token
  
  document.getElementById('loader').style.display = 'block';

  // Fetch user information
  fetch(`https://api.github.com/users/${username}`, {
    headers: {
      'User-Agent': 'github-page',
      'Authorization': `Bearer ${accessToken}`
    }
  })
    .then(response => response.json())
    .then(userData => {
      const totalRepos = userData.public_repos; // Get the total number of repositories
      document.getElementById('loader').style.display = 'none';

      // Display profile information
      document.getElementById('avatar').src = userData.avatar_url;
      document.getElementById('name').innerText = userData.name || userData.login;
      document.getElementById('bio').innerText = userData.bio || 'No bio available';
      document.getElementById('location').innerText = userData.location || 'Location not specified';
      document.getElementById('profile_link').href = userData.html_url;
      document.getElementById('profile_text').textContent = userData.html_url;
      document.querySelector('.profile-url').style.display = 'flex';

      // Show the profile information anddisplay user repositories
      document.getElementById('profile').style.display = 'block';
      
      fetchRepositories(username, accessToken, totalRepos);
    })
    .catch(error => {
      // Hide loader on error
      document.getElementById('loader').style.display = 'none';
      console.error('Error fetching user information:', error);
    });
}

function fetchRepositories(username, accessToken, totalRepos) {
  
  // Show loader
  document.getElementById('loader').style.display = 'block';

  // Fetch repositoris for the specified page
  fetch(`https://api.github.com/users/${username}/repos?per_page=${perPage}&page=${currentPage}`, {
    headers: {
      'User-Agent': 'github-page',
      'Authorization': `Bearer ${accessToken}`
    }
  })
    .then(response => response.json())
    .then(repos => {
      // Hide loader
      document.getElementById('loader').style.display = 'none';
      if (repos.length > 0) {
        // Display user repositories only if there are repositories
        document.getElementById('repositories').style.display = 'block';
        displayRepositories(repos);
        displayPagination(username, accessToken, totalRepos);
      } else {
        // Hide the contaner if there are no repos
        document.getElementById('repositories').style.display = 'none';
      } 
      
      displayRepositories(repos);
      displayPagination(username, accessToken, totalRepos);
    })
    .catch(error => {
      // Hide loader on error
      document.getElementById('loader').style.display = 'none';
      console.error('Error fetching repositories:', error);
    });
    
}

function displayRepositories(repos) {
  
  const repoCardsContainer = document.getElementById('repoCards');
  repoCardsContainer.innerHTML = '';

  repos.forEach(repo => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <div class="card-body">
        <h5 class="card-title">${repo.name}</h5>
        <p class="card-text">${repo.description || 'No description available'}</p>
        <div class="languages" id="${repo.name}-languages"></div>
      </div>
    `;
    repoCardsContainer.appendChild(card);

    fetchLanguages(repo.owner.login, repo.name);
  });
}

function fetchLanguages(owner, repoName) {
  const accessToken = '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'; // Personal access token

  fetch(`https://api.github.com/repos/${owner}/${repoName}/languages`, {
    headers: {
      'User-Agent': 'github-page',
      'Authorization': `Bearer ${accessToken}`
    }
  })
    .then(response => response.json())
    .then(languages => {
      const languagesContainer = document.getElementById(`${repoName}-languages`);

      // Iterate through languges and create badges with Bootstrap class
      Object.keys(languages).forEach(language => {
        const badge = document.createElement('span');
        badge.className = 'badge text-bg-primary m-1'; // Bootstrap class
        badge.innerText = language;
        languagesContainer.appendChild(badge);
      });
    })
    .catch(error => {
      console.error(`Error fetching languages for ${repoName}:`, error);
    });
}

function displayPagination(username, accessToken, totalRepos) {
    document.getElementById('pagination').style.display = 'flex';
    const paginationContainer = document.getElementById('pagination');
    paginationContainer.innerHTML = '';
  
    const totalPages = Math.ceil(totalRepos / perPage);
  
    const prevButton = document.createElement('button');
    prevButton.className = 'btn btn-outline-primary m-1';
    prevButton.innerText = 'Previous';
    prevButton.addEventListener('click', () => {
      if (currentPage > 1) {
        currentPage--;
        fetchRepositories(username, accessToken, totalRepos);
      }
    });
    paginationContainer.appendChild(prevButton);
  
    // Numeric Pagination for navigation
    const numricPagination = document.createElement('div');
    numricPagination.id = 'numricPagination';
    numricPagination.className = 'btn-group';
  
    paginationContainer.appendChild(numricPagination);
  
    for (let i = 1; i <= totalPages; i++) {
      const pageButton = document.createElement('button');
      pageButton.className = 'btn btn-outline-primary m-1';
      pageButton.innerText = i;
      pageButton.addEventListener('click', () => {
        currentPage = i;
        fetchRepositories(username, accessToken, totalRepos);
      });
      numricPagination.appendChild(pageButton);
    }
  
    const nextButton = document.createElement('button');
    nextButton.className = 'btn btn-outline-primary m-1';
    nextButton.innerText = 'Next';
    nextButton.addEventListener('click', () => {
      if (currentPage < totalPages) {
        currentPage++;
        fetchRepositories(username, accessToken, totalRepos);
      }
    });
    paginationContainer.appendChild(nextButton);
  
    // Functionn to add active class to the curent page button
    function updateActivePageButton() {
      const buttons = numricPagination.getElementsByTagName('button');
      for (let i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove('active');
        if (parseInt(buttons[i].innerText) === currentPage) {
          buttons[i].classList.add('active');
        }
      }
    } 
  
    updateActivePageButton();
  }  
