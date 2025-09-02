title: Sorting the spreadsheet columns
keywords: Jexcel, spreadsheet, javascript, javascript table, sorting
description: Example how to sort the table by a column via javascript.

[Back to Examples](/jspreadsheet/v3/examples "Back to the examples section")

# Sorting your table

## Simple example

You can sort your javascript table by double a double click in the header, using the context menu or by javascript as follow:

```html
<html>
  <script src="https://bossanova.uk/jspreadsheet/v3/jexcel.js"></script>
  <script src="https://jsuites.net/v3/jsuites.js"></script>
  <link
    rel="stylesheet"
    href="https://bossanova.uk/jspreadsheet/v3/jexcel.css"
    type="text/css"
  />
  <link
    rel="stylesheet"
    href="https://jsuites.net/v3/jsuites.css"
    type="text/css"
  />

  <div id="spreadsheet"></div>

  <script>
    let table = jexcel(document.getElementById("spreadsheet"), {
      data: [
        ["Mazda", 2001, 2000, "2006-01-01"],
        ["Peugeot", 2010, 5000, "2005-01-01"],
        ["Honda Fit", 2009, 3000, "2004-01-01"],
        ["Honda CRV", 2010, 6000, "2003-01-01"],
      ],
      columns: [
        { type: "text", width: 300 },
        { type: "text", width: 80 },
        { type: "text", width: 100 },
        { type: "calendar", width: 100 },
      ],
    });
    document.getElementById("orderBy").onclick = () =>
      table.orderBy(document.getElementById("columnNumber").value);
  </script>

  <br />
  <select id="columnNumber">
    <option value="0">Column 1</option>
    <option value="1">Column 2</option>
    <option value="2">Column 3</option>
    <option value="3">Column 4</option>
  </select>
  <input type="button" value="Sort By Column" id="orderBy" />
</html>
```

## Disable the table sorting

The ordering is a native enabled feature. To disable that feature please use the columnSorting:false, directive in the initialization.

```html
<html>
  <script src="https://bossanova.uk/jspreadsheet/v3/jexcel.js"></script>
  <script src="https://jsuites.net/v3/jsuites.js"></script>
  <link
    rel="stylesheet"
    href="https://bossanova.uk/jspreadsheet/v3/jexcel.css"
    type="text/css"
  />
  <link
    rel="stylesheet"
    href="https://jsuites.net/v3/jsuites.css"
    type="text/css"
  />

  <div id="spreadsheet"></div>

  <script>
    jexcel(document.getElementById("spreadsheet"), {
      data: [
        ["Mazda", 2001, 2000, "2006-01-01"],
        ["Peugeot", 2010, 5000, "2005-01-01"],
        ["Honda Fit", 2009, 3000, "2004-01-01"],
        ["Honda CRV", 2010, 6000, "2003-01-01"],
      ],
      columns: [
        { type: "text", tile: "Model", width: 300 },
        { type: "text", tile: "Year", width: 100 },
        { type: "text", tile: "Price", width: 100 },
        { type: "text", tile: "Date", width: 100 },
      ],
      columnSorting: false,
    });
  </script>
</html>
```
