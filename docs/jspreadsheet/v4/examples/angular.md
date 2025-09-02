title: Angular Spreadsheet with Jspreadsheet CE
keywords: Jexcel, javascript, using Jspreadsheet and angular
description: Integrating Jspreadsheet with Angular working example.

# Angular Spreadsheet with Jspreadsheet CE

This example demonstrates how to use the Jspreadsheet library into an Angular application.

[View the live project on CodeSandbox](https://codesandbox.io/s/jexcel-and-angular-cexs1)

## Example

### Template HTML

Add the following template to your app.component.html:

{.ignore}

```html
<div #spreadsheet></div>
```

### JavaScript

Here is the complete implementation for integrating Jspreadsheet with Angular:

{.ignore}

```javascript
import { Component, ViewChild, ElementRef } from "@angular/core";
import jspreadsheet from "jspreadsheet-ce";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  @ViewChild("spreadsheet") spreadsheet: ElementRef;
  title = "CodeSandbox";

  ngAfterViewInit() {
    jspreadsheet(this.spreadsheet.nativeElement, {
      data: [[]],
      columns: [
        { type: "dropdown", width: "100px", source: ["Y", "N"] },
        { type: "color", width: "100px", render: "square" },
      ],
      minDimensions: [10, 10],
    });
  }
}
```

### Angular Styles Configuration

To ensure the styles for Jspreadsheet are applied correctly, update the angular.json file to include the Jspreadsheet CSS:

```json
"styles": ["styles.css","./node_modules/jspreadsheet-ce/dist/jspreadsheet.css"],
```
