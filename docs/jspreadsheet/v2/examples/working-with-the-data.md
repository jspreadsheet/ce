title: Jspreadsheet | Examples | Working with the data
keywords: Jexcel, jquery, javascript, insert, remove and move columns and rows, spreadsheet, CSV, table, grid
description: Insert, remove and move columns and rows

[Back to Examples](/jspreadsheet/v2/examples)

# Programmatically insert, remove and move columns and rows

The following example shows how to manage data programmatically in your javascript spreadsheet.

## Source code

```html
<html>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/numeral.js/2.0.6/numeral.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jexcel/2.1.0/js/excel-formula.min.js"></script>

<script src="https://cdnjs.cloudflare.com/ajax/libs/jexcel/2.1.0/js/jquery.jexcel.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jexcel/2.1.0/js/jquery.jdropdown.js"></script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jexcel/2.1.0/css/jquery.jexcel.min.css" type="text/css" />
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jexcel/2.1.0/css/jquery.jdropdown.min.css" type="text/css" />

<div id="my1"></div>

<script>
$('#my1').jexcel({
    data: [
        [ 'Cheese', 10, 1.10, '=B1*C1'],
        [ 'Apples', 30, 0.40, '=B2*C2'],
        [ 'Carrots', 15, 0.45, '=B3*C3'],
        [ 'Oranges', 20, 0.49, '=B4*C4'],
    ],
    colHeaders: [ 'Product', 'Quantity', 'Price', 'Total' ],
    colWidths: [ 300, 100, 100, 100 ],
    columns: [
        { type: 'autocomplete', source:[ 'Apples','Bananas','Carrots','Oranges','Cheese','Pears' ] },
        { type: 'number' },
        { type: 'number' },
        { type: 'number' },
    ],
});

$('#my1').jexcel('updateSettings', {
    table: function (instance, cell, col, row, val, id) {
        if (col == 2 || col == 3) {
            // Get text
            txt = $(cell).text();
            // Format text
            txt = numeral(txt).format('0,0.00');
            // Update cell value
            $(cell).html(' $ ' + txt);
        }
    },
});

document.getElementById("btn1").onclick = () => $('#my1').jexcel('insertColumn');
document.getElementById("btn2").onclick = () => $('#my1').jexcel('insertColumn', 5, null, 0);
document.getElementById("btn3").onclick = () => $('#my1').jexcel('insertColumn', [ '0.99', '1.22', '3.11', '2.21' ]);
document.getElementById("btn4").onclick = () => $('#my1').jexcel('insertRow'); event.preventDefault();
document.getElementById("btn5").onclick = () => $('#my1').jexcel('insertRow', [ 'Pears', 10, 0.59, '=B2*C2' ], 1);
document.getElementById("btn6").onclick = () => $('#my1').jexcel('insertRow', 10);
document.getElementById("btn7").onclick = () => $('#my1').jexcel('moveRow', 3, 0);
</script>

<button id="btn1">Insert a new blank column at the end of the table</button>
<button id="btn2">Insert five new blank columns at the beginning of the table</button>
<button id="btn3">Insert a new column with pre-populated values at the end of the table</button>
<button id="btn4">Insert a new blank row at the end of the table</button>
<button id="btn5">Insert a new pre-populated row just after the second row.</button>
<button id="btn6">Create ten rows at the end of the table</button>
<button id="btn7">Move the forth row to the first position</button>



</html>
```

