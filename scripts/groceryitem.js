export class GroceryItem {
    constructor(name) {
        if (typeof name !== 'string') {
            throw new TypeError('Grocery item name should be of type string');
        }
        this._name = name; // Assign the name to the instance variable
    }

    get name() {
        return this._name;
    }

    toString() {
        return this._name.toString();
    }
};