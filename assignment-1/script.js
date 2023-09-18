// Your JS code goes here
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

// tags
const wrap = $(".wrap");
const myAddBookForm = $("#myAddBookForm");
const deleteBookForm = $("#deleteBookModal");

// buttons
const addBtnBook = $("#addBook");
const closeBoxModal = $$('span[class="close"]');
const deleteBtnBook = $("#deleteBook");
const createBook = $("#create");

//
const contentBookTable = $("#infBook");
let closeNameBtn = "";

// inputs
const searchInput = $("#searchBooks");
const nameBook = $("#name");
const authorBook = $("#author");
const topicBook = $("#topic");
// console.log(searchBooks)

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

// When the user clicks the delete book button
deleteBtnBook.onclick = () => {
  closeNameBtn = "deleteBook";
  displayTag(deleteBookForm);
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
          <button class="deleteBook">Delete</button>
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
  // res = nameBook.value.trim() !== '' ?  authorBook.value.trim() !== '' ? false : true : true;
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
