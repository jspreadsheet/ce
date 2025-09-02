title: Data Grid Filters
keywords: Jspreadsheet, data grid filters, JavaScript, Excel-like functionality, spreadsheet filters, column filters, filter methods, filter events, filter customization
description: Explore detailed insights into Jspreadsheet data grid column filters, including settings, methods, and related events.

# Spreadsheet Column Filters

This section provides details about the row filters in Jspreadsheet CE.

{.pro}

> #### Differences in the Pro Version
>
> The Pro version provides multi-column filters, support for filtering specific columns or cell ranges, sorting ranges, additional events, and extensive customization options, with excellent compatibility with other spreadsheet software.\
> \
> [Learn more](https://jspreadsheet.com/docs/filters){.button}

## Documentation

### Methods

| Method           | Description                                                                               |
| ---------------- | ----------------------------------------------------------------------------------------- |
| `openFilter()`   | Opens the filter input.<br/>`openFilter(columnNumber: Number, getAsSets?: boolean): void` |
| `closeFilter()`  | Closes the filter input.<br/>`closeFilter(): void`                                        |
| `resetFilters()` | Resets all applied filters.<br/>`resetFilters(): void`                                    |

### Initial Settings

| Property                   | Description                                                      |
| -------------------------- | ---------------------------------------------------------------- |
| `filters: boolean\|string` | Start the spreadsheet with the filters enabled. `Default: false` |

#### Enabling Spreadsheet Filters

To activate a filter for a specific column, use the filter attribute in the column object during spreadsheet initialization:

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
    jspreadsheet(document.getElementById("spreadsheet"), {
      worksheets: [
        {
          data: [
            ["Jazz", "Honda"],
            ["Civic", "Honda"],
            ["Civic", "Honda"],
            ["Picanto", "Kia"],
            ["Optima", "Kia"],
          ],
          filters: true,
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
  const spreadsheet = useRef(null);
  // Data
  const data = [
    ["Jazz", "Honda"],
    ["Civic", "Honda"],
    ["Civic", "Honda"],
    ["Picanto", "Kia"],
    ["Optima", "Kia"],
  ];
  // Render component
  return (
    <>
      <Spreadsheet ref={spreadsheet}>
        <Worksheet data={data} filters={true} />
      </Spreadsheet>
    </>
  );
}
```

```vue
<template>
  <Spreadsheet ref="spreadsheetRef">
    <Worksheet :data="data" :filters="true" />
  </Spreadsheet>
</template>

<script setup>
import { ref } from "vue";
import { Spreadsheet, Worksheet } from "@jspreadsheet-ce/vue";
import "jsuites/dist/jsuites.css";
import "jspreadsheet-ce/dist/jspreadsheet.css";

// Data
const data = ref([
  ["Jazz", "Honda"],
  ["Civic", "Honda"],
  ["Civic", "Honda"],
  ["Picanto", "Kia"],
  ["Optima", "Kia"],
]);

// Spreadsheet ref
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
                    ['Jazz', 'Honda'],
                    ['Civic', 'Honda'],
                    ['Civic', 'Honda'],
                    ['Picanto', 'Kia'],
                    ['Optima', 'Kia'],
                ],
                filters: true,
            }],
        });
    }
}
```
