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
  {text: 'Home', class:'active', location: '/'},
  {text: 'Books', location: '/books'},
  {text: 'Docs', location: '/docs'},
]),

/**
 * INTRO
 *
 * Stores a block of html source code to use as
 * the intro paragraph for inn-n-out-books website.
 *
 * @type {string} intro
 *
 * @Dev Exenreco Bell
 *
 * @Date January 22, 2025
 *
 * @Since version 0.0.2
 */
intro = (() => `
  <div class="splash-screen">
    <section class="about">
      <h1 class="title">Welcome to In-N-Out-Books!</h1>
      <p class="info">
        Manage your book collection with ease!
        Whether you're an avid reader or a book club organizer,
        our platform caters to your needs.
      </p>
    </section>
  </div>
`)(),

/**
 * TOP SELLING BOOKS
 *
 * Stores a block of html source code to a list
 * of top seeling books on the inn-n-out-books website.
 *
 * @type {string} topSellingBooks
 *
 * @Dev Exenreco Bell
 *
 * @Date January 22, 2025
 *
 * @Since version 0.0.2
 */
topSellingBooks = (() => `
  <section id="books" class="page-section top-selling">
    <h2 class="title">Top Selling Books</h2>
    <ul class="indented-list">
      <li>The Great Gatsby</li>
      <li>To Kill a Mockingbird</li>
      <li>1984 by George Orwell</li>
    </ul>
  </section>
`)(),

/**
 * OPERATIONAL HOURS
 *
 * Stores a block of html source code to that states
 * the hours of operation on the inn-n-out-books website.
 *
 * @type {string} operationalHrs
 *
 * @Dev Exenreco Bell
 *
 * @Date January 22, 2025
 *
 * @Since version 0.0.2
 */
operationalHrs = (() => `
  <section class="page-section">
    <h2 class="title">Hours of Operation:</h2>
    <p>Mon - Fri: 9AM - 6PM</p>
    <p>Sat - Sun: 1AM - 8PM</p>
  </section>
`)(),

/**
 * CONTACT INFO
 *
 * Stores a block of html source code to that states
 * the contact info of the inn-n-out-books website.
 *
 * @type {string} contactInfo
 *
 * @Dev Exenreco Bell
 *
 * @Date January 22, 2025
 *
 * @Since version 0.0.2
 */
contactInfo = (() => `
  <section class="page-section">
    <h2 class="title">Contact Information</h2>
    <p>Email: <a href="mailto:support@innoutbooks.com">
      support@innoutbooks.com
    </a></p>
    <p>Phone: (123) 456-7890</p>
  </section>
`)(),

/**
 * HOME PAGE
 *
 * generates a string of html content based on the given params.
 *
 * @type {string} homePage
 *
 * @Dev Exenreco Bell
 *
 * @Date January 22, 2025
 *
 * @Since version 0.0.2
 *
 * @see ./template.js
 */
homePage = Template('In-N-Out-Books', {

  // enable html 5 support
  'html5': true,

  // generate page header title
  'page': {
    title:'Home',
    hasSiteTitle: true
  },

  // generate meta tags
  'meta': [
    { charset: "UTF-8" },
    { name:"viewport", content: `width=device-width,initial-scale=1.0`}
  ],

  // generate style tags
  'styles': [

    // link reset stylesheet
    {atts: {
      rel:  'stylesheet',
      type: 'text/css',
      href: 'styles/reset.css'
    }, content:  ''},

    // link general stylesheet
    {atts: {
      rel:  'stylesheet',
      type: 'text/css',
      href: 'styles/general.css'
    }, content:  ''},

    // in-page style tag
    {
      atts: {
        id:   'home-styles',
        rel:  'stylesheet',
        type: 'text/css',
      }, content: (() => `
        .section > p {
          font-style: italic;
          text-indent: 12pt;
        }
      `)()
    }
  ],

  // generate script tag
  'scripts': [
    {
      atts:     {id: 'home-script', type: 'text/javaScript', defer: true},
      content:  'console.log("In-N-Out-Books is now running...");'
    }
  ],

  // generate html body tag
  'body': {

    // adds attributes to the body tag
    atts: { id: "home-page", class: 'page home' },

    // adds content to the body tag
    content: (() => `
      ${siteHeader}
      ${intro}
      <main class="site-content">
        ${topSellingBooks}
        ${operationalHrs}
        ${contactInfo}
      </main>
      ${Footer}
    `)()
  }
});

export default homePage; // The Home page template