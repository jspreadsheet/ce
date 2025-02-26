const { expect } = require('chai');

const jspreadsheet = require('../dist/index.js');

describe('Use pagination', () => {
    it('Start the worksheet with pagination', () => {
        const instance = jspreadsheet(root, {
            worksheets: [
                {
                    minDimensions: [7,7],
                    data: [
                        [1, 2, 3, 4, 5],
                        [6, 7, 8, 9, 10],
                        [11, 12, 13, 14, 15],
                        [16, 17, 18, 19, 20],
                        [21, 22, 23, 24, 25],
                        [26, 27, 28, 29, 30],
                        [31, 32, 33, 34, 35],
                        [36, 37, 38, 39, 40],
                        [41, 42, 43, 44, 45],
                        [46, 47, 48, 49, 50],
                    ],
                    pagination: 3
                },
            ]
        })

        expect(instance[0].quantiyOfPages()).to.equal(4)

        const bodyTag = root.querySelector('tbody')

        expect(bodyTag.children.length).to.equal(3)

        expect(bodyTag.children[0].getAttribute('data-y')).to.equal('0')
        expect(bodyTag.children[1].getAttribute('data-y')).to.equal('1')
        expect(bodyTag.children[2].getAttribute('data-y')).to.equal('2')
    });

    it('page method', () => {
        const instance = jspreadsheet(root, {
            worksheets: [
                {
                    minDimensions: [7,7],
                    data: [
                        [1, 2, 3, 4, 5],
                        [6, 7, 8, 9, 10],
                        [11, 12, 13, 14, 15],
                        [16, 17, 18, 19, 20],
                        [21, 22, 23, 24, 25],
                        [26, 27, 28, 29, 30],
                        [31, 32, 33, 34, 35],
                        [36, 37, 38, 39, 40],
                        [41, 42, 43, 44, 45],
                        [46, 47, 48, 49, 50],
                    ],
                    pagination: 3
                },
            ]
        })

        instance[0].page(2)

        expect(instance[0].quantiyOfPages()).to.equal(4)

        const bodyTag = root.querySelector('tbody')

        expect(bodyTag.children.length).to.equal(3)

        expect(bodyTag.children[0].getAttribute('data-y')).to.equal('6')
        expect(bodyTag.children[1].getAttribute('data-y')).to.equal('7')
        expect(bodyTag.children[2].getAttribute('data-y')).to.equal('8')
    });
});