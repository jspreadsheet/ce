title: Custom Excel-Like Formulas  
keywords: Jspreadsheet, Jexcel, data grid, JavaScript, Excel-like formulas, formulas, calculations, spreadsheet calculations, spreadsheet formulas, spreadsheet-like formulas, Excel formulas, Google Sheet formulas, event handling, customizations, internationalization  
description: Learn how to create custom Excel-like formulas using Jspreadsheet, with examples for implementing advanced calculations and formula features.

# Custom Formulas

## Overview

Jspreadsheet allows developers to create custom Excel-like formulas and methods. These formulas can interact with APIs, return specific outputs, and render dynamic content or DOM elements directly within cells. This feature enables the development of highly interactive and dynamic spreadsheet applications.

{.green}

> **IMPORTANT:** All custom method names must be capitalized.

### Example

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
    // Create a custom javascript method (capital case)
    const NEGATIVE = function (v) {
      return -1 * v;
    };

    // Send custom formula to the correct scope
    formula.setFormula({ NEGATIVE });

    // Create spreadsheet
    jspreadsheet(document.getElementById("spreadsheet"), {
      worksheets: [
        {
          data: [
            ["1000", "=NEGATIVE(A1)"],
            ["2000", "=NEGATIVE(A2)"],
            ["3000", "=NEGATIVE(A3)"],
          ],
        },
      ],
    });
  </script>
</html>
```

```jsx
import React, { useRef } from "react";
import { Spreadsheet, Worksheet, jspreadsheet } from "@jspreadsheet-ce/react";
import "jsuites/dist/jsuites.css";
import "jspreadsheet-ce/dist/jspreadsheet.css";

import formula from "@jspreadsheet/formula";

// Create a custom javascript method (capital case)
const NEGATIVE = function (v) {
  return -1 * v;
};

// Send custom formula to the correct scope
formula.setFormula({ NEGATIVE });

// Create the component
export default function App() {
  // Array with all the data grids
  const spreadsheet = useRef();
  // Data
  const data = [
    ["1000", "=NEGATIVE(A1)"],
    ["2000", "=NEGATIVE(A2)"],
    ["3000", "=NEGATIVE(A3)"],
  ];

  // Render data grid component
  return (
    <Spreadsheet ref={spreadsheet}>
      <Worksheet data={data} />
    </Spreadsheet>
  );
}
```

```vue
<template>
  <Spreadsheet ref="spreadsheet">
    <Worksheet :data="data" />
  </Spreadsheet>
</template>

<script setup>
import { ref } from "vue";
import { Spreadsheet, Worksheet } from "@jspreadsheet-ce/vue";
import "jsuites/dist/jsuites.css";
import "jspreadsheet-ce/dist/jspreadsheet.css";

import formula from "@jspreadsheet/formula";

// Custom NEGATIVE formula
const NEGATIVE = function (v) {
  return -1 * v;
};

// Send the custom formula to the correct scope
formula.setFormula({ NEGATIVE });

// Create data grid
const data = ref([
  ["1000", "=NEGATIVE(A1)"],
  ["2000", "=NEGATIVE(A2)"],
  ["3000", "=NEGATIVE(A3)"],
]);
</script>
```

```angularjs
import { Component, ViewChild, ElementRef } from "@angular/core";
import jspreadsheet from "jspreadsheet-ce";

import "jspreadsheet-ce/dist/jspreadsheet.css"
import "jsuites/dist/jsuites.css"

// Create a custom javascript method (capital case)
const NEGATIVE = function(v) {
    return -1 * v;
}

// Send the custom formula to the correct scope
formula.setFormula({ NEGATIVE })

// Create the data grid component
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
                    [ '1000', '=NEGATIVE(A1)' ],
                    [ '2000', '=NEGATIVE(A2)' ],
                    [ '3000', '=NEGATIVE(A3)' ],
                ]
            }]
        });
    }
}
```

{.pro}

> #### Formula Pro
>
> The Formula Pro extension enhances custom formula creation by providing execution context, including the origin cell (x, y), the worksheet, and the ability for developers to return DOM elements directly to the cell via the formula.
> <br><br> > [Learn more](https://jspreadsheet.com/products/formulas){.button}
