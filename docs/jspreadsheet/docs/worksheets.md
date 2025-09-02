title: Worksheets Settings, Methods, and Related Events
keywords: Jspreadsheet, data grid, javascript, excel-like worksheets, spreadsheet, data tables, grid, worksheet events, worksheet support, Jspreadsheet worksheets, worksheet settings, worksheet methods, worksheet events, create worksheets, customize worksheets, track changes in worksheets, worksheet control, dynamic data grids, JavaScript data tables, worksheet customization, worksheet organization, interactive worksheets, data management
description: Learn how to set up and manage worksheets in Jspreadsheet programmatically. Explore various worksheet properties, settings, and efficient handling and customization techniques.

# Worksheets

Jspreadsheet offers robust tools for managing spreadsheets with multiple worksheets. It enables precise control over user interactions and provides programmatic controls and event listeners to customize the behaviour and monitor changes within the spreadsheet.

## Documentation

### Methods

Explore the available methods to programmatically interact with and manage worksheets in Jspreadsheet.

| Property                          | Description                                                                                                                                                                      |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `openWorksheet(number)`           | Opens a worksheet by its index.<br/>`openWorksheet(position?: Number) => void`                                                                                                   |
| `createWorksheet(object, number)` | Adds a new worksheet based on a configuration object, optionally at a specific position.<br/>`createWorksheet(worksheetOptions: Object, position?: Number) => worksheetInstance` |
| `deleteWorksheet(number)`         | Removes an existing worksheet by its index.<br/>`deleteWorksheet(position?: Number) => void`                                                                                     |

### Events

Explore the available events to monitor and respond to worksheet interactions in Jspreadsheet.

| Event                     | Description                                                                                                                                                               |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `onopenworksheet`         | `onopenworksheet(worksheet: Object, worksheetNumber: Number) : void`                                                                                                      |
| `onbeforecreateworksheet` | Intercept worksheet creation to cancel or configure the new worksheet.<br/>`onbeforecreateworksheet(worksheet: Object, options: Object, worksheetNumber: Number) : mixed` |
| `oncreateworksheet`       | `oncreateworksheet(worksheet: Object, worksheetOptions: Object, worksheetNumber: Number) : void`                                                                          |
| `ondeleteworksheet`       | `ondeleteworksheet(worksheet: Object, oldWorksheetNumber: Number) : void`                                                                                                 |

### Configuration

You can customize spreadsheet and worksheet behaviour using the following settings.

#### Worksheet Settings

| Property                | Description                          |
| ----------------------- | ------------------------------------ |
| `worksheetId: string`   | Unique identifier for the worksheet. |
| `worksheetName: string` | Title of the worksheet.              |

#### Spreadsheet Properties

| Property                        | Description                                                                                        |
| ------------------------------- | -------------------------------------------------------------------------------------------------- |
| `tabs: boolean\|object`         | Enables tabs for worksheet navigation and allows users to create new worksheets. Default: `false`. |
| `allowDeleteWorksheet: boolean` | Enables the delete worksheet option in the context menu. Default: `true`.                          |
| `allowRenameWorksheet: boolean` | Enables the rename worksheet option in the context menu. Default: `true`.                          |
| `allowMoveWorksheet: boolean`   | Enables drag-and-drop functionality for rearranging worksheets. Default: `true`.                   |

{.green}

