title: Jspreadsheet Upgrade Guide: v4 to v5
keywords: Jspreadsheet upgrade, version 4 to 5, Jspreadsheet CE migration, breaking changes, Jspreadsheet compatibility, JavaScript data grid, spreadsheet customization, migration guide
description: Upgrade guide from Jspreadsheet CE v4 to v5. Learn about breaking changes and updated features for a smooth code transition.

# Jspreadsheet Upgrade from v4 to v5

## Overview

The latest update to Jspreadsheet CE introduces significant enhancements, simplifying customization and improving compatibility across all distributions. Key updates include structural refinements, increased extensibility, and standardized functionality. Upgrading from version 4 to version 5 includes breaking changes due to updates in properties, methods, and events. This document outlines the critical adjustments required to transition your existing code to the new version.

> Be aware that upgrading from version 4 to version 5 introduces breaking changes resulting from updates to properties, methods, and events.

### Spreadsheet vs. Worksheets

Jspreadsheet CE introduces two distinct levels: the spreadsheet level and the worksheet level. This separation avoids redundancy by centralizing elements that should not be duplicated across each worksheet, such as toolbars or event declarations.

#### Version 4

In version 4, all properties were defined within a single object.

{.ignore}

```javascript
jspreadsheet(document.getElementById("spreadsheet"), {
  toolbar: true,
  minDimensions: [4, 4],
  onchange: function () {
    // something
  },
});
```

#### Version 5

In version 5, the worksheets attribute allows you to declare multiple worksheets, each with specific properties, while maintaining centralized common configurations at the spreadsheet level.

{.ignore}

```javascript
// Create your spreadsheets
jspreadsheet(document.getElementById("spreadsheet"), {
  toolbar: true,
  worksheets: [
    {
      minDimensions: [4, 4],
    },
    // More worksheets
  ],
  onchange: function () {
    // something
  },
});
```

### Instances

When creating a new **spreadsheet**, Jspreadsheet returns an array of **worksheet** instances. Each worksheet object includes a `parent` property, allowing access to spreadsheet-level features.

{.ignore}

```javascript
// Create your spreadsheets
let worksheets = jspreadsheet(document.getElementById("spreadsheet"), {
  worksheets: [
    {
      minDimensions: [4, 4],
    },
  ],
});

// Get the spreadsheet data
worksheets[0].getData();
// Show toolbar
worksheets[0].parent.showToolbar();
```

### Translations

From version 5, translations can be managed globally using `jspreadsheet.setDictionary`. This method accepts an object where the keys are the original English texts and the values are their translations.

#### Version 4

In version 4, translations were defined directly within the spreadsheet instance:

{.ignore}

```javascript
jspreadsheet(document.getElementById("spreadsheet"), {
  minDimensions: [4, 4],
  text: {
    noRecordsFound: "Nenhum registro encontrado",
    show: "Show",
    // many other translations
  },
});
```

#### Version 5

In version 5, you define translations globally using setDictionary, making it easier to manage and apply them across all instances:

{.ignore}

```javascript
// Translate all application
jspreadsheet.setDictionary({
  "No records found": "Nenhum registro encontrado",
  Show: "Exibir",
  //...
});

// Create your spreadsheets
jspreadsheet(document.getElementById("spreadsheet"), {
  worksheets: [
    {
      minDimensions: [4, 4],
    },
  ],
});
```

### Plugin and Editor Support

Jspreadsheet CE now includes plugin support, offering developers enhanced flexibility and the ability to extend functionality. Editors align more closely with the Pro version, ensuring more across the different distributions.

{.ignore}

```javascript
// Create your spreadsheets
jspreadsheet(document.getElementById("spreadsheet"), {
  worksheets: [
    {
      minDimensions: [4, 4],
      columns: [{ type: myEditor }], // Custom editors
    },
  ],
  plugins: { myPlugin }, // Plugin declaration
});
```

## Library Level

### Library Level Property Updates

| Status                                  | Property                              | Description                                                                                                   |
| --------------------------------------- | ------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| _New_{.info-label .new}                 | `destroyAll`                          | Destroys all spreadsheets across all namespaces.                                                              |
| _New_{.info-label .new}                 | `getWorksheetInstanceByName`{.nowrap} | Retrieves a worksheet by its name and namespace. Can also return a namespace depending on the first argument. |
| _New_{.info-label .new}                 | `setDictionary`                       | Adds a helper for defining new translations.                                                                  |
| _Removed_{.info-label .removed}         | `tabs`                                | Removed as it is no longer necessary since CE always creates a spreadsheet by default.                        |
| _Removed_{.info-label .removed}         | `createTabs`                          | Removed as it is no longer necessary since CE now always creates a spreadsheet by default.                    |
| _Removed_{.info-label .removed .nowrap} | `getColumnName`                       | Removed because this functionality already exists in the helpers.                                             |

