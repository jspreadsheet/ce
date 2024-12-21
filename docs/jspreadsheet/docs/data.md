title: Spreadsheet Data Operations
keywords: Jspreadsheet, Jexcel, data grid, JavaScript, Excel-like formulas, spreadsheet data, worksheet data, data management, update cell data, manage worksheet data, programmatically update data
description: Learn how to load, manage, and manipulate worksheet data in Jspreadsheet. Explore methods for programmatic data updates and integrate spreadsheet functionality with your web applications using related events.

# Data Management

This section details the methods, events, and settings for loading, updating, and managing data in Jspreadsheet data grids.

## Loading the Data

### Formats

You can create spreadsheets using various data formats, including:

- Existing HTML tables
- CSV files
- JSON objects
- JavaScript arrays


## Documentation

### Methods

These methods assist in managing data in your grid or spreadsheet.

#### Read Methods

| Method                        | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
|-------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `getValue`                    | Get the value of a cell.<br/>@param `cell` - Cell name.<br/>@param `processedValue` - If true, it returns the cell's innerHTML. Otherwise, it returns the value of the cell in the data property.<br/>`worksheetInstance.getValue(cell: string, processedValue?: boolean): CellValue \| null;`                                                                                                                                                                                                                                                                                                                                                                                        |
| `getValueFromCoords`{.nowrap} | Get the value of a cell by its coordinates.<br/>@param `x` - Column index.<br/>@param `y` - Row index.<br/>@param `processedValue` - If true, it returns the cell's innerHTML. Otherwise, it returns the value of the cell in the data property.<br/>`worksheetInstance.getValueFromCoords(x: number, y: number, processedValue?: boolean): CellValue \| null;`                                                                         |
| `getData`                     | Get the full or partial table data.<br/>@param `highlighted` - If true, get only data from highlighted cells. If false, get data from all cells. Default: false.<br/>@param `processed` - If false, the return is constructed using the innerHTML of the cells. Otherwise, it is constructed using the {@link WorksheetOptions.data} property. Default: false.<br/>@param `delimiter` - Column delimiter. If this property is specified, the result will be formatted like a csv.<br/>@param `asJson` - If this property is true, the result will be formatted as json.<br/>`getData(highlighted?: boolean, processed?: boolean, delimiter?: string, asJson?: boolean): CellValue[][];` |
| `getRowData`                  | Get data from a row by its index.<br/>@param `rowNumber` - Row index.<br/>@param `processed` - If true, the return is constructed using the innerHTML of the cells. Otherwise, it is constructed using the data property. Default: false.<br/>`worksheetInstance.getRowData(rowNumber: number, processed?: boolean): CellValue[] \| undefined;`                                                                                                                                                                                                                                                                                                                                       |
| `getColumnData`               | Get the data from one column by its index.<br/>@param `columnNumber` - Column index.<br/>@param `processed` - If true, the return is constructed using the innerHTML of the cells. Otherwise, it is constructed using the data property. Default: false.<br/>`worksheetInstance.getColumnData(columnNumber: number, processed?: boolean): CellValue[];`                                                                                                                                                                                                                                                                                                                               |
| `download`                    | Get the current data as a CSV file.<br/>@param `includeHeaders` - If true, include the header regardless of the {@link SpreadsheetOptions.includeHeadersOnDownload} property value.<br/>@param `processed` - If true, the result will contain the displayed cell values. Otherwise, the result will contain the actual cell values.<br/>`worksheetInstance.download(includeHeaders?: boolean, processed?: boolean): void;`                                                                                                                                                                                                                                                            |

#### Write Methods

