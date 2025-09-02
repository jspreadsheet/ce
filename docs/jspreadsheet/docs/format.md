title: Data Grid Cell Masking
keywords: Jspreadsheet, Jexcel, data grid, JavaScript, cell formatting, currency format, date format, date mask, number formatting, spreadsheet currency, data formatting, format mask, data display customization, Jspreadsheet formatting
description: Learn how to format and customize cell data in Jspreadsheet. Explore techniques for formatting numbers, currency, dates, and more to improve the presentation of your data grid.

# Cell Formatting

Jspreadsheet offers flexible cell formatting features similar to Excel and Google Sheets, with customizable options for better data presentation. You can format numbers, currencies, dates, and more to suit specific application requirements, enabling enhanced control over how data is displayed and integrated.

## Overview

### Column Level Settings

The following properties are applied uniformly to all cells in a column.

| Attribute         | Description                                                                                                         |
| ----------------- | ------------------------------------------------------------------------------------------------------------------- |
| mask?: object     | This property force the mask during the edition.                                                                    |
| format?: object   | This property will mask the content of a cell after the edition.                                                    |
| locale? object    | This property apply the JavaScript Intl.FormatNumber to the cells.                                                  |
| render?: function | Intercepts and modifies the text of all cells in a column.<br>`render(td, value, x, y, worksheet, options) => void` |

{.pro}

