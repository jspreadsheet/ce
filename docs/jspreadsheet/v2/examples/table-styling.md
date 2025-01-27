title: Jspreadsheet | Examples | Changing the table style
keywords: Jexcel, jquery, javascript, table design, spreadsheet, table, grid, colours
description: Table styling

[Back to Examples](/v2/examples#more)

# How to change the spreadsheet style.

You can define the CSS for specific columns during the initialization. The following example uses the directive style:[] to bring populate the style attribute for each column.

But, after the initialization is still possible to manage the cell style programmatically using the method getStyle or setStyle.

|    |     |
| ---|---  |
| $('#my1').jexcel('setStyle', 'A1', 'font-weight', 'bold'); | Change A1 fontWeight  |
| $('#my1').jexcel('setStyle', 'A2', 'background-color', 'yellow'); | Change A2 backgroundColor  |
| $('#my1').jexcel('setStyle', [ { A1: 'font-weight: bold; color:red;' }, { B2: 'background-color: yellow;' }, { C1: 'text-decoration: underline;' }, { D2: 'text-align:left;' } ]); | Change the table in one batch  |
| $('#my1').jexcel('getStyle', 'A1');| Get A1 style attributes  |
| $('#my1').jexcel('getStyle');| Get the whole table attributes  |
  

### Source code

```html
<html>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/numeral.js/2.0.6/numeral.min.js"></script>

<script src="https://cdnjs.cloudflare.com/ajax/libs/jexcel/2.1.0/js/jquery.jexcel.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jexcel/2.1.0/js/jquery.jdropdown.js"></script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jexcel/2.1.0/css/jquery.jexcel.min.css" type="text/css" />
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jexcel/2.1.0/css/jquery.jdropdown.min.css" type="text/css" />

<script src="https://cdnjs.cloudflare.com/ajax/libs/jexcel/2.1.0/js/excel-formula.min.js"></script>

<div id="my1"></div>

<script>
let data1 = [
    ['US', 'Cheese', 'Yes', '2019-02-12'],
    ['CA;US;UK', 'Apples', 'Yes', '2019-03-01'],
    ['CA;BR', 'Carrots', 'No', '2018-11-10'],
    ['BR', 'Oranges', 'Yes', '2019-01-12'],
];

$('#my1').jexcel({
    data:data1,
    colHeaders: [ 'Product Origin','Description', 'Stock', 'Best before' ],
    colWidths: [ 300, 200, 100, 100 ],
    columns: [
        { type: 'dropdown', url:'/jspreadsheet/countries', autocomplete:true, multiple:true }, // Remote source for your dropdown
        { type: 'text' },
        { type: 'dropdown', source:['No','Yes'] },
        { type: 'calendar' },
    ],
    style:[
        { A1: 'background-color: orange; ' },
        { B1: 'background-color: orange; ' },
        { C1: 'background-color: orange; ' },
        { D1: 'background-color: orange; ' },
    ],
});
</script>
</html>
```  
  

## How to set global CSS rules for your jquery tables

Give your clients a nice look table with colours and styling.

### Source code

```html
<html>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/numeral.js/2.0.6/numeral.min.js"></script>

<script src="https://cdnjs.cloudflare.com/ajax/libs/jexcel/2.1.0/js/jquery.jexcel.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jexcel/2.1.0/js/jquery.jdropdown.js"></script>

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jexcel/2.1.0/css/jquery.jexcel.min.css" type="text/css" />
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jexcel/2.1.0/css/jquery.jdropdown.min.css" type="text/css" />

<script src="https://cdnjs.cloudflare.com/ajax/libs/jexcel/2.1.0/js/excel-formula.min.js"></script>

<div id="my"></div>

<script>
let data = [
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
];

$('#my').jexcel({
    data:data,
    colHeaders: ['Country', 'Food', 'Stock', 'Price'],
    colWidths: [ 300, 100, 100, 100 ],
    columns: [
        { type: 'autocomplete', url:'/jspreadsheet/countries' },
        { type: 'autocomplete', source:['Apples','Bananas','Carrots','Oranges','Cheese','Kiwi','Chocolats','Pears'] },
        { type: 'checkbox' },
        { type: 'number' },
    ]
});

$('#my').jexcel('updateSettings', {
    table: function (instance, cell, col, row, val, id) {
        // Number formating
        if (col == 3) {
            // Get text
            txt = $(cell).text();
            // Format text
            txt = numeral(txt).format('0,0.00');
            // Update cell value
            $(cell).html(' $ ' + txt);
        }

        // Odd row colours
        if (row % 2) {
            $(cell).css('background-color', '#edf3ff');
        }

        // Remove controls for the last row
        if (row == 9) {
            if (col < 3) {
                $(cell).html('');
            } 

            if (col == 2) {
                $(cell).html(' **Total** ');
            }

            $(cell).css('background-color', '#f46e42');
            $(cell).css('color', '#fff');
        }
    }
});

// This is a custom method for rounding
function ROUND(v, f)
{
    v = v.toFixed(f);
    v = numeral(v).format('0,0.00');

    return '$ ' + v;
}
</script>
</html>
```

