import Pagination from 'tui-pagination';
import ApiService from "./APIservise";
import { renderHomeMarkup, renderLibraryMarkup } from './markup';

const apiService = new ApiService();

const options = {
  totalItems: 20000,
  itemsPerPage: 20,
  visiblePages: 5,
  page: 1,
  centerAlign: true,
  firstItemClassName: 'tui-first-child',
  lastItemClassName: 'tui-last-child',
  template: {
    page: '<button class="tui-page-btn" >{{page}}</button>',
    currentPage: '<button class="tui-page-btn tui-is-selected" data-number="{{page}}" >{{page}}</button>',
    moveButton:
      '<a href="#" class="tui-page-btn tui-{{type}}">' +
      '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</a>',
    disabledMoveButton:
      '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
      '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</span>',
    moreButton:
      '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip" >' +
      '<span class="tui-ico-ellip">...</span>' +
      '</a>'
  }
};

const pagination = new Pagination('pagination', options);

pagination.on("afterMove", async ({ page }) => {
  apiService.page = page;
  try {
    await searchNewMovies();
  }
  catch(error) {console.error();} 
})

async function searchNewMovies() {
  let newMovies = {};
  console.log(apiService.query)

  if (apiService.query) {
    newMovies = await apiService.fetchSearchMovies();
    return
  } else {
    newMovies = await apiService.fetchPopularMovies();
  }
  pagination.setTotalItems(newMovies.total_results);

  renderHomeMarkup(newMovies.results);
}

