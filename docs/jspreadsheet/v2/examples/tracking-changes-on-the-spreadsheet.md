title: Jspreadsheet | Examples | Events
keywords: Jexcel, jquery, javascript, excel-like, spreadsheet, jquery plugin, events
description: Handling events on your spreadsheet

[Back to Examples](/jspreadsheet/v2/examples)

# Handling events

Tracking changes on your spreadsheet.

[See this example on jsFiddle](https://jsfiddle.net/spreadsheet/0dyms2b9/)

## Advanced Example

Update the chart on every change in your spreadsheet, using the onchange handler

## Source code

```html
<html>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
  <script src="https://code.highcharts.com/highcharts.js"></script>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/jexcel/2.1.0/js/jquery.jexcel.js"></script>
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/jexcel/2.1.0/css/jquery.jexcel.min.css"
    type="text/css"
  />

  <div id="my"></div>

  <script>
    let data = [
      [
        "Tokyo",
        7.0,
        6.9,
        9.5,
        14.5,
        18.2,
        21.5,
        25.2,
        26.5,
        23.3,
        18.3,
        13.9,
        9.6,
      ],
      [
        "New York",
        -0.2,
        0.8,
        5.7,
        11.3,
        17.0,
        22.0,
        24.8,
        24.1,
        20.1,
        14.1,
        8.6,
        2.5,
      ],
      [
        "Berlin",
        -0.9,
        0.6,
        3.5,
        8.4,
        13.5,
        17.0,
        18.6,
        17.9,
        14.3,
        9.0,
        3.9,
        1.0,
      ],
      [
        "London",
        3.9,
        4.2,
        5.7,
        8.5,
        11.9,
        15.2,
        17.0,
        16.6,
        14.2,
        10.3,
        6.6,
        4.8,
      ],
    ];

    let update = function (obj, cel, val) {
      // Get the cell position x, y
      let id = $(cel).prop("id").split("-");
      // If the related series does not exists create a new one
      if (!chart.series[id[1]]) {
        // Create a new series row
        let row = [];
        for (i = 1; i < data[id[1]].length; i++) {
          row.push(parseFloat(data[id[1]][i]));
        }
        // Append new series to the chart
        chart.addSeries({ name: data[id[1]][0], data: row });
      } else {
        // Update the value from the chart
        chart.series[id[1]].data[id[0] - 1].update({ y: parseFloat(val) });
      }
    };

    $("#my").jexcel({
      data: data,
      onchange: update,
      colHeaders: ["Country"],
      colWidths: [300],
    });

    // Kepp it global
    let chart = null;

    $(function () {
      chart = Highcharts.chart("container", {
        title: {
          text: "Monthly Average Temperature",
          x: -20, //center
        },
        subtitle: {
          text: "Source: WorldClimate.com",
          x: -20,
        },
        xAxis: {
          categories: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
        },
        yAxis: {
          title: {
            text: "Temperature (°C)",
          },
          plotLines: [
            {
              value: 0,
              width: 1,
              color: "#808080",
            },
          ],
        },
        tooltip: {
          valueSuffix: "°C",
        },
        legend: {
          layout: "vertical",
          align: "right",
          verticalAlign: "middle",
          borderWidth: 0,
        },
        series: [
          {
            name: "Tokyo",
            data: [
              7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6,
            ],
          },
          {
            name: "New York",
            data: [
              -0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5,
            ],
          },
          {
            name: "Berlin",
            data: [
              -0.9, 0.6, 3.5, 8.4, 13.5, 17.0, 18.6, 17.9, 14.3, 9.0, 3.9, 1.0,
            ],
          },
          {
            name: "London",
            data: [
              3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8,
            ],
          },
        ],
      });
    });
  </script>
</html>
```

## Online demo on jsFiddle

<iframe width="100%" height="700" src="//jsfiddle.net/zmtsbnng/embedded/js,html,result/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>
