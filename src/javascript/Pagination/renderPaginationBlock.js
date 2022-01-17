import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';


const API_KEY = 'c7ed46652640bc5a91d5a4e73d915c28';

const options = {
  totalItems: 2000, 
  itemsPerPage: 1,
  visiblePages: 5,
  page: 1,
  centerAlign: false,
  firstItemClassName: 'tui-first-child',
  lastItemClassName: 'tui-last-child',
  template: {
    page: '<button class="tui-page-btn" >{{page}}</button>',
    // '<a href="#" class="tui-page-btn">{{page}}</a>',
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

const paginationBox = document.querySelector('.tui-pagination');

paginationBox.addEventListener('click', onButtonClick)

function onButtonClick(event) {
  Array.prototype.forEach.call(event.currentTarget.children, ({classList}) => {
    if (classList.contains("tui-is-selected")) {
      const currentButton = document.querySelector('.tui-is-selected')
      const currentPage = JSON.stringify(currentButton.dataset.number);
      localStorage.setItem("currentPage", currentPage);
    }
  });
}
