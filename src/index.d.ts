export = jspreadsheet;
export as namespace jspreadsheet;

declare const jspreadsheet: jspreadsheet.JSpreadsheet;

declare namespace jspreadsheet {
  type CellValue = string | number | boolean;

  type DropdownSourceItem =
    | string
    | number
    | {
        id: string | number;
        name: string | number;
        title?: string | number;
        image?: string;
        group?: string | number;
      };

  interface CalendarOptions {
    /**
     * @default "DD/MM/YYYY"
     */
    format?: string;

    /**
     * Open calendar in full screen mode (this is automatic set for screensize < 800).
     */
    fullscreen?: boolean;

    /**
     * Month names.
     * @default ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
     */
    months?: [
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string
    ];

    /** Event fired when calendar value changes. */
    onchange?:
      | ((
          calendarElement: HTMLInputElement,
          newValue: string,
          oldValue: string
        ) => void)
      | null;

    /** Event fired when calendar modal is closed. */
    onclose?: Function | null;

    /** Placeholder. */
    placeholder?: string;

    /**
     * Allow keyboard date entry.
     * @default true
     */
    readonly?: boolean;

    /**
     * Show the reset button.
     * @default true
     */
    resetButton?: boolean;

    /**
     * Show timepicker.
     * @default false
     */
    time?: boolean;

    /** Today is default. */
    today?: boolean;

    /** Default date. */
    value?: string | null;

    /**
     * Weekday names.
     * @default ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
     */
    weekdays?: [string, string, string, string, string, string, string];

    /**
     * Weekday abbreviation names.
     * @default ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
     */
    weekdays_short?: [string, string, string, string, string, string, string];
  }

  interface CustomEditor {
    /**
     * Event responsible for closing the editor of a cell with a custom editor.
     * @param cell - Td tag whose editor should close.
     * @param save - If true, the value returned by this event will be the cell's new value. Otherwise, the value returned by this event is ignored.
     */
    closeEditor?: (
      cell: HTMLTableCellElement,
      save: boolean
    ) => CellValue | undefined;

    /**
     * Event called when creating new cells.
     * @param cell - HTML element prepared to be the new cell.
     * @returns HTML element that will be the new cell
     */
    createCell?: (cell: HTMLTableCellElement) => HTMLTableCellElement;

    /**
     * Event responsible for opening the editor of a cell with a custom editor.
     * @param cell - Td tag whose editor should open.
     * @param el - Root HTML element of this jss instance.
     * @param empty - If true, the editor should open with no value.
     * @param e - Event that called this method.
     */
    openEditor?: (
      cell: HTMLTableCellElement,
      el: JspreadsheetInstanceElement,
      empty: boolean | undefined,
      e: TouchEvent | undefined
    ) => void;

    /**
     * Event called before changing the value of a cell.
     *
     * The returned value will be the cell's new value.
     * @param cell - Cell whose value has changed.
     * @param value - New value.
     * @param force - If true, the change is configured to occur even in read-only cells.
     */
    updateCell?: (
      cell: HTMLTableCellElement,
      value: CellValue | undefined,
      force: boolean | undefined
    ) => CellValue | undefined;
  }

  type HorizontalAlign = "center" | "left" | "right" | "justify";

  interface BaseColumn {
    /** Cell alignment. */
    align?: HorizontalAlign;

    decimal?: string;

    editor?: CustomEditor;

    /** Cell mask. */
    mask?: string;

    /** Name used to refer to this column if the data is arranged as an array of objects. */
    name?: string;

    /**
     * Prevent user from changing cell values.
     * @default false
     */
    readOnly?: boolean;

    /**
     * If true, HTML inside column headings or cell values will be treated as regular text.
     *
     * If false, the HTML will be treated as HTML.
     * @default true
     */
    stripHTML?: boolean;

    /** Custom column title. */
    title?: string;

    /**
     * The type of cells in this column.
     * @default "text"
     */
    type?:
      | "text"
      | "numeric"
      | "hidden"
      | "dropdown"
      | "autocomplete"
      | "checkbox"
      | "radio"
      | "calendar"
      | "image"
      | "color"
      | "html";

    /** Column width. */
    width?: string | number;

    /**
     * Enable automatic word wrapping in cells in this column.
     * @default false
     */
    wordWrap?: boolean;
  }

  interface DropdownColumn extends BaseColumn {
    autocomplete?: boolean;

    /**
     * Allow selection of more than one item.
     * @default false
     */
    multiple?: boolean;

    /** Options available in the dropdown. */
    source?: DropdownSourceItem[];

    /** Url to fetch options from an external source. */
    url?: string;
  }

  interface CalendarColumn extends BaseColumn {
    /** Calendar options. */
    options?: CalendarOptions;
  }

  interface ColorColumn extends BaseColumn {
    /** If undefined, the cell shows the hex code of the color, if "square", it shows a square filled with the color. */
    render?: "square";
  }

  type Column = DropdownColumn | CalendarColumn | ColorColumn | BaseColumn;

  interface Row {
    /** Row height. */
    height?: string | number;

    /** Text that replaces the row number. */
    title?: string;
  }

  interface ToolbarItemBase {
    /** Means the style should be apply to the cell. */
    k?: string;

    /** Tooltip shown when hovering over this option. */
    tooltip?: string;
  }

  interface ToolbarIconItem extends ToolbarItemBase {
    id: string;
    type: "i";

    /** Defines the icon (from material icons). */
    content: string;

    /** The value of the style should be apply to the cell. */
    v?: string;

    /** Event fired when clicking on the html item referring to that item. */
    onclick?: (el: any, obj: any, iconElement: HTMLElement) => void;
  }

  interface ToolbarSelectItem extends ToolbarItemBase {
    type: "select";

    /** The value of the style should be apply to the cell. */
    v: string[];

    /** Select tag onchange event. */
    onchange?: (event: Event) => void;
  }

  interface ToolbarColorItem extends ToolbarItemBase {
    type: "color";

    /** Defines the icon (from material icons). */
    content: string;
  }

  type ToolbarItem = ToolbarIconItem | ToolbarSelectItem | ToolbarColorItem;

  interface NestedHeaderCell {
    id?: string,
    colspan?: number;
    title?: string;
    align?: string;
  }

  interface TranslationOptions {
    /**
     * @default "About"
     */
    about?: string;

    /**
     * @default "Add comments"
     */
    addComments?: string;

    /**
     * @default "Are you sure to delete the selected columns?"
     */
    areYouSureToDeleteTheSelectedColumns?: string;

    /**
     * @default "Are you sure to delete the selected rows?"
     */
    areYouSureToDeleteTheSelectedRows?: string;

    /**
     * @default "Cell already merged"
     */
    cellAlreadyMerged?: string;

    /**
     * @default "Clear comments"
     */
    clearComments?: string;

    /**
     * @default "Column name"
     */
    columnName?: string;

    /**
     * @default "Add comments"
     */
    comments?: string;

    /**
     * @default "Copy..."
     */
    copy?: string;

    /**
     * @default "Delete selected columns"
     */
    deleteSelectedColumns?: string;

    /**
     * @default "Delete selected rows"
     */
    deleteSelectedRows?: string;

    /**
     * @default "Edit comments"
     */
    editComments?: string;

    /**
     * @default " entries"
     */
    entries?: string;

    /**
     * @default "Insert a new column after"
     */
    insertANewColumnAfter?: string;

    /**
     * @default "Insert a new column before"
     */
    insertANewColumnBefore?: string;

    /**
     * @default "Insert a new row after"
     */
    insertANewRowAfter?: string;

    /**
     * @default "Insert a new row before"
     */
    insertANewRowBefore?: string;

    /**
     * @default "Invalid merged properties"
     */
    invalidMergeProperties?: string;

    /**
     * @default "No cells selected"
     */
    noCellsSelected?: string;

    /**
     * @default "No records found"
     */
    noRecordsFound?: string;

    /**
     * @default "Order ascending"
     */
    orderAscending?: string;

    /**
     * @default "Order descending"
     */
    orderDescending?: string;

    /**
     * @default "Paste..."
     */
    paste?: string;

    /**
     * @default "Rename this column"
     */
    renameThisColumn?: string;

    /**
     * @default "Save as..."
     */
    saveAs?: string;

    /**
     * @default "Search"
     */
    search?: string;

    /**
     * @default "Show "
     */
    show?: string;

    /**
     * @default "Showing page {0} of {1} entries"
     */
    showingPage?: string;

    /**
     * @default "There is a conflict with another merged cell"
     */
    thereIsAConflictWithAnotherMergedCell?: string;

    /**
     * @default "This action will clear your search results. Are you sure?"
     */
    thisActionWillClearYourSearchResultsAreYouSure?: string;

    /**
     * @default "This action will destroy any existing merged cells. Are you sure?"
     */
    thisActionWillDestroyAnyExistingMergedCellsAreYouSure?: string;
  }

  interface CellChange {
    col: string;
    newValue: CellValue;
    oldValue: CellValue;
    row: string;
    x: string;
    y: string;
  }

  interface HistoryRecord {
    action: string;
    [key: string]: any;
  }

  /**
   * Item compared in column ordering.
   *
   * It is composed respectively by the index of the row it represents and by the value of that row in the sorting column.
   */
  type SortingItem = [number, CellValue];

  type MetaInformation = Record<string, any>;

  interface JSpreadsheetOptions {
    /**
     * Show or not the "about" item in the context menu.
     * @default true
     */
    about?: boolean;

    /**
     * Allow comments over the cells.
     * @default false
     */
    allowComments?: boolean;

    /**
     * Allow delete a column.
     * @default true
     */
    allowDeleteColumn?: boolean;

    /**
     * Allow delete a row.
     * @default true
     */
    allowDeleteRow?: boolean;

    /**
     * Allow remove all rows. Otherwise, at least one row will be kept.
     * @default false
     */
    allowDeletingAllRows?: boolean;

    /**
     * Allow table export as csv.
     * @default true
     */
    allowExport?: boolean;

    /**
     * Allow insert a new column.
     * @default true
     */
    allowInsertColumn?: boolean;

    /**
     * Allow insert a new row.
     * @default true
     */
    allowInsertRow?: boolean;

    /**
     * Allow user to insert a new column using tab key on last column.
     * @default true
     */
    allowManualInsertColumn?: boolean;

