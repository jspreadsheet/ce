title: Enable and customize the toolbar on your spreadsheet
keywords: Jexcel, javascript, vanilla javascript, excel-like, spreadsheet, datatables, data, table, toolbars
description: Full example on how to enable nor customize your javascript spreadsheet toolbar.

[Back to Examples](/jspreadsheet/v3/examples "Back to the examples section")

# Custom toolbars

The following example shows how to include and customize a toolbar in your javascript spreadsheet.

## Instructions

The toolbar can be customized with a few parameters.

|                      |                                                                                                                                                     |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| **type**             | could be **i** for icon, **select** for a dropdown, **color** or a color picker.                                                                    |
| **content**{.nowrap} | defines the icon (from material icons) when you use type: i; [click here for all possible keys](https://material.io/tools/icons/)                   |
| **k**                | means the style should be apply to the cell;                                                                                                        |
| **v**                | means the value of the style should be apply to the cell; When type:select, you can define an array of possibles values;                            |
| **onclick**          | can be used together with type:i to implement any custom method. The method will receive the jspreadsheet instance and all marked cells by default. |

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

  <link
    rel="stylesheet"
    type="text/css"
    href="https://fonts.googleapis.com/css?family=Material+Icons"
  />

  <div id="spreadsheet"></div>

  <script>
    data = [
      ["Canada", "Cheese", 1],
      ["Japan", "Apples", 0],
      ["United States", "Carrots", 1],
      ["China", "Oranges", 0],
    ];

    table = jexcel(document.getElementById("spreadsheet"), {
      data: data,
      columns: [
        {
          title: "Country",
          type: "autocomplete",
          source: [
            "Brazil",
            "Canada",
            "China",
            "Japan",
            "United States",
            "United Kingdom",
          ],
          width: "300px",
        },
        {
          title: "Food",
          type: "dropdown",
          source: ["Apples", "Bananas", "Carrots", "Oranges", "Cheese"],
          width: "150px",
        },
        {
          title: "Stock",
          type: "checkbox",
          width: "100px",
        },
      ],
      toolbar: [
        {
          type: "i",
          content: "undo",
          onclick: function () {
            table.undo();
          },
        },
        {
          type: "i",
          content: "redo",
          onclick: function () {
            table.redo();
          },
        },
        {
          type: "i",
          content: "save",
          onclick: function () {
            table.download();
          },
        },
        {
          type: "select",
          k: "font-family",
          v: ["Arial", "Verdana"],
        },
        {
          type: "select",
          k: "font-size",
          v: [
            "9px",
            "10px",
            "11px",
            "12px",
            "13px",
            "14px",
            "15px",
            "16px",
            "17px",
            "18px",
            "19px",
            "20px",
          ],
        },
        {
          type: "i",
          content: "format_align_left",
          k: "text-align",
          v: "left",
        },
        {
          type: "i",
          content: "format_align_center",
          k: "text-align",
          v: "center",
        },
        {
          type: "i",
          content: "format_align_right",
          k: "text-align",
          v: "right",
        },
        {
          type: "i",
          content: "format_bold",
          k: "font-weight",
          v: "bold",
        },
        {
          type: "color",
          content: "format_color_text",
          k: "color",
        },
        {
          type: "color",
          content: "format_color_fill",
          k: "background-color",
        },
      ],
    });
  </script>
</html>
```

**NOTE:** You need to include the material icons style sheet.

{.ignore}

```html
<link
  rel="stylesheet"
  type="text/css"
  href="https://fonts.googleapis.com/css?family=Material+Icons"
/>
```
