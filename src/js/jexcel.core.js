// Jexcel core object

var jexcel = (function(el, options) {
    // Create jexcel object
    var obj = {};
    obj.options = {};

    if (! (el instanceof Element || el instanceof HTMLDocument)) {
        console.error('JEXCEL: el is not a valid DOM element');
        return false;
    }

    // Loading default configuration
    var defaults = {
        // External data
        url:null,
        // Data
        data:null,
        // Copy behavior
        copyCompatibility:false,
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
        // Spare rows and columns
        minSpareRows:0,
        minSpareCols:0,
        // Minimal table dimensions
        minDimensions:[0,0],
        // Allow Export
        allowExport:true,
        // @type {boolean} - Include the header titles on download
        includeHeadersOnDownload:false,
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
        csvFileName:'jexcel',
        // Consider first line as header
        csvHeaders:true,
        // Delimiters
        csvDelimiter:',',
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
        // Meta
        meta: null,
        // Style
        style:null,
        // Execute formulas
        parseFormulas:true,
        autoIncrement:true,
        autoCasting:true,
        // Event handles
        onundo:null,
        onredo:null,
        onload:null,
        onchange:null,
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
        onpaste:null,
        onbeforepaste:null,
        onmerge:null,
        onfocus:null,
        onblur:null,
        onchangeheader:null,
        oneditionstart:null,
        oneditionend:null,
        onchangestyle:null,
        onchangemeta:null,
        onchangepage:null,
        // Customize any cell behavior
        updateTable:null,
        // Detach the HTML table when calling updateTable
        detachForUpdates: false,
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
        about:"jExcel CE Spreadsheet\nVersion 3.9.1\nAuthor: Paul Hodel <paul.hodel@gmail.com>\nWebsite: https://bossanova.uk/jexcel/v3",
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
        console.error('JEXCEL: The lazyloading only works when tableOverflow = yes or fullscreen = yes');
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
     * Prepare the jexcel table
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
                    multiple.push(jSuites.ajax({
                        url: obj.options.columns[i].url,
                        index: i,
                        method: 'GET',
                        dataType: 'json',
                        multiple: multiple,
                        success: function(data) {
                            var source = [];
                            for (var i = 0; i < data.length; i++) {
                                obj.options.columns[this.index].source.push(data[i]);
                            }
                        },
                        complete: function() {
                            obj.createTable();
                        }
                    }));
                }
            } else if (obj.options.columns[i].type == 'calendar') {
                // Default format for date columns
                if (! obj.options.columns[i].options.format) {
                    obj.options.columns[i].options.format = 'DD/MM/YYYY';
                }
            }
        }

        // On complete
        if (! multiple.length) {
            obj.createTable();
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

            paginationUpdateContainer.appendChild(document.createTextNode(obj.options.text.show));
            paginationUpdateContainer.appendChild(obj.paginationDropdown);
            paginationUpdateContainer.appendChild(document.createTextNode(obj.options.text.entries));
        }

        // Filter and pagination container
        obj.filter = document.createElement('div');
        obj.filter.classList.add('jexcel_filter');
        obj.filter.appendChild(paginationUpdateContainer);
        obj.filter.appendChild(searchContainer);

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

        // Content table
        obj.table = document.createElement('table');
        obj.table.classList.add('jexcel');
        obj.table.setAttribute('cellpadding', '0');
        obj.table.setAttribute('cellspacing', '0');
        obj.table.setAttribute('unselectable', 'yes');
        obj.table.setAttribute('onselectstart', 'return false');
        obj.table.appendChild(obj.colgroupContainer);
        obj.table.appendChild(obj.thead);
        obj.table.appendChild(obj.tbody);

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

        // Powered by jExcel
        var ads = document.createElement('a');
        ads.setAttribute('href', 'https://bossanova.uk/jexcel/');
        obj.ads = document.createElement('div');
        obj.ads.className = 'jexcel_about';
        if (typeof(sessionStorage) !== "undefined" && ! sessionStorage.getItem('jexcel')) {
            sessionStorage.setItem('jexcel', true);
            var img = document.createElement('img');
            img.src = '//bossanova.uk/jexcel/logo.png';
            ads.appendChild(img);
        }
        var span = document.createElement('span');
        span.innerHTML = 'Jexcel spreadsheet';
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
            el.appendChild(obj.filter);
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
                method: 'GET',
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
        if (obj.options.data) {
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
                console.error('JEXCEL: Pagination will be disable due the lazyLoading');
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
        if (! obj.ignoreEvents) {
            if (typeof(obj.options.onload) == 'function') {
                obj.options.onload(el, obj);
            }
        }
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
     * Get the whole table data
     * 
     * @param integer row number
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
        // Definitions
        if (obj.options.rows[j]) {
            if (obj.options.rows[j].height) {
                obj.rows[j].style.height = obj.options.rows[j].height;
            }
        }
        // Row number label
        var td = document.createElement('td');
        td.innerHTML = parseInt(j + 1);
        td.setAttribute('data-y', j);
        td.className = 'jexcel_row';
        obj.rows[j].appendChild(td);

        // Data columns
        for (i = 0; i < obj.options.columns.length; i++) {
            // New column of data to be append in the line
            obj.records[j][i] = obj.createCell(i, j, data[i]);
            // Add column to the row
            obj.rows[j].appendChild(obj.records[j][i]);
        }

        // Add row to the table body
        return obj.rows[j];
    }

    /**
     * Create cell
     */
    obj.createCell = function(i, j, value) {
        // Create cell and properties
        var td = document.createElement('td');
        td.setAttribute('data-x', i);
        td.setAttribute('data-y', j);
        // Hidden column
        if (obj.options.columns[i].type == 'hidden') {
            td.style.display = 'none';
            td.innerHTML = value;
        } else if (obj.options.columns[i].type == 'checkbox' || obj.options.columns[i].type == 'radio') {
            // Create input
            var element = document.createElement('input');
            element.type = obj.options.columns[i].type;
            element.name = 'c' + i;
            element.checked = (value == 1 || value == true || value == 'true') ? true : false;
            element.onclick = function() {
                obj.setValue(td, this.checked);
            }

            if (obj.options.columns[i].readOnly == true) {
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
            td.innerHTML = jSuites.calendar.getDateString(formatted ? formatted : value, obj.options.columns[i].options.format);
        } else if (obj.options.columns[i].type == 'dropdown' || obj.options.columns[i].type == 'autocomplete') {
            // Create dropdown cell
            td.classList.add('jexcel_dropdown');
            td.innerHTML = obj.getDropDownValue(i, value);
        } else if (obj.options.columns[i].type == 'color') {
            if (obj.options.columns[i].render == 'square') {
                var color = document.createElement('div');
                color.className = 'color';
                color.style.backgroundColor = value;
                td.appendChild(color);
            } else {
                td.style.color = value;
                td.innerHTML = value;
            }
        } else if (obj.options.columns[i].type == 'image') {
            if (value && value.substr(0, 10) == 'data:image') {
                var img = document.createElement('img');
                img.src = value;
                td.appendChild(img);
            }
        } else {
            if ((''+value).substr(0,1) == '=' && obj.options.parseFormulas == true) {
                value = obj.executeFormula(value, i, j)
            }
            if (obj.options.columns[i].mask) {
                var decimal = obj.options.columns[i].decimal || '.';
                value = '' + jSuites.mask.run(value, obj.options.columns[i].mask, decimal);
            }

            td.innerHTML = value;
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
            if (value || td.innerHTML) {
                obj.records[j][i-1].style.overflow = 'hidden';
            } else {
                if (i == obj.options.columns.length - 1) {
                    td.style.overflow = 'hidden';
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
        obj.headers[colNumber].innerHTML = obj.options.columns[colNumber].title ? obj.options.columns[colNumber].title : jexcel.getColumnName(colNumber);
        obj.headers[colNumber].setAttribute('data-x', colNumber);
        obj.headers[colNumber].style.textAlign = colAlign;
        if (obj.options.columns[colNumber].title) {
            obj.headers[colNumber].setAttribute('title', obj.options.columns[colNumber].title);
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

    obj.createNestedHeader = function(nestedInformation) {
        var tr = document.createElement('tr');
        tr.classList.add('jexcel_nested');
        var td = document.createElement('td');
        tr.appendChild(td);

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
            td.innerHTML = nestedInformation[i].title;
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
                // Tooltip
                if (toolbar[i].tooltip) {
                    toolbarItem.setAttribute('title', toolbar[i].tooltip);
                }
                // Handle click
                if (toolbar[i].onclick && typeof(toolbar[i].onclick)) {
                    toolbarItem.onclick = toolbar[i].onclick;
                } else {
                    toolbarItem.onclick = function() {
                        var k = this.getAttribute('data-k');
                        var v = this.getAttribute('data-v');
                        obj.setStyle(obj.highlighted, k, v);
                    }
                }
                // Append element
                toolbarItem.innerHTML = toolbar[i].content;
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
                    toolbarDropdownOption.innerHTML = toolbar[i].v[j];
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
                 toolbarItem.onclick = function() {
                     this.color.open();
                 }
                 toolbarItem.innerHTML = toolbar[i].content;
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

                if (typeof(obj.options.onmerge) == 'function') {
                    obj.options.onmerge(el, cellName, colspan, rowspan);
                }
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
        if (! obj.ignoreEvents) {
            if (typeof(obj.options.oneditionstart) == 'function') {
                obj.options.oneditionstart(el, cell, x, y);
            }
        }

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

                    // Create dropdown
                    if (typeof(obj.options.columns[x].filter) == 'function') {
                        var source = obj.options.columns[x].filter(el, cell, x, y, obj.options.columns[x].source);
                    } else {
                        var source = obj.options.columns[x].source;
                    }

                    // Create editor
                    var editor = createEditor('div');
                    var options = {
                        data: source,
                        multiple: obj.options.columns[x].multiple ? true : false,
                        autocomplete: obj.options.columns[x].autocomplete || obj.options.columns[x].type == 'autocomplete' ? true : false,
                        opened:true,
                        value: obj.options.columns[x].multiple ? value.split(';') : value,
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
                        var calendar = jSuites.calendar(editor, obj.options.columns[x].options);
                        calendar.setValue(value);
                    }
                    // Focus on editor
                    editor.focus();
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
                    const rect = cell.getBoundingClientRect();
                    const rectContent = div.getBoundingClientRect();
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
                        // Mask
                        if (obj.options.columns[x].mask) {
                            editor.setAttribute('data-mask', obj.options.columns[x].mask);
                        }
                    }

                    editor.value = value;
                    editor.onblur = function() {
                        obj.closeEditor(cell, true);
                    };
                    editor.focus();
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
                    var value = cell.children[1].color.close(true);
                } else if (obj.options.columns[x].type == 'image') {
                    var img = cell.children[0].children[0].children[0];
                    var value = img && img.tagName == 'IMG' ? img.src : '';
                } else if (obj.options.columns[x].type == 'numeric') {
                    var value = cell.children[0].value;
                    if (value.substr(0,1) != '=') {
                        if (value == '') {
                            value = obj.options.columns[x].allowEmpty ? '' : 0;
                        }
                    }
                    cell.children[0].onblur = null;
                } else {
                    var value = cell.children[0].value;
                    cell.children[0].onblur = null;
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
                    cell.children[1].color.close(true);
                } else {
                    cell.children[0].onblur = null;
                }
            }

            // Restore value
            cell.innerHTML = obj.edition && obj.edition[1] ? obj.edition[1] : '';
        }

        // On edition end
        if (! obj.ignoreEvents) {
            if (typeof(obj.options.oneditionend) == 'function') {
                obj.options.oneditionend(el, cell, x, y, value, save);
            }
        }

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
                            var x = cell[i].getAttribute('data-x');
                            var y = cell[i].getAttribute('data-y');
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
            // On change
            if (! obj.ignoreEvents) {
                if (typeof(obj.options.onbeforechange) == 'function') {
                    // Overwrite a value
                    var val = obj.options.onbeforechange(el, obj.records[y][x], x, y, value);

                    // If you return something this will overwrite the value
                    if (val != undefined) {
                        value = val;
                    }
                }
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
                obj.options.columns[x].editor.setValue(obj.records[y][x], value, force);
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
                    obj.records[y][x].innerHTML = obj.getDropDownValue(x, value);
                } else if (obj.options.columns[x].type == 'calendar') {
                    // Update calendar
                    var formatted = jSuites.calendar.extractDateFromString(value, obj.options.columns[x].options.format);
                    // Update data and cell
                    obj.options.data[y][x] = value;
                    obj.records[y][x].innerHTML = jSuites.calendar.getDateString(formatted ? formatted : value, obj.options.columns[x].options.format);
                } else if (obj.options.columns[x].type == 'color') {
                    // Update color
                    obj.options.data[y][x] = value;
                    // Render
                    if (obj.options.columns[x].render == 'square') {
                        var color = document.createElement('div');
                        color.className = 'color';
                        color.style.backgroundColor = value;
                        obj.records[y][x].innerHTML = '';
                        obj.records[y][x].appendChild(color);
                    } else {
                    obj.records[y][x].style.color = value;
                        obj.records[y][x].innerHTML = value;
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
                    if (('' + value).substr(0,1) == '='  && obj.options.parseFormulas == true) {
                        value = obj.executeFormula(value, x, y);
                    }
                    if (obj.options.columns[x].mask) {
                        var decimal = obj.options.columns[x].decimal || '.';
                        value = '' + jSuites.mask.run(value, obj.options.columns[x].mask, decimal);
                    }
                    obj.records[y][x].innerHTML = value;

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
            if (! obj.ignoreEvents) {
                if (typeof(obj.options.onchange) == 'function') {
                    obj.options.onchange(el, (obj.records[y] && obj.records[y][x] ? obj.records[y][x] : null), x, y, value, record.oldValue);
                }
            }
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
     * Move coords to A1 in case ovelaps with an excluded cell
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

        // Reset highlighed cells
        obj.highlighted = [];

        // Reset
        obj.selectedCell = null;

        // Hide corner
        obj.corner.style.top = '-2000px';
        obj.corner.style.left = '-2000px';

        if (obj.ignoreEvents != true && blur == true) {
            if (obj.options.onblur) {
                if (typeof(obj.options.onblur) == 'function') {
                    if (previousStatus == 1) {
                        obj.options.onblur(el);
                    }
                }
            }
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
                    if (obj.records[borderTop][i]) {
                        obj.records[borderTop][i].classList.add('highlight-top');
                    }
                    // Bottom border
                    if (obj.records[borderBottom][i]) {
                        obj.records[borderBottom][i].classList.add('highlight-bottom');
                    }
                    // Add selected from headers
                    obj.headers[i].classList.add('selected');
                }
            }

            for (var j = borderTop; j <= borderBottom; j++) {
                if (obj.rows[j].style.display != 'none') {
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
        if (obj.ignoreEvents != true) {
            if (obj.options.onfocus) {
                if (typeof(obj.options.onfocus) == 'function') {
                    if (previousState == 0) {
                        obj.options.onfocus(el);
                    }
                }
            }

            if (typeof(obj.options.onselection) == 'function') {
                obj.options.onselection(el, borderLeft, borderTop, borderRight, borderBottom, origin);
            }
        }

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

            if (ux - px < uy - py) {
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

            const contentRect = obj.content.getBoundingClientRect();
            var x1 = contentRect.left;
            var y1 = contentRect.top;

            const lastRect = last.getBoundingClientRect();
            var x2 = lastRect.left;
            var y2 = lastRect.top;
            var w2 = lastRect.width;
            var h2 = lastRect.height;

            var x = (x2 - x1) + obj.content.scrollLeft + w2 - 4;
            var y = (y2 - y1) + obj.content.scrollTop + h2 - 4;

            // Place the corner in the correct place
            obj.corner.style.top = y + 'px';
            obj.corner.style.left = x + 'px';
        }
    }

    /**
     * Update scroll position based on the selection
     */
    obj.updateScroll = function(direction) {
        // jExcel Container information
        const contentRect = obj.content.getBoundingClientRect();
        var x1 = contentRect.left;
        var y1 = contentRect.top;
        var w1 = contentRect.width;
        var h1 = contentRect.height;

        // Direction Left or Up
        var reference = obj.records[obj.selectedCell[3]][obj.selectedCell[2]];

            // Reference
        const referenceRect = reference.getBoundingClientRect();
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

        // Left position check - TODO: change that to the bottom border of the element
        if (x > (obj.content.scrollLeft) && x < (obj.content.scrollLeft + w1)) {
            // In the viewport
        } else {
            // Out of viewport
            if (x < obj.content.scrollLeft + 30) {
                obj.content.scrollLeft = x;
                if (obj.content.scrollLeft < 50) {
                    obj.content.scrollLeft = 0;
                }
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
        if (width > 0) {
            // In case the column is an object
            if (typeof(column) == 'object') {
                column = column.getAttribute('data-x');
            }

            // Oldwidth
            if (! oldWidth) {
                oldWidth = obj.colgroup[column].getAttribute('width');
            }

            // Set width
            obj.colgroup[column].setAttribute('width', width);
            obj.options.columns[column].width = width;

            // Keeping history of changes
            obj.setHistory({
                action:'setWidth',
                column:column,
                oldValue:oldWidth,
                newValue:width,
            });

            // On resize column
            if (obj.ignoreEvents != true) {
                if (typeof(obj.options.onresizecolumn) == 'function') {
                    obj.options.onresizecolumn(el, column, width, oldWidth);
                }
            }

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
            if (obj.ignoreEvents != true) {
                if (typeof(obj.options.onresizerow) == 'function') {
                    obj.options.onresizerow(el, row, height, oldHeight);
                }
            }

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
                obj.headers[column].innerHTML = newValue;
                // Keep the title property
                obj.headers[column].setAttribute('title', newValue);
            }

            obj.setHistory({
                action: 'setHeader',
                column: column,
                oldValue: oldValue,
                newValue: newValue
            });

            // On change
            if (! obj.ignoreEvents) {
                if (typeof(obj.options.onchangeheader) == 'function') {
                    obj.options.onchangeheader(el, column, oldValue, newValue);
                }
            }
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

        if (obj.ignoreEvents != true) {
            if (typeof(obj.options.onchangemeta) == 'function') {
                obj.options.onchangemeta(el, o, k, v);
            }
        }
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

            if (obj.records[cell[1]] && obj.records[cell[1]][cell[0]]) {
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

        if (obj.ignoreEvents != true) {
            if (typeof(obj.options.onchangestyle) == 'function') {
                obj.options.onchangestyle(el, o, k, v);
            }
        }
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

            // Filter
            Array.prototype.orderBy = function(p, o) {
                return this.slice(0).sort(function(a, b) {
                    var valueA = a[p] == '' ? '' : Number(a[p]) == a[p] ? Number(a[p]) : a[p].toLowerCase();
                    var valueB = b[p] == '' ? '' : Number(b[p]) == b[p] ? Number(b[p]) : b[p].toLowerCase();

                    if (! o) {
                        return (valueA == '' && valueB != '') ? 1 : (valueA != '' && valueB == '') ? -1 : (valueA > valueB) ? 1 : (valueA < valueB) ? -1 :  0;
                    } else {
                        return (valueA == '' && valueB != '') ? 1 : (valueA != '' && valueB == '') ? -1 : (valueA > valueB) ? -1 : (valueA < valueB) ? 1 :  0;
                    }
                });
            }

            // Test order
            var temp = [];
            if (obj.options.columns[column].type == 'calendar' ||
                obj.options.columns[column].type == 'checkbox' ||
                obj.options.columns[column].type == 'radio') {
                for (var j = 0; j < obj.options.data.length; j++) {
                    temp[j] = [ j, obj.options.data[j][column] ];
                }
            } else {
                for (var j = 0; j < obj.options.data.length; j++) {
                    temp[j] = [ j, obj.records[j][column].innerHTML ];
                }
            }
            temp = temp.orderBy(1, order);

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
            if (obj.ignoreEvents != true) {
                if (typeof(obj.options.onsort) == 'function') {
                    obj.options.onsort(el, column, order);
                }
            }

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
        if (obj.searchInput.value) {
            obj.search(obj.searchInput.value);
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
        if (obj.ignoreEvents != true) {
            if (typeof(obj.options.onmoverow) == 'function') {
                obj.options.onmoverow(el, o, d);
            }
        }
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
            if (typeof(obj.options.onbeforeinsertrow) == 'function') {
                if (! obj.options.onbeforeinsertrow(el, rowNumber, numOfRows, insertBefore)) {
                    console.log('onbeforeinsertrow returned false');

                    return false;
                }
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
            if (obj.ignoreEvents != true) {
                if (typeof(obj.options.oninsertrow) == 'function') {
                    obj.options.oninsertrow(el, rowNumber, numOfRows, rowRecords, insertBefore);
                }
            }
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

                // Do not delete more than the number of recoreds
                if (rowNumber + numOfRows >= obj.options.data.length) {
                    numOfRows = obj.options.data.length - rowNumber;
                }

                // Onbeforedeleterow
                if (typeof(obj.options.onbeforedeleterow) == 'function') {
                    if (! obj.options.onbeforedeleterow(el, rowNumber, numOfRows)) {
                        console.log('onbeforedeleterow returned false');
                        return false;
                    }
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
                    if (obj.ignoreEvents != true) {
                        if (typeof(obj.options.ondeleterow) == 'function') {
                            obj.options.ondeleterow(el, rowNumber, numOfRows, rowRecords);
                        }
                    }
                }
            } else {
                console.error('JEXCEL. It is not possible to delete the last row');
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

        // Keeping history of changes
        obj.setHistory({
            action:'moveColumn',
            oldValue: o,
            newValue: d,
        });

        // Update table references
        obj.updateTableReferences();

        // Events
        if (obj.ignoreEvents != true) {
            if (typeof(obj.options.onmovecolumn) == 'function') {
                obj.options.onmovecolumn(el, o, d);
            }
        }
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
            if (typeof(obj.options.onbeforeinsertcolumn) == 'function') {
                if (! obj.options.onbeforeinsertcolumn(el, columnNumber, numOfColumns, insertBefore)) {
                    console.log('onbeforeinsertcolumn returned false');

                    return false;
                }
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

            // Add new headers
            for (var col = columnIndex; col < (numOfColumns + columnIndex); col++) {
                obj.createCellHeader(col);
                obj.headerContainer.insertBefore(obj.headers[col], obj.headerContainer.children[col+1]);
                obj.colgroupContainer.insertBefore(obj.colgroup[col], obj.colgroupContainer.children[col+1]);

                historyHeaders.push(obj.headers[col]);
                historyColgroup.push(obj.colgroup[col]);
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
                data:historyData,
            });

            // Remove table references
            obj.updateTableReferences();

            // Events
            if (obj.ignoreEvents != true) {
                if (typeof(obj.options.oninsertcolumn) == 'function') {
                    obj.options.oninsertcolumn(el, columnNumber, numOfColumns, historyRecords, insertBefore);
                }
            }
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
                if (typeof(obj.options.onbeforedeletecolumn) == 'function') {
                   if (! obj.options.onbeforedeletecolumn(el, columnNumber, numOfColumns)) {
                      console.log('onbeforedeletecolumn returned false');
                      return false;
                   }
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
                        data:historyData,
                    });

                    // Update table references
                    obj.updateTableReferences();

                    // Delete
                    if (obj.ignoreEvents != true) {
                        if (typeof(obj.options.ondeletecolumn) == 'function') {
                            obj.options.ondeletecolumn(el, columnNumber, numOfColumns, historyRecords);
                        }
                    }
                }
            } else {
                console.error('JEXCEL. It is not possible to delete the last column');
            }
        }
    }

    /**
     * Get seleted rows numbers
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
     * Get seleted column numbers
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

        // Update corner position
        setTimeout(function() {
            obj.updateCornerPosition();
        },0);
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

            var tokens = expression.match(/([A-Z]+[0-9]+)\:([A-Z]+[0-9]+)/g);
            if (tokens && tokens.length) {
                tokensUpdate(tokens);
            }

            // String
            var evalstring = '';

            // Get tokens
            var tokens = expression.match(/([A-Z]+[0-9]+)/g);

            // Direct self-reference protection
            if (tokens && tokens.indexOf(parentId) > -1) {
                console.error('Self Reference detected');
                return '#ERROR';
            } else {
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
                                evalstring += "var " + tokens[i] + " = null;";
                            } else {
                                if (value == Number(value) && obj.options.autoCasting == true) {
                                    // Number
                                    evalstring += "var " + tokens[i] + " = " + Number(value) + ";";
                                } else {
                                    // Trying any formatted number
                                    var number = obj.parseNumber(value, position[0])
                                    if (obj.options.autoCasting == true && number) {
                                        // Render as number
                                        evalstring += "var " + tokens[i] + " = " + number + ";";
                                    } else {
                                        // Render as string
                                        evalstring += "var " + tokens[i] + " = '" + value + "';";
                                    }
                                }
                            }
                        }
                    }
                }

                // Convert formula to javascript
                try {
                    evalstring += "function COLUMN() { return parseInt(x) + 1; }; function ROW() { return parseInt(y) + 1; }; function CELL() { return parentId; };";

                    var res = eval(evalstring + expression.substr(1));
                } catch (e) {
                    var res = '#ERROR';
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
            pageNumber = Math.ceil(results.length / quantityPerPage); 
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
            pageNumber = Math.ceil(results.length / quantityPerPage); 
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

        if (typeof(obj.options.onchangepage) == 'function') {
            obj.options.onchangepage(el, pageNumber, oldPage);
        }
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
            if (includeHeaders == true || obj.options.includeHeadersOnDownload == true) {
                data += obj.getHeaders();
                data += "\r\n";
            }
            // Get data
            data += obj.copy(false, obj.options.csvDelimiter, true);
            // Download element
            var blob = new Blob(["\uFEFF"+data], {type: 'text/csv;charset=utf-8;'});

            // IE Compatibility
            if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                window.navigator.msSaveOrOpenBlob(blob, options.csvFileName + '.csv');
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
    obj.copy = function(highlighted, delimiter, returnData) {
        if (! delimiter) {
            delimiter = "\t";
        }

        // Controls
        var col = [];
        var colLabel = [];
        var row = [];
        var rowLabel = [];
        var x = obj.options.data[0].length
        var y = obj.options.data.length
        var tmp = '';

        // Reset container
        obj.style = [];

        // Go through the columns to get the data
        for (var j = 0; j < y; j++) {
            col = [];
            colLabel = [];

            for (var i = 0; i < x; i++) {
                // If cell is highlighted
                if (! highlighted || obj.records[j][i].classList.contains('highlight')) {
                    // Values
                    var value = obj.options.data[j][i];
                    if (value.match && (value.match(/,/g) || value.match(/\n/) || value.match(/\"/))) {
                        value = value.replace(new RegExp('"', 'g'), '""');
                        value = '"' + value + '"';
                    }
                    col.push(value);

                    // Labels
                    if (obj.options.columns[i].type == 'checkbox' || obj.options.columns[i].type == 'radio') {
                        var label = value;
                    } else {
                        var label = obj.records[j][i].innerHTML;
                        if (label.match && (label.match(/,/g) || label.match(/\n/) || label.match(/\"/))) {
                            // Scape double quotes
                            label = label.replace(new RegExp('"', 'g'), '""');
                            label = '"' + label + '"';
                        }
                    }
                    colLabel.push(label);

                    // Get style
                    tmp = obj.records[j][i].getAttribute('style');
                    obj.style.push(tmp ? tmp : '');
                }
            }

            if (col.length) {
                row.push(col.join(delimiter));
            }
            if (colLabel.length) {
                rowLabel.push(colLabel.join(delimiter));
            }
        }

        // Final string
        var str = row.join("\r\n");
        var strLabel = rowLabel.join("\r\n");

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

        return obj.data;
    }

    /**
     * jExcel paste method
     * 
     * @param integer row number
     * @return string value
     */
    obj.paste = function(x, y, data) {
        // Paste filter
        if (typeof(obj.options.onbeforepaste) == 'function') {
            var data = obj.options.onbeforepaste(el, data);
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
                            obj.insertColumn();
                        }
                        colIndex = obj.right.get(colIndex, rowIndex);
                    }
                }

                j++;
                if (data[j]) {
                    if (rowIndex >= obj.rows.length-1) {
                        obj.insertRow();
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
            if (typeof(obj.options.onpaste) == 'function') {
                obj.options.onpaste(el, records);
            }

            // On after changes
            obj.onafterchanges(el, records);
        }
    }

    /**
     * Process row
     */
    obj.historyProcessRow = function(type, historyRecord) {
        var rowIndex = (! historyRecord.insertBefore) ? historyRecord.rowNumber + 1 : historyRecord.rowNumber;

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

            obj.conditionalSelectionUpdate(0, columnIndex, (numOfColumns + columnIndex) - 1);
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
                    obj.updateCell(historyRecord.records[i].col, historyRecord.records[i].row, historyRecord.records[i].oldValue);
                    obj.updateFormulaChain(historyRecord.records[i].col, historyRecord.records[i].row, records);
                    if (historyRecord.oldStyle) {
                        obj.resetStyle(historyRecord.oldStyle, true);
                    }
                }
                // Update selection
                if (! historyRecord.selection) {
                    historyRecord.selection = [historyRecord.records[0].col, historyRecord.records[0].row];
                }
                obj.updateSelectionFromCoords(historyRecord.selection[0], historyRecord.selection[1], historyRecord.selection[2], historyRecord.selection[3]);
                // Update table
                obj.updateTable();
            }
        }
        obj.ignoreEvents = ignoreEvents;
        obj.ignoreHistory = ignoreHistory;

        if (typeof(obj.options.onundo) == 'function') {
            obj.options.onundo(el, historyRecord);
        }
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
                // Redo for changes in cells
                for (var i = 0; i < historyRecord.records.length; i++) {
                    obj.updateCell(historyRecord.records[i].col, historyRecord.records[i].row, historyRecord.records[i].newValue);
                    obj.updateFormulaChain(historyRecord.records[i].col, historyRecord.records[i].row, records);
                    if (historyRecord.newStyle) {
                        obj.resetStyle(historyRecord.newStyle, true);
                    }
                }

                // Update selection
                if (! historyRecord.selection) {
                    historyRecord.selection = [historyRecord.records[0].col, historyRecord.records[0].row];
                }
                obj.updateSelectionFromCoords(historyRecord.selection[0], historyRecord.selection[1], historyRecord.selection[2], historyRecord.selection[3]);
                // Update table
                obj.updateTable();
            }
        }
        obj.ignoreEvents = ignoreEvents;
        obj.ignoreHistory = ignoreHistory;

        if (typeof(obj.options.onredo) == 'function') {
            obj.options.onredo(el, historyRecord);
        }
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

            // Garante single multiple compatibily
            var keys = ('' + key).split(';')

            for (var i = 0; i < keys.length; i++) {
                if (combo[keys[i]]) {
                    value.push(combo[keys[i]]);
                }
            }
        } else {
            console.error('Invalid column');
        }

        return (value.length > 0) ? value.join('; ') : '';
    }

    /**
     * From starckoverflow contributions
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
        if (! obj.ignoreEvents) {
            // On after changes
            if (typeof(obj.options.onafterchanges) == 'function') {
                obj.options.onafterchanges(el, records);
            }
        }
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
            jexcel.build();
            jexcel.build = null;
        }

        // Load the table data based on an CSV file
        if (obj.options.csv) {
            // Loading
            if (obj.options.loadingSpin == true) {
                jSuites.loading.show();
            }

            // Load CSV file
            jSuites.ajax({
                url: obj.options.csv,
                method: 'GET',
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
                method: 'GET',
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
                        alert(obj.options.about);
                    }
                });
            }

            return items;
        }
    }

    obj.scrollControls = function(e) {
        if (obj.options.lazyLoading == true) {
            if (jexcel.timeControlLoading == null) {
                jexcel.timeControlLoading = setTimeout(function() {
                    if (obj.content.scrollTop + obj.content.clientHeight >= obj.content.scrollHeight) {
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

        // Close editor
        if (obj.options.lazyLoading == true || obj.options.tableOverflow == true) {
            if (obj.edition && e.target.className.substr(0,9) != 'jdropdown') {
                obj.closeEditor(obj.edition[0], true);
            }
        }
    }

    el.addEventListener("DOMMouseScroll", obj.scrollControls);
    el.addEventListener("mousewheel", obj.scrollControls);

    el.jexcel = obj;

    obj.init();

    return obj;
});

jexcel.current = null;
jexcel.timeControl = null;
jexcel.timeControlLoading = null;

jexcel.destroy = function(element, destroyEventHandlers) {
    if (element.jexcel) {
        element.removeEventListener("DOMMouseScroll", element.jexcel.scrollControls);
        element.removeEventListener("mousewheel", element.jexcel.scrollControls);
        element.jexcel = null;
        element.innerHTML = '';

        if (destroyEventHandlers) {
            document.removeEventListener("keydown", jexcel.keyDownControls);
            document.removeEventListener("mouseup", jexcel.mouseUpControls);
            document.removeEventListener("mousedown", jexcel.mouseDownControls);
            document.removeEventListener("mousemove", jexcel.mouseMoveControls);
            document.removeEventListener("mouseover", jexcel.mouseOverControls);
            document.removeEventListener("dblclick", jexcel.doubleClickControls);
            document.removeEventListener("paste", jexcel.pasteControls);
            document.removeEventListener("contextmenu", jexcel.contextMenuControls);
            document.removeEventListener("touchstart", jexcel.touchStartControls);
            document.removeEventListener("touchend", jexcel.touchEndControls);
            document.removeEventListener("touchcancel", jexcel.touchEndControls);
            jexcel = null;
        }
    }
}

jexcel.build = function() {
    document.addEventListener("keydown", jexcel.keyDownControls);
    document.addEventListener("mouseup", jexcel.mouseUpControls);
    document.addEventListener("mousedown", jexcel.mouseDownControls);
    document.addEventListener("mousemove", jexcel.mouseMoveControls);
    document.addEventListener("mouseover", jexcel.mouseOverControls);
    document.addEventListener("dblclick", jexcel.doubleClickControls);
    document.addEventListener("paste", jexcel.pasteControls);
    document.addEventListener("contextmenu", jexcel.contextMenuControls);
    document.addEventListener("touchstart", jexcel.touchStartControls);
    document.addEventListener("touchend", jexcel.touchEndControls);
    document.addEventListener("touchcancel", jexcel.touchEndControls);
    document.addEventListener("touchmove", jexcel.touchEndControls);
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
                    jexcel.current.editor[0].children[0].calendar.close(1);
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
                    jexcel.current.edition[0].children[0].calendar.close(1);
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
                                           (e.keyCode == 187) ||
                                           (e.keyCode == 189) ||
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
                jexcel.current.resetSelection();
            }
            jexcel.current = jexcelTable[0].jexcel;
        }
    } else {
        if (jexcel.current) {
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
                            console.error('JEXCEL: This column is part of a merged cell.');
                        } else {
                            // Reset selection
                            jexcel.current.resetSelection();
                            // Drag helper
                            jexcel.current.dragging = {
                                element: e.target,
                                column:columnId,
                                destination:columnId,
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
                            console.error('JEXCEL: This row is part of a merged cell');
                        } else if (jexcel.current.options.search == true && jexcel.current.results) {
                            console.error('JEXCEL: Please clear your search before perform this action');
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
                // Remove Class
                jexcel.current.headers[jexcel.current.resizing.column].classList.remove('resizing');
                var newWidth = jexcel.current.colgroup[jexcel.current.resizing.column].getAttribute('width');
                jexcel.current.setWidth(jexcel.current.resizing.column, newWidth, jexcel.current.resizing.width);
                // Remove border
                jexcel.current.headers[jexcel.current.resizing.column].classList.remove('resizing');
                for (var j = 0; j < jexcel.current.records.length; j++) {
                    if (jexcel.current.records[j][jexcel.current.resizing.column]){
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
                    var position = Array.prototype.indexOf.call(jexcel.current.dragging.element.parentNode.children, jexcel.current.dragging.element);
                    if (jexcel.current.dragging.row != position) {
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

            if (jexcel.current.dragging) {
                if (jexcel.current.dragging.column) {
                    if (columnId) {
                        if (jexcel.current.isColMerged(columnId).length) {
                            console.error('JEXCEL: This column is part of a merged cell.');
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
                    if (rowId) {
                        if (jexcel.current.isRowMerged(rowId).length) {
                            console.error('JEXCEL: This row is part of a merged cell.');
                        } else {
                            var target = (e.target.clientHeight / 2 > e.offsetY) ? e.target.parentNode.nextSibling : e.target.parentNode;
                            e.target.parentNode.parentNode.insertBefore(jexcel.current.dragging.element, target);
                        }
                    }
                }
            } else if (jexcel.current.resizing) {
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