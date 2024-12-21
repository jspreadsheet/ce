title: Spreadsheet Merged Cells
keywords: Jspreadsheet, Jexcel, data grid, JavaScript, merged cells, react merged cells, excel-like merged cells, spreadsheet merged cells, merge cells functionality, data grid cell merging
description: Merged cells in Jspreadsheet allow combining multiple cells into one. This section covers the settings, methods, and events related to merging spreadsheet cells.

# Merged cells

This section covers how to create and manage merged cells in Jspreadsheet to combine adjacent cells into one. It includes details on settings, methods, and events for merging, unmerging, programmatically handling merged ranges, and managing alignment and formatting.

## Documentation

### Methods

The following methods allow for the programmatic management of merged cells.

| Method                  | Description                                                                                                                                                                                                                                                                                                                                                                                          |
|-------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `setMerge`              | Sets merged cells based on a specified number of columns and rows.<br/>@param `cellName` - Name of a cell. If it is a falsy value, this method merges the selected cells in the table and ignores all parameters of this method.<br/>@param `colspan` - Number of columns this merge occupies.<br/>@param `rowspan` - Number of rows this merge occupies.<br/>`worksheetInstance.setMerge(cellName?: string, colspan?: number, rowspan?: number,): null \| undefined;`  |
| `getMerge`              | Get information from one or all merged cells.<br/>@param `cellName` - Cell name. If it is a falsy value, it returns the information of all merges. If the given cell is not the anchor of a merge, it returns null.<br/>`worksheetInstance.getMerge(cellName?: string): Record<string, [number, number]> \| [number, number] \| null;`                                                                                          |
| `removeMerge`           | Remove a merge.<br/>@param `cellName` - Merge anchor cell.<br/>@param `data` - Data to be placed in cells released from the merge.<br/>`worksheetInstance.removeMerge(cellName: string, data?: CellValue[]): void;`.                                                                                                                                      |
| `destroyMerge`{.nowrap} | Removes all merged cells.<br/>`worksheetInstance.destroyMerge(): void;`                                                                                                                                                                                                                                                                                                                                                |

 

### Events

Spreadsheet merge cells related events.

| Event     | Description                                                                                                                 |
|-----------|-----------------------------------------------------------------------------------------------------------------------------|
| `onmerge` | Occurs when a merge is created.<br/>`onmerge(instance: WorksheetInstance, merges: Record<string, [number, number]>): void;` |

 

### Initial Settings

Initial properties for merged cells in the spreadsheet.

| Property                                      | Description                                                 |
|-----------------------------------------------|-------------------------------------------------------------|
| `mergeCells: Record<string, [number, number]>;` | Allow the user to define the initial default merged cells.  |


## Examples

A basic example illustrates how to initialize and programmatically modify merged cell definitions.

