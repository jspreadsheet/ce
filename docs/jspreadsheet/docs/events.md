title: Spreadsheet Events  
keywords: Jspreadsheet, JavaScript data grid, spreadsheet events, event handling, interactive spreadsheets, Excel-like features, JavaScript integration, feature customization, event-driven programming, data grid events  
description: Discover Jspreadsheet's robust event system, enabling seamless integration, advanced customization, and dynamic user interaction.  
canonical: https://bossanova.uk/jspreadsheet/docs/events

# Spreadsheet Events

Jspreadsheet provides a comprehensive event system designed to enhance integration and customization. These events allow developers to create dynamic, interactive spreadsheets by responding to user actions and modifying spreadsheet behaviour in real-time.

## Events

| Event                     | Description                                                                                           |  
|---------------------------|-------------------------------------------------------------------------------------------------------|  
| `onload`                  | Triggered when a spreadsheet is loaded.                                                               |  
| `onbeforechange`          | Triggered before a cell value is changed.                                                             |  
| `onchange`                | Triggered after a cell value is changed.                                                              |  
| `onafterchanges`          | Triggered after all pending changes are applied to the table.                                         |  
| `onpaste`                 | Triggered after a paste action in the table.                                                          |  
| `onbeforepaste`           | Triggered before a paste action is performed. Useful for parsing input data. It returns the parsed data. |  
| `oninsertrow`             | Triggered after a new row is inserted.                                                                |  
| `onbeforeinsertrow`       | Triggered before a new row is inserted. Cancel the insert by returning `false`.                       |  
| `ondeleterow`             | Triggered after a row is deleted.                                                                     |  
| `onbeforedeleterow`       | Triggered before a row is deleted. Cancel the delete by returning `false`.                            |  
| `oninsertcolumn`          | Triggered after a new column is inserted.                                                             |  
| `onbeforeinsertcolumn`    | Triggered before a new column is inserted. Cancel the insert by returning `false`.                    |  
| `ondeletecolumn`          | Triggered after a column is deleted.                                                                  |  
| `onbeforedeletecolumn`    | Triggered before a column is deleted. Cancel the delete by returning `false`.                         |  
| `onmoverow`               | Triggered after a row is moved.                                                                       |  
| `onmovecolumn`            | Triggered after a column is moved.                                                                    |  
| `onresizerow`             | Triggered after a row height change.                                                                  |  
| `onresizecolumn`          | Triggered after a column width change.                                                                |  
| `onselection`             | Triggered when selection changes.                                                                     |  
| `onsort`                  | Triggered after a column is sorted.                                                                   |  
| `onfocus`                 | Triggered when the table gains focus.                                                                 |  
| `onblur`                  | Triggered when the table loses focus.                                                                 |  
| `onmerge`                 | Triggered when cells are merged.                                                                      |  
| `onchangeheader`          | Triggered when a header is changed.                                                                   |  
| `onundo`                  | Triggered when an undo action is applied.                                                             |  
| `onredo`                  | Triggered when a redo action is applied.                                                              |  
| `oneditionstart`          | Triggered when `openEditor` is called.                                                                |  
| `oneditionend`            | Triggered when `closeEditor` is called.                                                               |  
| `onchangestyle`           | Triggered when `setStyle` is called.                                                                  |  
| `onchangemeta`            | Triggered when `setMeta` is called.                                                                   |  


## Examples  

### Update External Components  

The following example demonstrates integrating Jspreadsheet CE data with an external chart component using `onchange` events.  

