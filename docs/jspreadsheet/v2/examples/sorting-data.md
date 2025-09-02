title: Jspreadsheet | Examples | Sorting your grid
keywords: Jexcel, jquery, javascript, excel-like, spreadsheet, jquery plugin, sorting, table, grid, order by
description: Sorting your Jspreadsheet spreadsheet

[Back to Examples](/jspreadsheet/v2/examples)

# Sorting your table

You can reorder your jquery table by double clicking in the header or by selecting the desired option in the context menu. The example shows how to change the order of your jquery table programmatically.

## Source code

```html
<html>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/jexcel/2.1.0/js/jquery.jexcel.js"></script>
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/jexcel/2.1.0/css/jquery.jexcel.min.css"
    type="text/css"
  />

  <div id="my"></div>

  <script>
    let data = [
      ["Mazda", 2001, 2000, "2006-01-01"],
      ["Peugeot", 2010, 5000, "2005-01-01"],
      ["Honda Fit", 2009, 3000, "2004-01-01"],
      ["Honda CRV", 2010, 6000, "2003-01-01"],
    ];

    $("#my").jexcel({
      data: data,
      colHeaders: ["Model", "Year", "Price", "Date"],
      colWidths: [300, 80, 100, 100],
      columns: [
        { type: "text" },
        { type: "text" },
        { type: "text" },
        { type: "text" },
      ],
    });
  </script>

  <p>
    <input
      type="button"
      value="Order by"
      onclick="$('#my').jexcel('orderBy', $(this).next().val())"
    />
    <select>
      <option value="0">Column 1</option>
      <option value="1">Column 2</option>
      <option value="2">Column 3</option>
      <option value="3">Column 4</option>
    </select>
  </p>
</html>
```

### Programmatically sorting

{.ignore}

```html
<script>
  $("#my").jexcel("orderBy", 1); // Order by the second column (The column number starts on zero)
</script>
```

### Disable the table sorting

The ordering is a native enabled feature. To disable that feature please use the columnSorting:false, directive in the initialization.

{.ignore}

```html
<script>
  let data = [
    ["Mazda", 2001, 2000, "2006-01-01"],
    ["Peugeot", 2010, 5000, "2005-01-01"],
    ["Honda Fit", 2009, 3000, "2004-01-01"],
    ["Honda CRV", 2010, 6000, "2003-01-01"],
  ];

  $("#my").jexcel({
    data: data,
    colHeaders: ["Model", "Year", "Price", "Date"],
    colWidths: [300, 80, 100, 100],
    columns: [
      { type: "text" },
      { type: "text" },
      { type: "text" },
      { type: "text" },
    ],
    columnSorting: false,
  });
</script>
```
