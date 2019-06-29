// Based on sutoiku work (https://github.com/sutoiku)

var error = (function() {
    var exports = {};

    exports.nil = new Error('#NULL!');
    exports.div0 = new Error('#DIV/0!');
    exports.value = new Error('#VALUE!');
    exports.ref = new Error('#REF!');
    exports.name = new Error('#NAME?');
    exports.num = new Error('#NUM!');
    exports.na = new Error('#N/A');
    exports.error = new Error('#ERROR!');
    exports.data = new Error('#GETTING_DATA');

    return exports;
})();

var utils = (function() {
    var exports = {};

    exports.flattenShallow = function(array) {
        if (!array || !array.reduce) {
            return array;
        }

        return array.reduce(function(a, b) {
            var aIsArray = Array.isArray(a);
            var bIsArray = Array.isArray(b);

            if (aIsArray && bIsArray) {
                return a.concat(b);
            }
            if (aIsArray) {
                a.push(b);

                return a;
            }
            if (bIsArray) {
                return [ a ].concat(b);
            }

            return [ a, b ];
        });
    };

    exports.isFlat = function(array) {
        if (!array) {
            return false;
        }

        for (var i = 0; i < array.length; ++i) {
            if (Array.isArray(array[i])) {
                return false;
            }
        }

        return true;
    };

    exports.flatten = function() {
        var result = exports.argsToArray.apply(null, arguments);

        while (!exports.isFlat(result)) {
            result = exports.flattenShallow(result);
        }

        return result;
    };

    exports.argsToArray = function(args) {
        var result = [];

        exports.arrayEach(args, function(value) {
            result.push(value);
        });

        return result;
    };

    exports.numbers = function() {
        var possibleNumbers = this.flatten.apply(null, arguments);
        return possibleNumbers.filter(function(el) {
            return typeof el === 'number';
        });
    };

    exports.cleanFloat = function(number) {
        var power = 1e14;
        return Math.round(number * power) / power;
    };

    exports.parseBool = function(bool) {
        if (typeof bool === 'boolean') {
            return bool;
        }

        if (bool instanceof Error) {
            return bool;
        }

        if (typeof bool === 'number') {
            return bool !== 0;
        }

        if (typeof bool === 'string') {
            var up = bool.toUpperCase();
            if (up === 'TRUE') {
                return true;
            }

            if (up === 'FALSE') {
                return false;
            }
        }

        if (bool instanceof Date && !isNaN(bool)) {
            return true;
        }

        return error.value;
    };

    exports.parseNumber = function(string) {
        if (string === undefined || string === '') {
            return error.value;
        }
        if (!isNaN(string)) {
            return parseFloat(string);
        }

        return error.value;
    };

    exports.parseNumberArray = function(arr) {
        var len;

        if (!arr || (len = arr.length) === 0) {
            return error.value;
        }

        var parsed;

        while (len--) {
            parsed = exports.parseNumber(arr[len]);
            if (parsed === error.value) {
                return parsed;
            }
            arr[len] = parsed;
        }

        return arr;
    };

    exports.parseMatrix = function(matrix) {
        var n;

        if (!matrix || (n = matrix.length) === 0) {
            return error.value;
        }
        var pnarr;

        for (var i = 0; i < matrix.length; i++) {
            pnarr = exports.parseNumberArray(matrix[i]);
            matrix[i] = pnarr;

            if (pnarr instanceof Error) {
                return pnarr;
            }
        }

        return matrix;
    };

    var d1900 = new Date(Date.UTC(1900, 0, 1));
    exports.parseDate = function(date) {
        if (!isNaN(date)) {
            if (date instanceof Date) {
                return new Date(date);
            }
            var d = parseInt(date, 10);
            if (d < 0) {
                return error.num;
            }
            if (d <= 60) {
                return new Date(d1900.getTime() + (d - 1) * 86400000);
            }
            return new Date(d1900.getTime() + (d - 2) * 86400000);
        }
        if (typeof date === 'string') {
            date = new Date(date);
            if (!isNaN(date)) {
                return date;
            }
        }
        return error.value;
    };

    exports.parseDateArray = function(arr) {
        var len = arr.length;
        var parsed;
        while (len--) {
            parsed = this.parseDate(arr[len]);
            if (parsed === error.value) {
                return parsed;
            }
            arr[len] = parsed;
        }
        return arr;
    };

    exports.anyIsError = function() {
        var n = arguments.length;
        while (n--) {
            if (arguments[n] instanceof Error) {
                return true;
            }
        }
        return false;
    };

    exports.arrayValuesToNumbers = function(arr) {
        var n = arr.length;
        var el;
        while (n--) {
            el = arr[n];
            if (typeof el === 'number') {
                continue;
            }
            if (el === true) {
                arr[n] = 1;
                continue;
            }
            if (el === false) {
                arr[n] = 0;
                continue;
            }
            if (typeof el === 'string') {
                var number = this.parseNumber(el);
                if (number instanceof Error) {
                    arr[n] = 0;
                } else {
                    arr[n] = number;
                }
            }
        }
        return arr;
    };

    exports.rest = function(array, idx) {
        idx = idx || 1;
        if (!array || typeof array.slice !== 'function') {
            return array;
        }
        return array.slice(idx);
    };

    exports.initial = function(array, idx) {
        idx = idx || 1;
        if (!array || typeof array.slice !== 'function') {
            return array;
        }
        return array.slice(0, array.length - idx);
    };

    exports.arrayEach = function(array, iteratee) {
        var index = -1, length = array.length;

        while (++index < length) {
            if (iteratee(array[index], index, array) === false) {
                break;
            }
        }

        return array;
    };

    exports.transpose = function(matrix) {
        if (!matrix) {
            return error.value;
        }

        return matrix[0].map(function(col, i) {
            return matrix.map(function(row) {
                return row[i];
            });
        });
    };

    return exports;
})();

jexcel.methods = {};

