title: Jspreadsheet | Examples | Create multiple instances in the same page
keywords: Jexcel, jquery, javascript, excel-like, spreadsheet, jquery plugin, sorting, table, grid, order by
description: How to create multiple table instances in the same page

[Back to Examples](/jspreadsheet/v2/examples)

# Multiple spreadsheets in the same page

How to embed multiple spreadsheets in the same page.

## Source code

{.ignore}
```html
<html>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>

<script src="https://cdnjs.cloudflare.com/ajax/libs/jexcel/2.1.0/js/jquery.jexcel.js"></script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jexcel/2.1.0/css/jquery.jexcel.min.css" type="text/css" />

<div id="my1"></div><br>
<div id="my2"></div>

<script>
var data1 = $.fn.jexcel('helper', { action:'createEmptyData', cols:6, rows:10 });
var data2 = $.fn.jexcel('helper', { action:'createEmptyData', cols:6, rows:10 });

$('#my1').jexcel({
    data:data1
});
$('#my2').jexcel({
    data:data2
});
</script>
</html>
```