| Method                        | Description                                                                                                                                  |
|-------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------|
| `setValue`                    | Change the value of one or more cells.<br/>@param `cell` - Name of a cell, HTML element that represents a cell or an array whose items can be any of the previous alternatives or objects. When an array item is an object, it must have the cell coordinates ("x" and "y") and can have the cell's new value ("value"), but if does not have it, the "value" parameter is used instead.<br/>@param `value` - New cell value.<br/>@param `force` - If true, changes the value of even read-only cells.<br/>`worksheetInstance.setValue(cell: string \| HTMLTableCellElement \| (string \| { x: number; y: number; value?: CellValue } \| HTMLTableCellElement)[], value?: CellValue, force?: boolean): void;`        |
| `setValueFromCoords`{.nowrap} | Set a cell value based on its coordinates.<br/>@param `x` - Cell column index.<br/>@param `y` - Cell row index.<br/>@param `value` - New value.<br/>@param `force` - If true, changes the value of even read-only cells.<br/>`worksheetInstance.setValueFromCoords(x: number, y: number, value: CellValue, force?: boolean): void;` |
| `setData`                     | Set data.<br/>@param `data` - New data. It can be an array of cell values or an array of objects whose values are cell values.<br/>`worksheetInstance.setData(data?: CellValue[][] \| Record<string, CellValue>[]): void;`                                                                                |
| `setRowData`                  | Set a row data by index.<br/>@param `rowNumber` - Row index.<br/>@param `data` - New data. Positions with the null value are not changed in the table.<br/>@param `force` - If true, the method also changes the contents of readonly columns.<br/>`worksheetInstance.setRowData(rowNumber: number, data: (CellValue \| null)[], force?: boolean): void;`                                        |
| `setColumnData`               | Set the data from one column by index.<br/>@param `colNumber` - Column index.<br/>@param `data` - New data. Positions with the null value are not changed in the table.<br/>@param `force` - If true, the method also changes the contents of readonly columns.<br/>`worksheetInstance.setColumnData(colNumber: number, data: (CellValue \| null)[], force?: boolean): void;`                               |

### Events

You can find a list of javascript events related to the data operations.

| Event                     | Description                                                                                                                                           |
|---------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------| 
| `onbeforechange`{.nowrap} | Occurs before a column value is changed. If any value is returned, it will be the cell's new value.<br/>@param `instance` - Instance of the worksheet where the changes will occur.<br/>@param `cell` - HTML element that represents the cell being changed.<br/>@param `colIndex` - Cell column index being changed.<br/>@param `rowIndex` - Cell row index being changed.<br/>@param `newValue` - Value being applied to the cell<br/>`onbeforechange(instance: WorksheetInstance, cell: HTMLTableCellElement, colIndex: string \| number, rowIndex: string \| number, newValue: CellValue): undefined \| CellValue;`         |
| `onchange`                | Occurs after a column value is changed.<br/>@param `instance` - Instance of the worksheet where the change occurred.<br/>@param `cell` - HTML element that represents the cell being changed.<br/>@param `colIndex` - Cell column index being changed.<br/>@param `rowIndex` - Cell row index being changed.<br/>@param `newValue` - New cell value.<br/>@param `oldValue` - Old cell value.<br/>`onchange(instance: WorksheetInstance, cell: HTMLTableCellElement, colIndex: string \| number, rowIndex: string \| number, newValue: CellValue, oldValue: CellValue): void;` |
| `onafterchanges`          | Occurs after all changes are applied in the tables.<br/>@param `instance` - Instance of the worksheet where the change occurred.<br/>@param `changes` - list of changes.<br/>`onafterchanges(instance: WorksheetInstance, changes: CellChange[]): void;`                             |

### Initial Settings

A list of settings that can be utilized when initializing the data grid.

| Property                | Description                                       |
|-------------------------|---------------------------------------------------|
| `data: Array \| Object` | Defines initial data from a JSON or array.        |
| `url: String`           | Loads data from an external file.                 |
| `csv: String`           | Loads data from an external CSV file.             |
| `csvHeaders: Boolean`   | The first row of the CSV file is used as headers. |
| `csvDelimiter: String`  | Sets the CSV delimiter (default: ',').            |


## Examples

### Create a data grid from an 2D array.

Create a spreadsheet from a JavaScript array 