### Helpers

| Status                          | Method                    | Description                                                              |
| ------------------------------- | ------------------------- | ------------------------------------------------------------------------ |
| _New_{.info-label .new}         | `getCoordsFromRange`      | Retrieves coordinates from a specified range.                            |
| _Updated_{.info-label .updated} | `createFromTable`         | Now functions like the previous library-level method with the same name. |
| _Updated_{.info-label .updated} | `getColumnNameFromCoords` | Renamed to `getCellNameFromCoords`.                                      |
| _Updated_{.info-label .updated} | `getCoordsFromColumnName` | Renamed to `getCoordsFromCellName`.                                      |
| _Removed_{.info-label .removed} | `injectArray`             | Removed as it was not documented.                                        |

## Spreadsheet Level

### Settings

| Status                  | Property        | Description                                                                                        |
| ----------------------- | --------------- | -------------------------------------------------------------------------------------------------- |
| _New_{.info-label .new} | `parseHTML`     | Similar functionality to the previous `stripHTML` property.                                        |
| _New_{.info-label .new} | `debugFormulas` | Enables formula debugging. Debugging was previously always enabled by default but is now disabled. |
| _New_{.info-label .new} | `fullscreen`    | Defines a spreadsheet as fullscreen.                                                               |

### Toolbars

| Status                  | Method        | Description                                      |
| ----------------------- | ------------- | ------------------------------------------------ |
| _New_{.info-label .new} | `hideToolbar` | Hides the toolbar.                               |
| _New_{.info-label .new} | `showToolbar` | Displays the toolbar using the current settings. |

### Events

All events are now defined at the spreadsheet level. Except for the `onload`, `onbeforesave`, and `onsave` events, all other events now receive the worksheet instance as their first argument. Additional changes to method arguments have also been introduced.

| Status                                  | Event                           | Description                                                                                                           |
| --------------------------------------- | ------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| _New_{.info-label .new}                 | `onbeforeformula`               | Intercepts formulas before they are calculated.                                                                       |
| _New_{.info-label .new}                 | `onbeforeselection`             | Intercepts cell selection and cancels it if `false` is returned.                                                      |
| _New_{.info-label .new}                 | `oncreatecell`                  | Triggered when a cell is created.                                                                                     |
| _New_{.info-label .new}                 | `oncreateworksheet`             | Triggered when a worksheet is created.                                                                                |
| _New_{.info-label .new}                 | `ondeleteworksheet`             | Triggered when a worksheet is deleted.                                                                                |
| _Updated_{.info-label .updated}         | `onafterchanges`                | All arguments for this event have been updated.                                                                       |
| _Updated_{.info-label .updated}         | `onbeforedeletecolumn`{.nowrap} | All arguments for this event have been updated.                                                                       |
| _Updated_{.info-label .updated}         | `onbeforedeleterow`             | All arguments for this event have been updated.                                                                       |
| _Updated_{.info-label .updated}         | `onbeforeinsertcolumn`          | All arguments for this event have been updated.                                                                       |
| _Updated_{.info-label .updated}         | `onbeforeinsertrow`             | All arguments for this event have been updated.                                                                       |
| _Updated_{.info-label .updated}         | `onbeforepaste`                 | The second argument is a 2D array of objects with a "value" property representing the values to be pasted.            |
| _Updated_{.info-label .updated}         | `onbeforesave`                  | The first argument is now the spreadsheet instance.                                                                   |
| _Updated_{.info-label .updated}         | `onchangeheader`                | The third and fourth arguments for this event have been swapped.                                                      |
| _Updated_{.info-label .updated}         | `onchangemeta`                  | The second argument is now always an object containing the changes. The third and fourth arguments have been removed. |
| _Updated_{.info-label .updated}         | `onchangepage`                  | This event now includes a fourth argument for the number of items per page.                                           |
| _Updated_{.info-label .updated}         | `onchangestyle`                 | All arguments for this event have been updated.                                                                       |
| _Updated_{.info-label .updated}         | `oncopy`                        | Can cancel the copy action or override the copied value.                                                              |
| _Updated_{.info-label .updated}         | `oncreateeditor`                | The fifth argument is always `null`, and a new fifth argument has been added for the column configuration.            |
| _Updated_{.info-label .updated}         | `ondeletecolumn`                | All arguments for this event have been updated.                                                                       |
| _Updated_{.info-label .updated}         | `ondeleterow`                   | All arguments for this event have been updated.                                                                       |
| _Updated_{.info-label .updated}         | `oninsertcolumn`                | All arguments for this event have been updated.                                                                       |
| _Updated_{.info-label .updated}         | `oninsertrow`                   | All arguments for this event have been updated.                                                                       |
| _Updated_{.info-label .updated}         | `onload`                        | The first argument is now the spreadsheet instance.                                                                   |
| _Updated_{.info-label .updated}         | `onmerge`                       | All arguments for this event have been updated.                                                                       |
| _Updated_{.info-label .updated}         | `onmovecolumn`                  | This event now includes a fourth argument indicating the number of columns moved.                                     |
| _Updated_{.info-label .updated}         | `onmoverow`                     | This event now includes a fourth argument indicating the number of rows moved.                                        |
| _Updated_{.info-label .updated}         | `onpaste`                       | All arguments for this event have been updated.                                                                       |
| _Updated_{.info-label .updated}         | `onredo`                        | The second argument has been updated based on the method the event refers to.                                         |
| _Updated_{.info-label .updated}         | `onsave`                        | The first argument is now the spreadsheet instance.                                                                   |
| _Updated_{.info-label .updated}         | `onsort`                        | Now includes a fourth argument, an array representing the new order of rows.                                          |
| _Updated_{.info-label .updated .nowrap} | `onundo`                        | The second argument has been updated based on the method the event refers to.                                         |

