title: Column types
keywords: Jexcel, javascript, javascript vanilla, javascript plugin, plugin, excel-like, spreadsheet, table, tables, grid, datatables, data
description: Learn more about the powerful column types. This example brings all native column types and how to create your own custom type.

[Back to Examples](/jspreadsheet/v3/examples "Back to the examples section")

# Column types

The native available types in jspreadsheet javascript spreadsheet are the following:

  * text
  * numeric
  * hidden
  * dropdown
  * autocomplete
  * checkbox
  * radio
  * calendar
  * image
  * color

## Native column types

There are several other properties to change the behavior of those columns, please check the dropdown, calendar examples to get more advanced examples.

```html
<html>
<script src="https://bossanova.uk/jspreadsheet/v3/jexcel.js"></script>
<script src="https://jsuites.net/v3/jsuites.js"></script>
<link rel="stylesheet" href="https://bossanova.uk/jspreadsheet/v3/jexcel.css" type="text/css" />
<link rel="stylesheet" href="https://jsuites.net/v3/jsuites.css" type="text/css" />

<div id="spreadsheet"></div>

<script>
let data = [
    ['Jazz', 'Honda', '2019-02-12', '', true, '$ 2.000,00', '#777700'],
    ['Civic', 'Honda', '2018-07-11', '', true, '$ 4.000,01', '#007777'],
];

jexcel(document.getElementById('spreadsheet'), {
    data:data,
    columns: [
        { type: 'text', title:'Car', width:100 },
        { type: 'dropdown', title:'Make', width:100, source:[ "Alfa Romeo", "Audi", "Bmw" ] },
        { type: 'calendar', title:'Available', width:100 },
        { type: 'image', title:'Photo', width:120 },
        { type: 'checkbox', title:'Stock', width:80 },
        { type: 'numeric', title:'Price', width:100, mask:'$ #.##,00', decimal:',' },
        { type: 'color', width:100, render:'square', }
     ]
});
</script>
</html>
```  

## Custom column type

Jspreadsheet is very powerful and flexible, and you can create custom column type based on any external plugins.

A time custom column based on the [clockpicker plugin](https://weareoutman.github.io/clockpicker/) by weareoutman.

```html
<html>
<script src="https://bossanova.uk/jspreadsheet/v3/jexcel.js"></script>
<script src="https://jsuites.net/v3/jsuites.js"></script>
<link rel="stylesheet" href="https://bossanova.uk/jspreadsheet/v3/jexcel.css" type="text/css" />
<link rel="stylesheet" href="https://jsuites.net/v3/jsuites.css" type="text/css" />

<link rel="stylesheet" type="text/css" href="http://weareoutman.github.io/clockpicker/dist/jquery-clockpicker.min.css" />
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
<script src="http://weareoutman.github.io/clockpicker/dist/jquery-clockpicker.min.js"></script>

<div id="custom"></div>

<script>
let data2 = [
    ['PHP', '14:00'],
    ['Javascript', '16:30'],
];

let customColumn = {
    // Methods
    closeEditor : function(cell, save) {
        let value = cell.children[0].value;
        cell.innerHTML = value;
        return value;
    },
    openEditor : function(cell) {
        // Create input
        let element = document.createElement('input');
        element.value = cell.innerHTML;
        // Update cell
        cell.classList.add('editor');
        cell.innerHTML = '';
        cell.appendChild(element);
        $(element).clockpicker({
            afterHide:function() {
                setTimeout(function() {
                    // To avoid double call
                    if (cell.children[0]) {
                        spreadsheet.closeEditor(cell, true);
                    }
                });
            }
        });
        // Focus on the element
        element.focus();
    },
    getValue : function(cell) {
        return cell.innerHTML;
    },
    setValue : function(cell, value) {
        cell.innerHTML = value;
    }
}

spreadsheet = jexcel(document.getElementById('custom'), {
    data:data2,
    columns: [
        { type: 'text', title:'Course Title', width:300 },
        { type: 'text', title:'Time', width:100, editor:customColumn },
     ]
});
</script>
</html>
```

