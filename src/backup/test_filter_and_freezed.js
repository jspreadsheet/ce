import jspreadsheet from './index.js';

import './jspreadsheet.css';
import 'jsuites/dist/jsuites.css';

window.jss = jspreadsheet;

window.instance = jspreadsheet(root, {
    worksheets: [
        {
            minDimensions: [200,200],
            tableOverflow: true,
            lazyLoading: true,
            tableWidth: '1000px',
            freezeColumns: 2,    
            filters: true,
        }
    ],
})

let worksheets = window.instance;