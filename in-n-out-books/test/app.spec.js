/**
 * Author:      Exenreco Bell
 * Date:        January 29, 2025
 * File Name:   app.spec.js
 * Description: Test suite for in-n-out-books API.
 */

import request from "supertest";

import app from "../src/app.js";

describe("Chapter 3: API Tests", () => {

  // Test case: Should return an array of books
  test("Should return an array of books", async () => {
    const response = await request(app).get("/api/books");

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body[0]).toHaveProperty("id");
    expect(response.body[0]).toHaveProperty("title");
    expect(response.body[0]).toHaveProperty("author");
  });

  // Test case: Should return a single book
  test("Should return a single book", async () => {
    const response = await request(app).get("/api/books/1");

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id", 1);
    expect(response.body).toHaveProperty("title");
    expect(response.body).toHaveProperty("author");
  });

  // Test case: Should return a 400 error if the id is not a number
  test("Should return a 400 error if the id is not a number", async () => {
    const response = await request(app).get("/api/books/abc");

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error", "Invalid book ID, 'ID' must be a number.");
  });

});

describe("Chapter 4: API Tests", () => {

  test("Should return a 201-status code when adding a new book", async () => {
    const
    newBook   = { id: 1, title: "New Book", author: "John Doe" },
    response  = await request(app).post("/api/books").send(newBook);

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject(newBook);
  });

  test("Should return a 400-status code when adding a new book with missing title", async () => {
    const
    newBook   = { id: 2, author: "Jane Doe" }, // Missing title
    response  = await request(app).post("/api/books").send(newBook);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error", "Book title is required.");
  });

  test("Should return a 204-status code when deleting a book", async () => {
    const bookId = 1;

    // First, add a test book to delete
    await request(app)
      .post("/api/books")
      .send({ id: bookId, title: "To Delete", author: "Author" });

    // Delete the test book
    const response = await request(app).delete(`/api/books/${bookId}`);

    expect(response.status).toBe(204);
  });

});