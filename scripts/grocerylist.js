export class GroceryList {
    constructor(doc = document) {
        this._list = doc.getElementsByClassName('item');
    }

    get list() {
        return Array.from(this._list, element => element.textContent.trim());
    }
}