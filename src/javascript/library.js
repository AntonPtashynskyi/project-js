// import images from '..';

// =============================
import { renderLibraryMarkup } from "./markup"

const libraryBody = document.querySelector(".films__list");
const paginationBlock = document.getElementById("pagination");
const messageLibrary = document.querySelector(".library-message");

// =============================

const header = document.querySelector('header');
const home = document.querySelector('.page-home');
const library = document.querySelector('.page-library');
const input = document.querySelector('.search-form');
const buttons = document.querySelector('.buttons');

library.addEventListener('click', onAddLibraryPage);
home.addEventListener('click', onAddHomePage);

 function onAddLibraryPage(event) {
  event.preventDefault();
  header.classList.add('library');
  header.classList.remove('home');
  home.classList.remove('nav__link--current');
  library.classList.add('nav__link--current');
  input.innerHTML = '';
  buttons.innerHTML = `<button class="js-btn-watched" type="button">watched</button>
  <button class="js-btn-queue" type="button">queue</button>`;

  // ==========================================================
  const btnQueue = document.querySelector('.js-btn-queue');
  const btnWatched = document.querySelector('.js-btn-watched');
   paginationBlock.classList.add('js-hidden');
   document.querySelector('.notFound-block').classList.add('js-hidden');
  const queue =  JSON.parse(localStorage.getItem("queue"));
  const watched =  JSON.parse(localStorage.getItem("watched"));
  btnQueue.classList.add("js-btn-active");
   
  
  btnQueue.addEventListener("click", () => {
    btnQueue.classList.add("js-btn-active");
    btnWatched.classList.remove("js-btn-active");
    messageLibrary.innerHTML = "";
    if (queue == 0) {
      libraryBody.innerHTML = "";
      messageLibrary.innerHTML = "queue is empty";
      return
    }
    renderLibraryMarkup(JSON.parse(localStorage.getItem("queue")));
  })
  
  btnWatched.addEventListener("click", () => {
    btnWatched.classList.add("js-btn-active");
    btnQueue.classList.remove("js-btn-active");
    messageLibrary.innerHTML = "";

    if (watched == 0) {
      libraryBody.innerHTML = "";
      messageLibrary.innerHTML = "watched films is empty";
      return
    }
    renderLibraryMarkup(JSON.parse(localStorage.getItem("watched")));
 
  })
   
   if (queue != 0) {
    btnQueue.classList.add("js-btn-active");
    btnWatched.classList.remove("js-btn-active");
    renderLibraryMarkup(queue);
    return;
   } else if (watched != 0) {
     btnWatched.classList.add("js-btn-active");
    btnQueue.classList.remove("js-btn-active");
     renderLibraryMarkup(watched);
     return;
   } else {
     libraryBody.innerHTML = "";
    messageLibrary.innerHTML = "Your library is empty, add some movies please"
  }
  
  // ==========================================================

}

function onAddHomePage(event) {

  // ==========================================================
  // event.preventDefault();
  paginationBlock.classList.remove('js-hidden');
  // ==========================================================

  header.classList.add('home');
  header.classList.remove('library');
  library.classList.remove('nav__link--current');
  home.classList.add('nav__link--current');
  buttons.innerHTML = '';
  input.innerHTML = `  <form class="main-form_js">
    <input type="text" name="query" id="search" autocomplete="off" placeholder="Searching movie" class="search-form__input">
    <button type="submit" class="search-form__btn">
      <svg width="12" height="12" class="search-form__icon">
    </svg>
  </button>
  </form>`;
}
