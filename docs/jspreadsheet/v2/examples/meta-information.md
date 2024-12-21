title: Jspreadsheet | Examples | Add meta information in your cells
keywords: Jexcel, jquery, javascript, jquery table, meta information
description: Manage the table meta information

[Back to Examples](/jspreadsheet/v2/examples)

# Add meta information in your spreadsheet spreadsheet plugin

You can keep meta information bind to cells but not visible to users. This can be useful for integrating Jspreadsheet with third party software.

But, after the initialization is still possible to manage the cell meta information programmatically using the method getMeta and setMeta, as follow.

|   |   |
| ---|--- |  
| $('#my1').jexcel('setMeta', [{ A1: { newInfo:'newInfo' } }, { B1: { info1:'test1', info2:'test2'} }, { C2: { metaTest:'test3' } }]); | Set meta data for the table in a batch  |
| $('#my1').jexcel('setMeta', 'A2', 'myKeyMeta', 'myValueMeta'); | Set a meta information for A2  |
| $('#my1').jexcel('getMeta', 'A1'); | Get the meta information for A1  |
| $('#my1').jexcel('getMeta'); | Get all meta information  |
  
  

## Source code

```html
<html>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>

<script src="https://cdnjs.cloudflare.com/ajax/libs/jexcel/2.1.0/js/jquery.jexcel.js"></script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jexcel/2.1.0/css/jquery.jexcel.min.css" type="text/css" />

<div id="my1"></div>

<script>
data1 = [
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
    meta:[
        { A1: { myMeta:'this is just a test', otherMetaInformation:'other test'} },
    ],
});
</script>
</html>
```

