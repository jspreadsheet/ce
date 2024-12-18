import jSuites from "jsuites";

/**
 * Prepare JSON in the correct format
 */
const prepareJson = function(data) {
    const obj = this;

    const rows = [];
    for (let i = 0; i < data.length; i++) {
        const x = data[i].x;
        const y = data[i].y;
        const k = obj.options.columns[x].name ? obj.options.columns[x].name : x;

        // Create row
        if (! rows[y]) {
            rows[y] = {
                row: y,
                data: {},
            };
        }
        rows[y].data[k] = data[i].value;
    }

    // Filter rows
    return rows.filter(function (el) {
        return el != null;
    });
}

/**
 * Post json to a remote server
 */
const save = function(url, data) {
    const obj = this;

    // Parse anything in the data before sending to the server
    const ret = dispatch.call(obj.parent, 'onbeforesave', obj.parent, obj, data);
    if (ret) {
        data = ret;
    } else {
        if (ret === false) {
            return false;
        }
    }

    // Remove update
    jSuites.ajax({
        url: url,
        method: 'POST',
        dataType: 'json',
        data: { data: JSON.stringify(data) },
        success: function(result) {
            // Event
            dispatch.call(obj, 'onsave', obj.parent, obj, data);
        }
    });
}

/**
 * Trigger events
 */
const dispatch = function(event) {
    const obj = this;
    let ret = null;

    let spreadsheet = obj.parent ? obj.parent : obj;

    // Dispatch events
    if (! spreadsheet.ignoreEvents) {
        // Call global event
        if (typeof(spreadsheet.config.onevent) == 'function') {
            ret = spreadsheet.config.onevent.apply(this, arguments);
        }
        // Call specific events
        if (typeof(spreadsheet.config[event]) == 'function') {
            ret = spreadsheet.config[event].apply(this, Array.prototype.slice.call(arguments, 1));
        }

        if (typeof spreadsheet.plugins === 'object') {
            const pluginKeys = Object.keys(spreadsheet.plugins);

            for (let pluginKeyIndex = 0; pluginKeyIndex < pluginKeys.length; pluginKeyIndex++) {
                const key = pluginKeys[pluginKeyIndex];
                const plugin = spreadsheet.plugins[key];

                if (typeof plugin.onevent === 'function') {
                    ret = plugin.onevent.apply(this, arguments);
                }
            }
        }
    }

    if (event == 'onafterchanges') {
        const scope = arguments;

        if (typeof spreadsheet.plugins === 'object') {
            Object.entries(spreadsheet.plugins).forEach(function([, plugin]) {
                if (typeof plugin.persistence === 'function') {
                    plugin.persistence(obj, 'setValue', { data: scope[2] });
                }
            });
        }

        if (obj.options.persistence) {
            const url = obj.options.persistence == true ? obj.options.url : obj.options.persistence;
            const data = prepareJson.call(obj, arguments[2]);
            save.call(obj, url, data);
        }
    }

    return ret;
}

export default dispatch;