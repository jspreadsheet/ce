title: Jspreadsheet | Examples | Data table with fixed headers and scrolling
keywords: Jexcel, jquery, javascript, fixed headers, scrolling, data tables
description: Overflow table and scrolling

[Back to Examples](/jspreadsheet/v2/examples)

# Spreadsheet with fixed headers and scrolling

Create an instance of your jquery plugin to allow a table overflow and scrolling.

## Source code

```html
<html>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-csv/0.8.3/jquery.csv.min.js"></script>

<script src="https://cdnjs.cloudflare.com/ajax/libs/jexcel/2.1.0/js/jquery.jexcel.js"></script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jexcel/2.1.0/css/jquery.jexcel.min.css" type="text/css" />

<div id="my1"></div>

<script>
$('#my1').jexcel({
    csv:'/jspreadsheet/demo1.csv',
    csvHeaders:true,
    tableOverflow:true,
    tableHeight:'300px',
});
</script>
</html>
```

