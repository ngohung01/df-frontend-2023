// Your JS code goes here
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

// tags
const wrap = $(".wrap");
const myAddBookForm = $("#myAddBookForm");
const deleteBookForm = $("#deleteBookModal");
const titleBook = $("#title_book");

// buttons
const addBtnBook = $("#addBook");
const createBook = $("#create");
const closeBoxModal = $$('span[class="close"]');
const deleteBtnBook = $("#deleteBook");
const removeBook = $("#remove");
const cancelDeleteModal = $("#cancel");
//
const contentBookTable = $("#infBook");
let closeNameBtn = "";

// inputs
const searchInput = $("#searchBooks");
const nameBook = $("#name");
const authorBook = $("#author");
const topicBook = $("#topic");
// console.log(removeBook)

// console.log(nameBook,authorBook,topicBook,createBook)

let id = 0;
const books = [];
const topics = {
  0: "Programming",
  1: "Databases",
  2: "DevOps",
};

addBook("Refactoring", "Martin Fowler", 0);
addBook("Design Data-Intensive Application", "Martin Kleppmann", 1);
addBook("The Phoenix Project", "Gene Kim", 2);

renderBooksTable(books);

//========== Handle events ============

// When the user type text to search for books
searchInput.addEventListener("input", searchBooks);

// When the user clicks the add book button
addBtnBook.onclick = () => {
  closeNameBtn = "addBook";
  displayTag(myAddBookForm);
};

// When the user clicks the button's create at form addBook
createBook.onclick = (e) => {
  e.preventDefault();
  if (checkRule()) {
    addBook(nameBook.value, authorBook.value, topicBook.value);
    if (searchInput.value !== undefined && searchInput.value.trim() !== "") {
      searchBooks();
    } else renderBooksTable(books);
    displayTag(myAddBookForm, false);
    nameBook.value = "";
    authorBook.value = "";
    topicBook.value = 0;
  }
};

window.onclick = (e) => {
  // Check close button
  const isCloseBtn = [...closeBoxModal].includes(e.target);
  // When the user clicks anywhere on the outside of the form addBook
  //close it
  if (e.target === wrap) {
    closeBox(closeNameBtn);
  }

  // When the user clicks the close button
  if (isCloseBtn) {
    closeBox(closeNameBtn);
  }

  // When the user clicks the cancel button
  if (e.target === cancelDeleteModal) {
    displayTag(deleteBookForm, false);
  }

  // When the user clicks the delete button to delete the book by id
  if (e.target === removeBook) {
    deleteBook(removeBook.dataset.id);
  }
};

// ================= Declare function ==================

// Function add book into books array
function addBook(title = "", author = "", topic = 0) {
  books.push({
    id: id++,
    title,
    author,
    topic,
  });
}

// Function, handle a display tag
function displayTag(tag, show = true) {
  if (show) {
    tag.style.display = "block";
    wrap.style.display = "block";
  } else {
    tag.style.display = "none";
    wrap.style.display = "none";
  }
}

function closeBox(closeNameBtn) {
  switch (closeNameBtn) {
    case "addBook":
      displayTag(myAddBookForm, false);
      break;
    case "deleteBook":
      displayTag(deleteBookForm, false);
      break;
  }
}

// Function to show Delete Book
function showDeleteBook(id, title = "") {
  closeNameBtn = "deleteBook";
  displayTag(deleteBookForm);
  console.log(title);
  titleBook.innerHTML = title;
  removeBook.setAttribute("data-id", id);
}

function deleteBook(id) {
  books.forEach((book, i) => {
    book.id == id && books.splice(i, 1);
  });
  if (searchInput.value !== undefined && searchInput.value.trim() !== "") {
    searchBooks();
  } else renderBooksTable(books);
  displayTag(deleteBookForm, false);
}

// Render books into table
function renderBooksTable(books) {
  let html = "";
  const htmls = books.map((book) => {
    return `
      <tr id='book${book.id}' >
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${topics[book.topic]}</td>
        <td>
          <button class="deleteBook" onclick ="showDeleteBook(${book.id},'${
      book.title
    }')">Delete</button>
        </td>
      </tr>
    `;
  });
  // console.log(htmls.join(''))
  html = htmls.join("");
  contentBookTable.innerHTML = html;
}

// Function search Books by text
function searchBooks() {
  const newBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchInput.value.toLowerCase().trim())
  );
  renderBooksTable(newBooks);
}

// Rule addBookForm
function checkRule() {
  let res = false;
  let isNameBook = false;
  let isAuthorBook = false;
  if (nameBook.value !== undefined && nameBook.value.trim() !== "") {
    isNameBook = true;
  }
  if (authorBook.value !== undefined && authorBook.value.trim() !== "") {
    isAuthorBook = true;
  }
  if (isNameBook && isAuthorBook) {
    res = true;
  }
  console.log(res);
  return res;
}
// console.log(wrap, closeBoxModal);
