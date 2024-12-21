title: Customize the spreadsheet via javascript
keywords: Jexcel, javascript, excel-like, spreadsheet, table scripting
description: Customize the table behavior using javascript

# Table scripting and customizations

Customize the table behavior though javascript.

### Source code

```html
<html>
<script src="https://bossanova.uk/jspreadsheet/v4/jspreadsheet.js"></script>
<script src="https://jsuites.net/v5/jsuites.js"></script>
<link rel="stylesheet" href="https://bossanova.uk/jspreadsheet/v4/jspreadsheet.css" type="text/css" />
<link rel="stylesheet" href="https://jsuites.net/v5/jsuites.css" type="text/css" />

<script src="https://cdnjs.cloudflare.com/ajax/libs/numeral.js/2.0.6/numeral.min.js"></script>

<div id="spreadsheet"></div>

<script>

let table = jspreadsheet(document.getElementById('spreadsheet'), {
    data: [
        ['BR', 'Cheese', 1, 3.99],
        ['CA', 'Apples', 0, 1.00],
        ['US', 'Carrots', 1, 0.90],
        ['GB', 'Oranges', 0, 1.20],
        ['CH', 'Chocolats', 1, 0.40],
        ['AR', 'Apples', 1, 1.10],
        ['AR', 'Bananas', 1, 0.30],
        ['BR', 'Oranges', 1, 0.95],
        ['BR', 'Pears', 1, 0.90],
        ['', '', '', '=ROUND(SUM(D1:D8), 2)'],
    ],
    columnSorting:false,
    columns: [
        {
            type: 'autocomplete',
            title: 'Country',
            width: '250',
            url:'/jspreadsheet/countries'
        },
        {
            type: 'autocomplete',
            title:'Food',
            width:'150',
            source: ['Apples','Bananas','Carrots','Oranges','Cheese','Kiwi','Chocolats','Pears']
        },
        {
            type: 'checkbox',
            title:'Stock',
            width:'100'
        },
        {
            type: 'number',
            title:'Price',
            width:'100'
        },
    ],
    updateTable:function(instance, cell, col, row, val, label, cellName) {
        // Number formating
        if (col == 3) {
            // Get text
            txt = cell.innerText;
            // Update cell value with formated text
            cell.innerHTML = jSuites.mask.render(txt, { mask: '$ #.##0,00'}, true)
        }

        // Total row
        if (row == 9) {
            if (col < 3) {
                cell.innerHTML = '';
            } 

            if (col == 2) {
                cell.innerHTML = 'Total';
                cell.style.fontWeight = 'bold';
            }

            cell.className = '';
            cell.style.backgroundColor = '#f46e42';
            cell.style.color = '#ffffff';
        }
    }
});
</script>

<style>
.jexcel tbody tr:nth-child(even) {
  background-color: #EEE9F1 !important;
}
</style>
</html>
```