> ##### Tabs
>
> The `tabs` object uses the same properties as the `jSuites.tabs` plugin, allowing you to customize the position and behaviour of the worksheet tabs. For more details, visit the: [Tabs Plugin](https://jsuites.net/docs/javascript-tabs)

#### Quick example

{.ignore-execution}

```html
<div id="spreadsheet"></div>

<script>
  jspreadsheet(document.getElementById("spreadsheet"), {
    tabs: {
      allowCreate: true,
      allowChangePosition: true,
      animation: true,
      position: "bottom",
    },
    worksheets: [
      {
        minDimensions: [8, 8],
      },
    ],
  });
</script>
```

```jsx
import React, { useRef } from "react";
import { Spreadsheet, Worksheet } from "@jspreadsheet-ce/react";
import "jsuites/dist/jsuites.css";
import "jspreadsheet-ce/dist/jspreadsheet.css";

export default function App() {
  // Spreadsheet array of worksheets
  const spreadsheet = useRef();
  // Tabs
  const tabs = {
    allowCreate: true,
    allowChangePosition: true,
    animation: true,
    position: "bottom",
  };
  // Render component
  return (
    <Spreadsheet ref={spreadsheet} tabs={tabs}>
      <Worksheet minDimensions={[6, 6]} />
      <Worksheet minDimensions={[6, 6]} />
    </Spreadsheet>
  );
}
```

```vue
<template>
  <Spreadsheet ref="spreadsheet" :tabs="tabs">
    <Worksheet :minDimensions="[8, 8]" />
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
    return {
      // Tabs customizations
      tabs: {
        allowCreate: true,
        allowChangePosition: true,
        animation: true,
        position: "bottom",
      },
    };
  },
};
</script>
```

```angularjs
jspreadsheet(document.getElementById('spreadsheet'), {
    tabs: {
        allowCreate: true,
        allowChangePosition: true,
        animation: true,
        position: "bottom",
    },
    worksheets: [{
        minDimensions: [8,8],
    }],
});
```

## Examples

### Worksheet events

Create a new worksheet and explore the related events.

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
      // Allow to create a new tab button
      tabs: true,
      // Initial worksheet
      worksheets: [
        {
          data: [
            ["1", "DIVINELY UNINSPIRED TO A HELLISH EXTENT", "LEWIS CAPALDI"],
            ["2", "NO 6 COLLABORATIONS PROJECT", "ED SHEERAN"],
            ["3", "THE GREATEST SHOWMAN", "MOTION PICTURE CAST RECORDING"],
            ["4", "WHEN WE ALL FALL ASLEEP WHERE DO WE GO", "BILLIE EILISH"],
          ],
          columns: [
            { type: "autonumber", title: "Id" },
            { type: "text", width: "350px", title: "Title" },
            { type: "text", width: "250px", title: "Artist" },
          ],
          // Name of the worksheet
          worksheetName: "Albums",
        },
      ],
      // Intercept the new worksheet and define the options for the new worksheet
      onbeforecreateworksheet: function (config, index) {
        return {
          minDimensions: [5, 5],
          worksheetName: "Albums " + index,
        };
      },
      // When you open the worksheet
      onopenworksheet: function (element, instance, worksheetNumber) {
        console.log(element, instance, worksheetNumber);
      },
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
  // Data
  const data = [
    ["1", "DIVINELY UNINSPIRED TO A HELLISH EXTENT", "LEWIS CAPALDI"],
    ["2", "NO 6 COLLABORATIONS PROJECT", "ED SHEERAN"],
    ["3", "THE GREATEST SHOWMAN", "MOTION PICTURE CAST RECORDING"],
    ["4", "WHEN WE ALL FALL ASLEEP WHERE DO WE GO", "BILLIE EILISH"],
  ];
  // Columns
  const columns = [
    { type: "autonumber", title: "Id" },
    { type: "text", width: "350px", title: "Title" },
    { type: "text", width: "250px", title: "Artist" },
  ];

  // Intercept the action to define the default configuration for each new worksheet
  const onbeforecreateworksheet = () => {
    return {
      minDimensions: [5, 5],
    };
  };
  // When a new worksheet is opened
  const onopenworksheet = (element, instance, worksheetNumber) => {
    console.log(element, instance, worksheetNumber);
  };

  // Render component
  return (
    <Spreadsheet
      ref={spreadsheet}
      tabs
      onbeforecreateworksheet={onbeforecreateworksheet}
      onopenworksheet={onopenworksheet}
    >
      <Worksheet data={data} columns={columns} worksheetName={"Albums"} />
    </Spreadsheet>
  );
}
```

```vue
<template>
  <Spreadsheet
    ref="spreadsheet"
    tabs
    :onbeforecreateworksheet="onbeforecreateworksheet"
    :onopenworksheet="onopenworksheet"
  >
    <Worksheet :data="data" :columns="columns" worksheetName="Albums" />
  </Spreadsheet>
</template>

<script>
import { Spreadsheet, Worksheet } from "jspreadsheet-ce/dist/vue";
import "jsuites/dist/jsuites.css";
import "jspreadsheet-ce/dist/jspreadsheet.css";

