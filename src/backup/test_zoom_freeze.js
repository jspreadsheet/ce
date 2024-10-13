import jspreadsheet from './index.js';

import 'jsuites/dist/jsuites.css';
import '../dist/jspreadsheet.css';

let worksheet = jspreadsheet(root, {
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
})

let zoomInEl = document.createElement("button");

zoomInEl.innerText = "Zoom In";

zoomInEl.addEventListener("click", () => {
    worksheet.zoomIn();
})

let zoomOutEl = document.createElement("button");

zoomOutEl.innerText = "Zoom Out";

zoomOutEl.addEventListener("click", () => {
    worksheet.zoomOut();
})

let zoomDefault = document.createElement("button");

zoomDefault.innerText = "Zoom Default";

zoomDefault.addEventListener("click", () => {
    worksheet.resetZoom();
})

document.body.append(zoomInEl, zoomOutEl, zoomDefault);