```html
<html>
<script src="https://bossanova.uk/jspreadsheet/v5/jspreadsheet.js"></script>
<script src="https://jsuites.net/v5/jsuites.js"></script>
<link rel="stylesheet" href="https://bossanova.uk/jspreadsheet/v5/jspreadsheet.css" type="text/css" />
<link rel="stylesheet" href="https://jsuites.net/v5/jsuites.css" type="text/css" />

<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Material+Icons" />

<div id="spreadsheet"></div>

<script>
jspreadsheet(document.getElementById('spreadsheet'), {
    worksheets: [{
        data: [
            ['Mazda', 2001, 2000],
            ['Peugeot', 2010, 5000],
            ['Honda Fit', 2009, 3000],
            ['Honda CRV', 2010, 6000],
        ],
        columns: [
            { title:'Model', width:'300px' },
            { title:'Price', width:'80px' },
            { title:'Model', width:'100px' }
        ]
    }]
});
</script>
</html>
```
```jsx
import React, { useRef } from "react";
import { Spreadsheet, Worksheet } from "@jspreadsheet-ce/react";
import "jsuites/dist/jsuites.css";
import "jspreadsheet-ce/dist/jspreadsheet.css";

export default function App() {
    // Spreadsheet array of worksheets
    const spreadsheet = useRef();
    // Data
    const data = [
        ['Mazda', 2001, 2000],
        ['Peugeot', 2010, 5000],
        ['Honda Fit', 2009, 3000],
        ['Honda CRV', 2010, 6000],
    ];
    // Columns
    const columns = [
        { title:'Model', width:'300px' },
        { title:'Price', width:'80px' },
        { title:'Model', width:'100px' }
    ];
    // Render data grid component
    return (
        <Spreadsheet ref={spreadsheet}>
            <Worksheet data={data} columns={columns} />
        </Spreadsheet>
    );
}
```
```vue
<template>
    <Spreadsheet ref="spreadsheetRef">
        <Worksheet :data="data" :columns="columns" />
    </Spreadsheet>
</template>

<script setup>
import { ref } from 'vue';
import { Spreadsheet, Worksheet } from "@jspreadsheet-ce/vue";
import "jsuites/dist/jsuites.css";
import "jspreadsheet-ce/dist/jspreadsheet.css";


// Spreadsheet ref
const spreadsheetRef = ref(null);

// Data
const data = ref([
    ['Mazda', 2001, 2000],
    ['Peugeot', 2010, 5000],
    ['Honda Fit', 2009, 3000],
    ['Honda CRV', 2010, 6000],
]);

// Columns
const columns = ref([
    { title:'Model', width:'300px' },
    { title:'Price', width:'80px' },
    { title:'Model', width:'100px' }
]);
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
    template: `<div #spreadsheet></div>`,
})
export class AppComponent {
    @ViewChild("spreadsheet") spreadsheet: ElementRef;
    // Worksheets
    worksheets: jspreadsheet.worksheetInstance[];
    // Create a new data grid
    ngAfterViewInit() {
        // Create spreadsheet
        this.worksheets = jspreadsheet(this.spreadsheet.nativeElement, {
            worksheets: [{
                data: [
                    ['Mazda', 2001, 2000],
                    ['Peugeot', 2010, 5000],
                    ['Honda Fit', 2009, 3000],
                    ['Honda CRV', 2010, 6000],
                ],
                columns: [
                    { title:'Model', width:'300px' },
                    { title:'Price', width:'80px' },
                    { title:'Model', width:'100px' }
                ]
            }]
        });
    }
}
```


### Create a data grid from a CSV file

How to create a data grid from a remote CSV file 

```html
<html>
<script src="https://bossanova.uk/jspreadsheet/v5/jspreadsheet.js"></script>
<script src="https://jsuites.net/v5/jsuites.js"></script>
<link rel="stylesheet" href="https://bossanova.uk/jspreadsheet/v5/jspreadsheet.css" type="text/css" />
<link rel="stylesheet" href="https://jsuites.net/v5/jsuites.css" type="text/css" />

<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Material+Icons" />

<div id="spreadsheet"></div>

<script>
jspreadsheet(document.getElementById('spreadsheet'), {
    worksheets: [{
        // Point to your file
        csv: '/jspreadsheet/demo.csv',
        // First line will define the header titles
        csvHeaders: true,
        columns: [
            { width: '200px' },
            { width: '100px' },
            { width: '100px' },
        ],
        pagination: 10,
    }]
});
</script>
</html>
```
```jsx
import React, { useRef } from "react";
import { Spreadsheet, Worksheet } from "@jspreadsheet-ce/react";
import "jsuites/dist/jsuites.css";
import "jspreadsheet-ce/dist/jspreadsheet.css";


export default function App() {
    // Spreadsheet array of worksheets
    const spreadsheet = useRef();
    // Render data grid component
    return (
        <Spreadsheet ref={spreadsheet}>
            <Worksheet csv={"/jspreadsheet/demo.csv"} csvHeaders />
        </Spreadsheet>
    );
}
```
```vue
<template>
    <Spreadsheet ref="spreadsheetRef">
        <Worksheet csv="/jspreadsheet/demo.csv" csvHeaders />
    </Spreadsheet>
</template>

<script>
import { Spreadsheet, Worksheet } from "@jspreadsheet-ce/vue";
import "jsuites/dist/jsuites.css";
import "jspreadsheet-ce/dist/jspreadsheet.css";

const spreadsheetRef = ref(null);
</script>
```
```angularjs
import { Component, ViewChild, ElementRef } from "@angular/core";
import jspreadsheet from "jspreadsheet-ce";

import "jspreadsheet-ce/dist/jspreadsheet.css"
import "jsuites/dist/jsuites.css"

