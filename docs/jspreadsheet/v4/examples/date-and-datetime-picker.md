title: Calendar with date and datetime picker
keywords: Jexcel, javascript, excel-like, spreadsheet, date, datetime, calendar
description: Example from basic to advanced calendar usage, date and datetime picker

# Calendar column type

The example below shows how to use and customize special calendar column type.

Jspreadsheet uses the jSuites [Javascript Calendar](https://jsuites.net/docs/javascript-calendar) plugin

### Source code

```html
<html>
<script src="https://bossanova.uk/jspreadsheet/v4/jspreadsheet.js"></script>
<script src="https://jsuites.net/v5/jsuites.js"></script>
<link rel="stylesheet" href="https://bossanova.uk/jspreadsheet/v4/jspreadsheet.css" type="text/css" />
<link rel="stylesheet" href="https://jsuites.net/v5/jsuites.css" type="text/css" />

<div id="spreadsheet"></div>

<script>
jspreadsheet(document.getElementById('spreadsheet'), {
    data: [
        ['Flag Fen', 'South East', '2019-01-01'],
        ['Bristol Aero Collection (BAC)','South West','2019-04-03'],
        ['Experience Barnsley', 'North','2018-12-03'],
        ['Cinema Museum', 'London',''],
        ['University of Hertfordshire Art Collection', 'South East',''],
        ['LUX London', 'London','2016-11-03'],
    ],
    columns: [
        {
            type:'text',
            title:'Museum',
            width:'300',
        },
        {
            type:'dropdown',
            title:'Region',
            source:['South East','South West','North','London'],
            width:'200',
        },
        {
            type:'calendar',
            title:'Last visit',
            options: { format:'DD/MM/YYYY' },
            width:'100',
        },
    ]
});
</script>
</html>
```  

## Date column customization

Customize the format and the behavior of your column through the initialization options, as follow:

{.ignore}
```javascript
options : {
    // Date format
    format:'DD/MM/YYYY',
    // Allow keyboard date entry
    readonly:0,
    // Today is default
    today:0,
    // Show timepicker
    time:0,
    // Show the reset button
    resetButton:true,
    // Placeholder
    placeholder:'',
    // Translations can be done here
    months:['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    weekdays:['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
    weekdays_short:['S', 'M', 'T', 'W', 'T', 'F', 'S'],
    // Value
    value:null,
    // Events
    onclose:null,
    onchange:null,
    // Fullscreen (this is automatic set for screensize < 800)
    fullscreen:false,
};
```

More information about the jSuites [Responsive date time picker](https://jsuites.net/docs/javascript-calendar)


Considering the example above, you can create a calendar including a time picker by simple send the option **time:1** as the following example.

```html
<div id="spreadsheet"></div>

<script>
jspreadsheet(document.getElementById('spreadsheet'), {
    data: [
        ['Flag Fen', 'South East', '2019-01-01'],
        ['Bristol Aero Collection (BAC)','South West','2019-04-03'],
        ['Experience Barnsley', 'North','2018-12-03'],
        ['Cinema Museum', 'London',''],
        ['University of Hertfordshire Art Collection', 'South East',''],
        ['LUX London', 'London','2016-11-03'],
    ],
    columns: [
        {
            type:'text',
            title:'Museum',
            width:'300',
        },
        {
            type:'dropdown',
            title:'Region',
            source:['South East','South West','North','London'],
            width:'200',
        },
        {
            type:'calendar',
            title:'Last visit',
            options: { format:'DD/MM/YYYY HH24:MI', time:1 },
            width:'100',
        },
    ]
});
</script>
```