```html
<html>
<script src="https://bossanova.uk/jspreadsheet/v5/jspreadsheet.js"></script>
<link rel="stylesheet" href="https://bossanova.uk/jspreadsheet/v5/jspreadsheet.css" type="text/css" />
<script src="https://jsuites.net/v5/jsuites.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v5/jsuites.css" type="text/css" />

<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Material+Icons" />

<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
<script src="https://code.highcharts.com/highcharts.js"></script>

<div id="container"></div>
<div id="spreadsheet"></div>

<script>
let data = [
    ['Tokyo', 7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6],
    ['New York', -0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5],
    ['Berlin', -0.9, 0.6, 3.5, 8.4, 13.5, 17.0, 18.6, 17.9, 14.3, 9.0, 3.9, 1.0],
    ['London', 3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8],
];

let update = function (instance, cell, x, y, value) {
    // If the related series does not exists create a new one
    if (! chart.series[y]) {
        // Create a new series row
        let row = [];
        for (i = 1; i < data[y].length; i++) {
            row.push(parseFloat(data[y][i]));
        }
        // Append new series to the chart
        chart.addSeries({ name:data[y][0], data:row });
    } else {
        if (x == 0) {
            // Update legend
            chart.series[y].update({ name:value });
        } else {
            // Update chart data
            chart.series[y].data[x-1].update({ y:parseFloat(value) });
        }
    }
}

jspreadsheet(document.getElementById('spreadsheet'), {
    worksheets: [{
        data:data,
        defaultColWidth: 50,
        columns: [
            { type: 'text', width:'200' },
        ],
    }],
    onchange: update,
});

let chart = null;

chart = Highcharts.chart('container', {
    title: {
        text: 'Monthly Average Temperature',
        x: -20 //center
    },
    subtitle: {
        text: 'Source: WorldClimate.com',
        x: -20
    },
    xAxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    },
    yAxis: {
        title: {
            text: 'Temperature (°C)'
        },
        plotLines: [{
            value: 0,
            width: 1,
            color: '#808080'
        }]
    },
    tooltip: {
        valueSuffix: '°C'
    },
    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle',
        borderWidth: 0
    },
    series: [{
        name: 'Tokyo',
        data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
    }, {
        name: 'New York',
        data: [-0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5]
    }, {
        name: 'Berlin',
        data: [-0.9, 0.6, 3.5, 8.4, 13.5, 17.0, 18.6, 17.9, 14.3, 9.0, 3.9, 1.0]
    }, {
        name: 'London',
        data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
    }]
});
</script>
</html>
```
```jsx
import React, { useRef } from "react";
import { Spreadsheet, Worksheet } from "@jspreadsheet-ce/react";
import "jsuites/dist/jsuites.css";
import "jspreadsheet-ce/dist/jspreadsheet.css";

import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";

const chartOptions = {
    title: {
        text: "Monthly Average Temperature",
        x: -20 //center
    },
    subtitle: {
        text: "Source: WorldClimate.com",
        x: -20
    },
    xAxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    },
    yAxis: {
        title: {
            text: "Temperature (°C)"
        },
        plotLines: [{
            value: 0,
            width: 1,
            color: "#808080"
        }]
    },
    tooltip: {
        valueSuffix: "°C"
    },
    legend: {
        layout: "vertical",
        align: "right",
        verticalAlign: "middle",
        borderWidth: 0
    },
    series: [{
        name: "Tokyo",
        data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
    },
    {
        name: "New York",
        data: [-0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5]
    },
    {
        name: "Berlin",
        data: [-0.9, 0.6, 3.5, 8.4, 13.5, 17.0, 18.6, 17.9, 14.3, 9.0, 3.9, 1.0]
    },
    {
        name: "London",
        data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
    }
    ]
};

export default function App() {
    // Spreadsheet array of worksheets
    const chart = useRef();
    const spreadsheet = useRef();
    // Data
    const data = [
        [chartOptions.series[0].name, ...chartOptions.series[0].data],
        [chartOptions.series[1].name, ...chartOptions.series[1].data],
        [chartOptions.series[2].name, ...chartOptions.series[2].data],
        [chartOptions.series[3].name, ...chartOptions.series[3].data]
    ];
    // Columns
    const columns = [{
        type: "text",
        width: "200"
    }];
    // Updates
    const updates = (instance, cell, x, y, value) => {
        const component = chart.current.chart;
        // If the related series does not exists create a new one
        if (!component.series[y]) {
            // Create a new series row
            let row = [];
            for (let i = 1; i < data[y].length; i++) {
                // @ts-ignore
                row.push(parseFloat(data[y][i]));
            }
            // Append new series to the chart
            component.addSeries({
                name: data[y][0],
                data: row
            });
        } else {
            if (x < 1) {
                // Update legend
                component.series[y].update({
                    name: value
                });
            } else {
                // Update chart data
                component.series[y].data[x - 1].update({
                    y: parseFloat(value)
                });
            }
        }
    };
    
    // Render data grid component
    return (
        <>
            <HighchartsReact ref={chart} highcharts={Highcharts} options={chartOptions} />
            <Spreadsheet ref={spreadsheet} onchange={updates}>
                <Worksheet data={data} columns={columns} minDimensions={[4, 4]} />
            </Spreadsheet>
        </>
    );
}
```
```vue
<template>
    <div>
      <highcharts ref="chart" :options="chartOptions" />
      <spreadsheet ref="spreadsheet" :onchange="updates">
        <worksheet :data="data" :columns="columns" />
      </spreadsheet>
    </div>
</template>

<script>
import { ref } from "vue";
import { Chart } from 'highcharts-vue';
import { Spreadsheet, Worksheet } from "@jspreadsheet-ce/vue";
import "jsuites/dist/jsuites.css";
import "jspreadsheet-ce/dist/jspreadsheet.css";

const chartOptions = {
  title: {
    text: "Monthly Average Temperature",
    x: -20 //center
  },
  subtitle: {
    text: "Source: WorldClimate.com",
    x: -20
  },
  xAxis: {
    categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  },
  yAxis: {
    title: {
      text: "Temperature (°C)"
    },
    plotLines: [{
      value: 0,
      width: 1,
      color: "#808080"
    }]
  },
  tooltip: {
    valueSuffix: "°C"
  },
  legend: {
    layout: "vertical",
    align: "right",
    verticalAlign: "middle",
    borderWidth: 0
  },
  series: [{
    name: "Tokyo",
    data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
  },
  {
    name: "New York",
    data: [-0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5]
  },
  {
    name: "Berlin",
    data: [-0.9, 0.6, 3.5, 8.4, 13.5, 17.0, 18.6, 17.9, 14.3, 9.0, 3.9, 1.0]
  },
  {
    name: "London",
    data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
  }
  ]
};

export default {
  name: 'App',
  components: {
    Spreadsheet,
    Worksheet,
    highcharts: Chart,
  },
  setup() {
    const columns = ref([
      {
        type: "text",
        width: "200"
      }
    ]);

    const data = ref([
      [chartOptions.series[0].name, ...chartOptions.series[0].data],
      [chartOptions.series[1].name, ...chartOptions.series[1].data],
      [chartOptions.series[2].name, ...chartOptions.series[2].data],
      [chartOptions.series[3].name, ...chartOptions.series[3].data]
    ]);

    const updates = (instance, cell, x, y, value) => {
      const component = instance.$refs.chart.chart;
      if (!component.series[y]) {
        let row = [];
        for (let i = 1; i < data.value[y].length; i++) {
          row.push(parseFloat(data.value[y][i]));
        }
        component.addSeries({
          name: data.value[y][0],
          data: row
        });
      } else {
        if (x < 1) {
          component.series[y].update({
            name: value
          });
        } else {
          component.series[y].data[x - 1].update({
            y: parseFloat(value)
          });
        }
      }
    };

    return {
      columns,
      data,
      chartOptions,
      updates,
    };
  },
};
</script>
```
```angularjs
import { Component, ViewChild, ElementRef } from "@angular/core";
import Highcharts from 'highcharts'
import jspreadsheet from "jspreadsheet-ce";

import "jspreadsheet-ce/dist/jspreadsheet.css"
import "jsuites/dist/jsuites.css"
import charts from "@jspreadsheet/charts";

const chartOptions = {
    title: {
        text: "Monthly Average Temperature",
        x: -20 //center
    },
    subtitle: {
        text: "Source: WorldClimate.com",
        x: -20
    },
    xAxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    },
    yAxis: {
        title: {
            text: "Temperature (°C)"
        },
        plotLines: [{
            value: 0,
            width: 1,
            color: "#808080"
        }]
    },
    tooltip: {
        valueSuffix: "°C"
    },
    legend: {
        layout: "vertical",
        align: "right",
        verticalAlign: "middle",
        borderWidth: 0
    },
    series: [{
            name: "Tokyo",
            data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
        },
        {
            name: "New York",
            data: [-0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5]
        },
        {
            name: "Berlin",
            data: [-0.9, 0.6, 3.5, 8.4, 13.5, 17.0, 18.6, 17.9, 14.3, 9.0, 3.9, 1.0]
        },
        {
            name: "London",
            data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
        }
    ]
};

// Create the data grid component
@Component({
    standalone: true,
    selector: "app-root",
    template: `<div #chartContainer></div>
        <div #spreadsheet></div>`,
})
export class AppComponent {
    @ViewChild("spreadsheet") spreadsheet: ElementRef;
    @ViewChild("chartContainer") chartContainer: ElementRef;
    // Worksheets
    worksheets: jspreadsheet.worksheetInstance[];
    // Create a new data grid
    ngAfterViewInit() {
        // Create summary spreadsheet
        this.worksheets = jspreadsheet(this.spreadsheet.nativeElement, {
            worksheets: [{
                data: [
                    [ chartOptions.series[0].name, ...chartOptions.series[0].data ],
                    [ chartOptions.series[1].name, ...chartOptions.series[1].data ],
                    [ chartOptions.series[2].name, ...chartOptions.series[2].data ],
                    [ chartOptions.series[3].name, ...chartOptions.series[3].data ]
                ],
                columns: [
                    { type: 'text', width:'200' },
                ],
            }],
            onchange: (instance, cell, x, y, value) => {
                // If the related series does not exists create a new one
                if (! this.chart.series[y]) {
                    // Create a new series row
                    let row = [];
                    for (i = 1; i < instance.options.data[y].length; i++) {
                        row.push(parseFloat(instance.options.data[y][i]));
                    }
                    // Append new series to the chart
                    chart.addSeries({ name: instance.options.data[y][0], data: row });
                } else {
                    if (x == 0) {
                        // Update legend
                        this.chart.series[y].update({ name:value });
                    } else {
                        // Update chart data
                        this.chart.series[y].data[x-1].update({ y:parseFloat(value) });
                    }
                }
            },
        });

        // Create external chart component
        this.chart = Highcharts.chart(this.chartContainer.nativeElement, chartOptions);

    }
}
```