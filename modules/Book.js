class Book {
  constructor() {
    this.bookStorage = [];
  }

  reTrieveDataFromLocalStorage = () => {
    const fetchedData = localStorage.getItem('userDetails');
    this.bookStorage = JSON.parse(fetchedData) || [];
  };

  storeToLocalStorage = () => {
    const jsonString = JSON.stringify(this.bookStorage);
    localStorage.setItem('userDetails', jsonString);
  };

  displayBooksToUI = () => {
    const myBookListContainer = document.getElementById('myBookListContainer');
    const noBookErrorMessage = document.getElementById('noBookInStorage');

    if (this.bookStorage.length === 0) {
      noBookErrorMessage.innerText = 'Ooops there are no books... ';
      myBookListContainer.innerHTML = '';
    } else {
      noBookErrorMessage.innerText = '';
      myBookListContainer.innerHTML = '';

      this.bookStorage.forEach((book) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
          <h3><span class="bookTitle">
          ${book.bookTitle}</span> by 
          <span class="bookAuthor">
          ${book.bookAuthor}
          </span></h3>
          <button type="button" class="removeBook" id="${book.id}">
          Remove
          </button>
        `;
        myBookListContainer.appendChild(listItem);
      });
    }
  };

  addBook = (author, title) => {
    const bookAuthorInputElement = document.getElementById('bookAuthor');
    const bookTitleInputElement = document.getElementById('bookTitle');
    const formError = document.getElementById('form').querySelector('.formError');

    if (author === '' || title === '') {
      formError.innerText = 'Please fill all fields';
    } else {
      formError.innerText = '';
      const bookObject = {
        id: this.bookStorage.length,
        bookAuthor: author,
        bookTitle: title,
      };
      this.bookStorage.push(bookObject);
      this.storeToLocalStorage();
      this.displayBooksToUI();
      bookAuthorInputElement.value = '';
      bookTitleInputElement.value = '';
    }
  };

  removeBook = (title, author) => {
    title = title.trim();
    author = author.trim();

    this.bookStorage = this.bookStorage.filter((book) => {
      const match = book.bookTitle.trim() === title && book.bookAuthor.trim() === author;
      return !match;
    });

    this.storeToLocalStorage();
    this.displayBooksToUI();
  };
}

export default Book;
