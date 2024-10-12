import jspreadsheet from './index.js';

import 'jsuites/dist/jsuites.css';
import '../dist/jspreadsheet.css';

let worksheet = jspreadsheet(root, {
    minDimensions: [10,10],
    defaultCellType: "checkbox"
})