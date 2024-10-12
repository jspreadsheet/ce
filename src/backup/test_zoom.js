import jspreadsheet from './index.js';

import 'jsuites/dist/jsuites.css';
import '../dist/jspreadsheet.css';

let worksheet = jspreadsheet(root, {
    minDimensions: [40,20],
    tableWidth: '1000px',
    tableOverflow: true,
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