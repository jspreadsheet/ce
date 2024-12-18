const { expect } = require('chai');
const { before } = require('mocha');

before(async function() {
    // This will ensure that the import is complete before tests run
    jspreadsheet = (await import('../src/index.js')).default
  });

describe('Use search', () => {
    it('search and resetSearch methods', () => {
        const instance = jspreadsheet(root, {
            tabs: true,
            worksheets: [
                {
                    search: true,
                    minDimensions: [7,7],
                    data: [
                        ['Mazda', 2001, 2000, '2006-01-01 12:00:00'],
                        ['Peugeot', 2010, 5000, '2005-01-01 13:00:00'],
                        ['Honda Fit', 2009, 3000, '2004-01-01 14:01:00'],
                        ['Honda CRV', 2010, 6000, '2003-01-01 23:30:00'],
                    ],
                },
            ]
        })

        instance[0].search('Honda')

        expect(instance[0].searchInput.value).to.equal('Honda')

        const bodyTag = root.querySelector('tbody')

        expect(bodyTag.children.length).to.equal(2)

        expect(bodyTag.children[0].getAttribute('data-y')).to.equal('2')
        expect(bodyTag.children[1].getAttribute('data-y')).to.equal('3')

        instance[0].resetSearch()

        expect(instance[0].searchInput.value).to.equal('')

        expect(bodyTag.children[0].getAttribute('data-y')).to.equal('0')
        expect(bodyTag.children[1].getAttribute('data-y')).to.equal('1')
    });
});