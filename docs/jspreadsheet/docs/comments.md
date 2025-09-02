title: Data Grid Cell Comments
keywords: Jspreadsheet, Jexcel, Data Grid, JavaScript, Excel-like features, Spreadsheet, Cell comments, Cell comments methods, Cell comments events, Cell comments settings
description: Learn how to add, manage, and customize comments in Jspreadsheet data grid cells using built-in methods, events, and settings.

# Data Grid Cell Comments

## Overview

This guide explains how to manage and add comments to data grid cells in Jspreadsheet, similar to the features found in Excel or Google Sheets. You can add comments programmatically or through the context menu, enabling annotations and additional information for specific cell contents.

## Documentation

### Methods

The following methods allow you to get or set comments on one or multiple data grid cells.

| Method        | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `getComments` | Retrieve comments from a specific cell or the entire data grid.<br/>@param `cell` - Cell name. If null or undefined, returns comments for all cells.<br/>`worksheetInstance.getComments(cell?: string): Record<string, string> \| string;`                                                                                                                                                                                                                        |
| `setComments` | Add, update, or remove a comment.<br/>@param `cellId` - Cell name.<br/>@param `comments` - New comment. If null, removes the comment from the cell.<br/>`worksheetInstance.setComments(cellId: string, comments: string): void;`<br/><br/>Handle multiple cells:<br/>@param `cellId` - Object where keys are cell names and values are cell comments. Null values remove the comments.<br/>`worksheetInstance.setComments(cellId: Record<string, string>): void;` |

### Events

The `onbeforecomments` event allows you to intercept, modify, or cancel the action of adding a new comment.

| Event                 | Description                                                                                                                                                                                                                                                                                                                                                                                   |
| --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `oncomments`{.nowrap} | Triggered when a comment is modified.<br/>@param `instance` - The worksheet instance where the change occurred.<br/>@param `newComments` - Object containing updated comments.<br/>@param `oldComments` - Object containing previous comments.<br/>`oncomments(instance: WorksheetInstance, newComments: Record<string, string \| null>, oldComments: Record<string, string \| null>): void;` |

### Initial Settings

These properties can be configured during the initialization of the spreadsheet.

| Property                 | Description                                                                            |
| ------------------------ | -------------------------------------------------------------------------------------- |
| `allowComments: boolean` | Enable or disable the ability for users to add new comments to cells.                  |
| `comments: object`       | Object containing the initial comments. Example: `{ A1: 'test', B1: 'another test' }`. |

## Examples

### Data Grid with Comments

Initialize a Jspreadsheet data grid with predefined comments and interact with them programmatically using `setComments` and `getComments`.

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
  <p>
    <input type="button" id="bt1" value="Set A1 comments" />
    <input type="button" id="bt2" value="Get A1 comments" />
    <input type="button" id="bt3" value="Reset A1 comments" />
  </p>

  <script>
    let worksheets = jspreadsheet(document.getElementById("spreadsheet"), {
      worksheets: [
        {
          data: [
            ["US", "Cheese", "2019-02-12"],
            ["CA", "Apples", "2019-03-01"],
            ["CA", "Carrots", "2018-11-10"],
            ["BR", "Oranges", "2019-01-12"],
          ],
          columns: [{ width: "300px" }, { width: "200px" }, { width: "200px" }],
          allowComments: true,
          comments: {
            B1: "Initial comments on B1",
            C1: "Initial comments on C1",
          },
        },
      ],
      oncomments: function () {
        console.log(arguments);
      },
    });

    document.getElementById("bt1").onclick = function () {
      worksheets[0].setComments("A1", "Test");
    };
    document.getElementById("bt2").onclick = function () {
      alert(worksheets[0].getComments("A1"));
    };
    document.getElementById("bt3").onclick = function () {
      worksheets[0].setComments("A1", "");
    };
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

  const data = [
    ["US", "Cheese", "2019-02-12"],
    ["CA", "Apples", "2019-03-01"],
    ["CA", "Carrots", "2018-11-10"],
    ["BR", "Oranges", "2019-01-12"],
  ];

  const columns = [{ width: "300px" }, { width: "200px" }, { width: "200px" }];

  const comments = {
    B1: "Initial comments on B1",
    C1: "Initial comments on C1",
  };

  const oncomments = () => {
    console.log(arguments);
  };

  return (
    <>
      <Spreadsheet ref={spreadsheet} oncomments={oncomments}>
        <Worksheet
          data={data}
          columns={columns}
          comments={comments}
          allowComments
        />
      </Spreadsheet>
      <input
        type="button"
        value="Set A1 comments"
        onClick={() => spreadsheet.current[0].setComments("A1", "Test")}
      />
      <input
        type="button"
        value="Get A1 comments"
        onClick={() => alert(spreadsheet.current[0].getComments("A1"))}
      />
      <input
        type="button"
        value="Reset A1 comments"
        onClick={() => spreadsheet.current[0].setComments("A1", "")}
      />
    </>
  );
}
```

```vue
<template>
  <Spreadsheet ref="spreadsheetRef" @comments="oncomments">
    <Worksheet :data="data" :columns="columns" :comments="comments" />
  </Spreadsheet>
  <input
    type="button"
    value="Set A1 comments"
    @click="setComments('A1', 'Test')"
  />
  <input type="button" value="Get A1 comments" @click="getComments('A1')" />
  <input
    type="button"
    value="Reset A1 comments"
    @click="setComments('A1', '')"
  />