    /**
     * Allow user to insert a new row using space key on last row.
     * @default true
     */
    allowManualInsertRow?: boolean;

    /**
     * Allow rename a column.
     * @default true
     */
    allowRenameColumn?: boolean;

    /**
     * If true, Jss will try to convert cell contents used in formulas to numbers
     * @default true
     */
    autoCasting?: boolean;

    /**
     * Auto increment actions when using the dragging corner.
     * @default true
     */
    autoIncrement?: boolean;

    /**
     * Css classes to apply to cells. Only one class per cell is accepted.
     * @example
     * {
     *    A1: "some-class",
     *    B3: "another-class"
     * }
     */
    classes?: Record<string, string>;

    /**
     * Column alignments. But they will only be used if the alignment is not specified in the column itself.
     * @deprecated Column alignment should be specified in the {@link JSpreadsheetOptions.columns} property.
     */
    colAlignments?: (HorizontalAlign | undefined | null)[];

    /**
     * Column titles. But they will only be used if the title is not specified in the column itself.
     * @deprecated Column titles should be specified in the {@link JSpreadsheetOptions.columns} property.
     */
    colHeaders?: (string | undefined | null)[];

    /**
     * Allow column dragging.
     * @default false
     */
    columnDrag?: boolean;

    /**
     * Allow column resizing.
     * @default true
     */
    columnResize?: boolean;

    /** Column settings. */
    columns?: Column[];

    /**
     * Allow column sorting.
     * @default true
     */
    columnSorting?: boolean;

    /**
     * Column widths. But they will only be used if the width is not specified in the column itself.
     * @deprecated Column widths should be specified in the {@link JSpreadsheetOptions.columns} property.
     */
    colWidths?: (string | number | undefined | null)[];

    /** Context menu content. */
    contextMenu?: (
      instance: JspreadsheetInstance,
      colIndex: string | null,
      rowIndex: string | null,
      event: PointerEvent
    ) => object[];

    /**
     * If true, copy and export will bring formula results. If false, it will bring formulas.
     * @default false
     */
    copyCompatibility?: boolean;

    /**
     * Load a external CSV file from this URL.
     */
    csv?: string;

    /**
     * Default delimiter for the CSV file. This value is used for both import and export.
     * @default ","
     */
    csvDelimiter?: string;

    /**
     * Default filename for a download method.
     * @default "jspreadsheet"
     */
    csvFileName?: string;

    /**
     * Load header titles from the CSV file.
     * @default true
     */
    csvHeaders?: boolean;

    /** Data loaded into the spreadsheet. */
    data?: CellValue[][] | Record<string, CellValue>[];

    /**
     * Default horizontal alignment used when a column does not have its alignment specified.
     * @default "center"
     */
    defaultColAlign?: HorizontalAlign;

    /**
     * Default width for columns with no specified width.
     * @default 50
     */
    defaultColWidth?: number;

    /**
     * Default row height.
     */
    defaultRowHeight?: number;

    /**
     * Detach the HTML table when calling updateTable.
     * @default false
     */
    detachForUpdates?: boolean;

    /**
     * Allow table edition.
     * @default true
     */
    editable?: boolean;

    /**
     * Enable column filters.
     * @default false
     */
    filters?: boolean;

    /**
     * Set the initial footer of the spreadsheet
     */
    footers?: string[][];

    /**
     * Number of columns frozen at the top of the spreadsheet.
     */
    freezeColumns?: number;

    /**
     * Fullscreen mode.
     * @default false
     */
    fullscreen?: boolean;

    imageOptions?: any;

    /**
     * Include header titles when all cell contents are copied.
     * @default false
     */
    includeHeadersOnCopy?: boolean;

    /**
     * Include header titles on download.
     * @default false
     */
    includeHeadersOnDownload?: boolean;

    /** Activate the table lazyloading. */
    lazyLoading?: boolean;

    /**
     * Show a loading spin while populating the table.
     * @default false
     */
    loadingSpin?: boolean;

    /** Cells to be merged in the table innitialization. */
    mergeCells?: Record<string, [number, number]>;

    /**
     * Meta information.
     */
    meta?: Record<string, MetaInformation>;

    /**
     * HTTP method used to load external data.
     * @default "GET"
     */
    method?: string;

    /**
     * Minimum table dimensions: [cols, rows].
     * @default [0, 0]
     */
    minDimensions?: [number, number];

    /**
     * Minimum number of spare cols.
     * @default 0
     */
    minSpareCols?: number;

    /**
     * Minimum number of spare rows.
     * @default 0
     */
    minSpareRows?: number;

    /** Define the nested headers. */
    nestedHeaders?: NestedHeaderCell[] | NestedHeaderCell[][];

    /**
     * Occurs after all changes are applied in the tables.
     * @param element - Root HTML element of this jss instance.
     * @param changes - list of changes.
     */
    onafterchanges?: (
      element: JspreadsheetInstanceElement,
      changes: CellChange[]
    ) => void;

    /**
     * Occurs before a column value is changed. If any value is returned, it will be the cell's new value.
     * @param element - Root HTML element of this jss instance.
     * @param cell - HTML element that represents the cell being changed.
     * @param colIndex - Cell column index being changed.
     * @param rowIndex - Cell row index being changed.
     * @param newValue - Value being applied to the cell
     */
    onbeforechange?: (
      element: JspreadsheetInstanceElement,
      cell: HTMLTableCellElement,
      colIndex: string | number,
      rowIndex: string | number,
      newValue: CellValue
    ) => undefined | CellValue;

    /**
     * Occurs before a column is excluded. If this method returns false, the removal will be canceled.
     * @param element - Root HTML element of this jss instance.
     * @param colIndex - Column index from which the removal will start.
     * @param numOfColumns - Number of columns to be removed.
     */
    onbeforedeletecolumn?: (
      element: JspreadsheetInstanceElement,
      colIndex: number,
      numOfColumns: number
    ) => undefined | boolean;

    /**
     * Occurs before a row is deleted. If this method returns false, the removal will be canceled.
     * @param element - Root HTML element of this jss instance.
     * @param rowIndex - Position of the row where removal will begin.
     * @param numOfRows - Number of rows that will be removed.
     */
    onbeforedeleterow?: (
      element: JspreadsheetInstanceElement,
      rowIndex: number,
      numOfRows: number
    ) => undefined | boolean;

    /**
     * Occurs before a new column is inserted. If this method returns false, the insertion will be canceled.
     * @param element - Root HTML element of this jss instance.
     * @param colIndex - Position of the column used as a reference for the insertion.
     * @param numOfColumns - Number of columns that should be added.
     * @param insertBefore - The columns should be inserted before or after the informed position in the "colIndex" parameter.
     */
    onbeforeinsertcolumn?: (
      element: JspreadsheetInstanceElement,
      colIndex: number,
      numOfColumns: number,
      insertBefore: boolean
    ) => undefined | boolean;

    /**
     * Occurs before a new row is inserted. If this method returns false, the insertion will be canceled.
     * @param element - Root HTML element of this jss instance.
     * @param rowIndex - Position of the row used as a reference for the insertion.
     * @param numOfRows - Number of rows that should be added.
     * @param insertBefore - The rows should be inserted before or after the informed position in the "rowindex" parameter.
     */
    onbeforeinsertrow?: (
      element: JspreadsheetInstanceElement,
      rowIndex: number,
      numOfRows: number,
      insertBefore: boolean
    ) => undefined | boolean;

    /**
     * Occurs before the paste action is performed.
     *
     * If it returns false, the jss cancels the paste.
     * If it returns a string, it will be the content pasted into the worksheet.
     *
     * @param element - Root HTML element of this jss instance.
     * @param copiedText - Text being pasted to the spreadsheet.
     * @param colIndex - Column index where it will start the paste.
     * @param rowIndex - Row index where it will start the paste.
     */
    onbeforepaste?: (
      element: JspreadsheetInstanceElement,
      copiedText: string,
      colIndex: number | string,
      rowIndex: number | string
    ) => undefined | boolean | string;

    /**
     * Occurs before persisting any changes to the server.
     *
     * This event is only called when the spreadsheet has the {@link JSpreadsheetOptions.persistance} property set.
     *
     * If this event returns false, the change is not persisted on the server.
     * If it returns a truthy value, that value is persisted instead of the initial value.
     * @param element - Root HTML element of this jss instance.
     * @param jssInstance - Jss Instance.
     * @param data - Changed data.
     */
    onbeforesave?: (
      element: JspreadsheetInstanceElement,
      jssInstance: JspreadsheetInstance,
      data: { row: number; data: Record<number, CellValue> }[]
    ) => any;

    /**
     * Occurs when the table is blurred.
     * @param element - Root HTML element of this jss instance.
     */
    onblur?: (element: JspreadsheetInstanceElement) => void;

    /**
     * Occurs after a column value is changed.
     * @param element - Root HTML element of this jss instance.
     * @param cell - HTML element that represents the cell being changed.
     * @param colIndex - Cell column index being changed.
     * @param rowIndex - Cell row index being changed.
     * @param newValue - New cell value.
     * @param oldValue - Old cell value.
     */
    onchange?: (
      element: JspreadsheetInstanceElement,
      cell: HTMLTableCellElement,
      colIndex: string | number,
      rowIndex: string | number,
      newValue: CellValue,
      oldValue: CellValue
    ) => void;

    /**
     * Occurs when a column heading is changed.
     * @param element - Root HTML element of this jss instance.
     * @param colIndex - Index of the column that was renamed.
     * @param oldValue - Old column title.
     * @param newValue - New column title.
     */
    onchangeheader?: (
      element: JspreadsheetInstanceElement,
      colIndex: string | number,
      oldValue: string,
      newValue: string
    ) => void;

    /**
     * Occurs when a "setMeta" is called.
     *
     * This event can be called with two different sets of arguments, depending on how the "setMeta" method was called.
     * With three arguments, which will be called "simple mode", and with one argument, which will be called "complex mode".
     *
     * @param cellName - The name of the cell that underwent the change, if in simple mode, or an object with the metadata changes, if in complex mode.
     * @param property - The name of the changed property, if in simple mode, or undefined, if in complex mode.
     * @param value - The value of the changed property, if in simple mode, or undefined, if in complex mode.
     */
    onchangemeta?: (
      cellName: string | Record<string, Record<string, any>>,
      property: string | undefined,
      value: string | undefined
    ) => void;

