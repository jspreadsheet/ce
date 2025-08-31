import { copy } from "./copyPaste.js";

/**
 * Download CSV table
 *
 * @return null
 */
export const download = function(includeHeaders, processed) {
    const obj = this;

    if (obj.parent.config.allowExport == false) {
        console.error('Export not allowed');
    } else {
        // Data
        let data = '';

        // Get data
        data += copy.call(obj, false, obj.options.csvDelimiter, true, includeHeaders, true, undefined, processed);

        // Download element
        const blob = new Blob(["\uFEFF"+data], {type: 'text/csv;charset=utf-8;'});

        // IE Compatibility
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveOrOpenBlob(blob, (obj.options.csvFileName || obj.options.worksheetName) + '.csv');
        } else {
            // Download element
            const pom = document.createElement('a');
            pom.setAttribute('target', '_top');
            const url = URL.createObjectURL(blob);
            pom.href = url;
            pom.setAttribute('download', (obj.options.csvFileName || obj.options.worksheetName) + '.csv');
            document.body.appendChild(pom);
            pom.click();
            pom.parentNode.removeChild(pom);
        }
    }
}