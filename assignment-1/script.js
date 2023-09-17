// Your JS code goes here

let wrap = document.querySelector(".wrap");
let addBtnBook = document.querySelector("#addBook");
let myAddBookForm = document.querySelector("#myAddBookForm");
let closeBoxModal = document.querySelectorAll('span[class="close"]');
let deleteBtnBook = document.querySelector("#deleteBook");
let deleteBookForm = document.querySelector("#deleteBookModal");
let closeNameBtn = "";

// When the user clicks the add book button
addBtnBook.onclick = () => {
  closeNameBtn = "addBook";
  displayTag(myAddBookForm);
};
// When the user clicks the delete book button
deleteBtnBook.onclick = () => {
  closeNameBtn = "deleteBook";
  displayTag(deleteBookForm);
};

window.onclick = (e) => {
  // Check close button
  let isCloseBtn = [...closeBoxModal].includes(e.target);
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
console.log(wrap, closeBoxModal);
