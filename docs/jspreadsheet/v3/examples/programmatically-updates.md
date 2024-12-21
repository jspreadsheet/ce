title: Update your table by javascript
keywords: Jexcel, javascript, excel-like, spreadsheet, javascript programmatically changes
description: How to update your spreadsheet programmatically via JavaScript.

[Back to Examples](/jspreadsheet/v3/examples "Back to the examples section")

# Programmatically table updates

## Insert, remove and move columns and rows

The following example shows how to manage data programmatically in your javascript spreadsheet.

```html
<html>
<script src="https://bossanova.uk/jspreadsheet/v3/jexcel.js"></script>
<script src="https://jsuites.net/v3/jsuites.js"></script>
<link rel="stylesheet" href="https://bossanova.uk/jspreadsheet/v3/jexcel.css" type="text/css" />
<link rel="stylesheet" href="https://jsuites.net/v3/jsuites.css" type="text/css" />

<div id="spreadsheet1"></div><br>

<div>
    <input type="button" id="btn1" value="Insert Blank Column" style="margin: 2px" />
    <input type="button" id="btn2" value="Insert Five Blank Columns" style="margin: 2px" />
    <input type="button" id="btn3" value="Insert a new column with pre-populated values at the end of the table" style="margin: 2px" />
    <input type="button" id="btn4" value="Insert a new blank row at the end of the table" style="margin: 2px" />
    <input type="button" id="btn5" value="Create ten rows at the end of the table" style="margin: 2px" />
    <input type="button" id="btn6" value="Delete the first row" style="margin: 2px" />
    <input type="button" id="btn7" value="Delete the last column" style="margin: 2px" />
    <input type="button" id="btn8" value="Move the first column to the third position" style="margin: 2px" />
</div>

<script>
let table1 = jexcel(document.getElementById('spreadsheet1'), {
    data: [
        [ 'Cheese', 10, 1.10, '=B1*C1'],
        [ 'Apples', 30, 0.40, '=B2*C2'],
        [ 'Carrots', 15, 0.45, '=B3*C3'],
        [ 'Oranges', 20, 0.49, '=B4*C4'],
    ],
    columns: [
        {
            title: 'Product',
            type: 'autocomplete',
            source:[ 'Apples','Bananas','Carrots','Oranges','Cheese','Pears' ],
            width:'300px',
        },
        {
            title: 'Quantity',
            type: 'number',
            width:'100px',
        },
        {
            title: 'Price',
            type: 'number',
            width:'100px',
        },
        {
            title: 'Total',
            type: 'number',
            width:'100px',
        },
    ],
    rowResize: true,
    columnDrag: true,
});

document.getElementById("btn1").onclick = () => table1.insertColumn();
document.getElementById("btn2").onclick = () => table1.insertColumn(5, 0, 1, null);
document.getElementById("btn3").onclick = () => table1.insertColumn([ '0.99', '1.22', '3.11', '2.21' ]);
document.getElementById("btn4").onclick = () => table1.insertRow();
document.getElementById("btn5").onclick = () => table1.insertRow(10);
document.getElementById("btn6").onclick = () => table1.deleteRow(0, 1);
document.getElementById("btn7").onclick = () => table1.deleteColumn();
document.getElementById("btn8").onclick = () => table1.moveColumn(0, 2);
</script>

</html>
```  

## Updating column width and row height

Update the table width and height properties.

```html
<html>
<script src="https://bossanova.uk/jspreadsheet/v3/jexcel.js"></script>
<script src="https://jsuites.net/v3/jsuites.js"></script>
<link rel="stylesheet" href="https://bossanova.uk/jspreadsheet/v3/jexcel.css" type="text/css" />
<link rel="stylesheet" href="https://jsuites.net/v3/jsuites.css" type="text/css" />

<div id="spreadsheet2"></div>

<script>
let table2 = jexcel(document.getElementById('spreadsheet2'), {
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
    rowResize:true,
});

document.getElementById("setWidth").onclick = () => table2.setWidth(document.getElementById('columnNumber').value, 200);
document.getElementById("setHeight").onclick = () => table2.setHeight(0, 100);
</script>

<br/>
<select id='columnNumber'>
    <option value='0'>Column 1</option>
    <option value='1'>Column 2</option>
    <option value='2'>Column 3</option>
    <option value='3'>Column 4</option>
</select>

<input type='button' id="setWidth" value='Set column width to 200px' />
<input type='button' id="setHeight" value='Set first row to height 100px' />

</html>
```

