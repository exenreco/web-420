document.addEventListener("DOMContentLoaded", async () => {
  const

  // Fetch books from API
  response  = await fetch('/api/books'),

  // Wait for books
  books     = await response.json(),

  // Select element to contain books
  bookList  = document.getElementById("book-list");

  let counter = 0;

  // Renders each books
  books.forEach(book => {

    counter++;

    const
    li = document.createElement("li"),
    hr = document.createElement('hr');

    li.classList.add("book-item");

    li.innerHTML = (() => `
      <div class="container">
        <div class="cover">
          <img class="cover-image" src="${book.cover}" alt="Book Cover for ${book.title}">
        </div>
        <section class="info">
          <h3 class="title">
            <small><strong>${book.author} -- </strong></small><br>
            ${book.title}
          </h3>
          <hr>
          <p class="description">${book.description}</p>
          <na class="book-nav">
            <a id="book-${book.id}-read" href="/books/${encodeURIComponent(book.title)}/read" class="book-link">Read Book</a>
            <a id="book-${book.id}-more" href="/books/${encodeURIComponent(book.title)}" class="book-link">Book Info</a>
          </na>
        </section>
      </div>
    `)()

    bookList.appendChild(li);

    ( counter < books.length && counter > 0 ) ? bookList.appendChild(hr) : null;

  });
});