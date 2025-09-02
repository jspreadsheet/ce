title: Spreadsheet Inline Cell Editors
keywords: Jspreadsheet, data grid, JavaScript, Excel-like controls, spreadsheet controls, data input editors, custom cell editors, input components, editor methods, editor settings, editor events, interactive data grid, custom data input
description: Jspreadsheet cell editors support integrating third-party JavaScript components, enabling advanced, customizable inputs for dynamic data entry.

# Spreadsheet Cell Editors

## Overview

Jspreadsheet editors assist users with cell input during editing. Jspreadsheet includes built-in components, from basic text fields to interactive widgets. The API also allows developers to create custom components, integrating various JavaScript input methods for enhanced data interaction.

### Available Editors

- text
- numeric
- hidden
- dropdown
- autocomplete
- checkbox
- radio
- calendar
- image
- color
- html

{.pro}

> #### Differences in the Pro Version
>
> The Pro version offers 17 native editors and allows defining cell-level editors and programmatically changing cell types.\
> \
> [Learn more](https://jspreadsheet.com/docs/editors){.button}

## Documentation

### Methods

Methods related to editors and data grid cell editing:

| Method        | Description                                                                                    |
| ------------- | ---------------------------------------------------------------------------------------------- |
| `getEditor`   | Retrieve the editor instance and options for a column (`x`) or cell (`x, y`).                  |
| `openEditor`  | Start editing a cell.<br/>`openEditor(cell: HTMLElement, empty: boolean, e: MouseEvent): void` |
| `closeEditor` | Close the editor.<br/>`closeEditor(cell: HTMLElement, save: boolean): void`                    |

### Events

Events related to editors and data grid editing:

| Event                     | Description                                                                                                                                                      |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `oneditionstart`          | Triggered when cell editing starts.<br/>`oneditionstart(worksheet: Object, cell: HTMLElement, x: number, y: number): void \| boolean`                            |
| `oneditionend`            | Triggered when cell editing ends.<br/>`oneditionend(worksheet: Object, cell: HTMLElement, x: number, y: number, v: any, save: boolean): void`                    |
| `oncreateeditor`{.nowrap} | Triggered when an editor is created.<br/>`oncreateeditor(worksheet: Object, cell: HTMLElement, x: number, y: number, input: HTMLElement, options: object): void` |

<br>

### Declaring the Editors

In CE, the `type` property declares the editor at the column level. The Pro version allows defining editors at the cell level.

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
    // Create a new spreadsheet
    jspreadsheet(document.getElementById("spreadsheet"), {
      worksheets: [
        {
          minDimensions: [5, 5],
          columns: [
            { type: "text" },
            { type: "dropdown", source: ["Male", "Female"] },
          ],
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

  // Columns
  const columns = [
    { type: "text" },
    { type: "dropdown", source: ["Male", "Female"] },
  ];

  // Render data grid component
  return (
    <Spreadsheet ref={spreadsheet}>
      <Worksheet columns={columns} />
    </Spreadsheet>
  );
}
```

```vue
<template>
  <Spreadsheet ref="spreadsheet">
    <Worksheet :columns="columns" :cells="cells" />
  </Spreadsheet>
</template>

<script>
import { ref } from "vue";
import { Spreadsheet, Worksheet } from "@jspreadsheet-ce/vue";
import "jsuites/dist/jsuites.css";
import "jspreadsheet-ce/dist/spreadsheet.css";

export default {
  components: {
    Spreadsheet,
    Worksheet,
  },
  setup() {
    // Define reactive data
    const columns = ref([
      { type: "text" },
      { type: "dropdown", source: ["Male", "Fermale"] },
    ]);

    // Return reactive data to the template
    return {
      columns,
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
            worksheets: [{
                minDimensions: [5,5],
                columns: [
                    { type: 'text' },
                    { type: 'dropdown', source: ['Male','Female'] }
                ],
            }]
        });
    }
}
```

### Custom Editors

Custom editors allow enhanced user interaction and data collection in your data grid. A custom editor is defined as a JavaScript object with the following methods:

| Method        | Description                                                                                                                                                              |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `createCell`  | Triggered when a new cell is created.<br/>`createCell(cell: Object, value: Any, x: Number, y: Number, instance: Object, options: Object): void`                          |
| `updateCell`  | Triggered when the cell value changes.<br/>`updateCell(cell: Object, value: Any, x: Number, y: Number, instance: Object, options: Object): void`                         |
| `openEditor`  | Triggered when the user starts editing a cell.<br/>`openEditor(cell: Object, value: Any, x: Number, y: Number, instance: Object, options: Object): void`                 |
| `closeEditor` | Triggered when the user finalizes the cell edit.<br/>`closeEditor(cell: Object, confirmChanges: Boolean, x: Number, y: Number, instance: Object, options: Object): void` |
| `destroyCell` | Triggered when a cell is destroyed.<br/>`destroyCell(cell: Object, x: Number, y: Number, instance: Object): void`                                                        |
| `get`         | Converts raw data into processed data, such as displaying text instead of an ID in a dropdown type.<br/>`get(options: Object, value: Any): Any`                          |

## Examples

### Native Editors

A basic example showcasing the use of multiple native editors.

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
      worksheets: [
        {
          data: [
            [
              "Jazz",
              "Honda",
              "2019-02-12",
              "/templates/default/img/nophoto.jpg",
              true,
              2000.0,
              "#777700",
            ],
            [
              "Civic",
              "Honda",
              "2018-07-11",
              "/templates/default/img/nophoto.jpg",
              true,
              4000.01,
              "#007777",
            ],
          ],
          columns: [
            {
              type: "text",
              title: "Car",
            },
            {
              type: "dropdown",
              title: "Make",
              source: [
                "Alfa Romeo",
                "Audi",
                "Bmw",
                "Chevrolet",
                "Chrysler",
                "Dodge",
                "Ferrari",
                "Fiat",
                "Ford",
                "Honda",
                "Hyundai",
                "Jaguar",
                "Jeep",
                "Kia",
                "Mazda",
                "Mercedes-Benz",
                "Mitsubishi",
                "Nissan",
                "Peugeot",
                "Porsche",
                "Subaru",
                "Suzuki",
                "Toyota",
                "Volkswagen",
              ],
            },
            {
              type: "calendar",
              title: "Available",
              options: { format: "DD/MM/YYYY" },
            },
            {
              type: "image",
              title: "Photo",
            },
            {
              type: "checkbox",
              title: "Stock",
              width: 80,
            },
            {
              type: "text",
              title: "Price",
              mask: "$ #.##0,00",
              width: 80,
              decimal: ",",
              disabledMaskOnEdition: true,
            },
            {
              type: "color",
              width: 80,
              render: "square",
            },
          ],
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
  // Data
  const data = [
    [
      "Jazz",
      "Honda",
      "2019-02-12",
      "/templates/default/img/nophoto.jpg",
      true,
      2000.0,
      "#777700",
    ],
    [
      "Civic",
      "Honda",
      "2018-07-11",
      "/templates/default/img/nophoto.jpg",
      true,
      4000.01,
      "#007777",
    ],
  ];
  // Columns
  const columns = [
    {
      type: "text",
      title: "Car",
      width: 120,
    },
    {
      type: "dropdown",
      title: "Make",
      width: 180,
      source: [
        "Alfa Romeo",
        "Audi",
        "Bmw",
        "Chevrolet",
        // (...)
      ],
    },
    {
      type: "calendar",
      title: "Available",
      width: 120,
      options: { format: "DD/MM/YYYY" },
    },
    {
      type: "image",
      title: "Photo",
      width: 120,
    },
    {
      type: "checkbox",
      title: "Stock",
      width: 80,
    },
    {
      type: "text",
      title: "Price",
      mask: "$ #.##0,00",
      width: 100,
      decimal: ",",
      disabledMaskOnEdition: true,
    },
    {
      type: "color",
      width: 100,
      render: "square",
    },
  ];

  // Render data grid component
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
import { Spreadsheet, Worksheet } from "@jspreadsheet-ce/vue";
import "jsuites/dist/jsuites.css";
import "jspreadsheet-ce/dist/jspreadsheet.css";

export default {
  components: {
    Spreadsheet,
    Worksheet,
  },
  data() {
    // Data
    const data = [
      [
        "Jazz",
        "Honda",
        "2019-02-12",
        "/templates/default/img/nophoto.jpg",
        true,
        2000.0,
        "#777700",
      ],
      [
        "Civic",
        "Honda",
        "2018-07-11",
        "/templates/default/img/nophoto.jpg",
        true,
        4000.01,
        "#007777",
      ],
    ];
    // Columns
    const columns = [
      {
        type: "text",
        title: "Car",
        width: 120,
      },
      {
        type: "dropdown",
        title: "Make",
        width: 180,
        source: [
          "Alfa Romeo",
          "Audi",
          "Bmw",
          "Chevrolet",
          // (...)
        ],
      },
      {
        type: "calendar",
        title: "Available",
        width: 120,
        options: { format: "DD/MM/YYYY" },
      },
      {
        type: "image",
        title: "Photo",
        width: 120,
      },
      {
        type: "checkbox",
        title: "Stock",
        width: 80,
      },
      {
        type: "text",
        title: "Price",
        mask: "$ #.##0,00",
        width: 100,
        decimal: ",",
        disabledMaskOnEdition: true,
      },
      {
        type: "color",
        width: 100,
        render: "square",
      },
    ];

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

import "jsuites/dist/jsuites.css";
import "jspreadsheet-ce/dist/jspreadsheet.css";

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
            worksheets: [{
                data: [
                    ['Jazz', 'Honda', '2019-02-12', '/templates/default/img/nophoto.jpg', true, 2000.00, '#777700'],
                    ['Civic', 'Honda', '2018-07-11', '/templates/default/img/nophoto.jpg', true, 4000.01, '#007777'],
                ],
                columns: [
                    {
                        type:'text',
                        title:'Car',
                        width:120
                    },
                    {
                        type: 'dropdown',
                        title:'Make',
                        width:180,
                        source:[
                            "Alfa Romeo",
                            "Audi",
                            "Bmw",
                            "Chevrolet",
                            "Chrysler",
                            "Dodge",
                            "Ferrari",
                            "Fiat",
                            "Ford",
                            "Honda",
                            "Hyundai",
                            "Jaguar",
                            "Jeep",
                            "Kia",
                            "Mazda",
                            "Mercedes-Benz",
                            "Mitsubishi",
                            "Nissan",
                            "Peugeot",
                            "Porsche",
                            "Subaru",
                            "Suzuki",
                            "Toyota",
                            "Volkswagen"
                          ]
                    },
                    {
                        type: 'calendar',
                        title:'Available',
                        width:120,
                        options:{ format:'DD/MM/YYYY' }
                    },
                    {
                        type: 'image',
                        title:'Photo',
                        width:120
                    },
                    {
                        type: 'checkbox',
                        title:'Stock',
                        width:80
                    },
                    {
                        type: 'text',
                        title:'Price',
                        mask:'$ #.##0,00',
                        width:100,
                        decimal:',',
                        disabledMaskOnEdition: true
                    },
                    {
                        type: 'color',
                        width:100,
                        render:'square',
                    },
                 ]
            }]
        });
    }
}
```

### Custom Editor

Create an edit button within a cell.

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
    let action = (function () {
      let methods = {};

      methods.createCell = function (cell, value, x, y, instance, options) {
        let input = document.createElement("i");
        input.className = "material-icons";
        input.style.cursor = "pointer";
        input.style.fontSize = "22px";
        input.innerHTML = "search";
        input.onclick = function () {
          let id = instance.getValueFromCoords(0, y);
          // Do some action
          alert(id);
        };

        cell.appendChild(input);
      };

      return methods;
    })();

    // Create a new spreadsheet
    jspreadsheet(document.getElementById("spreadsheet"), {
      worksheets: [
        {
          data: [
            [1, "Google"],
            [2, "Bing"],
            [3, "Yahoo"],
            [4, "Duckduckgo"],
          ],
          columns: [
            { type: "text", width: "100px" },
            { type: "rating", width: "100px" },
            { type: action, width: "100px", readOnly: true },
          ],
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

const action = (function () {
  let methods = {};

  methods.createCell = (cell, value, x, y, instance, options) => {
    let input = document.createElement("i");
    input.className = "material-icons";
    input.style.cursor = "pointer";
    input.style.fontSize = "22px";
    input.innerHTML = "search";
    input.onclick = function () {
      let id = instance.getValueFromCoords(0, y);
      // Do some action
      alert(id);
    };

    cell.appendChild(input);
  };

  return methods;
})();

export default function App() {
  // Spreadsheet array of worksheets
  const spreadsheet = useRef();
  // Data
  const data = [
    [1, "Google"],
    [2, "Bing"],
    [3, "Yahoo"],
    [4, "Duckduckgo"],
  ];
  // Columns
  const columns = [
    { type: "text", width: "100px" },
    { type: "rating", width: "100px" },
    { type: action, width: "100px", readOnly: true },
  ];

  // Render data grid component
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

const Action = (function () {
  let methods = {};

  methods.createCell = (cell, value, x, y, instance, options) => {
    let input = document.createElement("i");
    input.className = "material-icons";
    input.style.cursor = "pointer";
    input.style.fontSize = "22px";
    input.innerHTML = "search";
    input.onclick = function () {
      let id = instance.getValueFromCoords(0, y);
      alert(id);
    };

    cell.appendChild(input);
  };

  return methods;
})();

export default {
  components: {
    Spreadsheet,
    Worksheet,
  },
  setup() {
    const data = ref([
      [1, "Google"],
      [2, "Bing"],
      [3, "Yahoo"],
      [4, "Duckduckgo"],
    ]);

    const columns = ref([
      { type: "text", width: "100px" },
      { type: "rating", width: "100px" },
      { type: Action, width: "100px", readOnly: true },
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

import "jsuites/dist/jsuites.css";
import "jspreadsheet-ce/dist/jspreadsheet.css";

const Action = function() {
    let methods = {};

    methods.createCell = (cell, value, x, y, instance, options) => {
        let input = document.createElement('i');
        input.className = 'material-icons';
        input.style.cursor = 'pointer';
        input.style.fontSize = '22px';
        input.innerHTML = "search";
        input.onclick = function() {
            let id = instance.getValueFromCoords(0,y);
            alert(id);
        }

        cell.appendChild(input);
    }

    return methods;
}();

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
            worksheets: [{
                data: [
                    [1, 'Google'],
                    [2, 'Bing'],
                    [3, 'Yahoo'],
                    [4, 'Duckduckgo'],
                ],
                columns: [
                    { type: 'text', width:'100px' },
                    { type: 'rating', width:'100px' },
                    { type: action, width:'100px', readOnly: true },
                ]
            }]
        });
    }
}
```

## More Resources

### Editors Source Code

The source code for editors is available for reference. Use these examples as a foundation to create your custom editors.\
\
[https://github.com/jspreadsheet/editors](https://github.com/jspreadsheet/editors){.button}
