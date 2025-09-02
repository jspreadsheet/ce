title: JavaScript Dropdown and Autocomplete Editors
keywords: Jspreadsheet, data grid, JavaScript dropdown, autocomplete, Excel-like dropdown, dynamic dropdown, dropdown customization, interactive grid
description: Learn how to implement and configure dropdown and autocomplete editors in Jspreadsheet, including dynamic settings and conditional logic for enhanced data input.

# JavaScript Dropdown

Jspreadsheet provides a versatile dropdown column type with features like:

- Dropdowns from arrays, JSON, or key-value objects
- Multiple selection and searchable options
- Custom rendering styles, including icons and grouped options

Refer to the official [JavaScript Dropdown](https://jsuites.net/docs/dropdown) documentation on the jSuites website.

{.pro}

> #### Differences in the Pro Version
>
> The Pro version offers conditional dropdowns, dynamic dropdowns from ranges (e.g., `Sheet1!A1:A4`), and additional advanced features.
>
> [Learn more](https://jspreadsheet.com/docs/dropdown-and-autocomplete){.button}

## Documentation

### Dropdown Settings

The Jspreadsheet CE supports various attributes for the dropdown column type.

| Property                | Description                                                   |
| ----------------------- | ------------------------------------------------------------- |
| `source: Items[]`       | Array of items to populate the dropdown.                      |
| `url: String`           | Fetch dropdown data from a remote URL.                        |
| `multiple: Boolean`     | Enable selection of multiple options.                         |
| `delimiter: String`     | Define the delimiter for multiple selections. Default: `';'`. |
| `autocomplete: Boolean` | Enable autocomplete for the dropdown.                         |

#### Extended Options

Extended options can be defined using the `options` property within the column.

| Property              | Description                                        |
| --------------------- | -------------------------------------------------- |
| `type: String`        | Render type: `default` \| `picker` \| `searchbar`. |
| `placeholder: String` | Placeholder text for instructions.                 |

### Properties of an Item

An object with the following attributes defines each option in the dropdown:

| Property            | Description                            |
| ------------------- | -------------------------------------- |
| `id: mixed`         | Key of the item.                       |
| `value: string`     | Value of the item.                     |
| `title: string`     | Description of the item.               |
| `image: string`     | Icon for the item.                     |
| `group: string`     | Name of the group the item belongs to. |
| `synonym: array`    | Keywords to help find the item.        |
| `disabled: boolean` | Indicates if the item is disabled.     |
| `color: number`     | Color associated with the item.        |
| `icon: string`      | Material icon keyword.                 |
| `tooltip: string`   | Instructions shown on mouse over.      |

## Examples

### Autocomplete and Multiple Options

The example below demonstrates the first column with autocomplete enabled and multiple options active.

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
          data: [
            ["US", "Wholemeal", "Yes", "2019-02-12"],
            ["CA;US;GB", "Breakfast Cereals", "Yes", "2019-03-01"],
            ["CA;BR", "Grains", "No", "2018-11-10"],
            ["BR", "Pasta", "Yes", "2019-01-12"],
          ],
          columns: [
            {
              type: "dropdown",
              width: "200px",
              title: "Product Origin",
              url: "/jspreadsheet/countries",
              autocomplete: true,
              multiple: true,
            },
            { type: "text", width: "100px", title: "Description" },
            {
              type: "dropdown",
              width: "100px",
              title: "Stock",
              source: ["No", "Yes"],
            },
            {
              type: "calendar",
              width: "100px",
              title: "Best before",
              format: "DD/MM/YYYY",
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
    ["US", "Wholemeal", "Yes", "2019-02-12"],
    ["CA;US;GB", "Breakfast Cereals", "Yes", "2019-03-01"],
    ["CA;BR", "Grains", "No", "2018-11-10"],
    ["BR", "Pasta", "Yes", "2019-01-12"],
  ];
  // Columns
  const columns = [
    {
      type: "dropdown",
      width: "300px",
      title: "Product Origin",
      url: "/jspreadsheet/countries",
      autocomplete: true,
      multiple: true,
    },
    {
      type: "text",
      width: "200px",
      title: "Description",
    },
    {
      type: "dropdown",
      width: "150px",
      title: "Stock",
      source: ["No", "Yes"],
    },
    {
      type: "calendar",
      width: "150px",
      title: "Best before",
      format: "DD/MM/YYYY",
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

<script setup>
import { ref } from "vue";
import { Spreadsheet, Worksheet } from "@jspreadsheet-ce/vue";
import "jsuites/dist/jsuites.css";
import "jspreadsheet-ce/dist/spreadsheet.css";

// Data
const data = ref([
  ["US", "Wholemeal", "Yes", "2019-02-12"],
  ["CA;US;GB", "Breakfast Cereals", "Yes", "2019-03-01"],
  ["CA;BR", "Grains", "No", "2018-11-10"],
  ["BR", "Pasta", "Yes", "2019-01-12"],
]);

// Columns
const columns = ref([
  {
    type: "dropdown",
    width: "300px",
    title: "Product Origin",
    url: "/jspreadsheet/countries",
    autocomplete: true,
    multiple: true,
  },
  {
    type: "text",
    width: "200px",
    title: "Description",
  },
  {
    type: "dropdown",
    width: "150px",
    title: "Stock",
    source: ["No", "Yes"],
  },
  {
    type: "calendar",
    width: "150px",
    title: "Best before",
    format: "DD/MM/YYYY",
  },
]);

// Optional: spreadsheet ref to match template
const spreadsheet = ref(null);
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
                    ['US', 'Wholemeal', 'Yes', '2019-02-12'],
                    ['CA;US;GB', 'Breakfast Cereals', 'Yes', '2019-03-01'],
                    ['CA;BR', 'Grains', 'No', '2018-11-10'],
                    ['BR', 'Pasta', 'Yes', '2019-01-12'],
                ],
                columns: [
                    { type:'dropdown', width:'300px', title:'Product Origin', url:'/jspreadsheet/countries', autocomplete:true, multiple:true },
                    { type:'text', width:'200px', title:'Description' },
                    { type:'dropdown', width:'150px', title:'Stock', source:['No','Yes'] },
                    { type:'calendar', width:'150px', title:'Best before', format:'DD/MM/YYYY' },
                ],
            }]
        });
    }
}
```

### Group, Images, and Render Options

Enhance the user experience with a responsive and visually enriched data picker.

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
          data: [
            [1, "Morning"],
            [2, "Morning"],
            [3, "Afternoon"],
            [3, "Evening"],
          ],
          columns: [
            {
              type: "dropdown",
              title: "Category",
              width: "300",
              source: [
                {
                  id: "1",
                  name: "Jorge",
                  image: "img/2.jpg",
                  title: "Admin",
                  group: "Secretary",
                },
                {
                  id: "2",
                  name: "Cosme Sergio",
                  image: "img/2.jpg",
                  title: "Teacher",
                  group: "Docent",
                },
                {
                  id: "3",
                  name: "Rose Mary",
                  image: "img/3.png",
                  title: "Teacher",
                  group: "Docent",
                },
                {
                  id: "4",
                  name: "Fernanda",
                  image: "img/3.png",
                  title: "Admin",
                  group: "Secretary",
                },
                {
                  id: "5",
                  name: "Roger",
                  image: "img/3.png",
                  title: "Teacher",
                  group: "Docent",
                },
              ],
            },
            {
              type: "dropdown",
              title: "Working hours",
              width: "200",
              source: ["Morning", "Afternoon", "Evening"],
              options: { type: "picker" },
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
import "jspreadsheet/dist/jspreadsheet.css";

export default function App() {
  // Spreadsheet array of worksheets
  const spreadsheet = useRef();
  // Data
  const data = [
    [1, "Morning"],
    [2, "Morning"],
    [3, "Afternoon"],
    [3, "Evening"],
  ];
  // Columns
  const columns = [
    {
      type: "dropdown",
      title: "Category",
      width: "300",
      source: [
        {
          id: "1",
          name: "Jorge",
          image: "img/2.jpg",
          title: "Admin",
          group: "Secretary",
        },
        {
          id: "2",
          name: "Cosme Sergio",
          image: "img/2.jpg",
          title: "Teacher",
          group: "Docent",
        },
        {
          id: "3",
          name: "Rose Mary",
          image: "img/3.png",
          title: "Teacher",
          group: "Docent",
        },
        {
          id: "4",
          name: "Fernanda",
          image: "img/3.png",
          title: "Admin",
          group: "Secretary",
        },
        {
          id: "5",
          name: "Roger",
          image: "img/3.png",
          title: "Teacher",
          group: "Docent",
        },
      ],
    },
    {
      type: "dropdown",
      title: "Working hours",
      width: "200",
      source: ["Morning", "Afternoon", "Evening"],
      options: { type: "picker" },
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

<script setup>
import { ref } from "vue";
import { Spreadsheet, Worksheet } from "@jspreadsheet-ce/vue";
import "jsuites/dist/jsuites.css";
import "jspreadsheet-ce/dist/spreadsheet.css";

// Data
const data = ref([
  [1, "Morning"],
  [2, "Morning"],
  [3, "Afternoon"],
  [3, "Evening"],
]);

// Columns
const columns = ref([
  {
    type: "dropdown",
    title: "Category",
    width: "300",
    source: [
      {
        id: "1",
        name: "Jorge",
        image: "img/2.jpg",
        title: "Admin",
        group: "Secretary",
      },
      {
        id: "2",
        name: "Cosme Sergio",
        image: "img/2.jpg",
        title: "Teacher",
        group: "Docent",
      },
      {
        id: "3",
        name: "Rose Mary",
        image: "img/3.png",
        title: "Teacher",
        group: "Docent",
      },
      {
        id: "4",
        name: "Fernanda",
        image: "img/3.png",
        title: "Admin",
        group: "Secretary",
      },
      {
        id: "5",
        name: "Roger",
        image: "img/3.png",
        title: "Teacher",
        group: "Docent",
      },
    ],
  },
  {
    type: "dropdown",
    title: "Working hours",
    width: "200",
    source: ["Morning", "Afternoon", "Evening"],
    options: { type: "picker" },
  },
]);

// Optional: spreadsheet ref to match template
const spreadsheet = ref(null);
</script>
```

