title: Table overflow with Jspreadshee Version 3
keywords: Jexcel, javascript, javascript vanilla, javascript, table, table overflow
description: How define a fixed width and height for the Jspreadsheet grids.

[Back to Examples](/jspreadsheet/v3/examples "Back to the examples section")

# Table overflow

Define width and height for your Jspreadsheet table

```html
<html>
  <script src="https://bossanova.uk/jspreadsheet/v3/jexcel.js"></script>
  <link
    rel="stylesheet"
    href="https://bossanova.uk/jspreadsheet/v3/jexcel.css"
    type="text/css"
  />
  <script src="https://jsuites.net/v3/jsuites.js"></script>
  <link
    rel="stylesheet"
    href="https://jsuites.net/v3/jsuites.css"
    type="text/css"
  />

  <div id="spreadsheet"></div>

  <script>
    jexcel(document.getElementById("spreadsheet"), {
      minDimensions: [10, 20],
      defaultColWidth: 100,
      tableOverflow: true,
      tableWidth: "600px",
      columns: [
        {
          type: "dropdown",
          source: [
            { id: 1, name: "yes" },
            { id: 2, name: "no" },
          ],
        },
        {
          type: "dropdown",
          source: [
            { id: 1, name: "yes" },
            { id: 2, name: "no" },
          ],
        },
        {
          type: "dropdown",
          source: [
            { id: 1, name: "yes" },
            { id: 2, name: "no" },
          ],
        },
        {
          type: "dropdown",
          source: [
            { id: 1, name: "yes" },
            { id: 2, name: "no" },
          ],
        },
        {
          type: "dropdown",
          source: [
            { id: 1, name: "yes" },
            { id: 2, name: "no" },
          ],
        },
      ],
    });
  </script>
</html>
```
