import dispatch from "./dispatch.js";
import { getCoordsFromCellName } from "./helpers.js";
import { setHistory } from "./history.js";
import { getColumnNameFromId, getIdFromColumnName } from "./internalHelpers.js";

/**
 * Get cell comments, null cell for all
 */
export const getComments = function (cell) {
  const obj = this;

  if (cell) {
    if (typeof cell !== "string") {
      return getComments.call(obj);
    }

    cell = getIdFromColumnName(cell, true);

    return obj.records[cell[1]][cell[0]].element.getAttribute("title") || "";
  } else {
    const data = {};
    for (let j = 0; j < obj.options.data.length; j++) {
      for (let i = 0; i < obj.options.columns.length; i++) {
        const comments = obj.records[j][i].element.getAttribute("title");
        if (comments) {
          const cell = getColumnNameFromId([i, j]);
          data[cell] = comments;
        }
      }
    }
    return data;
  }
};

/**
 * Set cell comments
 */
export const setComments = function (cellId, comments) {
  const obj = this;

  let commentsObj;

  if (typeof cellId == "string") {
    commentsObj = { [cellId]: comments };
  } else {
    commentsObj = cellId;
  }

  const oldValue = {};

  Object.entries(commentsObj).forEach(function ([cellName, comment]) {
    const cellCoords = getCoordsFromCellName(cellName);

    // Keep old value
    oldValue[cellName] =
      obj.records[cellCoords[1]][cellCoords[0]].element.getAttribute("title");

    // Set new values
    obj.records[cellCoords[1]][cellCoords[0]].element.setAttribute(
      "title",
      comment ? comment : ""
    );

    // Remove class if there is no comment
    if (comment) {
      obj.records[cellCoords[1]][cellCoords[0]].element.classList.add(
        "jss_comments"
      );

      if (!obj.options.comments) {
        obj.options.comments = {};
      }

      obj.options.comments[cellName] = comment;
    } else {
      obj.records[cellCoords[1]][cellCoords[0]].element.classList.remove(
        "jss_comments"
      );

      if (obj.options.comments && obj.options.comments[cellName]) {
        delete obj.options.comments[cellName];
      }
    }
  });

  // Save history
  setHistory.call(obj, {
    action: "setComments",
    newValue: commentsObj,
    oldValue: oldValue,
  });

  // Set comments
  dispatch.call(obj, "oncomments", obj, commentsObj, oldValue);
};
