import jspreadsheet from './index.js';

import 'jsuites/dist/jsuites.css';
import '../dist/jspreadsheet.css';

let worksheet = jspreadsheet(root, {
    minDimensions: [10,10],
})

setTimeout(() => {
    worksheet.setHeaders({
        0: "zero",
        1: "one",
        2: "two",
    })
}, 1000);

setTimeout(() => {
    worksheet.setHeaders({
        0: "zero",
        1: "one",
        2: "two",
    }, 5)
}, 1500);

