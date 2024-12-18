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
        name: string;
        title?: string;
        image?: string;
        group?: string;
      };

  interface CalendarOptions {
    /**
     * @default "YYYY-MM-DD"
     */
    format?: string;

    /**
     * Open calendar in full screen mode (this is automatic set for screensize < 800).
     */
    fullscreen?: boolean;

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
  }

  interface CustomEditor {
    /**
     * Event responsible for closing the editor of a cell with a custom editor.
     * @param cell - Td tag whose editor should close.
     * @param save - If true, the value returned by this event will be the cell's new value. Otherwise, the value returned by this event is ignored.
     * @param x - Cell column index.
     * @param y - Cell row index.
     * @param instance - Worksheet instance.
     * @param options - Column configuration object.
     * @returns New cell value.
     */
    closeEditor?: (
      cell: HTMLTableCellElement,
      save: boolean,
      x: number,
      y: number,
      instance: WorksheetInstance,
      options: Column,
    ) => CellValue | undefined;

    /**
     * Event called when creating new cells.
     * @param cell - HTML element prepared to be the new cell.
     * @param value - Cell value.
     * @param x - Cell column index.
     * @param y - Cell row index.
     * @param instance - Worksheet instance.
     * @param options - Column configuration object.
     * @returns HTML element that will be the new cell.
     */
    createCell?: (
      cell: HTMLTableCellElement,
      value: CellValue,
      x: number,
      y: number,
      instance: WorksheetInstance,
      options: Column,
    ) => HTMLTableCellElement;

    /**
     * Event responsible for opening the editor of a cell with a custom editor.
     * @param cell - Td tag whose editor should open.
     * @param value - Cell value.
     * @param x - Cell column index.
     * @param y - Cell row index.
     * @param instance - Worksheet instance.
     * @param options - Column configuration object.
     * @param e - Event that called this method.
     */
    openEditor?: (
      cell: HTMLTableCellElement,
      value: CellValue,
      x: number,
      y: number,
      instance: WorksheetInstance,
      options: Column,
      e: KeyboardEvent | MouseEvent | TouchEvent | undefined
    ) => void;

    /**
     * Event called before changing the value of a cell.
     *
     * The returned value will be the cell's new value.
     * @param cell - Cell whose value has changed.
     * @param value - New value.
     * @param x - Cell column index.
     * @param y - Cell row index.
     * @param instance - Worksheet instance.
     * @param options - Column configuration object.
     */
    updateCell?: (
      cell: HTMLTableCellElement,
      value: CellValue | undefined,
      x: number,
      y: number,
      instance: WorksheetInstance,
      options: Column,
    ) => CellValue | undefined;
  }

  type HorizontalAlign = "center" | "left" | "right" | "justify";

  interface BaseColumn {
    /** Cell alignment. */
    align?: HorizontalAlign;

    decimal?: string;

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
     * Defines a modification that must be made to a cell value before it is displayed in the spreadsheet.
     * @param cell - Cell whose value has changed.
     * @param value - New value.
     * @param x - Cell column index.
     * @param y - Cell row index.
     * @param instance - Worksheet instance.
     * @param options - Column configuration object.
     */
    render?: (
      cell: HTMLTableCellElement,
      value: CellValue | undefined,
      x: number,
      y: number,
      instance: WorksheetInstance,
      options: Column,
    ) => void;

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
      | "html"
      | CustomEditor;

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

  interface ColorColumn extends Omit<BaseColumn, "render"> {
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
    /** Tooltip shown when hovering over this option. */
    tooltip?: string;

    /**
     * Method called when the toolbar state should be updated.
     * @param toolbarElement - Toolbar HTML element.
     * @param toolbarInstance - Toolbar instance. For more information, read the jSuites toolbar documentation.
     * @param itemElement - Toolbar item HTML element.
     * @param worksheetInstance - Worksheet instance.
     */
    updateState?: (
      toolbarElement: HTMLDivElement,
      toolbarInstance: Record<string, any>,
      itemElement: HTMLDivElement,
      worksheetInstance: WorksheetInstance,
    ) => void;

    [property: string]: any;
  }

  interface ToolbarIconItem extends ToolbarItemBase {
    /** Defines the icon (from material icons). */
    content: string;

    /**
     * Event fired when clicking on the html item referring to that item.
     * @param toolbarElement - Toolbar HTML element.
     * @param toolbarInstance - Toolbar instance. For more information, read the jSuites toolbar documentation.
     * @param itemElement - Toolbar item HTML element.
     * @param event - Pointer event that triggered the onclick.
     */
    onclick?: (
      toolbarElement: HTMLDivElement,
      toolbarInstance: Record<string, any>,
      itemElement: HTMLDivElement,
      event: PointerEvent,
    ) => void;
  }

  interface ToolbarSelectItem extends ToolbarItemBase {
    type: "select";

    /** Defines the icon (from material icons). */
    content: string;

    /**
     * Event called when the item picker value is changed.
     * @param itemElement - Toolbar item HTML element.
     * @param pickerInstance - Picker instance. For more information, read the jSuites picker documentation.
     * @param value - New picker value.
     * @param value2 - New picker value.
     * @param valueIndex - Index of the new picker value.
     * @param event - Pointer event that triggered this event.
     */
    onchange?: (
      itemElement: HTMLDivElement,
      pickerInstance: Record<string, any>,
      value: string,
      value2: string,
      valueIndex: string,
      event: PointerEvent,
    ) => void;

    /**
     * Options available in the picker.
     */
    options?: string[];

    /**
     * Creates picker items based on the picker options.
     * @param option - One of the items in the {@link ToolbarSelectItem.options} array.
     * @param pickerInstance - Picker instance. For more information, read the jSuites picker documentation.
     * @returns string representing the HTML of the picker item.
     */
    render?: (
      option: string,
      pickerInstance: Record<string, any>,
    ) => string;

    /** Initial value of the selectbox. */
    value?: string;

    /** Item width. */
    width?: string;
  }

  interface ToolbarColorItem extends ToolbarItemBase {
    type: "color";

    /** Defines the icon (from material icons). */
    content: string;

    /**
     * Style that should be changed when input value changes. If this property is set, the onclick event is overridden.
     */
    k: string;
  }

  interface ToolbarDivisorItem {
    type: "divisor";
  }

  /**
   * Item that makes up the toolbar configuration array. This item may have properties not described here. For more information, read the jSuites toolbar documentation.
   */
  type ToolbarItem = (ToolbarIconItem | ToolbarSelectItem | ToolbarColorItem | ToolbarDivisorItem);

  interface NestedHeaderCell {
    id?: string;
    colspan?: number;
    title?: string;
    align?: string;
  }

  interface CellChange {
    newValue: CellValue;
    oldValue: CellValue;
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

  type ContextMenuItem = {
    type?: 'line' | 'divisor' | 'default';
    title: string;
    icon?: string;
    id?: string;
    disabled?: boolean;
    onclick?: (instance: any, e: MouseEvent) => void;
    shortcut?: string;
    tooltip?: string;
    submenu?: Array<ContextMenuItem>;
  };

  type ContextMenuRole = "select-all"
    | "fill-handle"
    | "row"
    | "nested"
    | "tabs"
    | "toolbar"
    | "pagination"
    | "cell"
    | "grid"
    | "footer"
    | "header"
    | "applications";

  interface SpreadsheetOptions {
    /**
     * Show or not the "about" item in the context menu.
     * @default true
     */
    about?: boolean;

    /**
     * Allow table export as csv.
     * @default true
     */
    allowExport?: boolean;

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
     * Creates context menu when user clicks with secondary mouse button.
     * @param instance - Instance of the worksheet on which the click was made.
     * @param colIndex - Horizontal index of the element that was clicked. The meaning of this value depends on the {@link role} argument.
     * @param rowIndex - Vertical index of the element that was clicked. The meaning of this value depends on the {@link role} argument.
     * @param event - pointer event that triggered this event.
     * @param items - jss default context menu.
     * @param role - indicates in which part of the spreadsheet the click occurred.
     * @param x - Horizontal index of the element that was clicked. The meaning of this value depends on the {@link role} argument.
     * @param y - Vertical index of the element that was clicked. The meaning of this value depends on the {@link role} argument.
     * @returns Context menu configuration that should be created.
     */
    contextMenu?: (
      instance: WorksheetInstance,
      colIndex: string | number | null,
      rowIndex: string | number | null,
      event: PointerEvent,
      items: ContextMenuItem[],
      role: ContextMenuRole,
      x: string | number | null,
      y: string | number | null,
    ) => ContextMenuItem[] | null | undefined;

    /**
     * Enable the formula debug notices.
     * @default false
     */
    debugFormulas?: boolean;

    /**
     * Fullscreen mode.
     * @default false
     */
    fullscreen?: boolean;

    /**
     * Include header titles on download.
     * @default false
     */
    includeHeadersOnDownload?: boolean;

    /** Spreadsheet namespace */
    namespace?: string;

    /**
     * Occurs after all changes are applied in the tables.
     * @param instance - Instance of the worksheet where the change occurred.
     * @param changes - list of changes.
     */
    onafterchanges?: (
      instance: WorksheetInstance,
      changes: CellChange[]
    ) => void;

    /**
     * Occurs before a column value is changed. If any value is returned, it will be the cell's new value.
     * @param instance - Instance of the worksheet where the changes will occur.
     * @param cell - HTML element that represents the cell being changed.
     * @param colIndex - Cell column index being changed.
     * @param rowIndex - Cell row index being changed.
     * @param newValue - Value being applied to the cell.
     */
    onbeforechange?: (
      instance: WorksheetInstance,
      cell: HTMLTableCellElement,
      colIndex: string | number,
      rowIndex: string | number,
      newValue: CellValue
    ) => undefined | CellValue;

    /**
     * Occurs before a column is excluded. If this method returns false, the removal will be canceled.
     * @param instance - Instance of the worksheet where columns will be removed.
     * @param removedColumns - Indexes of the columns to be removed.
     */
    onbeforedeletecolumn?: (
      instance: WorksheetInstance,
      removedColumns: number[],
    ) => undefined | boolean;

    /**
     * Occurs before a row is deleted. If this method returns false, the removal will be canceled.
     * @param instance - Instance of the worksheet where rows will be removed.
     * @param removedRows - Indexes of the rows to be removed.
     */
    onbeforedeleterow?: (
      instance: WorksheetInstance,
      removedRows: number[]
    ) => undefined | boolean;

    /**
     * Intercept and parse a formula just before the execution.
     * @param instance - Instance of the worksheet.
     * @param expression - Formula that triggered the event.
     * @param x - Column index of the cell whose formula triggered the event.
     * @param y - Row index of the cell whose formula triggered the event
     */
    onbeforeformula?: (instance: WorksheetInstance, expression: string, x?: number, y?: number) => false | string | undefined;

    /**
     * Occurs before a new column is inserted. If this method returns false, the insertion will be canceled.
     * @param instance - Instance of the worksheet where columns will be added.
     * @param columns - Settings for columns to be added.
     */
    onbeforeinsertcolumn?: (
      instance: WorksheetInstance,
      columns: {
        column: number,
        options: Column,
        data?: CellValue[]
      }[],
    ) => undefined | boolean;

    /**
     * Occurs before a new row is inserted. If this method returns false, the insertion will be canceled.
     * @param instance - Instance of the worksheet where rows will be added.
     * @param rows - Settings for rows to be added.
     */
    onbeforeinsertrow?: (
      instance: WorksheetInstance,
      rows: {
        row: number,
        data: CellValue[],
      }[],
    ) => undefined | boolean;

    /**
     * Occurs before the paste action is performed.
     *
     * If it returns false, the jss cancels the paste.
     * If it returns a string, it will be the content pasted into the worksheet.
     *
     * @param instance - Instance of the worksheet where data will be pasted.
     * @param copiedText - Text being pasted to the spreadsheet.
     * @param colIndex - Column index where it will start the paste.
     * @param rowIndex - Row index where it will start the paste.
     */
    onbeforepaste?: (
      instance: WorksheetInstance,
      copiedText: { value: CellValue }[][],
      colIndex: number | string,
      rowIndex: number | string
    ) => undefined | boolean | string;

    /**
     * Occurs before persisting any changes to the server.
     *
     * This event is only called when the spreadsheet has the {@link WorksheetOptions.persistence} property set.
     *
     * If this event returns false, the change is not persisted on the server.
     * If it returns a truthy value, that value is persisted instead of the initial value.
     * @param spreadsheetInstance - Spreadsheet instance.
     * @param worksheetInstance - Instance of the worksheet to be saved.
     * @param data - Changed data.
     */
    onbeforesave?: (
      spreadsheetInstance: SpreadsheetInstance,
      worksheetInstance: WorksheetInstance,
      data: { row: number; data: Record<number, CellValue> }[]
    ) => any;

    /**
     * Occurs before the selection is changed.
     * @param instance - Worksheet instance where the selection will occur.
     * @param borderLeftIndex - Index of the first column contained by the selection.
     * @param borderTopIndex - Index of the first row contained by the selection.
     * @param borderRightIndex - Index of the last column contained by the selection.
     * @param borderBottomIndex - Index of the last row contained by the selection.
     * @param origin - Javascript event that triggered this jss event.
     */
    onbeforeselection?: (
      instance: WorksheetInstance,
      borderLeftIndex: number,
      borderTopIndex: number,
      borderRightIndex: number,
      borderBottomIndex: number,
      origin: Event | undefined,
    ) => false | undefined;

    /**
     * Occurs when the table is blurred.
     * @param instance - Instance of the worksheet that was blurred.
     */
    onblur?: (instance: WorksheetInstance) => void;

    /**
     * Occurs after a column value is changed.
     * @param instance - Instance of the worksheet where the change occurred.
     * @param cell - HTML element that represents the cell being changed.
     * @param colIndex - Cell column index being changed.
     * @param rowIndex - Cell row index being changed.
     * @param newValue - New cell value.
     * @param oldValue - Old cell value.
     */
    onchange?: (
      instance: WorksheetInstance,
      cell: HTMLTableCellElement,
      colIndex: string | number,
      rowIndex: string | number,
      newValue: CellValue,
      oldValue: CellValue
    ) => void;

    /**
     * Occurs when a column heading is changed.
     * @param instance - Instance of the worksheet where the change occurred.
     * @param colIndex - Index of the column that was renamed.
     * @param newValue - New column title.
     * @param oldValue - Old column title.
     */
    onchangeheader?: (
      instance: WorksheetInstance,
      colIndex: number,
      newValue: string,
      oldValue: string,
    ) => void;

    /**
     * Occurs when a "setMeta" is called.
     *
     * @param instance - Instance of the worksheet where the change occurred.
     * @param cellName - An object with the metadata changes.
     */
    onchangemeta?: (
      instance: WorksheetInstance,
      cellName: Record<string, any>,
    ) => void;

    /**
     * Occurs when the page is changed.
     * @param instance - Instance of the worksheet where the change occurred.
     * @param newPageNumber - Page the worksheet is on.
     * @param oldPageNumber - Page the worksheet was on.
     * @param quantityPerPage - Maximum number of lines on pages.
     */
    onchangepage?: (
      instance: WorksheetInstance,
      newPageNumber: number,
      oldPageNumber: number,
      quantityPerPage: number,
    ) => void;

    /**
     * Occurs when a "setStyle" is called.
     *
     * @param instance - Instance of the worksheet where the change occurred.
     * @param cellName - An object with the changes.
     */
    onchangestyle?: (
      instance: WorksheetInstance,
      changes: Record<string, string>,
    ) => void;

    /**
     * Occurs when a comment is changed.
     * @param instance - Instance of the worksheet where the change occurred.
     * @param newComments - New comments.
     * @param oldComments - Old comments.
     */
    oncomments?: (
      instance: WorksheetInstance,
      newComments: Record<string, string | null>,
      oldComments: Record<string, string | null>,
    ) => void;

    /**
     * Occurs when the contents of one or more cells are copied.
     * @param instance - Instance of the worksheet where the change occurred.
     * @param selectedRange - Copied cell range.
     * @param copiedData - Data from copied cell range.
     * @param cut - If true, the action was cut. Otherwise, the action was copy.
     */
    oncopy?: (
      instance: WorksheetInstance,
      selectedRange: [number, number, number, number],
      copiedData: string,
      cut: boolean | undefined,
    ) => string | false | undefined;

    /**
     * Occurs when a cell is created.
     * @param instance - Instance of the worksheet where the cell was created.
     * @param cell - Cell HTML element.
     * @param colIndex - Cell column index.
     * @param rowIndex - Cell row index.
     * @param newValue - Cell value.
     */
    oncreatecell?: (
      instance: WorksheetInstance,
      cell: HTMLTableCellElement,
      colIndex: number,
      rowIndex: number,
      newValue: CellValue
    ) => void;

    /**
     * Occurs when an editor is opened.
     * @param instance - Instance of the worksheet where the change occurred.
     * @param td - Td tag of the cell whose editor was opened.
     * @param colIndex - Column index of the cell whose editor was opened.
     * @param rowIndex - Row index of the cell whose editor was opened.
     * @param input - Input of the editor that was opened.
     * @param options - Column settings.
     */
    oncreateeditor?: (
      instance: WorksheetInstance,
      td: HTMLTableCellElement,
      colIndex: number,
      rowIndex: number,
      input: null,
      options: Column,
    ) => void;

    /**
     * Occurs after a column is excluded.
     * @param instance - Instance of the worksheet where the change occurred.
     * @param removedColumns - Indexes of the columns that were removed.
     */
    ondeletecolumn?: (
      instance: WorksheetInstance,
      removedColumns: number[],
    ) => void;

    /**
     * Occurs after a row is excluded.
     * @param instance - Instance of the worksheet where the change occurred.
     * @param removedRows - Indexes of the rows that were removed.
     */
    ondeleterow?: (
      instance: WorksheetInstance,
      removedRows: number[],
    ) => void;

    /**
     * Occurs when a closeEditor is called.
     * @param instance - Instance of the worksheet where the change occurred.
     * @param td - Td tag of the cell whose editor was opened.
     * @param colIndex - Column index of the cell whose editor was opened.
     * @param rowIndex - Row index of the cell whose editor was opened.
     * @param editorValue - Value that was in the editor.
     * @param wasSaved - Whether the value which was in the editor was saved in the cell or not.
     */
    oneditionend?: (
      instance: WorksheetInstance,
      td: HTMLTableCellElement,
      colIndex: number,
      rowIndex: number,
      editorValue: CellValue,
      wasSaved: boolean
    ) => void;

    /**
     * Occurs when a openEditor is called.
     * @param instance - Instance of the worksheet where the change occurred.
     * @param td - Td tag of the cell whose editor was opened.
     * @param colIndex - Column index of the cell whose editor was opened.
     * @param rowIndex - Row index of the cell whose editor was opened.
     */
    oneditionstart?: (
      instance: WorksheetInstance,
      td: HTMLTableCellElement,
      colIndex: number,
      rowIndex: number
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
     * @param instance - Instance of the worksheet that was focused on.
     */
    onfocus?: (instance: WorksheetInstance) => void;

    /**
     * Occurs after a new column is inserted.
     * @param instance - Instance of the worksheet where the change occurred.
     * @param columns - Columns that have been added.
     */
    oninsertcolumn?: (
      instance: WorksheetInstance,
      columns: {
        column: number,
        options: Column,
        data?: CellValue[]
      }[],
    ) => void;

    /**
     * Occurs after a new row is inserted.
     * @param instance - Instance of the worksheet where the change occurred.
     * @param rows - Rows that have been added.
     */
    oninsertrow?: (
      instance: WorksheetInstance,
      rows: {
        row: number,
        data: CellValue[],
      }[]
    ) => void;

    /**
     * Event fired when a spreadsheet is created.
     * @param instance - Jspreadsheet instance.
     */
    onload?: (
      instance: SpreadsheetInstance
    ) => void;

    /**
     * Occurs when a group of cells is merged.
     * @param instance - Instance of the worksheet where the change occurred.
     * @param merges - Merges that were created.
     */
    onmerge?: (
      instance: WorksheetInstance,
      merges: Record<string, [number, number]>,
    ) => void;

    /**
     * Occurs after a column is moved to a new position.
     * @param instance - Instance of the worksheet where the change occurred.
     * @param oldPosition - Column index before movement.
     * @param newPosition - Column index after movement.
     * @param quantity - Number of columns that were moved.
     */
    onmovecolumn?: (
      instance: WorksheetInstance,
      oldPosition: number,
      newPosition: number,
      quantity: number,
    ) => void;

    /**
     * Occurs after a row is moved to a new position.
     * @param instance - Instance of the worksheet where the change occurred.
     * @param oldPosition - Row index before movement.
     * @param newPosition - Row index after movement.
     * @param quantity - Number of rows that were moved.
     */
    onmoverow?: (
      instance: WorksheetInstance,
      oldPosition: number,
      newPosition: number,
      quantity: number,
    ) => void;

    /**
     * Occurs after a paste action is performed in the javascript table.
     * @param instance - Instance of the worksheet where the change occurred.
     * @param pastedInfo - Information that was pasted into the worksheet.
     */
    onpaste?: (
      instance: WorksheetInstance,
      pastedInfo: {
        x: number,
        y: number,
        value: CellValue,
      }[][]
    ) => void;

    /**
     * Occurs when a change is redone.
     * @param instance - Instance of the worksheet where the change occurred.
     * @param historyRecord - History item that was redone. If there are no more actions to redo, it takes the value undefined.
     */
    onredo?: (
      instance: WorksheetInstance,
      historyRecord: HistoryRecord | undefined
    ) => void;

    /**
     * Occurs after a change in column width.
     * @param instance - Instance of the worksheet where the change occurred.
     * @param colIndex - Index of columns that were resized.
     * @param newWidth - New column widths.
     * @param oldWidth - Old column widths.
     */
    onresizecolumn?: (
      instance: WorksheetInstance,
      colIndex: number | number[],
      newWidth: number | number[],
      oldWidth: number | number[],
    ) => void;

    /**
     * Occurs after a change in row height.
     * @param instance - Instance of the worksheet where the change occurred.
     * @param rowIndex - Index of row being resized.
     * @param newHeight - New row height.
     * @param oldHeight - Old row height.
     */
    onresizerow?: (
      instance: WorksheetInstance,
      rowIndex: number,
      newHeight: number,
      oldHeight: number
    ) => void;

    /**
     * Occurs when persistence on the server succeeds.
     * @param spreadsheetInstance - Spreadsheet instance.
     * @param worksheetInstance - Instance of the worksheet to be saved.
     * @param data - Data that has been sent to the server.
     */
    onsave?: (
      spreadsheetInstance: SpreadsheetInstance,
      worksheetInstance: WorksheetInstance,
      data: any
    ) => void;

    /**
     * Occurs when selection is changed.
     * @param instance - Instance of the worksheet where the change occurred.
     * @param borderLeftIndex - Index of the first column contained by the selection.
     * @param borderTopIndex - Index of the first row contained by the selection.
     * @param borderRightIndex - Index of the last column contained by the selection.
     * @param borderBottomIndex - Index of the last row contained by the selection.
     * @param origin - Javascript event that triggered this jss event.
     */
    onselection?: (
      instance: WorksheetInstance,
      borderLeftIndex: number,
      borderTopIndex: number,
      borderRightIndex: number,
      borderBottomIndex: number,
      origin: Event | undefined,
    ) => void;

    /**
     * Occurs after a colum is sorted.
     * @param instance - Instance of the worksheet where the change occurred.
     * @param colIndex - Index of the column that was sorted.
     * @param order - Sorting direction. 0 for ascending and 1 for descending.
     * @param newOrderValues - The new order of the rows.
     */
    onsort?: (
      instance: WorksheetInstance,
      colIndex: number,
      order: 0 | 1,
      newOrderValues: number[],
    ) => void;

    /**
     * Occurs when a change is undone.
     * @param instance - Instance of the worksheet where the change occurred.
     * @param historyRecord - History item that was undone. If there are no more actions to undo, it takes the value undefined.
     */
    onundo?: (
      instance: WorksheetInstance,
      historyRecord: HistoryRecord | undefined
    ) => void;

    /**
     * Enable execution of formulas inside the table.
     * @default true
     */
    parseFormulas?: boolean;

    /**
     * Function used in sorting columns. If not specified, the default function will be used.
     * @param order - Sorting direction. 0 for ascending and 1 for descending.
     */
    sorting?: (
      order: 0 | 1
    ) => (itemA: SortingItem, itemB: SortingItem) => number;

    /**
     * If false, HTML inside cell values will be treated as regular text. If true, the HTML will be treated as HTML.
     * @default false
     */
    parseHTML?: boolean;

    /** Add custom toolbars. */
    toolbar?: boolean | ToolbarItem[] | ((defaultToolbar: ToolbarItem[]) => ToolbarItem[]) | Record<string, any>;

    /**
     * Worksheet settings.
     */
    worksheets: WorksheetOptions[];
  }

  interface WorksheetOptions {
    /**
     * Allow comments over the cells.
     * @default true
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
     * Css classes to apply to cells. Only one class per cell is accepted.
     * @example
     * {
     *    A1: "some-class",
     *    B3: "another-class"
     * }
     */
    classes?: Record<string, string>;

    /**
     * Allow column dragging.
     * @default true
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
     * Worksheet comments. Each object key is a cell name and its value is its comment.
     */
    comments?: Record<string, string>;

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
     * @default false
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
     * @default 100
     */
    defaultColWidth?: number;

    /**
     * Default row height.
     */
    defaultRowHeight?: number;

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

    /** Activate the table lazyloading. */
    lazyLoading?: boolean;

    /** Cells to be merged in the table innitialization. */
    mergeCells?: Record<string, [number, number]>;

    /**
     * Meta information.
     */
    meta?: Record<string, MetaInformation>;

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
    nestedHeaders?: NestedHeaderCell[][];

    /** Number of rows per page. */
    pagination?: number;

    /**
     * Values available in the dropdown for choosing the number of rows per page.
     *
     * This dropdown is only visible when the {@link WorksheetOptions.search} option is true and the {@link WorksheetOptions.pagination} option is greater than 0.
     */
    paginationOptions?: number[];

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
     * Route where requests for data persistence will be sent. If true, the {@link WorksheetOptions.url} property value will be used instead.
     */
    persistence?: boolean | string;

    /**
     * Spreadsheet plugins.
     */
    plugins?: Record<string, () => Plugin>;

    /**
     * DOM element for binding the javascript events. This property is normally used when JSS is running as a web component.
     */
    root?: HTMLElement;

    /**
     * Allow row dragging.
     * @default true
     */
    rowDrag?: boolean;

    /**
     * Allow row resizing.
     * @default true
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
     * Display the copy icon in the lower right corner of the selection.
     * @default true
     */
    selectionCopy?: boolean;

    /**
     * Cell styles.
     */
    style?: Record<string, string>;

    /**
     * Set the max height of the table.
     * This property is only used when {@link WorksheetOptions.tableOverflow} is allowed.
     */
    tableHeight?: string | number;

    /**
     * Allow table overflow.
     * @default false
     */
    tableOverflow?: boolean;

    /**
     * Set the max width of the table.
     * This property is only used when {@link WorksheetOptions.tableOverflow} is allowed.
     */
    tableWidth?: string | number;

    /**
     * If true, cell contents may overflow over empty cells.
     * @default false
     */
    textOverflow?: boolean;

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
    spreadsheet: SpreadsheetInstance;
  }

  interface JworksheetInstanceElement extends HTMLDivElement {
    /**
     * Jss worksheet instance this element belongs to
     */
    jspreadsheet: WorksheetInstance;
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

  interface Plugin {
    /**
     * This method is called before a worksheet is created.
     * @param instance - New worksheet instance.
     */
    beforeinit?: (instance: WorksheetInstance) => void;

    /**
     * Get spreadsheet config information.
     */
    getConfig: () => SpreadsheetOptions;

    /**
     * This method is called when a worksheet is created.
     * @param instance - New worksheet instance.
     */
    init?: (instance: WorksheetInstance) => void;

    /**
     * Event fired when any other event fires.
     * @param event - Name of the event that was called.
     * @param rest - Arguments of the event that was called.
     */
    onevent?: (event: string, ...rest: any[]) => void;

    /**
     * This method is called before the spreadsheet sends data to the server.
     * @param instance - Worksheet instance.
     * @param method - Name of the method whose execution needs to be saved on the server.
     * @param data - Arguments of the method whose execution needs to be saved on the server.
     */
    persistence?: (instance: WorksheetInstance, method: string, data: any) => void;

    /**
     * Method called before the context menu is displayed. If this method returns anything other than a falsy value, that value overrides the context menu settings.
     * @param instance - Instance of the worksheet on which the click was made.
     * @param colIndex - Horizontal index of the element that was clicked. The meaning of this value depends on the {@link role} argument.
     * @param rowIndex - Vertical index of the element that was clicked. The meaning of this value depends on the {@link role} argument.
     * @param event - pointer event that triggered this method.
     * @param items - jss default context menu.
     * @param role - indicates in which part of the spreadsheet the click occurred.
     * @param x - Horizontal index of the element that was clicked. The meaning of this value depends on the {@link role} argument.
     * @param y - Vertical index of the element that was clicked. The meaning of this value depends on the {@link role} argument.
     * @returns Context menu configuration that should be created.
     */
    contextMenu?: (
      instance: WorksheetInstance,
      colIndex: number | null,
      rowIndex: number | null,
      event: PointerEvent,
      items: ContextMenuItem[],
      role: ContextMenuRole,
      x: number | null,
      y: number | null,
    ) => ContextMenuItem[] | null | undefined;

    /**
     * Method called before the toolbar is displayed. If this method returns anything other than a falsy value, that value overrides the toolbar settings.
     * @param defaultToolbar 
     */
    toolbar?: (defaultToolbar: ToolbarItem[]) => ToolbarItem[] | null | undefined;
  }

  interface SpreadsheetInstance {
    /**
     * Spreadsheet settings.
     */
    config: SpreadsheetOptions;

    /**
     * Jsuites contextmenu of this jss instance
     */
    contextMenu: HTMLDivElement;

    /**
     * Root HTML element of this jss instance.
     */
    el: JspreadsheetInstanceElement;

    /**
     * Alias for el.
    */
    element: JspreadsheetInstanceElement;

    /**
     * Toogle table fullscreen mode.
     * @param activate - Desired mode. Default: The opposite of the current mode.
     */
    fullscreen: (activate?: boolean) => void;

    /**
     * Get the index of the currently active worksheet
     */
    getWorksheetActive: () => number;

    /**
     * Hide the toolbar.
     */
    hideToolbar: () => void;

    /**
     * If true, the spreadsheet does not emit events.
     */
    ignoreEvents?: boolean;

    /**
     * Spreadsheet plugins.
     */
    plugins: Record<string, Plugin>;

    /**
     * Change the spreadsheet settings.
     * @param config - New settings.
     */
    setConfig: (config: SpreadsheetOptions) => void;

    /**
     * Add new plugins to the spreadsheet.
     * @param plugins - New plugins.
     */
    setPlugins: (plugins: Record<string, () => Plugin>) => void;

    /**
     * Show the toolbar using the current settings.
     */
    showToolbar: () => void;

    /**
     * HTML div tag used as the toolbar of this jss instance.
     */
    toolbar: HTMLDivElement;

    /**
     * Instances of the worksheets that make up this spreadsheet.
     */
    worksheets: WorksheetInstance[];
  }

  interface WorksheetInstance {
    ads: HTMLDivElement;

    /**
     * Close a cell editor.
     * @param cell - HTML td tag whose editor must be closed.
     * @param save - Whether or not to save editor content in cell.
     */
    closeEditor: (cell: HTMLTableCellElement, save: boolean) => void;

    /**
     * List of "col" tags for this spreadsheet's table
     */
    cols: {
      colElement: HTMLTableColElement,
      x: number,
    }[];

    /**
     * Colgroup tag for this spreadsheet's table
     */
    colgroupContainer: HTMLElement;

    content: HTMLDivElement;

    /**
     * Copies or cuts the contents of selected cells in the worksheet.
     * @param cut - If true, the operation is cut, if not, it is copy.
     */
    copy: (cut?: boolean) => void;

    /**
     * HTML element that sits in the lower-right corner of selections.
     */
    corner: HTMLDivElement;

    /**
     * Create a new worksheet.
     * @param options - Worksheet options.
     */
    createWorksheet: (options: WorksheetOptions) => void;

    cursor: null | HTMLElement;

    /**
     * Last content copied.
     */
    data: string;

    /**
     * Remove columns.
     *
     * This method returns false if the {@link SpreadsheetOptions.onbeforedeletecolumn} event returns false or if the "This action will destroy any existing merged cells. Are you sure?" dialog receives a negative response.
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
     * This method returns false if the {@link SpreadsheetOptions.onbeforedeleterow} event returns false or if the dialog cases "This action will destroy any existing merged cells. Are you sure?" or "This action will clear your search results. Are you sure?" receive a negative response.
     * @param rowNumber - Row index from which removal starts.
     * @param numOfRows - Number of rows to be removed.
     */
    deleteRow: (rowNumber?: number, numOfRows?: number) => false | undefined;

    /**
     * Delete a worksheet.
     * @param position - Worksheet index.
     */
    deleteWorksheet: (position: number) => void;

    /**
     * Remove all merged cells.
     */
    destroyMerge: () => void;

    /**
     * Emit an event.
     * @param event - Event name.
     * @param args - Arguments that should be passed to the event.
     */
    dispatch: (event: string, ...args: any[]) => any;

    /**
     * Simulates the action of the "arrow down" key.
     * @param shiftKey - If true, the method simulates the action of the "arrow down" key while the Shift key is pressed.
     * @param ctrlKey - If true, the method simulates the action of the "arrow down" key while the Ctrl key is pressed.
     */
    down: (shiftKey?: boolean, ctrlKey?: boolean) => void;

    /**
     * Get the current data as a CSV file.
     * @param includeHeaders - If true, include the header regardless of the {@link SpreadsheetOptions.includeHeadersOnDownload} property value.
     * @param processed - If true, the result will contain the displayed cell values. Otherwise, the result will contain the actual cell values.
     */
    download: (
      includeHeaders?: boolean,
      processed?: boolean,
    ) => void;

    /**
     * Stores information about the row or column being moved.
     */
    dragging: null | DragColumnInfo | DragRowInfo;

    /**
     * Currently open editor information. Respectively the cell whose editor is open, its initial value, its column index and its row index.
     */
    edition: null | [HTMLTableCellElement, string, string, string];

    /**
     * Root HTML element of this worksheet instance.
     */
    element: JworksheetInstanceElement;

    /**
     * Execute a formula.
     * @param expression - Formula to be executed.
     * @param x - Column index of the cell where the formula is.
     * @param y - Row index of the cell where the formula is.
     */
    executeFormula: (expression: string, x?: number, y?: number) => any;

    /**
     * Table row containing filter inputs.
     */
    filter: null | HTMLTableRowElement;

    /**
     * Active filters.
     */
    filters: (string[] | null)[];

    /**
     * Simulates the action of the Home key.
     * @param shiftKey - If true, the method simulates the action of the Home key while the Shift key is pressed.
     * @param ctrlKey - If true, the method simulates the action of the Home key while the Ctrl key is pressed.
     */
    first: (shiftKey?: boolean, ctrlKey?: boolean) => void;

    /**
     * List of formulas that are used within other formulas. Each key is the name of a cell containing a formula, and each value is a list of cells whose formulas use the cell specified in the key.
     */
    formula: Record<string, string[]>;

    /**
     * Get cell DOM element by cell name.
     * @param cell - Cell name.
     */
    getCell(cell: string): HTMLTableCellElement;

    /**
     * Get cell DOM element by cell coords.
     * @param x - Cell column index.
     * @param y - Cell row index.
     */
    getCell(x: number, y: number): HTMLTableCellElement;

    /**
     * Get cell DOM element by cell coordinates.
     * @param x - Column index of the cell.
     * @param y - Row index of the cell.
     */
    getCellFromCoords: (x: number, y: number) => HTMLTableCellElement;

    /**
     * Get the data from one column by its index.
     * @param columnNumber - Column index.
     * @param processed - If true, the return is constructed using the innerHTML of the cells. Otherwise, it is constructed using the {@link WorksheetOptions.data} property. Default: false.
     */
    getColumnData: (columnNumber: number, processed?: boolean) => CellValue[];

    /**
     * Get comments from one or all cells.
     * @param cell - Cell name. If it is a falsy value, the comments of all cells are returned.
     */
    getComments: (
      cell?: string
    ) => Record<string, string> | string;

    /**
     * Get worksheet config information.
     */
    getConfig: () => WorksheetOptions;

    /**
     * Get the full or partial table data.
     * @param highlighted - If true, get only data from highlighted cells. If false, get data from all cells. Default: false.
     * @param processed - If false, the return is constructed using the innerHTML of the cells. Otherwise, it is constructed using the {@link WorksheetOptions.data} property. Default: false.
     * @param delimiter - Column delimiter. If this property is specified, the result will be formatted like a csv.
     * @param asJson - If this property is true, the result will be formatted as json.
     */
    getData: (
      highlighted?: boolean,
      processed?: boolean,
      delimiter?: string,
      asJson?: boolean,
    ) => CellValue[][];

    /**
     * Get data from a range.
     * @param range - Range of cells whose values ​​are to be returned.
     * @param processed - If true, the method returns the values ​​of the HTML elements of the cells. Otherwise, the method returns the values ​​of the cells in the options.data array.
     */
    getDataFromRange: (range: string, processed: true) => CellValue[][];

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
    getHeight(row?: undefined): string[];

    /**
     * Get height of one row.
     * @param row - Column index.
     */
    getHeight(row: number): string;

    /**
     * Get the coordinates of the highlighted selections.
     */
    getHighlighted: () => [number, number, number, number][]

    /**
     * Get the innerHTML of a cell.
     * @param cell - Cell name.
     */
    getLabel(cell: string): string;

    /**
     * Get the innerHTML of a cell.
     * @param x - Cell column index.
     * @param y - Cell row index.
     */
    getLabel(x: number, y: number): string;

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
     */
    getMeta: (cell?: string) => any;

    /**
     * Get the range description of the selected cells.
     */
    getRange: () => string;

    /**
     * Get data from a row by its index.
     * @param rowNumber - Row index.
     * @param processed - If true, the return is constructed using the innerHTML of the cells. Otherwise, it is constructed using the {@link WorksheetOptions.data} property. Default: false.
     */
    getRowData: (
      rowNumber: number,
      processed?: boolean,
    ) => CellValue[] | undefined;

    /**
     * Get information from selected cells in the worksheet.
     * @param columnNameOnly - If true, the method returns the names of the selected cells. Otherwise, the method returns the records of the selected cells.
     */
    getSelected: (columnNameOnly?: boolean) => {
      element: HTMLTableCellElement[][],
      x: number,
      y: number,
    }[] | string[];

    /**
     * Get indexes of the columns that have highlighted cells.
     * @param visibleOnly - If true, the method returns only visible columns.
     */
    getSelectedColumns: (visibleOnly?: boolean) => number[];

    /**
     * Get indexes of the rows that have highlighted cells.
     * @param visibleOnly - If true, the method returns only visible rows.
     */
    getSelectedRows: (visibleOnly?: boolean) => number[];

    /**
     * Get the coordinates of the range that is selected in the worksheet.
     */
    getSelection: () => [number, number, number, number];

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
     * @param cell - Cell name.
     * @param processedValue - If true, it returns the cell's innerHTML. Otherwise, it returns the value of the cell in the {@link WorksheetOptions.data} property.
     */
    getValue: (
      cell: string,
      processedValue?: boolean
    ) => CellValue | null;

    /**
     * Get the value of a cell by its coordinates.
     * @param x - Column index.
     * @param y - Row index.
     * @param processedValue - If true, it returns the cell's innerHTML. Otherwise, it returns the value of the cell in the {@link WorksheetOptions.data} property.
     */
    getValueFromCoords: (
      x: number,
      y: number,
      processedValue?: boolean
    ) => CellValue | null;

    /**
     * Get the width of one or all columns.
     * @param column - Index of the column. If omitted, returns the widths of all columns.
     */
    getWidth: (column?: number) => number | (number | string)[];

    /**
     * Get the index of the currently active worksheet
     */
    getWorksheetActive: () => number;

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
     * @param colNumber - Column indexes.
     */
    hideColumn: (colNumber: number | number[]) => void;

    /**
     * Hide row count column.
     */
    hideIndex: () => void;

    /**
     * Hide Row.
     * @param rowNumber - Row indexes.
     */
    hideRow: (rowNumber: number | number[]) => void;

    /**
     * List of highlighted cells.
     */
    highlighted: {
      element: HTMLTableCellElement,
      x: number,
      y: number,
    }[];

    /**
     * List of actions performed on the worksheet.
     */
    history: HistoryRecord[];

    /**
     * Current position of the {@link WorksheetInstance.history} property. Used to control movement through history.
     */
    historyIndex: number;

    /**
     * If true, the "setHistory" method does not create new records in the history.
     */
    ignoreHistory: boolean;

    /**
     * Check if a cell is within the current selection.
     * @param x - Cell column index.
     * @param y - Cell row index.
     */
    isSelected: (x: number, y: number) => boolean;

    /**
     * Insert one or more columns.
     *
     * This method returns false if the {@link SpreadsheetOptions.onbeforeinsertcolumn} event returns false or if the "This action will destroy any existing merged cells. Are you sure?" dialog receives a negative response.
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
     * This method returns false if the {@link SpreadsheetOptions.onbeforeinsertrow} event returns false or if the "This action will destroy any existing merged cells. Are you sure?" or "This action will clear your search results. Are you sure?" dialogs receive a negative response.
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
     * Check if a cell is read only.
     * @param x - Cell column index.
     * @param y - Cell row index.
     */
    isReadOnly(x: number, y: number): boolean;

    /**
     * Check if a cell is read only.
     * @param cellName - Cell name.
     */
    isReadOnly(cellName: string): boolean;

    /**
     * Simulates the action of the End key.
     * @param shiftKey - If true, the method simulates the action of the End key while the Shift key is pressed.
     * @param ctrlKey - If true, the method simulates the action of the End key while the Ctrl key is pressed.
     */
    last: (shiftKey?: boolean, ctrlKey?: boolean) => void;

    /**
     * Simulates the action of the "arrow left" key.
     * @param shiftKey - If true, the method simulates the action of the "arrow left" key while the Shift key is pressed.
     * @param ctrlKey - If true, the method simulates the action of the "arrow left" key while the Ctrl key is pressed.
     */
    left: (shiftKey?: boolean, ctrlKey?: boolean) => void;

    /**
     * Move a column.
     *
     * This method returns false if the "This action will destroy any existing merged cells. Are you sure?" dialog receives a negative response.
     * @param o - Column index.
     * @param d - New column index.
     */
    moveColumn: (o: number, d: number) => false | undefined;

    /**
     * Move a row.
     *
     * This method returns false if the "This action will destroy any existing merged cells. Are you sure?" or "This action will clear your search results. Are you sure?" dialogs receive a negative response.
     * @param o - Row index.
     * @param d - New row index.
     */
    moveRow: (o: number, d: number) => false | undefined;

    /**
     * Start the edition for one cell.
     * @param cell - Cell HTML Element.
     * @param empty - If true, the editor opens without content even if the cell had content.
     * @param event - Js event that triggered the editor opening. This argument is passed to the "openEditor" method of custom editors.
     */
    openEditor: (cell: HTMLTableCellElement, empty?: boolean, event?: KeyboardEvent | MouseEvent | TouchEvent) => void;

    /**
     * Open the column filter.
     *
     * This method only runs if the {@link WorksheetOptions.filters} property is true.
     * @param columnId - Column index.
     */
    openFilter: (columnId: number) => void;

    /**
     * Open the worksheet by index.
     * @param position - Worksheet index.
     */
    openWorksheet: (position: number) => void;

    /**
     * Spreadsheet settings.
     */
    options: WorksheetOptions;

    /**
     * Reorder rows based on values in a column.
     *
     * This method returns false if the "This action will destroy any existing merged cells. Are you sure?" dialog receives a negative response, or returns true if the sort is successful.
     * @param column - Column index. If the value of this parameter is less than 0, the method returns false and does not perform sorting.
     * @param order - Sorting direction. 0 for ascending and 1 for descending.
     */
    orderBy: (column: number, order: 0 | 1) => boolean | undefined;

    /**
     * Go to page. Valid only when {@link WorksheetOptions.pagination} is true.
     * @param pageNumber - Page number (starting at 0).
     */
    page: (pageNumber: number) => void;

    /**
     * Current spreadsheet page.
     */
    pageNumber: undefined | number;

    /**
     * Div with pagination controls.
     */
    pagination: HTMLDivElement;

    /**
     * Spreadsheet of which this worksheet is part.
     */
    parent: SpreadsheetInstance;

    /**
     * Pastes content into one or more cells.
     * @param x - Column index of the cell from which the content will be pasted.
     * @param y - Row index of the cell from which the content will be pasted.
     * @param data - Content to be pasted.
     */
    paste: (x: number, y: number, data: string) => false | undefined;

    /**
     * Get the number of pages of the worksheet.
     */
    quantiyOfPages: () => number;

    /**
     * List of HTML elements representing table cells.
     */
    records: {
      element: HTMLTableCellElement[][],
      x: number,
      y: number,
    }[][];

    /**
     * Redo previously undone action
     */
    redo: () => void;

    /**
     * Remove a merge.
     * @param cellName - Merge anchor cell.
     * @param data - Data to be placed in cells released from the merge.
     */
    removeMerge: (
      cellName: string,
      data?: CellValue[],
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
     * @returns If there were highlighted cells, it returns 1, otherwise it returns 0.
     */
    resetSelection: () => 0 | 1;

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
    resizing: undefined | null | ResizeRowInfo | ResizeColumnInfo;

    /**
     * Indices of the rows that include the searched text.
     */
    results: null | number[];

    /**
     * Simulates the action of the "arrow right" key.
     * @param shiftKey - If true, the method simulates the action of the "arrow right" key while the Shift key is pressed.
     * @param ctrlKey - If true, the method simulates the action of the "arrow right" key while the Ctrl key is pressed.
     */
    right: (shiftKey?: boolean, ctrlKey?: boolean) => void;

    /**
     * List of rows that make up the table.
     */
    rows: {
      element: HTMLTableRowElement,
      y: number,
    }[];

    /**
     * Search for some text.
     * @param query - Text to be searched.
     */
    search: (query: string) => void;

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
      | undefined
      | null
      | [number, number, number, number]
      | [string, string, string, string];

    selectedContainer: undefined | null | [number, number, number, number];

    /**
     * Cells that currently have "autocomplete selection".
     */
    selection: HTMLTableCellElement[];

    /**
     * Set the data from one column by index.
     * @param colNumber - Column index.
     * @param data - New data. Positions with the null value are not changed in the table.
     * @param force - If true, the method also changes the contents of readonly columns.
     */
    setColumnData: (colNumber: number, data: (CellValue | null)[], force?: boolean) => void;

    /**
     * Set or remove a comment.
     * @param cellId - Name of the cell.
     * @param comments - New comment. If it is a falsy value, the method just uncomments the cell.
     */
    setComments(
      cellId: string,
      comments: string,
    ): void;

    /**
     * Set or remove comments.
     * @param cellId - Object whose keys are cell names and values ​​are cell comments. If the value of a key is a falsy value, the cell comment is removed.
     */
    setComments(
      cellId: Record<string, string>,
    ): void;

    /**
     * Change the worksheet or spreadsheet settings.
     * @param config - New settings.
     * @param spreadsheetLevel - If true, the settings are applied to the spreadsheet. If not, they are applied to the worksheet.
     */
    setConfig: (config: SpreadsheetOptions, spreadsheetLevel?: boolean) => void;

    /**
     * Set data.
     * @param data - New data. It can be an array of cell values or an array of objects whose values are cell values.
     */
    setData: (
      data?: CellValue[][] | Record<string, CellValue>[]
    ) => void;

    /**
     * Set a column title.
     * @param column - Column index.
     * @param newValue - New title. Empty string or undefined to reset the header title.
     */
    setHeader: (column: number, newValue?: string) => void;

    /**
     * Change row height.
     * @param row - Row index.
     * @param height - New height. An integer greater than zero.
     */
    setHeight: (
      row: number,
      height: number,
    ) => void;

    /**
     * Merge cells.
     * @param cellName - Name of a cell. If it is a falsy value, this method merges the selected cells in the table and ignores all parameters of this method.
     * @param colspan - Number of columns this merge occupies.
     * @param rowspan - Number of rows this merge occupies.
     * @returns If the "cellName" parameter is a falsy value, and there are no cells selected in the table, this method returns null.
     */
    setMerge: (
      cellName?: string,
      colspan?: number,
      rowspan?: number,
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
     * Change the read only state of a cell.
     * @param cell - Cell HTML element or its name.
     * @param state - New read only state.
     */
    setReadOnly: (cell: string | HTMLTableCellElement, state: boolean) => void;

    /**
     * Set a row data by index.
     * @param rowNumber - Row index.
     * @param data - New data. Positions with the null value are not changed in the table.
     * @param force - If true, the method also changes the contents of readonly columns.
     */
    setRowData: (rowNumber: number, data: (CellValue | null)[], force?: boolean) => void;

    /**
     * Change a single style of one or more cells.
     * @param o - Name of a cell.
     * @param k - property to be changed.
     * @param v - New property value. If equal to the property's current value and the "force" parameter is false, removes that property from the style.
     * @param force - If true, changes the value of the property even if the cell is read-only. Also, if true, even if the new value of the property is the same as the current one, the property is not removed.
     */
    setStyle(
      o: string,
      k: string,
      v: string,
      force?: boolean,
    ): void;

    /**
     * Change cell styles.
     * @param o - Object where each key is the name of a cell and each value is the style changes for that cell. Each value can be a string with css styles separated by semicolons or an array where each item is a string with a css style.
     * @param k - It is not used.
     * @param v - It is not used.
     * @param force - If true, changes the value of the property even if the cell is read-only. Also, if true, even if the new value of the property is the same as the current one, the property is not removed.
     */
    setStyle(
      o: Record<string, string | string[]>,
      k?: null | undefined,
      v?: null | undefined,
      force?: boolean,
    ): void;

    /**
     * Change the value of one or more cells.
     * @param cell - Name of a cell, HTML element that represents a cell or an array whose items can be any of the previous alternatives or objects. When an array item is an object, it must have the cell coordinates ("x" and "y") and can have the cell's new value ("value"), but if does not have it, the "value" parameter is used instead.
     * @param value - New cell value.
     * @param force - If true, changes the value of even read-only cells.
     */
    setValue: (
      cell:
        | string
        | HTMLTableCellElement
        | (
            | string
            | { x: number; y: number; value?: CellValue }
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
     */
    setWidth(column: number, width: number): void;

    /**
     * Set the width of one or more columns.
     * @param column - Column indexes.
     * @param width - New widths.
     */
    setWidth(
      column: number[],
      width: number | number[],
    ): void;

    /**
     * Show hidden column.
     * @param colNumber - Column index.
     */
    showColumn: (colNumber: number | number[]) => void;

    /**
     * Show row count column.
     */
    showIndex: () => void;

    /**
     * Show hidden row.
     * @param rowNumber - Row index.
     */
    showRow: (rowNumber: number | number[]) => void;

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
     * Undo last action.
     */
    undo: () => void;

    /**
     * Simulates the action of the "arrow up" key.
     * @param shiftKey - If true, the method simulates the action of the "arrow up" key while the Shift key is pressed.
     * @param ctrlKey - If true, the method simulates the action of the "arrow up" key while the Ctrl key is pressed.
     */
    up: (shiftKey?: boolean, ctrlKey?: boolean) => void;

    /**
     * Select cells.
     * @param x1 - Column index of the first cell of the selection. If omitted or null, rows "y1" through "y2" are selected.
     * @param y1 - Row index of the first cell of the selection. If omitted or null, columns "x1" through "x2" are selected.
     * @param x2 - Column index of the last cell of the selection. Default: Parameter "x1".
     * @param y2 - Row index of the last cell of the selection. Default: Parameter "y1".
     */
    updateSelectionFromCoords: (
      x1: number | null,
      y1: number | null,
      x2?: number | null,
      y2?: number | null,
    ) => false | undefined;

    /**
     * Get the page index of a row.
     * @param cell - Row index.
     */
    whichPage: (cell: number) => number;
  }

  type Version = () => {
    host: string;
    license: string;
    print: () => [string];
    type: string;
    version: string;
  };

  interface JssHelpers {
    /**
     * Extract the configuration to create a new spreadsheet from a static HTML element.
     * @param element - Table element.
     * @param options - Worksheet options.
     */
    createFromTable: (element: HTMLTableElement, options: WorksheetOptions) => WorksheetOptions;

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
    getCellNameFromCoords: (x: number, y: number) => string;

    /**
     * Get column and row indices based on coordinate in "A1" style.
     * @param columnName - Coordinate in "A1" style.
     */
    getCoordsFromCellName: (
      columnName: string
    ) => [number, number | null] | undefined;

    /**
     * Get coordinates from a range.
     * @param range - Range in "A1:B2" style.
     * @returns Array filled with the x and y coordinates of the first and last cells in the range.
     */
    getCoordsFromRange: (
      range: string
    ) => [number, number, number, number];

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
      options: SpreadsheetOptions
    ): WorksheetInstance[];

    /**
     * Current instance of jss.
     */
    current: null | WorksheetInstance;

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
     * Destroy all instances of jss.
     */
    destroyAll: () => void;

    /**
     * Get a worksheet instance by name and namespace.
     * @param worksheetName - Name of the searched worksheet. If null or undefined, the method returns the found namespace.
     * @param namespace - Namespace name.
     */
    getWorksheetInstanceByName: (worksheetName: string | null | undefined, namespace: string) => WorksheetInstance | Record<string, WorksheetInstance>;

    helpers: JssHelpers;

    /**
     * Internal method.
     */
    isMouseAction: boolean;

    /**
     * Defines translations.
     * @param o - Translations.
     */
    setDictionary: (o: Record<string, string>) => void;

    spreadsheet: SpreadsheetInstance[];

    /**
     * Internal method.
     */
    timeControl: null | number;

    /**
     * Internal method.
     */
    timeControlLoading: null | number;

    /**
     * Basic version information.
     */
    version: Version;

    [key: string]: any;
  }
}
