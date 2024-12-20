import jSuites from 'jsuites';

import { closeEditor, openEditor, setCheckRadioValue } from './editor.js';
import libraryBase from './libraryBase.js';
import { down, first, last, left, right, up } from './keys.js';
import { isColMerged, isRowMerged } from './merges.js';
import { copyData, removeCopySelection, resetSelection, selectAll, updateCornerPosition, updateSelectionFromCoords } from './selection.js';
import { copy, paste } from './copyPaste.js';
import { openFilter } from './filter.js';
import { loadDown, loadUp } from './lazyLoading.js';
import { setWidth } from './columns.js';
import { moveRow, setHeight } from './rows.js';
import version from './version.js';
import { getCellNameFromCoords } from './helpers.js';

const getElement = function(element) {
    let jssSection = 0;
    let jssElement = 0;

    function path (element) {
        if (element.className) {
            if (element.classList.contains('jss_container')) {
                jssElement = element;
            }

            if (element.classList.contains('jss_spreadsheet')) {
                jssElement = element.querySelector(':scope > .jtabs-content > .jtabs-selected');
            }
        }

        if (element.tagName == 'THEAD') {
            jssSection = 1;
        } else if (element.tagName == 'TBODY') {
            jssSection = 2;
        }

        if (element.parentNode) {
            if (! jssElement) {
                path(element.parentNode);
            }
        }
    }

    path(element);

    return [ jssElement, jssSection ];
}

const mouseUpControls = function(e) {
    if (libraryBase.jspreadsheet.current) {
        // Update cell size
        if (libraryBase.jspreadsheet.current.resizing) {
            // Columns to be updated
            if (libraryBase.jspreadsheet.current.resizing.column) {
                // New width
                const newWidth = parseInt(libraryBase.jspreadsheet.current.cols[libraryBase.jspreadsheet.current.resizing.column].colElement.getAttribute('width'));
                // Columns
                const columns = libraryBase.jspreadsheet.current.getSelectedColumns();
                if (columns.length > 1) {
                    const currentWidth = [];
                    for (let i = 0; i < columns.length; i++) {
                        currentWidth.push(parseInt(libraryBase.jspreadsheet.current.cols[columns[i]].colElement.getAttribute('width')));
                    }
                    // Previous width
                    const index = columns.indexOf(parseInt(libraryBase.jspreadsheet.current.resizing.column));
                    currentWidth[index] = libraryBase.jspreadsheet.current.resizing.width;
                    setWidth.call(libraryBase.jspreadsheet.current, columns, newWidth, currentWidth);
                } else {
                    setWidth.call(libraryBase.jspreadsheet.current, parseInt(libraryBase.jspreadsheet.current.resizing.column), newWidth, libraryBase.jspreadsheet.current.resizing.width);
                }
                // Remove border
                libraryBase.jspreadsheet.current.headers[libraryBase.jspreadsheet.current.resizing.column].classList.remove('resizing');
                for (let j = 0; j < libraryBase.jspreadsheet.current.records.length; j++) {
                    if (libraryBase.jspreadsheet.current.records[j][libraryBase.jspreadsheet.current.resizing.column]) {
                        libraryBase.jspreadsheet.current.records[j][libraryBase.jspreadsheet.current.resizing.column].element.classList.remove('resizing');
                    }
                }
            } else {
                // Remove Class
                libraryBase.jspreadsheet.current.rows[libraryBase.jspreadsheet.current.resizing.row].element.children[0].classList.remove('resizing');
                let newHeight = libraryBase.jspreadsheet.current.rows[libraryBase.jspreadsheet.current.resizing.row].element.getAttribute('height');
                setHeight.call(libraryBase.jspreadsheet.current, libraryBase.jspreadsheet.current.resizing.row, newHeight, libraryBase.jspreadsheet.current.resizing.height);
                // Remove border
                libraryBase.jspreadsheet.current.resizing.element.classList.remove('resizing');
            }
            // Reset resizing helper
            libraryBase.jspreadsheet.current.resizing = null;
        } else if (libraryBase.jspreadsheet.current.dragging) {
            // Reset dragging helper
            if (libraryBase.jspreadsheet.current.dragging) {
                if (libraryBase.jspreadsheet.current.dragging.column) {
                    // Target
                    const columnId = e.target.getAttribute('data-x');
                    // Remove move style
                    libraryBase.jspreadsheet.current.headers[libraryBase.jspreadsheet.current.dragging.column].classList.remove('dragging');
                    for (let j = 0; j < libraryBase.jspreadsheet.current.rows.length; j++) {
                        if (libraryBase.jspreadsheet.current.records[j][libraryBase.jspreadsheet.current.dragging.column]) {
                            libraryBase.jspreadsheet.current.records[j][libraryBase.jspreadsheet.current.dragging.column].element.classList.remove('dragging');
                        }
                    }
                    for (let i = 0; i < libraryBase.jspreadsheet.current.headers.length; i++) {
                        libraryBase.jspreadsheet.current.headers[i].classList.remove('dragging-left');
                        libraryBase.jspreadsheet.current.headers[i].classList.remove('dragging-right');
                    }
                    // Update position
                    if (columnId) {
                        if (libraryBase.jspreadsheet.current.dragging.column != libraryBase.jspreadsheet.current.dragging.destination) {
                            libraryBase.jspreadsheet.current.moveColumn(libraryBase.jspreadsheet.current.dragging.column, libraryBase.jspreadsheet.current.dragging.destination);
                        }
                    }
                } else {
                    let position;

                    if (libraryBase.jspreadsheet.current.dragging.element.nextSibling) {
                        position = parseInt(libraryBase.jspreadsheet.current.dragging.element.nextSibling.getAttribute('data-y'));
                        if (libraryBase.jspreadsheet.current.dragging.row < position) {
                            position -= 1;
                        }
                    } else {
                        position = parseInt(libraryBase.jspreadsheet.current.dragging.element.previousSibling.getAttribute('data-y'));
                    }
                    if (libraryBase.jspreadsheet.current.dragging.row != libraryBase.jspreadsheet.current.dragging.destination) {
                        moveRow.call(libraryBase.jspreadsheet.current, libraryBase.jspreadsheet.current.dragging.row, position, true);
                    }
                    libraryBase.jspreadsheet.current.dragging.element.classList.remove('dragging');
                }
                libraryBase.jspreadsheet.current.dragging = null;
            }
        } else {
            // Close any corner selection
            if (libraryBase.jspreadsheet.current.selectedCorner) {
                libraryBase.jspreadsheet.current.selectedCorner = false;

                // Data to be copied
                if (libraryBase.jspreadsheet.current.selection.length > 0) {
                    // Copy data
                    copyData.call(libraryBase.jspreadsheet.current, libraryBase.jspreadsheet.current.selection[0], libraryBase.jspreadsheet.current.selection[libraryBase.jspreadsheet.current.selection.length - 1]);

                    // Remove selection
                    removeCopySelection.call(libraryBase.jspreadsheet.current);
                }
            }
        }
    }

    // Clear any time control
    if (libraryBase.jspreadsheet.timeControl) {
        clearTimeout(libraryBase.jspreadsheet.timeControl);
        libraryBase.jspreadsheet.timeControl = null;
    }

    // Mouse up
    libraryBase.jspreadsheet.isMouseAction = false;
}

