title: Jspreadsheet | Examples | Handling readonly column and cells on your spreadsheet
keywords: Jexcel, jquery, javascript, excel-like, spreadsheet, jquery plugin, events
description: Understanding how to set a readonly column or multiple custom cells

[Back to Examples](/jspreadsheet/v2/examples)

# Readonly columns and cells.

## Source code

```html
<html>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/jexcel/2.1.0/js/jquery.jexcel.js"></script>
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/jexcel/2.1.0/css/jquery.jexcel.min.css"
    type="text/css"
  />

  <div id="my"></div>

  <script>
    let data = [
      ["Mazda", 2001, 2000, "2006-01-01"],
      ["Peugeot", 2010, 5000, "2005-01-01"],
      ["Honda Fit", 2009, 3000, "2004-01-01"],
      ["Honda CRV", 2010, 6000, "2003-01-01"],
    ];

    $("#my").jexcel({
      data: data,
      colHeaders: ["Description", "Year", "Price", "Buy"],
      colWidths: [200, 300, 100, 100],
      columns: [
        { type: "text", readOnly: true },
        { type: "text" },
        { type: "text" },
        { type: "checkbox" },
      ],
    });

    //Set readonly a specific column
    $("#my").jexcel("updateSettings", {
      cells: function (cell, col, row) {
        // If the column is number 4 or 5
        if (row == 2 && col == 2) {
          $(cell).addClass("readonly");
        }
      },
    });
  </script>
</html>
```

## Online demo on jsFiddle

<iframe width="100%" height="300" src="//jsfiddle.net/hodware/LL0sexgt/embedded/js,html,result/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>
