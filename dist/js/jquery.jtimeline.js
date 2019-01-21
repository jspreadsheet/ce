/**
 * (c) 2013 jTimeline (jTools v1.1)
 * https://github.com/paulhodel/jtools
 *
 * @author: Paul Hodel <paul.hodel@gmail.com>
 * @description: Generate beautiful timelines
 */

(function( $ ) {

    var methods = {

    /**
     * Bind the changes tracking to a form HTML element
     * @param {Object} options : default options
     * @return void
     */

    init : function(options) { 

        // Defaults
        var date = new Date();
        date = date.getFullYear() + '-' + (date.getMonth() < 10 ? '0' + date.getMonth() + 1 : date.getMonth() + 1);

        var defaults = {
            date: date,
            months: [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ],
            monthsFull: [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ],
        };

        // Main form HTML container element : track all form elements inside
        var main = $(this);

        // Default configuration
        var options =  $.extend(defaults, options);

        // Date
        var d = options.date.split('-');

        // Main object
        var id = $(this).prop('id');

        // Add class
        $(this).addClass('jtimeline');

        // Header
        var timelineHeader = document.createElement('div');
        timelineHeader.className = 'jtimeline-header';

        var timelineLabel = document.createElement('div');
        timelineLabel.className = 'jtimeline-label';

        var timelineNavigation = document.createElement('div');
        timelineNavigation.className = 'jtimeline-navigation';

        // Labels 
        var timelineMonth = document.createElement('div');
        timelineMonth.className = 'jtimeline-month';
        timelineMonth.innerHTML = 'December';
        timelineLabel.appendChild(timelineMonth);

        var timelineYear = document.createElement('div');
        timelineYear.className = 'jtimeline-year';
        timelineYear.innerHTML = d[0];
        timelineLabel.appendChild(timelineYear);

        // Navigation
        var timelinePrev = document.createElement('div');
        timelinePrev.className = 'jtimeline-prev';
        timelinePrev.innerHTML = '<i class="material-icons">keyboard_arrow_left</i>';
        timelineNavigation.appendChild(timelinePrev);

        var timelineNext = document.createElement('div');
        timelineNext.className = 'jtimeline-next';
        timelineNext.innerHTML = '<i class="material-icons">keyboard_arrow_right</i>';
        timelineNavigation.appendChild(timelineNext);

        timelineHeader.appendChild(timelineLabel);
        timelineHeader.appendChild(timelineNavigation);

        // Data container
        var timelineContainer = document.createElement('div');
        timelineContainer.className = 'jtimeline-container';

        // Append headers
        $(this).append(timelineHeader);
        $(this).append(timelineContainer);

        // Handlers
        if (! $.fn.jtimeline.configuration) {
            // Data container
            $.fn.jtimeline.configuration = [];

            var timelineClick = function(e) {
                if ($(e.target).hasClass('jtimeline-next') || $(e.target).parent().hasClass('jtimeline-next')) {
                    $(main).jtimeline('next');
                } else if ($(e.target).hasClass('jtimeline-prev') || $(e.target).parent().hasClass('jtimeline-prev')) {
                    $(main).jtimeline('prev');
                }
            }
            $(document).on('click', timelineClick);
        }

        // Prepare data
        var data = [];
        $.each(options.data, function(k, v) {
            var d = v.date.substr(0,7);

            // Create the object if not exists
            if (! data[d]) {
                data[d] = [];
            }

            // Create array
            data[d].push(v);
        });

        // Data
        options.data = data;

        // Date
        if (options.date.length > 7) {
            options.date = options.date.substr(0, 7)
        }

        // Configuration
        $.fn.jtimeline.configuration[id] = options;

        // Search
        $(this).jtimeline('render', options.date);
    },

    data : function(data) {
        var id = $(this).prop('id');

        // Define new data
        $.fn.jtimeline.configuration[id].data = data;

        // Render data
        $(this).jtimeline('render', $.fn.jtimeline.configuration[id].date.substr(0, 7));
    },

    /**
     * Render data by date
     */
    render : function(date)
    {
        // Main
        var main = $(this);

        // Date
        var id = $(this).prop('id');

        // Filter
        if (date.length > 7) {
            var date = date.substr(0,7);
        }

        // Update current date
        $.fn.jtimeline.configuration[id].date = date;

        // Container
        var container = $(main).find('.jtimeline-container');

        // Reset data
        $(container).html('');

        // Itens
        $.each($.fn.jtimeline.configuration[id].data[date], function(k, v) {
            var d = v.date.split('-');

            // Item container
            var timelineItem = document.createElement('div');
            timelineItem.className = 'jtimeline-item';

            // Date
            var timelineDateContainer = document.createElement('div');
            timelineDateContainer.className = 'jtimeline-date-container';

            var timelineDate = document.createElement('div');
            timelineDate.className = 'jtimeline-date';
            timelineDate.innerHTML = d[2];
            timelineDateContainer.appendChild(timelineDate);

            var timelineContent = document.createElement('div');
            timelineContent.className = 'jtimeline-content';

            var timelineTitle = document.createElement('div');
            timelineTitle.className = 'jtimeline-title';
            timelineTitle.innerHTML = v.title;
            timelineContent.appendChild(timelineTitle);

            var timelineSubtitle = document.createElement('div');
            timelineSubtitle.className = 'jtimeline-subtitle';
            timelineSubtitle.innerHTML = v.subtitle;
            timelineContent.appendChild(timelineSubtitle);

            var timelineText = document.createElement('div');
            timelineText.className = 'jtimeline-text';
            timelineText.innerHTML = v.text;
            timelineContent.appendChild(timelineText);

            timelineItem.appendChild(timelineDateContainer);
            timelineItem.appendChild(timelineContent);

            $(container).append(timelineItem);
        });

        // Update labels
        
    },

    next : function()
    {
    	// Main
        var main = $(this);

        // Date
        var id = $(this).prop('id');

        // Filter
        var date = $.fn.jtimeline.configuration[id].date;

        // Update current date
        var d = date.split('-');

        // Next month
        d[1]++;

        // Next year
        if (d[1] > 12) {
            d[0]++;
            d[1] = 1;
        }

        date = d[0] + '-' + (d[1] < 10 ? '0' + d[1] : d[1]);

        $(this).jtimeline('render', date);
    },

    prev : function()
    {
        // Main
        var main = $(this);

        // Date
        var id = $(this).prop('id');

        // Filter
        var date = $.fn.jtimeline.configuration[id].date;

        // Update current date
        var d = date.split('-');

        // Next month
        d[1]--;

        // Next year
        if (d[1] < 1) {
            d[0]--;
            d[1] = 12;
        }

        date = d[0] + '-' + (d[1] < 10 ? '0' + d[1] : d[1]);

        $(this).jtimeline('render', date);
    },
};

$.fn.jtimeline = function( method ) {

    if ( methods[method] ) {
        return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
        return methods.init.apply( this, arguments );
    } else {
        $.error( 'Method ' +  method + ' does not exist on jQuery.tooltip' );
    }  
};

$.fn.jtimeline.configuration = null;

})( jQuery );