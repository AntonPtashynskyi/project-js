function onClickWatchedButton(e) {
  // console.log('click Watched Button');
  toggleTextWatched();
  const modalWatchedButton = document.querySelector('.modal__watched');
  modalWatchedButton.classList.toggle('modal__watched--aktiv');
  const currentFilm = JSON.parse(localStorage.getItem('currentFilm'));
  const watchedFilms = JSON.parse(localStorage.getItem('watched')) || [];
  if (watchedFilms.find(watchedFilm => watchedFilm.id === currentFilm.id)) {
    localStorage.setItem(
      'watched',
      JSON.stringify(watchedFilms.filter(watchedFilm => watchedFilm.id !== currentFilm.id)),
    );
    return;
  }
  watchedFilms.push(currentFilm);
  localStorage.setItem('watched', JSON.stringify(watchedFilms));
}

function onClickQueueButton(e) {
  // console.log('click QUEUE Button');
  toggleTextQueue();
  const modalQueueButton = document.querySelector('.modal__queue');
  modalQueueButton.classList.toggle('modal__queue--aktiv');
  const currentFilm = JSON.parse(localStorage.getItem('currentFilm'));
  const queueFilms = JSON.parse(localStorage.getItem('queue')) || [];
  if (queueFilms.find(queueFilm => queueFilm.id === currentFilm.id)) {
    localStorage.setItem(
      'queue',
      JSON.stringify(queueFilms.filter(queueFilm => queueFilm.id !== currentFilm.id)),
    );
    return;
  }
  queueFilms.push(currentFilm);
  localStorage.setItem('queue', JSON.stringify(queueFilms));
}

function toggleTextWatched(e) {
  if (document.querySelector('.modal__watched').innerText == 'ADD TO WATCHED') {
    document.querySelector('.modal__watched').innerText = 'DELETE FROM WATCHED';
  } else {
    document.querySelector('.modal__watched').innerText = 'ADD TO WATCHED';
  }
}

function toggleTextQueue(e) {
  if (document.querySelector('.modal__queue').innerText == 'ADD TO QUEUE') {
    document.querySelector('.modal__queue').innerText = 'DELETE FROM QUEUE';
  } else {
    document.querySelector('.modal__queue').innerText = 'ADD TO QUEUE';
  }
}

export { onClickWatchedButton, onClickQueueButton, toggleTextWatched, toggleTextQueue };

function refreshWatchedMarkup(savedMovies) {
  const MyLibrary = document.querySelector('.page-library');
  const btnWatched = document.querySelector('.js-btn-watched');
  if (MyLibrary.classList.contains('nav__link--current') && btnWatched.classList.contains('js-btn-active')) {
    renderLibraryMarkup(savedMovies)
  };
 return
};
function refreshQueueMarkup(savedMovies) {
  const MyLibrary = document.querySelector('.page-library');
  const btnQueue = document.querySelector('.js-btn-queue');
  if (MyLibrary.classList.contains('nav__link--current') && btnQueue.classList.contains('js-btn-active')) {
    renderLibraryMarkup(savedMovies)
  };
 return
}; 