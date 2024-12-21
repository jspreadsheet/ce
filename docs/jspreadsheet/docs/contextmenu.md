title: Data Grid Context Menu Customization
keywords: Jspreadsheet, Jexcel, Angular data grid, JavaScript, Excel-like spreadsheet, data tables, data grid context menu, context customization, customize context menu, interactive data grid.
description: Define and customize the context menu in Jspreadsheet. Manage default items, section info, and cell coordinates while adding custom menu entries based on application-specific rules.

# Context Menu Customization

Jspreadsheet lets you customize the context menu through a context menu method, which provides default items, section info, coordinates, and context, which allows you to add or modify menu options based on dynamic application rules.  

## Documentation

### Item Properties

The `contextmenu` handler method might return an array of menu items, each represented as an object with the following properties:

| Property   | Description                                                        |
|------------|--------------------------------------------------------------------|
| `type`     | Type of menu item: `"line"`, `"divisor"`, or `"default"`.          |
| `title`    | The title of the menu item.                                        |
| `icon`     | Icon key for the item (uses Material icon key for identification). |
| `id`       | `id` attribute for the HTML element.                               |
| `disabled` | If `true`, the item is disabled.                                   |
| `onclick`  | `onclick` event handler function for the item.                     |
| `shortcut` | Short description or shortcut instruction.                         |
| `tooltip`  | Tooltip text displayed on hover.                                   |
| `submenu`  | Array of submenu items.                                            |


### Translation

You can define translations for default menu items in Jspreadsheet by using `jspreadsheet.setDictionary` as shown below: 

{.ignore}
```javascript
jspreadsheet.setDictionary({
    'Rename this worksheet': 'Renomear worksheet',
    'Delete this worksheet': 'Apagar worksheet',
    'Are you sure?': 'Tem certeza?',
    'Rename this cell': 'Renomear essa celula',
    'Cut': 'Cortar',
    'Copy': 'Copy',
    'Paste': 'Colar',
    'Insert a new column before': 'Inserir uma coluna antes',
    'Insert a new column after': 'Inserior uma coluna depois',
    'Insert a new column after': 'Inserior uma coluna depois',
    'Delete selected columns': 'Apagar colunas selecionadas',
    'Rename this column': 'Renomar essa coluna',
    'Create a new row': 'Criar uma nova linha',
    'Order ascending': 'Ordenar asc',
    'Order descending': 'Ordenar desc',
    'Insert a new row before': 'Inserir uma linha antes',
    'Insert a new row after': 'Inserir uma nova linha depois',
    'Delete selected rows': 'Apagar linhas selecionadas',
    'Edit notes': 'Editar notas',
    'Add notes': 'Adicionar notas',
    'Notes': 'Notas',
    'Clear notes': 'Apagar notas',
    'Save as': 'Salvar como',
    'About': 'Sobre',
});
```


