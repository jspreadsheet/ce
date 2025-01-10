import { getColumnNameFromId } from "./internalHelpers.js";

/**
 * Get carret position for one element
 */
export const getCaretIndex = function(e) {
    let d;

    if (this.config.root) {
        d = this.config.root;
    } else {
        d = window;
    }
    let pos = 0;
    const s = d.getSelection();
    if (s) {
        if (s.rangeCount !== 0) {
            const r = s.getRangeAt(0);
            const p = r.cloneRange();
            p.selectNodeContents(e);
            p.setEnd(r.endContainer, r.endOffset);
            pos = p.toString().length;
        }
    }
    return pos;
}

/**
 * Invert keys and values
 */
export const invert = function(o) {
    const d = [];
    const k = Object.keys(o);
    for (let i = 0; i < k.length; i++) {
        d[o[k[i]]] = k[i];
    }
    return d;
}

/**
 * Get letter based on a number
 *
 * @param {number} columnNumber
 * @return string letter
 */
export const getColumnName = function (columnNumber){
    let dividend = columnNumber+1;
    let columnName = "";
    let modulo;

    while (dividend > 0) {
        modulo = (dividend - 1) % 26;
        columnName = String.fromCharCode(65 + modulo).toString() + columnName;
        dividend = parseInt((dividend - modulo) / 26);
    }

    return  columnName;
}

/**
 * Get column name from coords
 */
export const getCellNameFromCoords = function(x, y) {
    return getColumnName(parseInt(x)) + (parseInt(y) + 1);
}

export const getCoordsFromCellName = function(columnName) {
    // Get the letters
    const t = /^[a-zA-Z]+/.exec(columnName);

    if (t) {
        // Base 26 calculation
        let code = 0;
        for (let i = 0; i < t[0].length; i++) {
            code += parseInt(t[0].charCodeAt(i) - 64) * Math.pow(26, (t[0].length - 1 - i));
        }
        code--;
        // Make sure jspreadsheet starts on zero
        if (code < 0) {
            code = 0;
        }

        // Number
        let number = parseInt(/[0-9]+$/.exec(columnName)) || null;
        if (number > 0) {
            number--;
        }

        return [ code, number ];
    }
}

export const getCoordsFromRange = function(range) {
    const [start, end] = range.split(':');

    return [...getCoordsFromCellName(start), ...getCoordsFromCellName(end)];
}

/**
 * From stack overflow contributions
 */
export const parseCSV = function(str, delimiter) {
    // Remove last line break
    str = str.replace(/\r?\n$|\r$|\n$/g, "");
    // Last caracter is the delimiter
    if (str.charCodeAt(str.length-1) == 9) {
        str += "\0";
    }
    // user-supplied delimeter or default comma
    delimiter = (delimiter || ",");

    const arr = [];
    let quote = false;  // true means we're inside a quoted field
    // iterate over each character, keep track of current row and column (of the returned array)
    for (let row = 0, col = 0, c = 0; c < str.length; c++) {
        const cc = str[c], nc = str[c+1];
        arr[row] = arr[row] || [];
        arr[row][col] = arr[row][col] || '';

        // If the current character is a quotation mark, and we're inside a quoted field, and the next character is also a quotation mark, add a quotation mark to the current column and skip the next character
        if (cc == '"' && quote && nc == '"') { arr[row][col] += cc; ++c; continue; }

        // If it's just one quotation mark, begin/end quoted field
        if (cc == '"') { quote = !quote; continue; }

        // If it's a comma and we're not in a quoted field, move on to the next column
        if (cc == delimiter && !quote) { ++col; continue; }

        // If it's a newline (CRLF) and we're not in a quoted field, skip the next character and move on to the next row and move to column 0 of that new row
        if (cc == '\r' && nc == '\n' && !quote) { ++row; col = 0; ++c; continue; }

        // If it's a newline (LF or CR) and we're not in a quoted field, move on to the next row and move to column 0 of that new row
        if (cc == '\n' && !quote) { ++row; col = 0; continue; }
        if (cc == '\r' && !quote) { ++row; col = 0; continue; }

        // Otherwise, append the current character to the current column
        arr[row][col] += cc;
    }
    return arr;
}

