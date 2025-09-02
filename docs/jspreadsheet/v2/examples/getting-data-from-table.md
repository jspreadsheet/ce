title: Jspreadsheet | Examples | Extract Data from Spreadsheet
keywords: Jexcel, jquery, javascript, bootstrap, table design, spreadsheet, CSV, table, grid, extract, get, data
description: Get data from inside the datagrid to javascript

[Back to Examples](/jspreadsheet/v2/examples)

# Extract the data from your Jspreadsheet jquery plugin

The following example shows how to extract the data from your jquery table in CSV or JSON formats.

## Source code

```html
<html>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-csv/0.8.3/jquery.csv.min.js"></script>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/jexcel/2.1.0/js/jquery.jexcel.js"></script>
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/jexcel/2.1.0/css/jquery.jexcel.min.css"
    type="text/css"
  />

  <div id="my"></div>

  <p>
    <button id="upload">Convert to CSV</button>
    <button id="json">Convert to JSON</button>
  </p>

  <textarea id="txt" style="width:400px;height:120px"></textarea>

  <script>
    $("#my").jexcel({
      csv: "https://bossanova.uk/components/bossanova-ui/demo/demo1.csv",
      csvHeaders: true,
      colWidths: [70, 200, 300],
    });

    $("#upload").on("click", function () {
      var data = $("#my").jexcel("getData");
      $("#txt").val($.csv.fromArrays(data));
    });

    $("#json").on("click", function () {
      var data = $("#my").jexcel("getData");
      $("#txt").val(JSON.stringify(data));
    });
  </script>
</html>
```

## Online demo on jsFiddle

[How to extract data example from your jquery table on jsFiddle](https://jsfiddle.net/spreadsheet/tzy1h6rg/)
