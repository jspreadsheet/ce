title: Dealing with big spreadsheets through lazy loading
keywords: Jexcel, javascript, javascript vanilla, javascript plugin, plugin, excel-like, spreadsheet, table, tables, grid, datatables, data
description: This example brings a very nice feature to deal with large table datasets.

# Lazy loading

The following table is dealing with 60.000 columns. The lazyloading method allows render up to 130 rows at the same time and will render other rows based on the scrolling.

### Source code

```html
<html>
  <script src="https://bossanova.uk/jspreadsheet/v4/jspreadsheet.js"></script>
  <link
    rel="stylesheet"
    href="https://bossanova.uk/jspreadsheet/v4/jspreadsheet.css"
    type="text/css"
  />
  <script src="https://jsuites.net/v5/jsuites.js"></script>
  <link
    rel="stylesheet"
    href="https://jsuites.net/v5/jsuites.css"
    type="text/css"
  />

  <div id="spreadsheet"></div>

  <script>
    jspreadsheet(document.getElementById("spreadsheet"), {
      csv: "/jspreadsheet/demo1.csv",
      csvHeaders: false,
      tableOverflow: true,
      lazyLoading: true,
      loadingSpin: true,
      columns: [
        {
          type: "text",
          width: 200,
          title: "Name",
        },
        {
          type: "dropdown",
          width: 100,
          title: "Age",
          source: [
            {
              id: 1,
              name: "Male",
            },
            {
              id: 2,
              name: "Female",
            },
          ],
        },
        {
          type: "text",
          width: 200,
          title: "City",
        },
      ],
    });
  </script>
</html>
```
