
let groceryList = document.getElementById('items');
    
const itemToBeAdded = document.getElementById('add-item');
const addItemButton = document.getElementById('add-item-btn');

function addItemToDOM() {

    if (itemToBeAdded.value === '') {
        alert('You must type the name of a grocery item to continue.');
        return;
    }

    addItem(itemToBeAdded.value);
    itemToBeAdded.value = '';
}

function addItem(item) {
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
    element.classList.add(...classes);
}

function createButton() {
    let deleteButton = createElement('span');
    addClassesToElement(deleteButton, 'remove-item', 'fa-solid', 'fa-x');
    deleteButton.setAttribute('id', 'x');
    return deleteButton;
}

function removeGroceryItemFromDOM(e) {
    let groceryItem = e.target;
    if (groceryItem.classList.contains('remove-item')) {
        removeItem(groceryItem.parentElement);
    }
}

function removeItem(item) {
    item.remove();
}

groceryList.addEventListener('click', removeGroceryItemFromDOM);
addItemButton.addEventListener('click', addItemToDOM);

