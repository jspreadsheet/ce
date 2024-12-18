import dispatch from "./dispatch.js";

/**
 * Get meta information from cell(s)
 *
 * @return integer
 */
export const getMeta = function(cell, key) {
    const obj = this;

    if (! cell) {
        return obj.options.meta;
    } else {
        if (key) {
            return obj.options.meta && obj.options.meta[cell] && obj.options.meta[cell][key] ? obj.options.meta[cell][key] : null;
        } else {
            return obj.options.meta && obj.options.meta[cell] ? obj.options.meta[cell] : null;
        }
    }
}

/**
 * Update meta information
 *
 * @return integer
 */
export const updateMeta = function(affectedCells) {
    const obj = this;

    if (obj.options.meta) {
        const newMeta = {};
        const keys = Object.keys(obj.options.meta);
        for (let i = 0; i < keys.length; i++) {
            if (affectedCells[keys[i]]) {
                newMeta[affectedCells[keys[i]]] = obj.options.meta[keys[i]];
            } else {
                newMeta[keys[i]] = obj.options.meta[keys[i]];
            }
        }
        // Update meta information
        obj.options.meta = newMeta;
    }
}

/**
 * Set meta information to cell(s)
 *
 * @return integer
 */
export const setMeta = function(o, k, v) {
    const obj = this;

    if (! obj.options.meta) {
        obj.options.meta = {}
    }

    if (k && v) {
        // Set data value
        if (! obj.options.meta[o]) {
            obj.options.meta[o] = {};
        }
        obj.options.meta[o][k] = v;

        dispatch.call(obj, 'onchangemeta', obj, { [o]: { [k]: v } });
    } else {
        // Apply that for all cells
        const keys = Object.keys(o);
        for (let i = 0; i < keys.length; i++) {
            if (! obj.options.meta[keys[i]]) {
                obj.options.meta[keys[i]] = {};
            }

            const prop = Object.keys(o[keys[i]]);
            for (let j = 0; j < prop.length; j++) {
                obj.options.meta[keys[i]][prop[j]] = o[keys[i]][prop[j]];
            }
        }

        dispatch.call(obj, 'onchangemeta', obj, o);
    }
}