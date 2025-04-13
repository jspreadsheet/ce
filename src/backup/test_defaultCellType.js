import jspreadsheet from './index.js';

import './jspreadsheet.css';
import 'jsuites/dist/jsuites.css';

window.jss = jspreadsheet;

window.instance = jspreadsheet(root, {
    worksheets: [
        {
            minDimensions: [10,10],
            defaultCellType: "checkbox"
        }
    ],
})

let worksheets = window.instance;