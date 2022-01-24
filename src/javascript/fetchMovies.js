import apiService from './APIservice';
import { pagination } from './renderPaginationBlock';
import { renderHomeMarkup, renderLibraryMarkup } from './markup';
import { togglePreloader } from './preloader';

const errorMessage = document.querySelector('.error-message');
const movieApiService = new apiService();
const searchForm = document.querySelector('.main-form_js');
let newSearchQuery;
let movies = {};

searchForm.addEventListener('submit', onSubmitForm);

try {
  const genres = movieApiService.fetchGenres();
  genres.then(genre => localStorage.setItem('genres', JSON.stringify(genre)));
  fetchMovies();
} catch (error) {
  console.log(error);
}

async function onSubmitForm(e) {
  e.preventDefault();

  if (newSearchQuery !== e.currentTarget.elements.query.value.trim()) {
    newSearchQuery = e.currentTarget.elements.query.value.trim();
    movieApiService.searchQuery = newSearchQuery;

    await fetchMovies();

    if (movies.results.length === 0) {
      return;
    }
    pagination.reset();
  } else {
    await fetchMovies();
    pagination.reset();
  }

  if (movieApiService.searchQuery === '') {
    addErrorMessage();
    setTimeout(removeErrorMessage, 2000);
    return;
  }
}

async function fetchMovies(page = 1) {
  movieApiService.pageNum = page;

  togglePreloader();
  if (movieApiService.searchQuery) {
    movies = await movieApiService.fetchSearchMovies();
  } else {
    movies = await movieApiService.fetchPopularMovies();
  }

  if (movies.results.length === 0) {
    togglePreloader();
    addErrorMessage();
    setTimeout(removeErrorMessage, 2000);

    return;
  }

  pagination.setTotalItems(movies.total_results);

  addMoviesCollectionToLocalStorage(movies);

  renderHomeMarkup(movies.results);
  togglePreloader();
  return movies;
}

function addMoviesCollectionToLocalStorage(moviesArray) {
  localStorage.removeItem('MoviesCollection');
  localStorage.setItem('MoviesCollection', JSON.stringify(moviesArray));
}

function addErrorMessage() {
  const errorIsVisible = document.querySelector('.error-message is_visible');
  if (errorIsVisible) {
    return;
  }

  errorMessage.classList.toggle('is_visible');
  errorMessage.classList.toggle('is_hidden');
}

function removeErrorMessage() {
  errorMessage.classList.toggle('is_hidden');
  errorMessage.classList.toggle('is_visible');

  searchForm.reset();
}

export { fetchMovies, onSubmitForm };
