import jspreadsheet from './index.js';

import 'jsuites/dist/jsuites.css';
import '../dist/jspreadsheet.css';

var data = [
    ['Mazda', 2001, 2000, '2006-01-01'],
    ['Pegeout', 2010, 5000, '2005-01-01'],
    ['Honda Fit', 2009, 3000, '2004-01-01'],
    ['Honda CRV', 2010, 6000, '2003-01-01'],
];

let worksheet = jspreadsheet(root, {
    data:data,
    colHeaders: ['Model', 'Year', 'Price', 'Date'],
    colWidths: [ 300, 80, 100, 100 ],
    columns: [
        { type: 'text' },
        { type: 'text' },
        { type: 'text' },
        { type: 'calendar' },
    ],
    mergeCells:{
        A1:[2,1]
    },
    minDimensions:[10,10]
})
 