## Worksheets Updates

### Attributes

| Status                                  | Property                        | Description                                                                                                                                                         |
| --------------------------------------- | ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _Updated_{.info-label .updated}         | `highlighted`                   | Now stores records instead of just cell tags.                                                                                                                       |
| _Updated_{.info-label .updated}         | `csvHeaders`                    | The default value for this property is now `false`.                                                                                                                 |
| _Updated_{.info-label .updated}         | `nestedHeaders`                 | Now requires a two-dimensional array.                                                                                                                               |
| _Updated_{.info-label .updated}         | `ignoreEvents`                  | Now operates at the spreadsheet level.                                                                                                                              |
| _Updated_{.info-label .updated}         | `options`                       | Updated to no longer set default values for several properties.                                                                                                     |
| _Updated_{.info-label .updated}         | `records`                       | Now a 2D array containing objects with cell coordinates and corresponding HTML elements.                                                                            |
| _Updated_{.info-label .updated}         | `rows`                          | Now an array of objects with the HTML element for each row and index.                                                                                               |
| _Updated_{.info-label .updated}         | `persistance`                   | Renamed to `persistence`.                                                                                                                                           |
| _Updated_{.info-label .updated}         | `rowResize`                     | The default value for this property is now `true`.                                                                                                                  |
| _Updated_{.info-label .updated}         | `tableHeight`                   | Now also accepts a value of type `number`.                                                                                                                          |
| _Updated_{.info-label .updated}         | `tableWidth`                    | Now also accepts a value of type `number`.                                                                                                                          |
| _Updated_{.info-label .updated}         | `toolbar`                       | Now supports being a function, boolean, or a configuration object for the jSuites toolbar. Array configurations were also updated, and it is now spreadsheet-level. |
| _Removed_{.info-label .removed}         | `contextMenu`                   | Now operates at the spreadsheet level and includes four new arguments.                                                                                              |
| _Removed_{.info-label .removed}         | `fullscreen`                    | Now operates at the spreadsheet level.                                                                                                                              |
| _Removed_{.info-label .removed}         | `colgroup`                      | Replaced by the new `cols` property, which functions similarly.                                                                                                     |
| _Removed_{.info-label .removed}         | `el`                            | Replaced by the new `element` property.                                                                                                                             |
| _Removed_{.info-label .removed}         | `contextMenu`                   | Now operates at the spreadsheet level.                                                                                                                              |
| _Removed_{.info-label .removed}         | `copyCompatibility`             | This property has been removed.                                                                                                                                     |
| _Removed_{.info-label .removed}         | `detachForUpdates`              | This property has been removed.                                                                                                                                     |
| _Removed_{.info-label .removed}         | `imageOptions`                  | Use the column's configuration object instead.                                                                                                                      |
| _Removed_{.info-label .removed}         | `includeHeadersOnCopy`{.nowrap} | This property has been removed.                                                                                                                                     |
| _Removed_{.info-label .removed}         | `loadingSpin`                   | This property has been removed.                                                                                                                                     |
| _Removed_{.info-label .removed}         | `method`                        | This property has been removed.                                                                                                                                     |
| _Removed_{.info-label .removed}         | `requestVariables`              | This property has been removed.                                                                                                                                     |
| _Removed_{.info-label .removed}         | `stripHTML`                     | Use the `parseHTML` property instead.                                                                                                                               |
| _Removed_{.info-label .removed}         | `stripHTMLOnCopy`               | This property has been removed.                                                                                                                                     |
| _Removed_{.info-label .removed}         | `text`                          | Removed as JSS CE now uses `jSuites.translate`.                                                                                                                     |
| _Removed_{.info-label .removed .nowrap} | `updateTable`                   | This property has been removed.                                                                                                                                     |