    /**
     * Occurs when the page is changed.
     * @param element - Root HTML element of this jss instance.
     * @param newPageNumber - Page the worksheet is on.
     * @param oldPageNumber - Page the worksheet was on.
     */
    onchangepage?: (
      element: JspreadsheetInstanceElement,
      newPageNumber: number,
      oldPageNumber: number
    ) => void;

    /**
     * Occurs when a "setStyle" is called.
     *
     * This event can be called with two different sets of arguments, depending on how the "setStyle" method was called.
     * With three arguments, which will be called "simple mode", and with one argument, which will be called "complex mode".
     *
     * @param cellName - The name of the cell that underwent the change, if in simple mode, or an object with the changes, if in complex mode.
     * @param cssProperty - The name of the changed property, if in simple mode, or undefined, if in complex mode.
     * @param propertyValue - The new value of the changed property, if in simple mode, or undefined, if in complex mode.
     */
    onchangestyle?: (
      cellName: string | Record<string, string>,
      cssProperty: string | undefined,
      propertyValue: string | undefined
    ) => void;

    /**
     * Occurs when a comment is changed.
     * @param element - Root HTML element of this jss instance.
     * @param newComment - New comment.
     * @param oldComment - Old comment.
     * @param cellPosition - Respectively the column and row indices of the cell whose comment was changed.
     * @param colIndex - Column index of the cell whose comment was changed.
     * @param rowIndex - Row index of the cell whose comment was changed.
     */
    oncomments?: (
      element: JspreadsheetInstanceElement,
      newComment: string | null,
      oldComment: string | null,
      cellPosition: [number, number],
      colIndex: number,
      rowIndex: number
    ) => void;

    /**
     * Occurs when the contents of one or more cells are copied.
     * @param element - Root HTML element of this jss instance.
     * @param copiedData - Data that has been copied.
     * @param hash - Deprecated.
     */
    oncopy?: (
      element: JspreadsheetInstanceElement,
      copiedData: string[],
      hash: number
    ) => void;

    /**
     * Occurs when an editor is opened.
     * @param element - Root HTML element of this jss instance.
     * @param td - Td tag of the cell whose editor was opened.
     * @param colIndex - Column index of the cell whose editor was opened.
     * @param rowIndex - Row index of the cell whose editor was opened.
     * @param input - Input of the editor that was opened.
     */
    oncreateeditor?: (
      element: JspreadsheetInstanceElement,
      td: HTMLTableCellElement,
      colIndex: string,
      rowIndex: string,
      input: HTMLElement
    ) => void;

    /**
     * Occurs after a column is excluded.
     * @param element - Root HTML element of this jss instance.
     * @param colIndex - Column index from which removal began.
     * @param numOfColumns - Number of columns removed.
     * @param deletedCells - List of cells removed.
     */
    ondeletecolumn?: (
      element: JspreadsheetInstanceElement,
      colIndex: number,
      numOfColumns: number,
      deletedCells: HTMLTableCellElement[][]
    ) => void;

    /**
     * Occurs after a row is excluded.
     * @param element - Root HTML element of this jss instance.
     * @param rowIndex - Row index from which removal began.
     * @param numOfRows - Number of rows removed.
     * @param deletedCells - List of cells removed.
     */
    ondeleterow?: (
      element: JspreadsheetInstanceElement,
      rowIndex: number,
      numOfRows: number,
      deletedCells: HTMLTableCellElement[][]
    ) => void;

    /**
     * Occurs when a closeEditor is called.
     * @param element - Root HTML element of this jss instance.
     * @param td - Td tag of the cell whose editor was opened.
     * @param colIndex - Column index of the cell whose editor was opened.
     * @param rowIndex - Row index of the cell whose editor was opened.
     * @param editorValue - Value that was in the editor.
     * @param wasSaved - Whether the value which was in the editor was saved in the cell or not.
     */
    oneditionend?: (
      element: JspreadsheetInstanceElement,
      td: HTMLTableCellElement,
      colIndex: number,
      rowIndex: number,
      editorValue: CellValue,
      wasSaved: boolean
    ) => void;

    /**
     * Occurs when a openEditor is called.
     * @param element - Root HTML element of this jss instance.
     * @param td - Td tag of the cell whose editor was opened.
     * @param colIndex - Column index of the cell whose editor was opened.
     * @param rowIndex - Row index of the cell whose editor was opened.
     */
    oneditionstart?: (
      element: JspreadsheetInstanceElement,
      td: HTMLTableCellElement,
      colIndex: string,
      rowIndex: string
    ) => void;

    /**
     * Event fired when any other event fires. It runs before the event that was called.
     *
     * If the called event has not been defined, the jss considers the value returned by onevent as the value returned by the called event.
     * @param event - Name of the event that was called.
     * @param rest - Arguments of the event that was called.
     */
    onevent?: (event: string, ...rest: any[]) => any;

    /**
     * Occurs when the table is focused.
     * @param element - Root HTML element of this jss instance.
     */
    onfocus?: (element: JspreadsheetInstanceElement) => void;

    /**
     * Occurs after a new column is inserted.
     * @param element - Root HTML element of this jss instance.
     * @param colIndex - Position of the column used as a reference for the insertion.
     * @param numOfColumns - Number of columns that were added.
     * @param addedCells - List of HTML elements that represent the added cells.
     * @param insertBefore - Columns were inserted before or after the informed position in the "colIndex" parameter.
     */
    oninsertcolumn?: (
      element: JspreadsheetInstanceElement,
      colIndex: number,
      numOfColumns: number,
      addedCells: HTMLTableCellElement[][],
      insertBefore?: boolean
    ) => void;

    /**
     * Occurs after a new row is inserted.
     * @param element - Root HTML element of this jss instance.
     * @param rowIndex - Position of the row used as a reference for the insertion.
     * @param numOfRows - Number of rows that were added.
     * @param addedCells - List of HTML elements that represent the added cells.
     * @param insertBefore - Rows were inserted before or after the informed position in the "rowIndex" parameter.
     */
    oninsertrow?: (
      element: JspreadsheetInstanceElement,
      rowIndex: number,
      numOfRows: number,
      addedCells: HTMLTableCellElement[][],
      insertBefore: boolean
    ) => void;

    /**
     * This method is called when the method setData.
     * @param element - Root HTML element of this jss instance.
     * @param instance - Jspreadsheet instance.
     */
    onload?: (
      element: JspreadsheetInstanceElement,
      instance: JspreadsheetInstance
    ) => void;

    /**
     * Occurs when a group of cells is merged.
     * @param element - Root HTML element of this jss instance.
     * @param mergeInitialCell - Name of the cell that is the top left corner of the merge.
     * @param colspan - Number of columns this merge occupies.
     * @param rowspan - Number of rows this merge occupies.
     */
    onmerge?: (
      element: JspreadsheetInstanceElement,
      mergeInitialCell: string,
      colspan: number,
      rowspan: number
    ) => void;

    /**
     * Occurs after a column is moved to a new position.
     * @param element - Root HTML element of this jss instance.
     * @param oldPosition - Column index before movement.
     * @param newPosition - Column index after movement.
     */
    onmovecolumn?: (
      element: JspreadsheetInstanceElement,
      oldPosition: number,
      newPosition: number
    ) => void;

    /**
     * Occurs after a row is moved to a new position.
     * @param element - Root HTML element of this jss instance.
     * @param oldPosition - Row index before movement.
     * @param newPosition - Row index after movement.
     */
    onmoverow?: (
      element: JspreadsheetInstanceElement,
      oldPosition: string | number,
      newPosition: number
    ) => void;

    /**
     * Occurs after a paste action is performed in the javascript table.
     * @param element - Root HTML element of this jss instance.
     * @param pastedData - Data pasted to the spreadsheet.
     */
    onpaste?: (
      element: JspreadsheetInstanceElement,
      pastedData: string[][]
    ) => void;

    /**
     * Occurs when a change is redone.
     * @param element - Root HTML element of this jss instance.
     * @param historyRecord - History item that was redone. If there are no more actions to redo, it takes the value undefined.
     */
    onredo?: (
      element: JspreadsheetInstanceElement,
      historyRecord: HistoryRecord | undefined
    ) => void;

    /**
     * Occurs after a change in column width.
     * @param element - Root HTML element of this jss instance.
     * @param colIndex - Index of column being resized.
     * @param newWidth - New column width.
     * @param oldWidth - Old column width.
     */
    onresizecolumn?: (
      element: JspreadsheetInstanceElement,
      colIndex: string | number,
      newWidth: string | number,
      oldWidth: number
    ) => void;

    /**
     * Occurs after a change in row height.
     * @param element - Root HTML element of this jss instance.
     * @param rowIndex - Index of row being resized.
     * @param newHeight - New row height.
     * @param oldHeight - Old row height.
     */
    onresizerow?: (
      element: JspreadsheetInstanceElement,
      rowIndex: string | number,
      newHeight: number,
      oldHeight: number
    ) => void;

    /**
     * Occurs when persistence on the server succeeds.
     * @param element - Root HTML element of this jss instance.
     * @param jssInstance - Jss Instance.
     * @param data - Data that has been sent to the server.
     */
    onsave?: (
      element: JspreadsheetInstanceElement,
      jssInstance: JspreadsheetInstance,
      data: any
    ) => void;

    /**
     * Occurs when selection is changed.
     * @param element - Root HTML element of this jss instance.
     * @param borderLeftIndex - Index of the first column contained by the selection.
     * @param borderTopIndex - Index of the first row contained by the selection.
     * @param borderRightIndex - Index of the last column contained by the selection.
     * @param borderBottomIndex - Index of the last row contained by the selection.
     */
    onselection?: (
      element: JspreadsheetInstanceElement,
      borderLeftIndex: number,
      borderTopIndex: number,
      borderRightIndex: number,
      borderBottomIndex: number,
      origin: any
    ) => void;

    /**
     * Occurs after a colum is sorted.
     * @param element - Root HTML element of this jss instance.
     * @param colIndex - Index of the column that was sorted.
     * @param order - Sorting direction. 0 for ascending and 1 for descending.
     */
    onsort?: (
      element: JspreadsheetInstanceElement,
      colIndex: string | number,
      order: 0 | 1
    ) => void;

    /**
     * Occurs when a change is undone.
     * @param element - Root HTML element of this jss instance.
     * @param historyRecord - History item that was undone. If there are no more actions to undo, it takes the value undefined.
     */
    onundo?: (
      element: JspreadsheetInstanceElement,
      historyRecord: HistoryRecord | undefined
    ) => void;

