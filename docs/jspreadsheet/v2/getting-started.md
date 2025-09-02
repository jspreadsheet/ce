title: Getting Started with jExcel
keywords: Jspreadsheet CE, Jexcel, JavaScript Data Grid, Spreadsheets, JavaScript tables, Excel-like data grid, web-based spreadsheets, data grid controls, data grid features
description: Create data grids with spreadsheet controls with jExcel.

[Back to Documentation](/jspreadsheet/v2/docs)

# Getting started with the jquery plugin

## Initialization

Jspreadsheet can receive data from a JS array, CSV or a JSON format, following the examples below:

There are three ways to load data into your spreadsheet. Using the parameter _data:_ passing a reference of a javascript array. The second method is to load the data straight from a remove CSV file using the _csv:_ parameter. The third is to pass the URL from a json content using the _url:_ parameter as show in the following examples.

### Loading from a javascript array

```html
<div id="my-spreadsheet"></div>

<script>
  let data = [
    ["Mazda", 2001, 2000],
    ["Peugeot", 2010, 5000],
    ["Honda Fit", 2009, 3000],
    ["Honda CRV", 2010, 6000],
  ];

  $("#my-spreadsheet").jexcel({
    data: data,
    colHeaders: ["Model", "Price", "Price"],
    colWidths: [300, 80, 100],
  });
</script>
```

### Loading from a JSON file

{.ignore}

```html
<div id="my-spreadsheet"></div>

<script>
  $("#my-spreadsheet").jexcel({
    url: "/jspreadsheet/json",
    colHeaders: ["Model", "Price", "Price"],
    colWidths: [300, 80, 100],
  });
</script>
```

### Loading from a CSV file

{.ignore}

```html
<div id="my-spreadsheet"></div>

<script>
  $("#my-spreadsheet").jexcel({
    // URL from the CSV file
    csv: "/jspreadsheet/csv",
    // Get the first of the CSV file and consider the headers
    csvHeaders: true,
    // Default column widths
    colWidths: [300, 80, 100],
  });
</script>
```

[See a working example](/jspreadsheet/v2/examples/creating-a-table-from-an-external-csv-file)

## Destroying a table

You can destroy the table, all data and events related to an existing table by using the method _destroy_ as shown below.

{.ignore}

```html
<script>
  // Create the table
  $("#my").jexcel({
    csv: "/jspreadsheet/csv",
    csvHeaders: true,
    colWidths: [70, 200, 300],
  });

  // Destroy the table
  $("#my").jexcel("destroy");
</script>
```

## Header titles

If you do not define the column title, the default will be the use of a letter, just as any other spreadsheet software. But, if you would like to have custom column names you can use the directive colHeaders:

{.ignore}

```javascript
$("#my").jexcel({
  data: data,
  colHeaders: ["Model", "Price", "Price", "Date"],
  colWidths: [300, 80, 100, 100],
});
```

**Note** : If you are loading your data from a CSV file, you can define the csvHeader:true, so the first row will be used as your column names.

## Column width

The parameter _colWidths_ can be used to define your column widths.

## Column types

The javascript spreadsheet has available some extra native column types in addition to the default input text. It means you can get alternative ways to enter data in your spreadsheet. Advanced numeric inputs, dropdowns to calendar picks and a very easy way to have your custom integrations, makes the spreadsheet plugin a very flexible tool to enhance the user experience when using your applications.

In the example below, you will have text, numeric inputs and a calendar picker. But, other native options will be available such as: _**text, numeric, hidden, dropdown, autocomplete, checkbox, calendar.**_

{.ignore}

```javascript
$("#my").jexcel({
  data: data,
  colHeaders: ["Model", "Date", "Price", "Date"],
  colWidths: [300, 80, 100, 100],
  columns: [
    { type: "text" },
    { type: "numeric" },
    { type: "numeric" },
    { type: "calendar", options: { format: "DD/MM/YYYY" } },
  ],
});
```