Open this [merged cells example](https://jsfiddle.net/spreadsheet/gLc0a1x2/) on JSFiddle.  

```html
<html>
<script src="https://bossanova.uk/jspreadsheet/v5/jspreadsheet.js"></script>
<script src="https://jsuites.net/v5/jsuites.js"></script>
<link rel="stylesheet" href="https://bossanova.uk/jspreadsheet/v5/jspreadsheet.css" type="text/css"/>
<link rel="stylesheet" href="https://jsuites.net/v5/jsuites.css" type="text/css"/>

<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Material+Icons" />

<div id="spreadsheet"></div>

<p><div id="log"></div></p>

<input type="button" value="setMerge('A3', 2, 3)" id="btn1" />
<input type="button" value="removeMerge('A3')" id="btn2" />
<input type="button" value="Get all merged cells" id="btn3" />
<input type="button" value="Destroy all merged" id="btn4" />

<script>
// Create the spreadsheet
let table = jspreadsheet(document.getElementById('spreadsheet'), {
    toolbar: true,
    worksheets: [{
        data: [
            ['Mazda', 2001, 2000, '2006-01-01 12:00:00'],
            ['Peugeot', 2010, 5000, '2005-01-01 13:00:00'],
            ['Honda Fit', 2009, 3000, '2004-01-01 14:01:00'],
            ['Honda CRV', 2010, 6000, '2003-01-01 23:30:00'],
        ],
        columnDrag: true,
        worksheetName: 'Merged Cells',
        minDimensions: [50, 50],
        tableOverflow: true,
        tableWidth: '800px',
        tableHeight: '300px',
        columns: [
            {
                type: 'text',
                width: '300px',
                title: 'Model',
            },
            {
                type: 'text',
                width: '80px',
                title: 'Year',
            },
            {
                type: 'text',
                width: '100px',
                title: 'Price',
            },
            {
                type: 'calendar',
                width: '150px',
                title: 'Date',
                options: {
                    format: 'DD/MM/YYYY HH24:MI',
                    time: 1,
                }
            },
        ],
        mergeCells: {
            A1: [2, 2]
        }
    }]
});

document.getElementById("btn1").onclick = () => table[0].setMerge('A3', 2, 3);
document.getElementById("btn2").onclick = () => table[0].removeMerge('A3');
document.getElementById("btn3").onclick = () => {
    document.getElementById("log").innerHTML = JSON.stringify(table[0].getMerge());
}
document.getElementById("btn4").onclick = () => table[0].destroyMerge();
</script>
</html>
```
```jsx
import React, { useRef } from "react";
import { Spreadsheet, Worksheet } from "@jspreadsheet-ce/react";
import "jsuites/dist/jsuites.css";
import "jspreadsheet-ce/dist/jspreadsheet.css";

export default function App() {
    const spreadsheet = useRef();
    const log = useRef();

    const worksheets = [{
        data: [
            ['Mazda', 2001, 2000, '2006-01-01 12:00:00'],
            ['Peugeot', 2010, 5000, '2005-01-01 13:00:00'],
            ['Honda Fit', 2009, 3000, '2004-01-01 14:01:00'],
            ['Honda CRV', 2010, 6000, '2003-01-01 23:30:00'],
        ],
        columnDrag: true,
        worksheetName: 'Merged Cells',
        minDimensions: [50, 50],
        tableOverflow: true,
        tableWidth: '800px',
        tableHeight: '300px',
        columns: [
            {
                type: 'text',
                width: '300px',
                title: 'Model',
            },
            {
                type: 'text',
                width: '80px',
                title: 'Year',
            },
            {
                type: 'text',
                width: '100px',
                title: 'Price',
            },
            {
                type: 'calendar',
                width: '150px',
                title: 'Date',
                options: {
                    format: 'DD/MM/YYYY HH24:MI',
                    time: 1,
                }
            },
        ],
        mergeCells: {
            A1: [2,2]
        }
    }]

    return (
        <>
            <Spreadsheet ref={spreadsheet} worksheets={worksheets} />
            <div ref={log}></div>
            <input type="text" value="setMerge('A3', 2, 3)" onclick="spreadsheet.current[0].setMerge('A3', 2, 3);" />
            <input type="text" value="removeMerge('A3')" onclick="spreadsheet.current[0].removeMerge('A3');" />
            <input type="text" value="Get all merged cells"
                onclick="log.current.value = JSON.stringify(spreadsheet.current[0].getMerge());" />
            <input type="text" value="Destroy all merged" onclick="spreadsheet.current[0].destroyMerge();" />
        </>
    )
}
```
```vue
<template>
  <Spreadsheet ref="spreadsheet" :worksheets="worksheets"/>
  <div ref="log"></div>
  <input type="text" value="setMerge('A3', 2, 3)" @click="setMerge('A3', 2, 3)" />
  <input type="text" value="removeMerge('A3')" @click="removeMerge('A3')" />
  <input type="text" value="Get all merged cells" @click="getAllMergedCells" />
  <input type="text" value="Destroy all merged" @click="destroyAllMerges" />
</template>

<script setup>
import { ref } from 'vue'
import { Spreadsheet } from "@jspreadsheet-ce/vue";
import formula from "@jspreadsheet/formula";
import "jsuites/dist/jsuites.css";
import "jspreadsheet-ce/dist/jspreadsheet.css";

// Refs
const spreadsheet = ref(null);
const log = ref(null);

// Worksheets configuration
const worksheets = ref([{
    data: [
        ['Mazda', 2001, 2000, '2006-01-01 12:00:00'],
        ['Peugeot', 2010, 5000, '2005-01-01 13:00:00'],
        ['Honda Fit', 2009, 3000, '2004-01-01 14:01:00'],
        ['Honda CRV', 2010, 6000, '2003-01-01 23:30:00'],
    ],
    columnDrag: true,
    worksheetName: 'Merged Cells',
    minDimensions: [50, 50],
    tableOverflow: true,
    tableWidth: '800px',
    tableHeight: '300px',
    columns: [
        {
            type: 'text',
            width: '300px',
            title: 'Model',
        },
        {
            type: 'text',
            width: '80px',
            title: 'Year',
        },
        {
            type: 'text',
            width: '100px',
            title: 'Price',
        },
        {
            type: 'calendar',
            width: '150px',
            title: 'Date',
            options: {
                format: 'DD/MM/YYYY HH24:MI',
                time: 1,
            }
        },
    ],
    mergeCells: {
        A1: [2,2]
    }
}]);

// Methods for merge cell interactions
const setMerge = (cell, rowspan, colspan) => {
    if (spreadsheet.value && spreadsheet.value.current[0]) {
        spreadsheet.value.current[0].setMerge(cell, rowspan, colspan);
    }
};

const removeMerge = (cell) => {
    if (spreadsheet.value && spreadsheet.value.current[0]) {
        spreadsheet.value.current[0].removeMerge(cell);
    }
};

const getAllMergedCells = () => {
    if (spreadsheet.value && spreadsheet.value.current[0] && log.value) {
        log.value.value = JSON.stringify(spreadsheet.value.current[0].getMerge());
    }
};

const destroyAllMerges = () => {
    if (spreadsheet.value && spreadsheet.value.current[0]) {
        spreadsheet.value.current[0].destroyMerge();
    }
};
</script>
```
```angularjs
import { Component, ViewChild, ElementRef } from "@angular/core";
import jspreadsheet from "jspreadsheet-ce";

import "jspreadsheet-ce/dist/jspreadsheet.css"
import "jsuites/dist/jsuites.css"

// Create component
@Component({
    standalone: true,
    selector: "app-root",
    template: `<div #spreadsheet></div>
        <div #log></div>
        <input type="button" value="setMerge('A3', 2, 3)" (click)="this.worksheets[0].setMerge('A3', 2, 3);" />
        <input type="button" value="removeMerge('A3')" (click)="this.worksheets[0].removeMerge('A3');" />
        <input type="button" value="Get all merged cells" (click)="getMerge()" />
        <input type="button" value="Destroy all merged" (click)="this.worksheets[0].destroyMerge();" />`,
})
export class AppComponent {
    @ViewChild("spreadsheet") spreadsheet: ElementRef;
    @ViewChild("log") log: ElementRef;
    // Worksheets
    worksheets: jspreadsheet.worksheetInstance[];
    // Create a new data grid
    ngAfterViewInit() {
        // Create spreadsheet
        this.worksheets = jspreadsheet(this.spreadsheet.nativeElement, {
            toolbar: true,
            worksheets: [{
                data: [
                    ['Mazda', 2001, 2000, '2006-01-01 12:00:00'],
                    ['Peugeot', 2010, 5000, '2005-01-01 13:00:00'],
                    ['Honda Fit', 2009, 3000, '2004-01-01 14:01:00'],
                    ['Honda CRV', 2010, 6000, '2003-01-01 23:30:00'],
                ],
                columnDrag: true,
                worksheetName: 'Merged Cells',
                minDimensions: [50, 5000],
                tableOverflow: true,
                tableWidth: '800px',
                tableHeight: '300px',
                columns: [
                    {
                        type: 'text',
                        width: '300px',
                        title: 'Model',
                    },
                    {
                        type: 'text',
                        width: '80px',
                        title: 'Year',
                    },
                    {
                        type: 'text',
                        width: '100px',
                        title: 'Price',
                    },
                    {
                        type: 'calendar',
                        width: '150px',
                        title: 'Date',
                        options: {
                            format: 'DD/MM/YYYY HH24:MI',
                            time: 1,
                        }
                    },
                ],
                mergeCells: {
                    A1: [2, 2]
                }
            }]
        });
    }

    getMerge() {
        this.log.nativeElement.innerHTML = JSON.stringify(this.worksheets[0].getMerge());
    }
}
```
