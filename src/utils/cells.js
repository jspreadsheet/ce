import { getCoordsFromCellName } from "./helpers.js";

export const setReadOnly = function (cell, state) {
  const obj = this;

  let record;

  if (typeof cell === "string") {
    const coords = getCoordsFromCellName(cell);

    record = obj.records[coords[1]][coords[0]];
  } else {
    const x = parseInt(cell.getAttribute("data-x"));
    const y = parseInt(cell.getAttribute("data-y"));

    record = obj.records[y][x];
  }

  if (state) {
    record.element.classList.add("readonly");
  } else {
    record.element.classList.remove("readonly");
  }
};

export const isReadOnly = function (x, y) {
  const obj = this;

  if (typeof x === "string" && typeof y === "undefined") {
    const coords = getCoordsFromCellName(x);

    [x, y] = coords;
  }

  return obj.records[y][x].element.classList.contains("readonly");
};
