title: Highcharts with Jspreadsheet
keywords: Jexcel, javascript, highcharts, charts
description: Integrating Highcharts with Jspreadsheet via events.

# Highcharts

Creating a dynamic chart using a online spreadsheet as a source.

```html
<html>
  <script src="https://bossanova.uk/jspreadsheet/v4/jspreadsheet.js"></script>
  <link
    rel="stylesheet"
    href="https://bossanova.uk/jspreadsheet/v4/jspreadsheet.css"
    type="text/css"
  />

  <script src="https://jsuites.net/v5/jsuites.js"></script>
  <link
    rel="stylesheet"
    href="https://jsuites.net/v5/jsuites.css"
    type="text/css"
  />

  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
  <script src="https://code.highcharts.com/highcharts.js"></script>

  <div id="container"></div>
  <div id="spreadsheet"></div>

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

    let update = function (instance, cell, x, y, value) {
      // If the related series does not exists create a new one
      if (!chart.series[y]) {
        // Create a new series row
        let row = [];
        for (i = 1; i < data[y].length; i++) {
          row.push(parseFloat(data[y][i]));
        }
        // Append new series to the chart
        chart.addSeries({ name: data[y][0], data: row });
      } else {
        if (x == 0) {
          // Update legend
          chart.series[y].update({ name: value });
        } else {
          // Update chart data
          chart.series[y].data[x - 1].update({ y: parseFloat(value) });
        }
      }
    };

    jspreadsheet(document.getElementById("spreadsheet"), {
      data: data,
      columns: [{ type: "text", width: "200" }],
      onchange: update,
    });

    const chart = Highcharts.chart("container", {
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
  </script>
</html>
```
