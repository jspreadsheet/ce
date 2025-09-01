const { expect } = require('chai');

const jspreadsheet = require('../dist/index.js');

describe('Use the headers method', () => {
    it('setHeader and header title is changed', () => {
        const instance = jspreadsheet(root, {
            tabs: true,
            worksheets: [
                {
                    minDimensions: [7, 7],
                    data: [
                        [3, 6, 9, 12, 15, 18],
                        [3, 6, 9, 12, 15, 18],
                    ],
                },
            ],
        });

        let table = root.querySelector('thead');
        let headers = table.children[0].children;

        expect(headers[1].innerHTML).to.include('A');
        expect(headers[2].innerHTML).to.include('B');

        instance[0].setHeader(0, 'Produtos');

        expect(headers[1].innerHTML).to.include('Produtos');
        expect(headers[2].innerHTML).to.include('B');

        instance[0].setHeader(1, 'Quantidade');

        expect(headers[1].innerHTML).to.include('Produtos');
        expect(headers[2].innerHTML).to.include('Quantidade');
    });

    it('getHeader and header title is retrieved', () => {
        const instance = jspreadsheet(root, {
            tabs: true,
            worksheets: [
                {
                    minDimensions: [7, 7],
                    data: [
                        [3, 6, 9, 12, 15, 18],
                        [3, 6, 9, 12, 15, 18],
                    ],
                },
            ],
        });

        let table = root.querySelector('thead');
        let headers = table.children[0].children;

        expect(headers[1].innerHTML).to.include('A');
        expect(headers[2].innerHTML).to.include('B');

        expect(instance[0].getHeader(0)).to.include('A');
        expect(instance[0].getHeader(1)).to.include('B');
        expect(instance[0].getHeader(2)).to.include('C');
    });

    it('getHeaders and header titles are retrieved', () => {
        const instance = jspreadsheet(root, {
            tabs: true,
            worksheets: [
                {
                    minDimensions: [7, 7],
                    data: [
                        [3, 6, 9, 12, 15, 18],
                        [3, 6, 9, 12, 15, 18],
                    ],
                },
            ],
        });

        let table = root.querySelector('thead');
        let headers = table.children[0].children;

        expect(headers[1].innerHTML).to.include('A');
        expect(headers[2].innerHTML).to.include('B');

        let h = instance[0].getHeaders();

        expect(h).to.include('A');
        expect(h).to.include('B');
        expect(h).to.include('C');
        expect(h).to.include('D');
        expect(h).to.include('E');
        expect(h).to.include('F');
    });

    it('setHeader history', () => {
        const instance = jspreadsheet(root, {
            tabs: true,
            worksheets: [
                {
                    minDimensions: [7, 7],
                    data: [
                        [3, 6, 9, 12, 15, 18],
                        [3, 6, 9, 12, 15, 18],
                    ],
                },
            ],
        });

        let table = root.querySelector('thead');
        let headers = table.children[0].children;

        expect(headers[1].innerHTML).to.equal('A');
        expect(headers[2].innerHTML).to.equal('B');

        instance[0].setHeader(0, 'Products');

        expect(headers[1].innerHTML).to.equal('Products');
        expect(headers[2].innerHTML).to.equal('B');

        instance[0].undo();

        expect(headers[1].innerHTML).to.equal('A');
        expect(headers[2].innerHTML).to.equal('B');

        instance[0].redo();

        expect(headers[1].innerHTML).to.equal('Products');
        expect(headers[2].innerHTML).to.equal('B');
    });
});
