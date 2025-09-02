title: Project Management Spreadsheet with Jspreadsheet
keywords: Jexcel, javascript, cases, food store
description: How to create a grocery store inventory using Jspreadsheet.

# Project Management Spreadsheet

A simple example including table scripting to perform a photo update and a progress bar added to any new task.

```html
<html>
  <script src="https://bossanova.uk/jspreadsheet/v4/jspreadsheet.js"></script>
  <script src="https://jsuites.net/v5/jsuites.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/@jspreadsheet/formula/dist/index.min.js"></script>
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
    // A custom method to create a PROGRESS BAR based on received percentage and color
    let PROGRESS = function (percentage, color) {
      percentage = percentage > 100 ? 100 : percentage;
      percentage = percentage < 0 ? 0 : percentage;
      percentage = percentage ? percentage : 0;

      return `
        <div style="width: 100%; border-radius: 10px;">
            <div style="width: ${percentage}%; background-color: ${color}; height: 20px; border-radius: 10px;"></div>
        </div>
    `;
    };

    formula.setFormula({ PROGRESS });

    let table = jspreadsheet(document.getElementById("spreadsheet"), {
      minDimensions: [4, 10],
      data: [
        [
          "=B1",
          "1",
          "New products section",
          "2019-02-12",
          "80",
          '=PROGRESS(E1, "darkgreen")',
        ],
        [
          "=B2",
          "1",
          "API integration",
          "2019-03-01",
          "100",
          '=PROGRESS(E2, "darkgreen")',
        ],
        [
          "=B3",
          "7359",
          "Deck",
          "2018-11-10",
          "30",
          '=PROGRESS(E3, "darkgreen")',
        ],
        [
          "=B4",
          "1",
          "Prototype",
          "2019-01-12",
          "0",
          '=PROGRESS(E4, "darkgreen")',
        ],
      ],
      columns: [
        { type: "text", width: "60px", title: "Photo", readOnly: true },
        {
          type: "dropdown",
          width: "140px",
          title: "Name",
          source: [
            { id: "1", name: "Paulo" },
            { id: "7359", name: "Cosme Sergio" },
          ],
        },
        { type: "text", width: "200px", title: "Task" },
        { type: "calendar", width: "100px", title: "When" },
        { type: "text", width: "50px", title: "%" },
        { type: "text", width: "200px", title: "Progress", stripHTML: false },
      ],
      allowComments: true,
      updateTable: function (instance, cell, col, row, val, label, cellName) {
        if (col == 0) {
          if (instance.jexcel.options.data[row][col + 1]) {
            cell.innerHTML =
              '<img src="/templates/default/img/' +
              instance.jexcel.options.data[row][col + 1] +
              '.jpg" style="width:16px;border-radius:16px">';
          } else {
            cell.innerHTML =
              '<img src="/templates/default/img/nophoto.jpg" style="width:16px;border-radius:16px">';
          }
        }

        if (col == 5 && !val) {
          instance.jexcel.setValue(
            "F" + (row + 1),
            "=PROGRESS(E" + (row + 1) + ', "darkgreen")'
          );
        }
      },
    });
  </script>
</html>
```
