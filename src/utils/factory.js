import jSuites from 'jsuites';

import libraryBase from './libraryBase.js';
import { setEvents } from './events.js';
import { fullscreen, getWorksheetActive } from './internal.js';
import { hideToolbar, showToolbar, updateToolbar } from './toolbar.js';
import { buildWorksheet, createWorksheetObj, getNextDefaultWorksheetName } from './worksheets.js';
import dispatch from './dispatch.js';
import { createFromTable } from './helpers.js';
import { getSpreadsheetConfig, setConfig } from './config.js';

const factory = function() {};

const createWorksheets = async function(spreadsheet, options, el) {
    // Create worksheets
    let o = options.worksheets;
    if (o) {
        let tabsOptions = {
            animation: true,
            onbeforecreate: function(element, title) {
                if (title) {
                    return title;
                } else {
                    return getNextDefaultWorksheetName(spreadsheet);
                }
            },
            oncreate: function(element, newTabContent) {
                if (!spreadsheet.creationThroughJss) {
                    const worksheetName = element.tabs.headers.children[element.tabs.headers.children.length - 2].innerHTML;

                    createWorksheetObj.call(
                        spreadsheet.worksheets[0],
                        {
                            minDimensions: [10, 15],
                            worksheetName: worksheetName,
                        }
                    )
                } else {
                    spreadsheet.creationThroughJss = false;
                }

                const newWorksheet = spreadsheet.worksheets[spreadsheet.worksheets.length - 1];

                newWorksheet.element = newTabContent;

                buildWorksheet.call(newWorksheet)
                    .then(function() {
                        updateToolbar(newWorksheet);

                        dispatch.call(newWorksheet, 'oncreateworksheet', newWorksheet, options, spreadsheet.worksheets.length - 1);
                    });
            },
            onchange: function(element, instance, tabIndex) {
                if (spreadsheet.worksheets.length != 0 && spreadsheet.worksheets[tabIndex]) {
                    updateToolbar(spreadsheet.worksheets[tabIndex]);
                }
            }
        }

        if (options.tabs == true) {
            tabsOptions.allowCreate = true;
        } else {
            tabsOptions.hideHeaders = true;
        }

        tabsOptions.data = [];

        let sheetNumber = 1;

        for (let i = 0; i < o.length; i++) {
            if (!o[i].worksheetName) {
                o[i].worksheetName = 'Sheet' + sheetNumber++;
            }

            tabsOptions.data.push({
                title: o[i].worksheetName,
                content: ''
            });
        }

        el.classList.add('jss_spreadsheet');

        const tabs = jSuites.tabs(el, tabsOptions);

        for (let i = 0; i < o.length; i++) {
            spreadsheet.worksheets.push({
                parent: spreadsheet,
                element: tabs.content.children[i],
                options: o[i],
                filters: [],
                formula: [],
                history: [],
                selection: [],
                historyIndex: -1,
            });

            await buildWorksheet.call(spreadsheet.worksheets[i]);
        }
    } else {
        throw new Error('JSS: worksheets are not defined');
    }
}

factory.spreadsheet = async function(el, options, worksheets) {
    if (el.tagName == 'TABLE') {
        if (!options) {
            options = {};
        }

        if (!options.worksheets) {
            options.worksheets = [];
        }

        const tableOptions = createFromTable(el, options.worksheets[0]);

        options.worksheets[0] = tableOptions;

        const div = document.createElement('div');
        el.parentNode.insertBefore(div, el);
        el.remove();
        el = div;
    }

    let spreadsheet = {
        worksheets: worksheets,
        config: options,
        element: el,
        el,
    };

    // Contextmenu container
    spreadsheet.contextMenu = document.createElement('div');
    spreadsheet.contextMenu.className = 'jss_contextmenu';

    spreadsheet.getWorksheetActive = getWorksheetActive.bind(spreadsheet);
    spreadsheet.fullscreen = fullscreen.bind(spreadsheet);
    spreadsheet.showToolbar = showToolbar.bind(spreadsheet);
    spreadsheet.hideToolbar = hideToolbar.bind(spreadsheet);
    spreadsheet.getConfig = getSpreadsheetConfig.bind(spreadsheet);
    spreadsheet.setConfig = setConfig.bind(spreadsheet);

    spreadsheet.setPlugins = function(newPlugins) {
        if (!spreadsheet.plugins) {
            spreadsheet.plugins = {};
        }

        if (typeof newPlugins == 'object') {
            Object.entries(newPlugins).forEach(function([pluginName, plugin]) {
                spreadsheet.plugins[pluginName] = plugin.call(
                    libraryBase.jspreadsheet,
                    spreadsheet,
                    {},
                    spreadsheet.config,
                );
            })
        }
    }

    spreadsheet.setPlugins(options.plugins);

    // Create as worksheets
    await createWorksheets(spreadsheet, options, el);

    spreadsheet.element.appendChild(spreadsheet.contextMenu);

    // Create element
    jSuites.contextmenu(spreadsheet.contextMenu, {
        onclick:function() {
            spreadsheet.contextMenu.contextmenu.close(false);
        }
    });

    // Fullscreen
    if (spreadsheet.config.fullscreen == true) {
        spreadsheet.element.classList.add('fullscreen');
    }

    showToolbar.call(spreadsheet);

    // Build handlers
    if (options.root) {
        setEvents(options.root);
    } else {
        setEvents(document);
    }

    el.spreadsheet = spreadsheet;

    return spreadsheet;
}

factory.worksheet = function(spreadsheet, options, position) {
    // Worksheet object
    let w = {
        // Parent of a worksheet is always the spreadsheet
        parent: spreadsheet,
        // Options for this worksheet
        options: {},
    };

    // Create the worksheets object
    if (typeof(position) === 'undefined') {
        spreadsheet.worksheets.push(w);
    } else {
        spreadsheet.worksheets.splice(position, 0, w);
    }
    // Keep configuration used
    Object.assign(w.options, options);

    return w;
}

export default factory;