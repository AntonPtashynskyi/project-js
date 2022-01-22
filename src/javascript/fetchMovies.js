import apiService from "./APIservice";
import { pagination } from "./renderPaginationBlock";
import { renderHomeMarkup, renderLibraryMarkup } from './markup';
import { togglePreloader } from "./preloader";

const errorMessage = document.querySelector('.error-message');
const movieApiService = new apiService();
const searchForm = document.querySelector('.main-form_js');


searchForm.addEventListener('submit', onSubmitForm);




fetchMovies()

try {
  fetchMovies();
  const genres = movieApiService.fetchGenres();
  genres.then(genre => localStorage.setItem("genres", JSON.stringify(genre)) )
} catch (error) {
  console.log(error);
}

 async function onSubmitForm(e) {
  e.preventDefault();
  movieApiService.searchQuery = e.currentTarget.elements.query.value.trim();
  pagination.movePageTo(1);


  if (movieApiService.searchQuery === '') {
    addErrorMessage();
    setTimeout(removeErrorMessage, 2000);
    return
  }
  
  const movies = await  fetchMovies()
  pagination.setTotalItems(movies.total_results)

}



async function fetchMovies(page = 1) {
  
  movieApiService.pageNum = page;

  let movies = {};

 togglePreloader();
  if (movieApiService.searchQuery) {
          movies = await movieApiService.fetchSearchMovies();
  } else {
          movies = await movieApiService.fetchPopularMovies();
  }
  
  if (movies.results.length === 0) {
    togglePreloader()
    addErrorMessage();
    setTimeout(removeErrorMessage, 2000);
    return
  }

  addMoviesCollectionToLocalStorage(movies)
  
  renderHomeMarkup(movies.results)
  togglePreloader()
  return movies;
};



function addMoviesCollectionToLocalStorage(moviesArray) { 
  localStorage.removeItem("MoviesCollection");
  localStorage.setItem("MoviesCollection", JSON.stringify(moviesArray));
};


function addErrorMessage() { 
  const errorIsVisible = document.querySelector('.error-message is_visible');
  if (errorIsVisible) { return }

  errorMessage.classList.toggle('is_visible');
  errorMessage.classList.toggle('is_hidden')
  
 };

function removeErrorMessage() { 
  errorMessage.classList.toggle('is_hidden')
  errorMessage.classList.toggle('is_visible')
  
  searchForm.reset();
  
};

export { fetchMovies, onSubmitForm };