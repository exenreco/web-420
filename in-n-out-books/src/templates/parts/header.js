/**
 * Name: Exenreco Bell
 *
 * Date: January 29, 2025
 *
 * File: header.js
 *
 * Description: In-N-Out-Books Site Header Markup
 */


/**
 * HEADER
 *
 * Stores a block of html source code to use as
 * the header on the inn-n-out-books website.
 *
 */
const Header = ( links = [{location: '', class: '', text: ''}] ) => {

  // checks for site links
  if( ! links || ! links instanceof Object) throw Error(`
    Expected links to be an array of objects, ${typeof(links)} was given.
  `)

  let navItems = '';

  links.forEach((link, index) => {
    if( link && link instanceof Object ) {
      const

      location = ('location' in link && typeof link.location === 'string' )
      ? (() => `href="${link.location}"`)()
      : '',

      classAttr = ('class' in link && typeof link.class === 'string' )
      ? (() =>`class="nav-link ${link.class}"`)()
      : 'class="nav-link"',

      text = ('text' in link && typeof link.text === 'string' )
      ? (() => `${link.text}`)()
      : '';

      // append link tag
      navItems += `<a ${location} ${classAttr} >${text}</a>`;
    }
  });


  const head = (() => `<header class="site-header">
    <div class="info">
      <div class="logo">
        <img src="/images/logo.png" alt="in-n-out-book logo">
      </div>
      <section class="text">
        <h1 class="hidden" hidden="true">
          <a hrf="/">In-N-Out-Books</a>
          <small class="tagline">
            <i>Fast, Easy... Bound to Impress!</i>
          </small>
        </h1>
        <a class="site-link" href="/">
          <span class="site-name">In-N-Out-Books</span>
          <small class="tagline">
            <i>Fast, Easy... Bound to Impress!</i>
          </small>
        </a>
      </section>
    </div>
    <nav class="header-nav">
      ${(() => navItems)()}
    </nav>
  </header>`)();

  return head;
};

// Export the site header
export default Header;