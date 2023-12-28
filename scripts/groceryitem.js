export class GroceryItem {
    constructor(name) {
        if (typeof name !== 'string') {
            throw new TypeError('Grocery Item name must be a string');
        }
        this._name = name; // Assign the name to the instance variable
    }

    get name() {
        return this._name;
    }
};