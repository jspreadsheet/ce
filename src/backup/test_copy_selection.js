import jspreadsheet from './index.js';

import './jspreadsheet.css';
import 'jsuites/dist/jsuites.css';

var data = [
    ['Mazda', 2001, 2000, '2006-01-01'],
    ['Pegeout', 2010, 5000, '2005-01-01'],
    ['Honda Fit', 2009, 3000, '2004-01-01'],
    ['Honda CRV', 2010, 6000, '2003-01-01'],
];

window.jss = jspreadsheet;

window.instance = jspreadsheet(root, {
    worksheets: [
        {
            minDimensions: [40,20],
            tableOverflow: true,
            lazyLoading: true,
            tableWidth: '1000px',
            freezeColumns: 2,    
            filters: true,
            nestedHeaders:[
                [
                    {
                        title: 'Supermarket information',
                        colspan: '2',
                    },
                    {
                        title: ' Other Information',
                        colspan: '38'
                    }
                ],
                [
                    {
                        title: 'Location',
                        colspan: '1',
                    },
                    {
                        title: 'Location',
                        colspan: '1',
                    },
                    {
                        title: 'Location',
                        colspan: '3',
                    },
                    {
                        title: ' Other Information',
                        colspan: '35'
                    }
                ],
            ]
        }
    ],
})

let worksheets = window.instance;