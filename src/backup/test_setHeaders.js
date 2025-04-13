import jspreadsheet from './index.js';

import './jspreadsheet.css';
import 'jsuites/dist/jsuites.css';

window.jss = jspreadsheet;

window.instance = jspreadsheet(root, {
    worksheets: [{
        minDimensions: [10,10],
    }],
})

let worksheets = window.instance;


setTimeout(() => {
    for(let worksheet of worksheets) worksheet.setHeaders({
        0: "zero",
        1: "one",
        2: "two",
    })
}, 1000);

setTimeout(() => {
    for(let worksheet of worksheets) worksheet.setHeaders({
        0: "zero",
        1: "one",
        2: "two",
    }, 5)
}, 1500);

