import EBook from './EBook.js';
import Kindle from './Kindle.js';

const kindle = new Kindle();

const book001 = new EBook({
  title: "Harry Potter and the Philosopher's Stone",
  genre: 'Fantasy',
  author: 'J. K. Rowling',
  cover: 'https://i.imgur.com/PH1aXaP.jpg'
});

const book002 = {
  title: 'The Lord of the Rings - The Fellowship of the Ring',
  genre: 'Fantasy',
  author: 'J. R. R. Tolkien',
  cover: 'https://i.imgur.com/OwMUnQu.jpg'
};

kindle.add(book001).add(book002);

const library = kindle.library;
const librarySize = kindle.size;
const currentEBook = kindle.currentEBook;

console.log({ library, librarySize, currentEBook });

kindle.finishCurrentBook();

console.log({ library, librarySize, currentEBook });

const kindleStats = kindle.stats;
const book001Stats = kindle.state(book001);

console.log({ kindleStats, book001Stats });
console.log(kindle.recentSearches());
