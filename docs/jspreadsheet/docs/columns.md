title: Spreadsheet Columns
keywords: Jspreadsheet, column management, JavaScript spreadsheets, Excel-like columns, data grid customization, column settings, spreadsheet methods, column events
description: Dive into the comprehensive guide on managing spreadsheet columns in Jspreadsheet, covering column settings, programmable methods, and associated events for complete control and customization.

# Spreadsheet Columns

The Jspreadsheet column settings control all the cell attributes within a column, including data types, read-only status, data masks, and rendering options. This section covers settings, events, and methods in Jspreadsheet to customize spreadsheet functionality for your application needs.

## Documentation

### Methods

The following methods allow for programmatic interaction with spreadsheet columns in Jspreadsheet.

| Method                  | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `getWidth`              | Get the width of one or all columns.<br/>@param `column` - Index of the column. If omitted, returns the widths of all columns.<br/>`worksheetInstance.getWidth(column?: number): number \| (number \| string)[];`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `setWidth`              | Set the width of a column.<br/>@param `column` - Column index.<br/>@param `width` - New width.<br/>`worksheetInstance.setWidth(column: number, width: number): void;`<br/><br/>Set the width of one or more columns.<br/>@param `column` - Column indexes.<br/>@param `width` - New widths.<br/>`worksheetInstance.setWidth(column: number[], width: number \| number[]): void;`                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `getColumn`             | Retrieves settings for a specified column.<br/>`worksheetInstance.getColumn(colNumber: Number): Object`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `moveColumn`            | Move a column. This method returns false if the "This action will destroy any existing merged cells. Are you sure?" dialog receives a negative response.<br/>@param o - Column index.<br/>@param `d` - New column index.<br/>`worksheetInstance.moveColumn(columnNumber: number, newPositionNumber: number): false \| undefined;`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `insertColumn`          | Insert one or more columns. This method returns false if the onbeforeinsertcolumn event returns false or if the "This action will destroy any existing merged cells. Are you sure?" dialog receives a negative response.<br/>@param `mixed` - Number of columns to insert. It can also be an array of values, but in this case, only one column is inserted, whose data is based on the array items. Default: 1.<br/>@param `columnNumber` - Index of the column used as reference for the insertion. Default: last column.<br/>@param `insertBefore` - Insert new columns before or after the reference column. Default: false.<br/>@param `properties` - New column properties.<br/>`worksheetInstance.insertColumn(mixed?: number \| CellValue[], columnNumber?: number, insertBefore?: boolean, properties?: Column[]): false \| undefined;` |
| `deleteColumn`{.nowrap} | Remove columns. This method returns false if the onbeforedeletecolumn event returns false or if the "This action will destroy any existing merged cells. Are you sure?" dialog receives a negative response.<br/>@param `columnNumber` - Column index from which removal starts.<br/>@param `numOfColumns` - Number of columns to be removed.<br/>`worksheetInstance.deleteColumn(columnNumber?: number, numOfColumns?: number): false \| undefined;`                                                                                                                                                                                                                                                                                                                                                                                            |

### Events

Several events are available for handling column actions in your spreadsheet, including `onbefore` events that let you intercept, validate, or cancel user actions.

| Event                           | Description                                                                                                                                                                                                                        |
| ------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `onbeforeinsertcolumn`{.nowrap} | Triggered before a new column is inserted. Return `false` to cancel the action.<br/>`onbeforeinsertcolumn(instance: WorksheetInstance, columns: { column: number, options: Column, data?: CellValue[] }[]): undefined \| boolean;` |
| `oninsertcolumn`                | Triggered after a new column is inserted.<br/>`oninsertcolumn(instance: WorksheetInstance, columns: { column: number, options: Column, data?: CellValue[] }[]): void;`                                                             |
| `onbeforedeletecolumn`          | Triggered before a column is deleted. Return `false` to cancel the action.<br/>`onbeforedeletecolumn(instance: WorksheetInstance, removedColumns: number[]): undefined \| boolean;`                                                |
| `ondeletecolumn`                | Triggered after a column is deleted.<br/>`ondeletecolumn(instance: WorksheetInstance, removedColumns: number[]): void;`                                                                                                            |
| `onmovecolumn`                  | Triggered after a column is moved to a new position.<br/>`ondeletecolumn(instance: WorksheetInstance, removedColumns: number[]): void;`                                                                                            |

