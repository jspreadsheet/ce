/**
 * Go to a page in a lazyLoading
 */
export const loadPage = function (pageNumber) {
  const obj = this;

  // Search
  let results;

  if (
    (obj.options.search == true || obj.options.filters == true) &&
    obj.results
  ) {
    results = obj.results;
  } else {
    results = obj.rows;
  }

  // Per page
  const quantityPerPage = 100;

  // pageNumber
  if (pageNumber == null || pageNumber == -1) {
    // Last page
    pageNumber = Math.ceil(results.length / quantityPerPage) - 1;
  }

  let startRow = pageNumber * quantityPerPage;
  let finalRow = pageNumber * quantityPerPage + quantityPerPage;
  if (finalRow > results.length) {
    finalRow = results.length;
  }
  startRow = finalRow - 100;
  if (startRow < 0) {
    startRow = 0;
  }

  // Appeding items
  for (let j = startRow; j < finalRow; j++) {
    if (
      (obj.options.search == true || obj.options.filters == true) &&
      obj.results
    ) {
      obj.tbody.appendChild(obj.rows[results[j]].element);
    } else {
      obj.tbody.appendChild(obj.rows[j].element);
    }

    if (obj.tbody.children.length > quantityPerPage) {
      obj.tbody.removeChild(obj.tbody.firstChild);
    }
  }
};

export const loadValidation = function () {
  const obj = this;

  if (obj.selectedCell) {
    const currentPage =
      parseInt(obj.tbody.firstChild.getAttribute("data-y")) / 100;
    const selectedPage = parseInt(obj.selectedCell[3] / 100);
    const totalPages = parseInt(obj.rows.length / 100);

    if (currentPage != selectedPage && selectedPage <= totalPages) {
      if (
        !Array.prototype.indexOf.call(
          obj.tbody.children,
          obj.rows[obj.selectedCell[3]].element
        )
      ) {
        obj.loadPage(selectedPage);
        return true;
      }
    }
  }

  return false;
};

export const loadUp = function () {
  const obj = this;

  // Search
  let results;

  if (
    (obj.options.search == true || obj.options.filters == true) &&
    obj.results
  ) {
    results = obj.results;
  } else {
    results = obj.rows;
  }
  let test = 0;
  if (results.length > 100) {
    // Get the first element in the page
    let item = parseInt(obj.tbody.firstChild.getAttribute("data-y"));
    if (
      (obj.options.search == true || obj.options.filters == true) &&
      obj.results
    ) {
      item = results.indexOf(item);
    }
    if (item > 0) {
      for (let j = 0; j < 30; j++) {
        item = item - 1;
        if (item > -1) {
          if (
            (obj.options.search == true || obj.options.filters == true) &&
            obj.results
          ) {
            obj.tbody.insertBefore(
              obj.rows[results[item]].element,
              obj.tbody.firstChild
            );
          } else {
            obj.tbody.insertBefore(
              obj.rows[item].element,
              obj.tbody.firstChild
            );
          }
          if (obj.tbody.children.length > 100) {
            obj.tbody.removeChild(obj.tbody.lastChild);
            test = 1;
          }
        }
      }
    }
  }
  return test;
};

export const loadDown = function () {
  const obj = this;

  // Search
  let results;

  if (
    (obj.options.search == true || obj.options.filters == true) &&
    obj.results
  ) {
    results = obj.results;
  } else {
    results = obj.rows;
  }
  let test = 0;
  if (results.length > 100) {
    // Get the last element in the page
    let item = parseInt(obj.tbody.lastChild.getAttribute("data-y"));
    if (
      (obj.options.search == true || obj.options.filters == true) &&
      obj.results
    ) {
      item = results.indexOf(item);
    }
    if (item < obj.rows.length - 1) {
      for (let j = 0; j <= 30; j++) {
        if (item < results.length) {
          if (
            (obj.options.search == true || obj.options.filters == true) &&
            obj.results
          ) {
            obj.tbody.appendChild(obj.rows[results[item]].element);
          } else {
            obj.tbody.appendChild(obj.rows[item].element);
          }
          if (obj.tbody.children.length > 100) {
            obj.tbody.removeChild(obj.tbody.firstChild);
            test = 1;
          }
        }
        item = item + 1;
      }
    }
  }

  return test;
};
