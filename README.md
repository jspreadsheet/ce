# Jspreadsheet CE v4: The JavaScript spreadsheet 

<b>Jexcel CE</b> has been renamed to <b>Jspreadsheet CE</b><br><br> 

[**Jspreadsheet CE**](https://bossanova.uk/jspreadsheet/v4/) is a lightweight Vanilla JavaScript plugin to create amazing web-based interactive HTML tables and spreadsheets compatible
with other spreadsheet software. You can create an online spreadsheet table from a JS array,
JSON, CSV or XSLX files. You can copy from excel and paste straight to your Jspreadsheet CE spreadsheet and vice versa.
It is very easy to integrate any third party JavaScript plugins to create your own custom columns, custom editors, and customize any
feature into your application. Jspreadsheet CE has plenty of different input options through its native column types to cover the most common web-based application
requirements. It is a complete solution for web data management. Create amazing applications with Jspreadsheet CE JavaScript spreadsheet.

## Main advantages 

- Make rich and user-friendly web interfaces and applications. 
- You can easily handle complicated data inputs in a way users are used..
- Improve your user software experience.
- Create rich CRUDS and beautiful UI.
- Compatibility with excel: users can move data around with common copy and paste shortcuts.
- Easy customizations with easy third-party plugin integrations.
- Lean, fast and simple to use.
- Thousands of successful user cases.
- Speed up your work dealing with difficult data entry in a web-based software.


## Screenshot

![The JavaScript spreadsheet](https://bossanova.uk/templates/default/img/jexcel.gif)


## Installation

% npm install jspreadsheet-ce

[Download ZIP](https://github.com/jspreadsheet/ce/archive/master.zip)

### Basic demo 

A basic example to integrate the JavaScript spreadsheet in your website to create your first online spreadsheet. 

```html
<script src="https://bossanova.uk/jspreadsheet/v4/jexcel.js"></script>
<script src="https://jsuites.net/v4/jsuites.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v4/jsuites.css" type="text/css" />
<link rel="stylesheet" href="https://bossanova.uk/Jspreadsheet/v4/jexcel.css" type="text/css" />
```

You should initiate your table based on a div container, such as:
```html
<div id="spreadsheet"></div>
```

To initialize a Jspreadsheet CE table you should run a JavaScript, such as:
```javascript
var data = [
    ['Jazz', 'Honda', '2019-02-12', '', true, '$ 2.000,00', '#777700'],
    ['Civic', 'Honda', '2018-07-11', '', true, '$ 4.000,01', '#007777'],
];

jspreadsheet(document.getElementById('spreadsheet'), {
    data:data,
    columns: [
        { type: 'text', title:'Car', width:120 },
        { type: 'dropdown', title:'Make', width:200, source:[ "Alfa Romeo", "Audi", "Bmw" ] },
        { type: 'calendar', title:'Available', width:200 },
        { type: 'image', title:'Photo', width:120 },
        { type: 'checkbox', title:'Stock', width:80 },
        { type: 'numeric', title:'Price', width:100, mask:'$ #.##,00', decimal:',' },
        { type: 'color', width:100, render:'square', }
     ]
});
```

## Examples

- [React Implementation](https://bossanova.uk/jspreadsheet/v4/examples/react)\
A full example on how to integrate Jspreadsheet CE with React.

- [VUE Implementation](https://bossanova.uk/jspreadsheet/v4/examples/vue)\
A full example on how to integrate Jspreadsheet CE with Vue.

- [Search and pagination](https://bossanova.uk/jspreadsheet/v4/examples/datatables)\
Full spreadsheet example with search and pagination to bring great compatibility for those who love datatables.

- [Column types](https://bossanova.uk/jspreadsheet/v4/examples/column-types)\
Learn more about the powerful column types. This example brings all native column types and how to create your own custom type.

- [Javascript dropdown](https://bossanova.uk/jspreadsheet/v4/examples/dropdown-and-autocomplete)\
Full examples on how to handle simple, advanced, multiple, autocomplete and conditional dropdowns. Create amazing JavaScript tables using categories and images in your dropdowns.

- [Javascript calendar, date and datetime picker](https://bossanova.uk/jspreadsheet/v4/examples/javascript-calendar)\
Example from basic to advanced calendar usage, date and datetime picker.

- [Image upload](https://bossanova.uk/jspreadsheet/v4/examples/image-upload)\
This examples shows how to upload images to your spreadsheet.

- [Programmatically updates](https://bossanova.uk/jspreadsheet/v4/examples/programmatically-updates)\
How to update your spreadsheet and its data by JavaScript.

- [Table Style](https://bossanova.uk/jspreadsheet/v4/examples/table-style)\
Bring a very special touch to your applications customizing your JavaScript spreadsheet.

- [Events](https://bossanova.uk/jspreadsheet/v4/examples/events)\
Learn how to handle events on Jspreadsheet CE.

- [Importing data](https://bossanova.uk/jspreadsheet/v4/examples/import-data)\
How to import data from an external CSV, json file or XLSX.

- [Formulas](https://bossanova.uk/jspreadsheet/v4/examples/spreadsheet-formulas)\
Unleash the power of your tables bringing formulas and custom JavaScript methods on your Jspreadsheet spreadsheet.

- [Custom toolbars](https://bossanova.uk/jspreadsheet/v4/examples/spreadsheet-toolbars)\
Full example on how to enable nor customize your JavaScript spreadsheet toolbar.

- [Column comments](https://bossanova.uk/jspreadsheet/v4/examples/comments)\
Allow comments in your table spreadsheet.

- [Headers](https://bossanova.uk/jspreadsheet/v4/examples/headers)\
Enabled nested headers in your spreadsheet and learn how to set or get header values.

- [Translations](https://bossanova.uk/jspreadsheet/v4/examples/translations)\
How to translate the default messages from Jspreadsheet.

- [Merged cells](https://bossanova.uk/jspreadsheet/v4/examples/merged-cells)\
Full example on how to handle merge cells in your JavaScript tables.

- [Sorting columns](https://bossanova.uk/jspreadsheet/v4/examples/sorting)\
Example how to sort the table by a column via JavaScript.

- [Lazy loading](https://bossanova.uk/jspreadsheet/v4/examples/lazy-loading)\
This example brings a very nice feature to deal with large table datasets.



## Jspreadsheet CE History

### Jspreadsheet CE 4.6

<b>Jexcel</b> has been renamed to <b>Jspreadsheet</b>

### Jspreadsheet CE 4.0.0

A special thank to the [FDL - Fonds de Dotation du Libre](https://www.fdl-lef.org/) support and sponsorship that make this version possible with so many nice features.

- Support workbooks/tabs
- Create a dymic jexcel table from a HTML static element
- Highlight the border from cells after CTRL+C
- Footer with formula support
- Multiple columns resize
- JSON update support (Helpers to update a remote server)
- Global super event (centralized method to dispatch all events in one)
- Custom helpers: =PROGRESS (progressbar), =RATING (5 star rating)
- Custom helpers: =COLUMN, =ROW, =CELL, =TABLE, =VALUE information to be used on formula execution
- Dynamic nested header updates
- A new column type for HTML editing
- New flags such as: includeHeadersOnCopy, persistance, filters, autoCasting, freezeColumns
- New events such as: onevent, onchangepage, onbeforesave, onsave
- More examples and documentation

### Jspreadsheet CE 3.9.0 (Jexcel)
- New methods
- General fixes

### Jspreadsheet CE 3.6.0 (Jexcel)
- Better formula parsing
- New events
- New initialization options
- General fixes

### Jspreadsheet CE 3.2.3 (Jexcel)
- getMeta, setMeta methods
- Npm package with jSuites
- General fixes


### Jspreadsheet CE 3.0.1 (Jexcel)

Jspreadsheet CE v3 is a complete rebuilt JavaScript Vanilla version. For that reason it was not possible to keep a
complete compatibility with the previous version. If you are upgrating you might need to implement a few updates in your code.
If you have questions, you can review the article upgrating from Jspreadsheet CE v2 or Handsontable.

The Jspreadsheet CE v3 brings lot of great new features:

- Drag and drop columns.
- Resizable rows.
- Merge columns.
- Search.
- Pagination.
- Lazy loading.
- Full screen flag.
- Image upload.
- Native color picker.
- Better mobile compatibility.
- Better nested headers compatibily.
- Amazing keyboard navegation support.
- Better hidden column management.
- Great data picker: dropdown, autocomplete, multiple, group options and icons.
- Importing from XSLX (experimental).

Big improviments are included, such as:

- Complete new formula engine with no external depencies with much faster results.
- Absolutely no selectors, means a much faster application.
- New native columns.
- jQuery is not required anymore.
- React, Vue and Angular examples.
- XLXS support using a custom sheetjs (experimental).


### Jspreadsheet CE 2.1.0 (Jexcel)

We are glad to bring you the latest jQuery plugin version, with the following improvements:

- Mobile touch fixes.
- Paste fixes & New CSV parser.

### Jspreadsheet CE 2.0.0 (Jexcel)

- New radio column.
- New dropdown with autocomplete and multiple selection options.
- Header/body separation for a better scroll/column resize behavior and compatibility.
- Better text-wrap including alt+enter excel compatibility.
- New set/get meta information.
- New set/get config parameters.
- New set/get programmatically cell style.
- New set/get cell comments.
- New table custom toolbar.
- New responsive calendar picker.

### Jspreadsheet CE 1.5.7 (Jexcel)

- Checkbox column type improvements.
- Destroy jQuery table updates.

### Jspreadsheet CE 1.5.1 (Jexcel)

- Spreadsheet data overflow and fixed headers. See an <a href='/jexcel/examples/table-with-fixed-headers'>example</a>.
- Navigation improvements.


### Jspreadsheet CE 1.5.0 (Jexcel)

- Relative insertRow, deleteRow, insertColumn, deleteColumn.
- Redo, Undo action tracker for insertRow, deleteRow, insertColumn, deleteColumn, moveRow.
- New formula column recursive chain.
- New alternative design option bootstrap-like.
- `updateSettings` updates.


## Officials websites
- [Jspreadsheet CE v4 - Javascript Spreasheet](https://bossanova.uk/jspreadsheet/v4)
- [Jspreadsheet CE v3 - Vanilla JavaScript](https://bossanova.uk/jspreadsheet/v3)
- [Jspreadsheet CE v2 - jQuery Plugin](https://bossanova.uk/jspreadsheet/v2)

- [Jspreadsheet Pro v7 - Javascript Spreasheet](https://jexcel.net/v7)

## Community
- [GitHub](https://github.com/jspreadsheet/ce/issues)

## Compilation

To create a new distribution based on the source.

docker-compose up
docker-compose exec bash php

% cd /bitnami/php-fpm/src
% php compile.php


## Copyright and license
Jspreadsheet CE is released under the [MIT license]. Contact <contact@jspreadsheet.com>

## Other interesting tools
- [jSuites - JavaScript plugins & Webcomponents](https://jsuites.net)
- [LemonadeJS](https://lemonadejs.net)
