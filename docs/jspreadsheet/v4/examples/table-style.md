title: Customize the spreadsheet style CSS
keywords: Jexcel, javascript, excel-like, spreadsheet, table style, css
description: Bring a very special touch to your applications customizing your javascript spreadsheet.

# Custom javascript spreasheet style

## How to apply style to your table

You can define the CSS for specific columns during the initialization, or through programmatically javascript calls.

But, after the initialization is still possible to manage the cell style programmatically using the method getStyle or setStyle.

### Source code

```html
<html>
  <script src="https://bossanova.uk/jspreadsheet/v4/jspreadsheet.js"></script>
  <script src="https://jsuites.net/v5/jsuites.js"></script>
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
    let table = jspreadsheet(document.getElementById("spreadsheet"), {
      data: [
        ["US", "Cheese", "Yes", "2019-02-12"],
        ["CA;US;UK", "Apples", "Yes", "2019-03-01"],
        ["CA;BR", "Carrots", "No", "2018-11-10"],
        ["BR", "Oranges", "Yes", "2019-01-12"],
      ],
      columns: [
        {
          type: "dropdown",
          title: "Product Origin",
          width: 300,
          url: "/jspreadsheet/countries", // Remote source for your dropdown
          autocomplete: true,
          multiple: true,
        },
        {
          type: "text",
          title: "Description",
          width: 200,
        },
        {
          type: "dropdown",
          title: "Stock",
          width: 100,
          source: ["No", "Yes"],
        },
        {
          type: "calendar",
          title: "Best before",
          width: 100,
        },
      ],
      style: {
        A1: "background-color: orange;",
        B1: "background-color: orange;",
      },
    });

    document.getElementById("setYellow").onclick = () =>
      table.setStyle("A2", "background-color", "yellow");
    document.getElementById("setStyle").onclick = () =>
      table.setStyle({
        A3: "font-weight: bold; color:red;",
        B3: "background-color: yellow;",
        C3: "text-decoration: underline;",
        A4: "text-align:left;",
      });
    document.getElementById("getA1Style").onclick = () =>
      (document.getElementById("console").innerHTML = table.getStyle("A1"));
    document.getElementById("getTableStyle").onclick = () =>
      (document.getElementById("console").innerHTML = JSON.stringify(
        table.getStyle()
      ));
  </script>

  <br />

  <p>
    <textarea
      id="console"
      style="width:100%;max-width:600px;height:100px;"
    ></textarea>
  </p>

  <br />
  <button type="button" id="setYellow">Set A2 background</button>
  <button type="button" id="setStyle">Change A3, B3, C3, A4 style</button>
  <button type="button" id="getA1Style">Get A1 style</button>
  <button type="button" id="getTableStyle">Get the table style</button>
</html>
```
