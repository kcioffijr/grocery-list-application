import { GroceryItem } from '../groceryitem.js';


describe('GroceryItem', () => {
    it('should properly initialize properties', () => {
        const item = new GroceryItem('Apple');
        expect(item.name).toBe('Apple'); // Use the getter property
    });
});
