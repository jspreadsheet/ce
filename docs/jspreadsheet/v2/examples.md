title: Examples
keywords: Jexcel, javascript, examples
description: Examples how to create web based spreadsheets using Jexcel.

# Examples

The Spreadsheet minimalist jQuery Plugin examples shows the usage with various column types such as text, dropdown, autocomplete, checkbox and date.

```html
<div id="my"></div>

<script>
data = [
    ['BR', 'Classe A', 1, 1, '2017-01-12'],
    ['CA', 'Classe B', 1, 1, '2017-01-12'],
    ['US', 'Classe A', 2, 1, '2017-01-12'],
    ['US', 'Classe C', 3, 0, '2017-01-12'],
];

$('#my').jexcel({
    data:data,
    colHeaders:  [ 'Country', 'Description', 'Type', 'Stock', 'Next purchase' ],
    colWidths: [ 250, 80, 120, 100, 120 ],
    columns: [
        { type: 'autocomplete', url:'/jspreadsheet/countries' },
        { type: 'text' },
        { type: 'dropdown', source:[ {'id':'1', 'name':'Fruits'}, {'id':'2', 'name':'Legumes'}, {'id':'3', 'name':'General Food'} ] },
        { type: 'checkbox' },
        { type: 'calendar' },
    ]
});
</script>
```

[See this example on jsfiddle](https://jsfiddle.net/spreadsheet/kgmcav01/)

## Source code

```html
<html>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>

<script src="https://cdnjs.cloudflare.com/ajax/libs/jexcel/2.1.0/js/jquery.jexcel.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jexcel/2.1.0/js/jquery.jdropdown.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jexcel/2.1.0/js/jquery.jcalendar.js"></script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jexcel/2.1.0/css/jquery.jexcel.min.css" type="text/css" />
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jexcel/2.1.0/css/jquery.jdropdown.min.css" type="text/css" />
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jexcel/2.1.0/css/jquery.jcalendar.min.css" type="text/css" />

<div id="my"></div>

<script>
data = [
    [3, 'Classe A', 'Cheese', 1, '2017-01-12'],
    [1, 'Classe B', 'Apples', 1, '2017-01-12'],
    [2, 'Classe A', 'Carrots', 1, '2017-01-12'],
    [1, 'Classe C', 'Oranges', 0, '2017-01-12'],
];

$('#my').jexcel({
    data:data,
    colHeaders:  [ 'Country', 'Description', 'Type', 'Stock', 'Next purchase' ],
    colWidths: [ 300, 80, 100, 60, 120 ],
    columns: [
        { type: 'autocomplete', url:'/jspreadsheet/countries' },
        { type: 'text' },
        { type: 'dropdown', source:[ {'id':'1', 'name':'Fruits'}, {'id':'2', 'name':'Legumes'}, {'id':'3', 'name':'General Food'} ] },
        { type: 'checkbox' },
        { type: 'calendar' },
    ]
});
</script>
</html>
```

## More examples

* [Advanced dropdowns](/jspreadsheet/v2/examples/working-with-dropdowns "Advanced dropdown column type")  
  Full examples on how to handle simple, advanced, autocomplete and conditional dropdowns.

* [Programmaticaly changes](/jspreadsheet/v2/examples/working-with-the-data "Jspreadsheet | Examples | Working with the data")  
  Insert, remove and move columns and rows

* [Fixed headers](/jspreadsheet/v2/examples/table-with-fixed-headers "Jspreadsheet | Examples | Data table with fixed headers and scrolling")  
  Overflow table and scrolling

* [Custom table design](/jspreadsheet/v2/examples/a-custom-table-design "Jspreadsheet | Examples | Bootstrap and custom table design")  
  Create a custom table design. For example a bootstrap-like spreadsheet table.

* [Table styling](/jspreadsheet/v2/examples/table-styling "Jspreadsheet | Examples | Changing the table style")  
  Table styling

* [Manage cell comments](/jspreadsheet/v2/examples/comments "Jspreadsheet | Examples | Add comments in your jquery table")  
  Manage a table cell comments

* [Custom meta information](/jspreadsheet/v2/examples/meta-information "Jspreadsheet | Examples | Add meta information in your cells")  
  Manage the table meta information

* [Custom toolbars](/jspreadsheet/v2/examples/jquery-table-with-toolbars "Jspreadsheet | Examples | Your jquery table with toolbars")  
  Full examples how to load a autocomplete dropdown.

* [Loading remote data](/jspreadsheet/v2/examples/creating-a-table-from-an-external-csv-file "Jspreadsheet | Examples | Creating a web spreadsheet based on an external CSV")  
  How to load the data from an external CSV file into a Jspreadsheet grid or table.

* [Masking and formating](/jspreadsheet/v2/examples/currency-and-masking-numbers "Jspreadsheet | Examples | Using currency column type and how to masking numbers")  
  Handling currency types and masking numbers.

* [Calendar picker](/jspreadsheet/v2/examples/using-a-calendar-column-type "Jspreadsheet | Examples | Calendar column type with date and datetime picker")  
  How to handle a calendar with date and datetime picker.

* [Sorting](/jspreadsheet/v2/examples/sorting-data "Jspreadsheet | Examples | Sorting your grid")  
  Sorting your Jspreadsheet spreadsheet

* [Create custom cells](/jspreadsheet/v2/examples/integrating-a-third-party-plugin-into-your-spreadsheet "Jspreadsheet | Examples | Custom column and integrating plugins on your table")  
  How to create custom column types based on a third party jquery plugin

* [Handling events](/jspreadsheet/v2/examples/tracking-changes-on-the-spreadsheet "Jspreadsheet | Examples | Events")  
  Handling events on your spreadsheet

* [Readonly options](/jspreadsheet/v2/examples/readonly-options "Jspreadsheet | Examples | Handling readonly column and cells on your spreadsheet")  
  Understanding how to set a readonly column or multiple custom cells

* [Multiple instances](/jspreadsheet/v2/examples/multiple-spreadsheets-in-the-same-page "Jspreadsheet | Examples | Create multiple instances in the same page")  
  How to create multiple table instances in the same page

* [Text wrap](/jspreadsheet/v2/examples/text-wrapping "Jspreadsheet | Examples | Text wrap")  
  How to change the text wrap behavior in a Jspreadsheet column

* [Nested headers](/jspreadsheet/v2/examples/headers "Jspreadsheet | Examples | Nested Headers")  
  Creating a Jspreadsheet table with nested headers.

* [Add images on your cells](/jspreadsheet/v2/examples/images "Jspreadsheet | Examples | Images on your images")  
  Add images on your spreasheet cells
