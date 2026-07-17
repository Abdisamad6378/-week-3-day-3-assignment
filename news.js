// TASK 3: NEWS HEADLINE AGGREGATOR


const sampleArticles = [
    {
        title: "Safaricom Launches New M-Pesa Feature for Small Businesses",
        source: "Business Daily",
        date: "2026-05-03",
        url: "#",
        category: "business"
    },
    {
        title: "Kenya's Tech Hub Growth Surges in 2026 with Record Funding",
        source: "TechCrunch",
        date: "2026-05-02",
        url: "#",
        category: "technology"
    },
    {
        title: "Harambee Stars Qualify for AFCON After Dramatic Victory",
        source: "Daily Nation",
        date: "2026-05-01",
        url: "#",
        category: "sports"
    },
    {
        title: "New Health Center Opens in Nairobi's Informal Settlements",
        source: "The Standard",
        date: "2026-04-30",
        url: "#",
        category: "health"
    },
    {
        title: "E-commerce Platform Jumia Reports Record Sales in Kenya",
        source: "Reuters",
        date: "2026-04-29",
        url: "#",
        category: "business"
    },
    {
        title: "Kenyan Developer Launches AI-Powered Education Platform",
        source: "TechPoint",
        date: "2026-04-28",
        url: "#",
        category: "technology"
    },
    {
        title: "Athletics Kenya Announces New Training Program for Youth",
        source: "Sports Weekly",
        date: "2026-04-27",
        url: "#",
        category: "sports"
    },
    {
        title: "Mobile Health App Reaches 1 Million Users in East Africa",
        source: "Health Tech",
        date: "2026-04-26",
        url: "#",
        category: "health"
    },
    {
        title: "KCB Group Reports Strong Growth in Digital Banking",
        source: "Financial Times",
        date: "2026-04-25",
        url: "#",
        category: "business"
    },
    {
        title: "Kenya's Space Program Launches Second Research Satellite",
        source: "Science Daily",
        date: "2026-04-24",
        url: "#",
        category: "technology"
    },
    {
        title: "Rugby Team Prepares for International Tournament",
        source: "Sports Gazette",
        date: "2026-04-23",
        url: "#",
        category: "sports"
    },
    {
        title: "Hospitals Adopt AI for Early Disease Detection",
        source: "Medical News",
        date: "2026-04-22",
        url: "#",
        category: "health"
    }
];

let currentCategory = 'all';

const newsList = document.getElementById('newsList');
const loadingIndicator = document.getElementById('newsLoading');
const errorMessage = document.getElementById('newsError');
const categoryBtns = document.querySelectorAll('.category-btn');

// ============================================
// FORMAT DATE
// ============================================
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-KE', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

// ============================================
// RENDER NEWS
// ============================================
function renderNews(category = 'all') {
    loadingIndicator.style.display = 'block';
    newsList.innerHTML = '';
    errorMessage.style.display = 'none';
    
    try {
        // Filter articles by category
        let filtered = sampleArticles;
        if (category !== 'all') {
            filtered = sampleArticles.filter(article => article.category === category);
        }
        
        if (filtered.length === 0) {
            newsList.innerHTML = `
                <div class="news-empty">
                    No articles found in this category
                </div>
            `;
            loadingIndicator.style.display = 'none';
            return;
        }
        
        // Sort by date (newest first)
        filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        // Render each article
        filtered.forEach(article => {
            const item = document.createElement('div');
            item.className = 'news-item';
            
            const title = document.createElement('div');
            title.className = 'news-title';
            
            const link = document.createElement('a');
            link.href = article.url;
            link.target = '_blank';
            link.textContent = article.title;
            
            title.appendChild(link);
            
            const meta = document.createElement('div');
            meta.className = 'news-meta';
            
            const source = document.createElement('span');
            source.className = 'source';
            source.textContent = article.source;
            
            const date = document.createElement('span');
            date.className = 'date';
            date.textContent = formatDate(article.date);
            
            const readMore = document.createElement('a');
            readMore.className = 'read-more';
            readMore.href = article.url;
            readMore.target = '_blank';
            readMore.textContent = 'Read More →';
            
            meta.appendChild(source);
            meta.appendChild(date);
            meta.appendChild(readMore);
            
            item.appendChild(title);
            item.appendChild(meta);
            
            newsList.appendChild(item);
        });
        
        loadingIndicator.style.display = 'none';
        
    } catch (error) {
        showError('Failed to load news articles');
        loadingIndicator.style.display = 'none';
    }
}

// ============================================
// SHOW ERROR
// ============================================
function showError(message) {
    errorMessage.textContent = '❌ ' + message;
    errorMessage.style.display = 'block';
    newsList.innerHTML = '';
}

// ============================================
// CATEGORY FILTER
// ============================================
function setCategory(category) {
    currentCategory = category;
    
    // Update active button
    categoryBtns.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.category === category) {
            btn.classList.add('active');
        }
    });
    
    renderNews(category);
}

// ============================================
// EVENT LISTENERS
// ============================================
categoryBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        const category = this.dataset.category;
        setCategory(category);
    });
});

// ============================================
// INITIALIZE
// ============================================
renderNews('all');