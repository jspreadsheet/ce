title: Jspreadsheet | Examples | Using currency column type and how to mask numbers
keywords: Jexcel, jquery, javascript, excel-like, spreadsheet, jquery plugin, masking, current, numbers
description: Handling currency types and masking numbers.

[Back to Examples](/jspreadsheet/v2/examples)

# Currency and masking numbers

The next example will show how to mask the column and automatic change colors based on the column values.

## Source code

```html
<html>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.mask/1.14.3/jquery.mask.min.js"></script>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/jexcel/2.1.0/js/jquery.jexcel.js"></script>
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/jexcel/2.1.0/css/jquery.jexcel.min.css"
    type="text/css"
  />

  <div id="my"></div>

  <script>
    let data = [
      ["3D Systems ", "DDD", 15.08, 15.1, 0.01, 0.07],
      ["3M", "MMM", 178.34, 178.65, 0.49, 0.28],
      ["58.com", "ADR WUBA", 30.01, 29.1, -0.76, -2.55],
      ["500.com", "ADR WBAI", 13.48, 13.56, 0.1, 0.74],
    ];

    // Create the spreadsheet based on data
    $("#my").jexcel({
      data: data,
      colHeaders: ["Name", "Symbol", "Open", "Close", "% Net", "% Change"],
      colWidths: [300, 80, 100, 100, 100, 100],
      columns: [
        { type: "text" },
        { type: "text" },
        { type: "text", mask: "#.###.00", options: { reverse: true } },
        { type: "text", mask: "#.###.00", options: { reverse: true } },
        { type: "text" },
        { type: "text" },
      ],
    });

    // Live update of the settings
    $("#my").jexcel("updateSettings", {
      table: function (instance, cell, col, row, val, id) {
        if (col == 4 || col == 5) {
          if (val < 0) {
            $(cell).css("color", "#ff0000");
          } else {
            $(cell).css("color", "#249D7F");
          }
        }
      },
    });
  </script>
</html>
```

# Formatting a column value using an external javascript plugin

This example shows an alternative way to format numbers in your table. It integrates the numeraljs javascript plugin to format the column.

## Source code

```html
<html>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/numeral.js/2.0.6/numeral.min.js"></script>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/jexcel/2.1.0/js/jquery.jexcel.js"></script>
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/jexcel/2.1.0/css/jquery.jexcel.min.css"
    type="text/css"
  />

  <div id="my1"></div>

  <script>
    let data1 = [
      ["Apple", "Kg", 3.99],
      ["Orange", "Kg", 2.99],
      ["Carrots", "Units", 0.39],
    ];

    $("#my1").jexcel({
      data: data1,
      colHeaders: ["Product", "Unit", "Price"],
      colWidths: [300, 80, 100],
      columns: [{ type: "text" }, { type: "text" }, { type: "number" }],
    });

    $("#my1").jexcel("updateSettings", {
      table: function (instance, cell, col, row, val, id) {
        if (col == 2) {
          txt = numeral(val).format("0,0.00");
          $(cell).html(" " + txt);
        }
      },
    });
  </script>
</html>
```

**NOTE** The Jspreadsheet uses the [jQuery Mask Plugin](https://github.com/igorescobar/jQuery-Mask-Plugin) to perform the masking. But, the example above shows that it is possible to integrate any external plugin for masking or to visual adjust the data automatically.
