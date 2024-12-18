import jSuites from 'jsuites';

import libraryBase from './libraryBase.js';

import { parseCSV } from './helpers.js';
import { createCellHeader, deleteColumn, getColumnData, getNumberOfColumns, getWidth, hideColumn, insertColumn, moveColumn, setColumnData, setWidth, showColumn } from './columns.js';
import { getData, getDataFromRange, getValue, getValueFromCoords, setData, setValue, setValueFromCoords } from './data.js';
import { cutControls, scrollControls, wheelControls } from './events.js';
import { getHighlighted, getRange, getSelected, getSelectedColumns, getSelectedRows, getSelection, isSelected, resetSelection, selectAll, updateSelectionFromCoords } from './selection.js';
import { deleteRow, getHeight, getRowData, hideRow, insertRow, moveRow, setHeight, setRowData, showRow } from './rows.js';
import { destroyMerge, getMerge, removeMerge, setMerge } from './merges.js';
import { resetSearch, search } from './search.js';
import { getHeader, getHeaders, setHeader } from './headers.js';
import { getStyle, resetStyle, setStyle } from './style.js';
import { page, quantiyOfPages, whichPage } from './pagination.js';
import { download } from './download.js';
import { down, first, last, left, right, up } from './keys.js';
import { createNestedHeader, executeFormula, getCell, getCellFromCoords, getLabel, getWorksheetActive, hideIndex, showIndex } from './internal.js';
import { getComments, setComments } from './comments.js';
import { orderBy } from './orderBy.js';
import { getWorksheetConfig, setConfig } from './config.js';
import { getMeta, setMeta } from './meta.js';
import { closeEditor, openEditor } from './editor.js';
import dispatch from './dispatch.js';
import { getIdFromColumnName } from './internalHelpers.js';
import { copy, paste } from './copyPaste.js';
import { isReadOnly, setReadOnly } from './cells.js';
import { openFilter, resetFilters } from './filter.js';
import { redo, undo } from './history.js';

const setWorksheetFunctions = function(worksheet) {
    for (let i = 0; i < worksheetPublicMethodsLength; i++) {
        const [methodName, method] = worksheetPublicMethods[i];

        worksheet[methodName] = method.bind(worksheet);
    }
}

