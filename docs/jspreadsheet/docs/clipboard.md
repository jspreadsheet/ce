title: Jspreadsheet Clipboard
keywords: Jspreadsheet, Jexcel, data grid, JavaScript, Excel-like formulas, spreadsheet data, worksheet data, manage spreadsheet data, change cell data, update worksheet data
description: Explore Jspreadsheet’s clipboard methods and events, enabling seamless copy-paste operations for managing and updating data within your spreadsheets.

# Data Grid Clipboard

## Overview

The clipboard in Jspreadsheet offers a comprehensive set of features that facilitate copying and pasting data between Jspreadsheet instances and other spreadsheet software, such as Excel or Google Sheets. These features include automatic formula updates, data overwriting during paste actions, and custom event handling.

This section details the methods and events you can use to control clipboard behaviour, customize paste actions, and ensure smooth interoperability between different data grids.

### Key Features

- **Automatic Formula Updates**: When pasting data containing formulas, Jspreadsheet automatically updates the formulas to match the new data context;
- **Data Overwriting**: Jspreadsheet supports data overwriting during paste actions, giving you fine-grained control over pasted data handling;
- **Custom Events**: You can hook into specific clipboard-related events to customize the behaviour of copy-paste operations, including validation, transformation, and data filtering;

{.pro}

> #### What you can find on the Pro Version
>
> The **Pro version** of Jspreadsheet includes additional clipboard capabilities, enhancing your experience with formatting, styles, and formula reference updates:
>
> - **Copy and Paste Formatting**: When using the Pro version, not only data but also cell formats (like font styles, borders, and colours) and styles are transferred during copy-paste actions.
> - **Formula Reference Updates**: The Pro version ensures that pasted formulas automatically adjust their references according to the new locations, maintaining the integrity of your spreadsheet formulas.\
>
> \
> [Learn more](https://jspreadsheet.com/docs/clipboard){.button}

## Documentation

### Clipboard Management Methods

Jspreadsheet provides methods to control clipboard operations, allowing smooth data transfers between spreadsheets or external tools like Excel.

| Method  | Description                                                                                                                                                                                                                                                                                                                                                       |
| ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `copy`  | Copies or cuts the contents of selected cells in the worksheet.<br/>@param `cut` - If true, the operation is cut, if not, it is copy. <br/>`worksheetInstance.copy(cut?: boolean): void;` <br/> **Example**: `worksheetInstance.copy(true)` to cut the data.                                                                                                      |
| `paste` | Paste data at a coordinate.Pastes content into one or more cells.<br/>@param `x` - Column index of the cell from which the content will be pasted.<br/>@param `y` - Row index of the cell from which the content will be pasted.<br/>@param `data` - Content to be pasted.<br/>`worksheetInstance.paste(x: number, y: number, data: string): false \| undefined;` |

### Clipboard Operation Events

These events let you hook into clipboard operations like copy and paste, providing greater control over how data is transferred or manipulated.

| Event                    | Description                                                                                                                                                                                                                                                                                                     |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `oncopy`                 | Fires when data is copied to the clipboard. Use this to inspect or modify the copied data before it goes to the clipboard. <br/>`oncopy(instance: WorksheetInstance, selectedRange: [number, number, number, number], copiedData: string, cut: boolean \| undefined): string \| false \| undefined;`            |
| `onbeforepaste`{.nowrap} | Fires before pasting occurs, allowing you to validate or transform the incoming data. You can also cancel the paste if needed. <br/>`onbeforepaste(instance: WorksheetInstance, copiedText: { value: CellValue }[][], colIndex: number \| string, rowIndex: number \| string): undefined \| boolean \| string;` |
| `onpaste`                | Fires after the paste action is completed. Useful for post-processing or triggering additional actions after the paste. <br/>`onpaste(instance: WorksheetInstance, pastedInfo: { x: number, y: number, value: CellValue }[][]): void;`                                                                          |

> **Note**
> In Jspreadsheet CE, it is not possible to cancel or modify the clipboard value during the oncopy event.

## Examples

### Intercept Pasted Data

You can intercept and cancel the paste event if needed.

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
          minDimensions: [6, 6],
        },
      ],
      onbeforepaste: function () {
        alert("Not allowed to paste");
        return false;
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
    ["Mazda", 2001, 2000],
    ["Peugeot", 2010, 5000],
    ["Honda Fit", 2009, 3000],
    ["Honda CRV", 2010, 6000],
  ];

  const onbeforepaste = function () {
    alert("Not allowed to paste");
    return false;
  };

  // Render data grid component
  return (
    <Spreadsheet ref={spreadsheet} onbeforepaste={onbeforepaste}>
      <Worksheet data={data} />
    </Spreadsheet>
  );
}
```

```vue
<template>
  <Spreadsheet ref="spreadsheetRef" :onbeforepaste="onbeforepaste">
    <Worksheet :data="data" />
  </Spreadsheet>
</template>

<script setup>
import { ref } from "vue";
import { Spreadsheet, Worksheet } from "@jspreadsheet-ce/vue";
import "jsuites/dist/jsuites.css";
import "jspreadsheet-ce/dist/spreadsheet.css";

// Spreadsheet ref
const spreadsheetRef = ref(null);

// Data
const data = [
  ["Mazda", 2001, 2000],
  ["Peugeot", 2010, 5000],
  ["Honda Fit", 2009, 3000],
  ["Honda CRV", 2010, 6000],
];

// Paste interception method
const onbeforepaste = () => {
  alert("Not allowed to paste");
  return false;
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
                minDimensions: [6,6],
            }],
            onbeforepaste: function() {
                alert('Not allowed to paste');
                return false;
            }
        });
    }
}
```