const mouseDownControls = function(e) {
    e = e || window.event;

    let mouseButton;

    if (e.buttons) {
        mouseButton = e.buttons;
    } else if (e.button) {
        mouseButton = e.button;
    } else {
        mouseButton = e.which;
    }

    // Get elements
    const jssTable = getElement(e.target);

    if (jssTable[0]) {
        if (libraryBase.jspreadsheet.current != jssTable[0].jssWorksheet) {
            if (libraryBase.jspreadsheet.current) {
                if (libraryBase.jspreadsheet.current.edition) {
                    closeEditor.call(libraryBase.jspreadsheet.current, libraryBase.jspreadsheet.current.edition[0], true);
                }
                libraryBase.jspreadsheet.current.resetSelection();
            }
            libraryBase.jspreadsheet.current = jssTable[0].jssWorksheet;
        }
    } else {
        if (libraryBase.jspreadsheet.current) {
            if (libraryBase.jspreadsheet.current.edition) {
                closeEditor.call(libraryBase.jspreadsheet.current, libraryBase.jspreadsheet.current.edition[0], true);
            }

            if (!e.target.classList.contains('jss_object')) {
                resetSelection.call(libraryBase.jspreadsheet.current, true);
                libraryBase.jspreadsheet.current = null;
            }
        }
    }

    if (libraryBase.jspreadsheet.current && mouseButton == 1) {
        if (e.target.classList.contains('jss_selectall')) {
            if (libraryBase.jspreadsheet.current) {
                selectAll.call(libraryBase.jspreadsheet.current);
            }
        } else if (e.target.classList.contains('jss_corner')) {
            if (libraryBase.jspreadsheet.current.options.editable != false) {
                libraryBase.jspreadsheet.current.selectedCorner = true;
            }
        } else {
            // Header found
            if (jssTable[1] == 1) {
                const columnId = e.target.getAttribute('data-x');
                if (columnId) {
                    // Update cursor
                    const info = e.target.getBoundingClientRect();
                    if (libraryBase.jspreadsheet.current.options.columnResize != false && info.width - e.offsetX < 6) {
                        // Resize helper
                        libraryBase.jspreadsheet.current.resizing = {
                            mousePosition: e.pageX,
                            column: columnId,
                            width: info.width,
                        };

                        // Border indication
                        libraryBase.jspreadsheet.current.headers[columnId].classList.add('resizing');
                        for (let j = 0; j < libraryBase.jspreadsheet.current.records.length; j++) {
                            if (libraryBase.jspreadsheet.current.records[j][columnId]) {
                                libraryBase.jspreadsheet.current.records[j][columnId].element.classList.add('resizing');
                            }
                        }
                    } else if (libraryBase.jspreadsheet.current.options.columnDrag != false && info.height - e.offsetY < 6) {
                        if (isColMerged.call(libraryBase.jspreadsheet.current, columnId).length) {
                            console.error('Jspreadsheet: This column is part of a merged cell.');
                        } else {
                            // Reset selection
                            libraryBase.jspreadsheet.current.resetSelection();
                            // Drag helper
                            libraryBase.jspreadsheet.current.dragging = {
                                element: e.target,
                                column: columnId,
                                destination: columnId,
                            };
                            // Border indication
                            libraryBase.jspreadsheet.current.headers[columnId].classList.add('dragging');
                            for (let j = 0; j < libraryBase.jspreadsheet.current.records.length; j++) {
                                if (libraryBase.jspreadsheet.current.records[j][columnId]) {
                                    libraryBase.jspreadsheet.current.records[j][columnId].element.classList.add('dragging');
                                }
                            }
                        }
                    } else {
                        let o, d;

                        if (libraryBase.jspreadsheet.current.selectedHeader && (e.shiftKey || e.ctrlKey)) {
                            o = libraryBase.jspreadsheet.current.selectedHeader;
                            d = columnId;
                        } else {
                            // Press to rename
                            if (libraryBase.jspreadsheet.current.selectedHeader == columnId && libraryBase.jspreadsheet.current.options.allowRenameColumn != false) {
                                libraryBase.jspreadsheet.timeControl = setTimeout(function() {
                                    libraryBase.jspreadsheet.current.setHeader(columnId);
                                }, 800);
                            }

                            // Keep track of which header was selected first
                            libraryBase.jspreadsheet.current.selectedHeader = columnId;

                            // Update selection single column
                            o = columnId;
                            d = columnId;
                        }

                        // Update selection
                        updateSelectionFromCoords.call(libraryBase.jspreadsheet.current, o, 0, d, libraryBase.jspreadsheet.current.options.data.length - 1, e);
                    }
                } else {
                    if (e.target.parentNode.classList.contains('jss_nested')) {
                        let c1, c2;

                        if (e.target.getAttribute('data-column')) {
                            const column = e.target.getAttribute('data-column').split(',');
                            c1 = parseInt(column[0]);
                            c2 = parseInt(column[column.length-1]);
                        } else {
                            c1 = 0;
                            c2 = libraryBase.jspreadsheet.current.options.columns.length - 1;
                        }
                        updateSelectionFromCoords.call(libraryBase.jspreadsheet.current, c1, 0, c2, libraryBase.jspreadsheet.current.options.data.length - 1, e);
                    }
                }
            } else {
                libraryBase.jspreadsheet.current.selectedHeader = false;
            }

            // Body found
            if (jssTable[1] == 2) {
                const rowId = parseInt(e.target.getAttribute('data-y'));

                if (e.target.classList.contains('jss_row')) {
                    const info = e.target.getBoundingClientRect();
                    if (libraryBase.jspreadsheet.current.options.rowResize != false && info.height - e.offsetY < 6) {
                        // Resize helper
                        libraryBase.jspreadsheet.current.resizing = {
                            element: e.target.parentNode,
                            mousePosition: e.pageY,
                            row: rowId,
                            height: info.height,
                        };
                        // Border indication
                        e.target.parentNode.classList.add('resizing');
                    } else if (libraryBase.jspreadsheet.current.options.rowDrag != false && info.width - e.offsetX < 6) {
                        if (isRowMerged.call(libraryBase.jspreadsheet.current, rowId).length) {
                            console.error('Jspreadsheet: This row is part of a merged cell');
                        } else if (libraryBase.jspreadsheet.current.options.search == true && libraryBase.jspreadsheet.current.results) {
                            console.error('Jspreadsheet: Please clear your search before perform this action');
                        } else {
                            // Reset selection
                            libraryBase.jspreadsheet.current.resetSelection();
                            // Drag helper
                            libraryBase.jspreadsheet.current.dragging = {
                                element: e.target.parentNode,
                                row:rowId,
                                destination:rowId,
                            };
                            // Border indication
                            e.target.parentNode.classList.add('dragging');
                        }
                    } else {
                        let o, d;

                        if (libraryBase.jspreadsheet.current.selectedRow && (e.shiftKey || e.ctrlKey)) {
                            o = libraryBase.jspreadsheet.current.selectedRow;
                            d = rowId;
                        } else {
                            // Keep track of which header was selected first
                            libraryBase.jspreadsheet.current.selectedRow = rowId;

                            // Update selection single column
                            o = rowId;
                            d = rowId;
                        }

                        // Update selection
                        updateSelectionFromCoords.call(libraryBase.jspreadsheet.current, null, o, null, d, e);
                    }
                } else {
                    // Jclose
                    if (e.target.classList.contains('jclose') && e.target.clientWidth - e.offsetX < 50 && e.offsetY < 50) {
                        closeEditor.call(libraryBase.jspreadsheet.current, libraryBase.jspreadsheet.current.edition[0], true);
                    } else {
                        const getCellCoords = function(element) {
                            const x = element.getAttribute('data-x');
                            const y = element.getAttribute('data-y');
                            if (x && y) {
                                return [x, y];
                            } else {
                                if (element.parentNode) {
                                    return getCellCoords(element.parentNode);
                                }
                            }
                        };

                        const position = getCellCoords(e.target);
                        if (position) {

                            const columnId = position[0];
                            const rowId = position[1];
                            // Close edition
                            if (libraryBase.jspreadsheet.current.edition) {
                                if (libraryBase.jspreadsheet.current.edition[2] != columnId || libraryBase.jspreadsheet.current.edition[3] != rowId) {
                                    closeEditor.call(libraryBase.jspreadsheet.current, libraryBase.jspreadsheet.current.edition[0], true);
                                }
                            }

                            if (! libraryBase.jspreadsheet.current.edition) {
                                // Update cell selection
                                if (e.shiftKey) {
                                    updateSelectionFromCoords.call(libraryBase.jspreadsheet.current, libraryBase.jspreadsheet.current.selectedCell[0], libraryBase.jspreadsheet.current.selectedCell[1], columnId, rowId, e);
                                } else {
                                    updateSelectionFromCoords.call(libraryBase.jspreadsheet.current, columnId, rowId, undefined, undefined, e);
                                }
                            }

                            // No full row selected
                            libraryBase.jspreadsheet.current.selectedHeader = null;
                            libraryBase.jspreadsheet.current.selectedRow = null;
                        }
                    }
                }
            } else {
                libraryBase.jspreadsheet.current.selectedRow = false;
            }

            // Pagination
            if (e.target.classList.contains('jss_page')) {
                if (e.target.textContent == '<') {
                    libraryBase.jspreadsheet.current.page(0);
                } else if (e.target.textContent == '>') {
                    libraryBase.jspreadsheet.current.page(e.target.getAttribute('title') - 1);
                } else {
                    libraryBase.jspreadsheet.current.page(e.target.textContent - 1);
                }
            }
        }

        if (libraryBase.jspreadsheet.current.edition) {
            libraryBase.jspreadsheet.isMouseAction = false;
        } else {
            libraryBase.jspreadsheet.isMouseAction = true;
        }
    } else {
        libraryBase.jspreadsheet.isMouseAction = false;
    }
}