const createTable = function() {
    let obj = this;

    setWorksheetFunctions(obj);

    // Elements
    obj.table = document.createElement('table');
    obj.thead = document.createElement('thead');
    obj.tbody = document.createElement('tbody');

    // Create headers controllers
    obj.headers = [];
    obj.cols = [];

    // Create table container
    obj.content = document.createElement('div');
    obj.content.classList.add('jss_content');
    obj.content.onscroll = function(e) {
        scrollControls.call(obj, e);
    }
    obj.content.onwheel = function(e) {
        wheelControls.call(obj, e);
    }

    // Search
    const searchContainer = document.createElement('div');
    const searchText = document.createTextNode(jSuites.translate('Search') + ': ');
    obj.searchInput = document.createElement('input');
    obj.searchInput.classList.add('jss_search');
    searchContainer.appendChild(searchText);
    searchContainer.appendChild(obj.searchInput);
    obj.searchInput.onfocus = function() {
        obj.resetSelection();
    }

    // Pagination select option
    const paginationUpdateContainer = document.createElement('div');

    if (obj.options.pagination > 0 && obj.options.paginationOptions && obj.options.paginationOptions.length > 0) {
        obj.paginationDropdown = document.createElement('select');
        obj.paginationDropdown.classList.add('jss_pagination_dropdown');
        obj.paginationDropdown.onchange = function() {
            obj.options.pagination = parseInt(this.value);
            obj.page(0);
        }

        for (let i = 0; i < obj.options.paginationOptions.length; i++) {
            const temp = document.createElement('option');
            temp.value = obj.options.paginationOptions[i];
            temp.innerHTML = obj.options.paginationOptions[i];
            obj.paginationDropdown.appendChild(temp);
        }

        // Set initial pagination value
        obj.paginationDropdown.value = obj.options.pagination;

        paginationUpdateContainer.appendChild(document.createTextNode(jSuites.translate('Show ')));
        paginationUpdateContainer.appendChild(obj.paginationDropdown);
        paginationUpdateContainer.appendChild(document.createTextNode(jSuites.translate('entries')));
    }

    // Filter and pagination container
    const filter = document.createElement('div');
    filter.classList.add('jss_filter');
    filter.appendChild(paginationUpdateContainer);
    filter.appendChild(searchContainer);

    // Colsgroup
    obj.colgroupContainer = document.createElement('colgroup');
    let tempCol = document.createElement('col');
    tempCol.setAttribute('width', '50');
    obj.colgroupContainer.appendChild(tempCol);

    // Nested
    if (
        obj.options.nestedHeaders &&
        obj.options.nestedHeaders.length > 0 &&
        obj.options.nestedHeaders[0] &&
        obj.options.nestedHeaders[0][0]
    ) {
        for (let j = 0; j < obj.options.nestedHeaders.length; j++) {
            obj.thead.appendChild(createNestedHeader.call(obj, obj.options.nestedHeaders[j]));
        }
    }

    // Row
    obj.headerContainer = document.createElement('tr');
    tempCol = document.createElement('td');
    tempCol.classList.add('jss_selectall');
    obj.headerContainer.appendChild(tempCol);

    const numberOfColumns = getNumberOfColumns.call(obj);

    for (let i = 0; i < numberOfColumns; i++) {
        // Create header
        createCellHeader.call(obj, i);
        // Append cell to the container
        obj.headerContainer.appendChild(obj.headers[i]);
        obj.colgroupContainer.appendChild(obj.cols[i].colElement);
    }

    obj.thead.appendChild(obj.headerContainer);

    // Filters
    if (obj.options.filters == true) {
        obj.filter = document.createElement('tr');
        const td = document.createElement('td');
        obj.filter.appendChild(td);

        for (let i = 0; i < obj.options.columns.length; i++) {
            const td = document.createElement('td');
            td.innerHTML = '&nbsp;';
            td.setAttribute('data-x', i);
            td.className = 'jss_column_filter';
            if (obj.options.columns[i].type == 'hidden') {
                td.style.display = 'none';
            }
            obj.filter.appendChild(td);
        }

        obj.thead.appendChild(obj.filter);
    }

    // Content table
    obj.table = document.createElement('table');
    obj.table.classList.add('jss_worksheet');
    obj.table.setAttribute('cellpadding', '0');
    obj.table.setAttribute('cellspacing', '0');
    obj.table.setAttribute('unselectable', 'yes');
    //obj.table.setAttribute('onselectstart', 'return false');
    obj.table.appendChild(obj.colgroupContainer);
    obj.table.appendChild(obj.thead);
    obj.table.appendChild(obj.tbody);

    if (! obj.options.textOverflow) {
        obj.table.classList.add('jss_overflow');
    }

    // Spreadsheet corner
    obj.corner = document.createElement('div');
    obj.corner.className = 'jss_corner';
    obj.corner.setAttribute('unselectable', 'on');
    obj.corner.setAttribute('onselectstart', 'return false');

    if (obj.options.selectionCopy == false) {
        obj.corner.style.display = 'none';
    }

    // Textarea helper
    obj.textarea = document.createElement('textarea');
    obj.textarea.className = 'jss_textarea';
    obj.textarea.id = 'jss_textarea';
    obj.textarea.tabIndex = '-1';

    // Powered by Jspreadsheet
    const ads = document.createElement('a');
    ads.setAttribute('href', 'https://bossanova.uk/jspreadsheet/');
    obj.ads = document.createElement('div');
    obj.ads.className = 'jss_about';

    const span = document.createElement('span');
    span.innerHTML = 'Jspreadsheet CE';
    ads.appendChild(span);
    obj.ads.appendChild(ads);

    // Create table container TODO: frozen columns
    const container = document.createElement('div');
    container.classList.add('jss_table');

    // Pagination
    obj.pagination = document.createElement('div');
    obj.pagination.classList.add('jss_pagination');
    const paginationInfo = document.createElement('div');
    const paginationPages = document.createElement('div');
    obj.pagination.appendChild(paginationInfo);
    obj.pagination.appendChild(paginationPages);

    // Hide pagination if not in use
    if (! obj.options.pagination) {
        obj.pagination.style.display = 'none';
    }

    // Append containers to the table
    if (obj.options.search == true) {
        obj.element.appendChild(filter);
    }

    // Elements
    obj.content.appendChild(obj.table);
    obj.content.appendChild(obj.corner);
    obj.content.appendChild(obj.textarea);

    obj.element.appendChild(obj.content);
    obj.element.appendChild(obj.pagination);
    obj.element.appendChild(obj.ads);
    obj.element.classList.add('jss_container');

    obj.element.jssWorksheet = obj;
    obj.element.jspreadsheet = obj;

    // Overflow
    if (obj.options.tableOverflow == true) {
        if (obj.options.tableHeight) {
            obj.content.style['overflow-y'] = 'auto';
            obj.content.style['box-shadow'] = 'rgb(221 221 221) 2px 2px 5px 0.1px';
            obj.content.style.maxHeight = typeof obj.options.tableHeight === 'string' ? obj.options.tableHeight : obj.options.tableHeight + 'px';
        }
        if (obj.options.tableWidth) {
            obj.content.style['overflow-x'] = 'auto';
            obj.content.style.width = typeof obj.options.tableWidth === 'string' ? obj.options.tableWidth : obj.options.tableWidth + 'px';
        }
    }

    // With toolbars
    if (obj.options.tableOverflow != true && obj.parent.config.toolbar) {
        obj.element.classList.add('with-toolbar');
    }

    // Actions
    if (obj.options.columnDrag != false) {
        obj.thead.classList.add('draggable');
    }
    if (obj.options.columnResize != false) {
        obj.thead.classList.add('resizable');
    }
    if (obj.options.rowDrag != false) {
        obj.tbody.classList.add('draggable');
    }
    if (obj.options.rowResize != false) {
        obj.tbody.classList.add('resizable');
    }

    // Load data
    obj.setData.call(obj);

    // Style
    if (obj.options.style) {
        obj.setStyle(obj.options.style, null, null, 1, 1);

        delete obj.options.style;
    }

    Object.defineProperty(obj.options, 'style', {
        enumerable: true,
        configurable: true,
        get() {
          return obj.getStyle();
        },
      });

    if (obj.options.comments) {
        obj.setComments(obj.options.comments);
    }

    // Classes
    if (obj.options.classes) {
        const k = Object.keys(obj.options.classes);
        for (let i = 0; i < k.length; i++) {
            const cell = getIdFromColumnName(k[i], true);
            obj.records[cell[1]][cell[0]].element.classList.add(obj.options.classes[k[i]]);
        }
    }
}

