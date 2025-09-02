import { createRow } from "./rows.js";
import { updateCell, updateFormulaChain, updateTable } from "./internal.js";
import { getIdFromColumnName } from "./internalHelpers.js";
import dispatch from "./dispatch.js";
import { setHistory } from "./history.js";
import { updatePagination } from "./pagination.js";
import { setMerge } from "./merges.js";
import { getCoordsFromRange } from "./helpers.js";

export const setData = function (data) {
  const obj = this;

  // Update data
  if (data) {
    obj.options.data = data;
  }

  // Data
  if (!obj.options.data) {
    obj.options.data = [];
  }

  // Prepare data
  if (obj.options.data && obj.options.data[0]) {
    if (!Array.isArray(obj.options.data[0])) {
      data = [];
      for (let j = 0; j < obj.options.data.length; j++) {
        const row = [];
        for (let i = 0; i < obj.options.columns.length; i++) {
          row[i] = obj.options.data[j][obj.options.columns[i].name];
        }
        data.push(row);
      }

      obj.options.data = data;
    }
  }

  // Adjust minimal dimensions
  let j = 0;
  let i = 0;
  const size_i = (obj.options.columns && obj.options.columns.length) || 0;
  const size_j = obj.options.data.length;
  const min_i = obj.options.minDimensions[0];
  const min_j = obj.options.minDimensions[1];
  const max_i = min_i > size_i ? min_i : size_i;
  const max_j = min_j > size_j ? min_j : size_j;

  for (j = 0; j < max_j; j++) {
    for (i = 0; i < max_i; i++) {
      if (obj.options.data[j] == undefined) {
        obj.options.data[j] = [];
      }

      if (obj.options.data[j][i] == undefined) {
        obj.options.data[j][i] = "";
      }
    }
  }

  // Reset containers
  obj.rows = [];
  obj.results = null;
  obj.records = [];
  obj.history = [];

  // Reset internal controllers
  obj.historyIndex = -1;

  // Reset data
  obj.tbody.innerHTML = "";

  let startNumber;
  let finalNumber;

  // Lazy loading
  if (obj.options.lazyLoading == true) {
    // Load only 100 records
    startNumber = 0;
    finalNumber = obj.options.data.length < 100 ? obj.options.data.length : 100;

    if (obj.options.pagination) {
      obj.options.pagination = false;
      console.error(
        "Jspreadsheet: Pagination will be disable due the lazyLoading"
      );
    }
  } else if (obj.options.pagination) {
    // Pagination
    if (!obj.pageNumber) {
      obj.pageNumber = 0;
    }
    var quantityPerPage = obj.options.pagination;
    startNumber = obj.options.pagination * obj.pageNumber;
    finalNumber =
      obj.options.pagination * obj.pageNumber + obj.options.pagination;

    if (obj.options.data.length < finalNumber) {
      finalNumber = obj.options.data.length;
    }
  } else {
    startNumber = 0;
    finalNumber = obj.options.data.length;
  }

  // Append nodes to the HTML
  for (j = 0; j < obj.options.data.length; j++) {
    // Create row
    const row = createRow.call(obj, j, obj.options.data[j]);
    // Append line to the table
    if (j >= startNumber && j < finalNumber) {
      obj.tbody.appendChild(row.element);
    }
  }

  if (obj.options.lazyLoading == true) {
    // Do not create pagination with lazyloading activated
  } else if (obj.options.pagination) {
    updatePagination.call(obj);
  }

  // Merge cells
  if (obj.options.mergeCells) {
    const keys = Object.keys(obj.options.mergeCells);
    for (let i = 0; i < keys.length; i++) {
      const num = obj.options.mergeCells[keys[i]];
      setMerge.call(obj, keys[i], num[0], num[1], 1);
    }
  }

  // Updata table with custom configurations if applicable
  updateTable.call(obj);
};

/**
 * Get the value from a cell
 *
 * @param object cell
 * @return string value
 */
export const getValue = function (cell, processedValue) {
  const obj = this;

  let x;
  let y;

  if (typeof cell !== "string") {
    return null;
  }

  cell = getIdFromColumnName(cell, true);
  x = cell[0];
  y = cell[1];

  let value = null;

  if (x != null && y != null) {
    if (obj.records[y] && obj.records[y][x] && processedValue) {
      value = obj.records[y][x].element.innerHTML;
    } else {
      if (obj.options.data[y] && obj.options.data[y][x] != "undefined") {
        value = obj.options.data[y][x];
      }
    }
  }

  return value;
};

/**
 * Get the value from a coords
 *
 * @param int x
 * @param int y
 * @return string value
 */
export const getValueFromCoords = function (x, y, processedValue) {
  const obj = this;

  let value = null;

  if (x != null && y != null) {
    if (obj.records[y] && obj.records[y][x] && processedValue) {
      value = obj.records[y][x].element.innerHTML;
    } else {
      if (obj.options.data[y] && obj.options.data[y][x] != "undefined") {
        value = obj.options.data[y][x];
      }
    }
  }

  return value;
};

