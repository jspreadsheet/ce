/**
 * (c) 2013 jDropdown
 * https://github.com/paulhodel/jdropdown
 *
 * @author: Paul Hodel <paul.hodel@gmail.com>
 * @description: Custom dropdown
 */

(function( $ ) {

    var methods = {

        init : function(options) { 

            var defaults = {
                 data: [],
                 multiple: false,
                 autocomplete: false,
                 width: 200,
                 currentIndex: 0,
            };

            // Main form HTML container element : track all form elements inside
            var main = $(this);

            // Default configuration
            var options =  $.extend(defaults, options);

            // Main object
            var id = $(this).prop('id');

            // Save configuration
            $.fn.jdropdown.configuration[id] = options;

            // Properties
            $(this).addClass('jdropdown');
            $(this).css('width', options.width);

            // Header
            var header = document.createElement('input');
            $(header).prop('class', 'jdropdown-header');

            var container = document.createElement('div');
            $(container).prop('class', 'jdropdown-container');

            var content = document.createElement('div');
            $(content).prop('class', 'jdropdown-content');

            // Multiple dropdown
            if (options.multiple == true) {
                $(this).data('multiple', true);
            }

            // Autocomplete
            if (options.autocomplete == true) {
                $(this).data('autocomplete', true);
                $(header).prop('placeholder', 'Search...');

                // Handler
                $(header).on('keyup', function(e) {
                    $(main).jdropdown('find', $(this).val());
                });
            } else {
                $(header).prop('readonly', 'readonly');
            }

            // Append options
            var groups = {};
            $.each($.fn.jdropdown.configuration[id].data, function(k, v) {
                // Create item
                var item = document.createElement('div');
                $(item).prop('class', 'jdropdown-item');
                $(item).data('value', v.id);
                $(item).html(v.name);
                //var item = '<div class="jdropdown-item" data-value="' + v.id + '">' + v.name + '</div>';

                // Append to the container
                if (v.group) {
                    if (! groups[v.group]) {
                        groups[v.group] = document.createElement('div');
                        $(groups[v.group]).prop('class', 'jdropdown-group');
                        $(groups[v.group]).html('<div class="jdropdown-group-name">' + v.group + '</div>');
                    }
                    $(groups[v.group]).append(item);
                } else {
                    $(content).append(item);
                }
            });

            // Append groups in case exists
            if ($(groups).length > 0) {
                $.each(groups, function(k, v) {
                    $(content).append(v);
                });
            }

            // Create index data
            var items = $(content).find('.jdropdown-item');
            $.each(items, function(k, v) {
                $(v).data('index', k);
            });

            // Append elements
            $(this).append(header);
            $(container).append(content);
            $(this).append(container);

            // Fix width - Workaround important to get the correct width
            setTimeout(function() { 
                $(container).css('min-width', $(header).outerWidth());
            }, 0);

            // Handlers
            if (! $.fn.jdropdown.onclick) {
                $.fn.jdropdown.onclick = function(e) {
                    var dropdown = $(e.target).parents('.jdropdown');

                    if (! $(dropdown).length) {
                        if ($.fn.jdropdown.current) {
                            // Remove focus
                            $($.fn.jdropdown.current).removeClass('jdropdown-focus');
                            // Update labels
                            $($.fn.jdropdown.current).jdropdown('updateLabel');
                            // Reset
                            $.fn.jdropdown.current = null
                        }
                    } else {
                        // Get id
                        var id = $(dropdown).prop('id');

                        // Current dropdown
                        $.fn.jdropdown.current = dropdown;

                        // Focus
                        if (! $(dropdown).hasClass('jdropdown-focus')) {
                            // Add focus
                            $(dropdown).addClass('jdropdown-focus');
                            // Filter
                            if ($(dropdown).data('autocomplete') == true) {
                                // Clear search field
                                $(dropdown).find('.jdropdown-header').val('');
                                // Redo search
                                $(dropdown).jdropdown('find', null);
                            }
                            // Selected
                            var selected = $(dropdown).find('.jdropdown-selected');
                            // Update index
                            $.fn.jdropdown.configuration[id].currentIndex = $(selected).length > 0 ? $(selected[0]).data('index') : 0;
                            // Update position
                            $(dropdown).jdropdown('updateCursorPosition');
                        }

                        if ($(e.target).hasClass('jdropdown-item')) {
                            // Select item
                            $(dropdown).jdropdown('selectIndex', $(e.target).data('index'));
                        }
                    }
                }

                $(document).on('click', $.fn.jdropdown.onclick);

                $.fn.jdropdown.onkeydown = function(e) {
                    if ($.fn.jdropdown.current) {
                        if (e.which == 13) {
                            // Select item
                            $($.fn.jdropdown.current).jdropdown('selectIndex', $.fn.jdropdown.configuration[id].currentIndex);
                        } else if (e.which == 38 || e.which == 40) {
                            // Get options
                            var dropDownOptions = $($.fn.jdropdown.current).find('.jdropdown-item');
                            // Remove current option
                            $(dropDownOptions[$.fn.jdropdown.configuration[id].currentIndex]).removeClass('jdropdown-cursor');
                            // Move cursor
                            if (e.which == 38) {
                                if ($.fn.jdropdown.configuration[id].currentIndex > 0) {
                                    $.fn.jdropdown.configuration[id].currentIndex--;
                                }
                            } else if (e.which == 40) {
                                if ($.fn.jdropdown.configuration[id].currentIndex + 1 < $(dropDownOptions).length) {
                                    $.fn.jdropdown.configuration[id].currentIndex++;
                                }
                            }
                            // Highlight current item
                            $(dropDownOptions[$.fn.jdropdown.configuration[id].currentIndex]).addClass('jdropdown-cursor');
                            // Update cursor position
                            $($.fn.jdropdown.current).jdropdown('updateCursorPosition');
                            // Cancel bubble
                            e.stopPropagation();
                            e.preventDefault();
                        }
                    }
                }

                $(document).on('keydown', $.fn.jdropdown.onkeydown);
            }
        },

        /**
         * Get value
         */
        getValue : function(asArray) {
            // Get selected items
            var itens = $(this).find('.jdropdown-item.jdropdown-selected');
            // Result
            var result = [];
            // Append options
            $.each(itens, function(k, v) {
                result.push($(v).data('value'));
            });
            
            if (asArray) {
                return result
            } else {
                return result.join(';');
            }
        },

        /**
         * Update scroll
         */
        updateCursorPosition : function() {
            if ($.fn.jdropdown.current) {
                var id = $(this).prop('id');
                var dropDownOptions = $($.fn.jdropdown.current).find('.jdropdown-item');
                var container = $(this).find('.jdropdown-content').scrollTop();
                var element = $(dropDownOptions[$.fn.jdropdown.configuration[id].currentIndex]).position().top
                $(this).find('.jdropdown-content').scrollTop(container + element - 85);
            }
        },

        /**
         * Set value
         */
        setValue : function(value) {
            var id = $(this).prop('id');
            // Item
            var item = null;
            // Set values
            if (value.length > 0) {
                value.forEach(function(v) {
                    item = $('#' + id + ' [data-value=' + v + ']');
                    $(item).addClass('jdropdown-selected');
                });
            } else {
                item = $('#' + id + ' [data-value=' + value + ']');
                $(item).addClass('jdropdown-selected');
            }
            // Cursor
            $.fn.jdropdown.configuration[id].currentIndex = $(item).data('index');
            // Update labels
            $(this).jdropdown('updateLabel');
            // Update cursor position
            $(this).jdropdown('updateCursorPosition');
        },

        /**
         * Select an item
         */
        selectIndex : function(index) {
            // Get id
            var id = $(this).prop('id');
            // Get all options
            var dropDownOptions = $(this).find('.jdropdown-item');
            // Focus behaviour
            if (! $(this).data('multiple')) {
                // Remove selection from the current value if exists
                $(dropDownOptions).removeClass('jdropdown-selected');
                // Select item
                $(dropDownOptions[index]).addClass('jdropdown-selected');
                // Update labels
                $(this).jdropdown('updateLabel');
                // Element
                $(this).removeClass('jdropdown-focus');
            } else {
                // Toggle option
                if ($(dropDownOptions[index]).hasClass('jdropdown-selected')) {
                    $(dropDownOptions[index]).removeClass('jdropdown-selected');
                } else {
                    $(dropDownOptions[index]).addClass('jdropdown-selected');
                }
                // Update labels
                if (! $(this).data('autocomplete')) {
                    $(this).jdropdown('updateLabel');
                }
            }

            // Focus item
            $(dropDownOptions[$.fn.jdropdown.configuration[id].currentIndex]).removeClass('jdropdown-cursor');
            // Current element
            $(dropDownOptions[index]).addClass('jdropdown-cursor');
            // Update cursor position
            $.fn.jdropdown.configuration[id].currentIndex = index;
        },

        /**
         * Autocomplete filter
         */
        find : function(str) {
            var itens = $(this).find('.jdropdown-item');

            // Append options
            $.each(itens, function(k, v) {
                if (str == null || $(v).hasClass('jdropdown-selected') || $(v).html().toLowerCase().indexOf(str.toLowerCase()) != -1) {
                    $(v).show();
                } else {
                    $(v).hide();
                }
            });
        },

        /**
         * Update labels
         */
        updateLabel : function() {
            // Update label
            var selectedOptions = $(this).find('.jdropdown-selected');

            var label = '';
            $.each(selectedOptions, function(k, v) {
                if (label) {
                    label += '; ';
                }
                label += $(v).html();
            });

            // Update label
            $(this).find('.jdropdown-header').val(label)
        }
    };

    $.fn.jdropdown = function( method ) {
        if ( methods[method] ) {
            return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof method === 'object' || ! method ) {
            return methods.init.apply( this, arguments );
        } else {
            $.error( 'Method ' +  method + ' does not exist on jQuery.tooltip' );
        }  
    };

    $.fn.jdropdown.configuration = {};
    $.fn.jdropdown.current = null;

})( jQuery );