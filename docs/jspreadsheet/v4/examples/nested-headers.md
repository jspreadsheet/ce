title: Nested headers and column header updates
keywords: Jexcel, spreadsheet, javascript, header updates, nested headers, javascript table
description: Enabled nested headers in your spreadsheet and learn how to set or get header values

# Headers

## Nested headers

The online spreadsheet implements nested headers natively though the directive **nestedHeaders** , as example below:

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

  <div id="spreadsheet"></div>

  <script>
    var data = [
      ["BR", "Cheese", 1],
      ["CA", "Apples", 0],
      ["US", "Carrots", 1],
      ["GB", "Oranges", 0],
    ];

    let table = jspreadsheet(document.getElementById("spreadsheet"), {
      data: data,
      columns: [
        {
          type: "autocomplete",
          title: "Country",
          width: "300",
          url: "/jspreadsheet/countries",
        },
        {
          type: "dropdown",
          title: "Food",
          width: "150",
          source: ["Apples", "Bananas", "Carrots", "Oranges", "Cheese"],
        },
        {
          type: "checkbox",
          title: "Stock",
          width: "100",
        },
      ],
      nestedHeaders: [
        [
          {
            title: "Supermarket information",
            colspan: "3",
          },
        ],
        [
          {
            title: "Location",
            colspan: "1",
          },
          {
            title: " Other Information",
            colspan: "2",
          },
        ],
      ],
    });
  </script>
</html>
```
