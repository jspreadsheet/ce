title: Common Spreadsheet Helper Methods
keywords: Jspreadsheet, Jexcel, data grid, JavaScript, Excel-like features, spreadsheet, data table, documentation, spreadsheet helpers, useful methods
description: This section provides helper methods for everyday spreadsheet scripting, including formatting, transformations, and general spreadsheet utilities.

# Spreadsheet Helpers

This section provides essential methods for common spreadsheet operations, such as handling cell names, ranges, formulas, and data parsing. Each method is documented for easy integration into your applications.


## Documentation

### getColumnName

`jspreadsheet.helpers.getColumnName(i: number): string;`

**Description:**  
Returns the column letter corresponding to the given column index.  
Useful for converting numeric indices (e.g., 0, 1, 2) into Excel-style letters (e.g., A, B, C).

**Parameters:**
- `columnNumber` (number): Zero-based column index.

**Returns:**
- `string`: Column letter (e.g., "A", "B", ...).


{.break}
---

### getCellNameFromCoords

`jspreadsheet.helpers.getCellNameFromCoords(x: Number, y: Number) => String`

**Description:**  
Generates a cell name (e.g., A1) from specified zero-based x (column) and y (row) coordinates.

**Parameters:**
- `x` (Number): Column index (0-based).
- `y` (Number): Row index (0-based).

**Returns:**
- `String`: Cell name (e.g., "A1", "B2").


{.break}
---


### getCoordsFromCellName

`jspreadsheet.helpers.getCoordsFromCellName(cellName: String) => [Number, Number]`

**Description:**  
Converts a cell name (e.g., A1) into zero-based coordinates.

**Parameters:**
- `cellName` (String): Cell name in Excel-style notation.

**Returns:**
- `[Number, Number]`: Array containing x (column) and y (row) indices.


{.break}
---


### getCoordsFromRange

`jspreadsheet.helpers.getCoordsFromRange(range: String, adjust?: boolean) => [Number, Number, Number, Number]`

**Description:**  
Converts a range string into its corresponding zero-based coordinates.

**Parameters:**
- `range` (String): Range string (e.g., "A1:B2").
- `adjust` (boolean, optional): Whether to normalize coordinates (default: false).

**Returns:**
- `[Number, Number, Number, Number]`: Array containing x1, y1, x2, y2.


{.break}
---


### createFromTable

`jspreadsheet.helpers.createFromTable(element: HTMLElement, options: Object) => Object`

**Description:**  
Creates a new spreadsheet configuration based on an HTML table element.

**Parameters:**
- `element` (HTMLElement): Source HTML table.
- `options` (Object): Configuration options.

**Returns:**
- `Object`: Spreadsheet configuration.


{.break}
---


### parseCSV

`jspreadsheet.helpers.parseCSV(str: string, delimiter?: string): string[][];`

**Description:**  
Converts a CSV string into a JavaScript array.

**Parameters:**
- `data` (string): CSV-formatted string.
- `delimiter` (string): Delimiter character (e.g., ",").

**Returns:**
- `string[][]`: Parsed array of rows.


{.break}
---


### getTokensFromCoords

`jspreadsheet.helpers.getTokensFromCoords(x1: Number, y1: Number, x2: Number, y2: Number, wsName?: String) => Array`

**Description:**  
Generates cell tokens from a range of coordinates.

**Parameters:**
- `x1, y1, x2, y2` (Number): Range coordinates.
- `wsName` (String, optional): Worksheet name.

**Returns:**
- `Array`: List of tokens (e.g., ["A1", "A2"]).


{.break}
---


## Examples

### Data Grid Helpers Example

{.ignore}
```javascript
// Returns A1
jspreadsheet.helpers.getCellNameFromCoords(0,0);
// Returns (4) [1, 0, 2, 3]
jspreadsheet.helpers.getCoordsFromRange('B1:C4');
// Also works with the worksheet instance. Returns 1,1
jspreadsheet.helpers.getCoordsFromCellName('B2');
```

```html
<html>
<script src="https://bossanova.uk/jspreadsheet/v5/jspreadsheet.js"></script>
<script src="https://jsuites.net/v5/jsuites.js"></script>
<link rel="stylesheet" href="https://bossanova.uk/jspreadsheet/v5/jspreadsheet.css" type="text/css"/>
<link rel="stylesheet" href="https://jsuites.net/v5/jsuites.css" type="text/css"/>

<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Material+Icons" />

<div id="spreadsheet"></div>

<p><input type='button' value='Get Range' class="jss_object" id='btn1' /> <div id="range"></div></p>

<script>
// Create the spreadsheet
let worksheets = jspreadsheet(document.getElementById('spreadsheet'), {
    worksheets: [{
        minDimensions: [6,6],
    }]
});

let range = document.getElementById('range');
document.getElementById('btn1').onclick = function() {
    range.textContent = worksheets[0].selectedCell;
}
</script>
</html>
```