title: Jexcel with Angular
keywords: Jexcel, javascript, using jspreadsheet and angular
description: A full example on how to integrate Jspreadsheet with Angular

[Back to Examples](/jspreadsheet/v3/examples "Back to the examples section")

# The Javascript spreadsheet with Angular

[Click here to see the project running on codesandbox.](https://codesandbox.io/s/jexcel-and-angular-ej4u2)

### Source code

{.ignore}
```javascript
import { Component } from "@angular/core";
import * as jexcel from "jexcel";

require("jexcel/dist/jexcel.css");

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "CodeSandbox";

  ngAfterViewInit() {
    jexcel(document.getElementById("spreadsheet"), {
      data: [[]],
      columns: [
        { type: "dropdown", width: "100px", source: ["Y", "N"] },
        { type: "color", width: "100px", render: "square" }
      ],
      minDimensions: [10, 10]
    });
  }
}
```

