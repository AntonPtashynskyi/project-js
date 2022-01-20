import { renderHomeMarkup, renderLibraryMarkup } from './markup';
import apiService from './APIservise'; //Імпорт класу APIservise
const searchForm = document.querySelector('.main-form_js');
const errorPosition = document.querySelector('.search-form');

const movieApiService = new apiService(); // Новий екземпляр класу

getPopularMovies(); // Завантажує популярні фільми, при відкритті сайту

searchForm.addEventListener('submit', getSearchMovies);

async function getSearchMovies(e) {
  e.preventDefault();

  const searchValue = e.currentTarget.elements.query.value.trim();
  movieApiService.query = searchValue;

  movieApiService.resetPage();

  //movieApiService.page = ; Додати посилання на зміну номерації сторінок!!!!

  if (searchValue === '') {
    //якщо натиснули "пошук" з пустим інпутом
    addErrorMessage();
    setTimeout(removeErrorMessage, 2000);
    return;
  }

  try {
    const movies = await movieApiService.fetchSearchMovies(); //Зверення до масиву об'єктів: "movies.results"

    if (movies.results.length === 0) {
      //якщо прийшов пустий масив або був введений некоректний запит
      addErrorMessage();
      setTimeout(removeErrorMessage, 2000);
      return;
    }

    addMoviesCollectionToLocalStorage(movies);
    renderHomeMarkup(movies.results);
  } catch (error) {
    console.log(error);
  }
}

async function getPopularMovies(e) {
  movieApiService.resetPage();
  //movieApiService.page = ;  Додати посилання на зміну номерації сторінок!!!!

  localStorage.removeItem('genres'); // Видаляє список жанрів при першому завантаженні із localstorage, ключ 'genres';
  try {
    const movies = await movieApiService.fetchPopularMovies(); //Зверення до масиву об'єктів: "movies.results"
    const genres = await movieApiService.fetchGenres();

    localStorage.setItem('genres', JSON.stringify(genres)); // Додає список жанрів при першому завантаженні до localstorage
    addMoviesCollectionToLocalStorage(movies);
    renderHomeMarkup(movies.results);
  } catch (error) {
    console.log(error);
  }
}

function addErrorMessage() {
  // Виводить error message
  const error = document.querySelector('.error-message_js');
  if (error) {
    return;
  }
  errorPosition.insertAdjacentHTML(
    'afterend',
    `<p class="error-message_js">Search result not successful. Enter the correct movie name</p>`,
  );
}

function removeErrorMessage() {
  // Очищає поле вводу та прибирає error message
  const error = document.querySelector('.error-message_js');
  searchForm.reset();
  error.remove();
}

//Додає колекцію фільмів до local Storage, ключ: 'MoviesCollection'.
function addMoviesCollectionToLocalStorage(moviesArray) {
  localStorage.removeItem('MoviesCollection');
  localStorage.setItem('MoviesCollection', JSON.stringify(moviesArray));
}