/**
 * Set a cell value
 *
 * @param mixed cell destination cell
 * @param string value value
 * @return void
 */
export const setValue = function (cell, value, force) {
  const obj = this;

  const records = [];

  if (typeof cell == "string") {
    const columnId = getIdFromColumnName(cell, true);
    const x = columnId[0];
    const y = columnId[1];

    // Update cell
    records.push(updateCell.call(obj, x, y, value, force));

    // Update all formulas in the chain
    updateFormulaChain.call(obj, x, y, records);
  } else {
    let x = null;
    let y = null;
    if (cell && cell.getAttribute) {
      x = cell.getAttribute("data-x");
      y = cell.getAttribute("data-y");
    }

    // Update cell
    if (x != null && y != null) {
      records.push(updateCell.call(obj, x, y, value, force));

      // Update all formulas in the chain
      updateFormulaChain.call(obj, x, y, records);
    } else {
      const keys = Object.keys(cell);
      if (keys.length > 0) {
        for (let i = 0; i < keys.length; i++) {
          let x, y;

          if (typeof cell[i] == "string") {
            const columnId = getIdFromColumnName(cell[i], true);
            x = columnId[0];
            y = columnId[1];
          } else {
            if (cell[i].x != null && cell[i].y != null) {
              x = cell[i].x;
              y = cell[i].y;
              // Flexible setup
              if (cell[i].value != null) {
                value = cell[i].value;
              }
            } else {
              x = cell[i].getAttribute("data-x");
              y = cell[i].getAttribute("data-y");
            }
          }

          // Update cell
          if (x != null && y != null) {
            records.push(updateCell.call(obj, x, y, value, force));

            // Update all formulas in the chain
            updateFormulaChain.call(obj, x, y, records);
          }
        }
      }
    }
  }

  // Update history
  setHistory.call(obj, {
    action: "setValue",
    records: records,
    selection: obj.selectedCell,
  });

  // Update table with custom configurations if applicable
  updateTable.call(obj);

  // On after changes
  const onafterchangesRecords = records.map(function (record) {
    return {
      x: record.x,
      y: record.y,
      value: record.value,
      oldValue: record.oldValue,
    };
  });

  dispatch.call(obj, "onafterchanges", obj, onafterchangesRecords);
};

/**
 * Set a cell value based on coordinates
 *
 * @param int x destination cell
 * @param int y destination cell
 * @param string value
 * @return void
 */
export const setValueFromCoords = function (x, y, value, force) {
  const obj = this;

  const records = [];
  records.push(updateCell.call(obj, x, y, value, force));

  // Update all formulas in the chain
  updateFormulaChain.call(obj, x, y, records);

  // Update history
  setHistory.call(obj, {
    action: "setValue",
    records: records,
    selection: obj.selectedCell,
  });

  // Update table with custom configurations if applicable
  updateTable.call(obj);

  // On after changes
  const onafterchangesRecords = records.map(function (record) {
    return {
      x: record.x,
      y: record.y,
      value: record.value,
      oldValue: record.oldValue,
    };
  });

  dispatch.call(obj, "onafterchanges", obj, onafterchangesRecords);
};

/**
 * Get the whole table data
 *
 * @param bool get highlighted cells only
 * @return array data
 */
export const getData = function (highlighted, processed, delimiter, asJson) {
  const obj = this;

  // Control vars
  const dataset = [];
  let px = 0;
  let py = 0;

  // Column and row length
  const x = Math.max(
    ...obj.options.data.map(function (row) {
      return row.length;
    })
  );
  const y = obj.options.data.length;

  // Go through the columns to get the data
  for (let j = 0; j < y; j++) {
    px = 0;
    for (let i = 0; i < x; i++) {
      // Cell selected or fullset
      if (
        !highlighted ||
        obj.records[j][i].element.classList.contains("highlight")
      ) {
        // Get value
        if (!dataset[py]) {
          dataset[py] = [];
        }
        if (processed) {
          dataset[py][px] = obj.records[j][i].element.innerHTML;
        } else {
          dataset[py][px] = obj.options.data[j][i];
        }
        px++;
      }
    }
    if (px > 0) {
      py++;
    }
  }

  if (delimiter) {
    return (
      dataset
        .map(function (row) {
          return row.join(delimiter);
        })
        .join("\r\n") + "\r\n"
    );
  }

  if (asJson) {
    return dataset.map(function (row) {
      const resultRow = {};

      row.forEach(function (item, index) {
        resultRow[index] = item;
      });

      return resultRow;
    });
  }

  return dataset;
};

export const getDataFromRange = function (range, processed) {
  const obj = this;

  const coords = getCoordsFromRange(range);

  const dataset = [];

  for (let y = coords[1]; y <= coords[3]; y++) {
    dataset.push([]);

    for (let x = coords[0]; x <= coords[2]; x++) {
      if (processed) {
        dataset[dataset.length - 1].push(obj.records[y][x].element.innerHTML);
      } else {
        dataset[dataset.length - 1].push(obj.options.data[y][x]);
      }
    }
  }

  return dataset;
};
