/**
 * Author: Professor Krasso
 * Date: 4/1/2024
 * File Name: books.js
 * Description: Books collection file for the in-n-out-books application; used to store book data
 */

// Require the Collection class
import Collection from "./collection.js";

// Array of book objects
const books = new Collection([
  {
    id: 1,
    cover: 'https://m.media-amazon.com/images/I/71Ep7UNeTtL._AC_UF1000,1000_QL80_.jpg',
    title: "The Fellowship of the Ring",
    source: 'https://s3.amazonaws.com/scschoolfiles/112/j-r-r-tolkien-lord-of-the-rings-01-the-fellowship-of-the-ring-retail-pdf.pdf',
    author: "J.R.R. Tolkien",
    description: (() => `The story begins in the peaceful Shire, where the hobbit Frodo Baggins inherits
      the One Ring from his uncle, Bilbo Baggins. The wizard Gandalf discovers the Ring's dark history
      and reveals that it must be destroyed to prevent the dark lord Sauron from conquering Middle-earth.
      Frodo sets out on a dangerous journey to take the Ring to the fires of Mount Doom, where it was
      forged, and where it can be destroyed.
  `)(),
  },

  {
    id: 2,
    cover: 'https://m.media-amazon.com/images/I/818FB6bF4aL.jpg',
    title: "Harry Potter and the Philosopher's Stone",
    source: 'https://thebookshelfbeforeme.wordpress.com/wp-content/uploads/2020/04/harry-potter-and-the-philosophers-stone-by-jk-rowling.pdf',
    author: "J.K. Rowling",
    description: (() => `Harry Potter, an eleven-year-old orphan, lives with his unpleasant aunt, uncle,
      and cousin. His life changes dramatically when he receives a letter informing him that he is a
      wizard and has been accepted to Hogwarts School of Witchcraft and Wizardry. At Hogwarts, Harry
      makes new friends, including Ron Weasley and Hermione Granger, and discovers the magical world
      he belongs to.
    `)(),
  },
  {
    id: 3,
    cover: 'https://m.media-amazon.com/images/I/71nNxfSvGnL._UF1000,1000_QL80_.jpg',
    title: "The Two Towers",
    source: 'https://rsd2-alert-durden-reading-room.weebly.com/uploads/6/7/1/6/6716949/02-the-two-towers.pdf',
    author: "J.R.R. Tolkien",
    description: (() => `
      Frodo Baggins and Samwise Gamgee continue their perilous journey to Mordor to destroy the One Ring.
      They are joined by Gollum, who becomes their guide, although his intentions are questionable.
      They face numerous dangers, including the treacherous terrain of the Dead Marshes and the
      ever-watchful eyes of Sauron's minions.
    `)(),
  },
  {
    id: 4,
    cover: 'https://katemacdonald.net/wp-content/uploads/2015/11/chamber-1.jpg',
    title: "Harry Potter and the Chamber of Secrets",
    source: 'https://www.scholastic.com/hpread/HP_Book2_Chapter_Excerpt.pdf',
    author: "J.K. Rowling",
    description: (() => `Harry Potter returns to Hogwarts School of Witchcraft and Wizardry for
      his second year. However, his arrival is marred by ominous warnings from a house-elf named
      Dobby, who tells Harry that he is in grave danger. Despite these warnings, Harry continues
      with his school life, reuniting with his friends Ron and Hermione.
    `)(),
  },
  {
    id: 5,
    cover: 'https://m.media-amazon.com/images/I/71tDovoHA+L._AC_UF1000,1000_QL80_.jpg',
    title: "The Return of the King",
    source: 'https://store.veritaspress.com/site/assets/490760-the-return-of-the-king-lis.pdf',
    author: "J.R.R. Tolkien",
    description: (() => `The story continues with the divided Fellowship as they face the final battles
      against Sauron's forces.<br>Aragorn, along with Legolas, Gimli, and the Rangers of the North,
      travels through the Paths of the Dead to enlist the help of the Army of the Dead. With their
      aid, they defeat the Corsairs of Umbar and sail to Minas Tirith to aid in the defense against
      Sauron's forces.
    `)(),
  },
]);

export default books; // export the books collection