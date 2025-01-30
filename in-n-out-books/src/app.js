/**
 * Name: Exenreco Bell
 *
 * Date: January 24, 2025
 *
 * File: app.js
 *
 * Description: In-N-Out-Books web server
 */

"use strict";

/**
 * Module dependencies.
 */

// Import Express: use to create our server
import express from "express";

import path from "path";

import favicon from "serve-favicon";

// Import books collection
import books from "../database/books.js";

// Import the site's homepage template
import homePage from "./templates/home-page.js";

const
/**
 * APP
 *
 * Handles creating express server instance
 *
 * @Dev Exenreco Bell
 *
 * @Date January 22, 2025
 *
 * @Since version 0.0.2
 */
app = express(),

/**
 * API ROUTER
 *
 * Handles routes for the book API Endpoint
 *
 * @Dev Exenreco Bell
 *
 * @Date January 29, 2025
 *
 * @Since version 0.0.2
 */
bookApiRouter = express.Router();


// parse incoming JSON data from HTTP request body
app.use(express.json());


/**
 *  IN-N-Out-Books Favicon Setup and static files setup
 */

// Serve static files from ./src/public
app.use(
  express.static(path.join(process.cwd(), "src", "public"))
);

// Serve app favicon
app.use(
  favicon(path.join(process.cwd(), "src", "public/images/", "favicon.ico"))
);


/**
 * IN-N-Out-Books -> Home page setup
 */

// handles [Homepage] -> Route for the root URL
app.get('/', (req, res) => {
  res.send( homePage.get_template() );
});


/**
 * IN-N-Out-Books -> books api setup
 */

// Handles [api/books] -> GET all books
bookApiRouter.get("/books", async (req, res) => {
  try {
    const allBooks = await books.find();
    res.json(allBooks);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Handles [api/books/:id] -> GET a single book by ID
bookApiRouter.get("/books/:id", async (req, res) => {
  try {
    const bookId = parseInt(req.params.id, 10);

    if (isNaN(bookId)) {
      return res.status(400).json({
        error: "Invalid book ID, 'ID' must be a number."
      });
    }

    const book = await books.findOne({ id: bookId });

    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }

    res.json(book);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});


/**
 * IN-N-Out-Books -> Mounts
 */

// Mount the API router under /api
app.use("/api", bookApiRouter);



/**
 * IN-N-Out-Books -> Middlewares
 */

// 404 Error Handling Middleware
app.use((req, res) => {
  res.status(404).send("<h1>404 - Page Not Found</h1>");
});

// 500 Error Handling Middleware
app.use((err, req, res, next) => {
  res.status(500).json({
    message: "Internal Server Error",
    error: process.env.NODE_ENV === "development" ? err.stack : {},
  });
});

// Export the Express application
export default app;