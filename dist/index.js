(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.jspreadsheet = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
/**
 * (c) jSuites Javascript Web Components
 *
 * Website: https://jsuites.net
 * Description: Create amazing web based applications.
 *
 * MIT License
 *
 */
;(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    global.jSuites = factory();
}(this, (function () {

    'use strict';

var jSuites = function(options) {
    var obj = {}
    var version = '4.9.24';

    var find = function(DOMElement, component) {
        if (DOMElement[component.type] && DOMElement[component.type] == component) {
            return true;
        }
        if (DOMElement.parentNode) {
            return find(DOMElement.parentNode, component);
        }
        return false;
    }

    var isOpened = function(element) {
        if (jSuites.current.length > 0) {
            for (var i = 0; i < jSuites.current.length; i++) {
                if (jSuites.current[i] && ! find(element, jSuites.current[i])) {
                    jSuites.current[i].close();
                }
            }
        }
    }

    obj.init = function() {
        var element = null;

        document.addEventListener("mousedown", function(e) {
            if (e.changedTouches && e.changedTouches[0]) {
                var x = e.changedTouches[0].clientX;
                var y = e.changedTouches[0].clientY;
            } else {
                var x = e.clientX;
                var y = e.clientY;
            }

            if (e.target && e.target.shadowRoot) {
                var d = e.target.shadowRoot;
            } else {
                var d = document;
            }

            // Get the first target element
            element = d.elementFromPoint(x, y);
        });

        document.addEventListener("click", function(e) {
            // Check opened components
            isOpened(element);
        });

        obj.version = version;
    }

    obj.setExtensions = function(o) {
        if (typeof(o) == 'object') {
            var k = Object.keys(o);
            for (var i = 0; i < k.length; i++) {
                obj[k[i]] = o[k[i]];
            }
        }
    }

    obj.tracking = function(component, state) {
        if (state == true) {
            jSuites.current = jSuites.current.filter(function(v) {
                return v !== null;
            });

            // Start after all events
            setTimeout(function() {
                jSuites.current.push(component);
            }, 0);

        } else {
            var index = jSuites.current.indexOf(component);
            if (index >= 0) {
                jSuites.current[index] = null;
            }
        }
    }

    /**
     * Get or set a property from a JSON from a string.
     */
    obj.path = function(str, val) {
        str = str.split('.');
        if (str.length) {
            var o = this;
            var p = null;
            while (str.length > 1) {
                // Get the property
                p = str.shift();
                // Check if the property exists
                if (o.hasOwnProperty(p)) {
                    o = o[p];
                } else {
                    // Property does not exists
                    if (val === undefined) {
                        return undefined;
                    } else {
                        // Create the property
                        o[p] = {};
                        // Next property
                        o = o[p];
                    }
                }
            }
            // Get the property
            p = str.shift();
            // Set or get the value
            if (val !== undefined) {
                o[p] = val;
                // Success
                return true;
            } else {
                // Return the value
                if (o) {
                    return o[p];
                }
            }
        }
        // Something went wrong
        return false;
    }

    // Update dictionary
    obj.setDictionary = function(d) {
        var k = Object.keys(obj.dictionary);
        if (k.length == 0) {
            obj.dictionary = d;
        } else {
            // Replace the key into the dictionary and append the new ones
            var k = Object.keys(d);
            for (var i = 0; i < k.length; i++) {
                obj.dictionary[k[i]] = d[k[i]];
            }
        }

        // Translations
        var t = null;
        for (var i = 0; i < jSuites.calendar.weekdays.length; i++) {
            t =  jSuites.translate(jSuites.calendar.weekdays[i]);
            if (jSuites.calendar.weekdays[i]) {
                jSuites.calendar.weekdays[i] = t;
                jSuites.calendar.weekdaysShort[i] = t.substr(0,3);
            }
        }
        for (var i = 0; i < jSuites.calendar.months.length; i++) {
            t = jSuites.translate(jSuites.calendar.months[i]);
            if (t) {
                jSuites.calendar.months[i] = t;
                jSuites.calendar.monthsShort[i] = t.substr(0,3);
            }
        }
    }

    // Dictionary
    obj.dictionary = {};

    // Translate
    obj.translate = function(t) {
        return obj.dictionary[t] || t;
    }

    // Array of opened components
    obj.current = [];

    return obj;
}();

/**
 * Global jsuites event
 */
if (typeof(document) !== "undefined") {
    jSuites.init();
}

jSuites.ajax = (function(options, complete) {
    if (Array.isArray(options)) {
        // Create multiple request controller 
        var multiple = {
            instance: [],
            complete: complete,
        }

        if (options.length > 0) {
            for (var i = 0; i < options.length; i++) {
                options[i].multiple = multiple;
                multiple.instance.push(jSuites.ajax(options[i]));
            }
        }

        return multiple;
    }

    if (! options.data) {
        options.data = {};
    }

    if (options.type) {
        options.method = options.type;
    }

    // Default method
    if (! options.method) {
        options.method = 'GET';
    }

    // Default type
    if (! options.dataType) {
        options.dataType = 'json';
    }

    if (options.data) {
        // Parse object to variables format
        var parseData = function (value, key) {
            var vars = [];
            var keys = Object.keys(value);
            if (keys.length) {
                for (var i = 0; i < keys.length; i++) {
                    if (key) {
                        var k = key + '[' + keys[i] + ']';
                    } else {
                        var k = keys[i];
                    }

                    if (value[k] instanceof FileList) {
                        vars[k] = value[keys[i]];
                    } else if (typeof (value[keys[i]]) == 'object') {
                        var r = parseData(value[keys[i]], k);
                        var o = Object.keys(r);
                        for (var j = 0; j < o.length; j++) {
                            vars[o[j]] = r[o[j]];
                        }
                    } else {
                        vars[k] = value[keys[i]];
                    }
                }
            }

            return vars;
        }

        var d = parseData(options.data);
        var k = Object.keys(d);

        // Data form
        var data = new FormData();
        for (var i = 0; i < k.length; i++) {
            if (d[k[i]] instanceof FileList) {
                if (d[k[i]].length) {
                    for (var j = 0; j < d[k[i]].length; j++) {
                        data.append(k[i], d[k[i]][j], d[k[i]][j].name);
                    }
                }
            } else {
                data.append(k[i], d[k[i]]);
            }
        }
    }

    var httpRequest = new XMLHttpRequest();
    httpRequest.open(options.method, options.url, true);
    httpRequest.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

    // Content type
    if (options.contentType) {
        httpRequest.setRequestHeader('Content-Type', options.contentType);
    }

    // Headers
    if (options.method == 'POST') {
        httpRequest.setRequestHeader('Accept', 'application/json');
    } else {
        if (options.dataType == 'blob') {
            httpRequest.responseType = "blob";
        } else {
            if (! options.contentType) {
                if (options.dataType == 'json') {
                    httpRequest.setRequestHeader('Content-Type', 'text/json');
                } else if (options.dataType == 'html') {
                    httpRequest.setRequestHeader('Content-Type', 'text/html');
                }
            }
        }
    }

    // No cache
    if (options.cache != true) {
        httpRequest.setRequestHeader('pragma', 'no-cache');
        httpRequest.setRequestHeader('cache-control', 'no-cache');
    }

    // Authentication
    if (options.withCredentials == true) {
        httpRequest.withCredentials = true
    }

    // Before send
    if (typeof(options.beforeSend) == 'function') {
        options.beforeSend(httpRequest);
    }

    httpRequest.onload = function() {
        if (httpRequest.status === 200) {
            if (options.dataType == 'json') {
                try {
                    var result = JSON.parse(httpRequest.responseText);

                    if (options.success && typeof(options.success) == 'function') {
                        options.success(result);
                    }
                } catch(err) {
                    if (options.error && typeof(options.error) == 'function') {
                        options.error(err, result);
                    }
                }
            } else {
                if (options.dataType == 'blob') {
                    var result = httpRequest.response;
                } else {
                    var result = httpRequest.responseText;
                }

                if (options.success && typeof(options.success) == 'function') {
                    options.success(result);
                }
            }
        } else {
            if (options.error && typeof(options.error) == 'function') {
                options.error(httpRequest.responseText, httpRequest.status);
            }
        }

        // Global queue
        if (jSuites.ajax.queue && jSuites.ajax.queue.length > 0) {
            jSuites.ajax.send(jSuites.ajax.queue.shift());
        }

        // Global complete method
        if (jSuites.ajax.requests && jSuites.ajax.requests.length) {
            // Get index of this request in the container
            var index = jSuites.ajax.requests.indexOf(httpRequest);
            // Remove from the ajax requests container
            jSuites.ajax.requests.splice(index, 1);
            // Deprected: Last one?
            if (! jSuites.ajax.requests.length) {
                // Object event
                if (options.complete && typeof(options.complete) == 'function') {
                    options.complete(result);
                }
            }
            // Group requests
            if (options.group) {
                if (jSuites.ajax.oncomplete && typeof(jSuites.ajax.oncomplete[options.group]) == 'function') {
                    if (! jSuites.ajax.pending(options.group)) {
                        jSuites.ajax.oncomplete[options.group]();
                        jSuites.ajax.oncomplete[options.group] = null;
                    }
                }
            }
            // Multiple requests controller
            if (options.multiple && options.multiple.instance) {
                // Get index of this request in the container
                var index = options.multiple.instance.indexOf(httpRequest);
                // Remove from the ajax requests container
                options.multiple.instance.splice(index, 1);
                // If this is the last one call method complete
                if (! options.multiple.instance.length) {
                    if (options.multiple.complete && typeof(options.multiple.complete) == 'function') {
                        options.multiple.complete(result);
                    }
                }
            }
        }
    }

    // Keep the options
    httpRequest.options = options;
    // Data
    httpRequest.data = data;

    // Queue
    if (options.queue == true && jSuites.ajax.requests.length > 0) {
        jSuites.ajax.queue.push(httpRequest);
    } else {
        jSuites.ajax.send(httpRequest)
    }

    return httpRequest;
});

jSuites.ajax.send = function(httpRequest) {
    if (httpRequest.data) {
        if (Array.isArray(httpRequest.data)) {
            httpRequest.send(httpRequest.data.join('&'));
        } else {
            httpRequest.send(httpRequest.data);
        }
    } else {
        httpRequest.send();
    }

    jSuites.ajax.requests.push(httpRequest);
}

jSuites.ajax.exists = function(url, __callback) {
    var http = new XMLHttpRequest();
    http.open('HEAD', url, false);
    http.send();
    if (http.status) {
        __callback(http.status);
    }
}

jSuites.ajax.pending = function(group) {
    var n = 0;
    var o = jSuites.ajax.requests;
    if (o && o.length) {
        for (var i = 0; i < o.length; i++) {
            if (! group || group == o[i].options.group) {
                n++
            }
        }
    }
    return n;
}

jSuites.ajax.oncomplete = {};
jSuites.ajax.requests = [];
jSuites.ajax.queue = [];

jSuites.alert = function(message) {
    if (jSuites.getWindowWidth() < 800 && jSuites.dialog) {
        jSuites.dialog.open({
            title:'Alert',
            message:message,
        });
    } else {
        alert(message);
    }
}

jSuites.animation = {};

jSuites.animation.slideLeft = function(element, direction, done) {
    if (direction == true) {
        element.classList.add('slide-left-in');
        setTimeout(function() {
            element.classList.remove('slide-left-in');
            if (typeof(done) == 'function') {
                done();
            }
        }, 400);
    } else {
        element.classList.add('slide-left-out');
        setTimeout(function() {
            element.classList.remove('slide-left-out');
            if (typeof(done) == 'function') {
                done();
            }
        }, 400);
    }
}

jSuites.animation.slideRight = function(element, direction, done) {
    if (direction == true) {
        element.classList.add('slide-right-in');
        setTimeout(function() {
            element.classList.remove('slide-right-in');
            if (typeof(done) == 'function') {
                done();
            }
        }, 400);
    } else {
        element.classList.add('slide-right-out');
        setTimeout(function() {
            element.classList.remove('slide-right-out');
            if (typeof(done) == 'function') {
                done();
            }
        }, 400);
    }
}

jSuites.animation.slideTop = function(element, direction, done) {
    if (direction == true) {
        element.classList.add('slide-top-in');
        setTimeout(function() {
            element.classList.remove('slide-top-in');
            if (typeof(done) == 'function') {
                done();
            }
        }, 400);
    } else {
        element.classList.add('slide-top-out');
        setTimeout(function() {
            element.classList.remove('slide-top-out');
            if (typeof(done) == 'function') {
                done();
            }
        }, 400);
    }
}

jSuites.animation.slideBottom = function(element, direction, done) {
    if (direction == true) {
        element.classList.add('slide-bottom-in');
        setTimeout(function() {
            element.classList.remove('slide-bottom-in');
            if (typeof(done) == 'function') {
                done();
            }
        }, 400);
    } else {
        element.classList.add('slide-bottom-out');
        setTimeout(function() {
            element.classList.remove('slide-bottom-out');
            if (typeof(done) == 'function') {
                done();
            }
        }, 100);
    }
}

jSuites.animation.fadeIn = function(element, done) {
    element.style.display = '';
    element.classList.add('fade-in');
    setTimeout(function() {
        element.classList.remove('fade-in');
        if (typeof(done) == 'function') {
            done();
        }
    }, 2000);
}

jSuites.animation.fadeOut = function(element, done) {
    element.classList.add('fade-out');
    setTimeout(function() {
        element.style.display = 'none';
        element.classList.remove('fade-out');
        if (typeof(done) == 'function') {
            done();
        }
    }, 1000);
}

jSuites.calendar = (function(el, options) {
    // Already created, update options
    if (el.calendar) {
        return el.calendar.setOptions(options, true);
    }

    // New instance
    var obj = { type:'calendar' };
    obj.options = {};

    // Date
    obj.date = null;

    /**
     * Update options
     */
    obj.setOptions = function(options, reset) {
        // Default configuration
        var defaults = {
            // Render type: [ default | year-month-picker ]
            type: 'default',
            // Restrictions
            validRange: null,
            // Starting weekday - 0 for sunday, 6 for saturday
            startingDay: null, 
            // Date format
            format: 'DD/MM/YYYY',
            // Allow keyboard date entry
            readonly: true,
            // Today is default
            today: false,
            // Show timepicker
            time: false,
            // Show the reset button
            resetButton: true,
            // Placeholder
            placeholder: '',
            // Translations can be done here
            months: jSuites.calendar.monthsShort,
            monthsFull: jSuites.calendar.months,
            weekdays: jSuites.calendar.weekdays,
            weekdays_short: jSuites.calendar.weekdays,
            textDone: jSuites.translate('Done'),
            textReset: jSuites.translate('Reset'),
            textUpdate: jSuites.translate('Update'),
            // Value
            value: null,
            // Fullscreen (this is automatic set for screensize < 800)
            fullscreen: false,
            // Create the calendar closed as default
            opened: false,
            // Events
            onopen: null,
            onclose: null,
            onchange: null,
            onupdate: null,
            // Internal mode controller
            mode: null,
            position: null,
            // Data type
            dataType: null,
        }

        for (var i = 0; i < defaults.weekdays_short.length; i++) {
            defaults.weekdays_short[i] = defaults.weekdays_short[i].substr(0,1);
        }

        // Loop through our object
        for (var property in defaults) {
            if (options && options.hasOwnProperty(property)) {
                obj.options[property] = options[property];
            } else {
                if (typeof(obj.options[property]) == 'undefined' || reset === true) {
                    obj.options[property] = defaults[property];
                }
            }
        }

        // Reset button
        if (obj.options.resetButton == false) {
            calendarReset.style.display = 'none';
        } else {
            calendarReset.style.display = '';
        }

        // Readonly
        if (obj.options.readonly) {
            el.setAttribute('readonly', 'readonly');
        } else {
            el.removeAttribute('readonly');
        }

        // Placeholder
        if (obj.options.placeholder) {
            el.setAttribute('placeholder', obj.options.placeholder);
        } else {
            el.removeAttribute('placeholder');
        }

        if (jSuites.isNumeric(obj.options.value) && obj.options.value > 0) {
            obj.options.value = jSuites.calendar.numToDate(obj.options.value);
            // Data type numberic
            obj.options.dataType = 'numeric';
        }

        // Texts
        calendarReset.innerHTML = obj.options.textReset;
        calendarConfirm.innerHTML = obj.options.textDone;
        calendarControlsUpdateButton.innerHTML = obj.options.textUpdate;

        // Define mask
        el.setAttribute('data-mask', obj.options.format.toLowerCase());

        // Value
        if (! obj.options.value && obj.options.today) {
            var value = jSuites.calendar.now();
        } else {
            var value = obj.options.value;
        }

        // Set internal date
        if (value) {
            // Force the update
            obj.options.value = null;
            // New value
            obj.setValue(value);
        }

        return obj;
    }

    /**
     * Open the calendar
     */
    obj.open = function (value) {
        if (! calendar.classList.contains('jcalendar-focus')) {
            if (! calendar.classList.contains('jcalendar-inline')) {
                // Current
                jSuites.calendar.current = obj;
                // Start tracking
                jSuites.tracking(obj, true);
                // Create the days
                obj.getDays();
                // Render months
                if (obj.options.type == 'year-month-picker') {
                    obj.getMonths();
                }
                // Get time
                if (obj.options.time) {
                    calendarSelectHour.value = obj.date[3];
                    calendarSelectMin.value = obj.date[4];
                }

                // Show calendar
                calendar.classList.add('jcalendar-focus');

                // Get the position of the corner helper
                if (jSuites.getWindowWidth() < 800 || obj.options.fullscreen) {
                    calendar.classList.add('jcalendar-fullsize');
                    // Animation
                    jSuites.animation.slideBottom(calendarContent, 1);
                } else {
                    calendar.classList.remove('jcalendar-fullsize');

                    var rect = el.getBoundingClientRect();
                    var rectContent = calendarContent.getBoundingClientRect();

                    if (obj.options.position) {
                        calendarContainer.style.position = 'fixed';
                        if (window.innerHeight < rect.bottom + rectContent.height) {
                            calendarContainer.style.top = (rect.top - (rectContent.height + 2)) + 'px';
                        } else {
                            calendarContainer.style.top = (rect.top + rect.height + 2) + 'px';
                        }
                        calendarContainer.style.left = rect.left + 'px';
                    } else {
                        if (window.innerHeight < rect.bottom + rectContent.height) {
                            var d = -1 * (rect.height + rectContent.height + 2);
                            if (d + rect.top < 0) {
                                d = -1 * (rect.top + rect.height);
                            }
                            calendarContainer.style.top = d + 'px';
                        } else {
                            calendarContainer.style.top = 2 + 'px'; 
                        }

                        if (window.innerWidth < rect.left + rectContent.width) {
                            var d = window.innerWidth - (rect.left + rectContent.width + 20);
                            calendarContainer.style.left = d + 'px';
                        } else {
                            calendarContainer.style.left = '0px'; 
                        }
                    }
                }

                // Events
                if (typeof(obj.options.onopen) == 'function') {
                    obj.options.onopen(el);
                }
            }
        }
    }

    obj.close = function (ignoreEvents, update) {
        if (calendar.classList.contains('jcalendar-focus')) {
            if (update !== false) {
                var element = calendar.querySelector('.jcalendar-selected');

                if (typeof(update) == 'string') {
                    var value = update;
                } else if (! element || element.classList.contains('jcalendar-disabled')) {
                    var value = obj.options.value
                } else {
                    var value = obj.getValue();
                }

                obj.setValue(value);
            }

            // Events
            if (! ignoreEvents && typeof(obj.options.onclose) == 'function') {
                obj.options.onclose(el);
            }
            // Hide
            calendar.classList.remove('jcalendar-focus');
            // Stop tracking
            jSuites.tracking(obj, false);
            // Current
            jSuites.calendar.current = null;
        }

        return obj.options.value;
    }

    obj.prev = function() {
        // Check if the visualization is the days picker or years picker
        if (obj.options.mode == 'years') {
            obj.date[0] = obj.date[0] - 12;

            // Update picker table of days
            obj.getYears();
        } else if (obj.options.mode == 'months') {
            obj.date[0] = parseInt(obj.date[0]) - 1;
            // Update picker table of months
            obj.getMonths();
        } else {
            // Go to the previous month
            if (obj.date[1] < 2) {
                obj.date[0] = obj.date[0] - 1;
                obj.date[1] = 12;
            } else {
                obj.date[1] = obj.date[1] - 1;
            }

            // Update picker table of days
            obj.getDays();
        }
    }

    obj.next = function() {
        // Check if the visualization is the days picker or years picker
        if (obj.options.mode == 'years') {
            obj.date[0] = parseInt(obj.date[0]) + 12;

            // Update picker table of days
            obj.getYears();
        } else if (obj.options.mode == 'months') {
            obj.date[0] = parseInt(obj.date[0]) + 1;
            // Update picker table of months
            obj.getMonths();
        } else {
            // Go to the previous month
            if (obj.date[1] > 11) {
                obj.date[0] = parseInt(obj.date[0]) + 1;
                obj.date[1] = 1;
            } else {
                obj.date[1] = parseInt(obj.date[1]) + 1;
            }

            // Update picker table of days
            obj.getDays();
        }
    }

    /**
     * Set today
     */
    obj.setToday = function() {
        // Today
        var value = new Date().toISOString().substr(0, 10);
        // Change value
        obj.setValue(value);
        // Value
        return value;
    }

    obj.setValue = function(val) {
        if (! val) {
            val = '' + val;
        }
        // Values
        var newValue = val;
        var oldValue = obj.options.value;

        if (oldValue != newValue) {
            // Set label
            if (! newValue) {
                obj.date = null;
                var val = '';
            } else {
                var value = obj.setLabel(newValue, obj.options);
                var date = newValue.split(' ');
                if (! date[1]) {
                    date[1] = '00:00:00';
                }
                var time = date[1].split(':')
                var date = date[0].split('-');
                var y = parseInt(date[0]);
                var m = parseInt(date[1]);
                var d = parseInt(date[2]);
                var h = parseInt(time[0]);
                var i = parseInt(time[1]);
                obj.date = [ y, m, d, h, i, 0 ];
                var val = obj.setLabel(newValue, obj.options);
            }

            // New value
            obj.options.value = newValue;

            if (typeof(obj.options.onchange) ==  'function') {
                obj.options.onchange(el, newValue, oldValue);
            }

            // Lemonade JS
            if (el.value != val) {
                el.value = val;
                if (typeof(el.onchange) == 'function') {
                    el.onchange({
                        type: 'change',
                        target: el,
                        value: el.value
                    });
                }
            }
        }

        obj.getDays();
    }

    obj.getValue = function() {
        if (obj.date) {
            if (obj.options.time) {
                return jSuites.two(obj.date[0]) + '-' + jSuites.two(obj.date[1]) + '-' + jSuites.two(obj.date[2]) + ' ' + jSuites.two(obj.date[3]) + ':' + jSuites.two(obj.date[4]) + ':' + jSuites.two(0);
            } else {
                return jSuites.two(obj.date[0]) + '-' + jSuites.two(obj.date[1]) + '-' + jSuites.two(obj.date[2]) + ' ' + jSuites.two(0) + ':' + jSuites.two(0) + ':' + jSuites.two(0);
            }
        } else {
            return "";
        }
    }

    /**
     *  Calendar
     */
    obj.update = function(element, v) {
        if (element.classList.contains('jcalendar-disabled')) {
            // Do nothing
        } else {
            var elements = calendar.querySelector('.jcalendar-selected');
            if (elements) {
                elements.classList.remove('jcalendar-selected');
            }
            element.classList.add('jcalendar-selected');

            if (element.classList.contains('jcalendar-set-month')) {
                obj.date[1] = v;
            } else {
                obj.date[2] = element.innerText;
            }

            if (! obj.options.time) {
                obj.close();
            } else {
                obj.date[3] = calendarSelectHour.value;
                obj.date[4] = calendarSelectMin.value;
            }
        }

        // Update
        updateActions();
    }

    /**
     * Set to blank
     */
    obj.reset = function() {
        // Close calendar
        obj.setValue('');
        obj.date = null;
        obj.close(false, false);
    }

    /**
     * Get calendar days
     */
    obj.getDays = function() {
        // Mode
        obj.options.mode = 'days';

        // Setting current values in case of NULLs
        var date = new Date();

        // Current selection
        var year = obj.date && jSuites.isNumeric(obj.date[0]) ? obj.date[0] : parseInt(date.getFullYear());
        var month = obj.date && jSuites.isNumeric(obj.date[1]) ? obj.date[1] : parseInt(date.getMonth()) + 1;
        var day = obj.date && jSuites.isNumeric(obj.date[2]) ? obj.date[2] : parseInt(date.getDate());
        var hour = obj.date && jSuites.isNumeric(obj.date[3]) ? obj.date[3] : parseInt(date.getHours());
        var min = obj.date && jSuites.isNumeric(obj.date[4]) ? obj.date[4] : parseInt(date.getMinutes());

        // Selection container
        obj.date = [ year, month, day, hour, min, 0 ];

        // Update title
        calendarLabelYear.innerHTML = year;
        calendarLabelMonth.innerHTML = obj.options.months[month - 1];

        // Current month and Year
        var isCurrentMonthAndYear = (date.getMonth() == month - 1) && (date.getFullYear() == year) ? true : false;
        var currentDay = date.getDate();

        // Number of days in the month
        var date = new Date(year, month, 0, 0, 0);
        var numberOfDays = date.getDate();

        // First day
        var date = new Date(year, month-1, 0, 0, 0);
        var firstDay = date.getDay() + 1;

        // Index value
        var index = obj.options.startingDay || 0;

        // First of day relative to the starting calendar weekday
        firstDay = firstDay - index;

        // Reset table
        calendarBody.innerHTML = '';

        // Weekdays Row
        var row = document.createElement('tr');
        row.setAttribute('align', 'center');
        calendarBody.appendChild(row);

        // Create weekdays row
        for (var i = 0; i < 7; i++) {
            var cell = document.createElement('td');
            cell.classList.add('jcalendar-weekday')
            cell.innerHTML = obj.options.weekdays_short[index];
            row.appendChild(cell);
            // Next week day
            index++;
            // Restart index
            if (index > 6) {
                index = 0;
            }
        }

        // Index of days
        var index = 0;
        var d = 0;
 
        // Calendar table
        for (var j = 0; j < 6; j++) {
            // Reset cells container
            var row = document.createElement('tr');
            row.setAttribute('align', 'center');
            // Data control
            var emptyRow = true;
            // Create cells
            for (var i = 0; i < 7; i++) {
                // Create cell
                var cell = document.createElement('td');
                cell.classList.add('jcalendar-set-day');

                if (index >= firstDay && index < (firstDay + numberOfDays)) {
                    // Day cell
                    d++;
                    cell.innerHTML = d;

                    // Selected
                    if (d == day) {
                        cell.classList.add('jcalendar-selected');
                    }

                    // Current selection day is today
                    if (isCurrentMonthAndYear && currentDay == d) {
                        cell.style.fontWeight = 'bold';
                    }

                    // Current selection day
                    var current = jSuites.calendar.now(new Date(year, month-1, d), true);

                    // Available ranges
                    if (obj.options.validRange) {
                        if (! obj.options.validRange[0] || current >= obj.options.validRange[0]) {
                            var test1 = true;
                        } else {
                            var test1 = false;
                        }

                        if (! obj.options.validRange[1] || current <= obj.options.validRange[1]) {
                            var test2 = true;
                        } else {
                            var test2 = false;
                        }

                        if (! (test1 && test2)) {
                            cell.classList.add('jcalendar-disabled');
                        }
                    }

                    // Control
                    emptyRow = false;
                }
                // Day cell
                row.appendChild(cell);
                // Index
                index++;
            }

            // Add cell to the calendar body
            if (emptyRow == false) {
                calendarBody.appendChild(row);
            }
        }

        // Show time controls
        if (obj.options.time) {
            calendarControlsTime.style.display = '';
        } else {
            calendarControlsTime.style.display = 'none';
        }

        // Update
        updateActions();
    }

    obj.getMonths = function() {
        // Mode
        obj.options.mode = 'months';

        // Loading month labels
        var months = obj.options.months;

        // Value
        var value = obj.options.value; 

        // Current date
        var date = new Date();
        var currentYear = parseInt(date.getFullYear());
        var currentMonth = parseInt(date.getMonth()) + 1;
        var selectedYear = obj.date && jSuites.isNumeric(obj.date[0]) ? obj.date[0] : currentYear;
        var selectedMonth = obj.date && jSuites.isNumeric(obj.date[1]) ? obj.date[1] : currentMonth;

        // Update title
        calendarLabelYear.innerHTML = obj.date[0];
        calendarLabelMonth.innerHTML = months[selectedMonth-1];

        // Table
        var table = document.createElement('table');
        table.setAttribute('width', '100%');

        // Row
        var row = null;

        // Calendar table
        for (var i = 0; i < 12; i++) {
            if (! (i % 4)) {
                // Reset cells container
                var row = document.createElement('tr');
                row.setAttribute('align', 'center');
                table.appendChild(row);
            }

            // Create cell
            var cell = document.createElement('td');
            cell.classList.add('jcalendar-set-month');
            cell.setAttribute('data-value', i+1);
            cell.innerText = months[i];

            if (obj.options.validRange) {
                var current = selectedYear + '-' + jSuites.two(i+1);
                if (! obj.options.validRange[0] || current >= obj.options.validRange[0].substr(0,7)) {
                    var test1 = true;
                } else {
                    var test1 = false;
                }

                if (! obj.options.validRange[1] || current <= obj.options.validRange[1].substr(0,7)) {
                    var test2 = true;
                } else {
                    var test2 = false;
                }

                if (! (test1 && test2)) {
                    cell.classList.add('jcalendar-disabled');
                }
            }

            if (i+1 == selectedMonth) {
                cell.classList.add('jcalendar-selected');
            }

            if (currentYear == selectedYear && i+1 == currentMonth) {
                cell.style.fontWeight = 'bold';
            }

            row.appendChild(cell);
        }

        calendarBody.innerHTML = '<tr><td colspan="7"></td></tr>';
        calendarBody.children[0].children[0].appendChild(table);

        // Update
        updateActions();
    }

    obj.getYears = function() { 
        // Mode
        obj.options.mode = 'years';

        // Current date
        var date = new Date();
        var currentYear = date.getFullYear();
        var selectedYear = obj.date && jSuites.isNumeric(obj.date[0]) ? obj.date[0] : parseInt(date.getFullYear());

        // Array of years
        var y = [];
        for (var i = 0; i < 25; i++) {
            y[i] = parseInt(obj.date[0]) + (i - 12);
        }

        // Assembling the year tables
        var table = document.createElement('table');
        table.setAttribute('width', '100%');

        for (var i = 0; i < 25; i++) {
            if (! (i % 5)) {
                // Reset cells container
                var row = document.createElement('tr');
                row.setAttribute('align', 'center');
                table.appendChild(row);
            }

            // Create cell
            var cell = document.createElement('td');
            cell.classList.add('jcalendar-set-year');
            cell.innerText = y[i];

            if (selectedYear == y[i]) {
                cell.classList.add('jcalendar-selected');
            }

            if (currentYear == y[i]) {
                cell.style.fontWeight = 'bold';
            }

            row.appendChild(cell);
        }

        calendarBody.innerHTML = '<tr><td colspan="7"></td></tr>';
        calendarBody.firstChild.firstChild.appendChild(table);

        // Update
        updateActions();
    }

    obj.setLabel = function(value, mixed) {
        return jSuites.calendar.getDateString(value, mixed);
    }

    obj.fromFormatted = function (value, format) {
        return jSuites.calendar.extractDateFromString(value, format);
    }

    var mouseUpControls = function(e) {
        var element = jSuites.findElement(e.target, 'jcalendar-container');
        if (element) {
            var action = e.target.className;

            // Object id
            if (action == 'jcalendar-prev') {
                obj.prev();
            } else if (action == 'jcalendar-next') {
                obj.next();
            } else if (action == 'jcalendar-month') {
                obj.getMonths();
            } else if (action == 'jcalendar-year') {
                obj.getYears();
            } else if (action == 'jcalendar-set-year') {
                obj.date[0] = e.target.innerText;
                if (obj.options.type == 'year-month-picker') {
                    obj.getMonths();
                } else {
                    obj.getDays();
                }
            } else if (e.target.classList.contains('jcalendar-set-month')) {
                var month = parseInt(e.target.getAttribute('data-value'));
                if (obj.options.type == 'year-month-picker') {
                    obj.update(e.target, month);
                } else {
                    obj.date[1] = month;
                    obj.getDays();
                }
            } else if (action == 'jcalendar-confirm' || action == 'jcalendar-update' || action == 'jcalendar-close') {
                obj.close();
            } else if (action == 'jcalendar-backdrop') {
                obj.close(false, false);
            } else if (action == 'jcalendar-reset') {
                obj.reset();
            } else if (e.target.classList.contains('jcalendar-set-day') && e.target.innerText) {
                obj.update(e.target);
            }
        } else {
            obj.close();
        }
    }

    var keyUpControls = function(e) {
        if (e.target.value && e.target.value.length > 3) {
            var test = jSuites.calendar.extractDateFromString(e.target.value, obj.options.format);
            if (test) {
                obj.setValue(test);
            }
        }
    }

    // Update actions button
    var updateActions = function() {
        var currentDay = calendar.querySelector('.jcalendar-selected');

        if (currentDay && currentDay.classList.contains('jcalendar-disabled')) {
            calendarControlsUpdateButton.setAttribute('disabled', 'disabled');
            calendarSelectHour.setAttribute('disabled', 'disabled');
            calendarSelectMin.setAttribute('disabled', 'disabled');
        } else {
            calendarControlsUpdateButton.removeAttribute('disabled');
            calendarSelectHour.removeAttribute('disabled');
            calendarSelectMin.removeAttribute('disabled');
        }

        // Event
        if (typeof(obj.options.onupdate) == 'function') {
            obj.options.onupdate(el, obj.getValue());
        }
    }

    var calendar = null;
    var calendarReset = null;
    var calendarConfirm = null;
    var calendarContainer = null;
    var calendarContent = null;
    var calendarLabelYear = null;
    var calendarLabelMonth = null;
    var calendarTable = null;
    var calendarBody = null;

    var calendarControls = null;
    var calendarControlsTime = null;
    var calendarControlsUpdate = null;
    var calendarControlsUpdateButton = null;
    var calendarSelectHour = null;
    var calendarSelectMin = null;

    var init = function() {
        // Get value from initial element if that is an input
        if (el.tagName == 'INPUT' && el.value) {
            options.value = el.value;
        }

        // Calendar DOM elements
        calendarReset = document.createElement('div');
        calendarReset.className = 'jcalendar-reset';

        calendarConfirm = document.createElement('div');
        calendarConfirm.className = 'jcalendar-confirm';

        calendarControls = document.createElement('div');
        calendarControls.className = 'jcalendar-controls'
        calendarControls.style.borderBottom = '1px solid #ddd';
        calendarControls.appendChild(calendarReset);
        calendarControls.appendChild(calendarConfirm);

        calendarContainer = document.createElement('div');
        calendarContainer.className = 'jcalendar-container';

        calendarContent = document.createElement('div');
        calendarContent.className = 'jcalendar-content';
        calendarContainer.appendChild(calendarContent);

        // Main element
        if (el.tagName == 'DIV') {
            calendar = el;
            calendar.classList.add('jcalendar-inline');
        } else {
            // Add controls to the screen
            calendarContent.appendChild(calendarControls);

            calendar = document.createElement('div');
            calendar.className = 'jcalendar';
        }
        calendar.classList.add('jcalendar-container');
        calendar.appendChild(calendarContainer);

        // Table container
        var calendarTableContainer = document.createElement('div');
        calendarTableContainer.className = 'jcalendar-table';
        calendarContent.appendChild(calendarTableContainer);

        // Previous button
        var calendarHeaderPrev = document.createElement('td');
        calendarHeaderPrev.setAttribute('colspan', '2');
        calendarHeaderPrev.className = 'jcalendar-prev';

        // Header with year and month
        calendarLabelYear = document.createElement('span');
        calendarLabelYear.className = 'jcalendar-year';
        calendarLabelMonth = document.createElement('span');
        calendarLabelMonth.className = 'jcalendar-month';

        var calendarHeaderTitle = document.createElement('td');
        calendarHeaderTitle.className = 'jcalendar-header';
        calendarHeaderTitle.setAttribute('colspan', '3');
        calendarHeaderTitle.appendChild(calendarLabelMonth);
        calendarHeaderTitle.appendChild(calendarLabelYear);

        var calendarHeaderNext = document.createElement('td');
        calendarHeaderNext.setAttribute('colspan', '2');
        calendarHeaderNext.className = 'jcalendar-next';

        var calendarHeader = document.createElement('thead');
        var calendarHeaderRow = document.createElement('tr');
        calendarHeaderRow.appendChild(calendarHeaderPrev);
        calendarHeaderRow.appendChild(calendarHeaderTitle);
        calendarHeaderRow.appendChild(calendarHeaderNext);
        calendarHeader.appendChild(calendarHeaderRow);

        calendarTable = document.createElement('table');
        calendarBody = document.createElement('tbody');
        calendarTable.setAttribute('cellpadding', '0');
        calendarTable.setAttribute('cellspacing', '0');
        calendarTable.appendChild(calendarHeader);
        calendarTable.appendChild(calendarBody);
        calendarTableContainer.appendChild(calendarTable);

        calendarSelectHour = document.createElement('select');
        calendarSelectHour.className = 'jcalendar-select';
        calendarSelectHour.onchange = function() {
            obj.date[3] = this.value; 

            // Event
            if (typeof(obj.options.onupdate) == 'function') {
                obj.options.onupdate(el, obj.getValue());
            }
        }

        for (var i = 0; i < 24; i++) {
            var element = document.createElement('option');
            element.value = i;
            element.innerHTML = jSuites.two(i);
            calendarSelectHour.appendChild(element);
        }

        calendarSelectMin = document.createElement('select');
        calendarSelectMin.className = 'jcalendar-select';
        calendarSelectMin.onchange = function() {
            obj.date[4] = this.value;

            // Event
            if (typeof(obj.options.onupdate) == 'function') {
                obj.options.onupdate(el, obj.getValue());
            }
        }

        for (var i = 0; i < 60; i++) {
            var element = document.createElement('option');
            element.value = i;
            element.innerHTML = jSuites.two(i);
            calendarSelectMin.appendChild(element);
        }

        // Footer controls
        var calendarControlsFooter = document.createElement('div');
        calendarControlsFooter.className = 'jcalendar-controls';

        calendarControlsTime = document.createElement('div');
        calendarControlsTime.className = 'jcalendar-time';
        calendarControlsTime.style.maxWidth = '140px';
        calendarControlsTime.appendChild(calendarSelectHour);
        calendarControlsTime.appendChild(calendarSelectMin);

        calendarControlsUpdateButton = document.createElement('button');
        calendarControlsUpdateButton.setAttribute('type', 'button');
        calendarControlsUpdateButton.className = 'jcalendar-update';

        calendarControlsUpdate = document.createElement('div');
        calendarControlsUpdate.style.flexGrow = '10';
        calendarControlsUpdate.appendChild(calendarControlsUpdateButton);
        calendarControlsFooter.appendChild(calendarControlsTime);

        // Only show the update button for input elements
        if (el.tagName == 'INPUT') {
            calendarControlsFooter.appendChild(calendarControlsUpdate);
        }

        calendarContent.appendChild(calendarControlsFooter);

        var calendarBackdrop = document.createElement('div');
        calendarBackdrop.className = 'jcalendar-backdrop';
        calendar.appendChild(calendarBackdrop);

        // Handle events
        el.addEventListener("keyup", keyUpControls);

        // Add global events
        calendar.addEventListener("swipeleft", function(e) {
            jSuites.animation.slideLeft(calendarTable, 0, function() {
                obj.next();
                jSuites.animation.slideRight(calendarTable, 1);
            });
            e.preventDefault();
            e.stopPropagation();
        });

        calendar.addEventListener("swiperight", function(e) {
            jSuites.animation.slideRight(calendarTable, 0, function() {
                obj.prev();
                jSuites.animation.slideLeft(calendarTable, 1);
            });
            e.preventDefault();
            e.stopPropagation();
        });

        el.onmouseup = function() {
            obj.open();
        }

        if ('ontouchend' in document.documentElement === true) {
            calendar.addEventListener("touchend", mouseUpControls);
        } else {
            calendar.addEventListener("mouseup", mouseUpControls);
        }

        // Global controls
        if (! jSuites.calendar.hasEvents) {
            // Execute only one time
            jSuites.calendar.hasEvents = true;
            // Enter and Esc
            document.addEventListener("keydown", jSuites.calendar.keydown);
        }

        // Set configuration
        obj.setOptions(options);

        // Append element to the DOM
        if (el.tagName == 'INPUT') {
            el.parentNode.insertBefore(calendar, el.nextSibling);
            // Add properties
            el.setAttribute('autocomplete', 'off');
            // Element
            el.classList.add('jcalendar-input');
            // Value
            el.value = obj.setLabel(obj.getValue(), obj.options);
        } else {
            // Get days
            obj.getDays();
            // Hour
            if (obj.options.time) {
                calendarSelectHour.value = obj.date[3];
                calendarSelectMin.value = obj.date[4];
            }
        }

        // Default opened
        if (obj.options.opened == true) {
            obj.open();
        }

        // Change method
        el.change = obj.setValue;

        // Global generic value handler
        el.val = function(val) {
            if (val === undefined) {
                return obj.getValue();
            } else {
                obj.setValue(val);
            }
        }

        // Keep object available from the node
        el.calendar = calendar.calendar = obj;
    }

    init();

    return obj;
});

jSuites.calendar.keydown = function(e) {
    var calendar = null;
    if (calendar = jSuites.calendar.current) { 
        if (e.which == 13) {
            // ENTER
            calendar.close(false, true);
        } else if (e.which == 27) {
            // ESC
            calendar.close(false, false);
        }
    }
}

jSuites.calendar.prettify = function(d, texts) {
    if (! texts) {
        var texts = {
            justNow: 'Just now',
            xMinutesAgo: '{0}m ago',
            xHoursAgo: '{0}h ago',
            xDaysAgo: '{0}d ago',
            xWeeksAgo: '{0}w ago',
            xMonthsAgo: '{0} mon ago',
            xYearsAgo: '{0}y ago',
        }
    }

    var d1 = new Date();
    var d2 = new Date(d);
    var total = parseInt((d1 - d2) / 1000 / 60);

    String.prototype.format = function(o) {
        return this.replace('{0}', o);
    }

    if (total == 0) {
        var text = texts.justNow;
    } else if (total < 90) {
        var text = texts.xMinutesAgo.format(total);
    } else if (total < 1440) { // One day
        var text = texts.xHoursAgo.format(Math.round(total/60));
    } else if (total < 20160) { // 14 days
        var text = texts.xDaysAgo.format(Math.round(total / 1440));
    } else if (total < 43200) { // 30 days
        var text = texts.xWeeksAgo.format(Math.round(total / 10080));
    } else if (total < 1036800) { // 24 months
        var text = texts.xMonthsAgo.format(Math.round(total / 43200));
    } else { // 24 months+
        var text = texts.xYearsAgo.format(Math.round(total / 525600));
    }

    return text;
}

jSuites.calendar.prettifyAll = function() {
    var elements = document.querySelectorAll('.prettydate');
    for (var i = 0; i < elements.length; i++) {
        if (elements[i].getAttribute('data-date')) {
            elements[i].innerHTML = jSuites.calendar.prettify(elements[i].getAttribute('data-date'));
        } else {
            if (elements[i].innerHTML) {
                elements[i].setAttribute('data-date', elements[i].innerHTML);
                elements[i].innerHTML = jSuites.calendar.prettify(elements[i].innerHTML);
            }
        }
    }
}

jSuites.calendar.now = function(date, dateOnly) {
    if (Array.isArray(date)) {
        var y = date[0];
        var m = date[1];
        var d = date[2];
        var h = date[3];
        var i = date[4];
        var s = date[5];
    } else {
        if (! date) {
            var date = new Date();
        }
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        var d = date.getDate();
        var h = date.getHours();
        var i = date.getMinutes();
        var s = date.getSeconds();
    }

    if (dateOnly == true) {
        return jSuites.two(y) + '-' + jSuites.two(m) + '-' + jSuites.two(d);
    } else {
        return jSuites.two(y) + '-' + jSuites.two(m) + '-' + jSuites.two(d) + ' ' + jSuites.two(h) + ':' + jSuites.two(i) + ':' + jSuites.two(s);
    }
}

jSuites.calendar.toArray = function(value) {
    var date = value.split(((value.indexOf('T') !== -1) ? 'T' : ' '));
    var time = date[1];
    var date = date[0].split('-');
    var y = parseInt(date[0]);
    var m = parseInt(date[1]);
    var d = parseInt(date[2]);

    if (time) {
        var time = time.split(':');
        var h = parseInt(time[0]);
        var i = parseInt(time[1]);
    } else {
        var h = 0;
        var i = 0;
    }
    return [ y, m, d, h, i, 0 ];
}

// Helper to extract date from a string
jSuites.calendar.extractDateFromString = function(date, format) {
    if (date > 0 && Number(date) == date) {
        var d = new Date(Math.round((date - 25569)*86400*1000));
        return d.getFullYear() + "-" + jSuites.two(d.getMonth()) + "-" + jSuites.two(d.getDate()) + ' 00:00:00';
    }

    var o = jSuites.mask(date, { mask: format }, true);
    if (o.date[0] && o.date[1]) {
        if (! o.date[2]) {
            o.date[2] = 1;
        }

        return o.date[0] + '-' + jSuites.two(o.date[1]) + '-' + jSuites.two(o.date[2]) + ' ' + jSuites.two(o.date[3]) + ':' + jSuites.two(o.date[4])+ ':' + jSuites.two(o.date[5]);
    }
    return '';
}

/**
 * Date to number
 */
jSuites.calendar.dateToNum = function(a, b) {
    a = new Date(a);
    if (! b) {
        b = '1899-12-30 ' + a.getHours() + ':' + a.getMinutes() + ':' + a.getSeconds();
    }
    b = new Date(b);
    var v = a.getTime() - b.getTime();
    return Math.round(v / 86400000);
}

/**
 * Number to date
 */
jSuites.calendar.numToDate = function(value) {
    var d = new Date(Math.round((value - 25569)*86400*1000));
    return d.getFullYear() + "-" + jSuites.two(d.getMonth()+1) + "-" + jSuites.two(d.getDate()) + ' 00:00:00';
}

// Helper to convert date into string
jSuites.calendar.getDateString = function(value, options) {
    if (! options) {
        var options = {};
    }

    // Labels
    if (options && typeof(options) == 'object') {
        var format = options.format;
    } else {
        var format = options;
    }

    if (! format) {
        format = 'YYYY-MM-DD';
    }

    // Convert to number of hours
    if (typeof(value) == 'number' && format.indexOf('[h]') >= 0) {
        var result = parseFloat(24 * Number(value));
        if (format.indexOf('mm') >= 0) {
            var h = (''+result).split('.');
            if (h[1]) {
                var d = 60 * parseFloat('0.' + h[1])
                d = parseFloat(d.toFixed(2));
            } else {
                var d = 0;
            }
            result = parseInt(h[0]) + ':' + jSuites.two(d);
        }
        return result;
    }

    // Date instance
    if (value instanceof Date) {
        value = jSuites.calendar.now(value);
    } else if (value && jSuites.isNumeric(value)) {
        value = jSuites.calendar.numToDate(value);
    }

    // Tokens
    var tokens = [ 'DAY', 'WD', 'DDDD', 'DDD', 'DD', 'D', 'Q', 'HH24', 'HH12', 'HH', 'H', 'AM/PM', 'MI', 'SS', 'MS', 'YYYY', 'YYY', 'YY', 'Y', 'MONTH', 'MON', 'MMMMM', 'MMMM', 'MMM', 'MM', 'M', '.' ];

    // Expression to extract all tokens from the string
    var e = new RegExp(tokens.join('|'), 'gi');
    // Extract
    var t = format.match(e);

    // Compatibility with excel
    for (var i = 0; i < t.length; i++) {
        if (t[i].toUpperCase() == 'MM') {
            // Not a month, correct to minutes
            if (t[i-1] && t[i-1].toUpperCase().indexOf('H') >= 0) {
                t[i] = 'mi';
            } else if (t[i-2] && t[i-2].toUpperCase().indexOf('H') >= 0) {
                t[i] = 'mi';
            } else if (t[i+1] && t[i+1].toUpperCase().indexOf('S') >= 0) {
                t[i] = 'mi';
            } else if (t[i+2] && t[i+2].toUpperCase().indexOf('S') >= 0) {
                t[i] = 'mi';
            }
        }
    }

    // Object
    var o = {
        tokens: t
    }

    // Value
    if (value) {
        var d = ''+value;
        var splitStr = (d.indexOf('T') !== -1) ? 'T' : ' ';
        d = d.split(splitStr);
 
        var h = 0;
        var m = 0;
        var s = 0;

        if (d[1]) {
            h = d[1].split(':');
            m = h[1] ? h[1] : 0;
            s = h[2] ? h[2] : 0;
            h = h[0] ? h[0] : 0;
        }

        d = d[0].split('-');

        if (d[0] && d[1] && d[2] && d[0] > 0 && d[1] > 0 && d[1] < 13 && d[2] > 0 && d[2] < 32) {

            // Data
            o.data = [ d[0], d[1], d[2], h, m, s ];

            // Value
            o.value = [];

            // Calendar instance
            var calendar = new Date(o.data[0], o.data[1]-1, o.data[2], o.data[3], o.data[4], o.data[5]);

            // Get method
            var get = function(i) {
                // Token
                var t = this.tokens[i];
                // Case token
                var s = t.toUpperCase();
                var v = null;

                if (s === 'YYYY') {
                    v = this.data[0];
                } else if (s === 'YYY') {
                    v = this.data[0].substring(1,4);
                } else if (s === 'YY') {
                    v = this.data[0].substring(2,4);
                } else if (s === 'Y') {
                    v = this.data[0].substring(3,4);
                } else if (t === 'MON') {
                    v = jSuites.calendar.months[calendar.getMonth()].substr(0,3).toUpperCase();
                } else if (t === 'mon') {
                    v = jSuites.calendar.months[calendar.getMonth()].substr(0,3).toLowerCase();
                } else if (t === 'MONTH') {
                    v = jSuites.calendar.months[calendar.getMonth()].toUpperCase();
                } else if (t === 'month') {
                    v = jSuites.calendar.months[calendar.getMonth()].toLowerCase();
                } else if (s === 'MMMMM') {
                    v = jSuites.calendar.months[calendar.getMonth()].substr(0, 1);
                } else if (s === 'MMMM' || t === 'Month') {
                    v = jSuites.calendar.months[calendar.getMonth()];
                } else if (s === 'MMM' || t == 'Mon') {
                    v = jSuites.calendar.months[calendar.getMonth()].substr(0,3);
                } else if (s === 'MM') {
                    v = jSuites.two(this.data[1]);
                } else if (s === 'M') {
                    v = calendar.getMonth()+1;
                } else if (t === 'DAY') {
                    v = jSuites.calendar.weekdays[calendar.getDay()].toUpperCase();
                } else if (t === 'day') {
                    v = jSuites.calendar.weekdays[calendar.getDay()].toLowerCase();
                } else if (s === 'DDDD' || t == 'Day') {
                    v = jSuites.calendar.weekdays[calendar.getDay()];
                } else if (s === 'DDD') {
                    v = jSuites.calendar.weekdays[calendar.getDay()].substr(0,3);
                } else if (s === 'DD') {
                    v = jSuites.two(this.data[2]);
                } else if (s === 'D') {
                    v = this.data[2];
                } else if (s === 'Q') {
                    v = Math.floor((calendar.getMonth() + 3) / 3);
                } else if (s === 'HH24' || s === 'HH') {
                    v = jSuites.two(this.data[3]);
                } else if (s === 'HH12') {
                    if (this.data[3] > 12) {
                        v = jSuites.two(this.data[3] - 12);
                    } else {
                        v = jSuites.two(this.data[3]);
                    }
                } else if (s === 'H') {
                    v = this.data[3];
                } else if (s === 'MI') {
                    v = jSuites.two(this.data[4]);
                } else if (s === 'SS') {
                    v = jSuites.two(this.data[5]);
                } else if (s === 'MS') {
                    v = calendar.getMilliseconds();
                } else if (s === 'AM/PM') {
                    if (this.data[3] >= 12) {
                        v = 'PM';
                    } else {
                        v = 'AM';
                    }
                } else if (s === 'WD') {
                    v = jSuites.calendar.weekdays[calendar.getDay()];
                }

                if (v === null) {
                    this.value[i] = this.tokens[i];
                } else {
                    this.value[i] = v;
                }
            }

            for (var i = 0; i < o.tokens.length; i++) {
                get.call(o, i);
            }
            // Put pieces together
            value = o.value.join('');
        } else {
            value = '';
        }
    }

    return value;
}

// Jsuites calendar labels
jSuites.calendar.weekdays = [ 'Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday' ];
jSuites.calendar.months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
jSuites.calendar.weekdaysShort = [ 'Sun','Mon','Tue','Wed','Thu','Fri','Sat' ];
jSuites.calendar.monthsShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];


jSuites.color = (function(el, options) {
    // Already created, update options
    if (el.color) {
        return el.color.setOptions(options, true);
    }

    // New instance
    var obj = { type: 'color' };
    obj.options = {};

    var container = null;
    var backdrop = null;
    var content = null;
    var resetButton = null;
    var closeButton = null;
    var tabs = null;
    var jsuitesTabs = null;

    /**
     * Update options
     */
    obj.setOptions = function(options, reset) {
        /**
         * @typedef {Object} defaults
         * @property {(string|Array)} value - Initial value of the compontent
         * @property {string} placeholder - The default instruction text on the element
         * @property {requestCallback} onchange - Method to be execute after any changes on the element
         * @property {requestCallback} onclose - Method to be execute when the element is closed
         * @property {string} doneLabel - Label for button done
         * @property {string} resetLabel - Label for button reset
         * @property {string} resetValue - Value for button reset
         * @property {Bool} showResetButton - Active or note for button reset - default false
         */
        var defaults = {
            placeholder: '',
            value: null,
            onopen: null,
            onclose: null,
            onchange: null,
            closeOnChange: true,
            palette: null,
            position: null,
            doneLabel: 'Done',
            resetLabel: 'Reset',
            fullscreen: false,
            opened: false,
        }

        if (! options) {
            options = {};
        }

        if (options && ! options.palette) {
            // Default pallete
            options.palette = jSuites.palette();
        }

        // Loop through our object
        for (var property in defaults) {
            if (options && options.hasOwnProperty(property)) {
                obj.options[property] = options[property];
            } else {
                if (typeof(obj.options[property]) == 'undefined' || reset === true) {
                    obj.options[property] = defaults[property];
                }
            }
        }

        // Update the text of the controls, if they have already been created
        if (resetButton) {
            resetButton.innerHTML = obj.options.resetLabel;
        }
        if (closeButton) {
            closeButton.innerHTML = obj.options.doneLabel;
        }

        // Update the pallete
        if (obj.options.palette && jsuitesTabs) {
            jsuitesTabs.updateContent(0, table());
        }

        // Value
        if (typeof obj.options.value === 'string') {
            el.value = obj.options.value;
        }

        // Placeholder
        if (obj.options.placeholder) {
            el.setAttribute('placeholder', obj.options.placeholder);
        } else {
            if (el.getAttribute('placeholder')) {
                el.removeAttribute('placeholder');
            }
        }

        return obj;
    }

    /**
     * Open color pallete
     */
    obj.open = function() {
        if (! container.classList.contains('jcolor-focus')) {
            // Start tracking
            jSuites.tracking(obj, true);

            // Show colorpicker
            container.classList.add('jcolor-focus');

            var rectContent = content.getBoundingClientRect();

            if (jSuites.getWindowWidth() < 800 || obj.options.fullscreen == true) {
                content.style.top = '';
                content.classList.add('jcolor-fullscreen');
                jSuites.animation.slideBottom(content, 1);
                backdrop.style.display = 'block';
            } else {
                if (content.classList.contains('jcolor-fullscreen')) {
                    content.classList.remove('jcolor-fullscreen');
                    backdrop.style.display = '';
                }

                var rect = el.getBoundingClientRect();

                if (obj.options.position) {
                    content.style.position = 'fixed';
                    if (window.innerHeight < rect.bottom + rectContent.height) {
                        content.style.top = (rect.top - (rectContent.height + 2)) + 'px';
                    } else {
                        content.style.top = (rect.top + rect.height + 2) + 'px';
                    }
                    content.style.left = rect.left + 'px';
                } else {
                    if (window.innerHeight < rect.bottom + rectContent.height) {
                        content.style.top = -1 * (rectContent.height + rect.height + 2) + 'px';
                    } else {
                        content.style.top = '2px';
                    }
                }
            }

            if (typeof(obj.options.onopen) == 'function') {
                obj.options.onopen(el);
            }

            jsuitesTabs.setBorder(jsuitesTabs.getActive());

            // Update sliders
            if (obj.options.value) {
                var rgb = HexToRgb(obj.options.value);

                rgbInputs.forEach(function(rgbInput, index) {
                    rgbInput.value = rgb[index];
                    rgbInput.dispatchEvent(new Event('input'));
                });
            }
        }
    }

    /**
     * Close color pallete
     */
    obj.close = function(ignoreEvents) {
        if (container.classList.contains('jcolor-focus')) {
            // Remove focus
            container.classList.remove('jcolor-focus');
            // Make sure backdrop is hidden
            backdrop.style.display = '';
            // Call related events
            if (! ignoreEvents && typeof(obj.options.onclose) == 'function') {
                obj.options.onclose(el);
            }
            // Stop  the object
            jSuites.tracking(obj, false);
        }

        return obj.options.value;
    }

    /**
     * Set value
     */
    obj.setValue = function(color) {
        if (! color) {
            color = '';
        }

        if (color != obj.options.value) {
            obj.options.value = color;
            slidersResult = color;

            // Remove current selecded mark
            var selected = container.querySelector('.jcolor-selected');
            if (selected) {
                selected.classList.remove('jcolor-selected');
            }

            // Mark cell as selected
            if (obj.values[color]) {
                obj.values[color].classList.add('jcolor-selected');
            }

            // Onchange
            if (typeof(obj.options.onchange) == 'function') {
                obj.options.onchange(el, color);
            }

            // Changes
            if (el.value != obj.options.value) {
                // Set input value
                el.value = obj.options.value;
                // Element onchange native
                if (typeof(el.onchange) == 'function') {
                    el.onchange({
                        type: 'change',
                        target: el,
                        value: el.value
                    });
                }
            }

            if (obj.options.closeOnChange == true) {
                obj.close();
            }
        }
    }

    /**
     * Get value
     */
    obj.getValue = function() {
        return obj.options.value;
    }

    var backdropClickControl = false;

    // Converts a number in decimal to hexadecimal
    var decToHex = function(num) {
        var hex = num.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
    }

    // Converts a color in rgb to hexadecimal
    var rgbToHex = function(r, g, b) {
        return "#" + decToHex(r) + decToHex(g) + decToHex(b);
    }

    // Converts a number in hexadecimal to decimal
    var hexToDec = function(hex) {
        return parseInt('0x' + hex);
    }

    // Converts a color in hexadecimal to rgb
    var HexToRgb = function(hex) {
        return [hexToDec(hex.substr(1, 2)), hexToDec(hex.substr(3, 2)), hexToDec(hex.substr(5, 2))]
    }

    var table = function() {
        // Content of the first tab
        var tableContainer = document.createElement('div');
        tableContainer.className = 'jcolor-grid';

        // Cells
        obj.values = [];

        // Table pallete
        var t = document.createElement('table');
        t.setAttribute('cellpadding', '7');
        t.setAttribute('cellspacing', '0');

        for (var j = 0; j < obj.options.palette.length; j++) {
            var tr = document.createElement('tr');
            for (var i = 0; i < obj.options.palette[j].length; i++) {
                var td = document.createElement('td');
                var color = obj.options.palette[j][i];
                if (color.length < 7 && color.substr(0,1) !== '#') {
                    color = '#' + color;
                }
                td.style.backgroundColor = color;
                td.setAttribute('data-value', color);
                td.innerHTML = '';
                tr.appendChild(td);

                // Selected color
                if (obj.options.value == color) {
                    td.classList.add('jcolor-selected');
                }

                // Possible values
                obj.values[color] = td;
            }
            t.appendChild(tr);
        }

        // Append to the table
        tableContainer.appendChild(t);

        // Select color
        tableContainer.addEventListener("mousedown", function(e) {
            if (e.target.tagName == 'TD') {
                var value = e.target.getAttribute('data-value');
                if (value) {
                    obj.setValue(value);
                }
            }
        });

        return tableContainer;
    }

    // Canvas where the image will be rendered
    var canvas = document.createElement('canvas');
    canvas.width = 200;
    canvas.height = 160;
    var context = canvas.getContext("2d");

    var resizeCanvas = function() {
        // Specifications necessary to correctly obtain colors later in certain positions
        var m = tabs.firstChild.getBoundingClientRect();
        canvas.width = m.width - 14;
        gradient()
    }

    var gradient = function() {
        var g = context.createLinearGradient(0, 0, canvas.width, 0);
        // Create color gradient
        g.addColorStop(0,    "rgb(255,0,0)");
        g.addColorStop(0.15, "rgb(255,0,255)");
        g.addColorStop(0.33, "rgb(0,0,255)");
        g.addColorStop(0.49, "rgb(0,255,255)");
        g.addColorStop(0.67, "rgb(0,255,0)");
        g.addColorStop(0.84, "rgb(255,255,0)");
        g.addColorStop(1,    "rgb(255,0,0)");
        context.fillStyle = g;
        context.fillRect(0, 0, canvas.width, canvas.height);
        g = context.createLinearGradient(0, 0, 0, canvas.height);
        g.addColorStop(0,   "rgba(255,255,255,1)");
        g.addColorStop(0.5, "rgba(255,255,255,0)");
        g.addColorStop(0.5, "rgba(0,0,0,0)");
        g.addColorStop(1,   "rgba(0,0,0,1)");
        context.fillStyle = g;
        context.fillRect(0, 0, canvas.width, canvas.height);
    }

    var hsl = function() {
        var element = document.createElement('div');
        element.className = "jcolor-hsl";

        var point = document.createElement('div');
        point.className = 'jcolor-point';

        var div = document.createElement('div');
        div.appendChild(canvas);
        div.appendChild(point);
        element.appendChild(div);

        // Moves the marquee point to the specified position
        var update = function(buttons, x, y) {
            if (buttons === 1) {
                var rect = element.getBoundingClientRect();
                var left = x - rect.left;
                var top = y - rect.top;
                if (left < 0) {
                    left = 0;
                }
                if (top < 0) {
                    top = 0;
                }
                if (left > rect.width) {
                    left = rect.width;
                }
                if (top > rect.height) {
                    top = rect.height;
                }
                point.style.left = left + 'px';
                point.style.top = top + 'px';
                var pixel = context.getImageData(left, top, 1, 1).data;
                slidersResult = rgbToHex(pixel[0], pixel[1], pixel[2]);
            }
        }

        // Applies the point's motion function to the div that contains it
        element.addEventListener('mousedown', function(e) {
            update(e.buttons, e.clientX, e.clientY);
        });

        element.addEventListener('mousemove', function(e) {
            update(e.buttons, e.clientX, e.clientY);
        });

        element.addEventListener('touchmove', function(e) {
            update(1, e.changedTouches[0].clientX, e.changedTouches[0].clientY);
        });

        return element;
    }

    var slidersResult = '';

    var rgbInputs = [];

    var changeInputColors = function() {
        if (slidersResult !== '') {
            for (var j = 0; j < rgbInputs.length; j++) {
                var currentColor = HexToRgb(slidersResult);

                currentColor[j] = 0;

                var newGradient = 'linear-gradient(90deg, rgb(';
                newGradient += currentColor.join(', ');
                newGradient += '), rgb(';

                currentColor[j] = 255;

                newGradient += currentColor.join(', ');
                newGradient += '))';

                rgbInputs[j].style.backgroundImage = newGradient;
            }
        }
    }

    var sliders = function() {
        // Content of the third tab
        var slidersElement = document.createElement('div');
        slidersElement.className = 'jcolor-sliders';

        var slidersBody = document.createElement('div');

        // Creates a range-type input with the specified name
        var createSliderInput = function(name) {
            var inputContainer = document.createElement('div');
            inputContainer.className = 'jcolor-sliders-input-container';

            var label = document.createElement('label');
            label.innerText = name;

            var subContainer = document.createElement('div');
            subContainer.className = 'jcolor-sliders-input-subcontainer';

            var input = document.createElement('input');
            input.type = 'range';
            input.min = 0;
            input.max = 255;
            input.value = 0;

            inputContainer.appendChild(label);
            subContainer.appendChild(input);

            var value = document.createElement('div');
            value.innerText = input.value;

            input.addEventListener('input', function() {
                value.innerText = input.value;
            });

            subContainer.appendChild(value);
            inputContainer.appendChild(subContainer);

            slidersBody.appendChild(inputContainer);

            return input;
        }

        // Creates red, green and blue inputs
        rgbInputs = [
            createSliderInput('Red'),
            createSliderInput('Green'),
            createSliderInput('Blue'),
        ];

        slidersElement.appendChild(slidersBody);

        // Element that prints the current color
        var slidersResultColor = document.createElement('div');
        slidersResultColor.className = 'jcolor-sliders-final-color';

        var resultElement = document.createElement('div');
        resultElement.style.visibility = 'hidden';
        resultElement.innerText = 'a';
        slidersResultColor.appendChild(resultElement)

        // Update the element that prints the current color
        var updateResult = function() {
            var resultColor = rgbToHex(parseInt(rgbInputs[0].value), parseInt(rgbInputs[1].value), parseInt(rgbInputs[2].value));

            resultElement.innerText = resultColor;
            resultElement.style.color = resultColor;
            resultElement.style.removeProperty('visibility');

            slidersResult = resultColor;
        }

        // Apply the update function to color inputs
        rgbInputs.forEach(function(rgbInput) {
            rgbInput.addEventListener('input', function() {
                updateResult();
                changeInputColors();
            });
        });

        slidersElement.appendChild(slidersResultColor);

        return slidersElement;
    }

    var init = function() {
        // Initial options
        obj.setOptions(options);

        // Add a proper input tag when the element is an input
        if (el.tagName == 'INPUT') {
            el.classList.add('jcolor-input');
            el.readOnly = true;
        }

        // Table container
        container = document.createElement('div');
        container.className = 'jcolor';

        // Table container
        backdrop = document.createElement('div');
        backdrop.className = 'jcolor-backdrop';
        container.appendChild(backdrop);

        // Content
        content = document.createElement('div');
        content.className = 'jcolor-content';

        // Controls
        var controls = document.createElement('div');
        controls.className = 'jcolor-controls';
        content.appendChild(controls);

        // Reset button
        resetButton  = document.createElement('div');
        resetButton.className = 'jcolor-reset';
        resetButton.innerHTML = obj.options.resetLabel;
        resetButton.onclick = function(e) {
            obj.setValue('');
            obj.close();
        }
        controls.appendChild(resetButton);

        // Close button
        closeButton  = document.createElement('div');
        closeButton.className = 'jcolor-close';
        closeButton.innerHTML = obj.options.doneLabel;
        closeButton.onclick = function(e) {
            if (jsuitesTabs.getActive() > 0) {
                obj.setValue(slidersResult);
            }
            obj.close();
        }
        controls.appendChild(closeButton);

        // Element that will be used to create the tabs
        tabs = document.createElement('div');
        content.appendChild(tabs);

        // Starts the jSuites tabs component
        jsuitesTabs = jSuites.tabs(tabs, {
            animation: true,
            data: [
                {
                    title: 'Grid',
                    contentElement: table(),
                },
                {
                    title: 'Spectrum',
                    contentElement: hsl(),
                },
                {
                    title: 'Sliders',
                    contentElement: sliders(),
                }
            ],
            onchange: function(element, instance, index) {
                if (index === 1) {
                    resizeCanvas();
                } else {
                    var color = slidersResult !== '' ? slidersResult : obj.getValue();

                    if (index === 2 && color) {
                        var rgb = HexToRgb(color);

                        rgbInputs.forEach(function(rgbInput, index) {
                            rgbInput.value = rgb[index];
                            rgbInput.dispatchEvent(new Event('input'));
                        });
                    }
                }
            },
            palette: 'modern',
        });

        container.appendChild(content);

        // Insert picker after the element
        if (el.tagName == 'INPUT') {
            el.parentNode.insertBefore(container, el.nextSibling);
        } else {
            el.appendChild(container);
        }

        /**
         * If element is focus open the picker
         */
        el.addEventListener("mouseup", function(e) {
            obj.open();
        });

        backdrop.addEventListener("mousedown", function(e) {
            backdropClickControl = true;
        });

        backdrop.addEventListener("mouseup", function(e) {
            if (backdropClickControl) {
                obj.close();
                backdropClickControl = false;
            }
        });

        // If the picker is open on the spectrum tab, it changes the canvas size when the window size is changed
        window.addEventListener('resize', function() {
            if (container.classList.contains('jcolor-focus') && jsuitesTabs.getActive() == 1) {
                resizeCanvas();
            }
        });

        // Default opened
        if (obj.options.opened == true) {
            obj.open();
        }

        // Change
        el.change = obj.setValue;

        // Global generic value handler
        el.val = function(val) {
            if (val === undefined) {
                return obj.getValue();
            } else {
                obj.setValue(val);
            }
        }

        // Keep object available from the node
        el.color = obj;

        // Container shortcut
        container.color = obj;
    }

    init();

    return obj;
});



jSuites.contextmenu = (function(el, options) {
    var obj = {};
    obj.options = {};

    // Default configuration
    var defaults = {
        items: null,
        onclick: null,
    };

    // Loop through our object
    for (var property in defaults) {
        if (options && options.hasOwnProperty(property)) {
            obj.options[property] = options[property];
        } else {
            obj.options[property] = defaults[property];
        }
    }

    // Class definition
    el.classList.add('jcontextmenu');
    // Focusable
    el.setAttribute('tabindex', '900');

    /**
     * Open contextmenu
     */
    obj.open = function(e, items) {
        if (items) {
            // Update content
            obj.options.items = items;
            // Create items
            obj.create(items);
        }

        // Coordinates
        if ((obj.options.items && obj.options.items.length > 0) || el.children.length) {
            if (e.target) {
                var x = e.clientX;
                var y = e.clientY;
            } else {
                var x = e.x;
                var y = e.y;
            }

            el.classList.add('jcontextmenu-focus');
            el.focus();

            var rect = el.getBoundingClientRect();

            if (window.innerHeight < y + rect.height) {
                var h = y - rect.height;
                if (h < 0) {
                    h = 0;
                }
                el.style.top = h + 'px';
            } else {
                el.style.top = y + 'px';
            }

            if (window.innerWidth < x + rect.width) {
                if (x - rect.width > 0) {
                    el.style.left = (x - rect.width) + 'px';
                } else {
                    el.style.left = '10px';
                }
            } else {
                el.style.left = x + 'px';
            }
        }
    }

    /**
     * Close menu
     */
    obj.close = function() {
        if (el.classList.contains('jcontextmenu-focus')) {
            el.classList.remove('jcontextmenu-focus');
        }
    }

    /**
     * Create items based on the declared objectd
     * @param {object} items - List of object
     */
    obj.create = function(items) {
        // Update content
        el.innerHTML = '';

        // Add header contextmenu
        var itemHeader = createHeader();
        el.appendChild(itemHeader);

        // Append items
        for (var i = 0; i < items.length; i++) {
            var itemContainer = createItemElement(items[i]);
            el.appendChild(itemContainer);
        }
    }

    /**
     * createHeader for context menu
     * @private
     * @returns {HTMLElement}
     */
    function createHeader() {
        var header = document.createElement('div');
        header.classList.add("header");
        header.addEventListener("click", function(e) {
            e.preventDefault();
            e.stopPropagation();
        });
        var title = document.createElement('a');
        title.classList.add("title");
        title.innerHTML = jSuites.translate("Menu");

        header.appendChild(title);

        var closeButton = document.createElement('a');
        closeButton.classList.add("close");
        closeButton.innerHTML = jSuites.translate("close");
        closeButton.addEventListener("click", function(e) {
            obj.close();
        });

        header.appendChild(closeButton);

        return header;
    }

    /**
     * Private function for create a new Item element
     * @param {type} item
     * @returns {jsuitesL#15.jSuites.contextmenu.createItemElement.itemContainer}
     */
    function createItemElement(item) {
        if (item.type && (item.type == 'line' || item.type == 'divisor')) {
            var itemContainer = document.createElement('hr');
        } else {
            var itemContainer = document.createElement('div');
            var itemText = document.createElement('a');
            itemText.innerHTML = item.title;

            if (item.tooltip) {
                itemContainer.setAttribute('title', item.tooltip);
            }

            if (item.icon) {
                itemContainer.setAttribute('data-icon', item.icon);
            }

            if (item.id) {
                itemContainer.id = item.id;
            }

            if (item.disabled) {
                itemContainer.className = 'jcontextmenu-disabled';
            } else if (item.onclick) {
                itemContainer.method = item.onclick;
                itemContainer.addEventListener("mousedown", function(e) {
                    e.preventDefault();
                });
                itemContainer.addEventListener("mouseup", function(e) {
                    // Execute method
                    this.method(this, e);
                });
            }
            itemContainer.appendChild(itemText);

            if (item.submenu) {
                var itemIconSubmenu = document.createElement('span');
                itemIconSubmenu.innerHTML = "&#9658;";
                itemContainer.appendChild(itemIconSubmenu);
                itemContainer.classList.add('jcontexthassubmenu');
                var el_submenu = document.createElement('div');
                // Class definition
                el_submenu.classList.add('jcontextmenu');
                // Focusable
                el_submenu.setAttribute('tabindex', '900');

                // Append items
                var submenu = item.submenu;
                for (var i = 0; i < submenu.length; i++) {
                    var itemContainerSubMenu = createItemElement(submenu[i]);
                    el_submenu.appendChild(itemContainerSubMenu);
                }

                itemContainer.appendChild(el_submenu);
            } else if (item.shortcut) {
                var itemShortCut = document.createElement('span');
                itemShortCut.innerHTML = item.shortcut;
                itemContainer.appendChild(itemShortCut);
            }
        }
        return itemContainer;
    }

    if (typeof(obj.options.onclick) == 'function') {
        el.addEventListener('click', function(e) {
            obj.options.onclick(obj, e);
        });
    }

    // Create items
    if (obj.options.items) {
        obj.create(obj.options.items);
    }

    el.addEventListener('blur', function(e) {
        obj.close();
    });

    if (! jSuites.contextmenu.hasEvents) {
        window.addEventListener("mousewheel", function() {
            obj.close();
        });

        document.addEventListener("contextmenu", function(e) {
            var id = jSuites.contextmenu.getElement(e.target);
            if (id) {
                var element = document.querySelector('#' + id);
                if (! element) {
                    console.error('JSUITES: Contextmenu id not found');
                } else {
                    element.contextmenu.open(e);
                    e.preventDefault();
                }
            }
        });

        jSuites.contextmenu.hasEvents = true;
    }

    el.contextmenu = obj;

    return obj;
});

jSuites.contextmenu.getElement = function(element) {
    var foundId = 0;

    function path (element) {
        if (element.parentNode && element.getAttribute('aria-contextmenu-id')) {
            foundId = element.getAttribute('aria-contextmenu-id')
        } else {
            if (element.parentNode) {
                path(element.parentNode);
            }
        }
    }

    path(element);

    return foundId;
}


jSuites.dropdown = (function(el, options) {
    // Already created, update options
    if (el.dropdown) {
        return el.dropdown.setOptions(options, true);
    }

    // New instance
    var obj = { type: 'dropdown' };
    obj.options = {};

    // Success
    var success = function(data, val) {
        // Set data
        if (data && data.length) {
            // Sort
            if (obj.options.sortResults !== false) {
                if(typeof obj.options.sortResults == "function") {
                    data.sort(obj.options.sortResults);
                } else {
                    data.sort(sortData);
                }
            }

            obj.setData(data);

            // Onload method
            if (typeof(obj.options.onload) == 'function') {
                obj.options.onload(el, obj, data, val);
            }
        }

        // Set value
        if (val) {
            applyValue(val);
        }

        // Component value
        if (val === undefined || val === null) {
            obj.options.value = '';
        }
        el.value = obj.options.value;

        // Open dropdown
        if (obj.options.opened == true) {
            obj.open();
        }
    }

    
    // Default sort
    var sortData = function(itemA, itemB) {
        var testA, testB;
        if(typeof itemA == "string") {
            testA = itemA;
        } else {
            if(itemA.text) {
                testA = itemA.text;
            } else if(itemA.name) {
                testA = itemA.name;
            }
        }
        
        if(typeof itemB == "string") {
            testB = itemB;
        } else {
            if(itemB.text) {
                testB = itemB.text;
            } else if(itemB.name) {
                testB = itemB.name;
            }
        }
        
        if(typeof testA == "string" || typeof testB == "string") {
            if(typeof testA != "string") { testA = ""+testA; }
            if(typeof testB != "string") { testB = ""+testB; }
            return testA.localeCompare(testB);
        } else {
            return testA - testB;
        }
    }

    /**
     * Reset the options for the dropdown
     */
    var resetValue = function() {
        // Reset value container
        obj.value = {};
        // Remove selected
        for (var i = 0; i < obj.items.length; i++) {
            if (obj.items[i].selected == true) {
                if (obj.items[i].element) {
                    obj.items[i].element.classList.remove('jdropdown-selected')
                }
                obj.items[i].selected = null;
            }
        }
        // Reset options
        obj.options.value = '';
    }

    /**
     * Apply values to the dropdown
     */
    var applyValue = function(values) {
        // Reset the current values
        resetValue();

        // Read values
        if (values !== null) {
            if (! values) {
                if (typeof(obj.value['']) !== 'undefined') {
                    obj.value[''] = '';
                }
            } else {
                if (! Array.isArray(values)) {
                    values = ('' + values).split(';');
                }
                for (var i = 0; i < values.length; i++) {
                    obj.value[values[i]] = '';
                }
            }
        }

        // Update the DOM
        for (var i = 0; i < obj.items.length; i++) {
            if (typeof(obj.value[Value(i)]) !== 'undefined') {
                if (obj.items[i].element) {
                    obj.items[i].element.classList.add('jdropdown-selected')
                }
                obj.items[i].selected = true;

                // Keep label
                obj.value[Value(i)] = Text(i);
            }
        }

        // Global value
        obj.options.value = Object.keys(obj.value).join(';');

        // Update labels
        obj.header.value = obj.getText();
    }

    // Get the value of one item
    var Value = function(k, v) {
        // Legacy purposes
        if (! obj.options.format) {
            var property = 'value';
        } else {
            var property = 'id';
        }

        if (obj.items[k]) {
            if (v !== undefined) {
                return obj.items[k].data[property] = v;
            } else {
                return obj.items[k].data[property];
            }
        }

        return '';
    }

    // Get the label of one item
    var Text = function(k, v) {
        // Legacy purposes
        if (! obj.options.format) {
            var property = 'text';
        } else {
            var property = 'name';
        }

        if (obj.items[k]) {
            if (v !== undefined) {
                return obj.items[k].data[property] = v;
            } else {
                return obj.items[k].data[property];
            }
        }

        return '';
    }

    var getValue = function() {
        return Object.keys(obj.value);
    }

    var getText = function() {
        var data = [];
        var k = Object.keys(obj.value);
        for (var i = 0; i < k.length; i++) {
            data.push(obj.value[k[i]]);
        }
        return data;
    }

    obj.setOptions = function(options, reset) {
        if (! options) {
            options = {};
        }

        // Default configuration
        var defaults = {
            url: null,
            data: [],
            format: 0,
            multiple: false,
            autocomplete: false,
            remoteSearch: false,
            lazyLoading: false,
            type: null,
            width: null,
            maxWidth: null,
            opened: false,
            value: null,
            placeholder: '',
            newOptions: false,
            position: false,
            onchange: null,
            onload: null,
            onopen: null,
            onclose: null,
            onfocus: null,
            onblur: null,
            oninsert: null,
            onbeforeinsert: null,
            sortResults: false,
            autofocus: false,
        }

        // Loop through our object
        for (var property in defaults) {
            if (options && options.hasOwnProperty(property)) {
                obj.options[property] = options[property];
            } else {
                if (typeof(obj.options[property]) == 'undefined' || reset === true) {
                    obj.options[property] = defaults[property];
                }
            }
        }

        // Force autocomplete search
        if (obj.options.remoteSearch == true || obj.options.type === 'searchbar') {
            obj.options.autocomplete = true;
        }

        // New options
        if (obj.options.newOptions == true) {
            obj.header.classList.add('jdropdown-add');
        } else {
            obj.header.classList.remove('jdropdown-add');
        }

        // Autocomplete
        if (obj.options.autocomplete == true) {
            obj.header.removeAttribute('readonly');
        } else {
            obj.header.setAttribute('readonly', 'readonly');
        }

        // Place holder
        if (obj.options.placeholder) {
            obj.header.setAttribute('placeholder', obj.options.placeholder);
        } else {
            obj.header.removeAttribute('placeholder');
        }

        // Remove specific dropdown typing to add again
        el.classList.remove('jdropdown-searchbar');
        el.classList.remove('jdropdown-picker');
        el.classList.remove('jdropdown-list');

        if (obj.options.type == 'searchbar') {
            el.classList.add('jdropdown-searchbar');
        } else if (obj.options.type == 'list') {
            el.classList.add('jdropdown-list');
        } else if (obj.options.type == 'picker') {
            el.classList.add('jdropdown-picker');
        } else {
            if (jSuites.getWindowWidth() < 800) {
                if (obj.options.autocomplete) {
                    el.classList.add('jdropdown-searchbar');
                    obj.options.type = 'searchbar';
                } else {
                    el.classList.add('jdropdown-picker');
                    obj.options.type = 'picker';
                }
            } else {
                if (obj.options.width) {
                    el.style.width = obj.options.width;
                    el.style.minWidth = obj.options.width;
                } else {
                    el.style.removeProperty('width');
                    el.style.removeProperty('min-width');
                }

                el.classList.add('jdropdown-default');
                obj.options.type = 'default';
            }
        }

        // Close button
        if (obj.options.type == 'searchbar') {
            containerHeader.appendChild(closeButton);
        } else {
            container.insertBefore(closeButton, container.firstChild);
        }

        // Load the content
        if (obj.options.url && ! options.data) {
            jSuites.ajax({
                url: obj.options.url,
                method: 'GET',
                dataType: 'json',
                success: function(data) {
                    if (data) {
                        success(data, obj.options.value);
                    }
                }
            });
        } else {
            success(obj.options.data, obj.options.value);
        }

        // Return the instance
        return obj;
    }

    // Helpers
    var containerHeader = null;
    var container = null;
    var content = null;
    var closeButton = null;
    var resetButton = null;
    var backdrop = null;

    var keyTimer = null;

    /**
     * Init dropdown
     */
    var init = function() {
        // Do not accept null
        if (! options) {
            options = {};
        }

        // If the element is a SELECT tag, create a configuration object
        if (el.tagName == 'SELECT') {
            var ret = jSuites.dropdown.extractFromDom(el, options);
            el = ret.el;
            options = ret.options;
        }

        // Place holder
        if (! options.placeholder && el.getAttribute('placeholder')) {
            options.placeholder = el.getAttribute('placeholder');
        }

        // Value container
        obj.value = {};
        // Containers
        obj.items = [];
        obj.groups = [];
        // Search options
        obj.search = '';
        obj.results = null;

        // Create dropdown
        el.classList.add('jdropdown');

        // Header container
        containerHeader = document.createElement('div');
        containerHeader.className = 'jdropdown-container-header';

        // Header
        obj.header = document.createElement('input');
        obj.header.className = 'jdropdown-header';
        obj.header.type = 'text';
        obj.header.setAttribute('autocomplete', 'off');
        obj.header.onfocus = function() {
            if (typeof(obj.options.onfocus) == 'function') {
                obj.options.onfocus(el);
            }
        }

        obj.header.onblur = function() {
            if (typeof(obj.options.onblur) == 'function') {
                obj.options.onblur(el);
            }
        }

        obj.header.onkeyup = function(e) {
            if (obj.options.autocomplete == true && ! keyTimer) {
                if (obj.search != obj.header.value.trim()) {
                    keyTimer = setTimeout(function() {
                        obj.find(obj.header.value.trim());
                        keyTimer = null;
                    }, 400);
                }

                if (! el.classList.contains('jdropdown-focus')) {
                    obj.open();
                }
            } else {
                if (! obj.options.autocomplete) {
                    obj.next(e.key);
                }
            }
        }

        // Global controls
        if (! jSuites.dropdown.hasEvents) {
            // Execute only one time
            jSuites.dropdown.hasEvents = true;
            // Enter and Esc
            document.addEventListener("keydown", jSuites.dropdown.keydown);
        }

        // Container
        container = document.createElement('div');
        container.className = 'jdropdown-container';

        // Dropdown content
        content = document.createElement('div');
        content.className = 'jdropdown-content';

        // Close button
        closeButton = document.createElement('div');
        closeButton.className = 'jdropdown-close';
        closeButton.innerHTML = 'Done';

        // Reset button
        resetButton = document.createElement('div');
        resetButton.className = 'jdropdown-reset';
        resetButton.innerHTML = 'x';
        resetButton.onclick = function() {
            obj.reset();
            obj.close();
        }

        // Create backdrop
        backdrop = document.createElement('div');
        backdrop.className = 'jdropdown-backdrop';

        // Append elements
        containerHeader.appendChild(obj.header);

        container.appendChild(content);
        el.appendChild(containerHeader);
        el.appendChild(container);
        el.appendChild(backdrop);

        // Set the otiptions
        obj.setOptions(options);

        if ('ontouchsend' in document.documentElement === true) {
            el.addEventListener('touchsend', jSuites.dropdown.mouseup);
        } else {
            el.addEventListener('mouseup', jSuites.dropdown.mouseup);
        }

        // Lazyloading
        if (obj.options.lazyLoading == true) {
            jSuites.lazyLoading(content, {
                loadUp: obj.loadUp,
                loadDown: obj.loadDown,
            });
        }

        content.onwheel = function(e) {
            e.stopPropagation();
        }

        // Change method
        el.change = obj.setValue;

        // Global generic value handler
        el.val = function(val) {
            if (val === undefined) {
                return obj.getValue(obj.options.multiple ? true : false);
            } else {
                obj.setValue(val);
            }
        }

        // Keep object available from the node
        el.dropdown = obj;
    }

    /**
     * Get the current remote source of data URL
     */
    obj.getUrl = function() {
        return obj.options.url;
    }

    /**
     * Set the new data from a remote source
     * @param {string} url - url from the remote source
     * @param {function} callback - callback when the data is loaded
     */
    obj.setUrl = function(url, callback) {
        obj.options.url = url;

        jSuites.ajax({
            url: obj.options.url,
            method: 'GET',
            dataType: 'json',
            success: function(data) {
                obj.setData(data);
                // Callback
                if (typeof(callback) == 'function') {
                    callback(obj);
                }
            }
        });
    }

    /**
     * Set ID for one item
     */
    obj.setId = function(item, v) {
        // Legacy purposes
        if (! obj.options.format) {
            var property = 'value';
        } else {
            var property = 'id';
        }

        if (typeof(item) == 'object') {
            item[property] = v;
        } else {
            obj.items[item].data[property] = v;
        }
    }

    /**
     * Add a new item
     * @param {string} title - title of the new item
     * @param {string} id - value/id of the new item
     */
    obj.add = function(title, id) {
        if (! title) {
            var current = obj.options.autocomplete == true ? obj.header.value : '';
            var title = prompt(jSuites.translate('Add A New Option'), current);
            if (! title) {
                return false;
            }
        }

        // Id
        if (! id) {
           id = jSuites.guid();
        }

        // Create new item
        if (! obj.options.format) {
            var item = {
                value: id,
                text: title,
            }
        } else {
            var item = {
                id: id,
                name: title,
            }
        }

        // Callback
        if (typeof(obj.options.onbeforeinsert) == 'function') {
            var ret = obj.options.onbeforeinsert(obj, item);
            if (ret === false) {
                return false;
            } else if (ret) {
                item = ret;
            }
        }

        // Add item to the main list
        obj.options.data.push(item);

        // Create DOM
        var newItem = obj.createItem(item);

        // Append DOM to the list
        content.appendChild(newItem.element);

        // Callback
        if (typeof(obj.options.oninsert) == 'function') {
            obj.options.oninsert(obj, item, newItem);
        }

        // Show content
        if (content.style.display == 'none') {
            content.style.display = '';
        }

        // Search?
        if (obj.results) {
            obj.results.push(newItem);
        }

        return item;
    }

    /**
     * Create a new item
     */
    obj.createItem = function(data, group, groupName) {
        // Keep the correct source of data
        if (! obj.options.format) {
            if (! data.value && data.id !== undefined) {
                data.value = data.id;
                //delete data.id;
            }
            if (! data.text && data.name !== undefined) {
                data.text = data.name;
                //delete data.name;
            }
        } else {
            if (! data.id && data.value !== undefined) {
                data.id = data.value;
                //delete data.value;
            }
            if (! data.name && data.text !== undefined) {
                data.name = data.text
                //delete data.text;
            }
        }

        // Create item
        var item = {};
        item.element = document.createElement('div');
        item.element.className = 'jdropdown-item';
        item.element.indexValue = obj.items.length;
        item.data = data;

        // Groupd DOM
        if (group) {
            item.group = group; 
        }

        // Id
        if (data.id) {
            item.element.setAttribute('id', data.id);
        }

        // Disabled
        if (data.disabled == true) {
            item.element.setAttribute('data-disabled', true);
        }

        // Tooltip
        if (data.tooltip) {
            item.element.setAttribute('title', data.tooltip);
        }

        // Image
        if (data.image) {
            var image = document.createElement('img');
            image.className = 'jdropdown-image';
            image.src = data.image;
            if (! data.title) {
               image.classList.add('jdropdown-image-small');
            }
            item.element.appendChild(image);
        } else if (data.icon) {
            var icon = document.createElement('span');
            icon.className = "jdropdown-icon material-icons";
            icon.innerText = data.icon;
            if (! data.title) {
               icon.classList.add('jdropdown-icon-small');
            }
            if (data.color) {
                icon.style.color = data.color;
            }
            item.element.appendChild(icon);
        } else if (data.color) {
            var color = document.createElement('div');
            color.className = 'jdropdown-color';
            color.style.backgroundColor = data.color;
            item.element.appendChild(color);
        }

        // Set content
        if (! obj.options.format) {
            var text = data.text;
        } else {
            var text = data.name;
        }

        var node = document.createElement('div');
        node.className = 'jdropdown-description';
        node.innerHTML = text || '&nbsp;'; 

        // Title
        if (data.title) {
            var title = document.createElement('div');
            title.className = 'jdropdown-title';
            title.innerText = data.title;
            node.appendChild(title);
        }

        // Set content
        if (! obj.options.format) {
            var val = data.value;
        } else {
            var val = data.id;
        }

        // Value
        if (obj.value[val]) {
            item.element.classList.add('jdropdown-selected');
            item.selected = true;
        }

        // Keep DOM accessible
        obj.items.push(item);

        // Add node to item
        item.element.appendChild(node);

        return item;
    }

    obj.appendData = function(data) {
        // Create elements
        if (data.length) {
            // Helpers
            var items = [];
            var groups = [];

            // Prepare data
            for (var i = 0; i < data.length; i++) {
                // Process groups
                if (data[i].group) {
                    if (! groups[data[i].group]) {
                        groups[data[i].group] = [];
                    }
                    groups[data[i].group].push(i);
                } else {
                    items.push(i);
                }
            }

            // Number of items counter
            var counter = 0;

            // Groups
            var groupNames = Object.keys(groups);

            // Append groups in case exists
            if (groupNames.length > 0) {
                for (var i = 0; i < groupNames.length; i++) {
                    // Group container
                    var group = document.createElement('div');
                    group.className = 'jdropdown-group';
                    // Group name
                    var groupName = document.createElement('div');
                    groupName.className = 'jdropdown-group-name';
                    groupName.innerHTML = groupNames[i];
                    // Group arrow
                    var groupArrow = document.createElement('i');
                    groupArrow.className = 'jdropdown-group-arrow jdropdown-group-arrow-down';
                    groupName.appendChild(groupArrow);
                    // Group items
                    var groupContent = document.createElement('div');
                    groupContent.className = 'jdropdown-group-items';
                    for (var j = 0; j < groups[groupNames[i]].length; j++) {
                        var item = obj.createItem(data[groups[groupNames[i]][j]], group, groupNames[i]);

                        if (obj.options.lazyLoading == false || counter < 200) {
                            groupContent.appendChild(item.element);
                            counter++;
                        }
                    }
                    // Group itens
                    group.appendChild(groupName);
                    group.appendChild(groupContent);
                    // Keep group DOM
                    obj.groups.push(group);
                    // Only add to the screen if children on the group
                    if (groupContent.children.length > 0) {
                        // Add DOM to the content
                        content.appendChild(group);
                    }
                }
            }

            if (items.length) {
                for (var i = 0; i < items.length; i++) {
                    var item = obj.createItem(data[items[i]]);
                    if (obj.options.lazyLoading == false || counter < 200) {
                        content.appendChild(item.element);
                        counter++;
                    }
                }
            }
        }
    }

    obj.setData = function(data) {
        // Prepare data
        if (data.length) {
            for (var i = 0; i < data.length; i++) {
                // Compatibility
                if (typeof(data[i]) != 'object') {
                    // Correct format
                    if (! obj.options.format) {
                        data[i] = {
                            value: data[i],
                            text: data[i]
                        }
                    } else {
                        data[i] = {
                            id: data[i],
                            name: data[i]
                        }
                    }
                }
            }

            // Reset current value
            resetValue();

            // Make sure the content container is blank
            content.innerHTML = '';

            // Reset
            obj.header.value = '';

            // Reset items and values
            obj.items = [];

            // Append data
            obj.appendData(data);

            // Update data
            obj.options.data = data;
        }
    }

    obj.getData = function() {
        return obj.options.data;
    }

    /**
     * Get position of the item
     */
    obj.getPosition = function(val) {
        for (var i = 0; i < obj.items.length; i++) {
            if (Value(i) == val) {
                return i;
            }
        }
        return false;
    }

    /**
     * Get dropdown current text
     */
    obj.getText = function(asArray) {
        // Get value
        var v = getText();
        // Return value
        if (asArray) {
            return v;
        } else {
            return v.join('; ');
        }
    }

    /**
     * Get dropdown current value
     */
    obj.getValue = function(asArray) {
        // Get value
        var v = getValue();
        // Return value
        if (asArray) {
            return v;
        } else {
            return v.join(';');
        }
    }

    /**
     * Change event
     */
    var change = function(oldValue) {
        // Events
        if (typeof(obj.options.onchange) == 'function') {
            obj.options.onchange(el, obj, oldValue, obj.options.value);
        }

        // Lemonade JS
        if (el.value != obj.options.value) {
            el.value = obj.options.value;
            if (typeof(el.onchange) == 'function') {
                el.onchange({
                    type: 'change',
                    target: el,
                    value: el.value
                });
            }
        }
    }

    /**
     * Set value
     */
    obj.setValue = function(newValue) {
        // Current value
        var oldValue = obj.getValue();
        // New value
        if (Array.isArray(newValue)) {
            newValue = newValue.join(';')
        }

        if (oldValue !== newValue) {
            // Set value
            applyValue(newValue);

            // Change
            change(oldValue);
        }
    }

    obj.resetSelected = function() {
        obj.setValue(null);
    } 

    obj.selectIndex = function(index, force) {
        // Make sure is a number
        var index = parseInt(index);

        // Only select those existing elements
        if (obj.items && obj.items[index] && (force === true || obj.items[index].data.disabled !== true)) {
            // Reset cursor to a new position
            obj.setCursor(index, false);

            // Behaviour
            if (! obj.options.multiple) {
                // Update value
                if (obj.items[index].selected) {
                    obj.setValue(null);
                } else {
                    obj.setValue(Value(index));
                }

                // Close component
                obj.close();
            } else {
                // Old value
                var oldValue = obj.options.value;

                // Toggle option
                if (obj.items[index].selected) {
                    obj.items[index].element.classList.remove('jdropdown-selected');
                    obj.items[index].selected = false;

                    delete obj.value[Value(index)];
                } else {
                    // Select element
                    obj.items[index].element.classList.add('jdropdown-selected');
                    obj.items[index].selected = true;

                    // Set value
                    obj.value[Value(index)] = Text(index);
                }

                // Global value
                obj.options.value = Object.keys(obj.value).join(';');

                // Update labels for multiple dropdown
                if (obj.options.autocomplete == false) {
                    obj.header.value = getText().join('; ');
                }

                // Events
                change(oldValue);
            }
        }
    }

    obj.selectItem = function(item) {
        obj.selectIndex(item.indexValue);
    }

    var exists = function(k, result) {
        for (var j = 0; j < result.length; j++) {
            if (! obj.options.format) {
                if (result[j].value == k) {
                    return true;
                }
            } else {
                if (result[j].id == k) {
                    return true;
                }
            }
        }
        return false;
    }

    obj.find = function(str) {
        if (obj.search == str.trim()) {
            return false;
        }

        // Search term
        obj.search = str;

        // Reset index
        obj.setCursor();

        // Remove nodes from all groups
        if (obj.groups.length) {
            for (var i = 0; i < obj.groups.length; i++) {
                obj.groups[i].lastChild.innerHTML = '';
            }
        }

        // Remove all nodes
        content.innerHTML = '';

        // Remove current items in the remote search
        if (obj.options.remoteSearch == true) {
            // Reset results
            obj.results = null;
            // URL
            var url = obj.options.url + (obj.options.url.indexOf('?') > 0 ? '&' : '?') + 'q=' + str;
            // Remote search
            jSuites.ajax({
                url: url,
                method: 'GET',
                dataType: 'json',
                success: function(result) {
                    // Reset items
                    obj.items = [];

                    // Add the current selected items to the results in case they are not there
                    var current = Object.keys(obj.value);
                    if (current.length) {
                        for (var i = 0; i < current.length; i++) {
                            if (! exists(current[i], result)) {
                                if (! obj.options.format) {
                                    result.unshift({ value: current[i], text: obj.value[current[i]] });
                                } else {
                                    result.unshift({ id: current[i], name: obj.value[current[i]] });
                                }
                            }
                        }
                    }
                    // Append data
                    obj.appendData(result);
                    // Show or hide results
                    if (! result.length) {
                        content.style.display = 'none';
                    } else {
                        content.style.display = '';
                    }
                }
            });
        } else {
            // Search terms
            str = new RegExp(str, 'gi');

            // Reset search
            var results = [];

            // Append options
            for (var i = 0; i < obj.items.length; i++) {
                // Item label
                var label = Text(i);
                // Item title
                var title = obj.items[i].data.title || '';
                // Group name
                var groupName = obj.items[i].data.group || '';
                // Synonym
                var synonym = obj.items[i].data.synonym || '';
                if (synonym) {
                    synonym = synonym.join(' ');
                }

                if (str == null || obj.items[i].selected == true || label.match(str) || title.match(str) || groupName.match(str) || synonym.match(str)) {
                    results.push(obj.items[i]);
                }
            }

            if (! results.length) {
                content.style.display = 'none';

                // Results
                obj.results = null;
            } else {
                content.style.display = '';

                // Results
                obj.results = results;

                // Show 200 items at once
                var number = results.length || 0;

                // Lazyloading
                if (obj.options.lazyLoading == true && number > 200) {
                    number = 200;
                }

                for (var i = 0; i < number; i++) {
                    if (obj.results[i].group) {
                        if (! obj.results[i].group.parentNode) {
                            content.appendChild(obj.results[i].group);
                        }
                        obj.results[i].group.lastChild.appendChild(obj.results[i].element);
                    } else {
                        content.appendChild(obj.results[i].element);
                    }
                }
            }
        }

        // Auto focus
        if (obj.options.autofocus == true) {
            obj.first();
        }
    }

    obj.open = function() {
        // Focus
        if (! el.classList.contains('jdropdown-focus')) {
            // Current dropdown
            jSuites.dropdown.current = obj;

            // Start tracking
            jSuites.tracking(obj, true);

            // Add focus
            el.classList.add('jdropdown-focus');

            // Animation
            if (jSuites.getWindowWidth() < 800) {
                if (obj.options.type == null || obj.options.type == 'picker') {
                    jSuites.animation.slideBottom(container, 1);
                }
            }

            // Filter
            if (obj.options.autocomplete == true) {
                obj.header.value = obj.search;
                obj.header.focus();
            }

            // Set cursor for the first or first selected element
            var k = getValue();
            if (k[0]) {
                var cursor = obj.getPosition(k[0]);
                if (cursor !== false) {
                    obj.setCursor(cursor);
                }
            }

            // Container Size
            if (! obj.options.type || obj.options.type == 'default') {
                var rect = el.getBoundingClientRect();
                var rectContainer = container.getBoundingClientRect();

                if (obj.options.position) {
                    container.style.position = 'fixed';
                    if (window.innerHeight < rect.bottom + rectContainer.height) {
                        container.style.top = '';
                        container.style.bottom = (window.innerHeight - rect.top ) + 1 + 'px';
                    } else {
                        container.style.top = rect.bottom + 'px';
                        container.style.bottom = '';
                    }
                    container.style.left = rect.left + 'px';
                } else {
                    if (window.innerHeight < rect.bottom + rectContainer.height) {
                        container.style.top = '';
                        container.style.bottom = rect.height + 1 + 'px';
                    } else {
                        container.style.top = '';
                        container.style.bottom = '';
                    }
                }

                container.style.minWidth = rect.width + 'px';

                if (obj.options.maxWidth) {
                    container.style.maxWidth = obj.options.maxWidth;
                }

                if (! obj.items.length && obj.options.autocomplete == true) {
                    content.style.display = 'none';
                } else {
                    content.style.display = '';
                }
            }
        }

        // Events
        if (typeof(obj.options.onopen) == 'function') {
            obj.options.onopen(el);
        }
    }

    obj.close = function(ignoreEvents) {
        if (el.classList.contains('jdropdown-focus')) {
            // Update labels
            obj.header.value = obj.getText();
            // Remove cursor
            obj.setCursor();
            // Events
            if (! ignoreEvents && typeof(obj.options.onclose) == 'function') {
                obj.options.onclose(el);
            }
            // Blur
            if (obj.header.blur) {
                obj.header.blur();
            }
            // Remove focus
            el.classList.remove('jdropdown-focus');
            // Start tracking
            jSuites.tracking(obj, false);
            // Current dropdown
            jSuites.dropdown.current = null;
        }

        return obj.getValue();
    }

    /**
     * Set cursor
     */
    obj.setCursor = function(index, setPosition) {
        // Remove current cursor
        if (obj.currentIndex != null) {
            // Remove visual cursor
            if (obj.items && obj.items[obj.currentIndex]) {
                obj.items[obj.currentIndex].element.classList.remove('jdropdown-cursor');
            }
        }

        if (index == undefined) {
            obj.currentIndex = null;
        } else {
            index = parseInt(index);

            // Cursor only for visible items
            if (obj.items[index].element.parentNode) {
                obj.items[index].element.classList.add('jdropdown-cursor');
                obj.currentIndex = index;

                // Update scroll to the cursor element
                if (setPosition !== false && obj.items[obj.currentIndex].element) {
                    var container = content.scrollTop;
                    var element = obj.items[obj.currentIndex].element;
                    content.scrollTop = element.offsetTop - element.scrollTop + element.clientTop - 95;
                }
            }
        }
    }

    // Compatibility
    obj.resetCursor = obj.setCursor;
    obj.updateCursor = obj.setCursor;

    /**
     * Reset cursor and selected items
     */
    obj.reset = function() {
        // Reset cursor
        obj.setCursor();

        // Reset selected
        obj.setValue(null);
    }

    /**
     * First available item
     */
    obj.first = function() {
        if (obj.options.lazyLoading === true) {
            obj.loadFirst();
        }

        var items = content.querySelectorAll('.jdropdown-item');
        if (items.length) {
            var newIndex = items[0].indexValue;
            obj.setCursor(newIndex);
        }
    }

    /**
     * Last available item 
     */
    obj.last = function() {
        if (obj.options.lazyLoading === true) {
            obj.loadLast();
        }

        var items = content.querySelectorAll('.jdropdown-item');
        if (items.length) {
            var newIndex = items[items.length-1].indexValue;
            obj.setCursor(newIndex);
        }
    }

    obj.next = function(letter) {
        var newIndex = null;

        if (letter) {
            if (letter.length == 1) {
                // Current index
                var current = obj.currentIndex || -1;
                // Letter
                letter = letter.toLowerCase();

                var e = null;
                var l = null;
                var items = content.querySelectorAll('.jdropdown-item');
                if (items.length) {
                    for (var i = 0; i < items.length; i++) {
                        if (items[i].indexValue > current) {
                            if (e = obj.items[items[i].indexValue]) {
                                if (l = e.element.innerText[0]) {
                                    l = l.toLowerCase();
                                    if (letter == l) {
                                        newIndex = items[i].indexValue;
                                        break;
                                    }
                                }
                            }
                        }
                    }
                    obj.setCursor(newIndex);
                }
            }
        } else {
            if (obj.currentIndex == undefined || obj.currentIndex == null) {
                obj.first();
            } else {
                var element = obj.items[obj.currentIndex].element;

                var next = element.nextElementSibling;
                if (next) {
                    if (next.classList.contains('jdropdown-group')) {
                        next = next.lastChild.firstChild;
                    }
                    newIndex = next.indexValue;
                } else {
                    if (element.parentNode.classList.contains('jdropdown-group-items')) {
                        if (next = element.parentNode.parentNode.nextElementSibling) {
                            if (next.classList.contains('jdropdown-group')) {
                                next = next.lastChild.firstChild;
                            } else if (next.classList.contains('jdropdown-item')) {
                                newIndex = next.indexValue;
                            } else {
                                next = null;
                            }
                        }

                        if (next) {
                            newIndex = next.indexValue;
                        }
                    }
                }

                if (newIndex !== null) {
                    obj.setCursor(newIndex);
                }
            }
        }
    }

    obj.prev = function() {
        var newIndex = null;

        if (obj.currentIndex === null) {
            obj.first();
        } else {
            var element = obj.items[obj.currentIndex].element;

            var prev = element.previousElementSibling;
            if (prev) {
                if (prev.classList.contains('jdropdown-group')) {
                    prev = prev.lastChild.lastChild;
                }
                newIndex = prev.indexValue;
            } else {
                if (element.parentNode.classList.contains('jdropdown-group-items')) {
                    if (prev = element.parentNode.parentNode.previousElementSibling) {
                        if (prev.classList.contains('jdropdown-group')) {
                            prev = prev.lastChild.lastChild;
                        } else if (prev.classList.contains('jdropdown-item')) {
                            newIndex = prev.indexValue;
                        } else {
                            prev = null
                        }
                    }

                    if (prev) {
                        newIndex = prev.indexValue;
                    }
                }
            }
        }

        if (newIndex !== null) {
            obj.setCursor(newIndex);
        }
    }

    obj.loadFirst = function() {
        // Search
        if (obj.results) {
            var results = obj.results;
        } else {
            var results = obj.items;
        }

        // Show 200 items at once
        var number = results.length || 0;

        // Lazyloading
        if (obj.options.lazyLoading == true && number > 200) {
            number = 200;
        }

        // Reset container
        content.innerHTML = '';

        // First 200 items
        for (var i = 0; i < number; i++) {
            if (results[i].group) {
                if (! results[i].group.parentNode) {
                    content.appendChild(results[i].group);
                }
                results[i].group.lastChild.appendChild(results[i].element);
            } else {
                content.appendChild(results[i].element);
            }
        }

        // Scroll go to the begin
        content.scrollTop = 0;
    }

    obj.loadLast = function() {
        // Search
        if (obj.results) {
            var results = obj.results;
        } else {
            var results = obj.items;
        }

        // Show first page
        var number = results.length;

        // Max 200 items
        if (number > 200) {
            number = number - 200;

            // Reset container
            content.innerHTML = '';

            // First 200 items
            for (var i = number; i < results.length; i++) {
                if (results[i].group) {
                    if (! results[i].group.parentNode) {
                        content.appendChild(results[i].group);
                    }
                    results[i].group.lastChild.appendChild(results[i].element);
                } else {
                    content.appendChild(results[i].element);
                }
            }

            // Scroll go to the begin
            content.scrollTop = content.scrollHeight;
        }
    }

    obj.loadUp = function() {
        var test = false;

        // Search
        if (obj.results) {
            var results = obj.results;
        } else {
            var results = obj.items;
        }

        var items = content.querySelectorAll('.jdropdown-item');
        var fistItem = items[0].indexValue;
        fistItem = obj.items[fistItem];
        var index = results.indexOf(fistItem) - 1;

        if (index > 0) {
            var number = 0;

            while (index > 0 && results[index] && number < 200) {
                if (results[index].group) {
                    if (! results[index].group.parentNode) {
                        content.insertBefore(results[index].group, content.firstChild);
                    }
                    results[index].group.lastChild.insertBefore(results[index].element, results[index].group.lastChild.firstChild);
                } else {
                    content.insertBefore(results[index].element, content.firstChild);
                }

                index--;
                number++;
            }

            // New item added
            test = true;
        }

        return test;
    }

    obj.loadDown = function() {
        var test = false;

        // Search
        if (obj.results) {
            var results = obj.results;
        } else {
            var results = obj.items;
        }

        var items = content.querySelectorAll('.jdropdown-item');
        var lastItem = items[items.length-1].indexValue;
        lastItem = obj.items[lastItem];
        var index = results.indexOf(lastItem) + 1;

        if (index < results.length) {
            var number = 0;
            while (index < results.length && results[index] && number < 200) {
                if (results[index].group) {
                    if (! results[index].group.parentNode) {
                        content.appendChild(results[index].group);
                    }
                    results[index].group.lastChild.appendChild(results[index].element);
                } else {
                    content.appendChild(results[index].element);
                }

                index++;
                number++;
            }

            // New item added
            test = true;
        }

        return test;
    }

    init();

    return obj;
});

jSuites.dropdown.keydown = function(e) {
    var dropdown = null;
    if (dropdown = jSuites.dropdown.current) {
        if (e.which == 13 || e.which == 9) {  // enter or tab
            if (dropdown.header.value && dropdown.currentIndex == null && dropdown.options.newOptions) {
                // if they typed something in, but it matched nothing, and newOptions are allowed, start that flow
                dropdown.add();
            } else {
                // Quick Select/Filter
                if (dropdown.currentIndex == null && dropdown.options.autocomplete == true && dropdown.header.value != "") {
                    dropdown.find(dropdown.header.value);
                }
                dropdown.selectIndex(dropdown.currentIndex);
            }
        } else if (e.which == 38) {  // up arrow
            if (dropdown.currentIndex == null) {
                dropdown.first();
            } else if (dropdown.currentIndex > 0) {
                dropdown.prev();
            }
            e.preventDefault();
        } else if (e.which == 40) {  // down arrow
            if (dropdown.currentIndex == null) {
                dropdown.first();
            } else if (dropdown.currentIndex + 1 < dropdown.items.length) {
                dropdown.next();
            }
            e.preventDefault();
        } else if (e.which == 36) {
            dropdown.first();
            if (! e.target.classList.contains('jdropdown-header')) {
                e.preventDefault();
            }
        } else if (e.which == 35) {
            dropdown.last();
            if (! e.target.classList.contains('jdropdown-header')) {
                e.preventDefault();
            }
        } else if (e.which == 27) {
            dropdown.close();
        } else if (e.which == 33) {  // page up
            if (dropdown.currentIndex == null) {
                dropdown.first();
            } else if (dropdown.currentIndex > 0) {
                for (var i = 0; i < 7; i++) {
                    dropdown.prev()
                }
            }
            e.preventDefault();
        } else if (e.which == 34) {  // page down
            if (dropdown.currentIndex == null) {
                dropdown.first();
            } else if (dropdown.currentIndex + 1 < dropdown.items.length) {
                for (var i = 0; i < 7; i++) {
                    dropdown.next()
                }
            }
            e.preventDefault();
        }
    }
}

jSuites.dropdown.mouseup = function(e) {
    var element = jSuites.findElement(e.target, 'jdropdown');
    if (element) {
        var dropdown = element.dropdown;
        if (e.target.classList.contains('jdropdown-header')) {
            if (element.classList.contains('jdropdown-focus') && element.classList.contains('jdropdown-default')) {
                var rect = element.getBoundingClientRect();

                if (e.changedTouches && e.changedTouches[0]) {
                    var x = e.changedTouches[0].clientX;
                    var y = e.changedTouches[0].clientY;
                } else {
                    var x = e.clientX;
                    var y = e.clientY;
                }

                if (rect.width - (x - rect.left) < 30) {
                    if (e.target.classList.contains('jdropdown-add')) {
                        dropdown.add();
                    } else {
                        dropdown.close();
                    }
                } else {
                    if (dropdown.options.autocomplete == false) {
                        dropdown.close();
                    }
                }
            } else {
                dropdown.open();
            }
        } else if (e.target.classList.contains('jdropdown-group-name')) {
            var items = e.target.nextSibling.children;
            if (e.target.nextSibling.style.display != 'none') {
                for (var i = 0; i < items.length; i++) {
                    if (items[i].style.display != 'none') {
                        dropdown.selectItem(items[i]);
                    }
                }
            }
        } else if (e.target.classList.contains('jdropdown-group-arrow')) {
            if (e.target.classList.contains('jdropdown-group-arrow-down')) {
                e.target.classList.remove('jdropdown-group-arrow-down');
                e.target.classList.add('jdropdown-group-arrow-up');
                e.target.parentNode.nextSibling.style.display = 'none';
            } else {
                e.target.classList.remove('jdropdown-group-arrow-up');
                e.target.classList.add('jdropdown-group-arrow-down');
                e.target.parentNode.nextSibling.style.display = '';
            }
        } else if (e.target.classList.contains('jdropdown-item')) {
            dropdown.selectItem(e.target);
        } else if (e.target.classList.contains('jdropdown-image')) {
            dropdown.selectItem(e.target.parentNode);
        } else if (e.target.classList.contains('jdropdown-description')) {
            dropdown.selectItem(e.target.parentNode);
        } else if (e.target.classList.contains('jdropdown-title')) {
            dropdown.selectItem(e.target.parentNode.parentNode);
        } else if (e.target.classList.contains('jdropdown-close') || e.target.classList.contains('jdropdown-backdrop')) {
            dropdown.close();
        }
    }
}

jSuites.dropdown.extractFromDom = function(el, options) {
    // Keep reference
    var select = el;
    if (! options) {
        options = {};
    }
    // Prepare configuration
    if (el.getAttribute('multiple') && (! options || options.multiple == undefined)) {
        options.multiple = true;
    }
    if (el.getAttribute('placeholder') && (! options || options.placeholder == undefined)) {
        options.placeholder = el.getAttribute('placeholder');
    }
    if (el.getAttribute('data-autocomplete') && (! options || options.autocomplete == undefined)) {
        options.autocomplete = true;
    }
    if (! options || options.width == undefined) {
        options.width = el.offsetWidth;
    }
    if (el.value && (! options || options.value == undefined)) {
        options.value = el.value;
    }
    if (! options || options.data == undefined) {
        options.data = [];
        for (var j = 0; j < el.children.length; j++) {
            if (el.children[j].tagName == 'OPTGROUP') {
                for (var i = 0; i < el.children[j].children.length; i++) {
                    options.data.push({
                        value: el.children[j].children[i].value,
                        text: el.children[j].children[i].innerHTML,
                        group: el.children[j].getAttribute('label'),
                    });
                }
            } else {
                options.data.push({
                    value: el.children[j].value,
                    text: el.children[j].innerHTML,
                });
            }
        }
    }
    if (! options || options.onchange == undefined) {
        options.onchange = function(a,b,c,d) {
            if (options.multiple == true) {
                if (obj.items[b].classList.contains('jdropdown-selected')) {
                    select.options[b].setAttribute('selected', 'selected');
                } else {
                    select.options[b].removeAttribute('selected');
                }
            } else {
                select.value = d;
            }
        }
    }
    // Create DIV
    var div = document.createElement('div');
    el.parentNode.insertBefore(div, el);
    el.style.display = 'none';
    el = div;

    return { el:el, options:options };
}

jSuites.editor = (function(el, options) {
    // New instance
    var obj = { type:'editor' };
    obj.options = {};

    // Default configuration
    var defaults = {
        // Initial HTML content
        value: null,
        // Initial snippet
        snippet: null,
        // Add toolbar
        toolbar: null,
        // Website parser is to read websites and images from cross domain
        remoteParser: null,
        // Placeholder
        placeholder: null,
        // Parse URL
        parseURL: false,
        filterPaste: true,
        // Accept drop files
        dropZone: false,
        dropAsSnippet: false,
        acceptImages: false,
        acceptFiles: false,
        maxFileSize: 5000000,
        allowImageResize: true,
        // Style
        border: true,
        padding: true,
        maxHeight: null,
        height: null,
        focus: false,
        // Events
        onclick: null,
        onfocus: null,
        onblur: null,
        onload: null,
        onkeyup: null,
        onkeydown: null,
        onchange: null,
    };

    // Loop through our object
    for (var property in defaults) {
        if (options && options.hasOwnProperty(property)) {
            obj.options[property] = options[property];
        } else {
            obj.options[property] = defaults[property];
        }
    }

    // Private controllers
    var imageResize = 0;
    var editorTimer = null;
    var editorAction = null;
    var files = [];

    // Make sure element is empty
    el.innerHTML = '';

    // Keep the reference for the container
    obj.el = el;

    if (typeof(obj.options.onclick) == 'function') {
        el.onclick = function(e) {
            obj.options.onclick(el, obj, e);
        }
    }

    // Prepare container
    el.classList.add('jeditor-container');

    // Padding
    if (obj.options.padding == true) {
        el.classList.add('jeditor-padding');
    }

    // Border
    if (obj.options.border == false) {
        el.style.border = '0px';
    }

    // Snippet
    var snippet = document.createElement('div');
    snippet.className = 'jsnippet';
    snippet.setAttribute('contenteditable', false);

    // Toolbar
    var toolbar = document.createElement('div');
    toolbar.className = 'jeditor-toolbar';

    // Create editor
    var editor = document.createElement('div');
    editor.setAttribute('contenteditable', true);
    editor.setAttribute('spellcheck', false);
    editor.className = 'jeditor';

    // Placeholder
    if (obj.options.placeholder) {
        editor.setAttribute('data-placeholder', obj.options.placeholder);
    }

    // Max height
    if (obj.options.maxHeight || obj.options.height) {
        editor.style.overflowY = 'auto';

        if (obj.options.maxHeight) {
            editor.style.maxHeight = obj.options.maxHeight;
        }
        if (obj.options.height) {
            editor.style.height = obj.options.height;
        }
    }

    // Set editor initial value
    if (obj.options.value) {
        var value = obj.options.value;
    } else {
        var value = el.innerHTML ? el.innerHTML : ''; 
    }

    if (! value) {
        var value = '';
    }

    /**
     * Onchange event controllers
     */
    var change = function(e) {
        if (typeof(obj.options.onchange) == 'function') { 
            obj.options.onchange(el, obj, e);
        }

        // Update value
        obj.options.value = obj.getData();

        // Lemonade JS
        if (el.value != obj.options.value) {
            el.value = obj.options.value;
            if (typeof(el.onchange) == 'function') {
                el.onchange({
                    type: 'change',
                    target: el,
                    value: el.value
                });
            }
        }
    }

    /**
     * Extract images from a HTML string
     */
    var extractImageFromHtml = function(html) {
        // Create temp element
        var div = document.createElement('div');
        div.innerHTML = html;

        // Extract images
        var img = div.querySelectorAll('img');

        if (img.length) {
            for (var i = 0; i < img.length; i++) {
                obj.addImage(img[i].src);
            }
        }
    }

    /**
     * Insert node at caret
     */
    var insertNodeAtCaret = function(newNode) {
        var sel, range;

        if (window.getSelection) {
            sel = window.getSelection();
            if (sel.rangeCount) {
                range = sel.getRangeAt(0);
                var selectedText = range.toString();
                range.deleteContents();
                range.insertNode(newNode); 
                // move the cursor after element
                range.setStartAfter(newNode);
                range.setEndAfter(newNode); 
                sel.removeAllRanges();
                sel.addRange(range);
            }
        }
    }

    var updateTotalImages = function() {
        var o = null;
        if (o = snippet.children[0]) {
            // Make sure is a grid
            if (! o.classList.contains('jslider-grid')) {
                o.classList.add('jslider-grid');
            }
            // Quantify of images
            var number = o.children.length;
            // Set the configuration of the grid
            o.setAttribute('data-number', number > 4 ? 4 : number);
            // Total of images inside the grid
            if (number > 4) {
                o.setAttribute('data-total', number - 4);
            } else {
                o.removeAttribute('data-total');
            }
        }
    }

    /**
     * Append image to the snippet
     */
    var appendImage = function(image) {
        if (! snippet.innerHTML) {
            appendElement({});
        }
        snippet.children[0].appendChild(image);
        updateTotalImages();
    }

    /**
     * Append snippet
     * @Param object data
     */
    var appendElement = function(data) {
        // Reset snippet
        snippet.innerHTML = '';

        // Attributes
        var a = [ 'image', 'title', 'description', 'host', 'url' ];

        for (var i = 0; i < a.length; i++) {
            var div = document.createElement('div');
            div.className = 'jsnippet-' + a[i];
            div.setAttribute('data-k', a[i]);
            snippet.appendChild(div);
            if (data[a[i]]) {
                if (a[i] == 'image') {
                    if (! Array.isArray(data.image)) {
                        data.image = [ data.image ];
                    }
                    for (var j = 0; j < data.image.length; j++) {
                        var img = document.createElement('img');
                        img.src = data.image[j];
                        div.appendChild(img);
                    }
                } else {
                    div.innerHTML = data[a[i]];
                }
            }
        }

        editor.appendChild(document.createElement('br'));
        editor.appendChild(snippet);
    }

    var verifyEditor = function() {
        clearTimeout(editorTimer);
        editorTimer = setTimeout(function() {
            var snippet = editor.querySelector('.jsnippet');
            if (! snippet) {
                var html = editor.innerHTML.replace(/\n/g, ' ');
                var container = document.createElement('div');
                container.innerHTML = html;
                var text = container.innerText; 
                var url = jSuites.editor.detectUrl(text);

                if (url) {
                    if (url[0].substr(-3) == 'jpg' || url[0].substr(-3) == 'png' || url[0].substr(-3) == 'gif') {
                         obj.addImage(url[0], true);
                    } else {
                        var id = jSuites.editor.youtubeParser(url[0]);
                        obj.parseWebsite(url[0], id);
                    }
                }
            }
        }, 1000);
    }

    obj.parseContent = function() {
        verifyEditor();
    }

    obj.parseWebsite = function(url, youtubeId) {
        if (! obj.options.remoteParser) {
            console.log('The remoteParser is not defined');
        } else {
            // Youtube definitions
            if (youtubeId) {
                var url = 'https://www.youtube.com/watch?v=' + youtubeId;
            }

            var p = {
                title: '',
                description: '',
                image: '',
                host: url.split('/')[2],
                url: url,
            }

            jSuites.ajax({
                url: obj.options.remoteParser + encodeURI(url.trim()),
                method: 'GET',
                dataType: 'json',
                success: function(result) {
                    // Get title
                    if (result.title) {
                        p.title = result.title;
                    }
                    // Description
                    if (result.description) {
                        p.description = result.description;
                    }
                    // Host
                    if (result.host) {
                        p.host = result.host;
                    }
                    // Url
                    if (result.url) {
                        p.url = result.url;
                    }
                    // Append snippet
                    appendElement(p);
                    // Add image
                    if (result.image) {
                        obj.addImage(result.image, true);
                    } else if (result['og:image']) {
                        obj.addImage(result['og:image'], true);
                    }
                }
            });
        }
    }

    /**
     * Set editor value
     */
    obj.setData = function(html) {
        editor.innerHTML = html;

        if (obj.options.focus) {
            jSuites.editor.setCursor(editor, true);
        }

        // Reset files container
        files = [];
    }

    obj.getFiles = function() {
        var f = editor.querySelectorAll('.jfile');
        var d = [];
        for (var i = 0; i < f.length; i++) {
            if (files[f[i].src]) {
                d.push(files[f[i].src]);
            }
        }
        return d;
    }

    obj.getText = function() {
        return editor.innerText;
    }

    /**
     * Get editor data
     */
    obj.getData = function(json) {
        if (! json) {
            var data = editor.innerHTML;
        } else {
            var data = {
                content : '',
            }

            // Get snippet
            if (snippet.innerHTML) {
                var index = 0;
                data.snippet = {};
                for (var i = 0; i < snippet.children.length; i++) {
                    // Get key from element
                    var key = snippet.children[i].getAttribute('data-k');
                    if (key) {
                        if (key == 'image') {
                            if (! data.snippet.image) {
                                data.snippet.image = [];
                            }
                            // Get all images
                            for (var j = 0; j < snippet.children[i].children.length; j++) {
                                data.snippet.image.push(snippet.children[i].children[j].getAttribute('src'))
                            }
                        } else {
                            data.snippet[key] = snippet.children[i].innerHTML;
                        }
                    }
                }
            }

            // Get files
            var f = Object.keys(files);
            if (f.length) {
                data.files = [];
                for (var i = 0; i < f.length; i++) {
                    data.files.push(files[f[i]]);
                }
            }

            // Get content
            var text = editor.innerHTML;
            text = text.replace(/<br>/g, "\n");
            text = text.replace(/<\/div>/g, "<\/div>\n");
            text = text.replace(/<(?:.|\n)*?>/gm, "");
            data.content = text.trim();
        }

        return data;
    }

    // Reset
    obj.reset = function() {
        editor.innerHTML = '';
        snippet.innerHTML = '';
        files = [];
    }

    obj.addPdf = function(data) {
        if (data.result.substr(0,4) != 'data') {
            console.error('Invalid source');
        } else {
            var canvas = document.createElement('canvas');
            canvas.width = 60;
            canvas.height = 60;

            var img = new Image();
            var ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

            canvas.toBlob(function(blob) {
                var newImage = document.createElement('img');
                newImage.src = window.URL.createObjectURL(blob);
                newImage.title = data.name;
                newImage.className = 'jfile pdf';

                files[newImage.src] = {
                    file: newImage.src,
                    extension: 'pdf',
                    content: data.result,
                }

                insertNodeAtCaret(newImage);
            });
        }
    }

    obj.addImage = function(src, asSnippet) {
        if (! src) {
            src = '';
        }

        if (src.substr(0,4) != 'data' && ! obj.options.remoteParser) {
            console.error('remoteParser not defined in your initialization');
        } else {
            // This is to process cross domain images
            if (src.substr(0,4) == 'data') {
                var extension = src.split(';')
                extension = extension[0].split('/');
                extension = extension[1];
            } else {
                var extension = src.substr(src.lastIndexOf('.') + 1);
                // Work for cross browsers
                src = obj.options.remoteParser + src;
            }

            var img = new Image();

            img.onload = function onload() {
                var canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;

                var ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

                canvas.toBlob(function(blob) {
                    var newImage = document.createElement('img');
                    newImage.src = window.URL.createObjectURL(blob);
                    newImage.classList.add('jfile');
                    newImage.setAttribute('tabindex', '900');
                    files[newImage.src] = {
                        file: newImage.src,
                        extension: extension,
                        content: canvas.toDataURL(),
                    }

                    if (obj.options.dropAsSnippet || asSnippet) {
                        appendImage(newImage);
                        // Just to understand the attachment is part of a snippet
                        files[newImage.src].snippet = true;
                    } else {
                        insertNodeAtCaret(newImage);
                    }

                    change();
                });
            };

            img.src = src;
        }
    }

    obj.addFile = function(files) {
        var reader = [];

        for (var i = 0; i < files.length; i++) {
            if (files[i].size > obj.options.maxFileSize) {
                alert('The file is too big');
            } else {
                // Only PDF or Images
                var type = files[i].type.split('/');

                if (type[0] == 'image') {
                    type = 1;
                } else if (type[1] == 'pdf') {
                    type = 2;
                } else {
                    type = 0;
                }

                if (type) {
                    // Create file
                    reader[i] = new FileReader();
                    reader[i].index = i;
                    reader[i].type = type;
                    reader[i].name = files[i].name;
                    reader[i].date = files[i].lastModified;
                    reader[i].size = files[i].size;
                    reader[i].addEventListener("load", function (data) {
                        // Get result
                        if (data.target.type == 2) {
                            if (obj.options.acceptFiles == true) {
                                obj.addPdf(data.target);
                            }
                        } else {
                            obj.addImage(data.target.result);
                        }
                    }, false);

                    reader[i].readAsDataURL(files[i])
                } else {
                    alert('The extension is not allowed');
                }
            }
        }
    }

    // Destroy
    obj.destroy = function() {
        editor.removeEventListener('mouseup', editorMouseUp);
        editor.removeEventListener('mousedown', editorMouseDown);
        editor.removeEventListener('mousemove', editorMouseMove);
        editor.removeEventListener('keyup', editorKeyUp);
        editor.removeEventListener('keydown', editorKeyDown);
        editor.removeEventListener('dragstart', editorDragStart);
        editor.removeEventListener('dragenter', editorDragEnter);
        editor.removeEventListener('dragover', editorDragOver);
        editor.removeEventListener('drop', editorDrop);
        editor.removeEventListener('paste', editorPaste);

        if (typeof(obj.options.onblur) == 'function') {
            editor.removeEventListener('blur', editorBlur);
        }
        if (typeof(obj.options.onfocus) == 'function') {
            editor.removeEventListener('focus', editorFocus);
        }

        el.editor = null;
        el.classList.remove('jeditor-container');

        toolbar.remove();
        snippet.remove();
        editor.remove();
    }

    var isLetter = function (str) {
        var regex = /([\u0041-\u005A\u0061-\u007A\u00AA\u00B5\u00BA\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0\u08A2-\u08AC\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097F\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C33\u0C35-\u0C39\u0C3D\u0C58\u0C59\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D60\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F4\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191C\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19C1-\u19C7\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FCC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA697\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA78E\uA790-\uA793\uA7A0-\uA7AA\uA7F8-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA80-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uABC0-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]+)/g;
        return str.match(regex) ? 1 : 0;
    }

    // Event handlers
    var editorMouseUp = function(e) {
        if (editorAction && editorAction.e) {
            editorAction.e.classList.remove('resizing');
        }

        editorAction = false;
    }

    var editorMouseDown = function(e) {
        var close = function(snippet) {
            var rect = snippet.getBoundingClientRect();
            if (rect.width - (e.clientX - rect.left) < 40 && e.clientY - rect.top < 40) {
                snippet.innerHTML = '';
                snippet.remove();
            }
        }

        if (e.target.tagName == 'IMG') {
            if (e.target.style.cursor) {
                var rect = e.target.getBoundingClientRect();
                editorAction = {
                    e: e.target,
                    x: e.clientX,
                    y: e.clientY,
                    w: rect.width,
                    h: rect.height,
                    d: e.target.style.cursor,
                }

                if (! e.target.width) {
                    e.target.width = rect.width + 'px';
                }

                if (! e.target.height) {
                    e.target.height = rect.height + 'px';
                }

                var s = window.getSelection();
                if (s.rangeCount) {
                    for (var i = 0; i < s.rangeCount; i++) {
                        s.removeRange(s.getRangeAt(i));
                    }
                }

                e.target.classList.add('resizing');
            } else {
                editorAction = true;
            }
        } else { 
            if (e.target.classList.contains('jsnippet')) {
                close(e.target);
            } else if (e.target.parentNode.classList.contains('jsnippet')) {
                close(e.target.parentNode);
            }

            editorAction = true;
        }
    }

    var editorMouseMove = function(e) {
        if (e.target.tagName == 'IMG' && ! e.target.parentNode.classList.contains('jsnippet-image') && obj.options.allowImageResize == true) {
            if (e.target.getAttribute('tabindex')) {
                var rect = e.target.getBoundingClientRect();
                if (e.clientY - rect.top < 5) {
                    if (rect.width - (e.clientX - rect.left) < 5) {
                        e.target.style.cursor = 'ne-resize';
                    } else if (e.clientX - rect.left < 5) {
                        e.target.style.cursor = 'nw-resize';
                    } else {
                        e.target.style.cursor = 'n-resize';
                    }
                } else if (rect.height - (e.clientY - rect.top) < 5) {
                    if (rect.width - (e.clientX - rect.left) < 5) {
                        e.target.style.cursor = 'se-resize';
                    } else if (e.clientX - rect.left < 5) {
                        e.target.style.cursor = 'sw-resize';
                    } else {
                        e.target.style.cursor = 's-resize';
                    }
                } else if (rect.width - (e.clientX - rect.left) < 5) {
                    e.target.style.cursor = 'e-resize';
                } else if (e.clientX - rect.left < 5) {
                    e.target.style.cursor = 'w-resize';
                } else {
                    e.target.style.cursor = '';
                }
            }
        }

        // Move
        if (e.which == 1 && editorAction && editorAction.d) {
            if (editorAction.d == 'e-resize' || editorAction.d == 'ne-resize' ||  editorAction.d == 'se-resize') {
                editorAction.e.width = (editorAction.w + (e.clientX - editorAction.x));

                if (e.shiftKey) {
                    var newHeight = (e.clientX - editorAction.x) * (editorAction.h / editorAction.w);
                    editorAction.e.height = editorAction.h + newHeight;
                } else {
                    var newHeight =  null;
                }
            }

            if (! newHeight) {
                if (editorAction.d == 's-resize' || editorAction.d == 'se-resize' || editorAction.d == 'sw-resize') {
                    if (! e.shiftKey) {
                        editorAction.e.height = editorAction.h + (e.clientY - editorAction.y);
                    }
                }
            }
        }
    }

    var editorKeyUp = function(e) {
        if (! editor.innerHTML) {
            editor.innerHTML = '<div><br></div>';
        }

        if (typeof(obj.options.onkeyup) == 'function') { 
            obj.options.onkeyup(el, obj, e);
        }
    }


    var editorKeyDown = function(e) {
        // Check for URL
        if (obj.options.parseURL == true) {
            verifyEditor();
        }

        if (typeof(obj.options.onkeydown) == 'function') { 
            obj.options.onkeydown(el, obj, e);
        }

        if (e.key == 'Delete') {
            if (e.target.tagName == 'IMG' && e.target.parentNode.classList.contains('jsnippet-image')) {
                e.target.remove();
                updateTotalImages();
            }
        }
    }

    // Elements to be removed
    var remove = [HTMLUnknownElement,HTMLAudioElement,HTMLEmbedElement,HTMLIFrameElement,HTMLTextAreaElement,HTMLInputElement,HTMLScriptElement];

    // Valid properties
    var validProperty = ['width', 'height', 'align', 'border', 'src', 'tabindex'];

    // Valid CSS attributes
    var validStyle = ['color', 'font-weight', 'font-size', 'background', 'background-color', 'margin'];

    var parse = function(element) {
       // Remove attributes
       if (element.attributes && element.attributes.length) {
           var image = null;
           var style = null;
           // Process style attribute
           var elementStyle = element.getAttribute('style');
           if (elementStyle) {
               style = [];
               var t = elementStyle.split(';');
               for (var j = 0; j < t.length; j++) {
                   var v = t[j].trim().split(':');
                   if (validStyle.indexOf(v[0].trim()) >= 0) {
                       var k = v.shift();
                       var v = v.join(':');
                       style.push(k + ':' + v);
                   }
               }
           }
           // Process image
           if (element.tagName.toUpperCase() == 'IMG') {
               if (! obj.options.acceptImages || ! element.src) {
                   element.parentNode.removeChild(element);
               } else {
                   // Check if is data
                   element.setAttribute('tabindex', '900');
                   // Check attributes for persistance
                   obj.addImage(element.src);
               }
           }
           // Remove attributes
           var attr = [];
           var numAttributes = element.attributes.length - 1;
           if (numAttributes > 0) {
               for (var i = numAttributes; i >= 0 ; i--) {
                   attr.push(element.attributes[i].name);
               }
               attr.forEach(function(v) {
                   if (validProperty.indexOf(v) == -1) {
                       element.removeAttribute(v);
                   }
               });
           }
           element.style = '';
           // Add valid style
           if (style && style.length) {
               element.setAttribute('style', style.join(';'));
           }
       }
       // Parse children
       if (element.children.length) {
           for (var i = 0; i < element.children.length; i++) {
               parse(element.children[i]);
           }
       }

       if (remove.indexOf(element.constructor) >= 0) {
           element.remove();
       }
    }

    var filter = function(data) {
        if (data) {
            data = data.replace(new RegExp('<!--(.*?)-->', 'gsi'), '');
        }
        var parser = new DOMParser();
        var d = parser.parseFromString(data, "text/html");
        parse(d);
        var span = document.createElement('span');
        span.innerHTML = d.firstChild.innerHTML;
        return span;
    } 

    var editorPaste = function(e) {
        if (obj.options.filterPaste == true) {
            if (e.clipboardData || e.originalEvent.clipboardData) {
                var html = (e.originalEvent || e).clipboardData.getData('text/html');
                var text = (e.originalEvent || e).clipboardData.getData('text/plain');
                var file = (e.originalEvent || e).clipboardData.files
            } else if (window.clipboardData) {
                var html = window.clipboardData.getData('Html');
                var text = window.clipboardData.getData('Text');
                var file = window.clipboardData.files
            }

            if (file.length) {
                // Paste a image from the clipboard
                obj.addFile(file);
            } else {
                if (! html) {
                    html = text.split('\r\n');
                    if (! e.target.innerText) {
                        html.map(function(v) {
                            var d = document.createElement('div');
                            d.innerText = v;
                            editor.appendChild(d);
                        });
                    } else {
                        html = html.map(function(v) {
                            return '<div>' + v + '</div>';
                        });
                        document.execCommand('insertHtml', false, html.join(''));
                    }
                } else {
                    var d = filter(html);
                    // Paste to the editor
                    //insertNodeAtCaret(d);
                    document.execCommand('insertHtml', false, d.innerHTML);
                }
            }

            e.preventDefault();
        }
    }

    var editorDragStart = function(e) {
        if (editorAction && editorAction.e) {
            e.preventDefault();
        }
    }

    var editorDragEnter = function(e) {
        if (editorAction || obj.options.dropZone == false) {
            // Do nothing
        } else {
            el.classList.add('jeditor-dragging');
            e.preventDefault();
        }
    }

    var editorDragOver = function(e) {
        if (editorAction || obj.options.dropZone == false) {
            // Do nothing
        } else {
            if (editorTimer) {
                clearTimeout(editorTimer);
            }

            editorTimer = setTimeout(function() {
                el.classList.remove('jeditor-dragging');
            }, 100);
            e.preventDefault();
        }
    }

    var editorDrop = function(e) {
        if (editorAction || obj.options.dropZone == false) {
            // Do nothing
        } else {
            // Position caret on the drop
            var range = null;
            if (document.caretRangeFromPoint) {
                range=document.caretRangeFromPoint(e.clientX, e.clientY);
            } else if (e.rangeParent) {
                range=document.createRange();
                range.setStart(e.rangeParent,e.rangeOffset);
            }
            var sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);
            sel.anchorNode.parentNode.focus();

            var html = (e.originalEvent || e).dataTransfer.getData('text/html');
            var text = (e.originalEvent || e).dataTransfer.getData('text/plain');
            var file = (e.originalEvent || e).dataTransfer.files;
    
            if (file.length) {
                obj.addFile(file);
            } else if (text) {
                extractImageFromHtml(html);
            }

            el.classList.remove('jeditor-dragging');
            e.preventDefault();
        }
    }

    var editorBlur = function(e) {
        // Blur
        if (typeof(obj.options.onblur) == 'function') {
            obj.options.onblur(el, obj, e);
        }

        change(e);
    }

    var editorFocus = function(e) {
        // Focus
        if (typeof(obj.options.onfocus) == 'function') {
            obj.options.onfocus(el, obj, e);
        }
    }

    editor.addEventListener('mouseup', editorMouseUp);
    editor.addEventListener('mousedown', editorMouseDown);
    editor.addEventListener('mousemove', editorMouseMove);
    editor.addEventListener('keyup', editorKeyUp);
    editor.addEventListener('keydown', editorKeyDown);
    editor.addEventListener('dragstart', editorDragStart);
    editor.addEventListener('dragenter', editorDragEnter);
    editor.addEventListener('dragover', editorDragOver);
    editor.addEventListener('drop', editorDrop);
    editor.addEventListener('paste', editorPaste);
    editor.addEventListener('focus', editorFocus);
    editor.addEventListener('blur', editorBlur);

    // Onload
    if (typeof(obj.options.onload) == 'function') {
        obj.options.onload(el, obj, editor);
    }

    // Set value to the editor
    editor.innerHTML = value;

    // Append editor to the containre
    el.appendChild(editor);

    // Snippet
    if (obj.options.snippet) {
        appendElement(obj.options.snippet);
    }

    // Default toolbar
    if (obj.options.toolbar == null) {
        obj.options.toolbar = jSuites.editor.getDefaultToolbar();
    }

    // Add toolbar
    if (obj.options.toolbar) {
        // Append to the DOM
        el.appendChild(toolbar);
        // Create toolbar
        jSuites.toolbar(toolbar, {
            container: true,
            responsive: true,
            items: obj.options.toolbar
        });
    }

    // Focus to the editor
    if (obj.options.focus) {
        jSuites.editor.setCursor(editor, obj.options.focus == 'initial' ? true : false);
    }

    // Change method
    el.change = obj.setData;

    // Global generic value handler
    el.val = function(val) {
        if (val === undefined) {
            // Data type
            var o = el.getAttribute('data-html') === 'true' ? false : true;
            return obj.getData(o);
        } else {
            obj.setData(val);
        }
    }

    el.editor = obj;

    return obj;
});

jSuites.editor.setCursor = function(element, first) {
    element.focus();
    document.execCommand('selectAll');
    var sel = window.getSelection();
    var range = sel.getRangeAt(0);
    if (first == true) {
        var node = range.startContainer;
        var size = 0;
    } else {
        var node = range.endContainer;
        var size = node.length;
    }
    range.setStart(node, size);
    range.setEnd(node, size);
    sel.removeAllRanges();
    sel.addRange(range);
}

jSuites.editor.getDomain = function(url) {
    return url.replace('http://','').replace('https://','').replace('www.','').split(/[/?#]/)[0].split(/:/g)[0];
}

jSuites.editor.detectUrl = function(text) {
    var expression = /(((https?:\/\/)|(www\.))[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|]+)/ig;
    var links = text.match(expression);

    if (links) {
        if (links[0].substr(0,3) == 'www') {
            links[0] = 'http://' + links[0];
        }
    }

    return links;
}

jSuites.editor.youtubeParser = function(url) {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    var match = url.match(regExp);

    return (match && match[7].length == 11) ? match[7] : false;
}

jSuites.editor.getDefaultToolbar = function() { 
    return [
        {
            content: 'undo',
            onclick: function() {
                document.execCommand('undo');
            }
        },
        {
            content: 'redo',
            onclick: function() {
                document.execCommand('redo');
            }
        },
        {
            type:'divisor'
        },
        {
            content: 'format_bold',
            onclick: function(a,b,c) {
                document.execCommand('bold');

                if (document.queryCommandState("bold")) {
                    c.classList.add('selected');
                } else {
                    c.classList.remove('selected');
                }
            }
        },
        {
            content: 'format_italic',
            onclick: function(a,b,c) {
                document.execCommand('italic');

                if (document.queryCommandState("italic")) {
                    c.classList.add('selected');
                } else {
                    c.classList.remove('selected');
                }
            }
        },
        {
            content: 'format_underline',
            onclick: function(a,b,c) {
                document.execCommand('underline');

                if (document.queryCommandState("underline")) {
                    c.classList.add('selected');
                } else {
                    c.classList.remove('selected');
                }
            }
        },
        {
            type:'divisor'
        },
        {
            content: 'format_list_bulleted',
            onclick: function(a,b,c) {
                document.execCommand('insertUnorderedList');

                if (document.queryCommandState("insertUnorderedList")) {
                    c.classList.add('selected');
                } else {
                    c.classList.remove('selected');
                }
            }
        },
        {
            content: 'format_list_numbered',
            onclick: function(a,b,c) {
                document.execCommand('insertOrderedList');

                if (document.queryCommandState("insertOrderedList")) {
                    c.classList.add('selected');
                } else {
                    c.classList.remove('selected');
                }
            }
        },
        {
            content: 'format_indent_increase',
            onclick: function(a,b,c) {
                document.execCommand('indent', true, null);

                if (document.queryCommandState("indent")) {
                    c.classList.add('selected');
                } else {
                    c.classList.remove('selected');
                }
            }
        },
        {
            content: 'format_indent_decrease',
            onclick: function() {
                document.execCommand('outdent');

                if (document.queryCommandState("outdent")) {
                    this.classList.add('selected');
                } else {
                    this.classList.remove('selected');
                }
            }
        }/*,
        {
            icon: ['format_align_left', 'format_align_right', 'format_align_center'],
            onclick: function() {
                document.execCommand('justifyCenter');

                if (document.queryCommandState("justifyCenter")) {
                    this.classList.add('selected');
                } else {
                    this.classList.remove('selected');
                }
            }
        }
        {
            type:'select',
            items: ['Verdana','Arial','Courier New'],
            onchange: function() {
            }
        },
        {
            type:'select',
            items: ['10px','12px','14px','16px','18px','20px','22px'],
            onchange: function() {
            }
        },
        {
            icon:'format_align_left',
            onclick: function() {
                document.execCommand('JustifyLeft');

                if (document.queryCommandState("JustifyLeft")) {
                    this.classList.add('selected');
                } else {
                    this.classList.remove('selected');
                }
            }
        },
        {
            icon:'format_align_center',
            onclick: function() {
                document.execCommand('justifyCenter');

                if (document.queryCommandState("justifyCenter")) {
                    this.classList.add('selected');
                } else {
                    this.classList.remove('selected');
                }
            }
        },
        {
            icon:'format_align_right',
            onclick: function() {
                document.execCommand('justifyRight');

                if (document.queryCommandState("justifyRight")) {
                    this.classList.add('selected');
                } else {
                    this.classList.remove('selected');
                }
            }
        },
        {
            icon:'format_align_justify',
            onclick: function() {
                document.execCommand('justifyFull');

                if (document.queryCommandState("justifyFull")) {
                    this.classList.add('selected');
                } else {
                    this.classList.remove('selected');
                }
            }
        },
        {
            icon:'format_list_bulleted',
            onclick: function() {
                document.execCommand('insertUnorderedList');

                if (document.queryCommandState("insertUnorderedList")) {
                    this.classList.add('selected');
                } else {
                    this.classList.remove('selected');
                }
            }
        }*/
    ];
}


jSuites.form = (function(el, options) {
    var obj = {};
    obj.options = {};

    // Default configuration
    var defaults = {
        url: null,
        message: 'Are you sure? There are unsaved information in your form',
        ignore: false,
        currentHash: null,
        submitButton:null,
        validations: null,
        onbeforeload: null,
        onload: null,
        onbeforesave: null,
        onsave: null,
        onbeforeremove: null,
        onremove: null,
        onerror: function(el, message) {
            jSuites.alert(message);
        }
    };

    // Loop through our object
    for (var property in defaults) {
        if (options && options.hasOwnProperty(property)) {
            obj.options[property] = options[property];
        } else {
            obj.options[property] = defaults[property];
        }
    }

    // Validations
    if (! obj.options.validations) {
        obj.options.validations = {};
    }

    // Submit Button
    if (! obj.options.submitButton) {
        obj.options.submitButton = el.querySelector('input[type=submit]');
    }

    if (obj.options.submitButton && obj.options.url) {
        obj.options.submitButton.onclick = function() {
            obj.save();
        }
    }

    if (! obj.options.validations.email) {
        obj.options.validations.email = jSuites.validations.email;
    }

    if (! obj.options.validations.length) {
        obj.options.validations.length = jSuites.validations.length;
    }

    if (! obj.options.validations.required) {
        obj.options.validations.required = jSuites.validations.required;
    }

    obj.setUrl = function(url) {
        obj.options.url = url;
    }

    obj.load = function() {
        jSuites.ajax({
            url: obj.options.url,
            method: 'GET',
            dataType: 'json',
            queue: true,
            success: function(data) {
                // Overwrite values from the backend
                if (typeof(obj.options.onbeforeload) == 'function') {
                    var ret = obj.options.onbeforeload(el, data);
                    if (ret) {
                        data = ret;
                    }
                }
                // Apply values to the form
                jSuites.form.setElements(el, data);
                // Onload methods
                if (typeof(obj.options.onload) == 'function') {
                    obj.options.onload(el, data);
                }
            }
        });
    }

    obj.save = function() {
        var test = obj.validate();

        if (test) {
            obj.options.onerror(el, test);
        } else {
            var data = jSuites.form.getElements(el, true);

            if (typeof(obj.options.onbeforesave) == 'function') {
                var data = obj.options.onbeforesave(el, data);

                if (data === false) {
                    return;
                }
            }

            jSuites.ajax({
                url: obj.options.url,
                method: 'POST',
                dataType: 'json',
                data: data,
                success: function(result) {
                    if (typeof(obj.options.onsave) == 'function') {
                        obj.options.onsave(el, data, result);
                    }
                }
            });
        }
    }

    obj.remove = function() {
        if (typeof(obj.options.onbeforeremove) == 'function') {
            var ret = obj.options.onbeforeremove(el, obj);
            if (ret === false) {
                return false;
            }
        }

        jSuites.ajax({
            url: obj.options.url,
            method: 'DELETE',
            dataType: 'json',
            success: function(result) {
                if (typeof(obj.options.onremove) == 'function') {
                    obj.options.onremove(el, obj, result);
                }

                obj.reset();
            }
        });
    }

    var addError = function(element) {
        // Add error in the element
        element.classList.add('error');
        // Submit button
        if (obj.options.submitButton) {
            obj.options.submitButton.setAttribute('disabled', true);
        }
        // Return error message
        var error = element.getAttribute('data-error') || 'There is an error in the form';
        element.setAttribute('title', error);
        return error;
    }

    var delError = function(element) {
        var error = false;
        // Remove class from this element
        element.classList.remove('error');
        element.removeAttribute('title');
        // Get elements in the form
        var elements = el.querySelectorAll("input, select, textarea, div[name]");
        // Run all elements 
        for (var i = 0; i < elements.length; i++) {
            if (elements[i].getAttribute('data-validation')) {
                if (elements[i].classList.contains('error')) {
                    error = true;
                }
            }
        }

        if (obj.options.submitButton) {
            if (error) {
                obj.options.submitButton.setAttribute('disabled', true);
            } else {
                obj.options.submitButton.removeAttribute('disabled');
            }
        }
    }

    obj.validateElement = function(element) {
        // Test results
        var test = false;
        // Value
        var value = jSuites.form.getValue(element);
        // Validation
        var validation = element.getAttribute('data-validation');
        // Parse
        if (typeof(obj.options.validations[validation]) == 'function' && ! obj.options.validations[validation](value, element)) {
            // Not passed in the test
            test = addError(element);
        } else {
            if (element.classList.contains('error')) {
                delError(element);
            }
        }

        return test;
    }

    obj.reset = function() {
        // Get elements in the form
        var name = null;
        var elements = el.querySelectorAll("input, select, textarea, div[name]");
        // Run all elements 
        for (var i = 0; i < elements.length; i++) {
            if (name = elements[i].getAttribute('name')) {
                if (elements[i].type == 'checkbox' || elements[i].type == 'radio') {
                    elements[i].checked = false;
                } else {
                    if (typeof(elements[i].val) == 'function') {
                        elements[i].val('');
                    } else {
                        elements[i].value = '';
                    }
                }
            }
        }
    }

    // Run form validation
    obj.validate = function() {
        var test = [];
        // Get elements in the form
        var elements = el.querySelectorAll("input, select, textarea, div[name]");
        // Run all elements 
        for (var i = 0; i < elements.length; i++) {
            // Required
            if (elements[i].getAttribute('data-validation')) {
                var res = obj.validateElement(elements[i]);
                if (res) {
                    test.push(res);
                }
            }
        }
        if (test.length > 0) {
            return test.join('<br>');
        } else {
            return false;
        }
    }

    // Check the form
    obj.getError = function() {
        // Validation
        return obj.validation() ? true : false;
    }

    // Return the form hash
    obj.setHash = function() {
        return obj.getHash(jSuites.form.getElements(el));
    }

    // Get the form hash
    obj.getHash = function(str) {
        var hash = 0, i, chr;

        if (str.length === 0) {
            return hash;
        } else {
            for (i = 0; i < str.length; i++) {
              chr = str.charCodeAt(i);
              hash = ((hash << 5) - hash) + chr;
              hash |= 0;
            }
        }

        return hash;
    }

    // Is there any change in the form since start tracking?
    obj.isChanged = function() {
        var hash = obj.setHash();
        return (obj.options.currentHash != hash);
    }

    // Restart tracking
    obj.resetTracker = function() {
        obj.options.currentHash = obj.setHash();
        obj.options.ignore = false;
    }

    // Ignore flag
    obj.setIgnore = function(ignoreFlag) {
        obj.options.ignore = ignoreFlag ? true : false;
    }

    // Start tracking in one second
    setTimeout(function() {
        obj.options.currentHash = obj.setHash();
    }, 1000);

    // Validations
    el.addEventListener("keyup", function(e) {
        if (e.target.getAttribute('data-validation')) {
            obj.validateElement(e.target);
        }
    });

    // Alert
    if (! jSuites.form.hasEvents) {
        window.addEventListener("beforeunload", function (e) {
            if (obj.isChanged() && obj.options.ignore == false) {
                var confirmationMessage =  obj.options.message? obj.options.message : "\o/";

                if (confirmationMessage) {
                    if (typeof e == 'undefined') {
                        e = window.event;
                    }

                    if (e) {
                        e.returnValue = confirmationMessage;
                    }

                    return confirmationMessage;
                } else {
                    return void(0);
                }
            }
        });

        jSuites.form.hasEvents = true;
    }

    el.form = obj;

    return obj;
});

// Get value from one element
jSuites.form.getValue = function(element) {
    var value = null;
    if (element.type == 'checkbox') {
        if (element.checked == true) {
            value = element.value || true;
        }
    } else if (element.type == 'radio') {
        if (element.checked == true) {
            value = element.value;
        }
    } else if (element.type == 'file') {
        value = element.files;
    } else if (element.tagName == 'select' && element.multiple == true) {
        value = [];
        var options = element.querySelectorAll("options[selected]");
        for (var j = 0; j < options.length; j++) {
            value.push(options[j].value);
        }
    } else if (typeof(element.val) == 'function') {
        value = element.val();
    } else {
        value = element.value || '';
    }

    return value;
}

// Get form elements
jSuites.form.getElements = function(el, asArray) {
    var data = {};
    var name = null;
    var elements = el.querySelectorAll("input, select, textarea, div[name]");

    for (var i = 0; i < elements.length; i++) {
        if (name = elements[i].getAttribute('name')) {
            data[name] = jSuites.form.getValue(elements[i]) || '';
        }
    }

    return asArray == true ? data : JSON.stringify(data);
}

//Get form elements
jSuites.form.setElements = function(el, data) {
    var name = null;
    var value = null;
    var elements = el.querySelectorAll("input, select, textarea, div[name]");
    for (var i = 0; i < elements.length; i++) {
        // Attributes
        var type = elements[i].getAttribute('type');
        if (name = elements[i].getAttribute('name')) {
            // Transform variable names in pathname
            name = name.replace(new RegExp(/\[(.*?)\]/ig), '.$1');
            value = null;
            // Seach for the data in the path
            if (name.match(/\./)) {
                var tmp = jSuites.path.call(data, name) || '';
                if (typeof(tmp) !== 'undefined') {
                    value = tmp;
                }
            } else {
                if (typeof(data[name]) !== 'undefined') {
                    value = data[name];
                }
            }
            // Set the values
            if (value !== null) {
                if (type == 'checkbox' || type == 'radio') {
                    elements[i].checked = value ? true : false;
                } else if (type == 'file') {
                    // Do nothing
                } else {
                    if (typeof (elements[i].val) == 'function') {
                        elements[i].val(value);
                    } else {
                        elements[i].value = value;
                    }
                }
            }
        }
    }
}

// Legacy
jSuites.tracker = jSuites.form;

jSuites.focus = function(el) {
    if (el.innerText.length) {
        var range = document.createRange();
        var sel = window.getSelection();
        var node = el.childNodes[el.childNodes.length-1];
        range.setStart(node, node.length)
        range.collapse(true)
        sel.removeAllRanges()
        sel.addRange(range)
        el.scrollLeft = el.scrollWidth;
    }
}

jSuites.isNumeric = (function (num) {
    return !isNaN(num) && num !== null && num !== '';
});

jSuites.guid = function() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

jSuites.getNode = function() {
    var node = document.getSelection().anchorNode;
    if (node) {
        return (node.nodeType == 3 ? node.parentNode : node);
    } else {
        return null;
    }
}
/**
 * Generate hash from a string
 */
jSuites.hash = function(str) {
    var hash = 0, i, chr;

    if (str.length === 0) {
        return hash;
    } else {
        for (i = 0; i < str.length; i++) {
            chr = str.charCodeAt(i);
            if (chr > 32) {
                hash = ((hash << 5) - hash) + chr;
                hash |= 0;
            }
        }
    }
    return hash;
}

/**
 * Generate a random color
 */
jSuites.randomColor = function(h) {
    var lum = -0.25;
    var hex = String('#' + Math.random().toString(16).slice(2, 8).toUpperCase()).replace(/[^0-9a-f]/gi, '');
    if (hex.length < 6) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    var rgb = [], c, i;
    for (i = 0; i < 3; i++) {
        c = parseInt(hex.substr(i * 2, 2), 16);
        c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
        rgb.push(("00" + c).substr(c.length));
    }

    // Return hex
    if (h == true) {
        return '#' + jSuites.two(rgb[0].toString(16)) + jSuites.two(rgb[1].toString(16)) + jSuites.two(rgb[2].toString(16));
    }

    return rgb;
}

jSuites.getWindowWidth = function() {
    var w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0],
    x = w.innerWidth || e.clientWidth || g.clientWidth;
    return x;
}

jSuites.getWindowHeight = function() {
    var w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0],
    y = w.innerHeight|| e.clientHeight|| g.clientHeight;
    return  y;
}

jSuites.getPosition = function(e) {
    if (e.changedTouches && e.changedTouches[0]) {
        var x = e.changedTouches[0].pageX;
        var y = e.changedTouches[0].pageY;
    } else {
        var x = (window.Event) ? e.pageX : e.clientX + (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft);
        var y = (window.Event) ? e.pageY : e.clientY + (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);
    }

    return [ x, y ];
}

jSuites.click = function(el) {
    if (el.click) {
        el.click();
    } else {
        var evt = new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
            view: window
        });
        el.dispatchEvent(evt);
    }
}

jSuites.findElement = function(element, condition) {
    var foundElement = false;

    function path (element) {
        if (element && ! foundElement) {
            if (typeof(condition) == 'function') {
                foundElement = condition(element)
            } else if (typeof(condition) == 'string') {
                if (element.classList && element.classList.contains(condition)) {
                    foundElement = element;
                }
            }
        }

        if (element.parentNode && ! foundElement) {
            path(element.parentNode);
        }
    }

    path(element);

    return foundElement;
}

// Two digits
jSuites.two = function(value) {
    value = '' + value;
    if (value.length == 1) {
        value = '0' + value;
    }
    return value;
}

jSuites.sha512 = (function(str) {
    function int64(msint_32, lsint_32) {
        this.highOrder = msint_32;
        this.lowOrder = lsint_32;
    }

    var H = [new int64(0x6a09e667, 0xf3bcc908), new int64(0xbb67ae85, 0x84caa73b),
        new int64(0x3c6ef372, 0xfe94f82b), new int64(0xa54ff53a, 0x5f1d36f1),
        new int64(0x510e527f, 0xade682d1), new int64(0x9b05688c, 0x2b3e6c1f),
        new int64(0x1f83d9ab, 0xfb41bd6b), new int64(0x5be0cd19, 0x137e2179)];

    var K = [new int64(0x428a2f98, 0xd728ae22), new int64(0x71374491, 0x23ef65cd),
        new int64(0xb5c0fbcf, 0xec4d3b2f), new int64(0xe9b5dba5, 0x8189dbbc),
        new int64(0x3956c25b, 0xf348b538), new int64(0x59f111f1, 0xb605d019),
        new int64(0x923f82a4, 0xaf194f9b), new int64(0xab1c5ed5, 0xda6d8118),
        new int64(0xd807aa98, 0xa3030242), new int64(0x12835b01, 0x45706fbe),
        new int64(0x243185be, 0x4ee4b28c), new int64(0x550c7dc3, 0xd5ffb4e2),
        new int64(0x72be5d74, 0xf27b896f), new int64(0x80deb1fe, 0x3b1696b1),
        new int64(0x9bdc06a7, 0x25c71235), new int64(0xc19bf174, 0xcf692694),
        new int64(0xe49b69c1, 0x9ef14ad2), new int64(0xefbe4786, 0x384f25e3),
        new int64(0x0fc19dc6, 0x8b8cd5b5), new int64(0x240ca1cc, 0x77ac9c65),
        new int64(0x2de92c6f, 0x592b0275), new int64(0x4a7484aa, 0x6ea6e483),
        new int64(0x5cb0a9dc, 0xbd41fbd4), new int64(0x76f988da, 0x831153b5),
        new int64(0x983e5152, 0xee66dfab), new int64(0xa831c66d, 0x2db43210),
        new int64(0xb00327c8, 0x98fb213f), new int64(0xbf597fc7, 0xbeef0ee4),
        new int64(0xc6e00bf3, 0x3da88fc2), new int64(0xd5a79147, 0x930aa725),
        new int64(0x06ca6351, 0xe003826f), new int64(0x14292967, 0x0a0e6e70),
        new int64(0x27b70a85, 0x46d22ffc), new int64(0x2e1b2138, 0x5c26c926),
        new int64(0x4d2c6dfc, 0x5ac42aed), new int64(0x53380d13, 0x9d95b3df),
        new int64(0x650a7354, 0x8baf63de), new int64(0x766a0abb, 0x3c77b2a8),
        new int64(0x81c2c92e, 0x47edaee6), new int64(0x92722c85, 0x1482353b),
        new int64(0xa2bfe8a1, 0x4cf10364), new int64(0xa81a664b, 0xbc423001),
        new int64(0xc24b8b70, 0xd0f89791), new int64(0xc76c51a3, 0x0654be30),
        new int64(0xd192e819, 0xd6ef5218), new int64(0xd6990624, 0x5565a910),
        new int64(0xf40e3585, 0x5771202a), new int64(0x106aa070, 0x32bbd1b8),
        new int64(0x19a4c116, 0xb8d2d0c8), new int64(0x1e376c08, 0x5141ab53),
        new int64(0x2748774c, 0xdf8eeb99), new int64(0x34b0bcb5, 0xe19b48a8),
        new int64(0x391c0cb3, 0xc5c95a63), new int64(0x4ed8aa4a, 0xe3418acb),
        new int64(0x5b9cca4f, 0x7763e373), new int64(0x682e6ff3, 0xd6b2b8a3),
        new int64(0x748f82ee, 0x5defb2fc), new int64(0x78a5636f, 0x43172f60),
        new int64(0x84c87814, 0xa1f0ab72), new int64(0x8cc70208, 0x1a6439ec),
        new int64(0x90befffa, 0x23631e28), new int64(0xa4506ceb, 0xde82bde9),
        new int64(0xbef9a3f7, 0xb2c67915), new int64(0xc67178f2, 0xe372532b),
        new int64(0xca273ece, 0xea26619c), new int64(0xd186b8c7, 0x21c0c207),
        new int64(0xeada7dd6, 0xcde0eb1e), new int64(0xf57d4f7f, 0xee6ed178),
        new int64(0x06f067aa, 0x72176fba), new int64(0x0a637dc5, 0xa2c898a6),
        new int64(0x113f9804, 0xbef90dae), new int64(0x1b710b35, 0x131c471b),
        new int64(0x28db77f5, 0x23047d84), new int64(0x32caab7b, 0x40c72493),
        new int64(0x3c9ebe0a, 0x15c9bebc), new int64(0x431d67c4, 0x9c100d4c),
        new int64(0x4cc5d4be, 0xcb3e42b6), new int64(0x597f299c, 0xfc657e2a),
        new int64(0x5fcb6fab, 0x3ad6faec), new int64(0x6c44198c, 0x4a475817)];

    var W = new Array(64);
    var a, b, c, d, e, f, g, h, i, j;
    var T1, T2;
    var charsize = 8;

    function utf8_encode(str) {
        return unescape(encodeURIComponent(str));
    }

    function str2binb(str) {
        var bin = [];
        var mask = (1 << charsize) - 1;
        var len = str.length * charsize;
    
        for (var i = 0; i < len; i += charsize) {
            bin[i >> 5] |= (str.charCodeAt(i / charsize) & mask) << (32 - charsize - (i % 32));
        }
    
        return bin;
    }

    function binb2hex(binarray) {
        var hex_tab = "0123456789abcdef";
        var str = "";
        var length = binarray.length * 4;
        var srcByte;

        for (var i = 0; i < length; i += 1) {
            srcByte = binarray[i >> 2] >> ((3 - (i % 4)) * 8);
            str += hex_tab.charAt((srcByte >> 4) & 0xF) + hex_tab.charAt(srcByte & 0xF);
        }

        return str;
    }

    function safe_add_2(x, y) {
        var lsw, msw, lowOrder, highOrder;

        lsw = (x.lowOrder & 0xFFFF) + (y.lowOrder & 0xFFFF);
        msw = (x.lowOrder >>> 16) + (y.lowOrder >>> 16) + (lsw >>> 16);
        lowOrder = ((msw & 0xFFFF) << 16) | (lsw & 0xFFFF);

        lsw = (x.highOrder & 0xFFFF) + (y.highOrder & 0xFFFF) + (msw >>> 16);
        msw = (x.highOrder >>> 16) + (y.highOrder >>> 16) + (lsw >>> 16);
        highOrder = ((msw & 0xFFFF) << 16) | (lsw & 0xFFFF);

        return new int64(highOrder, lowOrder);
    }

    function safe_add_4(a, b, c, d) {
        var lsw, msw, lowOrder, highOrder;

        lsw = (a.lowOrder & 0xFFFF) + (b.lowOrder & 0xFFFF) + (c.lowOrder & 0xFFFF) + (d.lowOrder & 0xFFFF);
        msw = (a.lowOrder >>> 16) + (b.lowOrder >>> 16) + (c.lowOrder >>> 16) + (d.lowOrder >>> 16) + (lsw >>> 16);
        lowOrder = ((msw & 0xFFFF) << 16) | (lsw & 0xFFFF);

        lsw = (a.highOrder & 0xFFFF) + (b.highOrder & 0xFFFF) + (c.highOrder & 0xFFFF) + (d.highOrder & 0xFFFF) + (msw >>> 16);
        msw = (a.highOrder >>> 16) + (b.highOrder >>> 16) + (c.highOrder >>> 16) + (d.highOrder >>> 16) + (lsw >>> 16);
        highOrder = ((msw & 0xFFFF) << 16) | (lsw & 0xFFFF);

        return new int64(highOrder, lowOrder);
    }

    function safe_add_5(a, b, c, d, e) {
        var lsw, msw, lowOrder, highOrder;

        lsw = (a.lowOrder & 0xFFFF) + (b.lowOrder & 0xFFFF) + (c.lowOrder & 0xFFFF) + (d.lowOrder & 0xFFFF) + (e.lowOrder & 0xFFFF);
        msw = (a.lowOrder >>> 16) + (b.lowOrder >>> 16) + (c.lowOrder >>> 16) + (d.lowOrder >>> 16) + (e.lowOrder >>> 16) + (lsw >>> 16);
        lowOrder = ((msw & 0xFFFF) << 16) | (lsw & 0xFFFF);

        lsw = (a.highOrder & 0xFFFF) + (b.highOrder & 0xFFFF) + (c.highOrder & 0xFFFF) + (d.highOrder & 0xFFFF) + (e.highOrder & 0xFFFF) + (msw >>> 16);
        msw = (a.highOrder >>> 16) + (b.highOrder >>> 16) + (c.highOrder >>> 16) + (d.highOrder >>> 16) + (e.highOrder >>> 16) + (lsw >>> 16);
        highOrder = ((msw & 0xFFFF) << 16) | (lsw & 0xFFFF);

        return new int64(highOrder, lowOrder);
    }

    function maj(x, y, z) {
        return new int64(
            (x.highOrder & y.highOrder) ^ (x.highOrder & z.highOrder) ^ (y.highOrder & z.highOrder),
            (x.lowOrder & y.lowOrder) ^ (x.lowOrder & z.lowOrder) ^ (y.lowOrder & z.lowOrder)
        );
    }

    function ch(x, y, z) {
        return new int64(
            (x.highOrder & y.highOrder) ^ (~x.highOrder & z.highOrder),
            (x.lowOrder & y.lowOrder) ^ (~x.lowOrder & z.lowOrder)
        );
    }

    function rotr(x, n) {
        if (n <= 32) {
            return new int64(
             (x.highOrder >>> n) | (x.lowOrder << (32 - n)),
             (x.lowOrder >>> n) | (x.highOrder << (32 - n))
            );
        } else {
            return new int64(
             (x.lowOrder >>> n) | (x.highOrder << (32 - n)),
             (x.highOrder >>> n) | (x.lowOrder << (32 - n))
            );
        }
    }

    function sigma0(x) {
        var rotr28 = rotr(x, 28);
        var rotr34 = rotr(x, 34);
        var rotr39 = rotr(x, 39);

        return new int64(
            rotr28.highOrder ^ rotr34.highOrder ^ rotr39.highOrder,
            rotr28.lowOrder ^ rotr34.lowOrder ^ rotr39.lowOrder
        );
    }

    function sigma1(x) {
        var rotr14 = rotr(x, 14);
        var rotr18 = rotr(x, 18);
        var rotr41 = rotr(x, 41);

        return new int64(
            rotr14.highOrder ^ rotr18.highOrder ^ rotr41.highOrder,
            rotr14.lowOrder ^ rotr18.lowOrder ^ rotr41.lowOrder
        );
    }

    function gamma0(x) {
        var rotr1 = rotr(x, 1), rotr8 = rotr(x, 8), shr7 = shr(x, 7);

        return new int64(
            rotr1.highOrder ^ rotr8.highOrder ^ shr7.highOrder,
            rotr1.lowOrder ^ rotr8.lowOrder ^ shr7.lowOrder
        );
    }

    function gamma1(x) {
        var rotr19 = rotr(x, 19);
        var rotr61 = rotr(x, 61);
        var shr6 = shr(x, 6);

        return new int64(
            rotr19.highOrder ^ rotr61.highOrder ^ shr6.highOrder,
            rotr19.lowOrder ^ rotr61.lowOrder ^ shr6.lowOrder
        );
    }

    function shr(x, n) {
        if (n <= 32) {
            return new int64(
                x.highOrder >>> n,
                x.lowOrder >>> n | (x.highOrder << (32 - n))
            );
        } else {
            return new int64(
                0,
                x.highOrder << (32 - n)
            );
        }
    }

    var str = utf8_encode(str);
    var strlen = str.length*charsize;
    str = str2binb(str);

    str[strlen >> 5] |= 0x80 << (24 - strlen % 32);
    str[(((strlen + 128) >> 10) << 5) + 31] = strlen;

    for (var i = 0; i < str.length; i += 32) {
        a = H[0];
        b = H[1];
        c = H[2];
        d = H[3];
        e = H[4];
        f = H[5];
        g = H[6];
        h = H[7];

        for (var j = 0; j < 80; j++) {
            if (j < 16) {
                W[j] = new int64(str[j*2 + i], str[j*2 + i + 1]);
            } else {
                W[j] = safe_add_4(gamma1(W[j - 2]), W[j - 7], gamma0(W[j - 15]), W[j - 16]);
            }

            T1 = safe_add_5(h, sigma1(e), ch(e, f, g), K[j], W[j]);
            T2 = safe_add_2(sigma0(a), maj(a, b, c));
            h = g;
            g = f;
            f = e;
            e = safe_add_2(d, T1);
            d = c;
            c = b;
            b = a;
            a = safe_add_2(T1, T2);
        }

        H[0] = safe_add_2(a, H[0]);
        H[1] = safe_add_2(b, H[1]);
        H[2] = safe_add_2(c, H[2]);
        H[3] = safe_add_2(d, H[3]);
        H[4] = safe_add_2(e, H[4]);
        H[5] = safe_add_2(f, H[5]);
        H[6] = safe_add_2(g, H[6]);
        H[7] = safe_add_2(h, H[7]);
    }

    var binarray = [];
    for (var i = 0; i < H.length; i++) {
        binarray.push(H[i].highOrder);
        binarray.push(H[i].lowOrder);
    }

    return binb2hex(binarray);
});

if (! jSuites.login) {
    jSuites.login = {};
    jSuites.login.sha512 = jSuites.sha512;
}

jSuites.image = jSuites.upload = (function(el, options) {
    var obj = {};
    obj.options = {};

    // Default configuration
    var defaults = {
        type: 'image',
        extension: '*',
        input: false,
        minWidth: false,
        maxWidth: null,
        maxHeight: null,
        maxJpegSizeBytes: null, // For example, 350Kb would be 350000
        onchange: null,
        multiple: false,
        remoteParser: null,
        text:{
            extensionNotAllowed:'The extension is not allowed',
        }
    };

    // Loop through our object
    for (var property in defaults) {
        if (options && options.hasOwnProperty(property)) {
            obj.options[property] = options[property];
        } else {
            obj.options[property] = defaults[property];
        }
    }

    // Multiple
    if (obj.options.multiple == true) {
        el.setAttribute('data-multiple', true);
    }

    // Container
    el.content = [];

    // Upload icon
    el.classList.add('jupload');

    if (obj.options.input == true) {
        el.classList.add('input');
    }

    obj.add = function(data) {
        // Reset container for single files
        if (obj.options.multiple == false) {
            el.content = [];
            el.innerText = '';
        }

        // Append to the element
        if (obj.options.type == 'image') {
            var img = document.createElement('img');
            img.setAttribute('src', data.file);
            img.setAttribute('tabindex', -1);
            if (! el.getAttribute('name')) {
                img.className = 'jfile';
                img.content = data;
            }
            el.appendChild(img);
        } else {
            if (data.name) {
                var name = data.name;
            } else {
                var name = data.file;
            }
            var div = document.createElement('div');
            div.innerText = name || obj.options.type;
            div.classList.add('jupload-item');
            div.setAttribute('tabindex', -1);
            el.appendChild(div);
        }

        if (data.content) {
            data.file = jSuites.guid();
        }

        // Push content
        el.content.push(data);

        // Onchange
        if (typeof(obj.options.onchange) == 'function') {
            obj.options.onchange(el, data);
        }
    }

    obj.addFromFile = function(file) {
        var type = file.type.split('/');
        if (type[0] == obj.options.type) {
            var readFile = new FileReader();
            readFile.addEventListener("load", function (v) {
                var data = {
                    file: v.srcElement.result,
                    extension: file.name.substr(file.name.lastIndexOf('.') + 1),
                    name: file.name,
                    size: file.size,
                    lastmodified: file.lastModified,
                    content: v.srcElement.result,
                }

                obj.add(data);
            });

            readFile.readAsDataURL(file);
        } else {
            alert(obj.options.text.extensionNotAllowed);
        }
    }

    obj.addFromUrl = function(src) {
        if (src.substr(0,4) != 'data' && ! obj.options.remoteParser) {
            console.error('remoteParser not defined in your initialization');
        } else {
            // This is to process cross domain images
            if (src.substr(0,4) == 'data') {
                var extension = src.split(';')
                extension = extension[0].split('/');
                var type = extension[0].replace('data:','');
                if (type == obj.options.type) {
                    var data = {
                        file: src,
                        name: '',
                        extension: extension[1],
                        content: src,
                    }
                    obj.add(data);
                } else {
                    alert(obj.options.text.extensionNotAllowed);
                }
            } else {
                var extension = src.substr(src.lastIndexOf('.') + 1);
                // Work for cross browsers
                src = obj.options.remoteParser + src;
                // Get remove content
                jSuites.ajax({
                    url: src,
                    type: 'GET',
                    dataType: 'blob',
                    success: function(data) {
                        //add(extension[0].replace('data:',''), data);
                    }
                })
            }
        }
    }

    var getDataURL = function(canvas, type) {
        var compression = 0.92;
        var lastContentLength = null;
        var content = canvas.toDataURL(type, compression);
        while (obj.options.maxJpegSizeBytes && type === 'image/jpeg' &&
               content.length > obj.options.maxJpegSizeBytes && content.length !== lastContentLength) {
            // Apply the compression
            compression *= 0.9;
            lastContentLength = content.length;
            content = canvas.toDataURL(type, compression);
        }
        return content;
    }

    var mime = obj.options.type + '/' + obj.options.extension;
    var input = document.createElement('input');
    input.type = 'file';
    input.setAttribute('accept', mime);
    input.onchange = function() {
        for (var i = 0; i < this.files.length; i++) {
            obj.addFromFile(this.files[i]);
        }
    }

    // Allow multiple files
    if (obj.options.multiple == true) {
        input.setAttribute('multiple', true);
    }

    var current = null;

    el.addEventListener("click", function(e) {
        current = null;
        if (! el.children.length || e.target === el) {
            jSuites.click(input);
        } else {
            if (e.target.parentNode == el) {
                current = e.target;
            }
        }
    });

    el.addEventListener("dblclick", function(e) {
        jSuites.click(input);
    });

    el.addEventListener('dragenter', function(e) {
        el.style.border = '1px dashed #000';
    });

    el.addEventListener('dragleave', function(e) {
        el.style.border = '1px solid #eee';
    });

    el.addEventListener('dragstop', function(e) {
        el.style.border = '1px solid #eee';
    });

    el.addEventListener('dragover', function(e) {
        e.preventDefault();
    });

    el.addEventListener('keydown', function(e) {
        if (current && e.which == 46) {
            var index = Array.prototype.indexOf.call(el.children, current);
            if (index >= 0) {
                el.content.splice(index, 1);
                current.remove();
                current = null;
            }
        }
    });

    el.addEventListener('drop', function(e) {
        e.preventDefault();  
        e.stopPropagation();

        var html = (e.originalEvent || e).dataTransfer.getData('text/html');
        var file = (e.originalEvent || e).dataTransfer.files;

        if (file.length) {
            for (var i = 0; i < e.dataTransfer.files.length; i++) {
                obj.addFromFile(e.dataTransfer.files[i]);
            }
        } else if (html) {
            if (obj.options.multiple == false) {
                el.innerText = '';
            }

            // Create temp element
            var div = document.createElement('div');
            div.innerHTML = html;

            // Extract images
            var img = div.querySelectorAll('img');

            if (img.length) {
                for (var i = 0; i < img.length; i++) {
                    obj.addFromUrl(img[i].src);
                }
            }
        }

        el.style.border = '1px solid #eee';

        return false;
    });

    el.val = function(val) {
        if (val === undefined) {
            return el.content && el.content.length ? el.content : null;
        } else {
            // Reset
            el.innerText = '';
            el.content = [];

            if (val) {
                if (Array.isArray(val)) {
                    for (var i = 0; i < val.length; i++) {
                        if (typeof(val[i]) == 'string') {
                            obj.add({ file: val[i] });
                        } else {
                            obj.add(val[i]);
                        }
                    }
                } else if (typeof(val) == 'string') {
                    obj.add({ file: val });
                }
            }
        }
    }

    el.upload = el.image = obj;

    return obj;
});

jSuites.image.create = function(data) {
    var img = document.createElement('img');
    img.setAttribute('src', data.file);
    img.className = 'jfile';
    img.setAttribute('tabindex', -1);
    img.content = data;

    return img;
}


jSuites.lazyLoading = (function(el, options) {
    var obj = {}

    // Mandatory options
    if (! options.loadUp || typeof(options.loadUp) != 'function') {
        options.loadUp = function() {
            return false;
        }
    }
    if (! options.loadDown || typeof(options.loadDown) != 'function') {
        options.loadDown = function() {
            return false;
        }
    }
    // Timer ms
    if (! options.timer) {
        options.timer = 100;
    }

    // Timer
    var timeControlLoading = null;

    // Controls
    var scrollControls = function(e) {
        if (timeControlLoading == null) {
            var event = false;
            var scrollTop = el.scrollTop;
            if (el.scrollTop + (el.clientHeight * 2) >= el.scrollHeight) {
                if (options.loadDown()) {
                    if (scrollTop == el.scrollTop) {
                        el.scrollTop = el.scrollTop - (el.clientHeight);
                    }
                    event = true;
                }
            } else if (el.scrollTop <= el.clientHeight) {
                if (options.loadUp()) {
                    if (scrollTop == el.scrollTop) {
                        el.scrollTop = el.scrollTop + (el.clientHeight);
                    }
                    event = true;
                }
            }

            timeControlLoading = setTimeout(function() {
                timeControlLoading = null;
            }, options.timer);

            if (event) {
                if (typeof(options.onupdate) == 'function') {
                    options.onupdate();
                }
            }
        }
    }

    // Onscroll
    el.onscroll = function(e) {
        scrollControls(e);
    }

    el.onwheel = function(e) {
        scrollControls(e);
    }

    return obj;
});

jSuites.loading = (function() {
    var obj = {};

    var loading = null;

    obj.show = function() {
        if (! loading) {
            loading = document.createElement('div');
            loading.className = 'jloading';
        }
        document.body.appendChild(loading);
    }

    obj.hide = function() {
        if (loading && loading.parentNode) {
            document.body.removeChild(loading);
        }
    }

    return obj;
})();

jSuites.mask = (function() {
    // Currency 
    var tokens = {
        // Currency tokens
        currency: [ '#(.{1})##0?(.{1}0+)?( ?;(.*)?)?', '#' ],
        // Percentage
        percentage: [ '0{1}(.{1}0+)?%' ],
        // Number
        numeric: [ '0{1}(.{1}0+)?' ],
        // Data tokens
        datetime: [ 'YYYY', 'YYY', 'YY', 'MMMMM', 'MMMM', 'MMM', 'MM', 'DDDDD', 'DDDD', 'DDD', 'DD', 'DY', 'DAY', 'WD', 'D', 'Q', 'HH24', 'HH12', 'HH', '\\[H\\]', 'H', 'AM/PM', 'PM', 'AM', 'MI', 'SS', 'MS', 'MONTH', 'MON', 'Y', 'M' ],
        // Other
        general: [ 'A', '0', '[0-9a-zA-Z\$]+', '.']
    }

    var getDate = function() {
        if (this.mask.toLowerCase().indexOf('[h]') !== -1) {
            var m = 0;
            if (this.date[4]) {
                m = parseFloat(this.date[4] / 60);
            }
            var v = parseInt(this.date[3]) + m;
            v /= 24;
        } else if (! (this.date[0] && this.date[1] && this.date[2]) && (this.date[3] || this.date[4])) {
            v = jSuites.two(this.date[3]) + ':' + jSuites.two(this.date[4]) + ':' + jSuites.two(this.date[5]) 
        } else {
            if (this.date[0] && this.date[1] && ! this.date[2]) {
                this.date[2] = 1;
            }
            v = jSuites.two(this.date[0]) + '-' + jSuites.two(this.date[1]) + '-' + jSuites.two(this.date[2]);

            if (this.date[3] || this.date[4] || this.date[5]) {
                v += ' ' + jSuites.two(this.date[3]) + ':' + jSuites.two(this.date[4]) + ':' + jSuites.two(this.date[5]);
            }
        }

        return v;
    }

    var isBlank = function(v) {
        return v === null || v === '' || v === undefined ? true : false;
    }

    var isFormula = function(value) {
        return (''+value).chartAt(0) == '=';
    }

    var isNumeric = function(t) {
        return t === 'currency' || t === 'percentage' || t === 'numeric' ? true : false;
    }
    /**
     * Get the decimal defined in the mask configuration
     */
    var getDecimal = function(v) {
        if (v && Number(v) == v) {
            return '.';
        } else {
            if (this.options.decimal) {
                return this.options.decimal;
            } else {
                if (this.locale) {
                    var t = Intl.NumberFormat(this.locale).format(1.1);
                    return this.options.decimal = t[1];
                } else {
                    if (! v) {
                        v  = this.mask;
                    }
                    var e = new RegExp('0{1}(.{1})0+', 'ig');
                    var t = e.exec(v);
                    if (t && t[1] && t[1].length == 1) {
                        // Save decimal
                        this.options.decimal = t[1];
                        // Return decimal
                        return t[1];
                    } else {
                        // Did not find any decimal last resort the default
                        var e = new RegExp('#,##', 'ig');
                        if ((v && v.match(e)) || '1.1'.toLocaleString().substring(1,2) == ',') {
                            this.options.decimal = ',';
                        } else {
                            this.options.decimal = '.';
                        }
                    }
                }
            }
        }

        if (this.options.decimal) {
            return this.options.decimal;
        } else {
            return null;
        }
    }

    var ParseValue = function(v, decimal) {
        if (v == '') {
            return '';
        }

        // Get decimal
        if (! decimal) {
            decimal = getDecimal.call(this);
        }

        // New value
        v = (''+v).split(decimal);
        v[0] = v[0].match(/[\-0-9]+/g, '');
        if (v[0]) {
            v[0] = v[0].join('');
        }
        if (v[0] || v[1]) {
            if (v[1] !== undefined) {
                v[1] = v[1].match(/[0-9]+/g, '');
                if (v[1]) {
                    v[1] = v[1].join('');
                } else {
                    v[1] = '';
                }
            }
        } else {
            return '';
        }

        return v;
    }

    var FormatValue = function(v) {
        if (v == '') {
            return '';
        }
        // Get decimal
        var d = getDecimal.call(this);
        // Convert value
        var o = this.options;
        // Parse value
        v = ParseValue.call(this, v);
        if (v == '') {
            return '';
        }
        // Temporary value
        if (v[0]) {
            var t = parseFloat(v.join('.'));
            if (o.style == 'percent') {
                t /= 100;
            }
        } else {
            var t = null;
        }
        var n = new Intl.NumberFormat(this.locale, o).format(t);
        n = n.split(d);
        if (typeof(n[1]) !== 'undefined') {
            var s = n[1].replace(/[0-9]*/g, '');
            if (s) {
                n[2] = s;
            }
        }

        if (v[1] !== undefined) {
            n[1] = d + v[1];
        } else {
            n[1] = '';
        }

        return n.join('');
    }

    var Format = function(e) {
        var v = Value.call(e);
        if (! v) {
            return;
        }

        // Get decimal
        var d = getDecimal.call(this);
        var n = FormatValue.call(this, v);
        var t = (n.length) - v.length;
        var index = Caret.call(e) + t;
        // Set value and update caret
        Value.call(e, n, index, true);
    }

    var Extract = function(v) {
        // Keep the raw value
        var current = ParseValue.call(this, v);
        if (current) {
            return parseFloat(current.join('.'));
        }
        return null;
    }

    /**
     * Caret getter and setter methods
     */
    var Caret = function(index, adjustNumeric) {
        if (index === undefined) {
            if (this.tagName == 'DIV') {
                var pos = 0;
                var s = window.getSelection();
                if (s) {
                    if (s.rangeCount !== 0) {
                        var r = s.getRangeAt(0);
                        var p = r.cloneRange();
                        p.selectNodeContents(this);
                        p.setEnd(r.endContainer, r.endOffset);
                        pos = p.toString().length;
                    }
                }
                return pos;
            } else {
                return this.selectionStart;
            }
        } else {
            // Get the current value
            var n = Value.call(this);

            // Review the position
            if (adjustNumeric) {
                var p = null;
                for (var i = 0; i < n.length; i++) {
                    if (n[i].match(/[\-0-9]/g) || n[i] == '.' || n[i] == ',') {  
                        p = i;
                    }
                }

                // If the string has no numbers
                if (p === null) {
                    p = n.indexOf(' ');
                }

                if (index >= p) {
                    index = p + 1;
                }
            }

            // Do not update caret
            if (index > n.length) {
                index = n.length;
            }

            if (index) {
                // Set caret
                if (this.tagName == 'DIV') {
                    var s = window.getSelection();
                    var r = document.createRange();
                    r.setStart(this.childNodes[0], index);
                    s.removeAllRanges();
                    s.addRange(r);
                } else {
                    this.selectionStart = index;
                    this.selectionEnd = index;
                }
            }
        }
    }

    /**
     * Value getter and setter method
     */
    var Value = function(v, updateCaret, adjustNumeric) {
        if (this.tagName == 'DIV') {
            if (v === undefined) {
                return this.innerText;
            } else {
                if (this.innerText !== v) {
                    this.innerText = v;

                    if (updateCaret) {
                        Caret.call(this, updateCaret, adjustNumeric);
                    }
                }
            }
        } else {
            if (v === undefined) {
                return this.value;
            } else {
                if (this.value !== v) {
                    this.value = v;
                    if (updateCaret) {
                        Caret.call(this, updateCaret, adjustNumeric);
                    }
                }
            }
        }
    }

    // Labels
    var weekDaysFull = jSuites.calendar.weekdays;
    var weekDays = jSuites.calendar.weekdaysShort;
    var monthsFull = jSuites.calendar.months;
    var months = jSuites.calendar.monthsShort;

    var parser = {
        'YEAR': function(v, s) {
            var y = ''+new Date().getFullYear();

            if (typeof(this.values[this.index]) === 'undefined') {
                this.values[this.index] = '';
            }
            if (parseInt(v) >= 0 && parseInt(v) <= 10) {
                if (this.values[this.index].length < s) {
                    this.values[this.index] += v;
                }
            }
            if (this.values[this.index].length == s) {
                if (s == 2) {
                    var y = y.substr(0,2) + this.values[this.index];
                } else if (s == 3) {
                    var y = y.substr(0,1) + this.values[this.index];
                } else if (s == 4) {
                    var y = this.values[this.index];
                }
                this.date[0] = y;
                this.index++;
            }
        },
        'YYYY': function(v) {
            parser.YEAR.call(this, v, 4);
        },
        'YYY': function(v) {
            parser.YEAR.call(this, v, 3);
        },
        'YY': function(v) {
            parser.YEAR.call(this, v, 2);
        },
        'FIND': function(v, a) {
            if (isBlank(this.values[this.index])) {
                this.values[this.index] = '';
            }
            var pos = 0;
            var count = 0;
            var value = (this.values[this.index] + v).toLowerCase();
            for (var i = 0; i < a.length; i++) {
                if (a[i].toLowerCase().indexOf(value) == 0) {
                    pos = i;
                    count++;
                }
            }
            if (count > 1) {
                this.values[this.index] += v;
            } else if (count == 1) {
                // Jump number of chars
                var t = (a[pos].length - this.values[this.index].length) - 1;
                this.position += t;

                this.values[this.index] = a[pos];
                this.index++;
                return pos;
            }
        },
        'MMM': function(v) {
            var ret = parser.FIND.call(this, v, months);
            if (ret !== undefined) {
                this.date[1] = ret + 1;
            }
        },
        'MMMM': function(v) {
            var ret = parser.FIND.call(this, v, monthsFull);
            if (ret !== undefined) {
                this.date[1] = ret + 1;
            }
        },
        'MMMMM': function(v) {
            if (isBlank(this.values[this.index])) {
                this.values[this.index] = '';
            }
            var pos = 0;
            var count = 0;
            var value = (this.values[this.index] + v).toLowerCase();
            for (var i = 0; i < monthsFull.length; i++) {
                if (monthsFull[i][0].toLowerCase().indexOf(value) == 0) {
                    this.values[this.index] = monthsFull[i][0];
                    this.date[1] = i + 1;
                    this.index++;
                    break;
                }
            }
        },
        'MM': function(v) {
            if (isBlank(this.values[this.index])) {
                if (parseInt(v) > 1 && parseInt(v) < 10) {
                    this.date[1] = this.values[this.index] = '0' + v;
                    this.index++;
                } else if (parseInt(v) < 2) {
                    this.values[this.index] = v;
                }
            } else {
                if (this.values[this.index] == 1 && parseInt(v) < 3) {
                    this.date[1] = this.values[this.index] += v;
                    this.index++;
                } else if (this.values[this.index] == 0 && parseInt(v) > 0 && parseInt(v) < 10) {
                    this.date[1] = this.values[this.index] += v;
                    this.index++;
                }
            }
        },
        'M': function(v) {
            var test = false;
            if (parseInt(v) >= 0 && parseInt(v) < 10) {
                if (isBlank(this.values[this.index])) {
                    this.values[this.index] = v;
                    if (v > 1) {
                        this.date[1] = this.values[this.index];
                        this.index++;
                    }
                } else {
                    if (this.values[this.index] == 1 && parseInt(v) < 3) {
                        this.date[1] = this.values[this.index] += v;
                        this.index++;
                    } else if (this.values[this.index] == 0 && parseInt(v) > 0) {
                        this.date[1] = this.values[this.index] += v;
                        this.index++;
                    } else {
                        var test = true;
                    }
                }
            } else {
                var test = true;
            }

            // Re-test
            if (test == true) {
                var t = parseInt(this.values[this.index]);
                if (t > 0 && t < 12) {
                    this.date[2] = this.values[this.index];
                    this.index++;
                    // Repeat the character
                    this.position--;
                }
            }
        },
        'D': function(v) {
            var test = false;
            if (parseInt(v) >= 0 && parseInt(v) < 10) {
                if (isBlank(this.values[this.index])) {
                    this.values[this.index] = v;
                    if (parseInt(v) > 3) {
                        this.date[2] = this.values[this.index];
                        this.index++;
                    }
                } else {
                    if (this.values[this.index] == 3 && parseInt(v) < 2) {
                        this.date[2] = this.values[this.index] += v;
                        this.index++;
                    } else if (this.values[this.index] == 1 || this.values[this.index] == 2) {
                        this.date[2] = this.values[this.index] += v;
                        this.index++;
                    } else if (this.values[this.index] == 0 && parseInt(v) > 0) {
                        this.date[2] = this.values[this.index] += v;
                        this.index++;
                    } else {
                        var test = true;
                    }
                }
            } else {
                var test = true;
            }

            // Re-test
            if (test == true) {
                var t = parseInt(this.values[this.index]);
                if (t > 0 && t < 32) {
                    this.date[2] = this.values[this.index];
                    this.index++;
                    // Repeat the character
                    this.position--;
                }
            }
        },
        'DD': function(v) {
            if (isBlank(this.values[this.index])) {
                if (parseInt(v) > 3 && parseInt(v) < 10) {
                    this.date[2] = this.values[this.index] = '0' + v;
                    this.index++;
                } else if (parseInt(v) < 10) {
                    this.values[this.index] = v;
                }
            } else {
                if (this.values[this.index] == 3 && parseInt(v) < 2) {
                    this.date[2] = this.values[this.index] += v;
                    this.index++;
                } else if ((this.values[this.index] == 1 || this.values[this.index] == 2) && parseInt(v) < 10) {
                    this.date[2] = this.values[this.index] += v;
                    this.index++;
                } else if (this.values[this.index] == 0 && parseInt(v) > 0 && parseInt(v) < 10) {
                    this.date[2] = this.values[this.index] += v;
                    this.index++;
                }
            }
        },
        'DDD': function(v) {
            parser.FIND.call(this, v, weekDays);
        },
        'DDDD': function(v) {
            parser.FIND.call(this, v, weekDaysFull);
        },
        'HH12': function(v, two) {
            if (isBlank(this.values[this.index])) {
                if (parseInt(v) > 1 && parseInt(v) < 10) {
                    if (two) {
                        v = 0 + v;
                    }
                    this.date[3] = this.values[this.index] = v;
                    this.index++;
                } else if (parseInt(v) < 10) {
                    this.values[this.index] = v;
                }
            } else {
                if (this.values[this.index] == 1 && parseInt(v) < 3) {
                    this.date[3] = this.values[this.index] += v;
                    this.index++;
                } else if (this.values[this.index] < 1 && parseInt(v) < 10) {
                    this.date[3] = this.values[this.index] += v;
                    this.index++;
                }
            }
        },
        'HH24': function(v, two) {
            var test = false;
            if (parseInt(v) >= 0 && parseInt(v) < 10) {
                if (this.values[this.index] == null || this.values[this.index] == '') {
                    if (parseInt(v) > 2 && parseInt(v) < 10) {
                        if (two) {
                            v = 0 + v;
                        }
                        this.date[3] = this.values[this.index] = v;
                        this.index++;
                    } else if (parseInt(v) < 10) {
                        this.values[this.index] = v;
                    }
                } else {
                    if (this.values[this.index] == 2 && parseInt(v) < 4) {
                        this.date[3] = this.values[this.index] += v;
                        this.index++;
                    } else if (this.values[this.index] < 2 && parseInt(v) < 10) {
                        this.date[3] = this.values[this.index] += v;
                        this.index++;
                    }
                }
            }
        },
        'HH': function(v) {
            parser['HH24'].call(this, v, 1);
        },
        'H': function(v) {
            parser['HH24'].call(this, v, 0);
        },
        '\\[H\\]': function(v) {
            if (this.values[this.index] == undefined) {
                this.values[this.index] = '';
            }
            if (v.match(/[0-9]/g)) {
                this.date[3] = this.values[this.index] += v;
            } else {
                if (this.values[this.index].match(/[0-9]/g)) {
                    this.date[3] = this.values[this.index];
                    this.index++;
                    // Repeat the character
                    this.position--;
                }
            }
        },
        'N60': function(v, i) {
            if (this.values[this.index] == null || this.values[this.index] == '') {
                if (parseInt(v) > 5 && parseInt(v) < 10) {
                    this.date[i] = this.values[this.index] = '0' + v;
                    this.index++;
                } else if (parseInt(v) < 10) {
                    this.values[this.index] = v;
                }
            } else {
                if (parseInt(v) < 10) {
                    this.date[i] = this.values[this.index] += v;
                    this.index++;
                 }
            }
        },
        'MI': function(v) {
            parser.N60.call(this, v, 4);
        },
        'SS': function(v) {
            parser.N60.call(this, v, 5);
        },
        'AM/PM': function(v) {
            this.values[this.index] = '';
            if (v) {
                if (this.date[3] > 12) {
                    this.values[this.index] = 'PM';
                } else {
                    this.values[this.index] = 'AM';
                }
            }
            this.index++;
        },
        'WD': function(v) {
            if (typeof(this.values[this.index]) === 'undefined') {
                this.values[this.index] = '';
            }
            if (parseInt(v) >= 0 && parseInt(v) < 7) {
                this.values[this.index] = v;
            }
            if (this.value[this.index].length == 1) {
                this.index++;
            }
        },
        '0{1}(.{1}0+)?': function(v) {
            // Get decimal
            var decimal = getDecimal.call(this);
            // Negative number
            var neg = false;
            // Create if is blank
            if (isBlank(this.values[this.index])) {
                this.values[this.index] = '';
            } else {
                if (this.values[this.index] == '-') {
                    neg = true;
                }
            }
            var current = ParseValue.call(this, this.values[this.index], decimal);
            if (current) {
                this.values[this.index] = current.join(decimal);
            }
            // New entry
            if (parseInt(v) >= 0 && parseInt(v) < 10) {
                if (this.values[this.index] != '0' || v == decimal) {
                    this.values[this.index] += v;
                }
            } else if (decimal && v == decimal) {
                if (this.values[this.index].indexOf(decimal) == -1) {
                    if (! this.values[this.index]) {
                        this.values[this.index] = '0';
                    }
                    this.values[this.index] += v;
                }
            } else if (v == '-') {
                // Negative signed
                neg = true;
            }

            if (neg === true && this.values[this.index][0] !== '-') {
                this.values[this.index] = '-' + this.values[this.index];
            }
        },
        '0{1}(.{1}0+)?%': function(v) {
            parser['0{1}(.{1}0+)?'].call(this, v);

            if (this.values[this.index].match(/[\-0-9]/g)) {
                if (this.values[this.index] && this.values[this.index].indexOf('%') == -1) {
                    this.values[this.index] += '%';
                }
            } else {
                this.values[this.index] = '';
            }
        },
        '#(.{1})##0?(.{1}0+)?( ?;(.*)?)?': function(v) {
            // Parse number
            parser['0{1}(.{1}0+)?'].call(this, v);
            // Get decimal
            var decimal = getDecimal.call(this);
            // Get separator
            var separator = this.tokens[this.index].substr(1,1);
            // Negative
            var negative = this.values[this.index][0] === '-' ? true : false;
            // Current value
            var current = ParseValue.call(this, this.values[this.index], decimal);

            // Get main and decimal parts
            if (current !== '') {
                // Format number
                var n = current[0].match(/[0-9]/g);
                if (n) {
                    // Format
                    n = n.join('');
                    var t = [];
                    var s = 0;
                    for (var j = n.length - 1; j >= 0 ; j--) {
                        t.push(n[j]);
                        s++;
                        if (! (s % 3)) {
                            t.push(separator);
                        }
                    }
                    t = t.reverse();
                    current[0] = t.join('');
                    if (current[0].substr(0,1) == separator) {
                        current[0] = current[0].substr(1);
                    }
                } else {
                    current[0] = '';
                }

                // Value
                this.values[this.index] = current.join(decimal);

                // Negative
                if (negative) {
                    this.values[this.index] = '-' + this.values[this.index];
                }
            }
        },
        '0': function(v) {
            if (v.match(/[0-9]/g)) {
                this.values[this.index] = v;
                this.index++;
            }
        },
        '[0-9a-zA-Z$]+': function(v) {
            if (isBlank(this.values[this.index])) {
                this.values[this.index] = '';
            }
            var t = this.tokens[this.index];
            var s = this.values[this.index];
            var i = s.length;

            if (t[i] == v) {
                this.values[this.index] += v;

                if (this.values[this.index] == t) {
                    this.index++;
                }
            } else {
                this.values[this.index] = t;
                this.index++;

                if (v.match(/[\-0-9]/g)) {
                    // Repeat the character
                    this.position--;
                }
            }
        },
        'A': function(v) {
            if (v.match(/[a-zA-Z]/gi)) {
                this.values[this.index] = v;
                this.index++;
            }
        },
        '.': function(v) {
            parser['[0-9a-zA-Z$]+'].call(this, v);
        }
    }

    /**
     * Get the tokens in the mask string
     */
    var getTokens = function(str) {
        if (this.type == 'general') {
            var t = [].concat(tokens.general);
        } else {
            var t = [].concat(tokens.currency, tokens.datetime, tokens.percentage, tokens.numeric, tokens.general);
        }
        // Expression to extract all tokens from the string
        var e = new RegExp(t.join('|'), 'gi');
        // Extract
        return str.match(e);
    }

    /**
     * Get the method of one given token
     */
    var getMethod = function(str) {
        if (! this.type) {
            var types = Object.keys(tokens);
        } else if (this.type == 'general') {
            var types = [ 'general' ];
        } else if (this.type == 'datetime') {
            var types = [ 'numeric', 'datetime', 'general' ];
        } else {
            var types = [ 'currency', 'percentage', 'numeric', 'general' ];
        }

        // Found
        for (var i = 0; i < types.length; i++) {
            var type = types[i];
            for (var j = 0; j < tokens[type].length; j++) {
                var e = new RegExp(tokens[type][j], 'gi');
                var r = str.match(e);
                if (r) {
                    return { type: type, method: tokens[type][j] }
                }
            }
        }
    }

    /**
     * Identify each method for each token
     */
    var getMethods = function(t) {
        var result = [];
        for (var i = 0; i < t.length; i++) {
            var m = getMethod.call(this, t[i]);
            if (m) {
                result.push(m.method);
            } else {
                result.push(null);
            }
        }

        // Compatibility with excel
        for (var i = 0; i < result.length; i++) {
            if (result[i] == 'MM') {
                // Not a month, correct to minutes
                if (result[i-1] && result[i-1].indexOf('H') >= 0) {
                    result[i] = 'MI';
                } else if (result[i-2] && result[i-2].indexOf('H') >= 0) {
                    result[i] = 'MI';
                } else if (result[i+1] && result[i+1].indexOf('S') >= 0) {
                    result[i] = 'MI';
                } else if (result[i+2] && result[i+2].indexOf('S') >= 0) {
                    result[i] = 'MI';
                }
            }
        }

        return result;
    }

    /**
     * Get the type for one given token
     */
    var getType = function(str) {
        var m = getMethod.call(this, str);
        if (m) {
            var type = m.type;
        }

        if (type) {
            var numeric = 0;
            // Make sure the correct type
            var t = getTokens.call(this, str);
            for (var i = 0; i < t.length; i++) {
                m = getMethod.call(this, t[i]);
                if (m && isNumeric(m.type)) {
                    numeric++;
                }
            }
            if (numeric > 1) {
                type = 'general';
            }
        }

        return type;
    }

    /**
     * Parse character per character using the detected tokens in the mask
     */
    var parse = function() {
        // Parser method for this position
        if (typeof(parser[this.methods[this.index]]) == 'function') {
            parser[this.methods[this.index]].call(this, this.value[this.position]);
            this.position++;
        } else {
            this.values[this.index] = this.tokens[this.index];
            this.index++;
        }
    }

    var isFormula = function(value) {
        var v = (''+value)[0];
        return v == '=' ? true : false;
    }

    var toPlainString = function(num) {
        return (''+ +num).replace(/(-?)(\d*)\.?(\d*)e([+-]\d+)/,
          function(a,b,c,d,e) {
            return e < 0
              ? b + '0.' + Array(1-e-c.length).join(0) + c + d
              : b + c + d + Array(e-d.length+1).join(0);
          });
    }

    /**
     * Mask function
     * @param {mixed|string} JS input or a string to be parsed
     * @param {object|string} When the first param is a string, the second is the mask or object with the mask options
     */
    var obj = function(e, config, returnObject) {
        // Options
        var r = null;
        var t = null;
        var o = {
            // Element
            input: null,
            // Current value
            value: null,
            // Mask options
            options: {},
            // New values for each token found
            values: [],
            // Token position
            index: 0,
            // Character position
            position: 0,
            // Date raw values
            date: [0,0,0,0,0,0],
            // Raw number for the numeric values
            number: 0,
        }

        // This is a JavaScript Event
        if (typeof(e) == 'object') {
            // Element
            o.input = e.target;
            // Current value
            o.value = Value.call(e.target);
            // Current caret position
            o.caret = Caret.call(e.target);
            // Mask
            if (t = e.target.getAttribute('data-mask')) {
                o.mask = t;
            }
            // Type
            if (t = e.target.getAttribute('data-type')) {
                o.type = t;
            }
            // Options
            if (e.target.mask) {
                if (e.target.mask.options) {
                    o.options = e.target.mask.options;
                }
                if (e.target.mask.locale) {
                    o.locale = e.target.mask.locale;
                }
            } else {
                // Locale
                if (t = e.target.getAttribute('data-locale')) {
                    o.locale = t;
                    if (o.mask) {
                        o.options.style = o.mask;
                    }
                }
            }
            // Extra configuration
            if (e.target.attributes && e.target.attributes.length) {
                for (var i = 0; i < e.target.attributes.length; i++) {
                    var k = e.target.attributes[i].name;
                    var v = e.target.attributes[i].value;
                    if (k.substr(0,4) == 'data') {
                        o.options[k.substr(5)] = v;
                    }
                }
            }
        } else {
            // Options
            if (typeof(config) == 'string') {
                // Mask
                o.mask = config;
            } else {
                // Mask
                var k = Object.keys(config);
                for (var i = 0; i < k.length; i++) {
                    o[k[i]] = config[k[i]];
                }
            }

            if (typeof(e) === 'number') {
                // Get decimal
                getDecimal.call(o, o.mask);
                // Replace to the correct decimal
                e = (''+e).replace('.', o.options.decimal);
            }

            // Current
            o.value = e;

            if (o.input) {
                // Value
                Value.call(o.input, e);
                // Focus
                jSuites.focus(o.input);
                // Caret
                o.caret = Caret.call(o.input);
            }
        }

        // Mask detected start the process
        if (! isFormula(o.value) && (o.mask || o.locale)) {
            // Compatibility ixes
            if (o.mask) {
                // Legacy
                o.mask = o.mask.replace('[-]', '');
                // Excel mask TODO: Improve
                if (o.mask.indexOf('##') !== -1) {
                    var d = o.mask.split(';');
                    if (d[0]) {
                        d[0] = d[0].replace('*', '');
                        d[0] = d[0].replace(/_/g, '');
                        d[0] = d[0].replace(/-/g, '');
                        d[0] = d[0].replace('(','');
                        d[0] = d[0].replace(')','');
                        d[0] = d[0].replace('##0.###','##0.000');
                        d[0] = d[0].replace('##0.##','##0.00');
                        d[0] = d[0].replace('##0.#','##0.0');
                    }
                    o.mask = d[0];
                }
                // Get type
                if (! o.type) {
                    o.type = getType.call(o, o.mask);
                }
                // Get tokens
                o.tokens = getTokens.call(o, o.mask);
            }
            // On new input
            if (typeof(e) !== 'object' || ! e.inputType || e.inputType == 'insertText' || e.inputType == 'insertFromPaste') {
                // Start tranformation
                if (o.locale) {
                    if (o.input) {
                        Format.call(o, o.input);
                    } else {
                        var newValue = FormatValue.call(o, o.value);
                    }
                } else {
                    // Get tokens
                    o.methods = getMethods.call(o, o.tokens);
                    // Go through all tokes
                    while (o.position < o.value.length && typeof(o.tokens[o.index]) !== 'undefined') {
                        // Get the approate parser
                        parse.call(o);
                    }

                    if (isNumeric(o.type)) {
                        // Complement things in the end of the mask
                        while (typeof(o.tokens[o.index]) !== 'undefined') {
                            var t = getMethod.call(o, o.tokens[o.index]);
                            if (t && t.type == 'general') {
                                o.values[o.index] = o.tokens[o.index];
                            }
                            o.index++;
                        }

                        var adjustNumeric = true;
                    } else {
                        var adjustNumeric = false;
                    }

                    // New value
                    var newValue = o.values.join('');

                    // Reset value
                    if (o.input) {
                        t = newValue.length - o.value.length;
                        if (t > 0) {
                            var caret = o.caret + t;
                        } else {
                            var caret = o.caret;
                        }
                        Value.call(o.input, newValue, caret, adjustNumeric);
                    }
                }
            }

            // Update raw data
            if (o.input) {
                var label = null;
                if (isNumeric(o.type)) {
                    // Extract the number
                    o.number = Extract.call(o, Value.call(o.input));
                    // Keep the raw data as a property of the tag
                    if (o.type == 'percentage') {
                        label = o.number / 100;
                    } else {
                        label = o.number;
                    }
                } else if (o.type == 'datetime') {
                    label = getDate.call(o);

                    if (o.date[0] && o.date[1] && o.date[2]) {
                        o.input.setAttribute('data-completed', true);
                    }
                }

                if (label) {
                    o.input.setAttribute('data-value', label);
                }
            }

            if (newValue !== undefined) {
                if (returnObject) {
                    return o;
                } else {
                    return newValue;
                }
            }
        }
    }

    // Extract the tokens from a mask
    obj.prepare = function(str, o) {
        if (! o) {
            o = {};
        }
        return getTokens.call(o, str);
    }

    /**
     * Apply the mask to a element (legacy)
     */
    obj.apply = function(e) {
        var v = Value.call(e.target);
        if (e.key.length == 1) {
            v += e.key;
        }
        Value.call(e.target, obj(v, e.target.getAttribute('data-mask')));
    }

    /**
     * Legacy support
     */
    obj.run = function(value, mask, decimal) {
        return obj(value, { mask: mask, decimal: decimal });
    }

    /**
     * Extract number from masked string
     */
    obj.extract = function(v, options, returnObject) {
        if (isBlank(v)) {
            return v;
        }
        if (typeof(options) != 'object') {
            return value;
        } else {
            if (! options.options) {
                options.options = {};
            }
        }

        // Compatibility
        if (! options.mask && options.format) {
            options.mask = options.format;
        }

        // Get decimal
        getDecimal.call(options, options.mask);

        var type = null;
        if (options.type == 'percent' || options.options.style == 'percent') {
            type = 'percentage';
        } else if (options.mask) {
            type = getType.call(options, options.mask);
        }


        if (type === 'datetime') {
            if (v instanceof Date) {
                var t = jSuites.calendar.getDateString(value, options.mask);
            }

            var o = obj(v, options, true);
            var value = getDate.call(o);
            if ((o.date[0] && o.date[1] && o.date[2]) && ! (o.date[3] || o.date[4] || o.date[5])) {
                var t = jSuites.calendar.now(o.date);
                value = jSuites.calendar.dateToNum(t);
            }
        } else {
            var value = Extract.call(options, v);
            // Percentage
            if (type == 'percentage') {
                value /= 100;
            }
            var o = options;
        }

        o.value = value;

        if (returnObject) {
            return o;
        } else {
            return value;
        }
    }

    /**
     * Render
     */
    obj.render = function(value, options, fullMask) {
        if (isBlank(value)) {
            return value;
        }

        if (typeof(options) != 'object') {
            return value;
        } else {
            if (! options.options) {
                options.options = {};
            }
        }

        // Compatibility
        if (! options.mask && options.format) {
            options.mask = options.format;
        }

        var type = null;
        if (options.type == 'percent' || options.options.style == 'percent') {
            type = 'percentage';
        } else if (options.mask) {
            type = getType.call(options, options.mask);
        } else if (value instanceof Date) {
            type = 'datetime';
        }

        // Fill with blanks
        var fillWithBlanks = false;

        if (type =='datetime' || options.type == 'calendar') {
            var t = jSuites.calendar.getDateString(value, options.mask);
            if (t) {
                value = t;
            }

            if (options.mask && fullMask) {
                fillWithBlanks = true;
            }
        } else {
            // Percentage
            if (type == 'percentage') {
                value *= 100;
            }
            // Number of decimal places
            if (typeof(value) === 'number') {
                var t = null;
                if (options.mask && fullMask) {
                    var e = new RegExp('0{1}(.{1})0+', 'ig');
                    var d = options.mask.match(e);
                    if (d && d[0]) {
                        d = d[0].length - 2;
                        t = value.toFixed(d);
                    } else {
                        t = value.toFixed(0);
                    }
                } else if (options.locale && fullMask) {
                    // Append zeros 
                    var d = (''+value).split('.');
                    if (options.options) {
                        if (typeof(d[1]) === 'undefined') {
                            d[1] = '';
                        }
                        var len = d[1].length;
                        if (options.options.minimumFractionDigits > len) {
                            for (var i = 0; i < options.options.minimumFractionDigits - len; i++) {
                                d[1] += '0';
                            }
                        }
                    }
                    if (! d[1].length) {
                        t = d[0]
                    } else {
                        t = d.join('.');
                    }
                    var len = d[1].length;
                    if (options.options && options.options.maximumFractionDigits < len) {
                        t = parseFloat(t).toFixed(options.options.maximumFractionDigits);
                    }
                } else {
                    t = toPlainString(value);
                }

                if (t !== null) {
                    value = t;
                    // Get decimal
                    getDecimal.call(options, options.mask);
                    // Replace to the correct decimal
                    if (options.options.decimal) {
                        value = value.replace('.', options.options.decimal);
                    }
                }
            } else {
                if (options.mask && fullMask) {
                    fillWithBlanks = true;
                }
            }
        }

        if (fillWithBlanks) {
            var s = options.mask.length - value.length;
            if (s > 0) {
                for (var i = 0; i < s; i++) {
                    value += ' ';
                }
            }
        }

        value = obj(value, options);

        return value;
    }

    obj.set = function(e, m) {
        if (m) {
            e.setAttribute('data-mask', m);
            // Reset the value
            var event = new Event('input', {
                bubbles: true,
                cancelable: true,
            });
            e.dispatchEvent(event);
        }
    }

    if (typeof document !== 'undefined') {
        document.addEventListener('input', function(e) {
            if (e.target.getAttribute('data-mask') || e.target.mask) {
                obj(e);
            }
        });
    }

    return obj;
})();

jSuites.modal = (function(el, options) {
    var obj = {};
    obj.options = {};

    // Default configuration
    var defaults = {
        url: null,
        onopen: null,
        onclose: null,
        closed: false,
        width: null,
        height: null,
        title: null,
        padding: null,
        backdrop: true,
    };

    // Loop through our object
    for (var property in defaults) {
        if (options && options.hasOwnProperty(property)) {
            obj.options[property] = options[property];
        } else {
            obj.options[property] = defaults[property];
        }
    }

    // Title
    if (! obj.options.title && el.getAttribute('title')) {
        obj.options.title = el.getAttribute('title');
    }

    var temp = document.createElement('div');
    while (el.children[0]) {
        temp.appendChild(el.children[0]);
    }

    obj.content = document.createElement('div');
    obj.content.className = 'jmodal_content';
    obj.content.innerHTML = el.innerHTML;

    while (temp.children[0]) {
        obj.content.appendChild(temp.children[0]);
    }

    obj.container = document.createElement('div');
    obj.container.className = 'jmodal';
    obj.container.appendChild(obj.content);

    if (obj.options.padding) {
        obj.content.style.padding = obj.options.padding;
    }
    if (obj.options.width) {
        obj.container.style.width = obj.options.width;
    }
    if (obj.options.height) {
        obj.container.style.height = obj.options.height;
    }
    if (obj.options.title) {
        obj.container.setAttribute('title', obj.options.title);
    } else {
        obj.container.classList.add('no-title');
    }
    el.innerHTML = '';
    el.style.display = 'none';
    el.appendChild(obj.container);

    // Backdrop
    if (obj.options.backdrop) {
        var backdrop = document.createElement('div');
        backdrop.className = 'jmodal_backdrop';
        backdrop.onclick = function () {
            obj.close();
        }
        el.appendChild(backdrop);
    }

    obj.open = function() {
        el.style.display = 'block';
        // Fullscreen
        var rect = obj.container.getBoundingClientRect();
        if (jSuites.getWindowWidth() < rect.width) {
            obj.container.style.top = '';
            obj.container.style.left = '';
            obj.container.classList.add('jmodal_fullscreen');
            jSuites.animation.slideBottom(obj.container, 1);
        } else {
            if (obj.options.backdrop) {
                backdrop.style.display = 'block';
            }
        }
        // Event
        if (typeof(obj.options.onopen) == 'function') {
            obj.options.onopen(el, obj);
        }
    }

    obj.resetPosition = function() {
        obj.container.style.top = '';
        obj.container.style.left = '';
    }

    obj.isOpen = function() {
        return el.style.display != 'none' ? true : false;
    }

    obj.close = function() {
        el.style.display = 'none';
        if (obj.options.backdrop) {
            // Backdrop
            backdrop.style.display = '';
        }
        // Remove fullscreen class
        obj.container.classList.remove('jmodal_fullscreen');
        // Event
        if (typeof(obj.options.onclose) == 'function') {
            obj.options.onclose(el, obj);
        }
    }

    if (! jSuites.modal.hasEvents) {
        //  Position
        var tracker = null;

        document.addEventListener('keydown', function(e) {
            if (e.which == 27) {
                var modals = document.querySelectorAll('.jmodal');
                for (var i = 0; i < modals.length; i++) {
                    modals[i].parentNode.style.display = 'none';
                }
            }
        });

        document.addEventListener('mouseup', function(e) {
            if (tracker) {
                tracker.element.style.cursor = 'auto';
                tracker = null;
            }
        });

        document.addEventListener('mousedown', function(e) {
            var item = jSuites.findElement(e.target, 'jmodal');
            if (item) {
                // Get target info
                var rect = item.getBoundingClientRect();

                if (e.changedTouches && e.changedTouches[0]) {
                    var x = e.changedTouches[0].clientX;
                    var y = e.changedTouches[0].clientY;
                } else {
                    var x = e.clientX;
                    var y = e.clientY;
                }

                if (rect.width - (x - rect.left) < 50 && (y - rect.top) < 50) {
                    item.parentNode.modal.close();
                } else {
                    if (e.target.getAttribute('title') && (y - rect.top) < 50) {
                        if (document.selection) {
                            document.selection.empty();
                        } else if ( window.getSelection ) {
                            window.getSelection().removeAllRanges();
                        }

                        tracker = {
                            left: rect.left,
                            top: rect.top,
                            x: e.clientX,
                            y: e.clientY,
                            width: rect.width,
                            height: rect.height,
                            element: item,
                        }
                    }
                }
            }
        });

        document.addEventListener('mousemove', function(e) {
            if (tracker) {
                e = e || window.event;
                if (e.buttons) {
                    var mouseButton = e.buttons;
                } else if (e.button) {
                    var mouseButton = e.button;
                } else {
                    var mouseButton = e.which;
                }

                if (mouseButton) {
                    tracker.element.style.top = (tracker.top + (e.clientY - tracker.y) + (tracker.height / 2)) + 'px';
                    tracker.element.style.left = (tracker.left + (e.clientX - tracker.x) + (tracker.width / 2)) + 'px';
                    tracker.element.style.cursor = 'move';
                } else {
                    tracker.element.style.cursor = 'auto';
                }
            }
        });

        jSuites.modal.hasEvents = true;
    }

    if (obj.options.url) {
        jSuites.ajax({
            url: obj.options.url,
            method: 'GET',
            dataType: 'text/html',
            success: function(data) {
                obj.content.innerHTML = data;

                if (! obj.options.closed) {
                    obj.open();
                }
            }
        });
    } else {
        if (! obj.options.closed) {
            obj.open();
        }
    }

    // Keep object available from the node
    el.modal = obj;

    return obj;
});


jSuites.notification = (function(options) {
    var obj = {};
    obj.options = {};

    // Default configuration
    var defaults = {
        icon: null,
        name: 'Notification',
        date: null,
        error: null,
        title: null,
        message: null,
        timeout: 4000,
        autoHide: true,
        closeable: true,
    };

    // Loop through our object
    for (var property in defaults) {
        if (options && options.hasOwnProperty(property)) {
            obj.options[property] = options[property];
        } else {
            obj.options[property] = defaults[property];
        }
    }

    var notification = document.createElement('div');
    notification.className = 'jnotification';

    if (obj.options.error) {
        notification.classList.add('jnotification-error');
    }

    var notificationContainer = document.createElement('div');
    notificationContainer.className = 'jnotification-container';
    notification.appendChild(notificationContainer);

    var notificationHeader = document.createElement('div');
    notificationHeader.className = 'jnotification-header';
    notificationContainer.appendChild(notificationHeader);

    var notificationImage = document.createElement('div');
    notificationImage.className = 'jnotification-image';
    notificationHeader.appendChild(notificationImage);

    if (obj.options.icon) {
        var notificationIcon = document.createElement('img');
        notificationIcon.src = obj.options.icon;
        notificationImage.appendChild(notificationIcon);
    }

    var notificationName = document.createElement('div');
    notificationName.className = 'jnotification-name';
    notificationName.innerHTML = obj.options.name;
    notificationHeader.appendChild(notificationName);

    if (obj.options.closeable == true) {
        var notificationClose = document.createElement('div');
        notificationClose.className = 'jnotification-close';
        notificationClose.onclick = function() {
            obj.hide();
        }
        notificationHeader.appendChild(notificationClose);
    }

    var notificationDate = document.createElement('div');
    notificationDate.className = 'jnotification-date';
    notificationHeader.appendChild(notificationDate);

    var notificationContent = document.createElement('div');
    notificationContent.className = 'jnotification-content';
    notificationContainer.appendChild(notificationContent);

    if (obj.options.title) {
        var notificationTitle = document.createElement('div');
        notificationTitle.className = 'jnotification-title';
        notificationTitle.innerHTML = obj.options.title;
        notificationContent.appendChild(notificationTitle);
    }

    var notificationMessage = document.createElement('div');
    notificationMessage.className = 'jnotification-message';
    notificationMessage.innerHTML = obj.options.message;
    notificationContent.appendChild(notificationMessage);

    obj.show = function() {
        document.body.appendChild(notification);
        if (jSuites.getWindowWidth() > 800) { 
            jSuites.animation.fadeIn(notification);
        } else {
            jSuites.animation.slideTop(notification, 1);
        }
    }

    obj.hide = function() {
        if (jSuites.getWindowWidth() > 800) { 
            jSuites.animation.fadeOut(notification, function() {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                    if (notificationTimeout) {
                        clearTimeout(notificationTimeout);
                    }
                }
            });
        } else {
            jSuites.animation.slideTop(notification, 0, function() {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                    if (notificationTimeout) {
                        clearTimeout(notificationTimeout);
                    }
                }
            });
        }
    };

    obj.show();

    if (obj.options.autoHide == true) {
        var notificationTimeout = setTimeout(function() {
            obj.hide();
        }, obj.options.timeout);
    }

    if (jSuites.getWindowWidth() < 800) {
        notification.addEventListener("swipeup", function(e) {
            obj.hide();
            e.preventDefault();
            e.stopPropagation();
        });
    }

    return obj;
});

jSuites.notification.isVisible = function() {
    var j = document.querySelector('.jnotification');
    return j && j.parentNode ? true : false;
}

// More palettes https://coolors.co/ or https://gka.github.io/palettes/#/10|s|003790,005647,ffffe0|ffffe0,ff005e,93003a|1|1
jSuites.palette = function(o, v) {
    var palette = {
        material: [
            [ "#ffebee", "#fce4ec", "#f3e5f5", "#e8eaf6", "#e3f2fd", "#e0f7fa", "#e0f2f1", "#e8f5e9", "#f1f8e9", "#f9fbe7", "#fffde7", "#fff8e1", "#fff3e0", "#fbe9e7", "#efebe9", "#fafafa", "#eceff1" ],
            [ "#ffcdd2", "#f8bbd0", "#e1bee7", "#c5cae9", "#bbdefb", "#b2ebf2", "#b2dfdb", "#c8e6c9", "#dcedc8", "#f0f4c3", "#fff9c4", "#ffecb3", "#ffe0b2", "#ffccbc", "#d7ccc8", "#f5f5f5", "#cfd8dc" ],
            [ "#ef9a9a", "#f48fb1", "#ce93d8", "#9fa8da", "#90caf9", "#80deea", "#80cbc4", "#a5d6a7", "#c5e1a5", "#e6ee9c", "#fff59d", "#ffe082", "#ffcc80", "#ffab91", "#bcaaa4", "#eeeeee", "#b0bec5" ],
            [ "#e57373", "#f06292", "#ba68c8", "#7986cb", "#64b5f6", "#4dd0e1", "#4db6ac", "#81c784", "#aed581", "#dce775", "#fff176", "#ffd54f", "#ffb74d", "#ff8a65", "#a1887f", "#e0e0e0", "#90a4ae" ],
            [ "#ef5350", "#ec407a", "#ab47bc", "#5c6bc0", "#42a5f5", "#26c6da", "#26a69a", "#66bb6a", "#9ccc65", "#d4e157", "#ffee58", "#ffca28", "#ffa726", "#ff7043", "#8d6e63", "#bdbdbd", "#78909c" ],
            [ "#f44336", "#e91e63", "#9c27b0", "#3f51b5", "#2196f3", "#00bcd4", "#009688", "#4caf50", "#8bc34a", "#cddc39", "#ffeb3b", "#ffc107", "#ff9800", "#ff5722", "#795548", "#9e9e9e", "#607d8b" ],
            [ "#e53935", "#d81b60", "#8e24aa", "#3949ab", "#1e88e5", "#00acc1", "#00897b", "#43a047", "#7cb342", "#c0ca33", "#fdd835", "#ffb300", "#fb8c00", "#f4511e", "#6d4c41", "#757575", "#546e7a" ],
            [ "#d32f2f", "#c2185b", "#7b1fa2", "#303f9f", "#1976d2", "#0097a7", "#00796b", "#388e3c", "#689f38", "#afb42b", "#fbc02d", "#ffa000", "#f57c00", "#e64a19", "#5d4037", "#616161", "#455a64" ],
            [ "#c62828", "#ad1457", "#6a1b9a", "#283593", "#1565c0", "#00838f", "#00695c", "#2e7d32", "#558b2f", "#9e9d24", "#f9a825", "#ff8f00", "#ef6c00", "#d84315", "#4e342e", "#424242", "#37474f" ],
            [ "#b71c1c", "#880e4f", "#4a148c", "#1a237e", "#0d47a1", "#006064", "#004d40", "#1b5e20", "#33691e", "#827717", "#f57f17", "#ff6f00", "#e65100", "#bf360c", "#3e2723", "#212121", "#263238" ],
        ],
        fire: [
            ["0b1a6d","840f38","b60718","de030b","ff0c0c","fd491c","fc7521","faa331","fbb535","ffc73a"],
            ["071147","5f0b28","930513","be0309","ef0000","fa3403","fb670b","f9991b","faad1e","ffc123"],
            ["03071e","370617","6a040f","9d0208","d00000","dc2f02","e85d04","f48c06","faa307","ffba08"],
            ["020619","320615","61040d","8c0207","bc0000","c82a02","d05203","db7f06","e19405","efab00"],
            ["020515","2d0513","58040c","7f0206","aa0000","b62602","b94903","c57205","ca8504","d89b00"],
        ],
        baby: [
            ["eddcd2","fff1e6","fde2e4","fad2e1","c5dedd","dbe7e4","f0efeb","d6e2e9","bcd4e6","99c1de"],
            ["e1c4b3","ffd5b5","fab6ba","f5a8c4","aacecd","bfd5cf","dbd9d0","baceda","9dc0db","7eb1d5"],
            ["daa990","ffb787","f88e95","f282a9","8fc4c3","a3c8be","cec9b3","9dbcce","82acd2","649dcb"],
            ["d69070","ff9c5e","f66770","f05f8f","74bbb9","87bfae","c5b993","83aac3","699bca","4d89c2"],
            ["c97d5d","f58443","eb4d57","e54a7b","66a9a7","78ae9c","b5a67e","7599b1","5c88b7","4978aa"],
        ],
        chart: [
            ['#C1D37F','#4C5454','#FFD275','#66586F','#D05D5B','#C96480','#95BF8F','#6EA240','#0F0F0E','#EB8258','#95A3B3','#995D81'],
        ],
    }

    // Is defined, set new palette value
    if (typeof(v) !== 'undefined') {
        palette[o] = v;
    }

    // Otherwise get palette value
    if (palette[o]) {
        return palette[o];
    } else {
        return palette.material;
    }
}


jSuites.picker = (function(el, options) {
    // Already created, update options
    if (el.picker) {
        return el.picker.setOptions(options, true);
    }

    // New instance
    var obj = { type: 'picker' };
    obj.options = {};

    var dropdownHeader = null;
    var dropdownContent = null;

    /**
     * Create the content options
     */
    var createContent = function() {
        dropdownContent.innerHTML = '';

        // Create items
        var keys = Object.keys(obj.options.data);

        // Go though all options
        for (var i = 0; i < keys.length; i++) {
            // Item
            var dropdownItem = document.createElement('div');
            dropdownItem.classList.add('jpicker-item');
            dropdownItem.k = keys[i];
            dropdownItem.v = obj.options.data[keys[i]];
            // Label
            dropdownItem.innerHTML = obj.getLabel(keys[i]);
            // Append
            dropdownContent.appendChild(dropdownItem);
        }
    }

    /**
     * Set or reset the options for the picker
     */
    obj.setOptions = function(options, reset) {
        // Default configuration
        var defaults = {
            value: 0,
            data: null,
            render: null,
            onchange: null,
            onselect: null,
            onopen: null,
            onclose: null,
            onload: null,
            width: null,
            header: true,
            right: false,
            content: false,
            columns: null,
            height: null,
        }

        // Legacy purpose only
        if (options && options.options) {
            options.data = options.options;
        }

        // Loop through the initial configuration
        for (var property in defaults) {
            if (options && options.hasOwnProperty(property)) {
                obj.options[property] = options[property];
            } else {
                if (typeof(obj.options[property]) == 'undefined' || reset === true) {
                    obj.options[property] = defaults[property];
                }
            }
        }

        // Start using the options
        if (obj.options.header === false) {
            dropdownHeader.style.display = 'none';
        } else {
            dropdownHeader.style.display = '';
        }

        // Width
        if (obj.options.width) {
            dropdownHeader.style.width = parseInt(obj.options.width) + 'px';
        } else {
            dropdownHeader.style.width = '';
        }

        // Height
        if (obj.options.height) {
            dropdownContent.style.maxHeight = obj.options.height + 'px';
            dropdownContent.style.overflow = 'scroll';
        } else {
            dropdownContent.style.overflow = '';
        }

        if (obj.options.columns > 0) {
            dropdownContent.classList.add('jpicker-columns');
            dropdownContent.style.width =  obj.options.width ? obj.options.width : 36 * obj.options.columns + 'px';
        }

        if (isNaN(obj.options.value)) {
            obj.options.value = '0';
        }

        // Create list from data
        createContent();

        // Set value
        obj.setValue(obj.options.value);

        // Set options all returns the own instance
        return obj;
    }

    obj.getValue = function() {
        return obj.options.value;
    }

    obj.setValue = function(v) {
        // Set label
        obj.setLabel(v);

        // Update value
        obj.options.value = String(v);

        // Lemonade JS
        if (el.value != obj.options.value) {
            el.value = obj.options.value;
            if (typeof(el.onchange) == 'function') {
                el.onchange({
                    type: 'change',
                    target: el,
                    value: el.value
                });
            }
        }

        if (dropdownContent.children[v].getAttribute('type') !== 'generic') {
            obj.close();
        }
    }

    obj.getLabel = function(v) {
        var label = obj.options.data[v] || null;
        if (typeof(obj.options.render) == 'function') {
            label = obj.options.render(label);
        }
        return label;
    }

    obj.setLabel = function(v) {
        if (obj.options.content) {
            var label = '<i class="material-icons">' + obj.options.content + '</i>';
        } else {
            var label = obj.getLabel(v);
        }

        dropdownHeader.innerHTML = label;
    }

    obj.open = function() {
        if (! el.classList.contains('jpicker-focus')) {
            // Start tracking the element
            jSuites.tracking(obj, true);

            // Open picker
            el.classList.add('jpicker-focus');
            el.focus();

            var rectHeader = dropdownHeader.getBoundingClientRect();
            var rectContent = dropdownContent.getBoundingClientRect();
            if (window.innerHeight < rectHeader.bottom + rectContent.height) {
                dropdownContent.style.marginTop = -1 * (rectContent.height + 4) + 'px';
            } else {
                dropdownContent.style.marginTop = rectHeader.height + 2 + 'px';
            }

            if (obj.options.right === true) {
                dropdownContent.style.marginLeft = -1 * rectContent.width + 24 + 'px';
            }

            if (typeof obj.options.onopen == 'function') {
                obj.options.onopen(el, obj);
            }
        }
    }

    obj.close = function() {
        if (el.classList.contains('jpicker-focus')) {
            el.classList.remove('jpicker-focus');

            // Start tracking the element
            jSuites.tracking(obj, false);

            if (typeof obj.options.onclose == 'function') {
                obj.options.onclose(el, obj);
            }
        }
    }

    /**
     * Create floating picker
     */
    var init = function() {
        // Class
        el.classList.add('jpicker');
        el.setAttribute('tabindex', '900');
        el.onmousedown = function(e) {
            if (! el.classList.contains('jpicker-focus')) {
                obj.open();
            }
        }

        // Dropdown Header
        dropdownHeader = document.createElement('div');
        dropdownHeader.classList.add('jpicker-header');

        // Dropdown content
        dropdownContent = document.createElement('div');
        dropdownContent.classList.add('jpicker-content');
        dropdownContent.onclick = function(e) {
            var item = jSuites.findElement(e.target, 'jpicker-item');
            if (item) {
                if (item.parentNode === dropdownContent) {
                    // Update label
                    obj.setValue(item.k);
                    // Call method
                    if (typeof(obj.options.onchange) == 'function') {
                        obj.options.onchange.call(obj, el, obj, item.v, item.v, item.k);
                    }
                }
            }
        }

        // Append content and header
        el.appendChild(dropdownHeader);
        el.appendChild(dropdownContent);

        // Default value
        el.value = options.value || 0;

        // Set options
        obj.setOptions(options);

        if (typeof(obj.options.onload) == 'function') {
            obj.options.onload(el, obj);
        }

        // Change
        el.change = obj.setValue;

        // Global generic value handler
        el.val = function(val) {
            if (val === undefined) {
                return obj.getValue();
            } else {
                obj.setValue(val);
            }
        }

        // Reference
        el.picker = obj;
    }

    init();

    return obj;
});

jSuites.progressbar = (function(el, options) {
    var obj = {};
    obj.options = {};

    // Default configuration
    var defaults = {
        value: 0,
        onchange: null,
        width: null,
    };

    // Loop through the initial configuration
    for (var property in defaults) {
        if (options && options.hasOwnProperty(property)) {
            obj.options[property] = options[property];
        } else {
            obj.options[property] = defaults[property];
        }
    }

    // Class
    el.classList.add('jprogressbar');
    el.setAttribute('tabindex', 1);
    el.setAttribute('data-value', obj.options.value);

    var bar = document.createElement('div');
    bar.style.width = obj.options.value + '%';
    bar.style.color = '#fff';
    el.appendChild(bar);

    if (obj.options.width) {
        el.style.width = obj.options.width;
    }

    // Set value
    obj.setValue = function(value) {
        value = parseInt(value);
        obj.options.value = value;
        bar.style.width = value + '%';
        el.setAttribute('data-value', value + '%');

        if (value < 6) {
            el.style.color = '#000';
        } else {
            el.style.color = '#fff';
        }

        // Update value
        obj.options.value = value;

        if (typeof(obj.options.onchange) == 'function') {
            obj.options.onchange(el, value);
        }

        // Lemonade JS
        if (el.value != obj.options.value) {
            el.value = obj.options.value;
            if (typeof(el.onchange) == 'function') {
                el.onchange({
                    type: 'change',
                    target: el,
                    value: el.value
                });
            }
        }
    }

    obj.getValue = function() {
        return obj.options.value;
    }

    var action = function(e) {
        if (e.which) {
            // Get target info
            var rect = el.getBoundingClientRect();

            if (e.changedTouches && e.changedTouches[0]) {
                var x = e.changedTouches[0].clientX;
                var y = e.changedTouches[0].clientY;
            } else {
                var x = e.clientX;
                var y = e.clientY;
            }

            obj.setValue(Math.round((x - rect.left) / rect.width * 100));
        }
    }

    // Events
    if ('touchstart' in document.documentElement === true) {
        el.addEventListener('touchstart', action);
        el.addEventListener('touchend', action);
    } else {
        el.addEventListener('mousedown', action);
        el.addEventListener("mousemove", action);
    }

    // Change
    el.change = obj.setValue;

    // Global generic value handler
    el.val = function(val) {
        if (val === undefined) {
            return obj.getValue();
        } else {
            obj.setValue(val);
        }
    }

    // Reference
    el.progressbar = obj;

    return obj;
});

jSuites.rating = (function(el, options) {
    // Already created, update options
    if (el.rating) {
        return el.rating.setOptions(options, true);
    }

    // New instance
    var obj = {};
    obj.options = {};

    obj.setOptions = function(options, reset) {
        // Default configuration
        var defaults = {
            number: 5,
            value: 0,
            tooltip: [ 'Very bad', 'Bad', 'Average', 'Good', 'Very good' ],
            onchange: null,
        };

        // Loop through the initial configuration
        for (var property in defaults) {
            if (options && options.hasOwnProperty(property)) {
                obj.options[property] = options[property];
            } else {
                if (typeof(obj.options[property]) == 'undefined' || reset === true) {
                    obj.options[property] = defaults[property];
                }
            }
        }

        // Make sure the container is empty
        el.innerHTML = '';

        // Add elements
        for (var i = 0; i < obj.options.number; i++) {
            var div = document.createElement('div');
            div.setAttribute('data-index', (i + 1))
            div.setAttribute('title', obj.options.tooltip[i])
            el.appendChild(div);
        }

        // Selected option
        if (obj.options.value) {
            for (var i = 0; i < obj.options.number; i++) {
                if (i < obj.options.value) {
                    el.children[i].classList.add('jrating-selected');
                }
            }
        }

        return obj;
    }

    // Set value
    obj.setValue = function(index) {
        for (var i = 0; i < obj.options.number; i++) {
            if (i < index) {
                el.children[i].classList.add('jrating-selected');
            } else {
                el.children[i].classList.remove('jrating-over');
                el.children[i].classList.remove('jrating-selected');
            }
        }

        obj.options.value = index;

        if (typeof(obj.options.onchange) == 'function') {
            obj.options.onchange(el, index);
        }

        // Lemonade JS
        if (el.value != obj.options.value) {
            el.value = obj.options.value;
            if (typeof(el.onchange) == 'function') {
                el.onchange({
                    type: 'change',
                    target: el,
                    value: el.value
                });
            }
        }
    }

    obj.getValue = function() {
        return obj.options.value;
    }

    var init = function() {
        // Start plugin
        obj.setOptions(options);

        // Class
        el.classList.add('jrating');

        // Events
        el.addEventListener("click", function(e) {
            var index = e.target.getAttribute('data-index');
            if (index != undefined) {
                if (index == obj.options.value) {
                    obj.setValue(0);
                } else {
                    obj.setValue(index);
                }
            }
        });

        el.addEventListener("mouseover", function(e) {
            var index = e.target.getAttribute('data-index');
            for (var i = 0; i < obj.options.number; i++) {
                if (i < index) {
                    el.children[i].classList.add('jrating-over');
                } else {
                    el.children[i].classList.remove('jrating-over');
                }
            }
        });

        el.addEventListener("mouseout", function(e) {
            for (var i = 0; i < obj.options.number; i++) {
                el.children[i].classList.remove('jrating-over');
            }
        });

        // Change
        el.change = obj.setValue;

        // Global generic value handler
        el.val = function(val) {
            if (val === undefined) {
                return obj.getValue();
            } else {
                obj.setValue(val);
            }
        }

        // Reference
        el.rating = obj;
    }

    init();

    return obj;
});


jSuites.search = (function(el, options) {
    if (el.search) {
        return el.search;
    }

    var index =  null;

    var select = function(e) {
        if (e.target.classList.contains('jsearch_item')) {
            var element = e.target;
        } else {
            var element = e.target.parentNode;
        }

        obj.selectIndex(element);
        e.preventDefault();
    }

    var createList = function(data) {
        // Reset container
        container.innerHTML = '';
        // Print results
        if (! data.length) {
            // Show container
            el.style.display = '';
        } else {
            // Show container
            el.style.display = 'block';

            // Show items (only 10)
            var len = data.length < 11 ? data.length : 10;
            for (var i = 0; i < len; i++) {
                if (typeof(data[i]) == 'string') {
                    var text = data[i];
                    var value = data[i];
                } else {
                    // Legacy
                    var text = data[i].text;
                    if (! text && data[i].name) {
                        text = data[i].name;
                    }
                    var value = data[i].value;
                    if (! value && data[i].id) {
                        value = data[i].id;
                    }
                }

                var div = document.createElement('div');
                div.setAttribute('data-value', value);
                div.setAttribute('data-text', text);
                div.className = 'jsearch_item';

                if (data[i].id) {
                    div.setAttribute('id', data[i].id)
                }

                if (obj.options.forceSelect && i == 0) {
                    div.classList.add('selected');
                }
                var img = document.createElement('img');
                if (data[i].image) {
                    img.src = data[i].image;
                } else {
                    img.style.display = 'none';
                }
                div.appendChild(img);

                var item = document.createElement('div');
                item.innerHTML = text;
                div.appendChild(item);

                // Append item to the container
                container.appendChild(div);
            }
        }
    }

    var execute = function(str) {
        if (str != obj.terms) {
            // New terms
            obj.terms = str;
            // New index
            if (obj.options.forceSelect) {
                index = 0;
            } else {
                index = null;
            }
            // Array or remote search
            if (Array.isArray(obj.options.data)) {
                var test = function(o) {
                    if (typeof(o) == 'string') {
                        if ((''+o).toLowerCase().search(str.toLowerCase()) >= 0) {
                            return true;
                        }
                    } else {
                        for (var key in o) {
                            var value = o[key];
                            if ((''+value).toLowerCase().search(str.toLowerCase()) >= 0) {
                                return true;
                            }
                        }
                    }
                    return false;
                }

                var results = obj.options.data.filter(function(item) {
                    return test(item);
                });

                // Show items
                createList(results);
            } else {
                // Get remove results
                jSuites.ajax({
                    url: obj.options.data + str,
                    method: 'GET',
                    dataType: 'json',
                    success: function(data) {
                        // Show items
                        createList(data);
                    }
                });
            }
        }
    }

    // Search timer
    var timer = null;

    // Search methods
    var obj = function(str) {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(function() {
            execute(str);
        }, 500);
    }
    if(options.forceSelect === null) {
        options.forceSelect = true;
    }
    obj.options = {
        data: options.data || null,
        input: options.input || null,
        onselect: options.onselect || null,
        forceSelect: options.forceSelect,
    };

    obj.selectIndex = function(item) {
        var id = item.getAttribute('id');
        var text = item.getAttribute('data-text');
        var value = item.getAttribute('data-value');
        // Onselect
        if (typeof(obj.options.onselect) == 'function') {
            obj.options.onselect(obj, text, value, id);
        }
        // Close container
        obj.close();
    }

    obj.open = function() {
        el.style.display = 'block';
    }

    obj.close = function() {
        if (timer) {
            clearTimeout(timer);
        }
        // Current terms
        obj.terms = '';
        // Remove results
        container.innerHTML = '';
        // Hide
        el.style.display = '';
    }

    obj.isOpened = function() {
        return el.style.display ? true : false;
    }

    obj.keydown = function(e) {
        if (obj.isOpened()) {
            if (e.key == 'Enter') {
                // Enter
                if (index!==null && container.children[index]) {
                    obj.selectIndex(container.children[index]);
                    e.preventDefault();
                } else {
                    obj.close();
                }
            } else if (e.key === 'ArrowUp') {
                // Up
                if (index!==null && container.children[0]) {
                    container.children[index].classList.remove('selected');
                    if(!obj.options.forceSelect && index === 0) {
                        index = null;
                    } else {
                        index = Math.max(0, index-1);
                        container.children[index].classList.add('selected');
                    }
                }
                e.preventDefault();
            } else if (e.key === 'ArrowDown') {
                // Down
                if(index == null) {
                    index = -1;
                } else {
                    container.children[index].classList.remove('selected');
                }
                if (index < 9 && container.children[index+1]) {
                    index++;
                }
                container.children[index].classList.add('selected');
                e.preventDefault();
            }
        }
    }

    obj.keyup = function(e) {
        if (obj.options.input) {
            obj(obj.options.input.value);
        } else {
            // Current node
            var node = jSuites.getNode();
            if (node) {
                obj(node.innerText);
            }
        }
    }
    
    // Add events
    if (obj.options.input) {
        obj.options.input.addEventListener("keyup", obj.keyup);
        obj.options.input.addEventListener("keydown", obj.keydown);
    }

    // Append element
    var container = document.createElement('div');
    container.classList.add('jsearch_container');
    container.onmousedown = select;
    el.appendChild(container);

    el.classList.add('jsearch');
    el.search = obj;

    return obj;
});


jSuites.slider = (function(el, options) {
    var obj = {};
    obj.options = {};
    obj.currentImage = null;

    if (options) {
        obj.options = options;
    }

    // Focus
    el.setAttribute('tabindex', '900')

    // Items
    obj.options.items = [];

    if (! el.classList.contains('jslider')) {
        el.classList.add('jslider');
        el.classList.add('unselectable');

        if (obj.options.height) {
            el.style.minHeight = obj.options.height;
        }
        if (obj.options.width) {
            el.style.width = obj.options.width;
        }
        if (obj.options.grid) {
            el.classList.add('jslider-grid');
            var number = el.children.length;
            if (number > 4) {
                el.setAttribute('data-total', number - 4);
            }
            el.setAttribute('data-number', (number > 4 ? 4 : number));
        }

        // Add slider counter
        var counter = document.createElement('div');
        counter.classList.add('jslider-counter');

        // Move children inside
        if (el.children.length > 0) {
            // Keep children items
            for (var i = 0; i < el.children.length; i++) {
                obj.options.items.push(el.children[i]);
                
                // counter click event
                var item = document.createElement('div');
                item.onclick = function() {
                    var index = Array.prototype.slice.call(counter.children).indexOf(this);
                    obj.show(obj.currentImage = obj.options.items[index]);
                }
                counter.appendChild(item);
            }
        }
        // Add caption
        var caption = document.createElement('div');
        caption.className = 'jslider-caption';

        // Add close buttom
        var controls = document.createElement('div');
        var close = document.createElement('div');
        close.className = 'jslider-close';
        close.innerHTML = '';
        
        close.onclick = function() {
            obj.close();
        }
        controls.appendChild(caption);
        controls.appendChild(close);
    }

    obj.updateCounter = function(index) {
        for (var i = 0; i < counter.children.length; i ++) {
            if (counter.children[i].classList.contains('jslider-counter-focus')) {
                counter.children[i].classList.remove('jslider-counter-focus');
                break;
            }
        }
        counter.children[index].classList.add('jslider-counter-focus');
    }

    obj.show = function(target) {
        if (! target) {
            var target = el.children[0];
        }

        // Focus element
        el.classList.add('jslider-focus');
        el.classList.remove('jslider-grid');
        el.appendChild(controls);
        el.appendChild(counter);

        // Update counter
        var index = obj.options.items.indexOf(target);
        obj.updateCounter(index);

        // Remove display
        for (var i = 0; i < el.children.length; i++) {
            el.children[i].style.display = '';
        }
        target.style.display = 'block';

        // Is there any previous
        if (target.previousElementSibling) {
            el.classList.add('jslider-left');
        } else {
            el.classList.remove('jslider-left');
        }

        // Is there any next
        if (target.nextElementSibling && target.nextElementSibling.tagName == 'IMG') {
            el.classList.add('jslider-right');
        } else {
            el.classList.remove('jslider-right');
        }

        obj.currentImage = target;

        // Vertical image
        if (obj.currentImage.offsetHeight > obj.currentImage.offsetWidth) {
            obj.currentImage.classList.add('jslider-vertical');
        }

        controls.children[0].innerText = obj.currentImage.getAttribute('title');
    }

    obj.open = function() {
        obj.show();

        // Event
        if (typeof(obj.options.onopen) == 'function') {
            obj.options.onopen(el);
        }
    }

    obj.close = function() {
        // Remove control classes
        el.classList.remove('jslider-focus');
        el.classList.remove('jslider-left');
        el.classList.remove('jslider-right');
        // Show as a grid depending on the configuration
        if (obj.options.grid) {
            el.classList.add('jslider-grid');
        }
        // Remove display
        for (var i = 0; i < el.children.length; i++) {
            el.children[i].style.display = '';
        }
        // Remove controls from the component
        counter.remove();
        controls.remove();
        // Current image
        obj.currentImage = null;
        // Event
        if (typeof(obj.options.onclose) == 'function') {
            obj.options.onclose(el);
        }
    }

    obj.reset = function() {
        el.innerHTML = '';
    }

    obj.next = function() {
        var nextImage = obj.currentImage.nextElementSibling;
        if (nextImage && nextImage.tagName === 'IMG') {
            obj.show(obj.currentImage.nextElementSibling);
        }
    }
    
    obj.prev = function() {
        if (obj.currentImage.previousElementSibling) {
            obj.show(obj.currentImage.previousElementSibling);
        }
    }

    var mouseUp = function(e) {
        // Open slider
        if (e.target.tagName == 'IMG') {
            obj.show(e.target);
        } else if (! e.target.classList.contains('jslider-close') && ! (e.target.parentNode.classList.contains('jslider-counter') || e.target.classList.contains('jslider-counter'))){
            // Arrow controls
            var offsetX = e.offsetX || e.changedTouches[0].clientX;
            if (e.target.clientWidth - offsetX < 40) {
                // Show next image
                obj.next();
            } else if (offsetX < 40) {
                // Show previous image
                obj.prev();
            }
        }
    }

    if ('ontouchend' in document.documentElement === true) {
        el.addEventListener('touchend', mouseUp);
    } else {
        el.addEventListener('mouseup', mouseUp);
    }

    // Add global events
    el.addEventListener("swipeleft", function(e) {
        obj.next();
        e.preventDefault();
        e.stopPropagation();
    });

    el.addEventListener("swiperight", function(e) {
        obj.prev();
        e.preventDefault();
        e.stopPropagation();
    });

    el.addEventListener('keydown', function(e) {
        if (e.which == 27) {
            obj.close();
        }
    });

    el.slider = obj;

    return obj;
});

jSuites.sorting = (function(el, options) {
    var obj = {};
    obj.options = {};

    var defaults = {
        pointer: null,
        direction: null,
        ondragstart: null,
        ondragend: null,
        ondrop: null,
    }

    var dragElement = null;

    // Loop through the initial configuration
    for (var property in defaults) {
        if (options && options.hasOwnProperty(property)) {
            obj.options[property] = options[property];
        } else {
            obj.options[property] = defaults[property];
        }
    }

    el.classList.add('jsorting');

    el.addEventListener('dragstart', function(e) {
        var position = Array.prototype.indexOf.call(e.target.parentNode.children, e.target);
        dragElement = {
            element: e.target,
            o: position,
            d: position
        }
        e.target.style.opacity = '0.25';

        if (typeof(obj.options.ondragstart) == 'function') {
            obj.options.ondragstart(el, e.target, e);
        }
    });

    el.addEventListener('dragover', function(e) {
        e.preventDefault();

        if (getElement(e.target) && dragElement) {
            if (e.target.getAttribute('draggable') == 'true' && dragElement.element != e.target) {
                if (! obj.options.direction) {
                    var condition = e.target.clientHeight / 2 > e.offsetY;
                } else {
                    var condition = e.target.clientWidth / 2 > e.offsetX;
                }

                if (condition) {
                    e.target.parentNode.insertBefore(dragElement.element, e.target);
                } else {
                    e.target.parentNode.insertBefore(dragElement.element, e.target.nextSibling);
                }

                dragElement.d = Array.prototype.indexOf.call(e.target.parentNode.children, dragElement.element);
            }
        }
    });

    el.addEventListener('dragleave', function(e) {
        e.preventDefault();
    });

    el.addEventListener('dragend', function(e) {
        e.preventDefault();

        if (dragElement) {
            if (typeof(obj.options.ondragend) == 'function') {
                obj.options.ondragend(el, dragElement.element, e);
            }

            // Cancelled put element to the original position
            if (dragElement.o < dragElement.d) {
                e.target.parentNode.insertBefore(dragElement.element, e.target.parentNode.children[dragElement.o]);
            } else {
                e.target.parentNode.insertBefore(dragElement.element, e.target.parentNode.children[dragElement.o].nextSibling);
            }

            dragElement.element.style.opacity = '';
            dragElement = null;
        }
    });

    el.addEventListener('drop', function(e) {
        e.preventDefault();

        if (dragElement && (dragElement.o != dragElement.d)) {
            if (typeof(obj.options.ondrop) == 'function') {
                obj.options.ondrop(el, dragElement.o, dragElement.d, dragElement.element, e.target, e);
            }
        }

        dragElement.element.style.opacity = '';
        dragElement = null;
    });

    var getElement = function(element) {
        var sorting = false;

        function path (element) {
            if (element.className) {
                if (element.classList.contains('jsorting')) {
                    sorting = true;
                }
            }

            if (! sorting) {
                path(element.parentNode);
            }
        }

        path(element);

        return sorting;
    }

    for (var i = 0; i < el.children.length; i++) {
        if (! el.children[i].hasAttribute('draggable')) {
            el.children[i].setAttribute('draggable', 'true');
        }
    }

    el.val = function() {
        var id = null;
        var data = [];
        for (var i = 0; i < el.children.length; i++) {
            if (id = el.children[i].getAttribute('data-id')) {
                data.push(id);
            }
        }
        return data;
    }

    return el;
});

jSuites.tabs = (function(el, options) {
    var obj = {};
    obj.options = {};

    // Default configuration
    var defaults = {
        data: [],
        position: null,
        allowCreate: false,
        allowChangePosition: false,
        onclick: null,
        onload: null,
        onchange: null,
        oncreate: null,
        ondelete: null,
        onbeforecreate: null,
        onchangeposition: null,
        animation: false,
        hideHeaders: false,
        padding: null,
        palette: null,
        maxWidth: null,
    }

    // Loop through the initial configuration
    for (var property in defaults) {
        if (options && options.hasOwnProperty(property)) {
            obj.options[property] = options[property];
        } else {
            obj.options[property] = defaults[property];
        }
    }

    // Class
    el.classList.add('jtabs');

    var prev = null;
    var next = null;
    var border = null;

    // Helpers
    var setBorder = function(index) {
        if (obj.options.animation) {
            var rect = obj.headers.children[index].getBoundingClientRect();

            if (obj.options.palette == 'modern') {
                border.style.width = rect.width - 4 + 'px';
                border.style.left = obj.headers.children[index].offsetLeft + 2 + 'px';
            } else {
                border.style.width = rect.width + 'px';
                border.style.left = obj.headers.children[index].offsetLeft + 'px';
            }

            if (obj.options.position == 'bottom') {
                border.style.top = '0px';
            } else {
                border.style.bottom = '0px';
            }
        }
    }

    var updateControls = function(x) {
        if (typeof(obj.headers.scrollTo) == 'function') {
            obj.headers.scrollTo({
                left: x,
                behavior: 'smooth',
            });
        } else {
            obj.headers.scrollLeft = x;
        }

        if (x <= 1) {
            prev.classList.add('disabled');
        } else {
            prev.classList.remove('disabled');
        }

        if (x >= obj.headers.scrollWidth - obj.headers.offsetWidth) {
            next.classList.add('disabled');
        } else {
            next.classList.remove('disabled');
        }

        if (obj.headers.scrollWidth <= obj.headers.offsetWidth) {
            prev.style.display = 'none';
            next.style.display = 'none';
        } else {
            prev.style.display = '';
            next.style.display = '';
        }
    }

    obj.setBorder = setBorder;

    // Set value
    obj.open = function(index) {
        var previous = null;
        for (var i = 0; i < obj.headers.children.length; i++) {
            if (obj.headers.children[i].classList.contains('jtabs-selected')) {
                // Current one
                previous = i;
            }
            // Remote selected
            obj.headers.children[i].classList.remove('jtabs-selected');
            if (obj.content.children[i]) {
                obj.content.children[i].classList.remove('jtabs-selected');
            }
        }

        obj.headers.children[index].classList.add('jtabs-selected');
        if (obj.content.children[index]) {
            obj.content.children[index].classList.add('jtabs-selected');
        }

        if (previous != index && typeof(obj.options.onchange) == 'function') {
            if (obj.content.children[index]) {
                obj.options.onchange(el, obj, index, obj.headers.children[index], obj.content.children[index]);
            }
        }

        // Hide
        if (obj.options.hideHeaders == true && (obj.headers.children.length < 3 && obj.options.allowCreate == false)) {
            obj.headers.parentNode.style.display = 'none';
        } else {
            // Set border
            setBorder(index);

            obj.headers.parentNode.style.display = '';

            var x1 = obj.headers.children[index].offsetLeft;
            var x2 = x1 + obj.headers.children[index].offsetWidth;
            var r1 = obj.headers.scrollLeft;
            var r2 = r1 + obj.headers.offsetWidth;

            if (! (r1 <= x1 && r2 >= x2)) {
                // Out of the viewport
                updateControls(x1 - 1);
            }
        }
    }

    obj.selectIndex = function(a) {
        var index = Array.prototype.indexOf.call(obj.headers.children, a);
        if (index >= 0) {
            obj.open(index);
        }

        return index;
    }

    obj.rename = function(i, title) {
        if (! title) {
            title = prompt('New title', obj.headers.children[i].innerText);
        }
        obj.headers.children[i].innerText = title;
        obj.open(i);
    }

    obj.create = function(title, url) {
        if (typeof(obj.options.onbeforecreate) == 'function') {
            var ret = obj.options.onbeforecreate(el);
            if (ret === false) {
                return false;
            } else {
                title = ret;
            }
        }

        var div = obj.appendElement(title);

        if (typeof(obj.options.oncreate) == 'function') {
            obj.options.oncreate(el, div)
        }

        return div;
    }

    obj.remove = function(index) {
        return obj.deleteElement(index);
    }

    obj.nextNumber = function() {
        var num = 0;
        for (var i = 0; i < obj.headers.children.length; i++) {
            var tmp = obj.headers.children[i].innerText.match(/[0-9].*/);
            if (tmp > num) {
                num = parseInt(tmp);
            }
        }
        if (! num) {
            num = 1;
        } else {
            num++;
        }

        return num;
    }

    obj.deleteElement = function(index) {
        if (! obj.headers.children[index]) {
            return false;
        } else {
            obj.headers.removeChild(obj.headers.children[index]);
            obj.content.removeChild(obj.content.children[index]);
        }

        obj.open(0);

        if (typeof(obj.options.ondelete) == 'function') {
            obj.options.ondelete(el, index)
        }
    }

    obj.appendElement = function(title, cb) {
        if (! title) {
            var title = prompt('Title?', '');
        }

        if (title) {
            // Add content
            var div = document.createElement('div');
            obj.content.appendChild(div);

            // Add headers
            var h = document.createElement('div');
            h.innerHTML = title;
            h.content = div;
            obj.headers.insertBefore(h, obj.headers.lastChild);

            // Sortable
            if (obj.options.allowChangePosition) {
                h.setAttribute('draggable', 'true');
            }
            // Open new tab
            obj.selectIndex(h);

            // Callback
            if (typeof(cb) == 'function') {
                cb(div, h);
            }

            // Return element
            return div;
        }
    }

    obj.getActive = function() {
        for (var i = 0; i < obj.headers.children.length; i++) {
            if (obj.headers.children[i].classList.contains('jtabs-selected')) {
                return i
            }
        }
        return 0;
    }

    obj.updateContent = function(position, newContent) {
        if (typeof newContent !== 'string') {
            var contentItem = newContent;
        } else {
            var contentItem = document.createElement('div');
            contentItem.innerHTML = newContent;
        }

        if (obj.content.children[position].classList.contains('jtabs-selected')) {
            newContent.classList.add('jtabs-selected');
        }

        obj.content.replaceChild(newContent, obj.content.children[position]);
    }

    obj.updatePosition = function(f, t) {
        // Ondrop update position of content
        if (f > t) {
            obj.content.insertBefore(obj.content.children[f], obj.content.children[t]);
        } else {
            obj.content.insertBefore(obj.content.children[f], obj.content.children[t].nextSibling);
        }

        // Open destination tab
        obj.open(t);

        // Call event
        if (typeof(obj.options.onchangeposition) == 'function') {
            obj.options.onchangeposition(obj.headers, f, t);
        }
    }

    obj.move = function(f, t) {
        if (f > t) {
            obj.headers.insertBefore(obj.headers.children[f], obj.headers.children[t]);
        } else {
            obj.headers.insertBefore(obj.headers.children[f], obj.headers.children[t].nextSibling);
        }

        obj.updatePosition(f, t);
    }

    obj.setBorder = setBorder;

    obj.init = function() {
        el.innerHTML = '';

        // Make sure the component is blank
        obj.headers = document.createElement('div');
        obj.content = document.createElement('div');
        obj.headers.classList.add('jtabs-headers');
        obj.content.classList.add('jtabs-content');

        if (obj.options.palette) {
            el.classList.add('jtabs-modern');
        } else {
            el.classList.remove('jtabs-modern');
        }

        // Padding
        if (obj.options.padding) {
            obj.content.style.padding = parseInt(obj.options.padding) + 'px';
        }

        // Header
        var header = document.createElement('div');
        header.className = 'jtabs-headers-container';
        header.appendChild(obj.headers);
        if (obj.options.maxWidth) {
            header.style.maxWidth = parseInt(obj.options.maxWidth) + 'px';
        }

        // Controls
        var controls = document.createElement('div');
        controls.className = 'jtabs-controls';
        controls.setAttribute('draggable', 'false');
        header.appendChild(controls);

        // Append DOM elements
        if (obj.options.position == 'bottom') {
            el.appendChild(obj.content);
            el.appendChild(header);
        } else {
            el.appendChild(header);
            el.appendChild(obj.content);
        }

        // New button
        if (obj.options.allowCreate == true) {
            var add = document.createElement('div');
            add.className = 'jtabs-add';
            add.onclick = function() {
                obj.create();
            }
            controls.appendChild(add);
        }

        prev = document.createElement('div');
        prev.className = 'jtabs-prev';
        prev.onclick = function() {
            updateControls(obj.headers.scrollLeft - obj.headers.offsetWidth);
        }
        controls.appendChild(prev);

        next = document.createElement('div');
        next.className = 'jtabs-next';
        next.onclick = function() {
            updateControls(obj.headers.scrollLeft + obj.headers.offsetWidth);
        }
        controls.appendChild(next);

        // Data
        for (var i = 0; i < obj.options.data.length; i++) {
            // Title
            if (obj.options.data[i].titleElement) {
                var headerItem = obj.options.data[i].titleElement;
            } else {
                var headerItem = document.createElement('div');
            }
            // Icon
            if (obj.options.data[i].icon) {
                var iconContainer = document.createElement('div');
                var icon = document.createElement('i');
                icon.classList.add('material-icons');
                icon.innerHTML = obj.options.data[i].icon;
                iconContainer.appendChild(icon);
                headerItem.appendChild(iconContainer);
            }
            // Title
            if (obj.options.data[i].title) {
                var title = document.createTextNode(obj.options.data[i].title);
                headerItem.appendChild(title);
            }
            // Width
            if (obj.options.data[i].width) {
                headerItem.style.width = obj.options.data[i].width;
            }
            // Content
            if (obj.options.data[i].contentElement) {
                var contentItem = obj.options.data[i].contentElement;
            } else {
                var contentItem = document.createElement('div');
                contentItem.innerHTML = obj.options.data[i].content;
            }
            obj.headers.appendChild(headerItem);
            obj.content.appendChild(contentItem);
        }

        // Animation
        border = document.createElement('div');
        border.className = 'jtabs-border';
        obj.headers.appendChild(border);

        if (obj.options.animation) {
            el.classList.add('jtabs-animation');
        }

        // Events
        obj.headers.addEventListener("click", function(e) {
            if (e.target.parentNode.classList.contains('jtabs-headers')) {
                var target = e.target;
            } else {
                if (e.target.tagName == 'I') {
                    var target = e.target.parentNode.parentNode;
                } else {
                    var target = e.target.parentNode;
                }
            }

            var index = obj.selectIndex(target);

            if (typeof(obj.options.onclick) == 'function') {
                obj.options.onclick(el, obj, index, obj.headers.children[index], obj.content.children[index]);
            }
        });

        obj.headers.addEventListener("contextmenu", function(e) {
            obj.selectIndex(e.target);
        });

        if (obj.headers.children.length) {
            // Open first tab
            obj.open(0);
        }

        // Update controls
        updateControls(0);

        if (obj.options.allowChangePosition == true) {
            jSuites.sorting(obj.headers, {
                direction: 1,
                ondrop: function(a,b,c) {
                    obj.updatePosition(b,c);
                },
            });
        }

        if (typeof(obj.options.onload) == 'function') {
            obj.options.onload(el, obj);
        }
    }

    // Loading existing nodes as the data
    if (el.children[0] && el.children[0].children.length) {
        // Create from existing elements
        for (var i = 0; i < el.children[0].children.length; i++) {
            var item = obj.options.data && obj.options.data[i] ? obj.options.data[i] : {};

            if (el.children[1] && el.children[1].children[i]) {
                item.titleElement = el.children[0].children[i];
                item.contentElement = el.children[1].children[i];
            } else {
                item.contentElement = el.children[0].children[i];
            }

            obj.options.data[i] = item;
        }
    }

    // Remote controller flag
    var loadingRemoteData = false;

    // Create from data
    if (obj.options.data) {
        // Append children
        for (var i = 0; i < obj.options.data.length; i++) {
            if (obj.options.data[i].url) {
                jSuites.ajax({
                    url: obj.options.data[i].url,
                    type: 'GET',
                    dataType: 'text/html',
                    index: i,
                    success: function(result) {
                        obj.options.data[this.index].content = result;
                    },
                    complete: function() {
                        obj.init();
                    }
                });

                // Flag loading
                loadingRemoteData = true;
            }
        }
    }

    if (! loadingRemoteData) {
        obj.init();
    }

    el.tabs = obj;

    return obj;
});

jSuites.tags = (function(el, options) {
    // Redefine configuration
    if (el.tags) {
        return el.tags.setOptions(options, true);
    }

    var obj = { type:'tags' };
    obj.options = {};

    // Limit
    var limit = function() {
        return obj.options.limit && el.children.length >= obj.options.limit ? true : false;
    }

    // Search helpers
    var search = null;
    var searchContainer = null;

    obj.setOptions = function(options, reset) {
        /**
         * @typedef {Object} defaults
         * @property {(string|Array)} value - Initial value of the compontent
         * @property {number} limit - Max number of tags inside the element
         * @property {string} search - The URL for suggestions
         * @property {string} placeholder - The default instruction text on the element
         * @property {validation} validation - Method to validate the tags
         * @property {requestCallback} onbeforechange - Method to be execute before any changes on the element
         * @property {requestCallback} onchange - Method to be execute after any changes on the element
         * @property {requestCallback} onfocus - Method to be execute when on focus
         * @property {requestCallback} onblur - Method to be execute when on blur
         * @property {requestCallback} onload - Method to be execute when the element is loaded
         */
        var defaults = {
            value: '',
            limit: null,
            limitMessage: null,
            search: null,
            placeholder: null,
            validation: null,
            onbeforechange: null,
            onlimit: null,
            onchange: null,
            onfocus: null,
            onblur: null,
            onload: null,
            colors: null,
        }

        // Loop through though the default configuration
        for (var property in defaults) {
            if (options && options.hasOwnProperty(property)) {
                obj.options[property] = options[property];
            } else {
                if (typeof(obj.options[property]) == 'undefined' || reset === true) {
                    obj.options[property] = defaults[property];
                }
            }
        }

        // Placeholder
        if (obj.options.placeholder) {
            el.setAttribute('data-placeholder', obj.options.placeholder);
        } else {
            el.removeAttribute('data-placeholder');
        }
        el.placeholder = obj.options.placeholder;

        // Update value
        obj.setValue(obj.options.value);

        // Validate items
        filter();

        // Create search box
        if (obj.options.search) {
            if (! searchContainer) {
                searchContainer = document.createElement('div');
                el.parentNode.insertBefore(searchContainer, el.nextSibling);

                // Create container
                search = jSuites.search(searchContainer, {
                    data: obj.options.search,
                    onselect: function(a,b,c) {
                        obj.selectIndex(b,c);
                    }
                });
            }
        } else {
            if (searchContainer) {
                search = null;
                searchContainer.remove();
                searchContainer = null;
            }
        }

        return obj;
    }

    /**
     * Add a new tag to the element
     * @param {(?string|Array)} value - The value of the new element
     */
    obj.add = function(value, focus) {
        if (typeof(obj.options.onbeforechange) == 'function') {
            var ret = obj.options.onbeforechange(el, obj, obj.options.value, value);
            if (ret === false) {
                return false;
            } else { 
                if (ret != null) {
                    value = ret;
                }
            }
        }

        // Make sure search is closed
        if (search) {
            search.close();
        }

        if (limit()) {
            if (typeof(obj.options.onlimit) == 'function') {
                obj.options.onlimit(obj, obj.options.limit);
            } else if (obj.options.limitMessage) {
                alert(obj.options.limitMessage + ' ' + obj.options.limit);
            }
        } else {
            // Get node
            var node = jSuites.getNode();

            if (node && node.parentNode && node.parentNode.classList.contains('jtags') &&
                node.nextSibling && (! (node.nextSibling.innerText && node.nextSibling.innerText.trim()))) {
                div = node.nextSibling;
            } else {
                // Remove not used last item
                if (el.lastChild) {
                    if (! el.lastChild.innerText.trim()) {
                        el.removeChild(el.lastChild);
                    }
                }

                // Mix argument string or array
                if (! value || typeof(value) == 'string') {
                    var div = createElement(value, value, node);
                } else {
                    for (var i = 0; i <= value.length; i++) {
                        if (! limit()) {
                            if (! value[i] || typeof(value[i]) == 'string') {
                                var t = value[i] || '';
                                var v = null;
                            } else {
                                var t = value[i].text;
                                var v = value[i].value;
                            }

                            // Add element
                            var div = createElement(t, v);
                        }
                    }
                }

                // Change
                change();
            }

            // Place caret
            if (focus) {
                setFocus(div);
            }
        }
    }

    obj.setLimit = function(limit) {
        obj.options.limit = limit;
        var n = el.children.length - limit;
        while (el.children.length > limit) {
            el.removeChild(el.lastChild);
        }
    }

    // Remove a item node
    obj.remove = function(node) {
        // Remove node
        node.parentNode.removeChild(node);
        // Make sure element is not blank
        if (! el.children.length) {
            obj.add('', true);
        } else {
            change();
        }
    }

    /**
     * Get all tags in the element
     * @return {Array} data - All tags as an array
     */
    obj.getData = function() {
        var data = [];
        for (var i = 0; i < el.children.length; i++) {
            // Get value
            var text = el.children[i].innerText.replace("\n", "");
            // Get id
            var value = el.children[i].getAttribute('data-value');
            if (! value) {
                value = text;
            }
            // Item
            if (text || value) {
                data.push({ text: text, value: value });
            }
        }
        return data;
    }

    /**
     * Get the value of one tag. Null for all tags
     * @param {?number} index - Tag index number. Null for all tags.
     * @return {string} value - All tags separated by comma
     */
    obj.getValue = function(index) {
        var value = null;

        if (index != null) {
            // Get one individual value
            value = el.children[index].getAttribute('data-value');
            if (! value) {
                value = el.children[index].innerText.replace("\n", "");
            }
        } else {
            // Get all
            var data = [];
            for (var i = 0; i < el.children.length; i++) {
                value = el.children[i].innerText.replace("\n", "");
                if (value) {
                    data.push(obj.getValue(i));
                }
            }
            value = data.join(',');
        }

        return value;
    }

    /**
     * Set the value of the element based on a string separeted by (,|;|\r\n)
     * @param {mixed} value - A string or array object with values
     */
    obj.setValue = function(mixed) {
        if (! mixed) {
            obj.reset();
        } else {
            if (el.value != mixed) {
                if (Array.isArray(mixed)) {
                    obj.add(mixed);
                } else {
                    // Remove whitespaces
                    var text = (''+mixed).trim();
                    // Tags
                    var data = extractTags(text);
                    // Reset
                    el.innerHTML = '';
                    // Add tags to the element
                    obj.add(data);
                }
            }
        }
    }

    /**
     * Reset the data from the element
     */
    obj.reset = function() {
        // Empty class
        el.classList.add('jtags-empty');
        // Empty element
        el.innerHTML = '<div></div>';
        // Execute changes
        change();
    }

    /**
     * Verify if all tags in the element are valid
     * @return {boolean}
     */
    obj.isValid = function() {
        var test = 0;
        for (var i = 0; i < el.children.length; i++) {
            if (el.children[i].classList.contains('jtags_error')) {
                test++;
            }
        }
        return test == 0 ? true : false;
    }

    /**
     * Add one element from the suggestions to the element
     * @param {object} item - Node element in the suggestions container
     */ 
    obj.selectIndex = function(text, value) {
        var node = jSuites.getNode();
        if (node) {
            // Append text to the caret
            node.innerText = text;
            // Set node id
            if (value) {
                node.setAttribute('data-value', value);
            }
            // Remove any error
            node.classList.remove('jtags_error');
            if (! limit()) {
                // Add new item
                obj.add('', true);
            }
        }
    }

    /**
     * Search for suggestions
     * @param {object} node - Target node for any suggestions
     */
    obj.search = function(node) {
        // Search for
        var terms = node.innerText;
    }

    // Destroy tags element
    obj.destroy = function() {
        // Bind events
        el.removeEventListener('mouseup', tagsMouseUp);
        el.removeEventListener('keydown', tagsKeyDown);
        el.removeEventListener('keyup', tagsKeyUp);
        el.removeEventListener('paste', tagsPaste);
        el.removeEventListener('focus', tagsFocus);
        el.removeEventListener('blur', tagsBlur);

        // Remove element
        el.parentNode.removeChild(el);
    }

    var setFocus = function(node) {
        if (el.children.length > 1) {
            var range = document.createRange();
            var sel = window.getSelection();
            if (! node) {
                var node = el.childNodes[el.childNodes.length-1];
            }
            range.setStart(node, node.length)
            range.collapse(true)
            sel.removeAllRanges()
            sel.addRange(range)
            el.scrollLeft = el.scrollWidth;
        }
    }

    var createElement = function(label, value, node) {
        var div = document.createElement('div');
        div.innerHTML = label ? label : '';
        if (value) {
            div.setAttribute('data-value', value);
        }

        if (node && node.parentNode.classList.contains('jtags')) {
            el.insertBefore(div, node.nextSibling);
        } else {
            el.appendChild(div);
        }

        return div;
    }

    var change = function() {
        // Value
        var value = obj.getValue();

        if (value != obj.options.value) {
            obj.options.value = value;
            if (typeof(obj.options.onchange) == 'function') {
                obj.options.onchange(el, obj, obj.options.value);
            }

            // Lemonade JS
            if (el.value != obj.options.value) {
                el.value = obj.options.value;
                if (typeof(el.onchange) == 'function') {
                    el.onchange({
                        type: 'change',
                        target: el,
                        value: el.value
                    });
                }
            }
        }

        filter();
    }

    /**
     * Filter tags
     */
    var filter = function() {
        for (var i = 0; i < el.children.length; i++) {
            // Create label design
            if (! obj.getValue(i)) {
                el.children[i].classList.remove('jtags_label');
            } else {
                el.children[i].classList.add('jtags_label');

                // Validation in place
                if (typeof(obj.options.validation) == 'function') {
                    if (obj.getValue(i)) {
                        if (! obj.options.validation(el.children[i], el.children[i].innerText, el.children[i].getAttribute('data-value'))) {
                            el.children[i].classList.add('jtags_error');
                        } else {
                            el.children[i].classList.remove('jtags_error');
                        }
                    } else {
                        el.children[i].classList.remove('jtags_error');
                    }
                } else {
                    el.children[i].classList.remove('jtags_error');
                }
            }
        }

        isEmpty();
    }

    var isEmpty = function() {
        // Can't be empty
        if (! el.innerText.trim()) {
            el.innerHTML = '<div></div>';
            el.classList.add('jtags-empty');
        } else {
            el.classList.remove('jtags-empty');
        }
    }

    /**
     * Extract tags from a string
     * @param {string} text - Raw string
     * @return {Array} data - Array with extracted tags
     */
    var extractTags = function(text) {
        /** @type {Array} */
        var data = [];

        /** @type {string} */
        var word = '';

        // Remove whitespaces
        text = text.trim();

        if (text) {
            for (var i = 0; i < text.length; i++) {
                if (text[i] == ',' || text[i] == ';' || text[i] == '\n') {
                    if (word) {
                        data.push(word.trim());
                        word = '';
                    }
                } else {
                    word += text[i];
                }
            }

            if (word) {
                data.push(word);
            }
        }

        return data;
    }

    /** @type {number} */
    var anchorOffset = 0;

    /**
     * Processing event keydown on the element
     * @param e {object}
     */
    var tagsKeyDown = function(e) {
        // Anchoroffset
        anchorOffset = window.getSelection().anchorOffset;

        // Verify if is empty
        isEmpty();

        // Comma
        if (e.key === 'Tab'  || e.key === ';' || e.key === ',') {
            var n = window.getSelection().anchorOffset;
            if (n > 1) {
                if (limit()) {
                    if (typeof(obj.options.onlimit) == 'function') {
                        obj.options.onlimit(obj, obj.options.limit)
                    }
                } else {
                    obj.add('', true);
                }
            }
            e.preventDefault();
        } else if (e.key == 'Enter') {
            if (! search || ! search.isOpened()) {
                var n = window.getSelection().anchorOffset;
                if (n > 1) {
                    if (! limit()) {
                        obj.add('', true);
                    }
                }
                e.preventDefault();
            }
        } else if (e.key == 'Backspace') {
            // Back space - do not let last item to be removed
            if (el.children.length == 1 && window.getSelection().anchorOffset < 1) {
                e.preventDefault();
            }
        }

        // Search events
        if (search) {
            search.keydown(e);
        }
    }

    /**
     * Processing event keyup on the element
     * @param e {object}
     */
    var tagsKeyUp = function(e) {
        if (e.which == 39) {
            // Right arrow
            var n = window.getSelection().anchorOffset;
            if (n > 1 && n == anchorOffset) {
                obj.add('', true);
            }
        } else if (e.which == 13 || e.which == 38 || e.which == 40) {
            e.preventDefault();
        } else {
            if (search) {
                search.keyup(e);
            }
        }

        filter();
    }

    /**
     * Processing event paste on the element
     * @param e {object}
     */
    var tagsPaste =  function(e) {
        if (e.clipboardData || e.originalEvent.clipboardData) {
            var text = (e.originalEvent || e).clipboardData.getData('text/plain');
        } else if (window.clipboardData) {
            var text = window.clipboardData.getData('Text');
        }

        var data = extractTags(text);
        if (data.length > 1) {
            obj.add(data, true);
            e.preventDefault();
        }
    }

    /**
     * Processing event mouseup on the element
     * @param e {object}
     */
    var tagsMouseUp = function(e) {
        if (e.target.parentNode && e.target.parentNode.classList.contains('jtags')) {
            if (e.target.classList.contains('jtags_label') || e.target.classList.contains('jtags_error')) {
                var rect = e.target.getBoundingClientRect();
                if (rect.width - (e.clientX - rect.left) < 16) {
                    obj.remove(e.target);
                }
            }
        }

        // Set focus in the last item
        if (e.target == el) {
            setFocus();
        }
    }

    var tagsFocus = function() {
        if (! el.classList.contains('jtags-focus')) {
            if (! el.children.length || obj.getValue(el.children.length - 1)) {
                if (! limit()) {
                    createElement('');
                }
            }

            if (typeof(obj.options.onfocus) == 'function') {
                obj.options.onfocus(el, obj, obj.getValue());
            }

            el.classList.add('jtags-focus');
        }
    }

    var tagsBlur = function() {
        if (el.classList.contains('jtags-focus')) {
            if (search) {
                search.close();
            }

            for (var i = 0; i < el.children.length - 1; i++) {
                // Create label design
                if (! obj.getValue(i)) {
                    el.removeChild(el.children[i]);
                }
            }

            change();

            el.classList.remove('jtags-focus');

            if (typeof(obj.options.onblur) == 'function') {
                obj.options.onblur(el, obj, obj.getValue());
            }
        }
    }

    var init = function() {
        // Bind events
        if ('touchend' in document.documentElement === true) {
            el.addEventListener('touchend', tagsMouseUp);
        } else {
            el.addEventListener('mouseup', tagsMouseUp);
        }

        el.addEventListener('keydown', tagsKeyDown);
        el.addEventListener('keyup', tagsKeyUp);
        el.addEventListener('paste', tagsPaste);
        el.addEventListener('focus', tagsFocus);
        el.addEventListener('blur', tagsBlur);

        // Editable
        el.setAttribute('contenteditable', true);

        // Prepare container
        el.classList.add('jtags');

        // Initial options
        obj.setOptions(options);

        if (typeof(obj.options.onload) == 'function') {
            obj.options.onload(el, obj);
        }

        // Change methods
        el.change = obj.setValue;

        // Global generic value handler
        el.val = function(val) {
            if (val === undefined) {
                return obj.getValue();
            } else {
                obj.setValue(val);
            }
        }

        el.tags = obj;
    }

    init();

    return obj;
});

jSuites.toolbar = (function(el, options) {
    // New instance
    var obj = { type:'toolbar' };
    obj.options = {};

    // Default configuration
    var defaults = {
        app: null,
        container: false,
        badge: false,
        title: false,
        responsive: false,
        maxWidth: null,
        bottom: true,
        items: [],
    }

    // Loop through our object
    for (var property in defaults) {
        if (options && options.hasOwnProperty(property)) {
            obj.options[property] = options[property];
        } else {
            obj.options[property] = defaults[property];
        }
    }

    if (! el && options.app && options.app.el) {
        el = document.createElement('div');
        options.app.el.appendChild(el);
    }

    // Arrow
    var toolbarArrow = document.createElement('div');
    toolbarArrow.classList.add('jtoolbar-item');
    toolbarArrow.classList.add('jtoolbar-arrow');

    var toolbarFloating = document.createElement('div');
    toolbarFloating.classList.add('jtoolbar-floating');
    toolbarArrow.appendChild(toolbarFloating);

    obj.selectItem = function(element) {
        var elements = toolbarContent.children;
        for (var i = 0; i < elements.length; i++) {
            if (element != elements[i]) {
                elements[i].classList.remove('jtoolbar-selected');
            }
        }
        element.classList.add('jtoolbar-selected');
    }

    obj.hide = function() {
        jSuites.animation.slideBottom(el, 0, function() {
            el.style.display = 'none';
        });
    }

    obj.show = function() {
        el.style.display = '';
        jSuites.animation.slideBottom(el, 1);
    }

    obj.get = function() {
        return el;
    }

    obj.setBadge = function(index, value) {
        toolbarContent.children[index].children[1].firstChild.innerHTML = value;
    }

    obj.destroy = function() {
        toolbar.remove();
        el.innerHTML = '';
    }

    obj.update = function(a, b) {
        for (var i = 0; i < toolbarContent.children.length; i++) {
            // Toolbar element
            var toolbarItem = toolbarContent.children[i];
            // State management
            if (typeof(toolbarItem.updateState) == 'function') {
                toolbarItem.updateState(el, obj, toolbarItem, a, b);
            }
        }
    }

    obj.create = function(items) {
        // Reset anything in the toolbar
        toolbarContent.innerHTML = '';
        // Create elements in the toolbar
        for (var i = 0; i < items.length; i++) {
            var toolbarItem = document.createElement('div');
            toolbarItem.classList.add('jtoolbar-item');

            if (items[i].width) {
                toolbarItem.style.width = parseInt(items[i].width) + 'px'; 
            }

            if (items[i].k) {
                toolbarItem.k = items[i].k;
            }

            if (items[i].tooltip) {
                toolbarItem.setAttribute('title', items[i].tooltip);
            }

            // Id
            if (items[i].id) {
                toolbarItem.setAttribute('id', items[i].id);
            }

            // Selected
            if (items[i].updateState) {
                toolbarItem.updateState = items[i].updateState;
            }

            if (items[i].active) {
                toolbarItem.classList.add('jtoolbar-active');
            }

            if (items[i].type == 'select' || items[i].type == 'dropdown') {
                jSuites.picker(toolbarItem, items[i]);
            } else if (items[i].type == 'divisor') {
                toolbarItem.classList.add('jtoolbar-divisor');
            } else if (items[i].type == 'label') {
                toolbarItem.classList.add('jtoolbar-label');
                toolbarItem.innerHTML = items[i].content;
            } else {
                // Material icons
                var toolbarIcon = document.createElement('i');
                if (typeof(items[i].class) === 'undefined') {
                    toolbarIcon.classList.add('material-icons');
                } else {
                    var c = items[i].class.split(' ');
                    for (var j = 0; j < c.length; j++) {
                        toolbarIcon.classList.add(c[j]);
                    }
                }
                toolbarIcon.innerHTML = items[i].content ? items[i].content : '';
                toolbarItem.appendChild(toolbarIcon);

                // Badge options
                if (obj.options.badge == true) {
                    var toolbarBadge = document.createElement('div');
                    toolbarBadge.classList.add('jbadge');
                    var toolbarBadgeContent = document.createElement('div');
                    toolbarBadgeContent.innerHTML = items[i].badge ? items[i].badge : '';
                    toolbarBadge.appendChild(toolbarBadgeContent);
                    toolbarItem.appendChild(toolbarBadge);
                }

                // Title
                if (items[i].title) {
                    if (obj.options.title == true) {
                        var toolbarTitle = document.createElement('span');
                        toolbarTitle.innerHTML = items[i].title;
                        toolbarItem.appendChild(toolbarTitle);
                    } else {
                        toolbarItem.setAttribute('title', items[i].title);
                    }
                }

                if (obj.options.app && items[i].route) {
                    // Route
                    toolbarItem.route = items[i].route;
                    // Onclick for route
                    toolbarItem.onclick = function() {
                        obj.options.app.pages(this.route);
                    }
                    // Create pages
                    obj.options.app.pages(items[i].route, {
                        toolbarItem: toolbarItem,
                        closed: true
                    });
                }
            }

            if (items[i].onclick) {
                toolbarItem.onclick = items[i].onclick.bind(items[i], el, obj, toolbarItem);
            }

            toolbarContent.appendChild(toolbarItem);
        }

        // Fits to the page
        setTimeout(function() {
            obj.refresh();
        }, 0);
    }

    obj.open = function() {
        toolbarArrow.classList.add('jtoolbar-arrow-selected');

        var rectElement = el.getBoundingClientRect();
        var rect = toolbarFloating.getBoundingClientRect();
        if (rect.bottom > window.innerHeight || obj.options.bottom) {
            toolbarFloating.style.bottom = '0';
        } else {
            toolbarFloating.style.removeProperty('bottom');
        }

        toolbarFloating.style.right = '0';

        toolbarArrow.children[0].focus();
        // Start tracking
        jSuites.tracking(obj, true);
    }

    obj.close = function() {
        toolbarArrow.classList.remove('jtoolbar-arrow-selected')
        // End tracking
        jSuites.tracking(obj, false);
    }

    obj.refresh = function() {
        if (obj.options.responsive == true) {
            // Width of the c
            var rect = el.parentNode.getBoundingClientRect();
            if (! obj.options.maxWidth) {
                obj.options.maxWidth = rect.width;
            }
            // Available parent space
            var available = parseInt(obj.options.maxWidth);
            // Remove arrow
            toolbarArrow.remove();
            // Move all items to the toolbar
            while (toolbarFloating.firstChild) {
                toolbarContent.appendChild(toolbarFloating.firstChild);
            }
            // Toolbar is larger than the parent, move elements to the floating element
            if (available < toolbarContent.offsetWidth) {
                // Give space to the floating element
                available -= 50;
                // Move to the floating option
                while (toolbarContent.lastChild && available < toolbarContent.offsetWidth) {
                    toolbarFloating.insertBefore(toolbarContent.lastChild, toolbarFloating.firstChild);
                }
            }
            // Show arrow
            if (toolbarFloating.children.length > 0) {
                toolbarContent.appendChild(toolbarArrow);
            }
        }
    }

    el.onclick = function(e) {
        var element = jSuites.findElement(e.target, 'jtoolbar-item');
        if (element) {
            obj.selectItem(element);
        }

        if (e.target.classList.contains('jtoolbar-arrow')) {
            obj.open();
        }
    }

    window.addEventListener('resize', function() {
        obj.refresh();
    });

    // Toolbar
    el.classList.add('jtoolbar');
    // Reset content
    el.innerHTML = '';
    // Container
    if (obj.options.container == true) {
        el.classList.add('jtoolbar-container');
    }
    // Content
    var toolbarContent = document.createElement('div');
    el.appendChild(toolbarContent);
    // Special toolbar for mobile applications
    if (obj.options.app) {
        el.classList.add('jtoolbar-mobile');
    }
    // Create toolbar
    obj.create(obj.options.items);
    // Shortcut
    el.toolbar = obj;

    return obj;
});

jSuites.validations = function(value, options) {
    if (typeof(jSuites.validations[options.type]) === 'function') {
        return jSuites.validations[options.type](value, options);
    }
    return null;
};

// Legacy
jSuites.validations.email = function(data) {
    var pattern = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    return data && pattern.test(data) ? true : false; 
}

jSuites.validations.required = function(data) {
    return data.trim() ? true : false;
}

jSuites.validations.number = function(data) {
    return jSuites.isNumber(data);
}

jSuites.validations.login = function(data) {
    var pattern = new RegExp(/^[a-zA-Z0-9\_\-\.\s+]+$/);
    return data && pattern.test(data) ? true : false;
}

/**
 * Options: Object,
 * Properties: 
 * Constraint,
 * Reference,
 * Value
 */

var valueComparisons = function(data, options) {
    if (options.constraint === '=') {
        return data === options.reference;
    }
    if (options.constraint === '<') {
        return data < options.reference;
    }
    if (options.constraint === '<=') {
        return data <= options.reference;
    }
    if (options.constraint === '>') {
        return data > options.reference;
    }
    if (options.constraint === '>=') {
        return data >= options.reference;
    }
    if (options.constraint === 'between') {
        return data >= options.reference[0] && data <= options.reference[1];
    }
    if (options.constraint === 'not between') {
        return data < options.reference[0] || data > options.reference[1];
    }

    return null;
}

jSuites.validations.number = function(data, options) {
    if (!jSuites.isNumeric(data)) {
        return false;
    }

    if (options === undefined || options.constraint === undefined) {
        return true;
    }

    return valueComparisons(data, options);
}

jSuites.validations.date = function(data, options) {
    if (new Date(data) == 'Invalid Date') {
        return false;
    }

    if (options === undefined || options.constraint === undefined) {
        return true;
    } else if (typeof(options) === 'object') {
        data = new Date(data).getTime();

        if (Array.isArray(options.reference)) {
            options.reference = options.reference.map(function(reference) {
                return new Date(reference).getTime();
            });
        } else {
            options.reference = new Date(options.reference).getTime();
        }

        return valueComparisons(data, options);
    }
    return null;
}

jSuites.validations.itemList = function(data, options) {
    return options.reference.some(function(reference) {
        return reference == data;
    });
}

jSuites.validations.text = function(data, options) {
    if (typeof data !== 'string') {
        return false;
    }

    if (options === undefined || options.constraint === undefined) {
        return true;
    }
    if (options.constraint === '=') {
        return data === options.reference;
    }
    if (options.constraint === 'contains') {
        return data.includes(options.reference);
    }
    if (options.constraint === 'not contain') {
        return !data.includes(options.reference);
    }
    if (options.constraint === 'email') {
        return jSuites.validations.email(data);
    }
    if (options.constraint === 'url') {
        var pattern = new RegExp(/(((https?:\/\/)|(www\.))[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|]+)/ig);
        return pattern.test(data) ? true : false;
    }
    return null;
}

jSuites.validations.constraints = function() {
}



    return jSuites;

})));
},{}],2:[function(require,module,exports){
/**
 * Jspreadsheet v4.9.3
 *
 * Website: https://bossanova.uk/jspreadsheet/
 * Description: Create amazing web based spreadsheets.
 *
 * This software is distribute under MIT License
 */

var formula = (function() {
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

    var met = {};

    met.datetime = (function() {
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

    met.database = (function() {
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

    met.engineering = (function() {
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

    met.financial = (function() {
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

    met.information = (function() {
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

    met.logical = (function() {
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

    met.math = (function() {
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
                            // empty
                        }
                        d = (i <= j) ? i : n;
                    } else {
                        d = 2;
                    }
                    for (n /= d, r *= d, i = o.length; i;
                         (o[--i] % d) === 0 && (o[i] /= d) === 1 && o.splice(i, 1)) {
                        // empty
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

        exports.SUMIF = function() {
            var args = utils.argsToArray(arguments);
            var criteria = args.pop();
            var range = utils.parseNumberArray(utils.flatten(args));
            if (range instanceof Error) {
                return range;
            }
            var result = 0;
            for (var i = 0; i < range.length; i++) {
                result += (eval(range[i] + criteria)) ? range[i] : 0; // jshint ignore:line
            }
            return result;
        };

        exports.SUMIFS = function () {
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
                for (var c = 0; c < n_criterias; c+=2) {
                    if(isNaN(criteria[c][i])){
                        condition += '"' + criteria[c][i] + '"' + criteria[c+1];
                    }
                    else {
                        condition += criteria[c][i] + criteria[c + 1];
                    }
                    if (c !== n_criterias - 1) {
                        condition += ' && ';
                    }
                }
                condition = condition.slice(0,-4)
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

    met.misc = (function() {
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

    met.text = (function() {
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

    met.stats = (function() {
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

        exports.COUNTIF = function() {
            var args = utils.argsToArray(arguments);
            var criteria = args.pop();
            var range = utils.flatten(args);
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

    met.utils = (function() {
        var exports = {};

        exports.PROGRESS = function(p, c) {
            var color = c ? c : 'red';
            var value = p ? p : '0';

            return '<div style="width:' + value + '%;height:4px;background-color:' + color + ';margin-top:1px;"></div>';
        };

        exports.RATING = function(v) {
            var html = '<div class="jrating">';
            for (var i = 0; i < 5; i++) {
                if (i < v) {
                    html += '<div class="jrating-selected"></div>';
                } else {
                    html += '<div></div>';
                }
            }
            html += '</div>';
            return html;
        }

        return exports;
    })();

    for (var i = 0; i < Object.keys(met).length; i++) {
        var methods = met[Object.keys(met)[i]];
        var keys = Object.keys(methods);
        for (var j = 0; j < keys.length; j++) {
            if (! methods[keys[j]]) {
                window[keys[j]] = function() {
                    return keys[j] + 'Not implemented';
                }
            } else if (typeof(methods[keys[j]]) == 'function' || typeof(methods[keys[j]]) == 'object') {
                window[keys[j]] = methods[keys[j]];
                window[keys[j]].toString = function() { return '#ERROR' };

                if (typeof(methods[keys[j]]) == 'object') {
                    var tmp = Object.keys(methods[keys[j]]);
                    for (var z = 0; z < tmp.length; z++) {
                        window[keys[j]][tmp[z]].toString = function() { return '#ERROR' };
                    }
                }
            } else {
                window[keys[j]] = function() {
                    return keys[j] + 'Not implemented';
                }
            }
        }
    }

    /**
     * Instance execution helpers
     */
    var x = null;
    var y = null;
    var instance = null;

    window['TABLE'] = function() {
        return instance;
    }
    window['COLUMN'] = window['COL'] = function () {
        return parseInt(x) + 1;
    }
    window['ROW'] =  function() {
        return parseInt(y) + 1;
    }
    window['CELL'] =  function() {
        return F.getColumnNameFromCoords(x, y);
    }
    window['VALUE'] = function(col, row, processed) {
        return instance.getValueFromCoords(parseInt(col) - 1, parseInt(row) - 1, processed);
    }
    window['THISROWCELL'] = function(col) {
        return instance.getValueFromCoords(parseInt(col) - 1, parseInt(y));
    }

    // Secure formula
    var secureFormula = function(oldValue, runtime) {
        var newValue = '';
        var inside = 0;

        var special = [ '=', '!', '>', '<'];

        for (var i = 0; i < oldValue.length; i++) {
            if (oldValue[i] == '"') {
                if (inside == 0) {
                    inside = 1;
                } else {
                    inside = 0;
                }
            }

            if (inside == 1) {
                newValue += oldValue[i];
            } else {
                newValue += oldValue[i].toUpperCase();

                if (runtime == true) {
                    if (i > 0 && oldValue[i] == '=' && special.indexOf(oldValue[i-1]) == -1 && special.indexOf(oldValue[i+1]) == -1) {
                        newValue += '='
                    }
                }
            }
        }

        // Adapt to JS
        newValue = newValue.replace(/\^/g, '**');
        newValue = newValue.replace(/\<\>/g, '!=');
        newValue = newValue.replace(/\&/g, '+');
        newValue = newValue.replace(/\$/g, '');

        return newValue;
    }

    // Convert range tokens
    var tokensUpdate = function(tokens, e) {
        for (var index = 0; index < tokens.length; index++) {
            var f = F.getTokensFromRange(tokens[index])
            e = e.replace(tokens[index], "[" + f.join(',') + "]");
        }
        return e;
    }

    var F = function(expression, variables, i, j, obj) {
        // Global helpers
        instance = obj;
        x = i
        y = j;
        // String
        var s = '';
        var keys = Object.keys(variables);
        if (keys.length) {
            for (var i = 0; i < keys.length; i++) {
                if (keys[i].indexOf('.') == -1 && keys[i].indexOf('!') == -1) {
                    s += 'var ' + keys[i] + ' = ' + variables[keys[i]] + ';\n';
                } else {
                    s += keys[i] + ' = ' + variables[keys[i]] + ';\n';
                }
            }
        }
        // Remove $
        expression = expression.replace(/\$/g, '');
        // Replace ! per dot
        expression = expression.replace(/\!/g, '.');
        // Adapt to JS
        expression = secureFormula(expression, true);
        // Update range
        var tokens = expression.match(/([A-Z]+[0-9]*\.)?(\$?[A-Z]+\$?[0-9]+):(\$?[A-Z]+\$?[0-9]+)?/g);
        if (tokens && tokens.length) {
            expression = tokensUpdate(tokens, expression);
        }

        // Calculate
        return new Function(s + '; return ' + expression)();
    }

    /**
     * Get letter based on a number
     * @param {number} i
     * @return {string}
     */
    var getColumnName = function(i) {
        var letter = '';
        if (i > 701) {
            letter += String.fromCharCode(64 + parseInt(i / 676));
            letter += String.fromCharCode(64 + parseInt((i % 676) / 26));
        } else if (i > 25) {
            letter += String.fromCharCode(64 + parseInt(i / 26));
        }
        letter += String.fromCharCode(65 + (i % 26));

        return letter;
    }

    /**
     * Get column name from coords
     */
    F.getColumnNameFromCoords = function(x, y) {
        return getColumnName(parseInt(x)) + (parseInt(y) + 1);
    }

    F.getCoordsFromColumnName = function(columnName) {
        // Get the letters
        var t = /^[a-zA-Z]+/.exec(columnName);

        if (t) {
            // Base 26 calculation
            var code = 0;
            for (var i = 0; i < t[0].length; i++) {
                code += parseInt(t[0].charCodeAt(i) - 64) * Math.pow(26, (t[0].length - 1 - i));
            }
            code--;
            // Make sure jspreadsheet starts on zero
            if (code < 0) {
                code = 0;
            }

            // Number
            var number = parseInt(/[0-9]+$/.exec(columnName)) || null;
            if (number > 0) {
                number--;
            }

            return [ code, number ];
        }
    }

    F.getRangeFromTokens = function(tokens) {
        tokens = tokens.filter(function(v) {
            return v != '#REF!';
        });

        var d = '';
        var t = '';
        for (var i = 0; i < tokens.length; i++) {
            if (tokens[i].indexOf('.') >= 0) {
                d = '.';
            } else if (tokens[i].indexOf('!') >= 0) {
                d = '!';
            }
            if (d) {
                t = tokens[i].split(d);
                tokens[i] = t[1];
                t = t[0] + d
            }
        }

        tokens.sort(function(a, b) {
            var t1 = Helpers.getCoordsFromColumnName(a);
            var t2 = Helpers.getCoordsFromColumnName(b);
            if (t1[1] > t2[1]) {
                return 1;
            } else if (t1[1] < t2[1]) {
                return -1;
            } else {
                if (t1[0] > t2[0]) {
                    return 1;
                } else if (t1[0] < t2[0]) {
                    return -1;
                } else {
                    return 0;
                }
            }
        });

        if (! tokens.length) {
            return '#REF!';
        } else {
            return t+(tokens[0] + ':' + tokens[tokens.length - 1]);
        }
    }

    F.getTokensFromRange = function(range) {
        if (range.indexOf('.') > 0) {
            var t = range.split('.');
            range = t[1];
            t = t[0] + '.';
        } else if (range.indexOf('!') > 0) {
            var t = range.split('!');
            range = t[1];
            t = t[0] + '!';
        } else {
            var t = '';
        }

        var range = range.split(':');
        var e1 = F.getCoordsFromColumnName(range[0]);
        var e2 = F.getCoordsFromColumnName(range[1]);

        if (e1[0] <= e2[0]) {
            var x1 = e1[0];
            var x2 = e2[0];
        } else {
            var x1 = e2[0];
            var x2 = e1[0];
        }

        if (e1[1] === null && e2[1] == null) {
            var y1 = null;
            var y2 = null;

            var k = Object.keys(vars);
            for (var i = 0; i < k.length; i++) {
                var tmp = F.getCoordsFromColumnName(k[i]);
                if (tmp[0] === e1[0]) {
                    if (y1 === null || tmp[1] < y1) {
                        y1 = tmp[1]
                    }
                }
                if (tmp[0] === e2[0]) {
                    if (y2 === null || tmp[1] > y2) {
                        y2 = tmp[1]
                    }
                }
            }
        } else {
            if (e1[1] <= e2[1]) {
                var y1 = e1[1];
                var y2 = e2[1];
            } else {
                var y1 = e2[1];
                var y2 = e1[1];
            }
        }

        var f = [];
        for (var j = y1; j <= y2; j++) {
            var line = [];
            for (var i = x1; i <= x2; i++) {
                line.push(t + F.getColumnNameFromCoords(i, j));
            }
            f.push(line);
        }

        return f;
    }

    F.setFormula = function(o) {
        var k = Object.keys(o);
        for (var i = 0; i < k.length; i++) {
            if (typeof(o[k[i]]) == 'function') {
                window[k[i]] = o[k[i]];
            }
        }
    }

    return F;
})();

if (! jSuites && typeof(require) === 'function') {
    var jSuites = require('jsuites');
}

;(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    global.jspreadsheet = global.jexcel = factory();
}(this, (function () {

    'use strict';

    // Basic version information
    var Version = function() {
        // Information
        var info = {
            title: 'Jspreadsheet',
            version: '4.9.3',
            type: 'CE',
            host: 'https://bossanova.uk/jspreadsheet',
            license: 'MIT',
            print: function() {
                return [ this.title + ' ' + this.type + ' ' + this.version, this.host, this.license ].join('\r\n'); 
            }
        }

        return function() {
            return info;
        };
    }();

    /**
     * The value is a formula
     */
    var isFormula = function(value) {
        var v = (''+value)[0];
        return v == '=' || v == '#' ? true : false;
    }

    /**
     * Get the mask in the jSuites.mask format
     */
    var getMask = function(o) {
        if (o.format || o.mask || o.locale) {
            var opt = {};
            if (o.mask) {
                opt.mask = o.mask;
            } else if (o.format) {
                opt.mask = o.format;
            } else {
                opt.locale = o.locale;
                opt.options = o.options;
            }

            if (o.decimal) {
                if (! opt.options) {
                    opt.options = {};
                }
                opt.options = { decimal: o.decimal };
            }
            return opt;
        }

        return null;
    }

    // Jspreadsheet core object
    var jexcel = (function(el, options) {
        // Create jspreadsheet object
        var obj = {};
        obj.options = {};

        if (! (el instanceof Element || el instanceof HTMLDocument)) {
            console.error('Jspreadsheet: el is not a valid DOM element');
            return false;
        } else if (el.tagName == 'TABLE') {
            if (options = jexcel.createFromTable(el, options)) {
                var div = document.createElement('div');
                el.parentNode.insertBefore(div, el);
                el.remove();
                el = div;
            } else {
                console.error('Jspreadsheet: el is not a valid DOM element');
                return false;
            }
        }

        // Loading default configuration
        var defaults = {
            // External data
            url:null,
            // Ajax options
            method: 'GET',
            requestVariables: null,
            // Data
            data:null,
            // Custom sorting handler
            sorting:null,
            // Copy behavior
            copyCompatibility:false,
            root:null,
            // Rows and columns definitions
            rows:[],
            columns:[],
            // Deprected legacy options
            colHeaders:[],
            colWidths:[],
            colAlignments:[],
            nestedHeaders:null,
            // Column width that is used by default
            defaultColWidth:50,
            defaultColAlign:'center',
            // Rows height default
            defaultRowHeight: null,
            // Spare rows and columns
            minSpareRows:0,
            minSpareCols:0,
            // Minimal table dimensions
            minDimensions:[0,0],
            // Allow Export
            allowExport:true,
            // @type {boolean} - Include the header titles on download
            includeHeadersOnDownload:false,
            // @type {boolean} - Include the header titles on copy
            includeHeadersOnCopy:false,
            // Allow column sorting
            columnSorting:true,
            // Allow column dragging
            columnDrag:false,
            // Allow column resizing
            columnResize:true,
            // Allow row resizing
            rowResize:false,
            // Allow row dragging
            rowDrag:true,
            // Allow table edition
            editable:true,
            // Allow new rows
            allowInsertRow:true,
            // Allow new rows
            allowManualInsertRow:true,
            // Allow new columns
            allowInsertColumn:true,
            // Allow new rows
            allowManualInsertColumn:true,
            // Allow row delete
            allowDeleteRow:true,
            // Allow deleting of all rows
            allowDeletingAllRows:false,
            // Allow column delete
            allowDeleteColumn:true,
            // Allow rename column
            allowRenameColumn:true,
            // Allow comments
            allowComments:false,
            // Global wrap
            wordWrap:false,
            // Image options
            imageOptions: null,
            // CSV source
            csv:null,
            // Filename
            csvFileName:'jspreadsheet',
            // Consider first line as header
            csvHeaders:true,
            // Delimiters
            csvDelimiter:',',
            // First row as header
            parseTableFirstRowAsHeader:false,
            parseTableAutoCellType:false,
            // Disable corner selection
            selectionCopy:true,
            // Merged cells
            mergeCells:{},
            // Create toolbar
            toolbar:null,
            // Allow search
            search:false,
            // Create pagination
            pagination:false,
            paginationOptions:null,
            // Full screen
            fullscreen:false,
            // Lazy loading
            lazyLoading:false,
            loadingSpin:false,
            // Table overflow
            tableOverflow:false,
            tableHeight:'300px',
            tableWidth:null,
            textOverflow:false,
            // Meta
            meta: null,
            // Style
            style:null,
            classes:null,
            // Execute formulas
            parseFormulas:true,
            autoIncrement:true,
            autoCasting:true,
            // Security
            secureFormulas:true,
            stripHTML:true,
            stripHTMLOnCopy:false,
            // Filters
            filters:false,
            footers:null,
            // Event handles
            onundo:null,
            onredo:null,
            onload:null,
            onchange:null,
            oncomments:null,
            onbeforechange:null,
            onafterchanges:null,
            onbeforeinsertrow: null,
            oninsertrow:null,
            onbeforeinsertcolumn: null,
            oninsertcolumn:null,
            onbeforedeleterow:null,
            ondeleterow:null,
            onbeforedeletecolumn:null,
            ondeletecolumn:null,
            onmoverow:null,
            onmovecolumn:null,
            onresizerow:null,
            onresizecolumn:null,
            onsort:null,
            onselection:null,
            oncopy:null,
            onpaste:null,
            onbeforepaste:null,
            onmerge:null,
            onfocus:null,
            onblur:null,
            onchangeheader:null,
            oncreateeditor:null,
            oneditionstart:null,
            oneditionend:null,
            onchangestyle:null,
            onchangemeta:null,
            onchangepage:null,
            onbeforesave:null,
            onsave:null,
            // Global event dispatcher
            onevent:null,
            // Persistance
            persistance:false,
            // Customize any cell behavior
            updateTable:null,
            // Detach the HTML table when calling updateTable
            detachForUpdates: false,
            freezeColumns:null,
            // Texts
            text:{
                noRecordsFound: 'No records found',
                showingPage: 'Showing page {0} of {1} entries',
                show: 'Show ',
                search: 'Search',
                entries: ' entries',
                columnName: 'Column name',
                insertANewColumnBefore: 'Insert a new column before',
                insertANewColumnAfter: 'Insert a new column after',
                deleteSelectedColumns: 'Delete selected columns',
                renameThisColumn: 'Rename this column',
                orderAscending: 'Order ascending',
                orderDescending: 'Order descending',
                insertANewRowBefore: 'Insert a new row before',
                insertANewRowAfter: 'Insert a new row after',
                deleteSelectedRows: 'Delete selected rows',
                editComments: 'Edit comments',
                addComments: 'Add comments',
                comments: 'Comments',
                clearComments: 'Clear comments',
                copy: 'Copy...',
                paste: 'Paste...',
                saveAs: 'Save as...',
                about: 'About',
                areYouSureToDeleteTheSelectedRows: 'Are you sure to delete the selected rows?',
                areYouSureToDeleteTheSelectedColumns: 'Are you sure to delete the selected columns?',
                thisActionWillDestroyAnyExistingMergedCellsAreYouSure: 'This action will destroy any existing merged cells. Are you sure?',
                thisActionWillClearYourSearchResultsAreYouSure: 'This action will clear your search results. Are you sure?',
                thereIsAConflictWithAnotherMergedCell: 'There is a conflict with another merged cell',
                invalidMergeProperties: 'Invalid merged properties',
                cellAlreadyMerged: 'Cell already merged',
                noCellsSelected: 'No cells selected',
            },
            // About message
            about: true,
        };
    
        // Loading initial configuration from user
        for (var property in defaults) {
            if (options && options.hasOwnProperty(property)) {
                if (property === 'text') {
                    obj.options[property] = defaults[property];
                    for (var textKey in options[property]) {
                        if (options[property].hasOwnProperty(textKey)){
                            obj.options[property][textKey] = options[property][textKey];
                        }
                    }
                } else {
                    obj.options[property] = options[property];
                }
            } else {
                obj.options[property] = defaults[property];
            }
        }

        // Global elements
        obj.el = el;
        obj.corner = null;
        obj.contextMenu = null;
        obj.textarea = null;
        obj.ads = null;
        obj.content = null;
        obj.table = null;
        obj.thead = null;
        obj.tbody = null;
        obj.rows = [];
        obj.results = null;
        obj.searchInput = null;
        obj.toolbar = null;
        obj.pagination = null;
        obj.pageNumber = null;
        obj.headerContainer = null;
        obj.colgroupContainer = null;
    
        // Containers
        obj.headers = [];
        obj.records = [];
        obj.history = [];
        obj.formula = [];
        obj.colgroup = [];
        obj.selection = [];
        obj.highlighted  = [];
        obj.selectedCell = null;
        obj.selectedContainer = null;
        obj.style = [];
        obj.data = null;
        obj.filter = null;
        obj.filters = [];

        // Internal controllers
        obj.cursor = null;
        obj.historyIndex = -1;
        obj.ignoreEvents = false;
        obj.ignoreHistory = false;
        obj.edition = null;
        obj.hashString = null;
        obj.resizing = null;
        obj.dragging = null;
    
        // Lazy loading
        if (obj.options.lazyLoading == true && (obj.options.tableOverflow == false && obj.options.fullscreen == false)) {
            console.error('Jspreadsheet: The lazyloading only works when tableOverflow = yes or fullscreen = yes');
            obj.options.lazyLoading = false;
        }
        
        /**
         * Activate/Disable fullscreen 
         * use programmatically : table.fullscreen(); or table.fullscreen(true); or table.fullscreen(false);
         * @Param {boolean} activate
         */
        obj.fullscreen = function(activate) {
            // If activate not defined, get reverse options.fullscreen
            if (activate == null) {
                activate = ! obj.options.fullscreen;
            }
    
            // If change
            if (obj.options.fullscreen != activate) {
                obj.options.fullscreen = activate;
    
                // Test LazyLoading conflict
                if (activate == true) {
                    el.classList.add('fullscreen');
                } else {
                    el.classList.remove('fullscreen');
                }
            } 
        }

        /**
         * Trigger events
         */
        obj.dispatch = function(event) {
            // Dispatch events
            if (! obj.ignoreEvents) {
                // Call global event
                if (typeof(obj.options.onevent) == 'function') {
                    var ret = obj.options.onevent.apply(this, arguments);
                }
                // Call specific events
                if (typeof(obj.options[event]) == 'function') {
                    var ret = obj.options[event].apply(this, Array.prototype.slice.call(arguments, 1));
                }
            }

            // Persistance
            if (event == 'onafterchanges' && obj.options.persistance) {
                var url = obj.options.persistance == true ? obj.options.url : obj.options.persistance;
                var data = obj.prepareJson(arguments[2]);
                obj.save(url, data);
            }

            return ret;
        }

        /**
         * Prepare the jspreadsheet table
         * 
         * @Param config
         */
        obj.prepareTable = function() {
            // Loading initial data from remote sources
            var results = [];
    
            // Number of columns
            var size = obj.options.columns.length;
    
            if (obj.options.data && typeof(obj.options.data[0]) !== 'undefined') {
                // Data keys
                var keys = Object.keys(obj.options.data[0]);
    
                if (keys.length > size) {
                    size = keys.length;
                }
            }
    
            // Minimal dimensions
            if (obj.options.minDimensions[0] > size) {
                size = obj.options.minDimensions[0];
            }
    
            // Requests
            var multiple = [];
    
            // Preparations
            for (var i = 0; i < size; i++) {
                // Deprected options. You should use only columns
                if (! obj.options.colHeaders[i]) {
                    obj.options.colHeaders[i] = '';
                }
                if (! obj.options.colWidths[i]) {
                    obj.options.colWidths[i] = obj.options.defaultColWidth;
                }
                if (! obj.options.colAlignments[i]) {
                    obj.options.colAlignments[i] = obj.options.defaultColAlign;
                }
    
                // Default column description
                if (! obj.options.columns[i]) {
                    obj.options.columns[i] = { type:'text' };
                } else if (! obj.options.columns[i].type) {
                    obj.options.columns[i].type = 'text';
                }
                if (! obj.options.columns[i].name) {
                    obj.options.columns[i].name = keys && keys[i] ? keys[i] : i;
                }
                if (! obj.options.columns[i].source) {
                    obj.options.columns[i].source = [];
                }
                if (! obj.options.columns[i].options) {
                    obj.options.columns[i].options = [];
                }
                if (! obj.options.columns[i].editor) {
                    obj.options.columns[i].editor = null;
                }
                if (! obj.options.columns[i].allowEmpty) {
                    obj.options.columns[i].allowEmpty = false;
                }
                if (! obj.options.columns[i].title) {
                    obj.options.columns[i].title = obj.options.colHeaders[i] ? obj.options.colHeaders[i] : '';
                }
                if (! obj.options.columns[i].width) {
                    obj.options.columns[i].width = obj.options.colWidths[i] ? obj.options.colWidths[i] : obj.options.defaultColWidth;
                }
                if (! obj.options.columns[i].align) {
                    obj.options.columns[i].align = obj.options.colAlignments[i] ? obj.options.colAlignments[i] : 'center';
                }
    
                // Pre-load initial source for json autocomplete
                if (obj.options.columns[i].type == 'autocomplete' || obj.options.columns[i].type == 'dropdown') {
                    // if remote content
                    if (obj.options.columns[i].url) {
                        multiple.push({
                            url: obj.options.columns[i].url,
                            index: i,
                            method: 'GET',
                            dataType: 'json',
                            success: function(data) {
                                var source = [];
                                for (var i = 0; i < data.length; i++) {
                                    obj.options.columns[this.index].source.push(data[i]);
                                }
                            }
                        });
                    }
                } else if (obj.options.columns[i].type == 'calendar') {
                    // Default format for date columns
                    if (! obj.options.columns[i].options.format) {
                        obj.options.columns[i].options.format = 'DD/MM/YYYY';
                    }
                }
            }
            // Create the table when is ready
            if (! multiple.length) {
                obj.createTable();
            } else {
                jSuites.ajax(multiple, function() {
                    obj.createTable();
                });
            }
        }
    
        obj.createTable = function() {
            // Elements
            obj.table = document.createElement('table');
            obj.thead = document.createElement('thead');
            obj.tbody = document.createElement('tbody');

            // Create headers controllers
            obj.headers = [];
            obj.colgroup = [];
    
            // Create table container
            obj.content = document.createElement('div');
            obj.content.classList.add('jexcel_content');
            obj.content.onscroll = function(e) {
                obj.scrollControls(e);
            }
            obj.content.onwheel = function(e) {
                obj.wheelControls(e);
            }

            // Create toolbar object
            obj.toolbar = document.createElement('div');
            obj.toolbar.classList.add('jexcel_toolbar');
    
            // Search
            var searchContainer = document.createElement('div');
            var searchText = document.createTextNode((obj.options.text.search) + ': ');
            obj.searchInput = document.createElement('input');
            obj.searchInput.classList.add('jexcel_search');
            searchContainer.appendChild(searchText);
            searchContainer.appendChild(obj.searchInput);
            obj.searchInput.onfocus = function() {
                obj.resetSelection();
            }
    
            // Pagination select option
            var paginationUpdateContainer = document.createElement('div');
    
            if (obj.options.pagination > 0 && obj.options.paginationOptions && obj.options.paginationOptions.length > 0) {
                obj.paginationDropdown = document.createElement('select');
                obj.paginationDropdown.classList.add('jexcel_pagination_dropdown');
                obj.paginationDropdown.onchange = function() {
                    obj.options.pagination = parseInt(this.value);
                    obj.page(0);
                }
    
                for (var i = 0; i < obj.options.paginationOptions.length; i++) {
                    var temp = document.createElement('option');
                    temp.value = obj.options.paginationOptions[i];
                    temp.innerHTML = obj.options.paginationOptions[i];
                    obj.paginationDropdown.appendChild(temp);
                }
    
                // Set initial pagination value
                obj.paginationDropdown.value = obj.options.pagination;

                paginationUpdateContainer.appendChild(document.createTextNode(obj.options.text.show));
                paginationUpdateContainer.appendChild(obj.paginationDropdown);
                paginationUpdateContainer.appendChild(document.createTextNode(obj.options.text.entries));
            }
    
            // Filter and pagination container
            var filter = document.createElement('div');
            filter.classList.add('jexcel_filter');
            filter.appendChild(paginationUpdateContainer);
            filter.appendChild(searchContainer);
    
            // Colsgroup
            obj.colgroupContainer = document.createElement('colgroup');
            var tempCol = document.createElement('col');
            tempCol.setAttribute('width', '50');
            obj.colgroupContainer.appendChild(tempCol);
    
            // Nested
            if (obj.options.nestedHeaders && obj.options.nestedHeaders.length > 0) {
                // Flexible way to handle nestedheaders
                if (obj.options.nestedHeaders[0] && obj.options.nestedHeaders[0][0]) {
                    for (var j = 0; j < obj.options.nestedHeaders.length; j++) {
                        obj.thead.appendChild(obj.createNestedHeader(obj.options.nestedHeaders[j]));
                    }
                } else {
                    obj.thead.appendChild(obj.createNestedHeader(obj.options.nestedHeaders));
                }
            }
    
            // Row
            obj.headerContainer = document.createElement('tr');
            var tempCol = document.createElement('td');
            tempCol.classList.add('jexcel_selectall');
            obj.headerContainer.appendChild(tempCol);
    
            for (var i = 0; i < obj.options.columns.length; i++) {
                // Create header
                obj.createCellHeader(i);
                // Append cell to the container
                obj.headerContainer.appendChild(obj.headers[i]);
                obj.colgroupContainer.appendChild(obj.colgroup[i]);
            }

            obj.thead.appendChild(obj.headerContainer);

            // Filters
            if (obj.options.filters == true) {
                obj.filter = document.createElement('tr');
                var td = document.createElement('td');
                obj.filter.appendChild(td);

                for (var i = 0; i < obj.options.columns.length; i++) {
                    var td = document.createElement('td');
                    td.innerHTML = '&nbsp;';
                    td.setAttribute('data-x', i);
                    td.className = 'jexcel_column_filter';
                    if (obj.options.columns[i].type == 'hidden') {
                        td.style.display = 'none';
                    }
                    obj.filter.appendChild(td);
                }

                obj.thead.appendChild(obj.filter);
            }

            // Content table
            obj.table = document.createElement('table');
            obj.table.classList.add('jexcel');
            obj.table.setAttribute('cellpadding', '0');
            obj.table.setAttribute('cellspacing', '0');
            obj.table.setAttribute('unselectable', 'yes');
            //obj.table.setAttribute('onselectstart', 'return false');
            obj.table.appendChild(obj.colgroupContainer);
            obj.table.appendChild(obj.thead);
            obj.table.appendChild(obj.tbody);

            if (! obj.options.textOverflow) {
                obj.table.classList.add('jexcel_overflow');
            }

            // Spreadsheet corner
            obj.corner = document.createElement('div');
            obj.corner.className = 'jexcel_corner';
            obj.corner.setAttribute('unselectable', 'on');
            obj.corner.setAttribute('onselectstart', 'return false');
    
            if (obj.options.selectionCopy == false) {
                obj.corner.style.display = 'none';
            }
    
            // Textarea helper
            obj.textarea = document.createElement('textarea');
            obj.textarea.className = 'jexcel_textarea';
            obj.textarea.id = 'jexcel_textarea';
            obj.textarea.tabIndex = '-1';

            // Contextmenu container
            obj.contextMenu = document.createElement('div');
            obj.contextMenu.className = 'jexcel_contextmenu';
    
            // Create element
            jSuites.contextmenu(obj.contextMenu, {
                onclick:function() {
                    obj.contextMenu.contextmenu.close(false);
                }
            });
    
            // Powered by Jspreadsheet
            var ads = document.createElement('a');
            ads.setAttribute('href', 'https://bossanova.uk/jspreadsheet/');
            obj.ads = document.createElement('div');
            obj.ads.className = 'jexcel_about';
            try {
                if (typeof(sessionStorage) !== "undefined" && ! sessionStorage.getItem('jexcel')) {
                    sessionStorage.setItem('jexcel', true);
                    var img = document.createElement('img');
                    img.src = '//bossanova.uk/jspreadsheet/logo.png';
                    ads.appendChild(img);
                }
            } catch (exception) {
            }
            var span = document.createElement('span');
            span.innerHTML = 'Jspreadsheet CE';
            ads.appendChild(span);
            obj.ads.appendChild(ads);

            // Create table container TODO: frozen columns
            var container = document.createElement('div');
            container.classList.add('jexcel_table');
    
            // Pagination
            obj.pagination = document.createElement('div');
            obj.pagination.classList.add('jexcel_pagination');
            var paginationInfo = document.createElement('div');
            var paginationPages = document.createElement('div');
            obj.pagination.appendChild(paginationInfo);
            obj.pagination.appendChild(paginationPages);

            // Hide pagination if not in use
            if (! obj.options.pagination) {
                obj.pagination.style.display = 'none';
            }

            // Append containers to the table
            if (obj.options.search == true) {
                el.appendChild(filter);
            }
    
            // Elements
            obj.content.appendChild(obj.table);
            obj.content.appendChild(obj.corner);
            obj.content.appendChild(obj.textarea);
    
            el.appendChild(obj.toolbar);
            el.appendChild(obj.content);
            el.appendChild(obj.pagination);
            el.appendChild(obj.contextMenu);
            el.appendChild(obj.ads);
            el.classList.add('jexcel_container');
    
            // Create toolbar
            if (obj.options.toolbar && obj.options.toolbar.length) {
                obj.createToolbar();
            }
    
            // Fullscreen
            if (obj.options.fullscreen == true) {
                el.classList.add('fullscreen');
            } else {
                // Overflow
                if (obj.options.tableOverflow == true) {
                    if (obj.options.tableHeight) {
                        obj.content.style['overflow-y'] = 'auto';
                        obj.content.style['box-shadow'] = 'rgb(221 221 221) 2px 2px 5px 0.1px';
                        obj.content.style.maxHeight = obj.options.tableHeight;
                    }
                    if (obj.options.tableWidth) {
                        obj.content.style['overflow-x'] = 'auto';
                        obj.content.style.width = obj.options.tableWidth;
                    }
                }
            }
    
            // With toolbars
            if (obj.options.tableOverflow != true && obj.options.toolbar) {
                el.classList.add('with-toolbar');
            }
    
            // Actions
            if (obj.options.columnDrag == true) {
                obj.thead.classList.add('draggable');
            }
            if (obj.options.columnResize == true) {
                obj.thead.classList.add('resizable');
            }
            if (obj.options.rowDrag == true) {
                obj.tbody.classList.add('draggable');
            }
            if (obj.options.rowResize == true) {
                obj.tbody.classList.add('resizable');
            }
    
            // Load data
            obj.setData();
    
            // Style
            if (obj.options.style) {
                obj.setStyle(obj.options.style, null, null, 1, 1);
            }

            // Classes
            if (obj.options.classes) {
                var k = Object.keys(obj.options.classes);
                for (var i = 0; i < k.length; i++) {
                    var cell = jexcel.getIdFromColumnName(k[i], true);
                    obj.records[cell[1]][cell[0]].classList.add(obj.options.classes[k[i]]);
                }
            }
        }

        /**
         * Refresh the data
         * 
         * @return void
         */
        obj.refresh = function() {
            if (obj.options.url) {
                // Loading
                if (obj.options.loadingSpin == true) {
                    jSuites.loading.show();
                }
    
                jSuites.ajax({
                    url: obj.options.url,
                    method: obj.options.method,
                    data: obj.options.requestVariables,
                    dataType: 'json',
                    success: function(result) {
                        // Data
                        obj.options.data = (result.data) ? result.data : result;
                        // Prepare table
                        obj.setData();
                        // Hide spin
                        if (obj.options.loadingSpin == true) {
                            jSuites.loading.hide();
                        }
                    }
                });
            } else {
                obj.setData();
            }
        }

        /**
         * Set data
         * 
         * @param array data In case no data is sent, default is reloaded
         * @return void
         */
        obj.setData = function(data) {
            // Update data
            if (data) {
                if (typeof(data) == 'string') {
                    data = JSON.parse(data);
                }
    
                obj.options.data = data;
            }
    
            // Data
            if (! obj.options.data) {
                obj.options.data = [];
            }
    
            // Prepare data
            if (obj.options.data && obj.options.data[0]) {
                if (! Array.isArray(obj.options.data[0])) {
                    var data = [];
                    for (var j = 0; j < obj.options.data.length; j++) {
                        var row = [];
                        for (var i = 0; i < obj.options.columns.length; i++) {
                            row[i] = obj.options.data[j][obj.options.columns[i].name];
                        }
                        data.push(row);
                    }

                    obj.options.data = data;
                }
            }

            // Adjust minimal dimensions
            var j = 0;
            var i = 0;
            var size_i = obj.options.columns.length;
            var size_j = obj.options.data.length;
            var min_i = obj.options.minDimensions[0];
            var min_j = obj.options.minDimensions[1];
            var max_i = min_i > size_i ? min_i : size_i;
            var max_j = min_j > size_j ? min_j : size_j;
    
            for (j = 0; j < max_j; j++) {
                for (i = 0; i < max_i; i++) {
                    if (obj.options.data[j] == undefined) {
                        obj.options.data[j] = [];
                    }
    
                    if (obj.options.data[j][i] == undefined) {
                        obj.options.data[j][i] = '';
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
            obj.tbody.innerHTML = '';
    
            // Lazy loading
            if (obj.options.lazyLoading == true) {
                // Load only 100 records
                var startNumber = 0
                var finalNumber = obj.options.data.length < 100 ? obj.options.data.length : 100;
    
                if (obj.options.pagination) {
                    obj.options.pagination = false;
                    console.error('Jspreadsheet: Pagination will be disable due the lazyLoading');
                }
            } else if (obj.options.pagination) {
                // Pagination
                if (! obj.pageNumber) {
                    obj.pageNumber = 0;
                }
                var quantityPerPage = obj.options.pagination;
                startNumber = (obj.options.pagination * obj.pageNumber);
                finalNumber = (obj.options.pagination * obj.pageNumber) + obj.options.pagination;
    
                if (obj.options.data.length < finalNumber) {
                    finalNumber = obj.options.data.length;
                }
            } else {
                var startNumber = 0;
                var finalNumber = obj.options.data.length;
            }
    
            // Append nodes to the HTML
            for (j = 0; j < obj.options.data.length; j++) {
                // Create row
                var tr = obj.createRow(j, obj.options.data[j]);
                // Append line to the table
                if (j >= startNumber && j < finalNumber) {
                    obj.tbody.appendChild(tr);
                }
            }
    
            if (obj.options.lazyLoading == true) {
                // Do not create pagination with lazyloading activated
            } else if (obj.options.pagination) {
                obj.updatePagination();
            }
    
            // Merge cells
            if (obj.options.mergeCells) {
                var keys = Object.keys(obj.options.mergeCells);
                for (var i = 0; i < keys.length; i++) {
                    var num = obj.options.mergeCells[keys[i]];
                    obj.setMerge(keys[i], num[0], num[1], 1);
                }
            }

            // Updata table with custom configurations if applicable
            obj.updateTable();

            // Onload
            obj.dispatch('onload', el, obj);
        }

        /**
         * Get the whole table data
         * 
         * @param bool get highlighted cells only
         * @return array data
         */
        obj.getData = function(highlighted, dataOnly) {
            // Control vars
            var dataset = [];
            var px = 0;
            var py = 0;

            // Data type
            var dataType = dataOnly == true || obj.options.copyCompatibility == false ? true : false;

            // Column and row length
            var x = obj.options.columns.length
            var y = obj.options.data.length
    
            // Go through the columns to get the data
            for (var j = 0; j < y; j++) {
                px = 0;
                for (var i = 0; i < x; i++) {
                    // Cell selected or fullset
                    if (! highlighted || obj.records[j][i].classList.contains('highlight')) {
                        // Get value
                        if (! dataset[py]) {
                            dataset[py] = [];
                        }
                        if (! dataType) {
                            dataset[py][px] = obj.records[j][i].innerHTML;
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
    
           return dataset;
        }

        /**
        * Get json data by row number
        *
        * @param integer row number
        * @return object
        */
        obj.getJsonRow = function(rowNumber) {
            var rowData = obj.options.data[rowNumber];
            var x = obj.options.columns.length

            var row = {};
            for (var i = 0; i < x; i++) {
                if (! obj.options.columns[i].name) {
                    obj.options.columns[i].name = i;
                }
                row[obj.options.columns[i].name] = rowData[i];
            }

            return row;
        }

        /**
         * Get the whole table data
         * 
         * @param bool highlighted cells only
         * @return string value
         */
        obj.getJson = function(highlighted) {
            // Control vars
            var data = [];
    
            // Column and row length
            var x = obj.options.columns.length
            var y = obj.options.data.length
    
            // Go through the columns to get the data
            for (var j = 0; j < y; j++) {
                var row = null;
                for (var i = 0; i < x; i++) {
                    if (! highlighted || obj.records[j][i].classList.contains('highlight')) {
                        if (row == null) {
                            row = {};
                        }
                        if (! obj.options.columns[i].name) {
                            obj.options.columns[i].name = i;
                        }
                        row[obj.options.columns[i].name] = obj.options.data[j][i];
                    }
                }
    
                if (row != null) {
                    data.push(row);
                }
           }
    
           return data;
        }

        /**
         * Prepare JSON in the correct format
         */
        obj.prepareJson = function(data) {
            var rows = [];
            for (var i = 0; i < data.length; i++) {
                var x = data[i].x;
                var y = data[i].y;
                var k = obj.options.columns[x].name ? obj.options.columns[x].name : x;

                // Create row
                if (! rows[y]) {
                    rows[y] = {
                        row: y,
                        data: {},
                    };
                }
                rows[y].data[k] = data[i].newValue;
            }

            // Filter rows
            return rows.filter(function (el) {
                return el != null;
            });
        }

        /**
         * Post json to a remote server
         */
        obj.save = function(url, data) {
            // Parse anything in the data before sending to the server
            var ret = obj.dispatch('onbeforesave', el, obj, data);
            if (ret) {
                var data = ret;
            } else {
                if (ret === false) {
                    return false;
                }
            }

            // Remove update
            jSuites.ajax({
                url: url,
                method: 'POST',
                dataType: 'json',
                data: { data: JSON.stringify(data) },
                success: function(result) {
                    // Event
                    obj.dispatch('onsave', el, obj, data);
                }
            });
        }

        /**
         * Get a row data by rowNumber
         */
        obj.getRowData = function(rowNumber) {
            return obj.options.data[rowNumber];
        }
    
        /**
         * Set a row data by rowNumber
         */
        obj.setRowData = function(rowNumber, data) {
            for (var i = 0; i < obj.headers.length; i++) {
                // Update cell
                var columnName = jexcel.getColumnNameFromId([ i, rowNumber ]);
                // Set value
                if (data[i] != null) {
                    obj.setValue(columnName, data[i]);
                }
            }
        }
    
        /**
         * Get a column data by columnNumber
         */
        obj.getColumnData = function(columnNumber) {
            var dataset = [];
            // Go through the rows to get the data
            for (var j = 0; j < obj.options.data.length; j++) {
                dataset.push(obj.options.data[j][columnNumber]);
            }
            return dataset;
        }
    
        /**
         * Set a column data by colNumber
         */
        obj.setColumnData = function(colNumber, data) {
            for (var j = 0; j < obj.rows.length; j++) {
                // Update cell
                var columnName = jexcel.getColumnNameFromId([ colNumber, j ]);
                // Set value
                if (data[j] != null) {
                    obj.setValue(columnName, data[j]);
                }
            }
        }
    
        /**
         * Create row
         */
        obj.createRow = function(j, data) {
            // Create container
            if (! obj.records[j]) {
                obj.records[j] = [];
            }
            // Default data
            if (! data) {
                var data = obj.options.data[j];
            }
            // New line of data to be append in the table
            obj.rows[j] = document.createElement('tr');
            obj.rows[j].setAttribute('data-y', j);
            // Index
            var index = null;

            // Set default row height
            if (obj.options.defaultRowHeight) {
                obj.rows[j].style.height = obj.options.defaultRowHeight + 'px'
            }

            // Definitions
            if (obj.options.rows[j]) {
                if (obj.options.rows[j].height) {
                    obj.rows[j].style.height = obj.options.rows[j].height;
                }
                if (obj.options.rows[j].title) {
                    index = obj.options.rows[j].title;
                }
            }
            if (! index) {
                index = parseInt(j + 1);
            }
            // Row number label
            var td = document.createElement('td');
            td.innerHTML = index;
            td.setAttribute('data-y', j);
            td.className = 'jexcel_row';
            obj.rows[j].appendChild(td);
    
            // Data columns
            for (var i = 0; i < obj.options.columns.length; i++) {
                // New column of data to be append in the line
                obj.records[j][i] = obj.createCell(i, j, data[i]);
                // Add column to the row
                obj.rows[j].appendChild(obj.records[j][i]);
            }
    
            // Add row to the table body
            return obj.rows[j];
        }
    
        obj.parseValue = function(i, j, value, cell) {
            if ((''+value).substr(0,1) == '=' && obj.options.parseFormulas == true) {
                value = obj.executeFormula(value, i, j)
            }

            // Column options
            var options = obj.options.columns[i];
            if (options && ! isFormula(value)) {
                // Mask options
                var opt = null;
                if (opt = getMask(options)) {
                    if (value && value == Number(value)) {
                        value = Number(value);
                    }
                    // Process the decimals to match the mask
                    var masked = jSuites.mask.render(value, opt, true);
                    // Negative indication
                    if (cell) {
                        if (opt.mask) {
                            var t = opt.mask.split(';');
                            if (t[1]) {
                                var t1 = t[1].match(new RegExp('\\[Red\\]', 'gi'));
                                if (t1) {
                                    if (value < 0) {
                                        cell.classList.add('red');
                                    } else {
                                        cell.classList.remove('red');
                                    }
                                }
                                var t2 = t[1].match(new RegExp('\\(', 'gi'));
                                if (t2) {
                                    if (value < 0) {
                                        masked = '(' + masked + ')';
                                    }
                                }
                            }
                        }
                    }

                    if (masked) {
                        value = masked;
                    }
                }
            }

            return value;
        }

        /**
         * Create cell
         */
        obj.createCell = function(i, j, value) {
            // Create cell and properties
            var td = document.createElement('td');
            td.setAttribute('data-x', i);
            td.setAttribute('data-y', j);

            // Security
            if ((''+value).substr(0,1) == '=' && obj.options.secureFormulas == true) {
                var val = secureFormula(value);
                if (val != value) {
                    // Update the data container
                    value = val;
                }
            }

            // Custom column
            if (obj.options.columns[i].editor) {
                if (obj.options.stripHTML === false || obj.options.columns[i].stripHTML === false) {
                    td.innerHTML = value;
                } else {
                    td.innerText = value;
                }
                if (typeof(obj.options.columns[i].editor.createCell) == 'function') {
                    td = obj.options.columns[i].editor.createCell(td);
                }
            } else {
                // Hidden column
                if (obj.options.columns[i].type == 'hidden') {
                    td.style.display = 'none';
                    td.innerText = value;
                } else if (obj.options.columns[i].type == 'checkbox' || obj.options.columns[i].type == 'radio') {
                    // Create input
                    var element = document.createElement('input');
                    element.type = obj.options.columns[i].type;
                    element.name = 'c' + i;
                    element.checked = (value == 1 || value == true || value == 'true') ? true : false;
                    element.onclick = function() {
                        obj.setValue(td, this.checked);
                    }

                    if (obj.options.columns[i].readOnly == true || obj.options.editable == false) {
                        element.setAttribute('disabled', 'disabled');
                    }

                    // Append to the table
                    td.appendChild(element);
                    // Make sure the values are correct
                    obj.options.data[j][i] = element.checked;
                } else if (obj.options.columns[i].type == 'calendar') {
                    // Try formatted date
                    var formatted = jSuites.calendar.extractDateFromString(value, obj.options.columns[i].options.format);
                    // Create calendar cell
                    td.innerText = jSuites.calendar.getDateString(formatted ? formatted : value, obj.options.columns[i].options.format);
                } else if (obj.options.columns[i].type == 'dropdown' || obj.options.columns[i].type == 'autocomplete') {
                    // Create dropdown cell
                    td.classList.add('jexcel_dropdown');
                    td.innerText = obj.getDropDownValue(i, value);
                } else if (obj.options.columns[i].type == 'color') {
                    if (obj.options.columns[i].render == 'square') {
                        var color = document.createElement('div');
                        color.className = 'color';
                        color.style.backgroundColor = value;
                        td.appendChild(color);
                    } else {
                        td.style.color = value;
                        td.innerText = value;
                    }
                } else if (obj.options.columns[i].type == 'image') {
                    if (value && value.substr(0, 10) == 'data:image') {
                        var img = document.createElement('img');
                        img.src = value;
                        td.appendChild(img);
                    }
                } else {
                    if (obj.options.columns[i].type == 'html') {
                        td.innerHTML = stripScript(obj.parseValue(i, j, value, td));
                    } else {
                        if (obj.options.stripHTML === false || obj.options.columns[i].stripHTML === false) {
                            td.innerHTML = stripScript(obj.parseValue(i, j, value, td));
                        } else {
                            td.innerText = obj.parseValue(i, j, value, td);
                        }
                    }
                }
            }
    
            // Readonly
            if (obj.options.columns[i].readOnly == true) {
                td.className = 'readonly';
            }
    
            // Text align
            var colAlign = obj.options.columns[i].align ? obj.options.columns[i].align : 'center';
            td.style.textAlign = colAlign;
    
            // Wrap option
            if (obj.options.columns[i].wordWrap != false && (obj.options.wordWrap == true || obj.options.columns[i].wordWrap == true || td.innerHTML.length > 200)) {
                td.style.whiteSpace = 'pre-wrap';
            }
    
            // Overflow
            if (i > 0) {
                if (this.options.textOverflow == true) {
                    if (value || td.innerHTML) {
                        obj.records[j][i-1].style.overflow = 'hidden';
                    } else {
                        if (i == obj.options.columns.length - 1) {
                            td.style.overflow = 'hidden';
                        }
                    }
                }
            }
            return td;
        }
    
        obj.createCellHeader = function(colNumber) {
            // Create col global control
            var colWidth = obj.options.columns[colNumber].width ? obj.options.columns[colNumber].width : obj.options.defaultColWidth;
            var colAlign = obj.options.columns[colNumber].align ? obj.options.columns[colNumber].align : obj.options.defaultColAlign;
    
            // Create header cell
            obj.headers[colNumber] = document.createElement('td');
            if (obj.options.stripHTML) {
                obj.headers[colNumber].innerText = obj.options.columns[colNumber].title ? obj.options.columns[colNumber].title : jexcel.getColumnName(colNumber);
            } else {
                obj.headers[colNumber].innerHTML = obj.options.columns[colNumber].title ? obj.options.columns[colNumber].title : jexcel.getColumnName(colNumber);
            }
            obj.headers[colNumber].setAttribute('data-x', colNumber);
            obj.headers[colNumber].style.textAlign = colAlign;
            if (obj.options.columns[colNumber].title) {
                obj.headers[colNumber].setAttribute('title', obj.options.columns[colNumber].title);
            }
            if (obj.options.columns[colNumber].id) {
                obj.headers[colNumber].setAttribute('id', obj.options.columns[colNumber].id);
            }
    
            // Width control
            obj.colgroup[colNumber] = document.createElement('col');
            obj.colgroup[colNumber].setAttribute('width', colWidth);
    
            // Hidden column
            if (obj.options.columns[colNumber].type == 'hidden') {
                obj.headers[colNumber].style.display = 'none';
                obj.colgroup[colNumber].style.display = 'none';
            }
        }

        /**
         * Update a nested header title
         */
        obj.updateNestedHeader = function(x, y, title) {
            if (obj.options.nestedHeaders[y][x].title) {
                obj.options.nestedHeaders[y][x].title = title;
                obj.options.nestedHeaders[y].element.children[x+1].innerText = title;
            }
        }

        /**
         * Create a nested header object
         */
        obj.createNestedHeader = function(nestedInformation) {
            var tr = document.createElement('tr');
            tr.classList.add('jexcel_nested');
            var td = document.createElement('td');
            tr.appendChild(td);
            // Element
            nestedInformation.element = tr;
    
            var headerIndex = 0;
            for (var i = 0; i < nestedInformation.length; i++) {
                // Default values
                if (! nestedInformation[i].colspan) {
                    nestedInformation[i].colspan = 1;
                }
                if (! nestedInformation[i].align) {
                    nestedInformation[i].align = 'center';
                }
                if (! nestedInformation[i].title) {
                    nestedInformation[i].title = '';
                }
    
                // Number of columns
                var numberOfColumns = nestedInformation[i].colspan;
    
                // Classes container
                var column = [];
                // Header classes for this cell
                for (var x = 0; x < numberOfColumns; x++) {
                    if (obj.options.columns[headerIndex] && obj.options.columns[headerIndex].type == 'hidden') {
                        numberOfColumns++;
                    }
                    column.push(headerIndex);
                    headerIndex++;
                }
    
                // Created the nested cell
                var td = document.createElement('td');
                td.setAttribute('data-column', column.join(','));
                td.setAttribute('colspan', nestedInformation[i].colspan);
                td.setAttribute('align', nestedInformation[i].align);
                td.innerText = nestedInformation[i].title;
                tr.appendChild(td);
            }
    
            return tr;
        }
    
        /**
         * Create toolbar
         */
        obj.createToolbar = function(toolbar) {
            if (toolbar) {
                obj.options.toolbar = toolbar;
            } else {
                var toolbar = obj.options.toolbar;
            }
            for (var i = 0; i < toolbar.length; i++) {
                if (toolbar[i].type == 'i') {
                    var toolbarItem = document.createElement('i');
                    toolbarItem.classList.add('jexcel_toolbar_item');
                    toolbarItem.classList.add('material-icons');
                    toolbarItem.setAttribute('data-k', toolbar[i].k);
                    toolbarItem.setAttribute('data-v', toolbar[i].v);
                    toolbarItem.setAttribute('id', toolbar[i].id);

                    // Tooltip
                    if (toolbar[i].tooltip) {
                        toolbarItem.setAttribute('title', toolbar[i].tooltip);
                    }
                    // Handle click
                    if (toolbar[i].onclick && typeof(toolbar[i].onclick)) {
                        toolbarItem.onclick = (function (a) {
                            var b = a;
                            return function () {
                                toolbar[b].onclick(el, obj, this);
                            };
                        })(i);
                    } else {
                        toolbarItem.onclick = function() {
                            var k = this.getAttribute('data-k');
                            var v = this.getAttribute('data-v');
                            obj.setStyle(obj.highlighted, k, v);
                        }
                    }
                    // Append element
                    toolbarItem.innerText = toolbar[i].content;
                    obj.toolbar.appendChild(toolbarItem);
                } else if (toolbar[i].type == 'select') {
                   var toolbarItem = document.createElement('select');
                   toolbarItem.classList.add('jexcel_toolbar_item');
                   toolbarItem.setAttribute('data-k', toolbar[i].k);
                   // Tooltip
                   if (toolbar[i].tooltip) {
                       toolbarItem.setAttribute('title', toolbar[i].tooltip);
                   }
                   // Handle onchange
                   if (toolbar[i].onchange && typeof(toolbar[i].onchange)) {
                       toolbarItem.onchange = toolbar[i].onchange;
                   } else {
                       toolbarItem.onchange = function() {
                           var k = this.getAttribute('data-k');
                           obj.setStyle(obj.highlighted, k, this.value);
                       }
                   }
                   // Add options to the dropdown
                   for(var j = 0; j < toolbar[i].v.length; j++) {
                        var toolbarDropdownOption = document.createElement('option');
                        toolbarDropdownOption.value = toolbar[i].v[j];
                        toolbarDropdownOption.innerText = toolbar[i].v[j];
                        toolbarItem.appendChild(toolbarDropdownOption);
                   }
                   obj.toolbar.appendChild(toolbarItem);
                } else if (toolbar[i].type == 'color') {
                     var toolbarItem = document.createElement('i');
                     toolbarItem.classList.add('jexcel_toolbar_item');
                     toolbarItem.classList.add('material-icons');
                     toolbarItem.setAttribute('data-k', toolbar[i].k);
                     toolbarItem.setAttribute('data-v', '');
                     // Tooltip
                     if (toolbar[i].tooltip) {
                         toolbarItem.setAttribute('title', toolbar[i].tooltip);
                     }
                     obj.toolbar.appendChild(toolbarItem);
                     toolbarItem.innerText = toolbar[i].content;
                     jSuites.color(toolbarItem, {
                         onchange:function(o, v) {
                             var k = o.getAttribute('data-k');
                             obj.setStyle(obj.highlighted, k, v);
                         }
                     });
                }
            }
        }
    
        /**
         * Merge cells
         * @param cellName
         * @param colspan
         * @param rowspan
         * @param ignoreHistoryAndEvents
         */
        obj.setMerge = function(cellName, colspan, rowspan, ignoreHistoryAndEvents) {
            var test = false;
    
            if (! cellName) {
                if (! obj.highlighted.length) {
                    alert(obj.options.text.noCellsSelected);
                    return null;
                } else {
                    var x1 = parseInt(obj.highlighted[0].getAttribute('data-x'));
                    var y1 = parseInt(obj.highlighted[0].getAttribute('data-y'));
                    var x2 = parseInt(obj.highlighted[obj.highlighted.length-1].getAttribute('data-x'));
                    var y2 = parseInt(obj.highlighted[obj.highlighted.length-1].getAttribute('data-y'));
                    var cellName = jexcel.getColumnNameFromId([ x1, y1 ]);
                    var colspan = (x2 - x1) + 1;
                    var rowspan = (y2 - y1) + 1;
                }
            }
    
            var cell = jexcel.getIdFromColumnName(cellName, true);
    
            if (obj.options.mergeCells[cellName]) {
                if (obj.records[cell[1]][cell[0]].getAttribute('data-merged')) {
                    test = obj.options.text.cellAlreadyMerged;
                }
            } else if ((! colspan || colspan < 2) && (! rowspan || rowspan < 2)) {
                test = obj.options.text.invalidMergeProperties;
            } else {
                var cells = [];
                for (var j = cell[1]; j < cell[1] + rowspan; j++) {
                    for (var i = cell[0]; i < cell[0] + colspan; i++) {
                        var columnName = jexcel.getColumnNameFromId([i, j]);
                        if (obj.records[j][i].getAttribute('data-merged')) {
                            test = obj.options.text.thereIsAConflictWithAnotherMergedCell;
                        }
                    }
                }
            }
    
            if (test) {
                alert(test);
            } else {
                // Add property
                if (colspan > 1) {
                    obj.records[cell[1]][cell[0]].setAttribute('colspan', colspan);
                } else {
                    colspan = 1;
                }
                if (rowspan > 1) {
                    obj.records[cell[1]][cell[0]].setAttribute('rowspan', rowspan);
                } else {
                    rowspan = 1;
                }
                // Keep links to the existing nodes
                obj.options.mergeCells[cellName] = [ colspan, rowspan, [] ];
                // Mark cell as merged
                obj.records[cell[1]][cell[0]].setAttribute('data-merged', 'true');
                // Overflow
                obj.records[cell[1]][cell[0]].style.overflow = 'hidden';
                // History data
                var data = [];
                // Adjust the nodes
                for (var y = cell[1]; y < cell[1] + rowspan; y++) {
                    for (var x = cell[0]; x < cell[0] + colspan; x++) {
                        if (! (cell[0] == x && cell[1] == y)) {
                            data.push(obj.options.data[y][x]);
                            obj.updateCell(x, y, '', true);
                            obj.options.mergeCells[cellName][2].push(obj.records[y][x]);
                            obj.records[y][x].style.display = 'none';
                            obj.records[y][x] = obj.records[cell[1]][cell[0]];
                        }
                    }
                }
                // In the initialization is not necessary keep the history
                obj.updateSelection(obj.records[cell[1]][cell[0]]);
    
                if (! ignoreHistoryAndEvents) {
                    obj.setHistory({
                        action:'setMerge',
                        column:cellName,
                        colspan:colspan,
                        rowspan:rowspan,
                        data:data,
                    });
    
                    obj.dispatch('onmerge', el, cellName, colspan, rowspan);
                }
            }
        }
    
        /**
         * Merge cells
         * @param cellName
         * @param colspan
         * @param rowspan
         * @param ignoreHistoryAndEvents
         */
        obj.getMerge = function(cellName) {
            var data = {};
            if (cellName) {
                if (obj.options.mergeCells[cellName]) {
                    data = [ obj.options.mergeCells[cellName][0], obj.options.mergeCells[cellName][1] ];
                } else {
                    data = null;
                }
            } else {
                if (obj.options.mergeCells) {
                    var mergedCells = obj.options.mergeCells;
                    var keys = Object.keys(obj.options.mergeCells);
                    for (var i = 0; i < keys.length; i++) {
                        data[keys[i]] = [ obj.options.mergeCells[keys[i]][0], obj.options.mergeCells[keys[i]][1] ];
                    }
                }
            }
    
            return data;
        }
    
        /**
         * Remove merge by cellname
         * @param cellName
         */
        obj.removeMerge = function(cellName, data, keepOptions) {
            if (obj.options.mergeCells[cellName]) {
                var cell = jexcel.getIdFromColumnName(cellName, true);
                obj.records[cell[1]][cell[0]].removeAttribute('colspan');
                obj.records[cell[1]][cell[0]].removeAttribute('rowspan');
                obj.records[cell[1]][cell[0]].removeAttribute('data-merged');
                var info = obj.options.mergeCells[cellName];
    
                var index = 0;
                for (var j = 0; j < info[1]; j++) {
                    for (var i = 0; i < info[0]; i++) {
                        if (j > 0 || i > 0) {
                            obj.records[cell[1]+j][cell[0]+i] = info[2][index];
                            obj.records[cell[1]+j][cell[0]+i].style.display = '';
                            // Recover data
                            if (data && data[index]) {
                                obj.updateCell(cell[0]+i, cell[1]+j, data[index]);
                            }
                            index++;
                        }
                    }
                }
    
                // Update selection
                obj.updateSelection(obj.records[cell[1]][cell[0]], obj.records[cell[1]+j-1][cell[0]+i-1]);
    
                if (! keepOptions) {
                    delete(obj.options.mergeCells[cellName]);
                }
            }
        }
    
        /**
         * Remove all merged cells
         */
        obj.destroyMerged = function(keepOptions) {
            // Remove any merged cells
            if (obj.options.mergeCells) {
                var mergedCells = obj.options.mergeCells;
                var keys = Object.keys(obj.options.mergeCells);
                for (var i = 0; i < keys.length; i++) {
                    obj.removeMerge(keys[i], null, keepOptions);
                }
            }
        }
    
        /**
         * Is column merged
         */
        obj.isColMerged = function(x, insertBefore) {
            var cols = [];
            // Remove any merged cells
            if (obj.options.mergeCells) {
                var keys = Object.keys(obj.options.mergeCells);
                for (var i = 0; i < keys.length; i++) {
                    var info = jexcel.getIdFromColumnName(keys[i], true);
                    var colspan = obj.options.mergeCells[keys[i]][0];
                    var x1 = info[0];
                    var x2 = info[0] + (colspan > 1 ? colspan - 1 : 0);
    
                    if (insertBefore == null) {
                        if ((x1 <= x && x2 >= x)) {
                            cols.push(keys[i]);
                        }
                    } else {
                        if (insertBefore) {
                            if ((x1 < x && x2 >= x)) {
                                cols.push(keys[i]);
                            }
                        } else {
                            if ((x1 <= x && x2 > x)) {
                                cols.push(keys[i]);
                            }
                        }
                    }
                }
            }
    
            return cols;
        }
    
        /**
         * Is rows merged
         */
        obj.isRowMerged = function(y, insertBefore) {
            var rows = [];
            // Remove any merged cells
            if (obj.options.mergeCells) {
                var keys = Object.keys(obj.options.mergeCells);
                for (var i = 0; i < keys.length; i++) {
                    var info = jexcel.getIdFromColumnName(keys[i], true);
                    var rowspan = obj.options.mergeCells[keys[i]][1];
                    var y1 = info[1];
                    var y2 = info[1] + (rowspan > 1 ? rowspan - 1 : 0);
    
                    if (insertBefore == null) {
                        if ((y1 <= y && y2 >= y)) {
                            rows.push(keys[i]);
                        }
                    } else {
                        if (insertBefore) {
                            if ((y1 < y && y2 >= y)) {
                                rows.push(keys[i]);
                            }
                        } else {
                            if ((y1 <= y && y2 > y)) {
                                rows.push(keys[i]);
                            }
                        }
                    }
                }
            }
    
            return rows;
        }

        /**
         * Open the column filter
         */
        obj.openFilter = function(columnId) {
            if (! obj.options.filters) {
                console.log('Jspreadsheet: filters not enabled.');
            } else {
                // Make sure is integer
                columnId = parseInt(columnId);
                // Reset selection
                obj.resetSelection();
                // Load options
                var optionsFiltered = [];
                if (obj.options.columns[columnId].type == 'checkbox') {
                    optionsFiltered.push({ id: 'true', name: 'True' });
                    optionsFiltered.push({ id: 'false', name: 'False' });
                } else {
                    var options = [];
                    var hasBlanks = false;
                    for (var j = 0; j < obj.options.data.length; j++) {
                        var k = obj.options.data[j][columnId];
                        var v = obj.records[j][columnId].innerHTML;
                        if (k && v) {
                            options[k] = v;
                        } else {
                            var hasBlanks = true;
                        }
                    }
                    var keys = Object.keys(options);
                    var optionsFiltered = [];
                    for (var j = 0; j < keys.length; j++) {
                        optionsFiltered.push({ id: keys[j], name: options[keys[j]] });
                    }
                    // Has blank options
                    if (hasBlanks) {
                        optionsFiltered.push({ value: '', id: '', name: '(Blanks)' });
                    }
                }

                // Create dropdown
                var div = document.createElement('div');
                obj.filter.children[columnId + 1].innerHTML = '';
                obj.filter.children[columnId + 1].appendChild(div);
                obj.filter.children[columnId + 1].style.paddingLeft = '0px';
                obj.filter.children[columnId + 1].style.paddingRight = '0px';
                obj.filter.children[columnId + 1].style.overflow = 'initial';

                var opt = {
                    data: optionsFiltered,
                    multiple: true,
                    autocomplete: true,
                    opened: true,
                    value: obj.filters[columnId] !== undefined ? obj.filters[columnId] : null,
                    width:'100%',
                    position: (obj.options.tableOverflow == true || obj.options.fullscreen == true) ? true : false,
                    onclose: function(o) {
                        obj.resetFilters();
                        obj.filters[columnId] = o.dropdown.getValue(true);
                        obj.filter.children[columnId + 1].innerHTML = o.dropdown.getText();
                        obj.filter.children[columnId + 1].style.paddingLeft = '';
                        obj.filter.children[columnId + 1].style.paddingRight = '';
                        obj.filter.children[columnId + 1].style.overflow = '';
                        obj.closeFilter(columnId);
                        obj.refreshSelection();
                    }
                };

                // Dynamic dropdown
                jSuites.dropdown(div, opt);
            }
        }

        obj.resetFilters = function() {
            if (obj.options.filters) {
                for (var i = 0; i < obj.filter.children.length; i++) {
                    obj.filter.children[i].innerHTML = '&nbsp;';
                    obj.filters[i] = null;
                }
            }
        }

        obj.closeFilter = function(columnId) {
            if (! columnId) {
                for (var i = 0; i < obj.filter.children.length; i++) {
                    if (obj.filters[i]) {
                        columnId = i;
                    }
                }
            }

            // Search filter
            var search = function(query, x, y) {
                for (var i = 0; i < query.length; i++) {
                    if ((query[i] == '' && // Blank matching
                        ((obj.options.data[y][x] === false) || // Unchecked checkbox
                        (''+obj.options.data[y][x]) == '')) || // Blank non-checkbox value
                        ((query[i] != '' && // Normal non-blank filtering
                        ((''+obj.options.data[y][x]).search(query[i]) >= 0 ||
                        (''+obj.records[y][x].innerHTML).search(query[i]) >= 0)))) {
                        return true;
                    }
                }
                return false;
            }

            var query = obj.filters[columnId];
            obj.results = [];
            for (var j = 0; j < obj.options.data.length; j++) {
                if (search(query, columnId, j)) {
                    obj.results.push(j);
                }
            }
            if (! obj.results.length) {
                obj.results = null;
            }

            obj.updateResult();
        }

        /**
         * Open the editor
         * 
         * @param object cell
         * @return void
         */
        obj.openEditor = function(cell, empty, e) {
            // Get cell position
            var y = cell.getAttribute('data-y');
            var x = cell.getAttribute('data-x');
    
            // On edition start
            obj.dispatch('oneditionstart', el, cell, x, y);
    
            // Overflow
            if (x > 0) {
                obj.records[y][x-1].style.overflow = 'hidden';
            }
    
            // Create editor
            var createEditor = function(type) {
                // Cell information
                var info = cell.getBoundingClientRect();
    
                // Create dropdown
                var editor = document.createElement(type);
                editor.style.width = (info.width) + 'px';
                editor.style.height = (info.height - 2) + 'px';
                editor.style.minHeight = (info.height - 2) + 'px';
    
                // Edit cell
                cell.classList.add('editor');
                cell.innerHTML = '';
                cell.appendChild(editor);
    
                // On edition start
                obj.dispatch('oncreateeditor', el, cell, x, y, editor);

                return editor;
            }
    
            // Readonly
            if (cell.classList.contains('readonly') == true) {
                // Do nothing
            } else {
                // Holder
                obj.edition = [ obj.records[y][x], obj.records[y][x].innerHTML, x, y ];
    
                // If there is a custom editor for it
                if (obj.options.columns[x].editor) {
                    // Custom editors
                    obj.options.columns[x].editor.openEditor(cell, el, empty, e);
                } else {
                    // Native functions
                    if (obj.options.columns[x].type == 'hidden') {
                        // Do nothing
                    } else if (obj.options.columns[x].type == 'checkbox' || obj.options.columns[x].type == 'radio') {
                        // Get value
                        var value = cell.children[0].checked ? false : true;
                        // Toogle value
                        obj.setValue(cell, value);
                        // Do not keep edition open
                        obj.edition = null;
                    } else if (obj.options.columns[x].type == 'dropdown' || obj.options.columns[x].type == 'autocomplete') {
                        // Get current value
                        var value = obj.options.data[y][x];
                        if (obj.options.columns[x].multiple && !Array.isArray(value)) {
                            value = value.split(';');
                        }
    
                        // Create dropdown
                        if (typeof(obj.options.columns[x].filter) == 'function') {
                            var source = obj.options.columns[x].filter(el, cell, x, y, obj.options.columns[x].source);
                        } else {
                            var source = obj.options.columns[x].source;
                        }
    
                        // Do not change the original source
                        var data = [];
                        for (var j = 0; j < source.length; j++) {
                            data.push(source[j]);
                        }

                        // Create editor
                        var editor = createEditor('div');
                        var options = {
                            data: data,
                            multiple: obj.options.columns[x].multiple ? true : false,
                            autocomplete: obj.options.columns[x].autocomplete || obj.options.columns[x].type == 'autocomplete' ? true : false,
                            opened:true,
                            value: value,
                            width:'100%',
                            height:editor.style.minHeight,
                            position: (obj.options.tableOverflow == true || obj.options.fullscreen == true) ? true : false,
                            onclose:function() {
                                obj.closeEditor(cell, true);
                            }
                        };
                        if (obj.options.columns[x].options && obj.options.columns[x].options.type) {
                            options.type = obj.options.columns[x].options.type;
                        }
                        jSuites.dropdown(editor, options);
                    } else if (obj.options.columns[x].type == 'calendar' || obj.options.columns[x].type == 'color') {
                        // Value
                        var value = obj.options.data[y][x];
                        // Create editor
                        var editor = createEditor('input');
                        editor.value = value;
    
                        if (obj.options.tableOverflow == true || obj.options.fullscreen == true) {
                            obj.options.columns[x].options.position = true;
                        }
                        obj.options.columns[x].options.value = obj.options.data[y][x];
                        obj.options.columns[x].options.opened = true;
                        obj.options.columns[x].options.onclose = function(el, value) {
                            obj.closeEditor(cell, true);
                        }
                        // Current value
                        if (obj.options.columns[x].type == 'color') {
                            jSuites.color(editor, obj.options.columns[x].options);
                        } else {
                            jSuites.calendar(editor, obj.options.columns[x].options);
                        }
                        // Focus on editor
                        editor.focus();
                    } else if (obj.options.columns[x].type == 'html') {
                        var value = obj.options.data[y][x];
                        // Create editor
                        var editor = createEditor('div');
                        editor.style.position = 'relative';
                        var div = document.createElement('div');
                        div.classList.add('jexcel_richtext');
                        editor.appendChild(div);
                        jSuites.editor(div, {
                            focus: true,
                            value: value,
                        });
                        var rect = cell.getBoundingClientRect();
                        var rectContent = div.getBoundingClientRect();
                        if (window.innerHeight < rect.bottom + rectContent.height) {
                            div.style.top = (rect.top - (rectContent.height + 2)) + 'px';
                        } else {
                            div.style.top = (rect.top) + 'px';
                        }
                    } else if (obj.options.columns[x].type == 'image') {
                        // Value
                        var img = cell.children[0];
                        // Create editor
                        var editor = createEditor('div');
                        editor.style.position = 'relative';
                        var div = document.createElement('div');
                        div.classList.add('jclose');
                        if (img && img.src) {
                            div.appendChild(img);
                        }
                        editor.appendChild(div);
                        jSuites.image(div, obj.options.imageOptions);
                        var rect = cell.getBoundingClientRect();
                        var rectContent = div.getBoundingClientRect();
                        if (window.innerHeight < rect.bottom + rectContent.height) {
                            div.style.top = (rect.top - (rectContent.height + 2)) + 'px';
                        } else {
                            div.style.top = (rect.top) + 'px';
                        }
                    } else {
                        // Value
                        var value = empty == true ? '' : obj.options.data[y][x];

                        // Basic editor
                        if (obj.options.columns[x].wordWrap != false && (obj.options.wordWrap == true || obj.options.columns[x].wordWrap == true)) {
                            var editor = createEditor('textarea');
                        } else {
                            var editor = createEditor('input');
                        }

                        editor.focus();
                        editor.value = value;

                        // Column options
                        var options = obj.options.columns[x];
                        // Format
                        var opt = null;

                        // Apply format when is not a formula
                        if (! isFormula(value)) {
                            // Format
                            if (opt = getMask(options)) {
                                // Masking
                                if (! options.disabledMaskOnEdition) {
                                    if (options.mask) {
                                        var m = options.mask.split(';')
                                        editor.setAttribute('data-mask', m[0]);
                                    } else if (options.locale) {
                                        editor.setAttribute('data-locale', options.locale);
                                    }
                                }
                                // Input
                                opt.input = editor;
                                // Configuration
                                editor.mask = opt;
                                // Do not treat the decimals
                                jSuites.mask.render(value, opt, false);
                            }
                        }

                        editor.onblur = function() {
                            obj.closeEditor(cell, true);
                        };
                        editor.scrollLeft = editor.scrollWidth;
                    }
                }
            }
        }
    
        /**
         * Close the editor and save the information
         * 
         * @param object cell
         * @param boolean save
         * @return void
         */
        obj.closeEditor = function(cell, save) {
            var x = parseInt(cell.getAttribute('data-x'));
            var y = parseInt(cell.getAttribute('data-y'));

            // Get cell properties
            if (save == true) {
                // If custom editor
                if (obj.options.columns[x].editor) {
                    // Custom editor
                    var value = obj.options.columns[x].editor.closeEditor(cell, save);
                } else {
                    // Native functions
                    if (obj.options.columns[x].type == 'checkbox' || obj.options.columns[x].type == 'radio' || obj.options.columns[x].type == 'hidden') {
                        // Do nothing
                    } else if (obj.options.columns[x].type == 'dropdown' || obj.options.columns[x].type == 'autocomplete') {
                        var value = cell.children[0].dropdown.close(true);
                    } else if (obj.options.columns[x].type == 'calendar') {
                        var value = cell.children[0].calendar.close(true);
                    } else if (obj.options.columns[x].type == 'color') {
                        var value = cell.children[0].color.close(true);
                    } else if (obj.options.columns[x].type == 'html') {
                        var value = cell.children[0].children[0].editor.getData();
                    } else if (obj.options.columns[x].type == 'image') {
                        var img = cell.children[0].children[0].children[0];
                        var value = img && img.tagName == 'IMG' ? img.src : '';
                    } else if (obj.options.columns[x].type == 'numeric') {
                        var value = cell.children[0].value;
                        if ((''+value).substr(0,1) != '=') {
                            if (value == '') {
                                value = obj.options.columns[x].allowEmpty ? '' : 0;
                            }
                        }
                        cell.children[0].onblur = null;
                    } else {
                        var value = cell.children[0].value;
                        cell.children[0].onblur = null;

                        // Column options
                        var options = obj.options.columns[x];
                        // Format
                        var opt = null;
                        if (opt = getMask(options)) {
                            // Keep numeric in the raw data
                            if (value !== '' && ! isFormula(value) && typeof(value) !== 'number') {
                                var t = jSuites.mask.extract(value, opt, true);
                                if (t && t.value !== '') {
                                    value = t.value;
                                }
                            }
                        }
                    }
                }

                // Ignore changes if the value is the same
                if (obj.options.data[y][x] == value) {
                    cell.innerHTML = obj.edition[1];
                } else {
                    obj.setValue(cell, value);
                }
            } else {
                if (obj.options.columns[x].editor) {
                    // Custom editor
                    obj.options.columns[x].editor.closeEditor(cell, save);
                } else {
                    if (obj.options.columns[x].type == 'dropdown' || obj.options.columns[x].type == 'autocomplete') {
                        cell.children[0].dropdown.close(true);
                    } else if (obj.options.columns[x].type == 'calendar') {
                        cell.children[0].calendar.close(true);
                    } else if (obj.options.columns[x].type == 'color') {
                        cell.children[0].color.close(true);
                    } else {
                        cell.children[0].onblur = null;
                    }
                }
    
                // Restore value
                cell.innerHTML = obj.edition && obj.edition[1] ? obj.edition[1] : '';
            }
    
            // On edition end
            obj.dispatch('oneditionend', el, cell, x, y, value, save);

            // Remove editor class
            cell.classList.remove('editor');
    
            // Finish edition
            obj.edition = null;
        }
    
        /**
         * Get the cell object
         * 
         * @param object cell
         * @return string value
         */
        obj.getCell = function(cell) {
            // Convert in case name is excel liked ex. A10, BB92
            cell = jexcel.getIdFromColumnName(cell, true);
            var x = cell[0];
            var y = cell[1];
    
            return obj.records[y][x];
        }
    
        /**
         * Get the cell object from coords
         * 
         * @param object cell
         * @return string value
         */
        obj.getCellFromCoords = function(x, y) {
            return obj.records[y][x];
        }
    
        /**
         * Get label
         * 
         * @param object cell
         * @return string value
         */
        obj.getLabel = function(cell) {
            // Convert in case name is excel liked ex. A10, BB92
            cell = jexcel.getIdFromColumnName(cell, true);
            var x = cell[0];
            var y = cell[1];
    
            return obj.records[y][x].innerHTML;
        }
    
        /**
         * Get labelfrom coords
         * 
         * @param object cell
         * @return string value
         */
        obj.getLabelFromCoords = function(x, y) {
            return obj.records[y][x].innerHTML;
        }
    
        /**
         * Get the value from a cell
         * 
         * @param object cell
         * @return string value
         */
        obj.getValue = function(cell, processedValue) {
            if (typeof(cell) == 'object') {
                var x = cell.getAttribute('data-x');
                var y = cell.getAttribute('data-y');
            } else {
                cell = jexcel.getIdFromColumnName(cell, true);
                var x = cell[0];
                var y = cell[1];
            }
    
            var value = null;
    
            if (x != null && y != null) {
                if (obj.records[y] && obj.records[y][x] && (processedValue || obj.options.copyCompatibility == true)) {
                    value = obj.records[y][x].innerHTML;
                } else {
                    if (obj.options.data[y] && obj.options.data[y][x] != 'undefined') {
                        value = obj.options.data[y][x];
                    }
                }
            }
    
            return value;
        }
    
        /**
         * Get the value from a coords
         * 
         * @param int x
         * @param int y
         * @return string value
         */
        obj.getValueFromCoords = function(x, y, processedValue) {
            var value = null;
    
            if (x != null && y != null) {
                if ((obj.records[y] && obj.records[y][x]) && processedValue || obj.options.copyCompatibility == true) {
                    value = obj.records[y][x].innerHTML;
                } else {
                    if (obj.options.data[y] && obj.options.data[y][x] != 'undefined') {
                        value = obj.options.data[y][x];
                    }
                }
            }
    
            return value;
        }
    
        /**
         * Set a cell value
         * 
         * @param mixed cell destination cell
         * @param string value value
         * @return void
         */
        obj.setValue = function(cell, value, force) {
            var records = [];
    
            if (typeof(cell) == 'string') {
                var columnId = jexcel.getIdFromColumnName(cell, true);
                var x = columnId[0];
                var y = columnId[1];
    
                // Update cell
                records.push(obj.updateCell(x, y, value, force));
    
                // Update all formulas in the chain
                obj.updateFormulaChain(x, y, records);
            } else {
                var x = null;
                var y = null;
                if (cell && cell.getAttribute) {
                    var x = cell.getAttribute('data-x');
                    var y = cell.getAttribute('data-y');
                }
    
                // Update cell
                if (x != null && y != null) {
                    records.push(obj.updateCell(x, y, value, force));
    
                    // Update all formulas in the chain
                    obj.updateFormulaChain(x, y, records);
                } else {
                    var keys = Object.keys(cell);
                    if (keys.length > 0) {
                        for (var i = 0; i < keys.length; i++) {
                            if (typeof(cell[i]) == 'string') {
                                var columnId = jexcel.getIdFromColumnName(cell[i], true);
                                var x = columnId[0];
                                var y = columnId[1];
                            } else {
                                if (cell[i].x != null && cell[i].y != null) {
                                    var x = cell[i].x;
                                    var y = cell[i].y;
                                    // Flexible setup
                                    if (cell[i].newValue != null) {
                                        value = cell[i].newValue;
                                    } else if (cell[i].value != null) {
                                        value = cell[i].value;
                                    }
                                } else {
                                    var x = cell[i].getAttribute('data-x');
                                    var y = cell[i].getAttribute('data-y');
                                }
                            }
    
                             // Update cell
                            if (x != null && y != null) {
                                records.push(obj.updateCell(x, y, value, force));
    
                                // Update all formulas in the chain
                                obj.updateFormulaChain(x, y, records);
                            }
                        }
                    }
                }
            }
    
            // Update history
            obj.setHistory({
                action:'setValue',
                records:records,
                selection:obj.selectedCell,
            });
    
            // Update table with custom configurations if applicable
            obj.updateTable();
    
            // On after changes
            obj.onafterchanges(el, records);
        }
    
        /**
         * Set a cell value based on coordinates
         * 
         * @param int x destination cell
         * @param int y destination cell
         * @param string value
         * @return void
         */
        obj.setValueFromCoords = function(x, y, value, force) {
            var records = [];
            records.push(obj.updateCell(x, y, value, force));
    
            // Update all formulas in the chain
            obj.updateFormulaChain(x, y, records);
    
            // Update history
            obj.setHistory({
                action:'setValue',
                records:records,
                selection:obj.selectedCell,
            });
    
            // Update table with custom configurations if applicable
            obj.updateTable();
    
            // On after changes
            obj.onafterchanges(el, records);
        }
    
        /**
         * Toogle
         */
        obj.setCheckRadioValue = function() {
            var records = [];
            var keys = Object.keys(obj.highlighted);
            for (var i = 0; i < keys.length; i++) {
                var x = obj.highlighted[i].getAttribute('data-x');
                var y = obj.highlighted[i].getAttribute('data-y');
    
                if (obj.options.columns[x].type == 'checkbox' || obj.options.columns[x].type == 'radio') {
                    // Update cell
                    records.push(obj.updateCell(x, y, ! obj.options.data[y][x]));
                }
            }
    
            if (records.length) {
                // Update history
                obj.setHistory({
                    action:'setValue',
                    records:records,
                    selection:obj.selectedCell,
                });
    
                // On after changes
                obj.onafterchanges(el, records);
            }
        }
        /**
         * Strip tags
         */
        var stripScript = function(a) {
            var b = new Option;
            b.innerHTML = a;
            var c = null;
            for (a = b.getElementsByTagName('script'); c=a[0];) c.parentNode.removeChild(c);
            return b.innerHTML;
        }

        /**
         * Update cell content
         * 
         * @param object cell
         * @return void
         */
        obj.updateCell = function(x, y, value, force) {
            // Changing value depending on the column type
            if (obj.records[y][x].classList.contains('readonly') == true && ! force) {
                // Do nothing
                var record = {
                    x: x,
                    y: y,
                    col: x,
                    row: y
                }
            } else {
                // Security
                if ((''+value).substr(0,1) == '=' && obj.options.secureFormulas == true) {
                    var val = secureFormula(value);
                    if (val != value) {
                        // Update the data container
                        value = val;
                    }
                }

                // On change
                var val = obj.dispatch('onbeforechange', el, obj.records[y][x], x, y, value);

                // If you return something this will overwrite the value
                if (val != undefined) {
                    value = val;
                }

                if (obj.options.columns[x].editor && typeof(obj.options.columns[x].editor.updateCell) == 'function') {
                    value = obj.options.columns[x].editor.updateCell(obj.records[y][x], value, force);
                }

                // History format
                var record = {
                    x: x,
                    y: y,
                    col: x,
                    row: y,
                    newValue: value,
                    oldValue: obj.options.data[y][x],
                }

                if (obj.options.columns[x].editor) {
                    // Update data and cell
                    obj.options.data[y][x] = value;
                } else {
                    // Native functions
                    if (obj.options.columns[x].type == 'checkbox' || obj.options.columns[x].type == 'radio') {
                        // Unchecked all options
                        if (obj.options.columns[x].type == 'radio') {
                            for (var j = 0; j < obj.options.data.length; j++) {
                                obj.options.data[j][x] = false;
                            }
                        }

                        // Update data and cell
                        obj.records[y][x].children[0].checked = (value == 1 || value == true || value == 'true' || value == 'TRUE') ? true : false;
                        obj.options.data[y][x] = obj.records[y][x].children[0].checked;
                    } else if (obj.options.columns[x].type == 'dropdown' || obj.options.columns[x].type == 'autocomplete') {
                        // Update data and cell
                        obj.options.data[y][x] = value;
                        obj.records[y][x].innerText = obj.getDropDownValue(x, value);
                    } else if (obj.options.columns[x].type == 'calendar') {
                        // Update calendar
                        var formatted = jSuites.calendar.extractDateFromString(value, obj.options.columns[x].options.format);
                        // Update data and cell
                        obj.options.data[y][x] = value;
                        obj.records[y][x].innerText = jSuites.calendar.getDateString(formatted ? formatted : value, obj.options.columns[x].options.format);
                    } else if (obj.options.columns[x].type == 'color') {
                        // Update color
                        obj.options.data[y][x] = value;
                        // Render
                        if (obj.options.columns[x].render == 'square') {
                            var color = document.createElement('div');
                            color.className = 'color';
                            color.style.backgroundColor = value;
                            obj.records[y][x].innerText = '';
                            obj.records[y][x].appendChild(color);
                        } else {
                            obj.records[y][x].style.color = value;
                            obj.records[y][x].innerText = value;
                        }
                    } else if (obj.options.columns[x].type == 'image') {
                        value = ''+value;
                        obj.options.data[y][x] = value;
                        obj.records[y][x].innerHTML = '';
                        if (value && value.substr(0, 10) == 'data:image') {
                            var img = document.createElement('img');
                            img.src = value;
                            obj.records[y][x].appendChild(img);
                        }
                    } else {
                        // Update data and cell
                        obj.options.data[y][x] = value;
                        // Label
                        if (obj.options.columns[x].type == 'html') {
                            obj.records[y][x].innerHTML = stripScript(obj.parseValue(x, y, value));
                        } else {
                            if (obj.options.stripHTML === false || obj.options.columns[x].stripHTML === false) {
                                obj.records[y][x].innerHTML = stripScript(obj.parseValue(x, y, value, obj.records[y][x]));
                            } else {
                                obj.records[y][x].innerText = obj.parseValue(x, y, value, obj.records[y][x]);
                            }
                        }
                        // Handle big text inside a cell
                        if (obj.options.columns[x].wordWrap != false && (obj.options.wordWrap == true || obj.options.columns[x].wordWrap == true || obj.records[y][x].innerHTML.length > 200)) {
                            obj.records[y][x].style.whiteSpace = 'pre-wrap';
                        } else {
                            obj.records[y][x].style.whiteSpace = '';
                        }
                    }
                }

                // Overflow
                if (x > 0) {
                    if (value) {
                        obj.records[y][x-1].style.overflow = 'hidden';
                    } else {
                        obj.records[y][x-1].style.overflow = '';
                    }
                }

                // On change
                obj.dispatch('onchange', el, (obj.records[y] && obj.records[y][x] ? obj.records[y][x] : null), x, y, value, record.oldValue);
            }

            return record;
        }

        /**
         * Helper function to copy data using the corner icon
         */
        obj.copyData = function(o, d) {
            // Get data from all selected cells
            var data = obj.getData(true, true);

            // Selected cells
            var h = obj.selectedContainer;

            // Cells
            var x1 = parseInt(o.getAttribute('data-x'));
            var y1 = parseInt(o.getAttribute('data-y'));
            var x2 = parseInt(d.getAttribute('data-x'));
            var y2 = parseInt(d.getAttribute('data-y'));

            // Records
            var records = [];
            var breakControl = false;

            if (h[0] == x1) {
                // Vertical copy
                if (y1 < h[1]) {
                    var rowNumber = y1 - h[1];
                } else {
                    var rowNumber = 1;
                }
                var colNumber = 0;
            } else {
                if (x1 < h[0]) {
                    var colNumber = x1 - h[0];
                } else {
                    var colNumber = 1;
                }
                var rowNumber = 0;
            }

            // Copy data procedure
            var posx = 0;
            var posy = 0;

            for (var j = y1; j <= y2; j++) {
                // Skip hidden rows
                if (obj.rows[j] && obj.rows[j].style.display == 'none') {
                    continue;
                }

                // Controls
                if (data[posy] == undefined) {
                    posy = 0;
                }
                posx = 0;

                // Data columns
                if (h[0] != x1) {
                    if (x1 < h[0]) {
                        var colNumber = x1 - h[0];
                    } else {
                        var colNumber = 1;
                    }
                }
                // Data columns
                for (var i = x1; i <= x2; i++) {
                    // Update non-readonly
                    if (obj.records[j][i] && ! obj.records[j][i].classList.contains('readonly') && obj.records[j][i].style.display != 'none' && breakControl == false) {
                        // Stop if contains value
                        if (! obj.selection.length) {
                            if (obj.options.data[j][i] != '') {
                                breakControl = true;
                                continue;
                            }
                        }
    
                        // Column
                        if (data[posy] == undefined) {
                            posx = 0;
                        } else if (data[posy][posx] == undefined) {
                            posx = 0;
                        }

                        // Value
                        var value = data[posy][posx];
    
                        if (value && ! data[1] && obj.options.autoIncrement == true) {
                            if (obj.options.columns[i].type == 'text' || obj.options.columns[i].type == 'number') {
                                if ((''+value).substr(0,1) == '=') {
                                    var tokens = value.match(/([A-Z]+[0-9]+)/g);
    
                                    if (tokens) {
                                        var affectedTokens = [];
                                        for (var index = 0; index < tokens.length; index++) {
                                            var position = jexcel.getIdFromColumnName(tokens[index], 1);
                                            position[0] += colNumber;
                                            position[1] += rowNumber;
                                            if (position[1] < 0) {
                                                position[1] = 0;
                                            }
                                            var token = jexcel.getColumnNameFromId([position[0], position[1]]);
    
                                            if (token != tokens[index]) {
                                                affectedTokens[tokens[index]] = token;
                                            }
                                        }
                                        // Update formula
                                        if (affectedTokens) {
                                            value = obj.updateFormula(value, affectedTokens)
                                        }
                                    }
                                } else {
                                    if (value == Number(value)) {
                                        value = Number(value) + rowNumber;
                                    }
                                }
                            } else if (obj.options.columns[i].type == 'calendar') {
                                var date = new Date(value);
                                date.setDate(date.getDate() + rowNumber);
                                value = date.getFullYear() + '-' + jexcel.doubleDigitFormat(parseInt(date.getMonth() + 1)) + '-' + jexcel.doubleDigitFormat(date.getDate()) + ' ' + '00:00:00';
                            }
                        }
    
                        records.push(obj.updateCell(i, j, value));
    
                        // Update all formulas in the chain
                        obj.updateFormulaChain(i, j, records);
                    }
                    posx++;
                    if (h[0] != x1) {
                        colNumber++;
                    }
                }
                posy++;
                rowNumber++;
            }
    
            // Update history
            obj.setHistory({
                action:'setValue',
                records:records,
                selection:obj.selectedCell,
            });
    
            // Update table with custom configuration if applicable
            obj.updateTable();
    
            // On after changes
            obj.onafterchanges(el, records);
        }
    
        /**
         * Refresh current selection
         */
        obj.refreshSelection = function() {
            if (obj.selectedCell) {
                obj.updateSelectionFromCoords(obj.selectedCell[0], obj.selectedCell[1], obj.selectedCell[2], obj.selectedCell[3]);
            }
        }
    
        /**
         * Move coords to A1 in case overlaps with an excluded cell
         */
        obj.conditionalSelectionUpdate = function(type, o, d) {
            if (type == 1) {
                if (obj.selectedCell && ((o >= obj.selectedCell[1] && o <= obj.selectedCell[3]) || (d >= obj.selectedCell[1] && d <= obj.selectedCell[3]))) {
                    obj.resetSelection();
                    return;
                }
            } else {
                if (obj.selectedCell && ((o >= obj.selectedCell[0] && o <= obj.selectedCell[2]) || (d >= obj.selectedCell[0] && d <= obj.selectedCell[2]))) {
                    obj.resetSelection();
                    return;
                }
            }
        }
    
        /**
         * Clear table selection
         */
        obj.resetSelection = function(blur) {
            // Remove style
            if (! obj.highlighted.length) {
                var previousStatus = 0;
            } else {
                var previousStatus = 1;
    
                for (var i = 0; i < obj.highlighted.length; i++) {
                    obj.highlighted[i].classList.remove('highlight');
                    obj.highlighted[i].classList.remove('highlight-left');
                    obj.highlighted[i].classList.remove('highlight-right');
                    obj.highlighted[i].classList.remove('highlight-top');
                    obj.highlighted[i].classList.remove('highlight-bottom');
                    obj.highlighted[i].classList.remove('highlight-selected');
    
                    var px = parseInt(obj.highlighted[i].getAttribute('data-x'));
                    var py = parseInt(obj.highlighted[i].getAttribute('data-y'));
    
                    // Check for merged cells
                    if (obj.highlighted[i].getAttribute('data-merged')) {
                        var colspan = parseInt(obj.highlighted[i].getAttribute('colspan'));
                        var rowspan = parseInt(obj.highlighted[i].getAttribute('rowspan'));
                        var ux = colspan > 0 ? px + (colspan - 1) : px;
                        var uy = rowspan > 0 ? py + (rowspan - 1): py;
                    } else {
                        var ux = px;
                        var uy = py;
                    }
    
                    // Remove selected from headers
                    for (var j = px; j <= ux; j++) {
                        if (obj.headers[j]) {
                            obj.headers[j].classList.remove('selected');
                        }
                    }
    
                    // Remove selected from rows
                    for (var j = py; j <= uy; j++) {
                        if (obj.rows[j]) {
                            obj.rows[j].classList.remove('selected');
                        }
                    }
                }
            }
    
            // Reset highlighted cells
            obj.highlighted = [];
    
            // Reset
            obj.selectedCell = null;
    
            // Hide corner
            obj.corner.style.top = '-2000px';
            obj.corner.style.left = '-2000px';
    
            if (blur == true && previousStatus == 1) {
                obj.dispatch('onblur', el);
            }
    
            return previousStatus;
        }
    
        /**
         * Update selection based on two cells
         */
        obj.updateSelection = function(el1, el2, origin) {
            var x1 = el1.getAttribute('data-x');
            var y1 = el1.getAttribute('data-y');
            if (el2) {
                var x2 = el2.getAttribute('data-x');
                var y2 = el2.getAttribute('data-y');
            } else {
                var x2 = x1;
                var y2 = y1;
            }
    
            obj.updateSelectionFromCoords(x1, y1, x2, y2, origin);
        }
    
        /**
         * Update selection from coords
         */
        obj.updateSelectionFromCoords = function(x1, y1, x2, y2, origin) {
            // Reset Selection
            var updated = null;
            var previousState = obj.resetSelection();
    
            // select column
            if (y1 == null) {
                y1 = 0;
                y2 = obj.rows.length - 1; 
            }

            // Same element
            if (x2 == null) {
                x2 = x1;
            }
            if (y2 == null) {
                y2 = y1;
            }
    
            // Selection must be within the existing data
            if (x1 >= obj.headers.length) {
                x1 = obj.headers.length - 1;
            }
            if (y1 >= obj.rows.length) {
                y1 = obj.rows.length - 1;
            }
            if (x2 >= obj.headers.length) {
                x2 = obj.headers.length - 1;
            }
            if (y2 >= obj.rows.length) {
                y2 = obj.rows.length - 1;
            }
    
            // Keep selected cell
            obj.selectedCell = [x1, y1, x2, y2];
    
            // Select cells
            if (x1 != null) {
                // Add selected cell
                if (obj.records[y1][x1]) {
                    obj.records[y1][x1].classList.add('highlight-selected');
                }
    
                // Origin & Destination
                if (parseInt(x1) < parseInt(x2)) {
                    var px = parseInt(x1);
                    var ux = parseInt(x2);
                } else {
                    var px = parseInt(x2);
                    var ux = parseInt(x1);
                }
    
                if (parseInt(y1) < parseInt(y2)) {
                    var py = parseInt(y1);
                    var uy = parseInt(y2);
                } else {
                    var py = parseInt(y2);
                    var uy = parseInt(y1);
                }
    
                // Verify merged columns
                for (var i = px; i <= ux; i++) {
                    for (var j = py; j <= uy; j++) {
                        if (obj.records[j][i] && obj.records[j][i].getAttribute('data-merged')) {
                            var x = parseInt(obj.records[j][i].getAttribute('data-x'));
                            var y = parseInt(obj.records[j][i].getAttribute('data-y'));
                            var colspan = parseInt(obj.records[j][i].getAttribute('colspan'));
                            var rowspan = parseInt(obj.records[j][i].getAttribute('rowspan'));
    
                            if (colspan > 1) {
                                if (x < px) {
                                    px = x;
                                }
                                if (x + colspan > ux) {
                                    ux = x + colspan - 1;
                                }
                            }
    
                            if (rowspan) {
                                if (y < py) {
                                    py = y;
    
                                }
                                if (y + rowspan > uy) {
                                    uy = y + rowspan - 1;
                                }
                            }
                        }
                    }
                }
    
                // Limits
                var borderLeft = null;
                var borderRight = null;
                var borderTop = null;
                var borderBottom = null;
    
                // Vertical limits
                for (var j = py; j <= uy; j++) {
                    if (obj.rows[j].style.display != 'none') {
                        if (borderTop == null) {
                            borderTop = j;
                        }
                        borderBottom = j;
                    }
                }
    
                // Redefining styles
                for (var i = px; i <= ux; i++) {
                    for (var j = py; j <= uy; j++) {
                        if (obj.rows[j].style.display != 'none' && obj.records[j][i].style.display != 'none') {
                            obj.records[j][i].classList.add('highlight');
                            obj.highlighted.push(obj.records[j][i]);
                        }
                    }
    
                    // Horizontal limits
                    if (obj.options.columns[i].type != 'hidden') {
                        if (borderLeft == null) {
                            borderLeft = i;
                        }
                        borderRight = i;
                    }
                }
    
                // Create borders
                if (! borderLeft) {
                    borderLeft = 0;
                }
                if (! borderRight) {
                    borderRight = 0;
                }
                for (var i = borderLeft; i <= borderRight; i++) {
                    if (obj.options.columns[i].type != 'hidden') {
                        // Top border
                        if (obj.records[borderTop] && obj.records[borderTop][i]) {
                            obj.records[borderTop][i].classList.add('highlight-top');
                        }
                        // Bottom border
                        if (obj.records[borderBottom] && obj.records[borderBottom][i]) {
                            obj.records[borderBottom][i].classList.add('highlight-bottom');
                        }
                        // Add selected from headers
                        obj.headers[i].classList.add('selected');
                    }
                }
    
                for (var j = borderTop; j <= borderBottom; j++) {
                    if (obj.rows[j] && obj.rows[j].style.display != 'none') {
                        // Left border
                        obj.records[j][borderLeft].classList.add('highlight-left');
                        // Right border
                        obj.records[j][borderRight].classList.add('highlight-right');
                        // Add selected from rows
                        obj.rows[j].classList.add('selected');
                    }
                }
    
                obj.selectedContainer = [ borderLeft, borderTop, borderRight, borderBottom ];
            }
    
            // Handle events
            if (previousState == 0) {
                obj.dispatch('onfocus', el);

                obj.removeCopyingSelection();
            }

            obj.dispatch('onselection', el, borderLeft, borderTop, borderRight, borderBottom, origin);

            // Find corner cell
            obj.updateCornerPosition();
        }
    
        /**
         * Remove copy selection
         * 
         * @return void
         */
        obj.removeCopySelection = function() {
            // Remove current selection
            for (var i = 0; i < obj.selection.length; i++) {
                obj.selection[i].classList.remove('selection');
                obj.selection[i].classList.remove('selection-left');
                obj.selection[i].classList.remove('selection-right');
                obj.selection[i].classList.remove('selection-top');
                obj.selection[i].classList.remove('selection-bottom');
            }
    
            obj.selection = [];
        }
    
        /**
         * Update copy selection
         * 
         * @param int x, y
         * @return void
         */
        obj.updateCopySelection = function(x3, y3) {
            // Remove selection
            obj.removeCopySelection();
    
            // Get elements first and last
            var x1 = obj.selectedContainer[0];
            var y1 = obj.selectedContainer[1];
            var x2 = obj.selectedContainer[2];
            var y2 = obj.selectedContainer[3];
    
            if (x3 != null && y3 != null) {
                if (x3 - x2 > 0) {
                    var px = parseInt(x2) + 1;
                    var ux = parseInt(x3);
                } else {
                    var px = parseInt(x3);
                    var ux = parseInt(x1) - 1;
                }
    
                if (y3 - y2 > 0) {
                    var py = parseInt(y2) + 1;
                    var uy = parseInt(y3);
                } else {
                    var py = parseInt(y3);
                    var uy = parseInt(y1) - 1;
                }
    
                if (ux - px <= uy - py) {
                    var px = parseInt(x1);
                    var ux = parseInt(x2);
                } else {
                    var py = parseInt(y1);
                    var uy = parseInt(y2);
                }
    
                for (var j = py; j <= uy; j++) {
                    for (var i = px; i <= ux; i++) {
                        if (obj.records[j][i] && obj.rows[j].style.display != 'none' && obj.records[j][i].style.display != 'none') {
                            obj.records[j][i].classList.add('selection');
                            obj.records[py][i].classList.add('selection-top');
                            obj.records[uy][i].classList.add('selection-bottom');
                            obj.records[j][px].classList.add('selection-left');
                            obj.records[j][ux].classList.add('selection-right');
    
                            // Persist selected elements
                            obj.selection.push(obj.records[j][i]);
                        }
                    }
                }
            }
        }
    
        /**
         * Update corner position
         * 
         * @return void
         */
        obj.updateCornerPosition = function() {
            // If any selected cells
            if (! obj.highlighted.length) {
                obj.corner.style.top = '-2000px';
                obj.corner.style.left = '-2000px';
            } else {
                // Get last cell
                var last = obj.highlighted[obj.highlighted.length-1];

                var contentRect = obj.content.getBoundingClientRect();
                var x1 = contentRect.left;
                var y1 = contentRect.top;

                var lastRect = last.getBoundingClientRect();
                var x2 = lastRect.left;
                var y2 = lastRect.top;
                var w2 = lastRect.width;
                var h2 = lastRect.height;

                var x = (x2 - x1) + obj.content.scrollLeft + w2 - 4;
                var y = (y2 - y1) + obj.content.scrollTop + h2 - 4;

                // Place the corner in the correct place
                obj.corner.style.top = y + 'px';
                obj.corner.style.left = x + 'px';

                if (obj.options.freezeColumns) {
                    var width = obj.getFreezeWidth();
                    if (x2 - x1 + w2 < width) {
                        obj.corner.style.display = 'none';
                    } else {
                        if (obj.options.selectionCopy == true) {
                            obj.corner.style.display = '';
                        }
                    }
                } else {
                    if (obj.options.selectionCopy == true) {
                        obj.corner.style.display = '';
                    }
                }
            }
        }
    
        /**
         * Update scroll position based on the selection
         */
        obj.updateScroll = function(direction) {
            // Jspreadsheet Container information
            var contentRect = obj.content.getBoundingClientRect();
            var x1 = contentRect.left;
            var y1 = contentRect.top;
            var w1 = contentRect.width;
            var h1 = contentRect.height;

            // Direction Left or Up
            var reference = obj.records[obj.selectedCell[3]][obj.selectedCell[2]];
    
            // Reference
            var referenceRect = reference.getBoundingClientRect();
            var x2 = referenceRect.left;
            var y2 = referenceRect.top;
            var w2 = referenceRect.width;
            var h2 = referenceRect.height;
    
            // Direction
            if (direction == 0 || direction == 1) {
                var x = (x2 - x1) + obj.content.scrollLeft;
                var y = (y2 - y1) + obj.content.scrollTop - 2;
            } else {
                var x = (x2 - x1) + obj.content.scrollLeft + w2;
                var y = (y2 - y1) + obj.content.scrollTop + h2;
            }
    
            // Top position check
            if (y > (obj.content.scrollTop + 30) && y < (obj.content.scrollTop + h1)) {
                // In the viewport
            } else {
                // Out of viewport
                if (y < obj.content.scrollTop + 30) {
                    obj.content.scrollTop = y - h2;
                } else {
                    obj.content.scrollTop = y - (h1 - 2);
                }
            }
    
            // Freeze columns? 
            var freezed = obj.getFreezeWidth();

            // Left position check - TODO: change that to the bottom border of the element
            if (x > (obj.content.scrollLeft + freezed) && x < (obj.content.scrollLeft + w1)) {
                // In the viewport
            } else {
                // Out of viewport
                if (x < obj.content.scrollLeft + 30) {
                    obj.content.scrollLeft = x;
                    if (obj.content.scrollLeft < 50) {
                        obj.content.scrollLeft = 0;
                    }
                } else if (x < obj.content.scrollLeft + freezed) {
                    obj.content.scrollLeft = x - freezed - 1;
                } else {
                    obj.content.scrollLeft = x - (w1 - 20);
                }
            }
        }
    
        /**
         * Get the column width
         * 
         * @param int column column number (first column is: 0)
         * @return int current width
         */
        obj.getWidth = function(column) {
            if (! column) {
                // Get all headers
                var data = [];
                for (var i = 0; i < obj.headers.length; i++) {
                    data.push(obj.options.columns[i].width);
                }
            } else {
                // In case the column is an object
                if (typeof(column) == 'object') {
                    column = $(column).getAttribute('data-x');
                }
    
                data = obj.colgroup[column].getAttribute('width')
            }
    
            return data;
        }


        /**
         * Set the column width
         * 
         * @param int column number (first column is: 0)
         * @param int new column width
         * @param int old column width
         */
        obj.setWidth = function (column, width, oldWidth) {
            if (width) {
                if (Array.isArray(column)) {
                    // Oldwidth
                    if (! oldWidth) {
                        var oldWidth = [];
                    }
                    // Set width
                    for (var i = 0; i < column.length; i++) {
                        if (! oldWidth[i]) {
                            oldWidth[i] = obj.colgroup[column[i]].getAttribute('width');
                        }
                        var w = Array.isArray(width) && width[i] ? width[i] : width;
                        obj.colgroup[column[i]].setAttribute('width', w);
                        obj.options.columns[column[i]].width = w;
                    }
                } else {
                    // Oldwidth
                    if (! oldWidth) {
                        oldWidth = obj.colgroup[column].getAttribute('width');
                    }
                    // Set width
                    obj.colgroup[column].setAttribute('width', width);
                    obj.options.columns[column].width = width;
                }

                // Keeping history of changes
                obj.setHistory({
                    action:'setWidth',
                    column:column,
                    oldValue:oldWidth,
                    newValue:width,
                });

                // On resize column
                obj.dispatch('onresizecolumn', el, column, width, oldWidth);

                // Update corner position
                obj.updateCornerPosition();
            }
        }

        /**
         * Set the row height
         * 
         * @param row - row number (first row is: 0)
         * @param height - new row height
         * @param oldHeight - old row height
         */
        obj.setHeight = function (row, height, oldHeight) {
            if (height > 0) {
                // In case the column is an object
                if (typeof(row) == 'object') {
                    row = row.getAttribute('data-y');
                }
    
                // Oldwidth
                if (! oldHeight) {
                    oldHeight = obj.rows[row].getAttribute('height');

                    if (! oldHeight) {
                        var rect = obj.rows[row].getBoundingClientRect();
                        oldHeight = rect.height;
                    }
                }

                // Integer
                height = parseInt(height);

                // Set width
                obj.rows[row].style.height = height + 'px';
    
                // Keep options updated
                if (! obj.options.rows[row]) {
                    obj.options.rows[row] = {};
                }
                obj.options.rows[row].height = height;
    
                // Keeping history of changes
                obj.setHistory({
                    action:'setHeight',
                    row:row,
                    oldValue:oldHeight,
                    newValue:height,
                });

                // On resize column
                obj.dispatch('onresizerow', el, row, height, oldHeight);

                // Update corner position
                obj.updateCornerPosition();
            }
        }
    
        /**
         * Get the row height
         * 
         * @param row - row number (first row is: 0)
         * @return height - current row height
         */
        obj.getHeight = function(row) {
            if (! row) {
                // Get height of all rows
                var data = [];
                for (var j = 0; j < obj.rows.length; j++) {
                    var h = obj.rows[j].style.height;
                    if (h) {
                        data[j] = h;
                    }
                }
            } else {
                // In case the row is an object
                if (typeof(row) == 'object') {
                    row = $(row).getAttribute('data-y');
                }
    
                var data = obj.rows[row].style.height;
            }
    
            return data;
        }
    
        obj.setFooter = function(data) {
            if (data) {
                obj.options.footers = data;
            }

            if (obj.options.footers) {
                if (! obj.tfoot) {
                    obj.tfoot = document.createElement('tfoot');
                    obj.table.appendChild(obj.tfoot);
                } 

                for (var j = 0; j < obj.options.footers.length; j++) {
                    if (obj.tfoot.children[j]) {
                        var tr = obj.tfoot.children[j];
                    } else {
                        var tr = document.createElement('tr');
                        var td = document.createElement('td');
                        tr.appendChild(td);
                        obj.tfoot.appendChild(tr);
                    }
                    for (var i = 0; i < obj.headers.length; i++) {
                        if (! obj.options.footers[j][i]) {
                            obj.options.footers[j][i] = '';
                        }
                        if (obj.tfoot.children[j].children[i+1]) {
                            var td = obj.tfoot.children[j].children[i+1];
                        } else {
                            var td = document.createElement('td');
                            tr.appendChild(td);

                            // Text align
                            var colAlign = obj.options.columns[i].align ? obj.options.columns[i].align : 'center';
                            td.style.textAlign = colAlign;
                        }
                        td.innerText = obj.parseValue(i, j, obj.options.footers[j][i]);
                    }
                }
            }
        }

        /**
         * Get the column title
         * 
         * @param column - column number (first column is: 0)
         * @param title - new column title
         */
        obj.getHeader = function(column) {
            return obj.headers[column].innerText;
        }
    
        /**
         * Set the column title
         * 
         * @param column - column number (first column is: 0)
         * @param title - new column title
         */
        obj.setHeader = function(column, newValue) {
            if (obj.headers[column]) {
                var oldValue = obj.headers[column].innerText;
    
                if (! newValue) {
                    newValue = prompt(obj.options.text.columnName, oldValue)
                }
    
                if (newValue) {
                    obj.headers[column].innerText = newValue;
                    // Keep the title property
                    obj.headers[column].setAttribute('title', newValue);
                    // Update title
                    obj.options.columns[column].title = newValue;
                }
    
                obj.setHistory({
                    action: 'setHeader',
                    column: column,
                    oldValue: oldValue,
                    newValue: newValue
                });
    
                // On onchange header
                obj.dispatch('onchangeheader', el, column, oldValue, newValue);
            }
        }
    
        /**
         * Get the headers
         * 
         * @param asArray
         * @return mixed
         */
        obj.getHeaders = function (asArray) {
            var title = [];
    
            for (var i = 0; i < obj.headers.length; i++) {
                title.push(obj.getHeader(i));
            }
    
            return asArray ? title : title.join(obj.options.csvDelimiter);
        }
    
        /**
         * Get meta information from cell(s)
         * 
         * @return integer
         */
        obj.getMeta = function(cell, key) {
            if (! cell) {
                return obj.options.meta;
            } else {
                if (key) {
                    return obj.options.meta[cell] && obj.options.meta[cell][key] ? obj.options.meta[cell][key] : null;
                } else {
                    return obj.options.meta[cell] ? obj.options.meta[cell] : null;
                }
            }
        }
    
        /**
         * Set meta information to cell(s)
         * 
         * @return integer
         */
        obj.setMeta = function(o, k, v) {
            if (! obj.options.meta) {
                obj.options.meta = {}
            }
    
            if (k && v) {
                // Set data value
                if (! obj.options.meta[o]) {
                    obj.options.meta[o] = {};
                }
                obj.options.meta[o][k] = v;
            } else {
                // Apply that for all cells
                var keys = Object.keys(o);
                for (var i = 0; i < keys.length; i++) {
                    if (! obj.options.meta[keys[i]]) {
                        obj.options.meta[keys[i]] = {};
                    }
    
                    var prop = Object.keys(o[keys[i]]);
                    for (var j = 0; j < prop.length; j++) {
                        obj.options.meta[keys[i]][prop[j]] = o[keys[i]][prop[j]];
                    }
                }
            }
    
            obj.dispatch('onchangemeta', el, o, k, v);
        }
    
        /**
         * Update meta information
         * 
         * @return integer
         */
        obj.updateMeta = function(affectedCells) {
            if (obj.options.meta) {
                var newMeta = {};
                var keys = Object.keys(obj.options.meta);
                for (var i = 0; i < keys.length; i++) {
                    if (affectedCells[keys[i]]) {
                        newMeta[affectedCells[keys[i]]] = obj.options.meta[keys[i]];
                    } else {
                        newMeta[keys[i]] = obj.options.meta[keys[i]];
                    }
                }
                // Update meta information
                obj.options.meta = newMeta;
            }
        }
    
        /**
         * Get style information from cell(s)
         * 
         * @return integer
         */
        obj.getStyle = function(cell, key) {
            // Cell
            if (! cell) {
                // Control vars
                var data = {};
    
                // Column and row length
                var x = obj.options.data[0].length;
                var y = obj.options.data.length;
    
                // Go through the columns to get the data
                for (var j = 0; j < y; j++) {
                    for (var i = 0; i < x; i++) {
                        // Value
                        var v = key ? obj.records[j][i].style[key] : obj.records[j][i].getAttribute('style');
    
                        // Any meta data for this column?
                        if (v) {
                            // Column name
                            var k = jexcel.getColumnNameFromId([i, j]);
                            // Value
                            data[k] = v;
                        }
                    }
                }
    
               return data;
            } else {
                cell = jexcel.getIdFromColumnName(cell, true);
    
                return key ? obj.records[cell[1]][cell[0]].style[key] : obj.records[cell[1]][cell[0]].getAttribute('style');
            }
        },
    
        obj.resetStyle = function(o, ignoreHistoryAndEvents) {
            var keys = Object.keys(o);
            for (var i = 0; i < keys.length; i++) {
                // Position
                var cell = jexcel.getIdFromColumnName(keys[i], true);
                if (obj.records[cell[1]] && obj.records[cell[1]][cell[0]]) {
                    obj.records[cell[1]][cell[0]].setAttribute('style', '');
                }
            }
            obj.setStyle(o, null, null, null, ignoreHistoryAndEvents);
        }
    
        /**
         * Set meta information to cell(s)
         * 
         * @return integer
         */
        obj.setStyle = function(o, k, v, force, ignoreHistoryAndEvents) {
            var newValue = {};
            var oldValue = {};
    
            // Apply style
            var applyStyle = function(cellId, key, value) {
                // Position
                var cell = jexcel.getIdFromColumnName(cellId, true);
    
                if (obj.records[cell[1]] && obj.records[cell[1]][cell[0]] && (obj.records[cell[1]][cell[0]].classList.contains('readonly')==false || force)) {
                    // Current value
                    var currentValue = obj.records[cell[1]][cell[0]].style[key];
    
                    // Change layout
                    if (currentValue == value && ! force) {
                        value = '';
                        obj.records[cell[1]][cell[0]].style[key] = '';
                    } else {
                        obj.records[cell[1]][cell[0]].style[key] = value;
                    }
    
                    // History
                    if (! oldValue[cellId]) {
                        oldValue[cellId] = [];
                    }
                    if (! newValue[cellId]) {
                        newValue[cellId] = [];
                    }
    
                    oldValue[cellId].push([key + ':' + currentValue]);
                    newValue[cellId].push([key + ':' + value]);
                }
            }
    
            if (k && v) {
                // Get object from string
                if (typeof(o) == 'string') {
                    applyStyle(o, k, v);
                } else {
                    // Avoid duplications
                    var oneApplication = [];
                    // Apply that for all cells
                    for (var i = 0; i < o.length; i++) {
                        var x = o[i].getAttribute('data-x');
                        var y = o[i].getAttribute('data-y');
                        var cellName = jexcel.getColumnNameFromId([x, y]);
                        // This happens when is a merged cell
                        if (! oneApplication[cellName]) {
                            applyStyle(cellName, k, v);
                            oneApplication[cellName] = true;
                        }
                    }
                }
            } else {
                var keys = Object.keys(o);
                for (var i = 0; i < keys.length; i++) {
                    var style = o[keys[i]];
                    if (typeof(style) == 'string') {
                        style = style.split(';');
                    }
                    for (var j = 0; j < style.length; j++) {
                        if (typeof(style[j]) == 'string') {
                            style[j] = style[j].split(':');
                        }
                        // Apply value
                        if (style[j][0].trim()) {
                            applyStyle(keys[i], style[j][0].trim(), style[j][1]);
                        }
                    }
                }
            }
    
            var keys = Object.keys(oldValue);
            for (var i = 0; i < keys.length; i++) {
                oldValue[keys[i]] = oldValue[keys[i]].join(';');
            }
            var keys = Object.keys(newValue);
            for (var i = 0; i < keys.length; i++) {
                newValue[keys[i]] = newValue[keys[i]].join(';');
            }
    
            if (! ignoreHistoryAndEvents) {
                // Keeping history of changes
                obj.setHistory({
                    action: 'setStyle',
                    oldValue: oldValue,
                    newValue: newValue,
                });
            }

            obj.dispatch('onchangestyle', el, o, k, v);
        }

        /**
         * Get cell comments, null cell for all
         */
        obj.getComments = function(cell, withAuthor) {
            if (cell) {
                if (typeof(cell) == 'string') {
                    var cell = jexcel.getIdFromColumnName(cell, true);
                }

                if (withAuthor) {
                    return [obj.records[cell[1]][cell[0]].getAttribute('title'), obj.records[cell[1]][cell[0]].getAttribute('author')];
                } else {
                    return obj.records[cell[1]][cell[0]].getAttribute('title') || '';
                }
            } else {
                var data = {};
                for (var j = 0; j < obj.options.data.length; j++) {
                    for (var i = 0; i < obj.options.columns.length; i++) {
                        var comments = obj.records[j][i].getAttribute('title');
                        if (comments) {
                            var cell = jexcel.getColumnNameFromId([i, j]);
                            data[cell] = comments;
                        }
                    }
                }
                return data;
            }
        }

        /**
         * Set cell comments
         */
        obj.setComments = function(cellId, comments, author) {
            if (typeof(cellId) == 'string') {
                var cell = jexcel.getIdFromColumnName(cellId, true);
            } else {
                var cell = cellId;
            }
    
            // Keep old value
            var title = obj.records[cell[1]][cell[0]].getAttribute('title');
            var author = obj.records[cell[1]][cell[0]].getAttribute('data-author');
            var oldValue = [ title, author ];
    
            // Set new values
            obj.records[cell[1]][cell[0]].setAttribute('title', comments ? comments : '');
            obj.records[cell[1]][cell[0]].setAttribute('data-author', author ? author : '');
    
            // Remove class if there is no comment
            if (comments) {
                obj.records[cell[1]][cell[0]].classList.add('jexcel_comments');
            } else {
                obj.records[cell[1]][cell[0]].classList.remove('jexcel_comments');
            }
    
            // Save history
            obj.setHistory({
                action:'setComments',
                column: cellId,
                newValue: [ comments, author ],
                oldValue: oldValue,
            });
            // Set comments
            obj.dispatch('oncomments', el, comments, title, cell, cell[0], cell[1]);
        }
    
        /**
         * Get table config information
         */
        obj.getConfig = function() {
            var options = obj.options;
            options.style = obj.getStyle();
            options.mergeCells = obj.getMerge();
            options.comments = obj.getComments();
    
            return options;
        }
    
        /**
         * Sort data and reload table
         */
        obj.orderBy = function(column, order) {
            if (column >= 0) {
                // Merged cells
                if (Object.keys(obj.options.mergeCells).length > 0) {
                    if (! confirm(obj.options.text.thisActionWillDestroyAnyExistingMergedCellsAreYouSure)) {
                        return false;
                    } else {
                        // Remove merged cells
                        obj.destroyMerged();
                    }
                }
    
                // Direction
                if (order == null) {
                    order = obj.headers[column].classList.contains('arrow-down') ? 1 : 0;
                } else {
                    order = order ? 1 : 0;
                }
    
                // Test order
                var temp = [];
                if (obj.options.columns[column].type == 'number' || obj.options.columns[column].type == 'percentage' || obj.options.columns[column].type == 'autonumber' || obj.options.columns[column].type == 'color') {
                    for (var j = 0; j < obj.options.data.length; j++) {
                        temp[j] = [ j, Number(obj.options.data[j][column]) ];
                    }
                } else if (obj.options.columns[column].type == 'calendar' || obj.options.columns[column].type == 'checkbox' || obj.options.columns[column].type == 'radio') {
                    for (var j = 0; j < obj.options.data.length; j++) {
                        temp[j] = [ j, obj.options.data[j][column] ];
                    }
                } else {
                    for (var j = 0; j < obj.options.data.length; j++) {
                        temp[j] = [ j, obj.records[j][column].innerText.toLowerCase() ];
                    }
                }
    
                // Default sorting method
                if (typeof(obj.options.sorting) !== 'function') {
                    obj.options.sorting = function(direction) {
                        return function(a, b) {
                            var valueA = a[1];
                            var valueB = b[1];

                            if (! direction) {
                                return (valueA === '' && valueB !== '') ? 1 : (valueA !== '' && valueB === '') ? -1 : (valueA > valueB) ? 1 : (valueA < valueB) ? -1 :  0;
                            } else {
                                return (valueA === '' && valueB !== '') ? 1 : (valueA !== '' && valueB === '') ? -1 : (valueA > valueB) ? -1 : (valueA < valueB) ? 1 :  0;
                            }
                        }
                    }
                }

                temp = temp.sort(obj.options.sorting(order));
    
                // Save history
                var newValue = [];
                for (var j = 0; j < temp.length; j++) {
                    newValue[j] = temp[j][0];
                }
    
                // Save history
                obj.setHistory({
                    action: 'orderBy',
                    rows: newValue,
                    column: column,
                    order: order,
                });
    
                // Update order
                obj.updateOrderArrow(column, order);
                obj.updateOrder(newValue);
    
                // On sort event
                obj.dispatch('onsort', el, column, order);
    
                return true;
            }
        }
    
        /**
         * Update order arrow
         */
        obj.updateOrderArrow = function(column, order) {
            // Remove order
            for (var i = 0; i < obj.headers.length; i++) {
                obj.headers[i].classList.remove('arrow-up');
                obj.headers[i].classList.remove('arrow-down');
            }
    
            // No order specified then toggle order
            if (order) {
                obj.headers[column].classList.add('arrow-up');
            } else {
                obj.headers[column].classList.add('arrow-down');
            }
        }
    
        /**
         * Update rows position
         */
        obj.updateOrder = function(rows) {
            // History
            var data = []
            for (var j = 0; j < rows.length; j++) {
                data[j] = obj.options.data[rows[j]];
            }
            obj.options.data = data;
    
            var data = []
            for (var j = 0; j < rows.length; j++) {
                data[j] = obj.records[rows[j]];
            }
            obj.records = data;
    
            var data = []
            for (var j = 0; j < rows.length; j++) {
                data[j] = obj.rows[rows[j]];
            }
            obj.rows = data;
    
            // Update references
            obj.updateTableReferences();
    
            // Redo search
            if (obj.results && obj.results.length) {
                if (obj.searchInput.value) {
                    obj.search(obj.searchInput.value);
                } else {
                    obj.closeFilter();
                }
            } else {
                // Create page
                obj.results = null;
                obj.pageNumber = 0;
    
                if (obj.options.pagination > 0) {
                    obj.page(0);
                } else if (obj.options.lazyLoading == true) {
                    obj.loadPage(0);
                } else {
                    for (var j = 0; j < obj.rows.length; j++) {
                        obj.tbody.appendChild(obj.rows[j]);
                    }
                }
            }
        }
    
        /**
         * Move row
         * 
         * @return void
         */
        obj.moveRow = function(o, d, ignoreDom) {
            if (Object.keys(obj.options.mergeCells).length > 0) {
                if (o > d) {
                    var insertBefore = 1;
                } else {
                    var insertBefore = 0;
                }

                if (obj.isRowMerged(o).length || obj.isRowMerged(d, insertBefore).length) {
                    if (! confirm(obj.options.text.thisActionWillDestroyAnyExistingMergedCellsAreYouSure)) {
                        return false;
                    } else {
                        obj.destroyMerged();
                    }
                }
            }
    
            if (obj.options.search == true) {
                if (obj.results && obj.results.length != obj.rows.length) {
                    if (confirm(obj.options.text.thisActionWillClearYourSearchResultsAreYouSure)) {
                        obj.resetSearch();
                    } else {
                        return false;
                    }
                }
    
                obj.results = null;
            }
    
            if (! ignoreDom) {
                if (Array.prototype.indexOf.call(obj.tbody.children, obj.rows[d]) >= 0) {
                    if (o > d) {
                        obj.tbody.insertBefore(obj.rows[o], obj.rows[d]);
                    } else {
                        obj.tbody.insertBefore(obj.rows[o], obj.rows[d].nextSibling);
                    }
                } else {
                    obj.tbody.removeChild(obj.rows[o]);
                }
            }
    
            // Place references in the correct position
            obj.rows.splice(d, 0, obj.rows.splice(o, 1)[0]);
            obj.records.splice(d, 0, obj.records.splice(o, 1)[0]);
            obj.options.data.splice(d, 0, obj.options.data.splice(o, 1)[0]);
    
            // Respect pagination
            if (obj.options.pagination > 0 && obj.tbody.children.length != obj.options.pagination) {
                obj.page(obj.pageNumber);
            }
    
            // Keeping history of changes
            obj.setHistory({
                action:'moveRow',
                oldValue: o,
                newValue: d,
            });
    
            // Update table references
            obj.updateTableReferences();
    
            // Events
            obj.dispatch('onmoverow', el, o, d);
        }

        /**
         * Insert a new row
         * 
         * @param mixed - number of blank lines to be insert or a single array with the data of the new row
         * @param rowNumber
         * @param insertBefore
         * @return void
         */
        obj.insertRow = function(mixed, rowNumber, insertBefore) {
            // Configuration
            if (obj.options.allowInsertRow == true) {
                // Records
                var records = [];
    
                // Data to be insert
                var data = [];
    
                // The insert could be lead by number of rows or the array of data
                if (mixed > 0) {
                    var numOfRows = mixed;
                } else {
                    var numOfRows = 1;
    
                    if (mixed) {
                        data = mixed;
                    }
                }
    
                // Direction
                var insertBefore = insertBefore ? true : false;
    
                // Current column number
                var lastRow = obj.options.data.length - 1;
    
                if (rowNumber == undefined || rowNumber >= parseInt(lastRow) || rowNumber < 0) {
                    rowNumber = lastRow;
                }
    
                // Onbeforeinsertrow
                if (obj.dispatch('onbeforeinsertrow', el, rowNumber, numOfRows, insertBefore) === false) {
                    return false;
                }
    
                // Merged cells
                if (Object.keys(obj.options.mergeCells).length > 0) {
                    if (obj.isRowMerged(rowNumber, insertBefore).length) {
                        if (! confirm(obj.options.text.thisActionWillDestroyAnyExistingMergedCellsAreYouSure)) {
                            return false;
                        } else {
                            obj.destroyMerged();
                        }
                    }
                }
    
                // Clear any search
                if (obj.options.search == true) {
                    if (obj.results && obj.results.length != obj.rows.length) {
                        if (confirm(obj.options.text.thisActionWillClearYourSearchResultsAreYouSure)) {
                            obj.resetSearch();
                        } else {
                            return false;
                        }
                    }
    
                    obj.results = null;
                }
    
                // Insertbefore
                var rowIndex = (! insertBefore) ? rowNumber + 1 : rowNumber;

                // Keep the current data
                var currentRecords = obj.records.splice(rowIndex);
                var currentData = obj.options.data.splice(rowIndex);
                var currentRows = obj.rows.splice(rowIndex);
    
                // Adding lines
                var rowRecords = [];
                var rowData = [];
                var rowNode = [];

                for (var row = rowIndex; row < (numOfRows + rowIndex); row++) {
                    // Push data to the data container
                    obj.options.data[row] = [];
                    for (var col = 0; col < obj.options.columns.length; col++) {
                        obj.options.data[row][col]  = data[col] ? data[col] : '';
                    }
                    // Create row
                    var tr = obj.createRow(row, obj.options.data[row]);
                    // Append node
                    if (currentRows[0]) {
                        if (Array.prototype.indexOf.call(obj.tbody.children, currentRows[0]) >= 0) {
                            obj.tbody.insertBefore(tr, currentRows[0]);
                        }
                    } else {
                        if (Array.prototype.indexOf.call(obj.tbody.children, obj.rows[rowNumber]) >= 0) {
                            obj.tbody.appendChild(tr);
                        }
                    }
                    // Record History
                    rowRecords.push(obj.records[row]);
                    rowData.push(obj.options.data[row]);
                    rowNode.push(tr);
                }
    
                // Copy the data back to the main data
                Array.prototype.push.apply(obj.records, currentRecords);
                Array.prototype.push.apply(obj.options.data, currentData);
                Array.prototype.push.apply(obj.rows, currentRows);
    
                // Respect pagination
                if (obj.options.pagination > 0) {
                    obj.page(obj.pageNumber);
                }
    
                // Keep history
                obj.setHistory({
                    action: 'insertRow',
                    rowNumber: rowNumber,
                    numOfRows: numOfRows,
                    insertBefore: insertBefore,
                    rowRecords: rowRecords,
                    rowData: rowData,
                    rowNode: rowNode,
                });
    
                // Remove table references
                obj.updateTableReferences();
    
                // Events
                obj.dispatch('oninsertrow', el, rowNumber, numOfRows, rowRecords, insertBefore);
            }
        }
    
        /**
         * Delete a row by number
         * 
         * @param integer rowNumber - row number to be excluded
         * @param integer numOfRows - number of lines
         * @return void
         */
        obj.deleteRow = function(rowNumber, numOfRows) {
            // Global Configuration
            if (obj.options.allowDeleteRow == true) {
                if (obj.options.allowDeletingAllRows == true || obj.options.data.length > 1) {
                    // Delete row definitions
                    if (rowNumber == undefined) {
                        var number = obj.getSelectedRows();
    
                        if (! number[0]) {
                            rowNumber = obj.options.data.length - 1;
                            numOfRows = 1;
                        } else {
                            rowNumber = parseInt(number[0].getAttribute('data-y'));
                            numOfRows = number.length;
                        }
                    }
    
                    // Last column
                    var lastRow = obj.options.data.length - 1;
    
                    if (rowNumber == undefined || rowNumber > lastRow || rowNumber < 0) {
                        rowNumber = lastRow;
                    }
    
                    if (! numOfRows) {
                        numOfRows = 1;
                    }
    
                    // Do not delete more than the number of records
                    if (rowNumber + numOfRows >= obj.options.data.length) {
                        numOfRows = obj.options.data.length - rowNumber;
                    }

                    // Onbeforedeleterow
                    if (obj.dispatch('onbeforedeleterow', el, rowNumber, numOfRows) === false) {
                        return false;
                    }
    
                    if (parseInt(rowNumber) > -1) {
                        // Merged cells
                        var mergeExists = false;
                        if (Object.keys(obj.options.mergeCells).length > 0) {
                            for (var row = rowNumber; row < rowNumber + numOfRows; row++) {
                                if (obj.isRowMerged(row, false).length) {
                                    mergeExists = true;
                                }
                            }
                        }
                        if (mergeExists) {
                            if (! confirm(obj.options.text.thisActionWillDestroyAnyExistingMergedCellsAreYouSure)) {
                                return false;
                            } else {
                                obj.destroyMerged();
                            }
                        }
    
                        // Clear any search
                        if (obj.options.search == true) {
                            if (obj.results && obj.results.length != obj.rows.length) {
                                if (confirm(obj.options.text.thisActionWillClearYourSearchResultsAreYouSure)) {
                                    obj.resetSearch();
                                } else {
                                    return false;
                                }
                            }
    
                            obj.results = null;
                        }
    
                        // If delete all rows, and set allowDeletingAllRows false, will stay one row
                        if (obj.options.allowDeletingAllRows == false && lastRow + 1 === numOfRows) {
                            numOfRows--;
                            console.error('Jspreadsheet: It is not possible to delete the last row');
                        }
    
                        // Remove node
                        for (var row = rowNumber; row < rowNumber + numOfRows; row++) {
                            if (Array.prototype.indexOf.call(obj.tbody.children, obj.rows[row]) >= 0) {
                                obj.rows[row].className = '';
                                obj.rows[row].parentNode.removeChild(obj.rows[row]);
                            }
                        }
    
                        // Remove data
                        var rowRecords = obj.records.splice(rowNumber, numOfRows);
                        var rowData = obj.options.data.splice(rowNumber, numOfRows);
                        var rowNode = obj.rows.splice(rowNumber, numOfRows);
    
                        // Respect pagination
                        if (obj.options.pagination > 0 && obj.tbody.children.length != obj.options.pagination) {
                            obj.page(obj.pageNumber);
                        }
    
                        // Remove selection
                        obj.conditionalSelectionUpdate(1, rowNumber, (rowNumber + numOfRows) - 1);
    
                        // Keep history
                        obj.setHistory({
                            action: 'deleteRow',
                            rowNumber: rowNumber,
                            numOfRows: numOfRows,
                            insertBefore: 1,
                            rowRecords: rowRecords,
                            rowData: rowData,
                            rowNode: rowNode
                        });
    
                        // Remove table references
                        obj.updateTableReferences();
    
                        // Events
                        obj.dispatch('ondeleterow', el, rowNumber, numOfRows, rowRecords);
                    }
                } else {
                    console.error('Jspreadsheet: It is not possible to delete the last row');
                }
            }
        }
    
    
        /**
         * Move column
         * 
         * @return void
         */
        obj.moveColumn = function(o, d) {
            if (Object.keys(obj.options.mergeCells).length > 0) {
                if (o > d) {
                    var insertBefore = 1;
                } else {
                    var insertBefore = 0;
                }

                if (obj.isColMerged(o).length || obj.isColMerged(d, insertBefore).length) {
                    if (! confirm(obj.options.text.thisActionWillDestroyAnyExistingMergedCellsAreYouSure)) {
                        return false;
                    } else {
                        obj.destroyMerged();
                    }
                }
            }
    
            var o = parseInt(o);
            var d = parseInt(d);
    
            if (o > d) {
                obj.headerContainer.insertBefore(obj.headers[o], obj.headers[d]);
                obj.colgroupContainer.insertBefore(obj.colgroup[o], obj.colgroup[d]);
    
                for (var j = 0; j < obj.rows.length; j++) {
                    obj.rows[j].insertBefore(obj.records[j][o], obj.records[j][d]);
                }
            } else {
                obj.headerContainer.insertBefore(obj.headers[o], obj.headers[d].nextSibling);
                obj.colgroupContainer.insertBefore(obj.colgroup[o], obj.colgroup[d].nextSibling);
    
                for (var j = 0; j < obj.rows.length; j++) {
                    obj.rows[j].insertBefore(obj.records[j][o], obj.records[j][d].nextSibling);
                }
            }
    
            obj.options.columns.splice(d, 0, obj.options.columns.splice(o, 1)[0]);
            obj.headers.splice(d, 0, obj.headers.splice(o, 1)[0]);
            obj.colgroup.splice(d, 0, obj.colgroup.splice(o, 1)[0]);
    
            for (var j = 0; j < obj.rows.length; j++) {
                obj.options.data[j].splice(d, 0, obj.options.data[j].splice(o, 1)[0]);
                obj.records[j].splice(d, 0, obj.records[j].splice(o, 1)[0]);
            }
    
            // Update footers position
            if (obj.options.footers) {
                for (var j = 0; j < obj.options.footers.length; j++) {
                    obj.options.footers[j].splice(d, 0, obj.options.footers[j].splice(o, 1)[0]);
                }
            }

            // Keeping history of changes
            obj.setHistory({
                action:'moveColumn',
                oldValue: o,
                newValue: d,
            });
    
            // Update table references
            obj.updateTableReferences();
    
            // Events
            obj.dispatch('onmovecolumn', el, o, d);
        }

        /**
         * Insert a new column
         * 
         * @param mixed - num of columns to be added or data to be added in one single column
         * @param int columnNumber - number of columns to be created
         * @param bool insertBefore
         * @param object properties - column properties
         * @return void
         */
        obj.insertColumn = function(mixed, columnNumber, insertBefore, properties) {
            // Configuration
            if (obj.options.allowInsertColumn == true) {
                // Records
                var records = [];
    
                // Data to be insert
                var data = [];
    
                // The insert could be lead by number of rows or the array of data
                if (mixed > 0) {
                    var numOfColumns = mixed;
                } else {
                    var numOfColumns = 1;
    
                    if (mixed) {
                        data = mixed;
                    }
                }
    
                // Direction
                var insertBefore = insertBefore ? true : false;
    
                // Current column number
                var lastColumn = obj.options.columns.length - 1;
    
                // Confirm position
                if (columnNumber == undefined || columnNumber >= parseInt(lastColumn) || columnNumber < 0) {
                    columnNumber = lastColumn;
                }
    
                // Onbeforeinsertcolumn
                if (obj.dispatch('onbeforeinsertcolumn', el, columnNumber, numOfColumns, insertBefore) === false) {
                    return false;
                }
    
                // Merged cells
                if (Object.keys(obj.options.mergeCells).length > 0) {
                    if (obj.isColMerged(columnNumber, insertBefore).length) {
                        if (! confirm(obj.options.text.thisActionWillDestroyAnyExistingMergedCellsAreYouSure)) {
                            return false;
                        } else {
                            obj.destroyMerged();
                        }
                    }
                }
    
                // Create default properties
                if (! properties) {
                    properties = [];
                }
    
                for (var i = 0; i < numOfColumns; i++) {
                    if (! properties[i]) {
                        properties[i] = { type:'text', source:[], options:[], width:obj.options.defaultColWidth, align:obj.options.defaultColAlign };
                    }
                }
    
                // Insert before
                var columnIndex = (! insertBefore) ? columnNumber + 1 : columnNumber;
                obj.options.columns = jexcel.injectArray(obj.options.columns, columnIndex, properties);
    
                // Open space in the containers
                var currentHeaders = obj.headers.splice(columnIndex);
                var currentColgroup = obj.colgroup.splice(columnIndex);
    
                // History
                var historyHeaders = [];
                var historyColgroup = [];
                var historyRecords = [];
                var historyData = [];
                var historyFooters = [];
    
                // Add new headers
                for (var col = columnIndex; col < (numOfColumns + columnIndex); col++) {
                    obj.createCellHeader(col);
                    obj.headerContainer.insertBefore(obj.headers[col], obj.headerContainer.children[col+1]);
                    obj.colgroupContainer.insertBefore(obj.colgroup[col], obj.colgroupContainer.children[col+1]);
    
                    historyHeaders.push(obj.headers[col]);
                    historyColgroup.push(obj.colgroup[col]);
                }
    
                // Add new footer cells
                if (obj.options.footers) {
                    for (var j = 0; j < obj.options.footers.length; j++) {
                        historyFooters[j] = [];
                        for (var i = 0; i < numOfColumns; i++) {
                            historyFooters[j].push('');
                        }
                        obj.options.footers[j].splice(columnIndex, 0, historyFooters[j]);
                    }
                }

                // Adding visual columns
                for (var row = 0; row < obj.options.data.length; row++) {
                    // Keep the current data
                    var currentData = obj.options.data[row].splice(columnIndex);
                    var currentRecord = obj.records[row].splice(columnIndex);
    
                    // History
                    historyData[row] = [];
                    historyRecords[row] = [];
    
                    for (var col = columnIndex; col < (numOfColumns + columnIndex); col++) {
                        // New value
                        var value = data[row] ? data[row] : '';
                        obj.options.data[row][col] = value;
                        // New cell
                        var td = obj.createCell(col, row, obj.options.data[row][col]);
                        obj.records[row][col] = td;
                        // Add cell to the row
                        if (obj.rows[row]) {
                            obj.rows[row].insertBefore(td, obj.rows[row].children[col+1]);
                        }
    
                        // Record History
                        historyData[row].push(value);
                        historyRecords[row].push(td);
                    }
    
                    // Copy the data back to the main data
                    Array.prototype.push.apply(obj.options.data[row], currentData);
                    Array.prototype.push.apply(obj.records[row], currentRecord);
                }
    
                Array.prototype.push.apply(obj.headers, currentHeaders);
                Array.prototype.push.apply(obj.colgroup, currentColgroup);
    
                // Adjust nested headers
                if (obj.options.nestedHeaders && obj.options.nestedHeaders.length > 0) {
                    // Flexible way to handle nestedheaders
                    if (obj.options.nestedHeaders[0] && obj.options.nestedHeaders[0][0]) {
                        for (var j = 0; j < obj.options.nestedHeaders.length; j++) {
                            var colspan = parseInt(obj.options.nestedHeaders[j][obj.options.nestedHeaders[j].length-1].colspan) + numOfColumns;
                            obj.options.nestedHeaders[j][obj.options.nestedHeaders[j].length-1].colspan = colspan;
                            obj.thead.children[j].children[obj.thead.children[j].children.length-1].setAttribute('colspan', colspan);
                            var o = obj.thead.children[j].children[obj.thead.children[j].children.length-1].getAttribute('data-column');
                            o = o.split(',');
                            for (var col = columnIndex; col < (numOfColumns + columnIndex); col++) {
                                o.push(col);
                            }
                            obj.thead.children[j].children[obj.thead.children[j].children.length-1].setAttribute('data-column', o);
                        }
                    } else {
                        var colspan = parseInt(obj.options.nestedHeaders[0].colspan) + numOfColumns;
                        obj.options.nestedHeaders[0].colspan = colspan;
                        obj.thead.children[0].children[obj.thead.children[0].children.length-1].setAttribute('colspan', colspan);
                    }
                }
    
                // Keep history
                obj.setHistory({
                    action: 'insertColumn',
                    columnNumber:columnNumber,
                    numOfColumns:numOfColumns,
                    insertBefore:insertBefore,
                    columns:properties,
                    headers:historyHeaders,
                    colgroup:historyColgroup,
                    records:historyRecords,
                    footers:historyFooters,
                    data:historyData,
                });
    
                // Remove table references
                obj.updateTableReferences();
    
                // Events
                obj.dispatch('oninsertcolumn', el, columnNumber, numOfColumns, historyRecords, insertBefore);
            }
        }
    
        /**
         * Delete a column by number
         * 
         * @param integer columnNumber - reference column to be excluded
         * @param integer numOfColumns - number of columns to be excluded from the reference column
         * @return void
         */
        obj.deleteColumn = function(columnNumber, numOfColumns) {
            // Global Configuration
            if (obj.options.allowDeleteColumn == true) {
                if (obj.headers.length > 1) {
                    // Delete column definitions
                    if (columnNumber == undefined) {
                        var number = obj.getSelectedColumns(true);
    
                        if (! number.length) {
                            // Remove last column
                            columnNumber = obj.headers.length - 1;
                            numOfColumns = 1;
                        } else {
                            // Remove selected
                            columnNumber = parseInt(number[0]);
                            numOfColumns = parseInt(number.length);
                        }
                    }
    
                    // Lasat column
                    var lastColumn = obj.options.data[0].length - 1;
    
                    if (columnNumber == undefined || columnNumber > lastColumn || columnNumber < 0) {
                        columnNumber = lastColumn;
                    }
    
                    // Minimum of columns to be delete is 1
                    if (! numOfColumns) {
                        numOfColumns = 1;
                    }
    
                    // Can't delete more than the limit of the table
                    if (numOfColumns > obj.options.data[0].length - columnNumber) {
                        numOfColumns = obj.options.data[0].length - columnNumber;
                    }
    
                    // onbeforedeletecolumn
                   if (obj.dispatch('onbeforedeletecolumn', el, columnNumber, numOfColumns) === false) {
                      return false;
                   }
    
                    // Can't remove the last column
                    if (parseInt(columnNumber) > -1) {
                        // Merged cells
                        var mergeExists = false;
                        if (Object.keys(obj.options.mergeCells).length > 0) {
                            for (var col = columnNumber; col < columnNumber + numOfColumns; col++) {
                                if (obj.isColMerged(col, false).length) {
                                    mergeExists = true;
                                }
                            }
                        }
                        if (mergeExists) {
                            if (! confirm(obj.options.text.thisActionWillDestroyAnyExistingMergedCellsAreYouSure)) {
                                return false;
                            } else {
                                obj.destroyMerged();
                            }
                        }
    
                        // Delete the column properties
                        var columns = obj.options.columns.splice(columnNumber, numOfColumns);
    
                        for (var col = columnNumber; col < columnNumber + numOfColumns; col++) {
                            obj.colgroup[col].className = '';
                            obj.headers[col].className = '';
                            obj.colgroup[col].parentNode.removeChild(obj.colgroup[col]);
                            obj.headers[col].parentNode.removeChild(obj.headers[col]);
                        }
    
                        var historyHeaders = obj.headers.splice(columnNumber, numOfColumns);
                        var historyColgroup = obj.colgroup.splice(columnNumber, numOfColumns);
                        var historyRecords = [];
                        var historyData = [];
                        var historyFooters = [];

                        for (var row = 0; row < obj.options.data.length; row++) {
                            for (var col = columnNumber; col < columnNumber + numOfColumns; col++) {
                                obj.records[row][col].className = '';
                                obj.records[row][col].parentNode.removeChild(obj.records[row][col]);
                            }
                        }
    
                        // Delete headers
                        for (var row = 0; row < obj.options.data.length; row++) {
                            // History
                            historyData[row] = obj.options.data[row].splice(columnNumber, numOfColumns);
                            historyRecords[row] = obj.records[row].splice(columnNumber, numOfColumns);
                        }

                        // Delete footers
                        if (obj.options.footers) {
                            for (var row = 0; row < obj.options.footers.length; row++) {
                                historyFooters[row] = obj.options.footers[row].splice(columnNumber, numOfColumns);
                            }
                        }

                        // Remove selection
                        obj.conditionalSelectionUpdate(0, columnNumber, (columnNumber + numOfColumns) - 1);
    
                        // Adjust nested headers
                        if (obj.options.nestedHeaders && obj.options.nestedHeaders.length > 0) {
                            // Flexible way to handle nestedheaders
                            if (obj.options.nestedHeaders[0] && obj.options.nestedHeaders[0][0]) {
                                for (var j = 0; j < obj.options.nestedHeaders.length; j++) {
                                    var colspan = parseInt(obj.options.nestedHeaders[j][obj.options.nestedHeaders[j].length-1].colspan) - numOfColumns;
                                    obj.options.nestedHeaders[j][obj.options.nestedHeaders[j].length-1].colspan = colspan;
                                    obj.thead.children[j].children[obj.thead.children[j].children.length-1].setAttribute('colspan', colspan);
                                }
                            } else {
                                var colspan = parseInt(obj.options.nestedHeaders[0].colspan) - numOfColumns;
                                obj.options.nestedHeaders[0].colspan = colspan;
                                obj.thead.children[0].children[obj.thead.children[0].children.length-1].setAttribute('colspan', colspan);
                            }
                        }
    
                        // Keeping history of changes
                        obj.setHistory({
                            action:'deleteColumn',
                            columnNumber:columnNumber,
                            numOfColumns:numOfColumns,
                            insertBefore: 1,
                            columns:columns,
                            headers:historyHeaders,
                            colgroup:historyColgroup,
                            records:historyRecords,
                            footers:historyFooters,
                            data:historyData,
                        });
    
                        // Update table references
                        obj.updateTableReferences();
    
                        // Delete
                        obj.dispatch('ondeletecolumn', el, columnNumber, numOfColumns, historyRecords);
                    }
                } else {
                    console.error('Jspreadsheet: It is not possible to delete the last column');
                }
            }
        }
    
        /**
         * Get selected rows numbers
         * 
         * @return array
         */
        obj.getSelectedRows = function(asIds) {
            var rows = [];
            // Get all selected rows
            for (var j = 0; j < obj.rows.length; j++) {
                if (obj.rows[j].classList.contains('selected')) {
                    if (asIds) {
                        rows.push(j);
                    } else {
                        rows.push(obj.rows[j]);
                    }
                }
            }
    
            return rows;
        },
    
        /**
         * Get selected column numbers
         * 
         * @return array
         */
        obj.getSelectedColumns = function() {
            var cols = [];
            // Get all selected cols
            for (var i = 0; i < obj.headers.length; i++) {
                if (obj.headers[i].classList.contains('selected')) {
                    cols.push(i);
                }
            }
    
            return cols;
        }
    
        /**
         * Get highlighted
         * 
         * @return array
         */
        obj.getHighlighted = function() {
            return obj.highlighted;
        }
    
        /**
         * Update cell references
         * 
         * @return void
         */
        obj.updateTableReferences = function() {
            // Update headers
            for (var i = 0; i < obj.headers.length; i++) {
                var x = obj.headers[i].getAttribute('data-x');
    
                if (x != i) {
                    // Update coords
                    obj.headers[i].setAttribute('data-x', i);
                    // Title
                    if (! obj.headers[i].getAttribute('title')) {
                        obj.headers[i].innerHTML = jexcel.getColumnName(i);
                    }
                }
            }
    
            // Update all rows
            for (var j = 0; j < obj.rows.length; j++) {
                if (obj.rows[j]) {
                    var y = obj.rows[j].getAttribute('data-y');
    
                    if (y != j) {
                        // Update coords
                        obj.rows[j].setAttribute('data-y', j);
                        obj.rows[j].children[0].setAttribute('data-y', j);
                        // Row number
                        obj.rows[j].children[0].innerHTML = j + 1;
                    }
                }
            }
    
            // Regular cells affected by this change
            var affectedTokens = [];
            var mergeCellUpdates = [];
    
            // Update cell
            var updatePosition = function(x,y,i,j) {
                if (x != i) {
                    obj.records[j][i].setAttribute('data-x', i);
                }
                if (y != j) {
                    obj.records[j][i].setAttribute('data-y', j);
                }
    
                // Other updates
                if (x != i || y != j) {
                    var columnIdFrom = jexcel.getColumnNameFromId([x, y]);
                    var columnIdTo = jexcel.getColumnNameFromId([i, j]);
                    affectedTokens[columnIdFrom] = columnIdTo;
                }
            }
    
            for (var j = 0; j < obj.records.length; j++) {
                for (var i = 0; i < obj.records[0].length; i++) {
                    if (obj.records[j][i]) {
                        // Current values
                        var x = obj.records[j][i].getAttribute('data-x');
                        var y = obj.records[j][i].getAttribute('data-y');
    
                        // Update column
                        if (obj.records[j][i].getAttribute('data-merged')) {
                            var columnIdFrom = jexcel.getColumnNameFromId([x, y]);
                            var columnIdTo = jexcel.getColumnNameFromId([i, j]);
                            if (mergeCellUpdates[columnIdFrom] == null) {
                                if (columnIdFrom == columnIdTo) {
                                    mergeCellUpdates[columnIdFrom] = false;
                                } else {
                                    var totalX = parseInt(i - x);
                                    var totalY = parseInt(j - y);
                                    mergeCellUpdates[columnIdFrom] = [ columnIdTo, totalX, totalY ];
                                }
                            }
                        } else {
                            updatePosition(x,y,i,j);
                        }
                    }
                }
            }
    
            // Update merged if applicable
            var keys = Object.keys(mergeCellUpdates);
            if (keys.length) {
                for (var i = 0; i < keys.length; i++) {
                    if (mergeCellUpdates[keys[i]]) {
                        var info = jexcel.getIdFromColumnName(keys[i], true)
                        var x = info[0];
                        var y = info[1];
                        updatePosition(x,y,x + mergeCellUpdates[keys[i]][1],y + mergeCellUpdates[keys[i]][2]);
    
                        var columnIdFrom = keys[i];
                        var columnIdTo = mergeCellUpdates[keys[i]][0];
                        for (var j = 0; j < obj.options.mergeCells[columnIdFrom][2].length; j++) {
                            var x = parseInt(obj.options.mergeCells[columnIdFrom][2][j].getAttribute('data-x'));
                            var y = parseInt(obj.options.mergeCells[columnIdFrom][2][j].getAttribute('data-y'));
                            obj.options.mergeCells[columnIdFrom][2][j].setAttribute('data-x', x + mergeCellUpdates[keys[i]][1]);
                            obj.options.mergeCells[columnIdFrom][2][j].setAttribute('data-y', y + mergeCellUpdates[keys[i]][2]);
                        }
    
                        obj.options.mergeCells[columnIdTo] = obj.options.mergeCells[columnIdFrom];
                        delete(obj.options.mergeCells[columnIdFrom]);
                    }
                }
            }
    
            // Update formulas
            obj.updateFormulas(affectedTokens);
    
            // Update meta data
            obj.updateMeta(affectedTokens);
    
            // Refresh selection
            obj.refreshSelection();
    
            // Update table with custom configuration if applicable
            obj.updateTable();
        }
    
        /**
         * Custom settings for the cells
         */
        obj.updateTable = function() {
            // Check for spare
            if (obj.options.minSpareRows > 0) {
                var numBlankRows = 0;
                for (var j = obj.rows.length - 1; j >= 0; j--) {
                    var test = false;
                    for (var i = 0; i < obj.headers.length; i++) {
                        if (obj.options.data[j][i]) {
                            test = true;
                        }
                    }
                    if (test) {
                        break;
                    } else {
                        numBlankRows++;
                    }
                }
    
                if (obj.options.minSpareRows - numBlankRows > 0) {
                    obj.insertRow(obj.options.minSpareRows - numBlankRows)
                }
            }
    
            if (obj.options.minSpareCols > 0) {
                var numBlankCols = 0;
                for (var i = obj.headers.length - 1; i >= 0 ; i--) {
                    var test = false;
                    for (var j = 0; j < obj.rows.length; j++) {
                        if (obj.options.data[j][i]) {
                            test = true;
                        }
                    }
                    if (test) {
                        break;
                    } else {
                        numBlankCols++;
                    }
                }
    
                if (obj.options.minSpareCols - numBlankCols > 0) {
                    obj.insertColumn(obj.options.minSpareCols - numBlankCols)
                }
            }
    
            // Customizations by the developer
            if (typeof(obj.options.updateTable) == 'function') {
                if (obj.options.detachForUpdates) {
                    el.removeChild(obj.content);
                }

                for (var j = 0; j < obj.rows.length; j++) {
                    for (var i = 0; i < obj.headers.length; i++) {
                        obj.options.updateTable(el, obj.records[j][i], i, j, obj.options.data[j][i], obj.records[j][i].innerText, jexcel.getColumnNameFromId([i, j]));
                    }
                }

                if (obj.options.detachForUpdates) {
                    el.insertBefore(obj.content, obj.pagination);
                }
            }
    
            // Update footers
            if (obj.options.footers) {
                obj.setFooter();
            }

            // Update corner position
            setTimeout(function() {
                obj.updateCornerPosition();
            },0);
        }

        /**
         * Readonly
         */
        obj.isReadOnly = function(cell) {
            if (cell = obj.getCell(cell)) {
                return cell.classList.contains('readonly') ? true : false;
            }
        }

        /**
         * Readonly
         */
        obj.setReadOnly = function(cell, state) {
            if (cell = obj.getCell(cell)) {
                if (state) {
                    cell.classList.add('readonly');
                } else {
                    cell.classList.remove('readonly');
                }
            }
        }

        /**
         * Show row
         */
        obj.showRow = function(rowNumber) {
            obj.rows[rowNumber].style.display = '';
        }

        /**
         * Hide row
         */
        obj.hideRow = function(rowNumber) {
            obj.rows[rowNumber].style.display = 'none';
        }

        /**
         * Show column
         */
        obj.showColumn = function(colNumber) {
            obj.headers[colNumber].style.display = '';
            obj.colgroup[colNumber].style.display = '';
            for (var j = 0; j < obj.options.data.length; j++) {
                obj.records[j][colNumber].style.display = '';
            }
        }

        /**
         * Hide column
         */
        obj.hideColumn = function(colNumber) {
            obj.headers[colNumber].style.display = 'none';
            obj.colgroup[colNumber].style.display = 'none';
            for (var j = 0; j < obj.options.data.length; j++) {
                obj.records[j][colNumber].style.display = 'none';
            }
        }

        /**
         * Show index column
         */
        obj.showIndex = function() {
            obj.table.classList.remove('jexcel_hidden_index');
        }
    
        /**
         * Hide index column
         */
        obj.hideIndex = function() {
            obj.table.classList.add('jexcel_hidden_index');
        }
    
        /**
         * Update all related cells in the chain
         */
        var chainLoopProtection = [];
    
        obj.updateFormulaChain = function(x, y, records) {
            var cellId = jexcel.getColumnNameFromId([x, y]);
            if (obj.formula[cellId] && obj.formula[cellId].length > 0) {
                if (chainLoopProtection[cellId]) {
                    obj.records[y][x].innerHTML = '#ERROR';
                    obj.formula[cellId] = '';
                } else {
                    // Protection
                    chainLoopProtection[cellId] = true;
    
                    for (var i = 0; i < obj.formula[cellId].length; i++) {
                        var cell = jexcel.getIdFromColumnName(obj.formula[cellId][i], true);
                        // Update cell
                        var value = ''+obj.options.data[cell[1]][cell[0]];
                        if (value.substr(0,1) == '=') {
                            records.push(obj.updateCell(cell[0], cell[1], value, true));
                        } else {
                            // No longer a formula, remove from the chain
                            Object.keys(obj.formula)[i] = null;
                        }
                        obj.updateFormulaChain(cell[0], cell[1], records);
                    }
                }
            }
    
            chainLoopProtection = [];
        }
    
        /**
         * Update formulas
         */
        obj.updateFormulas = function(referencesToUpdate) {
            // Update formulas
            for (var j = 0; j < obj.options.data.length; j++) {
                for (var i = 0; i < obj.options.data[0].length; i++) {
                    var value = '' + obj.options.data[j][i];
                    // Is formula
                    if (value.substr(0,1) == '=') {
                        // Replace tokens
                        var newFormula = obj.updateFormula(value, referencesToUpdate);
                        if (newFormula != value) {
                            obj.options.data[j][i] = newFormula;
                        }
                    }
                }
            }
    
            // Update formula chain
            var formula = [];
            var keys = Object.keys(obj.formula);
            for (var j = 0; j < keys.length; j++) {
                // Current key and values
                var key = keys[j];
                var value = obj.formula[key];
                // Update key
                if (referencesToUpdate[key]) {
                    key = referencesToUpdate[key];
                }
                // Update values
                formula[key] = [];
                for (var i = 0; i < value.length; i++) {
                    var letter = value[i];
                    if (referencesToUpdate[letter]) {
                        letter = referencesToUpdate[letter];
                    }
                    formula[key].push(letter);
                }
            }
            obj.formula = formula;
        }
    
        /**
         * Update formula
         */
        obj.updateFormula = function(formula, referencesToUpdate) {
            var testLetter = /[A-Z]/;
            var testNumber = /[0-9]/;
    
            var newFormula = '';
            var letter = null;
            var number = null;
            var token = '';
    
            for (var index = 0; index < formula.length; index++) {
                if (testLetter.exec(formula[index])) {
                    letter = 1;
                    number = 0;
                    token += formula[index];
                } else if (testNumber.exec(formula[index])) {
                    number = letter ? 1 : 0;
                    token += formula[index];
                } else {
                    if (letter && number) {
                        token = referencesToUpdate[token] ? referencesToUpdate[token] : token;
                    }
                    newFormula += token;
                    newFormula += formula[index];
                    letter = 0;
                    number = 0;
                    token = '';
                }
            }
    
            if (token) {
                if (letter && number) {
                    token = referencesToUpdate[token] ? referencesToUpdate[token] : token;
                }
                newFormula += token;
            }
    
            return newFormula;
        }
    
        /**
         * Secure formula
         */
        var secureFormula = function(oldValue) {
            var newValue = '';
            var inside = 0;

            for (var i = 0; i < oldValue.length; i++) {
                if (oldValue[i] == '"') {
                    if (inside == 0) {
                        inside = 1;
                    } else {
                        inside = 0;
                    }
                }

                if (inside == 1) {
                    newValue += oldValue[i];
                } else {
                    newValue += oldValue[i].toUpperCase();
                }
            }

            return newValue;
        }

        /**
         * Parse formulas
         */
        obj.executeFormula = function(expression, x, y) {
    
            var formulaResults = [];
            var formulaLoopProtection = [];
    
            // Execute formula with loop protection
            var execute = function(expression, x, y) {
             // Parent column identification
                var parentId = jexcel.getColumnNameFromId([x, y]);
    
                // Code protection
                if (formulaLoopProtection[parentId]) {
                    console.error('Reference loop detected');
                    return '#ERROR';
                }
    
                formulaLoopProtection[parentId] = true;
    
                // Convert range tokens
                var tokensUpdate = function(tokens) {
                    for (var index = 0; index < tokens.length; index++) {
                        var f = [];
                        var token = tokens[index].split(':');
                        var e1 = jexcel.getIdFromColumnName(token[0], true);
                        var e2 = jexcel.getIdFromColumnName(token[1], true);
    
                        if (e1[0] <= e2[0]) {
                            var x1 = e1[0];
                            var x2 = e2[0];
                        } else {
                            var x1 = e2[0];
                            var x2 = e1[0];
                        }
    
                        if (e1[1] <= e2[1]) {
                            var y1 = e1[1];
                            var y2 = e2[1];
                        } else {
                            var y1 = e2[1];
                            var y2 = e1[1];
                        }
    
                        for (var j = y1; j <= y2; j++) {
                            for (var i = x1; i <= x2; i++) {
                                f.push(jexcel.getColumnNameFromId([i, j]));
                            }
                        }
    
                        expression = expression.replace(tokens[index], f.join(','));
                    }
                }
    
                // Range with $ remove $
                expression = expression.replace(/\$?([A-Z]+)\$?([0-9]+)/g, "$1$2");

                var tokens = expression.match(/([A-Z]+[0-9]+)\:([A-Z]+[0-9]+)/g);
                if (tokens && tokens.length) {
                    tokensUpdate(tokens);
                }

                // Get tokens
                var tokens = expression.match(/([A-Z]+[0-9]+)/g);
    
                // Direct self-reference protection
                if (tokens && tokens.indexOf(parentId) > -1) {
                    console.error('Self Reference detected');
                    return '#ERROR';
                } else {
                    // Expressions to be used in the parsing
                    var formulaExpressions = {};

                    if (tokens) {
                        for (var i = 0; i < tokens.length; i++) {
                            // Keep chain
                            if (! obj.formula[tokens[i]]) {
                                obj.formula[tokens[i]] = [];
                            }
                            // Is already in the register
                            if (obj.formula[tokens[i]].indexOf(parentId) < 0) {
                                obj.formula[tokens[i]].push(parentId);
                            }
    
                            // Do not calculate again
                            if (eval('typeof(' + tokens[i] + ') == "undefined"')) {
                                // Coords
                                var position = jexcel.getIdFromColumnName(tokens[i], 1);
                                // Get value
                                if (typeof(obj.options.data[position[1]]) != 'undefined' && typeof(obj.options.data[position[1]][position[0]]) != 'undefined') {
                                    var value = obj.options.data[position[1]][position[0]];
                                } else {
                                    var value = '';
                                }
                                // Get column data
                                if ((''+value).substr(0,1) == '=') {
                                    if (formulaResults[tokens[i]]) {
                                        value = formulaResults[tokens[i]];
                                    } else {
                                        value = execute(value, position[0], position[1]);
                                        formulaResults[tokens[i]] = value;
                                    }
                                }
                                // Type!
                                if ((''+value).trim() == '') {
                                    // Null
                                    formulaExpressions[tokens[i]] = null;
                                } else {
                                    if (value == Number(value) && obj.options.autoCasting == true) {
                                        // Number
                                        formulaExpressions[tokens[i]] = Number(value);
                                    } else {
                                        // Trying any formatted number
                                        var number = obj.parseNumber(value, position[0])
                                        if (obj.options.autoCasting == true && number) {
                                            formulaExpressions[tokens[i]] = number;
                                        } else {
                                            formulaExpressions[tokens[i]] = '"' + value + '"';
                                        }
                                    }
                                }
                            }
                        }
                    }
    
                    // Convert formula to javascript
                    try {
                        var res = jexcel.formula(expression.substr(1), formulaExpressions, x, y, obj);
                    } catch (e) {
                        var res = '#ERROR';
                        console.log(e)
                    }
    
                    return res;
                }
            }
    
            return execute(expression, x, y);
        }
    
        /**
         * Trying to extract a number from a string
         */
        obj.parseNumber = function(value, columnNumber) {
            // Decimal point
            var decimal = columnNumber && obj.options.columns[columnNumber].decimal ? obj.options.columns[columnNumber].decimal : '.';
    
            // Parse both parts of the number
            var number = ('' + value);
            number = number.split(decimal);
            number[0] = number[0].match(/[+-]?[0-9]/g);
            if (number[0]) {
                number[0] = number[0].join('');
            }
            if (number[1]) {
                number[1] = number[1].match(/[0-9]*/g).join('');
            }
    
            // Is a valid number
            if (number[0] && Number(number[0]) >= 0) {
                if (! number[1]) {
                    var value = Number(number[0] + '.00');
                } else {
                    var value = Number(number[0] + '.' + number[1]);
                }
            } else {
                var value = null;
            }
    
            return value;
        }
    
        /**
         * Get row number
         */
        obj.row = function(cell) {
        }
    
        /**
         * Get col number
         */
        obj.col = function(cell) {
        }
    
        obj.up = function(shiftKey, ctrlKey) {
            if (shiftKey) {
                if (obj.selectedCell[3] > 0) {
                    obj.up.visible(1, ctrlKey ? 0 : 1)
                }
            } else {
                if (obj.selectedCell[1] > 0) {
                    obj.up.visible(0, ctrlKey ? 0 : 1)
                }
                obj.selectedCell[2] = obj.selectedCell[0];
                obj.selectedCell[3] = obj.selectedCell[1];
            }
    
            // Update selection
            obj.updateSelectionFromCoords(obj.selectedCell[0], obj.selectedCell[1], obj.selectedCell[2], obj.selectedCell[3]);
    
            // Change page
            if (obj.options.lazyLoading == true) {
                if (obj.selectedCell[1] == 0 || obj.selectedCell[3] == 0) {
                    obj.loadPage(0);
                    obj.updateSelectionFromCoords(obj.selectedCell[0], obj.selectedCell[1], obj.selectedCell[2], obj.selectedCell[3]);
                } else {
                    if (obj.loadValidation()) {
                        obj.updateSelectionFromCoords(obj.selectedCell[0], obj.selectedCell[1], obj.selectedCell[2], obj.selectedCell[3]);
                    } else {
                        var item = parseInt(obj.tbody.firstChild.getAttribute('data-y'));
                        if (obj.selectedCell[1] - item < 30) {
                            obj.loadUp();
                            obj.updateSelectionFromCoords(obj.selectedCell[0], obj.selectedCell[1], obj.selectedCell[2], obj.selectedCell[3]);
                        }
                    }
                }
            } else if (obj.options.pagination > 0) {
                var pageNumber = obj.whichPage(obj.selectedCell[3]);
                if (pageNumber != obj.pageNumber) {
                    obj.page(pageNumber);
                }
            }
    
            obj.updateScroll(1);
        }
    
        obj.up.visible = function(group, direction) {
            if (group == 0) {
                var x = parseInt(obj.selectedCell[0]);
                var y = parseInt(obj.selectedCell[1]);
            } else {
                var x = parseInt(obj.selectedCell[2]);
                var y = parseInt(obj.selectedCell[3]);
            }
    
            if (direction == 0) {
                for (var j = 0; j < y; j++) {
                    if (obj.records[j][x].style.display != 'none' && obj.rows[j].style.display != 'none') {
                        y = j;
                        break;
                    }
                }
            } else {
                y = obj.up.get(x, y);
            }
    
            if (group == 0) {
                obj.selectedCell[0] = x;
                obj.selectedCell[1] = y;
            } else {
                obj.selectedCell[2] = x;
                obj.selectedCell[3] = y;
            }
        }
    
        obj.up.get = function(x, y) {
            var x = parseInt(x);
            var y = parseInt(y);
            for (var j = (y - 1); j >= 0; j--) {
                if (obj.records[j][x].style.display != 'none' && obj.rows[j].style.display != 'none') {
                    if (obj.records[j][x].getAttribute('data-merged')) {
                        if (obj.records[j][x] == obj.records[y][x]) {
                            continue;
                        }
                    }
                    y = j;
                    break;
                }
            }
    
            return y;
        }
    
        obj.down = function(shiftKey, ctrlKey) {
            if (shiftKey) {
                if (obj.selectedCell[3] < obj.records.length - 1) {
                    obj.down.visible(1, ctrlKey ? 0 : 1)
                }
            } else {
                if (obj.selectedCell[1] < obj.records.length - 1) {
                    obj.down.visible(0, ctrlKey ? 0 : 1)
                }
                obj.selectedCell[2] = obj.selectedCell[0];
                obj.selectedCell[3] = obj.selectedCell[1];
            }
    
            obj.updateSelectionFromCoords(obj.selectedCell[0], obj.selectedCell[1], obj.selectedCell[2], obj.selectedCell[3]);
    
            // Change page
            if (obj.options.lazyLoading == true) {
                if ((obj.selectedCell[1] == obj.records.length - 1 || obj.selectedCell[3] == obj.records.length - 1)) {
                    obj.loadPage(-1);
                    obj.updateSelectionFromCoords(obj.selectedCell[0], obj.selectedCell[1], obj.selectedCell[2], obj.selectedCell[3]);
                } else {
                    if (obj.loadValidation()) {
                        obj.updateSelectionFromCoords(obj.selectedCell[0], obj.selectedCell[1], obj.selectedCell[2], obj.selectedCell[3]);
                    } else {
                        var item = parseInt(obj.tbody.lastChild.getAttribute('data-y'));
                        if (item - obj.selectedCell[3] < 30) {
                            obj.loadDown();
                            obj.updateSelectionFromCoords(obj.selectedCell[0], obj.selectedCell[1], obj.selectedCell[2], obj.selectedCell[3]);
                        }
                    }
                }
            } else if (obj.options.pagination > 0) {
                var pageNumber = obj.whichPage(obj.selectedCell[3]);
                if (pageNumber != obj.pageNumber) {
                    obj.page(pageNumber);
                }
            }
    
            obj.updateScroll(3);
        }
    
        obj.down.visible = function(group, direction) {
            if (group == 0) {
                var x = parseInt(obj.selectedCell[0]);
                var y = parseInt(obj.selectedCell[1]);
            } else {
                var x = parseInt(obj.selectedCell[2]);
                var y = parseInt(obj.selectedCell[3]);
            }
    
            if (direction == 0) {
                for (var j = obj.rows.length - 1; j > y; j--) {
                    if (obj.records[j][x].style.display != 'none' && obj.rows[j].style.display != 'none') {
                        y = j;
                        break;
                    }
                }
            } else {
                y = obj.down.get(x, y);
            }
    
            if (group == 0) {
                obj.selectedCell[0] = x;
                obj.selectedCell[1] = y;
            } else {
                obj.selectedCell[2] = x;
                obj.selectedCell[3] = y;
            }
        }
    
        obj.down.get = function(x, y) {
            var x = parseInt(x);
            var y = parseInt(y);
            for (var j = (y + 1); j < obj.rows.length; j++) {
                if (obj.records[j][x].style.display != 'none' && obj.rows[j].style.display != 'none') {
                    if (obj.records[j][x].getAttribute('data-merged')) {
                        if (obj.records[j][x] == obj.records[y][x]) {
                            continue;
                        }
                    }
                    y = j;
                    break;
                }
            }
    
            return y;
        }
    
        obj.right = function(shiftKey, ctrlKey) {
            if (shiftKey) {
                if (obj.selectedCell[2] < obj.headers.length - 1) {
                    obj.right.visible(1, ctrlKey ? 0 : 1)
                }
            } else {
                if (obj.selectedCell[0] < obj.headers.length - 1) {
                    obj.right.visible(0, ctrlKey ? 0 : 1)
                }
                obj.selectedCell[2] = obj.selectedCell[0];
                obj.selectedCell[3] = obj.selectedCell[1];
            }
    
            obj.updateSelectionFromCoords(obj.selectedCell[0], obj.selectedCell[1], obj.selectedCell[2], obj.selectedCell[3]);
            obj.updateScroll(2);
        }
    
        obj.right.visible = function(group, direction) {
            if (group == 0) {
                var x = parseInt(obj.selectedCell[0]);
                var y = parseInt(obj.selectedCell[1]);
            } else {
                var x = parseInt(obj.selectedCell[2]);
                var y = parseInt(obj.selectedCell[3]);
            }
    
            if (direction == 0) {
                for (var i = obj.headers.length - 1; i > x; i--) {
                    if (obj.records[y][i].style.display != 'none') {
                        x = i;
                        break;
                    }
                }
            } else {
                x = obj.right.get(x, y);
            }
    
            if (group == 0) {
                obj.selectedCell[0] = x;
                obj.selectedCell[1] = y;
            } else {
                obj.selectedCell[2] = x;
                obj.selectedCell[3] = y;
            }
        }
    
        obj.right.get = function(x, y) {
            var x = parseInt(x);
            var y = parseInt(y);
    
            for (var i = (x + 1); i < obj.headers.length; i++) {
                if (obj.records[y][i].style.display != 'none') {
                    if (obj.records[y][i].getAttribute('data-merged')) {
                        if (obj.records[y][i] == obj.records[y][x]) {
                            continue;
                        }
                    }
                    x = i;
                    break;
                }
            }
    
            return x;
        }
    
        obj.left = function(shiftKey, ctrlKey) {
            if (shiftKey) {
                if (obj.selectedCell[2] > 0) {
                    obj.left.visible(1, ctrlKey ? 0 : 1)
                }
            } else {
                if (obj.selectedCell[0] > 0) {
                    obj.left.visible(0, ctrlKey ? 0 : 1)
                }
                obj.selectedCell[2] = obj.selectedCell[0];
                obj.selectedCell[3] = obj.selectedCell[1];
            }
    
            obj.updateSelectionFromCoords(obj.selectedCell[0], obj.selectedCell[1], obj.selectedCell[2], obj.selectedCell[3]);
            obj.updateScroll(0);
        }
    
        obj.left.visible = function(group, direction) {
            if (group == 0) {
                var x = parseInt(obj.selectedCell[0]);
                var y = parseInt(obj.selectedCell[1]);
            } else {
                var x = parseInt(obj.selectedCell[2]);
                var y = parseInt(obj.selectedCell[3]);
            }
    
            if (direction == 0) {
                for (var i = 0; i < x; i++) {
                    if (obj.records[y][i].style.display != 'none') {
                        x = i;
                        break;
                    }
                }
            } else {
                x = obj.left.get(x, y);
            }
    
            if (group == 0) {
                obj.selectedCell[0] = x;
                obj.selectedCell[1] = y;
            } else {
                obj.selectedCell[2] = x;
                obj.selectedCell[3] = y;
            }
        }
    
        obj.left.get = function(x, y) {
            var x = parseInt(x);
            var y = parseInt(y);
            for (var i = (x - 1); i >= 0; i--) {
                if (obj.records[y][i].style.display != 'none') {
                    if (obj.records[y][i].getAttribute('data-merged')) {
                        if (obj.records[y][i] == obj.records[y][x]) {
                            continue;
                        }
                    }
                    x = i;
                    break;
                }
            }
    
            return x;
        }
    
        obj.first = function(shiftKey, ctrlKey) {
            if (shiftKey) {
                if (ctrlKey) {
                    obj.selectedCell[3] = 0;
                } else {
                    obj.left.visible(1, 0);
                }
            } else {
                if (ctrlKey) {
                    obj.selectedCell[1] = 0;
                } else {
                    obj.left.visible(0, 0);
                }
                obj.selectedCell[2] = obj.selectedCell[0];
                obj.selectedCell[3] = obj.selectedCell[1];
            }
    
            // Change page
            if (obj.options.lazyLoading == true && (obj.selectedCell[1] == 0 || obj.selectedCell[3] == 0)) {
                obj.loadPage(0);
            } else if (obj.options.pagination > 0) {
                var pageNumber = obj.whichPage(obj.selectedCell[3]);
                if (pageNumber != obj.pageNumber) {
                    obj.page(pageNumber);
                }
            }
    
            obj.updateSelectionFromCoords(obj.selectedCell[0], obj.selectedCell[1], obj.selectedCell[2], obj.selectedCell[3]);
            obj.updateScroll(1);
        }
    
        obj.last = function(shiftKey, ctrlKey) {
            if (shiftKey) {
                if (ctrlKey) {
                    obj.selectedCell[3] = obj.records.length - 1;
                } else {
                    obj.right.visible(1, 0);
                }
            } else {
                if (ctrlKey) {
                    obj.selectedCell[1] = obj.records.length - 1;
                } else {
                    obj.right.visible(0, 0);
                }
                obj.selectedCell[2] = obj.selectedCell[0];
                obj.selectedCell[3] = obj.selectedCell[1];
            }
    
            // Change page
            if (obj.options.lazyLoading == true && (obj.selectedCell[1] == obj.records.length - 1 || obj.selectedCell[3] == obj.records.length - 1)) {
                obj.loadPage(-1);
            } else if (obj.options.pagination > 0) {
                var pageNumber = obj.whichPage(obj.selectedCell[3]);
                if (pageNumber != obj.pageNumber) {
                    obj.page(pageNumber);
                }
            }
    
            obj.updateSelectionFromCoords(obj.selectedCell[0], obj.selectedCell[1], obj.selectedCell[2], obj.selectedCell[3]);
            obj.updateScroll(3);
        }
    
        obj.selectAll = function() {
            if (! obj.selectedCell) {
                obj.selectedCell = [];
            }
    
            obj.selectedCell[0] = 0;
            obj.selectedCell[1] = 0;
            obj.selectedCell[2] = obj.headers.length - 1;
            obj.selectedCell[3] = obj.records.length - 1;
    
            obj.updateSelectionFromCoords(obj.selectedCell[0], obj.selectedCell[1], obj.selectedCell[2], obj.selectedCell[3]);
        }
    
        /**
         * Go to a page in a lazyLoading
         */
        obj.loadPage = function(pageNumber) {
            // Search
            if (obj.options.search == true && obj.results) {
                var results = obj.results;
            } else {
                var results = obj.rows;
            }
    
            // Per page
            var quantityPerPage = 100;
    
            // pageNumber
            if (pageNumber == null || pageNumber == -1) {
                // Last page
                pageNumber = Math.ceil(results.length / quantityPerPage) - 1; 
            }
    
            var startRow = (pageNumber * quantityPerPage);
            var finalRow = (pageNumber * quantityPerPage) + quantityPerPage;
            if (finalRow > results.length) {
                finalRow = results.length;
            }
            startRow = finalRow - 100;
            if (startRow < 0) {
                startRow = 0;
            }
    
            // Appeding items
            for (var j = startRow; j < finalRow; j++) {
                if (obj.options.search == true && obj.results) {
                    obj.tbody.appendChild(obj.rows[results[j]]);
                } else {
                    obj.tbody.appendChild(obj.rows[j]);
                }
    
                if (obj.tbody.children.length > quantityPerPage) {
                    obj.tbody.removeChild(obj.tbody.firstChild);
                }
            }
        }
    
        obj.loadUp = function() {
            // Search
            if (obj.options.search == true && obj.results) {
                var results = obj.results;
            } else {
                var results = obj.rows;
            }
            var test = 0;
            if (results.length > 100) {
                // Get the first element in the page
                var item = parseInt(obj.tbody.firstChild.getAttribute('data-y'));
                if (obj.options.search == true && obj.results) {
                    item = results.indexOf(item);
                }
                if (item > 0) {
                    for (var j = 0; j < 30; j++) {
                        item = item - 1;
                        if (item > -1) {
                            if (obj.options.search == true && obj.results) {
                                obj.tbody.insertBefore(obj.rows[results[item]], obj.tbody.firstChild);
                            } else {
                                obj.tbody.insertBefore(obj.rows[item], obj.tbody.firstChild);
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
        }
    
        obj.loadDown = function() {
            // Search
            if (obj.options.search == true && obj.results) {
                var results = obj.results;
            } else {
                var results = obj.rows;
            }
            var test = 0;
            if (results.length > 100) {
                // Get the last element in the page
                var item = parseInt(obj.tbody.lastChild.getAttribute('data-y'));
                if (obj.options.search == true && obj.results) {
                    item = results.indexOf(item);
                }
                if (item < obj.rows.length - 1) {
                    for (var j = 0; j <= 30; j++) {
                        if (item < results.length) {
                            if (obj.options.search == true && obj.results) {
                                obj.tbody.appendChild(obj.rows[results[item]]);
                            } else {
                                obj.tbody.appendChild(obj.rows[item]);
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
        }
    
        obj.loadValidation = function() {
            if (obj.selectedCell) {
                var currentPage = parseInt(obj.tbody.firstChild.getAttribute('data-y')) / 100;
                var selectedPage = parseInt(obj.selectedCell[3] / 100);
                var totalPages = parseInt(obj.rows.length / 100);
    
                if (currentPage != selectedPage && selectedPage <= totalPages) {
                    if (! Array.prototype.indexOf.call(obj.tbody.children, obj.rows[obj.selectedCell[3]])) {
                        obj.loadPage(selectedPage);
                        return true;
                    }
                }
            }
    
            return false;
        }
    
        /**
         * Reset search
         */
        obj.resetSearch = function() {
            obj.searchInput.value = '';
            obj.search('');
            obj.results = null;
        }

        /**
         * Search
         */
        obj.search = function(query) {
            // Query
            if (query) {
                var query = query.toLowerCase();
            }
    
            // Reset any filter
            if (obj.options.filters) {
                obj.resetFilters();
            }

            // Reset selection
            obj.resetSelection();
    
            // Total of results
            obj.pageNumber = 0;
            obj.results = [];
    
            if (query) {
                // Search filter
                var search = function(item, query, index) {
                    for (var i = 0; i < item.length; i++) {
                        if ((''+item[i]).toLowerCase().search(query) >= 0 ||
                            (''+obj.records[index][i].innerHTML).toLowerCase().search(query) >= 0) {
                            return true;
                        }
                    }
                    return false;
                }
    
                // Result
                var addToResult = function(k) {
                    if (obj.results.indexOf(k) == -1) {
                        obj.results.push(k);
                    }
                }
    
                // Filter
                var data = obj.options.data.filter(function(v, k) {
                    if (search(v, query, k)) {
                        // Merged rows found
                        var rows = obj.isRowMerged(k);
                        if (rows.length) {
                            for (var i = 0; i < rows.length; i++) {
                                var row = jexcel.getIdFromColumnName(rows[i], true);
                                for (var j = 0; j < obj.options.mergeCells[rows[i]][1]; j++) {
                                    addToResult(row[1]+j);
                                }
                            }
                        } else {
                            // Normal row found
                            addToResult(k);
                        }
                        return true;
                    } else {
                        return false;
                    }
                });
            } else {
                obj.results = null;
            }

            return obj.updateResult();
        }
    
        obj.updateResult = function() {
            var total = 0;
            var index = 0;
    
            // Page 1
            if (obj.options.lazyLoading == true) {
                total = 100;
            } else if (obj.options.pagination > 0) {
                total = obj.options.pagination;
            } else {
                if (obj.results) {
                    total = obj.results.length;
                } else {
                    total = obj.rows.length;
                }
            }
    
            // Reset current nodes
            while (obj.tbody.firstChild) {
                obj.tbody.removeChild(obj.tbody.firstChild);
            }
    
            // Hide all records from the table
            for (var j = 0; j < obj.rows.length; j++) {
                if (! obj.results || obj.results.indexOf(j) > -1) {
                    if (index < total) {
                        obj.tbody.appendChild(obj.rows[j]);
                        index++;
                    }
                    obj.rows[j].style.display = '';
                } else {
                    obj.rows[j].style.display = 'none';
                }
            }
    
            // Update pagination
            if (obj.options.pagination > 0) {
                obj.updatePagination();
            }

            obj.updateCornerPosition();
    
            return total;
        }

        /**
         * Which page the cell is
         */
        obj.whichPage = function(cell) {
            // Search
            if (obj.options.search == true && obj.results) {
                cell = obj.results.indexOf(cell);
            }
    
            return (Math.ceil((parseInt(cell) + 1) / parseInt(obj.options.pagination))) - 1;
        }
    
        /**
         * Go to page
         */
        obj.page = function(pageNumber) {
            var oldPage = obj.pageNumber;

            // Search
            if (obj.options.search == true && obj.results) {
                var results = obj.results;
            } else {
                var results = obj.rows;
            }
    
            // Per page
            var quantityPerPage = parseInt(obj.options.pagination);
    
            // pageNumber
            if (pageNumber == null || pageNumber == -1) {
                // Last page
                pageNumber = Math.ceil(results.length / quantityPerPage) - 1;
            }
    
            // Page number
            obj.pageNumber = pageNumber;
    
            var startRow = (pageNumber * quantityPerPage);
            var finalRow = (pageNumber * quantityPerPage) + quantityPerPage;
            if (finalRow > results.length) {
                finalRow = results.length;
            }
            if (startRow < 0) {
                startRow = 0;
            }
    
            // Reset container
            while (obj.tbody.firstChild) {
                obj.tbody.removeChild(obj.tbody.firstChild);
            }
    
            // Appeding items
            for (var j = startRow; j < finalRow; j++) {
                if (obj.options.search == true && obj.results) {
                    obj.tbody.appendChild(obj.rows[results[j]]);
                } else {
                    obj.tbody.appendChild(obj.rows[j]);
                }
            }
    
            if (obj.options.pagination > 0) {
                obj.updatePagination();
            }
    
            // Update corner position
            obj.updateCornerPosition();

            // Events
            obj.dispatch('onchangepage', el, pageNumber, oldPage);
        }
    
        /**
         * Update the pagination
         */
        obj.updatePagination = function() {
            // Reset container
            obj.pagination.children[0].innerHTML = '';
            obj.pagination.children[1].innerHTML = '';
    
            // Start pagination
            if (obj.options.pagination) {
                // Searchable
                if (obj.options.search == true && obj.results) {
                    var results = obj.results.length;
                } else {
                    var results = obj.rows.length;
                }
    
                if (! results) {
                    // No records found
                    obj.pagination.children[0].innerHTML = obj.options.text.noRecordsFound;
                } else {
                    // Pagination container
                    var quantyOfPages = Math.ceil(results / obj.options.pagination);
    
                    if (obj.pageNumber < 6) {
                        var startNumber = 1;
                        var finalNumber = quantyOfPages < 10 ? quantyOfPages : 10;
                    } else if (quantyOfPages - obj.pageNumber < 5) {
                        var startNumber = quantyOfPages - 9;
                        var finalNumber = quantyOfPages;
                        if (startNumber < 1) {
                            startNumber = 1;
                        }
                    } else {
                        var startNumber = obj.pageNumber - 4;
                        var finalNumber = obj.pageNumber + 5;
                    }
    
                    // First
                    if (startNumber > 1) {
                        var paginationItem = document.createElement('div');
                        paginationItem.className = 'jexcel_page';
                        paginationItem.innerHTML = '<';
                        paginationItem.title = 1;
                        obj.pagination.children[1].appendChild(paginationItem);
                    }
    
                    // Get page links
                    for (var i = startNumber; i <= finalNumber; i++) {
                        var paginationItem = document.createElement('div');
                        paginationItem.className = 'jexcel_page';
                        paginationItem.innerHTML = i;
                        obj.pagination.children[1].appendChild(paginationItem);
    
                        if (obj.pageNumber == (i-1)) {
                            paginationItem.classList.add('jexcel_page_selected');
                        }
                    }
    
                    // Last
                    if (finalNumber < quantyOfPages) {
                        var paginationItem = document.createElement('div');
                        paginationItem.className = 'jexcel_page';
                        paginationItem.innerHTML = '>';
                        paginationItem.title = quantyOfPages;
                        obj.pagination.children[1].appendChild(paginationItem);
                    }
    
                    // Text
                    var format = function(format) {
                        var args = Array.prototype.slice.call(arguments, 1);
                        return format.replace(/{(\d+)}/g, function(match, number) {
                          return typeof args[number] != 'undefined'
                            ? args[number]
                            : match
                          ;
                        });
                    };
    
                    obj.pagination.children[0].innerHTML = format(obj.options.text.showingPage, obj.pageNumber + 1, quantyOfPages)
                }
            }
        }
    
        /**
         * Download CSV table
         * 
         * @return null
         */
        obj.download = function(includeHeaders) {
            if (obj.options.allowExport == false) {
                console.error('Export not allowed');
            } else {
                // Data
                var data = '';

                // Get data
                data += obj.copy(false, obj.options.csvDelimiter, true, includeHeaders, true);

                // Download element
                var blob = new Blob(["\uFEFF"+data], {type: 'text/csv;charset=utf-8;'});

                // IE Compatibility
                if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                    window.navigator.msSaveOrOpenBlob(blob, obj.options.csvFileName + '.csv');
                } else {
                    // Download element
                    var pom = document.createElement('a');
                    var url = URL.createObjectURL(blob);
                    pom.href = url;
                    pom.setAttribute('download', obj.options.csvFileName + '.csv');
                    document.body.appendChild(pom);
                    pom.click();
                    pom.parentNode.removeChild(pom);
                }
            }
        }
    
        /**
         * Initializes a new history record for undo/redo
         * 
         * @return null
         */
        obj.setHistory = function(changes) {
            if (obj.ignoreHistory != true) {
                // Increment and get the current history index
                var index = ++obj.historyIndex;
    
                // Slice the array to discard undone changes
                obj.history = (obj.history = obj.history.slice(0, index + 1));
    
                // Keep history
                obj.history[index] = changes;
            }
        }
    
        /**
         * Copy method
         * 
         * @param bool highlighted - Get only highlighted cells
         * @param delimiter - \t default to keep compatibility with excel
         * @return string value
         */
        obj.copy = function(highlighted, delimiter, returnData, includeHeaders, download) {
            if (! delimiter) {
                delimiter = "\t";
            }
    
            var div = new RegExp(delimiter, 'ig');

            // Controls
            var header = [];
            var col = [];
            var colLabel = [];
            var row = [];
            var rowLabel = [];
            var x = obj.options.data[0].length
            var y = obj.options.data.length
            var tmp = '';
            var copyHeader = false;
            var headers = '';
            var nestedHeaders = '';
            var numOfCols = 0;
            var numOfRows = 0;

            if ((download && obj.options.includeHeadersOnDownload == true) ||
                (! download && obj.options.includeHeadersOnCopy == true) ||
                (includeHeaders)) {
                // Nested headers
                if (obj.options.nestedHeaders && obj.options.nestedHeaders.length > 0) {
                    // Flexible way to handle nestedheaders
                    if (! (obj.options.nestedHeaders[0] && obj.options.nestedHeaders[0][0])) {
                        tmp = [obj.options.nestedHeaders];
                    } else {
                        tmp = obj.options.nestedHeaders;
                    }

                    for (var j = 0; j < tmp.length; j++) {
                        var nested = [];
                        for (var i = 0; i < tmp[j].length; i++) {
                            var colspan = parseInt(tmp[j][i].colspan);
                            nested.push(tmp[j][i].title);
                            for (var c = 0; c < colspan - 1; c++) {
                                nested.push('');
                            }
                        }
                        nestedHeaders += nested.join(delimiter) + "\r\n";
                    }
                }

                copyHeader = true;
            }

            // Reset container
            obj.style = [];
    
            // Go through the columns to get the data
            for (var j = 0; j < y; j++) {
                col = [];
                colLabel = [];
    
                for (var i = 0; i < x; i++) {
                    // If cell is highlighted
                    if (! highlighted || obj.records[j][i].classList.contains('highlight')) {
                        if (copyHeader == true) {
                            header.push(obj.headers[i].innerText);
                        }
                        // Values
                        var value = obj.options.data[j][i];
                        if (value.match && (value.match(div) || value.match(/,/g) || value.match(/\n/) || value.match(/\"/))) {
                            value = value.replace(new RegExp('"', 'g'), '""');
                            value = '"' + value + '"';
                        }
                        col.push(value);

                        // Labels
                        if (obj.options.columns[i].type == 'checkbox' || obj.options.columns[i].type == 'radio') {
                            var label = value;
                        } else {
                            if (obj.options.stripHTMLOnCopy == true) {
                                var label = obj.records[j][i].innerText;
                            } else {
                                var label = obj.records[j][i].innerHTML;
                            }
                            if (label.match && (label.match(div) || label.match(/,/g) || label.match(/\n/) || label.match(/\"/))) {
                                // Scape double quotes
                                label = label.replace(new RegExp('"', 'g'), '""');
                                label = '"' + label + '"';
                            }
                        }
                        colLabel.push(label);
    
                        // Get style
                        tmp = obj.records[j][i].getAttribute('style');
                        tmp = tmp.replace('display: none;', '');
                        obj.style.push(tmp ? tmp : '');
                    }
                }
    
                if (col.length) {
                    if (copyHeader) {
                        numOfCols = col.length;
                        row.push(header.join(delimiter));
                    }
                    row.push(col.join(delimiter));
                }
                if (colLabel.length) {
                    numOfRows++;
                    if (copyHeader) {
                        rowLabel.push(header.join(delimiter));
                        copyHeader = false;
                    }
                    rowLabel.push(colLabel.join(delimiter));
                }
            }

            if (x == numOfCols &&  y == numOfRows) {
                headers = nestedHeaders;
            }

            // Final string
            var str = headers + row.join("\r\n");
            var strLabel = headers + rowLabel.join("\r\n");

            // Create a hidden textarea to copy the values
            if (! returnData) {
                if (obj.options.copyCompatibility == true) {
                    obj.textarea.value = strLabel;
                } else {
                    obj.textarea.value = str;
                }
                obj.textarea.select();
                document.execCommand("copy");
            }
    
            // Keep data
            if (obj.options.copyCompatibility == true) {
                obj.data = strLabel;
            } else {
                obj.data = str;
            }
            // Keep non visible information
            obj.hashString = obj.hash(obj.data);
    
            // Any exiting border should go
            if (! returnData) {
                obj.removeCopyingSelection();
    
                // Border
                if (obj.highlighted) {
                    for (var i = 0; i < obj.highlighted.length; i++) {
                        obj.highlighted[i].classList.add('copying');
                        if (obj.highlighted[i].classList.contains('highlight-left')) {
                            obj.highlighted[i].classList.add('copying-left');
                        }
                        if (obj.highlighted[i].classList.contains('highlight-right')) {
                            obj.highlighted[i].classList.add('copying-right');
                        }
                        if (obj.highlighted[i].classList.contains('highlight-top')) {
                            obj.highlighted[i].classList.add('copying-top');
                        }
                        if (obj.highlighted[i].classList.contains('highlight-bottom')) {
                            obj.highlighted[i].classList.add('copying-bottom');
                        }
                    }
                }

                // Paste event
                obj.dispatch('oncopy', el, obj.options.copyCompatibility == true ? rowLabel : row, obj.hashString);
            }

            return obj.data;
        }
    
        /**
         * Jspreadsheet paste method
         * 
         * @param integer row number
         * @return string value
         */
        obj.paste = function(x, y, data) {
            // Paste filter
            var ret = obj.dispatch('onbeforepaste', el, data, x, y);

            if (ret === false) {
                return false;
            } else if (ret) {
                var data = ret;
            }
    
            // Controls
            var hash = obj.hash(data);
            var style = (hash == obj.hashString) ? obj.style : null;
    
            // Depending on the behavior
            if (obj.options.copyCompatibility == true && hash == obj.hashString) {
                var data = obj.data;
            }
    
            // Split new line
            var data = obj.parseCSV(data, "\t");
    
            if (x != null && y != null && data) {
                // Records
                var i = 0;
                var j = 0;
                var records = [];
                var newStyle = {};
                var oldStyle = {};
                var styleIndex = 0;
    
                // Index
                var colIndex = parseInt(x);
                var rowIndex = parseInt(y);
                var row = null;
    
                // Go through the columns to get the data
                while (row = data[j]) {
                    i = 0;
                    colIndex = parseInt(x);
    
                    while (row[i] != null) {
                        // Update and keep history
                        var record = obj.updateCell(colIndex, rowIndex, row[i]);
                        // Keep history
                        records.push(record);
                        // Update all formulas in the chain
                        obj.updateFormulaChain(colIndex, rowIndex, records);
                        // Style
                        if (style && style[styleIndex]) {
                            var columnName = jexcel.getColumnNameFromId([colIndex, rowIndex]);
                            newStyle[columnName] = style[styleIndex];
                            oldStyle[columnName] = obj.getStyle(columnName);
                            obj.records[rowIndex][colIndex].setAttribute('style', style[styleIndex]);
                            styleIndex++
                        }
                        i++;
                        if (row[i] != null) {
                            if (colIndex >= obj.headers.length - 1) {
                                // If the pasted column is out of range, create it if possible
                                if (obj.options.allowInsertColumn == true) {
                                    obj.insertColumn();
                                    // Otherwise skip the pasted data that overflows
                                } else {
                                    break;
                                }
                            }
                            colIndex = obj.right.get(colIndex, rowIndex);
                        }
                    }
    
                    j++;
                    if (data[j]) {
                        if (rowIndex >= obj.rows.length-1) {
                            // If the pasted row is out of range, create it if possible
                            if (obj.options.allowInsertRow == true) {
                                obj.insertRow();
                                // Otherwise skip the pasted data that overflows
                            } else {
                                break;
                            }
                        }
                        rowIndex = obj.down.get(x, rowIndex);
                    }
                }
    
                // Select the new cells
                obj.updateSelectionFromCoords(x, y, colIndex, rowIndex);
    
                // Update history
                obj.setHistory({
                    action:'setValue',
                    records:records,
                    selection:obj.selectedCell,
                    newStyle:newStyle,
                    oldStyle:oldStyle,
                });
    
                // Update table
                obj.updateTable();
    
                // Paste event
                obj.dispatch('onpaste', el, data);
    
                // On after changes
                obj.onafterchanges(el, records);
            }

            obj.removeCopyingSelection();
        }

        /**
         * Remove copying border
         */
        obj.removeCopyingSelection = function() {
            var copying = document.querySelectorAll('.jexcel .copying');
            for (var i = 0; i < copying.length; i++) {
                copying[i].classList.remove('copying');
                copying[i].classList.remove('copying-left');
                copying[i].classList.remove('copying-right');
                copying[i].classList.remove('copying-top');
                copying[i].classList.remove('copying-bottom');
            }
        }

        /**
         * Process row
         */
        obj.historyProcessRow = function(type, historyRecord) {
            var rowIndex = (! historyRecord.insertBefore) ? historyRecord.rowNumber + 1 : +historyRecord.rowNumber;
    
            if (obj.options.search == true) {
                if (obj.results && obj.results.length != obj.rows.length) {
                    obj.resetSearch();
                }
            }
    
            // Remove row
            if (type == 1) {
                var numOfRows = historyRecord.numOfRows;
                // Remove nodes
                for (var j = rowIndex; j < (numOfRows + rowIndex); j++) {
                    obj.rows[j].parentNode.removeChild(obj.rows[j]);
                }
                // Remove references
                obj.records.splice(rowIndex, numOfRows);
                obj.options.data.splice(rowIndex, numOfRows);
                obj.rows.splice(rowIndex, numOfRows);
    
                obj.conditionalSelectionUpdate(1, rowIndex, (numOfRows + rowIndex) - 1);
            } else {
                // Insert data
                obj.records = jexcel.injectArray(obj.records, rowIndex, historyRecord.rowRecords);
                obj.options.data = jexcel.injectArray(obj.options.data, rowIndex, historyRecord.rowData);
                obj.rows = jexcel.injectArray(obj.rows, rowIndex, historyRecord.rowNode);
                // Insert nodes
                var index = 0
                for (var j = rowIndex; j < (historyRecord.numOfRows + rowIndex); j++) {
                    obj.tbody.insertBefore(historyRecord.rowNode[index], obj.tbody.children[j]);
                    index++;
                }
            }
    
            // Respect pagination
            if (obj.options.pagination > 0) {
                obj.page(obj.pageNumber);
            }
    
            obj.updateTableReferences();
        }
    
        /**
         * Process column
         */
        obj.historyProcessColumn = function(type, historyRecord) {
            var columnIndex = (! historyRecord.insertBefore) ? historyRecord.columnNumber + 1 : historyRecord.columnNumber;
    
            // Remove column
            if (type == 1) {
                var numOfColumns = historyRecord.numOfColumns;
    
                obj.options.columns.splice(columnIndex, numOfColumns);
                for (var i = columnIndex; i < (numOfColumns + columnIndex); i++) {
                    obj.headers[i].parentNode.removeChild(obj.headers[i]);
                    obj.colgroup[i].parentNode.removeChild(obj.colgroup[i]);
                }
                obj.headers.splice(columnIndex, numOfColumns);
                obj.colgroup.splice(columnIndex, numOfColumns);
                for (var j = 0; j < historyRecord.data.length; j++) {
                    for (var i = columnIndex; i < (numOfColumns + columnIndex); i++) {
                        obj.records[j][i].parentNode.removeChild(obj.records[j][i]);
                    }
                    obj.records[j].splice(columnIndex, numOfColumns);
                    obj.options.data[j].splice(columnIndex, numOfColumns);
                }
                // Process footers
                if (obj.options.footers) {
                    for (var j = 0; j < obj.options.footers.length; j++) {
                        obj.options.footers[j].splice(columnIndex, numOfColumns);
                    }
                }
            } else {
                // Insert data
                obj.options.columns = jexcel.injectArray(obj.options.columns, columnIndex, historyRecord.columns);
                obj.headers = jexcel.injectArray(obj.headers, columnIndex, historyRecord.headers);
                obj.colgroup = jexcel.injectArray(obj.colgroup, columnIndex, historyRecord.colgroup);
    
                var index = 0
                for (var i = columnIndex; i < (historyRecord.numOfColumns + columnIndex); i++) {
                    obj.headerContainer.insertBefore(historyRecord.headers[index], obj.headerContainer.children[i+1]);
                    obj.colgroupContainer.insertBefore(historyRecord.colgroup[index], obj.colgroupContainer.children[i+1]);
                    index++;
                }
    
                for (var j = 0; j < historyRecord.data.length; j++) {
                    obj.options.data[j] = jexcel.injectArray(obj.options.data[j], columnIndex, historyRecord.data[j]);
                    obj.records[j] = jexcel.injectArray(obj.records[j], columnIndex, historyRecord.records[j]);
                    var index = 0
                    for (var i = columnIndex; i < (historyRecord.numOfColumns + columnIndex); i++) {
                        obj.rows[j].insertBefore(historyRecord.records[j][index], obj.rows[j].children[i+1]);
                        index++;
                    }
                }
                // Process footers
                if (obj.options.footers) {
                    for (var j = 0; j < obj.options.footers.length; j++) {
                        obj.options.footers[j] = jexcel.injectArray(obj.options.footers[j], columnIndex, historyRecord.footers[j]);
                    }
                }
            }
    
            // Adjust nested headers
            if (obj.options.nestedHeaders && obj.options.nestedHeaders.length > 0) {
                // Flexible way to handle nestedheaders
                if (obj.options.nestedHeaders[0] && obj.options.nestedHeaders[0][0]) {
                    for (var j = 0; j < obj.options.nestedHeaders.length; j++) {
                        if (type == 1) {
                            var colspan = parseInt(obj.options.nestedHeaders[j][obj.options.nestedHeaders[j].length-1].colspan) - historyRecord.numOfColumns;
                        } else {
                            var colspan = parseInt(obj.options.nestedHeaders[j][obj.options.nestedHeaders[j].length-1].colspan) + historyRecord.numOfColumns;
                        }
                        obj.options.nestedHeaders[j][obj.options.nestedHeaders[j].length-1].colspan = colspan;
                        obj.thead.children[j].children[obj.thead.children[j].children.length-1].setAttribute('colspan', colspan);
                    }
                } else {
                    if (type == 1) {
                        var colspan = parseInt(obj.options.nestedHeaders[0].colspan) - historyRecord.numOfColumns;
                    } else {
                        var colspan = parseInt(obj.options.nestedHeaders[0].colspan) + historyRecord.numOfColumns;
                    }
                    obj.options.nestedHeaders[0].colspan = colspan;
                    obj.thead.children[0].children[obj.thead.children[0].children.length-1].setAttribute('colspan', colspan);
                }
            }
    
            obj.updateTableReferences();
        }
    
        /**
         * Undo last action
         */
        obj.undo = function() {
            // Ignore events and history
            var ignoreEvents = obj.ignoreEvents ? true : false;
            var ignoreHistory = obj.ignoreHistory ? true : false;
    
            obj.ignoreEvents = true;
            obj.ignoreHistory = true;
    
            // Records
            var records = [];
    
            // Update cells
            if (obj.historyIndex >= 0) {
                // History
                var historyRecord = obj.history[obj.historyIndex--];
    
                if (historyRecord.action == 'insertRow') {
                    obj.historyProcessRow(1, historyRecord);
                } else if (historyRecord.action == 'deleteRow') {
                    obj.historyProcessRow(0, historyRecord);
                } else if (historyRecord.action == 'insertColumn') {
                    obj.historyProcessColumn(1, historyRecord);
                } else if (historyRecord.action == 'deleteColumn') {
                    obj.historyProcessColumn(0, historyRecord);
                } else if (historyRecord.action == 'moveRow') {
                    obj.moveRow(historyRecord.newValue, historyRecord.oldValue);
                } else if (historyRecord.action == 'moveColumn') {
                    obj.moveColumn(historyRecord.newValue, historyRecord.oldValue);
                } else if (historyRecord.action == 'setMerge') {
                    obj.removeMerge(historyRecord.column, historyRecord.data);
                } else if (historyRecord.action == 'setStyle') {
                    obj.setStyle(historyRecord.oldValue, null, null, 1);
                } else if (historyRecord.action == 'setWidth') {
                    obj.setWidth(historyRecord.column, historyRecord.oldValue);
                } else if (historyRecord.action == 'setHeight') {
                    obj.setHeight(historyRecord.row, historyRecord.oldValue);
                } else if (historyRecord.action == 'setHeader') {
                    obj.setHeader(historyRecord.column, historyRecord.oldValue);
                } else if (historyRecord.action == 'setComments') {
                    obj.setComments(historyRecord.column, historyRecord.oldValue[0], historyRecord.oldValue[1]);
                } else if (historyRecord.action == 'orderBy') {
                    var rows = [];
                    for (var j = 0; j < historyRecord.rows.length; j++) {
                        rows[historyRecord.rows[j]] = j;
                    }
                    obj.updateOrderArrow(historyRecord.column, historyRecord.order ? 0 : 1);
                    obj.updateOrder(rows);
                } else if (historyRecord.action == 'setValue') {
                    // Redo for changes in cells
                    for (var i = 0; i < historyRecord.records.length; i++) {
                        records.push({
                            x: historyRecord.records[i].x,
                            y: historyRecord.records[i].y,
                            newValue: historyRecord.records[i].oldValue,
                        });

                        if (historyRecord.oldStyle) {
                            obj.resetStyle(historyRecord.oldStyle);
                        }
                    }
                    // Update records
                    obj.setValue(records);

                    // Update selection
                    if (historyRecord.selection) {
                        obj.updateSelectionFromCoords(historyRecord.selection[0], historyRecord.selection[1], historyRecord.selection[2], historyRecord.selection[3]);
                    }
                }
            }
            obj.ignoreEvents = ignoreEvents;
            obj.ignoreHistory = ignoreHistory;
    
            // Events
            obj.dispatch('onundo', el, historyRecord);
        }
    
        /**
         * Redo previously undone action
         */
        obj.redo = function() {
            // Ignore events and history
            var ignoreEvents = obj.ignoreEvents ? true : false;
            var ignoreHistory = obj.ignoreHistory ? true : false;
    
            obj.ignoreEvents = true;
            obj.ignoreHistory = true;
    
            // Records
            var records = [];
    
            // Update cells
            if (obj.historyIndex < obj.history.length - 1) {
                // History
                var historyRecord = obj.history[++obj.historyIndex];
    
                if (historyRecord.action == 'insertRow') {
                    obj.historyProcessRow(0, historyRecord);
                } else if (historyRecord.action == 'deleteRow') {
                    obj.historyProcessRow(1, historyRecord);
                } else if (historyRecord.action == 'insertColumn') {
                    obj.historyProcessColumn(0, historyRecord);
                } else if (historyRecord.action == 'deleteColumn') {
                    obj.historyProcessColumn(1, historyRecord);
                } else if (historyRecord.action == 'moveRow') {
                    obj.moveRow(historyRecord.oldValue, historyRecord.newValue);
                } else if (historyRecord.action == 'moveColumn') {
                    obj.moveColumn(historyRecord.oldValue, historyRecord.newValue);
                } else if (historyRecord.action == 'setMerge') {
                    obj.setMerge(historyRecord.column, historyRecord.colspan, historyRecord.rowspan, 1);
                } else if (historyRecord.action == 'setStyle') {
                    obj.setStyle(historyRecord.newValue, null, null, 1);
                } else if (historyRecord.action == 'setWidth') {
                    obj.setWidth(historyRecord.column, historyRecord.newValue);
                } else if (historyRecord.action == 'setHeight') {
                    obj.setHeight(historyRecord.row, historyRecord.newValue);
                } else if (historyRecord.action == 'setHeader') {
                    obj.setHeader(historyRecord.column, historyRecord.newValue);
                } else if (historyRecord.action == 'setComments') {
                    obj.setComments(historyRecord.column, historyRecord.newValue[0], historyRecord.newValue[1]);
                } else if (historyRecord.action == 'orderBy') {
                    obj.updateOrderArrow(historyRecord.column, historyRecord.order);
                    obj.updateOrder(historyRecord.rows);
                } else if (historyRecord.action == 'setValue') {
                    obj.setValue(historyRecord.records);
                    // Redo for changes in cells
                    for (var i = 0; i < historyRecord.records.length; i++) {
                        if (historyRecord.oldStyle) {
                            obj.resetStyle(historyRecord.newStyle);
                        }
                    }
                    // Update selection
                    if (historyRecord.selection) {
                        obj.updateSelectionFromCoords(historyRecord.selection[0], historyRecord.selection[1], historyRecord.selection[2], historyRecord.selection[3]);
                    }
                }
            }
            obj.ignoreEvents = ignoreEvents;
            obj.ignoreHistory = ignoreHistory;
    
            // Events
            obj.dispatch('onredo', el, historyRecord);
        }
    
        /**
         * Get dropdown value from key
         */
        obj.getDropDownValue = function(column, key) {
            var value = [];
    
            if (obj.options.columns[column] && obj.options.columns[column].source) {
                // Create array from source
                var combo = [];
                var source = obj.options.columns[column].source;
    
                for (var i = 0; i < source.length; i++) {
                    if (typeof(source[i]) == 'object') {
                        combo[source[i].id] = source[i].name;
                    } else {
                        combo[source[i]] = source[i];
                    }
                }
    
                // Guarantee single multiple compatibility
                var keys = Array.isArray(key) ? key : ('' + key).split(';');
    
                for (var i = 0; i < keys.length; i++) {
                    if (typeof(keys[i]) === 'object') {
                        value.push(combo[keys[i].id]);
                    } else {
                        if (combo[keys[i]]) {
                            value.push(combo[keys[i]]);
                        }
                    }
                }
            } else {
                console.error('Invalid column');
            }
    
            return (value.length > 0) ? value.join('; ') : '';
        }
    
        /**
         * From stack overflow contributions
         */
        obj.parseCSV = function(str, delimiter) {
            // Remove last line break
            str = str.replace(/\r?\n$|\r$|\n$/g, "");
            // Last caracter is the delimiter
            if (str.charCodeAt(str.length-1) == 9) {
                str += "\0";
            }
            // user-supplied delimeter or default comma
            delimiter = (delimiter || ",");
    
            var arr = [];
            var quote = false;  // true means we're inside a quoted field
            // iterate over each character, keep track of current row and column (of the returned array)
            for (var row = 0, col = 0, c = 0; c < str.length; c++) {
                var cc = str[c], nc = str[c+1];
                arr[row] = arr[row] || [];
                arr[row][col] = arr[row][col] || '';
    
                // If the current character is a quotation mark, and we're inside a quoted field, and the next character is also a quotation mark, add a quotation mark to the current column and skip the next character
                if (cc == '"' && quote && nc == '"') { arr[row][col] += cc; ++c; continue; }  
    
                // If it's just one quotation mark, begin/end quoted field
                if (cc == '"') { quote = !quote; continue; }
    
                // If it's a comma and we're not in a quoted field, move on to the next column
                if (cc == delimiter && !quote) { ++col; continue; }
    
                // If it's a newline (CRLF) and we're not in a quoted field, skip the next character and move on to the next row and move to column 0 of that new row
                if (cc == '\r' && nc == '\n' && !quote) { ++row; col = 0; ++c; continue; }
    
                // If it's a newline (LF or CR) and we're not in a quoted field, move on to the next row and move to column 0 of that new row
                if (cc == '\n' && !quote) { ++row; col = 0; continue; }
                if (cc == '\r' && !quote) { ++row; col = 0; continue; }
    
                // Otherwise, append the current character to the current column
                arr[row][col] += cc;
            }
            return arr;
        }
    
        obj.hash = function(str) {
            var hash = 0, i, chr;
    
            if (str.length === 0) {
                return hash;
            } else {
                for (i = 0; i < str.length; i++) {
                  chr = str.charCodeAt(i);
                  hash = ((hash << 5) - hash) + chr;
                  hash |= 0;
                }
            }
            return hash;
        }
    
        obj.onafterchanges = function(el, records) {
            // Events
            obj.dispatch('onafterchanges', el, records);
        }
    
        obj.destroy = function() {
            jexcel.destroy(el);
        }

        /**
         * Initialization method
         */
        obj.init = function() {
            jexcel.current = obj;
    
            // Build handlers
            if (typeof(jexcel.build) == 'function') {
                if (obj.options.root) {
                    jexcel.build(obj.options.root);
                } else {
                    jexcel.build(document);
                    jexcel.build = null;
                }
            }
    
            // Event
            el.setAttribute('tabindex', 1);
            el.addEventListener('focus', function(e) {
                if (jexcel.current && ! obj.selectedCell) {
                    obj.updateSelectionFromCoords(0,0,0,0);
                    obj.left();
                }
            });

            // Load the table data based on an CSV file
            if (obj.options.csv) {
                // Loading
                if (obj.options.loadingSpin == true) {
                    jSuites.loading.show();
                }
    
                // Load CSV file
                jSuites.ajax({
                    url: obj.options.csv,
                    method: obj.options.method,
                    data: obj.options.requestVariables,
                    dataType: 'text',
                    success: function(result) {
                        // Convert data
                        var newData = obj.parseCSV(result, obj.options.csvDelimiter)
    
                        // Headers
                        if (obj.options.csvHeaders == true && newData.length > 0) {
                            var headers = newData.shift();
                            for(var i = 0; i < headers.length; i++) {
                                if (! obj.options.columns[i]) {
                                    obj.options.columns[i] = { type:'text', align:obj.options.defaultColAlign, width:obj.options.defaultColWidth };
                                }
                                // Precedence over pre-configurated titles
                                if (typeof obj.options.columns[i].title === 'undefined') {
                                  obj.options.columns[i].title = headers[i];
                                }
                            }
                        }
                        // Data
                        obj.options.data = newData;
                        // Prepare table
                        obj.prepareTable();
                        // Hide spin
                        if (obj.options.loadingSpin == true) {
                            jSuites.loading.hide();
                        }
                    }
                });
            } else if (obj.options.url) {
                // Loading
                if (obj.options.loadingSpin == true) {
                    jSuites.loading.show();
                }
    
                jSuites.ajax({
                    url: obj.options.url,
                    method: obj.options.method,
                    data: obj.options.requestVariables,
                    dataType: 'json',
                    success: function(result) {
                        // Data
                        obj.options.data = (result.data) ? result.data : result;
                        // Prepare table
                        obj.prepareTable();
                        // Hide spin
                        if (obj.options.loadingSpin == true) {
                            jSuites.loading.hide();
                        }
                    }
                });
            } else {
                // Prepare table
                obj.prepareTable();
            }
        }
    
        // Context menu
        if (options && options.contextMenu != null) {
            obj.options.contextMenu = options.contextMenu;
        } else {
            obj.options.contextMenu = function(el, x, y, e) {
                var items = [];
    
                if (y == null) {
                    // Insert a new column
                    if (obj.options.allowInsertColumn == true) {
                        items.push({
                            title:obj.options.text.insertANewColumnBefore,
                            onclick:function() {
                                obj.insertColumn(1, parseInt(x), 1);
                            }
                        });
                    }
    
                    if (obj.options.allowInsertColumn == true) {
                        items.push({
                            title:obj.options.text.insertANewColumnAfter,
                            onclick:function() {
                                obj.insertColumn(1, parseInt(x), 0);
                            }
                        });
                    }
    
                    // Delete a column
                    if (obj.options.allowDeleteColumn == true) {
                        items.push({
                            title:obj.options.text.deleteSelectedColumns,
                            onclick:function() {
                                obj.deleteColumn(obj.getSelectedColumns().length ? undefined : parseInt(x));
                            }
                        });
                    }
    
                    // Rename column
                    if (obj.options.allowRenameColumn == true) {
                        items.push({
                            title:obj.options.text.renameThisColumn,
                            onclick:function() {
                                obj.setHeader(x);
                            }
                        });
                    }
    
                    // Sorting
                    if (obj.options.columnSorting == true) {
                        // Line
                        items.push({ type:'line' });
    
                        items.push({
                            title:obj.options.text.orderAscending,
                            onclick:function() {
                                obj.orderBy(x, 0);
                            }
                        });
                        items.push({
                            title:obj.options.text.orderDescending,
                            onclick:function() {
                                obj.orderBy(x, 1);
                            }
                        });
                    }
                } else {
                    // Insert new row
                    if (obj.options.allowInsertRow == true) {
                        items.push({
                            title:obj.options.text.insertANewRowBefore,
                            onclick:function() {
                                obj.insertRow(1, parseInt(y), 1);
                            }
                        });
    
                        items.push({
                            title:obj.options.text.insertANewRowAfter,
                            onclick:function() {
                                obj.insertRow(1, parseInt(y));
                            }
                        });
                    }
    
                    if (obj.options.allowDeleteRow == true) {
                        items.push({
                            title:obj.options.text.deleteSelectedRows,
                            onclick:function() {
                                obj.deleteRow(obj.getSelectedRows().length ? undefined : parseInt(y));
                            }
                        });
                    }
    
                    if (x) {
                        if (obj.options.allowComments == true) {
                            items.push({ type:'line' });
    
                            var title = obj.records[y][x].getAttribute('title') || '';

                            items.push({
                                title: title ? obj.options.text.editComments : obj.options.text.addComments,
                                onclick:function() {
                                    var comment = prompt(obj.options.text.comments, title);
                                    if (comment) {
                                        obj.setComments([ x, y ], comment);
                                    }
                                }
                            });
    
                            if (title) {
                                items.push({
                                    title:obj.options.text.clearComments,
                                    onclick:function() {
                                        obj.setComments([ x, y ], '');
                                    }
                                });
                            }
                        }
                    }
                }
    
                // Line
                items.push({ type:'line' });
    
                // Copy
                items.push({
                    title:obj.options.text.copy,
                    shortcut:'Ctrl + C',
                    onclick:function() {
                        obj.copy(true);
                    }
                });
    
                // Paste
                if (navigator && navigator.clipboard) {
                    items.push({
                        title:obj.options.text.paste,
                        shortcut:'Ctrl + V',
                        onclick:function() {
                            if (obj.selectedCell) {
                                navigator.clipboard.readText().then(function(text) {
                                    if (text) {
                                        jexcel.current.paste(obj.selectedCell[0], obj.selectedCell[1], text);
                                    }
                                });
                            }
                        }
                    });
                }
    
                // Save
                if (obj.options.allowExport) {
                    items.push({
                        title: obj.options.text.saveAs,
                        shortcut: 'Ctrl + S',
                        onclick: function () {
                            obj.download();
                        }
                    });
                }
    
                // About
                if (obj.options.about) {
                    items.push({
                        title:obj.options.text.about,
                        onclick:function() {
                            if (obj.options.about === true) {
                                alert(Version().print());
                            } else {
                                alert(obj.options.about);
                            }
                        }
                    });
                }
    
                return items;
            }
        }
    
        obj.scrollControls = function(e) {
            obj.wheelControls();

            if (obj.options.freezeColumns > 0 && obj.content.scrollLeft != scrollLeft) {
                obj.updateFreezePosition();
            }

            // Close editor
            if (obj.options.lazyLoading == true || obj.options.tableOverflow == true) {
                if (obj.edition && e.target.className.substr(0,9) != 'jdropdown') {
                    obj.closeEditor(obj.edition[0], true);
                }
            }
        }

        obj.wheelControls = function(e) {
            if (obj.options.lazyLoading == true) {
                if (jexcel.timeControlLoading == null) {
                    jexcel.timeControlLoading = setTimeout(function() {
                        if (obj.content.scrollTop + obj.content.clientHeight >= obj.content.scrollHeight - 10) {
                            if (obj.loadDown()) {
                                if (obj.content.scrollTop + obj.content.clientHeight > obj.content.scrollHeight - 10) {
                                    obj.content.scrollTop = obj.content.scrollTop - obj.content.clientHeight;
                                }
                                obj.updateCornerPosition();
                            }
                        } else if (obj.content.scrollTop <= obj.content.clientHeight) {
                            if (obj.loadUp()) {
                                if (obj.content.scrollTop < 10) {
                                    obj.content.scrollTop = obj.content.scrollTop + obj.content.clientHeight;
                                }
                                obj.updateCornerPosition();
                            }
                        }
    
                        jexcel.timeControlLoading = null;
                    }, 100);
                }
            }
        }

        // Get width of all freezed cells together
        obj.getFreezeWidth = function() {
            var width = 0;
            if (obj.options.freezeColumns > 0) {
                for (var i = 0; i < obj.options.freezeColumns; i++) {
                    width += parseInt(obj.options.columns[i].width);
                }
            }
            return width;
        }

        var scrollLeft = 0;

        obj.updateFreezePosition = function() {
            scrollLeft = obj.content.scrollLeft;
            var width = 0;
            if (scrollLeft > 50) {
                for (var i = 0; i < obj.options.freezeColumns; i++) {
                    if (i > 0) {
                        width += parseInt(obj.options.columns[i-1].width);
                    }
                    obj.headers[i].classList.add('jexcel_freezed');
                    obj.headers[i].style.left = width + 'px';
                    for (var j = 0; j < obj.rows.length; j++) {
                        if (obj.rows[j] && obj.records[j][i]) {
                            var shifted = (scrollLeft + (i > 0 ? obj.records[j][i-1].style.width : 0)) - 51 + 'px';
                            obj.records[j][i].classList.add('jexcel_freezed');
                            obj.records[j][i].style.left = shifted;
                        }
                    }
                }
            } else {
                for (var i = 0; i < obj.options.freezeColumns; i++) {
                    obj.headers[i].classList.remove('jexcel_freezed');
                    obj.headers[i].style.left = '';
                    for (var j = 0; j < obj.rows.length; j++) {
                        if (obj.records[j][i]) {
                            obj.records[j][i].classList.remove('jexcel_freezed');
                            obj.records[j][i].style.left = '';
                        }
                    }
                }
            }

            // Place the corner in the correct place
            obj.updateCornerPosition();
        }

        el.addEventListener("DOMMouseScroll", obj.wheelControls);
        el.addEventListener("mousewheel", obj.wheelControls);
    
        el.jexcel = obj;
        el.jspreadsheet = obj;
    
        obj.init();
    
        return obj;
    });

    // Define dictionary
    jexcel.setDictionary = function(o) {
        jSuites.setDictionary(o);
    }

    // Define extensions
    jexcel.setExtensions = function(o) {
        var k = Object.keys(o);
        for (var i = 0; i < k.length; i++) {
            if (typeof(o[k[i]]) === 'function') {
                jexcel[k[i]] = o[k[i]];
                if (jexcel.license && typeof(o[k[i]].license) == 'function') {
                    o[k[i]].license(jexcel.license);
                }
            }
        }
    }

    /**
     * Formulas
     */
    if (typeof(formula) !== 'undefined') {
        jexcel.formula = formula;
    }
    jexcel.version = Version;

    jexcel.current = null;
    jexcel.timeControl = null;
    jexcel.timeControlLoading = null;
    
    jexcel.destroy = function(element, destroyEventHandlers) {
        if (element.jexcel) {
            var root = element.jexcel.options.root ? element.jexcel.options.root : document;
            element.removeEventListener("DOMMouseScroll", element.jexcel.scrollControls);
            element.removeEventListener("mousewheel", element.jexcel.scrollControls);
            element.jexcel = null;
            element.innerHTML = '';
    
            if (destroyEventHandlers) {
                root.removeEventListener("mouseup", jexcel.mouseUpControls);
                root.removeEventListener("mousedown", jexcel.mouseDownControls);
                root.removeEventListener("mousemove", jexcel.mouseMoveControls);
                root.removeEventListener("mouseover", jexcel.mouseOverControls);
                root.removeEventListener("dblclick", jexcel.doubleClickControls);
                root.removeEventListener("paste", jexcel.pasteControls);
                root.removeEventListener("contextmenu", jexcel.contextMenuControls);
                root.removeEventListener("touchstart", jexcel.touchStartControls);
                root.removeEventListener("touchend", jexcel.touchEndControls);
                root.removeEventListener("touchcancel", jexcel.touchEndControls);
                document.removeEventListener("keydown", jexcel.keyDownControls);
                jexcel = null;
            }
        }
    }
    
    jexcel.build = function(root) {
        root.addEventListener("mouseup", jexcel.mouseUpControls);
        root.addEventListener("mousedown", jexcel.mouseDownControls);
        root.addEventListener("mousemove", jexcel.mouseMoveControls);
        root.addEventListener("mouseover", jexcel.mouseOverControls);
        root.addEventListener("dblclick", jexcel.doubleClickControls);
        root.addEventListener("paste", jexcel.pasteControls);
        root.addEventListener("contextmenu", jexcel.contextMenuControls);
        root.addEventListener("touchstart", jexcel.touchStartControls);
        root.addEventListener("touchend", jexcel.touchEndControls);
        root.addEventListener("touchcancel", jexcel.touchEndControls);
        root.addEventListener("touchmove", jexcel.touchEndControls);
        document.addEventListener("keydown", jexcel.keyDownControls);
    }
    
    /**
     * Events
     */
    jexcel.keyDownControls = function(e) {
        if (jexcel.current) {
            if (jexcel.current.edition) {
                if (e.which == 27) {
                    // Escape
                    if (jexcel.current.edition) {
                        // Exit without saving
                        jexcel.current.closeEditor(jexcel.current.edition[0], false);
                    }
                    e.preventDefault();
                } else if (e.which == 13) {
                    // Enter
                    if (jexcel.current.options.columns[jexcel.current.edition[2]].type == 'calendar') {
                        jexcel.current.closeEditor(jexcel.current.edition[0], true);
                    } else if (jexcel.current.options.columns[jexcel.current.edition[2]].type == 'dropdown' ||
                               jexcel.current.options.columns[jexcel.current.edition[2]].type == 'autocomplete') {
                        // Do nothing
                    } else {
                        // Alt enter -> do not close editor
                        if ((jexcel.current.options.wordWrap == true ||
                             jexcel.current.options.columns[jexcel.current.edition[2]].wordWrap == true ||
                             jexcel.current.options.data[jexcel.current.edition[3]][jexcel.current.edition[2]].length > 200) && e.altKey) {
                            // Add new line to the editor
                            var editorTextarea = jexcel.current.edition[0].children[0];
                            var editorValue = jexcel.current.edition[0].children[0].value;
                            var editorIndexOf = editorTextarea.selectionStart;
                            editorValue = editorValue.slice(0, editorIndexOf) + "\n" + editorValue.slice(editorIndexOf);
                            editorTextarea.value = editorValue;
                            editorTextarea.focus();
                            editorTextarea.selectionStart = editorIndexOf + 1;
                            editorTextarea.selectionEnd = editorIndexOf + 1;
                        } else {
                            jexcel.current.edition[0].children[0].blur();
                        }
                    }
                } else if (e.which == 9) {
                    // Tab
                    if (jexcel.current.options.columns[jexcel.current.edition[2]].type == 'calendar') {
                        jexcel.current.closeEditor(jexcel.current.edition[0], true);
                    } else {
                        jexcel.current.edition[0].children[0].blur();
                    }
                }
            }
    
            if (! jexcel.current.edition && jexcel.current.selectedCell) {
                // Which key
                if (e.which == 37) {
                    jexcel.current.left(e.shiftKey, e.ctrlKey);
                    e.preventDefault();
                } else if (e.which == 39) {
                    jexcel.current.right(e.shiftKey, e.ctrlKey);
                    e.preventDefault();
                } else if (e.which == 38) {
                    jexcel.current.up(e.shiftKey, e.ctrlKey);
                    e.preventDefault();
                } else if (e.which == 40) {
                    jexcel.current.down(e.shiftKey, e.ctrlKey);
                    e.preventDefault();
                } else if (e.which == 36) {
                    jexcel.current.first(e.shiftKey, e.ctrlKey);
                    e.preventDefault();
                } else if (e.which == 35) {
                    jexcel.current.last(e.shiftKey, e.ctrlKey);
                    e.preventDefault();
                } else if (e.which == 32) {
                    if (jexcel.current.options.editable == true) {
                        jexcel.current.setCheckRadioValue();
                    }
                    e.preventDefault();
                } else if (e.which == 46) {
                    // Delete
                    if (jexcel.current.options.editable == true) {
                        if (jexcel.current.selectedRow) {
                            if (jexcel.current.options.allowDeleteRow == true) {
                                if (confirm(jexcel.current.options.text.areYouSureToDeleteTheSelectedRows)) {
                                    jexcel.current.deleteRow();
                                }
                            }
                        } else if (jexcel.current.selectedHeader) {
                            if (jexcel.current.options.allowDeleteColumn == true) {
                                if (confirm(jexcel.current.options.text.areYouSureToDeleteTheSelectedColumns)) {
                                    jexcel.current.deleteColumn();
                                }
                            }
                        } else {
                            // Change value
                            jexcel.current.setValue(jexcel.current.highlighted, '');
                        }
                    }
                } else if (e.which == 13) {
                    // Move cursor
                    if (e.shiftKey) {
                        jexcel.current.up();
                    } else {
                        if (jexcel.current.options.allowInsertRow == true) {
                            if (jexcel.current.options.allowManualInsertRow == true) {
                                if (jexcel.current.selectedCell[1] == jexcel.current.options.data.length - 1) {
                                    // New record in case selectedCell in the last row
                                    jexcel.current.insertRow();
                                }
                            }
                        }
    
                        jexcel.current.down();
                    }
                    e.preventDefault();
                } else if (e.which == 9) {
                    // Tab
                    if (e.shiftKey) {
                        jexcel.current.left();
                    } else {
                        if (jexcel.current.options.allowInsertColumn == true) {
                            if (jexcel.current.options.allowManualInsertColumn == true) {
                                if (jexcel.current.selectedCell[0] == jexcel.current.options.data[0].length - 1) {
                                    // New record in case selectedCell in the last column
                                    jexcel.current.insertColumn();
                                }
                            }
                        }
    
                        jexcel.current.right();
                    }
                    e.preventDefault();
                } else {
                    if ((e.ctrlKey || e.metaKey) && ! e.shiftKey) {
                        if (e.which == 65) {
                            // Ctrl + A
                            jexcel.current.selectAll();
                            e.preventDefault();
                        } else if (e.which == 83) {
                            // Ctrl + S
                            jexcel.current.download();
                            e.preventDefault();
                        } else if (e.which == 89) {
                            // Ctrl + Y
                            jexcel.current.redo();
                            e.preventDefault();
                        } else if (e.which == 90) {
                            // Ctrl + Z
                            jexcel.current.undo();
                            e.preventDefault();
                        } else if (e.which == 67) {
                            // Ctrl + C
                            jexcel.current.copy(true);
                            e.preventDefault();
                               } else if (e.which == 88) {
                            // Ctrl + X
                            if (jexcel.current.options.editable == true) {
                                jexcel.cutControls();
                            } else {
                                jexcel.copyControls();
                            }
                            e.preventDefault();
                        } else if (e.which == 86) {
                            // Ctrl + V
                            jexcel.pasteControls();
                        }
                    } else {
                        if (jexcel.current.selectedCell) {
                            if (jexcel.current.options.editable == true) {
                                var rowId = jexcel.current.selectedCell[1];
                                var columnId = jexcel.current.selectedCell[0];
    
                                // If is not readonly
                                if (jexcel.current.options.columns[columnId].type != 'readonly') {
                                    // Characters able to start a edition
                                    if (e.keyCode == 32) {
                                        // Space
                                        if (jexcel.current.options.columns[columnId].type == 'checkbox' ||
                                            jexcel.current.options.columns[columnId].type == 'radio') {
                                            e.preventDefault();
                                        } else {
                                            // Start edition
                                            jexcel.current.openEditor(jexcel.current.records[rowId][columnId], true);
                                        }
                                    } else if (e.keyCode == 113) {
                                        // Start edition with current content F2
                                        jexcel.current.openEditor(jexcel.current.records[rowId][columnId], false);
                                    } else if ((e.keyCode == 8) ||
                                               (e.keyCode >= 48 && e.keyCode <= 57) ||
                                               (e.keyCode >= 96 && e.keyCode <= 111) ||
                                               (e.keyCode >= 187 && e.keyCode <= 190) ||
                                               ((String.fromCharCode(e.keyCode) == e.key || String.fromCharCode(e.keyCode).toLowerCase() == e.key.toLowerCase()) && jexcel.validLetter(String.fromCharCode(e.keyCode)))) {
                                        // Start edition
                                        jexcel.current.openEditor(jexcel.current.records[rowId][columnId], true);
                                        // Prevent entries in the calendar
                                        if (jexcel.current.options.columns[columnId].type == 'calendar') {
                                            e.preventDefault();
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            } else {
                if (e.target.classList.contains('jexcel_search')) {
                    if (jexcel.timeControl) {
                        clearTimeout(jexcel.timeControl);
                    }
    
                    jexcel.timeControl = setTimeout(function() {
                        jexcel.current.search(e.target.value);
                    }, 200);
                }
            }
        }
    }
    
    jexcel.isMouseAction = false;
    
    jexcel.mouseDownControls = function(e) {
        e = e || window.event;
        if (e.buttons) {
            var mouseButton = e.buttons;
        } else if (e.button) {
            var mouseButton = e.button;
        } else {
            var mouseButton = e.which;
        }

        // Get elements
        var jexcelTable = jexcel.getElement(e.target);

        if (jexcelTable[0]) {
            if (jexcel.current != jexcelTable[0].jexcel) {
                if (jexcel.current) {
                    if (jexcel.current.edition) {
                        jexcel.current.closeEditor(jexcel.current.edition[0], true);
                    }
                    jexcel.current.resetSelection();
                }
                jexcel.current = jexcelTable[0].jexcel;
            }
        } else {
            if (jexcel.current) {
                if (jexcel.current.edition) {
                    jexcel.current.closeEditor(jexcel.current.edition[0], true);
                }
                
                jexcel.current.resetSelection(true);
                jexcel.current = null;
            }
        }
    
        if (jexcel.current && mouseButton == 1) {
            if (e.target.classList.contains('jexcel_selectall')) {
                if (jexcel.current) {
                    jexcel.current.selectAll();
                }
            } else if (e.target.classList.contains('jexcel_corner')) {
                if (jexcel.current.options.editable == true) {
                    jexcel.current.selectedCorner = true;
                }
            } else {
                // Header found
                if (jexcelTable[1] == 1) {
                    var columnId = e.target.getAttribute('data-x');
                    if (columnId) {
                        // Update cursor
                        var info = e.target.getBoundingClientRect();
                        if (jexcel.current.options.columnResize == true && info.width - e.offsetX < 6) {
                            // Resize helper
                            jexcel.current.resizing = {
                                mousePosition: e.pageX,
                                column: columnId,
                                width: info.width,
                            };
    
                            // Border indication
                            jexcel.current.headers[columnId].classList.add('resizing');
                            for (var j = 0; j < jexcel.current.records.length; j++) {
                                if (jexcel.current.records[j][columnId]) {
                                    jexcel.current.records[j][columnId].classList.add('resizing');
                                }
                            }
                        } else if (jexcel.current.options.columnDrag == true && info.height - e.offsetY < 6) {
                            if (jexcel.current.isColMerged(columnId).length) {
                                console.error('Jspreadsheet: This column is part of a merged cell.');
                            } else {
                                // Reset selection
                                jexcel.current.resetSelection();
                                // Drag helper
                                jexcel.current.dragging = {
                                    element: e.target,
                                    column: +columnId,
                                    destination: +columnId,
                                };
                                // Border indication
                                jexcel.current.headers[columnId].classList.add('dragging');
                                for (var j = 0; j < jexcel.current.records.length; j++) {
                                    if (jexcel.current.records[j][columnId]) {
                                        jexcel.current.records[j][columnId].classList.add('dragging');
                                    }
                                }
                            }
                        } else {
                            if (jexcel.current.selectedHeader && (e.shiftKey || e.ctrlKey)) {
                                var o = jexcel.current.selectedHeader;
                                var d = columnId;
                            } else {
                                // Press to rename
                                if (jexcel.current.selectedHeader == columnId && jexcel.current.options.allowRenameColumn == true) {
                                    jexcel.timeControl = setTimeout(function() {
                                        jexcel.current.setHeader(columnId);
                                    }, 800);
                                }
    
                                // Keep track of which header was selected first
                                jexcel.current.selectedHeader = columnId;
    
                                // Update selection single column
                                var o = columnId;
                                var d = columnId;
                            }
    
                            // Update selection
                            jexcel.current.updateSelectionFromCoords(o, 0, d, jexcel.current.options.data.length - 1);
                        }
                    } else {
                        if (e.target.parentNode.classList.contains('jexcel_nested')) {
                            if (e.target.getAttribute('data-column')) {
                                var column = e.target.getAttribute('data-column').split(',');
                                var c1 = parseInt(column[0]);
                                var c2 = parseInt(column[column.length-1]);
                            } else {
                                var c1 = 0;
                                var c2 = jexcel.current.options.columns.length - 1;
                            }
                            jexcel.current.updateSelectionFromCoords(c1, 0, c2, jexcel.current.options.data.length - 1);
                        }
                    }
                } else {
                    jexcel.current.selectedHeader = false;
                }
    
                // Body found
                if (jexcelTable[1] == 2) {
                    var rowId = e.target.getAttribute('data-y');
                    
                    if (e.target.classList.contains('jexcel_row')) {
                        var info = e.target.getBoundingClientRect();
                        if (jexcel.current.options.rowResize == true && info.height - e.offsetY < 6) {
                            // Resize helper
                            jexcel.current.resizing = {
                                element: e.target.parentNode,
                                mousePosition: e.pageY,
                                row: rowId,
                                height: info.height,
                            };
                            // Border indication
                            e.target.parentNode.classList.add('resizing');
                        } else if (jexcel.current.options.rowDrag == true && info.width - e.offsetX < 6) {
                            if (jexcel.current.isRowMerged(rowId).length) {
                                console.error('Jspreadsheet: This row is part of a merged cell');
                            } else if (jexcel.current.options.search == true && jexcel.current.results) {
                                console.error('Jspreadsheet: Please clear your search before perform this action');
                            } else {
                                // Reset selection
                                jexcel.current.resetSelection();
                                // Drag helper
                                jexcel.current.dragging = {
                                    element: e.target.parentNode,
                                    row:rowId,
                                    destination:rowId,
                                };
                                // Border indication
                                e.target.parentNode.classList.add('dragging');
                            }
                        } else {
                            if (jexcel.current.selectedRow && (e.shiftKey || e.ctrlKey)) {
                                var o = jexcel.current.selectedRow;
                                var d = rowId;
                            } else {
                                // Keep track of which header was selected first
                                jexcel.current.selectedRow = rowId;
    
                                // Update selection single column
                                var o = rowId;
                                var d = rowId;
                            }
    
                            // Update selection
                            jexcel.current.updateSelectionFromCoords(0, o, jexcel.current.options.data[0].length - 1, d);
                        }
                    } else {
                        // Jclose
                        if (e.target.classList.contains('jclose') && e.target.clientWidth - e.offsetX < 50 && e.offsetY < 50) {
                            jexcel.current.closeEditor(jexcel.current.edition[0], true);
                        } else {
                            var getCellCoords = function(element) {
                                var x = element.getAttribute('data-x');
                                var y = element.getAttribute('data-y');
                                if (x && y) {
                                    return [x, y];
                                } else {
                                    if (element.parentNode) {
                                        return getCellCoords(element.parentNode);
                                    }
                                }
                            };

                            var position = getCellCoords(e.target);
                            if (position) {

                                var columnId = position[0];
                                var rowId = position[1];
                                // Close edition
                                if (jexcel.current.edition) {
                                    if (jexcel.current.edition[2] != columnId || jexcel.current.edition[3] != rowId) {
                                        jexcel.current.closeEditor(jexcel.current.edition[0], true);
                                    }
                                }

                                if (! jexcel.current.edition) {
                                    // Update cell selection
                                    if (e.shiftKey) {
                                        jexcel.current.updateSelectionFromCoords(jexcel.current.selectedCell[0], jexcel.current.selectedCell[1], columnId, rowId);
                                    } else {
                                        jexcel.current.updateSelectionFromCoords(columnId, rowId);
                                    }
                                }

                                // No full row selected
                                jexcel.current.selectedHeader = null;
                                jexcel.current.selectedRow = null;
                            }
                        }
                    }
                } else {
                    jexcel.current.selectedRow = false;
                }
    
                // Pagination
                if (e.target.classList.contains('jexcel_page')) {
                    if (e.target.innerText == '<') {
                        jexcel.current.page(0);
                    } else if (e.target.innerText == '>') {
                        jexcel.current.page(e.target.getAttribute('title') - 1);
                    } else {
                        jexcel.current.page(e.target.innerText - 1);
                    }
                }
            }
    
            if (jexcel.current.edition) {
                jexcel.isMouseAction = false;
            } else {
                jexcel.isMouseAction = true;
            }
        } else {
            jexcel.isMouseAction = false;
        }
    }
    
    jexcel.mouseUpControls = function(e) {
        if (jexcel.current) {
            // Update cell size
            if (jexcel.current.resizing) {
                // Columns to be updated
                if (jexcel.current.resizing.column) {
                    // New width
                    var newWidth = jexcel.current.colgroup[jexcel.current.resizing.column].getAttribute('width');
                    // Columns
                    var columns = jexcel.current.getSelectedColumns();
                    if (columns.length > 1) {
                        var currentWidth = [];
                        for (var i = 0; i < columns.length; i++) {
                            currentWidth.push(parseInt(jexcel.current.colgroup[columns[i]].getAttribute('width')));
                        }
                        // Previous width
                        var index = columns.indexOf(parseInt(jexcel.current.resizing.column));
                        currentWidth[index] = jexcel.current.resizing.width;
                        jexcel.current.setWidth(columns, newWidth, currentWidth);
                    } else {
                        jexcel.current.setWidth(jexcel.current.resizing.column, newWidth, jexcel.current.resizing.width);
                    }
                    // Remove border
                    jexcel.current.headers[jexcel.current.resizing.column].classList.remove('resizing');
                    for (var j = 0; j < jexcel.current.records.length; j++) {
                        if (jexcel.current.records[j][jexcel.current.resizing.column]) {
                            jexcel.current.records[j][jexcel.current.resizing.column].classList.remove('resizing');
                        }
                    }
                } else {
                    // Remove Class
                    jexcel.current.rows[jexcel.current.resizing.row].children[0].classList.remove('resizing');
                    var newHeight = jexcel.current.rows[jexcel.current.resizing.row].getAttribute('height');
                    jexcel.current.setHeight(jexcel.current.resizing.row, newHeight, jexcel.current.resizing.height);
                    // Remove border
                    jexcel.current.resizing.element.classList.remove('resizing');
                }
                // Reset resizing helper
                jexcel.current.resizing = null;
            } else if (jexcel.current.dragging) {
                // Reset dragging helper
                if (jexcel.current.dragging) {
                    if (jexcel.current.dragging.column) {
                        // Target
                        var columnId = e.target.getAttribute('data-x');
                        // Remove move style
                        jexcel.current.headers[jexcel.current.dragging.column].classList.remove('dragging');
                        for (var j = 0; j < jexcel.current.rows.length; j++) {
                            if (jexcel.current.records[j][jexcel.current.dragging.column]) {
                                jexcel.current.records[j][jexcel.current.dragging.column].classList.remove('dragging');
                            }
                        }
                        for (var i = 0; i < jexcel.current.headers.length; i++) {
                            jexcel.current.headers[i].classList.remove('dragging-left');
                            jexcel.current.headers[i].classList.remove('dragging-right');
                        }
                        // Update position
                        if (columnId) {
                            if (jexcel.current.dragging.column != jexcel.current.dragging.destination) {
                                jexcel.current.moveColumn(jexcel.current.dragging.column, jexcel.current.dragging.destination);
                            }
                        }
                    } else {
                        if (jexcel.current.dragging.element.nextSibling) {
                            var position = parseInt(jexcel.current.dragging.element.nextSibling.getAttribute('data-y'));
                            if (jexcel.current.dragging.row < position) {
                                position -= 1;
                            }
                        } else {
                            var position = parseInt(jexcel.current.dragging.element.previousSibling.getAttribute('data-y'));
                        }
                        if (jexcel.current.dragging.row != jexcel.current.dragging.destination) {
                            jexcel.current.moveRow(jexcel.current.dragging.row, position, true);
                        }
                        jexcel.current.dragging.element.classList.remove('dragging');
                    }
                    jexcel.current.dragging = null;
                }
            } else {
                // Close any corner selection
                if (jexcel.current.selectedCorner) {
                    jexcel.current.selectedCorner = false;
    
                    // Data to be copied
                    if (jexcel.current.selection.length > 0) {
                        // Copy data
                        jexcel.current.copyData(jexcel.current.selection[0], jexcel.current.selection[jexcel.current.selection.length - 1]);
    
                        // Remove selection
                        jexcel.current.removeCopySelection();
                    }
                }
            }
        }

        // Clear any time control
        if (jexcel.timeControl) {
            clearTimeout(jexcel.timeControl);
            jexcel.timeControl = null;
        }
    
        // Mouse up
        jexcel.isMouseAction = false;
    }
    
    // Mouse move controls
    jexcel.mouseMoveControls = function(e) {
        e = e || window.event;
        if (e.buttons) {
            var mouseButton = e.buttons;
        } else if (e.button) {
            var mouseButton = e.button;
        } else {
            var mouseButton = e.which;
        }
    
        if (! mouseButton) {
            jexcel.isMouseAction = false;
        }
    
        if (jexcel.current) {
            if (jexcel.isMouseAction == true) {
                // Resizing is ongoing
                if (jexcel.current.resizing) {
                    if (jexcel.current.resizing.column) {
                        var width = e.pageX - jexcel.current.resizing.mousePosition;
    
                        if (jexcel.current.resizing.width + width > 0) {
                            var tempWidth = jexcel.current.resizing.width + width;
                            jexcel.current.colgroup[jexcel.current.resizing.column].setAttribute('width', tempWidth);
    
                            jexcel.current.updateCornerPosition();
                        }
                    } else {
                        var height = e.pageY - jexcel.current.resizing.mousePosition;
    
                        if (jexcel.current.resizing.height + height > 0) {
                            var tempHeight = jexcel.current.resizing.height + height;
                            jexcel.current.rows[jexcel.current.resizing.row].setAttribute('height', tempHeight);
    
                            jexcel.current.updateCornerPosition();
                        }
                    }
                }
                else if (jexcel.current.dragging) {
                    if (jexcel.current.dragging.column) {
                        var columnId = e.target.getAttribute('data-x');
                        if (columnId) {

                            if (jexcel.current.isColMerged(columnId).length) {
                                console.error('Jspreadsheet: This column is part of a merged cell.');
                            } else {
                                for (var i = 0; i < jexcel.current.headers.length; i++) {
                                    jexcel.current.headers[i].classList.remove('dragging-left');
                                    jexcel.current.headers[i].classList.remove('dragging-right');
                                }
    
                                if (jexcel.current.dragging.column == columnId) {
                                    jexcel.current.dragging.destination = parseInt(columnId);
                                } else {
                                    if (e.target.clientWidth / 2 > e.offsetX) {
                                        if (jexcel.current.dragging.column < columnId) {
                                            jexcel.current.dragging.destination = parseInt(columnId) - 1;
                                        } else {
                                            jexcel.current.dragging.destination = parseInt(columnId);
                                        }
                                        jexcel.current.headers[columnId].classList.add('dragging-left');
                                    } else {
                                        if (jexcel.current.dragging.column < columnId) {
                                            jexcel.current.dragging.destination = parseInt(columnId);
                                        } else {
                                            jexcel.current.dragging.destination = parseInt(columnId) + 1;
                                        }
                                        jexcel.current.headers[columnId].classList.add('dragging-right');
                                    }
                                }
                            }
                        }
                    } else {
                        var rowId = e.target.getAttribute('data-y');
                        if (rowId) {
                            if (jexcel.current.isRowMerged(rowId).length) {
                                console.error('Jspreadsheet: This row is part of a merged cell.');
                            } else {
                                var target = (e.target.clientHeight / 2 > e.offsetY) ? e.target.parentNode.nextSibling : e.target.parentNode;
                                if (jexcel.current.dragging.element != target) {
                                    e.target.parentNode.parentNode.insertBefore(jexcel.current.dragging.element, target);
                                    jexcel.current.dragging.destination = Array.prototype.indexOf.call(jexcel.current.dragging.element.parentNode.children, jexcel.current.dragging.element);
                                }
                            }
                        }
                    }
                }
            } else {
                var x = e.target.getAttribute('data-x');
                var y = e.target.getAttribute('data-y');
                var rect = e.target.getBoundingClientRect();
    
                if (jexcel.current.cursor) {
                    jexcel.current.cursor.style.cursor = '';
                    jexcel.current.cursor = null;
                }

                if (e.target.parentNode.parentNode && e.target.parentNode.parentNode.className) {
                    if (e.target.parentNode.parentNode.classList.contains('resizable')) {
                        if (e.target && x && ! y && (rect.width - (e.clientX - rect.left) < 6)) {
                            jexcel.current.cursor = e.target;
                            jexcel.current.cursor.style.cursor = 'col-resize';
                        } else if (e.target && ! x && y && (rect.height - (e.clientY - rect.top) < 6)) {
                            jexcel.current.cursor = e.target;
                            jexcel.current.cursor.style.cursor = 'row-resize';
                        }
                    }
    
                    if (e.target.parentNode.parentNode.classList.contains('draggable')) {
                        if (e.target && ! x && y && (rect.width - (e.clientX - rect.left) < 6)) {
                            jexcel.current.cursor = e.target;
                            jexcel.current.cursor.style.cursor = 'move';
                        } else if (e.target && x && ! y && (rect.height - (e.clientY - rect.top) < 6)) {
                            jexcel.current.cursor = e.target;
                            jexcel.current.cursor.style.cursor = 'move';
                        }
                    }
                }
            }
        }
    }
    
    jexcel.mouseOverControls = function(e) {
        e = e || window.event;
        if (e.buttons) {
            var mouseButton = e.buttons;
        } else if (e.button) {
            var mouseButton = e.button;
        } else {
            var mouseButton = e.which;
        }
    
        if (! mouseButton) {
            jexcel.isMouseAction = false;
        }
    
        if (jexcel.current && jexcel.isMouseAction == true) {
            // Get elements
            var jexcelTable = jexcel.getElement(e.target);
    
            if (jexcelTable[0]) {
                // Avoid cross reference
                if (jexcel.current != jexcelTable[0].jexcel) {
                    if (jexcel.current) {
                        return false;
                    }
                }
    
                var columnId = e.target.getAttribute('data-x');
                var rowId = e.target.getAttribute('data-y');
                if (jexcel.current.resizing || jexcel.current.dragging) {
                } else {
                    // Header found
                    if (jexcelTable[1] == 1) {
                        if (jexcel.current.selectedHeader) {
                            var columnId = e.target.getAttribute('data-x');
                            var o = jexcel.current.selectedHeader;
                            var d = columnId;
                            // Update selection
                            jexcel.current.updateSelectionFromCoords(o, 0, d, jexcel.current.options.data.length - 1);
                        }
                    }
    
                    // Body found
                    if (jexcelTable[1] == 2) {
                        if (e.target.classList.contains('jexcel_row')) {
                            if (jexcel.current.selectedRow) {
                                var o = jexcel.current.selectedRow;
                                var d = rowId;
                                // Update selection
                                jexcel.current.updateSelectionFromCoords(0, o, jexcel.current.options.data[0].length - 1, d);
                            }
                        } else {
                            // Do not select edtion is in progress
                            if (! jexcel.current.edition) {
                                if (columnId && rowId) {
                                    if (jexcel.current.selectedCorner) {
                                        jexcel.current.updateCopySelection(columnId, rowId);
                                    } else {
                                        if (jexcel.current.selectedCell) {
                                            jexcel.current.updateSelectionFromCoords(jexcel.current.selectedCell[0], jexcel.current.selectedCell[1], columnId, rowId);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    
        // Clear any time control
        if (jexcel.timeControl) {
            clearTimeout(jexcel.timeControl);
            jexcel.timeControl = null;
        }
    }
    
    /**
     * Double click event handler: controls the double click in the corner, cell edition or column re-ordering.
     */
    jexcel.doubleClickControls = function(e) {
        // Jexcel is selected
        if (jexcel.current) {
            // Corner action
            if (e.target.classList.contains('jexcel_corner')) {
                // Any selected cells
                if (jexcel.current.highlighted.length > 0) {
                    // Copy from this
                    var x1 = jexcel.current.highlighted[0].getAttribute('data-x');
                    var y1 = parseInt(jexcel.current.highlighted[jexcel.current.highlighted.length - 1].getAttribute('data-y')) + 1;
                    // Until this
                    var x2 = jexcel.current.highlighted[jexcel.current.highlighted.length - 1].getAttribute('data-x');
                    var y2 = jexcel.current.records.length - 1
                    // Execute copy
                    jexcel.current.copyData(jexcel.current.records[y1][x1], jexcel.current.records[y2][x2]);
                }
            } else if (e.target.classList.contains('jexcel_column_filter')) {
                // Column
                var columnId = e.target.getAttribute('data-x');
                // Open filter
                jexcel.current.openFilter(columnId);
                
            } else {
                // Get table
                var jexcelTable = jexcel.getElement(e.target);
    
                // Double click over header
                if (jexcelTable[1] == 1 && jexcel.current.options.columnSorting == true) {
                    // Check valid column header coords
                    var columnId = e.target.getAttribute('data-x');
                    if (columnId) {
                        jexcel.current.orderBy(columnId);
                    }
                }
    
                // Double click over body
                if (jexcelTable[1] == 2 && jexcel.current.options.editable == true) {
                    if (! jexcel.current.edition) {
                        var getCellCoords = function(element) {
                            if (element.parentNode) {
                                var x = element.getAttribute('data-x');
                                var y = element.getAttribute('data-y');
                                if (x && y) {
                                    return element;
                                } else {
                                    return getCellCoords(element.parentNode);
                                }
                            }
                        }
                        var cell = getCellCoords(e.target);
                        if (cell && cell.classList.contains('highlight')) {
                            jexcel.current.openEditor(cell);
                        }
                    }
                }
            }
        }
    }
    
    jexcel.copyControls = function(e) {
        if (jexcel.current && jexcel.copyControls.enabled) {
            if (! jexcel.current.edition) {
                jexcel.current.copy(true);
            }
        }
    }
    
    jexcel.cutControls = function(e) {
        if (jexcel.current) {
            if (! jexcel.current.edition) {
                jexcel.current.copy(true);
                if (jexcel.current.options.editable == true) {
                    jexcel.current.setValue(jexcel.current.highlighted, '');
                }
            }
        }
    }
    
    jexcel.pasteControls = function(e) {
        if (jexcel.current && jexcel.current.selectedCell) {
            if (! jexcel.current.edition) {
                if (jexcel.current.options.editable == true) {
                    if (e && e.clipboardData) {
                        jexcel.current.paste(jexcel.current.selectedCell[0], jexcel.current.selectedCell[1], e.clipboardData.getData('text'));
                        e.preventDefault();
                    } else if (window.clipboardData) {
                        jexcel.current.paste(jexcel.current.selectedCell[0], jexcel.current.selectedCell[1], window.clipboardData.getData('text'));
                    }
                }
            }
        }
    }
    
    jexcel.contextMenuControls = function(e) {
        e = e || window.event;
        if ("buttons" in e) {
            var mouseButton = e.buttons;
        } else {
            var mouseButton = e.which || e.button;
        }
    
        if (jexcel.current) {
            if (jexcel.current.edition) {
                e.preventDefault();
            } else if (jexcel.current.options.contextMenu) {
                jexcel.current.contextMenu.contextmenu.close();
    
                if (jexcel.current) {
                    var x = e.target.getAttribute('data-x');
                    var y = e.target.getAttribute('data-y');
    
                    if (x || y) {
                        if ((x < parseInt(jexcel.current.selectedCell[0])) || (x > parseInt(jexcel.current.selectedCell[2])) ||
                            (y < parseInt(jexcel.current.selectedCell[1])) || (y > parseInt(jexcel.current.selectedCell[3])))
                        {
                            jexcel.current.updateSelectionFromCoords(x, y, x, y);
                        }

                        // Table found
                        var items = jexcel.current.options.contextMenu(jexcel.current, x, y, e);
                        // The id is depending on header and body
                        jexcel.current.contextMenu.contextmenu.open(e, items);
                        // Avoid the real one
                        e.preventDefault();
                    }
                }
            }
        }
    }

    jexcel.touchStartControls = function(e) {
        var jexcelTable = jexcel.getElement(e.target);
    
        if (jexcelTable[0]) {
            if (jexcel.current != jexcelTable[0].jexcel) {
                if (jexcel.current) {
                    jexcel.current.resetSelection();
                }
                jexcel.current = jexcelTable[0].jexcel;
            }
        } else {
            if (jexcel.current) {
                jexcel.current.resetSelection();
                jexcel.current = null;
            }
        }
    
        if (jexcel.current) {
            if (! jexcel.current.edition) {
                var columnId = e.target.getAttribute('data-x');
                var rowId = e.target.getAttribute('data-y');
    
                if (columnId && rowId) {
                    jexcel.current.updateSelectionFromCoords(columnId, rowId);
    
                    jexcel.timeControl = setTimeout(function() {
                        // Keep temporary reference to the element
                        if (jexcel.current.options.columns[columnId].type == 'color') {
                            jexcel.tmpElement = null;
                        } else {
                            jexcel.tmpElement = e.target;
                        }
                        jexcel.current.openEditor(e.target, false, e);
                    }, 500);
                }
            }
        }
    }
    
    jexcel.touchEndControls = function(e) {
        // Clear any time control
        if (jexcel.timeControl) {
            clearTimeout(jexcel.timeControl);
            jexcel.timeControl = null;
            // Element
            if (jexcel.tmpElement && jexcel.tmpElement.children[0].tagName == 'INPUT') {
                jexcel.tmpElement.children[0].focus();
            }
            jexcel.tmpElement = null;
        }
    }
    
    /**
     * Jexcel extensions
     */
    
    jexcel.tabs = function(tabs, result) {
        var instances = [];
        // Create tab container
        if (! tabs.classList.contains('jexcel_tabs')) {
            tabs.innerHTML = '';
            tabs.classList.add('jexcel_tabs')
            tabs.jexcel = [];

            var div = document.createElement('div');
            var headers = tabs.appendChild(div);
            var div = document.createElement('div');
            var content = tabs.appendChild(div);
        } else {
            var headers = tabs.children[0];
            var content = tabs.children[1];
        }

        var spreadsheet = []
        var link = [];
        for (var i = 0; i < result.length; i++) {
            // Spreadsheet container
            spreadsheet[i] = document.createElement('div');
            spreadsheet[i].classList.add('jexcel_tab');
            var worksheet = jexcel(spreadsheet[i], result[i]);
            content.appendChild(spreadsheet[i]);
            instances[i] = tabs.jexcel.push(worksheet);

            // Tab link
            link[i] = document.createElement('div');
            link[i].classList.add('jexcel_tab_link');
            link[i].setAttribute('data-spreadsheet', tabs.jexcel.length-1);
            link[i].innerHTML = result[i].sheetName;
            link[i].onclick = function() {
                for (var j = 0; j < headers.children.length; j++) {
                    headers.children[j].classList.remove('selected');
                    content.children[j].style.display = 'none';
                }
                var i = this.getAttribute('data-spreadsheet');
                content.children[i].style.display = 'block';
                headers.children[i].classList.add('selected')
            }
            headers.appendChild(link[i]);
        }

        // First tab
        for (var j = 0; j < headers.children.length; j++) {
            headers.children[j].classList.remove('selected');
            content.children[j].style.display = 'none';
        }
        headers.children[headers.children.length - 1].classList.add('selected');
        content.children[headers.children.length - 1].style.display = 'block';

        return instances;
    }

    // Compability to older versions
    jexcel.createTabs = jexcel.tabs;

    jexcel.fromSpreadsheet = function(file, __callback) {
        var convert = function(workbook) {
            var spreadsheets = [];
            workbook.SheetNames.forEach(function(sheetName) {
                var spreadsheet = {};
                spreadsheet.rows = [];
                spreadsheet.columns = [];
                spreadsheet.data = [];
                spreadsheet.style = {};
                spreadsheet.sheetName = sheetName;
    
                // Column widths
                var temp = workbook.Sheets[sheetName]['!cols'];
                if (temp && temp.length) {
                    for (var i = 0; i < temp.length; i++) {
                        spreadsheet.columns[i] = {};
                        if (temp[i] && temp[i].wpx) {
                            spreadsheet.columns[i].width = temp[i].wpx + 'px';
                        }
                     }
                }
                // Rows heights
                var temp = workbook.Sheets[sheetName]['!rows'];
                if (temp && temp.length) {
                    for (var i = 0; i < temp.length; i++) {
                        if (temp[i] && temp[i].hpx) {
                            spreadsheet.rows[i] = {};
                            spreadsheet.rows[i].height = temp[i].hpx + 'px';
                        }
                    }
                }
                // Merge cells
                var temp = workbook.Sheets[sheetName]['!merges'];
                if (temp && temp.length > 0) {
                    spreadsheet.mergeCells = [];
                    for (var i = 0; i < temp.length; i++) {
                        var x1 = temp[i].s.c;
                        var y1 = temp[i].s.r;
                        var x2 = temp[i].e.c;
                        var y2 = temp[i].e.r;
                        var key = jexcel.getColumnNameFromId([x1,y1]);
                        spreadsheet.mergeCells[key] = [ x2-x1+1, y2-y1+1 ];
                    }
                }
                // Data container
                var max_x = 0;
                var max_y = 0;
                var temp = Object.keys(workbook.Sheets[sheetName]);
                for (var i = 0; i < temp.length; i++) {
                    if (temp[i].substr(0,1) != '!') {
                        var cell = workbook.Sheets[sheetName][temp[i]];
                        var info = jexcel.getIdFromColumnName(temp[i], true);
                        if (! spreadsheet.data[info[1]]) {
                            spreadsheet.data[info[1]] = [];
                        }
                        spreadsheet.data[info[1]][info[0]] = cell.f ? '=' + cell.f : cell.w;
                        if (max_x < info[0]) {
                            max_x = info[0];
                        }
                        if (max_y < info[1]) {
                            max_y = info[1];
                        }
                        // Style
                        if (cell.style && Object.keys(cell.style).length > 0) {
                            spreadsheet.style[temp[i]] = cell.style;
                        }
                        if (cell.s && cell.s.fgColor) {
                            if (spreadsheet.style[temp[i]]) {
                                spreadsheet.style[temp[i]] += ';';
                            }
                            spreadsheet.style[temp[i]] += 'background-color:#' + cell.s.fgColor.rgb;
                        }
                    }
                }
                var numColumns = spreadsheet.columns;
                for (var j = 0; j <= max_y; j++) {
                    for (var i = 0; i <= max_x; i++) {
                        if (! spreadsheet.data[j]) {
                            spreadsheet.data[j] = [];
                        }
                        if (! spreadsheet.data[j][i]) {
                            if (numColumns < i) {
                                spreadsheet.data[j][i] = '';
                            }
                        }
                    }
                }
                spreadsheets.push(spreadsheet);
            });
    
            return spreadsheets;
        }
    
        var oReq;
        oReq = new XMLHttpRequest();
        oReq.open("GET", file, true);
    
        if(typeof Uint8Array !== 'undefined') {
            oReq.responseType = "arraybuffer";
            oReq.onload = function(e) {
                var arraybuffer = oReq.response;
                var data = new Uint8Array(arraybuffer);
                var wb = XLSX.read(data, {type:"array", cellFormula:true, cellStyles:true });
                __callback(convert(wb))
            };
        } else {
            oReq.setRequestHeader("Accept-Charset", "x-user-defined");  
            oReq.onreadystatechange = function() { if(oReq.readyState == 4 && oReq.status == 200) {
                var ff = convertResponseBodyToText(oReq.responseBody);
                var wb = XLSX.read(ff, {type:"binary", cellFormula:true, cellStyles:true });
                __callback(convert(wb))
            }};
        }
    
        oReq.send();
    }
    
    /**
     * Valid international letter
     */
    
    jexcel.validLetter = function (text) {
        var regex = /([\u0041-\u005A\u0061-\u007A\u00AA\u00B5\u00BA\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0\u08A2-\u08AC\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097F\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C33\u0C35-\u0C39\u0C3D\u0C58\u0C59\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D60\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F4\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191C\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19C1-\u19C7\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FCC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA697\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA78E\uA790-\uA793\uA7A0-\uA7AA\uA7F8-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA80-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uABC0-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC-\u0400-\u04FF']+)/g;
        return text.match(regex) ? 1 : 0;
    }
    
    /**
     * Helper injectArray
     */
    jexcel.injectArray = function(o, idx, arr) {
        return o.slice(0, idx).concat(arr).concat(o.slice(idx));
    }
    
    /**
     * Get letter based on a number
     * 
     * @param integer i
     * @return string letter
     */
    jexcel.getColumnName = function(i) {
        var letter = '';
        if (i > 701) {
            letter += String.fromCharCode(64 + parseInt(i / 676));
            letter += String.fromCharCode(64 + parseInt((i % 676) / 26));
        } else if (i > 25) {
            letter += String.fromCharCode(64 + parseInt(i / 26));
        }
        letter += String.fromCharCode(65 + (i % 26));
    
        return letter;
    }
    
    /**
     * Convert excel like column to jexcel id
     * 
     * @param string id
     * @return string id
     */
    jexcel.getIdFromColumnName = function (id, arr) {
        // Get the letters
        var t = /^[a-zA-Z]+/.exec(id);
    
        if (t) {
            // Base 26 calculation
            var code = 0;
            for (var i = 0; i < t[0].length; i++) {
                code += parseInt(t[0].charCodeAt(i) - 64) * Math.pow(26, (t[0].length - 1 - i));
            }
            code--;
            // Make sure jexcel starts on zero
            if (code < 0) {
                code = 0;
            }
    
            // Number
            var number = parseInt(/[0-9]+$/.exec(id));
            if (number > 0) {
                number--;
            }
    
            if (arr == true) {
                id = [ code, number ];
            } else {
                id = code + '-' + number;
            }
        }
    
        return id;
    }
    
    /**
     * Convert jexcel id to excel like column name
     * 
     * @param string id
     * @return string id
     */
    jexcel.getColumnNameFromId = function (cellId) {
        if (! Array.isArray(cellId)) {
            cellId = cellId.split('-');
        }
    
        return jexcel.getColumnName(parseInt(cellId[0])) + (parseInt(cellId[1]) + 1);
    }
    
    /**
     * Verify element inside jexcel table
     * 
     * @param string id
     * @return string id
     */
    jexcel.getElement = function(element) {
        var jexcelSection = 0;
        var jexcelElement = 0;
    
        function path (element) {
            if (element.className) {
                if (element.classList.contains('jexcel_container')) {
                    jexcelElement = element;
                }
            }
    
            if (element.tagName == 'THEAD') {
                jexcelSection = 1;
            } else if (element.tagName == 'TBODY') {
                jexcelSection = 2;
            }
    
            if (element.parentNode) {
                if (! jexcelElement) {
                    path(element.parentNode);
                }
            }
        }
    
        path(element);
    
        return [ jexcelElement, jexcelSection ];
    }

    jexcel.doubleDigitFormat = function(v) {
        v = ''+v;
        if (v.length == 1) {
            v = '0'+v;
        }
        return v;
    }

    jexcel.createFromTable = function(el, options) {
        if (el.tagName != 'TABLE') {
            console.log('Element is not a table');
        } else {
            // Configuration
            if (! options) {
                options = {};
            }
            options.columns = [];
            options.data = [];

            // Colgroup
            var colgroup = el.querySelectorAll('colgroup > col');
            if (colgroup.length) {
                // Get column width
                for (var i = 0; i < colgroup.length; i++) {
                    var width = colgroup[i].style.width;
                    if (! width) {
                        var width = colgroup[i].getAttribute('width');
                    }
                    // Set column width
                    if (width) {
                        if (! options.columns[i]) {
                            options.columns[i] = {}
                        }
                        options.columns[i].width = width;
                    }
                }
            }

            // Parse header
            var parseHeader = function(header) {
                // Get width information
                var info = header.getBoundingClientRect();
                var width = info.width > 50 ? info.width : 50;

                // Create column option
                if (! options.columns[i]) {
                    options.columns[i] = {};
                } 
                if (header.getAttribute('data-celltype')) {
                    options.columns[i].type = header.getAttribute('data-celltype');
                } else {
                    options.columns[i].type = 'text';
                }
                options.columns[i].width = width + 'px';
                options.columns[i].title = header.innerHTML;
                options.columns[i].align = header.style.textAlign || 'center';

                if (info = header.getAttribute('name')) {
                    options.columns[i].name = info;
                }
                if (info = header.getAttribute('id')) {
                    options.columns[i].id = info;
                }
            }

            // Headers
            var nested = [];
            var headers = el.querySelectorAll(':scope > thead > tr');
            if (headers.length) {
                for (var j = 0; j < headers.length - 1; j++) {
                    var cells = [];
                    for (var i = 0; i < headers[j].children.length; i++) {
                        var row = {
                            title: headers[j].children[i].innerText,
                            colspan: headers[j].children[i].getAttribute('colspan') || 1,
                        };
                        cells.push(row);
                    }
                    nested.push(cells);
                }
                // Get the last row in the thead
                headers = headers[headers.length-1].children;
                // Go though the headers
                for (var i = 0; i < headers.length; i++) {
                    parseHeader(headers[i]);
                }
            }

            // Content
            var rowNumber = 0;
            var mergeCells = {};
            var rows = {};
            var style = {};
            var classes = {};

            var content = el.querySelectorAll(':scope > tr, :scope > tbody > tr');
            for (var j = 0; j < content.length; j++) {
                options.data[rowNumber] = [];
                if (options.parseTableFirstRowAsHeader == true && ! headers.length && j == 0) {
                    for (var i = 0; i < content[j].children.length; i++) {
                        parseHeader(content[j].children[i]);
                    }
                } else {
                    for (var i = 0; i < content[j].children.length; i++) {
                        // WickedGrid formula compatibility
                        var value = content[j].children[i].getAttribute('data-formula');
                        if (value) {
                            if (value.substr(0,1) != '=') {
                                value = '=' + value;
                            }
                        } else {
                            var value = content[j].children[i].innerHTML;
                        }
                        options.data[rowNumber].push(value);

                        // Key
                        var cellName = jexcel.getColumnNameFromId([ i, j ]);

                        // Classes
                        var tmp = content[j].children[i].getAttribute('class');
                        if (tmp) {
                            classes[cellName] = tmp;
                        }

                        // Merged cells
                        var mergedColspan = parseInt(content[j].children[i].getAttribute('colspan')) || 0;
                        var mergedRowspan = parseInt(content[j].children[i].getAttribute('rowspan')) || 0;
                        if (mergedColspan || mergedRowspan) {
                            mergeCells[cellName] = [ mergedColspan || 1, mergedRowspan || 1 ];
                        }

                        // Avoid problems with hidden cells
                        if (s = content[j].children[i].style && content[j].children[i].style.display == 'none') {
                            content[j].children[i].style.display = '';
                        }
                        // Get style
                        var s = content[j].children[i].getAttribute('style');
                        if (s) {
                            style[cellName] = s;
                        }
                        // Bold
                        if (content[j].children[i].classList.contains('styleBold')) {
                            if (style[cellName]) {
                                style[cellName] += '; font-weight:bold;';
                            } else {
                                style[cellName] = 'font-weight:bold;';
                            }
                        }
                    }

                    // Row Height
                    if (content[j].style && content[j].style.height) {
                        rows[j] = { height: content[j].style.height };
                    }

                    // Index
                    rowNumber++;
                }
            }

            // Nested
            if (Object.keys(nested).length > 0) {
                options.nestedHeaders = nested;
            }
            // Style
            if (Object.keys(style).length > 0) {
                options.style = style;
            }
            // Merged
            if (Object.keys(mergeCells).length > 0) {
                options.mergeCells = mergeCells;
            }
            // Row height
            if (Object.keys(rows).length > 0) {
                options.rows = rows;
            }
            // Classes
            if (Object.keys(classes).length > 0) {
                options.classes = classes;
            }

            var content = el.querySelectorAll('tfoot tr');
            if (content.length) {
                var footers = [];
                for (var j = 0; j < content.length; j++) {
                    var footer = [];
                    for (var i = 0; i < content[j].children.length; i++) {
                        footer.push(content[j].children[i].innerText);
                    }
                    footers.push(footer);
                }
                if (Object.keys(footers).length > 0) {
                    options.footers = footers;
                }
            }
            // TODO: data-hiddencolumns="3,4"
            
            // I guess in terms the better column type
            if (options.parseTableAutoCellType == true) {
                var pattern = [];
                for (var i = 0; i < options.columns.length; i++) {
                    var test = true;
                    var testCalendar = true;
                    pattern[i] = [];
                    for (var j = 0; j < options.data.length; j++) {
                        var value = options.data[j][i];
                        if (! pattern[i][value]) {
                            pattern[i][value] = 0;
                        }
                        pattern[i][value]++;
                        if (value.length > 25) {
                            test = false;
                        }
                        if (value.length == 10) {
                            if (! (value.substr(4,1) == '-' && value.substr(7,1) == '-')) {
                                testCalendar = false;
                            }
                        } else {
                            testCalendar = false;
                        }
                    }

                    var keys = Object.keys(pattern[i]).length;
                    if (testCalendar) {
                        options.columns[i].type = 'calendar';
                    } else if (test == true && keys > 1 && keys <= parseInt(options.data.length * 0.1)) {
                        options.columns[i].type = 'dropdown';
                        options.columns[i].source = Object.keys(pattern[i]);
                    }
                }
            }

            return options;
        }
    }

    /**
     * Jquery Support
     */
    if (typeof(jQuery) != 'undefined') {
        (function($){
            $.fn.jspreadsheet = $.fn.jexcel = function(mixed) {
                var spreadsheetContainer = $(this).get(0);
                if (! spreadsheetContainer.jexcel) {
                    return jexcel($(this).get(0), arguments[0]);
                } else {
                    if (Array.isArray(spreadsheetContainer.jexcel)) {
                        return spreadsheetContainer.jexcel[mixed][arguments[1]].apply(this, Array.prototype.slice.call( arguments, 2 ));
                    } else {
                        return spreadsheetContainer.jexcel[mixed].apply(this, Array.prototype.slice.call( arguments, 1 ));
                    }
                }
            };
    
        })(jQuery);
    }

    return jexcel;
})));

},{"jsuites":1}]},{},[2])(2)
});
