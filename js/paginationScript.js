import Pagination from '../libs/renderize/pagination.max.js';
import { Templator } from './arithmeticTemplator.js'
import data from './data.js';

// Fetch from API 
// const url = 'https://dummyjson.com/products'
// const res =await fetch(url)
// const data = await res.json()

// Initialize Renderize
const viewContainer = document.getElementById("viewContainer")
const renderize = new Pagination(data.products, viewContainer);

// Configure Renderize settings
renderize.config({
  gridGap: "20px",
  listGap: "20px",
  listItemMinWidth: "400px",
  position: "CENTER",
  autoFetch: true,
  dataApiUrl: "https://dummyjson.com/products?select=title,category,price,discountPercentage,thumbnail,description,brand",
  apiSearching: true,
  searchApi: "https://dummyjson.com/products/search?q={query}&select=title,category,price,discountPercentage,thumbnail,description,brand",
  autoCleanupWhen: 50,
  // Add other configuration options
});

// Register Custom Templator 
renderize.register.templator(Templator)

// Set templates for grid views
renderize.gridItemTemplate = `<div class="card border-2 border-transparent">
  <span class="badge bg-primary position-absolute" style="right:5px;top:5px;">{%column:category|upper%} {%counter%}</span>
  {{loadimage|200px|<img src="{%column:thumbnail%}" class="card-img-top" alt="Product Image" loading="lazy">}}
  <div class="card-body d-flex flex-column">
    <h5 class="card-title">{%column:title|length:18%}...</h5>
    <h4 class="card-title text-primary"><span>$</span>{%column:price<subpub:column:discountPercentage>%}</h4>
    <h6 class="text-muted"><del><span>$</span>{%column:price%}</del> - {%column:discountPercentage%}%</h6>
    <button class="btn btn-primary mt-auto">Add Cart</button>
  </div>
</div>`;

// Render the Data
renderize.render();

// Set templates for list and table views
renderize.listItemTemplate = `
<div class="card mb-0 border-2 border-transparent">
  <div class="row">
    <div class="col-4">
  {{loadimage|100%|<img src="{%column:thumbnail%}" class="card-img-top" alt="Product Image" loading="lazy">}}
    </div>
    <div class="col-8">
      <div class="card-body ps-0">
        <h5 class="card-title">{%column:title%}</h5>
        <p class="card-text">{%column:description%}</p>
        <div class="d-flex"><span class="badge bg-primary fw-bold">Category : {%column:category|firstCap%}</span> <span class="badge bg-primary mx-1 fw-bold">Brand : {%column:brand%}</span></div>
         <button class="btn btn-primary btn-sm mt-2 w-100">Add Cart</button>
      </div>
    </div>
  </div>
</div>`;

// Change Views 
const viewsBtn = document.getElementById("viewsBtn");
viewsBtn.addEventListener("click", (e) => {
  if (e.target.dataset.view) {
    if (renderize.inSelection) {
      alert("You are in Selection Mode");
      return;
    }
    renderize.view = e.target.dataset.view
    const active = viewsBtn.querySelector("button.btn-primary");
    active.classList.remove("btn-primary")
    e.target.classList.add("btn-primary")
  }
});

// Pagination 
const paginationContainer = document.getElementById("paginationContainer");
const paginationBar = paginationContainer.querySelector("#paginationBar");
const previousPageBtn = paginationContainer.firstElementChild;
const nextPageBtn = paginationContainer.lastElementChild;

const setPaginationBar = () => {
  paginationBar.innerHTML = ''
  const current = renderize.currentPage;
  const total = renderize.totalPages;

  let start;
  let end;
  
  if (current > 2) {
    paginationBar.insertAdjacentHTML('beforeend',`<li class="page-item" data-jumpto="1"><a class="page-link" href="?page=1">1</a></li>`)
    start = current -1
    end = current + 1
    end = end == total+1? current : end
  }else{
    start = 1
    end = total > 4 ? 4 : total
  }
  for (let index = start; index <= end; index++) {
    paginationBar.insertAdjacentHTML('beforeend',`<li class="page-item ${index == current?'active':''}"><a class="page-link" ${index == current?'':`data-jumpto=${index}`} href="?page=${index}">${index}</a></li>`)
  }

  if (current > 1) {
    previousPageBtn.classList.remove("disabled");
  }else{
    previousPageBtn.classList.add("disabled");
  }
}
setPaginationBar();
paginationBar.addEventListener('click',(e)=>{
  e.preventDefault()
  if (e.target.dataset.jumpto) {
    if (renderize.inSelection) {
      alert("You are in Selection Mode");
      return;
    }
    renderize.jumpToPage(e.target.dataset.jumpto);
    viewContainer.scrollIntoView({behavior:"smooth",block:'start',inline:"nearest"})
    setPaginationBar();
  }
});

// For Error
if (renderize.errors.length > 0) {
  console.error(renderize.errors);
}

nextPageBtn.addEventListener("click",()=>{
  if (renderize.inSelection) {
    alert("You are in Selection Mode");
    return;
  }
  renderize.nextPage()
  viewContainer.scrollIntoView({behavior:"smooth",block:'start',inline:"nearest"})
  setPaginationBar();
});

previousPageBtn.addEventListener("click",()=>{
  if (renderize.inSelection) {
    alert("You are in Selection Mode");
    return;
  }
  renderize.previousPage();
  viewContainer.scrollIntoView({behavior:"smooth",block:'start',inline:"nearest"})
  setPaginationBar();
});

// Searching with debouncing
const searchInput = document.getElementById("searchInput");
const debounce = (func, delay) => {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

const debouncedSearch = debounce( async (value) => {await renderize.search(value);setPaginationBar()}, 600); // 600ms delay

searchInput.addEventListener("keyup", () => {
  if (renderize.inSelection) {
    alert("You are in Selection Mode");
    return;
  }
  debouncedSearch(searchInput.value)
});
searchInput.addEventListener("click", () => {
  setTimeout(() => {
    if (searchInput.value == "") {
      renderize.search(searchInput.value)
    }
  }, 0);
});


// Selection Mode 
const selectionBtn = document.getElementById("selectionBtn")
const selectionNav = document.getElementById("selectionNav")
const itemSelected = document.getElementById("itemSelected")

selectionBtn.addEventListener("change", (e) => {
  if(e.target.checked){
    selectionNav.classList.remove("d-none");
    renderize.startSelection((Option)=>{
      if (Option.checked) {
        Option.element.classList.add("border-primary",'item-selected');
      }else{
        Option.element.classList.remove("border-primary",'item-selected');
      }
      const selectionLength = renderize.selected.length;
      itemSelected.innerText = `${selectionLength} ${selectionLength>1?'Cards':'Card'} Selected`
    });

  }else{
    const items = renderize.viewContainer.querySelectorAll(".item-selected");
    const length = items.length;
    for (let index = 0; index < length; index++) {
      items[index].classList.remove("border-primary",'item-selected');
    }
    selectionNav.classList.add("d-none");
    itemSelected.innerText = `0 Card Selected`;
    renderize.stopSelection();
  }
});

// Renderize Events 
renderize.afterAutofetch = (response) => {
  // Applied delay for calculation of total pages.
  setTimeout(() => {
    setPaginationBar();
  }, 0);
  return response.products;
};

renderize.afterSearching = (response) => {
  return response.products;
};