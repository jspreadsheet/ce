title: The JavasScript Spreadsheet Documentation
keywords: Jexcel, javascript, excel-like, spreadsheet, table, data grid
description: Jspreadsheet CE is an extensible JavaScript component for building sophisticated data grid interfaces with Excel-like controls.
canonical: https://bossanova.uk/jspreadsheet/docs

# Jspreadsheet v5: The JavaScript Spreadsheet

**Jexcel** has been renamed to **Jspreadsheet**.


## Jspreadsheet CE Use Cases

Jspreadsheet CE is an extensible framework for building sophisticated data-oriented interfaces with Excel-like controls. By bringing familiar spreadsheet features to your application, you can drastically reduce development time while delivering an interface that users already know how to use, leading to faster adoption and increased productivity. You can use Jspreadsheet in many different applications, such as:

- An editable data grid-based interface to simplify inventory management and production planning in a manufacturing company's ERP system.
- At an educational institution, Jspreadsheet powers grade management systems where teachers can efficiently import and modify student data.
- A logistics company uses Jspreadsheet to create dynamic delivery route planning tables with real-time updates.
- In a research laboratory, scientists use Jspreadsheet to collect and analyze experimental data with custom validation rules.
- At a retail chain, managers use Spreadsheet-based tools to coordinate staff schedules across multiple locations.


## Installation


### From the NPM

```bash
npm install jspreadsheet-ce@5
```

### From a CDN

{.ignore}
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/jspreadsheet-ce@5/dist/jspreadsheet.min.css" type="text/css" />
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/jspreadsheet-ce@5/dist/index.min.js"></script>
```


## Data Grid with Spreadsheets Controls

How to embed a simple javascript spreadsheet in your application. Find more [examples](/jspreadsheet/docs/examples) here.

```html
<html>
<script src="https://bossanova.uk/jspreadsheet/v5/jspreadsheet.js"></script>
<link rel="stylesheet" href="https://bossanova.uk/jspreadsheet/v5/jspreadsheet.css" type="text/css" />
<script src="https://jsuites.net/v5/jsuites.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v5/jsuites.css" type="text/css" />

<div id="spreadsheet"></div>

<script>
jspreadsheet(document.getElementById('spreadsheet'), {
    tabs: true,
    toolbar: true,
    worksheets: [{
        minDimensions: [6,6],
    }],
});
</script>
</html>
```
```jsx
import React, { useRef } from "react";
import { Spreadsheet, Worksheet, jspreadsheet } from "@jspreadsheet-ce/react";
import "jsuites/dist/jsuites.css";
import "jspreadsheet-ce/dist/jspreadsheet.css";

export default function App() {
    // Spreadsheet array of worksheets
    const spreadsheet = useRef();

    // Render component
    return (
        <>
            <Spreadsheet ref={spreadsheet} tabs={true} toolbar={true}>
                <Worksheet minDimensions={[6, 6]} />
            </Spreadsheet>
        </>
    );
}
```
```vue
<template>
    <Spreadsheet ref="spreadsheet" :tabs="true" :toolbar="true">
        <Worksheet :minDimensions="[6, 6]"/>
    </Spreadsheet>
</template>

<script>
import { Spreadsheet, Worksheet } from "@jspreadsheet-ce/vue";
import "jsuites/dist/jsuites.css";
import "jspreadsheet-ce/dist/jspreadsheet.css";

export default {
    components: {
        Spreadsheet,
        Worksheet,
    },
}
</script>
```
```angularjs
import { Component, ViewChild, ElementRef } from "@angular/core";
import jspreadsheet from "jspreadsheet-ce";
import "jsuites/dist/jsuites.css";
import "jspreadsheet-ce/dist/jspreadsheet.css";

