title: Common Questions
keywords: Jspreadsheet CE, Jexcel, JavaScript Data Grid, Spreadsheets, JavaScript tables, Excel-like data grid, web-based spreadsheets, data grid controls, data grid features, questions, QA
description: Questions and Answers about Jspreadsheet V4
canonical: https://bossanova.uk/jspreadsheet/v4/docs/most-common-questions-and-answers

# Most common questions

1. #### What is the best way to create odd/even rows on a Jspreadsheet spreadsheet and tables?

Solution: Adding the following CSS code on your project.

{.ignore}

```css
.jexcel tbody tr:nth-child(even) {
  background-color: #eee9f1 !important;
}
```

2. #### How to transform multiple HTML static tables in dynamic Jspreadsheet tables?

{.ignore}

```javascript
let tables = document.querySelectorAll("table");

for (var i = 0; i < tables.length; i++) {
  jspreadsheet(tables[i]);
}
```

3. #### How to disable paste over a Jspreadsheet spreadsheet?

{.ignore}

```javascript
jspreadsheet(document.getElementById("spreadsheet"), {
  onbeforepaste: function (instance, data, x, y) {
    return false;
  },
});
```

4. #### How to intercept and change a pasted string over a Jspreadsheet table?

{.ignore}

```javascript
jspreadsheet(document.getElementById("spreadsheet"), {
  onbeforepaste: function (instance, data, x, y) {
    data = data.replace(",", ".", data);
    return data;
  },
});
```

5. #### How to overwrite a type of a cell over a column type?

{.ignore}

```javascript
jspreadsheet(document.getElementById("spreadsheet"), {
  columns: [{ type: "text" }, { type: "text" }],
  cells: {
    B2: { type: "number", mask: "$ #,##.00", decimal: "." },
    B3: { type: "percent" },
  },
});
```

**NOTE:** Only available on the [Pro
distribution](https://jspreadsheet.com/).

6. #### How to disabled the javascript contextmenu of my spreadsheet?

{.ignore}

```javascript
jspreadsheet(document.getElementById("spreadsheet"), {
  columns: [{ type: "text" }, { type: "text" }],
  contextMenu: function () {
    return false;
  },
});
```
