# Jspreadsheet CE v4: The JavaScript spreadsheet 

<b>Jexcel CE</b> has been renamed to <b>Jspreadsheet CE</b><br><br> 

- <b>Important</b>: Please import jspreadsheet.css (jexcel.css is not longer available in this package).

<br>

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

<br>

## Installation

### As node package
`npm install jspreadsheet-ce`

### As standalone library/js plugin
[Download ZIP](https://github.com/jspreadsheet/ce/archive/master.zip)

put and use the files of `dist` folder in your project (js library and css files)

### With a framework

See examples section for code examples of jspreadsheets with popular frameworks
### Basic demo 

A basic example to integrate the JavaScript spreadsheet in your website to create your first online spreadsheet. <https://codepen.io/hchiam/pen/qBRzXKK>


#### Usage 

Add jexcel/jspreadsheet and jsuites to your html file

```html
<script src="https://bossanova.uk/jspreadsheet/v4/jexcel.js"></script>
<script src="https://jsuites.net/v4/jsuites.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v4/jsuites.css" type="text/css" />
<link rel="stylesheet" href="https://bossanova.uk/jspreadsheet/v4/jexcel.css" type="text/css" />
```

You should initialize your table based on a div container, such as:
```html
<div id="spreadsheet"></div>
```

To initialize a Jspreadsheet CE table you should run JavaScript, such as:
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

Serve your html file and then you will get the rendered table in your browser

![sampleTable](./docs/sampleTable.png)

<br>

## Development

See [development](development.md)

<br>

## Examples

- [Basic demo](./basic-demo.html)\
Simple demo (as in codepen)

- [Basic demo for developing](./basic-demo.html)\
Demo using library from `dist` folder, ready to use for development of jspreadsheet

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

- [Javascript calendar](https://bossanova.uk/jspreadsheet/v4/examples/javascript-calendar)\
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

<br>

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
complete compatibility with the previous version. If you are upgrading you might need to implement a few updates in your code.
If you have questions, you can review the article upgrading from Jspreadsheet CE v2 or Handsontable.

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
- Better nested headers compatibility.
- Amazing keyboard navigation support.
- Better hidden column management.
- Great data picker: dropdown, autocomplete, multiple, group options and icons.
- Importing from XLSX (experimental).

Big improvements are included, such as:

- Complete new formula engine with no external dependencies with much faster results.
- Absolutely no selectors, means a much faster application.
- New native columns.
- jQuery is not required anymore.
- React, Vue and Angular examples.
- XLSX support using a custom sheetjs (experimental).


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

<br>

## Official websites
- [Jspreadsheet CE v4 - Javascript Spreadsheet](https://bossanova.uk/jspreadsheet/v4)
- [Jspreadsheet CE v3 - Vanilla JavaScript](https://bossanova.uk/jspreadsheet/v3)
- [Jspreadsheet CE v2 - jQuery Plugin](https://bossanova.uk/jspreadsheet/v2)
- [Jspreadsheet Pro v7 - Javascript Spreadsheet](https://jspreadsheet.com/v7)
- [Jspreadsheet Pro v8 - Javascript Spreadsheet](https://jspreadsheet.com/v8)

<br>

## Community
- [GitHub](https://github.com/jspreadsheet/ce/issues)

<br>

## Contributing

See [contributing](contributing.md)

<br>

## Copyright and license
Jspreadsheet CE is released under the [MIT license]. Contact <contact@jspreadsheet.com>

<br>

## Other tools
- [jSuites - JavaScript plugins & Webcomponents](https://jsuites.net)
- [Jspreadsheet Pro](https://jspreadsheet.com)
- [LemonadeJS Reactive Library](https://lemonadejs.net)

<br>

## jSuites

<h3>Image cropper</h3>

<div>
<h4>Documentation</h4>
<ul>
<li><a href="/v4/image-cropper">Getting started</a></li>
<li><a href="/v4/image-cropper/quick-reference">Quick reference</a></li>
</ul>

<h4>Examples</h4>
<ul>
<li><a href="/v4/image-cropper/rotate-and-zoom">Rotate and zoom</a></li>
<li><a href="/v4/image-cropper/brightness-and-contrast-filters" title='Brightness and contrast'>Brightness and contrast</a></li>
</ul>

<h4>Integrations</h4>
<ul>
<li><a href="/v4/image-cropper/react-component">React integration</a></li>
<li><a href="/v4/image-cropper/image-cropper-vue-example">Vue integration</a></li>
<li><a href="/v4/image-cropper/image-cropper-angular-example">Angular integration</a></li>
</ul>
</div>

<h3>Javascript Template</h3>

<div>
<h4>Documentation</h4>
<ul>
<li><a href="/v4/javascript-template">Getting started</a></li>
<li><a href="/v4/javascript-template/quick-reference">Quick reference</a></li>
</ul>

<h4>Examples</h4>
<ul>
<li><a href="/v4/javascript-template/basic">Basic</a></li>
<li><a href="/v4/javascript-template/pagination-and-searching">Pagination and Searching</a></li>
<li><a href="/v4/javascript-template/methods">Methods</a></li>
<li><a href="/v4/javascript-template/event-handling">Event Handling</a></li>
</ul>
</div>

<h3>JavaScript Organogram</h3>

<div>
<h4>Documentation</h4>
<ul>
<li><a href="/v4/organogram">Getting started</a></li>
<li><a href="/v4/organogram/quick-reference">Quick Reference</a></li>
</ul>

<h4>Examples</h4>
<ul>
<li><a href="/v4/organogram/basic">Basic</a></li>
<li><a href="/v4/organogram/methods">Methods</a></li>
</ul>

<h4>Integrations</h4>
<ul>
<li><a href="/v4/organogram/organogram-with-react">React organogram</a></li>
<li><a href="/v4/organogram/organogram-with-vue">Vue organogram</a></li>
<li><a href="/v4/organogram/organogram-with-angular">Angular organogram</a></li>
</ul>
</div>

<h3>Javascript Heatmap</h3>

<div>
<h4>Documentation</h4>
<ul>
<li><a href="/v4/heatmap">Getting started</a></li>
<li><a href="/v4/heatmap/quick-reference">Quick reference</a></li>
</ul>

<h4>Examples</h4>
<ul>
<li><a href="/v4/heatmap/basic">Basic</a></li>
<li><a href="/v4/heatmap/colors">Colors</a></li>
<li><a href="/v4/heatmap/title-and-tooltip">Title and tooltip</a></li>
</ul>
</div>

<h3>Core features</h3>

<div>
<h4>Core</h4>
<ul>
<li><a href="/v4/core/ajax">Ajax requests</a></li>
<li><a href="/v4/core/animations">Animations</a></li>
<li><a href="/v4/core/javascript-toast">Toast</a></li>
<li><a href="/v4/core/loading-spin">Loading spin</a></li>
<li><a href="/v4/core/js-drag-and-drop">Drag and drop</a></li>
</ul>

<div style='display: none'>
<h4>Helpers</h4>
<ul>
<li><a href="/v4/core/push-to-refresh">Push to refresh</a></li>
<li><a href="/v4/core/scroll">Custom scroll</a></li>
<li><a href="/v4/core/lazy-loading">Generic lazy loading</a></li>
<li><a href="/v4/core/files">File upload</a></li>
</ul>
</div>
</div>

<h3>JavaScript Dropdown</h3>

<div>
<h4>Documentation</h4>
<ul>
<li><a href="/v4/dropdown-and-autocomplete">Getting started</a></li>
<li><a href="/v4/dropdown-and-autocomplete/quick-reference">Quick Reference</a></li>
</ul>

<h4>Examples</h4>
<ul>
<li><a href="/v4/dropdown-and-autocomplete/basic">Basic</a></li>
<li><a href="/v4/dropdown-and-autocomplete/multiple">Multiple options</a></li>
<li><a href="/v4/dropdown-and-autocomplete/large-sample">Large sample</a></li>
<li><a href="/v4/dropdown-and-autocomplete/remote-search">Remote search</a></li>
<li><a href="/v4/dropdown-and-autocomplete/new-options">Add new option</a></li>
<li><a href="/v4/dropdown-and-autocomplete/images">Images</a></li>
<li><a href="/v4/dropdown-and-autocomplete/colors">Colors</a></li>
<li><a href="/v4/dropdown-and-autocomplete/countries">Countries</a></li>
<li><a href="/v4/dropdown-and-autocomplete/grouping-elements">Grouping elements</a></li>
<li><a href="/v4/dropdown-and-autocomplete/events">Events</a></li>
<li><a href="/v4/dropdown-and-autocomplete/methods">Methods</a></li>
<li><a href="/v4/dropdown-and-autocomplete/mobile">Mobile rendering</a></li>
</ul>

<h4>Integrations</h4>
<ul>
<li><a href="/v4/dropdown-and-autocomplete/javascript-dropdown-with-react">React dropdown</a></li>
<li><a href="/v4/dropdown-and-autocomplete/javascript-dropdown-with-vue">Vue dropdown</a></li>
<li><a href="/v4/dropdown-and-autocomplete/javascript-dropdown-with-angular">Angular dropdown</a></li>
</ul>

</div>

<h3>JavaScript Calendar</h3>

<div>
<h4>Documentation</h4>
<ul>
<li><a href="/v4/javascript-calendar">Getting started</a></li>
<li><a href="/v4/javascript-calendar/quick-reference">Quick Reference</a></li>
</ul>

<h4>Examples</h4>
<ul>
<li><a href="/v4/javascript-calendar/basic">Basic</a></li>
<li><a href="/v4/javascript-calendar/time-picker">Time picker</a></li>
<li><a href="/v4/javascript-calendar/year-month">Year and month picker</a></li>
<li><a href="/v4/javascript-calendar/events">Events</a></li>
<li><a href="/v4/javascript-calendar/valid-range">Valid range</a></li>
<li><a href="/v4/javascript-calendar/international">International</a></li>
<li><a href="/v4/javascript-calendar/methods">Methods</a></li>
<li><a href="/v4/javascript-calendar/inline">Inline calendar</a></li>
<li><a href="/v4/javascript-calendar/mobile">Mobile rendering</a></li>
</ul>

<h4>Integrations</h4>
<ul>
<li><a href="/v4/javascript-calendar/javascript-calendar-with-react">React calendar</a></li>
<li><a href="/v4/javascript-calendar/javascript-calendar-with-vue">Vue calendar</a></li>
<li><a href="/v4/javascript-calendar/javascript-calendar-with-angular">Angular calendar</a></li>
</ul>
</div>


<h3>Tags and keywords</h3>

<div>
<h4>Documentation</h4>
<ul>
<li><a href="/v4/javascript-tags">Getting started</a></li>
<li><a href="/v4/javascript-tags/quick-reference">Quick Reference</a></li>
</ul>

<h4>Examples</h4>
<ul>
<li><a href="/v4/javascript-tags/basic">Basic</a></li>
<li><a href="/v4/javascript-tags/remote-search">Suggestions</a></li>
<li><a href="/v4/javascript-tags/events">Events</a></li>
<li><a href="/v4/javascript-tags/validations">Validations</a></li>
</ul>

<h4>Integrations</h4>
<ul>
<li><a href="/v4/javascript-tags/javascript-tags-with-react">React tags</a></li>
<li><a href="/v4/javascript-tags/javascript-tags-with-vue">Vue tags</a></li>
<li><a href="/v4/javascript-tags/javascript-tags-with-angular">Angular tags</a></li>
</ul>
</div>


<h3>JavaScript tabs plugin</h3>

<div>
<h4>Documentation</h4>
<ul>
<li><a href="/v4/javascript-tabs">Getting started</a></li>
<li><a href="/v4/javascript-tabs/quick-reference">Quick Reference</a></li>
</ul>

<h4>Examples</h4>
<ul>
<li><a href="/v4/javascript-tabs/basic">Basic</a></li>
<li><a href="/v4/javascript-tabs/style">Style</a></li>
<li><a href="/v4/javascript-tabs/icons">Headers with icons</a></li>
<li><a href="/v4/javascript-tabs/remote">Remote content</a></li>
<li><a href="/v4/javascript-tabs/events">Events</a></li>
<li><a href="/v4/javascript-tabs/methods">Methods</a></li>
</ul>
</div>

<h3>Color picker plugin</h3>

<div>
<h4>Documentation</h4>
<ul>
<li><a href="/v4/color-picker">Getting started</a></li>
<li><a href="/v4/color-picker/quick-reference">Quick Reference</a></li>
</ul>

<h4>Examples</h4>
<ul>
<li><a href="/v4/color-picker/basic">Basic</a></li>
<li><a href="/v4/color-picker/events">Events</a></li>
<li><a href="/v4/color-picker/custom-colors">Custom colors</a></li>
<li><a href="/v4/color-picker/color-palettes">Palettes</a></li>
<li><a href="/v4/color-picker/mobile">Responsive</a></li>
</ul>

<h4>Examples</h4>
<ul>
<li><a href="/v4/color-picker/javascript-color-picker-with-react">React color picker</a></li>
<li><a href="/v4/color-picker/javascript-color-picker-with-vue">Vue color picker</a></li>
<li><a href="/v4/color-picker/javascript-color-picker-with-angular">Angular color picker</a></li>
</ul>
</div>

<h3>Context menu plugin</h3>

<div>
<h4>Documentation</h4>
<ul>
<li><a href="/v4/contextmenu">Getting started</a></li>
<li><a href="/v4/contextmenu/quick-reference">Quick Reference</a></li>
</ul>

<h4>Examples</h4>
<ul>
<li><a href="/v4/contextmenu/basic">Basic</a></li>
<li><a href="/v4/contextmenu/vanilla">Vanilla example</a></li>
<li><a href="/v4/contextmenu/icons">Icons</a></li>
<li><a href="/v4/contextmenu/submenu">Submenu</a></li>
</ul>
</div>

<h3>Input mask plugin</h3>

<div>
<h4>Documentation</h4>
<ul>
<li><a href="/v4/javascript-mask">Getting started</a></li>
<li><a href="/v4/javascript-mask/quick-reference">Quick reference</a></li>
</ul>

<h4>Examples</h4>
<ul>
<li><a href="/v4/javascript-mask/basic">Basic</a></li>
<li><a href="/v4/javascript-mask/events">Events</a></li>
<li><a href="/v4/javascript-mask/programmatically-updates">Programmatically updates</a></li>
</ul>
</div>

<h3>JavaScript Modal</h3>

<div>
<h4>Documentation</h4>
<ul>
<li><a href="/v4/modal">Getting started</a></li>
<li><a href="/v4/modal/quick-reference">Quick reference</a></li>
</ul>

<h4>Examples</h4>
<ul>
<li><a href="/v4/modal/basic">Basic</a></li>
<li><a href="/v4/modal/events">Events</a></li>
<li><a href="/v4/modal/javascript-modal-with-react">React modal</a></li>
</ul>
</div>

<h3>Rich HTML Forms</h3>

<div>
<h4>Documentation</h4>
<ul>
<li><a href="/v4/rich-form">Getting started</a></li>
<li><a href="/v4/rich-form/quick-reference">Quick reference</a></li>
</ul>

<h4>Examples</h4>
<ul>
<li><a href="/v4/rich-form/tracking-for-form-changes">Tracking changes</a></li>
<li><a href="/v4/rich-form/methods">Updates</a></li>
<li><a href="/v4/rich-form/validations">Validations</a></li>
</ul>
</div>

<h3>JavaScript rating plugin</h3>

<div>
<h4>Documentation</h4>
<ul>
<li><a href="/v4/rating">Getting started</a></li>
<li><a href="/v4/rating/quick-reference">Quick reference</a></li>
</ul>

<h4>Examples</h4>
<ul>
<li><a href="/v4/rating/events">Events</a></li>
</ul>

<h4>Integrations</h4>
<ul>
<li><a href="/v4/rating/javascript-rating-with-react">React Rating</a></li>
<li><a href="/v4/rating/javascript-rating-with-vue">Vue Rating</a></li>
<li><a href="/v4/rating/javascript-rating-with-angular">Angular Rating</a></li>
</ul>
</div>

<h3>JavaScript toolbar</h3>

<div>
<h4>Documentation</h4>
<ul>
<li><a href="/v4/toolbar">Getting started</a></li>
<li><a href="/v4/toolbar/quick-reference">Quick reference</a></li>
</ul>

<h4>Examples</h4>
<ul>
<li><a href="/v4/toolbar/fontawsome">Fontawsome</a></li>
<li><a href="/v4/toolbar/custom-icons">Custom icons</a></li>
</ul>
</div>

<h3>Text editor plugin</h3>

<div>
<h4>Documentation</h4>
<ul>
<li><a href="/v4/text-editor">Getting started</a></li>
<li><a href="/v4/text-editor/quick-reference">Quick reference</a></li>
</ul>

<h4>Examples</h4>
<ul>
<li><a href="/v4/text-editor/basic">Basic</a></li>
<li><a href="/v4/text-editor/custom-toolbar">Custom toolbar</a></li>
<li><a href="/v4/text-editor/dropping-zone">Dropping zone</a></li>
<li><a href="/v4/text-editor/website-snippet">URL Snippets</a></li>
</ul>
</div>

<h3>Picker plugin</h3>

<div>
<h4>Documentation</h4>
<ul>
<li><a href="/v4/picker">Getting started</a></li>
<li><a href="/v4/picker/quick-reference">Quick reference</a></li>
</ul>

<h4>Examples</h4>
<ul>
<li><a href="/v4/picker/basic">Basic</a></li>
<li><a href="/v4/picker/stylize-options">Stylize options</a></li>
<li><a href="/v4/picker/static-front">Static front</a></li>
<li><a href="/v4/picker/handle-changes">Handle changes</a></li>
</ul>

<h4>Integrations</h4>
<ul>
<li><a href="/v4/picker/picker-with-react">React Picker</a></li>
<li><a href="/v4/picker/picker-with-vue">Vue Picker</a></li>
<li><a href="/v4/picker/picker-with-angular">Angular Picker</a></li>
</ul>
</div>

<h3>Image slider plugin</h3>

<div>
<h4>Documentation</h4>
<ul>
<li><a href="/v4/image-slider">Getting started</a></li>
<li><a href="/v4/image-slider/quick-reference">Quick reference</a></li>
</ul>

<h4>Examples</h4>
<ul>
<li><a href="/v4/image-slider/basic">Basic</a></li>
</ul>
</div>

<h3>All Components</h3>

<div>
<h4>Core</h4>
<ul>
<li><a href="/v4/core/ajax">Ajax requests</a></li>
<li><a href="/v4/core/animations">Animations</a></li>
<li><a href="/v4/core/javascript-toast">Toast</a></li>
<li><a href="/v4/core/loading-spin">Loading spin</a></li>
<li><a href="/v4/core/js-drag-and-drop">Drag and drop</a></li>
</ul>

<h4>Extensions</h4>
<ul>
<li><a href="/v4/image-cropper">Cropper</a></li>
<li><a href="/v4/javascript-template">Template</a></li>
<li><a href="/v4/organogram">Organogram</a></li>
<li><a href="/v4/heatmap">Heatmap</a></li>
</ul>

<h4>Components</h4>
<ul>
<li><a href="/v4/javascript-calendar">Calendar</a></li>
<li><a href="/v4/color-picker">Color picker</a></li>
<li><a href="/v4/contextmenu">Context menu</a></li>
<li><a href="/v4/dropdown-and-autocomplete">Dropdown</a></li>
<li><a href="/v4/javascript-mask">Mask</a></li>
<li><a href="/v4/modal">Modal</a></li>
<li><a href="/v4/picker">Picker</a></li>
<li><a href="/v4/rating">Rating</a></li>
<li><a href="/v4/rich-form">Rich forms</a></li>
<li><a href="/v4/text-editor">Richtext</a></li>
<li><a href="/v4/image-slider">Slider</a></li>
<li><a href="/v4/javascript-tags">Tags</a></li>
<li><a href="/v4/javascript-tabs">Tabs</a></li>
<li><a href="/v4/toolbar">Toolbars</a></li>
</ul>
</div>
