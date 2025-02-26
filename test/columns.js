const { expect } = require('chai');

const jspreadsheet = require('../dist/index.js');

describe('Use the columns method', () => {
    it('insertColumn and column is inserted in the position 0', () => {
        const instance = jspreadsheet(root, {
            tabs: true,
            worksheets: [
                {
                    minDimensions: [7,7],
                    data: [[9, 9, 9, 9, 9, 9], [9, 9, 9, 9, 9, 9]],
                },
            ]
        })

        let table = root.querySelector('tbody')
        let rows = table.children

        expect(rows[0].children[1].innerHTML).to.include(9)

        // Insert [3, 3] column in the first column
        instance[0].insertColumn([3, 3], 0, 1)

        expect(rows[0].children[1].innerHTML).to.include(3)

        // Insert [2, 2] column in the first column
        instance[0].insertColumn([2, 2], 0, 1)

        expect(rows[0].children[1].innerHTML).to.include(2)
    });

    it('insertColumn and column is inserted in the position 1', () => {
        const instance = jspreadsheet(root, {
            tabs: true,
            worksheets: [
                {
                    minDimensions: [7,7],
                    data: [[9, 9, 9, 9, 9, 9], [9, 9, 9, 9, 9, 9]],
                },
            ]
        })

        let table = root.querySelector('tbody')
        let rows = table.children

        expect(rows[0].children[2].innerHTML).to.include(9)

        // Insert [3, 3] column in the second column
        instance[0].insertColumn([3, 3], 0)

        expect(rows[0].children[1].innerHTML).to.include(9)
        expect(rows[0].children[2].innerHTML).to.include(3)

        // Insert [2, 2] column in the second column
        instance[0].insertColumn([2, 2], 0)

        expect(rows[0].children[1].innerHTML).to.include(9)
        expect(rows[0].children[2].innerHTML).to.include(2)
    });

    it('deleteColumn and column is removed in the given index', () => {
        const instance = jspreadsheet(root, {
            tabs: true,
            worksheets: [
                {
                    minDimensions: [7,7],
                    data: [[3, 6, 9, 9, 9, 9], [3, 6, 9, 9, 9, 9]],
                },
            ]
        })

        let table = root.querySelector('tbody')
        let rows = table.children

        expect(rows[0].children[1].innerHTML).to.include(3)
        expect(rows[0].children[2].innerHTML).to.include(6)
        expect(rows[0].children[3].innerHTML).to.include(9)

        // Delete first column
        instance[0].deleteColumn(0)

        expect(rows[0].children[1].innerHTML).to.include(6)
        expect(rows[0].children[2].innerHTML).to.include(9)
        expect(rows[0].children[3].innerHTML).to.include(9)

        // Delete first column
        instance[0].deleteColumn(0)

        expect(rows[0].children[1].innerHTML).to.include(9)
        expect(rows[0].children[2].innerHTML).to.include(9)
        expect(rows[0].children[3].innerHTML).to.include(9)
    });

    it('deleteColumn and multiple column are removed starting from the given index', () => {
        const instance = jspreadsheet(root, {
            tabs: true,
            worksheets: [
                {
                    minDimensions: [7,7],
                    data: [[3, 6, 9, 12, 15, 18], [3, 6, 9, 12, 15, 18]],
                },
            ]
        })

        let table = root.querySelector('tbody')
        let rows = table.children

        expect(rows[0].children[1].innerHTML).to.include(3)
        expect(rows[0].children[2].innerHTML).to.include(6)
        expect(rows[0].children[3].innerHTML).to.include(9)

        // Delete first two columns
        instance[0].deleteColumn(0, 2)

        expect(rows[0].children[1].innerHTML).to.include(9)
        expect(rows[0].children[2].innerHTML).to.include(12)
        expect(rows[0].children[3].innerHTML).to.include(15)

        // Delete first two columns
        instance[0].deleteColumn(0, 2)

        expect(rows[0].children[1].innerHTML).to.include(15)
        expect(rows[0].children[2].innerHTML).to.include(18)
    });

    it('hideColumn and showColumn', () => {
        const instance = jspreadsheet(root, {
            tabs: true,
            worksheets: [
                {
                    minDimensions: [7,7],
                    data: [[3, 6, 9, 12, 15, 18], [3, 6, 9, 12, 15, 18]],
                },
            ]
        })

        let table = root.querySelector('thead')
        let headers = table.children[0].children

        expect(headers[1].innerHTML).to.include('A')
        expect(window.getComputedStyle(headers[1]).display).not.to.include('none')

        // Hides the first column 'A'
        instance[0].hideColumn(0)

        expect(headers[1].innerHTML).to.include('A')
        expect(window.getComputedStyle(headers[1]).display).to.include('none')
        expect(headers[2].innerHTML).to.include('B')
        expect(window.getComputedStyle(headers[2]).display).not.to.include('none')

        // Shows the column that was hidden
        instance[0].showColumn(0)

        expect(headers[1].innerHTML).to.include('A')
        expect(window.getComputedStyle(headers[1]).display).not.to.include('none')
        expect(headers[2].innerHTML).to.include('B')
        expect(window.getComputedStyle(headers[2]).display).not.to.include('none')
    });

    it('insertColumn history', () => {
        const instance = jspreadsheet(root, {
            tabs: true,
            worksheets: [
                {
                    minDimensions: [7,7],
                    data: [[9, 9, 9, 9, 9, 9], [9, 9, 9, 9, 9, 9]],
                },
            ]
        })

        let table = root.querySelector('tbody')
        let rows = table.children

        expect(rows[0].children[1].innerHTML).to.include(9)

        // Insert [3, 3] column in the first column
        instance[0].insertColumn([3, 3], 0, 1)

        expect(rows[0].children[1].innerHTML).to.include(3)

        instance[0].undo()

        expect(rows[0].children[1].innerHTML).to.include(9)

        instance[0].redo()

        expect(rows[0].children[1].innerHTML).to.include(3)
    });

    it('deleteColumn history', () => {
        const instance = jspreadsheet(root, {
            tabs: true,
            worksheets: [
                {
                    minDimensions: [7,7],
                    data: [[1, 2, 3, 4], [5, 6, 7, 8]],
                },
            ]
        })

        let table = root.querySelector('tbody')
        let rows = table.children

        expect(rows[0].children[1].innerHTML).to.include(1)
        expect(rows[0].children[2].innerHTML).to.include(2)
        expect(rows[0].children[3].innerHTML).to.include(3)

        // Delete first column
        instance[0].deleteColumn(0)

        expect(rows[0].children[1].innerHTML).to.include(2)
        expect(rows[0].children[2].innerHTML).to.include(3)
        expect(rows[0].children[3].innerHTML).to.include(4)

        instance[0].undo(0)

        expect(rows[0].children[1].innerHTML).to.include(1)
        expect(rows[0].children[2].innerHTML).to.include(2)
        expect(rows[0].children[3].innerHTML).to.include(3)

        instance[0].redo(0)

        expect(rows[0].children[1].innerHTML).to.include(2)
        expect(rows[0].children[2].innerHTML).to.include(3)
        expect(rows[0].children[3].innerHTML).to.include(4)
    });
});