### Calendar type

When using the calendar column, you can change the behavior behavior of your calendar by sending some extra options as example above. The possible values are:

{.ignore}

```javascript
let defaults = {
  format: "DD/MM/YYYY", // Date format
  readonly: 0, // Readonly input
  today: 0, // Default as today
  time: 0, // Show time picker
  clear: 1, // Clear buttom
  mask: 1, // Mask calendar
};
```

[See a working example](/jspreadsheet/v2/examples/using-a-calendar-column-type)

### Dropdown and autocomplete type

There are different ways to work with dropdowns in Jspreadsheet. It is possible to define the parameter _source_ as a simple or key-value array. Additionally, is possible to use the paramter _url_ to populate your dropdown from an external json format source.

The autocomplete drowndown has the same configuration inputs, and both can be used as follow:

{.ignore}

```javascript
let data = [
    ['Honda', 1, 'Civic', '4'],
    ['Peugeot', 3,'1007', '2'],
    ['Smart', 3,'Cabrio', '4;5'],
];

$('#my').jexcel({
    data:data,
    colHeaders: ['Model','Color', 'Description'],
    colWidths: [ 300, 80, 100 ],
    columns: [
        { type: 'dropdown', source:['Seat', 'Renault', 'Peugeot'] },
        { type: 'dropdown', source:[{'id':1,'name':'Yellow'}, {'id':2,'name':'Black'}, {'id':3,'name':'Green'}] },
        { type: 'dropdown', url:'/jspreadsheet/test' },
        { type: 'dropdown', url:'/jspreadsheet/countries' autocomplete:true, multiple:true },
    ]
});
```

[See a working example](/jspreadsheet/v2/examples/working-with-dropdowns)

### Custom type

Jspreadsheet makes possible to extend third party jquery plugins to create your custom columns. Basically to use this feature, you should implement some basic methods such as: openEditor, closeEditor, getValue, setValue as
following.

{.ignore}

```javascript
let customEditor = {
  // Methods
  closeEditor: function (cell, save) {
    // Get value
    var value = $(cell).find(".editor").spectrum("get").toHexString();

    // Set visual value
    $(cell).html(value);
    $(cell).css("color", value);

    // Close edition
    $(cell).removeClass("edition");
  },
  openEditor: function (cell) {
    var main = this;
    // Get current content
    var html = $(cell).html();

    // Basic editor
    var editor = document.createElement("div");
    $(cell).html(editor);
    $(editor).prop("class", "editor");
    $(editor).spectrum({
      color: html,
      preferredFormat: "hex",
      hide: function (color) {
        main.closeEditor($(cell), true);
      },
    });
    $(editor).spectrum("show");
  },
  getValue: function (cell) {
    return $(cell).html();
  },
  setValue: function (cell, value) {
    $(cell).html(value);
    $(cell).css("color", value);
    return true;
  },
};

let data = [
  ["Google", "#542727"],
  ["Yahoo", "#724f4f"],
  ["Bing", "#b43131"],
];

$("#my").jexcel({
  data: data,
  colHeaders: ["Name", "Custom color"],
  colWidths: [300, 200],
  columns: [{ type: "text" }, { type: "text", editor: customEditor }],
});
```

[See a working example](/jspreadsheet/v2/examples/integrating-a-third-party-plugin-into-your-spreadsheet)

## Define a minimum table dimension size.

The follow example will create a data table with a minimum number of ten columns and five rows:

{.ignore}

```javascript
data3 = [
  ["Mazda", 2001, 2000],
  ["Peugeot", 2010, 5000],
  ["Honda Fit", 2009, 3000],
  ["Honda CRV", 2010, 6000],
];

$("#minExample").jexcel({
  data: data3,
  minDimensions: [10, 5],
  colHeaders: ["Model", "Year", "Price"],
  colWidths: [300, 80, 100],
});
```
