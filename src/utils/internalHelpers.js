import { getColumnName } from "./helpers.js";

/**
 * Helper injectArray
 */
export const injectArray = function(o, idx, arr) {
    if (idx <= o.length) {
        return o.slice(0, idx).concat(arr).concat(o.slice(idx));
    }

    const array = o.slice(0, o.length);

    while (idx > array.length) {
        array.push(undefined);
    }

    return array.concat(arr)
}

/**
 * Convert excel like column to jss id
 *
 * @param string id
 * @return string id
 */
export const getIdFromColumnName = function (id, arr) {
    // Get the letters
    const t = /^[a-zA-Z]+/.exec(id);

    if (t) {
        // Base 26 calculation
        let code = 0;
        for (let i = 0; i < t[0].length; i++) {
            code += parseInt(t[0].charCodeAt(i) - 64) * Math.pow(26, (t[0].length - 1 - i));
        }
        code--;
        // Make sure jss starts on zero
        if (code < 0) {
            code = 0;
        }

        // Number
        let number = parseInt(/[0-9]+$/.exec(id));
        if (number > 0) {
            number--;
        }

        if (arr == true) {
            id = [ code, number ];
        } else {
            id = code + '-' + number;
        }
    }

    return id;
}

/**
 * Convert jss id to excel like column name
 *
 * @param string id
 * @return string id
 */
export const getColumnNameFromId = function (cellId) {
    if (! Array.isArray(cellId)) {
        cellId = cellId.split('-');
    }

    return getColumnName(parseInt(cellId[0])) + (parseInt(cellId[1]) + 1);
}