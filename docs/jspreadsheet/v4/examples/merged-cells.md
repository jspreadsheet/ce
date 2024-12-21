title: How to merge the spreadsheet cells
keywords: Jexcel, spreadsheet, javascript, javascript table, merged cells
description: Full example on how to handle merge cells in your javascript tables.

# Merged cells

You can merge cells on your spreadsheet in the table initialization or programatically as follow:

The following methods are available for merge cells management: _setMerge, getMerge, removeMerge, destroyMerged_

### Source code

```html
<html>
<script src="https://bossanova.uk/jspreadsheet/v4/jspreadsheet.js"></script>
<script src="https://jsuites.net/v5/jsuites.js"></script>
<link rel="stylesheet" href="https://bossanova.uk/jspreadsheet/v4/jspreadsheet.css" type="text/css" />
<link rel="stylesheet" href="https://jsuites.net/v5/jsuites.css" type="text/css" />

<div id="spreadsheet"></div>
<div id="console"></div>

<script>
let table = jspreadsheet(document.getElementById('spreadsheet'), {
    data: [
        ['Mazda', 2001, 2000, '2006-01-01'],
        ['Peugeot', 2010, 5000, '2005-01-01'],
        ['Honda Fit', 2009, 3000, '2004-01-01'],
        ['Honda CRV', 2010, 6000, '2003-01-01'],
    ],
    colHeaders: ['Model', 'Year', 'Price', 'Date'],
    colWidths: [ 300, 80, 100, 100 ],
    columns: [
        { type: 'text' },
        { type: 'text' },
        { type: 'text' },
        { type: 'calendar' },
    ],
    mergeCells:{
        A1:[2,1]
    },
    minDimensions:[10,10]
});

document.getElementById("setMerge").onclick = () => table.setMerge('A3', 2, 2);
document.getElementById("removeMerge").onclick = () => table.removeMerge('A3');
document.getElementById("getAllMerged").onclick = () => document.getElementById('console').innerHTML = JSON.stringify(table.getMerge());
document.getElementById("destroyMerged").onclick = () => table.destroyMerged();
</script>

<br/>
<button type="button" id="setMerge">Merge cell A3 (colspan: 2, rowspan: 2)</button>
<button type="button" id="removeMerge">Destroy merge from A3</button>
<button type="button" id="getAllMerged">Get all merged cells</button>
<button type="button" id="destroyMerged">Destroy all merged</button>

</html>
```