/**
 * Prepare the jspreadsheet table
 *
 * @Param config
 */
const prepareTable = function() {
    const obj = this;

    // Lazy loading
    if (obj.options.lazyLoading == true && (obj.options.tableOverflow != true && obj.parent.config.fullscreen != true)) {
        console.error('Jspreadsheet: The lazyloading only works when tableOverflow = yes or fullscreen = yes');
        obj.options.lazyLoading = false;
    }

    if (!obj.options.columns) {
        obj.options.columns = [];
    }

    // Number of columns
    let size = obj.options.columns.length;
    let keys;

    if (obj.options.data && typeof(obj.options.data[0]) !== 'undefined') {
        if (!Array.isArray(obj.options.data[0])) {
            // Data keys
            keys = Object.keys(obj.options.data[0]);

            if (keys.length > size) {
                size = keys.length;
            }
        } else {
            const numOfColumns = obj.options.data[0].length;

            if (numOfColumns > size) {
                size = numOfColumns;
            }
        }
    }

    // Minimal dimensions
    if (!obj.options.minDimensions) {
        obj.options.minDimensions = [0, 0];
    }

    if (obj.options.minDimensions[0] > size) {
        size = obj.options.minDimensions[0];
    }

    // Requests
    const multiple = [];

    // Preparations
    for (let i = 0; i < size; i++) {
        // Default column description
        if (! obj.options.columns[i]) {
            obj.options.columns[i] = {};
        }
        if (! obj.options.columns[i].name && keys && keys[i]) {
            obj.options.columns[i].name = keys[i];
        }

        // Pre-load initial source for json dropdown
        if (obj.options.columns[i].type == 'dropdown') {
            // if remote content
            if (obj.options.columns[i].url) {
                multiple.push({
                    url: obj.options.columns[i].url,
                    index: i,
                    method: 'GET',
                    dataType: 'json',
                    success: function(data) {
                        if (!obj.options.columns[this.index].source) {
                            obj.options.columns[this.index].source = [];
                        }

                        for (let i = 0; i < data.length; i++) {
                            obj.options.columns[this.index].source.push(data[i]);
                        }
                    }
                });
            }
        }
    }

    // Create the table when is ready
    if (! multiple.length) {
        createTable.call(obj);
    } else {
        jSuites.ajax(multiple, function() {
            createTable.call(obj);
        });
    }
}

