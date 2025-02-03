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

// Import ajv for JSON Schema validation
import Ajv from 'ajv';

// Import Path
import path from "path";

// Import bcrypt to compare hashed passwords
import bcrypt from "bcryptjs";

// Import Express: use to create our server
import express from "express";

// Import Favicon
import favicon from "serve-favicon";

// Import books collection
import books from "../database/books.js";

// Import mock users data
import { users , saltRounds } from "../database/users.js";

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


// Initialize ajv instance
ajv = new Ajv(),


/**
 * Book API ROUTER
 *
 * Handles routes for the book API Endpoint
 *
 * @Dev Exenreco Bell
 *
 * @Date January 29, 2025
 *
 * @Since version 0.0.2
 */
apiRouter = express.Router(),

/**
 *
 */
usersSchema = {
  type: 'object',
  properties: {
    answers: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          answer: { type: 'string' }
        },
        required: ['answer'],
        additionalProperties: false
      },
      minItems: 1 // at least one answer is required
    }
  },
  required: ['answers'],
  additionalProperties: false
};




// Middleware to parse JSON requests
app.use(express.json());

// Compile the JSON schema
const validate = ajv.compile(usersSchema);

/** IN-N-Out-Books Favicon Setup and static files setup
 ** ------------------------------------------------------------------------------- */

// Serve static files from ./src/public
app.use( express.static( path.join( process.cwd(), "src", "public" ) ) );

// Serve app favicon
app.use( favicon(path.join( process.cwd(), "src", "public/images/", "favicon.ico" ) ) );

/** IN-N-Out-Books: Home page route @ route -> http://localhost:3000/
 ** ------------------------------------------------------------------------------- */
app.get('/', (req, res) => {
  res.send( homePage.get_template() );
} );


/** IN-N-Out-Books: Books API routes
 ** ------------------------------------------------------------------------------- */

// Handles fetching all books @ route -> [ http://localhost:3000/api/books ]
apiRouter.get("/books", async (req, res) => {
  try {
    const allBooks = await books.find();
    res.json(allBooks);
  } catch (error) {

    res.status(500).json({ error: "Internal Server Error" });

  }
});

// Handles fetching a single book by id @ route -> [ http://localhost:3000/api/books/:id ]
apiRouter.get("/books/:id", async (req, res) => {
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

// Handles adding a single book @ route -> [ http://localhost:3000/api/books]
apiRouter.post("/books", async (req, res) => {
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

// Handles deleting a single book by id @ route -> [ http://localhost:3000/api/books/:id ]
apiRouter.delete("/books/:id", async (req, res) => {
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

// Handles updating a single book by id @ route -> [ http://localhost:3000/api/books/:id ]
apiRouter.put("/books/:id", (req, res) => {
  try {
    const bookId = parseInt(req.params.id, 10);

    if (isNaN(bookId)) return res.status(400).json({
      error: "Input must be a number"
    });

    const { title, author } = req.body;

    if (!title) return res.status(400).json({
      error: "Bad Request"
    });

    const result = books.updateOne({ id: bookId }, { title, author });

    if (result.matchedCount === 0) return res.status(404).json({
      error: "Book not found"
    });

    res.status(204).send();

  } catch (error) {

    res.status(500).json({ error: "Internal Server Error" });

  }
});


/** IN-N-Out-Books: Login API route
 ** ------------------------------------------------------------------------------- */

// Handles site logins @ route -> [ http://localhost:3000/api/login ]
apiRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email or password is missing
    if (!email || !password) return res.status(400).json({
      message: 'Bad Request: Missing email or password'
    });

    // Find the user by email
    const user = await users.findOne({ email });

    // If user is not found, return 401 Unauthorized
    if (!user) return res.status(401).json({
      message: 'Unauthorized'
    });

    // Compare the provided password with the stored hashed password
    const passwordMatch = bcrypt.compareSync(password, user.password);

    // If passwords do not match, return 401 Unauthorized
    if (!passwordMatch) return res.status(401).json({
      message: 'Unauthorized'
    });

    // If credentials are correct, return 200 with success message
    return res.status(200).json({
      message: 'Authentication successful'
    });

  } catch (error) {

    // Handle any unexpected errors
    return res.status(500).json({
      message: 'Internal Server Error'
    });

  }
});


/** IN-N-Out-Books: Security Question API route
 ** ------------------------------------------------------------------------------- */

// Handled verification of a user's security questions
apiRouter.post('/users/:email/verify-security-question', async (req, res) => {
  try {
    const
    { email } = req.params,

    // Expecting an array of answers in the request body
    { answers } = req.body;

    // Validate the request body using AJV
    const valid = validate(req.body);

    if (!valid) return res.status(400).json({
      error: 'Bad Request'
    });

    // Find the user by email
    const user = await users.findOne({ email });

    if (!user) return res.status(401).json({
      error: 'Unauthorized'
    });

    // Compare the provided answers with the user's stored answers
    for (let i = 0; i < answers.length; i++) {
      if (answers[i].answer !== user.securityQuestions[i].answer) return res.status(401).json({
        error: 'Unauthorized'
      });
    }

    // If all answers match, return success
    return res.status(200).json({
      message: 'Security questions successfully answered'
    });

  } catch (error) {

    // Handle any unexpected errors
    return res.status(500).json({
      error: 'Internal Server Error'
    });

  }
});


/** IN-N-Out-Books: API route mount
 ** ------------------------------------------------------------------------------- */

// Handles API routes
app.use("/api", apiRouter);



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