    /** Number of rows per page. */
    pagination?: number;

    /**
     * Values available in the dropdown for choosing the number of rows per page.
     *
     * This dropdown is only visible when the {@link JSpreadsheetOptions.search} option is true and the {@link JSpreadsheetOptions.pagination} option is greater than 0.
     */
    paginationOptions?: number[];

    /**
     * Enable execution of formulas inside the table.
     * @default true
     */
    parseFormulas?: boolean;

    /**
     * Try to identify the column type when the instance is created with a table tag.
     * @default false
     */
    parseTableAutoCellType?: boolean;

    /**
     * If creating the instance with a table tag, if this tag has no header, transform the first line into the header.
     * @default false
     */
    parseTableFirstRowAsHeader?: boolean;

    /**
     * Route where requests for data persistence will be sent. If true, the {@link JSpreadsheetOptions.url} property value will be used instead.
     */
    persistance?: boolean | string;

    /**
     * Request body used to load external data.
     */
    requestVariables?: any;

    /**
     * HTML element where the events of this instance will be listened to.
     *
     * Even if this property is specified, some events will still be listened to on the document object.
     * @default document
     */
    root?: HTMLElement;

    /**
     * Allow row dragging.
     * @default true
     */
    rowDrag?: boolean;

    /**
     * Allow row resizing.
     * @default false
     */
    rowResize?: boolean;

    /** Row settings. */
    rows?: Row[] | Record<number, Row>;

    /**
     * Allow search in the table.
     * @default false
     */
    search?: boolean;

    /**
     * If true, Jss will capitalize characters that are part of formulas. This does not apply to characters enclosed in double quotes, which represent text within formulas.
     * @default true
     */
    secureFormulas?: boolean;

    /**
     * Allow copy using the selection corner.
     * @default true
     */
    selectionCopy?: boolean;

    /**
     * Function used in sorting columns. If not specified, the default function will be used.
     * @param order - Sorting direction. 0 for ascending and 1 for descending.
     */
    sorting?: (
      order: 0 | 1
    ) => (itemA: SortingItem, itemB: SortingItem) => number;

    /**
     * If true, HTML inside column headings or cell values will be treated as regular text.
     *
     * If false, the HTML will be treated as HTML.
     * @default true
     */
    stripHTML?: boolean;

    /**
     * If true, the HTML present inside the cells is also copied when the user copies cells from the spreadsheet.
     *
     * This property only works when the {@link JSpreadsheetOptions.copyCompatibility} option is equal to "true".
     * @default false
     */
    stripHTMLOnCopy?: boolean;

    /**
     * Cell styles.
     */
    style?: Record<string, string>;

    /**
     * Set the max height of the table.
     * This property is only used when {@link JSpreadsheetOptions.tableOverflow} is allowed.
     * @default "300px"
     */
    tableHeight?: string;

    /**
     * Allow table overflow.
     * @default false
     */
    tableOverflow?: boolean;

    /**
     * Set the max width of the table.
     * This property is only used when {@link JSpreadsheetOptions.tableOverflow} is allowed.
     */
    tableWidth?: string;

    /** All messages to be customized. */
    text?: TranslationOptions;

    /**
     * If true, cell contents may overflow over empty cells.
     * @default false
     */
    textOverflow?: boolean;

    /** Add custom toolbars. */
    toolbar?: ToolbarItem[];

    /** Method to config custom script execution. NOTE: This does not work with lazyLoading, Pagination or Search options. */
    updateTable?: (
      instance: JspreadsheetInstance,
      cell: HTMLTableCellElement,
      colIndex: number,
      rowIndex: number,
      value: CellValue,
      displayedValue: string,
      cellName: string
    ) => void;

    /** Load a external json file from this URL. */
    url?: string;

    /**
     * Global text wrapping.
     * @default false
     */
    wordWrap?: boolean;
  }

  interface JspreadsheetInstanceElement extends HTMLDivElement {
    /**
     * Jss instance this element belongs to
     */
    jexcel: JspreadsheetInstance;

    /**
     * Jss instance this element belongs to
     */
    jspreadsheet: JspreadsheetInstance;
  }

  interface DragInfo {
    /**
     * Index where the row or column will be moved.
     */
    destination: number;
  }

  interface DragColumnInfo extends DragInfo {
    /**
     * Index of the column being moved.
     */
    column: string;

    /**
     * HTML element that corresponds to the column being moved.
     */
    element: HTMLTableCellElement;
  }

  interface DragRowInfo extends DragInfo {
    /**
     * Index of the row being moved.
     */
    row: string;

    /**
     * HTML element that corresponds to the row being moved.
     */
    element: HTMLTableRowElement;
  }

  interface ResizeInfo {
    /**
     * Mouse position when resizing started. This position refers to the vertical axis, when resizing a row, or the horizontal axis, when resizing a column.
     */
    mousePosition: number;
  }

  interface ResizeRowInfo extends ResizeInfo {
    /**
     * HTML element that represents the row.
     */
    element: HTMLTableRowElement;

    /**
     * Old row height.
     */
    height: number;

    /**
     * Index of the row being resized.
     */
    row: string;
  }

  interface ResizeColumnInfo extends ResizeInfo {
    /**
     * Index of the column being resized.
     */
    column: string;

    /**
     * Old column width.
     */
    width: number;
  }

  interface JspreadsheetInstance {
    ads: HTMLDivElement;

    /**
     * Close a cell editor.
     * @param cell - HTML td tag whose editor must be closed.
     * @param save - Whether or not to save editor content in cell.
     */
    closeEditor: (cell: HTMLTableCellElement, save: boolean) => void;

    /**
     * Close and apply a filter.
     * @param columnId Filter column index. If omitted, equals the index of the first filter that has value.
     */
    closeFilter: (columnId?: number) => void;

    /**
     * @deprecated
     */
    col: () => void;

    /**
     * List of "col" tags for this spreadsheet's table
     */
    colgroup: HTMLTableColElement[];

    /**
     * Colgroup tag for this spreadsheet's table
     */
    colgroupContainer: HTMLElement;

    /**
     * Resets the selection when at least one row or column it is in is removed.
     * @param type - 0 refers to deleting columns, 1 to deleting rows.
     * @param o - Index of the first row or column affected by the pruning.
     * @param d - Index of the last row or column affected by the pruning.
     */
    conditionalSelectionUpdate: (type: 0 | 1, o: number, d: number) => void;

    content: HTMLDivElement;

    /**
     * Jsuites contextmenu of this jss instance
     */
    contextMenu: HTMLDivElement;

    /**
     *
     * @param olnlyHighlighted - Copy only the contents of highlighted cells, or the contents of all cells. Default: false.
     * @param delimiter - Column separator. Default: "\t".
     * @param returnData - If true, ignore copy behavior (copy content to Clipboard and change aesthetics of selected content). Default: false.
     * @param includeHeaders - If true, the header will also be copied, ignoring properties that could affect this behavior ({@link JSpreadsheetOptions.includeHeadersOnDownload} and {@link JSpreadsheetOptions.includeHeadersOnCopy}). Default: false.
     * @param download - This parameter is only used if the "includeHeaders" parameter is false. In this case, if this parameter is true, the {@link JSpreadsheetOptions.includeHeadersOnDownload} property is used to decide whether the header is copied, but if this parameter is false, the {@link JSpreadsheetOptions.includeHeadersOnCopy} property is used instead. Default: false.
     */
    copy: (
      olnlyHighlighted?: boolean,
      delimiter?: string,
      returnData?: boolean,
      includeHeaders?: boolean,
      download?: boolean
    ) => string;

    /**
     * Copies the contents of the cells selected in the table to the cells within the range informed when calling this method.
     *
     * If {@link JspreadsheetInstance.selection} is empty, this method stops filling the range when it finds the first already filled cell.
     * @param o - First cell of the range to be filled.
     * @param d - Last cell of the range to be filled.
     */
    copyData: (o: HTMLTableCellElement, d: HTMLTableCellElement) => void;

    /**
     * HTML element that sits in the lower-right corner of selections.
     */
    corner: HTMLDivElement;

    /**
     * Create a table cell.
     * @param i - Cell column index.
     * @param j - Cell row index.
     * @param value - Cell value.
     */
    createCell: (
      i: number,
      j: number,
      value: CellValue
    ) => HTMLTableCellElement;

    /**
     * Creates a column heading cell.
     * @param colNumber - Index of the column that will receive the title cell.
     */
    createCellHeader: (colNumber: number) => void;

    /**
     * Create a nested header row.
     * @param nestedInformation - Nested header row settings. This object is changed during the execution of this method.
     */
    createNestedHeader: (
      nestedInformation: NestedHeaderCell[]
    ) => HTMLTableRowElement;

    /**
     * Creates a table row.
     *
     * This method updates the {@link JspreadsheetInstance.rows} and {@link JspreadsheetInstance.records} properties, but does not insert the row into the table.
     * @param j - Row index.
     * @param data - Row data. If omitted, data from property {@link JSpreadsheetOptions.data} at position "j" is used instead.
     */
    createRow: (j: number, data?: CellValue) => HTMLTableRowElement;

    /**
     * Creates the HTML structure of the table.
     */
    createTable: () => void;

    /**
     * Create the table toolbar.
     * @param toolbar - Toolbar settings. If omitted, the {@link JSpreadsheetOptions.toolbar} property is used instead.
     */
    createToolbar: (
      toolbar?: NonNullable<JSpreadsheetOptions["toolbar"]>
    ) => void;

    cursor: null | HTMLElement;

    /**
     * Last content copied.
     */
    data: string;

    /**
     * Remove columns.
     *
     * This method returns false if the {@link JSpreadsheetOptions.onbeforedeletecolumn} event returns false or if the dialog {@link TranslationOptions.thisActionWillDestroyAnyExistingMergedCellsAreYouSure} receives a negative response.
     * @param columnNumber - Column index from which removal starts.
     * @param numOfColumns - Number of columns to be removed.
     */
    deleteColumn: (
      columnNumber?: number,
      numOfColumns?: number
    ) => false | undefined;

