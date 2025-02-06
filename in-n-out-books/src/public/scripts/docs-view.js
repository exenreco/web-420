document.addEventListener("DOMContentLoaded", () =>{
  const

  // remove bad html
  escapeHTML = (code) => {
    return code
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  },

  fetchSingle = (() => `
    // fetching a single book
    async () => {
      const book1 = await fetch('https://site-name/api/books/1');
    };
  `)(),

  singleExpected = (() => `
    // Expect book to be:
    {
      id:           '1',
      title:        'Sample book',
      cover:        'https://sample-book-cover.jpeg',
      author:       'Susan Bell',
      source:       'https://link-to-book.pdf',
      description:  'Talks about sample book'
    }
  `)(),

  fetchAll = (() => `
    // fetching all books
    async () => {
      const books = await fetch('https://site-name/api/books/');
    };
  `)(),

  allExpected = (() => `
    // Expect books to be:
    [{
      id:           '1',
      title:        'Sample book',
      cover:        'https://sample-book-cover.jpeg',
      author:       'Susan Bell',
      source:       'https://link-to-book.pdf',
      description:  'Talks about sample book'
    },
    {
      id:           '2',
      title:        'Sample book 2',
      cover:        'https://sample-book2-cover.jpeg',
      author:       'Anthony Bell',
      source:       'https://link-to-book2.pdf',
      description:  'About sample 2 book'
    }, ... ]
  `)(),

  addingBook = (() => `
    await fetch('https://site-name/api/books/', {
      method: 'POST',
      mode: 'cors',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        id:           '1',
        title:        'Sample book',
        cover:        'https://sample-book-cover.jpeg',
        author:       'Susan Bell',
        source:       'https://link-to-book.pdf',
        description:  'Talks about sample book'
      })
    });
    return response.json();
  `)(),

  addingBookExpected = (() => `
    // When valid expect a 201-status code
    // When no provided title expect 400-status
  `)(),

  codeBlocks = {
    fetchAll: Prism.highlight(fetchAll, Prism.languages.javascript, 'javascript'),
    fetchSingle: Prism.highlight(fetchSingle, Prism.languages.javascript, 'javascript'),
    singleExpected: Prism.highlight(singleExpected, Prism.languages.javascript, 'javascript'),
    allExpected: Prism.highlight(allExpected, Prism.languages.javascript, 'javascript'),
    addingBook: Prism.highlight(addingBook, Prism.languages.javascript, 'javascript'),
    addingBookExpected: Prism.highlight(addingBookExpected, Prism.languages.javascript, 'javascript'),
  },

  bookRequest = document.getElementById('book-request'),
  bookExpected = document.getElementById('book-expected'),

  booksRequest = document.getElementById('books-request'),
  booksExpected = document.getElementById('books-expected'),

  addBookRequest = document.getElementById('add-book-request'),
  addBookExpected = document.getElementById('add-book-expected');

  // update page
  bookRequest.innerHTML = `<pre><code class="language-javascript">${codeBlocks.fetchSingle}</code></pre>`,
  bookExpected.innerHTML = `<pre><code class="language-javascript">${codeBlocks.singleExpected}</code></pre>`,

  booksRequest.innerHTML = `<pre><code class="language-javascript">${codeBlocks.fetchAll}</code></pre>`,
  booksExpected.innerHTML = `<pre><code class="language-javascript">${codeBlocks.allExpected}</code></pre>`,

  addBookRequest.innerHTML = `<pre><code class="language-javascript">${codeBlocks.addingBook}</code></pre>`,
  addBookExpected.innerHTML = `<pre><code class="language-javascript">${codeBlocks.addingBookExpected}</code></pre>`;
});