export const createFromTable = function(el, options) {
    if (el.tagName != 'TABLE') {
        console.log('Element is not a table');
    } else {
        // Configuration
        if (! options) {
            options = {};
        }

        options.columns = [];
        options.data = [];

        // Colgroup
        const colgroup = el.querySelectorAll('colgroup > col');
        if (colgroup.length) {
            // Get column width
            for (let i = 0; i < colgroup.length; i++) {
                let width = colgroup[i].style.width;
                if (! width) {
                    width = colgroup[i].getAttribute('width');
                }
                // Set column width
                if (width) {
                    if (! options.columns[i]) {
                        options.columns[i] = {}
                    }
                    options.columns[i].width = width;
                }
            }
        }

        // Parse header
        const parseHeader = function(header, i) {
            // Get width information
            let info = header.getBoundingClientRect();
            const width = info.width > 50 ? info.width : 50;

            // Create column option
            if (! options.columns[i]) {
                options.columns[i] = {};
            }
            if (header.getAttribute('data-celltype')) {
                options.columns[i].type = header.getAttribute('data-celltype');
            } else {
                options.columns[i].type = 'text';
            }
            options.columns[i].width = width + 'px';
            options.columns[i].title = header.innerHTML;
            if (header.style.textAlign) {
                options.columns[i].align = header.style.textAlign;
            }

            if (info = header.getAttribute('name')) {
                options.columns[i].name = info;
            }
            if (info = header.getAttribute('id')) {
                options.columns[i].id = info;
            }
            if (info = header.getAttribute('data-mask')) {
                options.columns[i].mask = info;
            }
        }

        // Headers
        const nested = [];
        let headers = el.querySelectorAll(':scope > thead > tr');
        if (headers.length) {
            for (let j = 0; j < headers.length - 1; j++) {
                const cells = [];
                for (let i = 0; i < headers[j].children.length; i++) {
                    const row = {
                        title: headers[j].children[i].textContent,
                        colspan: headers[j].children[i].getAttribute('colspan') || 1,
                    };
                    cells.push(row);
                }
                nested.push(cells);
            }
            // Get the last row in the thead
            headers = headers[headers.length-1].children;
            // Go though the headers
            for (let i = 0; i < headers.length; i++) {
                parseHeader(headers[i], i);
            }
        }

        // Content
        let rowNumber = 0;
        const mergeCells = {};
        const rows = {};
        const style = {};
        const classes = {};

        let content = el.querySelectorAll(':scope > tr, :scope > tbody > tr');
        for (let j = 0; j < content.length; j++) {
            options.data[rowNumber] = [];
            if (options.parseTableFirstRowAsHeader == true && ! headers.length && j == 0) {
                for (let i = 0; i < content[j].children.length; i++) {
                    parseHeader(content[j].children[i], i);
                }
            } else {
                for (let i = 0; i < content[j].children.length; i++) {
                    // WickedGrid formula compatibility
                    let value = content[j].children[i].getAttribute('data-formula');
                    if (value) {
                        if (value.substr(0,1) != '=') {
                            value = '=' + value;
                        }
                    } else {
                        value = content[j].children[i].innerHTML;
                    }
                    options.data[rowNumber].push(value);

                    // Key
                    const cellName = getColumnNameFromId([ i, j ]);

                    // Classes
                    const tmp = content[j].children[i].getAttribute('class');
                    if (tmp) {
                        classes[cellName] = tmp;
                    }

                    // Merged cells
                    const mergedColspan = parseInt(content[j].children[i].getAttribute('colspan')) || 0;
                    const mergedRowspan = parseInt(content[j].children[i].getAttribute('rowspan')) || 0;
                    if (mergedColspan || mergedRowspan) {
                        mergeCells[cellName] = [ mergedColspan || 1, mergedRowspan || 1 ];
                    }

                    // Avoid problems with hidden cells
                    if (content[j].children[i].style && content[j].children[i].style.display == 'none') {
                        content[j].children[i].style.display = '';
                    }
                    // Get style
                    const s = content[j].children[i].getAttribute('style');
                    if (s) {
                        style[cellName] = s;
                    }
                    // Bold
                    if (content[j].children[i].classList.contains('styleBold')) {
                        if (style[cellName]) {
                            style[cellName] += '; font-weight:bold;';
                        } else {
                            style[cellName] = 'font-weight:bold;';
                        }
                    }
                }

                // Row Height
                if (content[j].style && content[j].style.height) {
                    rows[j] = { height: content[j].style.height };
                }

                // Index
                rowNumber++;
            }
        }

        // Nested
        if (Object.keys(nested).length > 0) {
            options.nestedHeaders = nested;
        }
        // Style
        if (Object.keys(style).length > 0) {
            options.style = style;
        }
        // Merged
        if (Object.keys(mergeCells).length > 0) {
            options.mergeCells = mergeCells;
        }
        // Row height
        if (Object.keys(rows).length > 0) {
            options.rows = rows;
        }
        // Classes
        if (Object.keys(classes).length > 0) {
            options.classes = classes;
        }

        content = el.querySelectorAll('tfoot tr');
        if (content.length) {
            const footers = [];
            for (let j = 0; j < content.length; j++) {
                let footer = [];
                for (let i = 0; i < content[j].children.length; i++) {
                    footer.push(content[j].children[i].textContent);
                }
                footers.push(footer);
            }
            if (Object.keys(footers).length > 0) {
                options.footers = footers;
            }
        }
        // TODO: data-hiddencolumns="3,4"

        // I guess in terms the better column type
        if (options.parseTableAutoCellType == true) {
            const pattern = [];
            for (let i = 0; i < options.columns.length; i++) {
                let test = true;
                let testCalendar = true;
                pattern[i] = [];
                for (let j = 0; j < options.data.length; j++) {
                    const value = options.data[j][i];
                    if (! pattern[i][value]) {
                        pattern[i][value] = 0;
                    }
                    pattern[i][value]++;
                    if (value.length > 25) {
                        test = false;
                    }
                    if (value.length == 10) {
                        if (! (value.substr(4,1) == '-' && value.substr(7,1) == '-')) {
                            testCalendar = false;
                        }
                    } else {
                        testCalendar = false;
                    }
                }

                const keys = Object.keys(pattern[i]).length;
                if (testCalendar) {
                    options.columns[i].type = 'calendar';
                } else if (test == true && keys > 1 && keys <= parseInt(options.data.length * 0.1)) {
                    options.columns[i].type = 'dropdown';
                    options.columns[i].source = Object.keys(pattern[i]);
                }
            }
        }

        return options;
    }
}