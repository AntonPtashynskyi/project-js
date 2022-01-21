import apiService from "./APIservice";
import { pagination } from "./renderPaginationBlock";
import { renderHomeMarkup, renderLibraryMarkup } from './markup';


const searchForm = document.querySelector('.main-form_js');
const errorMessage = document.querySelector('.error-message');
const movieApiService = new apiService();

searchForm.addEventListener('submit', onSubmitForm);


////Отримує дані при завантаженні сторінки\\\\
try {
  fetchMovies();
  const genres = movieApiService.fetchGenres();
  genres.then(genre => localStorage.setItem("genres", JSON.stringify(genre)) )// Додає список жанрів при першому завантаженні до localstorage
} catch (error) {
  console.log(error);
}


////Пошук фільмів при сабміті форми\\\\
function onSubmitForm(e) {
  e.preventDefault();
  movieApiService.searchQuery = e.currentTarget.elements.query.value.trim();

  pagination.movePageTo(1);

  if (movieApiService.searchQuery === '') {
    addErrorMessage();
    setTimeout(removeErrorMessage, 2000);
    return
  }

  fetchMovies();
  
}


async function fetchMovies(page = 1) {
  movieApiService.pageNum = page;

  let movies = {};
 
  if (movieApiService.searchQuery) {
          movies = await movieApiService.fetchSearchMovies();
  } else {
          movies = await movieApiService.fetchPopularMovies();
  }
  
  if (movies.results.length === 0) {
    addErrorMessage();
    setTimeout(removeErrorMessage, 2000);
    return
  }

 addMoviesCollectionToLocalStorage(movies)
  renderHomeMarkup(movies.results)
  return movies;
};





//// Додає масив фільмів до LocalStorage\\\\

function addMoviesCollectionToLocalStorage(moviesArray) { 
  localStorage.removeItem("MoviesCollection");
  localStorage.setItem("MoviesCollection", JSON.stringify(moviesArray));
};

//// Виводить error message\\\\
function addErrorMessage() { 
  const errorIsVisible = document.querySelector('.error-message is_visible');
  if (errorIsVisible) { return }

  errorMessage.classList.toggle('is_visible');
  errorMessage.classList.toggle('is_hidden')
  
 };
//// Очищає поле вводу та прибирає error message\\\\
function removeErrorMessage() { 
  errorMessage.classList.toggle('is_hidden')
  errorMessage.classList.toggle('is_visible')
  
  searchForm.reset();
  
};

export { fetchMovies };