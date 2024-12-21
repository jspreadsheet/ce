title: Quick Reference
keywords: Jspreadsheet CE, Jexcel, JavaScript Data Grid, Spreadsheets, JavaScript tables, Excel-like data grid, web-based spreadsheets, data grid controls, data grid features
description: Quick Reference of the jspreadsheet properties
canonical: https://bossanova.uk/jspreadsheet/v4/docs/quick-reference

# Quick reference

  

## Methods

| Method                                                                                                                                                                                                                                                                           | Example                                                                            |  
|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------|  
| **getData:** Get the full or partial table data  <br> @Param boolean onlyHighlighedCells - Get only highlighted cells                                                                                                                                                            | spreadsheet.getData([bool]);                                                       |  
| **getJson:** Get the full or partial table data in JSON format  <br> @Param boolean onlyHighlighedCells - Get only highlighted cells                                                                                                                                             | spreadsheet.getJson([bool]);                                                       |  
| **getRowData:** Get the data from one row by number  <br> @Param integer rowNumber - Row number                                                                                                                                                                                  | spreadsheet.getRowData([int]);                                                     |  
| **setRowData:** Set the data from one row by number  <br> @Param integer rowNumber - Row number  <br> @Param array rowData - Row data                                                                                                                                            | spreadsheet.setRowData([int], [array]);                                            |  
| **getColumnData:** Get the data from one column by number  <br> @Param integer columnNumber - Column number                                                                                                                                                                      | spreadsheet.getColumnData([int]);                                                  |  
| **setColumnData:** Set the data from one column by number  <br> @Param integer columnNumber - Column number  <br> @Param array colData - Column data                                                                                                                             | spreadsheet.setColumnData([int], [array]);                                         |  
| **setData:** Set the table data  <br> @Param json newData - New JSON data, null will reload what is in memory.                                                                                                                                                                   | spreadsheet.setData([json]);                                                       |  
| **setMerge:** Merge cells  <br> @Param string columnName - Column name, such as A1.  <br> @Param integer colspan - Number of columns  <br> @Param integer rowspan - Number of rows                                                                                               | spreadsheet.setMerge([string], [int], [int]);                                      |  
| **getMerge:** Get merged cells properties  <br> @Param string columnName - Column name, such as A1.                                                                                                                                                                              | spreadsheet.getMerge([string]);                                                    |  
| **removeMerge:** Destroy merged by column name  <br> @Param string columnName - Column name, such as A1.                                                                                                                                                                         | spreadsheet.removeMerge([string]);                                                 |  
| **destroyMerged:** Destroy all merged cells                                                                                                                                                                                                                                      | spreadsheet.destroyMerge();                                                        |  
| **getCell** : get current cell DOM  <br> @Param string columnName - str compatible with Excel, or as object.                                                                                                                                                                     | spreadsheet.getCell([string]);                                                     |  
| **getLabel** : get current cell DOM innerHTML  <br> @Param string columnName - str compatible with Excel, or as object.                                                                                                                                                          | spreadsheet.getLabel([string]);                                                    |  
| **getValue:** get current cell value  <br> @Param mixed cellIdent - str compatible with Excel, or as object.                                                                                                                                                                     | spreadsheet.getValue([string]);                                                    |  
| **getValueFromCoords:** get value from coords  <br> @Param integer x  <br> @Param integer y                                                                                                                                                                                      | spreadsheet.getValueFromCoords([integer], [integer]);                              |  
| **setValue:** change the cell value  <br> @Param mixed cellIdent - str compatible with Excel, or as object.  <br> @Param string Value - new value for the cell  <br> @Param bool force - update readonly columns                                                                 | spreadsheet.setValue([string], [string], [bool]);                                  |  
| **setValueFromCoords:** get value from coords  <br> @Param integer x  <br> @Param integer y  <br> @Param string Value - new value for the cell  <br> @Param bool force - update readonly columns                                                                                 | spreadsheet.setValueFromCoords([integer], [integer], [string], [bool]);            |  
| **resetSelection:** Reset the table selection  <br> @Param boolean executeBlur - execute the blur from the table                                                                                                                                                                 | spreadsheet.resetSelection([bool]);                                                |  
| **updateSelection:** select cells  <br> @Param object startCell - cell object  <br> @Param object endCell - cell object  <br> @Param boolean ignoreEvents - ignore onselection event                                                                                             | spreadsheet.updateSelection([cell], [cell], true);                                 |  
| **updateSelectionFromCoords:** select cells  <br> @Param integer x1  <br> @Param integer y1  <br> @Param integer x2  <br> @Param integer y2                                                                                                                                      | spreadsheet.updateSelectionFromCoords([integer], [integer], [integer], [integer]); |  
| **getWidth:** get the current column width  <br> @Param integer columnNumber - column number starting on zero                                                                                                                                                                    | spreadsheet.getWidth([integer]);                                                   |  
| **setWidth:** change column width  <br> @Param integer columnNumber - column number starting on zero  <br> @Param string newColumnWidth - New column width                                                                                                                       | spreadsheet.setWidth([integer], [integer]);                                        |  
| **getHeight:** get the current row height  <br> @Param integer rowNumber - row number starting on zero                                                                                                                                                                           | spreadsheet.getHeight([integer]);                                                  |  
| **setHeight:** change row height  <br> @Param integer rowNumber - row number starting on zero  <br> @Param string newRowHeight- New row height                                                                                                                                   | spreadsheet.setHeight([integer], [integer]);                                       |  
| **getHeader:** get the current header by column number  <br> @Param integer columnNumber - column number starting on zero                                                                                                                                                        | spreadsheet.getHeader([integer]);                                                  |  
| **getHeaders:** get all header titles                                                                                                                                                                                                                                            | spreadsheet.getHeaders();                                                          |  
| **setHeader:** change header by column  <br> @Param integer columnNumber - column number starting on zero  <br> @Param string columnTitle - New header title                                                                                                                     | spreadsheet.setHeader([integer], [string]);                                        |  
| **getStyle:** get table or cell style  <br> @Param mixed - cell identification or null for the whole table.                                                                                                                                                                      | spreadsheet.getStyle([string]));                                                   |  
| **setStyle:** set cell(s) CSS style  <br> @Param mixed - json with whole table style information or just one cell identification. Ex. A1.  <br> @Param k [optional]- CSS key  <br> @Param v [optional]- CSS value                                                                | spreadsheet.setSyle([object], [string], [string]);                                 |  
| **resetStyle:** remove all style from a cell  <br> @Param string columnName - Column name, example: A1, B3, etc                                                                                                                                                                  | spreadsheet.resetStyle([string]);                                                  |  
| **getComments:** get cell comments  <br> @Param mixed - cell identification or null for the whole table.                                                                                                                                                                         | spreadsheet.getComments([string]);                                                 |  
| **setComments:** set cell comments  <br> @Param cell - cell identification  <br> @Param text - comments                                                                                                                                                                          | spreadsheet.setComments([string], [string]);                                       |  
| **orderBy:** reorder a column asc or desc  <br> @Param integer columnNumber - column number starting on zero  <br> @Param smallint sortType - One will order DESC, zero will order ASC, anything else will toggle the current order                                              | spreadsheet.orderBy([integer], [boolean]);                                         |  
| **getConfig:** get table definitions                                                                                                                                                                                                                                             | spreadsheet.getConfig();                                                           |  
| **insertColumn:** add a new column  <br> @Param mixed - num of columns to be added or data to be added in one single column  <br> @Param int columnNumber - number of columns to be created  <br> @Param boolean insertBefore  <br> @Param object properties - column properties | spreadsheet.insertColumn([mixed], [integer], [boolean], [object]);                 |  
| **deleteColumn:** remove column by number  <br> @Param integer columnNumber - Which column should be excluded starting on zero  <br> @Param integer numOfColumns - number of columns to be excluded from the reference column                                                    | spreadsheet.deleteColumn([integer], [integer]);                                    |  
| **moveColumn:** change the column position  <br> @Param integer columnPosition  <br> @Param integer newColumnPosition                                                                                                                                                            | spreadsheet.moveColumn([integer], [integer]);                                      |  
| **insertRow:** add a new row  <br> @Param mixed - number of blank lines to be insert or a single array with the data of the new row  <br> @Param integer rowNumber - reference row number  <br> @Param boolean insertBefore                                                      | spreadsheet.insertRow([mixed], [integer], [boolean]);                              |  
| **deleteRow:** remove row by number  <br> @Param integer rowNumber - Which row should be excluded starting on zero  <br> @Param integer numOfRows - number of lines to be excluded                                                                                               | spreadsheet.deleteRow([integer], [integer]);                                       |  
| **moveRow:** change the row position  <br> @Param integer rowPosition  <br> @Param integer newRowPosition                                                                                                                                                                        | spreadsheet.moveRow([integer], [integer]);                                         |  
| **download:** get the current data as a CSV file  <br> @Param bool - true to download parsed formulas.                                                                                                                                                                           | spreadsheet.download([bool]);                                                      |  
| **getMeta:** get the table or cell meta information  <br> @Param mixed - cell identification or null for the whole table.                                                                                                                                                        | spreadsheet.getMeta([string]);                                                     |  
| **setMeta:** set the table or cell meta information  <br> @Param mixed - json with whole table meta information.                                                                                                                                                                 | spreadsheet.setMeta[mixed]);                                                       |  
| **fullscreen:** Toogle table fullscreen mode  <br> @Param boolean fullscreen - define fullscreen status as true or false                                                                                                                                                         | spreadsheet.fullscreen([bool]);                                                    |  
| **getSelectedRows:** Get the selected rows  <br> @Param boolean asIds - Get the rowNumbers or row DOM elements                                                                                                                                                                   | spreadsheet.getSelectedRows([bool]);                                               |  
| **getSelectedColumns:** Get the selected columns  <br> @Param boolean asIds - Get the colNumbers or row DOM elements                                                                                                                                                             | spreadsheet.getSelectedColumns([bool]);                                            |  
| **showColumn:** show column by number                                                                                                                                                                                                                                            | spreadsheet.showIndex([int]);                                                      |  
| **hideColumn:** hide column by number                                                                                                                                                                                                                                            | spreadsheet.hideColumn([int]);                                                     |  
| **showIndex:** show column of index numbers                                                                                                                                                                                                                                      | spreadsheet.showIndex();                                                           |  
| **hideIndex:** hide column of index numbers                                                                                                                                                                                                                                      | spreadsheet.hideIndex();                                                           |  
| **search:** search in the table, only if directive is enabled during initialization.  <br> @Param string - Search for word                                                                                                                                                       | spreadsheet.search([string]);                                                      |  
| **resetSearch:** reset search table                                                                                                                                                                                                                                              | spreadsheet.resetSearch();                                                         |  
| **whichPage:** Which page showing on Jspreadsheet - Valid only when pagination is true.                                                                                                                                                                                          | spreadsheet.whichPage();                                                           |  
| **page:** Go to page number- Valid only when pagination is true.  <br> @Param integer - Go to page number                                                                                                                                                                        | spreadsheet.page([integer]);                                                       |  
| **undo:** Undo last changes                                                                                                                                                                                                                                                      | spreadsheet.undo();                                                                |  
| **redo:** Redo changes                                                                                                                                                                                                                                                           | spreadsheet.redo();                                                                |  


  
[Working example](/jspreadsheet/v4/examples/programmatically-updates)

  
  
  

