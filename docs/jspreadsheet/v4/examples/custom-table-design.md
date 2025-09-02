title: Custom Table Design
keywords: Jexcel, javascript, javascript vanilla, javascript plugin, plugin, excel-like, spreadsheet, table, tables, grid, datatables, data
description: Customized CSS for your datagrid

# Create custom CSS for your javascript spreadsheet

The following example shows a CSS addon to change the core layout of your jquery tables.

## Green borders and corners jquery spreadsheet

[Bootstrap-like jquery spreadsheet example](/jspreadsheet/examples/a-custom- table-design)

## Bootstrap-like jquery spreadsheet.

Your jquery table can be customized by including an additional addon CSS. If you have created a nice design, please share with us.

### Source code

```html
<html>
  <script src="https://bossanova.uk/jspreadsheet/v4/jspreadsheet.js"></script>
  <script src="https://jsuites.net/v5/jsuites.js"></script>
  <link
    rel="stylesheet"
    href="https://bossanova.uk/jspreadsheet/v4/jspreadsheet.css"
    type="text/css"
  />
  <link
    rel="stylesheet"
    href="https://jsuites.net/v5/jsuites.css"
    type="text/css"
  />

  <!-- Optional CSS addon -->

  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/jspreadsheet/2.0.0/css/jquery.jexcel.green.min.css"
    type="text/css"
  />

  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/jspreadsheet/2.0.0/css/jquery.jexcel.bootstrap.min.css"
    type="text/css"
  />

  <div id="my"></div>

  <script>
    data = [
      ["BR", "Cheese", 1, 1900.01],
      ["CA", "Apples", 0, 1200.21],
      ["US", "Carrots", 1, 400.34],
      ["GB", "Oranges", 0, 900.43],
    ];

    $("#my").jspreadsheet({
      data: data,
      colHeaders: ["Country", "Food", "Stock", "Price"],
      colWidths: [300, 100, 100, 100],
      colAlignments: ["left", "left", "left", "left"],
      columns: [
        { type: "autocomplete", url: "/jspreadsheet/countries" },
        {
          type: "autocomplete",
          source: ["Apples", "Bananas", "Carrots", "Oranges", "Cheese"],
        },
        { type: "checkbox" },
        { type: "number" },
      ],
    });
  </script>
</html>
```
