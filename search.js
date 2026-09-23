// =====================================================
// Search Index
// =====================================================

let siteIndex = [];

// =====================================================
// Recherche
// =====================================================

function searchPages(query) {

    query = (query || '')
        .toLowerCase()
        .trim();

    if (!query || siteIndex.length === 0) {
        return [];
    }

    const queryWords = query
        .split(/\s+/)
        .filter(Boolean);

    return siteIndex.filter(item =>
        queryWords.every(word =>
            item.l.includes(word) ||
            item.u.toLowerCase().includes(word)
        )
    );
}

// =====================================================
// Overlay helpers
// =====================================================

function getOverlay() {
    return document.getElementById('search-overlay');
}

function getOverlayContent() {
    return document.getElementById('search-overlay-content');
}

// =====================================================
// Fermeture
// =====================================================

function closeSearchOverlay() {

    const overlay = getOverlay();

    if (!overlay) {
        return;
    }

    overlay.classList.remove('active');
}

// =====================================================
// Affichage résultats
// =====================================================

function showSearchResults(query) {

    const matches = searchPages(query);

    // 1 seul résultat
    if (matches.length === 1) {

        closeSearchOverlay();

        location.hash =
            matches[0].u.replace(/^#/, '');

        return;
    }

    const overlay = getOverlay();
    const content = getOverlayContent();

    if (!overlay || !content) {
        return;
    }

    // Vide complètement le contenu
    content.innerHTML = '';

    // Message
    const message = document.createElement('div');

    message.className =
        'search-overlay-message';

    if (matches.length === 0) {

        message.innerHTML = `
            Aucun résultat trouvé pour
            <strong>${query}</strong>
        `;

        content.appendChild(message);

    } else {

        message.innerHTML = `
            ${matches.length} résultat(s) pour
            <strong>${query}</strong>
        `;

        content.appendChild(message);

        matches.forEach(item => {

            const link =
                document.createElement('a');

            link.className =
                'search-result-link';

            link.href = item.u;

            link.textContent =
                item.t || item.u;

            content.appendChild(link);

        });
    }

    overlay.classList.add('active');
}

// =====================================================
// URL
// =====================================================

function getSearchQueryFromHash() {

    const hash = location.hash || '';

    const match =
        hash.match(/^#\/\?q=(.+)$/i);

    if (!match) {
        return null;
    }

    return decodeURIComponent(
        match[1]
    ).trim();
}

// =====================================================
// Gestion route
// =====================================================

function handleSearchRoute() {

    const query =
        getSearchQueryFromHash();

    if (!query) {

        closeSearchOverlay();

        return;
    }

    showSearchResults(query);
}

// =====================================================
// Recherche
// =====================================================

function goToSearch(query) {

    query = (query || '').trim();

    if (!query) {
        return;
    }

    const newHash =
        '/?q=' + encodeURIComponent(query);

    if (location.hash === '#' + newHash) {

        showSearchResults(query);
        return;
    }

    location.hash = newHash;
}

// =====================================================
// Chargement index
// =====================================================

fetch('search_index.json')
    .then(response => response.json())
    .then(data => {

        siteIndex = data;

        console.log(
            `[Search] ${siteIndex.length} entrées chargées`
        );

        handleSearchRoute();
    })
    .catch(error => {

        console.error(
            'Erreur de chargement de l\'index :',
            error
        );
    });

// =====================================================
// DOM Ready
// =====================================================

document.addEventListener(
    'DOMContentLoaded',
    () => {

        const input =
            document.getElementById(
                'search-input'
            );

        const overlay =
            document.getElementById(
                'search-overlay'
            );

        const closeButton =
            document.getElementById(
                'search-close-btn'
            );

        if (input) {

            input.addEventListener(
                'keydown',
                e => {

                    if (e.key !== 'Enter') {
                        return;
                    }

                    const query =
                        input.value.trim();

                    if (!query) {
                        return;
                    }

                    goToSearch(query);
                }
            );
        }

        if (closeButton) {

            closeButton.addEventListener(
                'click',
                closeSearchOverlay
            );
        }

        if (overlay) {

            overlay.addEventListener(
                'click',
                e => {

                    if (e.target === overlay) {
                        closeSearchOverlay();
                    }

                }
            );
        }

        document.addEventListener(
            'click',
            e => {

                const link =
                    e.target.closest(
                        '.search-result-link'
                    );

                if (!link) {
                    return;
                }

                closeSearchOverlay();
            }
        );

        handleSearchRoute();
    }
);

// =====================================================
// Route change
// =====================================================

window.addEventListener(
    'hashchange',
    handleSearchRoute
);