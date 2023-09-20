// Your JS code goes here
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const form = $("#form_add_book");
const inputElements = form.querySelectorAll('input[class="form_control"]');
// tags
const wrap = $(".wrap");
const myAddBookForm = $("#myAddBookForm");
const deleteBookForm = $("#deleteBookModal");
const titleBook = $("#title_book");
const errTitleMessage = $("#name_error");
const errAuthorMessage = $("#author_error");
// buttons
const addBtnBook = $("#addBook");
const createBook = $("#create");
const closeBoxModal = $$('span[class="close"]');
const deleteBtnBook = $("#deleteBook");
const removeBook = $("#remove");
const cancelDeleteModal = $("#cancel");
//
const contentBookTable = $("#infBook");

// inputs
const searchInput = $("#searchBooks");
const nameBook = $("#name");
const authorBook = $("#author");
const topicBook = $("#topic");

let closeNameBtn = "";

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
  resetValueForm();
};

// When the user clicks the button's create at addBook form
createBook.onclick = (e) => {
  e.preventDefault();
  if (isValidator()) {
    addBook(nameBook.value, authorBook.value, topicBook.value);
    toast({
      title: "Success",
      message: "Successfully added a book",
      type: "success",
      delay: 1000,
    });
    if (searchInput.value.trim() !== "") {
      searchBooks();
    } else renderBooksTable(books);
    displayTag(myAddBookForm, false);
  }
};

// When the user clicks the delete button to delete the book by id
removeBook.onclick = function () {
  const book = books.find((book) => book.id == this.dataset.id);
  const isDel = deleteBook(this.dataset.id);
  if (isDel) {
    toast({
      title: "Success",
      message: `Successfully delete  ${book.title} book`,
      type: "success",
      delay: 3000,
    });
  }
  // console.log(book,this)
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
};

// When the user works on the form addBook
[...inputElements].forEach((inputElement) => {
  if (inputElement) {
    inputElement.oninput = () => {
      Validator(inputElement);
    };
    inputElement.onblur = () => {
      Validator(inputElement);
    };
  }
});

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
  titleBook.innerHTML = title;
  removeBook.setAttribute("data-id", id);
}

function deleteBook(id) {
  try {
    books.forEach((book, i) => {
      book.id == id && books.splice(i, 1);
    });
    if (searchInput.value.trim() !== "") {
      searchBooks();
    } else renderBooksTable(books);
    displayTag(deleteBookForm, false);
    return true;
  } catch (error) {
    toast({
      title: "Erorr",
      message: "An error has occurred",
      type: "error",
      delay: 1000,
    });
    return false;
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

// Function reset value form addBook
function resetValueForm() {
  nameBook.value = "";
  authorBook.value = "";
  topicBook.value = 0;
  errAuthorMessage.innerHTML = "";
  errTitleMessage.innerHTML = "";
}
// Function search Books by text
function searchBooks() {
  const newBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchInput.value.toLowerCase().trim())
  );
  renderBooksTable(newBooks);
}

//  Validators form
function Validator(inputElement) {
  let isInputting = false;
  const parrentE = getParentElement(inputElement, ".form_group");
  const errMessTag = parrentE.querySelector(".form_message");
  if (inputElement.value !== undefined && inputElement.value.trim() !== "") {
    isInputting = true;
    errMessTag.innerHTML = "";
  } else {
    switch (inputElement.id) {
      case "name":
        errMessTag.innerHTML = "Title book cannot be empty";
        break;
      case "author":
        errMessTag.innerHTML = "Author book cannot be empty";
        break;
    }
  }
  return isInputting;
}
// Return parent element
function getParentElement(element, selector) {
  while (element.parentNode) {
    if (element.parentNode.matches(selector)) {
      return element.parentNode;
    } else element = element.parentNode;
  }
}

// Result of Validation
function isValidator() {
  const newInputElements = [...inputElements].filter((inputElement) => {
    return Validator(inputElement);
  });
  return newInputElements.length === inputElements.length;
}

// Toast function
function toast({ title = "", message = "", type = "info", delay = 3000 }) {
  const main = $("#toast");
  const icons = {
    success: "fa-solid fa-circle-check",
    info: "fa-solid fa-circle-info",
    warning: "fa-sharp fa-solid fa-circle-exclamation",
    error: "fa-sharp fa-solid fa-circle-exclamation",
  };
  if (main) {
    const toastE = document.createElement("div");

    // Auto remove toast
    const idRemoveToast = setTimeout(() => {
      main.removeChild(toastE);
    }, delay + 1000);
    // Remove when click close
    toastE.onclick = (e) => {
      const btnClose = e.target.closest(".toast__close");
      if (btnClose) {
        main.removeChild(toastE);
        clearTimeout(idRemoveToast);
      }
    };

    toastE.classList.add("toast", `toast--${type}`);
    toastE.innerHTML = `
      <div class="toast__icon">
        <i class="${icons[type]}"></i>
      </div>
      <div class="toast__body">
        <h3 class="toast_title">${title}</h3>
        <p class="toast_message">${message}</p>
      </div>
      <div class="toast__close">
        <i class="fa-solid fa-xmark"></i>
      </div>
    `;
    main.appendChild(toastE);
    // Animation
    toastE.animate(
      [
        {
          opacity: 0,
          transform: "translateX(calc(100% + 32px))",
        },
        {
          opacity: 1,
          transform: "translateX(0)",
        },
      ],
      { duration: 300, easing: "ease" }
    );

    toastE.animate(
      [
        {
          opacity: 0,
        },
      ],
      {
        duration: 1000,
        easing: "linear",
        delay: delay,
        fill: "forwards",
      }
    );
  }
}