Jspreadsheet uses the jSuites [contextmenu plugin](https://jsuites.net/docs/contextmenu). For further details and examples, refer to the documentation.

## Examples

### Customize the contextmenu

Customize the contextmenu with a few basic options depending on the section clicked. 

```html
<html>
<script src="https://bossanova.uk/jspreadsheet/v5/jspreadsheet.js"></script>
<script src="https://jsuites.net/v5/jsuites.js"></script>
<link rel="stylesheet" href="https://bossanova.uk/jspreadsheet/v5/jspreadsheet.css" type="text/css" />
<link rel="stylesheet" href="https://jsuites.net/v5/jsuites.css" type="text/css" />

<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Material+Icons" />

<div id="spreadsheet"></div>

<script>
// Create a new spreadsheet
jspreadsheet(document.getElementById('spreadsheet'), {
    worksheets: [{
        data: [
            ["Apples", "Produce", 1.5, 10, "=C1*(1-(D1/100))"],
            ["Bread", "Bakery", 3.0, 20, "=C2*(1-(D2/100))"],
            ["Cheese", "Dairy", 5.0, 15, "=C3*(1-(D3/100))"],
            ["Eggs", "Dairy", 2.5, 0, "=C4*(1-(D4/100))"],
        ],
        columns: [
            { title: 'Food', width: '140px' },
            { title: 'Category' },
            { title: 'Unit Price' },
            { title: 'Discount' },
            { title: 'Total ' },
         ],
         allowComments: true,
    }],
    contextMenu: function(o, x, y, e, items, section) {
         // Reset all items
         let itemsArr = [];

         // If the click was in the headers
         if (section == 'header') {
            // Items to the header only
            itemsArr.push({
                title: jSuites.translate('Execute one action'),
                onclick: function() {
                    alert('test')
                }
            });

            // Add a line
            itemsArr.push({ type: 'line' });
         }

         // Save
         itemsArr.push({
             title: jSuites.translate('Save as'),
             shortcut: 'Ctrl + S',
             icon: 'save',
             onclick: function () {
                 o.download();
             }
         });

         // About
         itemsArr.push({
             title: jSuites.translate('About'),
             onclick: function() {
                 alert('https://jspreadsheet.com');
             }
         });

         return itemsArr;
     }
});
</script>
</html>
```
```jsx
import React, { useRef } from "react";
import { Spreadsheet, Worksheet } from "@jspreadsheet-ce/react";
import jSuites from "jsuites";
import "jsuites/dist/jsuites.css";
import "jspreadsheet-ce/dist/jspreadsheet.css";

// Intercept the context menu
const contextMenu = (o, x, y, e, items, section) => {
     // Reset all items
     items = [];

     // If the click was in the headers
     if (section == 'header') {
        // Items to the header only
        items.push({
            title: jSuites.translate('Execute one action'),
            onclick: function() {
                alert('test')
            }
        });

        // Add a line
        items.push({ type: 'line' });
     }

     // Save
     items.push({
         title: jSuites.translate('Save as'),
         shortcut: 'Ctrl + S',
         icon: 'save',
         onclick: function () {
             o.download();
         }
     });

     // About
     items.push({
         title: jSuites.translate('About'),
         onclick: function() {
             alert('https://jspreadsheet.com');
         }
     });

     return items;
}

export default function App() {
    // Spreadsheet array of worksheets
    const spreadsheet = useRef();
    // Data
    const data = [
        ["Apples", "Produce", 1.5, 10, "=C1*(1-(D1/100))"],
        ["Bread", "Bakery", 3.0, 20, "=C2*(1-(D2/100))"],
        ["Cheese", "Dairy", 5.0, 15, "=C3*(1-(D3/100))"],
        ["Eggs", "Dairy", 2.5, 0, "=C4*(1-(D4/100))"],
    ];
    // Columns
    const columns = [
        { title: 'Food', width: '140px' },
        { title: 'Category' },
        { title: 'Unit Price' },
        { title: 'Discount' },
        { title: 'Total ' },
    ];

    return (
        <Spreadsheet ref={spreadsheet} contextMenu={contextMenu}>
            <Worksheet data={data} columns={columns} />
        </Spreadsheet>
    );
}
```
```vue
<template>
    <Spreadsheet ref="spreadsheetRef" :context-menu="contextMenu">
        <Worksheet :data="data" :columns="columns" />
    </Spreadsheet>
</template>

<script setup>
import { ref } from 'vue';
import { Spreadsheet, Worksheet } from "@jspreadsheet-ce/vue";
import jSuites from "jsuites";
import "jsuites/dist/jsuites.css";
import "jspreadsheet-ce/dist/jspreadsheet.css";

// Spreadsheet ref
const spreadsheetRef = ref(null);

// Data
const data = ref([
    ["Apples", "Produce", 1.5, 10, "=C1*(1-(D1/100))"],
    ["Bread", "Bakery", 3.0, 20, "=C2*(1-(D2/100))"],
    ["Cheese", "Dairy", 5.0, 15, "=C3*(1-(D3/100))"],
    ["Eggs", "Dairy", 2.5, 0, "=C4*(1-(D4/100))"],
]);

// Columns
const columns = ref([
    { title: 'Food', width: '140px' },
    { title: 'Category' },
    { title: 'Unit Price' },
    { title: 'Discount' },
    { title: 'Total ' },
]);

// Intercept the context menu
const contextMenu = (o, x, y, e, items, section) => {
     // Reset all items
     items = [];

     // If the click was in the headers
     if (section == 'header') {
        // Items to the header only
        items.push({
            title: jSuites.translate('Execute one action'),
            onclick: function() {
                alert('test')
            }
        });

        // Add a line
        items.push({ type: 'line' });
     }

     // Save
     items.push({
         title: jSuites.translate('Save as'),
         shortcut: 'Ctrl + S',
         icon: 'save',
         onclick: function () {
             o.download();
         }
     });

     // About
     items.push({
         title: jSuites.translate('About'),
         onclick: function() {
             alert('https://jspreadsheet.com');
         }
     });

     return items;
};
</script>
```
```angularjs
import { Component, ViewChild, ElementRef } from "@angular/core";
import jspreadsheet from "jspreadsheet-ce";
import jSuites from "jsuites"

import "jspreadsheet-ce/dist/jspreadsheet.css"
import "jsuites/dist/jsuites.css"

// Create component
@Component({
    standalone: true,
    selector: "app-root",
    template: `<div #spreadsheet></div>`,
})
export class AppComponent {
    @ViewChild("spreadsheet") spreadsheet: ElementRef;
    // Worksheets
    worksheets: jspreadsheet.worksheetInstance[];
    // Create a new data grid
    ngAfterViewInit() {
        // Create spreadsheet
        this.worksheets = jspreadsheet(this.spreadsheet.nativeElement, {
            worksheets: [{
                data: [
                    ["Apples", "Produce", 1.5, 10, "=C1*(1-(D1/100))"],
                    ["Bread", "Bakery", 3.0, 20, "=C2*(1-(D2/100))"],
                    ["Cheese", "Dairy", 5.0, 15, "=C3*(1-(D3/100))"],
                    ["Eggs", "Dairy", 2.5, 0, "=C4*(1-(D4/100))"],
                ],
                columns: [
                    { title: 'Food', width: '140px' },
                    { title: 'Category' },
                    { title: 'Unit Price' },
                    { title: 'Discount' },
                    { title: 'Total ' },
                 ],
                 allowComments: true,
            }],
            contextMenu: function(o, x, y, e, items, section) {
                 // Reset all items
                 items = [];

                 // If the click was in the headers
                 if (section == 'header') {
                    // Items to the header only
                    items.push({
                        title: jSuites.translate('Execute one action'),
                        onclick: function() {
                            alert('test')
                        }
                    });

                    // Add a line
                    items.push({ type: 'line' });
                 }

                 // Save
                 items.push({
                     title: jSuites.translate('Save as'),
                     shortcut: 'Ctrl + S',
                     icon: 'save',
                     onclick: function () {
                         o.download();
                     }
                 });

                 // About
                 items.push({
                     title: jSuites.translate('About'),
                     onclick: function() {
                         alert('https://jspreadsheet.com');
                     }
                 });

                 return items;
             }
        });
    }
}
```


### Disable the Context Menu

To disable the context menu in Jspreadsheet, define a contextMenu method that returns false.

```html
<html>
<script src="https://bossanova.uk/jspreadsheet/v5/jspreadsheet.js"></script>
<script src="https://jsuites.net/v5/jsuites.js"></script>
<link rel="stylesheet" href="https://bossanova.uk/jspreadsheet/v5/jspreadsheet.css" type="text/css" />
<link rel="stylesheet" href="https://jsuites.net/v5/jsuites.css" type="text/css" />

