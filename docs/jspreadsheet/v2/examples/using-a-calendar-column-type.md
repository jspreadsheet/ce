title: Jspreadsheet | Examples | Calendar column type with date and datetime picker
keywords: Jexcel, jquery, javascript, excel-like, spreadsheet, jquery plugin, date, datetime picker
description: How to handle a calendar with date and datetime picker.

[Back to Examples](/jspreadsheet/v2/examples)

# Calendar column type

The example below shows how to use and customize special calendar column type.

See a live example of calendar usage on [jsfiddle](https://jsfiddle.net/spreadsheet/ajv413cb/).

## Source code

```html
<html>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/jexcel/2.1.0/js/jquery.jexcel.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jexcel/2.1.0/js/jquery.jcalendar.js"></script>

  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/jexcel/2.1.0/css/jquery.jexcel.min.css"
    type="text/css"
  />
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/jexcel/2.1.0/css/jquery.jcalendar.min.css"
    type="text/css"
  />

  <div id="my"></div>

  <script>
    data = [
      ["Mazda", 2001, 2000, "2006-01-01"],
      ["Peugeot", 2010, 5000, "2005-01-01"],
      ["Honda Fit", 2009, 3000, "2004-01-01"],
      ["Honda CRV", 2010, 6000, "2003-01-01"],
    ];

    $("#my").jexcel({
      data: data,
      colHeaders: ["Model", "Date", "Price", "Date"],
      colWidths: [300, 80, 100, 100],
      columns: [
        { type: "text" },
        { type: "numeric" },
        { type: "numeric" },
        { type: "calendar", options: { format: "DD/MM/YYYY" } },
      ],
    });
  </script>
</html>
```

## Date column customization

Customize the format and the behavior of your column through the initialization options, as follow:

### Calendar initialization options

{.ignore}

```javascript
{
    options: {
        format:'DD/MM/YYYY', // Date format
        readonly:0, // Input as readonly (true or false)
        today:0, // Input with at today as default (true or false)
        time:0, // Show time picker
        clear:1, // Show clear button
        mask:1, // Mask the input
        months:['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], // Translations can be done here
        weekdays:['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'], // Translations can be done here
        weekdays_short:['S', 'M', 'T', 'W', 'T', 'F', 'S'] // Translations can be done here
    };
}
```

Considering the example above, you can create a calendar including a time picker by simple send the option **time:1** as the following example.

{.ignore}

```html
<div id="my2"></div>

<script>
  $("#my2").jexcel({
    data: data,
    colHeaders: ["Model", "Year", "Price", "Date"],
    colWidths: [300, 80, 100, 120],
    columns: [
      { type: "text" },
      { type: "text" },
      { type: "text" },
      { type: "calendar", options: { format: "DD/MM/YYYY HH24:MI", time: 1 } },
    ],
  });
</script>
```