```angularjs
import { Component, ViewChild, ElementRef } from "@angular/core";
import jspreadsheet from "jspreadsheet-cw";

import "jsuites/dist/jsuites.css";
import "jspreadsheet-cw/dist/jspreadsheet.css";

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
            worksheets: [{
                data: [
                    [1, 'Morning'],
                    [2, 'Morning'],
                    [3, 'Afternoon'],
                    [3, 'Evening'],
                ],
                columns: [
                    {
                        type:'dropdown',
                        title:'Category',
                        width:'300',
                        source:[
                            { id:'1', name:'Jorge', image:'img/2.jpg', title:'Admin', group:'Secretary' },
                            { id:'2', name:'Cosme Sergio', image:'img/2.jpg', title:'Teacher', group:'Docent' },
                            { id:'3', name:'Rose Mary', image:'img/3.png', title:'Teacher', group:'Docent' },
                            { id:'4', name:'Fernanda', image:'img/3.png', title:'Admin', group:'Secretary' },
                            { id:'5', name:'Roger', image:'img/3.png', title:'Teacher', group:'Docent' },
                        ]
                    },
                    {
                        type:'dropdown',
                        title:'Working hours',
                        width:'200',
                        source:['Morning','Afternoon','Evening'],
                        options: { type:'picker' },
                    },
                ],
            }]
        });
    }
}
```