    /**
     * Remove rows.
     *
     * This method returns false if the {@link JSpreadsheetOptions.onbeforedeleterow} event returns false or if the dialog cases {@link TranslationOptions.thisActionWillDestroyAnyExistingMergedCellsAreYouSure} or {@link TranslationOptions.thisActionWillClearYourSearchResultsAreYouSure} receive a negative response.
     * @param rowNumber - Row index from which removal starts.
     * @param numOfRows - Number of rows to be removed.
     */
    deleteRow: (rowNumber?: number, numOfRows?: number) => false | undefined;

    /**
     * Destroys that jss instance but doesn't remove all listeners.
     */
    destroy: () => void;

    /**
     * Remove all merged cells.
     * @param keepOptions - Keep merge settings. Default: false.
     */
    destroyMerged: (keepOptions?: boolean) => void;

    /**
     * Fire an event.
     *
     * The behavior of this method is influenced by the {@link JspreadsheetInstance.ignoreEvents} property.
     *
     * Before firing any event, this method fires the {@link JSpreadsheetOptions.onevent} event.
     *
     * The value returned by this method is the value returned by the event that was called.
     * If the called event is not defined, the returned value is the value returned by the {@link JSpreadsheetOptions.onevent} event.
     *
     * If the event called is the {@link JSpreadsheetOptions.onafterchanges} and the {@link JSpreadsheetOptions.persistance} property is set, this method sends a request to the server to save the change.
     * @param event - Event name.
     * @param rest - Arguments to be passed to the event.
     */
    dispatch: (event: string, ...rest: any[]) => any;

    /**
     * Performs the action of using the "down arrow" key on the keyboard.
     * @param shiftKey - The shift key is pressed. Default: false.
     * @param ctrlKey - The ctrl key is pressed. Default: false.
     */
    down: (shiftKey?: boolean, ctrlKey?: boolean) => void;

    /**
     * Get the current data as a CSV file.
     * @param includeHeaders - If true, include the header regardless of the {@link JSpreadsheetOptions.includeHeadersOnDownload} property value
     */
    download: (includeHeaders?: boolean) => void;

    /**
     * Stores information about the row or column being moved.
     */
    dragging: null | DragColumnInfo | DragRowInfo;

    /**
     * Currently open editor information. Respectively the cell whose editor is open, its initial value, its column index and its row index.
     */
    edition: null | [HTMLTableCellElement, string, string, string];

    /**
     * Root HTML element of this jss instance.
     */
    el: JspreadsheetInstance;

    /**
     * Solve formula.
     * @param expression - Formula.
     * @param x - Column index of the cell this formula belongs to.
     * @param y - Row index of the cell this formula belongs to.
     */
    executeFormula: (expression: string, x: number, y: number) => any;

    /**
     * Table row containing filter inputs.
     */
    filter: null | HTMLTableRowElement;

    /**
     * Active filters.
     */
    filters: (string[] | null)[];

    /**
     * Performs the action of using the "home" key on the keyboard.
     * @param shiftKey - The shift key is pressed. Default: false.
     * @param ctrlKey - The ctrl key is pressed. Default: false.
     */
    first: (shiftKey?: number, ctrlKey?: number) => void;

    /**
     * List of formulas that are used within other formulas. Each key is the name of a cell containing a formula, and each value is a list of cells whose formulas use the cell specified in the key.
     */
    formula: Record<string, string[]>;

    /**
     * Toogle table fullscreen mode.
     * @param activate - Desired mode. Default: The opposite of the current mode.
     */
    fullscreen: (activate?: boolean) => void;

    /**
     * Get cell DOM element by cell name.
     * @param cell - Cell name or coordinates.
     */
    getCell: (cell: string | [number, number]) => HTMLTableCellElement;

    /**
     * Get cell DOM element by cell coordinates.
     * @param x - Column index of the cell.
     * @param y - Row index of the cell.
     */
    getCellFromCoords: (x: number, y: number) => HTMLTableCellElement;

    /**
     * Get the data from one column by its index.
     * @param columnNumber - Column index.
     */
    getColumnData: (columnNumber: number) => CellValue[];

    /**
     * Get column options.
     * @param x - Column index.
     */
    getColumnOptions: (x: number) => Column;

    /**
     * Get comments from one or all cells.
     * @param cell - Cell name. If it is a falsy value, the comments of all cells are returned.
     * @param withAuthor - If true, also return the author of the comment. This parameter is only used if the "cell" parameter is a truthy value. Deprecated.
     */
    getComments: (
      cell?: string | [number, number],
      withAuthor?: boolean
    ) => Record<string, string> | [string, string] | string;

    /**
     * Get table config information.
     */
    getConfig: () => Record<string, any>;

    /**
     * Get the full or partial table data.
     * @param highlighted - If true, get only data from highlighted cells. If false, get data from all cells. Default: false.
     * @param dataOnly - If false, and the {@link JSpreadsheetOptions.copyCompatibility} property is true, the return is constructed using the innerHTML of the cells. Otherwise, it is constructed using the {@link JSpreadsheetOptions.data} property. Default: false.
     */
    getData: (highlighted?: boolean, dataOnly?: boolean) => CellValue[][];

    /**
     * Get the values of options from a dropdown column based on the column index and the keys of those options.
     * @param column - Column index.
     * @param key - Options keys.
     */
    getDropDownValue: (column: number, key: string | string[]) => string;

    /**
     * Get sum of width of all frozen columns.
     */
    getFreezeWidth: () => number;

    /**
     * Get the column title.
     * @param column - Column index.
     */
    getHeader: (column: number) => string;

    /**
     * Get all header titles.
     * @param asArray - If true, returns the items in an array, if false, returns them separated by ";" within a single string.
     */
    getHeaders: (asArray?: boolean) => string | string[];

    /**
     * Get height of all rows.
     */
    getHeight(): string[];

    /**
     * Get height of one row.
     * @param row - Column index.
     */
    getHeight(row: number): string;

    /**
     * Get highlighted cells.
     */
    getHighlighted: () => HTMLTableCellElement[];

    /**
     * Get the full or partial table data in JSON format.
     * @param highlighted - If true, get value from highlighted cells only. If false, get the value of all cells.
     */
    getJson: (highlighted?: boolean) => Record<string, CellValue>[];

    /**
     * Get json data by row number.
     * @param rowNumber - Row index.
     */
    getJsonRow: (rowNumber: number) => Record<string, CellValue>;

    /**
     * Get the innerHTML of a cell.
     * @param cell - Cell name or coordinates.
     */
    getLabel: (cell: [number, number] | string) => string;

    /**
     * Get the innerHTML of a cell.
     * @param x - Cell column index.
     * @param y - Cell row index.
     */
    getLabelFromCoords: (x: number, y: number) => string;

    /**
     * Get information from one or all merged cells
     * @param cellName - Cell name. If it is a falsy value, it returns the information of all merges. If the given cell is not the anchor of a merge, it returns null.
     */
    getMerge(
      cellName?: string
    ): Record<string, [number, number]> | [number, number] | null;

    /**
     * Get meta information from one or all cells.
     * @param cell - Cell name. If it is a falsy value, the metadata of all cells is returned.
     * @param key - Name of a property. This parameter is only used if the "cell" parameter is a truthy value. If this parameter is a falsy value, all the metadata of the cell is returned, otherwise, only the property informed in this parameter is returned.
     */
    getMeta: (cell?: string, key?: string) => any;

    /**
     * Get data from a row by its index.
     * @param rowNumber - Row index.
     */
    getRowData: (rowNumber: number) => CellValue[] | undefined;

    /**
     * Get indexes of the columns that have highlighted cells.
     */
    getSelectedColumns: () => number[];

    /**
     * Get information from rows that have highlighted cells.
     * @param asIds - If true, returns row indexes. Otherwise, it returns the HTML elements that represent the rows.
     */
    getSelectedRows: (asIds?: boolean) => number[] | HTMLTableRowElement[];

    /**
     * Get styles from one or all cells.
     * @param cell - Name or coordinate of a cell. If omitted, returns styles for all cells.
     * @param key - Style property. if specified, returns only that property. Otherwise, it returns all the cell's style properties.
     */
    getStyle: (
      cell?: string | [number, number],
      key?: string
    ) => string | Record<string, string>;

    /**
     * Get the value of a cell.
     * @param cell - Cell name, coordinates or HTML element.
     * @param processedValue - If true, and the {@link JSpreadsheetOptions.copyCompatibility} property is also true, it returns the cell's innerHTML. Otherwise, it returns the value of the cell in the {@link JSpreadsheetOptions.data} property.
     */
    getValue: (
      cell: [number, number] | string | HTMLTableCellElement,
      processedValue?: boolean
    ) => CellValue | null;

    /**
     * Get the value of a cell by its coordinates.
     * @param x - Column index.
     * @param y - Row index.
     * @param processedValue - If true, and the {@link JSpreadsheetOptions.copyCompatibility} property is also true, it returns the cell's innerHTML. Otherwise, it returns the value of the cell in the {@link JSpreadsheetOptions.data} property.
     */
    getValueFromCoords: (
      x: number,
      y: number,
      processedValue?: boolean
    ) => CellValue | null;

    /**
     * Get the width of one or all columns.
     * @param column - Index or a td tag of the column. If omitted, returns the widths of all columns.
     */
    getWidth: (column?: number | HTMLTableCellElement) => string[] | string;

    /**
     * @deprecated
     */
    hash: (str: string) => number;

    /**
     * @deprecated
     */
    hashString: null | number;

    /**
     * HTML element that corresponds to the header row.
     */
    headerContainer: HTMLTableRowElement;

    /**
     * List of cells that make up the header.
     */
    headers: HTMLTableCellElement[];

    /**
     * Hide a column.
     * @param colNumber - Column index.
     */
    hideColumn: (colNumber: number) => void;

    /**
     * Hide row count column.
     */
    hideIndex: () => void;

    /**
     * Hide Row.
     * @param rowNumber - Row index.
     */
    hideRow: (rowNumber: number) => void;

    /**
     * List of highlighted cells.
     */
    highlighted: HTMLTableCellElement[];

    /**
     * List of actions performed on the worksheet.
     */
    history: HistoryRecord[];

    /**
     * Current position of the {@link JspreadsheetInstance.history} property. Used to control movement through history.
     */
    historyIndex: number;

    /**
     * Undo or redo a column insertion or removal.
     * @param type - If 1, remove columns. If 0, add columns.
     * @param historyRecord - History action to be redone or undone.
     */
    historyProcessColumn: (type: 1 | 0, historyRecord: HistoryRecord) => void;

