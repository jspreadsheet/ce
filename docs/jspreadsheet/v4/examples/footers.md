title: Adding formulas fixed on the table footer
keywords: Jexcel, javascript, multiple spreadsheets, formulas, table footer
description: Adding formulas fixed on the table footer.

# Table footer

Adding fixed custom calculations in the footer of an online spreadsheet.

### Source code

```html
<html>
<script src="https://bossanova.uk/jspreadsheet/v4/jspreadsheet.js"></script>
<script src="https://jsuites.net/v5/jsuites.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@jspreadsheet/formula/dist/index.min.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v5/jsuites.css" type="text/css" />
<link rel="stylesheet" href="https://bossanova.uk/jspreadsheet/v4/jspreadsheet.css" type="text/css" />

<div id="spreadsheet"></div>

<script>
// A custom method to SUM all the cells in the current column
let SUMCOL = function(columnId) {
    let instance = jspreadsheet.current

    let total = 0;
    for (let j = 0; j < instance.options.data.length; j++) {
        if (Number(instance.records[j][columnId].innerHTML)) {
            total += Number(instance.records[j][columnId].innerHTML);
        }
    }
    return total;
}

formula.setFormula({ SUMCOL })

let table = jspreadsheet(document.getElementById('spreadsheet'), {
    data: [
        ['Cheese', 10, 6.00, "=B1*C1"],
        ['Apples', 5, 4.00, "=B2*C2"],
        ['Carrots', 5, 1.00, "=B3*C3"],
        ['Oranges', 6, 2.00, "=B4*C4"],
    ],
    minDimensions: [4,10],
    columnDrag:true,
    footers: [['Total','=SUMCOL(1)','=SUMCOL(2)','=SUMCOL(3)']],
    columns: [{
        width:'200px',
    }]
});
</script>
</html>
```  
  

