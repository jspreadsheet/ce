title: Quick Reference
keywords: Jspreadsheet CE, Jexcel, JavaScript Data Grid, Spreadsheets, JavaScript tables, Excel-like data grid, web-based spreadsheets, data grid controls, data grid features
description: Quick Reference for Jexcel spreadsheet properties

[Back to Documentation](/jspreadsheet/v2/docs "Back to the documentation section")

# The javascript spreadsheet quick reference

## Methods

| Method                                                                                                                                                                                                     | Description                                                                                     |
|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------|
| **getData: Get the full or partial table data**  <br>@Param boolan onlyHighlighedCells - Get only highlighted cells                                                                                        | $('#my').jexcel('getData', false);                                                              |
| **setData: Update the table data**  <br>@Param json newData - New json data, null will reload what is in memory.<br>@Param boolean ignoreSpare - ignore configuration of minimal spareColumn/spareRows     | $('#my').jexcel('setData', [json], false);                                                      |
| **insertColumn: add a new column**  <br>@Param integer numberOfColumns - Number of columns should be added<br>@Param string headerTitle - Header title                                                     | $('#my').jexcel('insertColumn', 1, { header:'Title' });                                         |
| **deleteColumn: remove column by number**  <br>@Param integer columnNumber - Which column should be excluded starting on zero                                                                              | $('#my').jexcel('deleteColumn', 1);                                                             |                                                            
| **insertRow: add a new row**  <br>@Param integer numberOfRows - Number of rows should be added                                                                                                             | $('#my').jexcel('insertRow', 1);                                                                |                                                           
| **deleteRow: remove row by number**  <br>@Param integer rowNumber - Which row should be excluded starting on zero                                                                                          | $('#my').jexcel('deleteRow', 1);                                                                |
| **getHeader: get the current header by column number**  <br>@Param integer columnNumber - Column number starting on zero                                                                                   | $('#my').jexcel('getHeader', 2);                                                                |
| **setHeader: change header by column**  <br>@Param integer columnNumber - column number starting on zero<br>@Param string columnTitle - New header title                                                   | $('#my').jexcel('setHeader', 1, 'Title');                                                       |
| **getWidth: get the current column width**  <br>@Param integer columnNumber - column number starting on zero                                                                                               | $('#my').jexcel('getWidth', 2);                                                                 |
| **setWidth: change column width**  <br>@Param integer columnNumber - column number starting on zero<br>@Param string newColumnWidth - New column width                                                     | $('#my').jexcel('setWidth', 1, 100);                                                            |
| **orderBy: will reorder a column asc or desc**  <br>@Param integer columnNumber - column number starting on zero<br>@Param smallint sortType - Zero will toggle current option, one for desc, two for asc  | $('#my').jexcel('orderBy', 2);                                                                  |
| **getValue: get current cell value**  <br>@Param mixed cellIdent - str compatible with excel, or as object.                                                                                                | $('#my').jexcel('getValue', 'A1');                                                              |
| **setValue: change the cell value**  <br>@Param mixed cellIdent - str compatible with excel, or as object.<br>@Param string Value - new value for the cell                                                 | $('#my').jexcel('setValue', 'A1');                                                              | 
| **updateSelection: select cells**  <br>@Param object startCell - cell object<br>@Param object endCell - cell object<br>@Param boolean ignoreEvents - ignore onselection event                              | $('#my').jexcel('updateSelection', [cell], [cell], true);                                       |
| **download: get the current data as a CSV file.**  <br>@Param none                                                                                                                                         | $('#my').jexcel('download');                                                                    |
| **getConfig: get the current value of one configuration by key** <br>@Param string configuration key                                                                                                       | $('#my').jexcel('getConfig', 'allowInsertColumn');                                              |
| **setConfig: set the value of one configuration by key**  <br>@Param string configuration key<br>@Param mixed configuration value                                                                          | $('#my').jexcel('setConfig', 'allowInsertColumn', true);                                        |
| **download: get the current data as a CSV file.**  <br>@Param none                                                                                                                                         | $('#my').jexcel('download');                                                                    |
| **getStyle: get table or cell style**  <br>@Param mixed - cell identification or null for the whole table.                                                                                                 | $('#my').jexcel('getStyle', 'A1');                                                              |
| **setStyle: set cell(s) CSS style**  <br>@Param mixed - json with whole table style information or just one cell identification. Ex. A1.<br>@Param k [optional]- CSS key<br>@Param v [optional]- CSS value | $('#my').jexcel('setSyle', [ { A1:'background-color:red' }, { B1: 'color:red'} ]);              |
| **getComments: get cell comments**  <br>@Param mixed - cell identification or null for the whole table.                                                                                                    | $('#my').jexcel('getComments', 'A1');                                                           |
| **setComments: set cell comments**  <br>@Param cell - cell identification<br>@Param text - comments                                                                                                        | $('#my').jexcel('setComments', 'A1', 'My cell comments!');                                      |
| **getMeta: get the table or cell meta information**  <br>@Param mixed - cell identification or null for the whole table.                                                                                   | $('#my').jexcel('getMeta', 'A1');                                                               |
| **setMeta: set the table or cell meta information**  <br>@Param mixed - json with whole table meta information.                                                                                            | $('#my').jexcel('setMeta', [ A1: { info1:'test' }, { B1: { info2:'test2', info3:'test3'} } ]);  |
  
