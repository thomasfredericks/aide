const hasWindow = typeof window !== 'undefined'
// &rsaquo;
const options = {
  showHome: false,
  homeText: 'Home',
  separator: ' &rsaquo; ',
  casing: 'capitalize',
  linkColor: 'var(--theme-color, #42b983)',
  size: 'small',
  ...(hasWindow && window.$docsify?.breadcrumb ? window.$docsify.breadcrumb : {})
}

/**
 * Breadcrumb plugin for Docsify
 * 
 * @param {Function} hook - The hook function
 * @param {Object} vm - The Docsify VM object
 * @returns {void}
 * @see https://docsify.js.org/#/write-a-plugin
 */
function breadcrumbPlugin (hook, vm) {
  hook.afterEach(function (html, next) {
    const url = vm.route.path
    const isHome = url.length < 2

    const urlParts = getUrlParts(url)
    const readableUrlParts = sanitizeUrlParts(urlParts)
    const homeLink = options.showHome || !isHome ? getHomeLink(isHome) : ''

    // Pass vm.compiler.cacheTOC to getListItems
    const ul = generateAccessibleBreadcrumb(
      homeLink,
      getListItems(readableUrlParts.slice(0, -1), urlParts.slice(0, -1), vm.compiler.cacheTOC)
    )

    next(ul + html)
  })
}

/**
 * Get the title of the current page
 * 
 * @param {Object} route - The current route object
 * @param {Object} cacheTOC - The cacheTOC object
 * @returns {String} The title of the current page
 */
const getPageTitle = (route, cacheTOC) =>
  cacheTOC[route.file].find(page => page.level === 1).title

/**
 * Get the parts of the URL
 * 
 * @param {String} url - The current URL from the route object
 * @returns {Array} The parts of the URL
 * @sample articles/books-and-more/adventure.md => ['articles', 'books-and-more', 'adventure.md']
 */
const getUrlParts = (url) =>
  decodeURI(url).split('/').filter(str => ['#', '', 'README'].indexOf(str) === -1)

/**
 * Sanitize the URL parts
 * 
 * @param {Array} urlParts - The parts of the URL
 * @returns {Array} The plain language URL parts
 * @sample ['articles', 'books-and-more', 'adventure.md'] => ['articles', 'books and more', 'adventure md']
 */
const sanitizeUrlParts = (urlParts) =>
  urlParts.map(part => part.replace(/[._-]/g, ' '))

/**
 * Get the list items for the breadcrumb
 * 
 * @param {Array} readableUrlParts - The plain language URL parts
 * @param {Array} urlParts - The parts of the URL
 * @returns {String} The collection of <li> for the breadcrumb
 */
/**
 * Get the list items for the breadcrumb
 * 
 * @param {Array} readableUrlParts - The plain language URL parts
 * @param {Array} urlParts - The parts of the URL
 * @returns {String} The collection of <li> for the breadcrumb
 */
/**
 * Get the list items for the breadcrumb
 * 
 * @param {Array} readableUrlParts - The plain language URL parts
 * @param {Array} urlParts - The parts of the URL
 * @param {Object} cacheTOC - The Docsify cacheTOC object
 * @returns {String} The collection of <li> for the breadcrumb
 */
const getListItems = (readableUrlParts, urlParts, cacheTOC) => {
  if (readableUrlParts.length === 0) return '';

  return readableUrlParts
    .map((part, i) => {
      const link = getItemLink(urlParts, i + 1);
      
      
      // Construct the potential README path for this segment
      // e.g., if segment is "articles", check "articles/README.md"
      const potentialReadmePath = `${urlParts.slice(0, i + 1).join('/')}/README.md`;
      
      // Check if this file exists in the cache
      const hasReadme = !!cacheTOC[potentialReadmePath];

      // Only add separator if it's NOT the last item
      //const isLast = i === readableUrlParts.length - 1;
      //const sep = isLast ? '' : options.separator;
      const sep = options.separator;

      if (hasReadme) {
        // Create a link if README.md exists
        return `<li><a href="${link}" style="color: ${options.linkColor}">${part}</a>${sep}</li>`;
      } else {
        // No README found: display as plain text (no link)
        return `<li><span style="color: ${options.linkColor}">${part}</span>${sep}</li>`;
      }
    })
    .join('');
}

/**
 * Get the link for the item
 * 
 * @param {Array} urlParts - The parts of the URL
 * @param {Number} end - The end index for the current item
 * @returns {String} The link for the item
 */
const getItemLink = (urlParts, end) => `#/${urlParts.slice(0, end).join('/')}/`

/**
 * Get the home link
 * 
 * @param {Boolean} isHome - Whether the current page is the home page
 * @returns {String} The home link as a <li>
 */
const getHomeLink = (isHome) => {
  const color = isHome ? 'inherit' : options.linkColor
  const fontWeight = isHome ? `font-weight:inherit;` : ''
  const separator = isHome ? '' : options.separator

  return `<li><a href='#/' style="color: ${color}; ${fontWeight}}">${options.homeText}</a>${separator}</li>`
}

/**
 * Generate the accessible breadcrumb
 * 
 * @param {String} homeLink - The home link as a <li>
 * @param {String} list - The list of items as <li>
 * @returns {String} The accessible breadcrumb
 */
const generateAccessibleBreadcrumb = (homeLink, list) => `
  <nav aria-label="Breadcrumb" class="breadcrumb">
    <ol
      class=' breadcrumb--${options.size}'
      style="text-transform:${options.casing}"
    >
      ${homeLink}
      ${list}
    </ol>
  </nav>
`

if (hasWindow) {
  window.$docsify = window.$docsify || {};
  window.$docsify["breadcrumb"] = options
  window.$docsify.plugins = [].concat(breadcrumbPlugin, window.$docsify.plugins)
}