@Component({
    selector: "app-root",
    template: `<div #spreadsheet></div>`
})
export class AppComponent {
    @ViewChild("spreadsheet") spreadsheet: ElementRef;
    // Worksheets
    worksheets: jspreadsheet.worksheetInstance[];
    // Create a new JavaScript data grid
    ngAfterViewInit() {
        // Create spreadsheet
        this.worksheets = jspreadsheet(this.spreadsheet.nativeElement, {
            tabs: true,
            toolbar: true,
            worksheets: [{
                minDimensions: [6,6],
            }],
        });
    }
}
```

## Copyright and License

Jspreadsheet CE is released under the MIT license.

## Jspreadsheet Changelog

### Jspreadsheet 5.0.0
- Separation of spreadsheet and worksheets;
- New worksheet methods and events;
- Dedicated wrappers for React and Vue for better framework integration;
- Modern development environment powered by Webpack;
- Updated architecture aligned with other distributions;

[More information](/jspreadsheet/docs/upgrade-from-v4-to-v5)

### Jspreadsheet 4.6.0
- Jexcel renamed to Jspreadsheet.
- Integration with Jsuites v4.

### Jspreadsheet 4.2.3
- The spreadsheet plugin is now compatible with Jsuites v3.
- New flags and security implementations.
- New DOM element references in the toolbar.
- Worksheet events are now tabbed.

### Jspreadsheet 4.0.0
Special thanks to [FDL - Fonds de Dotation du Libre](https://www.fdl-lef.org/) for their support and sponsorship, which made the new version possible with many exciting features.

- Workbook/tab support for spreadsheets.
- Create dynamic spreadsheets from static HTML elements.
- Highlight selected cells in the spreadsheet after CTRL+C.
- Footer with formula support.
- Multiple column resizing.
- JSON update support (helpers to update a remote server).
- Centralized event dispatch method for all spreadsheet events.
- Custom helpers: `=PROGRESS` (progress bar), `=RATING` (5-star rating).
- Custom formula helpers: `=COLUMN`, `=ROW`, `=CELL`, `=TABLE`, `=VALUE`.
- Dynamic nested header updates.
- New HTML editing column type.
- New flags: `includeHeadersOnCopy`, `persistence`, `filters`, `autoCasting`, `freezeColumns`.
- New events: `onevent`, `onchangepage`, `onbeforesave`, `onsave`.
- More examples and documentation.

### Jspreadsheet 3.9.0
- New methods.
- General fixes.

### Jspreadsheet 3.6.0
- Improved spreadsheet formula parsing.
- New spreadsheet events.
- New initialization options.
- General fixes.

### Jspreadsheet 3.2.3
- `getMeta`, `setMeta` methods.
- NPM package with jSuites.
- General fixes.

### Jspreadsheet 3.0.1
Jspreadsheet v3 is a complete rebuild of the JavaScript spreadsheet (previously a jQuery plugin). Due to the changes, full compatibility could not be ensured. If upgrading, your code may require some updates. For more information, refer to the article on upgrading from Jspreadsheet v2 or Handsontable.

**New features in Jspreadsheet v3:**
- Drag and drop columns.
- Resizable rows.
- Merge columns.
- Search functionality.
- Pagination.
- Lazy loading.
- Full-screen mode.
- Image upload.
- Native color picker.
- Better mobile compatibility.
- Enhanced nested headers support.
- Advanced keyboard navigation.
- Better hidden column management.
- Data picker enhancements: dropdown, autocomplete, multiple selection, group options, and icons.
- Import from XLSX (experimental).

**Major improvements:**
- A new formula engine with faster results and no external dependencies.
- No use of selectors, leading to faster performance.
- New native column types.
- No jQuery required.
- Examples for React, Vue, and Angular.
- XLSX support via a custom SheetJS integration (experimental).

### Jspreadsheet 2.1.0
- Mobile touch improvements.
- Paste fixes and a new CSV parser.

### Jspreadsheet 2.0.0
- New radio column type.
- New dropdown with autocomplete and multiple selection options.
- Header/body separation for better scroll and column resize behavior.
- Text-wrap improvements, including Excel-compatible `alt+enter`.
- New `set/get` meta information.
- New `set/get` configuration parameters.
- Programmatic `set/get` cell styles.
- `set/get` cell comments.
- Custom toolbar for tables.
- Responsive calendar picker.

### Jspreadsheet 1.5.7
- Improvements to checkbox column type.
- Updates to table destruction in jQuery.

### Jspreadsheet 1.5.1
- Spreadsheet data overflow and fixed headers.
- Navigation improvements.

### Jspreadsheet 1.5.0
- Relative `insertRow`, `deleteRow`, `insertColumn`, `deleteColumn`.
- Redo and undo support for `insertRow`, `deleteRow`, `insertColumn`, `deleteColumn`, `moveRow`.
- New formula column recursive chain.
- New alternative design option (Bootstrap-like).
- `updateSettings` improvements.
