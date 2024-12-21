title: Readonly Columns
keywords: Jexcel, spreadsheet, javascript, javascript table, readonly
description: Example how to set up readonly cells on your spreadsheets. 

[Back to Examples](/jspreadsheet/v3/examples)

# Readonly columns and cells

Setting a readonly the whole column or a single specific cell.

```html
<html>
<script src="https://bossanova.uk/jspreadsheet/v3/jexcel.js"></script>
<script src="https://jsuites.net/v3/jsuites.js"></script>
<link rel="stylesheet" href="https://bossanova.uk/jspreadsheet/v3/jexcel.css" type="text/css" />
<link rel="stylesheet" href="https://jsuites.net/v3/jsuites.css" type="text/css" />

<div id="spreadsheet"></div>

<script>
jexcel(document.getElementById('spreadsheet'), {
    data: [
        ['Mazda', 2001, 2000, 1],
        ['Peugeot', 2010, 5000, 1],
        ['Honda Fit', 2009, 3000, 1],
        ['Honda CRV', 2010, 6000, 0],
    ],
    columns: [
        {
            type: 'text',
            title:'Description',
            width:'200px',
            readOnly:true,
        },
        {
            type: 'text',
            title:'Year',
            width:'200px'
        },
        {
            type: 'text',
            title:'Price',
            width:'100px',
            mask:'#.##',
        },
        {
            type: 'checkbox',
            title:'Automatic',
            width:'100px'
        },
    ],
    updateTable: function(el, cell, x, y, source, value, id) {
        if (x == 2 && y == 2) {
            cell.classList.add('readonly');
        }
    } 
});
</script>
</html>
```