// Mouse move controls
const mouseMoveControls = function(e) {
    e = e || window.event;

    let mouseButton;

    if (e.buttons) {
        mouseButton = e.buttons;
    } else if (e.button) {
        mouseButton = e.button;
    } else {
        mouseButton = e.which;
    }

    if (! mouseButton) {
        libraryBase.jspreadsheet.isMouseAction = false;
    }

    if (libraryBase.jspreadsheet.current) {
        if (libraryBase.jspreadsheet.isMouseAction == true) {
            // Resizing is ongoing
            if (libraryBase.jspreadsheet.current.resizing) {
                if (libraryBase.jspreadsheet.current.resizing.column) {
                    const width = e.pageX - libraryBase.jspreadsheet.current.resizing.mousePosition;

                    if (libraryBase.jspreadsheet.current.resizing.width + width > 0) {
                        const tempWidth = libraryBase.jspreadsheet.current.resizing.width + width;
                        libraryBase.jspreadsheet.current.cols[libraryBase.jspreadsheet.current.resizing.column].colElement.setAttribute('width', tempWidth);

                        updateCornerPosition.call(libraryBase.jspreadsheet.current);
                    }
                } else {
                    const height = e.pageY - libraryBase.jspreadsheet.current.resizing.mousePosition;

                    if (libraryBase.jspreadsheet.current.resizing.height + height > 0) {
                        const tempHeight = libraryBase.jspreadsheet.current.resizing.height + height;
                        libraryBase.jspreadsheet.current.rows[libraryBase.jspreadsheet.current.resizing.row].element.setAttribute('height', tempHeight);

                        updateCornerPosition.call(libraryBase.jspreadsheet.current);
                    }
                }
            } else if (libraryBase.jspreadsheet.current.dragging) {
                if (libraryBase.jspreadsheet.current.dragging.column) {
                    const columnId = e.target.getAttribute('data-x');
                    if (columnId) {

                        if (isColMerged.call(libraryBase.jspreadsheet.current, columnId).length) {
                            console.error('Jspreadsheet: This column is part of a merged cell.');
                        } else {
                            for (let i = 0; i < libraryBase.jspreadsheet.current.headers.length; i++) {
                                libraryBase.jspreadsheet.current.headers[i].classList.remove('dragging-left');
                                libraryBase.jspreadsheet.current.headers[i].classList.remove('dragging-right');
                            }

                            if (libraryBase.jspreadsheet.current.dragging.column == columnId) {
                                libraryBase.jspreadsheet.current.dragging.destination = parseInt(columnId);
                            } else {
                                if (e.target.clientWidth / 2 > e.offsetX) {
                                    if (libraryBase.jspreadsheet.current.dragging.column < columnId) {
                                        libraryBase.jspreadsheet.current.dragging.destination = parseInt(columnId) - 1;
                                    } else {
                                        libraryBase.jspreadsheet.current.dragging.destination = parseInt(columnId);
                                    }
                                    libraryBase.jspreadsheet.current.headers[columnId].classList.add('dragging-left');
                                } else {
                                    if (libraryBase.jspreadsheet.current.dragging.column < columnId) {
                                        libraryBase.jspreadsheet.current.dragging.destination = parseInt(columnId);
                                    } else {
                                        libraryBase.jspreadsheet.current.dragging.destination = parseInt(columnId) + 1;
                                    }
                                    libraryBase.jspreadsheet.current.headers[columnId].classList.add('dragging-right');
                                }
                            }
                        }
                    }
                } else {
                    const rowId = e.target.getAttribute('data-y');
                    if (rowId) {
                        if (isRowMerged.call(libraryBase.jspreadsheet.current, rowId).length) {
                            console.error('Jspreadsheet: This row is part of a merged cell.');
                        } else {
                            const target = (e.target.clientHeight / 2 > e.offsetY) ? e.target.parentNode.nextSibling : e.target.parentNode;
                            if (libraryBase.jspreadsheet.current.dragging.element != target) {
                                e.target.parentNode.parentNode.insertBefore(libraryBase.jspreadsheet.current.dragging.element, target);
                                libraryBase.jspreadsheet.current.dragging.destination = Array.prototype.indexOf.call(libraryBase.jspreadsheet.current.dragging.element.parentNode.children, libraryBase.jspreadsheet.current.dragging.element);
                            }
                        }
                    }
                }
            }
        } else {
            const x = e.target.getAttribute('data-x');
            const y = e.target.getAttribute('data-y');
            const rect = e.target.getBoundingClientRect();

            if (libraryBase.jspreadsheet.current.cursor) {
                libraryBase.jspreadsheet.current.cursor.style.cursor = '';
                libraryBase.jspreadsheet.current.cursor = null;
            }

            if (e.target.parentNode.parentNode && e.target.parentNode.parentNode.className) {
                if (e.target.parentNode.parentNode.classList.contains('resizable')) {
                    if (e.target && x && ! y && (rect.width - (e.clientX - rect.left) < 6)) {
                        libraryBase.jspreadsheet.current.cursor = e.target;
                        libraryBase.jspreadsheet.current.cursor.style.cursor = 'col-resize';
                    } else if (e.target && ! x && y && (rect.height - (e.clientY - rect.top) < 6)) {
                        libraryBase.jspreadsheet.current.cursor = e.target;
                        libraryBase.jspreadsheet.current.cursor.style.cursor = 'row-resize';
                    }
                }

                if (e.target.parentNode.parentNode.classList.contains('draggable')) {
                    if (e.target && ! x && y && (rect.width - (e.clientX - rect.left) < 6)) {
                        libraryBase.jspreadsheet.current.cursor = e.target;
                        libraryBase.jspreadsheet.current.cursor.style.cursor = 'move';
                    } else if (e.target && x && ! y && (rect.height - (e.clientY - rect.top) < 6)) {
                        libraryBase.jspreadsheet.current.cursor = e.target;
                        libraryBase.jspreadsheet.current.cursor.style.cursor = 'move';
                    }
                }
            }
        }
    }
}

