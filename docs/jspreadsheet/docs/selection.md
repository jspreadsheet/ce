title: Spreadsheet Selection
keywords: Jspreadsheet, Jexcel, data grid, JavaScript, excel-like selection, spreadsheet selection, cell selection, data grid selection, selection methods, range selection, multiple cell selection
description: This section covers the properties, events, and methods for managing data grid selections, including range and multiple cell selection.

# Spreadsheet Selection

This section covers the technical aspects of handling spreadsheet selections in Jspreadsheet, detailing the key properties, events, and methods for managing selection behaviour.

{.pro}
> #### What You Can Find in the Pro Version
> The Pro version of Jspreadsheet enhances selection capabilities, offering features commonly found in advanced spreadsheet software:
> - **Non-consecutive selection**: Users can hold `Ctrl` to select multiple ranges at once;
> - **Custom borders**: Supports different border colours, which are helpful in real-time collaboration for identifying different users or creating custom features;\
>
>\
> [Learn more](https://jspreadsheet.com/docs/selection){.button}

## Documentation

### Methods

The following methods manage selections in the Jspreadsheet data grid.

#### Main Selection

| Method                               | Description                                                                                                                                                                                                                        |
|--------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `getSelection`                       | Get the coordinates of the main selection.<br/>`getSelection(preserveOrder: Boolean) : Array \| null`                                                                                                                              |
| `getHighlighted`                     | Get the coordinates of the highlighted selections.<br/>`getHighlighted() : Array \| null`                                                                                                                                          |
| `getRange`                           | Get the range description of the highlighted cells.<br/>`getRange() : String \| null`                                                                                                                                              |
| `getSelectedColumns`                 | Get the selected columns.<br/>@param `visibleOnly` - If true, the method returns only visible columns.<br/>`worksheetInstance.getSelectedColumns(visibleOnly?: boolean): number[];`                                                                                                                                                  |
| `getSelectedRows`                    | Get the selected rows.<br/>@param `visibleOnly` - If true, the method returns only visible rows.<br/>`worksheetInstance.getSelectedRows(visibleOnly?: boolean): number[];`                                                                                                                                                        |
| `getSelected`                        | Get the worksheet selected cell names or objects. <br/>@param {Boolean?} columnNameOnly: To get only the cell names as string (true). Get the cell coordinates as an object (false).  `worksheetInstance.getSelected(columnNameOnly: Boolean) => []` |
| `isSelected`                         | Verify if the coordinates given are included in the current selection.<br/>`isSelected(x: Number, y: Number) : Boolean`                                                                                                            |
| `selectAll`                          | Select all cells available in the data grid.<br/>`worksheetInstance.selectAll(): void;`                                                                                                                                                              |
| `updateSelectionFromCoords`{.nowrap} | Select cells based on the given coordinates.<br/>@param `x1` - Column index of the first cell of the selection. If omitted or null, rows "y1" through "y2" are selected.<br/>@param `y1` - Row index of the first cell of the selection. If omitted or null, columns "x1" through "x2" are selected.<br/>@param `x2` - Column index of the last cell of the selection. Default: Parameter "x1".<br/>@param `y2` - Row index of the last cell of the selection. Default: Parameter "y1".<br/>`worksheetInstance.updateSelectionFromCoords: (x1: number \| null, y1: number \| null, x2?: number \| null, y2?: number \| null): void;`                                                                                            |
| `resetSelection`                     | Remove the selection.<br/>@returns If there were highlighted cells, it returns 1, otherwise it returns 0.<br/>`worksheetInstance.resetSelection(): 0 \| 1;`                                                                                                                                                                                |


 ### Selection Events

| Event                        | Description                                                                                                                                                                         |
|------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `onblur`                     | Occurs when the table is blurred.<br/>`onblur(instance: WorksheetInstance): void;`                                                                                                  |
| `onfocus`                    | Occurs when the table is focused.<br/>`onfocus(instance: WorksheetInstance): void;`                                                                                                 |
| `onbeforeselection`{.nowrap} | `onbeforeselection(worksheet: Object, x1: Number, y1: Number, x2: Number, y2: Number, e: MouseEvent) : void`                                                                        |
| `onselection`                | `onselection(instance: WorksheetInstance, borderLeftIndex: number, borderTopIndex: number, borderRightIndex: number, borderBottomIndex: number, origin: Event \| undefined): void;` |

 
### Initial Settings

| Property                | Description                  |
|-------------------------|------------------------------|
| `selectionCopy: boolean`  | Disable the clone selection. |


## Examples

### Programmatically Data Grid Selection

Demonstrates how to select all cells within a worksheet in the grid programmatically.

```html
<html>
<script src="https://bossanova.uk/jspreadsheet/v5/jspreadsheet.js"></script>
<script src="https://jsuites.net/v5/jsuites.js"></script>
<link rel="stylesheet" href="https://bossanova.uk/jspreadsheet/v5/jspreadsheet.css" type="text/css" />
<link rel="stylesheet" href="https://jsuites.net/v5/jsuites.css" type="text/css" />

<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Material+Icons" />

<div id="spreadsheet"></div>

<p>
<input type="button" value="Select all" id="btn1" />
<input type="button" value="updateSelectionFromCoords(2,2,3,3)" id="btn2" /></p>

<script>
// Create the spreadsheet
let table = jspreadsheet(document.getElementById('spreadsheet'), {
    worksheets: [{
        minDimensions: [6,6],
    }],
});

document.getElementById("btn1").onclick = () => table[0].selectAll();
document.getElementById("btn2").onclick = () => table[0].updateSelectionFromCoords(2,2,3,3);
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
    // Render component
    return (
        <>
            <Spreadsheet ref={spreadsheet}>
                <Worksheet minDimensions={[6,6]} />
            </Spreadsheet>
            <button onClick={() => spreadsheet.current[0].selectAll()}>Select all</button>
            <button onClick={() => spreadsheet.current[0].updateSelectionFromCoords(2,2,3,3)}>Select coords (2,2,3,3)</button>
        </>
    );
}
```
```vue
<template>
    <Spreadsheet ref="spreadsheet">
        <Worksheet :minDimensions="[6,6]" />
    </Spreadsheet>
    <input type="button" value="Select all" @click="selectAll" />
    <input type="button" value="Select coords (2,2,3,3)" @click="updateSelectionFromCoords(2,2,3,3)" />
</template>

<script>
import { ref } from 'vue';
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

        const updateSelectionFromCoords = (...args) => {
            spreadsheet.value.current[0].updateSelectionFromCoords(...args);
        };

        const selectAll = () => {
            spreadsheet.value.current[0].selectAll();
        };

        return {
            spreadsheet,
            updateSelectionFromCoords,
            selectAll
        };
    }
}
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
        <input type="button" value="Select all" (click)="this.worksheets[0].selectAll()" />
        <input type="button" value="Select coords (2,2,3,3)" (click)="this.worksheets[0].updateSelectionFromCoords(2,2,3,3)" />`
})
export class AppComponent {
    @ViewChild("spreadsheet") spreadsheet: ElementRef;
    // Worksheets
    worksheets: jspreadsheet.worksheetInstance[];
    // Create a new data grid
    ngAfterViewInit() {
        // Create spreadsheet
        this.worksheets = jspreadsheet(this.spreadsheet.nativeElement, {
            worksheets: [
                {
                    minDimensions: [6,6],
                }
            ]
        });
    }
}
```
