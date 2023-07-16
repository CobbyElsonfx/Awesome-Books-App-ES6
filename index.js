import Book from './modules/Book.js';
import { DateTime } from './modules/luxon.js';
import { initializeNavigation } from './modules/navigation.js';

document.addEventListener('DOMContentLoaded', () => {
  const book = new Book();
  book.reTrieveDataFromLocalStorage();
  book.displayBooksToUI();

  const addButton = document.getElementById('addButton');
  addButton.addEventListener('click', (ev) => {
    ev.preventDefault();
    const bookAuthor = document.getElementById('bookAuthor').value;
    const bookTitle = document.getElementById('bookTitle').value;
    book.addBook(bookAuthor, bookTitle);
  });

  const myBookListContainer = document.getElementById('myBookListContainer');
  myBookListContainer.addEventListener('click', (event) => {
    const classItem = event.target;
    if (classItem.classList.contains('removeBook')) {
      const listItem = classItem.closest('li');
      const bookAuthor = listItem.querySelector('.bookAuthor').textContent;
      const bookTitle = listItem.querySelector('.bookTitle').textContent;
      book.removeBook(bookTitle, bookAuthor);
    }
  });

  //   navigation
  initializeNavigation();

  // show date
  const displayDate = document.getElementById('currentDate');
  const timeNow = () => {
    const dateNow = DateTime.now().toLocaleString(DateTime.DATETIME_FULL_WITH_SECONDS);
    displayDate.innerHTML = dateNow;
  };

  setInterval(timeNow, 1000);
});
