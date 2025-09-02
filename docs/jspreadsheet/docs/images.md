title: Data Grid Cell Images
keywords: Jspreadsheet, Jexcel, data grid, JavaScript, spreadsheet images, cell images, floating images, image handling, image customization, image placement, image integration
description: Enhance data representation by embedding images directly in your data grid cells.

# Spreadsheet Images

This section demonstrates how to embed images directly into data grid cells.

{.pro}

> ### What you can find on the Pro Version
>
> The Pro version of Jspreadsheet supports **floating images** compatible with Excel and Google Sheets, along with programmatic methods and events.\
> \
> [Learn more](https://jspreadsheet.com/docs/media){.button}

## Examples

### Column type image editor

Configure an image upload editor to insert an image in every cell across an entire column.

{.small}
Double-click in the image cell to upload a new image.

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
            [
              "Test Icon",
              "data:image/svg+xml;base64,CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBoZWlnaHQ9IjI0cHgiIHZpZXdCb3g9IjAgLTk2MCA5NjAgOTYwIiB3aWR0aD0iMjRweCIgZmlsbD0iIzVmNjM2OCI+PHBhdGggZD0iTTI4MC0yODBoMTYwdi0xNjBIMjgwdjE2MFptMjQwIDBoMTYwdi0xNjBINTIwdjE2MFpNMjgwLTUyMGgxNjB2LTE2MEgyODB2MTYwWm0yNDAgMGgxNjB2LTE2MEg1MjB2MTYwWk0yMDAtMTIwcS0zMyAwLTU2LjUtMjMuNVQxMjAtMjAwdi01NjBxMC0zMyAyMy41LTU2LjVUMjAwLTg0MGg1NjBxMzMgMCA1Ni41IDIzLjVUODQwLTc2MHY1NjBxMCAzMy0yMy41IDU2LjVUNzYwLTEyMEgyMDBabTAtODBoNTYwdi01NjBIMjAwdjU2MFptMC01NjB2NTYwLTU2MFoiLz48L3N2Zz4=",
            ],
          ],
          minDimensions: [2, 4],
          columns: [
            { type: "text", width: 300, title: "Title" },
            { type: "image", width: 120, title: "Image" },
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
  const spreadsheet = useRef();

  const worksheets = [
    {
      data: [
        [
          "Test Icon",
          "data:image/svg+xml;base64,CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBoZWlnaHQ9IjI0cHgiIHZpZXdCb3g9IjAgLTk2MCA5NjAgOTYwIiB3aWR0aD0iMjRweCIgZmlsbD0iIzVmNjM2OCI+PHBhdGggZD0iTTI4MC0yODBoMTYwdi0xNjBIMjgwdjE2MFptMjQwIDBoMTYwdi0xNjBINTIwdjE2MFpNMjgwLTUyMGgxNjB2LTE2MEgyODB2MTYwWm0yNDAgMGgxNjB2LTE2MEg1MjB2MTYwWk0yMDAtMTIwcS0zMyAwLTU2LjUtMjMuNVQxMjAtMjAwdi01NjBxMC0zMyAyMy41LTU2LjVUMjAwLTg0MGg1NjBxMzMgMCA1Ni41IDIzLjVUODQwLTc2MHY1NjBxMCAzMy0yMy41IDU2LjVUNzYwLTEyMEgyMDBabTAtODBoNTYwdi01NjBIMjAwdjU2MFptMC01NjB2NTYwLTU2MFoiLz48L3N2Zz4=",
        ],
      ],
      minDimensions: [2, 4],
      columns: [
        { type: "text", width: 300, title: "Title" },
        { type: "image", width: 120, title: "Image" },
      ],
    },
  ];

  return (
    <>
      <Spreadsheet ref={spreadsheet} worksheets={worksheets} />
    </>
  );
}
```

```vue
<template>
  <div>
    <Spreadsheet ref="spreadsheet" :worksheets="worksheets" />
  </div>
</template>

<script>
import { ref } from "vue";
import { Spreadsheet } from "jspreadsheet-ce";
import "jsuites/dist/jsuites.css";
import "jspreadsheet-ce/dist/spreadsheet.css";

export default {
  name: "App",
  components: {
    Spreadsheet,
  },
  setup() {
    const spreadsheet = ref(null);

    const worksheets = ref([
      {
        data: [
          [
            "Test Icon",
            "data:image/svg+xml;base64,CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBoZWlnaHQ9IjI0cHgiIHZpZXdCb3g9IjAgLTk2MCA5NjAgOTYwIiB3aWR0aD0iMjRweCIgZmlsbD0iIzVmNjM2OCI+PHBhdGggZD0iTTI4MC0yODBoMTYwdi0xNjBIMjgwdjE2MFptMjQwIDBoMTYwdi0xNjBINTIwdjE2MFpNMjgwLTUyMGgxNjB2LTE2MEgyODB2MTYwWm0yNDAgMGgxNjB2LTE2MEg1MjB2MTYwWk0yMDAtMTIwcS0zMyAwLTU2LjUtMjMuNVQxMjAtMjAwdi01NjBxMC0zMyAyMy41LTU2LjVUMjAwLTg0MGg1NjBxMzMgMCA1Ni41IDIzLjVUODQwLTc2MHY1NjBxMCAzMy0yMy41IDU2LjVUNzYwLTEyMEgyMDBabTAtODBoNTYwdi01NjBIMjAwdjU2MFptMC01NjB2NTYwLTU2MFoiLz48L3N2Zz4=",
          ],
        ],
        minDimensions: [2, 4],
        columns: [
          { type: "text", width: 300, title: "Title" },
          { type: "image", width: 120, title: "Image" },
        ],
      },
    ]);

    return {
      spreadsheet,
      worksheets,
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
            worksheets: [{
              data: [
                  ['Test Icon', 'data:image/svg+xml;base64,CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBoZWlnaHQ9IjI0cHgiIHZpZXdCb3g9IjAgLTk2MCA5NjAgOTYwIiB3aWR0aD0iMjRweCIgZmlsbD0iIzVmNjM2OCI+PHBhdGggZD0iTTI4MC0yODBoMTYwdi0xNjBIMjgwdjE2MFptMjQwIDBoMTYwdi0xNjBINTIwdjE2MFpNMjgwLTUyMGgxNjB2LTE2MEgyODB2MTYwWm0yNDAgMGgxNjB2LTE2MEg1MjB2MTYwWk0yMDAtMTIwcS0zMyAwLTU2LjUtMjMuNVQxMjAtMjAwdi01NjBxMC0zMyAyMy41LTU2LjVUMjAwLTg0MGg1NjBxMzMgMCA1Ni41IDIzLjVUODQwLTc2MHY1NjBxMCAzMy0yMy41IDU2LjVUNzYwLTEyMEgyMDBabTAtODBoNTYwdi01NjBIMjAwdjU2MFptMC01NjB2NTYwLTU2MFoiLz48L3N2Zz4='],
              ],
              minDimensions: [2,4],
              columns: [
                  { type:'text', width:300, title:'Title' },
                  { type:'image', width:120, title:'Image' },
              ],
            }],
        });
    }
}
```
