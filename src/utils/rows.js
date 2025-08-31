import jSuites from "jsuites";
import { getNumberOfColumns } from "./columns.js";
import { createCell, updateTableReferences } from "./internal.js";
import dispatch from "./dispatch.js";
import { isRowMerged } from "./merges.js";
import { conditionalSelectionUpdate, getSelectedRows, updateCornerPosition } from "./selection.js";
import { setHistory } from "./history.js";
import { getColumnNameFromId } from "./internalHelpers.js";

/**
 * Create row
 */
export const createRow = function(j, data) {
    const obj = this;

    // Create container
    if (! obj.records[j]) {
        obj.records[j] = [];
    }
    // Default data
    if (! data) {
        data = obj.options.data[j];
    }
    // New line of data to be append in the table
    const row = {
        element: document.createElement('tr'),
        y: j,
    };

    obj.rows[j] = row;

    row.element.setAttribute('data-y', j);
    // Index
    let index = null;

    // Set default row height
    if (obj.options.defaultRowHeight) {
        row.element.style.height = obj.options.defaultRowHeight + 'px'
    }

    // Definitions
    if (obj.options.rows && obj.options.rows[j]) {
        if (obj.options.rows[j].height) {
            row.element.style.height = obj.options.rows[j].height;
        }
        if (obj.options.rows[j].title) {
            index = obj.options.rows[j].title;
        }
    }
    if (! index) {
        index = parseInt(j + 1);
    }
    // Row number label
    const td = document.createElement('td');
    td.innerHTML = index;
    td.setAttribute('data-y', j);
    td.className = 'jss_row';
    row.element.appendChild(td);

    const numberOfColumns = getNumberOfColumns.call(obj);

    // Data columns
    for (let i = 0; i < numberOfColumns; i++) {
        // New column of data to be append in the line
        obj.records[j][i] = {
            element: createCell.call(this, i, j, data[i]),
            x: i,
            y: j,
        };
        // Add column to the row
        row.element.appendChild(obj.records[j][i].element);

        if (obj.options.columns && obj.options.columns[i] && typeof obj.options.columns[i].render === 'function') {
            obj.options.columns[i].render(
                obj.records[j][i].element,
                data[i],
                parseInt(i),
                parseInt(j),
                obj,
                obj.options.columns[i],
            );
        }
    }

    // Add row to the table body
    return row;
}

/**
 * Insert a new row
 *
 * @param mixed - number of blank lines to be insert or a single array with the data of the new row
 * @param rowNumber
 * @param insertBefore
 * @return void
 */
