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
            $.each($.fn.jdropdown.configuration[id].data, function(k, v) {
                var item = document.createElement('div');
                $(item).prop('class', 'jdropdown-item');
                $(item).data('value', v.id);
                $(item).html(v.name);
                $(content).append(item);
            });

            // Append elements
            $(this).append(header);
            $(this).append(content);

            // Fix width
            $(content).css('width', $(content).width() + 40);

            // Handlers
            if (! $.fn.jdropdown.onclick) {
                $.fn.jdropdown.onclick = function(e) {

                    var dropdown = $(e.target).parents('.jdropdown');

                    if (! $(dropdown).length) {
                        var openDropdown = $('.jdropdown-focus');

                        if ($(openDropdown).length > 0) {
                            $.each(openDropdown, function(k, v) {
                                // Remove focus
                                $(v).removeClass('jdropdown-focus');
                                // Update labels
                                $(v).jdropdown('updateLabel');
                            });
                        }
                    } else {
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
                        }

                        if ($(e.target).hasClass('jdropdown-item')) {
                            // Focus behaviour
                            if (! $(dropdown).data('multiple')) {
                                // Element
                                $(dropdown).removeClass('jdropdown-focus');
                                // Remove all pre-selected options
                                $(dropdown).find('.jdropdown-item').removeClass('jdropdown-selected');
                                // Mark option
                                $(e.target).addClass('jdropdown-selected');
                                // Update labels
                                $(dropdown).jdropdown('updateLabel');
                            } else {
                                // Toggle option
                                if ($(e.target).hasClass('jdropdown-selected')) {
                                    $(e.target).removeClass('jdropdown-selected');
                                } else {
                                    $(e.target).addClass('jdropdown-selected');
                                }
                                // Update labels
                                if (! $(dropdown).data('autocomplete')) {
                                    $(dropdown).jdropdown('updateLabel');
                                }
                            }
                        }
                    }
                }

                $(document).on('click', $.fn.jdropdown.onclick);
            }
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

})( jQuery );