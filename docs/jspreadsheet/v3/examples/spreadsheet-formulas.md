title: Basic to advance use of formulas
keywords: Jexcel, javascript, excel-like, spreadsheet, formulas, currency, calculations
description: Unleash the power of your tables bringing formulas and custom javascript methods on your Jspreadsheet - the online spreadsheet.

[Back to Examples](/jspreadsheet/v3/examples "Back to the examples section")

# Adding formulas on your online spreadsheet

## Simple spreadsheet-like formula usage

The example below shows how to use spreadsheet like formulas on your javascript table spreadsheet.

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
        ["Crayons Crayola only (No Rose Art)", 2, "5.01", "=B1*C1"],
        ["Colored Pencils Crayola only", 2, "4.41", "=B2*C2"],
        ["Expo Dry-erase Markers Wide", 4, "3.00", "=B3*C3"],
        ["Index Cards Unlined", 3, "6.00", "=B4*C4"],
        ["Tissues", 10, "1.90", "=B5*C5"],
        ["Ziploc Sandwich-size Bags", 5, "1.00", "=B6*C6"],
        ["Thin Markers Crayola only", 2, "3.00", "=B7*C7"],
        ["Highlighter", 4, "1.20", "=B8*C8"],
        ["Total", "=SUM(B1:B8)", "=ROUND(SUM(C1:C8), 2)", "=SUM(D1:D8)"],
      ],
      columns: [
        { type: "text", title: "Product", width: "300" },
        { type: "text", title: "Qtd", width: "80" },
        {
          type: "text",
          title: "Price",
          width: "100",
          mask: "#.##,00",
          decimal: ",",
        },
        { type: "text", title: "Total", width: "100" },
      ],
      updateTable: function (instance, cell, col, row, val, label, cellName) {
        if (cell.innerHTML == "Total") {
          cell.parentNode.style.backgroundColor = "#fffaa3";
        }

        if (col == 3) {
          if (parseFloat(label) > 10) {
            cell.style.color = "red";
          } else {
            cell.style.color = "green";
          }
        }
      },
      columnSorting: false,
    });
  </script>
</html>
```

## Creating Custom formulas

You can declare custom javascript methods and use in your tables as the example below.

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

  <script src="https://cdn.jsdelivr.net/npm/@jspreadsheet/formula/dist/index.min.js"></script>

  <div id="spreadsheet1"></div>

  <script>
    const COLORIZE = function (v) {
      v = '<span style="color:' + v + '">' + v.toUpperCase() + "</span>";
      return v;
    };

    formula.setFormula({ COLORIZE });

    jexcel(document.getElementById("spreadsheet1"), {
      data: [
        ["red", "=COLORIZE(A1)"],
        ["green", "=COLORIZE(A2)"],
        ["blue", "=COLORIZE(A3)"],
      ],
      columns: [
        { type: "text", width: "300" },
        { type: "text", width: "200" },
      ],
    });
  </script>
</html>
```
