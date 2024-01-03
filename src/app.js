import './styles.css';

const groceryList = document.getElementById('items');
const itemToBeAdded = document.getElementById('add-item');
const addItemButton = document.getElementById('add-item-btn');
const clearAllButton = document.getElementById('clear-all');
const searchBar = document.getElementById('search');

/**
 * Upon loading the webpage, any groceries \
 * saved to storage will be added to the grocery list.
 */
function populateDOMWithStorage() {
    let groceries = JSON.parse(retrieveGroceriesFromStorage());
    
    if (groceries.length > 0) {
        groceries.forEach(item => groceryList.appendChild(createItemForGroceryList(item)));
    }
}

/**
 * Wrapper function that handles adding \
 * a grocery item to the DOM. 
 * 
 * The grocery item will also be saved to storage.
 * @returns 
 */
function addItemToDOM() {
    if (itemToBeAdded.value === '') {
        alert('You must type the name of a grocery item to continue.');
        return;
    }
    
    groceryList.appendChild(createItemForGroceryList(itemToBeAdded.value));
    saveGroceryItemInStorage(itemToBeAdded.value);
    itemToBeAdded.value = '';
    adjustUIBasedOnGroceryItemCount();
}

/**
 * Creates the elements/nodes needed for \
 * adding populating the grocery item in the list.
 * @param {string} groceryItem 
 */
function createItemForGroceryList(groceryItem) {
    let itemToAdd = createElementBasedOnTagName('li');
    addClassesToElement(itemToAdd, 'item');
    itemToAdd.appendChild(document.createTextNode(groceryItem));
    itemToAdd.appendChild(createDeleteButtonForGroceryItem());
    return itemToAdd;
}

function createElementBasedOnTagName(tagName) {
    return document.createElement(tagName);
}

/**
 * Takes an element with a list of classes that \
 * need to be applied to it.
 * @param {HTMLElement} element 
 * @param  {...string} classes 
 * @returns 
 */
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

function createDeleteButtonForGroceryItem() {
    let deleteButton = createElementBasedOnTagName('span');
    addClassesToElement(deleteButton, 'remove-item', 'fa-solid', 'fa-x');
    deleteButton.setAttribute('id', 'x');
    return deleteButton;
}

function removeAllGroceryItemsFromDOM() {
    if (confirm('You are about to remove all items from your grocery list, continue?')) {
        while (groceryList.firstChild) {
            groceryList.removeChild(groceryList.firstChild);
            localStorage.setItem('groceries', JSON.stringify([]));
        }
        adjustUIBasedOnGroceryItemCount();
    }
}

function removeGroceryItem(event) {
    let groceryItem = event.target; //button element
    if (groceryItem.classList.contains('remove-item')) {
        const itemTile = groceryItem.parentElement;
        itemTile.remove();
        removeGroceryItemNameFromStorage(itemTile.textContent);
        adjustUIBasedOnGroceryItemCount();
    }
}

function removeGroceryItemNameFromStorage(itemName) {
    let groceries = JSON.parse(retrieveGroceriesFromStorage());
    const updatedGroceries = groceries.filter(item => item !== itemName);

    localStorage.setItem('groceries', JSON.stringify(updatedGroceries));
}

/**
 * Toggles the inner display of the grid items \
 * when a user is searching for an item.
 * @param {Event} event 
 */
function toggleGroceryItemsInDOMBasedOnSearch(event) {
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

function adjustUIBasedOnGroceryItemCount() {
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

/**
 * Saves the string of the grocery item in storage.
 * @param {string} groceryName 
 */
function saveGroceryItemInStorage(groceryName) {
    let groceries = JSON.parse(retrieveGroceriesFromStorage());

    if (groceryName !== null && groceryName !== '') {
        groceries.push(groceryName);
        localStorage.setItem('groceries', JSON.stringify(groceries));
    }
}

function retrieveGroceriesFromStorage() {
    const storedGroceries = localStorage.getItem('groceries');
    
    if (storedGroceries && storedGroceries.length > 0) {
        return storedGroceries;
    } else {
        return JSON.stringify([]);
    }
}

addEventListener('DOMContentLoaded', populateDOMWithStorage);
addItemButton.addEventListener('click', addItemToDOM);
clearAllButton.addEventListener('click', removeAllGroceryItemsFromDOM);
groceryList.addEventListener('click', removeGroceryItem);
searchBar.addEventListener('input', toggleGroceryItemsInDOMBasedOnSearch);
addEventListener('DOMContentLoaded', adjustUIBasedOnGroceryItemCount);