title: Header updates & column dragging
keywords: Jexcel, spreadsheet, javascript, header updates, programmatically header updates, enable column dragging
description: Header updates and column dragging

# Header updates

There are three ways to change a header title.

- The user clicks in a selected header and hold the mouse for 2 seconds, a prompt will request the new title;
- Via contextMenu. the user right clicks in the column and select the option Rename column
- Using the method setHeader(colNumber, title) as example below:

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
    let table = jspreadsheet(document.getElementById("spreadsheet"), {
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
    });

    setHeaderBtn.onclick = () =>
      table.setHeader(document.getElementById("columnNumber").value);
    getHeaderBtn.onclick = () =>
      alert(table.getHeader(document.getElementById("columnNumber").value));
  </script>

  <br />
  <select id="columnNumber">
    <option value="0">Column 0</option>
    <option value="1">Column 1</option>
    <option value="2">Column 2</option>
  </select>

  <input type="button" value="Set header title" id="setHeaderBtn" />
  <input type="button" value="Get header title" id="getHeaderBtn" />
</html>
```