/**
 * Update copy selection
 *
 * @param int x, y
 * @return void
 */
const updateCopySelection = function(x3, y3) {
    const obj = this;

    // Remove selection
    removeCopySelection.call(obj);

    // Get elements first and last
    const x1 = obj.selectedContainer[0];
    const y1 = obj.selectedContainer[1];
    const x2 = obj.selectedContainer[2];
    const y2 = obj.selectedContainer[3];

    if (x3 != null && y3 != null) {
        let px, ux;

        if (x3 - x2 > 0) {
            px = parseInt(x2) + 1;
            ux = parseInt(x3);
        } else {
            px = parseInt(x3);
            ux = parseInt(x1) - 1;
        }

        let py, uy;

        if (y3 - y2 > 0) {
            py = parseInt(y2) + 1;
            uy = parseInt(y3);
        } else {
            py = parseInt(y3);
            uy = parseInt(y1) - 1;
        }

        if (ux - px <= uy - py) {
            px = parseInt(x1);
            ux = parseInt(x2);
        } else {
            py = parseInt(y1);
            uy = parseInt(y2);
        }

        for (let j = py; j <= uy; j++) {
            for (let i = px; i <= ux; i++) {
                if (obj.records[j][i] && obj.rows[j].element.style.display != 'none' && obj.records[j][i].element.style.display != 'none') {
                    obj.records[j][i].element.classList.add('selection');
                    obj.records[py][i].element.classList.add('selection-top');
                    obj.records[uy][i].element.classList.add('selection-bottom');
                    obj.records[j][px].element.classList.add('selection-left');
                    obj.records[j][ux].element.classList.add('selection-right');

                    // Persist selected elements
                    obj.selection.push(obj.records[j][i].element);
                }
            }
        }
    }
}

