const groceryList = document.getElementById('items');
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
    updateUI();
}

function addItemToGroceryList(item) {
    let itemToAdd = createElementBasedOnTagName('li');
    addClassesToElement(itemToAdd, 'item');
    itemToAdd.appendChild(document.createTextNode(item));
    itemToAdd.appendChild(createButton());
    groceryList.appendChild(itemToAdd);
}

function createElementBasedOnTagName(tagName) {
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
    });

    element.classList.add(...classes);
}

function createButton() {
    let deleteButton = createElementBasedOnTagName('span');
    addClassesToElement(deleteButton, 'remove-item', 'fa-solid', 'fa-x');
    deleteButton.setAttribute('id', 'x');
    return deleteButton;
}

function removeAllGroceryItemsFromDOM() {
    if (confirm('You are about to remove all items from your grocery list, continue?')) {
        while (groceryList.firstChild) {
            groceryList.removeChild(groceryList.firstChild);
        }
        updateUI();
    }
}

function removeGroceryItemFromDOM(event) {
    let groceryItem = event.target;
    if (groceryItem.classList.contains('remove-item')) {
        const itemTile = groceryItem.parentElement;
        removeItem(itemTile);
        updateUI();
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

function updateUI() {
    let groceryItems = document.querySelectorAll('li');
    let inputSection = document.getElementById('input-section');

    if (groceryItems.length === 0) {
        searchBar.style.display = 'none';
        clearAllButton.style.display = 'none';
        inputSection.style.borderBottom = 'none';
    } else if (groceryItems.length >= 10) {
        searchBar.style.display = 'flex';
    } else {
        searchBar.style.display = 'none';
        clearAllButton.style.display = 'inline-block';
        inputSection.style.borderBottom = '1px solid #ccc';
    }
}

addItemButton.addEventListener('click', addItemToDOM);
clearAllButton.addEventListener('click', removeAllGroceryItemsFromDOM);
groceryList.addEventListener('click', removeGroceryItemFromDOM);
searchBar.addEventListener('input', filterGroceryItemsFromDOM);
addEventListener('DOMContentLoaded', updateUI);