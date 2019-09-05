import EBook from './EBook.js';
import Buffer from './Buffer.js';
import { normalize, match, sortCriteria } from './utils.js';

export default class Kindle {
  constructor () {
    this._library = [];
    this._current = null;
    this._next = null;
    this._last = null;
    this.eBookState = new Map();
    this.stats = {
      readBooks: 0,
      notReadYetBooks: 0,
      recentSearches: new Buffer({ size: 5, init: '' })
    };
  }

  /**
   * private methods
   */
  _hasNoCurrentEBook () {
    return !this._current;
  }

  _wasRead (eBook) {
    return this.eBookState.get(eBook).read;
  }

  _updateNextEBook () {
    const unreadEBooks = this._library.filter(eBook => !this._wasRead(eBook) && EBook.isEqual(eBook, this._current));
    const nextBook = unreadEBooks[0];

    return nextBook !== undefined ? nextBook : null;
  }

  _hasNoNextEBook () {
    return !this._next;
  }

  _contains (newEBook) {
    return this._library.some(book => EBook.isEqual(book, newEBook));
  }

  /**
   * public interface
   */
  add (newEBook) {
    if (this._contains(newEBook)) {
      console.warn(`${newEBook.title} already exists in library.`);

      return;
    }

    this._current = this._current ? this._current : newEBook;
    this._next = this._hasNoNextEBook() ? newEBook : this._next;
    this.stats.notReadYetBooks++;
    this._library.push(newEBook);
    this.eBookState.set(newEBook, { read: false, date: null });

    return this;
  }

  finishCurrentBook () {
    if (this._hasNoCurrentEBook()) {
      console.error('There is no current book to finish, you must add one first.');

      return;
    }

    this.eBookState.set(this._current, { read: true, date: new Date() });
    this._last = this._current;
    this._current = this._next;
    this._next = this._updateNextEBook();
    this.stats.readBooks++;
    this.stats.notReadYetBooks--;

    return this;
  }

  filterBy (criteria) {
    const state = criteria === 'read';

    const results = this.library.filter(eBook => {
      const eBookRead = this._wasRead(eBook);

      return eBookRead === state;
    });

    if (!results) {
      console.log('You have no items that match the selected filters');
    }
  }

  search (keywords) {
    const _keywords = normalize(keywords);
    this.stats.recentSearches.add(_keywords);

    const results = this.library.filter(eBook => match(_keywords, eBook.title) || match(_keywords, eBook.author));

    if (!results) {
      console.log('There are no results found in your library');
    }
  }

  sortBy (criteria) {
    return [...this.library].sort(sortCriteria(criteria));
  }

  recentSearches () {
    this.stats.recentSearches.display();
  }

  clearHistory () {
    this.stats.recentSearches.clear();
  }

  state (eBook) {
    return this.eBookState.get(eBook);
  }

  // getters
  get library () {
    return this._library.map(({ title, genre, author, cover }) => ({ title, genre, author, cover }));
  }

  get size () {
    return this._library.length;
  }

  get currentEBook () {
    if (this._hasNoCurrentEBook()) {
      console.error('There is no current book, you must add one first.');

      return;
    }

    const { title, genre, author, cover } = this._current;

    return {
      title,
      genre,
      author,
      cover
    };
  }

  // setters
  set currentEBook (eBook) {
    if (!EBook.isEqual(this.currentEBook, eBook)) {
      if (!this._contains(eBook)) {
        console.error('The eBook must belong to the library. Add it first.');

        return;
      }

      this._next = this._current;
      this._current = eBook;
    }
  }
}
