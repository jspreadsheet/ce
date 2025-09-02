title: Grouping multiple spreadsheets in tabs
keywords: Jexcel, javascript, multiple spreadsheets, tabs
description: Grouping multiple spreadsheets in tabs.

# Tabs

Grouping different spreadsheets in tabs

### Source code

```html
<html>
  <script src="https://bossanova.uk/jspreadsheet/v4/jspreadsheet.js"></script>
  <script src="https://jsuites.net/v5/jsuites.js"></script>
  <link
    rel="stylesheet"
    href="https://jsuites.net/v5/jsuites.css"
    type="text/css"
  />
  <link
    rel="stylesheet"
    href="https://bossanova.uk/jspreadsheet/v4/jspreadsheet.css"
    type="text/css"
  />

  <div id="root"></div>

  <br />
  <input type="button" value="Add new tab" id="addTab" style="width:200px;" />
  <input
    type="button"
    value="Download selected tab"
    id="download"
    style="width:200px;"
  />

  <script>
    /**
     * Create worksheet container with two jexcel instances
     */
    const sheets = [
      {
        sheetName: "Countries",
        minDimensions: [10, 10],
      },
      {
        sheetName: "Cities",
        minDimensions: [10, 10],
      },
    ];

    let table = jspreadsheet.tabs(document.getElementById("root"), sheets);

    /**
     * Add new worksheet
     */
    const add = function () {
      let sheets = [];

      sheets.push({
        sheetName: prompt(
          "Create a new tab",
          "New tab " + document.getElementById("root").jexcel.length
        ),
        minDimensions: [10, 10],
      });

      jspreadsheet.tabs(document.getElementById("root"), sheets);
    };

    /**
     * Download current worksheet
     */
    const download = function () {
      // Get selected tab
      let worksheet = document
        .getElementById("root")
        .children[0].querySelector(".selected")
        .getAttribute("data-spreadsheet");

      console.log(worksheet);
      // Download
      document.getElementById("root").jexcel[worksheet].download();
    };

    document.getElementById("addTab").onclick = () => add();
    document.getElementById("download").onclick = () => download();
  </script>
</html>
```
