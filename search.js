// =====================================================
// Recherche basée sur le fichier search_index.json
// =====================================================

let cachedSearchIndex = null;

// Charger le fichier search_index.json
async function loadSearchIndex() {
    if (cachedSearchIndex) return cachedSearchIndex;

    try {
        const response = await fetch('./search_index.json');
        if (!response.ok) throw new Error('Erreur de chargement du fichier index');
        
        const data = await response.json();
        
        // Le format de search_index.json de docsify est souvent un objet { "url": { title, content } } 
        // ou un tableau selon la configuration. On normalise le tout en tableau :
        if (Array.isArray(data)) {
            cachedSearchIndex = data;
        } else if (typeof data === 'object' && data !== null) {
            cachedSearchIndex = Object.keys(data).map(url => ({
                u: url,
                t: data[url].title || url,
                c: data[url].content || ''
            }));
        } else {
            cachedSearchIndex = [];
        }
    } catch (e) {
        console.warn("Impossible de charger search_index.json, repli sur le localStorage/liens:", e);
        cachedSearchIndex = [];
    }

    return cachedSearchIndex;
}

function getOverlay() {
    return document.getElementById('search-overlay');
}

function getOverlayContent() {
    return document.getElementById('search-overlay-content');
}

function closeSearchOverlay() {
    const overlay = getOverlay();
    if (!overlay) return;
    overlay.classList.remove('active');
    
    if (location.hash.startsWith('#/?q=')) {
        location.hash = '#/';
    }
}

// =====================================================
// Option de configuration de la recherche
// =====================================================
const SEARCH_CONFIG = {
    searchInPath: false // Mettez à true si vous voulez inclure le chemin dans la recherche
};

async function performSearch(query) {
    query = (query || '').toLowerCase().trim();
    if (!query) return [];

    const queryWords = query.split(/\s+/).filter(Boolean);
    const index = await loadSearchIndex();

    const matches = index.filter(item => {
        const title = (item.t || item.title || '').toLowerCase();
        const content = (item.c || item.content || '').toLowerCase();
        const url = (item.u || item.url || '').toLowerCase();
        
        // Construction du texte de recherche selon l'option choisie
        let searchableText = `${title} ${content}`;
        
        if (SEARCH_CONFIG.searchInPath) {
            searchableText += ` ${url}`;
        }
        
        return queryWords.every(word => searchableText.includes(word));
    });

    return matches;
}

async function showSearchResults(query) {
    const matches = await performSearch(query);

    // 1 seul résultat -> Redirection immédiate
    if (matches.length === 1) {
        closeSearchOverlay();
        let rawUrl = (matches[0].u || matches[0].url || '').trim();
        rawUrl = rawUrl.replace(/^[#\/]+/, '');
        location.hash = '#/' + rawUrl.replace(/\/+/g, '/');
        return;
    }

    const overlay = getOverlay();
    const content = getOverlayContent();

    if (!overlay || !content) return;

    content.innerHTML = '';

    const message = document.createElement('div');
    message.className = 'search-overlay-message';

    if (matches.length === 0) {
        message.innerHTML = `Aucun résultat trouvé pour <strong>"${query}"</strong>.`;
        content.appendChild(message);
    } else {
        message.innerHTML = `<strong>${matches.length}</strong> résultat(s) trouvé(s) pour <strong>"${query}"</strong>`;
        content.appendChild(message);

        matches.forEach((item, index) => {
            const link = document.createElement('a');
            link.className = 'search-result-link';
            if (index === 0) link.classList.add('selected');
            
            let rawUrl = (item.u || item.url || '').trim();
            rawUrl = rawUrl.replace(/^[#\/]+/, '');
            const targetUrl = '#/' + rawUrl.replace(/\/+/g, '/');
            link.href = targetUrl;

            const titleText = item.t || item.title || rawUrl;
            const cleanPath = targetUrl.replace(/^#\/?/, '');

            link.innerHTML = `
                <div class="search-result-title">
                    <span>${titleText}</span>
                    
                </div>
                <div class="search-result-path">${cleanPath}</div>
            `;

            link.addEventListener('click', () => {
                closeSearchOverlay();
            });

            content.appendChild(link);
        });
    }

    overlay.classList.add('active');
}

// Gestion des routes par Hash (?q=...)
function getSearchQueryFromHash() {
    const hash = location.hash || '';
    const match = hash.match(/^#\/\?q=(.+)$/i);
    if (!match) return null;
    return decodeURIComponent(match[1]).trim();
}

async function handleSearchRoute() {
    const query = getSearchQueryFromHash();
    if (!query) {
        closeSearchOverlay();
        return;
    }
    await showSearchResults(query);
}

// Initialisation des écouteurs d'événements
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    const closeBtn = document.getElementById('search-close-btn');
    const overlay = document.getElementById('search-overlay');

    if (searchInput) {
        searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                const val = searchInput.value.trim();
                if (val.length > 0) {
                    location.hash = `/?q=${encodeURIComponent(val)}`;
                }
            } else if (e.key === 'Escape') {
                closeSearchOverlay();
                searchInput.blur();
            }
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', closeSearchOverlay);
    }

    if (overlay) {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                closeSearchOverlay();
            }
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeSearchOverlay();
            if (searchInput) searchInput.blur();
        }
        if (e.key === '/' && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
            e.preventDefault();
            if (searchInput) {
                searchInput.focus();
                searchInput.select();
            }
        }
    });

    window.addEventListener('hashchange', handleSearchRoute);
    handleSearchRoute();
});