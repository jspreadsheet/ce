title: Column Dragging  
keywords: Jexcel, spreadsheet, JavaScript, JavaScript table, column dragging, data grid customization, interactive columns  
description: Learn how to enable and use column dragging functionality in Jspreadsheet CE to create dynamic and customizable data grids.

# Column Dragging

Column dragging in Jspreadsheet CE is disabled by default. To enable this feature, set the `columnDrag: true` option during initialization, as demonstrated below:

### Source code

```html
<html>
  <script src="https://bossanova.uk/jspreadsheet/v5/jspreadsheet.js"></script>
  <script src="https://jsuites.net/v5/jsuites.js"></script>
  <link
    rel="stylesheet"
    href="https://jsuites.net/v5/jsuites.css"
    type="text/css"
  />
  <link
    rel="stylesheet"
    href="https://bossanova.uk/jspreadsheet/v5/jspreadsheet.css"
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
          data: [
            ["BR", "Cheese", 1],
            ["CA", "Apples", 0],
            ["US", "Carrots", 1],
            ["GB", "Oranges", 0],
          ],
          columns: [
            {
              type: "autocomplete",
              title: "Country",
              width: "300",
              url: "/jspreadsheet/countries.json",
            },
            {
              type: "dropdown",
              title: "Food",
              width: "150",
              source: ["Apples", "Bananas", "Carrots", "Oranges", "Cheese"],
            },
            {
              type: "checkbox",
              title: "Stock",
              width: "100",
            },
          ],
          columnDrag: true,
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
  // Tabs
  const data = [
    ["BR", "Cheese", 1],
    ["CA", "Apples", 0],
    ["US", "Carrots", 1],
    ["GB", "Oranges", 0],
  ];

  const columns = [
    {
      type: "autocomplete",
      title: "Country",
      width: "300",
      url: "/jspreadsheet/countries.json",
    },
    {
      type: "dropdown",
      title: "Food",
      width: "150",
      source: ["Apples", "Bananas", "Carrots", "Oranges", "Cheese"],
    },
    {
      type: "checkbox",
      title: "Stock",
      width: "100",
    },
  ];

  return (
    <Spreadsheet ref={spreadsheet}>
      <Worksheet data={data} columns={columns} columnDrag={true} />
    </Spreadsheet>
  );
}
```

```vue
<template>
  <Spreadsheet ref="spreadsheet">
    <Worksheet :data="data" :columns="columns" :columnDrag="true" />
  </Spreadsheet>
</template>

<script>
import { ref } from "vue";
import { Spreadsheet, Worksheet } from "@jspreadsheet-ce/vue";
import "jsuites/dist/jsuites.css";
import "jspreadsheet-ce/dist/jspreadsheet.css";

export default {
  components: {
    Spreadsheet,
    Worksheet,
  },
  setup() {
    // Spreadsheet reference
    const spreadsheet = ref(null);

    // Data for the worksheet
    const data = ref([
      ["BR", "Cheese", 1],
      ["CA", "Apples", 0],
      ["US", "Carrots", 1],
      ["GB", "Oranges", 0],
    ]);

    // Columns definition for the worksheet
    const columns = ref([
      {
        type: "autocomplete",
        title: "Country",
        width: "300",
        url: "/jspreadsheet/countries.json",
      },
      {
        type: "dropdown",
        title: "Food",
        width: "150",
        source: ["Apples", "Bananas", "Carrots", "Oranges", "Cheese"],
      },
      {
        type: "checkbox",
        title: "Stock",
        width: "100",
      },
    ]);

    return {
      spreadsheet,
      data,
      columns,
    };
  },
};
</script>
```