### Comments

| Status                                  | Property                 | Description                                                                                                         |
| --------------------------------------- | ------------------------ | ------------------------------------------------------------------------------------------------------------------- |
| _New_{.info-label .new}                 | `comments`               | Represents comments associated with the worksheet.                                                                  |
| _Updated_{.info-label .updated}         | `allowComments`{.nowrap} | The default value of this property is now `true`.                                                                   |
| _Updated_{.info-label .updated}         | `getComments`            | The undocumented second argument has been removed. Additionally, the first argument can no longer be an array.      |
| _Updated_{.info-label .updated .nowrap} | `setComments`            | The first argument of this method has been updated. Additionally, the undocumented third argument has been removed. |

### Columns

| Status                                  | Property                     | Description                                                                                                                                                                                      |
| --------------------------------------- | ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| _New_{.info-label .new}                 | `columns.render`             | Intercepts and modifies visible data before inserting into a grid cell.                                                                                                                          |
| _Updated_{.info-label .updated}         | `columnDrag`                 | The default value for this property is now `true`.                                                                                                                                               |
| _Updated_{.info-label .updated}         | `columns.type`               | Now accepts an object to create custom editors, replacing the old `columns.editor`. Note: "autocomplete" and "readonly" have been removed; use `autocomplete` and `readOnly` properties instead. |
| _Removed_{.info-label .removed}         | `columns.editor`             | This property has been removed. Its functionality for creating custom editors has been moved to the `columns.type` property.                                                                     |
| _Removed_{.info-label .removed}         | `columns.stripHTML`{.nowrap} | This property has been removed.                                                                                                                                                                  |
| _Removed_{.info-label .removed}         | `colAlignments`              | Use the `align` property in the `columns` array items instead.                                                                                                                                   |
| _Removed_{.info-label .removed}         | `colHeaders`                 | Use the `title` property in the `columns` array items instead.                                                                                                                                   |
| _Removed_{.info-label .removed .nowrap} | `colWidths`                  | Use the `width` property in the `columns` array items instead.                                                                                                                                   |
| _Updated_{.info-label .updated}         | `hideColumn`                 | The first argument for this method can now also be an array.                                                                                                                                     |
| _Updated_{.info-label .updated}         | `showColumn`                 | The first argument for this method can now also be an array.                                                                                                                                     |
| _Updated_{.info-label .updated}         | `setWidth`                   | Previously undocumented, this method had a third argument, which has now been removed.                                                                                                           |

### Data

| Status                                  | Method                      | Description                                                                                                           |
| --------------------------------------- | --------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| _New_{.info-label .new}                 | `getDataFromRange`{.nowrap} | Retrieves data from a specified range.                                                                                |
| _Updated_{.info-label .updated}         | `getData`                   | This method now accepts two additional arguments.                                                                     |
| _Updated_{.info-label .updated}         | `setData`                   | No longer emits the `onload` event, and its first argument can no longer be a JSON object.                            |
| _Updated_{.info-label .updated}         | `getValue`                  | The first argument must now be a string.                                                                              |
| _Updated_{.info-label .updated}         | `setValue`                  | The object array in the first argument no longer uses the `newValue` property; use the `value` property instead.      |
| _Updated_{.info-label .updated}         | `getColumnData`             | This method now includes a second argument.                                                                           |
| _Updated_{.info-label .updated}         | `setColumnData`             | This method now includes a third argument.                                                                            |
| _Updated_{.info-label .updated}         | `getRowData`                | This method now includes a second argument.                                                                           |
| _Updated_{.info-label .updated}         | `setRowData`                | This method now includes a third argument.                                                                            |
| _Updated_{.info-label .updated}         | `download`                  | This method now accepts a second argument.                                                                            |
| _Updated_{.info-label .updated}         | `getLabel`                  | The first argument can no longer be an array with two numbers. Instead, the method now accepts two numeric arguments. |
| _Removed_{.info-label .removed}         | `parseCSV`                  | Use the helper methods instead.                                                                                       |
| _Removed_{.info-label .removed .nowrap} | `getJson`                   | Use the `getData` method instead.                                                                                     |

