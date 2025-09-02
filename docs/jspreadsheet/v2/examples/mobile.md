title: Jspreadsheet | Examples | Mobile Layout
keywords: Jexcel, jquery, javascript, bootstrap, table design, spreadsheet, CSV, table, grid, mobile
description: Responsive Layout

{.ignore}

```html
<div id="my"></div>

<script>
  let data = [
    ["BR", "Classe A", 1, 1, "2017-01-12"],
    ["CA", "Classe B", 1, 1, "2017-01-12"],
    ["US", "Classe A", 2, 1, "2017-01-12"],
    ["US", "Classe C", 3, 0, "2017-01-12"],
  ];

  $("#my").jexcel({
    data: data,
    colHeaders: ["Country", "Description", "Type", "Stock", "Next purchase"],
    colWidths: [250, 80, 120, 100, 120],
    columns: [
      { type: "autocomplete", url: "/jspreadsheet/countries" },
      { type: "text" },
      {
        type: "dropdown",
        source: [
          { id: "1", name: "Fruits" },
          { id: "2", name: "Legumes" },
          { id: "3", name: "General Food" },
        ],
      },
      { type: "checkbox" },
      { type: "calendar" },
    ],
  });
</script>
```
