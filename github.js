// TASK 2: GITHUB PROFILE VIEWER

const API_BASE = 'https://api.github.com';

const usernameInput = document.getElementById('usernameInput');
const searchBtn = document.getElementById('searchBtn');
const loadingIndicator = document.getElementById('githubLoading');
const errorMessage = document.getElementById('githubError');
const profileContainer = document.getElementById('profileContainer');
const avatar = document.getElementById('avatar');
const profileName = document.getElementById('profileName');
const profileBio = document.getElementById('profileBio');
const followers = document.getElementById('followers');
const following = document.getElementById('following');
const publicRepos = document.getElementById('publicRepos');
const repoList = document.getElementById('repoList');


// FETCH USER PROFILE

async function fetchUserProfile(username) {
    try {
        const response = await fetch(`${API_BASE}/users/${username}`);
        
        if (response.status === 404) {
            throw new Error('User not found');
        }
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        return await response.json();
    } catch (error) {
        throw error;
    }
}

// ============================================
// FETCH USER REPOS
// ============================================
async function fetchUserRepos(username) {
    try {
        const response = await fetch(
            `${API_BASE}/users/${username}/repos?sort=stars&per_page=5`
        );
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        return await response.json();
    } catch (error) {
        throw error;
    }
}

// DISPLAY PROFILE

function displayProfile(user) {
    avatar.src = user.avatar_url;
    avatar.alt = `${user.login}'s avatar`;
    profileName.textContent = user.name || user.login;
    profileBio.textContent = user.bio || 'No bio available';
    followers.textContent = user.followers;
    following.textContent = user.following;
    publicRepos.textContent = user.public_repos;
}

// DISPLAY REPOS

function displayRepos(repos) {
    repoList.innerHTML = '';
    
    if (!repos || repos.length === 0) {
        repoList.innerHTML = '<p style="color: #999;">No repositories found</p>';
        return;
    }
    
    repos.forEach(repo => {
        const item = document.createElement('div');
        item.className = 'repo-item';
        
        const nameLink = document.createElement('a');
        nameLink.className = 'repo-name';
        nameLink.href = repo.html_url;
        nameLink.target = '_blank';
        nameLink.textContent = repo.name;
        
        const description = document.createElement('div');
        description.className = 'repo-description';
        description.textContent = repo.description || 'No description';
        
        const meta = document.createElement('div');
        meta.className = 'repo-meta';
        
        const stars = document.createElement('span');
        stars.className = 'stars';
        stars.textContent = `⭐ ${repo.stargazers_count}`;
        
        const language = document.createElement('span');
        language.className = 'language';
        language.textContent = repo.language || 'No language specified';
        
        meta.appendChild(stars);
        meta.appendChild(language);
        
        item.appendChild(nameLink);
        item.appendChild(description);
        item.appendChild(meta);
        
        repoList.appendChild(item);
    });
}

// SEARCH USER

async function searchUser() {
    const username = usernameInput.value.trim();
    
    if (!username) {
        showError('Please enter a GitHub username');
        return;
    }
    
    // Clear previous results
    profileContainer.style.display = 'none';
    errorMessage.style.display = 'none';
    loadingIndicator.style.display = 'block';
    searchBtn.disabled = true;
    
    try {
        // Fetch both profile and repos in parallel
        const [user, repos] = await Promise.all([
            fetchUserProfile(username),
            fetchUserRepos(username)
        ]);
        
        // Display results
        displayProfile(user);
        displayRepos(repos);
        profileContainer.style.display = 'block';
        errorMessage.style.display = 'none';
        
    } catch (error) {
        showError(error.message);
        profileContainer.style.display = 'none';
    } finally {
        loadingIndicator.style.display = 'none';
        searchBtn.disabled = false;
    }
}

// HELPERS

function showError(message) {
    errorMessage.textContent = '❌ ' + message;
    errorMessage.style.display = 'block';
}

// EVENT LISTENERS

searchBtn.addEventListener('click', searchUser);

usernameInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        searchUser();
    }
});

// INITIALIZE WITH DEFAULT USER

// Load a default profile on page load
window.addEventListener('load', function() {
    usernameInput.value = 'torvalds';
    searchUser();
});