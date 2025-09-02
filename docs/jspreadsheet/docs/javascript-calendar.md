title: Javascript Calendar and Date Operations
keywords: Jspreadsheet, data grid, javascript, excel-like calendar, spreadsheet calendar, javascript calendar, data grid calendar, advanced calendar, calendar events, calendar settings, interactive data grid, customizable calendar, dynamic calendar, event-driven calendar, calendar integration
description: Explore the data grid calendar input type, date operations, formatting, validations, events, and other related date operations and calendar features available in Jspreadsheet.

# Date operations

This section explains how to handle dates in Jspreadsheet, focusing on the calendar input type and various date operations. You can work with dates by applying a mask to text input fields or using the dedicated calendar type.

**Key Differences:**

- **Text type with date mask**: This option supports date-related calculations, copy-paste functionality, and fill-handle operations similar to Excel. It allows dates to be treated as numerical values, making it ideal for performing operations.
- **Calendar Type**: This option provides a calendar picker for selecting dates but stores the value as a string. It’s more focused on user-friendly input rather than complex date calculations.

This section covers the following topics:

- **Configuring the calendar picker**: How to customize the calendar editor for user-friendly date selection.
- **Validating date values**: Set rules to ensure date inputs are valid based on the values in other columns.
- **Performing date calculations**: Use formulas to calculate date differences, add days, or perform other date-related operations.
- **Formatting dates with new tokens**: Learn how to use tokens to format dates in different styles.
- **Localization of date strings**: Translate date formats and related strings to match different locales and languages.

## Documentation

### Calendar editor

The [JavaScript calendar](https://jsuites.net/docs/javascript-calendar) from [jsuites.net](https://jsuites.net/docs) is a highly flexible and responsive plugin that offers numerous configurations to adapt to various application needs. For more information, refer to its [documentation](https://jsuites.net/docs/javascript-calendar).

| Parameter                            | Description                                                                                       |
| ------------------------------------ | ------------------------------------------------------------------------------------------------- |
| type: `default \| year-month-picker` | Render type. `Default: default`                                                                   |
| validRange: `[String, String]`       | Disables the dates out of the defined range. `[Initial date, Final date]`                         |
| startingDay: `Number`                | The day of the week the calendar starts on (0 for Sunday - 6 for Saturday). `Default: 0 (Sunday)` |
| format: `String`                     | Date format. `Default: YYYY-MM-DD`                                                                |
| readonly: `Boolean`                  | Calendar input is readonly. `Default: false`                                                      |
| today: `Boolean`                     | Select today's date automatically when no date value is defined. `Default: true`                  |
| time: `Boolean`                      | Show hour and minute dropdown. `Default: false`                                                   |
| resetButton: `Boolean`               | Enabled reset button. `Default: true`                                                             |
| placeholder: `String`                | Default place holder for the calendar input.                                                      |
| fullscreen: `Boolean`                | Open in fullscreen mode.                                                                          |

## Examples

### Cells with Date Format

The example below demonstrates applying a date format to the results of a formula.

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
    // Create worksheet
    jspreadsheet(document.getElementById("spreadsheet"), {
      worksheets: [
        {
          minDimensions: [4, 4],
          data: [["=NOW()"]],
          cells: {
            A1: { format: "dd/mm/yyyy" },
          },
        },
      ],
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
  // Data
  const data = [["=NOW()"]];
  // Data grid cell definitions
  const cells = {
    A1: { format: "dd/mm/yyyy" },
  };
  // Render data grid component
  return (
    <Spreadsheet ref={spreadsheet}>
      <Worksheet data={data} cells={cells} minDimensions={[4, 4]} />
    </Spreadsheet>
  );
}
```

```vue
<template>
  <Spreadsheet ref="spreadsheet">
    <Worksheet :data="data" :cells="cells" :minDimensions="[4, 4]" />
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
    const data = [["=NOW()"]];
    // Data grid cell definitions
    const cells = {
      A1: { format: "dd/mm/yyyy" },
    };

    return {
      data,
      cells,
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
            worksheets: [{
                minDimensions: [4,4],
                data: [
                    [ '=NOW()' ]
                ],
                cells: {
                    A1: { format: 'dd/mm/yyyy' },
                }
            }]
        });
    }
}
```

### Column Calendar Customization

In the example below, we configure the calendar column type as a year-month picker only.

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
          minDimensions: [4, 4],
          data: [["2021-01-01", "", "", ""]],
          columns: [
            {
              type: "calendar",
              options: { type: "year-month-picker", format: "Mon/YYYY" },
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
import { Spreadsheet, Worksheet } from "@jspreadsheet/react";
import "jsuites/dist/jsuites.css";
import "jspreadsheet-ce/dist/jspreadsheet.css";

export default function App() {
  // Spreadsheet array of worksheets
  const spreadsheet = useRef();
  // Data
  const data = [["2021-01-01", "", "", ""]];
  // Data grid cell definitions
  const columns = [
    {
      type: "calendar",
      options: { type: "year-month-picker", format: "Mon/YYYY" },
    },
  ];
  // Render data grid component
  return (
    <Spreadsheet ref={spreadsheet}>
      <Worksheet data={data} columns={columns} minDimensions={[4, 4]} />
    </Spreadsheet>
  );
}
```

