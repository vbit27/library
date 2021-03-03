let myLibrary = [];

function Book(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
}

function addBookToLibrary() {
  const title = document.getElementById('book-title').value;
  const author = document.getElementById('book-author').value;
  const pages = document.getElementById('book-pages').value;
  const read = document.getElementById('book-read').checked;

let newBook
 
function addBook() {
  newBook = new Book(title, author, pages, read)  
  console.log(newBook);
  return newBook
}

addBook()


myLibrary.push(newBook)
console.log(myLibrary);


}


const submit = document.getElementById('submit');
submit.addEventListener('click', addBookToLibrary)
