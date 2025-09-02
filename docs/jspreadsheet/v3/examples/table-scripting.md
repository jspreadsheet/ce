title: Customize the spreadsheet via javascript
keywords: Jexcel, javascript, excel-like, spreadsheet, table scripting
description: Customize the table behavior using javascript

[Back to Examples](/jspreadsheet/v3/examples "Back to the examples section")

# Table scripting and customizations

Customize the table behavior though javascript.

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

  <script src="https://cdnjs.cloudflare.com/ajax/libs/numeral.js/2.0.6/numeral.min.js"></script>

  <div id="spreasheet2"></div>

  <script>
    let table2 = jexcel(document.getElementById("spreasheet2"), {
      data: [
        ["BR", "Cheese", 1, 3.99],
        ["CA", "Apples", 0, 1.0],
        ["US", "Carrots", 1, 0.9],
        ["GB", "Oranges", 0, 1.2],
        ["CH", "Chocolats", 1, 0.4],
        ["AR", "Apples", 1, 1.1],
        ["AR", "Bananas", 1, 0.3],
        ["BR", "Oranges", 1, 0.95],
        ["BR", "Pears", 1, 0.9],
        ["", "", "", "=ROUND(SUM(D1:D8), 2)"],
      ],
      columnSorting: false,
      columns: [
        {
          type: "autocomplete",
          title: "Country",
          width: "250",
          source: ["BR", "CA", "US", "UK", "AR", "CH", "GB"],
        },
        {
          type: "autocomplete",
          title: "Food",
          width: "150",
          source: [
            "Apples",
            "Bananas",
            "Carrots",
            "Oranges",
            "Cheese",
            "Kiwi",
            "Chocolats",
            "Pears",
          ],
        },
        {
          type: "checkbox",
          title: "Stock",
          width: "100",
        },
        {
          type: "number",
          title: "Price",
          width: "100",
        },
      ],
      updateTable: function (instance, cell, col, row, val, label, cellName) {
        // Number formating
        if (col == 3) {
          // Get text
          txt = cell.innerText;
          // Format text and render
          cell.innerHTML = jSuites.mask.render(txt, { mask: "$ 0.00" });
        }

        // Odd row colours
        if (row % 2) {
          cell.style.backgroundColor = "#edf3ff";
        }

        // Total row
        if (row == 9) {
          if (col < 3) {
            cell.innerHTML = "";
          }

          if (col == 2) {
            cell.innerHTML = "Total";
            cell.style.fontWeight = "bold";
          }

          cell.className = "";
          cell.style.backgroundColor = "#f46e42";
          cell.style.color = "#ffffff";
        }
      },
    });
  </script>
</html>
```
