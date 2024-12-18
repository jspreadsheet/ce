const { expect } = require('chai');
const { before } = require('mocha');

before(async function() {
    // This will ensure that the import is complete before tests run
    jspreadsheet = (await import('../src/index.js')).default
  });

describe('Merge tests', () => {
    describe('Get merge', () => {
        it('Worksheet started with a merge', () => {
            const instance = jspreadsheet(root, {
                toolbar: true,
                worksheets: [{
                    data: [
                        ['Mazda', 2001, 2000, '2006-01-01 12:00:00'],
                        ['Peugeot', 2010, 5000, '2005-01-01 13:00:00'],
                        ['Honda Fit', 2009, 3000, '2004-01-01 14:01:00'],
                        ['Honda CRV', 2010, 6000, '2003-01-01 23:30:00'],
                    ],
                    minDimensions: [10, 15],
                    columns: [
                        {
                            width: '300px',
                        },
                        {
                            width: '80px',
                        },
                        {
                            width: '100px',
                        },
                        {
                            width: '150px',
                        },
                    ],
                    mergeCells: {
                        C1: [1, 2]
                    }
                }]
            })

            expect(instance[0].getMerge('C1')).to.eql([1, 2])
            expect(instance[0].getMerge('C2')).to.equal(null)

            expect(instance[0].getMerge()).to.eql({ C1: [1, 2] })
        });

        it('Worksheet started without merges', () => {
            const instance = jspreadsheet(root, {
                toolbar: true,
                worksheets: [{
                    data: [
                        ['Mazda', 2001, 2000, '2006-01-01 12:00:00'],
                        ['Peugeot', 2010, 5000, '2005-01-01 13:00:00'],
                        ['Honda Fit', 2009, 3000, '2004-01-01 14:01:00'],
                        ['Honda CRV', 2010, 6000, '2003-01-01 23:30:00'],
                    ],
                    minDimensions: [10, 15],
                    columns: [
                        {
                            width: '300px',
                        },
                        {
                            width: '80px',
                        },
                        {
                            width: '100px',
                        },
                        {
                            width: '150px',
                        },
                    ],
                }]
            })

            expect(instance[0].getMerge('C1')).to.equal(null)

            expect(instance[0].getMerge()).to.eql({})
        });
    });

    it('Set merge', () => {
        const instance = jspreadsheet(root, {
            toolbar: true,
            worksheets: [{
                data: [
                    ['Mazda', 2001, 2000, '2006-01-01 12:00:00'],
                    ['Peugeot', 2010, 5000, '2005-01-01 13:00:00'],
                    ['Honda Fit', 2009, 3000, '2004-01-01 14:01:00'],
                    ['Honda CRV', 2010, 6000, '2003-01-01 23:30:00'],
                ],
                minDimensions: [10, 15],
                columns: [
                    {
                        width: '300px',
                    },
                    {
                        width: '80px',
                    },
                    {
                        width: '100px',
                    },
                    {
                        width: '150px',
                    },
                ],
            }]
        })

        instance[0].setMerge('A3', 2, 3)

        const table = root.querySelector('tbody')
        const rows = table.children

        expect(rows[2].children[1].getAttribute('colspan')).to.equal('2')
        expect(rows[2].children[1].getAttribute('rowspan')).to.equal('3')
    });

    it('Remove merge', () => {
        const instance = jspreadsheet(root, {
            toolbar: true,
            worksheets: [{
                data: [
                    ['Mazda', 2001, 2000, '2006-01-01 12:00:00'],
                    ['Peugeot', 2010, 5000, '2005-01-01 13:00:00'],
                    ['Honda Fit', 2009, 3000, '2004-01-01 14:01:00'],
                    ['Honda CRV', 2010, 6000, '2003-01-01 23:30:00'],
                ],
                minDimensions: [10, 15],
                columns: [
                    {
                        width: '300px',
                    },
                    {
                        width: '80px',
                    },
                    {
                        width: '100px',
                    },
                    {
                        width: '150px',
                    },
                ],
                mergeCells: {
                    A1: [2, 2],
                    E5: [3, 2],
                }
            }]
        })

        const table = root.querySelector('tbody')
        const rows = table.children

        instance[0].removeMerge('A1')

        expect(rows[0].children[1].getAttribute('colspan')).to.equal(null)
        expect(rows[0].children[1].getAttribute('rowspan')).to.equal(null)

        expect(rows[4].children[5].getAttribute('colspan')).to.equal('3')
        expect(rows[4].children[5].getAttribute('rowspan')).to.equal('2')
    });

    it('Remove all merge', () => {
        const instance = jspreadsheet(root, {
            toolbar: true,
            worksheets: [{
                data: [
                    ['Mazda', 2001, 2000, '2006-01-01 12:00:00'],
                    ['Peugeot', 2010, 5000, '2005-01-01 13:00:00'],
                    ['Honda Fit', 2009, 3000, '2004-01-01 14:01:00'],
                    ['Honda CRV', 2010, 6000, '2003-01-01 23:30:00'],
                ],
                minDimensions: [10, 15],
                columns: [
                    {
                        width: '300px',
                    },
                    {
                        width: '80px',
                    },
                    {
                        width: '100px',
                    },
                    {
                        width: '150px',
                    },
                ],
                mergeCells: {
                    A1: [2, 2],
                    E5: [3, 2],
                }
            }]
        })

        const table = root.querySelector('tbody')
        const rows = table.children

        instance[0].destroyMerge()

        expect(rows[0].children[1].getAttribute('colspan')).to.equal(null)
        expect(rows[0].children[1].getAttribute('rowspan')).to.equal(null)

        expect(rows[4].children[5].getAttribute('colspan')).to.equal(null)
        expect(rows[4].children[5].getAttribute('rowspan')).to.equal(null)
    });

    it('setMerge history', () => {
        const instance = jspreadsheet(root, {
            toolbar: true,
            worksheets: [{
                data: [
                    ['Mazda', 2001, 2000, '2006-01-01 12:00:00'],
                    ['Peugeot', 2010, 5000, '2005-01-01 13:00:00'],
                    ['Honda Fit', 2009, 3000, '2004-01-01 14:01:00'],
                    ['Honda CRV', 2010, 6000, '2003-01-01 23:30:00'],
                ],
                minDimensions: [10, 15],
                columns: [
                    {
                        width: '300px',
                    },
                    {
                        width: '80px',
                    },
                    {
                        width: '100px',
                    },
                    {
                        width: '150px',
                    },
                ],
            }]
        })

        instance[0].setMerge('A3', 2, 3)

        const table = root.querySelector('tbody')
        const rows = table.children

        expect(rows[2].children[1].getAttribute('colspan')).to.equal('2')
        expect(rows[2].children[1].getAttribute('rowspan')).to.equal('3')

        instance[0].undo()

        expect(rows[0].children[1].getAttribute('colspan')).to.equal(null)
        expect(rows[0].children[1].getAttribute('rowspan')).to.equal(null)

        instance[0].redo()

        expect(rows[2].children[1].getAttribute('colspan')).to.equal('2')
        expect(rows[2].children[1].getAttribute('rowspan')).to.equal('3')
    });
});