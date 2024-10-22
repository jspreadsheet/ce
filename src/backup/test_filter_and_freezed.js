import jspreadsheet from './index.js';

import 'jsuites/dist/jsuites.css';
import '../dist/jspreadsheet.css';

root.style.width = "100%";
root.style.height = "97vh";

let worksheet = jspreadsheet(root, {
    minDimensions: [200,200],
    tableOverflow: true,
    lazyLoading: true,
    tableWidth: '1000px',
    freezeColumns: 2,    
    filters: true,
})