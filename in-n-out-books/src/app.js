/**
 * Name: Exenreco Bell
 *
 * Date: January 24, 2025
 *
 * File: app.js
 *
 * Description: Initial setup of In-N-Out-Books web server
 */

"use strict";

const

// Import Express

express = require('express'),

// Custom template

template = require('../src/template.js'),

// Instance of express

app = express(),

// Intro Block

intro = (() => `
  <section class="section">
    <h2>Introduction</h2>
    <p>
      Manage your book collection with ease!
      Whether you're an avid reader or a book club organizer,
      our platform caters to your needs.
    </p>
  </section>
`)(),

// Top Selling Block

topSellingBooks = (() => `
  <section class="section">
    <h2>Top Selling Books</h2>
    <ul>
      <li>The Great Gatsby</li>
      <li>To Kill a Mockingbird</li>
      <li>1984 by George Orwell</li>
    </ul>
  </section>
`)(),

// operations Block

operationsHrs = (() => `
  <section class="section">
    <h2>Hours of Operation</h2>
    <p>Monday - Friday: 9 AM - 6 PM</p>
    <p>Saturday - Sunday: 10 AM - 4 PM</p>
  </section>
`)(),

// Contact Block

contactInfo = (() => `
  <section class="section">
    <h2>Contact Information</h2>
    <p>Email: support@innoutbooks.com</p>
    <p>Phone: (123) 456-7890</p>
  </section>
`)(),

/**
 * HOME PAGE (Const)
 *
 * generates a string of html content based on the given params.
 *
 * @see ./template.js
 *
 * @since version 0.0.1
 */

homePage = template('In-N-Out-Books', {

  // enable html 5 support
  'html5': true,

  // generate page header title
  'page': {
    title:'Home',
    hasSiteTitle:true
  },

  // generate meta tags
  'meta': [
    { charset: "UTF-8" },
    { name:"viewport", content: `"width=device-width, initial-scale=1.0"`}
  ],

  // generate style tags
  'styles': [
    {
      atts: { id: 'home-styles', type: 'text/css', rel: 'stylesheet' },
      content: (() => `
        body {
          color: #333;
          background: whitesmoke;
        }
        .home-content {
          width: 98%;
          margin: auto;
          display: block;
          position: relative;
        }
        .section {
          padding-bottom: 5px;
          margin: 0px auto 0px auto;
          border-bottom: 1px dashed #d3d3d3;
        }
        .section:last-child {
          border-bottom: none;
        }
        .section > h2 {
          text-decoration: underline;
        }
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
      atts: {id:'home-script', defer:true, type:'text/javaScript'},
      content: 'console.log("Welcome!");'
    }
  ],

  // generate body attributes and contents
  'body': {
    atts: { id: "home-page", class: 'page home' },
    content: (() => `
      <header>
        <h1>Welcome to In-N-Out-Books</h1>
      </header>
      <main class="home-content">
        ${intro}
        ${topSellingBooks}
        ${operationsHrs}
        ${contactInfo}
      </main>
    `)()
  }

});

// Route for the root URL

app.get('/', (req, res) => {
  res.send( homePage.get_template() );
});

// 404 Error Handling Middleware

app.use((req, res, next) => {
  res.status(404).send('<h1>404 - Page Not Found</h1>');
});

// 500 Error Handling Middleware

app.use((err, req, res, next) => {
  res.status(500);
  res.json({
    message: 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err.stack : {}
  });
});

// Export the Express application

module.exports = app;