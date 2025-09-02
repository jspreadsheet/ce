title: Searchable Datatables
keywords: Jexcel, javascript, javascript vanilla, javascript plugin, plugin, excel-like, spreadsheet, table, tables, grid, datatables, data
description: Full spreadsheet example with search and pagination to bring great compatibility for those who love datatables.

[Back to Examples](/jspreadsheet/v3/examples "Back to the examples section")

# Javascript spreadsheet with search and pagination

The following example shows how to create a javascript spreadsheet instance with a design similar to datatables jquery plugin.

```html
<html>
  <script src="https://bossanova.uk/jspreadsheet/v3/jexcel.js"></script>
  <script src="https://jsuites.net/v3/jsuites.js"></script>
  <link
    rel="stylesheet"
    href="https://bossanova.uk/jspreadsheet/v3/jexcel.css"
    type="text/css"
  />
  <link
    rel="stylesheet"
    href="https://jsuites.net/v3/jsuites.css"
    type="text/css"
  />

  <link
    rel="stylesheet"
    href="https://bossanova.uk/jspreadsheet/v3/jexcel.datatables.css"
    type="text/css"
  />

  <div id="spreadsheet"></div>

  <script>
    jexcel(document.getElementById("spreadsheet"), {
      csv: "/tests/demo.csv",
      csvHeaders: true,
      search: true,
      pagination: 10,
      columns: [
        { type: "text", width: 300 },
        { type: "text", width: 200 },
        { type: "text", width: 100 },
        { type: "text", width: 100 },
        { type: "text", width: 100 },
      ],
    });
  </script>
</html>
```