export const insertRow = function(mixed, rowNumber, insertBefore) {
    const obj = this;

    // Configuration
    if (obj.options.allowInsertRow != false) {
        // Records
        var records = [];

        // Data to be insert
        let data = [];

        // The insert could be lead by number of rows or the array of data
        let numOfRows;

        if (!Array.isArray(mixed)) {
            numOfRows = typeof mixed !== 'undefined' ? mixed : 1;
        } else {
            numOfRows = 1;

            if (mixed) {
                data = mixed;
            }
        }

        // Direction
        insertBefore = insertBefore ? true : false;

        // Current column number
        const lastRow = obj.options.data.length - 1;

        if (rowNumber == undefined || rowNumber >= parseInt(lastRow) || rowNumber < 0) {
            rowNumber = lastRow;
        }

        const onbeforeinsertrowRecords = [];

        for (let row = 0; row < numOfRows; row++) {
            const newRow = [];

            for (let col = 0; col < obj.options.columns.length; col++) {
                newRow[col] = data[col] ? data[col] : '';
            }

            onbeforeinsertrowRecords.push({
                row: row + rowNumber + (insertBefore ? 0 : 1),
                data: newRow,
            });
        }

        // Onbeforeinsertrow
        if (dispatch.call(obj, 'onbeforeinsertrow', obj, onbeforeinsertrowRecords) === false) {
            return false;
        }

        // Merged cells
        if (obj.options.mergeCells && Object.keys(obj.options.mergeCells).length > 0) {
            if (isRowMerged.call(obj, rowNumber, insertBefore).length) {
                if (! confirm(jSuites.translate('This action will destroy any existing merged cells. Are you sure?'))) {
                    return false;
                } else {
                    obj.destroyMerge();
                }
            }
        }

        // Clear any search
        if (obj.options.search == true) {
            if (obj.results && obj.results.length != obj.rows.length) {
                if (confirm(jSuites.translate('This action will clear your search results. Are you sure?'))) {
                    obj.resetSearch();
                } else {
                    return false;
                }
            }

            obj.results = null;
        }

        // Insertbefore
        const rowIndex = (! insertBefore) ? rowNumber + 1 : rowNumber;

        // Keep the current data
        const currentRecords = obj.records.splice(rowIndex);
        const currentData = obj.options.data.splice(rowIndex);
        const currentRows = obj.rows.splice(rowIndex);

        // Adding lines
        const rowRecords = [];
        const rowData = [];
        const rowNode = [];

        for (let row = rowIndex; row < (numOfRows + rowIndex); row++) {
            // Push data to the data container
            obj.options.data[row] = [];
            for (let col = 0; col < obj.options.columns.length; col++) {
                obj.options.data[row][col]  = data[col] ? data[col] : '';
            }
            // Create row
            const newRow = createRow.call(obj, row, obj.options.data[row]);
            // Append node
            if (currentRows[0]) {
                if (Array.prototype.indexOf.call(obj.tbody.children, currentRows[0].element) >= 0) {
                    obj.tbody.insertBefore(newRow.element, currentRows[0].element);
                }
            } else {
                if (Array.prototype.indexOf.call(obj.tbody.children, obj.rows[rowNumber].element) >= 0) {
                    obj.tbody.appendChild(newRow.element);
                }
            }
            // Record History
            rowRecords.push([...obj.records[row]]);
            rowData.push([...obj.options.data[row]]);
            rowNode.push(newRow);
        }

        // Copy the data back to the main data
        Array.prototype.push.apply(obj.records, currentRecords);
        Array.prototype.push.apply(obj.options.data, currentData);
        Array.prototype.push.apply(obj.rows, currentRows);

        for (let j = rowIndex; j < obj.rows.length; j++) {
            obj.rows[j].y = j;
        }

        for (let j = rowIndex; j < obj.records.length; j++) {
            for (let i = 0; i < obj.records[j].length; i++) {
                obj.records[j][i].y = j;
            }
        }

        // Respect pagination
        if (obj.options.pagination > 0) {
            obj.page(obj.pageNumber);
        }

        // Keep history
        setHistory.call(obj, {
            action: 'insertRow',
            rowNumber: rowNumber,
            numOfRows: numOfRows,
            insertBefore: insertBefore,
            rowRecords: rowRecords,
            rowData: rowData,
            rowNode: rowNode,
        });

        // Remove table references
        updateTableReferences.call(obj);

        // Events
        dispatch.call(obj, 'oninsertrow', obj, onbeforeinsertrowRecords);
    }
}

/**
 * Move row
 *
 * @return void
 */
export const moveRow = function(o, d, ignoreDom) {
    const obj = this;

    if (obj.options.mergeCells && Object.keys(obj.options.mergeCells).length > 0) {
        let insertBefore;

        if (o > d) {
            insertBefore = 1;
        } else {
            insertBefore = 0;
        }

        if (isRowMerged.call(obj, o).length || isRowMerged.call(obj, d, insertBefore).length) {
            if (! confirm(jSuites.translate('This action will destroy any existing merged cells. Are you sure?'))) {
                return false;
            } else {
                obj.destroyMerge();
            }
        }
    }

    if (obj.options.search == true) {
        if (obj.results && obj.results.length != obj.rows.length) {
            if (confirm(jSuites.translate('This action will clear your search results. Are you sure?'))) {
                obj.resetSearch();
            } else {
                return false;
            }
        }

        obj.results = null;
    }

    if (! ignoreDom) {
        if (Array.prototype.indexOf.call(obj.tbody.children, obj.rows[d].element) >= 0) {
            if (o > d) {
                obj.tbody.insertBefore(obj.rows[o].element, obj.rows[d].element);
            } else {
                obj.tbody.insertBefore(obj.rows[o].element, obj.rows[d].element.nextSibling);
            }
        } else {
            obj.tbody.removeChild(obj.rows[o].element);
        }
    }

    // Place references in the correct position
    obj.rows.splice(d, 0, obj.rows.splice(o, 1)[0]);
    obj.records.splice(d, 0, obj.records.splice(o, 1)[0]);
    obj.options.data.splice(d, 0, obj.options.data.splice(o, 1)[0]);

    const firstAffectedIndex = Math.min(o, d);
    const lastAffectedIndex = Math.max(o, d);

    for (let j = firstAffectedIndex; j <= lastAffectedIndex; j++) {
        obj.rows[j].y = j;
    }

    for (let j = firstAffectedIndex; j <= lastAffectedIndex; j++) {
        for (let i = 0; i < obj.records[j].length; i++) {
            obj.records[j][i].y = j;
        }
    }

    // Respect pagination
    if (obj.options.pagination > 0 && obj.tbody.children.length != obj.options.pagination) {
        obj.page(obj.pageNumber);
    }

    // Keeping history of changes
    setHistory.call(obj, {
        action:'moveRow',
        oldValue: o,
        newValue: d,
    });

    // Update table references
    updateTableReferences.call(obj);

    // Events
    dispatch.call(obj, 'onmoverow', obj, parseInt(o), parseInt(d), 1);
}

