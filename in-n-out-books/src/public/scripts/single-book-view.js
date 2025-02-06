async function fetchBookDetails(book) {
  try {
    if (!book || !book.id || !book.title || !book.source) {
      throw new Error("Invalid book data received.");
    }

    // Select the container where book details will be displayed
    const

    // the image element for the book cover
    cover = document.createElement('img'),

    // the page title element
    bookTitle = document.getElementById("book-title"),

    // the page book element
    bookDetails = document.getElementById("book-details"),

    // the cover image container
    coverContainer = document.getElementById("cover-container"),

    titleEl = document.getElementById("browser-title");

    if (!bookDetails) throw new Error(`
      Book details container not found.
    `);

    // update the book title
    bookTitle.textContent = (book && 'title' in book && typeof book.title === 'string' )
    ? book.title
    : 'book title is undefined!'

    // add cover image css class
    cover.classList.add( 'cover-image' ),

    // set the cover url
    cover.src = ( book && 'cover' in book && typeof book.cover  === 'string')
    ? book.cover
    : '';

    // set the cover alt text
    cover.alt = ( book && 'title' in book && typeof book.title  === 'string')
    ? (() => `Book cover for - ${book.title}`)()
    : 'Book Cover';

    // Create and append book details to the container
    bookDetails.innerHTML = `
      <li><strong>Title:</strong>${book.title}</li>
      <li><strong>Book ID:</strong> ${book.id}</li>
      <li><strong>Author:</strong> ${book.author}</li>
      <li><strong>Source:</strong> ${book.source}</li>
      <li><strong>Cover URL:</strong> ${book.cover}</li>
      <li><strong>Description:</strong> ${book.description}</li>
    `;

    // update browser title
    titleEl.innerHTML += `: ${book.title}`

    // adds the cover image to the page
    coverContainer.appendChild(cover)

  } catch (error) {

    console.error("Error fetching book details:", error);

  }
}

document.addEventListener("DOMContentLoaded", async () => {
  try {
    // Extract the book title from the URL
    const
    pathParts = window.location.pathname.split("/"),
    title = decodeURIComponent(pathParts[2]), // Extracts ':title' from '/books/:title'
    response = await fetch(`/api/books`); // Fetch all books from API

    if (!response.ok) throw new Error(`
      API request failed with status ${response.status}
    `);

    const books = await response.json();

    // Find the book with the matching title
    const book = books.find(b => title.toLocaleLowerCase() === b.title.toLocaleLowerCase());

    if (!book) throw new Error(
      "Book not found."
    );

    fetchBookDetails(book);

  } catch (error) {

    console.error("Error loading book details:", error);

  }
});


