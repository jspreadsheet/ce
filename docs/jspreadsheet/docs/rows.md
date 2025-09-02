title: Managing the Data Grid Rows
keywords: Jspreadsheet, Jexcel, data grid, JavaScript, Excel-like rows, spreadsheet rows, data table rows, row management, add rows, delete rows, move rows, row manipulation, row events, row settings, row documentation
description: Learn to manage rows in Jspreadsheet, including adding, deleting, and moving them. Explore methods, events, and settings for customizing row behaviour in dynamic and integrated data grid applications.

# Spreadsheet Rows

Row settings in Jspreadsheet define behaviours and attributes, such as unique identifiers, row height, styling, and cell properties like read-only status. This section covers the methods, events, and settings for managing rows in a data grid.

## Documentation

### Methods

You can manage rows programmatically using one of the following methods.

| Method      | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `getHeight` | Retrieves the height of all rows.<br/>`worksheetInstance.getHeight(row?: undefined): string[];`<br/><br/>Retrieves the height of a row.<br/>`worksheetInstance.getHeight(row: number): string;`                                                                                                                                                                                                                                                                                                                                                 |
| `setHeight` | Sets the height of a row.<br/>@param `row` - Row index.<br/>@param `height` - New height. An integer greater than zero.<br/>`worksheetInstance.setHeight(row: number, height: number): void;`                                                                                                                                                                                                                                                                                                                                                   |
| `moveRow`   | Moves a row to a new position.<br/>@param `rowNumber` - Row index.<br/>@param `newPositionNumber` - New row index.<br/>`worksheetInstance.moveRow(rowNumber: number, newPositionNumber: number): false \| undefined;`                                                                                                                                                                                                                                                                                                                           |
| `insertRow` | Inserts one or more new rows.<br/>@param `mixed` - Number of rows to insert. It can also be an array of values, but in this case, only one row is inserted, whose data is based on the array items. Default: 1.<br/>@param `rowNumber` - Index of the row used as reference for the insertion. Default: last row.<br/>@param `insertBefore` - Insert new rows before or after the reference row. Default: false.<br/>`worksheetInstance.insertRow(mixed?: number \| CellValue[],rowNumber?: number,insertBefore?: number): false \| undefined;` |
| `deleteRow` | Deletes one or more rows.<br/>@param `rowNumber` - Row index from which removal starts.<br/>@param `numOfRows` - Number of rows to be removed.<br/>`worksheetInstance.deleteRow(rowNumber?: number, numOfRows?: number): false \| undefined;`                                                                                                                                                                                                                                                                                                   |

### Events

The following events are related to rows in your spreadsheet.

| Event               | Description                                                                                                                                                            |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `onbeforeinsertrow` | Triggered before a new row is inserted. Return `false` to cancel the action.<br/>`onbeforeinsertrow(worksheet: Object, rows: Object[]) => Boolean \| Object[] \| void` |
| `oninsertrow`       | Triggered after a new row is inserted.<br/>`oninsertrow(worksheet: Object, rows: Object[]) => void`                                                                    |
| `onbeforedeleterow` | Triggered before a row is deleted. Return `false` to cancel the action.<br/>`onbeforedeleterow(worksheet: Object, rows: Number[]) => Number[] \| Boolean \| void`      |
| `ondeleterow`       | Triggered after a row is deleted.<br/>`ondeleterow(worksheet: Object, rows: Number[]) => void`                                                                         |
| `onmoverow`         | Triggered after a row is moved to a new position.<br/>`onmoverow(worksheet: Object, origin: Number, destination: Number) => void`                                      |
| `onresizerow`       | Triggered after the height of one or more rows is changed.<br/>`onresizerow(worksheet: Object, row: Mixed, height: Mixed, oldHeight: Mixed) => void`                   |

### Initial Settings

The following row-related properties are available during spreadsheet initialization.