## Events

| Event | Description |
| --- | --- |
| **onload** | This method is called when the method setData |
| **onbeforechange** | Before a column value is changed. NOTE: It is possible to overwrite the original value, by returning a new value on this method. v3.4.0+ |
| **onchange** | After a column value is changed. |
| **onafterchanges** | After all changes are applied in the table. |
| **onpaste** | After a paste action is performed in the JavaScript table. |
| **onbeforepaste** | Before the paste action is performed. Used to parse any input data, should return the data. |
| **oninsertrow** | After a new row is inserted. |
| **onbeforeinsertrow** | Before a new row is inserted. You can cancel the insert event by returning false. |
| **ondeleterow** | After a row is excluded. |
| **onbeforedeleterow** | Before a row is deleted. You can cancel the delete event by returning false. |
| **oninsertcolumn** | After a new column is inserted. |
| **onbeforeinsertcolumn** | Before a new column is inserted. You can cancel the insert event by returning false. |
| **ondeletecolumn** | After a column is excluded. |
| **onbeforedeletecolumn** | Before a column is excluded. You can cancel the insert event by returning false. |
| **onmoverow** | After a row is moved to a new position. |
| **onmovecolumn** | After a column is moved to a new position. |
| **onresizerow** | After a change in row height. |
| **onresizecolumn** | After a change in column width. |
| **onselection** | On the selection is changed. |
| **onsort** | After a column is sorted. |
| **onfocus** | On table focus. |
| **onblur** | On table blur. |
| **onmerge** | On column merge. |
| **onchangeheader** | On header change. |
| **onundo** | On undo is applied. |
| **onredo** | On redo is applied. |
| **oneditionstart** | When an openEditor is called. |
| **oneditionend** | When a closeEditor is called. |
| **onchangestyle** | When a setStyle is called. |
| **onchangemeta** | When a setMeta is called. |
| **onchangepage** | When the page is changed. |

  
[Example on handling events on Jspreadsheet](/jspreadsheet/v4/examples/events)

  
  

