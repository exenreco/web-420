async function fetchBookDetails(book) {
  try {
    if (!book || !book.id || !book.title || !book.source) {
      throw new Error("Invalid book data received.");
    }

    const theFrame = document.getElementById('reader-frame');

    if ( ! theFrame ) throw Error(`
      There was an error while trying to communicate with the reader iframe,
      check if the element exists!
    `);

    theFrame.src = ('source' in book && typeof book.source === 'string' )
    ? book.source
    : ''

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


