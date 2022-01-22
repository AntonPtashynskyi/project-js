import Pagination from 'tui-pagination';
import { fetchMovies, onSubmitForm } from './fetchMovies';

const options = {
  totalItems: 20000, 
  itemsPerPage: 20,
  visiblePages: 5,
  page: 1,
  centerAlign: true,
  firstItemClassName: 'tui-first-child',
  lastItemClassName: 'tui-last-child',
  usageStatistics: false,
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
  const newMovies = await fetchMovies(page);
  if (page === 1) {
    pagination.reset(newMovies.total_results)
    // pagination.setTotalItems(newMovies.total_results)
  }
})

export { pagination };