/**
 * Delete a row by number
 *
 * @param integer rowNumber - row number to be excluded
 * @param integer numOfRows - number of lines
 * @return void
 */
export const deleteRow = function(rowNumber, numOfRows) {
    const obj = this;

    // Global Configuration
    if (obj.options.allowDeleteRow != false) {
        if (obj.options.allowDeletingAllRows == true || obj.options.data.length > 1) {
            // Delete row definitions
            if (rowNumber == undefined) {
                const number = getSelectedRows.call(obj);

                if (number.length === 0) {
                    rowNumber = obj.options.data.length - 1;
                    numOfRows = 1;
                } else {
                    rowNumber = number[0];
                    numOfRows = number.length;
                }
            }

            // Last column
            let lastRow = obj.options.data.length - 1;

            if (rowNumber == undefined || rowNumber > lastRow || rowNumber < 0) {
                rowNumber = lastRow;
            }

            if (! numOfRows) {
                numOfRows = 1;
            }

            // Do not delete more than the number of records
            if (rowNumber + numOfRows >= obj.options.data.length) {
                numOfRows = obj.options.data.length - rowNumber;
            }

            // Onbeforedeleterow
            const onbeforedeleterowRecords = [];
            for (let i = 0; i < numOfRows; i++) {
                onbeforedeleterowRecords.push(i + rowNumber);
            }

            if (dispatch.call(obj, 'onbeforedeleterow', obj, onbeforedeleterowRecords) === false) {
                return false;
            }

            if (parseInt(rowNumber) > -1) {
                // Merged cells
                let mergeExists = false;
                if (obj.options.mergeCells && Object.keys(obj.options.mergeCells).length > 0) {
                    for (let row = rowNumber; row < rowNumber + numOfRows; row++) {
                        if (isRowMerged.call(obj, row, false).length) {
                            mergeExists = true;
                        }
                    }
                }
                if (mergeExists) {
                    if (! confirm(jSuites.translate('This action will destroy any existing merged cells. Are you sure?'))) {
                        return false;
                    } else {
                        obj.destroyMerge();
                    }
                }

                // Clear any search
                if (obj.options.search == true) {
                    if (obj.results && obj.results.length != obj.rows.length) {
                        if (confirm(jSuites.translate('This action will clear your search results. Are you sure?'))) {
                            obj.resetSearch();
                        } else {
                            return false;
                        }
                    }

                    obj.results = null;
                }

                // If delete all rows, and set allowDeletingAllRows false, will stay one row
                if (obj.options.allowDeletingAllRows != true && lastRow + 1 === numOfRows) {
                    numOfRows--;
                    console.error('Jspreadsheet: It is not possible to delete the last row');
                }

                // Remove node
                for (let row = rowNumber; row < rowNumber + numOfRows; row++) {
                    if (Array.prototype.indexOf.call(obj.tbody.children, obj.rows[row].element) >= 0) {
                        obj.rows[row].element.className = '';
                        obj.rows[row].element.parentNode.removeChild(obj.rows[row].element);
                    }
                }

                // Remove data
                const rowRecords = obj.records.splice(rowNumber, numOfRows);
                const rowData = obj.options.data.splice(rowNumber, numOfRows);
                const rowNode = obj.rows.splice(rowNumber, numOfRows);

                for (let j = rowNumber; j < obj.rows.length; j++) {
                    obj.rows[j].y = j;
                }

                for (let j = rowNumber; j < obj.records.length; j++) {
                    for (let i = 0; i < obj.records[j].length; i++) {
                        obj.records[j][i].y = j;
                    }
                }

                // Respect pagination
                if (obj.options.pagination > 0 && obj.tbody.children.length != obj.options.pagination) {
                    obj.page(obj.pageNumber);
                }

                // Remove selection
                conditionalSelectionUpdate.call(obj, 1, rowNumber, (rowNumber + numOfRows) - 1);

                // Keep history
                setHistory.call(obj, {
                    action: 'deleteRow',
                    rowNumber: rowNumber,
                    numOfRows: numOfRows,
                    insertBefore: 1,
                    rowRecords: rowRecords,
                    rowData: rowData,
                    rowNode: rowNode
                });

                // Remove table references
                updateTableReferences.call(obj);

                // Events
                dispatch.call(obj, 'ondeleterow', obj, onbeforedeleterowRecords);
            }
        } else {
            console.error('Jspreadsheet: It is not possible to delete the last row');
        }
    }
}

