title: Data Sorting
keywords: Jspreadsheet, spreadsheet, javascript, javascript table sorting, spreadsheet sorting, data grid sorting, custom sorting, data organization, sortable data grid, javascript data grid, column sorting, row sorting, excel-like sorting, Jexcel sorting, spreadsheet controls, data grid controls, dynamic data sorting
description: Explore comprehensive information on Jspreadsheet data sorting, including sorting events, programmatic sorting, customization methods, and initial settings.

# Data Sorting

Jspreadsheet CE enables developers to create custom sorting handlers to override the default data grid sorting behaviour. Rows can be sorted through the context menu, double-clicking column headers, or programmatically using the orderBy method.

## Documentation

### Methods

The following method can be invoked to execute sorting programmatically:

| Method  | Description                                                                                                                                                                                             |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| orderBy | Sort the data grid. <br/>@param {number} columnNumber - Sort by column number <br/>@param {boolean} direction: false (asc), true (desc) <br/>`orderBy(columnNumber: Number, direction: Boolean) : void` |

### Events

| Event  | Description                                                                            |
| ------ | -------------------------------------------------------------------------------------- |
| onsort | `onsort(worksheet: Object, column: Number, direction: Number, newValue: Array) : void` |

### Initial Settings

You can define the sorting behaviour of your spreadsheet using the following properties:

| Property               | Description                                                                                                                       |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| sorting: function      | Defines a custom sorting handler. Use this to implement your specific sorting logic.<br/>`sorting(direction: Boolean) : function` |
| columnSorting: boolean | Enables or disables column-based sorting for the spreadsheet.`Default: true`                                                      |

## Examples

### Basic Sorting

The example below demonstrates sorting behaviour across various column types.

