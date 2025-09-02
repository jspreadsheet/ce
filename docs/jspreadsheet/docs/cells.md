title: Spreadsheet Cells
keywords: JavaScript, Jspreadsheet, Jexcel, Data Grid, Spreadsheet Features, Excel-like Functionality, Table Management, Cell Settings, Cell Configuration
description: Detailed documentation on Jspreadsheet cell configuration, covering events, methods, and settings for advanced customization.

# Spreadsheet Cells

This guide provides an in-depth overview of data grid cells in Jspreadsheet, including key methods, configuration options, and a basic implementation example.

{.pro}

> #### Differences in the Pro Version
>
> The Jspreadsheet Pro enables cell-level editor customization and allows dynamic programmatic changes to cell types.\
> \
> [Learn more](https://jspreadsheet.com/docs/cells){.button}

## Documentation

### Methods

This section outlines methods to facilitate interaction with cells and their attributes within the data grid.

| Method                       | Description                                                                                                                                                                                                                                                                                                                           |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `getCell`                    | Get cell DOM element by cell name.<br/>@param `cell` - Cell name.<br>`worksheetInstance.getCell(cell: string): HTMLTableCellElement;`<br/><br/>Get cell DOM element by cell coords.<br/>@param `x` - Cell column index.<br/>@param `y` - Cell row index.<br/>`worksheetInstance.getCell(x: number, y: number): HTMLTableCellElement;` |
| `getCellFromCoords`{.nowrap} | Get cell DOM element by cell coordinates.<br/>@param `x` - Column index of the cell.<br/>@param `y` - Row index of the cell.<br>`worksheetInstance.getCellFromCoords(x: number, y: number): HTMLTableCellElement;`                                                                                                                    |

### Example

The following example is a car loan calculation spreadsheet showcasing styles, merged cells, and row properties.

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

  <input type="button" value="Apply Style" id="btn1" class="jss_object" />

  <script>
    // Create the spreadsheet
    let worksheets = jspreadsheet(document.getElementById("spreadsheet"), {
      worksheets: [
        {
          data: [
            ["Car Loan", ""],
            ["Purchase price", "19700"],
            ["Down payment", "1000"],
            ["Trade-in value", "500"],
            ["Interest rate", "0.0305"],
            ["Length of loan (in months)", "60"],
            ["", ""],
            ["Monthly payment", "=PMT(B5/12,B6,B2-(B3+B4))"],
            ["Total cost", "=-(B8*B6)+(B3+B4)"],
          ],
          columns: [{ width: "300px" }, { width: "200px" }],
          mergeCells: {
            A1: [2, 1],
          },
          rows: {
            0: { height: "200px" },
          },
          style: {
            A1: "font-weight: bold",
          },
        },
      ],
    });

    btn1.addEventListener("click", function () {
      worksheets[0].getCell("A1").style.backgroundColor = "orange";
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
    ["Car loan", ""],
    ["Purchase price", "19700"],
    ["Down payment", "1000"],
    ["Trade-in value", "500"],
    ["Interest rate", "0.0305"],
    ["Length of loan (in months)", "60"],
    ["", ""],
    ["Monthly payment", "=PMT(B5/12,B6,B2-(B3+B4))"],
    ["Total cost", "=-(B8*B6)+(B3+B4)"],
  ];

  // Columns
  const columns = [{ width: "300px" }, { width: "200px" }];

  // Merge cells
  const mergeCells = {
    A1: [2, 1],
  };

  // Rows properties
  const rows = {
    0: { height: "200px" },
  };

  const style = {
    A1: "font-weight: bold",
  };

  const applyStyle = function () {
    if (spreadsheet.current) {
      spreadsheet.current[0].getCell("A1").style.backgroundColor = "orange";
    }
  };

  // Render component
  return (
    <>
      <Spreadsheet ref={spreadsheet}>
        <Worksheet
          data={data}
          columns={columns}
          mergeCells={mergeCells}
          rows={rows}
          style={style}
        />
      </Spreadsheet>
      <input
        type={"button"}
        value={"Apply external style"}
        onClick={applyStyle}
        className={"jss_object"}
      />
    </>
  );
}
```

```vue
<template>
  <div>
    <Spreadsheet ref="spreadsheetRef">
      <Worksheet
        :data="data"
        :columns="columns"
        :merge-cells="mergeCells"
        :rows="rows"
        :style="style"
      />
    </Spreadsheet>
    <input
      type="button"
      value="Apply external style"
      @click="applyStyle"
      class="jss_object"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Spreadsheet, Worksheet } from "@jspreadsheet-ce/vue";
import "jsuites/dist/jsuites.css";
import "jspreadsheet-ce/dist/spreadsheet.css";

const spreadsheetRef = ref(null);

// Data
const data = [
  ["Car loan", ""],
  ["Purchase price", "19700"],
  ["Down payment", "1000"],
  ["Trade-in value", "500"],
  ["Interest rate", "0.0305"],
  ["Length of loan (in months)", "60"],
  ["", ""],
  ["Monthly payment", "=PMT(B5/12,B6,B2-(B3+B4))"],
  ["Total cost", "=-(B8*B6)+(B3+B4)"],
];

// Columns
const columns = [{ width: "300px" }, { width: "200px" }];

// Merge cells
const mergeCells = {
  A1: [2, 1],
};

// Rows properties
const rows = {
  0: { height: "200px" },
};

const style = {
  A1: "font-weight: bold",
};

const applyStyle = () => {
  if (spreadsheetRef.value) {
    spreadsheetRef.value.current[0].getCell("A1").style.backgroundColor =
      "orange";
  }
};
</script>
```

```angularjs
import { Component, ViewChild, ElementRef } from "@angular/core";
import jspreadsheet from "jspreadsheet-ce";

import "jspreadsheet-ce/dist/jspreadsheet.css"
import "jsuites/dist/jsuites.css"

// Create the data grid component
@Component({
    standalone: true,
    selector: "app-root",
    template: `<div #spreadsheet></div>
        <input type="button" value="Apply Style" class="jss_object" (click)="applyStyle()" />`,
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
                    ['Car Loan', ''],
                    ['Purchase price', '19700'],
                    ['Down payment', '1000'],
                    ['Trade-in value', '500'],
                    ['Interest rate', '0.0305'],
                    ['Length of loan (in months)', '60'],
                    ['', ''],
                    ['Monthly payment', '=PMT(B5/12,B6,B2-(B3+B4))'],
                    ['Total cost', '=-(B8*B6)+(B3+B4)'],
                ],
                columns: [
                    { width:'300px' },
                    { width:'200px' },
                ],
                mergeCells: {
                    A1: [2, 1]
                },
                rows: {
                    0: { height:'200px' }
                },
                style: {
                    'A1': 'font-weight: bold'
                }
            }]
        });
    }

    applyStyle() {
        if (this.worksheets) {
            this.worksheets[0].getCell('A1').style.backgroundColor = 'orange';
        }
    }
}
```
