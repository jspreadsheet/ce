title: Jspreadsheet CE Plugins
keywords: Jspreadsheet, spreadsheets, plugins, add-ons, feature extensions, customization, free plugins, premium plugins, custom plugins
description: Develop and distribute plugins for Jspreadsheet CE to encapsulate advanced features, enhance integration, and extend the core functionality of your spreadsheets.

# Plugins

Plugins help developers integrate multiple components with Jspreadsheet core features, such as the toolbar, context menu, event handling, etc. Their modular design simplifies development, making distribution and reuse more efficient within Jspreadsheet.

## Documentation

### Methods

Customize Jspreadsheet by overriding these methods to add or enhance features like the toolbar, context menu, event handling, or server-side data persistence.

| Method        | Description                                                                                                                          |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `beforeinit`  | Before adding a new worksheet.<br/>`beforeinit(worksheet: Object, config: Object): void \| object`                                   |
| `init`        | When a new worksheet is added.<br/>`init(worksheet: Object): void`                                                                   |
| `onevent`     | Called for every spreadsheet event.<br/>`onevent(event: String, a?: any, b?: any, c?: any, d?: any): void`                           |
| `persistence` | Handles server-side data persistence.<br/>`persistence(worksheet: Object, method: String, args: Array): void`                        |
| `contextMenu` | When the context menu opens.<br/>`contextMenu(worksheet: Object, x: Number, y: Number, e: Object, items: [], section: String): void` |
| `toolbar`     | When the toolbar is created or clicked.<br/>`toolbar(worksheet: Object, items: Array): void`                                         |

### Worksheet Options

You can define custom options for each worksheet using the `pluginOptions` property.

### Basic Implementation

Below is a basic implementation example that can be used as a reference for defining custom worksheet options.

{.ignore}

```javascript
const newPlugin = function () {
  // Plugin object
  let plugin = {};

  /**
   * It will be executed for every new worksheet
   */
  plugin.init = function (worksheet) {};

  /**
   * Jspreadsheet events
   */
  plugin.onevent = function () {
    // It would be executed in every single event and can be used to customize actions
  };

  /**
   * It would be call every single time persistence is required
   * @param {object} worksheet - worksheet
   * @param {string} method - action executed
   * @param {object} args - depending on the action.
   */
  plugin.persistence = function (worksheet, method, args) {
    // Different options are used depending on the action performed.
  };

  /**
   * Run on the context menu
   * @param instance Jexcel Spreadsheet Instance
   * @param x coordinates from the clicked cell
   * @param y coordinates from the clicked cell
   * @param e click object
   * @param items current items in the contextMenu
   */
  plugin.contextMenu = function (instance, x, y, e, items) {
    // Can be used to overwrite the contextMenu

    return items;
  };

  /**
   * Run on toolbar
   * @param instance Jexcel Spreadsheet Instance
   * @param items current items in the toolbar
   */
  plugin.toolbar = function (instance, items) {
    // Can be used to overwrite the toolbar

    return items;
  };

  // Any startup configuration goes here
  // (...)

  // Return the object
  return plugin;
};
```

## Examples

The following code is a working example of a plugin in action.

### Spreadsheet properties update

The properties plugin allow the user to change some of the spreadsheet settings, through a new option included in the context menu.

{.small}
Right-click in any cell and choose the last option in the context menu.

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

  <script src="https://bossanova.uk/jspreadsheet/v5/plugins/properties.js"></script>

  <div id="spreadsheet"></div>

  <script>
    // Create the spreadsheet
    jspreadsheet(document.getElementById("spreadsheet"), {
      worksheets: [{ minDimensions: [6, 6] }, { minDimensions: [6, 6] }],
      plugins: { properties },
    });
  </script>
</html>
```

```jsx
import React, { useRef } from "react";
import { Spreadsheet, Worksheet } from "@jspreadsheet-ce/react";
import "jsuites/dist/jsuites.css";
import "jspreadsheet-ce/dist/jspreadsheet.css";

// Installation npm install @jspreadsheet/properties
import properties from "@jspreadsheet/properties";

export default function App() {
  // Spreadsheet array of worksheets
  const spreadsheet = useRef();

  // Render data grid component
  return (
    <Spreadsheet ref={spreadsheet} plugins={{ properties }}>
      <Worksheet minDimension={[6, 6]} />
      <Worksheet minDimension={[6, 6]} />
    </Spreadsheet>
  );
}
```

```vue
<template>
  <Spreadsheet ref="spreadsheet" :plugins="properties">
    <Worksheet :minDimensions="[10, 10]" />
    <Worksheet :minDimensions="[10, 10]" />
  </Spreadsheet>
</template>

<script>
import { Spreadsheet, Worksheet } from "@jspreadsheet-ce/vue";
// Installation npm install @jspreadsheet/properties
import properties from "@jspreadsheet/properties";
import "jsuites/dist/jsuites.css";
import "jspreadsheet-ce/dist/jspreadsheet.css";

export default {
  components: {
    Spreadsheet,
    Worksheet,
  },
  data() {
    return {
      properties: { properties },
    };
  },
};
</script>
```

```angularjs
import { Component, ViewChild, ElementRef } from "@angular/core";
import jspreadsheet from "jspreadsheet-ce";
// Installation: npm install @jspreadsheet/properties
import properties from "@jspreadsheet/properties";

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
            worksheets: [
                { minDimensions: [6, 6] }, // Worksheet 1
                { minDimensions: [6, 6] }, // Worksheet 2
            ],
            plugins: { properties }
        });
    }
}
```
