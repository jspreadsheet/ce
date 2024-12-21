title: Table Overflow  
keywords: Jexcel, JavaScript, table overflow, fixed dimensions, JavaScript table, spreadsheet customization, table width and height  
description: Learn how to define fixed width and height for Jspreadsheet tables to manage table overflow effectively.

# Table Overflow

Set fixed width and height for your online JavaScript spreadsheet to control table overflow and improve layout management.

### Source code

```html
<html>

<script src="https://bossanova.uk/jspreadsheet/v5/jspreadsheet.js"></script>
<link rel="stylesheet" href="https://bossanova.uk/jspreadsheet/v5/jspreadsheet.css" type="text/css" />
<script src="https://jsuites.net/v5/jsuites.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v5/jsuites.css" type="text/css" />

<div id="spreadsheet"></div>

<script>
jspreadsheet(document.getElementById('spreadsheet'), {
    worksheets: [{
        minDimensions: [10, 20],
        tableOverflow: true,
        tableWidth: "600px",
        columns: [
            {
                type: "dropdown",
                source: [{ id: 1, name: "yes" }, { id: 2, name: "no" }]
            },
            {
                type: "dropdown",
                source: [{ id: 1, name: "yes" }, { id: 2, name: "no" }]
            },
            {
                type: "dropdown",
                source: [{ id: 1, name: "yes" }, { id: 2, name: "no" }]
            },
            {
                type: "dropdown",
                source: [{ id: 1, name: "yes" }, { id: 2, name: "no" }]
            },
            {
                type: "dropdown",
                source: [{ id: 1, name: "yes" }, { id: 2, name: "no" }]
            }
        ]
    }]
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
        {
            type: "dropdown",
            source: [{ id: 1, name: "yes" }, { id: 2, name: "no" }]
        },
        {
            type: "dropdown",
            source: [{ id: 1, name: "yes" }, { id: 2, name: "no" }]
        },
        {
            type: "dropdown",
            source: [{ id: 1, name: "yes" }, { id: 2, name: "no" }]
        },
        {
            type: "dropdown",
            source: [{ id: 1, name: "yes" }, { id: 2, name: "no" }]
        },
        {
            type: "dropdown",
            source: [{ id: 1, name: "yes" }, { id: 2, name: "no" }]
        }
    ];

    return (
        <Spreadsheet ref={spreadsheet}>
            <Worksheet tableOverflow={true} tableWidth={"600px"} columns={columns} minDimensions={[10,20]} />
        </Spreadsheet>
    );
}
```
```vue
<template>
  <Spreadsheet ref="spreadsheet">
      <Worksheet :table-overflow="true" table-width="600px" :columns="columns" :minDimensions="[10, 20]" />
  </Spreadsheet>
</template>

<script setup>
import { ref } from 'vue';
import { Spreadsheet, Worksheet } from "@jspreadsheet-ce/vue";
import "jsuites/dist/jsuites.css";
import "jspreadsheet-ce/dist/jspreadsheet.css";


export default {
    components: {
        Spreadsheet,
        Worksheet
    },
    setup() {
        // Spreadsheet reference
        const spreadsheet = ref(null);

        // Columns definition for the worksheet
        const columns = [
            {
                type: "dropdown",
                source: [{ id: 1, name: "yes" }, { id: 2, name: "no" }]
            },
            {
                type: "dropdown",
                source: [{ id: 1, name: "yes" }, { id: 2, name: "no" }]
            },
            {
                type: "dropdown",
                source: [{ id: 1, name: "yes" }, { id: 2, name: "no" }]
            },
            {
                type: "dropdown",
                source: [{ id: 1, name: "yes" }, { id: 2, name: "no" }]
            },
            {
                type: "dropdown",
                source: [{ id: 1, name: "yes" }, { id: 2, name: "no" }]
            }
        ];

        return {
            spreadsheet,
            columns
        };
    }
}

</script>
```

