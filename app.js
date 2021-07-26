const backdrop = document.querySelector('.backdrop');
const addNewBook = document.querySelector('.add-book-btn');
const popUpContainer = document.querySelector('.pop-up-container');
const gridContainer = document.querySelector('.grid-container');

let myLibrary = [];

// Add local memory

function getFromLocalMemory() {
  let originalLibrary = JSON.parse(localStorage.getItem('MyLibrary'));
  if (originalLibrary) {
    myLibrary = originalLibrary;
    displayBook(myLibrary);
  }
}

getFromLocalMemory();

function setToLocalMemory(lib) {
  if (lib !== []) {
    let myLibraryLocal = JSON.stringify(myLibrary);
    localStorage.setItem('MyLibrary', myLibraryLocal);
  }
}

// Toggles pop up window

function toggleWindow() {
  popUpContainer.classList.toggle('visible');
  clear();
  greyBackdrop();
}

function greyBackdrop() {
  backdrop.classList.toggle('visible');
}

function backdropHandler(e) {
  if (e.target.className === 'backdrop visible') {
    toggleWindow();
  }
}

// Toggle empty directory message

function toggleEmptyDirectory() {
  const emptyDirectory = document.querySelector('.empty-directory');

  if (gridContainer.hasChildNodes()) {
    emptyDirectory.classList.add('hide');
  } else if (!gridContainer.hasChildNodes()) {
    emptyDirectory.classList.remove('hide');
  }
}

// Object Contructor

class Book {
  constructor(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
  }
}

// Operates pop up windows buttons

function addBookToLibraryHandler() {
  const submit = document.getElementById('submit');
  const cancelSubmit = document.getElementById('cancel-submit');

  toggleWindow();

  submit.addEventListener('click', confirmAddBook);
  cancelSubmit.addEventListener('click', toggleWindow);
}

// Adds a book inside myList array

function confirmAddBook() {
  const title = document.getElementById('book-title').value;
  const author = document.getElementById('book-author').value;
  const pages = document.getElementById('book-pages').value;
  const read = document.getElementById('book-read').checked;

  if (title && author && pages) {
    let newBook = new Book(title, author, pages, read);

    myLibrary.push(newBook);
    displayBook(myLibrary);
    toggleWindow();
    clear();
  } else return alert('Please add all the information');
}

// Clear input field

function clear() {
  document.getElementById('book-title').value = '';
  document.getElementById('book-author').value = '';
  document.getElementById('book-pages').value = '';
  document.getElementById('book-read').checked = false;
}

// Displays the added book on the screen

function displayBook(list) {
  gridContainer.innerHTML = '';

  for (let i = 0; i <= list.length - 1; i++) {
    let singlegridContainer = document.createElement('div');

    singlegridContainer.classList.add('book-container');
    gridContainer.appendChild(singlegridContainer);

    for (let key in list[i]) {
      if (key == 'status') {
        const status = document.createElement('button');
        const statusStage = list[i].status;
        status.classList.add('read-status');
        status.setAttribute('data-status', i);
        if (statusStage) {
          status.textContent = 'Read';
        } else {
          status.textContent = 'Not Read';
        }
        singlegridContainer.appendChild(status);
        break;
      }
      let paragraph = document.createElement('p');
      paragraph.textContent = list[i][key];
      singlegridContainer.appendChild(paragraph);
    }
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.setAttribute('id', i);
    deleteButton.classList.add('delete-button');
    singlegridContainer.appendChild(deleteButton);
  }

  setToLocalMemory(myLibrary);
  toggleEmptyDirectory();
}

// Removes the single book card

function removeFromList(e) {
  if (e.target.classList.value === 'delete-button') {
    let num = e.target.id;
    myLibrary.splice(num, 1);
    gridContainer.innerHTML = '';

    displayBook(myLibrary);
  }
}

// Toggle the read status

function toggleStatus(e) {
  if (e.target.classList.value == 'read-status') {
    const position = e.target.attributes[1].value;

    if (myLibrary[position].status) {
      myLibrary[position].status = false;
    } else myLibrary[position].status = true;

    displayBook(myLibrary);
  }
}

gridContainer.addEventListener('click', (e) => {
  removeFromList(e);
});

gridContainer.addEventListener('click', (e) => {
  toggleStatus(e);
});

backdrop.addEventListener('click', (e) => {
  backdropHandler(e);
});
addNewBook.addEventListener('click', addBookToLibraryHandler);
