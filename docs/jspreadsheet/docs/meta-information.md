title: Data Grid Cell Meta Information
keywords: Jspreadsheet, Jexcel, data grid, JavaScript, excel-like features, spreadsheet meta information, cell meta information, hidden metadata in cells, hidden data in Jspreadsheet, data grid meta information, cell metadata management, managing hidden metadata, storing additional information in cells, Jspreadsheet cell properties, cell meta information methods, data grid customization
description: Jspreadsheet allows you to store hidden metadata in cells, enabling advanced customization and control over data grid behavior.

# Data Grid Cell Meta Information

The cell meta information feature allows you to store hidden metadata in cells, which is invisible to users. This feature helps track additional information or manage custom states. This guide explains how to set, retrieve, and reset metadata in Jspreadsheet.

> Meta information is managed programmatically and does not have a visible interface.

## Documentation

### Methods

Here are the main methods for managing cell meta information:

| Method      | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
|-------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `getMeta`   | Get meta information from one or all cells.<br/>@param `cell` - Cell name. If it is a falsy value, the metadata of all cells is returned.<br/>`worksheetInstance.getMeta(cell?: string): any;`                                                                                                                                                                                                                                                                               |
| `setMeta`   | Set a property on a cell's meta information.<br/>@param `cellName` - Cell name.<br/>@param `key` - Property name.<br/>@param `value` - Property value.<br/>`worksheetInstance.setMeta(cellName: string, key: string, value: string): void;`<br/><br/>Remove current and define new meta information for one or more cells.<br/>@param `newMeta` - Object with the new meta information.<br/>`worksheetInstance.setMeta(newMeta: Record<string, Record<string, any>>): void;` |

### Events

Jspreadsheet emits an event when cell meta information is changed. This event allows developers to track or react to metadata changes.

| Event           | Description                                                                       |
|-----------------|-----------------------------------------------------------------------------------|
| `onchangemeta`  | `onchangemeta(instance: WorksheetInstance, cellName: Record<string, any>): void;` |

### Initial Settings

You can initialize Jspreadsheet with predefined meta information for cells. The `meta` property allows setting this information during grid initialization.

| Property                                    | Description                                 |
|---------------------------------------------|---------------------------------------------|
| `meta: Record<string, Record<string, any>>` | Defines initial meta information for cells. |

### Use Cases for Meta Information

- **Tracking User Actions**: Use meta information to store data about user actions, such as edit history or validation status for each cell.
- **Custom Data**: Store custom information such as IDs, statuses, or other data that doesn't need to be visible to users but is essential for backend processing.

## Examples

Here are examples of how to use the `getMeta`, `setMeta`, and `resetMeta` methods to manage metadata in Jspreadsheet.

### Basic Meta Information Example

This example demonstrates how to set and get meta information programmatically:

```html
<html>
<script src="https://bossanova.uk/jspreadsheet/v5/jspreadsheet.js"></script>
<script src="https://jsuites.net/v5/jsuites.js"></script>
<link rel="stylesheet" href="https://bossanova.uk/jspreadsheet/v5/jspreadsheet.css" type="text/css" />
<link rel="stylesheet" href="https://jsuites.net/v5/jsuites.css" type="text/css" />

<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Material+Icons" />

<div id="spreadsheet"></div>

<script>
// Initialize the spreadsheet
let spreadsheet = jspreadsheet(document.getElementById('spreadsheet'), {
    worksheets: [{
        data: [
            ['Apple', 'Banana'],
            ['Orange', 'Pineapple']
        ],
        columns: [
            { width: 100 },
            { width: 100 }
        ],
        // Initial meta information
        meta: {
            A1: { category: 'Fruit', id: '123' },
            B1: { category: 'Fruit', id: '124' }
        }
    }]
});
// Set meta information for B2
spreadsheet[0].setMeta('B2', 'category', 'Citrus');
// Get meta information for A1
console.log(spreadsheet[0].getMeta('A1'));
</script>
</html>
```
```jsx
import React, { useRef, useEffect } from "react";
import { Spreadsheet, Worksheet } from "@jspreadsheet-ce/react";
import "jsuites/dist/jsuites.css";
import "jspreadsheet-ce/dist/jspreadsheet.css";

export default function App() {
    const spreadsheet = useRef();

    const data = [
        ['Apple', 'Banana'],
        ['Orange', 'Pineapple']
    ]

    const columns = [
        { width: 100 },
        { width: 100 }
    ]

    const meta = {
        A1: { category: 'Fruit', id: '123' },
        B1: { category: 'Fruit', id: '124' }
    }

    useEffect(() => {
        if (spreadsheet.current) {
            spreadsheet.current[0].setMeta('B2', 'category', 'Citrus');

            console.log(spreadsheet.current[0].getMeta('A1'));
        }
    }, [])

    return (
        <>
            <Spreadsheet ref={spreadsheet}>
                <Worksheet data={data} columns={columns} meta={meta} />
            </Spreadsheet>
        </>
    )
}
```
```vue
<template>
  <Spreadsheet ref="spreadsheet">
      <Worksheet 
          :data="data" 
          :columns="columns" 
          :meta="meta" 
      />
  </Spreadsheet>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Spreadsheet, Worksheet } from "@jspreadsheet-ce/vue";
import "jsuites/dist/jsuites.css";
import "jspreadsheet-ce/dist/spreadsheet.css";

// Spreadsheet ref
const spreadsheet = ref(null);

// Data
const data = ref([
  ['Apple', 'Banana'],
  ['Orange', 'Pineapple']
]);

// Columns configuration
const columns = ref([
  { width: 100 },
  { width: 100 }
]);

const meta = ref({
  A1: { category: 'Fruit', id: '123' },
  B1: { category: 'Fruit', id: '124' }
});

// Lifecycle hook equivalent to useEffect
onMounted(() => {
  if (spreadsheet.value && spreadsheet.value[0]) {
      spreadsheet.value[0].setMeta('B2', 'category', 'Citrus');

      console.log(spreadsheet.value.current[0].getMeta('A1'));
  }
});
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
                    ['Apple', 'Banana'],
                    ['Orange', 'Pineapple']
                ],
                columns: [
                    { width: 100 },
                    { width: 100 }
                ],
                // Initial meta information
                meta: {
                    A1: { category: 'Fruit', id: '123' },
                    B1: { category: 'Fruit', id: '124' }
                }
            }],
        });

        // Set meta information for B2
        this.worksheets[0].setMeta('B2', 'category', 'Citrus');
        // Get meta information for A1
        console.log(this.worksheets[0].getMeta('A1'));
    }
}
```

### Interacting with Meta Information Programmatically

You can interact with cell meta information at any point during runtime, either to store or retrieve hidden data that can be used for various features:

#### Set meta information for multiple cells

{.ignore}
```javascript
spreadsheet[0].setMeta({
    A1: { category: 'Fruit', id: '123' },
    B2: { category: 'Citrus', id: '125' }
});
```

#### Get all meta information

{.ignore}
```javascript
let allMeta = spreadsheet[0].getMeta(null);
console.log(allMeta);
```

### Batch Meta Information Reset

You can reset the meta information for multiple cells or for all cells in a spreadsheet. This example demonstrates how to reset metadata for specific cells:

{.ignore}
```javascript
spreadsheet[0].resetMeta(['A1', 'B2', 'C2']);
```

### Working Example

For a working example of how to interact with meta information in a Jspreadsheet grid, check out this [Data Grid Meta Information](https://jsfiddle.net/spreadsheet/vauo24ws/) example on JSFiddle.
