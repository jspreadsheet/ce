title: Data Grid Toolbars
keywords: Jspreadsheet, Jexcel, data grid, javascript, excel-like toolbar, spreadsheet toolbar, table toolbar, toolbars, data grid toolbars, customizable toolbars, toolbar customization, toolbar integration, interactive data grid, JavaScript data grid, dynamic toolbar, toolbar controls.
description: Learn how to create and customize toolbar controls in Jspreadsheet. This guide covers adding custom buttons, configuring built-in tools, and extending the toolbar to fit your application's needs.

# Data Grid Toolbars

This section covers all methods, settings, and events for the data grid toolbar, including advanced customization options, control integration, and key configuration settings.

{.green}

> **Icons**
>
> The use of Material icons style sheet is required for utilizing the toolbar.
>
> `<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Material+Icons" />`

## Documentation

### Methods

The following methods manage the visibility state of the toolbar:

| Method        | Description                                                       |
| ------------- | ----------------------------------------------------------------- |
| `showToolbar` | Displays the toolbar.<br/>`worksheet.parent.showToolbar() : void` |
| `hideToolbar` | Hides the toolbar.<br/>`worksheet.parent.hideToolbar() : void`    |

### Settings

Customize toolbar items during initialization using the following property:

| Property                                                                                  | Description                                                                                                                                            |
| ----------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `toolbar: boolean \| ToolbarItem[] \| ((defaultToolbar: ToolbarItem[]) => ToolbarItem[])` | Enables toolbar customization. Options include: `true` for the default toolbar, a function for dynamic setup, or an array for specific configurations. |

### Toolbar Object

Customize toolbar items during initialization using the properties below.

#### Toolbar General Properties

| Property     | Description                                     |
| ------------ | ----------------------------------------------- |
| `container`  | Displays a border around the toolbar container. |
| `badge`      | Adds a badge for each toolbar element.          |
| `title`      | Shows a title below each icon.                  |
| `responsive` | Enables a responsive toolbar. `Default: false`  |
| `items`      | Array of items to display in the toolbar.       |

#### Toolbar Item Properties

| Property             | Description                                                             |
| -------------------- | ----------------------------------------------------------------------- |
| `type: string`       | Specifies the element type: `icon` \| `divisor` \| `label` \| `select`. |
| `content: string`    | Defines the content of the toolbar element.                             |
| `title: boolean`     | Sets the tooltip for the toolbar element.                               |
| `width: number`      | Width of the toolbar element.                                           |
| `active: boolean`    | Initial active state for the toolbar element.                           |
| `class: string`      | CSS class for each toolbar element.                                     |
| `value: number`      | Initially selected option for `select` type.                            |
| `render: function`   | Render function for dropdown elements when `type: select`.              |
| `onclick: function`  | Callback for when an item is clicked.                                   |
| `onchange: function` | Callback for when a new item is selected (`select` type only).          |

## Examples

### Toolbar visibility

The example below shows how to enable the default data grid toolbar and programmatically control its visibility after initialization.

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
    <input type="button" value="Show Toolbar" id="btn1" />
    <input type="button" value="Hide Toolbar" id="btn2" />
  </p>

  <script>
    // Create the spreadsheet
    let grid = jspreadsheet(document.getElementById("spreadsheet"), {
      worksheets: [{ minDimensions: [6, 6] }],
      toolbar: true,
    });

    document.getElementById("btn1").onclick = () =>
      grid[0].parent.showToolbar();
    document.getElementById("btn2").onclick = () =>
      grid[0].parent.hideToolbar();
  </script>
</html>
```

```jsx
import React, { useRef } from "react";
import { Spreadsheet, Worksheet } from "@jspreadsheet-ce/react";
import "jsuites/dist/jsuites.css";
import "jspreadsheet-ce/dist/jspreadsheet.css";

