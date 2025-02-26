const { expect } = require('chai');

const jspreadsheet = require('../dist/index.js');

describe('Create a jspreadsheet instance', () => {
    it('and the dimensions are applied correctly', () => {
        const instance = jspreadsheet(root, {
            tabs: true,
            worksheets: [
                { minDimensions: [10,10], data: [[10, 20, 30]], worksheetName: 'Countries' },
            ]
        })
        
        
        const table = root.querySelector('tbody')
        const rows = table.children
        const firstRow = rows[0]

        // check that the amount of rows displayed is 10
        expect(rows.length).to.eq(10)

        // check that the amount of columns displayed is 10 + 1 (one from the row header)
        expect(firstRow.children.length).to.eq(10 + 1)
    });

    it('and the data is displayed correctly', () => {
        const instance = jspreadsheet(root, {
            tabs: true,
            worksheets: [
                { minDimensions: [10,10], data: [[10, 20, 30], [40, 50, 60]], worksheetName: 'Countries' },
            ]
        })
        
        
        const table = root.querySelector('tbody')
        const rows = table.children
        const firstRow = rows[0]
        const secondRow = rows[1]

        // check that [A1, B1, C1] received the data value
        expect(firstRow.children[1].innerHTML).to.include(10)
        expect(firstRow.children[1].innerHTML).not.to.include(20)
        expect(firstRow.children[1].innerHTML).not.to.include(30)
        expect(firstRow.children[2].innerHTML).to.include(20)
        expect(firstRow.children[2].innerHTML).not.to.include(10)
        expect(firstRow.children[2].innerHTML).not.to.include(30)
        expect(firstRow.children[3].innerHTML).to.include(30)
        expect(firstRow.children[3].innerHTML).not.to.include(10)
        expect(firstRow.children[3].innerHTML).not.to.include(20)

        // check that [A2, B2, C2] received the data value
        expect(secondRow.children[1].innerHTML).to.include(40)
        expect(secondRow.children[1].innerHTML).not.to.include(50)
        expect(secondRow.children[1].innerHTML).not.to.include(60)
        expect(secondRow.children[2].innerHTML).to.include(50)
        expect(secondRow.children[2].innerHTML).not.to.include(40)
        expect(secondRow.children[2].innerHTML).not.to.include(60)
        expect(secondRow.children[3].innerHTML).to.include(60)
        expect(secondRow.children[3].innerHTML).not.to.include(40)
        expect(secondRow.children[3].innerHTML).not.to.include(50)
    });

    it('and the worksheet names are displayed correctly', () => {
        const instance = jspreadsheet(root, {
            tabs: true,
            worksheets: [
                { minDimensions: [10,10], worksheetName: 'Countries' },
                { minDimensions: [10,10], worksheetName: 'Employees' },
            ]
        })

        const headerWorksheets = root.querySelector('.jtabs-headers')
        
        expect(headerWorksheets.children[0].innerHTML).to.include('Countries')
        expect(headerWorksheets.children[0].innerHTML).not.to.include('Employees')
        expect(headerWorksheets.children[1].innerHTML).to.include('Employees')
        expect(headerWorksheets.children[1].innerHTML).not.to.include('Countries')
    });
});