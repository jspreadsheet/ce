title: Data Grid Read-only Cells
keywords: Jspreadsheet, JavaScript, plugins, spreadsheet, read-only cells, data grid, data protection, cell permissions, non-editable cells
description: Learn to configure read-only columns or cells in Jspreadsheet, protecting data and restricting user edits for specific cells in your data grid.

# Read Only Cells

## Documentation

### Methods

The following methods allow programmatic updates to read-only states in your spreadsheets.

| Method                                 | Description                                                                                             |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| `setReadOnly(object\|string, boolean)` | Sets the read-only state of a cell.<br/>`setReadOnly(ident: HTMLElement\|string, state: boolean): void` |
| `isReadOnly(number, number)`           | Checks if a cell is read-only.<br/>`isReadOnly(x: number, y: number): boolean`                          |

## Examples

### Readonly

A basic spreadsheet example with a read-only column and an additional read-only cell.

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

  <div id="spreadsheet"></div>

  <script>
    jspreadsheet(document.getElementById("spreadsheet"), {
      worksheets: [
        {
          data: [
            ["Mazda", 2001, 2000, 1],
            ["GM", 2010, 5000, 1],
            ["Honda Fit", 2009, 3000, 1],
            ["Honda CRV", 2010, 6000, 0],
          ],
          columns: [
            {
              type: "text",
              title: "Description",
              width: "200px",
              readOnly: true,
            },
            {
              type: "text",
              title: "Year",
              width: "200px",
            },
            {
              type: "text",
              title: "Price",
              width: "100px",
              mask: "#.##",
              render: function (td, value, x, y) {
                if (y === 2) {
                  td.classList.add("readonly");
                }
              },
            },
            {
              type: "checkbox",
              title: "Automatic",
              width: "100px",
            },
          ],
          updateTable: function (el, cell, x, y, source, value, id) {
            if (x == 2 && y == 2) {
              cell.classList.add("readonly");
            }
          },
        },
      ],
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
    ["Mazda", 2001, 2000, 1],
    ["Peugeot", 2010, 5000, 1],
    ["Honda Fit", 2009, 3000, 1],
    ["Honda CRV", 2010, 6000, 0],
  ];

  const columns = [
    {
      type: "text",
      title: "Description",
      width: "200px",
      readOnly: true,
    },
    {
      type: "text",
      title: "Year",
      width: "200px",
    },
    {
      type: "text",
      title: "Price",
      width: "100px",
      mask: "#.##",
    },
    {
      type: "checkbox",
      title: "Automatic",
      width: "100px",
    },
  ];

  const updateTable = function (el, cell, x, y, source, value, id) {
    if (x == 2 && y == 2) {
      cell.classList.add("readonly");
    }
  };

  // Render component
  return (
    <>
      <Spreadsheet ref={spreadsheet}>
        <Worksheet data={data} columns={columns} updateTable={updateTable} />
      </Spreadsheet>
    </>
  );
}
```

```vue
<template>
  <Spreadsheet ref="spreadsheet">
    <Worksheet :data="data" :columns="columns" :updateTable="updateTable" />
  </Spreadsheet>
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
  ["Mazda", 2001, 2000, 1],
  ["Peugeot", 2010, 5000, 1],
  ["Honda Fit", 2009, 3000, 1],
  ["Honda CRV", 2010, 6000, 0],
]);

// Columns configuration
const columns = ref([
  {
    type: "text",
    title: "Description",
    width: "200px",
    readOnly: true,
  },
  {
    type: "text",
    title: "Year",
    width: "200px",
  },
  {
    type: "text",
    title: "Price",
    width: "100px",
    mask: "#.##",
  },
  {
    type: "checkbox",
    title: "Automatic",
    width: "100px",
  },
]);

// Update table method
const updateTable = (el, cell, x, y, source, value, id) => {
  if (x === 2 && y === 2) {
    cell.classList.add("readonly");
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
                ['Mazda', 2001, 2000, 1],
                ['GM', 2010, 5000, 1],
                ['Honda Fit', 2009, 3000, 1],
                ['Honda CRV', 2010, 6000, 0],
            ],
            columns: [
                {
                    type: 'text',
                    title:'Description',
                    width:'200px',
                    readOnly: true,
                },
                {
                    type: 'text',
                    title: 'Year',
                    width: '200px'
                },
                {
                    type: 'text',
                    title: 'Price',
                    width: '100px',
                    mask: '#.##',
                    render: function(td, value, x, y) {
                        if (y === 2) {
                            td.classList.add('readonly');
                        }
                    }
                },
                {
                    type: 'checkbox',
                    title:'Automatic',
                    width:'100px'
                },
            ],
            updateTable: function(el, cell, x, y, source, value, id) {
                if (x == 2 && y == 2) {
                    cell.classList.add('readonly');
                }
            }
        });
    }
}
```