export const getNextDefaultWorksheetName = function(spreadsheet) {
    const defaultWorksheetNameRegex = /^Sheet(\d+)$/;

    let largestWorksheetNumber = 0;

    spreadsheet.worksheets.forEach(function(worksheet) {
        const regexResult = defaultWorksheetNameRegex.exec(worksheet.options.worksheetName);
        if (regexResult) {
            largestWorksheetNumber = Math.max(largestWorksheetNumber, parseInt(regexResult[1]));
        }
    });

    return 'Sheet' + (largestWorksheetNumber + 1);
}

export const buildWorksheet = async function() {
    const obj = this;
    const el = obj.element;

    const spreadsheet = obj.parent;

    if (typeof spreadsheet.plugins === 'object') {
        Object.entries(spreadsheet.plugins).forEach(function([, plugin]) {
            if (typeof plugin.beforeinit === 'function') {
                plugin.beforeinit(obj);
            }
        });
    }

    libraryBase.jspreadsheet.current = obj;

    // Event
    el.setAttribute('tabindex', 1);
    el.addEventListener('focus', function(e) {
        if (libraryBase.jspreadsheet.current && ! obj.selectedCell) {
            obj.updateSelectionFromCoords(0,0,0,0);
        }
    });

    const promises = [];

    // Load the table data based on an CSV file
    if (obj.options.csv) {
        const promise = new Promise((resolve) => {
            // Load CSV file
            jSuites.ajax({
                url: obj.options.csv,
                method: 'GET',
                dataType: 'text',
                success: function(result) {
                    // Convert data
                    const newData = parseCSV(result, obj.options.csvDelimiter)

                    // Headers
                    if (obj.options.csvHeaders == true && newData.length > 0) {
                        const headers = newData.shift();

                        if (headers.length > 0) {
                            if (!obj.options.columns) {
                                obj.options.columns = [];
                            }

                            for(let i = 0; i < headers.length; i++) {
                                if (! obj.options.columns[i]) {
                                    obj.options.columns[i] = {};
                                }
                                // Precedence over pre-configurated titles
                                if (typeof obj.options.columns[i].title === 'undefined') {
                                    obj.options.columns[i].title = headers[i];
                                }
                            }
                        }
                    }
                    // Data
                    obj.options.data = newData;
                    // Prepare table
                    prepareTable.call(obj);

                    resolve();
                }
            });
        });

        promises.push(promise);
    } else if (obj.options.url) {
        const promise = new Promise((resolve) => {
            jSuites.ajax({
                url: obj.options.url,
                method: 'GET',
                dataType: 'json',
                success: function(result) {
                    // Data
                    obj.options.data = (result.data) ? result.data : result;
                    // Prepare table
                    prepareTable.call(obj);

                    resolve();
                }
            });
        })

        promises.push(promise);
    } else {
        // Prepare table
        prepareTable.call(obj);
    }

    await Promise.all(promises);

    if (typeof spreadsheet.plugins === 'object') {
        Object.entries(spreadsheet.plugins).forEach(function([, plugin]) {
            if (typeof plugin.init === 'function') {
                plugin.init(obj);
            }
        });
    }
}

export const createWorksheetObj = function(options) {
    const obj = this;

    const spreadsheet = obj.parent;

    if (!options.worksheetName) {
        options.worksheetName = getNextDefaultWorksheetName(obj.parent);
    }

    const newWorksheet = {
        parent: spreadsheet,
        options: options,
        filters: [],
        formula: [],
        history: [],
        selection: [],
        historyIndex: -1,
    };

    spreadsheet.config.worksheets.push(newWorksheet.options);
    spreadsheet.worksheets.push(newWorksheet);

    return newWorksheet;
}

export const createWorksheet = function(options) {
    const obj = this;
    const spreadsheet = obj.parent;

    spreadsheet.creationThroughJss = true;

    createWorksheetObj.call(obj, options);

    spreadsheet.element.tabs.create(options.worksheetName);
}

export const openWorksheet = function(position) {
    const obj = this;
    const spreadsheet = obj.parent;

    spreadsheet.element.tabs.open(position);
}