export default function App() {
  // Spreadsheet array of worksheets
  const spreadsheet = useRef();
  // Render component
  return (
    <>
      <Spreadsheet ref={spreadsheet} toolbar>
        <Worksheet minDimensions={[6, 6]} />
      </Spreadsheet>
      <input
        type="button"
        value="Show Toolbar"
        onClick={() => spreadsheet.current[0].parent.showToolbar()}
      />
      <input
        type="button"
        value="Hide Toolbar"
        onClick={() => spreadsheet.current[0].parent.hideToolbar()}
      />
    </>
  );
}
```

```vue
<template>
  <Spreadsheet ref="spreadsheet" toolbar>
    <Worksheet :minDimensions="[6, 6]" />
  </Spreadsheet>
  <input type="button" value="Show Toolbar" @click="showToolbar" />
  <input type="button" value="Hide Toolbar" @click="hideToolbar" />
</template>

<script>
import { Spreadsheet, Worksheet } from "@jspreadsheet-ce/vue";
import "jsuites/dist/jsuites.css";
import "jspreadsheet-ce/dist/jspreadsheet.css";

export default {
  components: {
    Spreadsheet,
    Worksheet,
  },
  methods: {
    showToolbar() {
      this.$refs.spreadsheet.current[0].showToolbar();
    },
    hideToolbar() {
      this.$refs.spreadsheet.current[0].hideToolbar();
    },
  },
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
    template: `
        <div #spreadsheet></div>
        <input type="button" value="Show Toolbar" (click)="this.worksheets[0].showToolbar();" />
        <input type="button" value="Hide Toolbar" (click)="this.worksheets[0].hideToolbar();" />`
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
                { minDimensions: [6,6] },
            ],
            toolbar: true
        });
    }
}
```

### Toolbar Custom Handler

The toolbar property can be a function that allows you to add custom items to the default toolbar without rebuilding it from scratch. See the example below.

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
      toolbar: function (toolbar) {
        // Add a new custom item in the end of my toolbar
        toolbar.items.push({
          tooltip: "My custom item",
          content: "share",
          onclick: function () {
            alert("Custom click");
          },
        });

        return toolbar;
      },
      worksheets: [
        {
          minDimensions: [6, 6],
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
  // Spreadsheet array of worksheets
  const spreadsheet = useRef();
  // Toolbar handler
  const toolbar = (toolbar) => {
    // Add a new custom item in the end of my toolbar
    toolbar.items.push({
      tooltip: "My custom item",
      content: "share",
      onclick: function () {
        alert("Custom click");
      },
    });
    return toolbar;
  };

  // Render component
  return (
    <Spreadsheet ref={spreadsheet} toolbar={toolbar}>
      <Worksheet minDimensions={[6, 6]} />
    </Spreadsheet>
  );
}
```

```vue
<template>
  <Spreadsheet ref="spreadsheet" toolbar>
    <Worksheet :minDimensions="[6, 6]" />
  </Spreadsheet>
</template>

<script>
import { Spreadsheet, Worksheet } from "@jspreadsheet-ce/vue";
import "jsuites/dist/jsuites.css";
import "jspreadsheet-ce/dist/jspreadsheet.css";

export default {
  components: {
    Spreadsheet,
    Worksheet,
  },
  methods: {
    // Toolbar handler
    toolbar(toolbar) {
      // Add a new custom item in the end of my toolbar
      toolbar.items.push({
        tooltip: "My custom item",
        content: "share",
        onclick: function () {
          alert("Custom click");
        },
      });
      return toolbar;
    },
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
            toolbar: function(toolbar) {
                // Add a new custom item in the end of my toolbar
                toolbar.items.push({
                    tooltip: 'My custom item',
                    content: 'share',
                    onclick: function() {
                        alert('Custom click');
                    }
                });

                return toolbar;
            },
            worksheets: [{
                minDimensions: [6,6],
            }]
        });
    }
}
```

### Custom Toolbar Object

