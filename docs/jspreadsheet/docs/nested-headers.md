title: Data Grid Nested Headers
keywords: Jspreadsheet, Jexcel, data grid, JavaScript, spreadsheet, data tables, nested headers, hierarchical column headers, nested header customization, header hierarchy
description: Learn to enhance Jspreadsheet data grids with hierarchical column headers.

# Data Grid Nested Headers

This section covers creating spreadsheets with nested headers.

## Documentation

### Initial Settings

Learn how to generate a new spreadsheet containing nested headers.

| Property                                                                               | Description                          |
| -------------------------------------------------------------------------------------- | ------------------------------------ |
| `nestedHeaders: { id?: string, colspan?: number; title?: string; align?: string;}[][]` | Worksheet nested header definitions. |

## Examples

### Nested Header Example

The example below demonstrates a basic configuration for nested headers in a JSS spreadsheet.

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
    let table = jspreadsheet(document.getElementById("spreadsheet"), {
      worksheets: [
        {
          data: [
            ["BR", "Cheese", 1],
            ["CA", "Apples", 0],
            ["US", "Carrots", 1],
            ["GB", "Oranges", 0],
          ],
          columns: [
            {
              type: "autocomplete",
              title: "Country",
              width: "200px",
            },
            {
              type: "dropdown",
              title: "Food",
              width: "100px",
              source: ["Apples", "Bananas", "Carrots", "Oranges", "Cheese"],
            },
            {
              type: "checkbox",
              title: "Stock",
              width: "100px",
            },
            {
              type: "number",
              title: "Price",
              width: "100px",
            },
          ],
          minDimensions: [6, 4],
          nestedHeaders: [
            [
              {
                title: "Supermarket information",
                colspan: "6",
              },
            ],
            [
              {
                title: "Location",
                colspan: "1",
              },
              {
                title: " Other Information",
                colspan: "2",
              },
              {
                title: " Costs",
                colspan: "3",
              },
            ],
          ],
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
    ["BR", "Cheese", 1],
    ["CA", "Apples", 0],
    ["US", "Carrots", 1],
    ["GB", "Oranges", 0],
  ];
  // Columns
  const columns = [
    {
      type: "autocomplete",
      title: "Country",
      width: "200px",
    },
    {
      type: "dropdown",
      title: "Food",
      width: "100px",
      source: ["Apples", "Bananas", "Carrots", "Oranges", "Cheese"],
    },
    {
      type: "checkbox",
      title: "Stock",
      width: "100px",
    },
    {
      type: "number",
      title: "Price",
      width: "100px",
    },
  ];
  // Nested headers
  const nestedHeaders = [
    [
      {
        title: "Supermarket information",
        colspan: "8",
      },
    ],
    [
      {
        title: "Location",
        colspan: "1",
      },
      {
        title: " Other Information",
        colspan: "2",
      },
      {
        title: " Costs",
        colspan: "5",
      },
    ],
  ];
  // Render component
  return (
    <>
      <Spreadsheet ref={spreadsheet}>
        <Worksheet
          data={data}
          columns={columns}
          nestedHeaders={nestedHeaders}
          minDimensions={[8, 4]}
        />
      </Spreadsheet>
    </>
  );
}
```

```vue
<template>
  <Spreadsheet ref="spreadsheet">
    <Worksheet
      :data="data"
      :columns="columns"
      :nestedHeaders="nestedHeaders"
      :minDimensions="[8, 4]"
    />
  </Spreadsheet>
</template>

<script setup>
import { ref } from "vue";
import { Spreadsheet, Worksheet } from "@jspreadsheet-ce/vue";
import "jsuites/dist/jsuites.css";
import "jspreadsheet-ce/dist/spreadsheet.css";

// Data
const data = ref([
  ["BR", "Cheese", 1],
  ["CA", "Apples", 0],
  ["US", "Carrots", 1],
  ["GB", "Oranges", 0],
]);

// Columns
const columns = ref([
  {
    type: "autocomplete",
    title: "Country",
    width: "200px",
  },
  {
    type: "dropdown",
    title: "Food",
    width: "100px",
    source: ["Apples", "Bananas", "Carrots", "Oranges", "Cheese"],
  },
  {
    type: "checkbox",
    title: "Stock",
    width: "100px",
  },
  {
    type: "number",
    title: "Price",
    width: "100px",
  },
]);

// Nested headers
const nestedHeaders = ref([
  [
    {
      title: "Supermarket information",
      colspan: "8",
    },
  ],
  [
    {
      title: "Location",
      colspan: "1",
    },
    {
      title: " Other Information",
      colspan: "2",
    },
    {
      title: " Costs",
      colspan: "5",
    },
  ],
]);

const spreadsheet = ref(null);
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
                    ['BR', 'Cheese', 1],
                    ['CA', 'Apples', 0],
                    ['US', 'Carrots', 1],
                    ['GB', 'Oranges', 0],
                ],
                columns: [
                    {
                        type: 'autocomplete',
                        title: 'Country',
                        width: '200px'
                    },
                    {
                        type: 'dropdown',
                        title: 'Food',
                        width: '100px',
                        source: ['Apples','Bananas','Carrots','Oranges','Cheese']
                    },
                    {
                        type: 'checkbox',
                        title: 'Stock',
                        width: '100px'
                    },
                    {
                        type: 'number',
                        title: 'Price',
                        width: '100px'
                    },
                ],
                minDimensions: [8,4],
                nestedHeaders:[
                    [
                        {
                            title: 'Supermarket information',
                            colspan: '8',
                        },
                    ],
                    [
                        {
                            title: 'Location',
                            colspan: '1',
                        },
                        {
                            title: ' Other Information',
                            colspan: '2'
                        },
                        {
                            title: ' Costs',
                            colspan: '5'
                        }
                    ],
                ]
            }]
        });
    }
}
```

### More Examples

Explore a working example of a JSS [spreadsheet with nested headers](https://jsfiddle.net/spreadsheet/0nwh5u71/) that updates programmatically on JSFiddle.