### Initial Settings

The following column-related properties are configurable during the initialization of the online spreadsheet:

| Property                                    | Description                                                                             |
| ------------------------------------------- | --------------------------------------------------------------------------------------- |
| `allowInsertColumn: boolean`                | Enables users to add new columns. `Default: true`                                       |
| `allowManualInsertColumn: boolean`{.nowrap} | Adds a new column when the user presses the Tab key in the last column. `Default: true` |
| `allowDeleteColumn: boolean`                | Allows users to delete columns. `Default: true`                                         |
| `allowRenameColumn: boolean`                | Allows users to rename columns. `Default: true`                                         |
| `columnDrag: boolean`                       | Enables drag-and-drop for changing column positions. `Default: true`                    |
| `columnSorting: boolean`                    | Allows users to sort columns. `Default: true`                                           |
| `columnResize: boolean`                     | Allows users to resize columns. `Default: true`                                         |
| `defaultColWidth: number`                   | Sets the default column width. `Default: 100px`                                         |
| `defaultColAlign: string`                   | Sets the default column text alignment. `Default: center`                               |
| `minSpareCols: number`                      | Number of blank columns at the spreadsheet's end. `Default: none`                       |

### Available Properties

Each column type in Jspreadsheet can hold specific properties. Below are some of the most commonly available options:

| Property                | Description                                                                                                            |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `type`                  | Defines the editor type for the column. It can be a string for a native editor or a method for a custom editor plugin. |
| `title`                 | Title of the column.                                                                                                   |
| `name`                  | Property name or path when using JSON data.                                                                            |
| `width`                 | Width of the column.                                                                                                   |
| `align`                 | Alignment of the column content. `Default: center.`                                                                    |
| `url`                   | URL to load items for dropdowns in this column.                                                                        |
| `source`                | Items for dropdown or autocomplete fields.                                                                             |
| `autocomplete`          | Enables autocomplete for the column.                                                                                   |
| `multiple`              | Allows multiple selections in dropdown or autocomplete fields.                                                         |
| `mask`                  | Input mask applied to data cells.                                                                                      |
| `decimal`               | Character used as the decimal separator.                                                                               |
| `disabledMaskOnEdition` | Disables the mask when editing.                                                                                        |
| `render`                | Renderer method or rule for cell content.                                                                              |
| `format`                | Date or number format in the cell. `Default for the calendar: "DD/MM/YYYY".`                                           |
| `options`               | Extended configuration for the column.                                                                                 |

#### Adding a New Column

To insert a new column into the data grid, you can pass an array of objects, each object containing three properties outlined below. This approach allows for the creation of multiple columns in a single operation.

| Method          | Description                                      |
| --------------- | ------------------------------------------------ |
| data: any[]     | Array with the column data                       |
| column: number  | The index where the new column will be inserted. |
| options: object | An object specifying the column's attributes.    |

##### Example

To add a new column at the beginning of the grid:

{.ignore}

```javascript
worksheet.insertColumn([
  {
    data: [1, 2, 3],
    column: 0,
    options: {
      type: "calendar",
      title: "My new column",
    },
  },
]);
```

## Examples

### Render Method

The render method modifies visible data before inserting it into a grid cell.

```html
<html>
  <script src="https://cdn.jsdelivr.net/npm/jspreadsheet-ce@5/dist/index.min.js"></script>
  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/jspreadsheet-ce@5/dist/jspreadsheet.min.css"
    type="text/css"
  />
  <script src="https://cdn.jsdelivr.net/npm/jsuites/dist/jsuites.min.js"></script>
  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/jsuites/dist/jsuites.min.css"
    type="text/css"
  />

  <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/css?family=Material+Icons"
  />

  <div id="spreadsheet"></div>

  <script>
    // Adding an arbitrary number leading zeros.
    let pad = function (cell, value, x, y, instance, options) {
      if (value || Number(value)) {
        let size = options.digits || 0;
        value = value.toString();
        while (value.length < size) {
          value = "0" + value;
        }
        cell.innerText = value;
      }
    };

    // Create the spreadsheet
    jspreadsheet(document.getElementById("spreadsheet"), {
      tabs: true,
      toolbar: true,
      worksheets: [
        {
          data: [[1]],
          minDimensions: [6, 6],
          columns: [{ render: pad, digits: 6 }],
        },
      ],
    });
  </script>
</html>
```

