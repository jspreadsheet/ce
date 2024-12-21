title: Jspreadsheet: Undo & Redo History
keywords: Jspreadsheet, Jexcel, JavaScript data grid, undo, redo, Ctrl+Z, Ctrl+Y, spreadsheet change tracking, action history, data revisions, Jspreadsheet history
description: Discover how to manage action history in Jspreadsheet with undo and redo features, allowing easy tracking of data grid changes and control over modifications.

# History Tracker

The Jspreadsheet History Tracker captures all changes within each spreadsheet, enabling users to undo (CTRL+Z) and redo (CTRL+Y) actions. In Jspreadsheet CE, the history tracker operates independently for each worksheet.

{.pro}
> #### What you can find on the Pro Version
>
> In the Pro version of Jspreadsheet, the unified history tracker supports cross-spreadsheet calculations and integration across all spreadsheets displayed on the same screen.
> 
> \
> [Learn more](https://jspreadsheet.com/docs/history){.button}


## Documentation

### Methods

The undo and redo methods are normally invoked by the CTRL+Z, CTRL+Y keyboard shortcut. The following methods can be called programmatically, as follows:

| Method   | Description                                                                     |
|----------|---------------------------------------------------------------------------------|
| `undo()`   | Undo the last worksheet change.<br/>`worksheet.undo() : void`                   |
| `redo()`   | Redo the most recent worksheet change.<br/>`worksheet.redo() : void`            |

### Events

Events related to the history changes tracker.

| Event    | Description                                                                                                              |
|----------|--------------------------------------------------------------------------------------------------------------------------|
| `onredo` | `onredo(worksheet: Object, info: Object) : null`<br/>The info array contains all necessary information about the action. |
| `onundo` | `onundo(worksheet: Object, info: Object) : null`<br/>The info array contains all necessary information about the action. |


### History Tracker State

Use the history tracker with caution. You can turn it off temporarily by setting `worksheet.ignoreHistory` to true.

## Examples

### Controlling the changes programmatically

As explained above, the history actions are available on the spreadsheet level. 

```html
<html>
<script src="https://bossanova.uk/jspreadsheet/v5/jspreadsheet.js"></script>
<script src="https://jsuites.net/v5/jsuites.js"></script>
<link rel="stylesheet" href="https://bossanova.uk/jspreadsheet/v5/jspreadsheet.css" type="text/css" />
<link rel="stylesheet" href="https://jsuites.net/v5/jsuites.css" type="text/css" />

<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Material+Icons" />

<div id='spreadsheet'></div>

<p><input type="button" value="Undo" id="btn1" />
<input type="button" value="Redo" id="btn2" />

<script>
// Create the spreadsheet
let spreadsheet = jspreadsheet(document.getElementById('spreadsheet'), {
    worksheets: [{
        minDimensions: [6, 6],
    }],
});

document.getElementById("btn1").onclick = () => spreadsheet[0].undo()
document.getElementById("btn2").onclick = () => spreadsheet[0].redo()
</script>
</html>
```
```jsx
import React, { useRef } from "react";
import { Spreadsheet, Worksheet, jspreadsheet } from "@jspreadsheet-ce/react";
import "jsuites/dist/jsuites.css";
import "jspreadsheet-ce/dist/jspreadsheet.css";

export default function App() {
    // Spreadsheet array of worksheets
    const spreadsheet = useRef();

    // Render component
    return (
        <>
            <Spreadsheet ref={spreadsheet}>
                <Worksheet minDimensions={[5,5]} />
            </Spreadsheet>
            <button onClick={() => spreadsheet.current[0].undo()}>Undo</button>
            <button onClick={() => spreadsheet.current[0].redo()}>Redo</button>
        </>
    );
}
```
```vue
<template>
    <Spreadsheet ref="spreadsheet">
        <Worksheet :min-dimensions="[8,8]" />
    </Spreadsheet>
    <input type="button" value="Undo" @click="undo" />
    <input type="button" value="Redo" @click="redo" />
</template>

<script>
import { ref } from "vue";
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

        const undo = () => {
            if (spreadsheet.value) {
                spreadsheet.value.current[0].undo();
            }
        };

        const redo = () => {
            if (spreadsheet.value) {
                spreadsheet.value.current[0].redo();
            }
        };

        return {
            spreadsheet,
            undo,
            redo,
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
    template: `<div #spreadsheet></div>
        <input type="button" value="Undo" (click)="this.worksheets[0].undo()" />
        <input type="button" value="Redo" (click)="this.worksheets[0].redo()" />`,
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
                minDimensions: [8, 8],
            }],
        });
    }
}
```

