title: Spreadsheet Headers
keywords: Jspreadsheet, Jexcel, data grids, JavaScript data grid, Excel-like headers, column title, headers, data grid headers, column headers, customize headers, modify headers, spreadsheet customization, column title customization, data grid organization
description: Customize and modify column headers in your data grids. Explore programmatic header updates and advanced options for organizing and managing your data grid.

# Spreadsheet Headers

This section explains how to create and modify custom headers in Jspreadsheet. Users can change header titles via the context menu or by performing a long click on the header.

## Documentation

### Methods

You can update the headers programmatically using the following methods.

| Method     | Description                                                                                                                                                                                                                                                                                      |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| getHeaders | Get all header titles.<br/>@param `asArray` - If true, returns the items in an array, if false, returns them separated by ";" within a single string.<br/>`worksheetInstance.getHeaders(asArray?: boolean): string \| string[];`                                                                 |
| getHeader  | Get the column title.<br/>@param `column` - Column index.<br/>`worksheetInstance.getHeader(column: number): string;`                                                                                                                                                                             |
| setHeader  | Sets a custom header title for a specified column (starting at zero).<br/>@param `column` - column number starting on zero.<br/>@param `newValue` - New title. Empty string or undefined to reset the header title. <br/>`worksheetInstance.setHeader(column: number, newValue?: string): void;` |

### Initial Settings

To customize headers, use the `title` and `tooltip` attributes in the column settings.

{.ignore}

```html
<script>
  jspreadsheet(document.getElementById("spreadsheet"), {
    worksheets: [
      {
        columns: [
          {
            type: "text",
            title: "Country",
            tooltip: "This is the country",
            width: "300px",
          },
        ],
      },
    ],
  });
</script>
```

### Available Events

| Event          | Description                                                                                                                                                |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| onchangeheader | Triggered when the header title is changed.<br/>`onchangeheader(instance: WorksheetInstance, colIndex: number, newValue: string, oldValue: string): void;` |

## Examples

### Updates to the Headers

The following example initializes the spreadsheet with basic headers and demonstrates how to update the titles programmatically.

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
          minDimensions: [6, 6],
          columns: [
            { title: "Header 1" },
            { title: "Header 2" },
            { title: "Header 3" },
          ],
        },
      ],
    });

    // Programmatically update the header titles
    table[0].setHeader(0, "New Header 1");
    table[0].setHeader(1, "New Header 2");
    table[0].setHeader(2, "New Header 3");
  </script>
</html>
```

```jsx
import React, { useRef, useEffect } from "react";
import { Spreadsheet, Worksheet } from "@jspreadsheet-ce/react";
import "jsuites/dist/jsuites.css";
import "jspreadsheet-ce/dist/jspreadsheet.css";

export default function App() {
  // Spreadsheet array of worksheets
  const spreadsheet = useRef();

  const columns = [
    { title: "Header 1" },
    { title: "Header 2" },
    { title: "Header 3" },
  ];

  useEffect(() => {
    if (spreadsheet.current) {
      spreadsheet.current[0].setHeader(0, "New Header 1");
      spreadsheet.current[0].setHeader(1, "New Header 2");
      spreadsheet.current[0].setHeader(2, "New Header 3");
    }
  }, []);

  // Render component
  return (
    <>
      <Spreadsheet ref={spreadsheet}>
        <Worksheet minDimensions={[6, 6]} columns={columns} />
      </Spreadsheet>
    </>
  );
}
```

```vue
<template>
  <Spreadsheet ref="spreadsheet">
    <Worksheet :minDimensions="[6, 6]" :columns="columns" />
  </Spreadsheet>
</template>

<script>
import { ref, onMounted } from "vue";
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

    const columns = [
      { title: "Header 1" },
      { title: "Header 2" },
      { title: "Header 3" },
    ];

    onMounted(() => {
      if (spreadsheet.value) {
        const instance = spreadsheet.value.current[0];
        instance.setHeader(0, "New Header 1");
        instance.setHeader(1, "New Header 2");
        instance.setHeader(2, "New Header 3");
      }
    });

    return {
      spreadsheet,
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
            minDimensions: [6,6],
            columns: [
                { title: 'Header 1' },
                { title: 'Header 2' },
                { title: 'Header 3' }
            ],
        });

        // Programmatically update the header titles
        this.worksheets[0].setHeader(0, 'New Header 1');
        this.worksheets[0].setHeader(1, 'New Header 2');
        this.worksheets[0].setHeader(2, 'New Header 3');
    }
}
```
