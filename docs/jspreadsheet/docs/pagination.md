title: Spreadsheet Pagination
keywords: Jspreadsheet, Jexcel, data grid, JavaScript, data grid pagination, large data visualization, efficient data grid, high-performance data grid, paginated data grid, paginated data visualization
description: The spreadsheet pagination feature enables efficient handling and visualization of large datasets.

# Spreadsheet Pagination

The spreadsheet pagination feature can manage large datasets by rendering a specified number of rows per page and offering a navigation index for quick access to different sections. This section details the settings, methods, and events related to pagination.

## Documentation

### Methods

The following methods are related to pagination.

| Method           | Description                                                                                                                                           |
|------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------|
| `page`           | Navigate to the specified page number.<br/>@param `pageNumber` - Page number (starting at 0).<br/>`worksheetInstance.page(pageNumber: number): void;` |
| `whichPage`      | Get the page index of a row.<br/>@param `cell` - Row index.<br/>`worksheetInstance.whichPage(cell: number): number;`                                  |
| `quantiyOfPages` | `worksheet.quantiyOfPages() : number`<br/>Get the total number of pages available.                                                                    |


### Events

This event is triggered when the user changes the page.

| Event                   | Description                                                                                                                                                                                                |
|-------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `onchangepage`{.nowrap} | After the page has changed.<br/>@param `instance` - Instance of the worksheet where the change occurred.<br/>@param `newPageNumber` - Page the worksheet is on.<br/>@param `oldPageNumber` - Page the worksheet was on.<br/>@param `quantityPerPage` - Maximum number of lines on pages.<br/>`onchangepage(instance: WorksheetInstance, newPageNumber: number, oldPageNumber: number, quantityPerPage: number): void;`                                                                          |


### Initial Settings

Initial configuration related to the pagination of your data grid.

| Property                      | Description                                                        |
|-------------------------------|--------------------------------------------------------------------|
| `pagination: number`          | The number of items per page                                       |
| `paginationOptions: number[]` | The options for the user to select the number of results per page. |

 

## Examples

### Data Grid Search and Pagination

Enabling search and pagination features during the spreadsheet initialization.

```html
<html>
<script src="https://bossanova.uk/jspreadsheet/v5/jspreadsheet.js"></script>
<script src="https://jsuites.net/v5/jsuites.js"></script>
<link rel="stylesheet" href="https://bossanova.uk/jspreadsheet/v5/jspreadsheet.css" type="text/css" />
<link rel="stylesheet" href="https://jsuites.net/v5/jsuites.css" type="text/css" />

<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Material+Icons" />

<div id="spreadsheet"></div>

<p><input type='button' value='Search for APP' id="btn1"/>
<input type='button' value='Go to the second page' id="btn2"/></p>

<script>
// Create the spreadsheet
let spreadsheet = jspreadsheet(document.getElementById('spreadsheet'), {
    worksheets: [{
        csv: '/tests/demo.csv',
        csvHeaders: true,
        search: true,
        pagination: 10,
        paginationOptions: [10,25,50,100],
        columns: [
            { type:'text', width:80 },
            { type:'text', width:200 },
            { type:'text', width:100 },
            { type:'text', width:200 },
            { type:'text', width:100 },
        ],
    }],
    onchangepage: function(el, pageNumber, oldPage) {
        console.log('New page: ' + pageNumber);
    }
});

document.getElementById("btn1").onclick = () => spreadsheet[0].search('app');
document.getElementById("btn2").onclick = () => spreadsheet[0].page(1);
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
    // Columns
    const columns = [
        { type:'text', width:80 },
        { type:'text', width:200 },
        { type:'text', width:100 },
        { type:'text', width:200 },
        { type:'text', width:100 },
    ];
    // Event
    const onchangepage = (el, pageNumber, oldPage) => {
        console.log('New page: ' + pageNumber);
    }

    // Render component
    return (
        <Spreadsheet ref={spreadsheet} onchangepage={onchangepage}>
            <Worksheet columns={columns}
                csv="/tests/demo.csv"
                csvHeaders
                search
                pagination="10"
                paginationOptions={[10,25,50,100]}
            />
        </Spreadsheet>
    );
}
```
```vue


<template>
  <Spreadsheet ref="spreadsheet" :onchangepage="onchangepage">
      <Worksheet 
          :columns="columns"
          csv="/tests/demo.csv"
          csvHeaders
          search
          pagination="10"
          :paginationOptions="[10,25,50,100]" 
      />
  </Spreadsheet>
</template>

<script setup>
import { ref } from 'vue'
import { Spreadsheet, Worksheet } from "@jspreadsheet-ce/vue";
import "jsuites/dist/jsuites.css";
import "jspreadsheet-ce/dist/spreadsheet.css";

// Spreadsheet ref
const spreadsheet = ref(null);

// Columns
const columns = ref([
  { type:'text', width:80 },
  { type:'text', width:200 },
  { type:'text', width:100 },
  { type:'text', width:200 },
  { type:'text', width:100 },
]);

// Page change event handler
const onchangepage = (el, pageNumber, oldPage) => {
  console.log('New page: ' + pageNumber);
};
</script>
```
```angularjs
import { Component, ViewChild, ElementRef } from "@angular/core";
import jspreadsheet from "jspreadsheet-ce";

import "jspreadsheet-ce/dist/jspreadsheet.css"
import "jsuites/dist/jsuites.css"



@Component({
    standalone: true,
    selector: "app-root",
    template: `<div #spreadsheet></div>
    <input type='button' value='Search for APP' (click)="this.worksheets[0].search('app')" />
    <input type='button' value='Go to the second page' (click)="this.worksheets[0].page(1)" />`
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
                csv: '/tests/demo.csv',
                csvHeaders: true,
                search: true,
                pagination: 10,
                paginationOptions: [10,25,50,100],
                columns: [
                    { type:'text', width:80 },
                    { type:'text', width:200 },
                    { type:'text', width:100 },
                    { type:'text', width:200 },
                    { type:'text', width:100 },
                ],
            }],
            onchangepage: function(el, pageNumber, oldPage) {
                console.log('New page: ' + pageNumber);
            }
        });
    }
}
```

## Related Content

- [Data Grid Search](/jspreadsheet/docs/search)

