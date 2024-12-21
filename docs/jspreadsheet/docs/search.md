title: Data Grid Search
keywords: Jspreadsheet, data grid search, JavaScript, Excel-like search functionality, spreadsheet search, search customization, search event handling, row filtering
description: Explore search functionality in Jspreadsheet, including methods and events to filter rows and customize search behaviour for specific application requirements.

# Data Grid Search

The Jspreadsheet's search functionality filters rows using keyword matching, offering flexibility to modify or terminate operations based on application needs. This section details the technical methods and events for customizing search behaviour.


{.pro}
> #### Differences in the Pro Version
> Jspreadsheet Pro allows complete customization of search operations, including events to highlight results, customize search criteria, or integrate with the backend.\
> \
> [Learn more](https://jspreadsheet.com/docs/search){.button}

## Documentation

### Methods

The following methods are used to implement and manage search functionality in the spreadsheet:

| Method        | Description                                                                                                                                       |
|---------------|---------------------------------------------------------------------------------------------------------------------------------------------------|
| `search`      | Searches for rows containing the specified terms.<br/>@param `query` - Text to be searched.<br/>`worksheetInstance.search(query: string): void;`  |
| `resetSearch` | Resets search terms and displays all rows.<br/>`worksheetInstance.resetSearch(): void;`                                                           |  

### Initial Settings

The following property is available to configure the search functionality during spreadsheet initialization:

| Property          | Description                             |
|-------------------|-----------------------------------------|
| `search: boolean` | Enables or disables the search feature. |


## Examples

### Data Grid with Search and Pagination

The example below demonstrates a data grid configured with search functionality and pagination support.

```html
<html>
<script src="https://bossanova.uk/jspreadsheet/v5/jspreadsheet.js"></script>
<script src="https://jsuites.net/v5/jsuites.js"></script>
<link rel="stylesheet" href="https://bossanova.uk/jspreadsheet/v5/jspreadsheet.css" type="text/css" />
<link rel="stylesheet" href="https://jsuites.net/v5/jsuites.css" type="text/css" />

<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Material+Icons" />

<div id="spreadsheet"></div>

<p><input type='button' value='Search for APP' id="btn1" /></p>

<script>
// Create the spreadsheet
let worksheets = jspreadsheet(document.getElementById('spreadsheet'), {
    worksheets: [{
        csv: '/tests/demo.csv',
        csvHeaders: true,
        search: true,
        pagination: 10,
        paginationOptions: [10,25,50,100],
        columns: [
            { type:'text', width:80 },
            { type:'text', width:100 },
            { type:'text', width:100 },
            { type:'text', width:200 },
            { type:'text', width:100 },
        ],
    }]
});

document.getElementById("btn1").onclick = () => worksheets[0].search('app');
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
    // Columns
    const columns = [
        { type:'text', width:80 },
        { type:'text', width:100 },
        { type:'text', width:100 },
        { type:'text', width:200 },
        { type:'text', width:100 },
    ]

    // Render component
    return (
        <>
            <Spreadsheet ref={spreadsheet}>
                <Worksheet
                    columns={columns}
                    csv="/tests/demo.csv"
                    csvHeaders
                    search
                    pagination="10"
                    paginationOptions={[10,25,50,100]} />
            </Spreadsheet>
            <button onClick={() => spreadsheet.current[0].search('app')}>Search for APP</button>
        </>
    );
}
```
```vue
<template>
  <Spreadsheet ref="spreadsheet">
      <Worksheet
          :columns="columns"
          :csv="/tests/demo.csv"
          csvHeaders
          search
          :pagination="10"
          :paginationOptions="[10,25,50,100]"
      />
  </Spreadsheet>
  <input type='button' value='Search for APP' @click="search" />
</template>

<script>
import { ref } from 'vue';
import { Spreadsheet, Worksheet } from "@jspreadsheet-ce/vue";
import "jsuites/dist/jsuites.css";
import "jspreadsheet-ce/dist/spreadsheet.css";

export default {
  components: {
      Spreadsheet,
      Worksheet,
  },
  setup() {
      const spreadsheet = ref(null);

      const columns = [
          { type:'text', width:80 },
          { type:'text', width:100 },
          { type:'text', width:100 },
          { type:'text', width:200 },
          { type:'text', width:100 },
      ];

      const search = () => {
          spreadsheet.value.current[0].search('app');
      };

      return {
          spreadsheet,
          columns,
          search
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

// Create component
@Component({
    standalone: true,
    selector: "app-root",
    template: `<div #spreadsheet></div>
        <input type='button' value='Search for APP' (click)="this.worksheets[0].search('app')" />`,
})
export class AppComponent {
    @ViewChild("spreadsheet") spreadsheet: ElementRef;
    // Worksheets
    worksheets: jspreadsheet.worksheetInstance[];
    // Create a new data grid
    ngAfterViewInit() {
        // Create spreadsheet
        this.worksheets = jspreadsheet(this.spreadsheet.nativeElement, {
            csv: '/tests/demo.csv',
            csvHeaders: true,
            search: true,
            pagination: 10,
            paginationOptions: [10,25,50,100],
            columns: [
                { type:'text', width:80 },
                { type:'text', width:100 },
                { type:'text', width:100 },
                { type:'text', width:200 },
                { type:'text', width:100 },
            ],
        });
    }
}
```
 
## Related Content

- [Data Grid Pagination](/jspreadsheet/docs/pagination)