{.small}
Double-click on any `data grid` column header below to observe sorting functionality.

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

  <p>
    <select id="btn2">
      <option value="0">Column 1</option>
      <option value="1">Column 2</option>
      <option value="2">Column 3</option>
      <option value="3">Column 4</option>
    </select>
    <input type="button" value="Sort column" id="btn1" />
  </p>

  <script>
    // Create the spreadsheet
    let table = jspreadsheet(document.getElementById("spreadsheet"), {
      worksheets: [
        {
          data: [
            ["Mazda", 2001, 2000, "2006-01-01", "453.00", "2", "=E1*F1"],
            ["Peugeot", 2010, 5000, "2005-01-01", "23.00", "5", "=E2*F2"],
            ["Honda Fit", 2009, 3000, "2004-01-01", "214.00", "3", "=E3*F3"],
            ["Honda CRV", 2010, 6000, "2003-01-01", "56.11", "2", "=E4*F4"],
          ],
        },
      ],
    });
    document.getElementById("btn1").onclick = (e) =>
      table[0].orderBy(e.target.previousElementSibling.value);
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
  const select = useRef();
  // Data
  const data = [
    ["Mazda", 2001, 2000, "2006-01-01", "453.00", "2", "=E1*F1"],
    ["Peugeot", 2010, 5000, "2005-01-01", "23.00", "5", "=E2*F2"],
    ["Honda Fit", 2009, 3000, "2004-01-01", "214.00", "3", "=E3*F3"],
    ["Honda CRV", 2010, 6000, "2003-01-01", "56.11", "2", "=E4*F4"],
  ];

  // Render component
  return (
    <>
      <Spreadsheet ref={spreadsheet}>
        <Worksheet data={data} />
      </Spreadsheet>
      <select ref={select}>
        <option value="0">Column 1</option>
        <option value="1">Column 2</option>
        <option value="2">Column 3</option>
        <option value="3">Column 4</option>
      </select>
      <input
        type="button"
        value="Sort column"
        onClick={() => spreadsheet.current[0].orderBy(select.current.value)}
      />
    </>
  );
}
```

```vue
<template>
  <Spreadsheet ref="spreadsheet">
    <Worksheet :data="data" />
  </Spreadsheet>
  <select ref="select">
    <option value="0">Column 1</option>
    <option value="1">Column 2</option>
    <option value="2">Column 3</option>
    <option value="3">Column 4</option>
  </select>
  <input type="button" value="Sort column" @click="sortColumn" />
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
    const spreadsheet = ref(null);
    const select = ref(null);

    const data = [
      ["Mazda", 2001, 2000, "2006-01-01", "453.00", "2", "=E1*F1"],
      ["Peugeot", 2010, 5000, "2005-01-01", "23.00", "5", "=E2*F2"],
      ["Honda Fit", 2009, 3000, "2004-01-01", "214.00", "3", "=E3*F3"],
      ["Honda CRV", 2010, 6000, "2003-01-01", "56.11", "2", "=E4*F4"],
    ];

    const sortColumn = () => {
      const columnIndex = select.value.value;
      spreadsheet.value.current[0].orderBy(columnIndex);
    };

    return {
      spreadsheet,
      select,
      data,
      sortColumn,
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

@Component({
    standalone: true,
    selector: "app-root",
    template: `
        <div #spreadsheet></div>
        <select id='columnNumber'>
        <option value='0'>Column 1</option>
        <option value='1'>Column 2</option>
        <option value='2'>Column 3</option>
        <option value='3'>Column 4</option>
        </select>
        <input type='button' value='Sort column'
            (click)="this.worksheets[0].orderBy(this.select.nativeElement.value)">`
})
export class AppComponent {
    @ViewChild("spreadsheet") spreadsheet: ElementRef;
    @ViewChild("select") select: ElementRef;
    // Worksheets
    worksheets: jspreadsheet.worksheetInstance[];
    // Create a new data grid
    ngAfterViewInit() {
        // Create spreadsheet
        this.worksheets = jspreadsheet(this.spreadsheet.nativeElement, {
            worksheets: [{
                data: [
                    ['Mazda', 2001, 2000, '2006-01-01', '453.00', '2', '=E1*F1'],
                    ['Peugeot', 2010, 5000, '2005-01-01', '23.00', '5', '=E2*F2'],
                    ['Honda Fit', 2009, 3000, '2004-01-01', '214.00', '3', '=E3*F3'],
                    ['Honda CRV', 2010, 6000, '2003-01-01', '56.11', '2', '=E4*F4'],
                ]
            }]
        });
    }
}
```

### Custom Sorting Handler

The example below demonstrates how to customize spreadsheet sorting behaviour using the `sorting` property.

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

  <script>
    // Create the spreadsheet
    jspreadsheet(document.getElementById("spreadsheet"), {
      worksheets: [
        {
          data: [
            ["Spreadsheets", 1],
            ["Grids", 2],
            ["Tables", 3],
            ["Plugins", 4],
            ["", ""],
            ["", ""],
            ["", ""],
            ["", ""],
          ],
          columns: [
            { type: "text", width: 200 },
            { type: "text", width: 400 },
          ],
        },
      ],
      sorting: function (direction, column) {
        return function (a, b) {
          let valueA = a[1];
          let valueB = b[1];

          // Consider blank rows in the sorting
          if (!direction) {
            return valueA > valueB ? 1 : valueA < valueB ? -1 : 0;
          } else {
            return valueA > valueB ? -1 : valueA < valueB ? 1 : 0;
          }
        };
      },
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
    ["Spreadsheets", 1],
    ["Grids", 2],
    ["Tables", 3],
    ["Plugins", 4],
    ["", ""],
    ["", ""],
    ["", ""],
    ["", ""],
  ];
  // Columns
  const columns = [
    { type: "text", width: 200 },
    { type: "text", width: 400 },
  ];
  // Sorting handler
  const sorting = (direction, column) => {
    return (a, b) => {
      let valueA = a[1];
      let valueB = b[1];

      // Consider blank rows in the sorting
      if (!direction) {
        return valueA > valueB ? 1 : valueA < valueB ? -1 : 0;
      } else {
        return valueA > valueB ? -1 : valueA < valueB ? 1 : 0;
      }
    };
  };

  // Render component
  return (
    <Spreadsheet ref={spreadsheet} sorting={sorting}>
      <Worksheet data={data} columns={columns} />
    </Spreadsheet>
  );
}
```

```vue
<template>
  <Spreadsheet ref="spreadsheet" :sorting="sorting">
    <Worksheet :data="data" :columns="columns" />
  </Spreadsheet>
</template>

<script>
import { Spreadsheet, Worksheet } from "@jspreadsheet-ce/vue";
import "jsuites/dist/jsuites.css";
import "jspreadsheet-ce/dist/jspreadsheet.css";

// Create the data grid component
export default {
  components: {
    Spreadsheet,
    Worksheet,
  },
  methods: {
    // Sorting handler
    sorting(direction, column) {
      return (a, b) => {
        let valueA = a[1];
        let valueB = b[1];

        // Consider blank rows in the sorting
        if (!direction) {
          return valueA > valueB ? 1 : valueA < valueB ? -1 : 0;
        } else {
          return valueA > valueB ? -1 : valueA < valueB ? 1 : 0;
        }
      };
    },
  },
  data() {
    // Data
    const data = [
      ["Spreadsheets", 1],
      ["Grids", 2],
      ["Tables", 3],
      ["Plugins", 4],
      ["", ""],
      ["", ""],
      ["", ""],
      ["", ""],
    ];
    // Columns
    const columns = [
      { type: "text", width: 200 },
      { type: "text", width: 400 },
    ];

    return {
      data,
      columns,
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

@Component({
    standalone: true,
    selector: "app-root",
    template: `<div #spreadsheet></div>`
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
                    ['Spreadsheets', 1],
                    ['Grids', 2],
                    ['Tables', 3],
                    ['Plugins', 4],
                    ['', ''],
                    ['', ''],
                    ['', ''],
                    ['', ''],
                ],
                columns: [
                    { type: 'text', width:200 },
                    { type: 'text', width:400 },
                ],
            }],
            sorting: function(direction, column) {
                return function(a, b) {
                    let valueA = a[1];
                    let valueB = b[1];

                    // Consider blank rows in the sorting
                    if (! direction) {
                        return (valueA > valueB) ? 1 : (valueA < valueB) ? -1 : 0;
                    } else {
                        return (valueA > valueB) ? -1 : (valueA < valueB) ? 1 : 0;
                    }
                }
            }
        });
    }
}
```