export const deleteWorksheet = function(position) {
    const obj = this;

    obj.parent.element.tabs.remove(position);

    const removedWorksheet = obj.parent.worksheets.splice(position, 1)[0];

    dispatch.call(obj.parent, 'ondeleteworksheet', removedWorksheet, position);
}

const worksheetPublicMethods = [
    ['selectAll', selectAll],
    ['updateSelectionFromCoords', function(x1, y1, x2, y2) {
        return updateSelectionFromCoords.call(this, x1, y1, x2, y2);
    }],
    ['resetSelection', function() {
        return resetSelection.call(this);
    }],
    ['getSelection', getSelection],
    ['getSelected', getSelected],
    ['getSelectedColumns', getSelectedColumns],
    ['getSelectedRows', getSelectedRows],
    ['getData', getData],
    ['setData', setData],
    ['getValue', getValue],
    ['getValueFromCoords', getValueFromCoords],
    ['setValue', setValue],
    ['setValueFromCoords', setValueFromCoords],
    ['getWidth', getWidth],
    ['setWidth', function(column, width) {
        return setWidth.call(this, column, width);
    }],
    ['insertRow', insertRow],
    ['moveRow', function(rowNumber, newPositionNumber) {
        return moveRow.call(this, rowNumber, newPositionNumber);
    }],
    ['deleteRow', deleteRow],
    ['hideRow', hideRow],
    ['showRow', showRow],
    ['getRowData', getRowData],
    ['setRowData', setRowData],
    ['getHeight', getHeight],
    ['setHeight', function(row, height) {
        return setHeight.call(this, row, height);
    }],
    ['getMerge', getMerge],
    ['setMerge', function(cellName, colspan, rowspan) {
        return setMerge.call(this, cellName, colspan, rowspan);
    }],
    ['destroyMerge', function() {
        return destroyMerge.call(this);
    }],
    ['removeMerge', function(cellName, data) {
        return removeMerge.call(this, cellName, data);
    }],
    ['search', search],
    ['resetSearch', resetSearch],
    ['getHeader', getHeader],
    ['getHeaders', getHeaders],
    ['setHeader', setHeader],
    ['getStyle', getStyle],
    ['setStyle', function(cell, property, value, forceOverwrite) {
        return setStyle.call(this, cell, property, value, forceOverwrite);
    }],
    ['resetStyle', resetStyle],
    ['insertColumn', insertColumn],
    ['moveColumn', moveColumn],
    ['deleteColumn', deleteColumn],
    ['getColumnData', getColumnData],
    ['setColumnData', setColumnData],
    ['whichPage', whichPage],
    ['page', page],
    ['download', download],
    ['getComments', getComments],
    ['setComments', setComments],
    ['orderBy', orderBy],
    ['undo', undo],
    ['redo', redo],
    ['getCell', getCell],
    ['getCellFromCoords', getCellFromCoords],
    ['getLabel', getLabel],
    ['getConfig', getWorksheetConfig],
    ['setConfig', setConfig],
    ['getMeta', function(cell) {
        return getMeta.call(this, cell);
    }],
    ['setMeta', setMeta],
    ['showColumn', showColumn],
    ['hideColumn', hideColumn],
    ['showIndex', showIndex],
    ['hideIndex', hideIndex],
    ['getWorksheetActive', getWorksheetActive],
    ['openEditor', openEditor],
    ['closeEditor', closeEditor],
    ['createWorksheet', createWorksheet],
    ['openWorksheet', openWorksheet],
    ['deleteWorksheet', deleteWorksheet],
    ['copy', function(cut) {
        if (cut) {
            cutControls();
        } else {
            copy.call(this, true);
        }
    }],
    ['paste', paste],
    ['executeFormula', executeFormula],
    ['getDataFromRange', getDataFromRange],
    ['quantiyOfPages', quantiyOfPages],
    ['getRange', getRange],
    ['isSelected', isSelected],
    ['setReadOnly', setReadOnly],
    ['isReadOnly', isReadOnly],
    ['getHighlighted', getHighlighted],
    ['dispatch', dispatch],
    ['down', down],
    ['first', first],
    ['last', last],
    ['left', left],
    ['right', right],
    ['up', up],
    ['openFilter', openFilter],
    ['resetFilters', resetFilters],
];

const worksheetPublicMethodsLength = worksheetPublicMethods.length;