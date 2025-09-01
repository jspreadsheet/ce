import { resetFilters } from './filter.js';
import { getIdFromColumnName } from './internalHelpers.js';
import { updateResult } from './internal.js';
import { isRowMerged } from './merges.js';

/**
 * Search
 */
export const search = function (query) {
    const obj = this;

    // Reset any filter
    if (obj.options.filters) {
        resetFilters.call(obj);
    }

    // Reset selection
    obj.resetSelection();

    // Total of results
    obj.pageNumber = 0;
    obj.results = [];

    if (query) {
        if (obj.searchInput.value !== query) {
            obj.searchInput.value = query;
        }

        // Search filter
        const search = function (item, query, index) {
            for (let i = 0; i < item.length; i++) {
                if (('' + item[i]).toLowerCase().search(query) >= 0 || ('' + obj.records[index][i].element.innerHTML).toLowerCase().search(query) >= 0) {
                    return true;
                }
            }
            return false;
        };

        // Result
        const addToResult = function (k) {
            if (obj.results.indexOf(k) == -1) {
                obj.results.push(k);
            }
        };

        let parsedQuery = query.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
        parsedQuery = new RegExp(parsedQuery, 'i');

        // Filter
        obj.options.data.forEach(function (v, k) {
            if (search(v, parsedQuery, k)) {
                // Merged rows found
                const rows = isRowMerged.call(obj, k);
                if (rows.length) {
                    for (let i = 0; i < rows.length; i++) {
                        const row = getIdFromColumnName(rows[i], true);
                        for (let j = 0; j < obj.options.mergeCells[rows[i]][1]; j++) {
                            addToResult(row[1] + j);
                        }
                    }
                } else {
                    // Normal row found
                    addToResult(k);
                }
            }
        });
    } else {
        obj.results = null;
    }

    updateResult.call(obj);
};

/**
 * Reset search
 */
export const resetSearch = function () {
    const obj = this;

    obj.searchInput.value = '';
    obj.search('');
    obj.results = null;
};