jexcel.methods.datetime = (function() {
    var exports = {};

    var d1900 = new Date(1900, 0, 1);
    var WEEK_STARTS = [
        undefined,
        0,
        1,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        1,
        2,
        3,
        4,
        5,
        6,
        0
    ];
    var WEEK_TYPES = [
        [],
        [1, 2, 3, 4, 5, 6, 7],
        [7, 1, 2, 3, 4, 5, 6],
        [6, 0, 1, 2, 3, 4, 5],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [7, 1, 2, 3, 4, 5, 6],
        [6, 7, 1, 2, 3, 4, 5],
        [5, 6, 7, 1, 2, 3, 4],
        [4, 5, 6, 7, 1, 2, 3],
        [3, 4, 5, 6, 7, 1, 2],
        [2, 3, 4, 5, 6, 7, 1],
        [1, 2, 3, 4, 5, 6, 7]
    ];
    var WEEKEND_TYPES = [
        [],
        [6, 0],
        [0, 1],
        [1, 2],
        [2, 3],
        [3, 4],
        [4, 5],
        [5, 6],
        undefined,
        undefined,
        undefined, [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
        [4, 4],
        [5, 5],
        [6, 6]
    ];

    exports.DATE = function(year, month, day) {
        year = utils.parseNumber(year);
        month = utils.parseNumber(month);
        day = utils.parseNumber(day);
        if (utils.anyIsError(year, month, day)) {
            return error.value;
        }
        if (year < 0 || month < 0 || day < 0) {
            return error.num;
        }
        var date = new Date(year, month - 1, day);
        return date;
    };

    exports.DATEVALUE = function(date_text) {
        if (typeof date_text !== 'string') {
            return error.value;
        }
        var date = Date.parse(date_text);
        if (isNaN(date)) {
            return error.value;
        }
        if (date <= -2203891200000) {
            return (date - d1900) / 86400000 + 1;
        }
        return (date - d1900) / 86400000 + 2;
    };

    exports.DAY = function(serial_number) {
        var date = utils.parseDate(serial_number);
        if (date instanceof Error) {
            return date;
        }
        return date.getDate();
    };

    exports.DAYS = function(end_date, start_date) {
        end_date = utils.parseDate(end_date);
        start_date = utils.parseDate(start_date);
        if (end_date instanceof Error) {
            return end_date;
        }
        if (start_date instanceof Error) {
            return start_date;
        }
        return serial(end_date) - serial(start_date);
    };

    exports.DAYS360 = function(start_date, end_date, method) {
    };

    exports.EDATE = function(start_date, months) {
        start_date = utils.parseDate(start_date);
        if (start_date instanceof Error) {
            return start_date;
        }
        if (isNaN(months)) {
            return error.value;
        }
        months = parseInt(months, 10);
        start_date.setMonth(start_date.getMonth() + months);
        return serial(start_date);
    };

    exports.EOMONTH = function(start_date, months) {
        start_date = utils.parseDate(start_date);
        if (start_date instanceof Error) {
            return start_date;
        }
        if (isNaN(months)) {
            return error.value;
        }
        months = parseInt(months, 10);
        return serial(new Date(start_date.getFullYear(), start_date.getMonth() + months + 1, 0));
    };

    exports.HOUR = function(serial_number) {
        serial_number = utils.parseDate(serial_number);
        if (serial_number instanceof Error) {
            return serial_number;
        }
        return serial_number.getHours();
    };

    exports.INTERVAL = function(second) {
        if (typeof second !== 'number' && typeof second !== 'string') {
            return error.value;
        } else {
            second = parseInt(second, 10);
        }

        var year  = Math.floor(second/946080000);
        second    = second%946080000;
        var month = Math.floor(second/2592000);
        second    = second%2592000;
        var day   = Math.floor(second/86400);
        second    = second%86400;

        var hour  = Math.floor(second/3600);
        second    = second%3600;
        var min   = Math.floor(second/60);
        second    = second%60;
        var sec   = second;

        year  = (year  > 0) ? year  + 'Y' : '';
        month = (month > 0) ? month + 'M' : '';
        day   = (day   > 0) ? day   + 'D' : '';
        hour  = (hour  > 0) ? hour  + 'H' : '';
        min   = (min   > 0) ? min   + 'M' : '';
        sec   = (sec   > 0) ? sec   + 'S' : '';

        return 'P' + year + month + day + 'T' + hour + min + sec;
    };

    exports.ISOWEEKNUM = function(date) {
        date = utils.parseDate(date);
        if (date instanceof Error) {
            return date;
        }

        date.setHours(0, 0, 0);
        date.setDate(date.getDate() + 4 - (date.getDay() || 7));
        var yearStart = new Date(date.getFullYear(), 0, 1);
        return Math.ceil((((date - yearStart) / 86400000) + 1) / 7);
    };

    exports.MINUTE = function(serial_number) {
        serial_number = utils.parseDate(serial_number);
        if (serial_number instanceof Error) {
            return serial_number;
        }
        return serial_number.getMinutes();
    };

    exports.MONTH = function(serial_number) {
        serial_number = utils.parseDate(serial_number);
        if (serial_number instanceof Error) {
            return serial_number;
        }
        return serial_number.getMonth() + 1;
    };

    exports.NETWORKDAYS = function(start_date, end_date, holidays) {
    };

    exports.NETWORKDAYS.INTL = function(start_date, end_date, weekend, holidays) {
    };

    exports.NOW = function() {
        return new Date();
    };

    exports.SECOND = function(serial_number) {
        serial_number = utils.parseDate(serial_number);
        if (serial_number instanceof Error) {
            return serial_number;
        }
        return serial_number.getSeconds();
    };

    exports.TIME = function(hour, minute, second) {
        hour = utils.parseNumber(hour);
        minute = utils.parseNumber(minute);
        second = utils.parseNumber(second);
        if (utils.anyIsError(hour, minute, second)) {
            return error.value;
        }
        if (hour < 0 || minute < 0 || second < 0) {
            return error.num;
        }
        return (3600 * hour + 60 * minute + second) / 86400;
    };

    exports.TIMEVALUE = function(time_text) {
        time_text = utils.parseDate(time_text);
        if (time_text instanceof Error) {
            return time_text;
        }
        return (3600 * time_text.getHours() + 60 * time_text.getMinutes() + time_text.getSeconds()) / 86400;
    };

    exports.TODAY = function() {
        return new Date();
    };

    exports.WEEKDAY = function(serial_number, return_type) {
        serial_number = utils.parseDate(serial_number);
        if (serial_number instanceof Error) {
            return serial_number;
        }
        if (return_type === undefined) {
            return_type = 1;
        }
        var day = serial_number.getDay();
        return WEEK_TYPES[return_type][day];
    };

    exports.WEEKNUM = function(serial_number, return_type) {
    };

    exports.WORKDAY = function(start_date, days, holidays) {
    };

    exports.WORKDAY.INTL = function(start_date, days, weekend, holidays) {
    };

    exports.YEAR = function(serial_number) {
        serial_number = utils.parseDate(serial_number);
        if (serial_number instanceof Error) {
            return serial_number;
        }
        return serial_number.getFullYear();
    };

    function isLeapYear(year) {
        return new Date(year, 1, 29).getMonth() === 1;
    }

    exports.YEARFRAC = function(start_date, end_date, basis) {
    };

    function serial(date) {
        var addOn = (date > -2203891200000)?2:1;
        return (date - d1900) / 86400000 + addOn;
    }

    return exports;
})();

jexcel.methods.database = (function() {
    var exports = {};

    function compact(array) {
        if (!array) {
            return array;
        }
        var result = [];
        for (var i = 0; i < array.length; ++i) {
            if (!array[i]) {
                continue;
            }
            result.push(array[i]);
        }
        return result;
    }

    exports.FINDFIELD = function(database, title) {
        var index = null;
        for (var i = 0; i < database.length; i++) {
            if (database[i][0] === title) {
                index = i;
                break;
            }
        }

        // Return error if the input field title is incorrect
        if (index == null) {
            return error.value;
        }
        return index;
    };

    function findResultIndex(database, criterias) {
        var matches = {};
        for (var i = 1; i < database[0].length; ++i) {
            matches[i] = true;
        }
        var maxCriteriaLength = criterias[0].length;
        for (i = 1; i < criterias.length; ++i) {
            if (criterias[i].length > maxCriteriaLength) {
                maxCriteriaLength = criterias[i].length;
            }
        }

        for (var k = 1; k < database.length; ++k) {
            for (var l = 1; l < database[k].length; ++l) {
                var currentCriteriaResult = false;
                var hasMatchingCriteria = false;
                for (var j = 0; j < criterias.length; ++j) {
                    var criteria = criterias[j];
                    if (criteria.length < maxCriteriaLength) {
                        continue;
                    }

                    var criteriaField = criteria[0];
                    if (database[k][0] !== criteriaField) {
                        continue;
                    }
                    hasMatchingCriteria = true;
                    for (var p = 1; p < criteria.length; ++p) {
                        currentCriteriaResult = currentCriteriaResult
                                || eval(database[k][l] + criteria[p]); // jshint
                                                                        // ignore:line
                    }
                }
                if (hasMatchingCriteria) {
                    matches[l] = matches[l] && currentCriteriaResult;
                }
            }
        }

        var result = [];
        for (var n = 0; n < database[0].length; ++n) {
            if (matches[n]) {
                result.push(n - 1);
            }
        }
        return result;
    }

    // Database functions
    exports.DAVERAGE = function(database, field, criteria) {
        // Return error if field is not a number and not a string
        if (isNaN(field) && (typeof field !== "string")) {
            return error.value;
        }
        var resultIndexes = findResultIndex(database, criteria);
        var targetFields = [];
        if (typeof field === "string") {
            var index = exports.FINDFIELD(database, field);
            targetFields = utils.rest(database[index]);
        } else {
            targetFields = utils.rest(database[field]);
        }
        var sum = 0;
        for (var i = 0; i < resultIndexes.length; i++) {
            sum += targetFields[resultIndexes[i]];
        }
        return resultIndexes.length === 0 ? error.div0 : sum / resultIndexes.length;
    };

    exports.DCOUNT = function(database, field, criteria) {
    };

    exports.DCOUNTA = function(database, field, criteria) {
    };

    exports.DGET = function(database, field, criteria) {
        // Return error if field is not a number and not a string
        if (isNaN(field) && (typeof field !== "string")) {
            return error.value;
        }
        var resultIndexes = findResultIndex(database, criteria);
        var targetFields = [];
        if (typeof field === "string") {
            var index = exports.FINDFIELD(database, field);
            targetFields = utils.rest(database[index]);
        } else {
            targetFields = utils.rest(database[field]);
        }
        // Return error if no record meets the criteria
        if (resultIndexes.length === 0) {
            return error.value;
        }
        // Returns the #NUM! error value because more than one record meets the
        // criteria
        if (resultIndexes.length > 1) {
            return error.num;
        }

        return targetFields[resultIndexes[0]];
    };

    exports.DMAX = function(database, field, criteria) {
        // Return error if field is not a number and not a string
        if (isNaN(field) && (typeof field !== "string")) {
            return error.value;
        }
        var resultIndexes = findResultIndex(database, criteria);
        var targetFields = [];
        if (typeof field === "string") {
            var index = exports.FINDFIELD(database, field);
            targetFields = utils.rest(database[index]);
        } else {
            targetFields = utils.rest(database[field]);
        }
        var maxValue = targetFields[resultIndexes[0]];
        for (var i = 1; i < resultIndexes.length; i++) {
            if (maxValue < targetFields[resultIndexes[i]]) {
                maxValue = targetFields[resultIndexes[i]];
            }
        }
        return maxValue;
    };

    exports.DMIN = function(database, field, criteria) {
        // Return error if field is not a number and not a string
        if (isNaN(field) && (typeof field !== "string")) {
            return error.value;
        }
        var resultIndexes = findResultIndex(database, criteria);
        var targetFields = [];
        if (typeof field === "string") {
            var index = exports.FINDFIELD(database, field);
            targetFields = utils.rest(database[index]);
        } else {
            targetFields = utils.rest(database[field]);
        }
        var minValue = targetFields[resultIndexes[0]];
        for (var i = 1; i < resultIndexes.length; i++) {
            if (minValue > targetFields[resultIndexes[i]]) {
                minValue = targetFields[resultIndexes[i]];
            }
        }
        return minValue;
    };

    exports.DPRODUCT = function(database, field, criteria) {
        // Return error if field is not a number and not a string
        if (isNaN(field) && (typeof field !== "string")) {
            return error.value;
        }
        var resultIndexes = findResultIndex(database, criteria);
        var targetFields = [];
        if (typeof field === "string") {
            var index = exports.FINDFIELD(database, field);
            targetFields = utils.rest(database[index]);
        } else {
            targetFields = utils.rest(database[field]);
        }
        var targetValues = [];
        for (var i = 0; i < resultIndexes.length; i++) {
            targetValues[i] = targetFields[resultIndexes[i]];
        }
        targetValues = compact(targetValues);
        var result = 1;
        for (i = 0; i < targetValues.length; i++) {
            result *= targetValues[i];
        }
        return result;
    };

    exports.DSTDEV = function(database, field, criteria) {
    };

    exports.DSTDEVP = function(database, field, criteria) {
    };

    exports.DSUM = function(database, field, criteria) {
    };

    exports.DVAR = function(database, field, criteria) {
    };

    exports.DVARP = function(database, field, criteria) {
    };

    exports.MATCH = function(lookupValue, lookupArray, matchType) {
        if (!lookupValue && !lookupArray) {
            return error.na;
        }
        if (arguments.length === 2) {
            matchType = 1;
        }
        if (!(lookupArray instanceof Array)) {
            return error.na;
        }
        if (matchType !== -1 && matchType !== 0 && matchType !== 1) {
            return error.na;
        }

        var index;
        var indexValue;

        for (var idx = 0; idx < lookupArray.length; idx++) {
            if (matchType === 1) {
                if (lookupArray[idx] === lookupValue) {
                    return idx + 1;
                } else if (lookupArray[idx] < lookupValue) {
                    if (!indexValue) {
                        index = idx + 1;
                        indexValue = lookupArray[idx];
                    } else if (lookupArray[idx] > indexValue) {
                        index = idx + 1;
                        indexValue = lookupArray[idx];
                    }
                }
            } else if (matchType === 0) {
                if (typeof lookupValue === 'string') {
                    lookupValue = lookupValue.replace(/\?/g, '.');
                    if (lookupArray[idx].toLowerCase().match(lookupValue.toLowerCase())) {
                        return idx + 1;
                    }
                } else {
                    if (lookupArray[idx] === lookupValue) {
                        return idx + 1;
                    }
                }
            } else if (matchType === -1) {
                if (lookupArray[idx] === lookupValue) {
                    return idx + 1;
                } else if (lookupArray[idx] > lookupValue) {
                    if (!indexValue) {
                        index = idx + 1;
                        indexValue = lookupArray[idx];
                    } else if (lookupArray[idx] < indexValue) {
                        index = idx + 1;
                        indexValue = lookupArray[idx];
                    }
                }
            }
        }

        return index ? index : error.na;
    };

    return exports;
})();

jexcel.methods.engineering = (function() {
    var exports = {};

    function isValidBinaryNumber(number) {
        return (/^[01]{1,10}$/).test(number);
    }

    exports.BESSELI = function(x, n) {
    };

    exports.BESSELJ = function(x, n) {
    };

    exports.BESSELK = function(x, n) {
    };

    exports.BESSELY = function(x, n) {
    };

    exports.BIN2DEC = function(number) {
        // Return error if number is not binary or contains more than 10
        // characters (10 digits)
        if (!isValidBinaryNumber(number)) {
            return error.num;
        }

        // Convert binary number to decimal
        var result = parseInt(number, 2);

        // Handle negative numbers
        var stringified = number.toString();
        if (stringified.length === 10 && stringified.substring(0, 1) === '1') {
            return parseInt(stringified.substring(1), 2) - 512;
        } else {
            return result;
        }
    };

    exports.BIN2HEX = function(number, places) {
        // Return error if number is not binary or contains more than 10
        // characters (10 digits)
        if (!isValidBinaryNumber(number)) {
            return error.num;
        }

        // Ignore places and return a 10-character hexadecimal number if number
        // is negative
        var stringified = number.toString();
        if (stringified.length === 10 && stringified.substring(0, 1) === '1') {
            return (1099511627264 + parseInt(stringified.substring(1), 2)).toString(16);
        }

        // Convert binary number to hexadecimal
        var result = parseInt(number, 2).toString(16);

        // Return hexadecimal number using the minimum number of characters
        // necessary if places is undefined
        if (places === undefined) {
            return result;
        } else {
            // Return error if places is nonnumeric
            if (isNaN(places)) {
              return error.value;
            }

            // Return error if places is negative
            if (places < 0) {
              return error.num;
            }

            // Truncate places in case it is not an integer
            places = Math.floor(places);

            // Pad return value with leading 0s (zeros) if necessary (using
            // Underscore.string)
            return (places >= result.length) ? REPT('0', places - result.length) + result : error.num;
        }
    };

    exports.BIN2OCT = function(number, places) {
        // Return error if number is not binary or contains more than 10
        // characters (10 digits)
        if (!isValidBinaryNumber(number)) {
            return error.num;
        }

        // Ignore places and return a 10-character octal number if number is
        // negative
        var stringified = number.toString();
        if (stringified.length === 10 && stringified.substring(0, 1) === '1') {
            return (1073741312 + parseInt(stringified.substring(1), 2)).toString(8);
        }

        // Convert binary number to octal
        var result = parseInt(number, 2).toString(8);

        // Return octal number using the minimum number of characters necessary
        // if places is undefined
        if (places === undefined) {
            return result;
        } else {
            // Return error if places is nonnumeric
            if (isNaN(places)) {
              return error.value;
            }

            // Return error if places is negative
            if (places < 0) {
              return error.num;
            }

            // Truncate places in case it is not an integer
            places = Math.floor(places);

            // Pad return value with leading 0s (zeros) if necessary (using
            // Underscore.string)
            return (places >= result.length) ? REPT('0', places - result.length) + result : error.num;
        }
    };

    exports.BITAND = function(number1, number2) {
        // Return error if either number is a non-numeric value
        number1 = utils.parseNumber(number1);
        number2 = utils.parseNumber(number2);
        if (utils.anyIsError(number1, number2)) {
            return error.value;
        }

        // Return error if either number is less than 0
        if (number1 < 0 || number2 < 0) {
            return error.num;
        }

        // Return error if either number is a non-integer
        if (Math.floor(number1) !== number1 || Math.floor(number2) !== number2) {
            return error.num;
        }

        // Return error if either number is greater than (2^48)-1
        if (number1 > 281474976710655 || number2 > 281474976710655) {
            return error.num;
        }

        // Return bitwise AND of two numbers
        return number1 & number2;
    };

    exports.BITLSHIFT = function(number, shift) {
        number = utils.parseNumber(number);
        shift = utils.parseNumber(shift);
        if (utils.anyIsError(number, shift)) {
            return error.value;
        }

        // Return error if number is less than 0
        if (number < 0) {
            return error.num;
        }

        // Return error if number is a non-integer
        if (Math.floor(number) !== number) {
            return error.num;
        }

        // Return error if number is greater than (2^48)-1
        if (number > 281474976710655) {
            return error.num;
        }

        // Return error if the absolute value of shift is greater than 53
        if (Math.abs(shift) > 53) {
            return error.num;
        }

        // Return number shifted by shift bits to the left or to the right if
        // shift is negative
        return (shift >= 0) ? number << shift : number >> -shift;
    };

    exports.BITOR = function(number1, number2) {
        number1 = utils.parseNumber(number1);
        number2 = utils.parseNumber(number2);
        if (utils.anyIsError(number1, number2)) {
            return error.value;
        }

        // Return error if either number is less than 0
        if (number1 < 0 || number2 < 0) {
            return error.num;
        }

        // Return error if either number is a non-integer
        if (Math.floor(number1) !== number1 || Math.floor(number2) !== number2) {
            return error.num;
        }

        // Return error if either number is greater than (2^48)-1
        if (number1 > 281474976710655 || number2 > 281474976710655) {
            return error.num;
        }

        // Return bitwise OR of two numbers
        return number1 | number2;
    };

    exports.BITRSHIFT = function(number, shift) {
        number = utils.parseNumber(number);
        shift = utils.parseNumber(shift);
        if (utils.anyIsError(number, shift)) {
            return error.value;
        }

        // Return error if number is less than 0
        if (number < 0) {
            return error.num;
        }

        // Return error if number is a non-integer
        if (Math.floor(number) !== number) {
            return error.num;
        }

        // Return error if number is greater than (2^48)-1
        if (number > 281474976710655) {
            return error.num;
        }

        // Return error if the absolute value of shift is greater than 53
        if (Math.abs(shift) > 53) {
            return error.num;
        }

        // Return number shifted by shift bits to the right or to the left if
        // shift is negative
        return (shift >= 0) ? number >> shift : number << -shift;
    };

    exports.BITXOR = function(number1, number2) {
        number1 = utils.parseNumber(number1);
        number2 = utils.parseNumber(number2);
        if (utils.anyIsError(number1, number2)) {
            return error.value;
        }

        // Return error if either number is less than 0
        if (number1 < 0 || number2 < 0) {
            return error.num;
        }

        // Return error if either number is a non-integer
        if (Math.floor(number1) !== number1 || Math.floor(number2) !== number2) {
            return error.num;
        }

        // Return error if either number is greater than (2^48)-1
        if (number1 > 281474976710655 || number2 > 281474976710655) {
            return error.num;
        }

        // Return bitwise XOR of two numbers
        return number1 ^ number2;
    };

    exports.COMPLEX = function(real, imaginary, suffix) {
        real = utils.parseNumber(real);
        imaginary = utils.parseNumber(imaginary);
        if (utils.anyIsError(real, imaginary)) {
            return real;
        }

        // Set suffix
        suffix = (suffix === undefined) ? 'i' : suffix;

        // Return error if suffix is neither "i" nor "j"
        if (suffix !== 'i' && suffix !== 'j') {
            return error.value;
        }

        // Return complex number
        if (real === 0 && imaginary === 0) {
            return 0;
        } else if (real === 0) {
            return (imaginary === 1) ? suffix : imaginary.toString() + suffix;
        } else if (imaginary === 0) {
            return real.toString();
        } else {
            var sign = (imaginary > 0) ? '+' : '';
            return real.toString() + sign + ((imaginary === 1) ? suffix : imaginary.toString() + suffix);
        }
    };

    exports.CONVERT = function(number, from_unit, to_unit) {
        number = utils.parseNumber(number);
        if (number instanceof Error) {
            return number;
        }

        // List of units supported by CONVERT and units defined by the
        // International System of Units
        // [Name, Symbol, Alternate symbols, Quantity, ISU, CONVERT, Conversion
        // ratio]
        var units = [
            ["a.u. of action", "?", null, "action", false, false, 1.05457168181818e-34],
            ["a.u. of charge", "e", null, "electric_charge", false, false, 1.60217653141414e-19],
            ["a.u. of energy", "Eh", null, "energy", false, false, 4.35974417757576e-18],
            ["a.u. of length", "a?", null, "length", false, false, 5.29177210818182e-11],
            ["a.u. of mass", "m?", null, "mass", false, false, 9.10938261616162e-31],
            ["a.u. of time", "?/Eh", null, "time", false, false, 2.41888432650516e-17],
            ["admiralty knot", "admkn", null, "speed", false, true, 0.514773333],
            ["ampere", "A", null, "electric_current", true, false, 1],
            ["ampere per meter", "A/m", null, "magnetic_field_intensity", true, false, 1],
            ["ångström", "Å", ["ang"], "length", false, true, 1e-10],
            ["are", "ar", null, "area", false, true, 100],
            ["astronomical unit", "ua", null, "length", false, false, 1.49597870691667e-11],
            ["bar", "bar", null, "pressure", false, false, 100000],
            ["barn", "b", null, "area", false, false, 1e-28],
            ["becquerel", "Bq", null, "radioactivity", true, false, 1],
            ["bit", "bit", ["b"], "information", false, true, 1],
            ["btu", "BTU", ["btu"], "energy", false, true, 1055.05585262],
            ["byte", "byte", null, "information", false, true, 8],
            ["candela", "cd", null, "luminous_intensity", true, false, 1],
            ["candela per square metre", "cd/m?", null, "luminance", true, false, 1],
            ["coulomb", "C", null, "electric_charge", true, false, 1],
            ["cubic ångström", "ang3", ["ang^3"], "volume", false, true, 1e-30],
            ["cubic foot", "ft3", ["ft^3"], "volume", false, true, 0.028316846592],
            ["cubic inch", "in3", ["in^3"], "volume", false, true, 0.000016387064],
            ["cubic light-year", "ly3", ["ly^3"], "volume", false, true, 8.46786664623715e-47],
            ["cubic metre", "m?", null, "volume", true, true, 1],
            ["cubic mile", "mi3", ["mi^3"], "volume", false, true, 4168181825.44058],
            ["cubic nautical mile", "Nmi3", ["Nmi^3"], "volume", false, true, 6352182208],
            ["cubic Pica", "Pica3", ["Picapt3", "Pica^3", "Picapt^3"], "volume", false, true, 7.58660370370369e-8],
            ["cubic yard", "yd3", ["yd^3"], "volume", false, true, 0.764554857984],
            ["cup", "cup", null, "volume", false, true, 0.0002365882365],
            ["dalton", "Da", ["u"], "mass", false, false, 1.66053886282828e-27],
            ["day", "d", ["day"], "time", false, true, 86400],
            ["degree", "°", null, "angle", false, false, 0.0174532925199433],
            ["degrees Rankine", "Rank", null, "temperature", false, true, 0.555555555555556],
            ["dyne", "dyn", ["dy"], "force", false, true, 0.00001],
            ["electronvolt", "eV", ["ev"], "energy", false, true, 1.60217656514141],
            ["ell", "ell", null, "length", false, true, 1.143],
            ["erg", "erg", ["e"], "energy", false, true, 1e-7],
            ["farad", "F", null, "electric_capacitance", true, false, 1],
            ["fluid ounce", "oz", null, "volume", false, true, 0.0000295735295625],
            ["foot", "ft", null, "length", false, true, 0.3048],
            ["foot-pound", "flb", null, "energy", false, true, 1.3558179483314],
            ["gal", "Gal", null, "acceleration", false, false, 0.01],
            ["gallon", "gal", null, "volume", false, true, 0.003785411784],
            ["gauss", "G", ["ga"], "magnetic_flux_density", false, true, 1],
            ["grain", "grain", null, "mass", false, true, 0.0000647989],
            ["gram", "g", null, "mass", false, true, 0.001],
            ["gray", "Gy", null, "absorbed_dose", true, false, 1],
            ["gross registered ton", "GRT", ["regton"], "volume", false, true, 2.8316846592],
            ["hectare", "ha", null, "area", false, true, 10000],
            ["henry", "H", null, "inductance", true, false, 1],
            ["hertz", "Hz", null, "frequency", true, false, 1],
            ["horsepower", "HP", ["h"], "power", false, true, 745.69987158227],
            ["horsepower-hour", "HPh", ["hh", "hph"], "energy", false, true, 2684519.538],
            ["hour", "h", ["hr"], "time", false, true, 3600],
            ["imperial gallon (U.K.)", "uk_gal", null, "volume", false, true, 0.00454609],
            ["imperial hundredweight", "lcwt", ["uk_cwt", "hweight"], "mass", false, true, 50.802345],
            ["imperial quart (U.K)", "uk_qt", null, "volume", false, true, 0.0011365225],
            ["imperial ton", "brton", ["uk_ton", "LTON"], "mass", false, true, 1016.046909],
            ["inch", "in", null, "length", false, true, 0.0254],
            ["international acre", "uk_acre", null, "area", false, true, 4046.8564224],
            ["IT calorie", "cal", null, "energy", false, true, 4.1868],
            ["joule", "J", null, "energy", true, true, 1],
            ["katal", "kat", null, "catalytic_activity", true, false, 1],
            ["kelvin", "K", ["kel"], "temperature", true, true, 1],
            ["kilogram", "kg", null, "mass", true, true, 1],
            ["knot", "kn", null, "speed", false, true, 0.514444444444444],
            ["light-year", "ly", null, "length", false, true, 9460730472580800],
            ["litre", "L", ["l", "lt"], "volume", false, true, 0.001],
            ["lumen", "lm", null, "luminous_flux", true, false, 1],
            ["lux", "lx", null, "illuminance", true, false, 1],
            ["maxwell", "Mx", null, "magnetic_flux", false, false, 1e-18],
            ["measurement ton", "MTON", null, "volume", false, true, 1.13267386368],
            ["meter per hour", "m/h", ["m/hr"], "speed", false, true, 0.00027777777777778],
            ["meter per second", "m/s", ["m/sec"], "speed", true, true, 1],
            ["meter per second squared", "m?s??", null, "acceleration", true, false, 1],
            ["parsec", "pc", ["parsec"], "length", false, true, 30856775814671900],
            ["meter squared per second", "m?/s", null, "kinematic_viscosity", true, false, 1],
            ["metre", "m", null, "length", true, true, 1],
            ["miles per hour", "mph", null, "speed", false, true, 0.44704],
            ["millimetre of mercury", "mmHg", null, "pressure", false, false, 133.322],
            ["minute", "?", null, "angle", false, false, 0.000290888208665722],
            ["minute", "min", ["mn"], "time", false, true, 60],
            ["modern teaspoon", "tspm", null, "volume", false, true, 0.000005],
            ["mole", "mol", null, "amount_of_substance", true, false, 1],
            ["morgen", "Morgen", null, "area", false, true, 2500],
            ["n.u. of action", "?", null, "action", false, false, 1.05457168181818e-34],
            ["n.u. of mass", "m?", null, "mass", false, false, 9.10938261616162e-31],
            ["n.u. of speed", "c?", null, "speed", false, false, 299792458],
            ["n.u. of time", "?/(me?c??)", null, "time", false, false, 1.28808866778687e-21],
            ["nautical mile", "M", ["Nmi"], "length", false, true, 1852],
            ["newton", "N", null, "force", true, true, 1],
            ["œrsted", "Oe ", null, "magnetic_field_intensity", false, false, 79.5774715459477],
            ["ohm", "Ω", null, "electric_resistance", true, false, 1],
            ["ounce mass", "ozm", null, "mass", false, true, 0.028349523125],
            ["pascal", "Pa", null, "pressure", true, false, 1],
            ["pascal second", "Pa?s", null, "dynamic_viscosity", true, false, 1],
            ["pferdestärke", "PS", null, "power", false, true, 735.49875],
            ["phot", "ph", null, "illuminance", false, false, 0.0001],
            ["pica (1/6 inch)", "pica", null, "length", false, true, 0.00035277777777778],
            ["pica (1/72 inch)", "Pica", ["Picapt"], "length", false, true, 0.00423333333333333],
            ["poise", "P", null, "dynamic_viscosity", false, false, 0.1],
            ["pond", "pond", null, "force", false, true, 0.00980665],
            ["pound force", "lbf", null, "force", false, true, 4.4482216152605],
            ["pound mass", "lbm", null, "mass", false, true, 0.45359237],
            ["quart", "qt", null, "volume", false, true, 0.000946352946],
            ["radian", "rad", null, "angle", true, false, 1],
            ["second", "?", null, "angle", false, false, 0.00000484813681109536],
            ["second", "s", ["sec"], "time", true, true, 1],
            ["short hundredweight", "cwt", ["shweight"], "mass", false, true, 45.359237],
            ["siemens", "S", null, "electrical_conductance", true, false, 1],
            ["sievert", "Sv", null, "equivalent_dose", true, false, 1],
            ["slug", "sg", null, "mass", false, true, 14.59390294],
            ["square ångström", "ang2", ["ang^2"], "area", false, true, 1e-20],
            ["square foot", "ft2", ["ft^2"], "area", false, true, 0.09290304],
            ["square inch", "in2", ["in^2"], "area", false, true, 0.00064516],
            ["square light-year", "ly2", ["ly^2"], "area", false, true, 8.95054210748189e+31],
            ["square meter", "m?", null, "area", true, true, 1],
            ["square mile", "mi2", ["mi^2"], "area", false, true, 2589988.110336],
            ["square nautical mile", "Nmi2", ["Nmi^2"], "area", false, true, 3429904],
            ["square Pica", "Pica2", ["Picapt2", "Pica^2", "Picapt^2"], "area", false, true, 0.00001792111111111],
            ["square yard", "yd2", ["yd^2"], "area", false, true, 0.83612736],
            ["statute mile", "mi", null, "length", false, true, 1609.344],
            ["steradian", "sr", null, "solid_angle", true, false, 1],
            ["stilb", "sb", null, "luminance", false, false, 0.0001],
            ["stokes", "St", null, "kinematic_viscosity", false, false, 0.0001],
            ["stone", "stone", null, "mass", false, true, 6.35029318],
            ["tablespoon", "tbs", null, "volume", false, true, 0.0000147868],
            ["teaspoon", "tsp", null, "volume", false, true, 0.00000492892],
            ["tesla", "T", null, "magnetic_flux_density", true, true, 1],
            ["thermodynamic calorie", "c", null, "energy", false, true, 4.184],
            ["ton", "ton", null, "mass", false, true, 907.18474],
            ["tonne", "t", null, "mass", false, false, 1000],
            ["U.K. pint", "uk_pt", null, "volume", false, true, 0.00056826125],
            ["U.S. bushel", "bushel", null, "volume", false, true, 0.03523907],
            ["U.S. oil barrel", "barrel", null, "volume", false, true, 0.158987295],
            ["U.S. pint", "pt", ["us_pt"], "volume", false, true, 0.000473176473],
            ["U.S. survey mile", "survey_mi", null, "length", false, true, 1609.347219],
            ["U.S. survey/statute acre", "us_acre", null, "area", false, true, 4046.87261],
            ["volt", "V", null, "voltage", true, false, 1],
            ["watt", "W", null, "power", true, true, 1],
            ["watt-hour", "Wh", ["wh"], "energy", false, true, 3600],
            ["weber", "Wb", null, "magnetic_flux", true, false, 1],
            ["yard", "yd", null, "length", false, true, 0.9144],
            ["year", "yr", null, "time", false, true, 31557600]
        ];

        // Binary prefixes
        // [Name, Prefix power of 2 value, Previx value, Abbreviation, Derived
        // from]
        var binary_prefixes = {
            Yi: ["yobi", 80, 1208925819614629174706176, "Yi", "yotta"],
            Zi: ["zebi", 70, 1180591620717411303424, "Zi", "zetta"],
            Ei: ["exbi", 60, 1152921504606846976, "Ei", "exa"],
            Pi: ["pebi", 50, 1125899906842624, "Pi", "peta"],
            Ti: ["tebi", 40, 1099511627776, "Ti", "tera"],
            Gi: ["gibi", 30, 1073741824, "Gi", "giga"],
            Mi: ["mebi", 20, 1048576, "Mi", "mega"],
            ki: ["kibi", 10, 1024, "ki", "kilo"]
        };

        // Unit prefixes
        // [Name, Multiplier, Abbreviation]
        var unit_prefixes = {
            Y: ["yotta", 1e+24, "Y"],
            Z: ["zetta", 1e+21, "Z"],
            E: ["exa", 1e+18, "E"],
            P: ["peta", 1e+15, "P"],
            T: ["tera", 1e+12, "T"],
            G: ["giga", 1e+09, "G"],
            M: ["mega", 1e+06, "M"],
            k: ["kilo", 1e+03, "k"],
            h: ["hecto", 1e+02, "h"],
            e: ["dekao", 1e+01, "e"],
            d: ["deci", 1e-01, "d"],
            c: ["centi", 1e-02, "c"],
            m: ["milli", 1e-03, "m"],
            u: ["micro", 1e-06, "u"],
            n: ["nano", 1e-09, "n"],
            p: ["pico", 1e-12, "p"],
            f: ["femto", 1e-15, "f"],
            a: ["atto", 1e-18, "a"],
            z: ["zepto", 1e-21, "z"],
            y: ["yocto", 1e-24, "y"]
        };

        // Initialize units and multipliers
        var from = null;
        var to = null;
        var base_from_unit = from_unit;
        var base_to_unit = to_unit;
        var from_multiplier = 1;
        var to_multiplier = 1;
        var alt;

        // Lookup from and to units
        for (var i = 0; i < units.length; i++) {
            alt = (units[i][2] === null) ? [] : units[i][2];
            if (units[i][1] === base_from_unit || alt.indexOf(base_from_unit) >= 0) {
              from = units[i];
            }
            if (units[i][1] === base_to_unit || alt.indexOf(base_to_unit) >= 0) {
              to = units[i];
            }
        }

        // Lookup from prefix
        if (from === null) {
            var from_binary_prefix = binary_prefixes[from_unit.substring(0, 2)];
            var from_unit_prefix = unit_prefixes[from_unit.substring(0, 1)];

            // Handle dekao unit prefix (only unit prefix with two characters)
            if (from_unit.substring(0, 2) === 'da') {
              from_unit_prefix = ["dekao", 1e+01, "da"];
            }

            // Handle binary prefixes first (so that 'Yi' is processed before
            // 'Y')
            if (from_binary_prefix) {
              from_multiplier = from_binary_prefix[2];
              base_from_unit = from_unit.substring(2);
            } else if (from_unit_prefix) {
              from_multiplier = from_unit_prefix[1];
              base_from_unit = from_unit.substring(from_unit_prefix[2].length);
            }

            // Lookup from unit
            for (var j = 0; j < units.length; j++) {
              alt = (units[j][2] === null) ? [] : units[j][2];
              if (units[j][1] === base_from_unit || alt.indexOf(base_from_unit) >= 0) {
                  from = units[j];
              }
            }
        }

        // Lookup to prefix
        if (to === null) {
            var to_binary_prefix = binary_prefixes[to_unit.substring(0, 2)];
            var to_unit_prefix = unit_prefixes[to_unit.substring(0, 1)];

            // Handle dekao unit prefix (only unit prefix with two characters)
            if (to_unit.substring(0, 2) === 'da') {
              to_unit_prefix = ["dekao", 1e+01, "da"];
            }

            // Handle binary prefixes first (so that 'Yi' is processed before
            // 'Y')
            if (to_binary_prefix) {
              to_multiplier = to_binary_prefix[2];
              base_to_unit = to_unit.substring(2);
            } else if (to_unit_prefix) {
              to_multiplier = to_unit_prefix[1];
              base_to_unit = to_unit.substring(to_unit_prefix[2].length);
            }

            // Lookup to unit
            for (var k = 0; k < units.length; k++) {
              alt = (units[k][2] === null) ? [] : units[k][2];
              if (units[k][1] === base_to_unit || alt.indexOf(base_to_unit) >= 0) {
                  to = units[k];
              }
            }
        }

        // Return error if a unit does not exist
        if (from === null || to === null) {
            return error.na;
        }

        // Return error if units represent different quantities
        if (from[3] !== to[3]) {
            return error.na;
        }

        // Return converted number
        return number * from[6] * from_multiplier / (to[6] * to_multiplier);
    };

    exports.DEC2BIN = function(number, places) {
        number = utils.parseNumber(number);
        if (number instanceof Error) {
            return number;
        }

        // Return error if number is not decimal, is lower than -512, or is
        // greater than 511
        if (!/^-?[0-9]{1,3}$/.test(number) || number < -512 || number > 511) {
            return error.num;
        }

        // Ignore places and return a 10-character binary number if number is
        // negative
        if (number < 0) {
            return '1' + REPT('0', 9 - (512 + number).toString(2).length) + (512 + number).toString(2);
        }

        // Convert decimal number to binary
        var result = parseInt(number, 10).toString(2);

        // Return binary number using the minimum number of characters necessary
        // if places is undefined
        if (typeof places === 'undefined') {
            return result;
        } else {
            // Return error if places is nonnumeric
            if (isNaN(places)) {
              return error.value;
            }

            // Return error if places is negative
            if (places < 0) {
              return error.num;
            }

            // Truncate places in case it is not an integer
            places = Math.floor(places);

            // Pad return value with leading 0s (zeros) if necessary (using
            // Underscore.string)
            return (places >= result.length) ? REPT('0', places - result.length) + result : error.num;
        }
    };

    exports.DEC2HEX = function(number, places) {
        number = utils.parseNumber(number);
        if (number instanceof Error) {
            return number;
        }

        // Return error if number is not decimal, is lower than -549755813888,
        // or is greater than 549755813887
        if (!/^-?[0-9]{1,12}$/.test(number) || number < -549755813888 || number > 549755813887) {
            return error.num;
        }

        // Ignore places and return a 10-character hexadecimal number if number
        // is negative
        if (number < 0) {
            return (1099511627776 + number).toString(16);
        }

        // Convert decimal number to hexadecimal
        var result = parseInt(number, 10).toString(16);

        // Return hexadecimal number using the minimum number of characters
        // necessary if places is undefined
        if (typeof places === 'undefined') {
            return result;
        } else {
            // Return error if places is nonnumeric
            if (isNaN(places)) {
              return error.value;
            }

            // Return error if places is negative
            if (places < 0) {
              return error.num;
            }

            // Truncate places in case it is not an integer
            places = Math.floor(places);

            // Pad return value with leading 0s (zeros) if necessary (using
            // Underscore.string)
            return (places >= result.length) ? REPT('0', places - result.length) + result : error.num;
        }
    };

    exports.DEC2OCT = function(number, places) {
        number = utils.parseNumber(number);
        if (number instanceof Error) {
            return number;
        }

        // Return error if number is not decimal, is lower than -549755813888,
        // or is greater than 549755813887
        if (!/^-?[0-9]{1,9}$/.test(number) || number < -536870912 || number > 536870911) {
            return error.num;
        }

        // Ignore places and return a 10-character octal number if number is
        // negative
        if (number < 0) {
            return (1073741824 + number).toString(8);
        }

        // Convert decimal number to octal
        var result = parseInt(number, 10).toString(8);

        // Return octal number using the minimum number of characters necessary
        // if places is undefined
        if (typeof places === 'undefined') {
            return result;
        } else {
            // Return error if places is nonnumeric
            if (isNaN(places)) {
              return error.value;
            }

            // Return error if places is negative
            if (places < 0) {
              return error.num;
            }

            // Truncate places in case it is not an integer
            places = Math.floor(places);

            // Pad return value with leading 0s (zeros) if necessary (using
            // Underscore.string)
            return (places >= result.length) ? REPT('0', places - result.length) + result : error.num;
        }
    };

    exports.DELTA = function(number1, number2) {
        // Set number2 to zero if undefined
        number2 = (number2 === undefined) ? 0 : number2;
        number1 = utils.parseNumber(number1);
        number2 = utils.parseNumber(number2);
        if (utils.anyIsError(number1, number2)) {
            return error.value;
        }

        // Return delta
        return (number1 === number2) ? 1 : 0;
    };

    exports.ERF = function(lower_bound, upper_bound) {
    };

    exports.ERF.PRECISE = function() {
    };

    exports.ERFC = function(x) {
    };

    exports.ERFC.PRECISE = function() {
    };

    exports.GESTEP = function(number, step) {
        step = step || 0;
        number = utils.parseNumber(number);
        if (utils.anyIsError(step, number)) {
            return number;
        }

        // Return delta
        return (number >= step) ? 1 : 0;
    };

    exports.HEX2BIN = function(number, places) {
        // Return error if number is not hexadecimal or contains more than ten
        // characters (10 digits)
        if (!/^[0-9A-Fa-f]{1,10}$/.test(number)) {
            return error.num;
        }

        // Check if number is negative
        var negative = (number.length === 10 && number.substring(0, 1).toLowerCase() === 'f') ? true : false;

        // Convert hexadecimal number to decimal
        var decimal = (negative) ? parseInt(number, 16) - 1099511627776 : parseInt(number, 16);

        // Return error if number is lower than -512 or greater than 511
        if (decimal < -512 || decimal > 511) {
            return error.num;
        }

        // Ignore places and return a 10-character binary number if number is
        // negative
        if (negative) {
            return '1' + REPT('0', 9 - (512 + decimal).toString(2).length) + (512 + decimal).toString(2);
        }

        // Convert decimal number to binary
        var result = decimal.toString(2);

        // Return binary number using the minimum number of characters necessary
        // if places is undefined
        if (places === undefined) {
            return result;
        } else {
            // Return error if places is nonnumeric
            if (isNaN(places)) {
              return error.value;
            }

            // Return error if places is negative
            if (places < 0) {
              return error.num;
            }

            // Truncate places in case it is not an integer
            places = Math.floor(places);

            // Pad return value with leading 0s (zeros) if necessary (using
            // Underscore.string)
            return (places >= result.length) ? REPT('0', places - result.length) + result : error.num;
        }
    };

    exports.HEX2DEC = function(number) {
        // Return error if number is not hexadecimal or contains more than ten
        // characters (10 digits)
        if (!/^[0-9A-Fa-f]{1,10}$/.test(number)) {
            return error.num;
        }

        // Convert hexadecimal number to decimal
        var decimal = parseInt(number, 16);

        // Return decimal number
        return (decimal >= 549755813888) ? decimal - 1099511627776 : decimal;
    };

    exports.HEX2OCT = function(number, places) {
        // Return error if number is not hexadecimal or contains more than ten
        // characters (10 digits)
        if (!/^[0-9A-Fa-f]{1,10}$/.test(number)) {
            return error.num;
        }

        // Convert hexadecimal number to decimal
        var decimal = parseInt(number, 16);

        // Return error if number is positive and greater than 0x1fffffff
        // (536870911)
        if (decimal > 536870911 && decimal < 1098974756864) {
            return error.num;
        }

        // Ignore places and return a 10-character octal number if number is
        // negative
        if (decimal >= 1098974756864) {
            return (decimal - 1098437885952).toString(8);
        }

        // Convert decimal number to octal
        var result = decimal.toString(8);

        // Return octal number using the minimum number of characters necessary
        // if places is undefined
        if (places === undefined) {
            return result;
        } else {
            // Return error if places is nonnumeric
            if (isNaN(places)) {
              return error.value;
            }

            // Return error if places is negative
            if (places < 0) {
              return error.num;
            }

            // Truncate places in case it is not an integer
            places = Math.floor(places);

            // Pad return value with leading 0s (zeros) if necessary (using
            // Underscore.string)
            return (places >= result.length) ? REPT('0', places - result.length) + result : error.num;
        }
    };

    exports.IMABS = function(inumber) {
        // Lookup real and imaginary coefficients using exports.js
        // [http://formulajs.org]
        var x = exports.IMREAL(inumber);
        var y = exports.IMAGINARY(inumber);

        // Return error if either coefficient is not a number
        if (utils.anyIsError(x, y)) {
            return error.value;
        }

        // Return absolute value of complex number
        return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
    };

    exports.IMAGINARY = function(inumber) {
        if (inumber === undefined || inumber === true || inumber === false) {
            return error.value;
        }

        // Return 0 if inumber is equal to 0
        if (inumber === 0 || inumber === '0') {
            return 0;
        }

        // Handle special cases
        if (['i', 'j'].indexOf(inumber) >= 0) {
            return 1;
        }

        // Normalize imaginary coefficient
        inumber = inumber.replace('+i', '+1i').replace('-i', '-1i').replace('+j', '+1j').replace('-j', '-1j');

        // Lookup sign
        var plus = inumber.indexOf('+');
        var minus = inumber.indexOf('-');
        if (plus === 0) {
            plus = inumber.indexOf('+', 1);
        }

        if (minus === 0) {
            minus = inumber.indexOf('-', 1);
        }

        // Lookup imaginary unit
        var last = inumber.substring(inumber.length - 1, inumber.length);
        var unit = (last === 'i' || last === 'j');

        if (plus >= 0 || minus >= 0) {
            // Return error if imaginary unit is neither i nor j
            if (!unit) {
              return error.num;
            }

            // Return imaginary coefficient of complex number
            if (plus >= 0) {
              return (isNaN(inumber.substring(0, plus)) || isNaN(inumber.substring(plus + 1, inumber.length - 1))) ?
                  error.num :
                  Number(inumber.substring(plus + 1, inumber.length - 1));
            } else {
              return (isNaN(inumber.substring(0, minus)) || isNaN(inumber.substring(minus + 1, inumber.length - 1))) ?
                  error.num :
                  -Number(inumber.substring(minus + 1, inumber.length - 1));
            }
        } else {
            if (unit) {
              return (isNaN(inumber.substring(0, inumber.length - 1))) ? error.num : inumber.substring(0, inumber.length - 1);
            } else {
              return (isNaN(inumber)) ? error.num : 0;
            }
        }
    };

    exports.IMARGUMENT = function(inumber) {
        // Lookup real and imaginary coefficients using exports.js
        // [http://formulajs.org]
        var x = exports.IMREAL(inumber);
        var y = exports.IMAGINARY(inumber);

        // Return error if either coefficient is not a number
        if (utils.anyIsError(x, y)) {
            return error.value;
        }

        // Return error if inumber is equal to zero
        if (x === 0 && y === 0) {
            return error.div0;
        }

        // Return PI/2 if x is equal to zero and y is positive
        if (x === 0 && y > 0) {
            return Math.PI / 2;
        }

        // Return -PI/2 if x is equal to zero and y is negative
        if (x === 0 && y < 0) {
            return -Math.PI / 2;
        }

        // Return zero if x is negative and y is equal to zero
        if (y === 0 && x > 0) {
            return 0;
        }

        // Return zero if x is negative and y is equal to zero
        if (y === 0 && x < 0) {
            return -Math.PI;
        }

        // Return argument of complex number
        if (x > 0) {
            return Math.atan(y / x);
        } else if (x < 0 && y >= 0) {
            return Math.atan(y / x) + Math.PI;
        } else {
            return Math.atan(y / x) - Math.PI;
        }
    };

    exports.IMCONJUGATE = function(inumber) {
        // Lookup real and imaginary coefficients using exports.js
        // [http://formulajs.org]
        var x = exports.IMREAL(inumber);
        var y = exports.IMAGINARY(inumber);

        if (utils.anyIsError(x, y)) {
            return error.value;
        }

        // Lookup imaginary unit
        var unit = inumber.substring(inumber.length - 1);
        unit = (unit === 'i' || unit === 'j') ? unit : 'i';

        // Return conjugate of complex number
        return (y !== 0) ? exports.COMPLEX(x, -y, unit) : inumber;
    };

    exports.IMCOS = function(inumber) {
        // Lookup real and imaginary coefficients using exports.js
        // [http://formulajs.org]
        var x = exports.IMREAL(inumber);
        var y = exports.IMAGINARY(inumber);

        if (utils.anyIsError(x, y)) {
            return error.value;
        }

        // Lookup imaginary unit
        var unit = inumber.substring(inumber.length - 1);
        unit = (unit === 'i' || unit === 'j') ? unit : 'i';

        // Return cosine of complex number
        return exports.COMPLEX(Math.cos(x) * (Math.exp(y) + Math.exp(-y)) / 2, -Math.sin(x) * (Math.exp(y) - Math.exp(-y)) / 2, unit);
    };

    exports.IMCOSH = function(inumber) {
        // Lookup real and imaginary coefficients using exports.js
        // [http://formulajs.org]
        var x = exports.IMREAL(inumber);
        var y = exports.IMAGINARY(inumber);

        if (utils.anyIsError(x, y)) {
            return error.value;
        }

        // Lookup imaginary unit
        var unit = inumber.substring(inumber.length - 1);
        unit = (unit === 'i' || unit === 'j') ? unit : 'i';

        // Return hyperbolic cosine of complex number
        return exports.COMPLEX(Math.cos(y) * (Math.exp(x) + Math.exp(-x)) / 2, Math.sin(y) * (Math.exp(x) - Math.exp(-x)) / 2, unit);
    };

    exports.IMCOT = function(inumber) {
        // Lookup real and imaginary coefficients using Formula.js
        // [http://formulajs.org]
        var x = exports.IMREAL(inumber);
        var y = exports.IMAGINARY(inumber);

        if (utils.anyIsError(x, y)) {
            return error.value;
        }

        // Return cotangent of complex number
        return exports.IMDIV(exports.IMCOS(inumber), exports.IMSIN(inumber));
    };

    exports.IMDIV = function(inumber1, inumber2) {
        // Lookup real and imaginary coefficients using Formula.js
        // [http://formulajs.org]
        var a = exports.IMREAL(inumber1);
        var b = exports.IMAGINARY(inumber1);
        var c = exports.IMREAL(inumber2);
        var d = exports.IMAGINARY(inumber2);

        if (utils.anyIsError(a, b, c, d)) {
            return error.value;
        }

        // Lookup imaginary unit
        var unit1 = inumber1.substring(inumber1.length - 1);
        var unit2 = inumber2.substring(inumber2.length - 1);
        var unit = 'i';
        if (unit1 === 'j') {
            unit = 'j';
        } else if (unit2 === 'j') {
            unit = 'j';
        }

        // Return error if inumber2 is null
        if (c === 0 && d === 0) {
            return error.num;
        }

        // Return exponential of complex number
        var den = c * c + d * d;
        return exports.COMPLEX((a * c + b * d) / den, (b * c - a * d) / den, unit);
    };

    exports.IMEXP = function(inumber) {
        // Lookup real and imaginary coefficients using Formula.js
        // [http://formulajs.org]
        var x = exports.IMREAL(inumber);
        var y = exports.IMAGINARY(inumber);

        if (utils.anyIsError(x, y)) {
            return error.value;
        }

        // Lookup imaginary unit
        var unit = inumber.substring(inumber.length - 1);
        unit = (unit === 'i' || unit === 'j') ? unit : 'i';

        // Return exponential of complex number
        var e = Math.exp(x);
        return exports.COMPLEX(e * Math.cos(y), e * Math.sin(y), unit);
    };

    exports.IMLN = function(inumber) {
        // Lookup real and imaginary coefficients using Formula.js
        // [http://formulajs.org]
        var x = exports.IMREAL(inumber);
        var y = exports.IMAGINARY(inumber);

        if (utils.anyIsError(x, y)) {
            return error.value;
        }

        // Lookup imaginary unit
        var unit = inumber.substring(inumber.length - 1);
        unit = (unit === 'i' || unit === 'j') ? unit : 'i';

        // Return exponential of complex number
        return exports.COMPLEX(Math.log(Math.sqrt(x * x + y * y)), Math.atan(y / x), unit);
    };

    exports.IMLOG10 = function(inumber) {
        // Lookup real and imaginary coefficients using Formula.js
        // [http://formulajs.org]
        var x = exports.IMREAL(inumber);
        var y = exports.IMAGINARY(inumber);

        if (utils.anyIsError(x, y)) {
            return error.value;
        }

        // Lookup imaginary unit
        var unit = inumber.substring(inumber.length - 1);
        unit = (unit === 'i' || unit === 'j') ? unit : 'i';

        // Return exponential of complex number
        return exports.COMPLEX(Math.log(Math.sqrt(x * x + y * y)) / Math.log(10), Math.atan(y / x) / Math.log(10), unit);
    };

    exports.IMLOG2 = function(inumber) {
        // Lookup real and imaginary coefficients using Formula.js
        // [http://formulajs.org]
        var x = exports.IMREAL(inumber);
        var y = exports.IMAGINARY(inumber);

        if (utils.anyIsError(x, y)) {
            return error.value;
        }

        // Lookup imaginary unit
        var unit = inumber.substring(inumber.length - 1);
        unit = (unit === 'i' || unit === 'j') ? unit : 'i';

        // Return exponential of complex number
        return exports.COMPLEX(Math.log(Math.sqrt(x * x + y * y)) / Math.log(2), Math.atan(y / x) / Math.log(2), unit);
    };

    exports.IMPOWER = function(inumber, number) {
        number = utils.parseNumber(number);
        var x = exports.IMREAL(inumber);
        var y = exports.IMAGINARY(inumber);
        if (utils.anyIsError(number, x, y)) {
            return error.value;
        }

        // Lookup imaginary unit
        var unit = inumber.substring(inumber.length - 1);
        unit = (unit === 'i' || unit === 'j') ? unit : 'i';

        // Calculate power of modulus
        var p = Math.pow(exports.IMABS(inumber), number);

        // Calculate argument
        var t = exports.IMARGUMENT(inumber);

        // Return exponential of complex number
        return exports.COMPLEX(p * Math.cos(number * t), p * Math.sin(number * t), unit);
    };

    exports.IMPRODUCT = function() {
        // Initialize result
        var result = arguments[0];

        // Loop on all numbers
        for (var i = 1; i < arguments.length; i++) {
            // Lookup coefficients of two complex numbers
            var a = exports.IMREAL(result);
            var b = exports.IMAGINARY(result);
            var c = exports.IMREAL(arguments[i]);
            var d = exports.IMAGINARY(arguments[i]);

            if (utils.anyIsError(a, b, c, d)) {
              return error.value;
            }

            // Complute product of two complex numbers
            result = exports.COMPLEX(a * c - b * d, a * d + b * c);
        }

        // Return product of complex numbers
        return result;
    };

    exports.IMREAL = function(inumber) {
        if (inumber === undefined || inumber === true || inumber === false) {
            return error.value;
        }

        // Return 0 if inumber is equal to 0
        if (inumber === 0 || inumber === '0') {
            return 0;
        }

        // Handle special cases
        if (['i', '+i', '1i', '+1i', '-i', '-1i', 'j', '+j', '1j', '+1j', '-j', '-1j'].indexOf(inumber) >= 0) {
            return 0;
        }

        // Lookup sign
        var plus = inumber.indexOf('+');
        var minus = inumber.indexOf('-');
        if (plus === 0) {
            plus = inumber.indexOf('+', 1);
        }
        if (minus === 0) {
            minus = inumber.indexOf('-', 1);
        }

        // Lookup imaginary unit
        var last = inumber.substring(inumber.length - 1, inumber.length);
        var unit = (last === 'i' || last === 'j');

        if (plus >= 0 || minus >= 0) {
            // Return error if imaginary unit is neither i nor j
            if (!unit) {
              return error.num;
            }

            // Return real coefficient of complex number
            if (plus >= 0) {
              return (isNaN(inumber.substring(0, plus)) || isNaN(inumber.substring(plus + 1, inumber.length - 1))) ?
                  error.num :
                  Number(inumber.substring(0, plus));
            } else {
              return (isNaN(inumber.substring(0, minus)) || isNaN(inumber.substring(minus + 1, inumber.length - 1))) ?
                  error.num :
                  Number(inumber.substring(0, minus));
            }
        } else {
            if (unit) {
              return (isNaN(inumber.substring(0, inumber.length - 1))) ? error.num : 0;
            } else {
              return (isNaN(inumber)) ? error.num : inumber;
            }
        }
    };

    exports.IMSEC = function(inumber) {
        // Return error if inumber is a logical value
        if (inumber === true || inumber === false) {
            return error.value;
        }

        // Lookup real and imaginary coefficients using Formula.js
        // [http://formulajs.org]
        var x = exports.IMREAL(inumber);
        var y = exports.IMAGINARY(inumber);

        if (utils.anyIsError(x, y)) {
            return error.value;
        }

        // Return secant of complex number
        return exports.IMDIV('1', exports.IMCOS(inumber));
    };

    exports.IMSECH = function(inumber) {
        // Lookup real and imaginary coefficients using Formula.js
        // [http://formulajs.org]
        var x = exports.IMREAL(inumber);
        var y = exports.IMAGINARY(inumber);

        if (utils.anyIsError(x, y)) {
            return error.value;
        }

        // Return hyperbolic secant of complex number
        return exports.IMDIV('1', exports.IMCOSH(inumber));
    };

    exports.IMSIN = function(inumber) {
        // Lookup real and imaginary coefficients using Formula.js
        // [http://formulajs.org]
        var x = exports.IMREAL(inumber);
        var y = exports.IMAGINARY(inumber);

        if (utils.anyIsError(x, y)) {
            return error.value;
        }

        // Lookup imaginary unit
        var unit = inumber.substring(inumber.length - 1);
        unit = (unit === 'i' || unit === 'j') ? unit : 'i';

        // Return sine of complex number
        return exports.COMPLEX(Math.sin(x) * (Math.exp(y) + Math.exp(-y)) / 2, Math.cos(x) * (Math.exp(y) - Math.exp(-y)) / 2, unit);
    };

    exports.IMSINH = function(inumber) {
        // Lookup real and imaginary coefficients using Formula.js
        // [http://formulajs.org]
        var x = exports.IMREAL(inumber);
        var y = exports.IMAGINARY(inumber);

        if (utils.anyIsError(x, y)) {
            return error.value;
        }

        // Lookup imaginary unit
        var unit = inumber.substring(inumber.length - 1);
        unit = (unit === 'i' || unit === 'j') ? unit : 'i';

        // Return hyperbolic sine of complex number
        return exports.COMPLEX(Math.cos(y) * (Math.exp(x) - Math.exp(-x)) / 2, Math.sin(y) * (Math.exp(x) + Math.exp(-x)) / 2, unit);
    };

    exports.IMSQRT = function(inumber) {
        // Lookup real and imaginary coefficients using Formula.js
        // [http://formulajs.org]
        var x = exports.IMREAL(inumber);
        var y = exports.IMAGINARY(inumber);

        if (utils.anyIsError(x, y)) {
            return error.value;
        }

        // Lookup imaginary unit
        var unit = inumber.substring(inumber.length - 1);
        unit = (unit === 'i' || unit === 'j') ? unit : 'i';

        // Calculate power of modulus
        var s = Math.sqrt(exports.IMABS(inumber));

        // Calculate argument
        var t = exports.IMARGUMENT(inumber);

        // Return exponential of complex number
        return exports.COMPLEX(s * Math.cos(t / 2), s * Math.sin(t / 2), unit);
    };

    exports.IMCSC = function (inumber) {
        // Return error if inumber is a logical value
        if (inumber === true || inumber === false) {
            return error.value;
        }

        // Lookup real and imaginary coefficients using Formula.js
        // [http://formulajs.org]
        var x = exports.IMREAL(inumber);
        var y = exports.IMAGINARY(inumber);

        // Return error if either coefficient is not a number
        if (utils.anyIsError(x, y)) {
            return error.num;
        }

        // Return cosecant of complex number
        return exports.IMDIV('1', exports.IMSIN(inumber));
    };

    exports.IMCSCH = function (inumber) {
        // Return error if inumber is a logical value
        if (inumber === true || inumber === false) {
            return error.value;
        }

        // Lookup real and imaginary coefficients using Formula.js
        // [http://formulajs.org]
        var x = exports.IMREAL(inumber);
        var y = exports.IMAGINARY(inumber);

        // Return error if either coefficient is not a number
        if (utils.anyIsError(x, y)) {
            return error.num;
        }

        // Return hyperbolic cosecant of complex number
        return exports.IMDIV('1', exports.IMSINH(inumber));
    };

    exports.IMSUB = function(inumber1, inumber2) {
        // Lookup real and imaginary coefficients using Formula.js
        // [http://formulajs.org]
        var a = this.IMREAL(inumber1);
        var b = this.IMAGINARY(inumber1);
        var c = this.IMREAL(inumber2);
        var d = this.IMAGINARY(inumber2);

        if (utils.anyIsError(a, b, c, d)) {
            return error.value;
        }

        // Lookup imaginary unit
        var unit1 = inumber1.substring(inumber1.length - 1);
        var unit2 = inumber2.substring(inumber2.length - 1);
        var unit = 'i';
        if (unit1 === 'j') {
            unit = 'j';
        } else if (unit2 === 'j') {
            unit = 'j';
        }

        // Return _ of two complex numbers
        return this.COMPLEX(a - c, b - d, unit);
    };

    exports.IMSUM = function() {
        var args = utils.flatten(arguments);

        // Initialize result
        var result = args[0];

        // Loop on all numbers
        for (var i = 1; i < args.length; i++) {
            // Lookup coefficients of two complex numbers
            var a = this.IMREAL(result);
            var b = this.IMAGINARY(result);
            var c = this.IMREAL(args[i]);
            var d = this.IMAGINARY(args[i]);

            if (utils.anyIsError(a, b, c, d)) {
              return error.value;
            }

            // Complute product of two complex numbers
            result = this.COMPLEX(a + c, b + d);
        }

        // Return sum of complex numbers
        return result;
    };

    exports.IMTAN = function(inumber) {
        // Return error if inumber is a logical value
        if (inumber === true || inumber === false) {
            return error.value;
        }

        // Lookup real and imaginary coefficients using Formula.js
        // [http://formulajs.org]
        var x = exports.IMREAL(inumber);
        var y = exports.IMAGINARY(inumber);

        if (utils.anyIsError(x, y)) {
            return error.value;
        }

        // Return tangent of complex number
        return this.IMDIV(this.IMSIN(inumber), this.IMCOS(inumber));
    };

    exports.OCT2BIN = function(number, places) {
        // Return error if number is not hexadecimal or contains more than ten
        // characters (10 digits)
        if (!/^[0-7]{1,10}$/.test(number)) {
            return error.num;
        }

        // Check if number is negative
        var negative = (number.length === 10 && number.substring(0, 1) === '7') ? true : false;

        // Convert octal number to decimal
        var decimal = (negative) ? parseInt(number, 8) - 1073741824 : parseInt(number, 8);

        // Return error if number is lower than -512 or greater than 511
        if (decimal < -512 || decimal > 511) {
            return error.num;
        }

        // Ignore places and return a 10-character binary number if number is
        // negative
        if (negative) {
            return '1' + REPT('0', 9 - (512 + decimal).toString(2).length) + (512 + decimal).toString(2);
        }

        // Convert decimal number to binary
        var result = decimal.toString(2);

        // Return binary number using the minimum number of characters necessary
        // if places is undefined
        if (typeof places === 'undefined') {
            return result;
        } else {
            // Return error if places is nonnumeric
            if (isNaN(places)) {
              return error.value;
            }

            // Return error if places is negative
            if (places < 0) {
              return error.num;
            }

            // Truncate places in case it is not an integer
            places = Math.floor(places);

            // Pad return value with leading 0s (zeros) if necessary (using
            // Underscore.string)
            return (places >= result.length) ? REPT('0', places - result.length) + result : error.num;
        }
    };

    exports.OCT2DEC = function(number) {
        // Return error if number is not octal or contains more than ten
        // characters (10 digits)
        if (!/^[0-7]{1,10}$/.test(number)) {
            return error.num;
        }

        // Convert octal number to decimal
        var decimal = parseInt(number, 8);

        // Return decimal number
        return (decimal >= 536870912) ? decimal - 1073741824 : decimal;
    };

    exports.OCT2HEX = function(number, places) {
        // Return error if number is not octal or contains more than ten
        // characters (10 digits)
        if (!/^[0-7]{1,10}$/.test(number)) {
            return error.num;
        }

        // Convert octal number to decimal
        var decimal = parseInt(number, 8);

        // Ignore places and return a 10-character octal number if number is
        // negative
        if (decimal >= 536870912) {
            return 'ff' + (decimal + 3221225472).toString(16);
        }

        // Convert decimal number to hexadecimal
        var result = decimal.toString(16);

        // Return hexadecimal number using the minimum number of characters
        // necessary if places is undefined
        if (places === undefined) {
            return result;
        } else {
            // Return error if places is nonnumeric
            if (isNaN(places)) {
              return error.value;
            }

            // Return error if places is negative
            if (places < 0) {
              return error.num;
            }

            // Truncate places in case it is not an integer
            places = Math.floor(places);

            // Pad return value with leading 0s (zeros) if necessary (using
            // Underscore.string)
            return (places >= result.length) ? REPT('0', places - result.length) + result : error.num;
        }
    };

    return exports;
})();

jexcel.methods.financial = (function() {
    var exports = {};

    function validDate(d) {
        return d && d.getTime && !isNaN(d.getTime());
    }

    function ensureDate(d) {
        return (d instanceof Date)?d:new Date(d);
    }

    exports.ACCRINT = function(issue, first, settlement, rate, par, frequency, basis) {
        // Return error if either date is invalid
        issue        = ensureDate(issue);
        first        = ensureDate(first);
        settlement = ensureDate(settlement);
        if (!validDate(issue) || !validDate(first) || !validDate(settlement)) {
            return '#VALUE!';
        }

        // Return error if either rate or par are lower than or equal to zero
        if (rate <= 0 || par <= 0) {
            return '#NUM!';
        }

        // Return error if frequency is neither 1, 2, or 4
        if ([1, 2, 4].indexOf(frequency) === -1) {
            return '#NUM!';
        }

        // Return error if basis is neither 0, 1, 2, 3, or 4
        if ([0, 1, 2, 3, 4].indexOf(basis) === -1) {
            return '#NUM!';
        }

        // Return error if settlement is before or equal to issue
        if (settlement <= issue) {
            return '#NUM!';
        }

        // Set default values
        par   = par   || 0;
        basis = basis || 0;

        // Compute accrued interest
        return par * rate * YEARFRAC(issue, settlement, basis);
    };

    exports.ACCRINTM = null;

    exports.AMORDEGRC = null;

    exports.AMORLINC = null;

    exports.COUPDAYBS = null;

    exports.COUPDAYS = null;

    exports.COUPDAYSNC = null;

    exports.COUPNCD = null;

    exports.COUPNUM = null;

    exports.COUPPCD = null;

    exports.CUMIPMT = function(rate, periods, value, start, end, type) {
        // Credits: algorithm inspired by Apache OpenOffice
        // Credits: Hannes Stiebitzhofer for the translations of function and
            // variable names
        // Requires exports.FV() and exports.PMT() from exports.js
            // [http://stoic.com/exports/]

        rate = utils.parseNumber(rate);
        periods = utils.parseNumber(periods);
        value = utils.parseNumber(value);
        if (utils.anyIsError(rate, periods, value)) {
            return error.value;
        }

        // Return error if either rate, periods, or value are lower than or
            // equal to zero
        if (rate <= 0 || periods <= 0 || value <= 0) {
            return error.num;
        }

        // Return error if start < 1, end < 1, or start > end
        if (start < 1 || end < 1 || start > end) {
            return error.num;
        }

        // Return error if type is neither 0 nor 1
        if (type !== 0 && type !== 1) {
            return error.num;
        }

        // Compute cumulative interest
        var payment = exports.PMT(rate, periods, value, 0, type);
        var interest = 0;

        if (start === 1) {
            if (type === 0) {
                interest = -value;
                start++;
            }
        }

        for (var i = start; i <= end; i++) {
            if (type === 1) {
                interest += exports.FV(rate, i - 2, payment, value, 1) - payment;
            } else {
                interest += exports.FV(rate, i - 1, payment, value, 0);
            }
        }
        interest *= rate;

        // Return cumulative interest
        return interest;
    };

    exports.CUMPRINC = function(rate, periods, value, start, end, type) {
        // Credits: algorithm inspired by Apache OpenOffice
        // Credits: Hannes Stiebitzhofer for the translations of function and
            // variable names

        rate = utils.parseNumber(rate);
        periods = utils.parseNumber(periods);
        value = utils.parseNumber(value);
        if (utils.anyIsError(rate, periods, value)) {
            return error.value;
        }

        // Return error if either rate, periods, or value are lower than or
            // equal to zero
        if (rate <= 0 || periods <= 0 || value <= 0) {
            return error.num;
        }

        // Return error if start < 1, end < 1, or start > end
        if (start < 1 || end < 1 || start > end) {
            return error.num;
        }

        // Return error if type is neither 0 nor 1
        if (type !== 0 && type !== 1) {
            return error.num;
        }

        // Compute cumulative principal
        var payment = exports.PMT(rate, periods, value, 0, type);
        var principal = 0;
        if (start === 1) {
            if (type === 0) {
                principal = payment + value * rate;
            } else {
                principal = payment;
            }
            start++;
        }
        for (var i = start; i <= end; i++) {
            if (type > 0) {
                principal += payment - (exports.FV(rate, i - 2, payment, value, 1) - payment) * rate;
            } else {
                principal += payment - exports.FV(rate, i - 1, payment, value, 0) * rate;
            }
        }

        // Return cumulative principal
        return principal;
    };

    exports.DB = function(cost, salvage, life, period, month) {
        // Initialize month
        month = (month === undefined) ? 12 : month;

        cost = utils.parseNumber(cost);
        salvage = utils.parseNumber(salvage);
        life = utils.parseNumber(life);
        period = utils.parseNumber(period);
        month = utils.parseNumber(month);
        if (utils.anyIsError(cost, salvage, life, period, month)) {
            return error.value;
        }

        // Return error if any of the parameters is negative
        if (cost < 0 || salvage < 0 || life < 0 || period < 0) {
            return error.num;
        }

        // Return error if month is not an integer between 1 and 12
        if ([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].indexOf(month) === -1) {
            return error.num;
        }

        // Return error if period is greater than life
        if (period > life) {
            return error.num;
        }

        // Return 0 (zero) if salvage is greater than or equal to cost
        if (salvage >= cost) {
            return 0;
        }

        // Rate is rounded to three decimals places
        var rate = (1 - Math.pow(salvage / cost, 1 / life)).toFixed(3);

        // Compute initial depreciation
        var initial = cost * rate * month / 12;

        // Compute total depreciation
        var total = initial;
        var current = 0;
        var ceiling = (period === life) ? life - 1 : period;
        for (var i = 2; i <= ceiling; i++) {
            current = (cost - total) * rate;
            total += current;
        }

        // Depreciation for the first and last periods are special cases
        if (period === 1) {
            // First period
            return initial;
        } else if (period === life) {
            // Last period
            return (cost - total) * rate;
        } else {
            return current;
        }
    };

    exports.DDB = function(cost, salvage, life, period, factor) {
        // Initialize factor
        factor = (factor === undefined) ? 2 : factor;

        cost = utils.parseNumber(cost);
        salvage = utils.parseNumber(salvage);
        life = utils.parseNumber(life);
        period = utils.parseNumber(period);
        factor = utils.parseNumber(factor);
        if (utils.anyIsError(cost, salvage, life, period, factor)) {
            return error.value;
        }

        // Return error if any of the parameters is negative or if factor is
            // null
        if (cost < 0 || salvage < 0 || life < 0 || period < 0 || factor <= 0) {
            return error.num;
        }

        // Return error if period is greater than life
        if (period > life) {
            return error.num;
        }

        // Return 0 (zero) if salvage is greater than or equal to cost
        if (salvage >= cost) {
            return 0;
        }

        // Compute depreciation
        var total = 0;
        var current = 0;
        for (var i = 1; i <= period; i++) {
            current = Math.min((cost - total) * (factor / life), (cost - salvage - total));
            total += current;
        }

        // Return depreciation
        return current;
    };

    exports.DISC = null;

    exports.DOLLARDE = function(dollar, fraction) {
        // Credits: algorithm inspired by Apache OpenOffice

        dollar = utils.parseNumber(dollar);
        fraction = utils.parseNumber(fraction);
        if (utils.anyIsError(dollar, fraction)) {
            return error.value;
        }

        // Return error if fraction is negative
        if (fraction < 0) {
            return error.num;
        }

        // Return error if fraction is greater than or equal to 0 and less than
            // 1
        if (fraction >= 0 && fraction < 1) {
            return error.div0;
        }

        // Truncate fraction if it is not an integer
        fraction = parseInt(fraction, 10);

        // Compute integer part
        var result = parseInt(dollar, 10);

        // Add decimal part
        result += (dollar % 1) * Math.pow(10, Math.ceil(Math.log(fraction) / Math.LN10)) / fraction;

        // Round result
        var power = Math.pow(10, Math.ceil(Math.log(fraction) / Math.LN2) + 1);
        result = Math.round(result * power) / power;

        // Return converted dollar price
        return result;
    };

    exports.DOLLARFR = function(dollar, fraction) {
        // Credits: algorithm inspired by Apache OpenOffice

        dollar = utils.parseNumber(dollar);
        fraction = utils.parseNumber(fraction);
        if (utils.anyIsError(dollar, fraction)) {
            return error.value;
        }

        // Return error if fraction is negative
        if (fraction < 0) {
            return error.num;
        }

        // Return error if fraction is greater than or equal to 0 and less than
            // 1
        if (fraction >= 0 && fraction < 1) {
            return error.div0;
        }

        // Truncate fraction if it is not an integer
        fraction = parseInt(fraction, 10);

        // Compute integer part
        var result = parseInt(dollar, 10);

        // Add decimal part
        result += (dollar % 1) * Math.pow(10, -Math.ceil(Math.log(fraction) / Math.LN10)) * fraction;

        // Return converted dollar price
        return result;
    };

    exports.DURATION = null;

    exports.EFFECT = function(rate, periods) {
        rate = utils.parseNumber(rate);
        periods = utils.parseNumber(periods);
        if (utils.anyIsError(rate, periods)) {
            return error.value;
        }

        // Return error if rate <=0 or periods < 1
        if (rate <= 0 || periods < 1) {
            return error.num;
        }

        // Truncate periods if it is not an integer
        periods = parseInt(periods, 10);

        // Return effective annual interest rate
        return Math.pow(1 + rate / periods, periods) - 1;
    };

    exports.FV = function(rate, periods, payment, value, type) {
        // Credits: algorithm inspired by Apache OpenOffice

        value = value || 0;
        type = type || 0;

        rate = utils.parseNumber(rate);
        periods = utils.parseNumber(periods);
        payment = utils.parseNumber(payment);
        value = utils.parseNumber(value);
        type = utils.parseNumber(type);
        if (utils.anyIsError(rate, periods, payment, value, type)) {
            return error.value;
        }

        // Return future value
        var result;
        if (rate === 0) {
            result = value + payment * periods;
        } else {
            var term = Math.pow(1 + rate, periods);
            if (type === 1) {
                result = value * term + payment * (1 + rate) * (term - 1) / rate;
            } else {
                result = value * term + payment * (term - 1) / rate;
            }
        }
        return -result;
    };

    exports.FVSCHEDULE = function(principal, schedule) {
        principal = utils.parseNumber(principal);
        schedule = utils.parseNumberArray(utils.flatten(schedule));
        if (utils.anyIsError(principal, schedule)) {
            return error.value;
        }

        var n = schedule.length;
        var future = principal;

        // Apply all interests in schedule
        for (var i = 0; i < n; i++) {
            // Apply scheduled interest
            future *= 1 + schedule[i];
        }

        // Return future value
        return future;
    };

    exports.INTRATE = null;

    exports.IPMT = function(rate, period, periods, present, future, type) {
        // Credits: algorithm inspired by Apache OpenOffice

        future = future || 0;
        type = type || 0;

        rate = utils.parseNumber(rate);
        period = utils.parseNumber(period);
        periods = utils.parseNumber(periods);
        present = utils.parseNumber(present);
        future = utils.parseNumber(future);
        type = utils.parseNumber(type);
        if (utils.anyIsError(rate, period, periods, present, future, type)) {
            return error.value;
        }

        // Compute payment
        var payment = exports.PMT(rate, periods, present, future, type);

        // Compute interest
        var interest;
        if (period === 1) {
            if (type === 1) {
                interest = 0;
            } else {
                interest = -present;
            }
        } else {
            if (type === 1) {
                interest = exports.FV(rate, period - 2, payment, present, 1) - payment;
            } else {
                interest = exports.FV(rate, period - 1, payment, present, 0);
            }
        }

        // Return interest
        return interest * rate;
    };

    exports.IRR = function(values, guess) {
        // Credits: algorithm inspired by Apache OpenOffice

        guess = guess || 0;

        values = utils.parseNumberArray(utils.flatten(values));
        guess = utils.parseNumber(guess);
        if (utils.anyIsError(values, guess)) {
            return error.value;
        }

        // Calculates the resulting amount
        var irrResult = function(values, dates, rate) {
            var r = rate + 1;
            var result = values[0];
            for (var i = 1; i < values.length; i++) {
                result += values[i] / Math.pow(r, (dates[i] - dates[0]) / 365);
            }
            return result;
        };

        // Calculates the first derivation
        var irrResultDeriv = function(values, dates, rate) {
            var r = rate + 1;
            var result = 0;
            for (var i = 1; i < values.length; i++) {
                var frac = (dates[i] - dates[0]) / 365;
                result -= frac * values[i] / Math.pow(r, frac + 1);
            }
            return result;
        };

        // Initialize dates and check that values contains at least one positive
            // value and one negative value
        var dates = [];
        var positive = false;
        var negative = false;
        for (var i = 0; i < values.length; i++) {
            dates[i] = (i === 0) ? 0 : dates[i - 1] + 365;
            if (values[i] > 0) {
                positive = true;
            }
            if (values[i] < 0) {
                negative = true;
            }
        }

        // Return error if values does not contain at least one positive value
            // and one negative value
        if (!positive || !negative) {
            return error.num;
        }

        // Initialize guess and resultRate
        guess = (guess === undefined) ? 0.1 : guess;
        var resultRate = guess;

        // Set maximum epsilon for end of iteration
        var epsMax = 1e-10;

        // Implement Newton's method
        var newRate, epsRate, resultValue;
        var contLoop = true;
        do {
            resultValue = irrResult(values, dates, resultRate);
            newRate = resultRate - resultValue / irrResultDeriv(values, dates, resultRate);
            epsRate = Math.abs(newRate - resultRate);
            resultRate = newRate;
            contLoop = (epsRate > epsMax) && (Math.abs(resultValue) > epsMax);
        } while (contLoop);

        // Return internal rate of return
        return resultRate;
    };

    exports.ISPMT = function(rate, period, periods, value) {
        rate = utils.parseNumber(rate);
        period = utils.parseNumber(period);
        periods = utils.parseNumber(periods);
        value = utils.parseNumber(value);
        if (utils.anyIsError(rate, period, periods, value)) {
            return error.value;
        }

        // Return interest
        return value * rate * (period / periods - 1);
    };

    exports.MDURATION = null;

    exports.MIRR = function(values, finance_rate, reinvest_rate) {
        values = utils.parseNumberArray(utils.flatten(values));
        finance_rate = utils.parseNumber(finance_rate);
        reinvest_rate = utils.parseNumber(reinvest_rate);
        if (utils.anyIsError(values, finance_rate, reinvest_rate)) {
            return error.value;
        }

        // Initialize number of values
        var n = values.length;

        // Lookup payments (negative values) and incomes (positive values)
        var payments = [];
        var incomes = [];
        for (var i = 0; i < n; i++) {
            if (values[i] < 0) {
                payments.push(values[i]);
            } else {
                incomes.push(values[i]);
            }
        }

        // Return modified internal rate of return
        var num = -exports.NPV(reinvest_rate, incomes) * Math.pow(1 + reinvest_rate, n - 1);
        var den = exports.NPV(finance_rate, payments) * (1 + finance_rate);
        return Math.pow(num / den, 1 / (n - 1)) - 1;
    };

    exports.NOMINAL = function(rate, periods) {
        rate = utils.parseNumber(rate);
        periods = utils.parseNumber(periods);
        if (utils.anyIsError(rate, periods)) {
            return error.value;
        }

        // Return error if rate <=0 or periods < 1
        if (rate <= 0 || periods < 1) {
            return error.num;
        }

        // Truncate periods if it is not an integer
        periods = parseInt(periods, 10);

        // Return nominal annual interest rate
        return (Math.pow(rate + 1, 1 / periods) - 1) * periods;
    };

    exports.NPER = function(rate, payment, present, future, type) {
        type = (type === undefined) ? 0 : type;
        future = (future === undefined) ? 0 : future;

        rate = utils.parseNumber(rate);
        payment = utils.parseNumber(payment);
        present = utils.parseNumber(present);
        future = utils.parseNumber(future);
        type = utils.parseNumber(type);
        if (utils.anyIsError(rate, payment, present, future, type)) {
            return error.value;
        }

        // Return number of periods
        var num = payment * (1 + rate * type) - future * rate;
        var den = (present * rate + payment * (1 + rate * type));
        return Math.log(num / den) / Math.log(1 + rate);
    };

    exports.NPV = function() {
        var args = utils.parseNumberArray(utils.flatten(arguments));
        if (args instanceof Error) {
            return args;
        }

        // Lookup rate
        var rate = args[0];

        // Initialize net present value
        var value = 0;

        // Loop on all values
        for (var j = 1; j < args.length; j++) {
            value += args[j] / Math.pow(1 + rate, j);
        }

        // Return net present value
        return value;
    };

    exports.ODDFPRICE = null;

    exports.ODDFYIELD = null;

    exports.ODDLPRICE = null;

    exports.ODDLYIELD = null;

    exports.PDURATION = function(rate, present, future) {
        rate = utils.parseNumber(rate);
        present = utils.parseNumber(present);
        future = utils.parseNumber(future);
        if (utils.anyIsError(rate, present, future)) {
            return error.value;
        }

        // Return error if rate <=0
        if (rate <= 0) {
            return error.num;
        }

        // Return number of periods
        return (Math.log(future) - Math.log(present)) / Math.log(1 + rate);
    };

    exports.PMT = function(rate, periods, present, future, type) {
        // Credits: algorithm inspired by Apache OpenOffice

        future = future || 0;
        type = type || 0;

        rate = utils.parseNumber(rate);
        periods = utils.parseNumber(periods);
        present = utils.parseNumber(present);
        future = utils.parseNumber(future);
        type = utils.parseNumber(type);
        if (utils.anyIsError(rate, periods, present, future, type)) {
            return error.value;
        }

        // Return payment
        var result;
        if (rate === 0) {
            result = (present + future) / periods;
        } else {
            var term = Math.pow(1 + rate, periods);
            if (type === 1) {
                result = (future * rate / (term - 1) + present * rate / (1 - 1 / term)) / (1 + rate);
            } else {
                result = future * rate / (term - 1) + present * rate / (1 - 1 / term);
            }
        }
        return -result;
    };

    exports.PPMT = function(rate, period, periods, present, future, type) {
        future = future || 0;
        type = type || 0;

        rate = utils.parseNumber(rate);
        periods = utils.parseNumber(periods);
        present = utils.parseNumber(present);
        future = utils.parseNumber(future);
        type = utils.parseNumber(type);
        if (utils.anyIsError(rate, periods, present, future, type)) {
            return error.value;
        }

        return exports.PMT(rate, periods, present, future, type) - exports.IPMT(rate, period, periods, present, future, type);
    };

    exports.PRICE = null;

    exports.PRICEDISC = null;

    exports.PRICEMAT = null;

    exports.PV = function(rate, periods, payment, future, type) {
        future = future || 0;
        type = type || 0;

        rate = utils.parseNumber(rate);
        periods = utils.parseNumber(periods);
        payment = utils.parseNumber(payment);
        future = utils.parseNumber(future);
        type = utils.parseNumber(type);
        if (utils.anyIsError(rate, periods, payment, future, type)) {
            return error.value;
        }

        // Return present value
        if (rate === 0) {
            return -payment * periods - future;
        } else {
            return (((1 - Math.pow(1 + rate, periods)) / rate) * payment * (1 + rate * type) - future) / Math.pow(1 + rate, periods);
        }
    };

    exports.RATE = function(periods, payment, present, future, type, guess) {
        // Credits: rabugento

        guess = (guess === undefined) ? 0.01 : guess;
        future = (future === undefined) ? 0 : future;
        type = (type === undefined) ? 0 : type;

        periods = utils.parseNumber(periods);
        payment = utils.parseNumber(payment);
        present = utils.parseNumber(present);
        future = utils.parseNumber(future);
        type = utils.parseNumber(type);
        guess = utils.parseNumber(guess);
        if (utils.anyIsError(periods, payment, present, future, type, guess)) {
            return error.value;
        }

        // Set maximum epsilon for end of iteration
        var epsMax = 1e-6;

        // Set maximum number of iterations
        var iterMax = 100;
        var iter = 0;
        var close = false;
        var rate = guess;

        while (iter < iterMax && !close) {
            var t1 = Math.pow(rate + 1, periods);
            var t2 = Math.pow(rate + 1, periods - 1);

            var f1 = future + t1 * present + payment * (t1 - 1) * (rate * type + 1) / rate;
            var f2 = periods * t2 * present - payment * (t1 - 1) *(rate * type + 1) / Math.pow(rate,2);
            var f3 = periods * payment * t2 * (rate * type + 1) / rate + payment * (t1 - 1) * type / rate;

            var newRate = rate - f1 / (f2 + f3);

            if (Math.abs(newRate - rate) < epsMax) close = true;
            iter++
            rate = newRate;
        }

        if (!close) return Number.NaN + rate;
        return rate;
    };

    // TODO
    exports.RECEIVED = null;

    exports.RRI = function(periods, present, future) {
        periods = utils.parseNumber(periods);
        present = utils.parseNumber(present);
        future = utils.parseNumber(future);
        if (utils.anyIsError(periods, present, future)) {
            return error.value;
        }

        // Return error if periods or present is equal to 0 (zero)
        if (periods === 0 || present === 0) {
            return error.num;
        }

        // Return equivalent interest rate
        return Math.pow(future / present, 1 / periods) - 1;
    };

    exports.SLN = function(cost, salvage, life) {
        cost = utils.parseNumber(cost);
        salvage = utils.parseNumber(salvage);
        life = utils.parseNumber(life);
        if (utils.anyIsError(cost, salvage, life)) {
            return error.value;
        }

        // Return error if life equal to 0 (zero)
        if (life === 0) {
            return error.num;
        }

        // Return straight-line depreciation
        return (cost - salvage) / life;
    };

    exports.SYD = function(cost, salvage, life, period) {
        // Return error if any of the parameters is not a number
        cost = utils.parseNumber(cost);
        salvage = utils.parseNumber(salvage);
        life = utils.parseNumber(life);
        period = utils.parseNumber(period);
        if (utils.anyIsError(cost, salvage, life, period)) {
            return error.value;
        }

        // Return error if life equal to 0 (zero)
        if (life === 0) {
            return error.num;
        }

        // Return error if period is lower than 1 or greater than life
        if (period < 1 || period > life) {
            return error.num;
        }

        // Truncate period if it is not an integer
        period = parseInt(period, 10);

        // Return straight-line depreciation
        return ((cost - salvage) * (life - period + 1) * 2) / (life * (life + 1));
    };

    exports.TBILLEQ = function(settlement, maturity, discount) {
        settlement = utils.parseDate(settlement);
        maturity = utils.parseDate(maturity);
        discount = utils.parseNumber(discount);
        if (utils.anyIsError(settlement, maturity, discount)) {
            return error.value;
        }

        // Return error if discount is lower than or equal to zero
        if (discount <= 0) {
            return error.num;
        }

        // Return error if settlement is greater than maturity
        if (settlement > maturity) {
            return error.num;
        }

        // Return error if maturity is more than one year after settlement
        if (maturity - settlement > 365 * 24 * 60 * 60 * 1000) {
            return error.num;
        }

        // Return bond-equivalent yield
        return (365 * discount) / (360 - discount * DAYS360(settlement, maturity, false));
    };

    exports.TBILLPRICE = function(settlement, maturity, discount) {
        settlement = utils.parseDate(settlement);
        maturity = utils.parseDate(maturity);
        discount = utils.parseNumber(discount);
        if (utils.anyIsError(settlement, maturity, discount)) {
            return error.value;
        }

        // Return error if discount is lower than or equal to zero
        if (discount <= 0) {
            return error.num;
        }

        // Return error if settlement is greater than maturity
        if (settlement > maturity) {
            return error.num;
        }

        // Return error if maturity is more than one year after settlement
        if (maturity - settlement > 365 * 24 * 60 * 60 * 1000) {
            return error.num;
        }

        // Return bond-equivalent yield
        return 100 * (1 - discount * DAYS360(settlement, maturity, false) / 360);
    };

    exports.TBILLYIELD = function(settlement, maturity, price) {
        settlement = utils.parseDate(settlement);
        maturity = utils.parseDate(maturity);
        price = utils.parseNumber(price);
        if (utils.anyIsError(settlement, maturity, price)) {
            return error.value;
        }

        // Return error if price is lower than or equal to zero
        if (price <= 0) {
            return error.num;
        }

        // Return error if settlement is greater than maturity
        if (settlement > maturity) {
            return error.num;
        }

        // Return error if maturity is more than one year after settlement
        if (maturity - settlement > 365 * 24 * 60 * 60 * 1000) {
            return error.num;
        }

        // Return bond-equivalent yield
        return (100 - price) * 360 / (price * DAYS360(settlement, maturity, false));
    };

    exports.VDB = null;

    exports.XIRR = function(values, dates, guess) {
        // Credits: algorithm inspired by Apache OpenOffice

        values = utils.parseNumberArray(utils.flatten(values));
        dates = utils.parseDateArray(utils.flatten(dates));
        guess = utils.parseNumber(guess);
        if (utils.anyIsError(values, dates, guess)) {
            return error.value;
        }

        // Calculates the resulting amount
        var irrResult = function(values, dates, rate) {
            var r = rate + 1;
            var result = values[0];
            for (var i = 1; i < values.length; i++) {
                result += values[i] / Math.pow(r, DAYS(dates[i], dates[0]) / 365);
            }
            return result;
        };

        // Calculates the first derivation
        var irrResultDeriv = function(values, dates, rate) {
            var r = rate + 1;
            var result = 0;
            for (var i = 1; i < values.length; i++) {
                var frac = DAYS(dates[i], dates[0]) / 365;
                result -= frac * values[i] / Math.pow(r, frac + 1);
            }
            return result;
        };

        // Check that values contains at least one positive value and one
            // negative value
        var positive = false;
        var negative = false;
        for (var i = 0; i < values.length; i++) {
            if (values[i] > 0) {
                positive = true;
            }
            if (values[i] < 0) {
                negative = true;
            }
        }

        // Return error if values does not contain at least one positive value
            // and one negative value
        if (!positive || !negative) {
            return error.num;
        }

        // Initialize guess and resultRate
        guess = guess || 0.1;
        var resultRate = guess;

        // Set maximum epsilon for end of iteration
        var epsMax = 1e-10;

        // Implement Newton's method
        var newRate, epsRate, resultValue;
        var contLoop = true;
        do {
            resultValue = irrResult(values, dates, resultRate);
            newRate = resultRate - resultValue / irrResultDeriv(values, dates, resultRate);
            epsRate = Math.abs(newRate - resultRate);
            resultRate = newRate;
            contLoop = (epsRate > epsMax) && (Math.abs(resultValue) > epsMax);
        } while (contLoop);

        // Return internal rate of return
        return resultRate;
    };

    exports.XNPV = function(rate, values, dates) {
        rate = utils.parseNumber(rate);
        values = utils.parseNumberArray(utils.flatten(values));
        dates = utils.parseDateArray(utils.flatten(dates));
        if (utils.anyIsError(rate, values, dates)) {
            return error.value;
        }

        var result = 0;
        for (var i = 0; i < values.length; i++) {
            result += values[i] / Math.pow(1 + rate, DAYS(dates[i], dates[0]) / 365);
        }
        return result;
    };

    exports.YIELD = null;

    exports.YIELDDISC = null;

    exports.YIELDMAT = null;

    return exports;
})();

jexcel.methods.information = (function() {
    var exports = {};
    exports.CELL = null;

    exports.ERROR = {};
    exports.ERROR.TYPE = function(error_val) {
        switch (error_val) {
            case error.nil: return 1;
            case error.div0: return 2;
            case error.value: return 3;
            case error.ref: return 4;
            case error.name: return 5;
            case error.num: return 6;
            case error.na: return 7;
            case error.data: return 8;
        }
        return error.na;
    };

    exports.INFO = null;

    exports.ISBLANK = function(value) {
        return value === null;
    };

    exports.ISBINARY = function (number) {
        return (/^[01]{1,10}$/).test(number);
    };

    exports.ISERR = function(value) {
        return ([error.value, error.ref, error.div0, error.num, error.name, error.nil]).indexOf(value) >= 0 ||
            (typeof value === 'number' && (isNaN(value) || !isFinite(value)));
    };

    exports.ISERROR = function(value) {
        return exports.ISERR(value) || value === error.na;
    };

    exports.ISEVEN = function(number) {
        return (Math.floor(Math.abs(number)) & 1) ? false : true;
    };

    // TODO
    exports.ISFORMULA = null;

    exports.ISLOGICAL = function(value) {
        return value === true || value === false;
    };

    exports.ISNA = function(value) {
        return value === error.na;
    };

    exports.ISNONTEXT = function(value) {
        return typeof(value) !== 'string';
    };

    exports.ISNUMBER = function(value) {
        return typeof(value) === 'number' && !isNaN(value) && isFinite(value);
    };

    exports.ISODD = function(number) {
        return (Math.floor(Math.abs(number)) & 1) ? true : false;
    };

    exports.ISREF = null;

    exports.ISTEXT = function(value) {
        return typeof(value) === 'string';
    };

    exports.N = function(value) {
        if (this.ISNUMBER(value)) {
            return value;
        }
        if (value instanceof Date) {
            return value.getTime();
        }
        if (value === true) {
            return 1;
        }
        if (value === false) {
            return 0;
        }
        if (this.ISERROR(value)) {
            return value;
        }
        return 0;
    };

    exports.NA = function() {
        return error.na;
    };

    exports.SHEET = null;

    exports.SHEETS = null;

    exports.TYPE = function(value) {
        if (this.ISNUMBER(value)) {
            return 1;
        }
        if (this.ISTEXT(value)) {
            return 2;
        }
        if (this.ISLOGICAL(value)) {
            return 4;
        }
        if (this.ISERROR(value)) {
            return 16;
        }
        if (Array.isArray(value)) {
            return 64;
        }
    };

    return exports;
})();

jexcel.methods.logical = (function() {
    var exports = {};

    exports.AND = function() {
        var args = utils.flatten(arguments);
        var result = true;
        for (var i = 0; i < args.length; i++) {
            if (!args[i]) {
                result = false;
            }
        }
        return result;
    };

    exports.CHOOSE = function() {
        if (arguments.length < 2) {
            return error.na;
        }

        var index = arguments[0];
        if (index < 1 || index > 254) {
            return error.value;
        }

        if (arguments.length < index + 1) {
            return error.value;
        }

        return arguments[index];
    };

    exports.FALSE = function() {
        return false;
    };

    exports.IF = function(test, then_value, otherwise_value) {
        return test ? then_value : otherwise_value;
    };

    exports.IFERROR = function(value, valueIfError) {
        if (ISERROR(value)) {
            return valueIfError;
        }
        return value;
    };

    exports.IFNA = function(value, value_if_na) {
        return value === error.na ? value_if_na : value;
    };

    exports.NOT = function(logical) {
        return !logical;
    };

    exports.OR = function() {
        var args = utils.flatten(arguments);
        var result = false;
        for (var i = 0; i < args.length; i++) {
            if (args[i]) {
                result = true;
            }
        }
        return result;
    };

    exports.TRUE = function() {
        return true;
    };

    exports.XOR = function() {
        var args = utils.flatten(arguments);
        var result = 0;
        for (var i = 0; i < args.length; i++) {
            if (args[i]) {
                result++;
            }
        }
        return (Math.floor(Math.abs(result)) & 1) ? true : false;
    };

    exports.SWITCH = function() {
        var result;
        if (arguments.length > 0)  {
            var targetValue = arguments[0];
            var argc = arguments.length - 1;
            var switchCount = Math.floor(argc / 2);
            var switchSatisfied = false;
            var defaultClause = argc % 2 === 0 ? null : arguments[arguments.length - 1];

            if (switchCount) {
                for (var index = 0; index < switchCount; index++) {
                    if (targetValue === arguments[index * 2 + 1]) {
                      result = arguments[index * 2 + 2];
                      switchSatisfied = true;
                      break;
                    }
                }
            }

            if (!switchSatisfied && defaultClause) {
                result = defaultClause;
            }
        }

        return result;
    };

    return exports;
})();

jexcel.methods.math = (function() {
    var exports = {};

    exports.ABS = function(number) {
        number = utils.parseNumber(number);
        if (number instanceof Error) {
            return number;
        }
        return Math.abs(utils.parseNumber(number));
    };

    exports.ACOS = function(number) {
        number = utils.parseNumber(number);
        if (number instanceof Error) {
            return number;
        }
        return Math.acos(number);
    };

    exports.ACOSH = function(number) {
        number = utils.parseNumber(number);
        if (number instanceof Error) {
            return number;
        }
        return Math.log(number + Math.sqrt(number * number - 1));
    };

    exports.ACOT = function(number) {
        number = utils.parseNumber(number);
        if (number instanceof Error) {
            return number;
        }
        return Math.atan(1 / number);
    };

    exports.ACOTH = function(number) {
        number = utils.parseNumber(number);
        if (number instanceof Error) {
            return number;
        }
        return 0.5 * Math.log((number + 1) / (number - 1));
    };

    exports.AGGREGATE = null

    exports.ARABIC = function(text) {
        // Credits: Rafa? Kukawski
        if (!/^M*(?:D?C{0,3}|C[MD])(?:L?X{0,3}|X[CL])(?:V?I{0,3}|I[XV])$/.test(text)) {
            return error.value;
        }
        var r = 0;
        text.replace(/[MDLV]|C[MD]?|X[CL]?|I[XV]?/g, function(i) {
            r += {
                M: 1000,
                CM: 900,
                D: 500,
                CD: 400,
                C: 100,
                XC: 90,
                L: 50,
                XL: 40,
                X: 10,
                IX: 9,
                V: 5,
                IV: 4,
                I: 1
            }[i];
        });
        return r;
    };

    exports.ASIN = function(number) {
        number = utils.parseNumber(number);
        if (number instanceof Error) {
            return number;
        }
        return Math.asin(number);
    };

    exports.ASINH = function(number) {
        number = utils.parseNumber(number);
        if (number instanceof Error) {
            return number;
        }
        return Math.log(number + Math.sqrt(number * number + 1));
    };

    exports.ATAN = function(number) {
        number = utils.parseNumber(number);
        if (number instanceof Error) {
            return number;
        }
        return Math.atan(number);
    };

    exports.ATAN2 = function(number_x, number_y) {
        number_x = utils.parseNumber(number_x);
        number_y = utils.parseNumber(number_y);
        if (utils.anyIsError(number_x, number_y)) {
            return error.value;
        }
        return Math.atan2(number_x, number_y);
    };

    exports.ATANH = function(number) {
        number = utils.parseNumber(number);
        if (number instanceof Error) {
            return number;
        }
        return Math.log((1 + number) / (1 - number)) / 2;
    };

    exports.BASE = function(number, radix, min_length) {
        min_length = min_length || 0;

        number = utils.parseNumber(number);
        radix = utils.parseNumber(radix);
        min_length = utils.parseNumber(min_length);
        if (utils.anyIsError(number, radix, min_length)) {
            return error.value;
        }
        min_length = (min_length === undefined) ? 0 : min_length;
        var result = number.toString(radix);
        return new Array(Math.max(min_length + 1 - result.length, 0)).join('0') + result;
    };

    exports.CEILING = function(number, significance, mode) {
        significance = (significance === undefined) ? 1 : significance;
        mode = (mode === undefined) ? 0 : mode;

        number = utils.parseNumber(number);
        significance = utils.parseNumber(significance);
        mode = utils.parseNumber(mode);
        if (utils.anyIsError(number, significance, mode)) {
            return error.value;
        }
        if (significance === 0) {
            return 0;
        }

        significance = Math.abs(significance);
        if (number >= 0) {
            return Math.ceil(number / significance) * significance;
        } else {
            if (mode === 0) {
                return -1 * Math.floor(Math.abs(number) / significance) * significance;
            } else {
                return -1 * Math.ceil(Math.abs(number) / significance) * significance;
            }
        }
    };

    exports.CEILING.MATH = exports.CEILING;

    exports.CEILING.PRECISE = exports.CEILING;

    exports.COMBIN = function(number, number_chosen) {
        number = utils.parseNumber(number);
        number_chosen = utils.parseNumber(number_chosen);
        if (utils.anyIsError(number, number_chosen)) {
            return error.value;
        }
        return exports.FACT(number) / (exports.FACT(number_chosen) * exports.FACT(number - number_chosen));
    };

    exports.COMBINA = function(number, number_chosen) {
        number = utils.parseNumber(number);
        number_chosen = utils.parseNumber(number_chosen);
        if (utils.anyIsError(number, number_chosen)) {
            return error.value;
        }
        return (number === 0 && number_chosen === 0) ? 1 : exports.COMBIN(number + number_chosen - 1, number - 1);
    };

    exports.COS = function(number) {
        number = utils.parseNumber(number);
        if (number instanceof Error) {
            return number;
        }
        return Math.cos(number);
    };

    exports.COSH = function(number) {
        number = utils.parseNumber(number);
        if (number instanceof Error) {
            return number;
        }
        return (Math.exp(number) + Math.exp(-number)) / 2;
    };

    exports.COT = function(number) {
        number = utils.parseNumber(number);
        if (number instanceof Error) {
            return number;
        }
        return 1 / Math.tan(number);
    };

    exports.COTH = function(number) {
        number = utils.parseNumber(number);
        if (number instanceof Error) {
            return number;
        }
        var e2 = Math.exp(2 * number);
        return (e2 + 1) / (e2 - 1);
    };

    exports.CSC = function(number) {
        number = utils.parseNumber(number);
        if (number instanceof Error) {
            return number;
        }
        return 1 / Math.sin(number);
    };

    exports.CSCH = function(number) {
        number = utils.parseNumber(number);
        if (number instanceof Error) {
            return number;
        }
        return 2 / (Math.exp(number) - Math.exp(-number));
    };

    exports.DECIMAL = function(number, radix) {
        if (arguments.length < 1) {
            return error.value;
        }


        return parseInt(number, radix);
    };

    exports.DEGREES = function(number) {
        number = utils.parseNumber(number);
        if (number instanceof Error) {
            return number;
        }
        return number * 180 / Math.PI;
    };

    exports.EVEN = function(number) {
        number = utils.parseNumber(number);
        if (number instanceof Error) {
            return number;
        }
        return exports.CEILING(number, -2, -1);
    };

    exports.EXP = Math.exp;

    var MEMOIZED_FACT = [];
    exports.FACT = function(number) {
        number = utils.parseNumber(number);
        if (number instanceof Error) {
            return number;
        }
        var n = Math.floor(number);
        if (n === 0 || n === 1) {
            return 1;
        } else if (MEMOIZED_FACT[n] > 0) {
            return MEMOIZED_FACT[n];
        } else {
            MEMOIZED_FACT[n] = exports.FACT(n - 1) * n;
            return MEMOIZED_FACT[n];
        }
    };

    exports.FACTDOUBLE = function(number) {
        number = utils.parseNumber(number);
        if (number instanceof Error) {
            return number;
        }
        var n = Math.floor(number);
        if (n <= 0) {
            return 1;
        } else {
            return n * exports.FACTDOUBLE(n - 2);
        }
    };

    exports.FLOOR = function(number, significance, mode) {
        significance = (significance === undefined) ? 1 : significance;
        mode = (mode === undefined) ? 0 : mode;

        number = utils.parseNumber(number);
        significance = utils.parseNumber(significance);
        mode = utils.parseNumber(mode);
        if (utils.anyIsError(number, significance, mode)) {
            return error.value;
        }
        if (significance === 0) {
            return 0;
        }

        significance = Math.abs(significance);
        if (number >= 0) {
            return Math.floor(number / significance) * significance;
        } else {
            if (mode === 0) {
                return -1 * Math.ceil(Math.abs(number) / significance) * significance;
            } else {
                return -1 * Math.floor(Math.abs(number) / significance) * significance;
            }
        }
    };

    exports.FLOOR.MATH = exports.FLOOR;

    exports.GCD = null;

    exports.INT = function(number) {
        number = utils.parseNumber(number);
        if (number instanceof Error) {
            return number;
        }
        return Math.floor(number);
    };

    exports.LCM = function() {
        // Credits: Jonas Raoni Soares Silva
        var o = utils.parseNumberArray(utils.flatten(arguments));
        if (o instanceof Error) {
            return o;
        }
        for (var i, j, n, d, r = 1;
            (n = o.pop()) !== undefined;) {
            while (n > 1) {
                if (n % 2) {
                    for (i = 3, j = Math.floor(Math.sqrt(n)); i <= j && n % i; i += 2) {
                      //empty
                    }
                    d = (i <= j) ? i : n;
                } else {
                    d = 2;
                }
                for (n /= d, r *= d, i = o.length; i;
                    (o[--i] % d) === 0 && (o[i] /= d) === 1 && o.splice(i, 1)) {
                    //empty
                }
            }
        }
        return r;
    };

    exports.LN = function(number) {
        number = utils.parseNumber(number);
        if (number instanceof Error) {
            return number;
        }
        return Math.log(number);
    };

    exports.LOG = function(number, base) {
        number = utils.parseNumber(number);
        base = (base === undefined) ? 10 : utils.parseNumber(base);

        if (utils.anyIsError(number, base)) {
            return error.value;
        }

        return Math.log(number) / Math.log(base);
    };

    exports.LOG10 = function(number) {
        number = utils.parseNumber(number);
        if (number instanceof Error) {
            return number;
        }
        return Math.log(number) / Math.log(10);
    };

    exports.MDETERM = null;

    exports.MINVERSE = null;

    exports.MMULT = null;

    exports.MOD = function(dividend, divisor) {
        dividend = utils.parseNumber(dividend);
        divisor = utils.parseNumber(divisor);
        if (utils.anyIsError(dividend, divisor)) {
            return error.value;
        }
        if (divisor === 0) {
            return error.div0;
        }
        var modulus = Math.abs(dividend % divisor);
        return (divisor > 0) ? modulus : -modulus;
    };

    exports.MROUND = function(number, multiple) {
        number = utils.parseNumber(number);
        multiple = utils.parseNumber(multiple);
        if (utils.anyIsError(number, multiple)) {
            return error.value;
        }
        if (number * multiple < 0) {
            return error.num;
        }

        return Math.round(number / multiple) * multiple;
    };

    exports.MULTINOMIAL = function() {
        var args = utils.parseNumberArray(utils.flatten(arguments));
        if (args instanceof Error) {
            return args;
        }
        var sum = 0;
        var divisor = 1;
        for (var i = 0; i < args.length; i++) {
            sum += args[i];
            divisor *= exports.FACT(args[i]);
        }
        return exports.FACT(sum) / divisor;
    };

    exports.MUNIT = null;

    exports.ODD = function(number) {
        number = utils.parseNumber(number);
        if (number instanceof Error) {
            return number;
        }
        var temp = Math.ceil(Math.abs(number));
        temp = (temp & 1) ? temp : temp + 1;
        return (number > 0) ? temp : -temp;
    };

    exports.PI = function() {
        return Math.PI;
    };

    exports.POWER = function(number, power) {
        number = utils.parseNumber(number);
        power = utils.parseNumber(power);
        if (utils.anyIsError(number, power)) {
            return error.value;
        }
        var result = Math.pow(number, power);
        if (isNaN(result)) {
            return error.num;
        }

        return result;
    };

    exports.PRODUCT = function() {
        var args = utils.parseNumberArray(utils.flatten(arguments));
        if (args instanceof Error) {
            return args;
        }
        var result = 1;
        for (var i = 0; i < args.length; i++) {
            result *= args[i];
        }
        return result;
    };

    exports.QUOTIENT = function(numerator, denominator) {
        numerator = utils.parseNumber(numerator);
        denominator = utils.parseNumber(denominator);
        if (utils.anyIsError(numerator, denominator)) {
            return error.value;
        }
        return parseInt(numerator / denominator, 10);
    };

    exports.RADIANS = function(number) {
        number = utils.parseNumber(number);
        if (number instanceof Error) {
            return number;
        }
        return number * Math.PI / 180;
    };

    exports.RAND = function() {
        return Math.random();
    };

    exports.RANDBETWEEN = function(bottom, top) {
        bottom = utils.parseNumber(bottom);
        top = utils.parseNumber(top);
        if (utils.anyIsError(bottom, top)) {
            return error.value;
        }
        // Creative Commons Attribution 3.0 License
        // Copyright (c) 2012 eqcode
        return bottom + Math.ceil((top - bottom + 1) * Math.random()) - 1;
    };

    exports.ROMAN = null;

    exports.ROUND = function(number, digits) {
        number = utils.parseNumber(number);
        digits = utils.parseNumber(digits);
        if (utils.anyIsError(number, digits)) {
            return error.value;
        }
        return Math.round(number * Math.pow(10, digits)) / Math.pow(10, digits);
    };

    exports.ROUNDDOWN = function(number, digits) {
        number = utils.parseNumber(number);
        digits = utils.parseNumber(digits);
        if (utils.anyIsError(number, digits)) {
            return error.value;
        }
        var sign = (number > 0) ? 1 : -1;
        return sign * (Math.floor(Math.abs(number) * Math.pow(10, digits))) / Math.pow(10, digits);
    };

    exports.ROUNDUP = function(number, digits) {
        number = utils.parseNumber(number);
        digits = utils.parseNumber(digits);
        if (utils.anyIsError(number, digits)) {
            return error.value;
        }
        var sign = (number > 0) ? 1 : -1;
        return sign * (Math.ceil(Math.abs(number) * Math.pow(10, digits))) / Math.pow(10, digits);
    };

    exports.SEC = function(number) {
        number = utils.parseNumber(number);
        if (number instanceof Error) {
            return number;
        }
        return 1 / Math.cos(number);
    };

    exports.SECH = function(number) {
        number = utils.parseNumber(number);
        if (number instanceof Error) {
            return number;
        }
        return 2 / (Math.exp(number) + Math.exp(-number));
    };

    exports.SERIESSUM = function(x, n, m, coefficients) {
        x = utils.parseNumber(x);
        n = utils.parseNumber(n);
        m = utils.parseNumber(m);
        coefficients = utils.parseNumberArray(coefficients);
        if (utils.anyIsError(x, n, m, coefficients)) {
            return error.value;
        }
        var result = coefficients[0] * Math.pow(x, n);
        for (var i = 1; i < coefficients.length; i++) {
            result += coefficients[i] * Math.pow(x, n + i * m);
        }
        return result;
    };

    exports.SIGN = function(number) {
        number = utils.parseNumber(number);
        if (number instanceof Error) {
            return number;
        }
        if (number < 0) {
            return -1;
        } else if (number === 0) {
            return 0;
        } else {
            return 1;
        }
    };

    exports.SIN = function(number) {
        number = utils.parseNumber(number);
        if (number instanceof Error) {
            return number;
        }
        return Math.sin(number);
    };

    exports.SINH = function(number) {
        number = utils.parseNumber(number);
        if (number instanceof Error) {
            return number;
        }
        return (Math.exp(number) - Math.exp(-number)) / 2;
    };

    exports.SQRT = function(number) {
        number = utils.parseNumber(number);
        if (number instanceof Error) {
            return number;
        }
        if (number < 0) {
            return error.num;
        }
        return Math.sqrt(number);
    };

    exports.SQRTPI = function(number) {
        number = utils.parseNumber(number);
        if (number instanceof Error) {
            return number;
        }
        return Math.sqrt(number * Math.PI);
    };

    exports.SUBTOTAL = null;

    exports.ADD = function (num1, num2) {
        if (arguments.length !== 2) {
            return error.na;
        }

        num1 = utils.parseNumber(num1);
        num2 = utils.parseNumber(num2);
        if (utils.anyIsError(num1, num2)) {
            return error.value;
        }

        return num1 + num2;
    };

    exports.MINUS = function (num1, num2) {
        if (arguments.length !== 2) {
            return error.na;
        }

        num1 = utils.parseNumber(num1);
        num2 = utils.parseNumber(num2);
        if (utils.anyIsError(num1, num2)) {
            return error.value;
        }

        return num1 - num2;
    };

    exports.DIVIDE = function (dividend, divisor) {
        if (arguments.length !== 2) {
            return error.na;
        }

        dividend = utils.parseNumber(dividend);
        divisor = utils.parseNumber(divisor);
        if (utils.anyIsError(dividend, divisor)) {
            return error.value;
        }

        if (divisor === 0) {
            return error.div0;
        }

        return dividend / divisor;
    };

    exports.MULTIPLY = function (factor1, factor2) {
        if (arguments.length !== 2) {
            return error.na;
        }

        factor1 = utils.parseNumber(factor1);
        factor2 = utils.parseNumber(factor2);
        if (utils.anyIsError(factor1, factor2)) {
            return error.value;
        }

        return factor1 * factor2;
    };

    exports.GTE = function (num1, num2) {
        if (arguments.length !== 2) {
            return error.na;
        }

        num1 = utils.parseNumber(num1);
        num2 = utils.parseNumber(num2);
        if (utils.anyIsError(num1, num2)) {
            return error.error;
        }

        return num1 >= num2;
    };

    exports.LT = function (num1, num2) {
        if (arguments.length !== 2) {
            return error.na;
        }

        num1 = utils.parseNumber(num1);
        num2 = utils.parseNumber(num2);
        if (utils.anyIsError(num1, num2)) {
            return error.error;
        }

        return num1 < num2;
    };

    exports.LTE = function (num1, num2) {
        if (arguments.length !== 2) {
            return error.na;
        }

        num1 = utils.parseNumber(num1);
        num2 = utils.parseNumber(num2);
        if (utils.anyIsError(num1, num2)) {
            return error.error;
        }

        return num1 <= num2;
    };

    exports.EQ = function (value1, value2) {
        if (arguments.length !== 2) {
            return error.na;
        }

        return value1 === value2;
    };

    exports.NE = function (value1, value2) {
        if (arguments.length !== 2) {
            return error.na;
        }

        return value1 !== value2;
    };

    exports.POW = function (base, exponent) {
        if (arguments.length !== 2) {
            return error.na;
        }

        base = utils.parseNumber(base);
        exponent = utils.parseNumber(exponent);
        if (utils.anyIsError(base, exponent)) {
            return error.error;
        }

        return exports.POWER(base, exponent);
    };

    exports.SUM = function() {
        var result = 0;
        var argsKeys = Object.keys(arguments);
        for (var i = 0; i < argsKeys.length; ++i) {
            var elt = arguments[argsKeys[i]];
            if (typeof elt === 'number') {
                result += elt;
            } else if (typeof elt === 'string') {
                var parsed = parseFloat(elt);
                !isNaN(parsed) && (result += parsed);
            } else if (Array.isArray(elt)) {
                result += exports.SUM.apply(null, elt);
            }
        }
        return result;
    };

    exports.SUMIF = function(range, criteria) {
        range = utils.parseNumberArray(utils.flatten(range));
        if (range instanceof Error) {
            return range;
        }
        var result = 0;
        for (var i = 0; i < range.length; i++) {
            result += (eval(range[i] + criteria)) ? range[i] : 0; // jshint ignore:line
        }
        return result;
    };

    exports.SUMIFS = function() {
        var args = utils.argsToArray(arguments);
        var range = utils.parseNumberArray(utils.flatten(args.shift()));
        if (range instanceof Error) {
            return range;
        }
        var criteria = args;

        var n_range_elements = range.length;
        var n_criterias = criteria.length;

        var result = 0;
        for (var i = 0; i < n_range_elements; i++) {
            var el = range[i];
            var condition = '';
            for (var c = 0; c < n_criterias; c++) {
                condition += el + criteria[c];
                if (c !== n_criterias - 1) {
                    condition += '&&';
                }
            }
            if (eval(condition)) { // jshint ignore:line
                result += el;
            }
        }
        return result;
    };

    exports.SUMPRODUCT = null;

    exports.SUMSQ = function() {
        var numbers = utils.parseNumberArray(utils.flatten(arguments));
        if (numbers instanceof Error) {
            return numbers;
        }
        var result = 0;
        var length = numbers.length;
        for (var i = 0; i < length; i++) {
            result += (ISNUMBER(numbers[i])) ? numbers[i] * numbers[i] : 0;
        }
        return result;
    };

    exports.SUMX2MY2 = function(array_x, array_y) {
        array_x = utils.parseNumberArray(utils.flatten(array_x));
        array_y = utils.parseNumberArray(utils.flatten(array_y));
        if (utils.anyIsError(array_x, array_y)) {
            return error.value;
        }
        var result = 0;
        for (var i = 0; i < array_x.length; i++) {
            result += array_x[i] * array_x[i] - array_y[i] * array_y[i];
        }
        return result;
    };

    exports.SUMX2PY2 = function(array_x, array_y) {
        array_x = utils.parseNumberArray(utils.flatten(array_x));
        array_y = utils.parseNumberArray(utils.flatten(array_y));
        if (utils.anyIsError(array_x, array_y)) {
            return error.value;
        }
        var result = 0;
        array_x = utils.parseNumberArray(utils.flatten(array_x));
        array_y = utils.parseNumberArray(utils.flatten(array_y));
        for (var i = 0; i < array_x.length; i++) {
            result += array_x[i] * array_x[i] + array_y[i] * array_y[i];
        }
        return result;
    };

    exports.SUMXMY2 = function(array_x, array_y) {
        array_x = utils.parseNumberArray(utils.flatten(array_x));
        array_y = utils.parseNumberArray(utils.flatten(array_y));
        if (utils.anyIsError(array_x, array_y)) {
            return error.value;
        }
        var result = 0;
        array_x = utils.flatten(array_x);
        array_y = utils.flatten(array_y);
        for (var i = 0; i < array_x.length; i++) {
            result += Math.pow(array_x[i] - array_y[i], 2);
        }
        return result;
    };

    exports.TAN = function(number) {
        number = utils.parseNumber(number);
        if (number instanceof Error) {
            return number;
        }
        return Math.tan(number);
    };

    exports.TANH = function(number) {
        number = utils.parseNumber(number);
        if (number instanceof Error) {
            return number;
        }
        var e2 = Math.exp(2 * number);
        return (e2 - 1) / (e2 + 1);
    };

    exports.TRUNC = function(number, digits) {
        digits = (digits === undefined) ? 0 : digits;
        number = utils.parseNumber(number);
        digits = utils.parseNumber(digits);
        if (utils.anyIsError(number, digits)) {
            return error.value;
        }
        var sign = (number > 0) ? 1 : -1;
        return sign * (Math.floor(Math.abs(number) * Math.pow(10, digits))) / Math.pow(10, digits);
    };

    return exports;
})();

jexcel.methods.misc = (function() {
    var exports = {};

    exports.UNIQUE = function () {
        var result = [];
        for (var i = 0; i < arguments.length; ++i) {
            var hasElement = false;
            var element = arguments[i];

            // Check if we've already seen this element.
            for (var j = 0; j < result.length; ++j) {
                hasElement = result[j] === element;
                if (hasElement) { break; }
            }

            // If we did not find it, add it to the result.
            if (!hasElement) {
                result.push(element);
            }
        }
        return result;
    };

    exports.FLATTEN = utils.flatten;

    exports.ARGS2ARRAY = function () {
        return Array.prototype.slice.call(arguments, 0);
    };

    exports.REFERENCE = function (context, reference) {
        try {
            var path = reference.split('.');
            var result = context;
            for (var i = 0; i < path.length; ++i) {
                var step = path[i];
                if (step[step.length - 1] === ']') {
                    var opening = step.indexOf('[');
                    var index = step.substring(opening + 1, step.length - 1);
                    result = result[step.substring(0, opening)][index];
                } else {
                    result = result[step];
                }
            }
            return result;
        } catch (error) {}
    };

    exports.JOIN = function (array, separator) {
        return array.join(separator);
    };

    exports.NUMBERS = function () {
        var possibleNumbers = utils.flatten(arguments);
        return possibleNumbers.filter(function (el) {
            return typeof el === 'number';
        });
    };

    exports.NUMERAL = null;

    return exports;
})();

jexcel.methods.text = (function() {
    var exports = {};

    exports.ASC = null;

    exports.BAHTTEXT = null;

    exports.CHAR = function(number) {
        number = utils.parseNumber(number);
        if (number instanceof Error) {
            return number;
        }
        return String.fromCharCode(number);
    };

    exports.CLEAN = function(text) {
        text = text || '';
        var re = /[\0-\x1F]/g;
        return text.replace(re, "");
    };

    exports.CODE = function(text) {
        text = text || '';
        return text.charCodeAt(0);
    };

    exports.CONCATENATE = function() {
        var args = utils.flatten(arguments);

        var trueFound = 0;
        while ((trueFound = args.indexOf(true)) > -1) {
            args[trueFound] = 'TRUE';
        }

        var falseFound = 0;
        while ((falseFound = args.indexOf(false)) > -1) {
            args[falseFound] = 'FALSE';
        }

        return args.join('');
    };

    exports.DBCS = null;

    exports.DOLLAR = null;

    exports.EXACT = function(text1, text2) {
        return text1 === text2;
    };

    exports.FIND = function(find_text, within_text, position) {
        position = (position === undefined) ? 0 : position;
        return within_text ? within_text.indexOf(find_text, position - 1) + 1 : null;
    };

    exports.FIXED = null;

    exports.HTML2TEXT = function (value) {
        var result = '';

        if (value) {
            if (value instanceof Array) {
                value.forEach(function (line) {
                    if (result !== '') {
                      result += '\n';
                    }
                    result += (line.replace(/<(?:.|\n)*?>/gm, ''));
                });
            } else {
                result = value.replace(/<(?:.|\n)*?>/gm, '');
            }
        }

        return result;
    };

    exports.LEFT = function(text, number) {
        number = (number === undefined) ? 1 : number;
        number = utils.parseNumber(number);
        if (number instanceof Error || typeof text !== 'string') {
            return error.value;
        }
        return text ? text.substring(0, number) : null;
    };

    exports.LEN = function(text) {
        if (arguments.length === 0) {
            return error.error;
        }

        if (typeof text === 'string') {
            return text ? text.length : 0;
        }

        if (text.length) {
            return text.length;
        }

        return error.value;
    };

    exports.LOWER = function(text) {
        if (typeof text !== 'string') {
            return error.value;
        }
        return text ? text.toLowerCase() : text;
    };

    exports.MID = function(text, start, number) {
        start = utils.parseNumber(start);
        number = utils.parseNumber(number);
        if (utils.anyIsError(start, number) || typeof text !== 'string') {
            return number;
        }

        var begin = start - 1;
        var end = begin + number;

        return text.substring(begin, end);
    };

    exports.NUMBERVALUE = null;

    exports.PRONETIC = null;

    exports.PROPER = function(text) {
        if (text === undefined || text.length === 0) {
            return error.value;
        }
        if (text === true) {
            text = 'TRUE';
        }
        if (text === false) {
            text = 'FALSE';
        }
        if (isNaN(text) && typeof text === 'number') {
            return error.value;
        }
        if (typeof text === 'number') {
            text = '' + text;
        }

        return text.replace(/\w\S*/g, function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    };

    exports.REGEXEXTRACT = function (text, regular_expression) {
        var match = text.match(new RegExp(regular_expression));
        return match ? (match[match.length > 1 ? match.length - 1 : 0]) : null;
    };

    exports.REGEXMATCH = function (text, regular_expression, full) {
        var match = text.match(new RegExp(regular_expression));
        return full ? match : !!match;
    };

    exports.REGEXREPLACE = function (text, regular_expression, replacement) {
        return text.replace(new RegExp(regular_expression), replacement);
    };

    exports.REPLACE = function(text, position, length, new_text) {
        position = utils.parseNumber(position);
        length = utils.parseNumber(length);
        if (utils.anyIsError(position, length) ||
            typeof text !== 'string' ||
            typeof new_text !== 'string') {
            return error.value;
        }
        return text.substr(0, position - 1) + new_text + text.substr(position - 1 + length);
    };

    exports.REPT = function(text, number) {
        number = utils.parseNumber(number);
        if (number instanceof Error) {
            return number;
        }
        return new Array(number + 1).join(text);
    };

    exports.RIGHT = function(text, number) {
        number = (number === undefined) ? 1 : number;
        number = utils.parseNumber(number);
        if (number instanceof Error) {
            return number;
        }
        return text ? text.substring(text.length - number) : null;
    };

    exports.SEARCH = function(find_text, within_text, position) {
        var foundAt;
        if (typeof find_text !== 'string' || typeof within_text !== 'string') {
            return error.value;
        }
        position = (position === undefined) ? 0 : position;
        foundAt = within_text.toLowerCase().indexOf(find_text.toLowerCase(), position - 1)+1;
        return (foundAt === 0)?error.value:foundAt;
    };

    exports.SPLIT = function (text, separator) {
        return text.split(separator);
    };

    exports.SUBSTITUTE = function(text, old_text, new_text, occurrence) {
        if (!text || !old_text || !new_text) {
            return text;
        } else if (occurrence === undefined) {
            return text.replace(new RegExp(old_text, 'g'), new_text);
        } else {
            var index = 0;
            var i = 0;
            while (text.indexOf(old_text, index) > 0) {
                index = text.indexOf(old_text, index + 1);
                i++;
                if (i === occurrence) {
                    return text.substring(0, index) + new_text + text.substring(index + old_text.length);
                }
            }
        }
    };

    exports.T = function(value) {
        return (typeof value === "string") ? value : '';
    };

    exports.TEXT = null;

    exports.TRIM = function(text) {
        if (typeof text !== 'string') {
            return error.value;
        }
        return text.replace(/ +/g, ' ').trim();
    };

    exports.UNICHAR = exports.CHAR;

    exports.UNICODE = exports.CODE;

    exports.UPPER = function(text) {
        if (typeof text !== 'string') {
            return error.value;
        }
        return text.toUpperCase();
    };

    exports.VALUE = null;

    return exports;
})();

jexcel.methods.stats = (function() {
    var exports = {};

    var SQRT2PI = 2.5066282746310002;

    exports.AVEDEV = null;

    exports.AVERAGE = function() {
        var range = utils.numbers(utils.flatten(arguments));
        var n = range.length;
        var sum = 0;
        var count = 0;
        for (var i = 0; i < n; i++) {
            sum += range[i];
            count += 1;
        }
        return sum / count;
    };

    exports.AVERAGEA = function() {
        var range = utils.flatten(arguments);
        var n = range.length;
        var sum = 0;
        var count = 0;
        for (var i = 0; i < n; i++) {
            var el = range[i];
            if (typeof el === 'number') {
                sum += el;
            }
            if (el === true) {
                sum++;
            }
            if (el !== null) {
                count++;
            }
        }
        return sum / count;
    };

    exports.AVERAGEIF = function(range, criteria, average_range) {
        average_range = average_range || range;
        range = utils.flatten(range);
        average_range = utils.parseNumberArray(utils.flatten(average_range));
        if (average_range instanceof Error) {
            return average_range;
        }
        var average_count = 0;
        var result = 0;
        for (var i = 0; i < range.length; i++) {
            if (eval(range[i] + criteria)) { // jshint ignore:line
                result += average_range[i];
                average_count++;
            }
        }
        return result / average_count;
    };

    exports.AVERAGEIFS = null;

    exports.COUNT = function() {
        return utils.numbers(utils.flatten(arguments)).length;
    };

    exports.COUNTA = function() {
        var range = utils.flatten(arguments);
        return range.length - exports.COUNTBLANK(range);
    };

    exports.COUNTIN = function (range, value) {
        var result = 0;
        for (var i = 0; i < range.length; i++) {
            if (range[i] === value) {
                result++;
            }
        }
        return result;
    };

    exports.COUNTBLANK = function() {
        var range = utils.flatten(arguments);
        var blanks = 0;
        var element;
        for (var i = 0; i < range.length; i++) {
            element = range[i];
            if (element === null || element === '') {
                blanks++;
            }
        }
        return blanks;
    };

    exports.COUNTIF = function(range, criteria) {
        range = utils.flatten(range);
        if (!/[<>=!]/.test(criteria)) {
            criteria = '=="' + criteria + '"';
        }
        var matches = 0;
        for (var i = 0; i < range.length; i++) {
            if (typeof range[i] !== 'string') {
                if (eval(range[i] + criteria)) { // jshint ignore:line
                    matches++;
                }
            } else {
                if (eval('"' + range[i] + '"' + criteria)) { // jshint ignore:line
                    matches++;
                }
            }
        }
        return matches;
    };

    exports.COUNTIFS = function() {
        var args = utils.argsToArray(arguments);
        var results = new Array(utils.flatten(args[0]).length);
        for (var i = 0; i < results.length; i++) {
            results[i] = true;
        }
        for (i = 0; i < args.length; i += 2) {
            var range = utils.flatten(args[i]);
            var criteria = args[i + 1];
            if (!/[<>=!]/.test(criteria)) {
                criteria = '=="' + criteria + '"';
            }
            for (var j = 0; j < range.length; j++) {
                if (typeof range[j] !== 'string') {
                    results[j] = results[j] && eval(range[j] + criteria); // jshint ignore:line
                } else {
                    results[j] = results[j] && eval('"' + range[j] + '"' + criteria); // jshint ignore:line
                }
            }
        }
        var result = 0;
        for (i = 0; i < results.length; i++) {
            if (results[i]) {
                result++;
            }
        }
        return result;
    };

    exports.COUNTUNIQUE = function () {
        return UNIQUE.apply(null, utils.flatten(arguments)).length;
    };

    exports.FISHER = function(x) {
        x = utils.parseNumber(x);
        if (x instanceof Error) {
            return x;
        }
        return Math.log((1 + x) / (1 - x)) / 2;
    };

    exports.FISHERINV = function(y) {
        y = utils.parseNumber(y);
        if (y instanceof Error) {
            return y;
        }
        var e2y = Math.exp(2 * y);
        return (e2y - 1) / (e2y + 1);
    };

    exports.FREQUENCY = function(data, bins) {
        data = utils.parseNumberArray(utils.flatten(data));
        bins = utils.parseNumberArray(utils.flatten(bins));
        if (utils.anyIsError(data, bins)) {
            return error.value;
        }
        var n = data.length;
        var b = bins.length;
        var r = [];
        for (var i = 0; i <= b; i++) {
            r[i] = 0;
            for (var j = 0; j < n; j++) {
                if (i === 0) {
                    if (data[j] <= bins[0]) {
                        r[0] += 1;
                    }
                } else if (i < b) {
                    if (data[j] > bins[i - 1] && data[j] <= bins[i]) {
                        r[i] += 1;
                    }
                } else if (i === b) {
                    if (data[j] > bins[b - 1]) {
                        r[b] += 1;
                    }
                }
            }
        }
        return r;
    };

    exports.LARGE = function(range, k) {
        range = utils.parseNumberArray(utils.flatten(range));
        k = utils.parseNumber(k);
        if (utils.anyIsError(range, k)) {
            return range;
        }
        return range.sort(function(a, b) {
            return b - a;
        })[k - 1];
    };

    exports.MAX = function() {
        var range = utils.numbers(utils.flatten(arguments));
        return (range.length === 0) ? 0 : Math.max.apply(Math, range);
    };

    exports.MAXA = function() {
        var range = utils.arrayValuesToNumbers(utils.flatten(arguments));
        return (range.length === 0) ? 0 : Math.max.apply(Math, range);
    };

    exports.MIN = function() {
        var range = utils.numbers(utils.flatten(arguments));
        return (range.length === 0) ? 0 : Math.min.apply(Math, range);
    };

    exports.MINA = function() {
        var range = utils.arrayValuesToNumbers(utils.flatten(arguments));
        return (range.length === 0) ? 0 : Math.min.apply(Math, range);
    };

    exports.MODE = {};

    exports.MODE.MULT = function() {
        // Credits: Roönaän
        var range = utils.parseNumberArray(utils.flatten(arguments));
        if (range instanceof Error) {
            return range;
        }
        var n = range.length;
        var count = {};
        var maxItems = [];
        var max = 0;
        var currentItem;

        for (var i = 0; i < n; i++) {
            currentItem = range[i];
            count[currentItem] = count[currentItem] ? count[currentItem] + 1 : 1;
            if (count[currentItem] > max) {
                max = count[currentItem];
                maxItems = [];
            }
            if (count[currentItem] === max) {
                maxItems[maxItems.length] = currentItem;
            }
        }
        return maxItems;
    };

    exports.MODE.SNGL = function() {
        var range = utils.parseNumberArray(utils.flatten(arguments));
        if (range instanceof Error) {
            return range;
        }
        return exports.MODE.MULT(range).sort(function(a, b) {
            return a - b;
        })[0];
    };

    exports.PERCENTILE = {};

    exports.PERCENTILE.EXC = function(array, k) {
        array = utils.parseNumberArray(utils.flatten(array));
        k = utils.parseNumber(k);
        if (utils.anyIsError(array, k)) {
            return error.value;
        }
        array = array.sort(function(a, b) {
            {
                return a - b;
            }
        });
        var n = array.length;
        if (k < 1 / (n + 1) || k > 1 - 1 / (n + 1)) {
            return error.num;
        }
        var l = k * (n + 1) - 1;
        var fl = Math.floor(l);
        return utils.cleanFloat((l === fl) ? array[l] : array[fl] + (l - fl) * (array[fl + 1] - array[fl]));
    };

    exports.PERCENTILE.INC = function(array, k) {
        array = utils.parseNumberArray(utils.flatten(array));
        k = utils.parseNumber(k);
        if (utils.anyIsError(array, k)) {
            return error.value;
        }
        array = array.sort(function(a, b) {
            return a - b;
        });
        var n = array.length;
        var l = k * (n - 1);
        var fl = Math.floor(l);
        return utils.cleanFloat((l === fl) ? array[l] : array[fl] + (l - fl) * (array[fl + 1] - array[fl]));
    };

    exports.PERCENTRANK = {};

    exports.PERCENTRANK.EXC = function(array, x, significance) {
        significance = (significance === undefined) ? 3 : significance;
        array = utils.parseNumberArray(utils.flatten(array));
        x = utils.parseNumber(x);
        significance = utils.parseNumber(significance);
        if (utils.anyIsError(array, x, significance)) {
            return error.value;
        }
        array = array.sort(function(a, b) {
            return a - b;
        });
        var uniques = UNIQUE.apply(null, array);
        var n = array.length;
        var m = uniques.length;
        var power = Math.pow(10, significance);
        var result = 0;
        var match = false;
        var i = 0;
        while (!match && i < m) {
            if (x === uniques[i]) {
                result = (array.indexOf(uniques[i]) + 1) / (n + 1);
                match = true;
            } else if (x >= uniques[i] && (x < uniques[i + 1] || i === m - 1)) {
                result = (array.indexOf(uniques[i]) + 1 + (x - uniques[i]) / (uniques[i + 1] - uniques[i])) / (n + 1);
                match = true;
            }
            i++;
        }
        return Math.floor(result * power) / power;
    };

    exports.PERCENTRANK.INC = function(array, x, significance) {
        significance = (significance === undefined) ? 3 : significance;
        array = utils.parseNumberArray(utils.flatten(array));
        x = utils.parseNumber(x);
        significance = utils.parseNumber(significance);
        if (utils.anyIsError(array, x, significance)) {
            return error.value;
        }
        array = array.sort(function(a, b) {
            return a - b;
        });
        var uniques = UNIQUE.apply(null, array);
        var n = array.length;
        var m = uniques.length;
        var power = Math.pow(10, significance);
        var result = 0;
        var match = false;
        var i = 0;
        while (!match && i < m) {
            if (x === uniques[i]) {
                result = array.indexOf(uniques[i]) / (n - 1);
                match = true;
            } else if (x >= uniques[i] && (x < uniques[i + 1] || i === m - 1)) {
                result = (array.indexOf(uniques[i]) + (x - uniques[i]) / (uniques[i + 1] - uniques[i])) / (n - 1);
                match = true;
            }
            i++;
        }
        return Math.floor(result * power) / power;
    };

    exports.PERMUT = function(number, number_chosen) {
        number = utils.parseNumber(number);
        number_chosen = utils.parseNumber(number_chosen);
        if (utils.anyIsError(number, number_chosen)) {
            return error.value;
        }
        return FACT(number) / FACT(number - number_chosen);
    };

    exports.PERMUTATIONA = function(number, number_chosen) {
        number = utils.parseNumber(number);
        number_chosen = utils.parseNumber(number_chosen);
        if (utils.anyIsError(number, number_chosen)) {
            return error.value;
        }
        return Math.pow(number, number_chosen);
    };

    exports.PHI = function(x) {
        x = utils.parseNumber(x);
        if (x instanceof Error) {
            return error.value;
        }
        return Math.exp(-0.5 * x * x) / SQRT2PI;
    };

    exports.PROB = function(range, probability, lower, upper) {
        if (lower === undefined) {
            return 0;
        }
        upper = (upper === undefined) ? lower : upper;

        range = utils.parseNumberArray(utils.flatten(range));
        probability = utils.parseNumberArray(utils.flatten(probability));
        lower = utils.parseNumber(lower);
        upper = utils.parseNumber(upper);
        if (utils.anyIsError(range, probability, lower, upper)) {
            return error.value;
        }

        if (lower === upper) {
            return (range.indexOf(lower) >= 0) ? probability[range.indexOf(lower)] : 0;
        }

        var sorted = range.sort(function(a, b) {
            return a - b;
        });
        var n = sorted.length;
        var result = 0;
        for (var i = 0; i < n; i++) {
            if (sorted[i] >= lower && sorted[i] <= upper) {
                result += probability[range.indexOf(sorted[i])];
            }
        }
        return result;
    };

    exports.QUARTILE = {};

    exports.QUARTILE.EXC = function(range, quart) {
        range = utils.parseNumberArray(utils.flatten(range));
        quart = utils.parseNumber(quart);
        if (utils.anyIsError(range, quart)) {
            return error.value;
        }
        switch (quart) {
            case 1:
                return exports.PERCENTILE.EXC(range, 0.25);
            case 2:
                return exports.PERCENTILE.EXC(range, 0.5);
            case 3:
                return exports.PERCENTILE.EXC(range, 0.75);
            default:
                return error.num;
        }
    };

    exports.QUARTILE.INC = function(range, quart) {
        range = utils.parseNumberArray(utils.flatten(range));
        quart = utils.parseNumber(quart);
        if (utils.anyIsError(range, quart)) {
            return error.value;
        }
        switch (quart) {
            case 1:
                return exports.PERCENTILE.INC(range, 0.25);
            case 2:
                return exports.PERCENTILE.INC(range, 0.5);
            case 3:
                return exports.PERCENTILE.INC(range, 0.75);
            default:
                return error.num;
        }
    };

    exports.RANK = {};

    exports.RANK.AVG = function(number, range, order) {
        number = utils.parseNumber(number);
        range = utils.parseNumberArray(utils.flatten(range));
        if (utils.anyIsError(number, range)) {
            return error.value;
        }
        range = utils.flatten(range);
        order = order || false;
        var sort = (order) ? function(a, b) {
            return a - b;
        } : function(a, b) {
            return b - a;
        };
        range = range.sort(sort);

        var length = range.length;
        var count = 0;
        for (var i = 0; i < length; i++) {
            if (range[i] === number) {
                count++;
            }
        }

        return (count > 1) ? (2 * range.indexOf(number) + count + 1) / 2 : range.indexOf(number) + 1;
    };

    exports.RANK.EQ = function(number, range, order) {
        number = utils.parseNumber(number);
        range = utils.parseNumberArray(utils.flatten(range));
        if (utils.anyIsError(number, range)) {
            return error.value;
        }
        order = order || false;
        var sort = (order) ? function(a, b) {
            return a - b;
        } : function(a, b) {
            return b - a;
        };
        range = range.sort(sort);
        return range.indexOf(number) + 1;
    };

    exports.RSQ = function(data_x, data_y) { // no need to flatten here, PEARSON will take care of that
        data_x = utils.parseNumberArray(utils.flatten(data_x));
        data_y = utils.parseNumberArray(utils.flatten(data_y));
        if (utils.anyIsError(data_x, data_y)) {
            return error.value;
        }
        return Math.pow(exports.PEARSON(data_x, data_y), 2);
    };

    exports.SMALL = function(range, k) {
        range = utils.parseNumberArray(utils.flatten(range));
        k = utils.parseNumber(k);
        if (utils.anyIsError(range, k)) {
            return range;
        }
        return range.sort(function(a, b) {
            return a - b;
        })[k - 1];
    };

    exports.STANDARDIZE = function(x, mean, sd) {
        x = utils.parseNumber(x);
        mean = utils.parseNumber(mean);
        sd = utils.parseNumber(sd);
        if (utils.anyIsError(x, mean, sd)) {
            return error.value;
        }
        return (x - mean) / sd;
    };

    exports.STDEV = {};

    exports.STDEV.P = function() {
        var v = exports.VAR.P.apply(this, arguments);
        return Math.sqrt(v);
    };

    exports.STDEV.S = function() {
        var v = exports.VAR.S.apply(this, arguments);
        return Math.sqrt(v);
    };

    exports.STDEVA = function() {
        var v = exports.VARA.apply(this, arguments);
        return Math.sqrt(v);
    };

    exports.STDEVPA = function() {
        var v = exports.VARPA.apply(this, arguments);
        return Math.sqrt(v);
    };

    exports.VAR = {};

    exports.VAR.P = function() {
        var range = utils.numbers(utils.flatten(arguments));
        var n = range.length;
        var sigma = 0;
        var mean = exports.AVERAGE(range);
        for (var i = 0; i < n; i++) {
            sigma += Math.pow(range[i] - mean, 2);
        }
        return sigma / n;
    };

    exports.VAR.S = function() {
        var range = utils.numbers(utils.flatten(arguments));
        var n = range.length;
        var sigma = 0;
        var mean = exports.AVERAGE(range);
        for (var i = 0; i < n; i++) {
            sigma += Math.pow(range[i] - mean, 2);
        }
        return sigma / (n - 1);
    };

    exports.VARA = function() {
        var range = utils.flatten(arguments);
        var n = range.length;
        var sigma = 0;
        var count = 0;
        var mean = exports.AVERAGEA(range);
        for (var i = 0; i < n; i++) {
            var el = range[i];
            if (typeof el === 'number') {
                sigma += Math.pow(el - mean, 2);
            } else if (el === true) {
                sigma += Math.pow(1 - mean, 2);
            } else {
                sigma += Math.pow(0 - mean, 2);
            }

            if (el !== null) {
                count++;
            }
        }
        return sigma / (count - 1);
    };

    exports.VARPA = function() {
        var range = utils.flatten(arguments);
        var n = range.length;
        var sigma = 0;
        var count = 0;
        var mean = exports.AVERAGEA(range);
        for (var i = 0; i < n; i++) {
            var el = range[i];
            if (typeof el === 'number') {
                sigma += Math.pow(el - mean, 2);
            } else if (el === true) {
                sigma += Math.pow(1 - mean, 2);
            } else {
                sigma += Math.pow(0 - mean, 2);
            }

            if (el !== null) {
                count++;
            }
        }
        return sigma / count;
    };

    exports.WEIBULL = {};

    exports.WEIBULL.DIST = function(x, alpha, beta, cumulative) {
        x = utils.parseNumber(x);
        alpha = utils.parseNumber(alpha);
        beta = utils.parseNumber(beta);
        if (utils.anyIsError(x, alpha, beta)) {
            return error.value;
        }
        return (cumulative) ? 1 - Math.exp(-Math.pow(x / beta, alpha)) : Math.pow(x, alpha - 1) * Math.exp(-Math.pow(x / beta, alpha)) * alpha / Math.pow(beta, alpha);
    };

    exports.Z = {};

    exports.Z.TEST = function(range, x, sd) {
        range = utils.parseNumberArray(utils.flatten(range));
        x = utils.parseNumber(x);
        if (utils.anyIsError(range, x)) {
            return error.value;
        }

        sd = sd || exports.STDEV.S(range);
        var n = range.length;
        return 1 - exports.NORM.S.DIST((exports.AVERAGE(range) - x) / (sd / Math.sqrt(n)), true);
    };

    return exports;
})();

for (var i = 0; i < Object.keys(jexcel.methods).length; i++) {
    var methods = jexcel.methods[Object.keys(jexcel.methods)[i]];
    for (var j = 0; j < Object.keys(methods).length; j++) {
        if (typeof(methods[Object.keys(methods)[j]]) == 'function') {
            window[Object.keys(methods)[j]] = methods[Object.keys(methods)[j]];
        } else {
            window[Object.keys(methods)[j]] = function() {
                return Object.keys(methods)[j] + 'Not implemented';
            }
        }
    }
}
