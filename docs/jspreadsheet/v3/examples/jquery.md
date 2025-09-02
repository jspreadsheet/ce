title: Jspreadsheet with Jquery
keywords: Jexcel, javascript, using jspreadsheet and Jquery
description: A full example on how to integrate Jspreadsheet with Jquery

[Back to Examples](/jspreadsheet/v3/examples "Back to the examples section")

# Jquery

Creating a jspreadsheet javascript instance using jQuery

### Source code

{.ignore}

```html
<html>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>

  <script src="https://bossanova.uk/jspreadsheet/v3/jexcel.js"></script>
  <link
    rel="stylesheet"
    href="https://bossanova.uk/jspreadsheet/v3/jexcel.css"
    type="text/css"
  />
  <script src="https://jsuites.net/v3/jsuites.js"></script>
  <link
    rel="stylesheet"
    href="https://jsuites.net/v3/jsuites.css"
    type="text/css"
  />

  <div id="spreadsheet"></div>

  <input
    type="button"
    value="Add new row"
    onclick="$('#spreadsheet').jexcel('insertRow')"
  />

  <script>
    let options = {
      minDimensions: [10, 10],
      tableOverflow: true,
    };

    $("#spreadsheet").jexcel(options);
  </script>
</html>
```
