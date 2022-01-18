import apiService from "./APIservise";  //Імпорт класу APIservise
const searchForm = document.querySelector('.main-form_js');
const header = document.querySelector('header');


const movieApiService = new apiService();// Новий екземпляр класу

getPopularMovies().then(createFirstListMovies); // Завантажує популярні фільми, при відкритті сайту
                                                // та малює першу сторінку

searchForm.addEventListener('submit', getSearchMovies);



async function getSearchMovies(e) { 
  e.preventDefault();
 
  const searchValue = e.currentTarget.elements.query.value.trim();
  movieApiService.query = searchValue;
  
  movieApiService.resetPage();
  //movieApiService.page = ; Додати посилання на зміну номерації сторінок!!!!

  if (searchValue === '') {//якщо натиснули "пошук" з пустим інпутом
    addErrorMessage();
    setTimeout(removeErrorMessage, 2000);
    return
  }
  
    try {
      const movies = await movieApiService.fetchSearchMovies(); //Зверення до масиву об'єктів: "movies.results"

      if (movies.results.length === 0) { //якщо прийшов пустий масив або був введений некоректний запит
        addErrorMessage();
        setTimeout(removeErrorMessage, 2000);
        return
      };

      addMoviesCollectionToLocalStorage(movies);

  } catch (error) {console.log(error) };

};



async function getPopularMovies(e) { 
  
  movieApiService.resetPage();
  //movieApiService.page = ;  Додати посилання на зміну номерації сторінок!!!!
 
  localStorage.removeItem("genres"); // Видаляє список жанрів при першому завантаженні із localstorage, ключ 'genres'; 
    try {
      const movies = await movieApiService.fetchPopularMovies();//Зверення до масиву об'єктів: "movies.results"
      const genres = await movieApiService.fetchGenres(); 

      localStorage.setItem("genres", JSON.stringify(genres));// Додає список жанрів при першому завантаженні до localstorage
      addMoviesCollectionToLocalStorage(movies);
      return {movies, genres}; ////// additional by Malanchenko Sergii

  } catch (error) {console.log(error) };
  
};


function addErrorMessage() { // Виводить error message
  const error = document.querySelector('.error-message_js');
  if (error) { return}
  header.insertAdjacentHTML("beforeend", `<p class="error-message_js">Search result not successful. Enter the correct movie name</p>`);
 };

function removeErrorMessage() { // Очищає поле вводу та прибирає error message
  const error = document.querySelector('.error-message_js')
  searchForm.reset();
  error.remove();
};


//Додає колекцію фільмів до local Storage, ключ: 'MoviesCollection'.
function addMoviesCollectionToLocalStorage(moviesArray) { 
  localStorage.removeItem("MoviesCollection");
  localStorage.setItem("MoviesCollection", JSON.stringify(moviesArray));
};

// ====================================================================

 function createFirstListMovies(data) {

    const markupMovies = data.movies.results.map(({ poster_path, original_title, genre_ids, release_date }) => {
        return `<li class="film__item">
                    <a class="film__link" href="#">
                        <div class="film__card">
                            <div class="film__thumb">
                                <img class="film__image" src="https://image.tmdb.org/t/p/w500/${poster_path}" loading="lazy" alt="${original_title}">
                            </div>
                            <div class="film__information">
                                <p class="film__title">${original_title}</p>
                                <span class="film__genre">${genre_ids}</span>
                                <span class="film__year">| ${release_date}</span>
                            </div>
                        </div>
                    </a>
                </li>`
    }).join("");
    document.querySelector(".films__list").innerHTML = markupMovies
}