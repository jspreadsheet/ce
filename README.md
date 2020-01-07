![The JavaScript spreadsheet](https://bossanova.uk/templates/default/img/logo-jexcel.png)

[**jExcel CE**](https://bossanova.uk/jexcel/v3/) is a lightweight Vanilla JavaScript plugin to create amazing web-based interactive HTML tables and spreadsheets compatible
with Excel or any other spreadsheet software. You can create an online spreadsheet table from a JS array,
JSON, CSV or XSLX files. You can copy from excel and paste straight to your jExcel CE spreadsheet and vice versa.
It is very easy to integrate any third party JavaScript plugins to create your own custom columns, custom editors, and customize any
feature into your application. jExcel CE has plenty of different input options through its native column types to cover the most common web-based application
requirements. It is a complete solution for web data management. Create amazing applications with jExcel CE JavaScript spreadsheet.

## Main advantages

- Make rich and user-friendly web interfaces and applications.
- You can easily handle complicated data inputs in a way users are used..
- Improve your user software experience.
- Create rich CRUDS and beautiful UI.
- Compatibility with excel: users can move data around with common copy and paste shortcuts.
- Easy customizations with easy third-party plugin integrations.
- Lean, fast and simple to use.
- Thousands of successfully user cases.
- Speed up your work dealing with difficult data entry in a web-based software.


## Screenshot

![The JavaScript spreadsheet](https://bossanova.uk/templates/default/img/jexcel.gif)


## Installation

% npm install jexcel

[Download ZIP](https://github.com/paulhodel/jexcel/archive/master.zip)

### Basic demo

A basic example to integrate the JavaScript spreadsheet in your website to create your first online spreadsheet.

```html
<script src="https://bossanova.uk/jexcel/v3/jexcel.js"></script>
<script src="https://bossanova.uk/jsuites/v2/jsuites.js"></script>
<link rel="stylesheet" href="https://bossanova.uk/jsuites/v2/jsuites.css" type="text/css" />
<link rel="stylesheet" href="https://bossanova.uk/jexcel/v3/jexcel.css" type="text/css" />
```

You should initiate your table based on a div container, such as:
```html
<div id="mytable"></div>
```

To initialize a jExcel CE table you should run a JavaScript, such as:
```javascript
var data = [
    ['Jazz', 'Honda', '2019-02-12', '', true, '$ 2.000,00', '#777700'],
    ['Civic', 'Honda', '2018-07-11', '', true, '$ 4.000,01', '#007777'],
];

jexcel(document.getElementById('spreadsheet'), {
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

- [React Implementation](https://bossanova.uk/jexcel/v3/examples/react)\
A full example on how to integrate jExcel CE with React.

- [VUE Implementation](https://bossanova.uk/jexcel/v3/examples/vue)\
A full example on how to integrate jExcel CE with Vue.

- [Search and pagination](https://bossanova.uk/jexcel/v3/examples/datatables)\
Full spreadsheet example with search and pagination to bring great compatibility for those who love datatables.

- [Column types](https://bossanova.uk/jexcel/v3/examples/column-types)\
Learn more about the powerful column types. This example brings all native column types and how to create your own custom type.

- [Javascript dropdown](https://bossanova.uk/jexcel/v3/examples/dropdown-and-autocomplete)\
Full examples on how to handle simple, advanced, multiple, autocomplete and conditional dropdowns. Create amazing JavaScript tables using categories and images in your dropdowns.

- [Javascript calendar, date and datetime picker](https://bossanova.uk/jexcel/v3/examples/javascript-calendar)\
Example from basic to advanced calendar usage, date and datetime picker.

- [Image upload](https://bossanova.uk/jexcel/v3/examples/image-upload)\
This examples shows how to upload images to your spreadsheet.

- [Programmatically updates](https://bossanova.uk/jexcel/v3/examples/programmatically-updates)\
How to update your spreadsheet and its data by JavaScript.

- [Table Style](https://bossanova.uk/jexcel/v3/examples/table-style)\
Bring a very special touch to your applications customizing your JavaScript spreadsheet.

- [Events](https://bossanova.uk/jexcel/v3/examples/events)\
Learn how to handle events on jExcel CE.

- [Importing data](https://bossanova.uk/jexcel/v3/examples/import-data)\
How to import data from an external CSV, json file or XLSX.

- [Formulas](https://bossanova.uk/jexcel/v3/examples/spreadsheet-formulas)\
Unleash the power of your tables bringing formulas and custom JavaScript methods on your jExcel spreadsheet.

- [Custom toolbars](https://bossanova.uk/jexcel/v3/examples/spreadsheet-toolbars)\
Full example on how to enable nor customize your JavaScript spreadsheet toolbar.

- [Column comments](https://bossanova.uk/jexcel/v3/examples/comments)\
Allow comments in your table spreadsheet.

- [Headers](https://bossanova.uk/jexcel/v3/examples/headers)\
Enabled nested headers in your spreadsheet and learn how to set or get header values.

- [Translations](https://bossanova.uk/jexcel/v3/examples/translations)\
How to translate the default messages from jExcel.

- [Merged cells](https://bossanova.uk/jexcel/v3/examples/merged-cells)\
Full example on how to handle merge cells in your JavaScript tables.

- [Sorting columns](https://bossanova.uk/jexcel/v3/examples/sorting)\
Example how to sort the table by a column via JavaScript.

- [Lazy loading](https://bossanova.uk/jexcel/v3/examples/lazy-loading)\
This example brings a very nice feature to deal with large table datasets.



## jExcel CE History

jExcel CE v3 is a complete rebuilt JavaScript Vanilla version. For that reason it was not possible to keep a
complete compatibility with the previous version. If you are upgrating you might need to implement a few updates in your code.
If you have questions, you can review the article upgrating from jExcel CE v2 or Handsontable.

### Jexcel CE 3.0.1

The jExcel CE v3 brings lot of great new features:

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


### Jexcel CE 2.1.0

We are glad to bring you the latest jQuery plugin version, with the following improvements:

- Mobile touch fixes.
- Paste fixes & New CSV parser.

### Jexcel CE 2.0.0

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

### Jexcel CE 1.5.7

- Checkbox column type improvements.
- Destroy jQuery table updates.

### Jexcel CE 1.5.1

- Spreadsheet data overflow and fixed headers. See an <a href='/jexcel/examples/table-with-fixed-headers'>example</a>.
- Navigation improvements.


### Jexcel CE 1.5.0

- Relative insertRow, deleteRow, insertColumn, deleteColumn. See an <a href='/jexcel/examples/working-with-the-data'>example</a>.
- Redo, Undo action tracker for insertRow, deleteRow, insertColumn, deleteColumn, moveRow.
- New formula column recursive chain.
- New alternative design option bootstrap-like. See an <a href='/jexcel/examples/a-custom-table-design'>example</a>.
- `updateSettings` updates.


## Officials websites
- [jExcel CE v3 - Vanilla JavaScript](https://bossanova.uk/jexcel/v3)
- [jExcel CE v2 - jQuery Plugin](https://bossanova.uk/jexcel/v2)

## Community
- [GitHub](https://github.com/paulhodel/jexcel/issues)

## Compilation

To create a new distribution based on the source.

docker-compose up
docker-compose exec bash php

% cd /bitnami/php-fpm/src
% php compile.php


## Copyright and license
jExcel CE is released under the [MIT license]. Copyrights belong to Paul Hodel <paul.hodel@gmail.com>

## Other tools by the author
- [jSuites JavaScriptWeb Components](https://bossanova.uk/jsuites)
