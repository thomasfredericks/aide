const hasWindow = typeof window !== 'undefined';

// Configuration
const options = {
  showHome: false,
  homeText: 'Home',
  separator: ' &rsaquo; ',
  linkColor: 'var(--theme-color, #42b983)',
  size: 'small',
  ...(hasWindow && window.$docsify?.breadcrumb ? window.$docsify.breadcrumb : {})
};

let sitemap = [];

/**
 * Fetch and parse the sitemap.json
 */
async function loadSitemap() {
  try {
    const response = await fetch('./sitemap.json');
    
    if (!response.ok) throw new Error('Failed to load sitemap.json');
    sitemap = await response.json();

  } catch (err) {
    console.error('[Breadcrumb Plugin]', err.message);
    sitemap = [];
  }
}

/**
 * Traverse the nested sitemap tree to find the breadcrumb trail for a given path.
 * 
 * @param {string} routePath - The current route path (e.g. "/creation/audio/conception/")
 * @returns {Array} Array of breadcrumb nodes from root to current page
 */
function findBreadcrumbTrail(routePath) {

  if (!sitemap.length) return [];
    
  // Normalize the path: remove leading/trailing slashes and split
  const parts = routePath
    .replace(/^\/+|\/+$/g, '') // strip leading/trailing slashes
    .split('/')
    .filter(p => p && p !== 'README.md');

  if (parts.length === 0) return [];

  /**
   * Recursive helper to walk the tree
   * @param {Array} nodes - Current level nodes
   * @param {number} depth - Current index in parts array
   * @param {Array} trail - Accumulator for matched nodes
   */
  function walk(nodes, depth, trail) {
    for (const node of nodes) {
      // Match the current path segment with the node's 'path' (folder name)
      if (node.path === parts[depth]) {
        const currentTrail = [...trail, node];
        
        // If we've matched all parts, return the trail
        if (depth === parts.length - 1) {
          return currentTrail;
        }
        
        // Otherwise, recurse into children
        if (node.children && node.children.length > 0) {
          const found = walk(node.children, depth + 1, currentTrail);
          if (found) return found;
        }
      }
    }
    return null;
  }

  return walk(sitemap, 0, []) || [];
}

/**
 * Get the title from the sitemap node, or fallback to sanitizing the path segment.
 */
function getNodeTitle(node, pathSegment) {
  if (node && node.title) return node.title;
  // Fallback: capitalize and replace hyphens/underscores
  return pathSegment
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase());
}

/**
 * Build the HTML for the breadcrumb navigation
 */
function renderBreadcrumb(trail, currentRoute) {
  if (trail.length === 0) return '';

  const isHome = currentRoute === '/' || currentRoute === '';
  
  let html = '<nav aria-label="Breadcrumb" class="breadcrumb">\n  <ol';
  if (options.size) html += ` class="${options.breadcrumbClass || ''} breadcrumb--${options.size}"`;
  html += '>\n';

  // Home Link
  if (options.showHome || !isHome) {
    const homeColor = isHome ? 'inherit' : options.linkColor;
    const homeStyle = `color: ${homeColor}${isHome ? '; font-weight: inherit;' : ''}`;
    const sep = isHome ? '' : options.separator;
    html += `    <li><a href="#/" style="${homeStyle}">${options.homeText}</a>${sep}</li>\n`;
  }

  // Trail Items
  trail.forEach((node, index) => {
    const isLast = index === trail.length - 1;
    
    // Build the path up to this node
    const pathSegments = trail.slice(0, index + 1).map(n => n.path);
    const href = `#/${pathSegments.join('/')}/`;
    
    if (isLast) {
      // Last item is the current page (no link)
      // Don't render last item //html += `    <li class="active" aria-current="page">${node.title}</li>\n`;
      html += `    <li class="active" aria-current="page">${node.path}</li>\n`;
    } else {
      if ( node.readme ) {
        html += `    <li><a href="${href}" style="color: ${options.linkColor}">${node.title}</a>${options.separator}</li>\n`;

      } else {
        html += `    <li>${node.title}${options.separator}</li>\n`;
      }
    }
  });

  html += '  </ol>\n</nav>';
  return html;
}

/**
 * Docsify Plugin Hook
 */
function breadcrumbPlugin(hook, vm) {
  // Ensure sitemap is loaded before rendering
  const ensureSitemapLoaded = async () => {
    if (sitemap.length === 0) {
      await loadSitemap();
    }
    return sitemap;
  };

  hook.afterEach(async (html, next) => {
    try {
      // Wait for sitemap to be ready
      await ensureSitemapLoaded();

      const routePath = vm.route.path;
      
      // Find the trail in the sitemap
      const trail = findBreadcrumbTrail(routePath);
  
      // Render HTML
      const breadcrumbHtml = renderBreadcrumb(trail, routePath);
      
      // Append to content
      next(breadcrumbHtml + html);
    } catch (err) {
      console.error('[Breadcrumb Plugin] Error rendering:', err);
      next(html); // Fallback: just render original content
    }
  });
}

// Register plugin if running in browser
if (hasWindow) {
  window.$docsify = window.$docsify || {};
  window.$docsify.plugins = [].concat(breadcrumbPlugin, window.$docsify.plugins || []);
}
