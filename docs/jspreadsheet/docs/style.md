title: Spreadsheet Style
keywords: Jspreadsheet, Jexcel, data grid, JavaScript, Excel-like style, spreadsheet cell style, table style, style, themes, style methods, style events, cell formatting, spreadsheet customization, grid style customization, data grid aesthetics, CSS for data grid, style settings, Jspreadsheet design, dynamic styling
description: Learn how to apply CSS styles to cells in Jspreadsheet, including settings, events, and programmatic styling methods.

# Spreadsheet Style

Jspreadsheet allows flexible styling directly on spreadsheet cells using CSS, thanks to its DOM-based structure. While you can apply external CSS styles to customize the appearance, these styles don’t automatically track changes or save to Jspreadsheet’s internal history. For a more dynamic approach, Jspreadsheet provides built-in settings and methods that let you apply, update, and manage cell styles programmatically.

{.pro}

> #### What You Can Find in the Pro Version
>
> The **Pro version** of Jspreadsheet offers enhanced performance and includes:
>
> - A global style property at the spreadsheet level, allowing styles to be reused across different worksheets.
> - Support row or column styling using Excel-like syntax, such as `A:A` for columns or `1:1` for rows.
>
> \
> [Learn more](https://jspreadsheet.com/docs/style){.button}

## Documentation

### Methods

You can manage the spreadsheet cell styles using the following methods:

| Method                | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `getStyle`            | Get styles from one or all cells.<br/>@param `cell` - Name or coordinate of a cell. If omitted, returns styles for all cells.<br/>@param `key` - Style property. if specified, returns only that property. Otherwise, it returns all the cell's style properties.<br/>`worksheetInstance.getStyle(cell?: string \| [number, number], key?: string): string \| Record<string, string>;`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `setStyle`            | Change a single style of one or more cells.<br/>@param `cells` - Name of a cell.<br/>@param `k` - property to be changed.<br/>@param `v` - New property value. If equal to the property's current value and the "force" parameter is false, removes that property from the style.<br/>@param `force` - If true, changes the value of the property even if the cell is read-only. Also, if true, even if the new value of the property is the same as the current one, the property is not removed.<br>`worksheetInstance.setStyle(cells: string, k: string, v: string, force?: boolean): void;`<br/><br/>Change cell styles.<br/>@param `o` - Object where each key is the name of a cell and each value is the style changes for that cell. Each value can be a string with css styles separated by semicolons or an array where each item is a string with a css style.<br/>@param `k` - It is not used.<br/>@param `v` - It is not used.<br/>@param `force` - If true, changes the value of the property even if the cell is read-only. Also, if true, even if the new value of the property is the same as the current one, the property is not removed.<br>`worksheetInstance.setStyle(cells: Record<string, string \| string[]>, k?: null \| undefined, v?: null \| undefined, force?: boolean): void;` |
| `resetStyle`{.nowrap} | Reset styles of one or more cells.<br/>@param `cells` - Object whose keys are the names of the cells that must have their styles reset.<br/>@param `ignoreHistoryAndEvents` - If true, do not add this action to history.<br/>`worksheetInstance.resetStyle(cells: Record<string, any>, ignoreHistoryAndEvents?: boolean): void;`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |

### Events

Events related to spreadsheet styling.

| Event           | Description                                                                                                                                                                            |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `onchangestyle` | Triggered when a style change occurs, returning an object with affected cells and properties.<br/>`onchangestyle(instance: WorksheetInstance, changes: Record<string, string>): void;` |

### Initial Settings

The following property is available during the initialization of the online spreadsheet:

| Property                                 | Description                                                                                                                        |
| ---------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `style: Record<string, string>`{.nowrap} | Defines initial styles for cells. Each object property corresponds to a cell name or range, with values representing a CSS string. |

## Examples

### Style at the Worksheet Level

Apply style definitions directly at the worksheet level.

```html
<html>
  <script src="https://bossanova.uk/jspreadsheet/v5/jspreadsheet.js"></script>
  <script src="https://jsuites.net/v5/jsuites.js"></script>
  <link
    rel="stylesheet"
    href="https://bossanova.uk/jspreadsheet/v5/jspreadsheet.css"
    type="text/css"
  />
  <link
    rel="stylesheet"
    href="https://jsuites.net/v5/jsuites.css"
    type="text/css"
  />

  <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/css?family=Material+Icons"
  />

  <div id="spreadsheet"></div>

  <script>
    // Create the spreadsheet
    jspreadsheet(document.getElementById("spreadsheet"), {
      worksheets: [
        {
          minDimensions: [6, 4],
          style: {
            E1: "background-color: #ccffff;",
          },
        },
      ],
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
  // Style
  const style = {
    E1: "background-color: #ccffff;",
  };

  // Render component
  return (
    <Spreadsheet ref={spreadsheet}>
      <Worksheet style={style} minDimensions={[6, 4]} />
    </Spreadsheet>
  );
}
```

```vue
<template>
  <Spreadsheet ref="spreadsheet">
    <Worksheet :style="style" :minDimensions="[6, 4]" />
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
  setup() {
    // Style
    const style = {
      E1: "background-color: #ccffff;",
    };
    // Return object
    return {
      style,
    };
  },
};
</script>
```

```angularjs
import { Component, ViewChild, ElementRef } from "@angular/core";
import jspreadsheet from "jspreadsheet-ce";

import "jsuites/dist/jsuites.css";
import "jspreadsheet-ce/dist/jspreadsheet.css";

@Component({
    standalone: true,
    selector: "app-root",
    template: `<div #spreadsheet></div>`
})
export class AppComponent {
    @ViewChild("spreadsheet") spreadsheet: ElementRef;
    // Worksheets
    worksheets: jspreadsheet.worksheetInstance[];
    // Create a new data grid
    ngAfterViewInit() {
        // Create spreadsheet
        this.worksheets = jspreadsheet(this.spreadsheet.nativeElement, {
            worksheets: [
                {
                    minDimensions: [6,4],
                    style: {
                        'E1': 'background-color: #ccffff;',
                    },
                }
            ]
        });
    }
}
```

### Programmatic Updates

Define cell styles during initialization and modify them using `getStyle` and `setStyle` methods after initialization.

```html
<html>
  <script src="https://bossanova.uk/jspreadsheet/v5/jspreadsheet.js"></script>
  <script src="https://jsuites.net/v5/jsuites.js"></script>
  <link
    rel="stylesheet"
    href="https://bossanova.uk/jspreadsheet/v5/jspreadsheet.css"
    type="text/css"
  />
  <link
    rel="stylesheet"
    href="https://jsuites.net/v5/jsuites.css"
    type="text/css"
  />

  <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/css?family=Material+Icons"
  />

  <div id="spreadsheet"></div>

  <script>
    // Create the spreadsheet
    let w = jspreadsheet(document.getElementById("spreadsheet"), {
      worksheets: [
        {
          data: [
            ["US", "Cheese", "Yes", "2019-02-12"],
            ["CA;US;UK", "Apples", "Yes", "2019-03-01"],
            ["CA;BR", "Carrots", "No", "2018-11-10"],
            ["BR", "Oranges", "Yes", "2019-01-12"],
          ],
          columns: [
            {
              type: "dropdown",
              title: "Product Origin",
              width: 300,
              url: "/jspreadsheet/countries", // Remote source for your dropdown
              autocomplete: true,
              multiple: true,
            },
            {
              type: "text",
              title: "Description",
              width: 200,
            },
            {
              type: "dropdown",
              title: "Stock",
              width: 100,
              source: ["No", "Yes"],
            },
            {
              type: "calendar",
              title: "Best before",
              width: 100,
            },
          ],
          style: {
            A1: "background-color: orange;",
            B1: "background-color: orange;",
          },
        },
      ],
    });

    document.getElementById("btn1").onclick = () =>
      w[0].setStyle("A2", "background-color", "yellow");
    document.getElementById("btn2").onclick = () =>
      w[0].setStyle({
        A3: "font-weight: bold;",
        B3: "background-color: yellow;",
      });
    document.getElementById("btn3").onclick = () =>
      (document.getElementById("console").innerHTML = w[0].getStyle("A1"));
    document.getElementById("btn4").onclick = () =>
      (document.getElementById("console").innerHTML = JSON.stringify(
        w[0].getStyle()
      ));
  </script>

  <p>
    <textarea
      id="console"
      style="width:100%;max-width:600px;height:100px;"
    ></textarea>
  </p>

  <input type="button" value="Set A2 background" id="btn1" />
  <input type="button" value="Change A3, B3 style" id="btn2" />
  <input type="button" value="Get A1 style" id="btn3" />
  <input type="button" value="Get the table style" id="btn4" />
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
  const console = useRef();
  const data = [
    ["US", "Cheese", "Yes", "2019-02-12"],
    ["CA;US;UK", "Apples", "Yes", "2019-03-01"],
    ["CA;BR", "Carrots", "No", "2018-11-10"],
    ["BR", "Oranges", "Yes", "2019-01-12"],
  ];
  const columns = [
    {
      type: "dropdown",
      title: "Product Origin",
      width: 300,
      url: "/jspreadsheet/countries", // Remote source for your dropdown
      autocomplete: true,
      multiple: true,
    },
    {
      type: "text",
      title: "Description",
      width: 200,
    },
    {
      type: "dropdown",
      title: "Stock",
      width: 100,
      source: ["No", "Yes"],
    },
    {
      type: "calendar",
      title: "Best before",
      width: 100,
    },
  ];
  const style = {
    A1: "background-color: orange;",
    B1: "background-color: orange;",
  };
  // Render component
  return (
    <>
      <Spreadsheet ref={spreadsheet}>
        <Worksheet data={data} columns={columns} style={style} />
      </Spreadsheet>
      <textarea
        ref={console}
        style={{ width: "100%", maxWidth: "600px", height: "100px" }}
      ></textarea>
      <input
        type="button"
        value="Set A2 background"
        onClick={() =>
          spreadsheet.current[0].setStyle("A2", "background-color", "yellow")
        }
      />
      <input
        type="button"
        value="Change A3, B3 style"
        onClick={() =>
          spreadsheet.current[0].setStyle({
            A3: "font-weight: bold;",
            B3: "background-color: yellow;",
          })
        }
      />
      <input
        type="button"
        value="Get A1 style"
        onClick={() =>
          (console.current.innerHTML = spreadsheet.current[0].getStyle("A1"))
        }
      />
      <input
        type="button"
        value="Get the table style"
        onClick={() =>
          (console.current.innerHTML = JSON.stringify(
            spreadsheet.current[0].getStyle()
          ))
        }
      />
    </>
  );
}
```

```vue
<template>
  <Spreadsheet ref="spreadsheet">
    <Worksheet :data="data" :columns="columns" :style="style" />
  </Spreadsheet>
  <textarea
    ref="console"
    style="width:100%;max-width:600px;height:100px;"
  ></textarea>
  <input
    type="button"
    value="Set A2 background"
    @click="setStyle('A2', 'background-color', 'yellow')"
  />
  <input
    type="button"
    value="Change A3, B3 style"
    @click="
      setStyle({ A3: 'font-weight: bold;', B3: 'background-color: yellow;' })
    "
  />
  <input
    type="button"
    value="Get A1 style"
    @click="console.value.innerHTML = getStyle('A1')"
  />
  <input
    type="button"
    value="Get the table style"
    @click="console.value.innerHTML = JSON.stringify(getStyle())"
  />
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
  setup() {
    const data = [
      ["US", "Cheese", "Yes", "2019-02-12"],
      ["CA;US;UK", "Apples", "Yes", "2019-03-01"],
      ["CA;BR", "Carrots", "No", "2018-11-10"],
      ["BR", "Oranges", "Yes", "2019-01-12"],
    ];
    const columns = [
      {
        type: "dropdown",
        title: "Product Origin",
        width: 300,
        url: "/jspreadsheet/countries", // Remote source for your dropdown
        autocomplete: true,
        multiple: true,
      },
      {
        type: "text",
        title: "Description",
        width: 200,
      },
      {
        type: "dropdown",
        title: "Stock",
        width: 100,
        source: ["No", "Yes"],
      },
      {
        type: "calendar",
        title: "Best before",
        width: 100,
      },
    ];
    const style = {
      A1: "background-color: orange;",
      B1: "background-color: orange;",
    };

    // Return object
    return {
      data,
      columns,
      style,
    };
  },
};
</script>
```

```angularjs
import { Component, ViewChild, ElementRef } from "@angular/core";
import jspreadsheet from "jspreadsheet-ce";

