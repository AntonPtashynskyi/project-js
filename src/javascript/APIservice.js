const API_KEY = '38db6117f0864942bf1538520c27c195';
const BASE_URL = 'https://api.themoviedb.org/3/';

export default class apiService {
  constructor() {
    this.searchQuery = '';
    this.pageNum = 1;
  }

  fetchPopularMovies() {
    const url = `${BASE_URL}trending/movie/day?api_key=${API_KEY}&page=${this.pageNum}`;
    return fetch(url).then(result => result.json());
  }

  fetchSearchMovies() {
    const url = `${BASE_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${this.searchQuery}&page=${this.pageNum}&include_adult=false`;
    return fetch(url).then(result => result.json());
  }

  fetchGenres() {
    const url = `${BASE_URL}genre/movie/list?api_key=${API_KEY}&language=en-US`;
    return fetch(url)
      .then(r => r.json())
      .then(data => {
        return data.genres;
      });
  }
}