> #### Differences in the Pro Version
>
> Jspreadsheet Pro allows cell-level format and other advanced format customizations.\
> \
> [Learn more](https://jspreadsheet.com/docs/format){.button}

## Documentation

### Mask and Format Settings

In Jspreadsheet CE, the `mask` property enforces a specific input pattern during cell editing using spreadsheet-like tokens. The `format` property applies formatting rules to cell content after editing. Below are examples of tokens that can be used:

| Valid examples |
| -------------- |
| 0              |
| 0.00           |
| 0%             |
| 0.00%          |
| #,##0          |
| #,##0.00       |
| #,##0          |
| d-mmm-yy       |
| d-mmm          |
| dd/mm/yyyy     |
| mmm-yy         |
| h:mm AM/PM     |
| h:mm:ss AM/PM  |
| h:mm           |
| h:mm:ss        |
| m/d/yy h:mm    |
| mm:ss          |
| [h]:mm:ss      |

#### Example

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
    jspreadsheet(document.getElementById("spreadsheet"), {
      worksheets: [
        {
          minDimensions: [6, 6],
          columns: [
            {
              type: "number",
              // Excel like token to format the currency input
              mask: "U$ #.##0,00",
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
  const columns = [
    {
      type: "number",
      // Excel like token to format the currency input
      mask: "U$ #.##0,00",
    },
  ];

  // Render data grid component
  return (
    <Spreadsheet ref={spreadsheet}>
      <Worksheet columns={columns} minDimensions={[6, 6]} />
    </Spreadsheet>
  );
}
```

```vue
<template>
  <Spreadsheet ref="spreadsheet">
    <Worksheet :columns="columns" />
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
    const columns = ref([
      {
        type: "number",
        // Excel-like token to format the currency input
        mask: "U$ #.##0,00",
      },
    ]);

    return {
      columns,
    };
  },
};
</script>
```

```angularjs
@Component({
    standalone: true,
    selector: "app-root",
    template: `<div #spreadsheet></div>`
})
export class AppComponent {
    // Create a new data grid
    ngAfterViewInit() {
        // Create spreadsheet
        this.worksheets = jspreadsheet(this.spreadsheet.nativeElement, {
            worksheets: [{
                minDimensions: [6,6],
                columns: [{
                    type: 'number',
                    // Excel like token to format the currency input
                    mask: 'U$ #.##0,00'
                }]
            }]
        });
    }
}
```

### Locale

#### Currency Formatting

To use the `currency` style in Jspreadsheet, specify the `currency` property. Optionally, you can use the `currencyDisplay` and `currencySign` properties to control the display format of the currency unit.

```html
<div id="spreadsheet1"></div>
<script>
  // India currency
  jspreadsheet(document.getElementById("spreadsheet1"), {
    worksheets: [
      {
        minDimensions: [6, 6],
        columns: [
          {
            type: "number",
            // Locale will enable number formatting
            locale: "en-IN",
            // Options for the number format class. You can find more about he options on the link above
            options: { style: "currency", currency: "INR" },
          },
        ],
      },
    ],
  });
</script>
```

```jsx
// India currency
export default function App() {
  // Spreadsheet array of worksheets
  const spreadsheet = useRef();
  // Columns
  const columns = [
    {
      type: "number",
      // Locale will enable number formatting
      locale: "en-IN",
      // Options for the number format class. You can find more about he options on the link above
      options: { style: "currency", currency: "INR" },
    },
  ];

  // Render data grid component
  return (
    <Spreadsheet ref={spreadsheet}>
      <Worksheet columns={columns} minDimensions={[6, 6]} />
    </Spreadsheet>
  );
}
```

```vue
<template>
  <Spreadsheet ref="spreadsheet">
    <Worksheet :columns="columns" />
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
    const columns = ref([
      {
        type: "number",
        // Locale will enable number formatting
        locale: "en-IN",
        // Options for the number format class. You can find more about he options on the link above
        options: { style: "currency", currency: "INR" },
      },
    ]);

    return {
      columns,
    };
  },
};
</script>
```

```angularjs
export class AppComponent {
    // Create a new data grid
    ngAfterViewInit() {
        // Create spreadsheet
        this.worksheets = jspreadsheet(this.spreadsheet.nativeElement, {
            worksheets: [{
                minDimensions: [6,6],
                columns: [{
                    type: 'number',
                    // Locale will enable number formatting
                    locale: 'en-IN',
                    // Options for the number format class. You can find more about he options on the link above
                    options: { style:'currency', currency: 'INR' }
                }]
            }]
        });
    }
}
```

### Custom Formatting with `render()`

Jspreadsheet supports custom masking through the `render` method, allowing you to customize cell content display.

{.ignore}

```javascript
jspreadsheet(DOMElement, {
  tabs: true,
  toolbar: true,
  worksheets: [
    {
      data: [["2022-01-01 12:14:12"], ["=TODAY()"]],
      columns: [
        {
          width: 300,
          customFormat: "MMMM Do YYYY, h:mm:ss a",
          render: function (td, value, x, y, worksheet, options) {
            if (td && td.innerText && options.customFormat) {
              td.innerText = moment(td.innerText).format(options.customFormat);
            }
          },
          align: "right",
        },
      ],
      minDimensions: [4, 8],
    },
  ],
});
```

## Examples

### Data Grid with Different Currencies

The example below demonstrates number formatting using `Intl.NumberFormat` or `mask`.

See more examples of the [spreadsheet format](https://jsfiddle.net/spreadsheet/L9jxszf3/) on jsfiddle

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
      toolbar: true,
      worksheets: [
        {
          minDimensions: [6, 10],
          data: [
            [1024, 1024, 0.24, 1024, 1024, 1024],
            [1000.456, 1000.456, 0.4155, 1000.456, 1000.456, 1000.456],
            ["547", "547,98", "7,98", "547.98", "547,98", "547.98"],
          ],
          columns: [
            {
              title: "Currency INR",
              type: "number",
              locale: "en-IN",
              options: { style: "currency", currency: "INR" },
            },
            {
              title: "Currency BRL",
              type: "number",
              locale: "pt-BR",
              options: { style: "currency", currency: "BRL" },
            },
            {
              title: "Percent US",
              type: "number",
              mask: "0.00%",
            },
            {
              title: "Units Liter US",
              type: "number",
              locale: "en-US",
              options: { style: "unit", unit: "liter", unitDisplay: "long" },
            },
            {
              type: "number",
              format: "#.##0,00",
            },
            {
              type: "number",
              mask: "#,##0",
            },
          ],
          defaultColWidth: "110px",
        },
      ],
    });
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
  // Data
  const data = [
    [1024, 1024, 0.24, 1024, 1024, 1024],
    [1000.456, 1000.456, 0.4155, 1000.456, 1000.456, 1000.456],
    ["547", "547,98", "7,98", "547.98", "547,98", "547.98"],
  ];
  // Columns
  const columns = [
    {
      title: "Currency INR",
      type: "number",
      locale: "en-IN",
      options: { style: "currency", currency: "INR" },
    },
    {
      title: "Currency BRL",
      type: "number",
      locale: "pt-BR",
      options: { style: "currency", currency: "BRL" },
    },
    {
      title: "Percent US",
      type: "number",
      mask: "0.00%",
    },
    {
      title: "Units Liter US",
      type: "number",
      locale: "en-US",
      options: { style: "unit", unit: "liter", unitDisplay: "long" },
    },
    {
      type: "number",
      format: "#.##0,00",
    },
    {
      type: "number",
      mask: "#,##0",
    },
  ];

  // Render data grid component
  return (
    <Spreadsheet ref={spreadsheet} toolbar>
      <Worksheet
        data={data}
        columns={columns}
        minDimensions={[6, 10]}
        defaultColWidth="110px"
      />
    </Spreadsheet>
  );
}
```

```vue
<template>
  <Spreadsheet ref="spreadsheet">
    <Worksheet
      :data="data"
      :columns="columns"
      :minDimensions="[6, 10]"
      defaultColWidth="110px"
    />
  </Spreadsheet>
</template>

<script setup>
import { ref } from "vue";
import { Spreadsheet, Worksheet } from "@jspreadsheet-ce/vue";
import "jsuites/dist/jsuites.css";
import "jspreadsheet-ce/dist/spreadsheet.css";

// Data
const data = ref([
  [1024, 1024, 0.24, 1024, 1024, 1024],
  [1000.456, 1000.456, 0.4155, 1000.456, 1000.456, 1000.456],
  ["547", "547,98", "7,98", "547.98", "547,98", "547.98"],
]);

// Columns
const columns = ref([
  {
    title: "Currency INR",
    type: "number",
    locale: "en-IN",
    options: { style: "currency", currency: "INR" },
  },
  {
    title: "Currency BRL",
    type: "number",
    locale: "pt-BR",
    options: { style: "currency", currency: "BRL" },
  },
  {
    title: "Percent US",
    type: "number",
    mask: "0.00%",
  },
  {
    title: "Units Liter US",
    type: "number",
    locale: "en-US",
    options: { style: "unit", unit: "liter", unitDisplay: "long" },
  },
  {
    type: "number",
    format: "#.##0,00",
  },
  {
    type: "number",
    mask: "#,##0",
  },
]);

const spreadsheet = ref(null);
</script>
```

```angularjs
@Component({
    selector: "app-root",
    template: `<div #spreadsheet></div>`
})
export class AppComponent {
    // Create a new data grid
    ngAfterViewInit() {
        // Create spreadsheet
        this.worksheets = jspreadsheet(this.spreadsheet.nativeElement, {
            toolbar: true,
            worksheets: [
                {
                    minDimensions:[6, 10],
                    data: [
                        [1024,1024,0.24,1024,1024,1024],
                        [1000.456,1000.456,0.4155,1000.456,1000.456,1000.456],
                        ['547','547,98','7,98','547.98','547,98','547.98'],
                    ],
                    columns: [
                        {
                            title:"Currency INR",
                            type: "number",
                            locale: 'en-IN',
                            options: { style:'currency', currency: 'INR' } },
                        {
                            title: "Currency BRL",
                            type: "number",
                            locale: 'pt-BR',
                            options: { style: 'currency', currency: 'BRL' } },
                        {
                            title: "Percent US",
                            type: "number",
                            mask: "0.00%" },
                        {
                            title: "Units Liter US",
                            type: "number",
                            locale: 'en-US',
                            options: { style: 'unit', unit: 'liter', unitDisplay: 'long' } },
                        {
                            type: "number",
                            format: '#.##0,00'
                        },
                        {
                            type: "number",
                            mask: '#,##0'
                        },
                    ],
                    defaultColWidth: '110px',
                }
            ]
        });
    }
}
```

### Custom Formatting with MomentJS

The example below demonstrates how to apply a mask to a cell using MomentJS.

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

  <script src="https://cdn.jsdelivr.net/npm/moment/moment.min.js"></script>

  <div id="spreadsheet"></div>

  <script>
    // Create a new spreadsheet
    const customRender = function (td, value, x, y, instance, options) {
      if (td && td.innerText && options.customFormat) {
        td.innerText = moment(td.innerText).format(options.customFormat);
      }
    };

    // Create the spreadsheet
    jspreadsheet(document.getElementById("spreadsheet"), {
      tabs: true,
      toolbar: true,
      worksheets: [
        {
          data: [["2022-01-01 12:14:12"], ["=TODAY()"]],
          columns: [
            {
              width: 300,
              customFormat: "MMMM Do YYYY, h:mm:ss a",
              render: customRender,
              align: "right",
            },
          ],
          minDimensions: [4, 8],
        },
      ],
    });
  </script>
</html>
```

