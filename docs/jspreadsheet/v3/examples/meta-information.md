title: Meta information
keywords: Javascript spreadsheet, javascript, javascript table, meta information
description: Keep hidden information about your data grid cells using the Jspreadsheet meta information methods

[Back to Examples](/jspreadsheet/v3/examples#more)

# Meta information

This feature helps you keep import information about the cells hidden from users.

You can define any meta information during the initialization or programmatically after that thought getMeta or setMeta methods.

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

  <div id="spreadsheet"></div>
  <div id="console"></div>

  <script>
    const table = jexcel(document.getElementById("spreadsheet"), {
      data: [
        ["US", "Apples", "Yes", "2019-02-12"],
        ["CA;US;UK", "Carrots", "Yes", "2019-03-01"],
        ["CA;BR", "Oranges", "No", "2018-11-10"],
        ["BR", "Coconuts", "Yes", "2019-01-12"],
      ],
      columns: [
        {
          type: "dropdown",
          title: "Product Origin",
          width: "300px",
          source: ["CA", "BR", "US", "UK", "GB"],
          autocomplete: true,
          multiple: true,
        },
        { type: "text", title: "Description", width: "200px" },
        {
          type: "dropdown",
          title: "Stock",
          width: "100px",
          source: ["No", "Yes"],
        },
        { type: "calendar", title: "Best before", width: "100px" },
      ],
      meta: {
        A1: {
          myMeta: "this is just a test",
          otherMetaInformation: "other test",
        },
        A2: { info: "test" },
      },
    });
    document.getElementById("setForMultiple").onclick = () =>
      table.setMeta({ C1: { id: "1", y: "2019" }, C2: { id: "2" } });
    document.getElementById("setForB2").onclick = () =>
      table.setMeta("B2", "myMetaData", prompt("myMetaData:"));
    document.getElementById("getFromA1").onclick = () =>
      (document.getElementById("console").innerHTML = JSON.stringify(
        table.getMeta("A1")
      ));
    document.getElementById("getAll").onclick = () =>
      (document.getElementById("console").innerHTML = JSON.stringify(
        table.getMeta()
      ));
  </script>

  <br />
  <input
    type="button"
    id="setForMultiple"
    value="Set meta data for multiple columns"
  />
  <input type="button" id="setForB2" value="Set a meta information for B2" />
  <input
    type="button"
    id="getFromA1"
    value="Get the meta information from A1"
  />
  <input type="button" id="getAll" value="Get all meta information" />
</html>
```
