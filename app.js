const addNewBook = document.querySelector('.add-book-btn');
const addInputContainer = document.querySelector('.add-input-container');


function toggleWindow () {
  addInputContainer.classList.toggle('visible');
}
  

let myLibrary = [];

function Book(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
}

function addBookToLibraryHandler() {
  const submit = document.getElementById('submit');
  const cancelSubmit = document.getElementById('cancel-submit');

  toggleWindow();

  submit.addEventListener('click', confirmAddBook)  
  cancelSubmit.addEventListener('click', toggleWindow);
}


function confirmAddBook() {
  const title = document.getElementById('book-title').value;
  const author = document.getElementById('book-author').value;
  const pages = document.getElementById('book-pages').value;
  const read = document.getElementById('book-read').checked;

  let newBook = new Book(title, author, pages, read)  

  myLibrary.push(newBook)

  toggleWindow();
} 




addNewBook.addEventListener('click', addBookToLibraryHandler)