</template>

<script setup>
import { ref } from "vue";
import { Spreadsheet, Worksheet } from "@jspreadsheet-ce/vue";
import "jsuites/dist/jsuites.css";
import "jspreadsheet-ce/dist/spreadsheet.css";

// Spreadsheet ref
const spreadsheetRef = ref(null);

// Data
const data = ref([
  ["US", "Cheese", "2019-02-12"],
  ["CA", "Apples", "2019-03-01"],
  ["CA", "Carrots", "2018-11-10"],
  ["BR", "Oranges", "2019-01-12"],
]);

// Columns configuration
const columns = ref([
  { width: "300px" },
  { width: "200px" },
  { width: "200px" },
]);

// Initial comments
const comments = ref({
  B1: "Initial comments on B1",
  C1: "Initial comments on C1",
});

// Method to get comments
const getComments = (cell) => {
  if (spreadsheetRef.value) {
    alert(spreadsheetRef.value.current[0].getComments(cell));
  }
};

// Method to set comments
const setComments = (cell, title) => {
  if (spreadsheetRef.value) {
    spreadsheetRef.value.current[0].setComments(cell, title);
  }
};

// Comments callback method
const oncomments = (worksheet) => {
  console.log(worksheet);
};
</script>
```

```angularjs
import { Component, ViewChild, ElementRef } from "@angular/core";
import jspreadsheet from "jspreadsheet-ce";

import "jsuites/dist/jsuites.css";
import "jspreadsheet-ce/dist/jspreadsheet.css";

@Component({
    standalone: true,
    selector: "app-root",
    template: `<div #spreadsheet></div>
        <input type="button" value="Set A1 comments" (click)="setA1Comments()"/>
        <input type="button" value="Get A1 comments" (click)="getA1Comments()"/>
        <input type="button" value="Reset A1 comments" (click)="resetA1Comments()"/>`
})
export class AppComponent {
    @ViewChild("spreadsheet") spreadsheet: ElementRef;
    worksheets: jspreadsheet.worksheetInstance[];

    ngAfterViewInit() {
        this.worksheets = jspreadsheet(this.spreadsheet.nativeElement, {
            worksheets: [
                {
                    data: [
                        ['US', 'Cheese', '2019-02-12'],
                        ['CA', 'Apples', '2019-03-01'],
                        ['CA', 'Carrots', '2018-11-10'],
                        ['BR', 'Oranges', '2019-01-12'],
                    ],
                    columns: [
                        { width: '300px' },
                        { width: '200px' },
                        { width: '200px' },
                    ],
                    allowComments: true,
                    comments: {
                        B1: 'Initial comments on B1',
                        C1: 'Initial comments on C1'
                    },
                }
            ],
            oncomments: function () {
                console.log(arguments);
            }
        });
    }

    setA1Comments() {
        // Set a comment on cell A1
        this.worksheets[0].setComments('A1', 'This is a comment for A1');
    }

    getA1Comments() {
        // Get the comment from cell A1
        const comment = this.worksheets[0].getComments('A1');
        console.log('Comment on A1:', comment);
    }

    resetA1Comments() {
        // Reset the comment on cell A1
        this.worksheets[0].setComments('A1', '');
    }
}
```

### Batch Update for Multiple Cells

The `setComments` method supports adding comments to multiple cells simultaneously by passing an object, optimizing performance and avoiding unnecessary history entries.

{.ignore}

```javascript
// Create the spreadsheet
let worksheets = jspreadsheet(document.getElementById("spreadsheet"), {
  worksheets: [
    {
      minDimensions: [10, 10],
      allowComments: true,
    },
  ],
});

worksheets[0].setComments({
  A1: "Comment on A1",
  B1: "Comments on B1",
});
```