## Initialization

| Parameter | Description |
| --- | --- |
| **url** | Load an external JSON file from this URL: string |
| **data** | Load this data into the JavaScript table: array |
| **copyCompatibility** | When true, copy and export will bring formula results; if false, will bring formulas: boolean |
| **rows** | Row properties: height: object |
| **columns** | Column type, title, width, align, dropdown options, text wrapping, mask, etc.: object |
| **defaultColWidth** | Default width for a new column: integer |
| **defaultColAlign** | Default align for a new column: [center, left, right] |
| **minSpareRows** | Minimum number of spare rows: integer |
| **minSpareCols** | Minimum number of spare columns: integer |
| **minDimensions** | Minimum table dimensions: [columns, rows] |
| **allowExport** | Allow table export: boolean |
| **includeHeadersOnDownload** | Include header titles on download: boolean |
| **columnSorting** | Allow column sorting: boolean |
| **columnDrag** | Allow column dragging: boolean |
| **columnResize** | Allow column resizing: boolean |
| **rowResize** | Allow row resizing: boolean |
| **rowDrag** | Allow row dragging: boolean |
| **editable** | Allow table edition: boolean |
| **allowInsertRow** | Allow insertion of a new row: boolean |
| **allowManualInsertRow** | Allow user to insert a new row: boolean |
| **allowInsertColumn** | Allow insertion of a new column: boolean |
| **allowManualInsertColumn** | Allow user to create a new column: boolean |
| **allowDeleteRow** | Allow deletion of a row: boolean |
| **allowDeleteColumn** | Allow deletion of a column: boolean |
| **allowRenameColumn** | Allow renaming of a column: boolean |
| **allowComments** | Allow comments over the cells: boolean |
| **wordWrap** | Global text wrapping: boolean |
| **csv** | Load an external CSV file from this URL: string |
| **csvFileName** | Default filename for a download method: string |
| **csvHeaders** | Load header titles from the CSV file: boolean |
| **csvDelimiter** | Default delimiter for the CSV file: string |
| **selectionCopy** | Allow selection copy: boolean |
| **mergeCells** | Cells to be merged in the table initialization: object |
| **toolbar** | Add custom toolbars: object |
| **search** | Allow search in the table: boolean |
| **pagination** | Break the table by pages: integer |
| **paginationOptions** | Number of records per page: [25, 50, 75, 100], for example |
| **fullscreen** | Fullscreen mode: boolean |
| **lazyLoading** | Activate the table lazy loading: boolean |
| **loadingSpin** | Activate the loading spin: boolean |
| **tableOverflow** | Allow table overflow: boolean |
| **tableHeight** | Force the maximum height of the table: CSS String |
| **tableWidth** | Force the maximum width of the table: CSS String |
| **meta** | Meta information: object |
| **style** | Cells style in the table initialization: object |
| **parseFormulas** | Enable execution of formulas inside the table: boolean |
| **autoIncrement** | Auto-increment actions when using the dragging corner: boolean |
| **updateTable** | Method to configure custom script execution. NOTE: This does not work with lazyLoading, Pagination, or Search options. |
| **nestedHeaders** | Define the nested headers, including title, colspan, etc.: object |
| **contextMenu** | Context menu content: function() { return customMenu } |
| **text** | All messages to be customized: object |

  
  

