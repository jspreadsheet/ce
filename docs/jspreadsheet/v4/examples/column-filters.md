title: Applying Filters on Columns
keywords: Jexcel, JavaScript, column filters, filters, dynamic tables, online spreadsheet
description: Learn how to enable column filters in Jspreadsheet to enhance functionality in your online spreadsheets.

# Column Filters

Enable column filters on your JavaScript dynamic tables to enhance data interaction and usability.

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
      data: [
        ["US", "Cheese", "2019-02-12"],
        ["CA", "Apples", "2019-03-01"],
        ["CA", "Carrots", "2018-11-10"],
        ["BR", "Oranges", "2019-01-12"],
      ],
      columns: [
        {
          type: "dropdown",
          url: "/jspreadsheet/countries",
          width: 200,
        },
        {
          type: "text",
          width: 200,
        },
        {
          type: "calendar",
          width: 200,
        },
        {
          type: "checkbox",
          width: 200,
        },
      ],
      filters: true,
      allowComments: true,
    });
  </script>
</html>
```