| Property                        | Description                                                                                  |
| ------------------------------- | -------------------------------------------------------------------------------------------- |
| `allowInsertRow: boolean`       | Enables the user to insert new rows. `Default: true`                                         |
| `allowManualInsertRow: boolean` | Automatically inserts a new row when the user presses Enter on the last row. `Default: true` |
| `allowDeleteRow: boolean`       | Allows the user to delete rows. `Default: true`                                              |
| `rowDrag: boolean`              | Enables the user to change the position of a row by dragging and dropping. `Default: true`   |
| `rowResize: boolean`            | Allows the user to resize rows. `Default: true`                                              |
| `defaultRowHeight: number`      | Sets the default row height.                                                                 |
| `minSpareRows: number`          | Specifies the number of mandatory blank rows at the end of the spreadsheet. `Default: none.` |

### Available properties

You can initialize the spreadsheet with custom `id`, `text`, and `height` using the following properties:

| Property         | Description                                                                                  |
| ---------------- | -------------------------------------------------------------------------------------------- |
| `id: number`     | Unique identifier for the row, which can be used to synchronize the content with a database. |
| `height: number` | The row height in pixels.                                                                    |
| `title: string`  | The title or name of the row.                                                                |

## Examples

A basic spreadsheet with a few programmatic methods available.

```html
<html>
  <script src="https://bossanova.uk/jspreadsheet/v5/jspreadsheet.js"></script>
  <script src="https://jsuites.net/v5/jsuites.js"></script>
  <link
    rel="stylesheet"
    href="https://bossanova.uk/jspreadsheet/v5/jspreadsheet.css"
    type="text/css"
  />
  <link
    rel="stylesheet"
    href="https://jsuites.net/v5/jsuites.css"
    type="text/css"
  />

  <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/css?family=Material+Icons"
  />

  <div id="spreadsheet"></div>
  <br /><br />

  <input
    type="button"
    value="Click to insert a new blank row at the end of the spreadsheet"
    id="btn1"
  /><br /><br />
  <input
    type="button"
    value="Click to insert two new blank rows at the beginning of the spreadsheet"
    id="btn2"
  /><br /><br />
  <input
    type="button"
    value="Click to delete the last row"
    id="btn4"
  /><br /><br />
  <input
    type="button"
    value="Click to move the first row to the third position"
    id="btn5"
  /><br /><br />
  <input type="button" value="Hide the first row" id="btn6" /><br /><br />
  <input type="button" value="Show the first row" id="btn7" /><br /><br />

  <script>
    // Create the spreadsheet
    let spreadsheet = jspreadsheet(document.getElementById("spreadsheet"), {
      worksheets: [
        {
          data: [
            ["US", "Cheese", 1000],
            ["CA", "Apples", 1200],
            ["CA", "Carrots", 2000],
            ["BR", "Oranges", 3800],
          ],
          worksheetName: "Row management",
        },
      ],
    });

    document.getElementById("btn1").onclick = () => spreadsheet[0].insertRow();
    document.getElementById("btn2").onclick = () =>
      spreadsheet[0].insertRow(2, 0, 1);
    document.getElementById("btn4").onclick = () => spreadsheet[0].deleteRow();
    document.getElementById("btn5").onclick = () =>
      spreadsheet[0].moveRow(0, 2);
    document.getElementById("btn6").onclick = () => spreadsheet[0].hideRow(0);
    document.getElementById("btn7").onclick = () => spreadsheet[0].showRow(0);
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
    ["US", "Cheese", 1000],
    ["CA", "Apples", 1200],
    ["CA", "Carrots", 2000],
    ["BR", "Oranges", 3800],
  ];
  // Render component
  return (
    <>
      <Spreadsheet ref={spreadsheet}>
        <Worksheet minDimensions={[6, 6]} worksheetName={"Row management"} />
      </Spreadsheet>
      <button onClick={() => spreadsheet.current[0].insertRow()}>
        Click to insert a new blank row at the end of the spreadsheet
      </button>
      <br />
      <button onClick={() => spreadsheet.current[0].insertRow(2, 0, 1)}>
        Click to insert two new blank rows at the beginning of the spreadsheet
      </button>
      <br />
      <button
        onClick={() =>
          spreadsheet.current[0].insertRow([
            { data: ["0.99", "1.22", "3.11", "2.21"] },
          ])
        }
      >
        Click to insert a new row with pre-populated values at the end of the
        spreadsheet
      </button>
      <br />
      <button onClick={() => spreadsheet.current[0].deleteRow()}>
        Click to delete the last row
      </button>
      <br />
      <button onClick={() => spreadsheet.current[0].moveRow(0, 2)}>
        Click to move the first row to the third position
      </button>
      <br />
      <button onClick={() => spreadsheet.current[0].hideRow(0)}>
        Hide the first row
      </button>
      <br />
      <button onClick={() => spreadsheet.current[0].showRow(0)}>
        Show the first row
      </button>
    </>
  );
}
```