    /**
     * Undo or redo a row insertion or removal.
     * @param type - If 1, remove columns. If 0, add columns.
     * @param historyRecord - History action to be redone or undone.
     */
    historyProcessRow: (type: 1 | 0, historyRecord: HistoryRecord) => void;

    /**
     * If true, the {@link JspreadsheetInstance.dispatch} method no longer fires events, but still saves changes to the server.
     */
    ignoreEvents: boolean;

    /**
     * If true, the "setHistory" method does not create new records in the history.
     */
    ignoreHistory: boolean;

    /**
     * Initialization method.
     */
    init: () => void;

    /**
     * Insert one or more columns.
     *
     * This method returns false if the {@link JSpreadsheetOptions.onbeforeinsertcolumn} event returns false or if the {@link TranslationOptions.thisActionWillDestroyAnyExistingMergedCellsAreYouSure} dialog receives a negative response.
     * @param mixed - Number of columns to insert. It can also be an array of values, but in this case, only one column is inserted, whose data is based on the array items. Default: 1.
     * @param columnNumber - Index of the column used as reference for the insertion. Default: last column.
     * @param insertBefore - Insert new columns before or after the reference column. Default: false.
     * @param properties - New column properties.
     */
    insertColumn: (
      mixed?: number | CellValue[],
      columnNumber?: number,
      insertBefore?: boolean,
      properties?: Column[]
    ) => false | undefined;

    /**
     * Insert one or more rows.
     *
     * This method returns false if the {@link JSpreadsheetOptions.onbeforeinsertrow} event returns false or if the {@link TranslationOptions.thisActionWillDestroyAnyExistingMergedCellsAreYouSure} or {@link TranslationOptions.thisActionWillClearYourSearchResultsAreYouSure} dialogs receive a negative response.
     * @param mixed - Number of rows to insert. It can also be an array of values, but in this case, only one row is inserted, whose data is based on the array items. Default: 1.
     * @param rowNumber - Index of the row used as reference for the insertion. Default: last row.
     * @param insertBefore - Insert new rows before or after the reference row. Default: false.
     */
    insertRow: (
      mixed?: number | CellValue[],
      rowNumber?: number,
      insertBefore?: number
    ) => false | undefined;

    /**
     * Returns the merges that exist in a column.
     * @param x - Column index.
     * @param insertBefore - If it has a boolean value, instead of checking if the column has a merge, it checks if it has a merge with the column before or after it.
     */
    isColMerged: (x: number, insertBefore?: boolean) => string[];

    /**
     * Checks if a cell is read-only.
     * @param cell - Cell name or coordinates.
     */
    isReadOnly: (cell: string | [number, number]) => boolean;

    /**
     * Returns the merges that exist in a row.
     * @param y - Row index.
     * @param insertBefore - If it has a boolean value, instead of checking if the row has a merge, it checks if it has a merge with the row before or after it.
     */
    isRowMerged: (y: number, insertBefore?: boolean) => string[];

    /**
     * Performs the action of using the "end" key on the keyboard.
     * @param shiftKey - The shift key is pressed. Default: false.
     * @param ctrlKey - The ctrl key is pressed. Default: false.
     */
    last: (shiftKey?: boolean, ctrlKey?: boolean) => void;

    /**
     * Performs the action of using the "left arrow" key on the keyboard.
     * @param shiftKey - The shift key is pressed. Default: false.
     * @param ctrlKey - The ctrl key is pressed. Default: false.
     */
    left: (shiftKey?: boolean, ctrlKey?: boolean) => void;

    /**
     * Renders new rows to the end of the table and removes rows from the beginning.
     *
     * @returns If any row is removed from the beginning of the table, it returns 1, otherwise it returns 0.
     */
    loadDown: () => 0 | 1;

    /**
     * Move to a virtual page within a table using {@link JSpreadsheetOptions.lazyLoading}. Each virtual page has 100 lines.
     * @param pageNumber
     */
    loadPage: (pageNumber: number) => void;

    /**
     * Renders new rows at the beginning of the table and removes rows from the end.
     * @returns If any row is removed from the end of the table, it returns 1, otherwise it returns 0.
     */
    loadUp: () => 0 | 1;

    /**
     * Load the page where the DOM represented by {@link JspreadsheetInstance.selectedCell} would be.
     */
    loadValidation: () => boolean;

    /**
     * Move a column.
     *
     * This method returns false if the {@link TranslationOptions.thisActionWillDestroyAnyExistingMergedCellsAreYouSure} dialog receives a negative response.
     * @param o - Column index.
     * @param d - New column index.
     */
    moveColumn: (o: number, d: number) => false | undefined;

    /**
     * Move a row.
     *
     * This method returns false if the {@link TranslationOptions.thisActionWillDestroyAnyExistingMergedCellsAreYouSure} or {@link TranslationOptions.thisActionWillClearYourSearchResultsAreYouSure} dialogs receive a negative response.
     * @param o - Row index.
     * @param d - New row index.
     * @param ignoreDom - If true, this method does not change the html.
     */
    moveRow: (o: number, d: number, ignoreDom?: boolean) => false | undefined;

    /**
     * Shortcut to fire the {@link JSpreadsheetOptions.onafterchanges} event.
     *
     * Internally, this method uses the {@link JspreadsheetInstance.dispatch} method.
     * @param element - Root HTML element of this jss instance.
     * @param changes - list of changes.
     */
    onafterchanges: (
      element: JspreadsheetInstanceElement,
      changes: CellChange[]
    ) => void;

    /**
     * Open a cell editor.
     * @param cell - Td tag whose editor should open.
     * @param empty - If true, opens the editor without populating it with the current cell value. This parameter only works for cells of type "text" or "numeric" or for cells with custom editors.
     * @param e - Event that called this method.
     */
    openEditor: (
      cell: HTMLTableCellElement,
      empty?: boolean,
      e?: TouchEvent
    ) => void;

    /**
     * Open the column filter.
     *
     * This method only runs if the {@link JSpreadsheetOptions.filters} property is true.
     * @param columnId - Column index.
     */
    openFilter: (columnId: number) => void;

    /**
     * Spreadsheet settings.
     */
    options: JSpreadsheetOptions;

    /**
     * Reorder rows based on values in a column.
     *
     * This method returns false if the {@link TranslationOptions.thisActionWillDestroyAnyExistingMergedCellsAreYouSure} dialog receives a negative response, or returns true if the sort is successful.
     * @param column - Column index. If the value of this parameter is less than 0, the method returns false and does not perform sorting.
     * @param order - Sorting direction. 0 for ascending and 1 for descending.
     */
    orderBy: (column: number, order: 0 | 1) => boolean | undefined;

    /**
     * Go to page. Valid only when {@link JSpreadsheetOptions.pagination} is true.
     * @param pageNumber - Page number (starting at 0).
     */
    page: (pageNumber: number) => number;

    /**
     * Current spreadsheet page.
     */
    pageNumber: null | number;

    /**
     * Div with pagination controls.
     */
    pagination: HTMLDivElement;

    /**
     * Convert data to csv pattern.
     * @param str - Data.
     * @param delimiter - CSV delimiter. Defaut: ",".
     */
    parseCSV: (str: number, delimiter?: number) => string[][];

    /**
     * Extract a number from a string.
     * @param value - Text from which the number is extracted.
     * @param columnNumber - Column index. This information is used to define the decimal number separator.
     */
    parseNumber: (value: string, columnNumber: number) => number | null;

    /**
     * Process the value of a cell.
     * @param i - Cell column index.
     * @param j - Cell row index.
     * @param value - Value to be processed.
     * @param cell - HTML element that represents the cell. Used when the cell mask causes some change in the font color.
     */
    parseValue: (
      i: number,
      j: number,
      value: CellValue,
      cell?: HTMLTableCellElement
    ) => any;

    /**
     * Paste data into spreadsheet.
     * @param x - Column index of the cell where the paste starts.
     * @param y - Row index of the cell where the paste starts.
     * @param data - Data to be pasted.
     */
    paste: (x: number, y: number, data: string) => false | undefined;

    /**
     * Format data to the template accepted by the server.
     * @param data - Data to be formatted.
     */
    prepareJson: (data: CellChange[]) => {
      row: number;
      data: Record<number, CellValue>;
    };

    /**
     * Prepare the jspreadsheet table.
     */
    prepareTable: () => void;

    /**
     * List of HTML elements representing table cells.
     */
    records: HTMLTableCellElement[][];

    /**
     * Redo previously undone action
     */
    redo: () => void;

    /**
     * Refresh the data.
     */
    refresh: () => void;

    /**
     * Refresh current selection.
     */
    refreshSelection: () => void;

    /**
     * Remove autocomplete selection.
     */
    removeCopySelection: () => void;

    /**
     * Remove copy borders.
     */
    removeCopyingSelection: () => void;

    /**
     * Remove a merge.
     * @param cellName - Merge anchor cell.
     * @param data - Data to be placed in cells released from the merge.
     * @param keepOptions - If true, keep merge settings in sheet settings.
     */
    removeMerge: (
      cellName: string,
      data?: CellValue[],
      keepOptions?: boolean
    ) => void;

    /**
     * Reset all filters.
     */
    resetFilters: () => void;

    /**
     * Reset search
     */
    resetSearch: () => void;

    /**
     * Reset highlighted cell selection.
     * @param blur - If true and there were highlighted cells, this method fires the {@link JSpreadsheetOptions.onblur} event.
     * @returns If there were highlighted cells, it returns 1, otherwise it returns 0.
     */
    resetSelection: (blur?: boolean) => 0 | 1;

    /**
     * Reset styles of one or more cells.
     * @param o - Object whose keys are the names of the cells that must have their styles reset.
     * @param ignoreHistoryAndEvents - If true, do not add this action to history.
     */
    resetStyle: (
      o: Record<string, any>,
      ignoreHistoryAndEvents?: boolean
    ) => void;

    /**
     * Information about the row or column currently being resized.
     */
    resizing: null | ResizeRowInfo | ResizeColumnInfo;

    /**
     * Indices of the rows that include the searched text.
     */
    results: null | number[];

    /**
     * Performs the action of using the "right arrow" key on the keyboard.
     * @param shiftKey - The shift key is pressed. Default: false.
     * @param ctrlKey - The ctrl key is pressed. Default: false.
     */
    right: (shiftKey?: boolean, ctrlKey?: boolean) => void;

