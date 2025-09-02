/**
 * Get table config information
 */
export const getWorksheetConfig = function () {
  const obj = this;

  return obj.options;
};

export const getSpreadsheetConfig = function () {
  const spreadsheet = this;

  return spreadsheet.config;
};

export const setConfig = function (config, spreadsheetLevel) {
  const obj = this;

  const keys = Object.keys(config);

  let spreadsheet;

  if (!obj.parent) {
    spreadsheetLevel = true;

    spreadsheet = obj;
  } else {
    spreadsheet = obj.parent;
  }

  keys.forEach(function (key) {
    if (spreadsheetLevel) {
      spreadsheet.config[key] = config[key];

      if (key === "toolbar") {
        if (config[key] === true) {
          spreadsheet.showToolbar();
        } else if (config[key] === false) {
          spreadsheet.hideToolbar();
        }
      }
    } else {
      obj.options[key] = config[key];
    }
  });
};