const mouseOverControls = function(e) {
    e = e || window.event;

    let mouseButton;

    if (e.buttons) {
        mouseButton = e.buttons;
    } else if (e.button) {
        mouseButton = e.button;
    } else {
        mouseButton = e.which;
    }

    if (! mouseButton) {
        libraryBase.jspreadsheet.isMouseAction = false;
    }

    if (libraryBase.jspreadsheet.current && libraryBase.jspreadsheet.isMouseAction == true) {
        // Get elements
        const jssTable = getElement(e.target);

        if (jssTable[0]) {
            // Avoid cross reference
            if (libraryBase.jspreadsheet.current != jssTable[0].jssWorksheet) {
                if (libraryBase.jspreadsheet.current) {
                    return false;
                }
            }

            let columnId = e.target.getAttribute('data-x');
            const rowId = e.target.getAttribute('data-y');
            if (libraryBase.jspreadsheet.current.resizing || libraryBase.jspreadsheet.current.dragging) {
            } else {
                // Header found
                if (jssTable[1] == 1) {
                    if (libraryBase.jspreadsheet.current.selectedHeader) {
                        columnId = e.target.getAttribute('data-x');
                        const o = libraryBase.jspreadsheet.current.selectedHeader;
                        const d = columnId;
                        // Update selection
                        updateSelectionFromCoords.call(libraryBase.jspreadsheet.current, o, 0, d, libraryBase.jspreadsheet.current.options.data.length - 1, e);
                    }
                }

                // Body found
                if (jssTable[1] == 2) {
                    if (e.target.classList.contains('jss_row')) {
                        if (libraryBase.jspreadsheet.current.selectedRow) {
                            const o = libraryBase.jspreadsheet.current.selectedRow;
                            const d = rowId;
                            // Update selection
                            updateSelectionFromCoords.call(libraryBase.jspreadsheet.current, 0, o, libraryBase.jspreadsheet.current.options.data[0].length - 1, d, e);
                        }
                    } else {
                        // Do not select edtion is in progress
                        if (! libraryBase.jspreadsheet.current.edition) {
                            if (columnId && rowId) {
                                if (libraryBase.jspreadsheet.current.selectedCorner) {
                                    updateCopySelection.call(libraryBase.jspreadsheet.current, columnId, rowId);
                                } else {
                                    if (libraryBase.jspreadsheet.current.selectedCell) {
                                        updateSelectionFromCoords.call(libraryBase.jspreadsheet.current, libraryBase.jspreadsheet.current.selectedCell[0], libraryBase.jspreadsheet.current.selectedCell[1], columnId, rowId, e);
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    // Clear any time control
    if (libraryBase.jspreadsheet.timeControl) {
        clearTimeout(libraryBase.jspreadsheet.timeControl);
        libraryBase.jspreadsheet.timeControl = null;
    }
}

const doubleClickControls = function(e) {
    // Jss is selected
    if (libraryBase.jspreadsheet.current) {
        // Corner action
        if (e.target.classList.contains('jss_corner')) {
            // Any selected cells
            if (libraryBase.jspreadsheet.current.highlighted.length > 0) {
                // Copy from this
                const x1 = libraryBase.jspreadsheet.current.highlighted[0].element.getAttribute('data-x');
                const y1 = parseInt(libraryBase.jspreadsheet.current.highlighted[libraryBase.jspreadsheet.current.highlighted.length - 1].element.getAttribute('data-y')) + 1;
                // Until this
                const x2 = libraryBase.jspreadsheet.current.highlighted[libraryBase.jspreadsheet.current.highlighted.length - 1].element.getAttribute('data-x');
                const y2 = libraryBase.jspreadsheet.current.records.length - 1
                // Execute copy
                copyData.call(libraryBase.jspreadsheet.current, libraryBase.jspreadsheet.current.records[y1][x1].element, libraryBase.jspreadsheet.current.records[y2][x2].element);
            }
        } else if (e.target.classList.contains('jss_column_filter')) {
            // Column
            const columnId = e.target.getAttribute('data-x');
            // Open filter
            openFilter.call(libraryBase.jspreadsheet.current, columnId);

        } else {
            // Get table
            const jssTable = getElement(e.target);

            // Double click over header
            if (jssTable[1] == 1 && libraryBase.jspreadsheet.current.options.columnSorting != false) {
                // Check valid column header coords
                const columnId = e.target.getAttribute('data-x');
                if (columnId) {
                    libraryBase.jspreadsheet.current.orderBy(parseInt(columnId));
                }
            }

            // Double click over body
            if (jssTable[1] == 2 && libraryBase.jspreadsheet.current.options.editable != false) {
                if (! libraryBase.jspreadsheet.current.edition) {
                    const getCellCoords = function(element) {
                        if (element.parentNode) {
                            const x = element.getAttribute('data-x');
                            const y = element.getAttribute('data-y');
                            if (x && y) {
                                return element;
                            } else {
                                return getCellCoords(element.parentNode);
                            }
                        }
                    }
                    const cell = getCellCoords(e.target);
                    if (cell && cell.classList.contains('highlight')) {
                        openEditor.call(libraryBase.jspreadsheet.current, cell, undefined, e);
                    }
                }
            }
        }
    }
}

const pasteControls = function(e) {
    if (libraryBase.jspreadsheet.current && libraryBase.jspreadsheet.current.selectedCell) {
        if (! libraryBase.jspreadsheet.current.edition) {
            if (libraryBase.jspreadsheet.current.options.editable != false) {
                if (e && e.clipboardData) {
                    paste.call(libraryBase.jspreadsheet.current, libraryBase.jspreadsheet.current.selectedCell[0], libraryBase.jspreadsheet.current.selectedCell[1], e.clipboardData.getData('text'));
                    e.preventDefault();
                } else if (window.clipboardData) {
                    paste.call(libraryBase.jspreadsheet.current, libraryBase.jspreadsheet.current.selectedCell[0], libraryBase.jspreadsheet.current.selectedCell[1], window.clipboardData.getData('text'));
                }
            }
        }
    }
}

const getRole = function(element) {
    if (element.classList.contains('jss_selectall')) {
        return 'select-all';
    }

    if (element.classList.contains('jss_corner')) {
        return 'fill-handle';
    }

    let tempElement = element;

    while (!tempElement.classList.contains('jss_spreadsheet')) {
        if (tempElement.classList.contains('jss_row')) {
            return 'row';
        }

        if (tempElement.classList.contains('jss_nested')) {
            return 'nested';
        }

        if (tempElement.classList.contains('jtabs-headers')) {
            return 'tabs';
        }

        if (tempElement.classList.contains('jtoolbar')) {
            return 'toolbar';
        }

        if (tempElement.classList.contains('jss_pagination')) {
            return 'pagination';
        }

        if (tempElement.tagName === 'TBODY') {
            return 'cell';
        }

        if (tempElement.tagName === 'TFOOT') {
            return getElementIndex(element) === 0 ? 'grid' : 'footer';
        }

        if (tempElement.tagName === 'THEAD') {
            return 'header';
        }

        tempElement = tempElement.parentElement;
    }

    return 'applications';
}

const defaultContextMenu = function(worksheet, x, y, role) {
    const items = [];

    if (role === 'header') {
        // Insert a new column
        if (worksheet.options.allowInsertColumn != false) {
            items.push({
                title: jSuites.translate('Insert a new column before'),
                onclick:function() {
                    worksheet.insertColumn(1, parseInt(x), 1);
                }
            });
        }

        if (worksheet.options.allowInsertColumn != false) {
            items.push({
                title: jSuites.translate('Insert a new column after'),
                onclick:function() {
                    worksheet.insertColumn(1, parseInt(x), 0);
                }
            });
        }

        // Delete a column
        if (worksheet.options.allowDeleteColumn != false) {
            items.push({
                title: jSuites.translate('Delete selected columns'),
                onclick:function() {
                    worksheet.deleteColumn(worksheet.getSelectedColumns().length ? undefined : parseInt(x));
                }
            });
        }

        // Rename column
        if (worksheet.options.allowRenameColumn != false) {
            items.push({
                title: jSuites.translate('Rename this column'),
                onclick:function() {
                    const oldValue = worksheet.getHeader(x);

                    const newValue = prompt(jSuites.translate('Column name'), oldValue);

                    worksheet.setHeader(x, newValue);
                }
            });
        }

        // Sorting
        if (worksheet.options.columnSorting != false) {
            // Line
            items.push({ type:'line' });

            items.push({
                title: jSuites.translate('Order ascending'),
                onclick:function() {
                    worksheet.orderBy(x, 0);
                }
            });
            items.push({
                title: jSuites.translate('Order descending'),
                onclick:function() {
                    worksheet.orderBy(x, 1);
                }
            });
        }
    }

    if (role === 'row' || role === 'cell') {
        // Insert new row
        if (worksheet.options.allowInsertRow != false) {
            items.push({
                title: jSuites.translate('Insert a new row before'),
                onclick:function() {
                    worksheet.insertRow(1, parseInt(y), 1);
                }
            });

            items.push({
                title: jSuites.translate('Insert a new row after'),
                onclick:function() {
                    worksheet.insertRow(1, parseInt(y));
                }
            });
        }

        if (worksheet.options.allowDeleteRow != false) {
            items.push({
                title: jSuites.translate('Delete selected rows'),
                onclick:function() {
                    worksheet.deleteRow(worksheet.getSelectedRows().length ? undefined : parseInt(y));
                }
            });
        }
    }

    if (role === 'cell') {
        if (worksheet.options.allowComments != false) {
            items.push({ type:'line' });

            const title = worksheet.records[y][x].element.getAttribute('title') || '';

            items.push({
                title: jSuites.translate(title ? 'Edit comments' : 'Add comments'),
                onclick:function() {
                    const comment = prompt(jSuites.translate('Comments'), title);
                    if (comment) {
                        worksheet.setComments(getCellNameFromCoords(x, y), comment);
                    }
                }
            });

            if (title) {
                items.push({
                    title: jSuites.translate('Clear comments'),
                    onclick:function() {
                        worksheet.setComments(getCellNameFromCoords(x, y), '');
                    }
                });
            }
        }
    }

    // Line
    if (items.length !== 0) {
        items.push({ type:'line' });
    }

    // Copy
    if (role === 'header' || role === 'row' || role === 'cell') {
        items.push({
            title: jSuites.translate('Copy') + '...',
            shortcut:'Ctrl + C',
            onclick:function() {
                copy.call(worksheet, true);
            }
        });

        // Paste
        if (navigator && navigator.clipboard) {
            items.push({
                title: jSuites.translate('Paste') + '...',
                shortcut:'Ctrl + V',
                onclick:function() {
                    if (worksheet.selectedCell) {
                        navigator.clipboard.readText().then(function(text) {
                            if (text) {
                                paste.call(worksheet, worksheet.selectedCell[0], worksheet.selectedCell[1], text);
                            }
                        });
                    }
                }
            });
        }
    }

    // Save
    if (worksheet.parent.config.allowExport != false) {
        items.push({
            title: jSuites.translate('Save as') + '...',
            shortcut: 'Ctrl + S',
            onclick: function () {
                worksheet.download();
            }
        });
    }

    // About
    if (worksheet.parent.config.about != false) {
        items.push({
            title: jSuites.translate('About'),
            onclick:function() {
                if (typeof worksheet.parent.config.about === 'undefined' || worksheet.parent.config.about === true) {
                    alert(version.print());
                } else {
                    alert(worksheet.parent.config.about);
                }
            }
        });
    }

    return items;
}

const getElementIndex = function(element) {
    const parentChildren = element.parentElement.children;

    for (let i = 0; i < parentChildren.length; i++) {
        const currentElement = parentChildren[i];

        if (element === currentElement) {
            return i;
        }
    }

    return -1;
}

const contextMenuControls = function(e) {
    e = e || window.event;
    if ("buttons" in e) {
        var mouseButton = e.buttons;
    } else {
        var mouseButton = e.which || e.button;
    }

    if (libraryBase.jspreadsheet.current) {
        const spreadsheet = libraryBase.jspreadsheet.current.parent;

        if (libraryBase.jspreadsheet.current.edition) {
            e.preventDefault();
        } else {
            spreadsheet.contextMenu.contextmenu.close();

            if (libraryBase.jspreadsheet.current) {
                const role = getRole(e.target);

                let x = null, y = null;

                if (role === 'cell') {
                    let cellElement = e.target;
                    while (cellElement.tagName !== 'TD') {
                        cellElement = cellElement.parentNode;
                    }

                    y = cellElement.getAttribute('data-y');
                    x = cellElement.getAttribute('data-x');

                    if (
                        !libraryBase.jspreadsheet.current.selectedCell ||
                        (x < parseInt(libraryBase.jspreadsheet.current.selectedCell[0])) || (x > parseInt(libraryBase.jspreadsheet.current.selectedCell[2])) ||
                        (y < parseInt(libraryBase.jspreadsheet.current.selectedCell[1])) || (y > parseInt(libraryBase.jspreadsheet.current.selectedCell[3]))
                    ) {
                        updateSelectionFromCoords.call(libraryBase.jspreadsheet.current, x, y, x, y, e);
                    }
                } else if (role === 'row' || role === 'header') {
                    if (role === 'row') {
                        y = e.target.getAttribute('data-y');
                    } else {
                        x = e.target.getAttribute('data-x');
                    }

                    if (
                        !libraryBase.jspreadsheet.current.selectedCell ||
                        (x < parseInt(libraryBase.jspreadsheet.current.selectedCell[0])) || (x > parseInt(libraryBase.jspreadsheet.current.selectedCell[2])) ||
                        (y < parseInt(libraryBase.jspreadsheet.current.selectedCell[1])) || (y > parseInt(libraryBase.jspreadsheet.current.selectedCell[3]))
                    ) {
                        updateSelectionFromCoords.call(libraryBase.jspreadsheet.current, x, y, x, y, e);
                    }
                } else if (role === 'nested') {
                    const columns = e.target.getAttribute('data-column').split(',');

                    x = getElementIndex(e.target) - 1;
                    y = getElementIndex(e.target.parentElement);

                    if (
                        !libraryBase.jspreadsheet.current.selectedCell ||
                        (columns[0] != parseInt(libraryBase.jspreadsheet.current.selectedCell[0])) || (columns[columns.length - 1] != parseInt(libraryBase.jspreadsheet.current.selectedCell[2])) ||
                        (libraryBase.jspreadsheet.current.selectedCell[1] != null || libraryBase.jspreadsheet.current.selectedCell[3] != null)
                    ) {
                        updateSelectionFromCoords.call(libraryBase.jspreadsheet.current, columns[0], null, columns[columns.length - 1], null, e);
                    }
                } else if (role === 'select-all') {
                    selectAll.call(libraryBase.jspreadsheet.current);
                } else if (role === 'tabs') {
                    x = getElementIndex(e.target);
                } else if (role === 'footer') {
                    x = getElementIndex(e.target) - 1;
                    y = getElementIndex(e.target.parentElement);
                }

                // Table found
                let items = defaultContextMenu(libraryBase.jspreadsheet.current,parseInt(x),parseInt(y), role);

                if (typeof spreadsheet.config.contextMenu === 'function') {
                    const result = spreadsheet.config.contextMenu(libraryBase.jspreadsheet.current, x, y, e, items, role, x, y);

                    if (result) {
                        items = result;
                    } else if (result === false) {
                        return;
                    }
                }

                if (typeof spreadsheet.plugins === 'object') {
                    Object.entries(spreadsheet.plugins).forEach(function([, plugin]) {
                        if (typeof plugin.contextMenu === 'function') {
                            const result = plugin.contextMenu(
                                libraryBase.jspreadsheet.current,
                                x !== null ? parseInt(x) : null,
                                y !== null ? parseInt(y) : null,
                                e,
                                items,
                                role,
                                x !== null ? parseInt(x) : null,
                                y !== null ? parseInt(y) : null
                            );

                            if (result) {
                                items = result;
                            }
                        }
                    });
                }

                // The id is depending on header and body
                spreadsheet.contextMenu.contextmenu.open(e, items);
                // Avoid the real one
                e.preventDefault();
            }
        }
    }
}

const touchStartControls = function(e) {
    const jssTable = getElement(e.target);

    if (jssTable[0]) {
        if (libraryBase.jspreadsheet.current != jssTable[0].jssWorksheet) {
            if (libraryBase.jspreadsheet.current) {
                libraryBase.jspreadsheet.current.resetSelection();
            }
            libraryBase.jspreadsheet.current = jssTable[0].jssWorksheet;
        }
    } else {
        if (libraryBase.jspreadsheet.current) {
            libraryBase.jspreadsheet.current.resetSelection();
            libraryBase.jspreadsheet.current = null;
        }
    }

    if (libraryBase.jspreadsheet.current) {
        if (! libraryBase.jspreadsheet.current.edition) {
            const columnId = e.target.getAttribute('data-x');
            const rowId = e.target.getAttribute('data-y');

            if (columnId && rowId) {
                updateSelectionFromCoords.call(libraryBase.jspreadsheet.current, columnId, rowId, undefined, undefined, e);

                libraryBase.jspreadsheet.timeControl = setTimeout(function() {
                    // Keep temporary reference to the element
                    if (libraryBase.jspreadsheet.current.options.columns[columnId].type == 'color') {
                        libraryBase.jspreadsheet.tmpElement = null;
                    } else {
                        libraryBase.jspreadsheet.tmpElement = e.target;
                    }
                    openEditor.call(libraryBase.jspreadsheet.current, e.target, false, e);
                }, 500);
            }
        }
    }
}

const touchEndControls = function(e) {
    // Clear any time control
    if (libraryBase.jspreadsheet.timeControl) {
        clearTimeout(libraryBase.jspreadsheet.timeControl);
        libraryBase.jspreadsheet.timeControl = null;
        // Element
        if (libraryBase.jspreadsheet.tmpElement && libraryBase.jspreadsheet.tmpElement.children[0].tagName == 'INPUT') {
            libraryBase.jspreadsheet.tmpElement.children[0].focus();
        }
        libraryBase.jspreadsheet.tmpElement = null;
    }
}

export const cutControls = function(e) {
    if (libraryBase.jspreadsheet.current) {
        if (! libraryBase.jspreadsheet.current.edition) {
            copy.call(libraryBase.jspreadsheet.current, true, undefined, undefined, undefined, undefined, true);
            if (libraryBase.jspreadsheet.current.options.editable != false) {
                libraryBase.jspreadsheet.current.setValue(
                    libraryBase.jspreadsheet.current.highlighted.map(function(record) {
                        return record.element;
                    }),
                    ''
                );
            }
        }
    }
}

const copyControls = function(e) {
    if (libraryBase.jspreadsheet.current && copyControls.enabled) {
        if (! libraryBase.jspreadsheet.current.edition) {
            copy.call(libraryBase.jspreadsheet.current, true);
        }
    }
}

/**
 * Valid international letter
 */
const validLetter = function (text) {
    const regex = /([\u0041-\u005A\u0061-\u007A\u00AA\u00B5\u00BA\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0\u08A2-\u08AC\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097F\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C33\u0C35-\u0C39\u0C3D\u0C58\u0C59\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D60\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F4\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191C\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19C1-\u19C7\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FCC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA697\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA78E\uA790-\uA793\uA7A0-\uA7AA\uA7F8-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA80-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uABC0-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC-\u0400-\u04FF']+)/g;
    return text.match(regex) ? 1 : 0;
}

const keyDownControls = function(e) {
    if (libraryBase.jspreadsheet.current) {
        if (libraryBase.jspreadsheet.current.edition) {
            if (e.which == 27) {
                // Escape
                if (libraryBase.jspreadsheet.current.edition) {
                    // Exit without saving
                    closeEditor.call(libraryBase.jspreadsheet.current, libraryBase.jspreadsheet.current.edition[0], false);
                }
                e.preventDefault();
            } else if (e.which == 13) {
                // Enter
                if (libraryBase.jspreadsheet.current.options.columns && libraryBase.jspreadsheet.current.options.columns[libraryBase.jspreadsheet.current.edition[2]] && libraryBase.jspreadsheet.current.options.columns[libraryBase.jspreadsheet.current.edition[2]].type == 'calendar') {
                    closeEditor.call(libraryBase.jspreadsheet.current, libraryBase.jspreadsheet.current.edition[0], true);
                } else if (
                    libraryBase.jspreadsheet.current.options.columns &&
                    libraryBase.jspreadsheet.current.options.columns[libraryBase.jspreadsheet.current.edition[2]] &&
                    libraryBase.jspreadsheet.current.options.columns[libraryBase.jspreadsheet.current.edition[2]].type == 'dropdown'
                ) {
                    // Do nothing
                } else {
                    // Alt enter -> do not close editor
                    if (
                        (
                            libraryBase.jspreadsheet.current.options.wordWrap == true ||
                            (
                                libraryBase.jspreadsheet.current.options.columns &&
                                libraryBase.jspreadsheet.current.options.columns[libraryBase.jspreadsheet.current.edition[2]] &&
                                libraryBase.jspreadsheet.current.options.columns[libraryBase.jspreadsheet.current.edition[2]].wordWrap == true
                            ) ||
                            (
                                libraryBase.jspreadsheet.current.options.data[libraryBase.jspreadsheet.current.edition[3]][libraryBase.jspreadsheet.current.edition[2]] &&
                                libraryBase.jspreadsheet.current.options.data[libraryBase.jspreadsheet.current.edition[3]][libraryBase.jspreadsheet.current.edition[2]].length > 200
                            )
                        ) &&
                        e.altKey
                    ) {
                        // Add new line to the editor
                        const editorTextarea = libraryBase.jspreadsheet.current.edition[0].children[0];
                        let editorValue = libraryBase.jspreadsheet.current.edition[0].children[0].value;
                        const editorIndexOf = editorTextarea.selectionStart;
                        editorValue = editorValue.slice(0, editorIndexOf) + "\n" + editorValue.slice(editorIndexOf);
                        editorTextarea.value = editorValue;
                        editorTextarea.focus();
                        editorTextarea.selectionStart = editorIndexOf + 1;
                        editorTextarea.selectionEnd = editorIndexOf + 1;
                    } else {
                        libraryBase.jspreadsheet.current.edition[0].children[0].blur();
                    }
                }
            } else if (e.which == 9) {
                // Tab
                if (
                    libraryBase.jspreadsheet.current.options.columns &&
                    libraryBase.jspreadsheet.current.options.columns[libraryBase.jspreadsheet.current.edition[2]] &&
                    ['calendar', 'html'].includes(libraryBase.jspreadsheet.current.options.columns[libraryBase.jspreadsheet.current.edition[2]].type)
                ) {
                    closeEditor.call(libraryBase.jspreadsheet.current, libraryBase.jspreadsheet.current.edition[0], true);
                } else {
                    libraryBase.jspreadsheet.current.edition[0].children[0].blur();
                }
            }
        }

        if (! libraryBase.jspreadsheet.current.edition && libraryBase.jspreadsheet.current.selectedCell) {
            // Which key
            if (e.which == 37) {
                left.call(libraryBase.jspreadsheet.current, e.shiftKey, e.ctrlKey);
                e.preventDefault();
            } else if (e.which == 39) {
                right.call(libraryBase.jspreadsheet.current, e.shiftKey, e.ctrlKey);
                e.preventDefault();
            } else if (e.which == 38) {
                up.call(libraryBase.jspreadsheet.current, e.shiftKey, e.ctrlKey);
                e.preventDefault();
            } else if (e.which == 40) {
                down.call(libraryBase.jspreadsheet.current, e.shiftKey, e.ctrlKey);
                e.preventDefault();
            } else if (e.which == 36) {
                first.call(libraryBase.jspreadsheet.current, e.shiftKey, e.ctrlKey);
                e.preventDefault();
            } else if (e.which == 35) {
                last.call(libraryBase.jspreadsheet.current, e.shiftKey, e.ctrlKey);
                e.preventDefault();
            } else if (e.which == 46) {
                // Delete
                if (libraryBase.jspreadsheet.current.options.editable != false) {
                    if (libraryBase.jspreadsheet.current.selectedRow) {
                        if (libraryBase.jspreadsheet.current.options.allowDeleteRow != false) {
                            if (confirm(jSuites.translate('Are you sure to delete the selected rows?'))) {
                                libraryBase.jspreadsheet.current.deleteRow();
                            }
                        }
                    } else if (libraryBase.jspreadsheet.current.selectedHeader) {
                        if (libraryBase.jspreadsheet.current.options.allowDeleteColumn != false) {
                            if (confirm(jSuites.translate('Are you sure to delete the selected columns?'))) {
                                libraryBase.jspreadsheet.current.deleteColumn();
                            }
                        }
                    } else {
                        // Change value
                        libraryBase.jspreadsheet.current.setValue(
                            libraryBase.jspreadsheet.current.highlighted.map(function(record) {
                                return record.element;
                            }),
                            ''
                        );
                    }
                }
            } else if (e.which == 13) {
                // Move cursor
                if (e.shiftKey) {
                    up.call(libraryBase.jspreadsheet.current);
                } else {
                    if (libraryBase.jspreadsheet.current.options.allowInsertRow != false) {
                        if (libraryBase.jspreadsheet.current.options.allowManualInsertRow != false) {
                            if (libraryBase.jspreadsheet.current.selectedCell[1] == libraryBase.jspreadsheet.current.options.data.length - 1) {
                                // New record in case selectedCell in the last row
                                libraryBase.jspreadsheet.current.insertRow();
                            }
                        }
                    }

                    down.call(libraryBase.jspreadsheet.current);
                }
                e.preventDefault();
            } else if (e.which == 9) {
                // Tab
                if (e.shiftKey) {
                    left.call(libraryBase.jspreadsheet.current);
                } else {
                    if (libraryBase.jspreadsheet.current.options.allowInsertColumn != false) {
                        if (libraryBase.jspreadsheet.current.options.allowManualInsertColumn != false) {
                            if (libraryBase.jspreadsheet.current.selectedCell[0] == libraryBase.jspreadsheet.current.options.data[0].length - 1) {
                                // New record in case selectedCell in the last column
                                libraryBase.jspreadsheet.current.insertColumn();
                            }
                        }
                    }

                    right.call(libraryBase.jspreadsheet.current);
                }
                e.preventDefault();
            } else {
                if ((e.ctrlKey || e.metaKey) && ! e.shiftKey) {
                    if (e.which == 65) {
                        // Ctrl + A
                        selectAll.call(libraryBase.jspreadsheet.current);
                        e.preventDefault();
                    } else if (e.which == 83) {
                        // Ctrl + S
                        libraryBase.jspreadsheet.current.download();
                        e.preventDefault();
                    } else if (e.which == 89) {
                        // Ctrl + Y
                        libraryBase.jspreadsheet.current.redo();
                        e.preventDefault();
                    } else if (e.which == 90) {
                        // Ctrl + Z
                        libraryBase.jspreadsheet.current.undo();
                        e.preventDefault();
                    } else if (e.which == 67) {
                        // Ctrl + C
                        copy.call(libraryBase.jspreadsheet.current, true);
                        e.preventDefault();
                    } else if (e.which == 88) {
                        // Ctrl + X
                        if (libraryBase.jspreadsheet.current.options.editable != false) {
                            cutControls();
                        } else {
                            copyControls();
                        }
                        e.preventDefault();
                    } else if (e.which == 86) {
                        // Ctrl + V
                        pasteControls();
                    }
                } else {
                    if (libraryBase.jspreadsheet.current.selectedCell) {
                        if (libraryBase.jspreadsheet.current.options.editable != false) {
                            const rowId = libraryBase.jspreadsheet.current.selectedCell[1];
                            const columnId = libraryBase.jspreadsheet.current.selectedCell[0];

                            // Characters able to start a edition
                            if (e.keyCode == 32) {
                                // Space
                                e.preventDefault()
                                if (
                                    libraryBase.jspreadsheet.current.options.columns[columnId].type == 'checkbox' ||
                                    libraryBase.jspreadsheet.current.options.columns[columnId].type == 'radio'
                                ) {
                                    setCheckRadioValue.call(libraryBase.jspreadsheet.current);
                                } else {
                                    // Start edition
                                    openEditor.call(libraryBase.jspreadsheet.current, libraryBase.jspreadsheet.current.records[rowId][columnId].element, true, e);
                                }
                            } else if (e.keyCode == 113) {
                                // Start edition with current content F2
                                openEditor.call(libraryBase.jspreadsheet.current, libraryBase.jspreadsheet.current.records[rowId][columnId].element, false, e);
                            } else if (
                                (e.keyCode == 8) ||
                                (e.keyCode >= 48 && e.keyCode <= 57) ||
                                (e.keyCode >= 96 && e.keyCode <= 111) ||
                                (e.keyCode >= 187 && e.keyCode <= 190) ||
                                ((String.fromCharCode(e.keyCode) == e.key || String.fromCharCode(e.keyCode).toLowerCase() == e.key.toLowerCase()) && validLetter(String.fromCharCode(e.keyCode)))
                            ) {
                                // Start edition
                                openEditor.call(libraryBase.jspreadsheet.current, libraryBase.jspreadsheet.current.records[rowId][columnId].element, true, e);
                                // Prevent entries in the calendar
                                if (libraryBase.jspreadsheet.current.options.columns && libraryBase.jspreadsheet.current.options.columns[columnId] && libraryBase.jspreadsheet.current.options.columns[columnId].type == 'calendar') {
                                    e.preventDefault();
                                }
                            }
                        }
                    }
                }
            }
        } else {
            if (e.target.classList.contains('jss_search')) {
                if (libraryBase.jspreadsheet.timeControl) {
                    clearTimeout(libraryBase.jspreadsheet.timeControl);
                }

                libraryBase.jspreadsheet.timeControl = setTimeout(function() {
                    libraryBase.jspreadsheet.current.search(e.target.value);
                }, 200);
            }
        }
    }
}

export const wheelControls = function(e) {
    const obj = this;

    if (obj.options.lazyLoading == true) {
        if (libraryBase.jspreadsheet.timeControlLoading == null) {
            libraryBase.jspreadsheet.timeControlLoading = setTimeout(function() {
                if (obj.content.scrollTop + obj.content.clientHeight >= obj.content.scrollHeight - 10) {
                    if (loadDown.call(obj)) {
                        if (obj.content.scrollTop + obj.content.clientHeight > obj.content.scrollHeight - 10) {
                            obj.content.scrollTop = obj.content.scrollTop - obj.content.clientHeight;
                        }
                        updateCornerPosition.call(obj);
                    }
                } else if (obj.content.scrollTop <= obj.content.clientHeight) {
                    if (loadUp.call(obj)) {
                        if (obj.content.scrollTop < 10) {
                            obj.content.scrollTop = obj.content.scrollTop + obj.content.clientHeight;
                        }
                        updateCornerPosition.call(obj);
                    }
                }

                libraryBase.jspreadsheet.timeControlLoading = null;
            }, 100);
        }
    }
}

let scrollLeft = 0;

const updateFreezePosition = function() {
    const obj = this;

    scrollLeft = obj.content.scrollLeft;
    let width = 0;
    if (scrollLeft > 50) {
        for (let i = 0; i < obj.options.freezeColumns; i++) {
            if (i > 0) {
                // Must check if the previous column is hidden or not to determin whether the width shoule be added or not!
                if (!obj.options.columns || !obj.options.columns[i-1] || obj.options.columns[i-1].type !== "hidden") {
                    let columnWidth;
                    if (obj.options.columns && obj.options.columns[i-1] && obj.options.columns[i-1].width !== undefined) {
                        columnWidth = parseInt(obj.options.columns[i-1].width);
                    } else {
                        columnWidth = obj.options.defaultColWidth !== undefined ? parseInt(obj.options.defaultColWidth) : 100;
                    }

                    width += parseInt(columnWidth);
                }
            }
            obj.headers[i].classList.add('jss_freezed');
            obj.headers[i].style.left = width + 'px';
            for (let j = 0; j < obj.rows.length; j++) {
                if (obj.rows[j] && obj.records[j][i]) {
                    const shifted = (scrollLeft + (i > 0 ? obj.records[j][i-1].element.style.width : 0)) - 51 + 'px';
                    obj.records[j][i].element.classList.add('jss_freezed');
                    obj.records[j][i].element.style.left = shifted;
                }
            }
        }
    } else {
        for (let i = 0; i < obj.options.freezeColumns; i++) {
            obj.headers[i].classList.remove('jss_freezed');
            obj.headers[i].style.left = '';
            for (let j = 0; j < obj.rows.length; j++) {
                if (obj.records[j][i]) {
                    obj.records[j][i].element.classList.remove('jss_freezed');
                    obj.records[j][i].element.style.left = '';
                }
            }
        }
    }

    // Place the corner in the correct place
    updateCornerPosition.call(obj);
}

export const scrollControls = function(e) {
    const obj = this;

    wheelControls.call(obj);

    if (obj.options.freezeColumns > 0 && obj.content.scrollLeft != scrollLeft) {
        updateFreezePosition.call(obj);
    }

    // Close editor
    if (obj.options.lazyLoading == true || obj.options.tableOverflow == true) {
        if (obj.edition && e.target.className.substr(0,9) != 'jdropdown') {
            closeEditor.call(obj, obj.edition[0], true);
        }
    }
}

export const setEvents = function(root) {
    destroyEvents(root);
    root.addEventListener("mouseup", mouseUpControls);
    root.addEventListener("mousedown", mouseDownControls);
    root.addEventListener("mousemove", mouseMoveControls);
    root.addEventListener("mouseover", mouseOverControls);
    root.addEventListener("dblclick", doubleClickControls);
    root.addEventListener("paste", pasteControls);
    root.addEventListener("contextmenu", contextMenuControls);
    root.addEventListener("touchstart", touchStartControls);
    root.addEventListener("touchend", touchEndControls);
    root.addEventListener("touchcancel", touchEndControls);
    root.addEventListener("touchmove", touchEndControls);
    document.addEventListener("keydown", keyDownControls);
}

export const destroyEvents = function(root) {
    root.removeEventListener("mouseup", mouseUpControls);
    root.removeEventListener("mousedown", mouseDownControls);
    root.removeEventListener("mousemove", mouseMoveControls);
    root.removeEventListener("mouseover", mouseOverControls);
    root.removeEventListener("dblclick", doubleClickControls);
    root.removeEventListener("paste", pasteControls);
    root.removeEventListener("contextmenu", contextMenuControls);
    root.removeEventListener("touchstart", touchStartControls);
    root.removeEventListener("touchend", touchEndControls);
    root.removeEventListener("touchcancel", touchEndControls);
    document.removeEventListener("keydown", keyDownControls);
}