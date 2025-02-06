const newBookBtn = document.querySelector('.new-book-btn');

const modal = document.querySelector('.modal');
const bookForm = document.getElementById('book-form');
const submitBtn = document.querySelector('.submit-btn');

const titleInput = document.querySelector('.title-input');
const authorInput = document.querySelector('.author-input');
const numberInput = document.querySelector('.number-input');
const yesInput = document.querySelector('.yes-input');
const noInput = document.querySelector('.no-input');

const myLibrary = [];

function addBookToLibrary(title, author, pages, isReaded) {
  const book = {
    title: title,
    author: author,
    pages: pages,
    isReaded: isReaded
  };
  return book;
}

const newBook = addBookToLibrary('Robinson Crusoe', 'Daniel Defo', '300', 'Readed');

myLibrary.push(newBook);

console.log(myLibrary);

function displayBook() {
  myLibrary.forEach((book) => {
    const bookContainer = document.querySelector('.books-container');

    const bookEl = document.createElement('p');
    bookEl.classList.add('book');
    bookEl.innerText = `${book.title} is written by ${book.author} and has ${book.pages} pages. Status: ${book.isReaded}`;

    bookContainer.append(bookEl);
  });
}

displayBook();

function Book(title, author, pages, isReaded) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isReaded = isReaded;
}

const book1 = new Book('Mysterious island', 'Jules Verne', '320', 'Not readed');
myLibrary.push(book1);

newBookBtn.addEventListener('click', () => {
  modal.showModal();
});

bookForm.addEventListener('submit', (e) => {
  e.preventDefault();
  alert('Book added succesfully!');
  modal.close();
});