<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Material+Icons" />

<div id="spreadsheet"></div>

<script>
// Create the spreadsheet
jspreadsheet(document.getElementById('spreadsheet'), {
    worksheets: [{
        minDimensions: [4,4],
    }],
    contextMenu: function() {
        return false;
    }
});
</script>
</html>
```
```jsx
import React, { useRef } from "react";
import { Spreadsheet, Worksheet } from "@jspreadsheet-ce/react";
import "jsuites/dist/jsuites.css";
import "jspreadsheet-ce/dist/jspreadsheet.css";

export default function App() {
  // Spreadsheet array of worksheets
  const spreadsheet = useRef();

  // Disable the context menu
  const contextMenu = () => {
    return false;
  };

  return (
      <Spreadsheet ref={spreadsheet} contextMenu={contextMenu}>
        <Worksheet minDimensions={[10,10]} />
      </Spreadsheet>
  );
}
```
```vue
<template>
    <Spreadsheet ref="spreadsheetRef" :context-menu="contextMenu">
        <Worksheet :min-dimensions="[4,4]" />
    </Spreadsheet>
</template>

<script setup>
import { ref } from 'vue';
import { Spreadsheet, Worksheet } from "@jspreadsheet-ce/vue";
import "jsuites/dist/jsuites.css";
import "jspreadsheet-ce/dist/jspreadsheet.css";

// Spreadsheet ref
const spreadsheetRef = ref(null);

// Disable the context menu
const contextMenu = () => {
    return false;
};
</script>
```
```angularjs
import { Component, ViewChild, ElementRef } from "@angular/core";
import jspreadsheet from "jspreadsheet-ce";

import "jspreadsheet-ce/dist/jspreadsheet.css"
import "jsuites/dist/jsuites.css"

// Create component
@Component({
    standalone: true,
    selector: "app-root",
    template: `<div #spreadsheet></div>`,
})
export class AppComponent {
    @ViewChild("spreadsheet") spreadsheet: ElementRef;
    // Worksheets
    worksheets: jspreadsheet.worksheetInstance[];
    // Create a new data grid
    ngAfterViewInit() {
        // Create spreadsheet
        this.worksheets = jspreadsheet(this.spreadsheet.nativeElement, {
            worksheets: [{
                minDimensions: [4,4],
            }],
            // Disable the context menu
            contextMenu: function() {
                return false;
            }
        });
    }
}
```
 