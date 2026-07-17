# Week 3 Day 3 Assignment: API-Powered Mini Apps

## Overview
This assignment builds three real API-powered mini-apps: a currency converter, a GitHub profile viewer, and a news aggregator. Each app demonstrates fetching data from external APIs, parsing JSON responses, handling errors, and displaying live data on a web page.

## Tasks Completed

### Task 1: Currency Converter (25 points)
A live currency converter using the open.er-api.com exchange rate API.

**Features:**
- Dropdown selects for "From" and "To" currencies (KES, USD, EUR, GBP, TZS, UGX)
- Amount input field with number validation
- Convert button with live rate fetching
- Swap button to reverse currencies
- Result display with formatted currency
- Error handling with user-friendly messages
- Loading spinner during API calls
- Last updated timestamp

**API Used:** `https://open.er-api.com/v6/latest/KES`

**Files:** `currency.html` + `currency.js`

---

### Task 2: GitHub Profile Viewer (25 points)
A GitHub profile viewer using the GitHub REST API.

**Features:**
- Search input for GitHub username
- Displays: avatar, name, bio, followers, following, public repos
- Top 5 repositories sorted by stars
- Repository links (opens in new tab)
- Loading state during API calls
- "User not found" (404) error handling
- Dynamic DOM creation with createElement

**APIs Used:**
- `https://api.github.com/users/{username}`
- `https://api.github.com/users/{username}/repos?sort=stars&per_page=5`

**Files:** `github.html` + `github.js`

---

### Task 3: News Headline Aggregator (20 points)
A news aggregator with category filtering.

**Features:**
- 12 sample articles across 4 categories
- Clean card/list layout
- Category filter buttons: All, Technology, Business, Sports, Health
- Article sorting by date (newest first)
- Read More links opening in new tab
- Loading state
- Error handling

**Sample Data Categories:**
- Technology (3 articles)
- Business (3 articles)
- Sports (3 articles)
- Health (3 articles)

**Files:** `news.html` + `news.js`

---

## How to Run

### Option 1: Local Development

```bash
# Clone the repository
git clone https://github.com/Abdisamad6378/week-3-day-3-assignment.git

# Navigate to the project
cd week-3-day-3-assignment

# Open any HTML file in your browser
open currency.html        # macOS
start currency.html       # Windows
xdg-open currency.html    # Linux