```jsx
import React, { useRef } from "react";
import { Spreadsheet, Worksheet } from "@jspreadsheet-ce/react";
import "jspreadsheet-ce/dist/jspreadsheet.css";

// Adding an arbitrary number leading zeros.
const pad = (cell, value, x, y, instance, options) => {
  if (value !== "") {
    let size = options.digits || 0;
    value = value.toString();
    while (value.length < size) {
      value = "0" + value;
    }
    cell.innerText = value;
  }
};

export default function App() {
  // Spreadsheet array of worksheets
  const spreadsheet = useRef();
  // Data
  const data = [[1]];
  // Columns
  const columns = [{ render: pad, digits: 6 }];

  // Render component
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
import { ref } from "vue";
import { Spreadsheet, Worksheet } from "@jspreadsheet-ce/vue";
import "jspreadsheet-ce/dist/jspreadsheet.css";

// Adding an arbitrary number leading zeros.
const pad = (cell, value, x, y, instance, options) => {
  if (value !== "") {
    let size = options.digits || 0;
    value = value.toString();
    while (value.length < size) {
      value = "0" + value;
    }
    cell.innerText = value;
  }
};

// Spreadsheet ref
const spreadsheetRef = ref(null);

// Data
const data = ref([[1]]);

// Columns
const columns = ref([{ render: pad, digits: 6 }]);
</script>
```

```angularjs
import { Component, ViewChild, ElementRef } from "@angular/core";
import jspreadsheet from "jspreadsheet-ce";

import "jspreadsheet-ce/dist/jspreadsheet.css"
import "jsuites/dist/jsuites.css"

// Adding an arbitrary number leading zeros.
let pad = function(cell, value, x, y, instance, options) {
    if (value || Number(value)) {
        let size = options.digits||0;
        value = value.toString();
        while (value.length < size) {
            value = "0" + value;
        }
        cell.innerText = value;
    }
}

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
            tabs: true,
            toolbar: true,
            worksheets: [{
                data: [[1]],
                minDimensions: [6,6],
                columns: [{ render: pad, digits: 6 }]
            }],
        });
    }
}
```

### Programmatic Methods

A basic spreadsheet example demonstrating various programmatic methods.

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
    value="Insert a new blank column at the end"
    id="btn1"
  /><br /><br />
  <input
    type="button"
    value="Insert two new blank columns at the beginning"
    id="btn2"
  /><br /><br />
  <input
    type="button"
    value="Click to delete the last column"
    id="btn4"
  /><br /><br />
  <input
    type="button"
    value="Click to move the first column to the third position"
    id="btn5"
  /><br /><br />
  <input type="button" value="Hide the first column" id="btn6" /><br /><br />
  <input type="button" value="Show the first column" id="btn7" /><br /><br />

  <script>
    // Create the spreadsheet
    let worksheets = jspreadsheet(document.getElementById("spreadsheet"), {
      worksheets: [
        {
          data: [
            ["US", "Cheese", 1000],
            ["CA", "Apples", 1200],
            ["CA", "Carrots", 2000],
            ["BR", "Oranges", 3800],
          ],
        },
      ],
    });

    document.getElementById("btn1").onclick = function () {
      worksheets[0].insertColumn();
    };
    document.getElementById("btn2").onclick = function () {
      worksheets[0].insertColumn(2, 0, 1);
    };
    document.getElementById("btn4").onclick = function () {
      worksheets[0].deleteColumn();
    };
    document.getElementById("btn5").onclick = function () {
      worksheets[0].moveColumn(0, 2);
    };
    document.getElementById("btn6").onclick = function () {
      worksheets[0].hideColumn(0);
    };
    document.getElementById("btn7").onclick = function () {
      worksheets[0].showColumn(0);
    };
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
  const spreadsheet = useRef(null);
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
        <Worksheet data={data} />
      </Spreadsheet>
      <button onClick={() => spreadsheet.current[0].insertColumn()}>
        Click to insert a new blank column at the end of the table
      </button>
      <br />
      <button onClick={() => spreadsheet.current[0].insertColumn(2, 0, 1)}>
        Click to insert two new blank columns at the beginning of the table
      </button>
      <br />
      <button onClick={() => spreadsheet.current[0].deleteColumn()}>
        Click to delete the last column
      </button>
      <br />
      <button onClick={() => spreadsheet.current[0].moveColumn(0, 2)}>
        Click to move the first column to the third position
      </button>
      <br />
      <button onClick={() => spreadsheet.current[0].hideColumn(0)}>
        Hide the first column
      </button>
      <br />
      <button onClick={() => spreadsheet.current[0].showColumn(0)}>
        Show the first column
      </button>
    </>
  );
}
```

```vue
<template>
  <Spreadsheet ref="spreadsheetRef">
    <Worksheet :data="data" />
  </Spreadsheet>
  <ul>
    <li @click="insertBlankColumn()">
      Click to insert a new blank column at the end of the table
    </li>
    <li @click="insertMultipleColumns()">
      Click to insert two new blank columns at the beginning of the table
    </li>
    <li @click="deleteLastColumn()">Click to delete the last column</li>
    <li @click="moveFistColumnToThird()">
      Click to move the first column to the third position
    </li>
    <li @click="hideFirstColumn()">Hide the first column</li>
    <li @click="showFirstColumn()">Show the first column</li>
  </ul>
