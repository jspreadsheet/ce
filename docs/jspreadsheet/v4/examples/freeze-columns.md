title: Freeze columns
keywords: Jexcel, javascript, javascript vanilla, javascript plugin, plugin, excel-like, spreadsheet, table, tables, grid, datatables, data, frezee columns
description: Setup freeze columns in Jspreadsheet

# Freeze columns

Define the number of freeze columns by using the freezeColumn directive with tableOverflow as follow

### Source code

```html
<html>
  <script src="https://bossanova.uk/jspreadsheet/v4/jspreadsheet.js"></script>
  <script src="https://jsuites.net/v5/jsuites.js"></script>
  <link
    rel="stylesheet"
    href="https://jsuites.net/v5/jsuites.css"
    type="text/css"
  />
  <link
    rel="stylesheet"
    href="https://bossanova.uk/jspreadsheet/v4/jspreadsheet.css"
    type="text/css"
  />

  <div id="spreadsheet"></div>

  <script>
    jspreadsheet(document.getElementById("spreadsheet"), {
      data: null,
      minDimensions: [20, 50000],
      tableOverflow: true,
      lazyLoading: true,
      tableWidth: "600px",
      freezeColumns: 2,
    });
  </script>
</html>
```
