title: Jspreadsheet | Documentation
keywords: Jspreadsheet, grid, data, table, datatable, json, excel, excel-like, jquery, javascript, spreadsheet
description: Introduction, basic methods, event handles and all information you need about this jquery plugin.

## Column types

Jspreadsheet brings some native columns in addition to the default input text. It means you can get alternative ways to entry data in your spreadsheet. From advanced numeric inputs, dropdowns to calendar picks and a very easy way to have your custom integrations, makes the jExcel plugin a very flexible tool to enhance the user experience when using your applications.

In the example below, you will have text, numeric inputs and a calendar picker. But, other native options will be available such as: _text, numeric, calendar, checkbox, dropdown, autocomplete._

```javascript
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
```

### Custom columns

To make a flexible tools, it is possible to extend the plugin to create your custom entries. The following example will show you how to integrate a third party plugin to create your custom columns.

[http://bossanova.uk/jspreadsheet/v2/examles/integrating-a-third-party-plugin-into-your-spreadsheet](/jspreadsheet/v2/examples/integrating-a-third-party-plugin-into-your-spreadsheet)
