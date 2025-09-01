import dispatch from './dispatch.js';
import { getColumnNameFromId, getIdFromColumnName } from './internalHelpers.js';
import { setHistory } from './history.js';

/**
 * Get style information from cell(s)
 *
 * @return integer
 */
export const getStyle = function (cell, key) {
    const obj = this;

    // Cell
    if (!cell) {
        // Control vars
        const data = {};

        // Column and row length
        const x = obj.options.data[0].length;
        const y = obj.options.data.length;

        // Go through the columns to get the data
        for (let j = 0; j < y; j++) {
            for (let i = 0; i < x; i++) {
                // Value
                const v = key ? obj.records[j][i].element.style[key] : obj.records[j][i].element.getAttribute('style');

                // Any meta data for this column?
                if (v) {
                    // Column name
                    const k = getColumnNameFromId([i, j]);
                    // Value
                    data[k] = v;
                }
            }
        }

        return data;
    } else {
        cell = getIdFromColumnName(cell, true);

        return key ? obj.records[cell[1]][cell[0]].element.style[key] : obj.records[cell[1]][cell[0]].element.getAttribute('style');
    }
};

/**
 * Set meta information to cell(s)
 *
 * @return integer
 */
export const setStyle = function (o, k, v, force, ignoreHistoryAndEvents) {
    const obj = this;

    const newValue = {};
    const oldValue = {};

    // Apply style
    const applyStyle = function (cellId, key, value) {
        // Position
        const cell = getIdFromColumnName(cellId, true);

        if (obj.records[cell[1]] && obj.records[cell[1]][cell[0]] && (obj.records[cell[1]][cell[0]].element.classList.contains('readonly') == false || force)) {
            // Current value
            const currentValue = obj.records[cell[1]][cell[0]].element.style[key];

            // Change layout
            if (currentValue == value && !force) {
                value = '';
                obj.records[cell[1]][cell[0]].element.style[key] = '';
            } else {
                obj.records[cell[1]][cell[0]].element.style[key] = value;
            }

            // History
            if (!oldValue[cellId]) {
                oldValue[cellId] = [];
            }
            if (!newValue[cellId]) {
                newValue[cellId] = [];
            }

            oldValue[cellId].push([key + ':' + currentValue]);
            newValue[cellId].push([key + ':' + value]);
        }
    };

    if (k && v) {
        // Get object from string
        if (typeof o == 'string') {
            applyStyle(o, k, v);
        }
    } else {
        const keys = Object.keys(o);
        for (let i = 0; i < keys.length; i++) {
            let style = o[keys[i]];
            if (typeof style == 'string') {
                style = style.split(';');
            }
            for (let j = 0; j < style.length; j++) {
                if (typeof style[j] == 'string') {
                    style[j] = style[j].split(':');
                }
                // Apply value
                if (style[j][0].trim()) {
                    applyStyle(keys[i], style[j][0].trim(), style[j][1]);
                }
            }
        }
    }

    let keys = Object.keys(oldValue);
    for (let i = 0; i < keys.length; i++) {
        oldValue[keys[i]] = oldValue[keys[i]].join(';');
    }
    keys = Object.keys(newValue);
    for (let i = 0; i < keys.length; i++) {
        newValue[keys[i]] = newValue[keys[i]].join(';');
    }

    if (!ignoreHistoryAndEvents) {
        // Keeping history of changes
        setHistory.call(obj, {
            action: 'setStyle',
            oldValue: oldValue,
            newValue: newValue,
        });
    }

    dispatch.call(obj, 'onchangestyle', obj, newValue);
};

export const resetStyle = function (o, ignoreHistoryAndEvents) {
    const obj = this;

    const keys = Object.keys(o);
    for (let i = 0; i < keys.length; i++) {
        // Position
        const cell = getIdFromColumnName(keys[i], true);
        if (obj.records[cell[1]] && obj.records[cell[1]][cell[0]]) {
            obj.records[cell[1]][cell[0]].element.setAttribute('style', '');
        }
    }
    obj.setStyle(o, null, null, null, ignoreHistoryAndEvents);
};
