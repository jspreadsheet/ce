title: Programmatically Data Grid Changes 
keywords: Jspreadsheet CE, Jexcel, JavaScript Data Grid, Spreadsheets, JavaScript tables, Excel-like data grid, web-based spreadsheets, data grid controls, data grid features
description: Create data grids with spreadsheet controls with Jspreadsheet CE.
canonical: https://bossanova.uk/jspreadsheet/v4/docs/programmatically-changes

# Methods

Jspreadsheet has a comprehensive number of native methods to programmatically interact with your javascript spreadsheet and its data.

[Go to a working example](/jspreadsheet/v4/examples/programmatically-updates)

  

## General Methods

| Method | Description | Example |  
| --- | --- | --- |  
| **getData** | Get the full or partial table data<br>@Param boolean onlyHighlighedCells - Get only highlighted cells | spreadsheet.getData([bool]); |  
| **getJson** | Get the full or partial table data in JSON format<br>@Param boolean onlyHighlighedCells - Get only highlighted cells | spreadsheet.getJson([bool]); |  
| **getRowData** | Get the data from one row by number<br>@Param integer rowNumber - Row number | spreadsheet.getRowData([int]); |  
| **setRowData** | Set the data from one row by number<br>@Param integer rowNumber - Row number<br>@Param array rowData - Row data | spreadsheet.setRowData([int], [array]); |  
| **getColumnData** | Get the data from one column by number<br>@Param integer columnNumber - Column number | spreadsheet.getColumnData([int]); |  
| **setColumnData** | Set the data from one column by number<br>@Param integer columnNumber - Column number<br>@Param array colData - Column data | spreadsheet.setColumnData([int], [array]); |  
| **setData** | Set the table data<br>@Param json newData - New JSON data, null will reload what is in memory. | spreadsheet.setData([json]); |  
| **setMerge** | Merge cells<br>@Param string columnName - Column name, such as A1.<br>@Param integer colspan - Number of columns<br>@Param integer rowspan - Number of rows | spreadsheet.setMerge([string], [int], [int]); |  
| **getMerge** | Get merged cells properties<br>@Param string columnName - Column name, such as A1. | spreadsheet.getMerge([string]); |  
| **removeMerge** | Destroy merged by column name<br>@Param string columnName - Column name, such as A1. | spreadsheet.removeMerge([string]); |  
| **destroyMerged** | Destroy all merged cells | spreadsheet.destroyMerge(); |  
| **getCell** | Get current cell DOM<br>@Param string columnName - String compatible with Excel, or as object. | spreadsheet.getCell([string]); |  
| **getLabel** | Get current cell DOM innerHTML<br>@Param string columnName - String compatible with Excel, or as object. | spreadsheet.getLabel([string]); |  
| **getValue** | Get current cell value<br>@Param mixed cellIdent - String compatible with Excel, or as object. | spreadsheet.getValue([string]); |  
| **getValueFromCoords** | Get value from coordinates<br>@Param integer x<br>@Param integer y | spreadsheet.getValueFromCoords([integer], [integer]); |  
| **setValue** | Change the cell value<br>@Param mixed cellIdent - String compatible with Excel, or as object.<br>@Param string Value - New value for the cell<br>@Param bool force - Update readonly columns | spreadsheet.setValue([string], [string], [bool]); |  
| **setValueFromCoords** | Set value from coordinates<br>@Param integer x<br>@Param integer y<br>@Param string Value - New value for the cell<br>@Param bool force - Update readonly columns | spreadsheet.setValueFromCoords([integer], [integer], [string], [bool]); |  
| **resetSelection** | Reset the table selection<br>@Param boolean executeBlur - Execute the blur from the table | spreadsheet.resetSelection([bool]); |  
| **updateSelection** | Select cells<br>@Param object startCell - Cell object<br>@Param object endCell - Cell object<br>@Param boolean ignoreEvents - Ignore onselection event | spreadsheet.updateSelection([cell], [cell], true); |  
| **updateSelectionFromCoords** | Select cells<br>@Param integer x1<br>@Param integer y1<br>@Param integer x2<br>@Param integer y2 | spreadsheet.updateSelectionFromCoords([integer], [integer], [integer], [integer]); |  
| **getWidth** | Get the current column width<br>@Param integer columnNumber - Column number starting at zero | spreadsheet.getWidth([integer]); |  
| **setWidth** | Change column width<br>@Param integer columnNumber - Column number starting at zero<br>@Param string newColumnWidth - New column width | spreadsheet.setWidth([integer], [integer]); |  
| **getHeight** | Get the current row height<br>@Param integer rowNumber - Row number starting at zero | spreadsheet.getHeight([integer]); |  
| **setHeight** | Change row height<br>@Param integer rowNumber - Row number starting at zero<br>@Param string newRowHeight - New row height | spreadsheet.setHeight([integer], [integer]); |  
| **getHeader** | Get the current header by column number<br>@Param integer columnNumber - Column number starting at zero | spreadsheet.getHeader([integer]); |  
| **getHeaders** | Get all header titles | spreadsheet.getHeaders(); |  
| **setHeader** | Change header by column<br>@Param integer columnNumber - Column number starting at zero<br>@Param string columnTitle - New header title | spreadsheet.setHeader([integer], [string]); |  
| **getStyle** | Get table or cell style<br>@Param mixed - Cell identification or null for the whole table. | spreadsheet.getStyle([string]); |  
| **setStyle** | Set cell(s) CSS style<br>@Param mixed - JSON with whole table style information or just one cell identification. Ex. A1.<br>@Param k [optional] - CSS key<br>@Param v [optional] - CSS value | spreadsheet.setStyle([object], [string], [string]); |  
| **resetStyle** | Remove all style from a cell<br>@Param string columnName - Column name, example: A1, B3, etc | spreadsheet.resetStyle([string]); |  
| **getComments** | Get cell comments<br>@Param mixed - Cell identification or null for the whole table. | spreadsheet.getComments([string]); |  
| **setComments** | Set cell comments<br>@Param cell - Cell identification<br>@Param text - Comments | spreadsheet.setComments([string], [string]); |  
| **orderBy** | Reorder a column ascending or descending<br>@Param integer columnNumber - Column number starting at zero<br>@Param smallint sortType - One will order DESC, zero will order ASC, anything else will toggle the current order | spreadsheet.orderBy([integer], [boolean]); |  
| **getConfig** | Get table definitions | spreadsheet.getConfig(); |  
| **insertColumn** | Add a new column<br>@Param mixed - Number of columns to be added or data to be added in one single column<br>@Param int columnNumber - Number of columns to be created<br>@Param boolean insertBefore<br>@Param object properties - Column properties | spreadsheet.insertColumn([mixed], [integer], [boolean], [object]); |  
| **deleteColumn** | Remove column by number<br>@Param integer columnNumber - Which column should be excluded starting at zero<br>@Param integer numOfColumns - Number of columns to be excluded from the reference column | spreadsheet.deleteColumn([integer], [integer]); |  
| **moveColumn** | Change the column position<br>@Param integer columnPosition<br>@Param integer newColumnPosition | spreadsheet.moveColumn([integer], [integer]); |  
| **insertRow** | Add a new row<br>@Param mixed - Number of blank lines to be inserted or a single array with the data of the new row<br>@Param integer rowNumber - Reference row number<br>@Param boolean insertBefore | spreadsheet.insertRow([mixed], [integer], [boolean]); |  
| **deleteRow** | Remove row by number<br>@Param integer rowNumber - Which row should be excluded starting at zero<br>@Param integer numOfRows - Number of lines to be excluded | spreadsheet.deleteRow([integer], [integer]); |  
| **moveRow** | Change the row position<br>@Param integer rowPosition<br>@Param integer newRowPosition | spreadsheet.moveRow([integer], [integer]); |  
| **download** | Get the current data as a CSV file<br>@Param bool - True to download parsed formulas. | spreadsheet.download([bool]); |  
| **getMeta** | Get the table or cell meta information<br>@Param mixed - Cell identification or null for the whole table. | spreadsheet.getMeta([string]); |  
| **setMeta** | Set the table or cell meta information<br>@Param mixed - JSON with whole table meta information. | spreadsheet.setMeta([mixed]); |  
| **fullscreen** | Toggle table fullscreen mode<br>@Param boolean fullscreen - Define fullscreen status as true or false | spreadsheet.fullscreen([bool]); |  
| **getSelectedRows** | Get the selected rows<br>@Param boolean asIds - Get the rowNumbers or row DOM elements | spreadsheet.getSelectedRows([bool]); |  
| **getSelectedColumns** | Get the selected columns | spreadsheet.getSelectedColumns(); |  
| **showIndex** | Show column of index numbers | spreadsheet.showIndex(); |  
| **hideIndex** | Hide column of index numbers | spreadsheet.hideIndex(); |  
| **search** | Search in the table, only if directive is enabled during initialization.<br>@Param string - Search for word | spreadsheet.search([string]); |  
| **resetSearch** | Reset search table | spreadsheet.resetSearch(); |  
| **whichPage** | Which page showing on Jspreadsheet - Valid only when pagination is true. | spreadsheet.whichPage(); |  
| **page** | Go to page number - Valid only when pagination is true.<br>@Param integer - Go to page number | spreadsheet.page([integer]); |  
| **undo** | Undo last changes | spreadsheet.undo(); |  
| **redo** | Redo changes | spreadsheet.redo(); |  