The toolbar property allows you to customize the items in the spreadsheet toolbar fully.

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
    let customToolbar = {
      items: [
        {
          content: "save",
          onclick: function () {
            jspreadsheet.current.download();
          },
        },
        {
          type: "divisor",
        },
        {
          type: "select",
          width: "160px",
          options: ["Verdana", "Arial", "Courier New"],
          render: function (e) {
            return '<span style="font-family:' + e + '">' + e + "</span>";
          },
          onchange: function (a, b, c, d) {
            jspreadsheet.current.setStyle(
              jspreadsheet.current.getSelected(),
              "font-family",
              d
            );
          },
        },
        {
          type: "i",
          content: "format_bold",
          onclick: function (a, b, c) {
            jspreadsheet.current.setStyle(
              jspreadsheet.current.getSelected(),
              "font-weight",
              "bold"
            );
          },
        },
        {
          type: "i",
          content: "format_italic",
          onclick: function (a, b, c) {
            jspreadsheet.current.setStyle(
              jspreadsheet.current.getSelected(),
              "font-style",
              "italic"
            );
          },
        },
        {
          content: "search",
          onclick: function (a, b, c) {
            if (c.children[0].innerText == "search") {
              jspreadsheet.current.showSearch();
              c.children[0].innerText = "search_off";
            } else {
              jspreadsheet.current.hideSearch();
              c.children[0].innerText = "search";
            }
          },
          tooltip: "Toggle Search",
          updateState: function (a, b, c, worksheet) {
            // Call this one when the worksheet is opened and on the selection of any cells
            if (worksheet.options.search == true) {
              c.children[0].innerText = "search_off";
            } else {
              c.children[0].innerText = "search";
            }
          },
        },
      ],
    };

    // Create the spreadsheet
    jspreadsheet(document.getElementById("spreadsheet"), {
      worksheets: [
        {
          worksheetName: "Toolbar example",
          minDimensions: [6, 6],
        },
      ],
      toolbar: customToolbar,
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
  // Spreadsheet array of worksheets
  const spreadsheet = useRef();
  // Toolbar handler
  const toolbar = {
    items: [
      {
        content: "save",
        onclick: function () {
          spreadsheet.current.download();
        },
      },
      {
        type: "divisor",
      },
      {
        type: "select",
        width: "160px",
        options: ["Verdana", "Arial", "Courier New"],
        render: function (e) {
          return '<span style="font-family:' + e + '">' + e + "</span>";
        },
        onchange: function (a, b, c, d) {
          spreadsheet.current.setStyle(
            spreadsheet.current.getSelected(),
            "font-family",
            d
          );
        },
      },
      {
        type: "i",
        content: "format_bold",
        onclick: function (a, b, c) {
          spreadsheet.current.setStyle(
            spreadsheet.current.getSelected(),
            "font-weight",
            "bold"
          );
        },
      },
      {
        type: "i",
        content: "format_italic",
        onclick: function (a, b, c) {
          spreadsheet.current.setStyle(
            spreadsheet.current.getSelected(),
            "font-style",
            "italic"
          );
        },
      },
      {
        content: "search",
        onclick: function (a, b, c) {
          if (c.children[0].innerText == "search") {
            spreadsheet.current.showSearch();
            c.children[0].innerText = "search_off";
          } else {
            spreadsheet.current.hideSearch();
            c.children[0].innerText = "search";
          }
        },
        tooltip: "Toggle Search",
        updateState: function (a, b, c, worksheet) {
          // Call this one when the worksheet is opened and on the selection of any cells
          if (worksheet.options.search == true) {
            c.children[0].innerText = "search_off";
          } else {
            c.children[0].innerText = "search";
          }
        },
      },
    ],
  };

  // Render component
  return (
    <Spreadsheet ref={spreadsheet} toolbar={toolbar}>
      <Worksheet minDimensions={[6, 6]} worksheetName={"Toolbar example"} />
    </Spreadsheet>
  );
}
```

```vue
<template>
  <Spreadsheet ref="spreadsheet" toolbar>
    <Worksheet :minDimensions="[6, 6]" worksheetName="Toolbar example" />
  </Spreadsheet>
</template>

<script>
import { Spreadsheet, Worksheet } from "@jspreadsheet-ce/vue";
import "jsuites/dist/jsuites.css";
import "jspreadsheet-ce/dist/jspreadsheet.css";

export default {
  components: {
    Spreadsheet,
    Worksheet,
  },
  data() {
    // Toolbar handler
    const toolbar = {
      items: [
        {
          content: "save",
          onclick: function () {
            jspreadsheet.current.download();
          },
        },
        {
          type: "divisor",
        },
        {
          type: "select",
          width: "160px",
          options: ["Verdana", "Arial", "Courier New"],
          render: function (e) {
            return '<span style="font-family:' + e + '">' + e + "</span>";
          },
          onchange: function (a, b, c, d) {
            jspreadsheet.current.setStyle(
              jspreadsheet.current.getSelected(),
              "font-family",
              d
            );
          },
        },
        {
          type: "i",
          content: "format_bold",
          onclick: function (a, b, c) {
            jspreadsheet.current.setStyle(
              jspreadsheet.current.getSelected(),
              "font-weight",
              "bold"
            );
          },
        },
        {
          type: "i",
          content: "format_italic",
          onclick: function (a, b, c) {
            jspreadsheet.current.setStyle(
              jspreadsheet.current.getSelected(),
              "font-style",
              "italic"
            );
          },
        },
        {
          content: "search",
          onclick: function (a, b, c) {
            if (c.children[0].innerText == "search") {
              jspreadsheet.current.showSearch();
              c.children[0].innerText = "search_off";
            } else {
              jspreadsheet.current.hideSearch();
              c.children[0].innerText = "search";
            }
          },
          tooltip: "Toggle Search",
          updateState: function (a, b, c, worksheet) {
            // Call this one when the worksheet is opened and on the selection of any cells
            if (worksheet.options.search == true) {
              c.children[0].innerText = "search_off";
            } else {
              c.children[0].innerText = "search";
            }
          },
        },
      ],
    };

    return {
      toolbar,
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
        // Custom toolbar definitions
        let customToolbar = {
            items: [
                {
                    content: 'save',
                    onclick: function () {
                        jspreadsheet.current.download();
                    }
                },
                {
                    type: 'divisor',
                },
                {
                    type: 'select',
                    width: '160px',
                    options: ['Verdana', 'Arial', 'Courier New'],
                    render: function (e) {
                        return '<span style="font-family:' + e + '">' + e + '</span>';
                    },
                    onchange: function (a, b, c, d) {
                        jspreadsheet.current.setStyle(jspreadsheet.current.getSelected(), 'font-family', d);
                    }
                },
                {
                    type: 'i',
                    content: 'format_bold',
                    onclick: function (a, b, c) {
                        jspreadsheet.current.setStyle(jspreadsheet.current.getSelected(), 'font-weight', 'bold');
                    }
                },
                {
                    type: 'i',
                    content: 'format_italic',
                    onclick: function (a, b, c) {
                        jspreadsheet.current.setStyle(jspreadsheet.current.getSelected(), 'font-style', 'italic');
                    }
                },
                {
                    content: 'search',
                    onclick: function (a, b, c) {
                        if (c.children[0].innerText == 'search') {
                            jspreadsheet.current.showSearch();
                            c.children[0].innerText = 'search_off';
                        } else {
                            jspreadsheet.current.hideSearch();
                            c.children[0].innerText = 'search';
                        }
                    },
                    tooltip: 'Toggle Search',
                    updateState: function (a, b, c, worksheet) {
                        // Call this one when the worksheet is opened and on the selection of any cells
                        if (worksheet.options.search == true) {
                            c.children[0].innerText = 'search_off';
                        } else {
                            c.children[0].innerText = 'search';
                        }
                    }
                }
            ]
        }

        // Create spreadsheet
        this.worksheets = jspreadsheet(this.spreadsheet.nativeElement, {
            worksheets: [{
                worksheetName: 'Toolbar example',
                minDimensions: [6, 6],
            }],
            toolbar: customToolbar
        });
    }
}
```
