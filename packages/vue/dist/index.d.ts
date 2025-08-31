import { DefineComponent } from 'vue';
import type JSpreadsheetCore from 'jspreadsheet-ce';

// Get all the static types from the core library
type JSpreadsheetBase = typeof JSpreadsheetCore;

// Create interface that extends the base type and adds call signature
interface JSpreadsheetInterface extends JSpreadsheetBase {
    (element: HTMLElement | HTMLDivElement | null, options: JSpreadsheetCore.Spreadsheet): Array<JSpreadsheetCore.WorksheetInstance>;
}

export declare const Worksheet: DefineComponent<JSpreadsheetCore.Worksheet>;
export declare const Spreadsheet: DefineComponent<JSpreadsheetCore.Spreadsheet>;

export declare const jspreadsheet: JSpreadsheetInterface;

declare const _default: {
    Worksheet: DefineComponent<JSpreadsheetCore.Worksheet>;
    Spreadsheet: DefineComponent<JSpreadsheetCore.Spreadsheet>;
    jspreadsheet: JSpreadsheetInterface;
};

export default _default;