/**
 * Get the row height
 *
 * @param row - row number (first row is: 0)
 * @return height - current row height
 */
export const getHeight = function(row) {
    const obj = this;

    let data;

    if (typeof row === 'undefined') {
        // Get height of all rows
        data = [];
        for (let j = 0; j < obj.rows.length; j++) {
            const h = obj.rows[j].element.style.height;
            if (h) {
                data[j] = h;
            }
        }
    } else {
        // In case the row is an object
        if (typeof(row) == 'object') {
            row = $(row).getAttribute('data-y');
        }

        data = obj.rows[row].element.style.height;
    }

    return data;
}

/**
 * Set the row height
 *
 * @param row - row number (first row is: 0)
 * @param height - new row height
 * @param oldHeight - old row height
 */
export const setHeight = function (row, height, oldHeight) {
    const obj = this;

    if (height > 0) {
        // Oldwidth
        if (! oldHeight) {
            oldHeight = obj.rows[row].element.getAttribute('height');

            if (! oldHeight) {
                const rect = obj.rows[row].element.getBoundingClientRect();
                oldHeight = rect.height;
            }
        }

        // Integer
        height = parseInt(height);

        // Set width
        obj.rows[row].element.style.height = height + 'px';

        if (!obj.options.rows) {
            obj.options.rows = [];
        }

        // Keep options updated
        if (! obj.options.rows[row]) {
            obj.options.rows[row] = {};
        }
        obj.options.rows[row].height = height;

        // Keeping history of changes
        setHistory.call(obj, {
            action:'setHeight',
            row:row,
            oldValue:oldHeight,
            newValue:height,
        });

        // On resize column
        dispatch.call(obj, 'onresizerow', obj, row, height, oldHeight);

        // Update corner position
        updateCornerPosition.call(obj);
    }
}

/**
 * Show row
 */
export const showRow = function(rowNumber) {
    const obj = this;

    if (!Array.isArray(rowNumber)) {
        rowNumber = [rowNumber];
    }

    rowNumber.forEach(function(rowIndex) {
        obj.rows[rowIndex].element.style.display = '';
    });
}

/**
 * Hide row
 */
export const hideRow = function(rowNumber) {
    const obj = this;

    if (!Array.isArray(rowNumber)) {
        rowNumber = [rowNumber];
    }

    rowNumber.forEach(function(rowIndex) {
        obj.rows[rowIndex].element.style.display = 'none';
    });

}

/**
 * Get a row data by rowNumber
 */
export const getRowData = function(rowNumber, processed) {
    const obj = this;

    if (processed) {
        return obj.records[rowNumber].map(function(record) {
            return record.element.innerHTML;
        })
    } else {
        return obj.options.data[rowNumber];
    }
}

/**
 * Set a row data by rowNumber
 */
export const setRowData = function(rowNumber, data, force) {
    const obj = this;

    for (let i = 0; i < obj.headers.length; i++) {
        // Update cell
        const columnName = getColumnNameFromId([ i, rowNumber ]);
        // Set value
        if (data[i] != null) {
            obj.setValue(columnName, data[i], force);
        }
    }
}