// Create component
@Component({
    selector: "app-root",
    template: `<div #spreadsheet></div>`;
})
export class AppComponent {
    @ViewChild("spreadsheet") spreadsheet: ElementRef;
    // Worksheets
    worksheets: jspreadsheet.worksheetInstance[];
    // Create a new data grid
    ngAfterViewInit() {
        // Create spreadsheet
        this.worksheets = jspreadsheet(this.spreadsheet.nativeElement, {
            worksheets: [{
                // Point to your file
                csv: '/jspreadsheet/demo.csv',
                // First line will define the header titles
                csvHeaders: true,
                columns: [
                    { width: '200px' },
                    { width: '100px' },
                    { width: '100px' },
                ]
            }]
        });
    }
}
```

### Create a data grid from a HTML table

How to create data grid from an existing HTML table element 

```html
<html>
<script src="https://bossanova.uk/jspreadsheet/v5/jspreadsheet.js"></script>
<script src="https://jsuites.net/v5/jsuites.js"></script>
<link rel="stylesheet" href="https://bossanova.uk/jspreadsheet/v5/jspreadsheet.css" type="text/css" />
<link rel="stylesheet" href="https://jsuites.net/v5/jsuites.css" type="text/css" />

<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Material+Icons" />


<table id="spreadsheet">
<thead>
<tr>
<td>POS</td>
<td>TITLE</td>
<td>ARTIST</td>
<td>PEAK</td>
</tr>
</thead>
<tbody>
<tr>
<td>1</td>
<td>DIVINELY UNINSPIRED TO A HELLISH EXTENT</td>
<td>LEWIS CAPALDI</td>
<td>1</td>
</tr>
<tr>
<td>2</td>
<td>NO 6 COLLABORATIONS PROJECT</td>
<td>ED SHEERAN</td>
<td>1</td>
</tr>
<tr>
<td>3</td>
<td>THE GREATEST SHOWMAN</td>
<td>MOTION PICTURE CAST RECORDING</td>
<td>1</td>
</tbody>
</table>

<br>

<script>
jspreadsheet(document.getElementById('spreadsheet'));
</script>
</html>
```
```jsx
import React, { useRef, useEffect } from "react";
import { jspreadsheet } from "@jspreadsheet-ce/react";
import "jsuites/dist/jsuites.css";
import "jspreadsheet-ce/dist/jspreadsheet.css";

export default function App() {
    // Spreadsheet array of worksheets
    const spreadsheet = useRef();

    useEffect(() => {
        if (spreadsheet.current) {
            jspreadsheet(spreadsheet.current);
        }
    }, [])

    // Render component
    return (
        <>
            <table ref={spreadsheet}>
                <thead>
                    <tr>
                        <td>POS</td>
                        <td>TITLE</td>
                        <td>ARTIST</td>
                        <td>PEAK</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>DIVINELY UNINSPIRED TO A HELLISH EXTENT</td>
                        <td>LEWIS CAPALDI</td>
                        <td>1</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>NO 6 COLLABORATIONS PROJECT</td>
                        <td>ED SHEERAN</td>
                        <td>1</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>THE GREATEST SHOWMAN</td>
                        <td>MOTION PICTURE CAST RECORDING</td>
                        <td>1</td>
                    </tr>
                </tbody>
            </table>
        </>
    );
}
```
```vue
<template>
    <table ref="spreadsheetRef">
        <thead>
            <tr>
                <td>POS</td>
                <td>TITLE</td>
                <td>ARTIST</td>
                <td>PEAK</td>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>1</td>
                <td>DIVINELY UNINSPIRED TO A HELLISH EXTENT</td>
                <td>LEWIS CAPALDI</td>
                <td>1</td>
            </tr>
            <tr>
                <td>2</td>
                <td>NO 6 COLLABORATIONS PROJECT</td>
                <td>ED SHEERAN</td>
                <td>1</td>
            </tr>
            <tr>
                <td>3</td>
                <td>THE GREATEST SHOWMAN</td>
                <td>MOTION PICTURE CAST RECORDING</td>
                <td>1</td>
            </tr>
        </tbody>
    </table>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { jspreadsheet } from "@jspreadsheet-ce/vue";
import "jsuites/dist/jsuites.css";
import "jspreadsheet-ce/dist/jspreadsheet.css";

// Spreadsheet ref
const spreadsheetRef = ref(null);

