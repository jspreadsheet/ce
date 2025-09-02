title: jQuery Spreadsheet  
keywords: Jexcel, JavaScript, Jspreadsheet, jQuery integration, JavaScript spreadsheet, interactive table  
description: Learn how to integrate Jspreadsheet with jQuery through a complete example.

# jQuery Spreadsheet

Create fantastic data grids with spreadsheet controls integrating Jspreadsheet with jQuery.

### Source code

```html
<html>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>

  <script src="https://bossanova.uk/jspreadsheet/v5/jspreadsheet.js"></script>
  <link
    rel="stylesheet"
    href="https://bossanova.uk/jspreadsheet/v5/jspreadsheet.css"
    type="text/css"
  />
  <script src="https://jsuites.net/v5/jsuites.js"></script>
  <link
    rel="stylesheet"
    href="https://jsuites.net/v5/jsuites.css"
    type="text/css"
  />

  <div id="spreadsheet"></div>

  <br />
  <input type="button" value="Add new row" id="btn1" />

  <script>
    let table = jspreadsheet($("#spreadsheet")[0], {
      worksheets: [
        {
          minDimensions: [4, 4],
          tableOverflow: true,
        },
      ],
    });

    document.getElementById("btn1").addEventListener("click", function () {
      table[0].insertRow();
    });
  </script>
</html>
```
