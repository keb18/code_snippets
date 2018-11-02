// ===================================================
// Book Constructor -> handle creating the book object
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

// ====================================================================
// UI Constructor -> set of proptotype methods to add, show alert, etc.
function UI() { }

// add book to list
UI.prototype.addBookToList = function (book) {
  const list = document.getElementById('book-list');
  // Create tr element
  const row = document.createElement('tr');
  // insert info to tr
  row.innerHTML = `
  <td>${book.title}</td>
  <td>${book.author}</td>
  <td>${book.isbn}</td>
  <td><a href="#" class="delete">x</a></td>
  `;
  list.appendChild(row);
}


// Delete book
UI.prototype.deleteBook = function (target) {
  if (target.className === 'delete') {
    target.parentElement.parentElement.remove();
  }
}

// Clear fields
UI.prototype.clearFields = function () {
  document.getElementById('title').value = "";
  document.getElementById('author').value = "";
  document.getElementById('isbn').value = "";
}

// Alert
UI.prototype.showAlert = function (message, className) {
  // Create div
  const div = document.createElement('div');
  // Add classes
  div.className = `alert ${className}`;
  // Add text
  div.appendChild(document.createTextNode(message));
  // Get parent
  const container = document.querySelector('.container');
  // Get form
  const form = document.querySelector('#book-form');
  // Insert alert
  container.insertBefore(div, form);
  // Timeout after 3s
  setTimeout(() => {
    document.querySelector('.alert').remove()
  }, 3000);
}

// Event listener for add book
document.getElementById('book-form').addEventListener('submit', function (e) {
  // get form values
  const title = document.getElementById('title').value,
    author = document.getElementById('author').value,
    isbn = document.getElementById('isbn').value

  // instantiate the book
  const book = new Book(title, author, isbn);

  // instantiate the UI object
  const ui = new UI();

  // Validate input
  if (title === '' || author === '' || isbn === '') {
    // Error alert
    ui.showAlert('Please fill in all fields', 'error');
  } else {
    // add book to list
    ui.addBookToList(book);

    // Show success
    ui.showAlert('Book added!', 'success');

    // clear fields after adding book
    ui.clearFields();
  }

  e.preventDefault(); // stop the form from submitting
});

// Event listener for delete book
// target the parent of the element used to delete (which is dynamically created - this is done from a prototype function of the UI)
document.getElementById('book-list').addEventListener('click', function (e) {
  // Instantiate UI
  const ui = new UI();
  // Delete book
  ui.deleteBook(e.target);
  // Show messate
  ui.showAlert("Book removed!", "success");

  e.preventDefault();
})