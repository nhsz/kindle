export default class EBook {
  constructor ({ title, genre, author, cover }) {
    this.title = title;
    this.genre = genre;
    this.author = author;
    this.cover = cover;
  }

  static isEqual (eBookA, eBookB) {
    const { title: titleA, genre: genreA, author: authorA } = eBookA;
    const { title: titleB, genre: genreB, author: authorB } = eBookB;

    return titleA === titleB && genreA === genreB && authorA === authorB;
  }
}
