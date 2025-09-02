title: Data persistence
keywords: Jexcel, javascript, cases, data persistence, database synchronization
description: A backend data persistence example using Jspreadsheet.

[Back to Use Cases](/jspreadsheet/v4/cases "Back to the use cases section")

# Data persistence

With the persistence directive, each change in the data will be sent to a remote URL.

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
    var mySpreadsheet = jspreadsheet(document.getElementById("spreadsheet"), {
      url: "/jspreadsheet/books.json",
      columns: [
        {
          type: "text",
          width: "50px",
          title: "Code",
          name: "id",
          readOnly: true,
          primaryKey: true,
        },
        {
          type: "text",
          width: "80px",
          title: "Image",
          name: "thumbnailUrl",
        },
        {
          type: "text",
          width: "200px",
          title: "Title",
          name: "title",
        },
        {
          type: "text",
          width: "55px",
          title: "Pages",
          name: "pageCount",
        },
        {
          type: "calendar",
          width: "90px",
          title: "Published",
          name: "publishedDate",
        },
        {
          type: "text",
          width: "200px",
          title: "Author",
          name: "authors",
        },
        {
          type: "dropdown",
          width: "180px",
          title: "Categories",
          name: "categories",
          source: [
            "Internet",
            "Web Development",
            "Java",
            "Mobile",
            "Open Source",
          ],
          multiple: true,
        },
      ],
      allowComments: true,
      persistence: "/jspreadsheet/v4/save",
      updateTable: function (instance, cell, col, row, val, label, cellName) {
        if (col == 1) {
          if (!val) {
            cell.innerHTML =
              '<img src="https://images-na.ssl-images-amazon.com/images/I/21%2Bwfxx2lyL._SX319_BO1,204,203,200_.jpg" style="width:30px;">';
          } else {
            cell.innerHTML = '<img src="' + val + '" style="width:30px;">';
          }
        }

        cell.style.overflow = "hidden";
      },
      onevent: function () {
        console.log(arguments);
      },
    });
  </script>
</html>
```
