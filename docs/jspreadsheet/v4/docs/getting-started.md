title: Getting Started with Jspreadsheet CE Version 4
keywords: Jspreadsheet CE, Jexcel, JavaScript Data Grid, Spreadsheets, JavaScript tables, Excel-like data grid, web-based spreadsheets, data grid controls, data grid features
description: Create data grids with spreadsheet controls with Jspreadsheet CE.
canonical: https://bossanova.uk/jspreadsheet/v4/docs/getting-started

# Getting started

Jspreadsheet is a vanilla javascript plugin to embed a online spreadsheet in your web based applications. Bring highly dynamic datasets to your application and improve the user experience of your software.

## Install

### NPM

```bash
npm install jspreadsheet-ce@4
```

### CDN

Use jspreadsheet directly from JSDelivr CDN

{.ignore}

```html
<script src="https://cdn.jsdelivr.net/npm/jspreadsheet-ce@4/dist/index.min.js"></script>
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/jspreadsheet-ce@4/dist/jspreadsheet.min.css"
  type="text/css"
/>
<script src="https://cdn.jsdelivr.net/npm/jsuites/dist/jsuites.min.js"></script>
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/jsuites/dist/jsuites.min.css"
  type="text/css"
/>
```

### GitHub

Download from our GitHub page

[https://github.com/jspreadsheet/ce](https://github.com/jspreadsheet/ce)

## Initialization

You can initiate an online spreadsheet including data from a HTML table, a JS array, a CSV or a JSON file, following the examples below:

### Loading from a javascript array

```html
<html>
  <script src="https://bossanova.uk/jspreadsheet/v4/jspreadsheet.js"></script>
  <script src="https://jsuites.net/v5/jsuites.js"></script>
  <link
    rel="stylesheet"
    href="https://bossanova.uk/jspreadsheet/v4/jspreadsheet.css"
    type="text/css"
  />
  <link
    rel="stylesheet"
    href="https://jsuites.net/v5/jsuites.css"
    type="text/css"
  />

  <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/css?family=Material+Icons"
  />

  <div id="spreadsheet"></div>

  <script>
    jspreadsheet(document.getElementById("spreadsheet"), {
      data: [
        ["Mazda", 2001, 2000],
        ["Peugeot", 2010, 5000],
        ["Honda Fit", 2009, 3000],
        ["Honda CRV", 2010, 6000],
      ],
      columns: [
        { title: "Model", width: 300 },
        { title: "Year", width: 100 },
        { title: "Price", width: 80 },
      ],
    });
  </script>
</html>
```

### Loading from a JSON file

```html
<html>
  <script src="https://bossanova.uk/jspreadsheet/v4/jspreadsheet.js"></script>
  <script src="https://jsuites.net/v5/jsuites.js"></script>
  <link
    rel="stylesheet"
    href="https://bossanova.uk/jspreadsheet/v4/jspreadsheet.css"
    type="text/css"
  />
  <link
    rel="stylesheet"
    href="https://jsuites.net/v5/jsuites.css"
    type="text/css"
  />

  <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/css?family=Material+Icons"
  />

  <div id="spreadsheet"></div>

  <script>
    jspreadsheet(document.getElementById("spreadsheet"), {
      url: "/jspreadsheet/data.json",
      columns: [
        { title: "Model", width: 300 },
        { title: "Year", width: 100 },
        { title: "Price", width: 80 },
      ],
    });
  </script>
</html>
```

### Loading from a CSV file

```html
<html>
  <script src="https://bossanova.uk/jspreadsheet/v4/jspreadsheet.js"></script>
  <script src="https://jsuites.net/v5/jsuites.js"></script>
  <link
    rel="stylesheet"
    href="https://bossanova.uk/jspreadsheet/v4/jspreadsheet.css"
    type="text/css"
  />
  <link
    rel="stylesheet"
    href="https://jsuites.net/v5/jsuites.css"
    type="text/css"
  />

  <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/css?family=Material+Icons"
  />

  <div id="spreadsheet"></div>

  <script>
    jspreadsheet(document.getElementById("spreadsheet"), {
      csv: "/tests/demo.csv",
      csvHeaders: true,
      columns: [{ width: 300 }, { width: 80 }, { width: 100 }],
      tableOverflow: true,
    });
  </script>
</html>
```

[See a working example](/jspreadsheet/v4/examples/import-data)

### Headers from a CSV file

If you are loading your data from a CSV file, you can define the **csvHeader:true**, so the first row will be used as your column names.

[See a working example](/jspreadsheet/v4/examples/import-data)

### Programmatically header updates

The methods **setHeader()**, **getHeader()** and **getHeaders()** are available for the developer to interact programmatically with the spreadsheet.

[Working example](/jspreadsheet/v4/examples/headers#Programmatically-header-updates)

### Nested headers

The nested headers area available in the innitialization through the directive **nestedHeaders:[]**, and should be use follow:

```html
<html>
  <script src="https://bossanova.uk/jspreadsheet/v4/jspreadsheet.js"></script>
  <script src="https://jsuites.net/v5/jsuites.js"></script>
  <link
    rel="stylesheet"
    href="https://bossanova.uk/jspreadsheet/v4/jspreadsheet.css"
    type="text/css"
  />
  <link
    rel="stylesheet"
    href="https://jsuites.net/v5/jsuites.css"
    type="text/css"
  />

  <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/css?family=Material+Icons"
  />

  <div id="spreadsheet"></div>

  <script>
    jspreadsheet(document.getElementById("spreadsheet"), {
      data: [
        ["BR", "Cheese", 1],
        ["CA", "Apples", 0],
        ["US", "Carrots", 1],
        ["GB", "Oranges", 0],
      ],
      columns: [
        {
          type: "autocomplete",
          title: "Country",
          width: "300",
          url: "/jspreadsheet/countries",
        },
        {
          type: "dropdown",
          title: "Food",
          width: "150",
          source: ["Apples", "Bananas", "Carrots", "Oranges", "Cheese"],
        },
        { type: "checkbox", title: "Stock", width: "100" },
      ],
      nestedHeaders: [
        [{ title: "Supermarket information", colspan: "3" }],
        [
          { title: "Location", colspan: "1" },
          { title: " Other Information", colspan: "2" },
        ],
      ],
    });
  </script>
</html>
```

[See this example in action](/jspreadsheet/v4/examples/headers)

## Column width

The initial width can be defined in the width property in the column parameter.

```html
<html>
  <script src="https://bossanova.uk/jspreadsheet/v4/jspreadsheet.js"></script>
  <script src="https://jsuites.net/v5/jsuites.js"></script>
  <link
    rel="stylesheet"
    href="https://bossanova.uk/jspreadsheet/v4/jspreadsheet.css"
    type="text/css"
  />
  <link
    rel="stylesheet"
    href="https://jsuites.net/v5/jsuites.css"
    type="text/css"
  />

  <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/css?family=Material+Icons"
  />

  <div id="spreadsheet"></div>

  <script>
    jspreadsheet(document.getElementById("spreadsheet"), {
      data: [
        ["Mazda", 2001, 2000],
        ["Peugeot", 2010, 5000],
        ["Honda Fit", 2009, 3000],
        ["Honda CRV", 2010, 6000],
      ],
      columns: [
        { title: "Model", width: 300 },
        { title: "Year", width: 80 },
        { title: "Price", width: 100 },
      ],
    });
  </script>
</html>
```

### Programmatically column width updates

The methods setWidth(), getWidth() are available for the developer to update the column width via javascript.

[See this example in action](/jspreadsheet/v4/examples/programmatically-updates#setWidth)

## Row height

The initial row height can be defined in the height property include in the rows directive. It is also possible to enabled a resizeble row by using rowResize: true in the initialization.

```html
<html>
  <script src="https://bossanova.uk/jspreadsheet/v4/jspreadsheet.js"></script>
  <script src="https://jsuites.net/v5/jsuites.js"></script>
  <link
    rel="stylesheet"
    href="https://bossanova.uk/jspreadsheet/v4/jspreadsheet.css"
    type="text/css"
  />
  <link
    rel="stylesheet"
    href="https://jsuites.net/v5/jsuites.css"
    type="text/css"
  />

  <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/css?family=Material+Icons"
  />

  <div id="spreadsheet"></div>

  <script>
    jspreadsheet(document.getElementById("spreadsheet"), {
      data: [["First"], ["Second"], ["Third"]],
      rows: { 1: { height: "300px" } },
      rowResize: true,
      minDimensions: [4, 4],
    });
  </script>
</html>
```

### Programmatically row height updates

The methods setHeight(), getHeight() are available for the developer to update the row height via javascript.

[See this example in action](/jspreadsheet/v4/examples/programmatically-updates#setHeight)

## Column types

Jspreadsheet has available some extra native column types in addition to the default input text. It means you have extended nice responsive ways to get data into your spreadsheet. In addition to that is available integration methods to facilitate you to bring any custom column to your tables. This makes the Jspreadsheet plugin a very flexible tool to enhance the user experience of your applications.

Jspreadsheet is integrate with jSuites, so it brings some native columns, such as: **text, numeric, hidden, dropdown, autocomplete, checkbox, radio, calendar, image and color.**\_

{.ignore}

```html
<html>
  <script src="https://bossanova.uk/jspreadsheet/v4/jspreadsheet.js"></script>
  <script src="https://jsuites.net/v5/jsuites.js"></script>
  <link
    rel="stylesheet"
    href="https://bossanova.uk/jspreadsheet/v4/jspreadsheet.css"
    type="text/css"
  />
  <link
    rel="stylesheet"
    href="https://jsuites.net/v5/jsuites.css"
    type="text/css"
  />

  <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/css?family=Material+Icons"
  />

  <div id="spreadsheet"></div>

  <script>
    jspreadsheet(document.getElementById('spreadsheet'), {
        data:data,
        columns: [
            { title:'Model', width:300, type:'text'; },
            { title:'Price', width:80, type:'numeric' },
            { title:'Date', width:100, type:'calendar', options: { format:'DD/MM/YYYY' } },
            { title:'Photo', width:150, type:'image' },
            { title:'Condition', width:150, type:'dropdown', source:['New','Used'] },
            { title:'Color', width:80, type:'color' },
            { title:'Available', width:80, type:'checkbox' },
        ]
    });
  </script>
</html>
```

### Calendar type

When using the calendar column, you can change the behavior behavior of your calendar by sending some extra options as example above. The possible values are:

{.ignore}

```javascript
{
    options : {
        // Date format
        format:'DD/MM/YYYY',
        // Allow keyboard date entry
        readonly:0,
        // Today is default
        today:0,
        // Show timepicker
        time:0,
        // Show the reset button
        resetButton:true,
        // Placeholder
        placeholder:'',
        // Translations can be done here
        months:['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        weekdays:['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
        weekdays\_short:['S', 'M', 'T', 'W', 'T', 'F', 'S'],
        // Value
        value:null,
        // Events
        onclose:null,
        onchange:null,
        // Fullscreen (this is automatic set for screensize < 800)
        fullscreen:false,
    }
}
```

[See a working example](/jspreadsheet/v4/examples/date-and-datetime-picker)

### Dropdown and autocomplete type

There are different ways to work with dropdowns in Jspreadsheet. It is possible to define the parameter _source_ as a simple or key-value array. It is also possible to use the param _url_ to populate your dropdown from an external json format source. In addition to that it is possible to have conditional values. Basically, the values from one dropdown can be conditional to other dropdowns in your table.

You can set the autocomplete dropdown through the initial param _autocomplete:true_ and the multiple picker can be activate by _multiple:true_ property as shown in the following example:

{.ignore}

```html
<html>
  <script src="https://bossanova.uk/jspreadsheet/v4/jspreadsheet.js"></script>
  <script src="https://jsuites.net/v5/jsuites.js"></script>
  <link
    rel="stylesheet"
    href="https://bossanova.uk/jspreadsheet/v4/jspreadsheet.css"
    type="text/css"
  />
  <link
    rel="stylesheet"
    href="https://jsuites.net/v5/jsuites.css"
    type="text/css"
  />

  <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/css?family=Material+Icons"
  />

  <div id="spreadsheet"></div>

  <script>
    jspreadsheet(document.getElementById("spreadsheet"), {
      data: [
        ["Honda", 1, "Civic", "4"],
        ["Peugeot", 3, "1007", "2"],
        ["Smart", 3, "Cabrio", "4;5"],
      ],
      columns: [
        {
          type: "text",
          title: "Model",
          width: "200",
        },
        {
          type: "dropdown",
          title: "Available in",
          multiple: true,
          source: [
            { id: 1, name: "Red" },
            { id: 2, name: "Yellow" },
            { id: 3, name: "Blue" },
          ],
          width: "200",
        },
        {
          type: "autocomplete",
          title: "Region",
          url: "values.json",
          width: "200",
        },
      ],
    });
  </script>
</html>
```

[See a working example](/jspreadsheet/v4/examples/dropdown-and-autocomplete)

### Custom type

Jspreadsheet makes possible to extend third party javascript plugins to create your custom columns. Basically to use this feature, you should implement some basic methods such as: openEditor, closeEditor, getValue, setValue as following.

{.ignore}

```html
<html>
  <script src="https://bossanova.uk/jspreadsheet/v4/jspreadsheet.js"></script>
  <script src="https://jsuites.net/v5/jsuites.js"></script>
  <link
    rel="stylesheet"
    href="https://bossanova.uk/jspreadsheet/v4/jspreadsheet.css"
    type="text/css"
  />
  <link
    rel="stylesheet"
    href="https://jsuites.net/v5/jsuites.css"
    type="text/css"
  />

  <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/css?family=Material+Icons"
  />

  <div id="jspreadsheet"></div>

  <script>
    let customColumn = {
      // Methods
      closeEditor: function (cell, save) {
        let value = cell.children[0].value;
        cell.innerHTML = value;
        return value;
      },
      openEditor: function (cell) {
        // Create input
        let element = document.createElement("input");
        element.value = cell.innerHTML;
        // Update cell
        cell.classList.add("editor");
        cell.innerHTML = "";
        cell.appendChild(element);
        $(element).clockpicker({
          afterHide: function () {
            setTimeout(function () {
              // To avoid double call
              if (cell.children[0]) {
                spreadsheet.closeEditor(cell, true);
              }
            });
          },
        });
        // Focus on the element
        element.focus();
      },
      getValue: function (cell) {
        return cell.innerHTML;
      },
      setValue: function (cell, value) {
        cell.innerHTML = value;
      },
    };

    const instance = jspreadsheet(document.getElementById("jspreadsheet"), {
      data: [
        ["PHP", "14:00"],
        ["Javascript", "16:30"],
      ],
      columns: [
        { type: "text", title: "Course Title", width: 300 },
        { type: "text", title: "Time", width: 100, editor: customColumn },
      ],
    });
  </script>
</html>
```

[See a working example](/jspreadsheet/v4/examples/column-types#custom)

## Define a minimum table dimension size.

The follow example will create a data table with a minimum number of ten columns and five rows:

{.ignore}

```html
<html>
<script src="https://bossanova.uk/jspreadsheet/v4/jspreadsheet.js"></script>
<script src="https://jsuites.net/v5/jsuites.js"></script>
<link rel="stylesheet" href="https://bossanova.uk/jspreadsheet/v4/jspreadsheet.css" type="text/css" />
<link rel="stylesheet" href="https://jsuites.net/v5/jsuites.css" type="text/css" />

<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Material+Icons" />

<div id="spreadsheet"></div>

<script>
jspreadsheet(document.getElementById('spreadsheet'), {
    data: [
        ['Mazda', 2001, 2000],
        ['Peugeot', 2010, 5000],
        ['Honda Fit', 2009, 3000],
        ['Honda CRV', 2010, 6000],
    ],
    minDimensions:[10,5],
});
<script>
</html>
```
