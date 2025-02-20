const newBookBtn = document.querySelector('.new-book-btn');

const modal = document.querySelector('.modal');
const bookForm = document.getElementById('book-form');
const submitBtn = document.querySelector('.submit-btn');

const titleInput = document.querySelector('.title-input');
const authorInput = document.querySelector('.author-input');
const numberInput = document.querySelector('.number-input');
const yesInput = document.querySelector('.yes-input');
const noInput = document.querySelector('.no-input');

const titleError = document.getElementById('title-error');
const authorError = document.getElementById('author-error');
const numberError = document.getElementById('number-error');
const radioError = document.getElementById('radio-error');

let myLibrary = [];

class Book {
  constructor(title, author, pages, isReaded) {
    this.id = Date.now();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isReaded = isReaded;
  }

  toggleReadStatus() {
    this.isReaded = this.isReaded === 'Yes' ? 'No' : 'Yes';
  };
}

function collectInputValues() {
  const modalInputs = document.querySelectorAll('.modal input');

  const inputValues = Array.from(modalInputs).map(input => {
    if (input.type === 'radio' && input.name === 'read') {
      return document.querySelector('input[name="read"]:checked').value;
    }
    return input.value;
  });

  const newBook = new Book(
    inputValues[0],
    inputValues[1],
    inputValues[2],
    inputValues[3]
  );

  myLibrary.push(newBook);
  displayBook();
}

function displayBook() {
  const bookContainer = document.querySelector('.books-container');
  bookContainer.innerHTML = '';

  if (myLibrary.length === 0) {
    const emptyEl = document.createElement('p');
    emptyEl.classList.add('empty');
    emptyEl.innerText = `You didn't add any book yet`;

    bookContainer.append(emptyEl);
  } else {
    myLibrary.forEach(book => {
      const bookEl = document.createElement('div');
      bookEl.classList.add('book');
      bookEl.dataset.id = book.id;
      bookEl.innerHTML = `${book.title} is written by ${book.author} and has ${book.pages} pages. <br> <br> Readed? ${book.isReaded}`;

      const buttonContainer = document.createElement('div');
      buttonContainer.classList.add('book-buttons');

      const deleteBtn = document.createElement('button');
      deleteBtn.classList.add('delete-btn');
      deleteBtn.innerText = 'Delete';
      deleteBtn.addEventListener('click', () => deleteBook(book.id));

      const changeStatusBtn = document.createElement('button');
      changeStatusBtn.classList.add('change-status-btn');
      changeStatusBtn.innerText = 'Change Status';
      changeStatusBtn.addEventListener('click', () => {
        book.toggleReadStatus();
        displayBook();
      });

      buttonContainer.appendChild(deleteBtn);
      buttonContainer.appendChild(changeStatusBtn);

      bookEl.appendChild(buttonContainer);
      bookContainer.append(bookEl);
    });
  }
}

function deleteBook(bookId) {
  myLibrary = myLibrary.filter(book => book.id !== bookId);

  displayBook();
}

newBookBtn.addEventListener('click', () => {
  modal.showModal();
});

const fields = [
  { input: document.getElementById('title'), error: document.getElementById('title-error') },
  { input: document.getElementById('author'), error: document.getElementById('author-error') },
  { input: document.getElementById('pages'), error: document.getElementById('number-error') },
  { input: document.querySelector('input[name="read"]'), error: document.getElementById('radio-error') },
];

function validateField(field) {
  const { input, error } = field;

  if (input.type === 'radio') {
    const radioGroup = document.querySelectorAll(`input[name="${input.name}"]`);
    const isChecked = Array.from(radioGroup).some(radio => radio.checked);
    error.textContent = isChecked ? "" : "Please select an option!";
    return isChecked;
  }

  if (!input.value.trim()) {
    error.textContent = "This field is required!";
    input.classList.add('invalid');
    return false;
  } else {
    error.textContent = "";
    input.classList.remove('invalid');
    return true;
  }
}

bookForm.addEventListener('submit', (event) => {
  event.preventDefault();

  let isValid = true;

  fields.forEach(field => {
    if (!validateField(field)) {
      isValid = false;
    }
  });

  if (isValid) {
    collectInputValues();
    bookForm.reset();
    modal.close();
  }
});

fields.forEach(field => {
  field.input.addEventListener('input', () => validateField(field));
});

displayBook();