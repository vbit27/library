const backdrop = document.querySelector('.backdrop');
const addNewBook = document.querySelector('.add-book-btn');
const addInputContainer = document.querySelector('.add-input-container');
const bookContainer = document.querySelector('.grid-container');


let myLibrary = [];


// Add local memory


function getFromLocalMemory () {
  let originalLibrary = JSON.parse(localStorage.getItem("MyLibrary"))
    if (originalLibrary) {
      myLibrary = originalLibrary;
      displayBook(myLibrary);
    }
}

getFromLocalMemory();


function setToLocalMemory (lib) {
  if (lib !== []) {
    let myLibraryLocal = JSON.stringify(myLibrary);
    localStorage.setItem("MyLibrary", myLibraryLocal);
  }
}





// Toggles pop up window

function toggleWindow () {
  addInputContainer.classList.toggle('visible');
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
    bookContainer.appendChild(singleBookContainer);
    
    for (let key in list[i]) {
      if (key == 'status') {
        const status = document.createElement('button')
        const statusStage = list[i].status;
        status.classList.add('read-status');
        status.setAttribute('data-status', i)
        if (statusStage) {
          status.textContent = 'Read';
        } else {
          status.textContent = 'Not Read';
        }  
        singleBookContainer.appendChild(status);
        break;
      }
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

  setToLocalMemory(myLibrary);
}


// Removes the single book card

function removeFromList (e) {

  if (e.target.classList.value === 'delete-button') {
    let num = e.target.id;
    myLibrary.splice(num, 1);
    bookContainer.innerHTML = '';

    displayBook(myLibrary);

  }
}


// Toggle the read status

function toggleStatus(e) {
  if (e.target.classList.value == 'read-status') {

    const position = e.target.attributes[1].value;

    if (myLibrary[position].status) {
      myLibrary[position].status = false;
    } else  myLibrary[position].status = true;

    displayBook(myLibrary);

  } 

}





bookContainer.addEventListener('click', (e) => {
  removeFromList(e);
});

bookContainer.addEventListener('click', (e) => {
  toggleStatus(e);
})

backdrop.addEventListener('click', (e) => {backdropHandler(e)});
addNewBook.addEventListener('click', addBookToLibraryHandler);
