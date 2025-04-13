import jspreadsheet from './index.js';

import './jspreadsheet.css';
import 'jsuites/dist/jsuites.css';

window.jss = jspreadsheet;

window.instance = jspreadsheet(root, {
    tabs: true,
    toolbar: true,
    worksheets: [{
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
        ],
        defaultZoom: 100
    }],
    defaultZoom: 150
})

let worksheets = window.instance;

console.log(worksheets);

let zoomInEl = document.createElement("button");

zoomInEl.innerText = "Zoom In";

zoomInEl.addEventListener("click", () => {

    for(let worksheet of worksheets) worksheet.zoomIn();

})

let zoomOutEl = document.createElement("button");

zoomOutEl.innerText = "Zoom Out";

zoomOutEl.addEventListener("click", () => {
    
    for(let worksheet of worksheets) worksheet.zoomOut();
    
})

let zoomDefault = document.createElement("button");

zoomDefault.innerText = "Zoom Default";

zoomDefault.addEventListener("click", () => {
    
    for(let worksheet of worksheets) worksheet.resetZoom();
    
})

let zoomGet = document.createElement("button");

zoomGet.innerText = "Get Zoom";

zoomGet.addEventListener("click", () => {

    for(let worksheet of worksheets) worksheet.getZoom();

})

document.body.append(zoomInEl, zoomOutEl, zoomDefault, zoomGet);