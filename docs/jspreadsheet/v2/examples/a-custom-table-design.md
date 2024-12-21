title: Jspreadsheet | Examples | Bootstrap and custom table design
keywords: Jexcel, jquery, javascript, bootstrap, table design, spreadsheet, CSV, table, grid
description: Create a custom table design. For example a bootstrap-like spreadsheet table.
canonical: https://bossanova.uk/jspreadsheet/v2/examples/a-custom-table-design

[Back to Examples](/jspreadsheet/v2/examples)

# Create custom CSS for your javascript spreadsheet

The following example shows a CSS addon to change the core layout of your jquery tables.

  

## Green borders and corners jquery spreadsheet

[Bootstrap-like jquery spreadsheet example](/jspreadsheet/v2/examples/a-custom-table-design)

## Bootstrap-like jquery spreadsheet.

[Green borders and corners jquery spreadsheet example](/jspreadsheet/v2/examples/a-custom-table-design?layout=green)

Your jquery table can be customized by including an additional addon CSS. If you have created a nice design, please share with us.

### Source code

```html
<html>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>

<script src="https://cdnjs.cloudflare.com/ajax/libs/jexcel/2.1.0/js/jquery.jexcel.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jexcel/2.1.0/js/jquery.jdropdown.js"></script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jexcel/2.1.0/css/jquery.jexcel.min.css" type="text/css" />
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jexcel/2.1.0/css/jquery.jdropdown.min.css" type="text/css" />

<!-- Optional CSS addon -->

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jexcel/2.1.0/css/jquery.jexcel.green.min.css" type="text/css" />

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jexcel/2.1.0/css/jquery.jexcel.bootstrap.min.css" type="text/css" />


<div id="my"></div>

<script>
let data = [
    ['BR', 'Cheese', 1, 1900.01],
    ['CA', 'Apples', 0, 1200.21],
    ['US', 'Carrots', 1, 400.34],
    ['GB', 'Oranges', 0, 900.43],
];

$('#my').jexcel({
    data: data,
    colHeaders: ['Country', 'Food', 'Stock', 'Price'],
    colWidths: [ 300, 100, 100, 100 ],
    colAlignments: [ 'left', 'left', 'left', 'left' ],
    columns: [
        { type: 'autocomplete', url:'/jspreadsheet/countries' },
        { type: 'autocomplete', source:['Apples','Bananas','Carrots','Oranges','Cheese'] },
        { type: 'checkbox' },
        { type: 'number' },
    ]
});
</script>
</html>
```
