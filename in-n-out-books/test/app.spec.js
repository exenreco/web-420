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