
let groceryList = document.getElementById('items');
    
const itemToBeAdded = document.getElementById('add-item');
const addItemButton = document.getElementById('add-item-btn');
const clearAllButton = document.getElementById('clear-all');
const searchBar = document.getElementById('search');

function addItemToDOM() {
    if (itemToBeAdded.value === '') {
        alert('You must type the name of a grocery item to continue.');
        return;
    }

    addItemToGroceryList(itemToBeAdded.value);
    itemToBeAdded.value = '';
}

function addItemToGroceryList(item) {
    let itemToAdd = createElement('li');
    addClassesToElement(itemToAdd, 'item');
    itemToAdd.appendChild(document.createTextNode(item));
    itemToAdd.appendChild(createButton());
    groceryList.appendChild(itemToAdd);
}

function createElement(tagName) {
    return document.createElement(tagName);
}

function addClassesToElement(element, ...classes) {
    if (!element instanceof HTMLElement) {
        console.error('Invalid element provided.');
        return;
    }

    classes.forEach(className => {
        if (typeof className !== 'string') {
            console.error('Class names need to be strings.');
            return;
        }
    })

    element.classList.add(...classes);
}

function createButton() {
    let deleteButton = createElement('span');
    addClassesToElement(deleteButton, 'remove-item', 'fa-solid', 'fa-x');
    deleteButton.setAttribute('id', 'x');
    return deleteButton;
}

function removeAllGroceryItemsFromDOM() {
    if (window.confirm('This action will delete all grocery items, are you sure?')) {
        groceryList.forEach(groceryItem, () => {
            removeItem(groceryItem);
        });
    }
}

function removeGroceryItemFromDOM(event) {
    let groceryItem = event.target;
    if (groceryItem.classList.contains('remove-item')) {
        removeItem(groceryItem.parentElement);
    }
}

function removeItem(item) {
    item.remove();
}

function filterGroceryItemsFromDOM(event) {
    let groceryItems = document.querySelectorAll('li');
    let searchText = event.target.value.toLowerCase();

    groceryItems.forEach(item => {
        let itemName = item.textContent.toLowerCase();
        if (itemName.indexOf(searchText) !== -1) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
}

addItemButton.addEventListener('click', addItemToDOM);
clearAllButton.addEventListener('click', removeAllGroceryItemsFromDOM);
groceryList.addEventListener('click', removeGroceryItemFromDOM);
searchBar.addEventListener('input', filterGroceryItemsFromDOM);