### Selection

| Status                                  | Method                               | Description                                                                                                                                     |
| --------------------------------------- | ------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| _New_{.info-label .new}                 | `getHighlighted`                     | Retrieves the coordinates of the highlighted selections.                                                                                        |
| _New_{.info-label .new}                 | `getSelected`                        | Retrieves information about selected cells in the worksheet.                                                                                    |
| _New_{.info-label .new}                 | `getSelection`                       | Retrieves the coordinates of the selected range in the worksheet.                                                                               |
| _New_{.info-label .new}                 | `isSelected`                         | Checks if a cell is part of the current selection.                                                                                              |
| _Updated_{.info-label .updated}         | `updateSelectionFromCoords`{.nowrap} | Previously undocumented, this method had a fifth argument, which has now been removed. It can now return `false` if the selection is cancelled. |
| _Updated_{.info-label .updated}         | `getSelectedColumns`                 | This method now accepts an argument.                                                                                                            |
| _Updated_{.info-label .updated}         | `getSelectedRows`                    | The first argument for this method has been updated.                                                                                            |
| _Updated_{.info-label .updated}         | `resetSelection`                     | Previously undocumented, this method had an argument, which has now been removed.                                                               |
| _Removed_{.info-label .removed .nowrap} | `updateSelection`                    | Use the `updateSelectionFromCoords` method instead.                                                                                             |

### Editors

#### Calendar Editor Type

| Status                             | Property         | Description                                                             |
| ---------------------------------- | ---------------- | ----------------------------------------------------------------------- |
| _Updated_{.info-label .updated}    | `format`         | The default value for this property is now `"YYYY-MM-DD"`.              |
| _Removed_{.info-label .removed}    | `value`          | This property has been removed.                                         |
| _Deprecated_{.info-label .removed} | `months`         | Still available but should be replaced with the `setDictionary` method. |
| _Deprecated_{.info-label .removed} | `weekdays`       | Still available but should be replaced with the `setDictionary` method. |
| _Deprecated_{.info-label .removed} | `weekdays_short` | Still available but should be replaced with the `setDictionary` method. |

### Removed

The following methods and attributes have been removed from the public scope or the library:

#### Methods

- `col`
- `conditionalSelectionUpdate`
- `copyData`
- `createCell`
- `createCellHeader`
- `createNestedHeader`
- `createRow`
- `createTable`
- `createToolbar`
- `getColumnOptions`
- `getDropDownValue`
- `getFreezeWidth`
- `getJsonRow`
- `getLabelFromCoords`
- `hash`
- `historyProcessColumn`
- `historyProcessRow`
- `init`
- `isColMerged`
- `isRowMerged`
- `loadDown`
- `loadPage`
- `loadUp`
- `loadValidation`
- `onafterchanges`
- `parseNumber`
- `parseValue`
- `prepareJson`
- `prepareTable`
- `refresh`
- `refreshSelection`
- `removeCopySelection`
- `removeCopyingSelection`
- `row`
- `save`
- `scrollControls`
- `setCheckRadioValue`
- `setFooter`
- `setHistory`
- `updateCell`
- `updateCopySelection`
- `updateCornerPosition`
- `updateFormula`
- `updateFormulaChain`
- `updateFormulas`
- `updateFreezePosition`
- `updateMeta`
- `updateNestedHeader`
- `updateOrder`
- `updateOrderArrow`
- `updatePagination`
- `updateResult`
- `updateScroll`
- `updateTable`
- `updateTableReferences`
- `wheelControls`

#### Attributes

- `setExtensions`;
- `formula`;
- `build`;
- `keyDownControls`;
- `mouseDownControls`;
- `mouseUpControls`;
- `mouseMoveControls`;
- `mouseOverControls`;
- `doubleClickControls`;
- `copyControls`;
- `cutControls`;
- `pasteControls`;
- `contextMenuControls`;
- `touchStartControls`;
- `touchEndControls`;
- `fromSpreadsheet`;
- `validLetter`;
- `injectArray`;
- `getIdFromColumnName`;
- `getColumnNameFromId`;
- `getElement`;
- `doubleDigitFormat`;
- `createFromTable`;

#### Elements

Changes in HTML element properties:

| Status                          | Property                  | Description                                               |
| ------------------------------- | ------------------------- | --------------------------------------------------------- |
| _Removed_{.info-label .removed} | `worksheetElement.jexcel` | Use the `worksheetElement.jspreadsheet` property instead. |