```vue
<template>
  <Spreadsheet ref="spreadsheet">
    <Worksheet :data="data" :columns="columns" :minDimensions="[4, 4]" />
  </Spreadsheet>
</template>

<script setup>
import { ref } from "vue";
import { Spreadsheet, Worksheet } from "@jspreadsheet-ce/vue";
import "jsuites/dist/jsuites.css";
import "jspreadsheet-ce/dist/spreadsheet.css";

// Data
const data = ref([["2021-01-01", "", "", ""]]);

// Data grid cell definitions
const columns = ref([
  {
    type: "calendar",
    options: { type: "year-month-picker", format: "Mon/YYYY" },
  },
]);

// Optional: spreadsheet ref to match template
const spreadsheet = ref(null);
</script>
```

```angularjs
import { Component, ViewChild, ElementRef } from "@angular/core";
import jspreadsheet from "jspreadsheet-ce";

import "jspreadsheet-ce/dist/jspreadsheet.css"
import "jsuites/dist/jsuites.css"

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
            worksheets: [{
                minDimensions: [4,4],
                data: [
                    [ '2021-01-01', '', '', '' ]
                ],
                columns: [
                    { type: 'calendar', options: { type: 'year-month-picker', format: 'Mon/YYYY' } },
                ]
            }]
        });
    }
}
```

### Calendar Date Validations