</template>

<script setup>
import { ref } from "vue";
import { Spreadsheet, Worksheet } from "@jspreadsheet-ce/vue";
import "jsuites/dist/jsuites.css";
import "jspreadsheet-ce/dist/spreadsheet.css";

// Data
const data = ref([
  ["US", "Cheese", 1000],
  ["CA", "Apples", 1200],
  ["CA", "Carrots", 2000],
  ["BR", "Oranges", 3800],
]);

// Spreadsheet ref
const spreadsheetRef = ref(null);

// Column manipulation methods
const insertBlankColumn = () => {
  if (spreadsheetRef.value) {
    spreadsheetRef.value.current[0].insertColumn();
  }
};

const insertMultipleColumns = () => {
  if (spreadsheetRef.value) {
    spreadsheetRef.value.current[0].insertColumn(2, 0, 1);
  }
};

const deleteLastColumn = () => {
  if (spreadsheetRef.value) {
    spreadsheetRef.value.current[0].deleteColumn();
  }
};

const moveFistColumnToThird = () => {
  if (spreadsheetRef.value) {
    spreadsheetRef.value.current[0].moveColumn(0, 2);
  }
};

const hideFirstColumn = () => {
  if (spreadsheetRef.value) {
    spreadsheetRef.value.current[0].hideColumn(0);
  }
};

const showFirstColumn = () => {
  if (spreadsheetRef.value) {
    spreadsheetRef.value.current[0].showColumn(0);
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
        <ul>
            <li (click)="this.worksheets[0].insertColumn()">
                Click to insert a new blank column at the end of the table
            </li>
            <li (click)="this.worksheets[0].insertColumn(2, 0, true)">
                Click to insert two new blank columns at the beginning of the table
            </li>
            <li (click)="this.worksheets[0].deleteColumn()">
                Click to delete the last column
            </li>
            <li (click)="this.worksheets[0].moveColumn(0, 2)">
                Click to move the first column to the third position
            </li>
            <li (click)="this.worksheets[0].hideColumn(0)">
                Hide the first column
            </li>
            <li (click)="this.worksheets[0].showColumn(0)">
                Show the first column
            </li>
        </ul>`,
})
export class AppComponent {
    @ViewChild("spreadsheet") spreadsheet: ElementRef;
    // Worksheets
    worksheets: jspreadsheet.worksheetInstance[];
    // Create a new data grid
    ngAfterViewInit() {
        // Create spreadsheet
        this.worksheets = jspreadsheet(this.spreadsheet.nativeElement, {
            tabs: true,
            toolbar: true,
            worksheets: [{
                data: [
                    ['US', 'Cheese', 1000 ],
                    ['CA', 'Apples', 1200 ],
                    ['CA', 'Carrots', 2000 ],
                    ['BR', 'Oranges', 3800 ],
                ]
            }],
        });
    }
}
```
