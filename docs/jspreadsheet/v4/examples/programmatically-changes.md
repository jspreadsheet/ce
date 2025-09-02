title: Programmatic Data Grid Updates in Jspreadsheet v4  
keywords: Jexcel, JavaScript, spreadsheet updates, programmatically modify data, JavaScript data grid, Excel-like functionality  
description: Learn how to programmatically update your spreadsheet and its data using JavaScript with Jspreadsheet v4.  
canonical: https://bossanova.uk/jspreadsheet/v4/examples/programmatically-updates

# Programmatically Data Grid Updates

## Insert, remove and move columns and rows

The following example shows how to manage data programmatically in your javascript spreadsheet.

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

  <div
    style="display:flex; flex-direction: column; flex-wrap: wrap; width: 500px; padding: 25px; justify-content: space-around;"
  >
    <input type="button" id="btn1" value="Insert Blank Column" />
    <input type="button" id="btn2" value="Insert Five Blank Columns" />
    <input
      type="button"
      id="btn3"
      value="Insert a new column with pre-populated values at the end of the table"
    />
    <input
      type="button"
      id="btn4"
      value="Insert a new blank row at the end of the table"
    />
    <input
      type="button"
      id="btn5"
      value="Create ten rows at the end of the table"
    />
    <input type="button" id="btn6" value="Delete the first row" />
    <input type="button" id="btn7" value="Delete the last column" />
    <input
      type="button"
      id="btn8"
      value="Move the first column to the third position"
    />
  </div>
  <br />
  <div id="spreadsheet"></div>

  <script>
    let table = jspreadsheet(document.getElementById("spreadsheet"), {
      data: [
        ["Cheese", 10, 1.1, "=B1*C1"],
        ["Apples", 30, 0.4, "=B2*C2"],
        ["Carrots", 15, 0.45, "=B3*C3"],
        ["Oranges", 20, 0.49, "=B4*C4"],
      ],
      columns: [
        {
          title: "Product",
          type: "autocomplete",
          source: [
            "Apples",
            "Bananas",
            "Carrots",
            "Oranges",
            "Cheese",
            "Pears",
          ],
          width: "300px",
        },
        {
          title: "Quantity",
          type: "number",
          width: "100px",
        },
        {
          title: "Price",
          type: "number",
          width: "100px",
        },
        {
          title: "Total",
          type: "number",
          width: "100px",
        },
      ],
      rowResize: true,
      columnDrag: true,
    });

    document.getElementById("btn1").onclick = () => table.insertColumn();
    document.getElementById("btn2").onclick = () =>
      table.insertColumn(5, 0, 1, null);
    document.getElementById("btn3").onclick = () =>
      table.insertColumn(["0.99", "1.22", "3.11", "2.21"]);
    document.getElementById("btn4").onclick = () => table.insertRow();
    document.getElementById("btn5").onclick = () => table.insertRow(10);
    document.getElementById("btn6").onclick = () => table.deleteRow(0, 1);
    document.getElementById("btn7").onclick = () => table.deleteColumn();
    document.getElementById("btn8").onclick = () => table.moveColumn(0, 2);
  </script>
</html>
```

## Updating column width and row height

Update the table width and height properties.

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
    let table = jspreadsheet(document.getElementById("spreadsheet"), {
      data: [
        ["Cheese", 10, 1.1, "=B1*C1"],
        ["Apples", 30, 0.4, "=B2*C2"],
        ["Carrots", 15, 0.45, "=B3*C3"],
        ["Oranges", 20, 0.49, "=B4*C4"],
      ],
      colHeaders: ["Product", "Quantity", "Price", "Total"],
      colWidths: [300, 100, 100, 100],
      columns: [
        {
          type: "autocomplete",
          source: [
            "Apples",
            "Bananas",
            "Carrots",
            "Oranges",
            "Cheese",
            "Pears",
          ],
        },
        { type: "number" },
        { type: "number" },
        { type: "number" },
      ],
      rowResize: true,
    });

    document.getElementById("setWidth").onclick = () =>
      table.setWidth(document.getElementById("columnNumber").value, 200);
    document.getElementById("setHeight").onclick = () =>
      table.setHeight(0, 100);
  </script>

  <br />
  <select id="columnNumber">
    <option value="0">Column 1</option>
    <option value="1">Column 2</option>
    <option value="2">Column 3</option>
    <option value="3">Column 4</option>
  </select>

  <input type="button" id="setWidth" value="Set column width to 200px" />
  <input type="button" id="setHeight" value="Set first row to height 100px" />
</html>
```
