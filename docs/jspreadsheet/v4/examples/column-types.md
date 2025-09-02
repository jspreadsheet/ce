title: Column types
keywords: Jexcel, javascript, javascript vanilla, javascript plugin, plugin, excel-like, spreadsheet, table, tables, grid, datatables, data
description: Learn more about the powerful column types. This example brings all native column types and how to create your own custom type.

# Column types

The native available types in jspreadsheet javascript spreadsheet are the following:

- text
- numeric
- hidden
- dropdown
- autocomplete
- checkbox
- radio
- calendar
- image
- color
- html

## Native column types

There are several other properties to change the behavior of those columns, please check the dropdown, calendar examples to get more advanced examples.

### Source code

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

  <div id="spreadsheet"></div>

  <script>
    var data = [
      ["Jazz", "Honda", "2019-02-12", "", true, "$ 2.000,00", "#777700"],
      ["Civic", "Honda", "2018-07-11", "", true, "$ 4.000,01", "#007777"],
    ];

    jspreadsheet(document.getElementById("spreadsheet"), {
      data: data,
      columns: [
        { type: "text", title: "Car", width: 120 },
        {
          type: "dropdown",
          title: "Make",
          width: 200,
          source: ["Alfa Romeo", "Audi", "Bmw"],
        },
        { type: "calendar", title: "Available", width: 200 },
        { type: "image", title: "Photo", width: 120 },
        { type: "checkbox", title: "Stock", width: 80 },
        {
          type: "numeric",
          title: "Price",
          width: 100,
          mask: "$ #.##,00",
          decimal: ",",
        },
        { type: "color", width: 100, render: "square" },
      ],
    });
  </script>
</html>
```

## Custom column type

Jspreadsheet is very powerful and flexible, and you can create custom column type based on any external plugins.

A time custom column based on the [clockpicker plugin](https://weareoutman.github.io/clockpicker/) by weareoutman.

### Source code

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
    type="text/css"
    href="http://weareoutman.github.io/clockpicker/dist/jquery-clockpicker.min.css"
  />
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
  <script src="http://weareoutman.github.io/clockpicker/dist/jquery-clockpicker.min.js"></script>

  <div id="custom"></div>

  <script>
    var data2 = [
      ["PHP", "14:00"],
      ["Javascript", "16:30"],
    ];

    var customColumn = {
      // Methods
      closeEditor: function (cell, save) {
        var value = cell.children[0].value;
        cell.innerHTML = value;
        return value;
      },
      openEditor: function (cell) {
        // Create input
        var element = document.createElement("input");
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

    spreadsheet = jspreadsheet(document.getElementById("custom"), {
      data: data2,
      columns: [
        { type: "text", title: "Course Title", width: 300 },
        { type: "text", title: "Time", width: 100, editor: customColumn },
      ],
    });
  </script>
</html>
```