```vue
<template>
  <Spreadsheet ref="spreadsheet">
    <Worksheet :data="data" />
  </Spreadsheet>
  <ol class="example" style="cursor:pointer;">
    <li>
      <a @click="insertRowAtEnd()">
        Click to insert a new blank row at the end of the spreadsheet
      </a>
    </li>
    <li>
      <a @click="insertRowsAtBeginning()">
        Click to insert two new blank rows at the beginning of the spreadsheet
      </a>
    </li>
    <li><a @click="deleteLastRow()"> Click to delete the last row </a></li>
    <li>
      <a @click="moveFirstRowToThird()">
        Click to move the first row to the third position
      </a>
    </li>
    <li><a @click="hideFirstRow()"> Hide the first row </a></li>
    <li><a @click="showFirstRow()"> Show the first row </a></li>
  </ol>
</template>

<script setup>
import { ref } from "vue";
import { Spreadsheet, Worksheet } from "@jspreadsheet-ce/vue";
import "jsuites/dist/jsuites.css";
import "jspreadsheet-ce/dist/spreadsheet.css";

// Spreadsheet ref
const spreadsheet = ref(null);

// Data
const data = ref([
  ["US", "Cheese", 1000],
  ["CA", "Apples", 1200],
  ["CA", "Carrots", 2000],
  ["BR", "Oranges", 3800],
]);

// Row operation methods
const insertRowAtEnd = () => {
  if (spreadsheet.value && spreadsheet.value.current[0]) {
    spreadsheet.value.current[0].insertRow();
  }
};

const insertRowsAtBeginning = () => {
  if (spreadsheet.value && spreadsheet.value.current[0]) {
    spreadsheet.value.current[0].insertRow(2, 0, 1);
  }
};

const deleteLastRow = () => {
  if (spreadsheet.value && spreadsheet.value.current[0]) {
    spreadsheet.value.current[0].deleteRow();
  }
};

const moveFirstRowToThird = () => {
  if (spreadsheet.value && spreadsheet.value.current[0]) {
    spreadsheet.value.current[0].moveRow(0, 2);
  }
};

const hideFirstRow = () => {
  if (spreadsheet.value && spreadsheet.value.current[0]) {
    spreadsheet.value.current[0].hideRow(0);
  }
};

const showFirstRow = () => {
  if (spreadsheet.value && spreadsheet.value.current[0]) {
    spreadsheet.value.current[0].showRow(0);
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
        <ol class='example' style='cursor:pointer;'>
            <li><a (click)="this.worksheets[0].insertRow()">
                Click to insert a new blank row at the end of the spreadsheet
            </a></li>
            <li><a (click)="this.worksheets[0].insertRow(2, 0, true)">
                Click to insert two new blank rows at the beginning of the spreadsheet
            </a></li>
            <li><a (click)="this.worksheets[0].deleteRow(-1)">
                Click to delete the last row
            </a></li>
            <li><a (click)="this.worksheets[0].moveRow(0, 2)">
                Click to move the first row to the third position
            </a></li>
            <li><a (click)="this.worksheets[0].hideRow(0)">
                Hide the first row
            </a></li>
            <li><a (click)="this.worksheets[0].showRow(0)">
                Show the first row
            </a></li>
        </ol>`,
})
export class AppComponent {
    @ViewChild("spreadsheet") spreadsheet: ElementRef;
    // Worksheets
    worksheets: jspreadsheet.worksheetInstance[];
    // Create a new data grid
    ngAfterViewInit() {
        // Create spreadsheet
        this.worksheets = jspreadsheet(this.spreadsheet.nativeElement, {
            data: [
                ['US', 'Cheese', 1000 ],
                ['CA', 'Apples', 1200 ],
                ['CA', 'Carrots', 2000 ],
                ['BR', 'Oranges', 3800 ],
            ],
            worksheetName: 'Row management',
        });
    }
}
```
