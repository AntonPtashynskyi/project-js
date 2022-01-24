function renderHomeMarkup(array) {
  const homeMarkup = array
    .map(({ id, poster_path, title, genre_ids, release_date }) => {
      const date = new Date(release_date);

      const year = date.getFullYear();
      const genres = genresTextArray(genre_ids);

      if (poster_path === null) {
        const randomPicture = 'https://picsum.photos/200/300';

        return `<li class="film__item">
                <div class="film__card">
                  <div class="film__thumb">
                    <img class="film__image" id="${id}" src="${randomPicture}" alt="${title}"loading="lazy" />
                  </div>
                  <div class="film__information">
                    <p class="film__title">${title}</p>
                    <span class="film__genre">${genre_ids}</span>
                    <span class="film__year">| ${year}</span>
                  </div>
                </div>
            </li>`;
      }

      return `<li class="film__item">
                <div class="film__card">
                  <div class="film__thumb">
                    <img class="film__image" id="${id}" src="https://image.tmdb.org/t/p/w500${poster_path}" alt="${title}"loading="lazy" />
                  </div>
                  <div class="film__information">
                    <p class="film__title">${title}</p>
                    <span class="film__genre">${genres}</span>
                    <span class="film__year">| ${year}</span>
                  </div>
                </div>
            </li>`;
    })
    .join('');

  document.querySelector('.films__container').innerHTML = `<ul class="films__list">${homeMarkup}</ul>`;
}

function renderLibraryMarkup(array) {
  const libraryMarkup = array
    .map(({ id, poster_path, title, genre_ids, release_date, vote_average }) => {
      const date = new Date(release_date);
      const year = date.getFullYear();

      const genres = genresTextArray(genre_ids);

      return `<li class="film__item">
                <div class="film__card">
                  <div class="film__thumb">
                    <img class="film__image" id="${id}" src="https://image.tmdb.org/t/p/w500${poster_path}" alt="${title}" loading="lazy" />
                  </div>
                  <div class="film__information">
                    <p class="film__title">${title}</p>
                    <span class="film__genre">${genres}</span>
                    <span class="film__year">| ${year}</span>
                    <span class="film__rating">${vote_average}</span>
                  </div>
                </div>
              </li>`;
    })
    .join('');

  document.querySelector('.films__container').innerHTML = `<ul class="films__list">${libraryMarkup}</ul>`;
}

function genresTextArray(genresArray) {
  const savedGenres = localStorage.getItem('genres');
  const parseGenres = JSON.parse(savedGenres);
  const genresName = genresArray.map(genreId => {
    return parseGenres.find(genreObject => genreObject.id === genreId).name;
  });
  if (genresName.length <= 3) {
    return genresName.join(', ');
  }
  genresName[2] = 'Other';
  return genresName.slice(0, 3).join(', ');
}

export { renderHomeMarkup, renderLibraryMarkup, genresTextArray };
