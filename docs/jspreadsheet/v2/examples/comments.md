title: Jspreadsheet | Examples | Add comments in your jquery table
keywords: Jexcel, jquery, javascript, cell comments, jquery table
description: Manage a table cell comments

[Back to Examples](/jspreadsheet/v2/examples)

# Manage cell comments in your jquery table

The most recent version the spreadsheet plugin brings the possibility to manage custom comments for each individual cells. By allowComments in the initialization, the user will be able to add comments in the rigth click contextMenu.

It is also possible to manage your cell comments programmatically by the use of commands such as setComments or getComments, for example:

| Method                                                                 | Description       |
| ---------------------------------------------------------------------- | ----------------- |
| $('#my1').jexcel('setComments', 'A1', 'This is the comments from A1'); | Set A1 comments   |
| $('#my1').jexcel('getComments', 'A1');                                 | Get A1 comments   |
| $('#my1').jexcel('setComments', 'A1', '');                             | Reset A1 comments |

### Source code

```html
<html>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/jexcel/2.1.0/js/jquery.jexcel.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jexcel/2.1.0/js/jquery.jdropdown.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jexcel/2.1.0/js/jquery.jcalendar.js"></script>
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/jexcel/2.1.0/css/jquery.jexcel.min.css"
    type="text/css"
  />
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/jexcel/2.1.0/css/jquery.jdropdown.min.css"
    type="text/css"
  />
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/jexcel/2.1.0/css/jquery.jcalendar.min.css"
    type="text/css"
  />

  <div id="my1"></div>

  <script>
    data1 = [
      ["US", "Cheese", "2019-02-12"],
      ["CA", "Apples", "2019-03-01"],
      ["CA", "Carrots", "2018-11-10"],
      ["BR", "Oranges", "2019-01-12"],
    ];

    $("#my1").jexcel({
      data: data1,
      colHeaders: ["Product Origin", "Description", "Best before"],
      colWidths: [300, 200, 100],
      columns: [
        { type: "dropdown", url: "/jspreadsheet/countries" },
        { type: "text" },
        { type: "calendar" },
      ],
      allowComments: true,
    });
  </script>
</html>
```
