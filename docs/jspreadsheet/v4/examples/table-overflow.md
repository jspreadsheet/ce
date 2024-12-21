title: Table Overflow with Jspreadsheet Version 4
keywords: Jexcel, javascript, javascript vanilla, javascript, table, table overflow
description: How define a fixed width and height for the jspreadsheet tables.

# Table overflow

Define width and height for your online javascript spreadsheet.

### Source code

```html
<html>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>

<script src="https://bossanova.uk/jspreadsheet/v4/jspreadsheet.js"></script>
<link rel="stylesheet" href="https://bossanova.uk/jspreadsheet/v4/jspreadsheet.css" type="text/css" />
<script src="https://jsuites.net/v5/jsuites.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v5/jsuites.css" type="text/css" />

<div id="spreadsheet"></div>

<script>
jspreadsheet(document.getElementById('spreadsheet'), {
        minDimensions: [10, 20],
        defaultColWidth: 100,
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
    });
</script>
</html>
```