In the example below, `filterOptions` is used to overwrite the column configuration `validRange` just before the edit. The rule is that the last column cannot have a date after the previous column date. Additionally, the onbeforechange event behavior blocks the user from pasting or programmatically breaking this rule.

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
    let filterOptions = function (worksheet, cell, x, y, value, config) {
      // Get the value of the previous column
      let previousColumnValue = worksheet.getValueFromCoords(x - 1, y);
      // Set a valid range to avoid past dates to be selected
      config.options.validRange = [previousColumnValue, null];
      // Customized options
      return config;
    };

    // Create a new spreadsheet
    jspreadsheet(document.getElementById("spreadsheet"), {
      worksheets: [
        {
          data: [
            ["Roger Taylor", "2019-01-01", "2019-03-01"],
            ["Bob Shiran", "2019-04-03", "2019-05-03"],
            ["Daniel P.", "2018-12-03", "2018-12-03"],
            ["Karen Roberts", "2018-12-03", "2019-01-03"],
          ],
          columns: [
            {
              type: "text",
              title: "Name",
              width: "300px",
            },
            {
              type: "calendar",
              title: "From",
              options: { format: "DD/MM/YYYY" },
              width: "150px",
            },
            {
              type: "calendar",
              title: "To",
              options: { format: "DD/MM/YYYY" },
              filterOptions: filterOptions,
              width: "150px",
            },
          ],
          worksheetName: "Rules",
        },
      ],
      onbeforechange: function (worksheet, cell, x, y, value) {
        // Valid only for second column
        if (x == 2 && value) {
          // Get the value of the previous column
          let previousColumnValue = worksheet.getValueFromCoords(x - 1, y);
          if (previousColumnValue > value) {
            cell.style.border = "1px solid red";
            // Return nothing
            return "";
          } else {
            cell.style.border = "";
          }
        }
        return value;
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

// Filter option will change the column settings just before the edition
const filterOptions = (worksheet, cell, x, y, value, config) => {
  // Get the value of the previous column
  let previousColumnValue = worksheet.getValueFromCoords(x - 1, y);
  // Set a valid range to avoid past dates to be selected
  config.options.validRange = [previousColumnValue, null];
  // Customized options
  return config;
};

export default function App() {
  // Spreadsheet array of worksheets
  const spreadsheet = useRef();
  // Data
  const data = [
    ["Roger Taylor", "2019-01-01", "2019-03-01"],
    ["Bob Shiran", "2019-04-03", "2019-05-03"],
    ["Daniel P.", "2018-12-03", "2018-12-03"],
    ["Karen Roberts", "2018-12-03", "2019-01-03"],
  ];
  // Data grid cell definitions
  const columns = [
    {
      type: "text",
      title: "Name",
      width: "300px",
    },
    {
      type: "calendar",
      title: "From",
      options: { format: "DD/MM/YYYY" },
      width: "150px",
    },
    {
      type: "calendar",
      title: "To",
      options: { format: "DD/MM/YYYY" },
      filterOptions: filterOptions,
      width: "150px",
    },
  ];
  // Event
  const onbeforechange = (worksheet, cell, x, y, value) => {
    // Valid only for second column
    if (x == 2 && value) {
      // Get the value of the previous column
      let previousColumnValue = worksheet.getValueFromCoords(x - 1, y);
      if (previousColumnValue > value) {
        cell.style.border = "1px solid red";
        // Return nothing
        return "";
      } else {
        cell.style.border = "";
      }
    }
    return value;
  };

  // Render data grid component
  return (
    <Spreadsheet ref={spreadsheet} onbeforechange={onbeforechange}>
      <Worksheet
        worksheetName={"Rules"}
        data={data}
        columns={columns}
        minDimensions={[4, 4]}
      />
    </Spreadsheet>
  );
}
```

```vue
<template>
  <div>
    <Spreadsheet ref="spreadsheet" :onbeforechange="onBeforeChange">
      <Worksheet :data="data" :columns="columns" :min-dimensions="[4, 4]" />
    </Spreadsheet>
    <div ref="log"></div>
    <button @click="setMerge('A3', 2, 3)">setMerge('A3', 2, 3)</button>
    <button @click="removeMerge('A3')">removeMerge('A3')</button>
    <button @click="getMergedCells">Get all merged cells</button>
    <button @click="destroyAllMergedCells">Destroy all merged</button>
  </div>
</template>

<script>
import { ref } from "vue";
import { Spreadsheet, Worksheet } from "@jspreadsheet-ce/vue";
import "jsuites/dist/jsuites.css";
import "jspreadsheet-ce/dist/jspreadsheet-ce.css";

export default {
  name: "App",
  components: {
    Spreadsheet,
    Worksheet,
  },
  setup() {
    const spreadsheet = ref(null);
    const log = ref(null);

    const data = ref([
      ["Roger Taylor", "2019-01-01", "2019-03-01"],
      ["Bob Shiran", "2019-04-03", "2019-05-03"],
      ["Daniel P.", "2018-12-03", "2018-12-03"],
      ["Karen Roberts", "2018-12-03", "2019-01-03"],
    ]);

    const columns = ref([
      {
        type: "text",
        title: "Name",
        width: "300px",
      },
      {
        type: "calendar",
        title: "From",
        options: { format: "DD/MM/YYYY" },
        width: "150px",
      },
      {
        type: "calendar",
        title: "To",
        options: { format: "DD/MM/YYYY" },
        filterOptions: (worksheet, cell, x, y, value, config) => {
          let previousColumnValue = worksheet.getValueFromCoords(x - 1, y);
          config.options.validRange = [previousColumnValue, null];
          return config;
        },
        width: "150px",
      },
    ]);

    const setMerge = (cell, rows, cols) => {
      spreadsheet.value[0].setMerge(cell, rows, cols);
    };

    const removeMerge = (cell) => {
      spreadsheet.value[0].removeMerge(cell);
    };

    const getMergedCells = () => {
      log.value.innerText = JSON.stringify(spreadsheet.value[0].getMerge());
    };

    const destroyAllMergedCells = () => {
      spreadsheet.value[0].destroyMerge();
    };

    const onBeforeChange = (worksheet, cell, x, y, value) => {
      if (x === 2 && value) {
        let previousColumnValue = worksheet.getValueFromCoords(x - 1, y);
        if (previousColumnValue > value) {
          cell.style.border = "1px solid red";
          return "";
        } else {
          cell.style.border = "";
        }
      }
      return value;
    };

    return {
      spreadsheet,
      log,
      data,
      columns,
      setMerge,
      removeMerge,
      getMergedCells,
      destroyAllMergedCells,
      onBeforeChange,
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

// Filter the options in real time before opening the editor
const filterOptions = function(worksheet, cell, x, y, value, config) {
    // Get the value of the previous column
    let previousColumnValue = worksheet.getValueFromCoords(x - 1, y);
    // Set a valid range to avoid past dates to be selected
    config.options.validRange = [ previousColumnValue, null ];
    // Customized options
    return config;
}

// Create component
@Component({
    selector: "app-root",
    template: `<div #spreadsheet></div>`;
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
                    ['Roger Taylor', '2019-01-01', '2019-03-01' ],
                    ['Bob Shiran', '2019-04-03', '2019-05-03'],
                    ['Daniel P.', '2018-12-03', '2018-12-03'],
                    ['Karen Roberts', '2018-12-03', '2019-01-03'],
                ],
                columns: [
                    {
                        type:'text',
                        title:'Name',
                        width:'300px',
                    },
                    {
                        type:'calendar',
                        title:'From',
                        options: { format:'DD/MM/YYYY' },
                        width:'150px',
                    },
                    {
                        type:'calendar',
                        title:'To',
                        options: { format:'DD/MM/YYYY' },
                        filterOptions: filterOptions,
                        width:'150px',
                    },
                ],
                worksheetName: 'Rules',
            }],
            onbeforechange: function(worksheet, cell, x, y, value) {
                // Valid only for second column
                if (x == 2 && value) {
                    // Get the value of the previous column
                    let previousColumnValue = worksheet.getValueFromCoords(x - 1, y);
                    if (previousColumnValue > value) {
                        cell.style.border = '1px solid red';
                        // Return nothing
                        return '';
                    } else {
                        cell.style.border = '';
                    }
                }
                return value;
            }
        });
    }
}
```

### International Calendar Configurations

To translate the text in the calendar plugin, you can include the `setDictionary` method as below.

```html
<div id="spreadsheet"></div>

<script>
  //The dictionary can be defined as below
  let dictionary = {
    // Other entries (...)
    // Calendar specific entries
    Jan: "Jan",
    Feb: "Fev",
    Mar: "Mar",
    Apr: "Abr",
    May: "Mai",
    Jun: "Jun",
    Jul: "Jul",
    Aug: "Ago",
    Sep: "Set",
    Oct: "Out",
    Nov: "Nov",
    Dec: "Dez",
    January: "Janeiro",
    February: "Fevereiro",
    March: "Março",
    April: "Abril",
    May: "Maio",
    June: "Junho",
    July: "Julho",
    August: "Agosto",
    September: "Setembro",
    October: "Outubro",
    November: "Novembro",
    December: "Dezembro",
    Sunday: "Domingo",
    Monday: "Segunda",
    Tuesday: "Terca",
    Wednesday: "Quarta",
    Thursday: "Quinta",
    Friday: "Sexta",
    Saturday: "Sabado",
    Done: "Feito",
    Reset: "Apagar",
    Update: "Atualizar",
  };

  // Send dictionary to the JSS scope
  jspreadsheet.setDictionary(dictionary);

  // Create worksheet
  jspreadsheet(document.getElementById("spreadsheet"), {
    worksheets: [
      {
        minDimensions: [4, 4],
        columns: [
          { type: "calendar", options: { startingDay: 1 } },
          { type: "calendar", options: { startingDay: 1 } },
          { type: "calendar", options: { startingDay: 1 } },
          { type: "calendar", options: { startingDay: 1 } },
        ],
      },
    ],
  });
</script>
```

```jsx
import React, { useRef } from "react";
import { Spreadsheet, Worksheet, jspreadsheet } from "@jspreadsheet/react";
import "jsuites/dist/jsuites.css";
import "jspreadsheet-ce/dist/jspreadsheet.css";

// Send dictionary to the JSS scope
jspreadsheet.setDictionary({
  // Other entries (...)
  // Calendar specific entries
  Jan: "Jan",
  Feb: "Fev",
  Mar: "Mar",
  Apr: "Abr",
  May: "Mai",
  Jun: "Jun",
  Jul: "Jul",
  Aug: "Ago",
  Sep: "Set",
  Oct: "Out",
  Nov: "Nov",
  Dec: "Dez",
  January: "Janeiro",
  February: "Fevereiro",
  March: "Março",
  April: "Abril",
  May: "Maio",
  June: "Junho",
  July: "Julho",
  August: "Agosto",
  September: "Setembro",
  October: "Outubro",
  November: "Novembro",
  December: "Dezembro",
  Sunday: "Domingo",
  Monday: "Segunda",
  Tuesday: "Terca",
  Wednesday: "Quarta",
  Thursday: "Quinta",
  Friday: "Sexta",
  Saturday: "Sabado",
  Done: "Feito",
  Reset: "Apagar",
  Update: "Atualizar",
});

export default function App() {
  // Spreadsheet array of worksheets
  const spreadsheet = useRef();
  // Data
  const data = [
    { type: "calendar", options: { startingDay: 1 } },
    { type: "calendar", options: { startingDay: 1 } },
    { type: "calendar", options: { startingDay: 1 } },
    { type: "calendar", options: { startingDay: 1 } },
  ];

  // Render data grid component
  return (
    <Spreadsheet ref={spreadsheet}>
      <Worksheet data={data} minDimensions={[4, 4]} />
    </Spreadsheet>
  );
}
```

```vue
<template>
  <Spreadsheet ref="spreadsheet">
    <Worksheet :data="data" />
  </Spreadsheet>
</template>

<script>
import { Spreadsheet, Worksheet, jspreadsheet } from "@jspreadsheet-ce/vue";
import "jsuites/dist/jsuites.css";
import "jspreadsheet-ce/dist/jspreadsheet.css";

// Send dictionary to the JSS scope
jspreadsheet.setDictionary({
  // Other entries (...)
  // Calendar specific entries
  Jan: "Jan",
  Feb: "Fev",
  Mar: "Mar",
  Apr: "Abr",
  May: "Mai",
  Jun: "Jun",
  Jul: "Jul",
  Aug: "Ago",
  Sep: "Set",
  Oct: "Out",
  Nov: "Nov",
  Dec: "Dez",
  January: "Janeiro",
  February: "Fevereiro",
  March: "Março",
  April: "Abril",
  May: "Maio",
  June: "Junho",
  July: "Julho",
  August: "Agosto",
  September: "Setembro",
  October: "Outubro",
  November: "Novembro",
  December: "Dezembro",
  Sunday: "Domingo",
  Monday: "Segunda",
  Tuesday: "Terca",
  Wednesday: "Quarta",
  Thursday: "Quinta",
  Friday: "Sexta",
  Saturday: "Sabado",
  Done: "Feito",
  Reset: "Apagar",
  Update: "Atualizar",
});

export default {
  components: {
    Spreadsheet,
    Worksheet,
  },
  data() {
    // Data
    const data = [
      { type: "calendar", options: { startingDay: 1 } },
      { type: "calendar", options: { startingDay: 1 } },
      { type: "calendar", options: { startingDay: 1 } },
      { type: "calendar", options: { startingDay: 1 } },
    ];

    return {
      data,
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

//The dictionary can be defined as below
const dictionary = {
    // Other entries (...)
    // Calendar specific entries
    'Jan': 'Jan',
    'Feb': 'Fev',
    'Mar': 'Mar',
    'Apr': 'Abr',
    'May': 'Mai',
    'Jun': 'Jun',
    'Jul': 'Jul',
    'Aug': 'Ago',
    'Sep': 'Set',
    'Oct': 'Out',
    'Nov': 'Nov',
    'Dec': 'Dez',
    'January': 'Janeiro',
    'February': 'Fevereiro',
    'March': 'Março',
    'April': 'Abril',
    'May': 'Maio',
    'June': 'Junho',
    'July': 'Julho',
    'August': 'Agosto',
    'September': 'Setembro',
    'October': 'Outubro',
    'November': 'Novembro',
    'December': 'Dezembro',
    'Sunday': 'Domingo',
    'Monday': 'Segunda',
    'Tuesday': 'Terca',
    'Wednesday': 'Quarta',
    'Thursday': 'Quinta',
    'Friday': 'Sexta',
    'Saturday': 'Sabado',
    'Done': 'Feito',
    'Reset': 'Apagar',
    'Update': 'Atualizar',
}

// Send dictionary to the JSS scope
jspreadsheet.setDictionary(dictionary);

// Create component
@Component({
    selector: "app-root",
    template: `<div #spreadsheet></div>`;
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
                minDimensions: [4,4],
                columns: [
                    { type: 'calendar', options: { startingDay: 1 } },
                    { type: 'calendar', options: { startingDay: 1 } },
                    { type: 'calendar', options: { startingDay: 1 } },
                    { type: 'calendar', options: { startingDay: 1 } },
                ]
            }]
        });
    }
}
```

## Related content

- The Jspreadsheet calendar types uses the jSuites [JavaScript Calendar](https://jsuites.net/docs/javascript-calendar) component.
