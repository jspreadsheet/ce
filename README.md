# Jspreadsheet CE v4: The JavaScript spreadsheet

<b>Jexcel CE</b> has been renamed to <b>Jspreadsheet CE</b><br><br>

<br>

[**Jspreadsheet CE**](https://bossanova.uk/jspreadsheet/v4/) is a lightweight Vanilla JavaScript <b>data grid</b> plugin to create amazing web-based interactive HTML tables, and spreadsheets compatible data grid with other spreadsheet software. You can create an online spreadsheet table from a JS array,
JSON, CSV or XSLX files. You can copy from excel and paste straight to your Jspreadsheet CE spreadsheet and vice versa.
It is very easy to integrate any third party JavaScript plugins to create your own custom columns, custom editors, and customize any
feature into your application. Jspreadsheet CE has plenty of different input options through its native column types to cover the most common web-based application
requirements. It is a complete solution for web data management. Create amazing applications with Jspreadsheet CE JavaScript spreadsheet.

### Jspreadsheet Pro - Enterprise Solution
- [Jspreadsheet Pro](https://jspreadsheet.com/)

<br>

## Main advantages

- Make rich and user-friendly data grid interfaces with excel controls.
- You can easily handle complicated data inputs in a way users are used.
- Improve your user software experience.
- Create rich CRUDS and beautiful UI.
- Compatibility with excel: users can move data around with common copy and paste shortcuts.
- Easy customizations with easy third-party plugin integrations.
- Lean, fast and simple to use.
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

A basic example to integrate the Jspreadsheet in your website to create your first rich data grid. <https://codepen.io/hchiam/pen/qBRzXKK>


#### Usage

Add jexcel/jspreadsheet and jsuites to your html file

```html
<script src="https://bossanova.uk/jspreadsheet/v4/jexcel.js"></script>
<script src="https://jsuites.net/docs/v4/jsuites.js"></script>
<link rel="stylesheet" href="https://jsuites.net/docs/v4/jsuites.css" type="text/css" />
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

### Build your package
% npm run build

### Start a web service
% npm run start

<br>

## Data grid examples

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

### Jspreadsheet CE 4.2.0

- Paste on larger and proportional areas
- New webpack development ENV.
- npm run test

### Jspreadsheet CE 4.13.0

- FormulaJS integration
- Webpack integration

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
- [Jspreadsheet Pro v10 - Javascript Spreadsheet](https://jspreadsheet.com/v10)
- [Jspreadsheet Pro v9 - Javascript Spreadsheet](https://jspreadsheet.com/v9)
- [Jspreadsheet Pro v8 - Javascript Spreadsheet](https://jspreadsheet.com/v8)
- [Jspreadsheet Pro v7 - Javascript Spreadsheet](https://jspreadsheet.com/v7)
<br>

## Community
- [GitHub](https://github.com/jspreadsheet/ce/issues)

<br>

## Contributing

See [contributing](contributing.md)

<br>

## Copyright and license
Jspreadsheet CE is released under the [MIT license]. Contact contact@jspreadsheet.com

<br>

## Other tools
- [LemonadeJS v1 Reactive Library](https://lemonadejs.net/v1/)
- [LemonadeJS v2 Reactive Library](https://lemonadejs.net/v2/)
- [LemonadeJS v3 Reactive Library](https://lemonadejs.net/v3/)

<br>

## jSuites

### Image cropper

#### Documentation

*   [Getting started](https://jsuites.net/docs/v4/image-cropper)
*   [Quick reference](https://jsuites.net/docs/v4/image-cropper/quick-reference)

#### Examples

*   [Rotate and zoom](https://jsuites.net/docs/v4/image-cropper/rotate-and-zoom)
*   [Brightness and contrast](https://jsuites.net/docs/v4/image-cropper/brightness-and-contrast-filters "Brightness and contrast")

#### Integrations

*   [React integration](https://jsuites.net/docs/v4/image-cropper/react-component)
*   [Vue integration](https://jsuites.net/docs/v4/image-cropper/image-cropper-vue-example)
*   [Angular integration](https://jsuites.net/docs/v4/image-cropper/image-cropper-angular-example)

### Javascript Template

#### Documentation

*   [Getting started](https://jsuites.net/docs/v4/javascript-template)
*   [Quick reference](https://jsuites.net/docs/v4/javascript-template/quick-reference)

#### Examples

*   [Basic](https://jsuites.net/docs/v4/javascript-template/basic)
*   [Pagination and Searching](https://jsuites.net/docs/v4/javascript-template/pagination-and-searching)
*   [Methods](https://jsuites.net/docs/v4/javascript-template/methods)
*   [Event Handling](https://jsuites.net/docs/v4/javascript-template/event-handling)

### JavaScript Organogram

#### Documentation

*   [Getting started](https://jsuites.net/docs/v4/organogram)
*   [Quick Reference](https://jsuites.net/docs/v4/organogram/quick-reference)

#### Examples

*   [Basic](https://jsuites.net/docs/v4/organogram/basic)
*   [Methods](https://jsuites.net/docs/v4/organogram/methods)

#### Integrations

*   [React organogram](https://jsuites.net/docs/v4/organogram/organogram-with-react)
*   [Vue organogram](https://jsuites.net/docs/v4/organogram/organogram-with-vue)
*   [Angular organogram](https://jsuites.net/docs/v4/organogram/organogram-with-angular)

### Javascript Heatmap

#### Documentation

*   [Getting started](https://jsuites.net/docs/v4/heatmap)
*   [Quick reference](https://jsuites.net/docs/v4/heatmap/quick-reference)

#### Examples

*   [Basic](https://jsuites.net/docs/v4/heatmap/basic)
*   [Colors](https://jsuites.net/docs/v4/heatmap/colors)
*   [Title and tooltip](https://jsuites.net/docs/v4/heatmap/title-and-tooltip)

### Core features

#### Core

*   [Ajax requests](https://jsuites.net/docs/v4/core/ajax)
*   [Animations](https://jsuites.net/docs/v4/core/animations)
*   [Toast](https://jsuites.net/docs/v4/core/javascript-toast)
*   [Loading spin](https://jsuites.net/docs/v4/core/loading-spin)
*   [Drag and drop](https://jsuites.net/docs/v4/core/js-drag-and-drop)

#### Helpers

*   [Push to refresh](https://jsuites.net/docs/v4/core/push-to-refresh)
*   [Custom scroll](https://jsuites.net/docs/v4/core/scroll)
*   [Generic lazy loading](https://jsuites.net/docs/v4/core/lazy-loading)
*   [File upload](https://jsuites.net/docs/v4/core/files)

### JavaScript Dropdown

#### Documentation

*   [Getting started](https://jsuites.net/docs/v4/dropdown-and-autocomplete)
*   [Quick Reference](https://jsuites.net/docs/v4/dropdown-and-autocomplete/quick-reference)

#### Examples

*   [Basic](https://jsuites.net/docs/v4/dropdown-and-autocomplete/basic)
*   [Multiple options](https://jsuites.net/docs/v4/dropdown-and-autocomplete/multiple)
*   [Large sample](https://jsuites.net/docs/v4/dropdown-and-autocomplete/large-sample)
*   [Remote search](https://jsuites.net/docs/v4/dropdown-and-autocomplete/remote-search)
*   [Add new option](https://jsuites.net/docs/v4/dropdown-and-autocomplete/new-options)
*   [Images](https://jsuites.net/docs/v4/dropdown-and-autocomplete/images)
*   [Colors](https://jsuites.net/docs/v4/dropdown-and-autocomplete/colors)
*   [Countries](https://jsuites.net/docs/v4/dropdown-and-autocomplete/countries)
*   [Grouping elements](https://jsuites.net/docs/v4/dropdown-and-autocomplete/grouping-elements)
*   [Events](https://jsuites.net/docs/v4/dropdown-and-autocomplete/events)
*   [Methods](https://jsuites.net/docs/v4/dropdown-and-autocomplete/methods)
*   [Mobile rendering](https://jsuites.net/docs/v4/dropdown-and-autocomplete/mobile)

#### Integrations

*   [React dropdown](https://jsuites.net/docs/v4/dropdown-and-autocomplete/javascript-dropdown-with-react)
*   [Vue dropdown](https://jsuites.net/docs/v4/dropdown-and-autocomplete/javascript-dropdown-with-vue)
*   [Angular dropdown](https://jsuites.net/docs/v4/dropdown-and-autocomplete/javascript-dropdown-with-angular)

### JavaScript Calendar

#### Documentation

*   [Getting started](https://jsuites.net/docs/v4/javascript-calendar)
*   [Quick Reference](https://jsuites.net/docs/v4/javascript-calendar/quick-reference)

#### Examples

*   [Basic](https://jsuites.net/docs/v4/javascript-calendar/basic)
*   [Time picker](https://jsuites.net/docs/v4/javascript-calendar/time-picker)
*   [Year and month picker](https://jsuites.net/docs/v4/javascript-calendar/year-month)
*   [Events](https://jsuites.net/docs/v4/javascript-calendar/events)
*   [Valid range](https://jsuites.net/docs/v4/javascript-calendar/valid-range)
*   [International](https://jsuites.net/docs/v4/javascript-calendar/international)
*   [Methods](https://jsuites.net/docs/v4/javascript-calendar/methods)
*   [Inline calendar](https://jsuites.net/docs/v4/javascript-calendar/inline)
*   [Mobile rendering](https://jsuites.net/docs/v4/javascript-calendar/mobile)

#### Integrations

*   [React calendar](https://jsuites.net/docs/v4/javascript-calendar/javascript-calendar-with-react)
*   [Vue calendar](https://jsuites.net/docs/v4/javascript-calendar/javascript-calendar-with-vue)
*   [Angular calendar](https://jsuites.net/docs/v4/javascript-calendar/javascript-calendar-with-angular)

### Tags and keywords

#### Documentation

*   [Getting started](https://jsuites.net/docs/v4/javascript-tags)
*   [Quick Reference](https://jsuites.net/docs/v4/javascript-tags/quick-reference)

#### Examples

*   [Basic](https://jsuites.net/docs/v4/javascript-tags/basic)
*   [Suggestions](https://jsuites.net/docs/v4/javascript-tags/remote-search)
*   [Events](https://jsuites.net/docs/v4/javascript-tags/events)
*   [Validations](https://jsuites.net/docs/v4/javascript-tags/validations)

#### Integrations

*   [React tags](https://jsuites.net/docs/v4/javascript-tags/javascript-tags-with-react)
*   [Vue tags](https://jsuites.net/docs/v4/javascript-tags/javascript-tags-with-vue)
*   [Angular tags](https://jsuites.net/docs/v4/javascript-tags/javascript-tags-with-angular)

### JavaScript tabs plugin

#### Documentation

*   [Getting started](https://jsuites.net/docs/v4/javascript-tabs)
*   [Quick Reference](https://jsuites.net/docs/v4/javascript-tabs/quick-reference)

#### Examples

*   [Basic](https://jsuites.net/docs/v4/javascript-tabs/basic)
*   [Style](https://jsuites.net/docs/v4/javascript-tabs/style)
*   [Headers with icons](https://jsuites.net/docs/v4/javascript-tabs/icons)
*   [Remote content](https://jsuites.net/docs/v4/javascript-tabs/remote)
*   [Events](https://jsuites.net/docs/v4/javascript-tabs/events)
*   [Methods](https://jsuites.net/docs/v4/javascript-tabs/methods)

### Color picker plugin

#### Documentation

*   [Getting started](https://jsuites.net/docs/v4/color-picker)
*   [Quick Reference](https://jsuites.net/docs/v4/color-picker/quick-reference)

#### Examples

*   [Basic](https://jsuites.net/docs/v4/color-picker/basic)
*   [Events](https://jsuites.net/docs/v4/color-picker/events)
*   [Custom colors](https://jsuites.net/docs/v4/color-picker/custom-colors)
*   [Palettes](https://jsuites.net/docs/v4/color-picker/color-palettes)
*   [Responsive](https://jsuites.net/docs/v4/color-picker/mobile)

#### Examples

*   [React color picker](https://jsuites.net/docs/v4/color-picker/javascript-color-picker-with-react)
*   [Vue color picker](https://jsuites.net/docs/v4/color-picker/javascript-color-picker-with-vue)
*   [Angular color picker](https://jsuites.net/docs/v4/color-picker/javascript-color-picker-with-angular)

### Context menu plugin

#### Documentation

*   [Getting started](https://jsuites.net/docs/v4/contextmenu)
*   [Quick Reference](https://jsuites.net/docs/v4/contextmenu/quick-reference)

#### Examples

*   [Basic](https://jsuites.net/docs/v4/contextmenu/basic)
*   [Vanilla example](https://jsuites.net/docs/v4/contextmenu/vanilla)
*   [Icons](https://jsuites.net/docs/v4/contextmenu/icons)
*   [Submenu](https://jsuites.net/docs/v4/contextmenu/submenu)

### Input mask plugin

#### Documentation

*   [Getting started](https://jsuites.net/docs/v4/javascript-mask)
*   [Quick reference](https://jsuites.net/docs/v4/javascript-mask/quick-reference)

#### Examples

*   [Basic](https://jsuites.net/docs/v4/javascript-mask/basic)
*   [Events](https://jsuites.net/docs/v4/javascript-mask/events)
*   [Programmatically updates](https://jsuites.net/docs/v4/javascript-mask/programmatically-updates)

### JavaScript Modal

#### Documentation

*   [Getting started](https://jsuites.net/docs/v4/modal)
*   [Quick reference](https://jsuites.net/docs/v4/modal/quick-reference)

#### Examples

*   [Basic](https://jsuites.net/docs/v4/modal/basic)
*   [Events](https://jsuites.net/docs/v4/modal/events)
*   [React modal](https://jsuites.net/docs/v4/modal/javascript-modal-with-react)

### Rich HTML Forms

#### Documentation

*   [Getting started](https://jsuites.net/docs/v4/rich-form)
*   [Quick reference](https://jsuites.net/docs/v4/rich-form/quick-reference)

#### Examples

*   [Tracking changes](https://jsuites.net/docs/v4/rich-form/tracking-for-form-changes)
*   [Updates](https://jsuites.net/docs/v4/rich-form/methods)
*   [Validations](https://jsuites.net/docs/v4/rich-form/validations)

### JavaScript rating plugin

#### Documentation

*   [Getting started](https://jsuites.net/docs/v4/rating)
*   [Quick reference](https://jsuites.net/docs/v4/rating/quick-reference)

#### Examples

*   [Events](https://jsuites.net/docs/v4/rating/events)

#### Integrations

*   [React Rating](https://jsuites.net/docs/v4/rating/javascript-rating-with-react)
*   [Vue Rating](https://jsuites.net/docs/v4/rating/javascript-rating-with-vue)
*   [Angular Rating](https://jsuites.net/docs/v4/rating/javascript-rating-with-angular)

### JavaScript toolbar

#### Documentation

*   [Getting started](https://jsuites.net/docs/v4/toolbar)
*   [Quick reference](https://jsuites.net/docs/v4/toolbar/quick-reference)

#### Examples

*   [Fontawsome](https://jsuites.net/docs/v4/toolbar/fontawsome)
*   [Custom icons](https://jsuites.net/docs/v4/toolbar/custom-icons)

### Text editor plugin

#### Documentation

*   [Getting started](https://jsuites.net/docs/v4/text-editor)
*   [Quick reference](https://jsuites.net/docs/v4/text-editor/quick-reference)

#### Examples

*   [Basic](https://jsuites.net/docs/v4/text-editor/basic)
*   [Custom toolbar](https://jsuites.net/docs/v4/text-editor/custom-toolbar)
*   [Dropping zone](https://jsuites.net/docs/v4/text-editor/dropping-zone)
*   [URL Snippets](https://jsuites.net/docs/v4/text-editor/website-snippet)

### Picker plugin

#### Documentation

*   [Getting started](https://jsuites.net/docs/v4/picker)
*   [Quick reference](https://jsuites.net/docs/v4/picker/quick-reference)

#### Examples

*   [Basic](https://jsuites.net/docs/v4/picker/basic)
*   [Stylize options](https://jsuites.net/docs/v4/picker/stylize-options)
*   [Static front](https://jsuites.net/docs/v4/picker/static-front)
*   [Handle changes](https://jsuites.net/docs/v4/picker/handle-changes)

#### Integrations

*   [React Picker](https://jsuites.net/docs/v4/picker/picker-with-react)
*   [Vue Picker](https://jsuites.net/docs/v4/picker/picker-with-vue)
*   [Angular Picker](https://jsuites.net/docs/v4/picker/picker-with-angular)

### Image slider plugin

#### Documentation

*   [Getting started](https://jsuites.net/docs/v4/image-slider)
*   [Quick reference](https://jsuites.net/docs/v4/image-slider/quick-reference)

#### Examples

*   [Basic](https://jsuites.net/docs/v4/image-slider/basic)

### All Components

#### Core

*   [Ajax requests](https://jsuites.net/docs/v4/core/ajax)
*   [Animations](https://jsuites.net/docs/v4/core/animations)
*   [Toast](https://jsuites.net/docs/v4/core/javascript-toast)
*   [Loading spin](https://jsuites.net/docs/v4/core/loading-spin)
*   [Drag and drop](https://jsuites.net/docs/v4/core/js-drag-and-drop)

#### Extensions

*   [Cropper](https://jsuites.net/docs/v4/image-cropper)
*   [Template](https://jsuites.net/docs/v4/javascript-template)
*   [Organogram](https://jsuites.net/docs/v4/organogram)
*   [Heatmap](https://jsuites.net/docs/v4/heatmap)

#### Components

*   [Calendar](https://jsuites.net/docs/v4/javascript-calendar)
*   [Color picker](https://jsuites.net/docs/v4/color-picker)
*   [Context menu](https://jsuites.net/docs/v4/contextmenu)
*   [Dropdown](https://jsuites.net/docs/v4/dropdown-and-autocomplete)
*   [Mask](https://jsuites.net/docs/v4/javascript-mask)
*   [Modal](https://jsuites.net/docs/v4/modal)
*   [Picker](https://jsuites.net/docs/v4/picker)
*   [Rating](https://jsuites.net/docs/v4/rating)
*   [Rich forms](https://jsuites.net/docs/v4/rich-form)
*   [Richtext](https://jsuites.net/docs/v4/text-editor)
*   [Slider](https://jsuites.net/docs/v4/image-slider)
*   [Tags](https://jsuites.net/docs/v4/javascript-tags)
*   [Tabs](https://jsuites.net/docs/v4/javascript-tabs)
*   [Toolbars](https://jsuites.net/docs/v4/toolbar)
