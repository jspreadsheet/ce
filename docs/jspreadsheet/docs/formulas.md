title: Excel-Like Formulas in Jspreadsheet CE
keywords: Jspreadsheet, Jexcel, data grid, JavaScript, Excel-like formulas, spreadsheet formulas, calculations, spreadsheet calculations, custom formulas, web-based spreadsheets, internationalization
description: Implement Excel-like formulas in your web app with Jspreadsheet CE for dynamic, browser-based spreadsheets.

# Excel-Like Formulas

Jspreadsheet supports Excel-like formulas compatible with popular spreadsheet applications such as Excel and Google Sheets. These features enable advanced calculation capabilities, including:

- Excel-style Formulas: Customizable formulas resembling Excel.
- Formula Auto-update: Adjusts on cell actions such as copy and paste.
- Custom Formulas: Create your custom formulas.

{.pro}
> #### Formula Pro
> 
> Jspreadsheet Pro's Formula Pro Extension provides a suite of advanced features designed to enhance spreadsheet functionality, including:
> 
> - Full-stack applications;
> - Secure private scopes;
> - Cross-sheet calculations;
> - complex matrix operations;
> - Advanced operators ('%', '@');
> - Dynamic range calculations (e.g., A:A, 1:1);
>
>\
> [More about Formula Pro](https://jspreadsheet.com/products/formulas){.button}


## Documentation

This section details the settings, methods, and events associated with spreadsheet calculations in Jspreadsheet. All formula names, including custom ones, should be capitalized for security and standardization.

### Settings

A summary of configurations related to the use of formulas.

| Configuration                    | Description                                                       |
|----------------------------------|-------------------------------------------------------------------|
| secureFormulas?: boolean         | Enable formula security. Default: true                            |
| parseFormulas?: boolean          | Enable formula calculations. Default: true                        |
| debugFormulas?: boolean          | Enable the formula debug notices. Default: false                  |
| autoIncrement?: boolean          | Formula variable increment on cloning or copying. Default: true   |


### Events

All events related to formulas.

| Event                      | Description                                                                                                                                  |
| ---------------------------|----------------------------------------------------------------------------------------------------------------------------------------------|
| onbeforeformula?: Function | Intercept and modify a formula before execution.<br/>onbeforeformula(worksheet: Object, expression: String, x: Number, y: Number) => String  |


### Methods

All methods related to formulas.

| Method                    | Description                                                                                                     |
| --------------------------|-----------------------------------------------------------------------------------------------------------------|
| executeFormula?: Function | Execute a formula.<br/>executeFormula(expression: string, x?: number, y?: number, caching?: boolean) => String  |


## Examples

### Basic excel-like formulas usage

A basic spreadsheet example using formulas, including currency, percentage and mask.


```html
<html>
<script src="https://bossanova.uk/jspreadsheet/v5/jspreadsheet.js"></script>
<script src="https://jsuites.net/v5/jsuites.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v5/jsuites.css" type="text/css" />
<link rel="stylesheet" href="https://bossanova.uk/jspreadsheet/v5/jspreadsheet.css" type="text/css" />

<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Material+Icons" />

<div id="spreadsheet"></div>

<script>
// Create a new spreadsheet
jspreadsheet(document.getElementById('spreadsheet'), {
    worksheets: [{
        data: [
            [ 'Crayons Crayola only (No Rose Art)', 2, 5.01, 0.01, '=B1*C1*(1-D1)' ],
            [ 'Colored Pencils Crayola only', 2, 4.41, 0.02, '=B2*C2*(1-D2)' ],
            [ 'Expo Dry-erase Markers Wide', 4, 3.00, 0.1, '=B3*C3*(1-D3)' ],
            [ 'Index Cards Unlined', 3, 6.00, 0.03, '=B4*C4*(1-D4)' ],
            [ 'Tissues', 10, 1.90, 0.01, '=B5*C5*(1-D5)' ],
            [ 'Ziploc Sandwich-size Bags', 5, 1.00, 0.01, '=B6*C6*(1-D6)' ],
            [ 'Thin Markers Crayola only', 2, 3.00, 0.02, '=B7*C7*(1-D7)' ],
            [ 'Highlighter', 4, 1.20, 0.01, '=B8*C8*(1-D8)' ],
            [ 'Total', '=SUM(B1:B8)', '=ROUND(SUM(C1:C8), 2)', '', '=SUM(E1:E8)' ],
        ],
        columns: [
            { type: 'text', title:'Product', width:'300' },
            { type: 'text', title:'Qtd', width:'80', mask:'#.##0' },
            { type: 'text', title:'Price', width:'100px', mask:'$ #.##0,00'  },
            { type: 'text', title:'Discount', mask:'0.00%' },
            {
                type: 'number',
                title: 'Total',
                width: '100px',
                format: 'US #.##0,00',
            },
        ]
    }]
});
</script>
</html>
```
```jsx
import React, { useRef } from "react";
import { Spreadsheet, Worksheet } from "@jspreadsheet/react";
import "jsuites/dist/jsuites.css";
import "jspreadsheet-ce/dist/jspreadsheet.css";

export default function App() {
    // Spreadsheet array of worksheets
    const spreadsheet = useRef();

    // Worksheet data
    const data = [
        [ 'Crayons Crayola only (No Rose Art)', 2, 5.01, 0.01, '=B1*C1*(1-D1)' ],
        [ 'Colored Pencils Crayola only', 2, 4.41, 0.02, '=B2*C2*(1-D2)' ],
        [ 'Expo Dry-erase Markers Wide', 4, 3.00, 0.1, '=B3*C3*(1-D3)' ],
        [ 'Index Cards Unlined', 3, 6.00, 0.03, '=B4*C4*(1-D4)' ],
        [ 'Tissues', 10, 1.90, 0.01, '=B5*C5*(1-D5)' ],
        [ 'Ziploc Sandwich-size Bags', 5, 1.00, 0.01, '=B6*C6*(1-D6)' ],
        [ 'Thin Markers Crayola only', 2, 3.00, 0.02, '=B7*C7*(1-D7)' ],
        [ 'Highlighter', 4, 1.20, 0.01, '=B8*C8*(1-D8)' ],
        [ 'Total', '=SUM(B1:B8)', '=ROUND(SUM(C1:C8), 2)', '', '=SUM(E1:E8)' ],
    ]

    // Column definitions
    const columns = [
        { type: 'text', title:'Product', width:'300' },
        { type: 'text', title:'Qtd', width:'80', mask:'#.##0' },
        { type: 'text', title:'Price', width:'100px', mask:'$ #.##0,00'  },
        { type: 'text', title:'Discount', mask:'0.00%' },
        {
            type: 'number',
            title: 'Total',
            width: '100px',
            format: 'US #.##0,00',
        },
    ]

    // Render component
    return (
        <Spreadsheet ref={spreadsheet}>
            <Worksheet data={data} columns={columns} />
        </Spreadsheet>
    );
}
```
```vue
<template>
    <Spreadsheet ref="spreadsheet">
        <Worksheet :data="data" :columns="columns" />
    </Spreadsheet>
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
        // Worksheet data
        const data = ref([
            ['Crayons Crayola only (No Rose Art)', 2, 5.01, 0.01, '=B1*C1*(1-D1)'],
            ['Colored Pencils Crayola only', 2, 4.41, 0.02, '=B2*C2*(1-D2)'],
            ['Expo Dry-erase Markers Wide', 4, 3.00, 0.1, '=B3*C3*(1-D3)'],
            ['Index Cards Unlined', 3, 6.00, 0.03, '=B4*C4*(1-D4)'],
            ['Tissues', 10, 1.90, 0.01, '=B5*C5*(1-D5)'],
            ['Ziploc Sandwich-size Bags', 5, 1.00, 0.01, '=B6*C6*(1-D6)'],
            ['Thin Markers Crayola only', 2, 3.00, 0.02, '=B7*C7*(1-D7)'],
            ['Highlighter', 4, 1.20, 0.01, '=B8*C8*(1-D8)'],
            ['Total', '=SUM(B1:B8)', '=ROUND(SUM(C1:C8), 2)', '', '=SUM(E1:E8)'],
        ]);

        // Column definitions
        const columns = ref([
            { type: 'text', title: 'Product', width: '300' },
            { type: 'text', title: 'Qtd', width: '80', mask: '#.##0' },
            { type: 'text', title: 'Price', width: '100px', mask: '$ #.##0,00' },
            { type: 'text', title: 'Discount', mask: '0.00%' },
            {
                type: 'number',
                title: 'Total',
                width: '100px',
                format: 'US #.##0,00',
            },
        ]);

        return {
            data,
            columns,
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

@Component({
    standalone: true,
    selector: "app-root",
    template: `<div #spreadsheet></div>`
})
export class AppComponent {
    @ViewChild("spreadsheet") spreadsheet: ElementRef;
    // Worksheets
    worksheets: jspreadsheet.worksheetInstance[];
    // Create a new data grid
    ngAfterViewInit() {
        // Create spreadsheet
        this.worksheets = jspreadsheet(this.spreadsheet.nativeElement, {
            style: ['background-color:orange; font-weight: bold;'],
            worksheets: [{
                data: [
                    [ 'Crayons Crayola only (No Rose Art)', 2, 5.01, 0.01, '=B1*C1*(1-D1)' ],
                    [ 'Colored Pencils Crayola only', 2, 4.41, 0.02, '=B2*C2*(1-D2)' ],
                    [ 'Expo Dry-erase Markers Wide', 4, 3.00, 0.1, '=B3*C3*(1-D3)' ],
                    [ 'Index Cards Unlined', 3, 6.00, 0.03, '=B4*C4*(1-D4)' ],
                    [ 'Tissues', 10, 1.90, 0.01, '=B5*C5*(1-D5)' ],
                    [ 'Ziploc Sandwich-size Bags', 5, 1.00, 0.01, '=B6*C6*(1-D6)' ],
                    [ 'Thin Markers Crayola only', 2, 3.00, 0.02, '=B7*C7*(1-D7)' ],
                    [ 'Highlighter', 4, 1.20, 0.01, '=B8*C8*(1-D8)' ],
                    [ 'Total', '=SUM(B1:B8)', '=ROUND(SUM(C1:C8), 2)', '', '=SUM(E1:E8)' ],
                ],
                columns: [
                    { type: 'text', title:'Product', width:'300' },
                    { type: 'text', title:'Qtd', width:'80', mask:'#.##0' },
                    { type: 'text', title:'Price', width:'100px', mask:'$ #.##0,00'  },
                    { type: 'text', title:'Discount', mask:'0.00%' },
                    {
                        type: 'number',
                        title: 'Total',
                        width: '100px',
                        format: 'US #.##0,00',
                    },
                ]
            }]
        });
    }
}
```


## More Information

Explore additional sections related to spreadsheet calculations.

### Jspreadsheet CE

- [Custom Excel-Like Formulas](/jspreadsheet/docs/custom-formulas)

### Jspreadsheet PRO

- [Custom Excel-Like Formulas](https://jspreadsheet.com/docs/custom-formulas)
- [Formula Selector](https://jspreadsheet.com/docs/formula-picker)
- [The Calculation Queue State](https://jspreadsheet.com/docs/calculations)
- [Namespaces](https://jspreadsheet.com/docs/namespaces)
- [The Formula Pro Extension](https://jspreadsheet.com/products/formulas)
- [Defined Names](https://jspreadsheet.com/docs/defined-names)
 
