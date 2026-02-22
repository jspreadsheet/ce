import jSuites from 'jsuites';
import formula from '@jspreadsheet/formula';

import dispatch from './dispatch.js';
import { refreshSelection, updateCornerPosition } from './selection.js';
import { getColumnName } from './helpers.js';
import { updateMeta } from './meta.js';
import { getFreezeWidth } from './freeze.js';
import { updatePagination } from './pagination.js';
import { setFooter } from './footer.js';
import { getColumnNameFromId, getIdFromColumnName } from './internalHelpers.js';
import formulasTranslater from './formulasTranslater.json';
const locale = (navigator.language || navigator.userLanguage).replace('-', '_') || 'en_US';
export const updateTable = function () {
    const obj = this;

    // Check for spare
    if (obj.options.minSpareRows > 0) {
        let numBlankRows = 0;
        for (let j = obj.rows.length - 1; j >= 0; j--) {
            let test = false;
            for (let i = 0; i < obj.headers.length; i++) {
                if (obj.options.data[j][i]) {
                    test = true;
                }
            }
            if (test) {
                break;
            } else {
                numBlankRows++;
            }
        }

        if (obj.options.minSpareRows - numBlankRows > 0) {
            obj.insertRow(obj.options.minSpareRows - numBlankRows);
        }
    }

    if (obj.options.minSpareCols > 0) {
        let numBlankCols = 0;
        for (let i = obj.headers.length - 1; i >= 0; i--) {
            let test = false;
            for (let j = 0; j < obj.rows.length; j++) {
                if (obj.options.data[j][i]) {
                    test = true;
                }
            }
            if (test) {
                break;
            } else {
                numBlankCols++;
            }
        }

        if (obj.options.minSpareCols - numBlankCols > 0) {
            obj.insertColumn(obj.options.minSpareCols - numBlankCols);
        }
    }

    // Update footers
    if (obj.options.footers) {
        setFooter.call(obj);
    }

    if (obj.options.columns.length < obj.options.minDimensions[0]) {
        obj.options.minDimensions[0] = obj.options.columns.length;
    }

    // Update corner position
    setTimeout(function () {
        updateCornerPosition.call(obj);
    }, 0);
};

/**
 * Trying to extract a number from a string
 */
const parseNumber = function (value, columnNumber) {
    const obj = this;

    // Decimal point
    const decimal = columnNumber && obj.options.columns[columnNumber].decimal ? obj.options.columns[columnNumber].decimal : '.';

    // Parse both parts of the number
    let number = '' + value;
    number = number.split(decimal);
    number[0] = number[0].match(/[+-]?[0-9]/g);
    if (number[0]) {
        number[0] = number[0].join('');
    }
    if (number[1]) {
        number[1] = number[1].match(/[0-9]*/g).join('');
    }

    // Is a valid number
    if (number[0] && Number.isInteger(Number(number[0]))) {
        if (!number[1]) {
            value = Number(number[0] + '.00');
        } else {
            value = Number(number[0] + '.' + number[1]);
        }
    } else {
        value = null;
    }

    return value;
};

/**
 * Use a dictionary to translate formula names
 * @param {} formula
 * @returns
 */
