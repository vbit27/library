const addNewBook = document.querySelector('.add-book-btn');
const addInputContainer = document.querySelector('.add-input-container');
const bookContainer = document.querySelector('.grid-container');
const deleteButtonElements = document.querySelectorAll('.delete-button');


let myLibrary = [];



// Toggles pop up window

function toggleWindow () {
  addInputContainer.classList.toggle('visible');
}
  
// Object Contructor

function Book(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
}


// Operates pop up windows buttons

function addBookToLibraryHandler() {
  const submit = document.getElementById('submit');
  const cancelSubmit = document.getElementById('cancel-submit');

  toggleWindow();

  submit.addEventListener('click', confirmAddBook)  
  cancelSubmit.addEventListener('click', toggleWindow);
}


// Adds a book inside myList array

function confirmAddBook() {
  const title = document.getElementById('book-title').value;
  const author = document.getElementById('book-author').value;
  const pages = document.getElementById('book-pages').value;
  const read = document.getElementById('book-read').checked;

  let newBook = new Book(title, author, pages, read)  


  myLibrary.push(newBook)
  displayBook(myLibrary);

  toggleWindow();
} 


// Displays the added book on the screen


function displayBook(list) {
  bookContainer.innerHTML = '';


  for(let i = 0; i <= list.length - 1; i++) {
    let singleBookContainer = document.createElement('div');
    
    singleBookContainer.classList.add('book-container');
    singleBookContainer.setAttribute('data-position', `${i}`);
    bookContainer.appendChild(singleBookContainer);
    
    for (let key in list[i]) {
      let paragraph = document.createElement('p');
      paragraph.textContent = list[i][key];
      singleBookContainer.appendChild(paragraph);
      
    }
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.setAttribute('id', i);
      deleteButton.classList.add('delete-button');
      singleBookContainer.appendChild(deleteButton);
    
  }
  
}


// GET THE CLASS NUMBER SO YOU CAN USE IT ON THE ARRAY!!!!!!!!  EVent Delegation!!

function removeFromList (e) {

  if (e.target.classList.value === 'delete-button') {
    let num = e.target.id;
    myLibrary.splice(num, 1);
    bookContainer.innerHTML = '';

    displayBook(myLibrary);

  }
}



bookContainer.addEventListener('click', (e) => {
  removeFromList(e);
});


addNewBook.addEventListener('click', addBookToLibraryHandler)
