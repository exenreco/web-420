/**
 * Name: Exenreco Bell
 *
 * Date: February 2, 2025
 *
 * File: app.js
 *
 * Description: In-N-Out-Books web server
 */



"use strict";



/** Module Dependencies
 ** ------------------------------------------------------------------------------- */

// Import Path: handles
import path from "path";

// Import Express: use to create our server
import express from "express";

// Import Favicon:
import favicon from "serve-favicon";

// Import books collection
import books from "../database/books.js";

// Import the site's homepage template
import homePage from "./templates/home-page.js";

// Import an HTML page that handles 404 errors
import { _404_page, custom404 } from "./templates/404-page.js";



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




// get server response as json
app.use(express.json());


/** IN-N-Out-Books Favicon Setup and static files setup
 ** ------------------------------------------------------------------------------- */

// Serve static files from ./src/public
app.use( express.static( path.join( process.cwd(), "src", "public" ) ) );

// Serve app favicon
app.use( favicon(path.join( process.cwd(), "src", "public/images/", "favicon.ico" ) ) );



/** IN-N-Out-Books: Home page route -> http://localhost:3000/
 ** ------------------------------------------------------------------------------- */
app.get('/', (req, res) => {
  res.send( homePage.get_template() );
} );



/** IN-N-Out-Books: Books API routes
 ** ------------------------------------------------------------------------------- */

// Handles fetching all books -> [ http://localhost:3000/api/books ]
bookApiRouter.get("/books", async (req, res) => {
  try {
    const allBooks = await books.find();
    res.json(allBooks);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Handles fetching a single book by id -> [ http://localhost:3000/api/books/:id ]
bookApiRouter.get("/books/:id", async (req, res) => {
  try {
    const bookId = parseInt(req.params.id, 10);

    if (isNaN(bookId)) return res.status(400).json({
      error: "Invalid book ID, 'ID' must be a number."
    });

    const book = await books.findOne({ id: bookId });

    return (book)
    ? res.json(book)
    : res.status(404).json({ error: "Book not found" });

  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Handles adding a single book -> [ http://localhost:3000/api/books]
bookApiRouter.post("/books", async (req, res) => {
  try {
    const { id, title, author } = req.body;

    if (!title) return res.status(400).json({
      error: "Book title is required."
    });

    const newBook = { id, title, author };
    await books.insertOne(newBook);

    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});


// Handles deleting a single book by id -> [ http://localhost:3000/api/books/:id ]
bookApiRouter.delete("/books/:id", async (req, res) => {
  try {
    const bookId = parseInt(req.params.id, 10);

    if (isNaN(bookId)) return res.status(400).json({
      error: "Invalid book ID, 'ID' must be a number."
    });

    const bookExists = await books.findOne({ id: bookId });

    if (!bookExists) return res.status(404).json({
      error: "Book not found"
    });

    await books.deleteOne({ id: bookId });

    res.status(204).send(); // No content
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});



/** IN-N-Out-Books: API route mount
 ** ------------------------------------------------------------------------------- */
app.use("/api", bookApiRouter);



/** IN-N-Out-Books: Middlewares
 ** ------------------------------------------------------------------------------- */

// 404 Error Handling Middleware
app.use( ( req, res ) => res.status(404).send( _404_page.get_template() ) );

// 500 Error Handling Middleware
app.use((err, req, res, next) => res.status(500).json({
  message: "Internal Server Error",
  error: process.env.NODE_ENV === "development" ? err.stack : {},
}));



// Export the Express application
export default app;