![jExcel | The javascript spreadsheet](https://bossanova.uk/templates/default/img/logo-jexcel.png)

[**jExcel**](http://bossanova.uk/jexcel) is is a very light jquery plugin to embed a spreadsheet, compatible with Excel, in your browser. You can load data straight to a jExcel table from a JS array, json or even a CSV file. You can copy and paste from or to Excel straight to a jExcel table. You can easily integrate jExcel with other third party jquery plugin to create your own custom columns, custom editors, and much more. jExcel has a plenty of nice features such as key-value dropdown, CSV loading/exporting, multiple spreadsheets and much more. We have a large roadmap ahead and we are constantly improving, so don't forget to send us your ideas.

## Main advantages

- Make rich web applications
- Improve your clients software experience
- Better CRUDS and beautiful UI
- Compatibility with excel, just copy and paste
- Powerful customizations

## Official Installation

- [Download ZIP](https://github.com/paulhodel/jexcel/archive/master.zip)

### Basic demo

It is very easy to use jExcel, first you should make you have include the jquery core and jexcel JS and CSS style.

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>

<script src="https://cdnjs.cloudflare.com/ajax/libs/jexcel/1.5.7/js/jquery.jexcel.js"></script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jexcel/1.5.7/css/jquery.jexcel.css" type="text/css" />
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

$('#mytable').jexcel({ data:data, colWidths: [ 300, 80, 100 ] });
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

## Official website
- [jExcel Official](https://bossanova.uk/jexcel)

## Screenshot
<p align="center">
<img src="https://bossanova.uk/templates/default/img/jexcel.gif" align="center" alt="jExcel | The javascript spreadsheet | jquery plugin"/>
</p>

## Community
- [GitHub](https://github.com/paulhodel/jexcel/issues)

## Limitations and roadmap
We are working hard to create a better plugin, but jExcel is under development. We would love to hear your ideas to make a better plugin. We are glad to say new features are coming every day, and we are currently working in features such as:

- Merged cells
- Multiple tabs
- Drag columns
- Big data (partial table loading)
- Pagination
- Online work collaboration

More suggestions are welcome. Please send your comments in our Github page.

## Copyright and license
jExcel is released under the [MIT license]. Copyrights belong to Paul Hodel <paul.hodel@gmail.com>
