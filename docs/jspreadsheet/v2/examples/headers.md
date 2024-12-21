title: Jspreadsheet | Examples | Nested Headers
keywords: Jexcel, jquery, javascript, excel-like, spreadsheet, jquery plugin, nested headers
description: Creating a Jspreadsheet table with nested headers.

[Back to Examples](/jspreadsheet/v2/examples)

# Nested Headers

The most recent version of the jquery plugin Jspreadsheet implements nested headers natively. A few examples on how to add nested headers your jquery table:

```html
<html>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jexcel/2.1.0/js/jquery.jexcel.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jexcel/2.1.0/js/jquery.jdropdown.js"></script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jexcel/2.1.0/css/jquery.jexcel.min.css" type="text/css" />
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jexcel/2.1.0/css/jquery.jdropdown.min.css" type="text/css" />

<div id="my"></div>

<script>
data = [
    ['BR', 'Cheese', 1],
    ['CA', 'Apples', 0],
    ['US', 'Carrots', 1],
    ['GB', 'Oranges', 0],
];

$('#my').jexcel({
    data:data,
    colHeaders: ['Country', 'Food', 'Stock'],
    colWidths: [ 300, 100, 100 ],
    columns: [
        { type: 'autocomplete', url:'/jspreadsheet/countries' },
        { type: 'dropdown', source:['Apples','Bananas','Carrots','Oranges','Cheese'] },
        { type: 'checkbox' },
    ],
    nestedHeaders:[
        [
            { title:'Supermarket information', colspan:'3' },
        ],
        [
            { title:'Location', colspan:'1' },
            { title:' Other Information', colspan:'2' }
        ],
    ],
});
</script>
</html>
```

