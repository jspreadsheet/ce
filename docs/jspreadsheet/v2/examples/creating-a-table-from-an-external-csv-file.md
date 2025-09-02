title: Jspreadsheet | Examples | Creating a web spreadsheet based on an external CSV
keywords: Jexcel, jquery, javascript, excel-like, spreadsheet, CSV, table, grid
description: How to load the data from an external CSV file into a Jspreadsheet grid or table.

[Back to Examples](/jspreadsheet/v2/examples)

# Creating a javascript spreadsheet based on an external CSV

The example below helps you to create a javascript spreadsheet table based on a remote CSV file, including the headers. The examples also requires a third party jquery CSV parser plugin (100% IETF RFC 4180).

Original file: [/jspreadsheet/demo.csv](/jspreadsheet/demo.csv).

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

  <p><button id="download">Export my spreadsheet as CSV</button></p>

  <script>
    $("#my").jexcel({
      // Full CSV URL
      csv: "/jspreadsheet/demo1.csv",
      // Use the first row of your CSV as the headers
      csvHeaders: true,
      tableOverflow: true,
      tableHeight: "300px",
      // Headers
      colWidths: [70, 200, 300],
    });

    $("#download").on("click", function () {
      $("#my").jexcel("download");
    });
  </script>
</html>
```

## Online demo on jsFiddle

# Creating a javascript spreadsheet based on an external JSON file

In a similar way, you can create a jquery table based on an external JSON file format by using the _url: directive_ as below.

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

  <div id="my1"></div>

  <script>
    $("#my1").jexcel({
      // The URL from your data table file in JSON format.
      url: "/jspreadsheet/json",
    });
  </script>
</html>
```
