title: Nested headers and column header updates
keywords: Jexcel, spreadsheet, javascript, header updates, nested headers, javascript table
description: Enabled nested headers in your spreadsheet and learn how to set or get header values

[Back to Examples](/jspreadsheet/v3/examples "Back to the examples section")

# Headers

## Nested headers

The online spreadsheet implements nested headers natively though the directive **nestedHeaders**

## Programmatically header updates

There are a few options to allow the user to interact with the header titles. Using the contextMenu over the desired header, by pressing an selected header and holding the click for 500ms, or via javascript.

```html
<html>
  <script src="https://bossanova.uk/jspreadsheet/v3/jexcel.js"></script>
  <script src="https://jsuites.net/v3/jsuites.js"></script>
  <link
    rel="stylesheet"
    href="https://jsuites.net/v3/jsuites.css"
    type="text/css"
  />
  <link
    rel="stylesheet"
    href="https://bossanova.uk/jspreadsheet/v3/jexcel.css"
    type="text/css"
  />

  <div id="spreadsheet"></div>

  <br />
  <select id="columnNumber">
    <option value="0">Column 0</option>
    <option value="1">Column 1</option>
    <option value="2">Column 2</option>
  </select>

  <input type="button" value="Set header title" id="btn1" />
  <input type="button" value="Get header title" id="btn2" />

  <script>
    let table = jexcel(document.getElementById("spreadsheet"), {
      data: [
        ["BR", "Cheese", 1],
        ["CA", "Apples", 0],
        ["US", "Carrots", 1],
        ["GB", "Oranges", 0],
      ],
      columns: [
        {
          type: "autocomplete",
          title: "Country",
          width: "300",
          source: ["BR", "CA", "US", "GB"],
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
      columnDrag: true,
    });
    btn1.onclick = () =>
      table.setHeader(document.getElementById("columnNumber").value);
    btn2.onclick = () =>
      alert(table.getHeader(document.getElementById("columnNumber").value));
  </script>
</html>
```
