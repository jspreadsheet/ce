title: Angular Spreadsheet
keywords: Angular, Jspreadsheet, data grid, spreadsheet controls, TypeScript, Angular integration, JavaScript grid, Angular application, interactive spreadsheets, data grid functionality  
description: Create advanced data grids in Angular applications using Jspreadsheet. Integrate spreadsheet-like controls with TypeScript support for enhanced interactivity and data management.

# Angular Spreadsheet

## Overview

Create advanced JavaScript Data Grids with Angular using Jspreadsheet, featuring spreadsheet-like controls optimized for TypeScript. This guide provides integration steps and practical examples tailored for Angular projects.

## Documentation

### Installation

Install Jspreadsheet for Angular using npm:

```bash
npm install jspreadsheet-ce@5.0.0-beta.3
```

### Importing Stylesheets

Include the necessary styles for Jspreadsheet and Jsuites in your Angular project. Add the following to the styles array in your angular.json file:

```json
"styles": [
    "jsuites/dist/jsuites.css",
    "jspreadsheet-ce/dist/jspreadsheet.css"
]
```

## Examples

### Basic Angular Spreadsheet

Here's a simple example of integrating Jspreadsheet in an Angular component. The spreadsheet allows dropdowns and colour pickers within cells, demonstrating adding comments and using basic formulas.

```typescript
import { Component, ViewChild, ElementRef } from "@angular/core";
import jspreadsheet from "jspreadsheet-ce";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  @ViewChild("spreadsheet") spreadsheet: ElementRef;

  ngAfterViewInit() {
    // Create the spreadsheet
    jspreadsheet(this.spreadsheet.nativeElement, {
      worksheets: [
        {
          data: [
            ['Yes', '#ff0000'],
            ['No', '#00ff00']
          ],
          minDimensions: [6, 4],
          columns: [
            {
              type: "dropdown",
              width: 100,
              source: ["Yes", "No"]
            },
            {
              type: "colour",
              width: 100,
              render: "square"
            }
          ],
          allowComments: true,
          comments: {
            A1: "Select Yes or No",
            B1: "Choose a colour."
          }
        }
      ]
    });
  }
}
```

### Data from External Sources

Use Angular's HttpClient to load or save data dynamically from an API and pass it to Jspreadsheet.

{.ignore}
```angularjs
import { Component, ViewChild, ElementRef } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import jspreadsheet from "jspreadsheet-ce";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  @ViewChild("spreadsheet") spreadsheet: ElementRef;

  constructor(private http: HttpClient) {}

  ngAfterViewInit() {
    // Fetch data from an external API and initialize the spreadsheet
    this.http.get('https://api.example.com/spreadsheet-data')
      .subscribe((data: any[][]) => {
        jspreadsheet(this.spreadsheet.nativeElement, {
          worksheets: [
            {
              data: data,
              columns: [
                { type: "dropdown", width: 100, source: ["Yes", "No"] },
                { type: "checkbox", width: 50 }
              ],
              minDimensions: [10, 5]
            }
          ]
        });
      });
  }
}
```

### Online Spreadsheet with Angular

A basic Angular spreadsheet with export to XLSX.

- [Angular Online Spreadsheet](https://codesandbox.io/s/angular-spreadsheet-lbtcwf)
- [Angular Data Grid with Spreadsheet Controls](https://stackblitz.com/edit/data-grid-with-spreadsheet-controls)
- [Dynamic Spreadsheets](https://stackblitz.com/edit/online-spreadsheets)

### Online XLSX Editor with Angular

Import XLSX files and edit them online using Jspreadsheet Pro.

- [Angular Spreadsheet XLSX Editor](https://codesandbox.io/s/online-angular-excel-spreadsheet-lk5bnc)

### More Spreadsheet Angular Examples

- [Data Grid Custom Cell Editor](https://stackblitz.com/~/github.com/nicolasjesse/jss-custom-column-ng)
- [Angular Spreadsheet with Data Validation](https://stackblitz.com/edit/angular-data-validation-example)
