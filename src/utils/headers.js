import { setHistory } from "./history.js";
import dispatch from "./dispatch.js";
import { getColumnName } from "./helpers.js";

/**
 * Get the column title
 *
 * @param column - column number (first column is: 0)
 * @param title - new column title
 */
export const getHeader = function (column) {
  const obj = this;

  return obj.headers[column].textContent;
};

/**
 * Get the headers
 *
 * @param asArray
 * @return mixed
 */
export const getHeaders = function (asArray) {
  const obj = this;

  const title = [];

  for (let i = 0; i < obj.headers.length; i++) {
    title.push(obj.getHeader(i));
  }

  return asArray ? title : title.join(obj.options.csvDelimiter);
};

/**
 * Set the column title
 *
 * @param column - column number (first column is: 0)
 * @param title - new column title
 */
export const setHeader = function (column, newValue) {
  const obj = this;

  if (obj.headers[column]) {
    const oldValue = obj.headers[column].textContent;
    const onchangeheaderOldValue =
      (obj.options.columns &&
        obj.options.columns[column] &&
        obj.options.columns[column].title) ||
      "";

    if (!newValue) {
      newValue = getColumnName(column);
    }

    obj.headers[column].textContent = newValue;
    // Keep the title property
    obj.headers[column].setAttribute("title", newValue);
    // Update title
    if (!obj.options.columns) {
      obj.options.columns = [];
    }
    if (!obj.options.columns[column]) {
      obj.options.columns[column] = {};
    }
    obj.options.columns[column].title = newValue;

    setHistory.call(obj, {
      action: "setHeader",
      column: column,
      oldValue: oldValue,
      newValue: newValue,
    });

    // On onchange header
    dispatch.call(
      obj,
      "onchangeheader",
      obj,
      parseInt(column),
      newValue,
      onchangeheaderOldValue
    );
  }
};
