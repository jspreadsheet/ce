title: Data Grid Settings
keywords: Jspreadsheet, data grid customization, React, Vue, JavaScript spreadsheet, Excel-like functionality, configuration settings, spreadsheet customization, data grid options
description: Explore the configuration settings in Jspreadsheet for customizing data grids. Learn how to enable, disable, and adjust features to enhance flexibility for both spreadsheets and individual worksheets.

# Data Grid Settings

This section provides an overview of the parameters that define the behaviour and functionality of spreadsheets and worksheets. Configuration options are categorized into two levels:

- Spreadsheet-level settings for overarching configurations.
- Worksheet-level settings for individual worksheet customizations.

## Documentation

### Methods

The following methods allow programmatic manipulation of configuration settings:

| Method      | Description                                                                                          |
| ----------- | ---------------------------------------------------------------------------------------------------- |
| `getConfig` | Retrieves the configuration of a worksheet.<br/>`getConfig() => Object`                              |
| `setConfig` | Updates the configuration for a worksheet.<br/>`setConfig(options: Object, level?: Boolean) => void` |

## Examples

### Data Grid Cloning

This example demonstrates how to copy a data grid configuration and use it to initialize a new spreadsheet.

[See this example on JSFiddle](https://jsfiddle.net/spreadsheet/xz5pfgq7/)

```html
<html>
  <script src="https://bossanova.uk/jspreadsheet/v5/jspreadsheet.js"></script>
  <link
    rel="stylesheet"
    href="https://bossanova.uk/jspreadsheet/v5/jspreadsheet.css"
    type="text/css"
  />
  <script src="https://jsuites.net/v5/jsuites.js"></script>
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
  <div id="spreadsheet-clone"></div>
  <br />

  <textarea id="console" style="width: 600px; height: 100px;"></textarea
  ><br />

  <input
    type="button"
    value="Clone the data grid above"
    class="button main"
    id="btn1"
  />

  <script>
    const clone = function () {
      // Get the data grid configuration
      let config = JSON.stringify(grid[0].parent.getConfig());
      // Show on the textarea
      document.getElementById("console").value = config;
      // Destroy any existing spreadsheet
      jspreadsheet.destroy(document.getElementById("spreadsheet-clone"));
      // Parse
      config = JSON.parse(config);
      // Create a new spreadsheet
      jspreadsheet(document.getElementById("spreadsheet-clone"), config);
    };

    // Create the JavaScript sample data grid
    let grid = jspreadsheet(document.getElementById("spreadsheet"), {
      tabs: true,
      toolbar: true,
      worksheets: [
        {
          data: [[1, 2, 3]],
          minDimensions: [6, 6],
        },
      ],
    });

    document.getElementById("btn1").onclick = clone;
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
    const console = useRef();
    const copy = useRef();

    // Method to clone the data grid
    const clone = function() {
        // Get the data grid configuration
        let config = JSON.stringify(spreadsheet.current[0].parent.getConfig());
        // Show on the textarea
        console.current.value = config;
        // Destroy any existing spreadsheet
        jspreadsheet.destroy(copy.current);
        // Parse
        config = JSON.parse(config);
        // Create a new spreadsheet
        jspreadsheet(copy.current, config);
    }

    return (
        <>
            <Spreadsheet ref={spreadsheet} tabs toolbar>
                <Worksheet data={[[1,2,3]]} minDimensions={[8,8]} />
            </Spreadsheet>
            <div ref={copy}></div><br>
            <textarea ref={console}></textarea><br>
            <input type="button" value="Clone the data grid above" onClick={() => clone()} />
        </>
    );
}
```

```vue
<template>
  <Spreadsheet ref="spreadsheetRef" tabs toolbar>
    <Worksheet :data="[[1, 2, 3]]" :minDimensions="[6, 6]" />
  </Spreadsheet>
  <div ref="copyRef"></div>
  <br />
  <textarea ref="consoleRef"></textarea><br />
  <button @click="clone">Clone the data grid above</button>
</template>

<script>
import { ref } from "vue";
import { Spreadsheet, Worksheet, jspreadsheet } from "@jspreadsheet-ce/vue";

import "jsuites/dist/jsuites.css";
import "jspreadsheet-ce/dist/spreadsheet.css";

export default {
  components: {
    Spreadsheet,
    Worksheet,
  },
  setup() {
    const spreadsheetRef = ref(null);
    const copyRef = ref(null);
    const consoleRef = ref(null);

    // Method to clone the data grid
    const clone = function () {
      // Get the data grid configuration
      let config = JSON.stringify(
        spreadsheetRef.value.current[0].parent.getConfig()
      );
      // Show on the textarea
      consoleRef.value.value = config;
      // Destroy any existing spreadsheet
      jspreadsheet.destroy(spreadsheetRef.value);
      // Parse
      config = JSON.parse(config);
      // Create a new spreadsheet
      jspreadsheet(copyRef.value, config);
    };

    return {
      spreadsheetRef,
      copyRef,
      consoleRef,
      clone,
    };
  },
};
</script>
```

```angularjs
import { Component, ViewChild, ElementRef } from "@angular/core";
import jspreadsheet from "jspreadsheet-ce";

import "jsuites/dist/jsuites.css";
import "jspreadsheet-ce/dist/jspreadsheet.css";

// Create component
@Component({
    standalone: true,
    selector: "app-root",
    template: `
        <div #spreadsheet></div>
        <div #copy></div><br>
        <textarea #console></textarea><br>
        <input type="button" value="Clone the data grid above" (click)="this.clone()" />
    `,
})
export class AppComponent {
    @ViewChild("spreadsheet") spreadsheet: ElementRef;
    @ViewChild("console") console: ElementRef;
    @ViewChild("copy") copy: ElementRef;
    // Worksheets
    worksheets: jspreadsheet.worksheetInstance[];
    // Create a new data grid
    ngAfterViewInit() {
        // Create spreadsheet
        this.worksheets = jspreadsheet(this.spreadsheet.nativeElement, {
            worksheets: [{
                minDimensions: [4,4],
            }],
            contextmenu: function() {
                return false;
            }
        });
    }

    // Clone the data grid
    clone() {
        // Get the data grid configuration
        let config = JSON.stringify(this.worksheets[0].parent.getConfig());
        // Show on the textarea
        this.console.nativeElement.value = config;
        // Destroy any existing spreadsheet
        jspreadsheet.destroy(this.copy.nativeElement);
        // Parse
        config = JSON.parse(config);
        // Create a new spreadsheet
        jspreadsheet(this.copy.nativeElement, config);
    }
}
```
