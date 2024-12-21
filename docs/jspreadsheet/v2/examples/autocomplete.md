title: Autocomplete Column
keywords: Jexcel, jquery, javascript, bootstrap, table design, spreadsheet, CSV, table, grid, autocomplete, customization, column
description: Customize your column type to autocomplete

[Back to Examples](/jspreadsheet/v2/examples)

# Autocomplete column

It is natively presented as single dropdown with text filter enabled and it is based on a pre-defined options defined in the instance declaration or in a dynamic remote JSON source.

[Json source demo](/jspreadsheet/countries)

```html
<html>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>

<script src="https://cdnjs.cloudflare.com/ajax/libs/jexcel/2.1.0/js/jquery.jexcel.js"></script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jexcel/2.1.0/css/jquery.jexcel.min.css" type="text/css" />

<div id="my"></div>

<script>
let data = [
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
        { type: 'autocomplete', source:['Apples','Bananas','Carrots','Oranges','Cheese'] },
        { type: 'checkbox' },
    ]
});
</script>
</html>
```

