title: Handling events on Jspreadsheet
keywords: Jexcel, javascript, excel-like, spreadsheet, table, grid, events
description: Learn how to handle events on Jspreadsheet

# Handling events

## Various tracking javascript methods

Binding events on your javascript spreadsheet.

[See a list of all event handlers](/jspreadsheet/v4/docs/events)

### Source code

```html
<html>
<script src="https://bossanova.uk/jspreadsheet/v4/jspreadsheet.js"></script>
<script src="https://jsuites.net/v5/jsuites.js"></script>
<link rel="stylesheet" href="https://bossanova.uk/jspreadsheet/v4/jspreadsheet.css" type="text/css" />
<link rel="stylesheet" href="https://jsuites.net/v5/jsuites.css" type="text/css" />

<div id="spreadsheet"></div>

<script>
let changed = function(instance, cell, x, y, value) {
    let cellName = jspreadsheet.getColumnNameFromId([x,y]);
    $('#log').append('New change on cell ' + cellName + ' to: ' + value + '  ');
}

let beforeChange = function(instance, cell, x, y, value) {
    let cellName = jspreadsheet.getColumnNameFromId([x,y]);
    $('#log').append('The cell ' + cellName + ' will be changed');
}

let insertedRow = function(instance) {
    $('#log').append('Row added');
}

let insertedColumn = function(instance) {
    $('#log').append('Column added');
}

let deletedRow = function(instance) {
    $('#log').append('Row deleted');
}

let deletedColumn = function(instance) {
    $('#log').append('Column deleted');
}

let sort = function(instance, cellNum, order) {
    order = (order) ? 'desc' : 'asc';
    $('#log').append('The column  ' + cellNum + ' sorted by ' + order + ' ');
}

let resizeColumn = function(instance, cell, width) {
    $('#log').append('The column  ' + cell + ' resized to width ' + width + ' px');
}

let resizeRow = function(instance, cell, height) {
    $('#log').append('The row  ' + cell + ' resized to height ' + height + ' px');
}

let selectionActive = function(instance, x1, y1, x2, y2, origin) {
    let cellName1 = jspreadsheet.getColumnNameFromId([x1, y1]);
    let cellName2 = jspreadsheet.getColumnNameFromId([x2, y2]);
    $('#log').append('The selection from ' + cellName1 + ' to ' + cellName2 + ' ');
}

let loaded = function(instance) {
    $('#log').append('New data is loaded');
}

let moveRow = function(instance, from, to) {
    $('#log').append('The row ' + from + ' was move to the position of ' + to + '  ');
}

let moveColumn = function(instance, from, to) {
    $('#log').append('The col ' + from + ' was move to the position of ' + to + '  ');
}

let blur = function(instance) {
    $('#log').append('The table ' + $(instance).prop('id') + ' is blur');
}

let focus = function(instance) {
    $('#log').append('The table ' + $(instance).prop('id') + ' is focus');
}

let paste = function(data) {
    $('#log').append('Paste on the table ' + $(instance).prop('id') + ' ');
}

jspreadsheet(document.getElementById('spreadsheet'), {
    data: [
        ['Mazda', 2001, 2000, '2006-01-01'],
        ['Peugeot', 2010, 5000, '2005-01-01'],
        ['Honda Fit', 2009, 3000, '2004-01-01'],
        ['Honda CRV', 2010, 6000, '2003-01-01'],
    ],
    rowResize:true,
    columnDrag:true,
    columns: [
        { type: 'text', width:'200' },
        { type: 'text', width:'100' },
        { type: 'text', width:'100' },
        { type: 'calendar', width:'100' },
    ],
    onchange: changed,
    onbeforechange: beforeChange,
    oninsertrow: insertedRow,
    oninsertcolumn: insertedColumn,
    ondeleterow: deletedRow,
    ondeletecolumn: deletedColumn,
    onselection: selectionActive,
    onsort: sort,
    onresizerow: resizeRow,
    onresizecolumn: resizeColumn,
    onmoverow: moveRow,
    onmovecolumn: moveColumn,
    onload: loaded,
    onblur: blur,
    onfocus: focus,
    onpaste: paste,
});
</script>
</html>
```

## Global Super event

One method to handle all events on the online spreadsheet.

**NOTE** : Open the console to see the events.