```jsx
import React, { useRef } from "react";
import { Spreadsheet, Worksheet, jspreadsheet } from "@jspreadsheet-ce/react";
import moment from "momentjs";
import "jsuites/dist/jsuites.css";
import "jspreadsheet-ce/dist/jspreadsheet.css";

// Create a new spreadsheet
const customRender = function (td, value, x, y, instance, options) {
  if (td && td.innerText && options.customFormat) {
    td.innerText = moment(td.innerText).format(options.customFormat);
  }
};

export default function App() {
  // Spreadsheet array of worksheets
  const spreadsheet = useRef();
  // Data
  const data = [["2022-01-01 12:14:12"], ["=TODAY()"]];
  // Columns
  const columns = [
    {
      width: 300,
      customFormat: "MMMM Do YYYY, h:mm:ss a",
      render: customRender,
      align: "right",
    },
  ];

  // Render data grid component
  return (
    <Spreadsheet ref={spreadsheet}>
      <Worksheet data={data} columns={columns} minDimensions={[4, 8]} />
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
import moment from "momentjs";
import "jsuites/dist/jsuites.css";
import "jspreadsheet-ce/dist/jspreadsheet.css";

export default {
  components: {
    Spreadsheet,
    Worksheet,
  },
  setup() {
    // Data
    const data = ref([["2022-01-01 12:14:12"], ["=TODAY()"]]);

    // Columns
    const columns = ref([
      {
        width: 300,
        customFormat: "MMMM Do YYYY, h:mm:ss a",
        render: (td, value, x, y, instance, options) => {
          if (td && td.innerText && options.customFormat) {
            td.innerText = moment(td.innerText).format(options.customFormat);
          }
        },
        align: "right",
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



// Create a new spreadsheet
const customRender = function(td, value, x, y, instance, options) {
    if (td && td.innerText && options.customFormat) {
        td.innerText = moment(td.innerText).format(options.customFormat);
    }
}

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
            tabs: true,
            toolbar: true,
            worksheets: [{
                data: [['2022-01-01 12:14:12'],['=TODAY()']],
                columns: [{
                    width: 300,
                    customFormat: 'MMMM Do YYYY, h:mm:ss a',
                    render: customRender,
                    align: 'right',
                }],
                minDimensions: [4,8],
            }]
        });
    }
}
```
