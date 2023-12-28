import { GroceryItem } from '../groceryitem.js';


describe('GroceryItem', () => {
    it('should properly initialize properties', () => {
        const item = new GroceryItem('Apple');
        expect(item.name).toBe('Apple');
    });

    it('should throw a TypeError when name is not a string', () => {
        const createItemWithNonString = () => {
            new GroceryItem(null);
        };
        expect(createItemWithNonString).toThrow(TypeError);
        expect(createItemWithNonString).toThrow('Grocery item name should be of type string');
    });
});
