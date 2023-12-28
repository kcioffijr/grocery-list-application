import { GroceryList } from "../grocerylist";
import { JSDOM } from 'jsdom';
let fs = require('fs');

const index = fs.readFileSync('index.html', 'utf-8');

describe('GroceryList', () => {
    
    const dom = new JSDOM(index);
    const document = dom.window.document;

    it('should fetch an accurate list from the Document Object Model', () => {
        const expectedItems = new GroceryList(document).list;
        const actualItems = Array.from(document.getElementsByClassName('item'), 
                                        element => element.textContent.trim());

        expect(expectedItems).toMatchObject(actualItems);
    });
});