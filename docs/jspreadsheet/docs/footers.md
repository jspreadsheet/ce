title: Data Grid Footers
keywords: Jspreadsheet, Jexcel, data grid, JavaScript, Excel-like footer, spreadsheet footers, table footers, summary calculations, status bar, floating footers, worksheet footers
description: Spreadsheet footers let you display information such as formulas and data summaries at the bottom of the grid for easy reference and visibility.

# Data Grid Footers

Jspreadsheet footers enable you to display information, including calculations or summaries, at the bottom of a data grid. This section explains implementing footers during initialization or dynamically at runtime using available methods and settings.

## Documentation

### Initial Settings

The following properties are available during the initialization of the Jspreadsheet data grid:

| Property           | Description                       |
| ------------------ | --------------------------------- |
| footers?: string[] | Defines the footers for the grid. |

## Examples

### Programmatic updates

How to change the formulas in the footers after the initialization.

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
    let worksheets = jspreadsheet(document.getElementById("spreadsheet"), {
      worksheets: [
        {
          data: [
            ["Cheese", 10, 6.0],
            ["Apples", 5, 4.0],
            ["Carrots", 5, 1.0],
            ["Oranges", 6, 2.0],
          ],
          footers: [["Total", "=SUM(B1:B4)", "=SUM(C1:C4)"]],
          columns: [{ width: "400px" }],
        },
      ],
    });
  </script>
</html>
```

```jsx
import React, { useRef } from "react";
import { Spreadsheet, Worksheet } from "@jspreadsheet-ce/react";
import jSuites from "jsuites";
import "jsuites/dist/jsuites.css";
import "jspreadsheet-ce/style.css";

// Create a new data grid
export default function App() {
  // Spreadsheet array of worksheets
  const spreadsheet = useRef();
  // Data
  const data = [
    ["Cheese", 10, 6.0],
    ["Apples", 5, 4.0],
    ["Carrots", 5, 1.0],
    ["Oranges", 6, 2.0],
  ];
  // Columns
  const columns = [{ width: "400px" }];
  // Data grid cell definitions
  const footers = [["Total", "=SUM(B1:B4)", "=SUM(C1:C4)"]];

  // Render data grid component
  return (
    <Spreadsheet ref={spreadsheet}>
      <Worksheet data={data} columns={columns} footers={footers} />
    </Spreadsheet>
  );
}
```

```vue
<template>
  <Spreadsheet ref="spreadsheet">
    <Worksheet :data="data" :columns="columns" :footers="footers" />
  </Spreadsheet>
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
    // Data
    const data = ref([
      ["Cheese", 10, 6.0, "=B1*C1"],
      ["Apples", 5, 4.0, "=B2*C2"],
      ["Carrots", 5, 1.0, "=B3*C3"],
      ["Oranges", 6, 2.0, "=B4*C4"],
    ]);

    // Columns
    const columns = ref([{ width: "400px" }]);

    // Data grid cell definitions
    const footers = ref([["Total", "=SUM(B1:B4)", "=SUM(C1:C4)"]]);

    return {
      data,
      columns,
      footers,
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
    standalone: true,
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
                data: [
                    ['Cheese', 10, 6.00],
                    ['Apples', 5, 4.00],
                    ['Carrots', 5, 1.00],
                    ['Oranges', 6, 2.00],
                ],
                footers: [
                    [
                        'Total',
                        '=SUM(B1:B4)',
                        '=SUM(C1:C4)',
                    ]
                ],
                columns: [
                    { width:'400px' }
                ]
            }]
        });
    }
}
```
