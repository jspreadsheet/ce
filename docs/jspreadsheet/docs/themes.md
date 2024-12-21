title: Jspreadsheet CE Theme Editor - Customize Your Data Grid Styles
keywords: Jspreadsheet, data grid customization, JavaScript spreadsheet, Excel-like applications, theme editor, visual styling, colour customization, dynamic themes, interactive spreadsheets, web-based spreadsheet tool
description: Customize your Jspreadsheet data grid with the Theme Editor for unique, visually appealing designs, including colour and dynamic theme options that align with your application’s style.
canonical: https://bossanova.uk/jspreadsheet/docs/themes

# Data Grid Theme Editor

The Data Grid Theme Editor is an online tool for customizing spreadsheet colours in Jspreadsheet. To enable this feature, add the CSS file jspreadsheet.themes.css to your project. Then, configure the CSS variables, as shown in the example below, to implement your custom theme.

{.green}
> To use themes in Jspreadsheet, include `jspreadsheet.themes.css` in your project and add the CSS variables as shown in the example below.

<lm-themes></lm-themes>

{.ignore-execution}
```html
<html>
<script src="https://bossanova.uk/jspreadsheet/v5/jspreadsheet.js"></script>
<script src="https://jsuites.net/v5/jsuites.js"></script>
<link rel="stylesheet" href="https://bossanova.uk/jspreadsheet/v5/jspreadsheet.css" type="text/css" />
<link rel="stylesheet" href="https://bossanova.uk/jspreadsheet/v5/jspreadsheet.themes.css" type="text/css" />
<link rel="stylesheet" href="https://jsuites.net/v5/jsuites.css" type="text/css" />

<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Material+Icons" />

<div id="spreadsheet"></div>

<script>

// Create the spreadsheet
jspreadsheet(document.getElementById('spreadsheet'), {
    worksheets: [
        {
            minDimensions: [6,10],
        }
    ]
});
</script>
```
```jsx
import React, { useRef, useState } from "react";
import { Spreadsheet, Worksheet } from "@jspreadsheet/react";

import "jsuites/dist/jsuites.css";
import "jspreadsheet-ce/dist/jspreadsheet.css";
import 'jspreadsheet/dist/jspreadsheet.themes.css';


export default function App() {
    // Spreadsheet array of worksheets
    const spreadsheet = useRef();
    // Render component
    return (
        <Spreadsheet ref={spreadsheet}>
            <Worksheet />
        </Spreadsheet>
    );
}
```
```vue
<template>
    <Spreadsheet>
        <Worksheet />
    </Spreadsheet>
</template>

<script>
import { Spreadsheet, Worksheet } from "@jspreadsheet-ce/vue";

import "jsuites/dist/jsuites.css";
import "jspreadsheet-ce/dist/jspreadsheet.css";
import 'jspreadsheet/dist/jspreadsheet.themes.css';


export default {
    components: {
        Spreadsheet,
        Worksheet
    },
}
</script>
```
```angularjs
import { Component, ViewChild, ElementRef } from "@angular/core";
import jspreadsheet from "jspreadsheet-ce";

import "jspreadsheet-ce/dist/jspreadsheet.css"
import "jsuites/dist/jsuites.css"

import 'jspreadsheet/dist/jspreadsheet.themes.css';



@Component({
    standalone: true,
    selector: "app-root",
    template: `<div #spreadsheet></div>`;
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
                minDimensions: [10,10],
            }]
        });
    }
}
```