    /**
     * Internal method.
     */
    row: () => void;

    /**
     * List of rows that make up the table.
     */
    rows: HTMLTableRowElement[];

    /**
     * Post json to a remote server.
     *
     * This method fires the {@link JSpreadsheetOptions.onbeforesave} and {@link JSpreadsheetOptions.onsave} events.
     * @param url - Server url.
     * @param data - data to be saved.
     * @returns If the "onbeforesave" event returns false, this method returns false.
     */
    save: (
      url: string,
      data: { row: number; data: Record<number, CellValue> }[]
    ) => false | undefined;

    /**
     * Internal method.
     */
    scrollControls: (e: any) => void;

    /**
     * Search for some text.
     * @param query - Text to be searched.
     * @returns Number of results on the first page.
     */
    search: (query: string) => number;

    /**
     * Text field used to perform searches.
     */
    searchInput: HTMLInputElement;

    /**
     * Select all table cells.
     */
    selectAll: () => void;

    /**
     * Current selection coordinates.
     *
     * The array is composed respectively by the indices of the leftmost column of the selection [0], the topmost row of the selection [1], the rightmost column of the selection [2] and the bottommost row selection [3].
     */
    selectedCell:
      | null
      | [number, number, number, number]
      | [string, string, string, string];

    selectedContainer: null | [number, number, number, number];

    /**
     * Cells that currently have "autocomplete selection".
     */
    selection: HTMLTableCellElement[];

    /**
     * In "checkbox" type cells, inverts their values. In "radio" type cells, the last cell selected in each column takes on the value true, while the rest of the cells in the column take on the value false.
     */
    setCheckRadioValue: () => void;

    /**
     * Set the data from one column by index.
     * @param colNumber - Column index.
     * @param data - New data. Positions with the null value are not changed in the table.
     */
    setColumnData: (colNumber: number, data: (CellValue | null)[]) => void;

    /**
     * Set or remove comments.
     * @param cellId - Name or coordinates of the cell.
     * @param comments - New comment. If it is a falsy value, the method just uncomments the cell.
     * @param author - Comment author. Deprecated.
     */
    setComments: (
      cellId: string | [number, number],
      comments: string,
      author: string
    ) => void;

    /**
     * Set data.
     * @param data - New data. It can be an array of cell values, an array of objects whose values are cell values, or a json with one of the previous two alternatives.
     */
    setData: (
      data?: CellValue[][] | Record<string, CellValue>[] | string
    ) => void;

    /**
     * Remove the current footer, if it exists, and define a new one.
     * @param data - New footer.
     */
    setFooter: (data: string[][]) => void;

    /**
     * Set a column title.
     * @param column - Column index.
     * @param newValue - New title. If it is a falsy value, the prompt is displayed requesting the new title.
     */
    setHeader: (column: number, newValue?: string) => void;

    /**
     * Change row height.
     * @param row - Index of a row or an HTML element that represents a row or a column of the table. In the second option, the row index (data-y attribute) of that element is used.
     * @param height - New height. An integer greater than zero.
     * @param oldHeight - Old height. Height to which this line returns in case this action is undone. Default: Current height.
     */
    setHeight: (
      row: number | HTMLTableRowElement | HTMLTableCellElement,
      height: number,
      oldHeight?: number
    ) => void;

    /**
     * Add record to history.
     * @param changes - New record.
     */
    setHistory: (changes: HistoryRecord) => void;

    /**
     * Merge cells.
     * @param cellName - Name or coordinates of a cell. If it is a falsy value, this method merges the selected cells in the table and ignores all parameters of this method except "ignoreHistoryAndEvents".
     * @param colspan - Number of columns this merge occupies.
     * @param rowspan - Number of rows this merge occupies.
     * @param ignoreHistoryAndEvents - If true, do not add this change to the history or fire the {@link JSpreadsheetOptions.onmerge} event.
     * @returns If the "cellName" parameter is a false value, and there are no cells selected in the table, this method returns null.
     */
    setMerge: (
      cellName?: string | [number, number],
      colspan?: number,
      rowspan?: number,
      ignoreHistoryAndEvents?: boolean
    ) => null | undefined;

    /**
     * Set a property on a cell's meta information.
     * @param o - Cell name.
     * @param k - Property name.
     * @param v - Property value.
     */
    setMeta(o: string, k: string, v: string): void;

    /**
     * Remove current and define new meta information for one or more cells.
     * @param o - Object with the new meta information.
     */
    setMeta(o: Record<string, Record<string, any>>): void;

    /**
     * Makes a cell read-only or not.
     * @param cell - Cell name or coordinates.
     * @param state - If true, the cell becomes read-only, otherwise it loses this status.
     */
    setReadOnly: (cell: string | [number, number], state?: boolean) => void;

    /**
     * Set a row data by index.
     * @param rowNumber - Row index.
     * @param data - New data. Positions with the null value are not changed in the table.
     */
    setRowData: (rowNumber: number, data: (CellValue | null)[]) => void;

    /**
     * Change a single style of one or more cells.
     * @param o - Name of a cell or list of HTML elements that represent cells.
     * @param k - property to be changed.
     * @param v - New property value. If equal to the property's current value and the "force" parameter is false, removes that property from the style.
     * @param force - If true, changes the value of the property even if the cell is read-only. Also, if true, even if the new value of the property is the same as the current one, the property is not removed.
     * @param ignoreHistoryAndEvents - If true, this method does not save the style change in history.
     */
    setStyle(
      o: string | HTMLTableCellElement[],
      k: string,
      v: string,
      force?: boolean,
      ignoreHistoryAndEvents?: boolean
    ): void;

    /**
     * Change cell styles.
     * @param o - Object where each key is the name of a cell and each value is the style changes for that cell. Each value can be a string with css styles separated by semicolons or an array where each item is a string with a css style.
     * @param k - It is not used.
     * @param v - It is not used.
     * @param force - If true, changes the value of the property even if the cell is read-only. Also, if true, even if the new value of the property is the same as the current one, the property is not removed.
     * @param ignoreHistoryAndEvents - If true, this method does not save the style change in history.
     */
    setStyle(
      o: Record<string, string | string[]>,
      k?: null | undefined,
      v?: null | undefined,
      force?: boolean,
      ignoreHistoryAndEvents?: boolean
    ): void;

    /**
     * Change the value of one or more cells.
     * @param cell - Name of a cell, HTML element that represents a cell or an array whose items can be any of the previous alternatives or objects. When an array item is an object, it must have the cell coordinates ("x" and "y") and can have the cell's new value ("newValue" or, if it doesn't exist, "value"), but if does not have it, the "value" parameter is used instead.
     * @param value - New cell value.
     * @param force - If true, changes the value of even read-only cells.
     */
    setValue: (
      cell:
        | string
        | HTMLTableCellElement
        | (
            | string
            | { x: number; y: number; newValue?: CellValue; value?: CellValue }
            | HTMLTableCellElement
          )[],
      value?: CellValue,
      force?: boolean
    ) => void;

    /**
     * Set a cell value based on its coordinates.
     * @param x - Cell column index.
     * @param y - Cell row index.
     * @param value - New value.
     * @param force - If true, changes the value of even read-only cells.
     */
    setValueFromCoords: (
      x: number,
      y: number,
      value: CellValue,
      force?: boolean
    ) => void;

    /**
     * Set the width of a column.
     * @param column - Column index.
     * @param width - New width.
     * @param oldWidth - Width that this column reverts to if this action is undone. Default: Column current width.
     */
    setWidth(column: number, width: number, oldWidth?: number): void;

    /**
     * Set the width of one or more columns.
     * @param column - Column indexes.
     * @param width - New widths.
     * @param oldWidth - Widths that columns revert to if this action is undone. Default: Columns current width.
     */
    setWidth(
      column: number[],
      width: number | number[],
      oldWidth?: number | number[]
    ): void;

    /**
     * Show hidden column.
     * @param colNumber - Column index.
     */
    showColumn: (colNumber: number) => void;

    /**
     * Show row count column.
     */
    showIndex: () => void;

    /**
     * Show hidden row.
     * @param rowNumber - Row index.
     */
    showRow: (rowNumber: number) => void;

    /**
     * Styles of the cells that were copied.
     */
    style: string[];

    /**
     * HTML table tag of this jss instance.
     */
    table: HTMLTableElement;

    /**
     * HTML tbody tag of this jss instance.
     */
    tbody: HTMLTableSectionElement;

    /**
     * HTML textarea tag used internally when copying cells.
     */
    textarea: HTMLTextAreaElement;

    /**
     * HTML thead tag of this jss instance.
     */
    thead: HTMLTableSectionElement;

    /**
     * HTML div tag used as the toolbar of this jss instance.
     */
    toolbar: HTMLDivElement;

    /**
     * Undo last action.
     */
    undo: () => void;

    /**
     * Performs the action of using the "up arrow" key on the keyboard.
     * @param shiftKey - The shift key is pressed. Default: false.
     * @param ctrlKey - The ctrl key is pressed. Default: false.
     */
    up: (shiftKey?: boolean, ctrlKey?: boolean) => void;

    /**
     * Update cell content.
     * @param x - Cell column index.
     * @param y - Cell row index.
     * @param value - New value.
     * @param force - If true, changes the value of even read-only cells.
     * @returns Returns an object with cell coordinates. If the content has been updated, this object also has the new and old cell values.
     */
    updateCell: (
      x: number,
      y: number,
      value: CellValue,
      force?: boolean
    ) => {
      x: number;
      y: number;
      col: number;
      row: number;
      newValue?: CellValue;
      oldValue?: CellValue;
    };

    /**
     * Create an autocomplete selection from the current selection in the table. The autocomplete selection is built from the current selection to the coordinates in the parameters or as close as possible to them.
     * @param x3 - Column index of the autocomplete selection boundary cell.
     * @param y3 - Row index of the autocomplete selection boundary cell.
     */
    updateCopySelection: (x3: number, y3: number) => void;

    /**
     * Place the {@link JspreadsheetInstance.corner} in the last cell of the {@link JspreadsheetInstance.highlighted}.
     */
    updateCornerPosition: () => void;

    /**
     * Replace cell names in a formula.
     * @param formula - Formula.
     * @param referencesToUpdate - Cell names to be replaced.
     * @returns Formula with replaced cell names.
     */
    updateFormula: (
      formula: string,
      referencesToUpdate: Record<string, string>
    ) => string;

