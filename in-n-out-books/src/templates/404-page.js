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

//
import path from 'path';

// Import the site header js
import Header from "./parts/header.js";

// Import the site footer js
import Footer from "./parts/footer.js";

// Import Template: use to generate HTML content
import Template from "./template.js";


const
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
message = (() => `
  <section class="message">
    <h3 class="title">In-N-Out-Books!</h3><br  >
    <p class="info">
      <strong>404.</strong> That's an error.<br>
      The requested URL "<span id="searchedURL"></span>" was not found on this server.<br>
      <span style="color: rgba(0,0,0,0.55)">That's all we know.</span>
    </p>
  </section>
`)(),

/**
 * 404 Page
 *
 * Generates a 404 page for the in-n-out-books website using template.js
 *
 * @type {string} _404_page
 *
 * @Dev Exenreco Bell
 *
 * @Date January 22, 2025
 *
 * @Since version 0.0.2
 *
 * @see ./template.js
 */
_404_page = Template('In-N-Out-Books', {

  // enable html 5 support
  'html5': true,

  // generate page header title
  'page': {
    title:'404',
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
    {atts: {
      rel:  'stylesheet',
      type: 'text/css',
      href: (() =>`http://localhost:3000/styles/reset.css`)(),
    }, content:  ''},

    // link general stylesheet
    {atts: {
      rel:  'stylesheet',
      type: 'text/css',
      href: (() =>`http://localhost:3000/styles/general.css`)(),
    }, content:  ''}

  ],

  // generate script tag
  'scripts': [
    {
      atts:     {id: 'script-404', type: 'text/javaScript', defer: true},
      content:  (() => `
        window.onload = () => {
          const

          // get current url
          url = document.URL,

          // select target
          span = document.getElementById("searchedURL");

          // write searched url
          span.innerHTML = \`\${url}\`;

          return; // exit function
        };
      `)()
    }
  ],

  // generate html body tag
  'body': {

    // adds attributes to the body tag
    atts: { id: "page-404", class: 'page _404' },

    // adds content to the body tag
    content: (() => `
      ${Header}
      <main class="site-content">
        ${message}
      </main>
      ${Footer}
    `)()
  }
}),

custom404 = ( content = '' ) => {

  if( ! content || ! content instanceof String ) throw new Error(`
    To replace a page content a sting is expected,
    "${typeof(content)}" was given!
  `);

  const temp = Template('In-N-Out-Books', {

    // enable html 5 support
    'html5': true,

    // generate page header title
    'page': {
      title:'404',
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
      {atts: {
        rel:  'stylesheet',
        type: 'text/css',
        href: (() =>`http://localhost:3000/styles/reset.css`)(),
      }, content:  ''},

      // link general stylesheet
      {atts: {
        rel:  'stylesheet',
        type: 'text/css',
        href: (() =>`http://localhost:3000/styles/general.css`)(),
      }, content:  ''}

    ],
    // generate html body tag
    'body': {

      // adds attributes to the body tag
      atts: { id: "page-404", class: 'page _404' },

      // adds content to the body tag
      content: (() => `${content}`)()
    }
  });

  return temp;
};

export { _404_page, custom404 }; // The Home page template