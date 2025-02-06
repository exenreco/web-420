/**
 * Name: Exenreco Bell
 *
 * Date: January 24, 2025
 *
 * File: home-page.js
 *
 * Description: In-N-Out-Books Home Page Template
 */

"use strict";


/**
 * Module dependencies.
 */

// import hljs for code highlights
import hljs from "highlight.js";

// Import the site header js
import Header from "./parts/header.js";

// Import the site footer js
import Footer from "./parts/footer.js";

// Import Template: use to generate HTML content
import Template from "./template.js";


const
/**
 * Defines the site header
 */
siteHeader = Header([
  {text: 'Home', location: '/'},
  {text: 'Books', location: '/books'},
  {text: 'Docs', location: '/docs'},
]),

fetchSingle = (() => `
  // fetching a single book
  async () => {
    const book1 = await fetch('https://site-name/api/books/1');
  };
`)(),

singleExpected = (() => `
  // Expect book to be:
  {
    id:           '1',
    title:        'Sample book',
    cover:        'https://sample-book-cover.jpeg',
    author:       'Susan Bell',
    source:       'https://link-to-book.pdf',
    description:  'Talks about sample book'
  }
`)(),

fetchAll = (() => `
  // fetching all books
  async () => {
    const books = await fetch('https://site-name/api/books/');
  };
`)(),

allExpected = (() => `
  // Expect books to be:
  [{
    id:           '1',
    title:        'Sample book',
    cover:        'https://sample-book-cover.jpeg',
    author:       'Susan Bell',
    source:       'https://link-to-book.pdf',
    description:  'Talks about sample book'
  },
  {
    id:           '2',
    title:        'Sample book 2',
    cover:        'https://sample-book2-cover.jpeg',
    author:       'Anthony Bell',
    source:       'https://link-to-book2.pdf',
    description:  'About sample 2 book'
  }, ... ]
`)(),

addingBook = (() => `
  await fetch('https://site-name/api/books/', {
    method: 'POST',
    mode: 'cors',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      id:           '1',
      title:        'Sample book',
      cover:        'https://sample-book-cover.jpeg',
      author:       'Susan Bell',
      source:       'https://link-to-book.pdf',
      description:  'Talks about sample book'
    })
  });
  return response.json();
`)(),

addingBookExpected = (() => `
  // When valid expect a 201-status code
  // When no provided title expect 400-status
`)(),

codeBlocks = {
  fetchAll: hljs.highlight(fetchAll, { language: "javascript" }).value,
  fetchSingle: hljs.highlight(fetchSingle, { language: "javascript" }).value,
  singleExpected: hljs.highlight(singleExpected, { language: "javascript" }).value,
  allExpected: hljs.highlight(allExpected, { language: "javascript" }).value,
  addingBook: hljs.highlight(addingBook, { language: "javascript" }).value,
  addingBookExpected: hljs.highlight(addingBookExpected, { language: "javascript" }).value,
},

/**
 * Single BOOKS template
 *
 * generates a string of html content based on a requested single book.
 *
 * @type {string} singleBook
 *
 * @Dev Exenreco Bell
 *
 * @Date January 22, 2025
 *
 * @Since version 0.0.2
 *
 * @see ./template.js
 */
apiDocs = Template('In-N-Out-Books', {

  // enable html 5 support
  'html5': true,

  // generate page header title
  'page': {
    title:'Book',
    hasSiteTitle:true
  },

  // generate meta tags
  'meta': [
    { charset: "UTF-8" },
    { name:"viewport", content: `width=device-width,initial-scale=1.0`}
  ],

  // generate style tags
  'styles': [
    // link reset stylesheet
    {atts: { rel: 'stylesheet', type: 'text/css', href: '/styles/reset.css' } },

    // link general stylesheet
    {atts: { rel: 'stylesheet', type: 'text/css', href: '/styles/general.css' } },

    // link highlight js
    {atts: {
      rel: 'stylesheet',
      type: 'text/css',
      href: 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/styles/github.min.css' }
    },
  ],

  // generates site scripts
  'scripts': [
    {atts: {
      id: 'highlight-js',
      type: 'text/javaScript',
      defer:  true,
      src: "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/highlight.min.js",
    }},
    {atts: {
      id: 'highlight-init',
      type: 'text/javaScript',
      defer:  true,
    }, content: `
      // Apply syntax highlighting
      document.addEventListener(
        "DOMContentLoaded",
        () => hljs.highlightAll()
      );`},
  ],

  // generate html body tag
  'body': {

    // adds attributes to the body tag
    atts: { id: "documentation", class: 'page documentation' },

    // adds content to the body tag
    content: (() => `
      ${siteHeader}
      <main class="site-content">
        <div class="documentation-view">
          <h1 class="title">Books API Documentation</h1>
          <hr>
          <ul>
            <li>
              <table>
                <caption>Fetching a Single Book</caption>
                <tr>
                  <th>Method</th>
                  <th>Route</th>
                </tr>
                <tr>
                  <td><span class="green">[ GET ]</span></td>
                  <td><span class="red">site-name/api/books/:id</span></td>
                </tr>
                <tr>
                  <td colspan="2">
                    <strong>Usage:</strong><br>
                    <pre><code>
                      ${codeBlocks.fetchSingle}
                    </code></pre><br>
                    <strong>Expected Results:</strong><br>
                    <pre><code>
                      ${codeBlocks.singleExpected}
                    </code></pre>
                  </td>
                </tr>
              </table>
            </li>
            <li>
              <table>
                <caption>Fetching All Books</caption>
                <tr>
                  <th>Method</th>
                  <th>Route</th>
                </tr>
                <tr>
                  <td><span class="green">[ GET ]</span></td>
                  <td><span class="red">site-name/api/books/</span></td>
                </tr>
                <tr>
                  <td colspan="2">
                    <strong>Usage:</strong><br>
                    <pre><code>
                      ${codeBlocks.fetchAll}
                    </code></pre><br>

                    <strong>Expected Results:</strong><br>
                    <pre><code>
                      ${codeBlocks.allExpected}
                    </code></pre>
                  </td>
                </tr>
              </table>
            </li>
            <li>
              <table>
                <caption>Adding A Book</caption>
                <tr>
                  <th>Method</th>
                  <th>Route</th>
                </tr>
                <tr>
                  <td><span class="green">[ POST ]</span></td>
                  <td><span class="red">site-name/api/books/</span></td>
                </tr>
                <tr>
                  <td colspan="2">
                    <strong>Usage:</strong><br>
                    <pre><code>
                      ${codeBlocks.addingBook}
                    </code></pre><br>

                    <strong>Expected Results:</strong><br>
                    <pre><code>
                      ${codeBlocks.addingBookExpected}
                    </code></pre>
                  </td>
                </tr>
              </table>
            </li>
            <li></li>
          </ul>
        </div>
      </main>
      ${Footer}
    `)()
  }
});

export default apiDocs; // The single book page template