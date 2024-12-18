const { expect } = require('chai');
const { before } = require('mocha');

before(async function() {
    // This will ensure that the import is complete before tests run
    jspreadsheet = (await import('../src/index.js')).default
  });

describe('Use the redo method', () => {
    it('.undo', () => {
        const instance = jspreadsheet(root, {
            tabs: true,
            worksheets: [
                {
                    minDimensions: [7,7],
                    data: [['Hello', 'World'], ['Testing', 'CE']],
                    worksheetName: 'Countries'
                },
            ]
        })
        
        const table = root.querySelector('tbody')
        const rows = table.children
        const firstRow = rows[0]
        const secondRow = rows[1]

        expect(firstRow.children[1].innerHTML).to.include('Hello')
        expect(firstRow.children[2].innerHTML).to.include('World')
        expect(secondRow.children[1].innerHTML).to.include('Testing')
        expect(secondRow.children[2].innerHTML).to.include('CE')

        instance[0].setValueFromCoords(0, 0, 'New Value')
        instance[0].setValueFromCoords(1, 0, 'TESTING')


        expect(firstRow.children[1].innerHTML).to.include('New Value')
        expect(firstRow.children[2].innerHTML).to.include('TESTING')

        instance[0].undo()

        expect(firstRow.children[1].innerHTML).to.include('New Value')
        expect(firstRow.children[2].innerHTML).to.include('World')

        instance[0].undo()

        expect(firstRow.children[1].innerHTML).to.include('Hello')
        expect(firstRow.children[2].innerHTML).to.include('World')
    });

    it('.redo after undo something', () => {
        const instance = jspreadsheet(root, {
            tabs: true,
            worksheets: [
                {
                    minDimensions: [7,7],
                    data: [['Hello', 'World'], ['Testing', 'CE']],
                    worksheetName: 'Countries'
                },
            ]
        })
        
        const table = root.querySelector('tbody')
        const rows = table.children
        const firstRow = rows[0]
        const secondRow = rows[1]

        expect(firstRow.children[1].innerHTML).to.include('Hello')
        expect(firstRow.children[2].innerHTML).to.include('World')
        expect(secondRow.children[1].innerHTML).to.include('Testing')
        expect(secondRow.children[2].innerHTML).to.include('CE')

        instance[0].setValueFromCoords(0, 0, 'New Value')
        instance[0].setValueFromCoords(1, 0, 'TESTING')


        expect(firstRow.children[1].innerHTML).to.include('New Value')
        expect(firstRow.children[2].innerHTML).to.include('TESTING')

        instance[0].undo()

        expect(firstRow.children[1].innerHTML).to.include('New Value')
        expect(firstRow.children[2].innerHTML).to.include('World')

        instance[0].undo()

        expect(firstRow.children[1].innerHTML).to.include('Hello')
        expect(firstRow.children[2].innerHTML).to.include('World')

        instance[0].redo()

        expect(firstRow.children[1].innerHTML).to.include('New Value')
        expect(firstRow.children[2].innerHTML).to.include('World')

        instance[0].redo()

        expect(firstRow.children[1].innerHTML).to.include('New Value')
        expect(firstRow.children[2].innerHTML).to.include('TESTING')
    });
});