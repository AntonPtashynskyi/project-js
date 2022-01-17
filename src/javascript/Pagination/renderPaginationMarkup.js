import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import './pagination.scss';

const API_KEY = 'c7ed46652640bc5a91d5a4e73d915c28';

let currentPage = 1;

const options = {
  totalItems: 2000, 
  itemsPerPage: 1,
  visiblePages: 5,
  page: 1,
  centerAlign: false,
  firstItemClassName: 'tui-first-child',
  lastItemClassName: 'tui-last-child',
  template: {
    page: '<button class="tui-page-btn" data-number="{{page}}">{{page}}</button>',
    // '<a href="#" class="tui-page-btn">{{page}}</a>',
    currentPage: '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
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


const currentButton = document.querySelector('.tui-pagination');

console.log(currentPage)

currentButton.addEventListener('click', event => {
  const { className } = event.target;

  console.dir(event.currentTarget.children[2].className)
  
  console.dir(event.target);
  // if (className.includes("tui-ico-first")) {
  //   currentPage = 1;
  //   console.log(currentPage)
  //   return
  // };

  // if (className.includes("tui-ico-last")) {
  //   currentPage = options.totalItems;
  //   console.log(currentPage)
  //   return
  // };

  // if (className.includes("tui-ico-next")) {
  //   currentPage += 1;
  //   console.log(currentPage)
  //   return
  // };

  // if (className.includes("tui-ico-prev")) {
  //   currentPage -= 1;
  //   console.log(currentPage)
  //   return
  // };

  // if (className.includes("tui-ico-prev")) {
  //   currentPage -= 1;
  //   console.log(currentPage)
  //   return
  // };


  const { children } = event.currentTarget;
  for (let i = 0; i < event.currentTarget; i += 1) {
    
  }
  
  // console.log(children)
  // event.currentTarget.children.forEach(child => {
  //   if (child.className.includes("tui-is-selected")) {
  //     return currentPage = +child.dataset.number;
  // }
  // })

  // currentPage = +event.target.dataset.number;
  console.log(currentPage)
})