title: Embed images to your spreadsheet using base64
keywords: Jexcel, javascript, excel-like, spreadsheet, image upload, base64, embed images
description: This examples shows how to embed and upload images to your spreadsheet.

[Back to Examples](/jspreadsheet/v3/examples "Back to the examples section")

# Embed images into your spreadsheet

The following examples shows how to embed images into your spreadsheet.

## Load a local image to your table

Load images from your local machine into your javascript spreadsheet

```html
<html>
<script src="https://bossanova.uk/jspreadsheet/v3/jexcel.js"></script>
<script src="https://jsuites.net/v3/jsuites.js"></script>
<link rel="stylesheet" href="https://bossanova.uk/jspreadsheet/v3/jexcel.css" type="text/css" />
<link rel="stylesheet" href="https://jsuites.net/v3/jsuites.css" type="text/css" />

<div id="spreadsheet1"></div>

<script>
let data = [
    ['Purple', 'data:image/jpeg;base64,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'],
];

jexcel(document.getElementById('spreadsheet1'), {
    data:data,
    minDimensions: [2,4],
    columns: [
        { type:'text', width:300, title:'Title' },
        { type:'image', width:120, title:'Cover' },

     ]
});
</script>
</html>
```  

## Embed remote images to your table

Automatic image rendering from a remote URL using updateTable method

```html
<html>
<script src="https://bossanova.uk/jspreadsheet/v3/jexcel.js"></script>
<script src="https://jsuites.net/v3/jsuites.js"></script>
<link rel="stylesheet" href="https://bossanova.uk/jspreadsheet/v3/jexcel.css" type="text/css" />
<link rel="stylesheet" href="https://jsuites.net/v3/jsuites.css" type="text/css" />

<div id="spreadsheet2"></div>

<script>
jexcel(document.getElementById('spreadsheet2'), {
    data: [
        ['https://marketplace.canva.com/MACcZp2p4po/2/0/thumbnail_large/canva-black-white-acoustic-album-cover-MACcZp2p4po.jpg', 'Paul Parker'],
        ['https://marketplace.canva.com/MACcY55adP4/1/0/thumbnail_large/canva-black-and-white-masculine-acoustic-modern-album-cover-MACcY55adP4.jpg', 'Mark Ellen']
    ],
    columns: [
        { type:'text', width:300, title:'Cover' },
        { type:'text', width:300, title:'Title' },
    ],
    updateTable: function (instance, cell, col, row, val, id) {
        if (col == 0) {
            cell.innerHTML = '<img src="' + val + '" style="width:100px;height:100px">';
        }
    }
});
</script>
</html>
```

