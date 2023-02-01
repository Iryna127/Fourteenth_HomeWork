

let curPg = 'https://rickandmortyapi.com/api/character?page=1';
let usersData;
const numOfPage = document.getElementById('counter');
//Current page
function currentPage() {
  const urlParams = new URL(curPg);
  console.log(urlParams);
  const currentPage = urlParams.searchParams.get('page');
  numOfPage.innerHTML = currentPage;
  console.log(currentPage);
}
currentPage();
//Get our Characters
async function getCharacters() {
  const responce = await fetch(curPg);
  const data = await responce.json();
  usersData = data;
  curPg = data.info;
  console.log(curPg);
  console.log(usersData);
  return data;
}
// Show on display

async function displayList() {
  usersData = await getCharacters();
  const todoList = document.getElementById('persons-list-wrapper');
  todoList.innerHTML = `<h1>The Rick and Morty API</h1>`;
  console.log(usersData.info);
  console.log(usersData.results);
  usersData.results.forEach((item) => {
    todoList.innerHTML += `<div data-fullname='${item.name}' class="div"> ${item.id} ${item.name} ${item.status} <button btn-name="delete">delete</button> </div>`;
    let elem = document.querySelectorAll('.div');
    let selected = document.getElementById('selected');
    elem.forEach((item) => {
      item.addEventListener('click', () => {
        selected.innerHTML = `${item.dataset.fullname}`;
      });
    });
  });
  let elem = document.getElementsByClassName('div');
for (let div of elem) {
  div.addEventListener('mouseenter', function () {
    div.classList.add('background-onmouseenter');
  });
  div.addEventListener('mouseleave', function () {
    div.classList.remove('background-onmouseenter');
  });
}
}
displayList();
// Buttuns next and prev
document.getElementById('next').onclick = () => {
  if (curPg.next !== null) {
    curPg = curPg.next;
    console.log(curPg);
    console.log(currentPage);
    getCharacters();
    displayList();
    currentPage();
  }
};
document.getElementById('prev').onclick = () => {
  if (curPg.prev !== null) {
    curPg = curPg.prev;
    console.log(curPg);
    console.log(currentPage);
    getCharacters();
    displayList();
    currentPage();
  }
};

// last code
const actionList = {
  delete: (element) => {
    element.remove();
  },
};
let currentSelection = undefined;
function recordActionHandler(event) {
  const carRec = event.target;
  const action = event.target.getAttribute('btn-name');

  if (action in actionList) {
    actionList[action](carRec.parentElement);
  }
  if (currentSelection) {
    currentSelection.classList.remove('selected1');
  }
  if (event.target.classList.contains('div')) {
    currentSelection = event.target;
    event.target.classList.add('selected1');
  }
}
function returnAll() {
  window.location.reload();
}
