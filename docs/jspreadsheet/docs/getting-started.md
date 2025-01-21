title: Getting Started with Jspreadsheet CE  
keywords: Jspreadsheet CE, Jexcel, JavaScript data grid, spreadsheets, JavaScript tables, Excel-like grids, web-based spreadsheets, data grid controls, interactive spreadsheet features  
description: Learn how to create interactive data grids with powerful spreadsheet controls using Jspreadsheet CE.

# Getting Started with Jspreadsheet CE v5

## Overview

Jspreadsheet CE, formerly jExcel, is a free, lightweight JavaScript spreadsheet library to help developers bring Excel-like data grids and spreadsheet features to their applications. The library enables developers to build robust data management interfaces using React, Angular or pure JavaScript.

### Why Choose Jspreadsheet CE?

- Create rich, interactive data grid interfaces
- Handle complex data inputs with Excel-like functionality
- Direct Excel compatibility: Copy and paste using standard shortcuts
- Proven success across thousands of implementations
- Lightweight, fast, and intuitive
- Easy integration with third-party plugins
- Built for collaboration and sharing
 


## Installation

Choose one of the following installation options:

### NPM

Install jspreadsheet using NPM:

```bash
npm install jspreadsheet-ce@5.0.0-beta.3
```

### CDN

Include jspreadsheet directly from JSDelivr CDN:

{.ignore}
```html
<script src="https://cdn.jsdelivr.net/npm/jspreadsheet-ce@5.0.0-beta.3/dist/index.min.js"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/jspreadsheet-ce@5.0.0-beta.3/dist/jspreadsheet.min.css" type="text/css" />
<script src="https://cdn.jsdelivr.net/npm/jsuites/dist/jsuites.min.js"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/jsuites/dist/jsuites.min.css" type="text/css" />
```

### Download

Download and run jspreadsheet on your server or local machine:

https://bossanova.uk/jspreadsheet/v5/jspreadsheet.zip


## License

This software is distributed under the MIT license.


## Documentation

### Global methods and properties

| Method Description                                                                                                                       |
|------------------------------------------------------------------------------------------------------------------------------------------|
| Create a new spreadsheet.<br/>`jspreadsheet(element: HTMLDivElement \| HTMLTableElement, options: SpreadsheetOptions): WorksheetInstance[];`                                                     |
| Destroy a given spreadsheet.<br/>`jspreadsheet.destroy(element: JspreadsheetInstanceElement, destroyEventHandlers?: boolean): void;`                                     |
| Destroy all spreadsheets in all namespaces.<br/>`jspreadsheet.destroyAll(): void;`                                                              |
| Translate Jspreadsheet components and extensions.<br/>`jspreadsheet.setDictionary(translations: Record<string, string>): void;`                                 |
| Get a worksheet instance by name and namespace.<br/>`jspreadsheet.getWorksheetInstanceByName(worksheetName: string \| null \| undefined, namespace: string): WorksheetInstance \| Record<string, WorksheetInstance>;` |


## Examples

### Create a new data grid

You can create a new data grid with spreadsheet-like controls from an HTML table element, a JS array, a CSV, a JSON file or an Excel XLSX file.  

```html
<html>
<script src="https://bossanova.uk/jspreadsheet/v5/jspreadsheet.js"></script>
<script src="https://jsuites.net/v5/jsuites.js"></script>
<link rel="stylesheet" href="https://bossanova.uk/jspreadsheet/v5/jspreadsheet.css" type="text/css" />
<link rel="stylesheet" href="https://jsuites.net/v5/jsuites.css" type="text/css" />

<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Material+Icons" />

<div id='spreadsheet'></div>

<script>
// Create a new spreadsheet
jspreadsheet(document.getElementById('spreadsheet'), {
    worksheets: [{
        minDimensions: [6,6],
    }]
});
</script>
</html>
```

### Destroying The Data Grid

The following example shows how to dynamically destroy and recreate a new data grid. 

```html
<html>
<script src="https://bossanova.uk/jspreadsheet/v5/jspreadsheet.js"></script>
<script src="https://jsuites.net/v5/jsuites.js"></script>
<link rel="stylesheet" href="https://bossanova.uk/jspreadsheet/v5/jspreadsheet.css" type="text/css" />
<link rel="stylesheet" href="https://jsuites.net/v5/jsuites.css" type="text/css" />
<link rel="canonical" href="https://bossanova.uk/jspreadsheet/docs/getting-started" />
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Material+Icons" />

<div id='jspreadsheet'></div>

<p><input type='button' value='Destroy' id="btn1" /> <input type='button' value='Create' id="btn2" /></p>

<script>
// Create a new spreadsheet
let create = function() {
    if (document.getElementById('jspreadsheet').spreadsheet) {
        destroy();
    }

    jspreadsheet(document.getElementById('jspreadsheet'), {
    	worksheets: [ { minDimensions:[5,5] } ]
    });
}

// Destroy the spreadsheet
let destroy = function() {
    jspreadsheet.destroy(document.getElementById('jspreadsheet'));
}

// Create the spreadsheet
jspreadsheet(document.getElementById('jspreadsheet'), {
    worksheets: [{
        minDimensions: [5,5],
    }]
});

document.getElementById("btn1").onclick = () => destroy()
document.getElementById("btn2").onclick = () => create()
</script>
</html>
```