[Working example](/jspreadsheet/v2/docs/programmatically-changes)

  

## Events

| Event| description  |
| ---|---  |
| **onload** | This method is called when the method setData  |
| **onbeforechange** | Before a column value is changed.  |
| **onchange** | After a column value is changed.  |
| **onafterchange** | After all change events is performed.  |
| **oninsertrow** | After a new row is inserted.  |
| **ondeleterow** | After a row is excluded.  |
| **oninsertcolumn** | After a new column is inserted.  |
| **ondeletecolumn** | After a column is excluded.  |
| **onselection** | On the selection is changed.  |
| **onsort** | After a colum is sorted.  |
| **onresize** | After a colum is resized.  |
| **onmoverow** | After a row is moved to a new position.  |
| **onfocus** | On table focus  |
| **onblur** | On table blur  |
  
[Example on handling events on your javascript spreadsheet](/jspreadsheet/v2/examples/tracking-changes-on-the-spreadsheet)

## Initialization parameters

| Parameter| description  |
| ---|---  |
| **columns** | Column type, dropdown options, text wrapping,marking, etc. |
| **colHeaders** | Column header titles  |
| **colWidths** | Column widths: width in px.  |
| **colAlignments** | Column alignments: left, right, center.  |
| **colHeaderClasses** | Column custom CSS classes  |
| **defaultColWidth** | Default width for a new column  |
| **minSpareRows** | Minimum number of spare rows  |
| **minSpareCols** | Minimum number of spare cols  |
| **minDimensions** | Minimum table dimensions: [cols,rows]  |
| **contextMenu** | Context menu content: function() { return customMenu }  |
| **columnSorting** | Allow column sorting: bool  |
| **columnResize** | Allow column resizing: bool  |
| **rowDrag** | Allow row dragging: bool  |
| **editable** | Allow table edition: bool  |
| **allowInsertRow** | Allow insert a new row: bool  |
| **allowManualInsertRow** | Allow user to insert a new row: bool  |
| **allowInsertColumn** | Allow insert a new column: bool  |
| **allowManualInsertColumn** | Allow user to create a new column: bool |
| **allowDeleteRow** | Allow delete a row: bool  |
| **allowDeleteColumn** | Allow delete a column: bool  |
| **wordWrap** | Global text wrapping: bool  |
| **csvFileName** | CSV default file name: string  |
| **selectionCopy** | Allow selection copy: bool  |
| **tableOverflow** | Allow table overflow: bool  |
| **tableHeight** | Force the max height of the table  |
| **tableWidth** | Force the max width of the table  |
| **allowComments** | Allow comments over the cells  |
| **toolbar** | Add custom toolbars |