    /**
     * Updates the value of cells whose formula depends on another cell.
     * @param x - Column index of the cell that was changed.
     * @param y - Row index of the cell that was changed.
     * @param records - List of changes. This array is incremented with the new changes made by this method.
     */
    updateFormulaChain: (
      x: number,
      y: number,
      records: ReturnType<JspreadsheetInstance["updateCell"]>[]
    ) => void;

    /**
     * Replace cell names in all formulas.
     * @param referencesToUpdate - Cell names to be replaced.
     */
    updateFormulas: (referencesToUpdate: Record<string, string>) => void;

    /**
     * Updates the position and appearance of frozen columns. This update is based on the position of the scroll.
     */
    updateFreezePosition: () => void;

    /**
     * Replace cell names in meta information.
     * @param affectedCells - Cell names to be replaced.
     */
    updateMeta: (affectedCells: Record<string, string>) => void;

    /**
     * Update a nested header title.
     * @param x - Nested header cell column index.
     * @param y - Nested header cell row index.
     * @param title - New title.
     */
    updateNestedHeader: (x: number, y: number, title: string) => void;

    /**
     * Reorder rows.
     * @param rows - List of indexes of the new order.
     */
    updateOrder: (rows: number[]) => void;

    /**
     * Change the sort symbol next to column headings.
     * @param column - Column index.
     * @param order - Symbol order. Default: false.
     */
    updateOrderArrow: (column: number, order?: boolean) => void;

    /**
     * Update the content of the {@link JspreadsheetInstance.pagination}.
     */
    updatePagination: () => void;

    /**
     * Internal method.
     */
    updateResult: () => number;

    /**
     * Internal method.
     */
    updateScroll: (direction: 0 | 1) => void;

    /**
     * Select cells.
     * @param el1 - First cell of the selection.
     * @param el2 - Last cell of the selection. If omitted, uses the parameter value "el1".
     */
    updateSelection: (
      el1: HTMLTableCellElement,
      el2?: HTMLTableCellElement,
      origin?: any
    ) => void;

    /**
     * Select cells.
     * @param x1 - Column index of the first cell of the selection.
     * @param y1 - Row index of the first cell of the selection. If omitted, the entire "x1" column is selected.
     * @param x2 - Column index of the last cell of the selection. Default: Parameter "x1".
     * @param y2 - Row index of the last cell of the selection. This parameter is only used if parameter "y1" is defined. Default: Parameter "y1".
     */
    updateSelectionFromCoords: (
      x1: number,
      y1?: number,
      x2?: number,
      y2?: number,
      origin?: any
    ) => void;

    updateTable: () => void;

    /**
     * Internal method.
     */
    updateTableReferences: () => void;

    /**
     * Internal method.
     */
    wheelControls: () => void;

    /**
     * Get the page index of a row.
     * @param cell - Row index.
     */
    whichPage: (cell: number) => number;
  }

  type Version = () => {
    host: string;
    license: string;
    print: () => string;
    title: string;
    type: string;
    version: string;
  };

  interface TabOptions extends JSpreadsheetOptions {
    sheetName: string;
  }

  interface JssHelpers {
    /**
     * @deprecated
     */
    createFromTable: () => void;

    /**
     * Internal method.
     */
    getCaretIndex: (e: any) => number;

    /**
     * Get the column letter(s) based on its index.
     * @param i - Column index.
     */
    getColumnName: (i: number) => string;

    /**
     * Get "A1" style coordinates based on column and row indices.
     * @param x - Column index.
     * @param y - Row index.
     */
    getColumnNameFromCoords: (x: number, y: number) => string;

    /**
     * Get column and row indices based on coordinate in "A1" style.
     * @param columnName - Coordinate in "A1" style.
     */
    getCoordsFromColumnName: (
      columnName: string
    ) => [number, number | null] | undefined;

    /**
     * Inserts an array within another at the given index.
     *
     * This method does not change the original arrays.
     * @param o - Array that receives items from another array.
     * @param idx - Index where insertion takes place.
     * @param arr - Array that is inserted into the other.
     */
    injectArray: <ItemA, ItemB>(
      o: ItemA[],
      idx: number,
      arr: ItemB[]
    ) => (ItemA | ItemB)[];

    /**
     * Internal method.
     */
    invert: (o: object) => any[] & Record<string, any>;

    /**
     * Parse CSV string to JS array.
     * @param str - Text in csv format.
     * @param delimiter - Csv delimiter.
     */
    parseCSV: (str: string, delimiter?: string) => string[][];
  }

  interface JSpreadsheet {
    (
      element: HTMLDivElement | HTMLTableElement,
      options?: JSpreadsheetOptions
    ): JspreadsheetInstance;

    /**
     * Set event listeners.
     * @param root - HTML element where events are listened to.
     */
    build: (root: Document | HTMLElement) => void;

    /**
     * "contextmenu" event handler.
     * @param e - Event.
     */
    contextMenuControls: (e: MouseEvent) => void;

    /**
     * Handler used when using the "Ctrl + x" command on a non-editable spreadsheet.
     */
    copyControls: () => void;

    /**
     * Returns a set of options for creating a jss spreadsheet based on an HTML table.
     * @param el - HTML table.
     * @param options - Prior options. Options that, if not overridden by options taken from the HTML table, will be part of the result.
     */
    createFromTable: (
      el: HTMLTableElement,
      options?: JSpreadsheetOptions
    ) => JSpreadsheetOptions;

    /**
     * Compatibility with previous versions.
     */
    createTabs: this["tabs"];

    /**
     * Current instance of jss.
     */
    current: null | JspreadsheetInstance;

    /**
     * Handler used when using the "Ctrl + x" command on an editable spreadsheet.
     */
    cutControls: () => void;

    /**
     * Destroy an instance of jss.
     * @param element - Root element of jss instance.
     * @param destroyEventHandlers - Remove event listeners. Default: false.
     */
    destroy: (
      element: JspreadsheetInstanceElement,
      destroyEventHandlers?: boolean
    ) => void;

    /**
     * "dblclick" event handler.
     * @param e - Event.
     */
    doubleClickControls: (e: MouseEvent) => void;

    /**
     * Converts a number to a form with at least 2 digits.
     * @param v - Number.
     */
    doubleDigitFormat: (v: number | string) => string;

    /**
     * Internal method.
     */
    formula: any;

    /**
     * Converts data from an xlsx file to a format that jss recognizes.
     *
     * This is an experimental implementation and there is no garantee your spreadsheet will be correctly parsed.
     * @param file - File url.
     * @param __callback - Callback that receives the converted data.
     */
    fromSpreadsheet: (
      file: string | URL,
      __callback: (spreadsheets: TabOptions[]) => void
    ) => void;

    /**
     * Get the column letter(s) based on its index.
     * @param i - Column index.
     */
    getColumnName: (i: number) => string;

    /**
     * Convert coordinates to "A1" style.
     * @param cellId - Coordinates. Two formats are allowed: an array [column index, row index] or a string with column index and row index separated by the "-" character.
     */
    getColumnNameFromId: (cellId: [number, number] | string) => string;

    /**
     * Checks if an HTML element is part of a jss worksheet.
     *
     * If it is part of the worksheet, this method returns an array with, respectively, the base element of the worksheet and a number representing in which part of the worksheet the informed element is located (1 for inside the thead tag, 2 for inside the tbody tag and 0 if not in any of the above).
     *
     * If not part of the worksheet, this method returns an array with two items equal to zero.
     * @param element - HTML Element.
     */
    getElement: (element: HTMLElement) => [0 | JspreadsheetInstance, 0 | 1 | 2];

    /**
     * Convert coordinates from "A1" style.
     * @param id - Coordinate.
     * @param arr - Conversion format. If true, the method returns an array [column index, row index]. Otherwise, returns a string with column index and row index separated by the "-" character.
     */
    getIdFromColumnName: (
      id: string,
      arr?: boolean
    ) => [number, number] | string;

    helpers: JssHelpers;

    /**
     * Inserts an array within another at the given index.
     *
     * This method does not change the original arrays.
     * @param o - Array that receives items from another array.
     * @param idx - Index where insertion takes place.
     * @param arr - Array that is inserted into the other.
     */
    injectArray: <ItemA, ItemB>(
      o: ItemA[],
      idx: number,
      arr: ItemB[]
    ) => (ItemA | ItemB)[];

    /**
     * Internal method.
     */
    isMouseAction: boolean;

    /**
     * "keydown" event handler.
     * @param e - Event.
     */
    keyDownControls: (e: KeyboardEvent) => void;

    /**
     * "mousedown" event handler.
     * @param e - Event.
     */
    mouseDownControls: (e: MouseEvent) => void;

    /**
     * "mousemove" event handler.
     * @param e - Event.
     */
    mouseMoveControls: (e: MouseEvent) => void;

    /**
     * "mousemove" event handler.
     * @param e - Event.
     */
    mouseOverControls: (e: MouseEvent) => false | undefined;

    /**
     * "mouseup" event handler.
     * @param e - Event.
     */
    mouseUpControls: (e: MouseEvent) => void;

    /**
     * "paste" event handler.
     * @param e - Event.
     */
    pasteControls: (e?: ClipboardEvent) => void;

    /**
     * Defines translations.
     * @param o - Translations.
     */
    setDictionary: (o: Record<string, string>) => void;

    /**
     * Set extensions.
     * @param o - Object where each key is the name by which an extension is called and the value is the extension itself.
     */
    setExtensions: (o: Record<string, Function>) => void;

    /**
     * Create spreadsheet with one or more tabs.
     * @param tabs - Table tabs.
     * @param result - Tab positions (starting at 1).
     */
    tabs: (tabs: HTMLDivElement, result: TabOptions[]) => number[];

    /**
     * Internal method.
     */
    timeControl: null | number;

    /**
     * Internal method.
     */
    timeControlLoading: null | number;

    /**
     * "touchend", "touchcancel" and "touchmove" events handler.
     */
    touchEndControls: () => void;

    /**
     * "touchstart" event handler.
     * @param e - Event.
     */
    touchStartControls: (e: TouchEvent) => void;

    /**
     * Internal method.
     */
    validLetter: (text: string) => 0 | 1;

    /**
     * Basic version information.
     */
    version: Version;

    [key: string]: any;
  }
}
