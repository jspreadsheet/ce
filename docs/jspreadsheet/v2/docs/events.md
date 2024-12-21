title: Handling events on Jspreadsheet
keywords: Jexcel, javascript, excel-like, spreadsheet, table, grid, events
description: Learn how to handle events on Jspreadsheet

[Back to Documentation](/jspreadsheet/v2/docs)

# Events on your online spreadsheets

## Update Settings on the Go

The JavaScript spreadsheet plugin offers a native feature to customize your table on the go. You can define the method updateSettings to create a parser and customize the data should be shown to the user, as the example below.

```javascript
// Live update of the settings
$('#my').jexcel('updateSettings', {
    table: function (instance, cell, col, row, val, id) {
        if (col == 2 || col == 3) {
            // Get text
            txt = $(cell).text();
            // Format text
            txt = numeral(txt).format('0,0.00');
            // Update cell value
            $(cell).html(' $ ' + txt);
        }
    }
});
```

[Basic example updating the table based on the user entry](/jspreadsheet/v2/examples/currency-and-masking-numbers)

## Basic events

The JavaScript spreadsheet basic events available in this current version.

| Event| description  |
| ---|---  |
| **onload** | This method is called when the method setData  |
| **onbeforechange** | Before a column value is changed.  |
| **onchange** | After a column value is changed.  |
| **onafterchange** | After all change events is performed.  |
| **oninsertrow** | After a new row is inserted.  |
| **ondeleterow** | After a row is excluded.  |
| **oninsertcolumn** | After a new column is inserted.  |
| **ondeletecolumn** | After a column is excluded.  |
| **onselection** | On the selection is changed.  |
| **onsort** | After a colum is sorted.  |
| **onresize** | After a colum is resized.  |
| **onmoverow** | After a row is moved to a new position.  |
| **onfocus** | On table focus  |
| **onblur** | On table blur  |
  
[Advanced example logging all events in a tableexample](/jspreadsheet/v2/examples/tracking-changes-on-the-spreadsheet)  
  

## Basic Example:

{.ignore}
```javascript
handler = function(obj, cell, val) {
    console.log('My table id: ' + $(obj).prop('id'));
    console.log('Cell changed: ' + $(cell).prop('id'));
    console.log('Value: ' + val);
};

insertrow = function(obj) {
    alert('new row added on table: ' + $(obj).prop('id'));
}

deleterow = function(obj) {
    alert('row excluded on table: ' + $(obj).prop('id'));
}

data = [
    ['Mazda', 2001, 2000, '2006-01-01 00:00:00'],
    ['Peugeot', 2010, 5000, '2005-01-01 00:00:00'],
    ['Honda Fit', 2009, 3000, '2004-01-01 00:00:00'],
    ['Honda CRV', 2010, 6000, '2003-01-01 00:00:00'],
];

$('#my').jexcel({
    data:data,
    colHeaders: ['Model', 'Date', 'Price', 'Date'],
    colWidths: [ 300, 80, 100, 100 ],
    onchange:handler,
    oninsertrow:insertrow,
    ondeleterow:deleterow,
    columns: [
        { type: 'text' },
        { type: 'numeric' },
        { type: 'numeric' },
        { type: 'calendar', options: { format:'DD/MM/YYYY HH24:MI', time:1 } },
    ]
});
```

See this working example on jsfiddle:

[Basic example on handling events on jsFiddle](https://jsfiddle.net/spreadsheet/5n21ep6s/)

