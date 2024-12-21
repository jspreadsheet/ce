title:  Jspreadsheet | Examples | Advanced dropdown column type
keywords: Jexcel, jquery, javascript, excel-like, spreadsheet, jquery plugin, sorting, table, grid, order by
description: Full examples on how to handle simple, advanced, autocomplete and conditional dropdowns.

[Back to Examples](/jspreadsheet/v2/examples)

# Working with dropdowns

Jspreadsheet brings some new very flexible dropdown options that enables you to delivery great user experience though applications. The new dropdown column options include the autocomplete, multiple options, data picker, different template types and much more advantages, such as:

  * Create a simple dropdown from array
  * Value or key-value select is available
  * Populate a dropdown from a external JSON request
  * Dynamic autocomplete search based on another column value
  * Conditional dropdowns: options from a dropdown based on a method return
  * Multiple and autocomplete
  * Responsive data picker

## Multiple and autocomplete options

The highlight features introduced in the most version of the jquery table is definitely the autocomplete and multiple options. The following example shows the column Product Origin with the autocomplete and multiple directives initiated as true.

### Source code

```html
<html>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>

<script src="https://cdnjs.cloudflare.com/ajax/libs/jexcel/2.1.0/js/jquery.jexcel.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jexcel/2.1.0/js/jquery.jdropdown.js"></script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jexcel/2.1.0/css/jquery.jexcel.min.css" type="text/css" />
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jexcel/2.1.0/css/jquery.jdropdown.min.css" type="text/css" />

<div id="my1"></div>

<script>
$('#my1').jexcel({
    data: [
        ['US', 'Cheese', 'Yes', '2019-02-12'],
        ['CA;US;UK', 'Apples', 'Yes', '2019-03-01'],
        ['CA;BR', 'Carrots', 'No', '2018-11-10'],
        ['BR', 'Oranges', 'Yes', '2019-01-12'],
    ],
    colHeaders: [ 'Product Origin','Description', 'Stock', 'Best before' ],
    colWidths: [ 300, 200, 100, 100 ],
    columns: [
        { type: 'dropdown', source: ['BR', 'US', 'UK', 'CA'], autocomplete:true, multiple:true },
        { type: 'text' },
        { type: 'dropdown', source:['No','Yes'] },
        { type: 'calendar' },
    ]
});
</script>
</html>
```  
  

## Conditional dropdown

Jspreadsheet dropdown column can show different options based on the value of other columns. To use that function you should use a method defined by the filter parameter in the initialization. The following example shows the product column options based on the value selected on the column Category.

### Source code

```html
<html>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>

<script src="https://cdnjs.cloudflare.com/ajax/libs/jexcel/2.1.0/js/jquery.jexcel.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jexcel/2.1.0/js/jquery.jdropdown.js"></script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jexcel/2.1.0/css/jquery.jexcel.min.css" type="text/css" />
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jexcel/2.1.0/css/jquery.jdropdown.min.css" type="text/css" />

<div id="spreadsheet2"></div>

<script>
let dropdown = function(instance, cell, c, r, source) {
    // Get a value from the same row but previous column
    var value = $(instance).jexcel('getValue', c-1 + '-' + r);

    // Return the values will be part in your current column
    if (value == 1) {
        return ['Apples','Bananas','Oranges'];
    } else if (value == 2) {
        return ['Carrots'];
    } else {
        return source;
    }
}

$('#spreadsheet2').jexcel({
    data: [
        [3, 'Cheese', 0],
        [1, 'Apples', 1],
        [2, 'Carrots', 0],
        [1, 'Oranges', 0],
    ],
    colHeaders: ['Category','Product', 'Buy later'],
    colWidths: [ 300, 200, 100 ],
    columns: [
        { type: 'dropdown', source: [ {'id':'1', 'name':'Fruits'},  {'id':'2', 'name':'Legumes'}, {'id':'3', 'name':'General Food'} ] },
        { type: 'dropdown', source: [ 'Apples', 'Bananas', 'Carrots', 'Oranges', 'Cheese' ], filter:dropdown },
        { type: 'checkbox' },
    ]
});
</script>
</html>
```  