import "jsuites/dist/jsuites.css";
import "jspreadsheet-ce/dist/jspreadsheet.css";

@Component({
    standalone: true,
    selector: "app-root",
    template: `
        <div #spreadsheet></div>
        <textarea ref='console' style='width:100%;max-width:600px;height:100px;'></textarea>
        <input type="button" value="Set A2 background"
            (click)="this.worksheets[0].setStyle('A2', 'background-color', 'yellow')} />
        <input type="button" value="Change A3, B3 style"
            (click)="this.worksheets[0].setStyle({ A3:'font-weight: bold;', B3:'background-color: yellow;' })} />
        <input type="button" value="Get A1 style"
            (click)="console.current.innerHTML = this.worksheets[0].getStyle('A1')} />
        <input type="button" value="Get the table style"
            (click)="console.current.innerHTML = JSON.stringify(this.worksheets[0].getStyle())} />
    `
})
export class AppComponent {
    @ViewChild("spreadsheet") spreadsheet: ElementRef;
    // Worksheets
    worksheets: jspreadsheet.worksheetInstance[];
    // Create a new data grid
    ngAfterViewInit() {
        // Create spreadsheet
        this.worksheets = jspreadsheet(this.spreadsheet.nativeElement, {
            data: [
                ['US', 'Cheese', 'Yes', '2019-02-12'],
                ['CA;US;UK', 'Apples', 'Yes', '2019-03-01'],
                ['CA;BR', 'Carrots', 'No', '2018-11-10'],
                ['BR', 'Oranges', 'Yes', '2019-01-12'],
            ],
            columns: [
                {
                    type: 'dropdown',
                    title: 'Product Origin',
                    width: 300,
                    url: '/jspreadsheet/countries', // Remote source for your dropdown
                    autocomplete: true,
                    multiple: true
                },
                {
                    type: 'text',
                    title: 'Description',
                    width: 200
                },
                {
                    type: 'dropdown',
                    title: 'Stock',
                    width: 100 ,
                    source: ['No','Yes']
                },
                {
                    type: 'calendar',
                    title: 'Best before',
                    width: 100
                },
            ],
            style: {
                A1:'background-color: orange;',
                B1:'background-color: orange;',
            },
        });
    }
}
```
