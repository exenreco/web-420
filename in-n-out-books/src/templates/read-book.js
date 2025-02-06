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
readBook = Template('In-N-Out-Books', {

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

  // link scripts and stylesheets governing site page -> http://localhost:3000/books

  // generate style tags
  'styles': [

    // link reset stylesheet
    {atts: { rel: 'stylesheet', type: 'text/css', href: '/styles/reset.css' }, content:  ''},

    // link general stylesheet
    {atts: { rel: 'stylesheet', type: 'text/css', href: '/styles/general.css' }, content:  ''},

  ],

  // generate script tag
  'scripts': [
    { atts: {
      id: 'pdf-reader',
      src: "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.min.js",
      type: 'text/javaScript',
      defer:  true
    }},
    { atts: {
      id: 'single-books-view',
      src: "/scripts/reader-view.js",
      type: 'text/javaScript',
      defer:  true
    }}
  ],


  // HTML render for site page -> http://localhost:3000/books

  // generate html body tag
  'body': {

    // adds attributes to the body tag
    atts: { id: "read-book", class: 'page read-book' },

    // adds content to the body tag
    content: (() => `
      ${siteHeader}
      <main class="site-content">
        <div class="read-view">
          <iframe id="reader-frame"></iframe>
        </div>
      </main>
      ${Footer}
    `)()
  }
});

export default readBook; // The read book page template