export default {
  components: {
    Spreadsheet,
    Worksheet,
  },
  methods: {
    // Intercept the action to define the default configuration for each new worksheet
    onbeforecreateworksheet() {
      return {
        minDimensions: [5, 5],
      };
    },
    // When a new worksheet is opened
    onopenworksheet(element, instance, worksheetNumber) {
      console.log(element, instance, worksheetNumber);
    },
  },
  data() {
    return {
      // Data
      data: [
        ["1", "DIVINELY UNINSPIRED TO A HELLISH EXTENT", "LEWIS CAPALDI"],
        ["2", "NO 6 COLLABORATIONS PROJECT", "ED SHEERAN"],
        ["3", "THE GREATEST SHOWMAN", "MOTION PICTURE CAST RECORDING"],
        ["4", "WHEN WE ALL FALL ASLEEP WHERE DO WE GO", "BILLIE EILISH"],
      ],
      // Columns
      columns: [
        { type: "autonumber", title: "Id" },
        { type: "text", width: "350px", title: "Title" },
        { type: "text", width: "250px", title: "Artist" },
      ],
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
            // Allow create a new tab button
            tabs: true,
            // Initial worksheet
            worksheets: [
                {
                    data: [
                        ["1","DIVINELY UNINSPIRED TO A HELLISH EXTENT","LEWIS CAPALDI"],
                        ["2","NO 6 COLLABORATIONS PROJECT","ED SHEERAN"],
                        ["3","THE GREATEST SHOWMAN","MOTION PICTURE CAST RECORDING"],
                        ["4","WHEN WE ALL FALL ASLEEP WHERE DO WE GO","BILLIE EILISH"]
                    ],
                    columns: [
                        { type: 'autonumber', title: 'Id' },
                        { type: 'text', width: 350, title: 'Title' },
                        { type: 'text', width: 250, title: 'Artist' },
                    ],
                    // Name of the worksheet
                    worksheetName: 'Albums',
                }
            ],
            // Intercept the new worksheet and define the options for the new worksheet
            onbeforecreateworksheet: function(config, index) {
                let options = {
                    minDimensions: [5,5],
                    worksheetName: 'Albums ' + index
                }
                return options;
            },
            // When you open the worksheet
            onopenworksheet: function(element, instance, worksheetNumber) {
                console.log(element, instance, worksheetNumber);
            },
        });
    }
}
```

### Programmatic operations

Create a new worksheet programmatically.

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

  <p><input type="button" value="Create a new worksheet" id="btn1" /></p>

  <script>
    // Create the spreadsheet
    let spreadsheet = jspreadsheet(document.getElementById("spreadsheet"), {
      tabs: true,
      worksheets: [
        {
          minDimensions: [5, 5],
          worksheetName: "Example2",
        },
      ],
    });

    document.getElementById("btn1").onclick = () =>
      spreadsheet[0].createWorksheet({ minDimensions: [5, 5] });
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
      <Spreadsheet ref={spreadsheet} tabs>
        <Worksheet minDimensions={[5, 5]} worksheetName={"Example2"} />
      </Spreadsheet>
      <input
        type={"button"}
        value={"Create a new worksheet"}
        onClick={() =>
          spreadsheet.current[0].createWorksheet({ minDimensions: [5, 5] })
        }
      />
    </>
  );
}
```

```vue
<template>
  <Spreadsheet ref="spreadsheet">
    <Worksheet :minDimensions="[5, 5]" worksheetName="Example2" />
  </Spreadsheet>
  <input
    type="button"
    value="Create a new worksheet"
    @click="createWorksheet"
  />
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
    createWorksheet() {
      this.$refs.spreadsheet.current[0].createWorksheet({
        minDimensions: [5, 5],
      });
    },
  },
  data() {
    return {};
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
    template: `<div #spreadsheet></div>
    <input type="button" value="Create a new worksheet" (click)="this.worksheets[0].createWorksheet({ minDimensions: [5,5] })">`
})
export class AppComponent {
    @ViewChild("spreadsheet") spreadsheet: ElementRef;
    // Worksheets
    worksheets: jspreadsheet.worksheetInstance[];
    // Create a new data grid
    ngAfterViewInit() {
        // Create spreadsheet
        this.worksheets = jspreadsheet(this.spreadsheet.nativeElement, {
            tabs: true,
            worksheets: [
                {
                    minDimensions: [5,5],
                    worksheetName: 'Example2',
                }
            ]
        });
    }
}
```
