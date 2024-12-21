title: Create a Data Grid From a HTML table
keywords: Jexcel, javascript, create a dynamic jspreadsheet table from a HTML table element.
description: A full example on how to create a dynamic jspreadsheet table from a HTML table.

# Create a Data Grid From a HTML table

From the v4+ is is possible to create a online spreadsheet from a static simple HTML table.

```html
<html>
<script src="https://bossanova.uk/jspreadsheet/v4/jspreadsheet.js"></script>
<script src="https://jsuites.net/v5/jsuites.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@jspreadsheet/formula/dist/index.min.js"></script>
<link rel="stylesheet" href="https://bossanova.uk/jspreadsheet/v4/jspreadsheet.css" type="text/css" />
<link rel="stylesheet" href="https://jsuites.net/v5/jsuites.css" type="text/css" />

<h4>The Official Top 40 biggest albums of 2019</h4>

<table id="spreadsheet">
<thead>
<tr>
<td colspan='4'>General</td>
</tr>
<tr>
<td colspan='3'>Info</td>
<td colspan='1'>Stats</td>
</tr>
<tr>
<td id='pos'>POS</td>
<td id='title'>TITLE</td>
<td id='artist'>ARTIST</td>
<td id='peak'>PEAK</td>
</tr>
</thead>
<tbody>
<tr>
<td>1</td>
<td>DIVINELY UNINSPIRED TO A HELLISH EXTENT</td>
<td>LEWIS CAPALDI</td>
<td>1</td>
</tr>
<tr>
<td>2</td>
<td>NO 6 COLLABORATIONS PROJECT</td>
<td>ED SHEERAN</td>
<td>1</td>
</tr>
<tr>
<td>3</td>
<td>THE GREATEST SHOWMAN</td>
<td>MOTION PICTURE CAST RECORDING</td>
<td>1</td>
</tr>
<tr>
<td>4</td>
<td>WHEN WE ALL FALL ASLEEP WHERE DO WE GO</td>
<td>BILLIE EILISH</td>
<td>1</td>
</tr>
<tr>
<td>5</td>
<td>STAYING AT TAMARA'S</td>
<td>GEORGE EZRA</td>
<td>1</td>
</tr>
<tr>
<td>6</td>
<td>BOHEMIAN RHAPSODY - OST</td>
<td>QUEEN</td>
<td>3</td>
</tr>
<tr>
<td>7</td>
<td>THANK U NEXT</td>
<td>ARIANA GRANDE</td>
<td>1</td>
</tr>
<tr>
<td>8</td>
<td>WHAT A TIME TO BE ALIVE</td>
<td>TOM WALKER</td>
<td>1</td>
</tr>
<tr>
<td>9</td>
<td>A STAR IS BORN</td>
<td>MOTION PICTURE CAST RECORDING</td>
<td>1</td>
</tr>
<tr>
<td>10</td>
<td>YOU'RE IN MY HEART</td>
<td>ROD STEWART</td>
<td>1</td>
</tr>
</tbody>
<tfoot>
<tr>
<td></td>
<td></td>
<td></td>
<td>=SUMCOL(3)</td>
</tr>
</tfoot>
</table>

<br>

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

jspreadsheet(document.getElementById('spreadsheet')); 
</script>
</html>
```

### More examples

  * [Including merged cells](https://jsfiddle.net/spreadsheet/45h6odug/ "Merged cells")

