// =====================================================
// Recherche basée sur le fichier search_index.json, aliases et skip_words
// =====================================================

let cachedSearchIndex = null;
let cachedAliases = {};
let cachedSkipWords = new Set();

// Charger les configurations externes
async function loadSearchAssets() {
    if (cachedSearchIndex && cachedAliases && cachedSkipWords.size > 0) {
        return { index: cachedSearchIndex, aliases: cachedAliases, skipWords: cachedSkipWords };
    }

    try {
        const [indexRes, aliasesRes, skipRes] = await Promise.all([
            fetch('./search_index.json').catch(() => null),
            fetch('./aliases.json').catch(() => null),
            fetch('./skip_words.json').catch(() => null)
        ]);

        if (indexRes && indexRes.ok) {
            const data = await indexRes.json();
            if (Array.isArray(data)) {
                cachedSearchIndex = data;
            } else if (typeof data === 'object' && data !== null) {
                cachedSearchIndex = Object.keys(data).map(url => ({
                    u: url,
                    t: data[url].title || url,
                    l: (data[url].title || url).toLowerCase(),
                    c: data[url].content || ''
                }));
            } else {
                cachedSearchIndex = [];
            }
        }

        if (aliasesRes && aliasesRes.ok) {
            const rawAliases = await aliasesRes.json();
            cachedAliases = {};
            for (let [k, v] of Object.entries(rawAliases)) {
                cachedAliases[k.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")] = 
                    v.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            }
        }

        if (skipRes && skipRes.ok) {
            const skipArray = await skipRes.json();
            cachedSkipWords = new Set(skipArray.map(w => w.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")));
        }

    } catch (e) {
        console.warn("Erreur lors du chargement des ressources de recherche:", e);
    }

    return {
        index: cachedSearchIndex || [],
        aliases: cachedAliases,
        skipWords: cachedSkipWords
    };
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

const SEARCH_CONFIG = {
    searchInPath: false
};

async function performSearch(query) {
    query = (query || '').toLowerCase().trim();
    if (!query) return [];

    const { index, aliases, skipWords } = await loadSearchAssets();

    let queryClean = query.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    // Remplacement des alias multi-mots d'abord
    const sortedAliases = Object.keys(aliases).sort((a, b) => b.length - a.length);
    for (const alias of sortedAliases) {
        if (queryClean.includes(alias)) {
            queryClean = queryClean.replace(alias, aliases[alias]);
        }
    }

    const rawWords = queryClean.split(/\s+/).filter(Boolean);
    const queryWords = [];

    for (let word of rawWords) {
        const cleanW = word.replace(/^[^\w]+|[^\w]+$/g, '');
        if (skipWords.has(cleanW)) continue;

        const resolved = aliases[cleanW] || cleanW;
        resolved.split(/\s+/).forEach(w => {
            if (!skipWords.has(w)) queryWords.push(w);
        });
    }

    const uniqueQueryWords = [...new Set(queryWords)];
    if (uniqueQueryWords.length === 0) return [];

    // Filtrage des résultats
    const matches = index.filter(item => {
        const searchableText = `${item.l || ''} ${item.c || ''}`.toLowerCase();
        return uniqueQueryWords.every(word => searchableText.includes(word));
    });

    return matches;
}

async function showSearchResults(query) {
    let matches = await performSearch(query);

    // =========================================================================
    // FILTRAGE DÉDUPLICATION DES SOUS-TITRES :
    // Si la page de base est présente dans les résultats, on retire les sous-titres 
    // de cette même page pour éviter les doublons tout en gardant les mots-clés.
    // =========================================================================
    const basePathsWithMainPage = new Set();
    
    // 1. Identifier toutes les pages principales présentes (celles qui se terminent par '/' ou sans '#')
    matches.forEach(item => {
        let rawUrl = (item.u || item.url || '').trim();
        if (!rawUrl.includes('/#') && !rawUrl.includes('#/')) {
            // C'est une page principale
            basePathsWithMainPage.add(rawUrl.split('#')[0]);
        }
    });

    // 2. Filtrer les sous-titres (ceux qui contiennent une ancre) si leur page principale est là
    matches = matches.filter(item => {
        let rawUrl = (item.u || item.url || '').trim();
        if (rawUrl.includes('/#') || (rawUrl.includes('#') && !rawUrl.endsWith('/'))) {
            const basePath = rawUrl.split('/#')[0].split('#')[0];
            if (basePathsWithMainPage.has(basePath)) {
                return false; // On masque le sous-titre car la page principale est déjà affichée
            }
        }
        return true;
    });

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