function translateFormula(formula) {
    const dict = formulasTranslater[locale] || {};
    return formula.replace(/^=([A-ZÉÈÀÙÂÊÎÔÛÇ]+)\s*\(/i, function (match, p1) {
        const fn = dict[p1.toUpperCase()];
        return fn ? '=' + fn + '(' : match;
    });
}

/**
 * Parse formulas
 */
export const executeFormula = function (expression, x, y) {
    const obj = this;

    const formulaResults = [];
    const formulaLoopProtection = [];

    // Execute formula with loop protection
    const execute = function (expression, x, y) {
        // Parent column identification
        const parentId = getColumnNameFromId([x, y]);

        // Code protection
        if (formulaLoopProtection[parentId]) {
            console.error('Reference loop detected');
            return '#ERROR';
        }

        formulaLoopProtection[parentId] = true;

        // Convert range tokens
        const tokensUpdate = function (tokens) {
            for (let index = 0; index < tokens.length; index++) {
                const f = [];
                const token = tokens[index].split(':');
                const e1 = getIdFromColumnName(token[0], true);
                const e2 = getIdFromColumnName(token[1], true);

                let x1, x2;

                if (e1[0] <= e2[0]) {
                    x1 = e1[0];
                    x2 = e2[0];
                } else {
                    x1 = e2[0];
                    x2 = e1[0];
                }

                let y1, y2;

                if (e1[1] <= e2[1]) {
                    y1 = e1[1];
                    y2 = e2[1];
                } else {
                    y1 = e2[1];
                    y2 = e1[1];
                }

                for (let j = y1; j <= y2; j++) {
                    for (let i = x1; i <= x2; i++) {
                        f.push(getColumnNameFromId([i, j]));
                    }
                }

                expression = expression.replace(tokens[index], f.join(','));
            }
        };

        // Range with $ remove $
        expression = expression.replace(/\$?([A-Z]+)\$?([0-9]+)/g, '$1$2');

        let tokens = expression.match(/([A-Z]+[0-9]+):([A-Z]+[0-9]+)/g);
        if (tokens && tokens.length) {
            tokensUpdate(tokens);
        }

        // Get tokens
        tokens = expression.match(/([A-Z]+[0-9]+)/g);

        // Direct self-reference protection
        if (tokens && tokens.indexOf(parentId) > -1) {
            console.error('Self Reference detected');
            return '#ERROR';
        } else {
            // Expressions to be used in the parsing
            const formulaExpressions = {};

            if (tokens) {
                for (let i = 0; i < tokens.length; i++) {
                    // Keep chain
                    if (!obj.formula[tokens[i]]) {
                        obj.formula[tokens[i]] = [];
                    }
                    // Is already in the register
                    if (obj.formula[tokens[i]].indexOf(parentId) < 0) {
                        obj.formula[tokens[i]].push(parentId);
                    }

                    // Do not calculate again
                    if (eval('typeof(' + tokens[i] + ') == "undefined"')) {
                        // Coords
                        const position = getIdFromColumnName(tokens[i], 1);
                        // Get value
                        let value;

                        if (typeof obj.options.data[position[1]] != 'undefined' && typeof obj.options.data[position[1]][position[0]] != 'undefined') {
                            value = obj.options.data[position[1]][position[0]];
                        } else {
                            value = '';
                        }
                        // Get column data
                        if (('' + value).substr(0, 1) == '=') {
                            if (typeof formulaResults[tokens[i]] !== 'undefined') {
                                value = formulaResults[tokens[i]];
                            } else {
                                value = execute(translateFormula(value), position[0], position[1]);
                                formulaResults[tokens[i]] = value;
                            }
                        }
                        // Type!
                        if (('' + value).trim() == '') {
                            // Null
                            formulaExpressions[tokens[i]] = null;
                        } else {
                            if (value == Number(value) && obj.parent.config.autoCasting != false) {
                                // Number
                                formulaExpressions[tokens[i]] = Number(value);
                            } else {
                                // Trying any formatted number
                                const number = parseNumber.call(obj, value, position[0]);
                                if (obj.parent.config.autoCasting != false && number) {
                                    formulaExpressions[tokens[i]] = number;
                                } else {
                                    formulaExpressions[tokens[i]] = '"' + value + '"';
                                }
                            }
                        }
                    }
                }
            }

            const ret = dispatch.call(obj, 'onbeforeformula', obj, expression, x, y);
            if (ret === false) {
                return expression;
            } else if (ret) {
                expression = ret;
            }

            // Convert formula to javascript
            let res;

            try {
                res = formula(expression.substr(1), formulaExpressions, x, y, obj);

                if (typeof res === 'function') {
                    res = '#ERROR';
                }
            } catch (e) {
                res = '#ERROR';

                if (obj.parent.config.debugFormulas === true) {
                    console.log(expression.substr(1), formulaExpressions, e);
                }
            }

            return res;
        }
    };

    return execute(translateFormula(expression), x, y);
};

export const parseValue = function (i, j, value, cell) {
    const obj = this;

    if (('' + value).substr(0, 1) == '=' && obj.parent.config.parseFormulas != false) {
        value = executeFormula.call(obj, value, i, j);
    }

    // Column options
    const options = obj.options.columns && obj.options.columns[i];
    if (options && !isFormula(value)) {
        // Mask options
        let opt = null;
        if ((opt = getMask(options))) {
            if (value && value == Number(value)) {
                value = Number(value);
            }
            // Process the decimals to match the mask
            let masked = jSuites.mask.render(value, opt, true);
            // Negative indication
            if (cell) {
                if (opt.mask) {
                    const t = opt.mask.split(';');
                    if (t[1]) {
                        const t1 = t[1].match(new RegExp('\\[Red\\]', 'gi'));
                        if (t1) {
                            if (value < 0) {
                                cell.classList.add('red');
                            } else {
                                cell.classList.remove('red');
                            }
                        }
                        const t2 = t[1].match(new RegExp('\\(', 'gi'));
                        if (t2) {
                            if (value < 0) {
                                masked = '(' + masked + ')';
                            }
                        }
                    }
                }
            }

            if (masked) {
                value = masked;
            }
        }
    }

    return value;
};

/**
 * Get dropdown value from key
 */
const getDropDownValue = function (column, key) {
    const obj = this;

    const value = [];

    if (obj.options.columns && obj.options.columns[column] && obj.options.columns[column].source) {
        // Create array from source
        const combo = [];
        const source = obj.options.columns[column].source;

        for (let i = 0; i < source.length; i++) {
            if (typeof source[i] == 'object') {
                combo[source[i].id] = source[i].name;
            } else {
                combo[source[i]] = source[i];
            }
        }

        // Guarantee single multiple compatibility
        const keys = Array.isArray(key) ? key : ('' + key).split(';');

        for (let i = 0; i < keys.length; i++) {
            if (typeof keys[i] === 'object') {
                value.push(combo[keys[i].id]);
            } else {
                if (combo[keys[i]]) {
                    value.push(combo[keys[i]]);
                }
            }
        }
    } else {
        console.error('Invalid column');
    }

    return value.length > 0 ? value.join('; ') : '';
};

const validDate = function (date) {
    date = '' + date;
    if (date.substr(4, 1) == '-' && date.substr(7, 1) == '-') {
        return true;
    } else {
        date = date.split('-');
        if (date[0].length == 4 && date[0] == Number(date[0]) && date[1].length == 2 && date[1] == Number(date[1])) {
            return true;
        }
    }
    return false;
};

/**
 * Strip tags
 */
const stripScript = function (a) {
    const b = new Option();
    b.innerHTML = a;
    let c = null;
    for (a = b.getElementsByTagName('script'); (c = a[0]); ) c.parentNode.removeChild(c);
    return b.innerHTML;
};

export const createCell = function (i, j, value) {
    const obj = this;

    // Create cell and properties
    let td = document.createElement('td');
    td.setAttribute('data-x', i);
    td.setAttribute('data-y', j);

    if (obj.headers[i].style.display === 'none') {
        td.style.display = 'none';
    }
    // Security
    if (('' + value).substr(0, 1) == '=' && obj.options.secureFormulas == true) {
        const val = secureFormula(value);
        if (val != value) {
            // Update the data container
            value = val;
        }
    }

    // Custom column
    if (obj.options.columns && obj.options.columns[i] && typeof obj.options.columns[i].type === 'object') {
        if (obj.parent.config.parseHTML === true) {
            td.innerHTML = value;
        } else {
            td.textContent = value;
        }
        if (typeof obj.options.columns[i].type.createCell == 'function') {
            obj.options.columns[i].type.createCell(td, value, parseInt(i), parseInt(j), obj, obj.options.columns[i]);
        }
    } else {
        // Hidden column
        if (obj.options.columns && obj.options.columns[i] && obj.options.columns[i].type == 'hidden') {
            td.style.display = 'none';
            td.textContent = value;
        } else if (obj.options.columns && obj.options.columns[i] && (obj.options.columns[i].type == 'checkbox' || obj.options.columns[i].type == 'radio')) {
            // Create input
            const element = document.createElement('input');
            element.type = obj.options.columns[i].type;
            element.name = 'c' + i;
            element.checked = value == 1 || value == true || value == 'true' ? true : false;
            element.onclick = function () {
                obj.setValue(td, this.checked);
            };

            if (obj.options.columns[i].readOnly == true || obj.options.editable == false) {
                element.setAttribute('disabled', 'disabled');
            }

            // Append to the table
            td.appendChild(element);
            // Make sure the values are correct
            obj.options.data[j][i] = element.checked;
        } else if (obj.options.columns && obj.options.columns[i] && obj.options.columns[i].type == 'calendar') {
            // Try formatted date
            let formatted = null;
            if (!validDate(value)) {
                const tmp = jSuites.calendar.extractDateFromString(
                    value,
                    (obj.options.columns[i].options && obj.options.columns[i].options.format) || 'YYYY-MM-DD'
                );
                if (tmp) {
                    formatted = tmp;
                }
            }
            // Create calendar cell
            td.textContent = jSuites.calendar.getDateString(
                formatted ? formatted : value,
                obj.options.columns[i].options && obj.options.columns[i].options.format
            );
        } else if (obj.options.columns && obj.options.columns[i] && obj.options.columns[i].type == 'dropdown') {
            // Create dropdown cell
            td.classList.add('jss_dropdown');
            td.textContent = getDropDownValue.call(obj, i, value);
        } else if (obj.options.columns && obj.options.columns[i] && obj.options.columns[i].type == 'color') {
            if (obj.options.columns[i].render == 'square') {
                const color = document.createElement('div');
                color.className = 'color';
                color.style.backgroundColor = value;
                td.appendChild(color);
            } else {
                td.style.color = value;
                td.textContent = value;
            }
        } else if (obj.options.columns && obj.options.columns[i] && obj.options.columns[i].type == 'image') {
            if (value && value.substr(0, 10) == 'data:image') {
                const img = document.createElement('img');
                img.src = value;
                td.appendChild(img);
            }
        } else {
            if (obj.options.columns && obj.options.columns[i] && obj.options.columns[i].type == 'html') {
                td.innerHTML = stripScript(parseValue.call(this, i, j, value, td));
            } else {
                if (obj.parent.config.parseHTML === true) {
                    td.innerHTML = stripScript(parseValue.call(this, i, j, value, td));
                } else {
                    td.textContent = parseValue.call(this, i, j, value, td);
                }
            }
        }
    }

    // Readonly
    if (obj.options.columns && obj.options.columns[i] && obj.options.columns[i].readOnly == true) {
        td.className = 'readonly';
    }

    // Text align
    const colAlign = (obj.options.columns && obj.options.columns[i] && obj.options.columns[i].align) || obj.options.defaultColAlign || 'center';
    td.style.textAlign = colAlign;

    // Wrap option
    if (
        (!obj.options.columns || !obj.options.columns[i] || obj.options.columns[i].wordWrap != false) &&
        (obj.options.wordWrap == true ||
            (obj.options.columns && obj.options.columns[i] && obj.options.columns[i].wordWrap == true) ||
            td.innerHTML.length > 200)
    ) {
        td.style.whiteSpace = 'pre-wrap';
    }

    // Overflow
    if (i > 0) {
        if (this.options.textOverflow == true) {
            if (value || td.innerHTML) {
                obj.records[j][i - 1].element.style.overflow = 'hidden';
            } else {
                if (i == obj.options.columns.length - 1) {
                    td.style.overflow = 'hidden';
                }
            }
        }
    }

    dispatch.call(obj, 'oncreatecell', obj, td, i, j, value);

    return td;
};

/**
 * Update cell content
 *
 * @param object cell
 * @return void
 */
export const updateCell = function (x, y, value, force) {
    const obj = this;

    let record;

    // Changing value depending on the column type
    if (obj.records[y][x].element.classList.contains('readonly') == true && !force) {
        // Do nothing
        record = {
            x: x,
            y: y,
            col: x,
            row: y,
        };
    } else {
        // Security
        if (('' + value).substr(0, 1) == '=' && obj.options.secureFormulas == true) {
            const val = secureFormula(value);
            if (val != value) {
                // Update the data container
                value = val;
            }
        }

        // On change
        const val = dispatch.call(obj, 'onbeforechange', obj, obj.records[y][x].element, x, y, value);

        // If you return something this will overwrite the value
        if (val != undefined) {
            value = val;
        }

        if (
            obj.options.columns &&
            obj.options.columns[x] &&
            typeof obj.options.columns[x].type === 'object' &&
            typeof obj.options.columns[x].type.updateCell === 'function'
        ) {
            const result = obj.options.columns[x].type.updateCell(obj.records[y][x].element, value, parseInt(x), parseInt(y), obj, obj.options.columns[x]);

            if (result !== undefined) {
                value = result;
            }
        }

        // History format
        record = {
            x: x,
            y: y,
            col: x,
            row: y,
            value: value,
            oldValue: obj.options.data[y][x],
        };

        let editor = obj.options.columns && obj.options.columns[x] && typeof obj.options.columns[x].type === 'object' ? obj.options.columns[x].type : null;
        if (editor) {
            // Update data and cell
            obj.options.data[y][x] = value;
            if (typeof editor.setValue === 'function') {
                editor.setValue(obj.records[y][x].element, value);
            }
        } else {
            // Native functions
            if (obj.options.columns && obj.options.columns[x] && (obj.options.columns[x].type == 'checkbox' || obj.options.columns[x].type == 'radio')) {
                // Unchecked all options
                if (obj.options.columns[x].type == 'radio') {
                    for (let j = 0; j < obj.options.data.length; j++) {
                        obj.options.data[j][x] = false;
                    }
                }

                // Update data and cell
                obj.records[y][x].element.children[0].checked = value == 1 || value == true || value == 'true' || value == 'TRUE' ? true : false;
                obj.options.data[y][x] = obj.records[y][x].element.children[0].checked;
            } else if (obj.options.columns && obj.options.columns[x] && obj.options.columns[x].type == 'dropdown') {
                // Update data and cell
                obj.options.data[y][x] = value;
                obj.records[y][x].element.textContent = getDropDownValue.call(obj, x, value);
            } else if (obj.options.columns && obj.options.columns[x] && obj.options.columns[x].type == 'calendar') {
                // Try formatted date
                let formatted = null;
                if (!validDate(value)) {
                    const tmp = jSuites.calendar.extractDateFromString(
                        value,
                        (obj.options.columns[x].options && obj.options.columns[x].options.format) || 'YYYY-MM-DD'
                    );
                    if (tmp) {
                        formatted = tmp;
                    }
                }
                // Update data and cell
                obj.options.data[y][x] = value;
                obj.records[y][x].element.textContent = jSuites.calendar.getDateString(
                    formatted ? formatted : value,
                    obj.options.columns[x].options && obj.options.columns[x].options.format
                );
            } else if (obj.options.columns && obj.options.columns[x] && obj.options.columns[x].type == 'color') {
                // Update color
                obj.options.data[y][x] = value;
                // Render
                if (obj.options.columns[x].render == 'square') {
                    const color = document.createElement('div');
                    color.className = 'color';
                    color.style.backgroundColor = value;
                    obj.records[y][x].element.textContent = '';
                    obj.records[y][x].element.appendChild(color);
                } else {
                    obj.records[y][x].element.style.color = value;
                    obj.records[y][x].element.textContent = value;
                }
            } else if (obj.options.columns && obj.options.columns[x] && obj.options.columns[x].type == 'image') {
                value = '' + value;
                obj.options.data[y][x] = value;
                obj.records[y][x].element.innerHTML = '';
                if (value && value.substr(0, 10) == 'data:image') {
                    const img = document.createElement('img');
                    img.src = value;
                    obj.records[y][x].element.appendChild(img);
                }
            } else {
                // Update data and cell
                obj.options.data[y][x] = value;
                // Label
                if (obj.options.columns && obj.options.columns[x] && obj.options.columns[x].type == 'html') {
                    obj.records[y][x].element.innerHTML = stripScript(parseValue.call(obj, x, y, value));
                } else {
                    if (obj.parent.config.parseHTML === true) {
                        obj.records[y][x].element.innerHTML = stripScript(parseValue.call(obj, x, y, value, obj.records[y][x].element));
                    } else {
                        obj.records[y][x].element.textContent = parseValue.call(obj, x, y, value, obj.records[y][x].element);
                    }
                }
                // Handle big text inside a cell
                if (
                    (!obj.options.columns || !obj.options.columns[x] || obj.options.columns[x].wordWrap != false) &&
                    (obj.options.wordWrap == true ||
                        (obj.options.columns && obj.options.columns[x] && obj.options.columns[x].wordWrap == true) ||
                        obj.records[y][x].element.innerHTML.length > 200)
                ) {
                    obj.records[y][x].element.style.whiteSpace = 'pre-wrap';
                } else {
                    obj.records[y][x].element.style.whiteSpace = '';
                }
            }
        }

        // Overflow
        if (x > 0) {
            if (value) {
                obj.records[y][x - 1].element.style.overflow = 'hidden';
            } else {
                obj.records[y][x - 1].element.style.overflow = '';
            }
        }

        if (obj.options.columns && obj.options.columns[x] && typeof obj.options.columns[x].render === 'function') {
            obj.options.columns[x].render(
                obj.records[y] && obj.records[y][x] ? obj.records[y][x].element : null,
                value,
                parseInt(x),
                parseInt(y),
                obj,
                obj.options.columns[x]
            );
        }

        // On change
        dispatch.call(obj, 'onchange', obj, obj.records[y] && obj.records[y][x] ? obj.records[y][x].element : null, x, y, value, record.oldValue);
    }

    return record;
};

/**
 * The value is a formula
 */
export const isFormula = function (value) {
    const v = ('' + value)[0];
    return v == '=' || v == '#' ? true : false;
};

/**
 * Get the mask in the jSuites.mask format
 */
export const getMask = function (o) {
    if (o.format || o.mask || o.locale) {
        const opt = {};
        if (o.mask) {
            opt.mask = o.mask;
        } else if (o.format) {
            opt.mask = o.format;
        } else {
            opt.locale = o.locale;
            opt.options = o.options;
        }

        if (o.decimal) {
            if (!opt.options) {
                opt.options = {};
            }
            opt.options = { decimal: o.decimal };
        }
        return opt;
    }

    return null;
};

/**
 * Secure formula
 */
const secureFormula = function (oldValue) {
    let newValue = '';
    let inside = 0;

    for (let i = 0; i < oldValue.length; i++) {
        if (oldValue[i] == '"') {
            if (inside == 0) {
                inside = 1;
            } else {
                inside = 0;
            }
        }

        if (inside == 1) {
            newValue += oldValue[i];
        } else {
            newValue += oldValue[i].toUpperCase();
        }
    }

    return newValue;
};

/**
 * Update all related cells in the chain
 */
let chainLoopProtection = [];

export const updateFormulaChain = function (x, y, records) {
    const obj = this;

    const cellId = getColumnNameFromId([x, y]);
    if (obj.formula[cellId] && obj.formula[cellId].length > 0) {
        if (chainLoopProtection[cellId]) {
            obj.records[y][x].element.innerHTML = '#ERROR';
            obj.formula[cellId] = '';
        } else {
            // Protection
            chainLoopProtection[cellId] = true;

            for (let i = 0; i < obj.formula[cellId].length; i++) {
                const cell = getIdFromColumnName(obj.formula[cellId][i], true);
                // Update cell
                const value = '' + obj.options.data[cell[1]][cell[0]];
                if (value.substr(0, 1) == '=') {
                    records.push(updateCell.call(obj, cell[0], cell[1], value, true));
                } else {
                    // No longer a formula, remove from the chain
                    Object.keys(obj.formula)[i] = null;
                }
                updateFormulaChain.call(obj, cell[0], cell[1], records);
            }
        }
    }

    chainLoopProtection = [];
};

/**
 * Update formula
 */
export const updateFormula = function (formula, referencesToUpdate) {
    const testLetter = /[A-Z]/;
    const testNumber = /[0-9]/;

    let newFormula = '';
    let letter = null;
    let number = null;
    let token = '';

    for (let index = 0; index < formula.length; index++) {
        if (testLetter.exec(formula[index])) {
            letter = 1;
            number = 0;
            token += formula[index];
        } else if (testNumber.exec(formula[index])) {
            number = letter ? 1 : 0;
            token += formula[index];
        } else {
            if (letter && number) {
                token = referencesToUpdate[token] ? referencesToUpdate[token] : token;
            }
            newFormula += token;
            newFormula += formula[index];
            letter = 0;
            number = 0;
            token = '';
        }
    }

    if (token) {
        if (letter && number) {
            token = referencesToUpdate[token] ? referencesToUpdate[token] : token;
        }
        newFormula += token;
    }

    return newFormula;
};

/**
 * Update formulas
 */
const updateFormulas = function (referencesToUpdate) {
    const obj = this;

    // Update formulas
    for (let j = 0; j < obj.options.data.length; j++) {
        for (let i = 0; i < obj.options.data[0].length; i++) {
            const value = '' + obj.options.data[j][i];
            // Is formula
            if (value.substr(0, 1) == '=') {
                // Replace tokens
                const newFormula = updateFormula(value, referencesToUpdate);
                if (newFormula != value) {
                    obj.options.data[j][i] = newFormula;
                }
            }
        }
    }

    // Update formula chain
    const formula = [];
    const keys = Object.keys(obj.formula);
    for (let j = 0; j < keys.length; j++) {
        // Current key and values
        let key = keys[j];
        const value = obj.formula[key];
        // Update key
        if (referencesToUpdate[key]) {
            key = referencesToUpdate[key];
        }
        // Update values
        formula[key] = [];
        for (let i = 0; i < value.length; i++) {
            let letter = value[i];
            if (referencesToUpdate[letter]) {
                letter = referencesToUpdate[letter];
            }
            formula[key].push(letter);
        }
    }
    obj.formula = formula;
};

/**
 * Update cell references
 *
 * @return void
 */
export const updateTableReferences = function () {
    const obj = this;
    if (obj.skipUpdateTableReferences) {
        return;
    }

    // Update headers
    for (let i = 0; i < obj.headers.length; i++) {
        const x = obj.headers[i].getAttribute('data-x');

        if (x != i) {
            // Update coords
            obj.headers[i].setAttribute('data-x', i);
            // Title
            if (!obj.headers[i].getAttribute('title')) {
                obj.headers[i].innerHTML = getColumnName(i);
            }
        }
    }

    // Update all rows
    for (let j = 0; j < obj.rows.length; j++) {
        if (obj.rows[j]) {
            const y = obj.rows[j].element.getAttribute('data-y');

            if (y != j) {
                // Update coords
                obj.rows[j].element.setAttribute('data-y', j);
                obj.rows[j].element.children[0].setAttribute('data-y', j);
                // Row number
                obj.rows[j].element.children[0].innerHTML = j + 1;
            }
        }
    }

    // Regular cells affected by this change
    const affectedTokens = [];
    const mergeCellUpdates = [];

    // Update cell
    const updatePosition = function (x, y, i, j) {
        if (x != i) {
            obj.records[j][i].element.setAttribute('data-x', i);
        }
        if (y != j) {
            obj.records[j][i].element.setAttribute('data-y', j);
        }

        // Other updates
        if (x != i || y != j) {
            const columnIdFrom = getColumnNameFromId([x, y]);
            const columnIdTo = getColumnNameFromId([i, j]);
            affectedTokens[columnIdFrom] = columnIdTo;
        }
    };

    for (let j = 0; j < obj.records.length; j++) {
        for (let i = 0; i < obj.records[0].length; i++) {
            if (obj.records[j][i]) {
                // Current values
                const x = obj.records[j][i].element.getAttribute('data-x');
                const y = obj.records[j][i].element.getAttribute('data-y');

                // Update column
                if (obj.records[j][i].element.getAttribute('data-merged')) {
                    const columnIdFrom = getColumnNameFromId([x, y]);
                    const columnIdTo = getColumnNameFromId([i, j]);
                    if (mergeCellUpdates[columnIdFrom] == null) {
                        if (columnIdFrom == columnIdTo) {
                            mergeCellUpdates[columnIdFrom] = false;
                        } else {
                            const totalX = parseInt(i - x);
                            const totalY = parseInt(j - y);
                            mergeCellUpdates[columnIdFrom] = [columnIdTo, totalX, totalY];
                        }
                    }
                } else {
                    updatePosition(x, y, i, j);
                }
            }
        }
    }

    // Update merged if applicable
    const keys = Object.keys(mergeCellUpdates);
    if (keys.length) {
        for (let i = 0; i < keys.length; i++) {
            if (mergeCellUpdates[keys[i]]) {
                const info = getIdFromColumnName(keys[i], true);
                let x = info[0];
                let y = info[1];
                updatePosition(x, y, x + mergeCellUpdates[keys[i]][1], y + mergeCellUpdates[keys[i]][2]);

                const columnIdFrom = keys[i];
                const columnIdTo = mergeCellUpdates[keys[i]][0];
                for (let j = 0; j < obj.options.mergeCells[columnIdFrom][2].length; j++) {
                    x = parseInt(obj.options.mergeCells[columnIdFrom][2][j].getAttribute('data-x'));
                    y = parseInt(obj.options.mergeCells[columnIdFrom][2][j].getAttribute('data-y'));
                    obj.options.mergeCells[columnIdFrom][2][j].setAttribute('data-x', x + mergeCellUpdates[keys[i]][1]);
                    obj.options.mergeCells[columnIdFrom][2][j].setAttribute('data-y', y + mergeCellUpdates[keys[i]][2]);
                }

                obj.options.mergeCells[columnIdTo] = obj.options.mergeCells[columnIdFrom];
                delete obj.options.mergeCells[columnIdFrom];
            }
        }
    }

    // Update formulas
    updateFormulas.call(obj, affectedTokens);

    // Update meta data
    updateMeta.call(obj, affectedTokens);

    // Refresh selection
    refreshSelection.call(obj);

    // Update table with custom configuration if applicable
    updateTable.call(obj);
};

/**
 * Update scroll position based on the selection
 */
export const updateScroll = function (direction) {
    const obj = this;

    // Jspreadsheet Container information
    const contentRect = obj.content.getBoundingClientRect();
    const x1 = contentRect.left;
    const y1 = contentRect.top;
    const w1 = contentRect.width;
    const h1 = contentRect.height;

    // Direction Left or Up
    const reference = obj.records[obj.selectedCell[3]][obj.selectedCell[2]].element;

    // Reference
    const referenceRect = reference.getBoundingClientRect();
    const x2 = referenceRect.left;
    const y2 = referenceRect.top;
    const w2 = referenceRect.width;
    const h2 = referenceRect.height;

    let x, y;

    // Direction
    if (direction == 0 || direction == 1) {
        x = x2 - x1 + obj.content.scrollLeft;
        y = y2 - y1 + obj.content.scrollTop - 2;
    } else {
        x = x2 - x1 + obj.content.scrollLeft + w2;
        y = y2 - y1 + obj.content.scrollTop + h2;
    }

    // Top position check
    if (y > obj.content.scrollTop + 30 && y < obj.content.scrollTop + h1) {
        // In the viewport
    } else {
        // Out of viewport
        if (y < obj.content.scrollTop + 30) {
            obj.content.scrollTop = y - h2;
        } else {
            obj.content.scrollTop = y - (h1 - 2);
        }
    }

    // Freeze columns?
    const freezed = getFreezeWidth.call(obj);

    // Left position check - TODO: change that to the bottom border of the element
    if (x > obj.content.scrollLeft + freezed && x < obj.content.scrollLeft + w1) {
        // In the viewport
    } else {
        // Out of viewport
        if (x < obj.content.scrollLeft + 30) {
            obj.content.scrollLeft = x;
            if (obj.content.scrollLeft < 50) {
                obj.content.scrollLeft = 0;
            }
        } else if (x < obj.content.scrollLeft + freezed) {
            obj.content.scrollLeft = x - freezed - 1;
        } else {
            obj.content.scrollLeft = x - (w1 - 20);
        }
    }
};

export const updateResult = function () {
    const obj = this;

    let total = 0;
    let index = 0;

    // Page 1
    if (obj.options.lazyLoading == true) {
        total = 100;
    } else if (obj.options.pagination > 0) {
        total = obj.options.pagination;
    } else {
        if (obj.results) {
            total = obj.results.length;
        } else {
            total = obj.rows.length;
        }
    }

    // Reset current nodes
    while (obj.tbody.firstChild) {
        obj.tbody.removeChild(obj.tbody.firstChild);
    }

    // Hide all records from the table
    for (let j = 0; j < obj.rows.length; j++) {
        if (!obj.results || obj.results.indexOf(j) > -1) {
            if (index < total) {
                obj.tbody.appendChild(obj.rows[j].element);
                index++;
            }
            obj.rows[j].element.style.display = '';
        } else {
            obj.rows[j].element.style.display = 'none';
        }
    }

    // Update pagination
    if (obj.options.pagination > 0) {
        updatePagination.call(obj);
    }

    updateCornerPosition.call(obj);

    dispatch.call(obj, 'onupdateresult', obj, obj.results);

    return total;
};

/**
 * Get the cell object
 *
 * @param object cell
 * @return string value
 */
export const getCell = function (x, y) {
    const obj = this;

    if (typeof x === 'string') {
        // Convert in case name is excel liked ex. A10, BB92
        const cell = getIdFromColumnName(x, true);

        x = cell[0];
        y = cell[1];
    }

    return obj.records[y][x].element;
};

/**
 * Get the cell object from coords
 *
 * @param object cell
 * @return string value
 */
export const getCellFromCoords = function (x, y) {
    const obj = this;

    return obj.records[y][x].element;
};

/**
 * Get label
 *
 * @param object cell
 * @return string value
 */
export const getLabel = function (x, y) {
    const obj = this;

    if (typeof x === 'string') {
        // Convert in case name is excel liked ex. A10, BB92
        const cell = getIdFromColumnName(x, true);

        x = cell[0];
        y = cell[1];
    }

    return obj.records[y][x].element.innerHTML;
};

/**
 * Activate/Disable fullscreen
 * use programmatically : table.fullscreen(); or table.fullscreen(true); or table.fullscreen(false);
 * @Param {boolean} activate
 */
export const fullscreen = function (activate) {
    const spreadsheet = this;

    // If activate not defined, get reverse options.fullscreen
    if (activate == null) {
        activate = !spreadsheet.config.fullscreen;
    }

    // If change
    if (spreadsheet.config.fullscreen != activate) {
        spreadsheet.config.fullscreen = activate;

        // Test LazyLoading conflict
        if (activate == true) {
            spreadsheet.element.classList.add('fullscreen');
        } else {
            spreadsheet.element.classList.remove('fullscreen');
        }
    }
};

/**
 * Show index column
 */
export const showIndex = function () {
    const obj = this;

    obj.table.classList.remove('jss_hidden_index');
};

/**
 * Hide index column
 */
export const hideIndex = function () {
    const obj = this;

    obj.table.classList.add('jss_hidden_index');
};

/**
 * Create a nested header object
 */
export const createNestedHeader = function (nestedInformation) {
    const obj = this;

    const tr = document.createElement('tr');
    tr.classList.add('jss_nested');
    const td = document.createElement('td');
    td.classList.add('jss_selectall');

    tr.appendChild(td);
    // Element
    nestedInformation.element = tr;

    let headerIndex = 0;
    for (let i = 0; i < nestedInformation.length; i++) {
        // Default values
        if (!nestedInformation[i].colspan) {
            nestedInformation[i].colspan = 1;
        }
        if (!nestedInformation[i].title) {
            nestedInformation[i].title = '';
        }
        if (!nestedInformation[i].id) {
            nestedInformation[i].id = '';
        }

        // Number of columns
        let numberOfColumns = nestedInformation[i].colspan;

        // Classes container
        const column = [];
        // Header classes for this cell
        for (let x = 0; x < numberOfColumns; x++) {
            if (obj.options.columns[headerIndex] && obj.options.columns[headerIndex].type == 'hidden') {
                numberOfColumns++;
            }
            column.push(headerIndex);
            headerIndex++;
        }

        // Created the nested cell
        const td = document.createElement('td');
        td.setAttribute('data-column', column.join(','));
        td.setAttribute('colspan', nestedInformation[i].colspan);
        td.setAttribute('align', nestedInformation[i].align || 'center');
        td.setAttribute('id', nestedInformation[i].id);
        td.textContent = nestedInformation[i].title;
        tr.appendChild(td);
    }

    return tr;
};

export const getWorksheetActive = function () {
    const spreadsheet = this.parent ? this.parent : this;

    return spreadsheet.element.tabs ? spreadsheet.element.tabs.getActive() : 0;
};

export const getWorksheetInstance = function (index) {
    const spreadsheet = this;

    const worksheetIndex = typeof index !== 'undefined' ? index : getWorksheetActive.call(spreadsheet);

    return spreadsheet.worksheets[worksheetIndex];
};
