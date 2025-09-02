title: Jspreadsheet | Examples | Images on your images
keywords: Jexcel, jquery, javascript, spreadsheet, table, jquery plugin, images
description: Add images on your spreadsheet cells

[Back to Examples](/jspreadsheet/v2/examples)

# Embed images on your cells

The following example shows how to render images inside your spreadsheet cells

## Source code

```html
<html>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jexcel/2.1.0/js/jquery.jexcel.js"></script>
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/jexcel/2.1.0/css/jquery.jexcel.min.css"
    type="text/css"
  />

  <div id="my"></div>

  <script>
    var data = [
      [
        "https://marketplace.canva.com/MACcZp2p4po/2/0/thumbnail_large/canva-black-white-acoustic-album-cover-MACcZp2p4po.jpg",
        "Paul Parker",
      ],
      [
        "https://marketplace.canva.com/MACcY55adP4/1/0/thumbnail_large/canva-black-and-white-masculine-acoustic-modern-album-cover-MACcY55adP4.jpg",
        "Mark Ellen",
      ],
    ];

    $("#my").jexcel({
      data: data,
      colWidths: [300, 200],
    });

    $("#my").jexcel("updateSettings", {
      table: function (instance, cell, col, row, val, id) {
        if (col == 0) {
          $(cell).html(
            '<input type="hidden" value="' +
              val +
              '"><img src="' +
              val +
              '" style="width:100px;height:100px">'
          );
        }
      },
    });
  </script>
</html>
```

[Edit this example on jsFiddle](https://jsfiddle.net/spreadsheet/9296zmpf/)
