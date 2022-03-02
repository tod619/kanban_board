const addBtns = document.querySelectorAll('.add-btn:not(.solid)');
const saveItemBtns = document.querySelectorAll('.solid');
const addItemContainers = document.querySelectorAll('.add-container');
const addItems = document.querySelectorAll('.add-item');
// Item Lists
const listColumns = document.querySelectorAll('.drag-item-list');
const backlogList = document.getElementById('backlog-list');
const progressList = document.getElementById('progress-list');
const completeList = document.getElementById('complete-list');
const onHoldList = document.getElementById('on-hold-list');

// Items
let updatedOnLoad = false


// Initialize Arrays
let backlogListArray = [];
let progressListArray = [];
let completeListArray = [];
let onHoldListArray = [];
let listArrays = []

// Drag Functionality
let draggedItem
let currentColumn 


// Get Arrays from localStorage if available, set default values if not
function getSavedColumns() {
  if (localStorage.getItem('backlogItems')) {
    backlogListArray = JSON.parse(localStorage.backlogItems);
    progressListArray = JSON.parse(localStorage.progressItems);
    completeListArray = JSON.parse(localStorage.completeItems);
    onHoldListArray = JSON.parse(localStorage.onHoldItems);
  } else {
    backlogListArray = ['Decide on projects', 'Sit back and relax'];
    progressListArray = ['Work on projects', 'Listen to music'];
    completeListArray = ['Being cool', 'Getting stuff done'];
    onHoldListArray = ['Being uncool'];
  }
}

// Set localStorage Arrays
function updateSavedColumns() {
  
  listArrays = [backlogListArray, progressListArray, completeListArray, onHoldListArray]
  const arrayNames = ['backlog', 'progress', 'complete', 'onHold']

  arrayNames.forEach((arrayName, idx) => {
    localStorage.setItem(`${arrayName}Item`, JSON.stringify(listArrays[idx]))
  })

}

// Create DOM Elements for each list item
function createItemEl(columnEl, column, item, index) {
  // console.log('columnEl:', columnEl);
  // console.log('column:', column);
  // console.log('item:', item);
  // console.log('index:', index);
  // List Item
  const listEl = document.createElement('li');
  listEl.classList.add('drag-item');
  listEl.textContent = item
  listEl.draggable = true
  listEl.setAttribute('ondragstart', 'drag(event)')
  // Append
  columnEl.appendChild(listEl)

}

// Update Columns in DOM - Reset HTML, Filter Array, Update localStorage
function updateDOM() {
  // Check localStorage once
  if(!updatedOnLoad) {
    getSavedColumns()
  }

  // Backlog Column
  backlogList.textContent = ''
  backlogListArray.forEach((backlogItem, idx) => {
    createItemEl(backlogList, 0, backlogItem, idx)
  })

  // Progress Column
  progressList.textContent = ''
  progressListArray.forEach((progressItem, idx) => {
    createItemEl(progressList, 1, progressItem, idx)
  })

  // Complete Column
  completeList.textContent = ''
  completeListArray.forEach((completeItem, idx) => {
    createItemEl(completeList, 2, completeItem, idx)
  })

  // On Hold Column
  onHoldList.textContent = ''
  onHoldListArray.forEach((onHoldItem, idx) => {
    createItemEl(onHoldList, 3, onHoldItem, idx)
  })

  // Run getSavedColumns only once, Update Local Storage

}

// Item at the start of dragging
function drag(e) {
  draggedItem = e.target 
}

// Column alllows item to drop
function allowDrop(e) {
  e.preventDefault()
}

// When item enters column area
function dragEnter(column) {
  listColumns[column].classList.add('over')
  currentColumn = column
}

// Dropping item in column
function drop(e) {
  e.preventDefault()
  // remove background color & padding from uls
  listColumns.forEach((column) => {
    column.classList.remove('over')
  })

  // Add item to new column
  const parent = listColumns[currentColumn]
  parent.appendChild(draggedItem)

}

// On load 
updateDOM()

