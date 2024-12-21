title: Jspreadsheet | Examples | Formulas on Spreadsheet
keywords: Jexcel, jquery, javascript, bootstrap, table design, spreadsheet, CSV, table, grid, autocomplete, customization, column
description: Using Functions inside your spreadsheet

[Back to Examples](/jspreadsheet/v2/examples)

# Including formulas on your javascript spreadsheet plugin

The example below shows how to use Excel like formulas on your jquery spreadsheet.

## Source code

```html
<html>
<script src="https://cdnjs.cloudflare.com/ajax/libs/numeral.js/2.0.6/numeral.min.js"></script>
<script src="http://cdn.bossanova.uk/js/excel-formula.min.js"></script>

<script src="https://cdnjs.cloudflare.com/ajax/libs/jexcel/2.1.0/js/jquery.jexcel.js"></script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jexcel/2.1.0/css/jquery.jexcel.min.css" type="text/css" />

<div id="my"></div>

<script>
let data = [
    ['Furnace',1,10000,'=B1*C1','=IF(C1 > 5000, true, false)'],
    ['Tower',2,6000,'=B2*C2','=IF(C2 > 5000, true, false)'],
    ['Drum',3,5000,'=B3*C3','=IF(C3 > 5000, true, false)'],
    ['Pump',4,4000,'=B4*C4','=IF(C4 > 5000, true, false)'],
    ['Total','=SUM(B1:B4)','=(C1+C2+C3+C4)','=SUM(D1:D4)','']
]

$('#my').jexcel({
    data:data,
    columns: [
        { type:'text' },
        { type:'numeric' },
        { type:'numeric' },
        { type:'numeric' },
    ],
    colHeaders: ['Equipment','Quantity', 'Price', 'Total', '>5000?'],
    colWidths: [ 200, 80, 100, 100, 100 ]
});

$('#my').jexcel('updateSettings', {
    table: function (instance, cell, col, row, val, id) {
        // Format numbers
        if (col == 2 || col == 3) {
            // Get text
            txt = $(cell).text();
            // Format text
            txt = numeral(txt).format('0,0.00');
            // Update cell value
            $(cell).html(' $ ' + txt);
        }

        // Bold the total row
        if ($(cell).text() == 'Total') {
            $('.r' + row).css('font-weight', 'bold');
            $('.r' + row).css('background-color', '#fffaa3');
        }
    }
});
</script>
</html>
```  

# Third party formula implementations

You can use a third party libraries to execute various Excel like formulas.

## Source code

```html
<html>
<script src="https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.9.0/underscore-min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/underscore.string/3.3.4/underscore.string.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.22.1/moment.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jstat/1.7.1/jstat.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/numeric/1.2.6/numeric.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/numeral.js/2.0.6/numeral.min.js"></script>

<script src="https://bossanova.uk/components/jexcel/dist/js/excel-formula.min.js"></script>
<script src="https://bossanova.uk/components/jexcel/dist/js/formulas.js"></script>

<script src="https://cdnjs.cloudflare.com/ajax/libs/jexcel/2.1.0/js/jquery.jexcel.js"></script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jexcel/2.1.0/css/jquery.jexcel.min.css" type="text/css" />

<div id="my1"></div>

<script>
let data1 = [
    ['Furnace', 10, 'AVERAGE', '=AVERAGE(B1:B4)'],
    ['Tower', 9, 'STDEVA', '=STDEVA(B1:B4)'],
    ['Drum', 44, 'MAX', '=MAX(B1,B2,B3,B4)'],
    ['Pump', 12, 'COUNT', '=COUNT(B1:B4)'],
];

$('#my1').jexcel({
    data:data1,
    colWidths: [ 400, 80, 100, 200 ],
});
</script>
</html>
```  
  

# Custom javascript formulas

The example below shows how to create your own method in javascript to apply as a Excel like formula

## Source code

```html
<html>
<script src="http://cdn.bossanova.uk/js/excel-formula.min.js"></script>

<script src="https://cdnjs.cloudflare.com/ajax/libs/jexcel/2.1.0/js/jquery.jexcel.js"></script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jexcel/2.1.0/css/jquery.jexcel.min.css" type="text/css" />

<div id="my2"></div>

<script>
let data2 = [
    ['Furnace','=CUSTOM(A1)', 10],
    ['Tower','=CONSOLE(A2)', 9],
    ['Drum','=CONCAT_COLUMNS(A1,A3)', 3],
    ['Pump','=CONSOLE(A4)', 7],
    ['Total','', '=AVG(C1:C4)'],
]

$('#my2').jexcel({
    data:data1,
    colWidths: [ 400, 200 ],
});

function CUSTOM(cell) {
    return 'alert: ' + cell;
}

function CONSOLE(cell) {
    console.log(cell);
    return cell;
}

function CONCAT_COLUMNS(a, b) {
    return a + ', ' + b;
}

function AVG(v)
{
    var sum = v.reduce(function(a, b) { return a + b; });
    var avg = sum / v.length;

    return avg;
}

</script>
</html>
```

