![The javascript spreadsheet](https://bossanova.uk/templates/default/img/logo-jexcel.png)

[**jExcel**](https://bossanova.uk/jexcel) jExcel is a lightweight vanilla javascript plugin to create amazing web-based interactive tables and spreadsheets compatible
with Excel or any other spreadsheet software. You can create an online spreadsheet table from a JS array,
JSON, CSV or XSLX files. You can copy from excel and paste straight to your jExcel spreadsheet and vice versa.
It is very easy to integrate any third party javascript plugins to create your own custom columns, custom editors, and customize any
feature into your application. jExcel has plenty of different input options through its native column types to cover the most common web-based application
requirements. It is a complete solution for web data management. Create amazing applications with jExcel javascript spreadsheet.

## Main advantages

- Make rich and user-friendly web interfaces and applications
- You can easily handle complicated data inputs in a way users are used.
- Improve your user software experience
- Create rich CRUDS and beautiful UI
- Compatibility with excel: users can move data around with common copy and paste shortcuts
- Easy customizations with easy third-party plugin integrations
- Lean, fast and simple to use
- Thousands of successfully user cases
- Speed up your work dealing with difficult data entry in a web-based software

## Official Installation

- % npm install jexcel
- [Download ZIP](https://github.com/paulhodel/jexcel/archive/master.zip)

### Basic demo

A basic example to integrate the javascript spreadsheet in your website to create your first online spreadsheet.

```html
<script src="https://bossanova.uk/jexcel/v3/jexcel.js"></script>
<link rel="stylesheet" href="https://bossanova.uk/jexcel/v3/jexcel.css" type="text/css" />
<script src="https://bossanova.uk/jtools/v2/jexcel.js"></script>
<link rel="stylesheet" href="https://bossanova.uk/jtools/v2/jexcel.css" type="text/css" />
```

You should initiate your table based on a div container, such as:
```html
<div id="mytable"></div>
```

To initialize a jExcel table you should run a javascript, such as:
```javascript
data = [
    ['Google', 1998, 807.80],
    ['Apple', 1976, 116.52],
    ['Yahoo', 1994, 38.66],
];

jexcel(document.getElementById('mytable'), {
    data:data,
    colWidths: [ 300, 80, 100 ]
});
```

## Examples

- [Creating a table from an external CSV file](https://bossanova.uk/jexcel/examples/creating-a-table-from-an-external-csv-file)
- [Calendar column type](https://bossanova.uk/jexcel/examples/using-a-calendar-column-type)
- [Sorting by column](https://bossanova.uk/jexcel/examples/reorder)
- [Multiple spreadsheets in the same page](https://bossanova.uk/jexcel/examples/multiple-spreadsheets-in-the-same-page)
- [Integrating a third party plugin into jExcel](https://bossanova.uk/jexcel/examples/integrating-a-third-party-plugin-into-your-spreadsheet)
- [Currency and masking numbers](https://bossanova.uk/jexcel/examples/currency-and-masking-numbers)
- [Working with dropdowns](https://bossanova.uk/jexcel/examples/working-with-dropdowns)
- [Handling events](https://bossanova.uk/jexcel/examples/tracking-changes-on-the-spreadsheet)
- [Including formulas on your spreadsheet](http://www.bossanova.uk/jexcel/examples/including-formulas-on-your-spreadsheet)
- [Remote updates](http://www.bossanova.uk/jexcel/examples/remote-updates)


## History


## jExcel History

jExcel v3 is a complete rebuilt javascript vanilla version. For that reason it was not possible to keep a
complete compatibility with the previous version. If you are upgrating you might need to implement a few updates in your code.
If you have questions, you can review the article upgrating from jExcel v2 or Handsontable.

### Jexcel 3.0.1

The jExcel v3 brings lot of great new features:

- Drag and drop columns
- Resizable rows
- Merge columns
- Search
- Pagination
- Lazy loading
- Full screen flag
- Image upload
- Native color picker
- Better mobile compatibility
- Better nested headers compatibily
- Amazing keyboard navegation support
- Better hidden column management
- Great data picker: dropdown, autocomplete, multiple, group options and icons
- Importing from XSLX (experimental)

Big improviments are included, such as:

- Complete new formula engine with no external depencies with much faster results.
- Absolutely no selectors, means a much faster application
- New native columns
- No jQuery is required
- React, Vue and Angular examples
- XLXS support using a custom sheetjs (Experimental).


### Jexcel 2.1.0

<p>We are glad to bring you the latest jquery plugin version, with the following improvements:</p>

- Mobile touch fixes
- Paste fixes & New CSV parser

### Jexcel 2.0.0

- New radio column
- New dropdown with autocomplete and multiple selection options
- Header/body separation for a better scroll/column resize behavior and compatibility
- Better text-wrap including alt+enter excel compatibility
- New set/get meta information
- New set/get config parameters
- New set/get programmatically cell style
- New set/get cell comments
- New table custom toolbar
- New responsive calendar picker

### Jexcel 1.5.7

- Checkbox column type improvements
- Destroy jquery table updates

### Jexcel 1.5.1

- Spreadsheet data overflow and fixed headers. See an <a href='/jexcel/examples/table-with-fixed-headers'>example</a>
- Navigation improvements


### Jexcel 1.5.0

- Relative insertRow, deleteRow, insertColumn, deleteColumn. See an <a href='/jexcel/examples/working-with-the-data'>example</a>
- Redo, Undo action tracker for insertRow, deleteRow, insertColumn, deleteColumn, moveRow
- New formula column recursive chain
- New alternative design option bootstrap-like. See an <a href='/jexcel/examples/a-custom-table-design'>example</a>
- updateSettings updates


## Official website
- [jExcel v3 - Vanilla Javascript](https://bossanova.uk/jexcel/v3)
- [jExcel v2 - Jquery Plugin](https://bossanova.uk/jexcel/v2)

## Community
- [GitHub](https://github.com/paulhodel/jexcel/issues)

## Copyright and license
jExcel is released under the [MIT license]. Copyrights belong to Paul Hodel <paul.hodel@gmail.com>

## Other tools by the author
- [Jtools Vanilla Web Components](https://bossanova.uk/jtools)