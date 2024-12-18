const { expect } = require('chai');
const { before } = require('mocha');

before(async function() {
    // This will ensure that the import is complete before tests run
    jspreadsheet = (await import('../src/index.js')).default
  });

describe('Comment tests', () => {
    it('Set comment', () => {
        const instance = jspreadsheet(root, {
            worksheets: [
                {
                    data: [
                        ['US', 'Cheese', '2019-02-12'],
                        ['CA', 'Apples', '2019-03-01'],
                        ['CA', 'Carrots', '2018-11-10'],
                        ['BR', 'Oranges', '2019-01-12'],
                    ],
                    columns: [
                        { width: '300px' },
                        { width: '200px' },
                        { width: '200px' },
                    ],
                    allowComments: true,
                }
            ],
        })

        const table = root.querySelector('tbody')
        const rows = table.children

        instance[0].setComments('C2', 'Test')

        expect(rows[1].children[3].getAttribute('title')).to.equal('Test')

        instance[0].setComments('C2', '')

        expect(rows[1].children[3].getAttribute('title')).to.equal('')
    });

    it('Get comment', () => {
        const instance = jspreadsheet(root, {
            worksheets: [
                {
                    data: [
                        ['US', 'Cheese', '2019-02-12'],
                        ['CA', 'Apples', '2019-03-01'],
                        ['CA', 'Carrots', '2018-11-10'],
                        ['BR', 'Oranges', '2019-01-12'],
                    ],
                    columns: [
                        { width: '300px' },
                        { width: '200px' },
                        { width: '200px' },
                    ],
                    allowComments: true,
                }
            ],
        })

        instance[0].setComments('B3', 'something')

        expect(instance[0].getComments('B3')).to.equal('something')
    });

    it('setComments history', () => {
        const instance = jspreadsheet(root, {
            worksheets: [
                {
                    data: [
                        ['US', 'Cheese', '2019-02-12'],
                        ['CA', 'Apples', '2019-03-01'],
                        ['CA', 'Carrots', '2018-11-10'],
                        ['BR', 'Oranges', '2019-01-12'],
                    ],
                    columns: [
                        { width: '300px' },
                        { width: '200px' },
                        { width: '200px' },
                    ],
                    allowComments: true,
                }
            ],
        })

        const table = root.querySelector('tbody')
        const rows = table.children

        instance[0].setComments('C2', 'Test')

        expect(rows[1].children[3].getAttribute('title')).to.equal('Test')

        instance[0].undo()

        expect(rows[1].children[3].getAttribute('title')).to.equal('')

        instance[0].redo()

        expect(rows[1].children[3].getAttribute('title')).to.equal('Test')
    });
});