## Translations

| Key| Default value  |
| ---|---  |
| **noRecordsFound** | No records found |
| **showingPage** | Showing page {0} of {1} entries |
| **show** | Show |
| **entries** | entries |
| **insertANewColumnBefore** | Insert a new column before |
| **insertANewColumnAfter** | Insert a new column after |
| **deleteSelectedColumns** | Delete selected columns |
| **renameThisColumn** | Rename this column |
| **orderAscending** | Order ascending |
| **orderDescending** | Order descending |
| **insertANewRowBefore** | Insert a new row before |
| **insertANewRowAfter** | Insert a new row after |
| **deleteSelectedRows** | Delete selected rows |
| **editComments** | Edit comments |
| **addComments** | Add comments |
| **comments** | Comments |
| **clearComments** | Clear comments |
| **copy** | Copy... |
| **paste** | Paste... |
| **saveAs** | Save as... |
| **about** | About |
| **areYouSureToDeleteTheSelectedRows** | Are you sure to delete the selected rows? |
| **areYouSureToDeleteTheSelectedColumns** | Are you sure to delete the selected columns? |
| **thisActionWillDestroyAnyExistingMergedCellsAreYouSure** | This action will destroy any existing merged cells. Are you sure? |
| **thisActionWillClearYourSearchResultsAreYouSure** | This action will clear your search results. Are you sure? |
| **thereIsAConflictWithAnotherMergedCell** | There is a conflict with another merged cell |
| **invalidMergeProperties** | Invalid merged properties |
| **cellAlreadyMerged** | Cell already merged |
| **noCellsSelected** | No cells selected |

  
[Working example](/jspreadsheet/v4/examples/translations)