// Initialize jspreadsheet when component is mounted
onMounted(() => {
    if (spreadsheetRef.value) {
        jspreadsheet(spreadsheetRef.value);
    }
});
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
    template: `<table #spreadsheet>
        <thead>
            <tr>
                <td>POS</td>
                <td>TITLE</td>
                <td>ARTIST</td>
                <td>PEAK</td>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>1</td>
                <td>DIVINELY UNINSPIRED TO A HELLISH EXTENT</td>
                <td>LEWIS CAPALDI</td>
                <td>1</td>
            </tr>
            <tr>
                <td>2</td>
                <td>NO 6 COLLABORATIONS PROJECT</td>
                <td>ED SHEERAN</td>
                <td>1</td>
            </tr>
            <tr>
                <td>3</td>
                <td>THE GREATEST SHOWMAN</td>
                <td>MOTION PICTURE CAST RECORDING</td>
                <td>1</td>
            </tr>
        </tbody>
    </table>`,
})
export class AppComponent {
    @ViewChild("spreadsheet") spreadsheet: ElementRef;
    // Worksheets
    worksheets: jspreadsheet.worksheetInstance[];
    // Create a new data grid
    ngAfterViewInit() {
        // Create spreadsheet
        this.worksheets = jspreadsheet(this.spreadsheet.nativeElement);
    }
}
```

### Batch update

How to update multiple cells with a single call 

```html
<html>
<script src="https://bossanova.uk/jspreadsheet/v5/jspreadsheet.js"></script>
<script src="https://jsuites.net/v5/jsuites.js"></script>
<link rel="stylesheet" href="https://bossanova.uk/jspreadsheet/v5/jspreadsheet.css" type="text/css" />
<link rel="stylesheet" href="https://jsuites.net/v5/jsuites.css" type="text/css" />

<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Material+Icons" />
<div id="spreadsheet"></div>

<p><input type='button' value='Update multiple cells' id='btn1' /></p>

<script>
const update = function() {
    let records = [
        {
            x: 0,
            y: 0,
            value: 'update A1',
        },
        {
            x: 3,
            y: 3,
            value: 'Another cell',
        }
    ];

    worksheets[0].setValue(records);
}

// Create the spreadsheet
let worksheets = jspreadsheet(document.getElementById('spreadsheet'), {
    worksheets: [{
        minDimensions: [6,6],
    }]
});

document.getElementById('btn1').onclick = update
</script>
</html>
```
```jsx
import React, { useRef } from "react";
import { Spreadsheet, Worksheet } from "@jspreadsheet-ce/react";
import "jsuites/dist/jsuites.css";
import "jspreadsheet-ce/dist/jspreadsheet.css";


export default function App() {
    // Spreadsheet array of worksheets
    const spreadsheet = useRef();

    // Update multiple cells
    const update = () => {
        let records = [
            {
                x: 0,
                y: 0,
                value: 'update A1',
            },
            {
                x: 10,
                y: 10,
                value: 'Another cell',
            },
            // (...)
        ];

        spreadsheet.current[0].setValue(records);
    }

    // Render data grid component
    return (
        <>
            <Spreadsheet ref={spreadsheet}>
                <Worksheet />
            </Spreadsheet>
        <input type='button' value='Update multiple cells' onClick={()=>update()} />
        </>
    );
}
```
```vue
<template>
    <Spreadsheet ref="spreadsheet">
        <Worksheet />
    </Spreadsheet>
    <input type="button" value="Update multiple cells" @click="update" />
</template>

<script>
import { ref } from "vue";
import { Spreadsheet, Worksheet } from "@jspreadsheet-ce/vue";
import "jsuites/dist/jsuites.css";
import "jspreadsheet-ce/dist/jspreadsheet.css";

export default {
    components: {
        Spreadsheet,
        Worksheet,
    },
    setup() {
        const spreadsheetRef = ref(null);

        const update = () => {
            const records = [
                {
                    x: 0,
                    y: 0,
                    value: "update A1",
                },
                {
                    x: 10,
                    y: 10,
                    value: "Another cell",
                },
                // (...)
            ];

            if (spreadsheetRef.value) {
                spreadsheetRef.value.current[0].setValue(records);
            }
        };

        return {
            spreadsheetRef,
            update,
        };
    },
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
    selector: "app-root",
    template: `<div #spreadsheet></div>
        <input type='button' value='Update multiple cells' (click)="update" />`;
})
export class AppComponent {
    @ViewChild("spreadsheet") spreadsheet: ElementRef;
    // Worksheets
    worksheets: jspreadsheet.worksheetInstance[];
    // Create a new data grid
    ngAfterViewInit() {
        // Create spreadsheet
        this.worksheets = jspreadsheet(this.spreadsheet.nativeElement, {
            worksheets: [{
                minDimensions: [10,10],
            }]
        });
    }
    update() {
        let records = [
            {
                x: 0,
                y: 0,
                value: 'update A1',
            },
            {
                x: 10,
                y: 10,
                value: 'Another cell',
            },
            // (...)
        ];

        this.worksheets[0].setValue(records);
    }
}
```
