export class GroceryItem {
    constructor(name) {
        if (typeof name !== 'string') {
            throw new TypeError('Grocery item name should be of type string');
        }
        this._name = name;
    }

    get name() {
        return this._name;
    }

    toString() {
        return this._name.toString();
    }
};