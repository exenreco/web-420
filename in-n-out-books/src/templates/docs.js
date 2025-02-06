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

// for code syntax
import Prism from 'prismjs';

// Import Template: use to generate HTML content
import Template from "./template.js";

// Import the site header js
import Header from "./parts/header.js";

// Import the site footer js
import Footer from "./parts/footer.js";


const

/**
 * Defines the site header
 */
siteHeader = Header([
  {text: 'Home', location: '/'},
  {text: 'Books', location: '/books'},
  {text: 'Docs', location: '/docs'},
]),

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

    // link prism js css
    {atts: {
      rel: 'stylesheet',
      type: 'text/css',
      href: 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.24.0/themes/prism.min.css' }
    },
  ],

  // generates site scripts
  'scripts': [
    // link prism js
    {atts: {
      id: 'highlight-js',
      type: 'text/javaScript',
      defer:  true,
      src: "https://cdnjs.cloudflare.com/ajax/libs/prism/1.24.0/prism.min.js",
    }},
    {atts: {
      id: 'highlight-init',
      type: 'text/javaScript',
      defer:  true,
      src: '/scripts/docs-view.js'
    }},
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
                    <div id="book-request"></div><br>
                    <strong>Expected Results:</strong><br>
                    <div id="book-expected"></div>
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
                    <div id="books-request"></div><br>

                    <strong>Expected Results:</strong><br>
                    <div id="books-expected"></div>
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
                    <div id="add-book-request"></div><br>

                    <strong>Expected Results:</strong><br>
                    <div id="add-book-expected"></div>
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