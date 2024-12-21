title: Getting Started with Jspreadsheet CE
keywords: Jspreadsheet CE, Jexcel, JavaScript Data Grid, Spreadsheets, JavaScript tables, Excel-like data grid, web-based spreadsheets, data grid controls, data grid features
description: Create data grids with spreadsheet controls with Jspreadsheet CE.

[Back to Documentation](/jspreadsheet/v3/docs)

# Getting started

Jspreadsheet is a vanilla javascript plugin to embed a online spreadsheet in your web based applications. Bring highly dynamic datasets to your application and improve the user experience of your software.

```bash
npm install jspreadsheet-ce
```

Download from our github page: <https://github.com/jspreadsheet/ce>


## Initialization

You can initiate a Jspreadsheet table including data from a HTML table, a JS array, a CSV or a JSON file, following the examples below:

### Loading from a javascript array

{.ignore}
```html
<div id='my-spreadsheet'></div>

<script>
data = [
    ['Mazda', 2001, 2000],
    ['Peugeot', 2010, 5000],
    ['Honda Fit', 2009, 3000],
    ['Honda CRV', 2010, 6000],
];

jexcel(document.getElementById('my-spreadsheet'), {
    data:data,
    columns:[
        { title:'Model', width:300 },
        { title:'Price', width:80 },
        { title:'Model', width:100 }
    ]
});
</script>
```  

### Loading from a JSON file

{.ignore}
```html
<div id='my-spreadsheet'></div>

<script>
jexcel(document.getElementById('my-spreadsheet'), {
    url:'data.json',
    columns:[
        { title:'Model', width:300 },
        { title:'Price', width:80 },
        { title:'Model', width:100 }
    ]
});
</script>
```  

### Loading from a CSV file

{.ignore}
```html
<div id='my-spreadsheet'></div>

<script>
jexcel(document.getElementById('my-spreadsheet'), {
    csv:'/tests/demo.csv',
    csvHeaders:true,
    columns:[
        { width:300 },
        { width:80 },
        { width:100 }
    ]
});
</script>
```

[See a working example](/jspreadsheet/v3/examples/import-data)

  

## Destroying a table

You can destroy the table, all data and events related to an existing table by using the method _destroy_ as shown below.

{.ignore}
```html
<script>
let table = jexcel(document.getElementById('my-spreadsheet'), {
    csv:'/tests/demo.csv',
    csvHeaders:true,
    columns:[
        { width:300 },
        { width:80 },
        { width:100 }
    ]
});

// If second argument is true will destroy all handlers and you can't create any other instance.
jexcel.destroy(document.getElementById('my-spreadsheet'), true);
</script>
```

## Header titles

If you do not define the column title, the default will be a letter starting in A just as any other spreadsheet software. But, if you would like to have custom column names you can use the directive title as in the example below:

{.ignore}
```html
<script>
jexcel(document.getElementById('spreadsheet'), {
    data:data,
    columns:[
        { title:'Model' },
        { title:'Price' },
        { title:'Model' }
    ]
});
</script>
```  

### Headers from a CSV file

If you are loading your data from a CSV file, you can define the **csvHeader:true**, so the first row will be used as your column names.

[See a working example](/jspreadsheet/v3/examples/import-data)

  

### Programmatically header updates

The methods **setHeader()** , **getHeader()** and **getHeaders()** are available for the developer to interact programmatically with the spreadsheet.

[Working example](/jspreadsheet/v3/examples/headers#Programmatically-header-updates)

  

### Nested headers

The nested headers area available in the innitialization through the directive **nestedHeaders:[]**, and should be use follow:

{.ignore}
```html
<script>
jexcel(document.getElementById('spreadsheet'), {
    data:data,
    columns: [
        { type: 'autocomplete', title:'Country', width:'300', url:'/jexcel/countries' },
        { type: 'dropdown', title:'Food', width:'150', source:['Apples','Bananas','Carrots','Oranges','Cheese'] },
        { type: 'checkbox', title:'Stock', width:'100' },
    ],
    nestedHeaders:[
        [
            { title:'Supermarket information', colspan:'3' },
        ],
        [
            { title:'Location', colspan:'1' },
            { title:' Other Information', colspan:'2' }
        ],
    ],
});
```

[See this example in action](/jspreadsheet/v3/examples/headers)

## Column width

The inital width can be defined in the width property in the column parameter.

{.ignore}
```html
<script>
jexcel(document.getElementById('spreadsheet'), {
    data:data,
    columns:[
        { title:'Model', width:300 },
        { title:'Price', width:80 },
        { title:'Model', width:100 }
    ]
});
</script>
```  

### Programmatically column width updates

The methods setWidth(), getWidth() are available for the developer to update the column width via javascript.

[See this example in action](/jspreadsheet/v3/examples/programmatically-updates#setWidth)

## Row height

The inital row height can be defined in the height property include in the rows directive. It is also possible to enabled a resizeble row by using rowResize: true in the initialization.

{.ignore}
```html
<script>
jexcel(document.getElementById('spreadsheet'), {
    data:data,
    rows:{ 3: { height:'500px' }},
    rowResize: true,
});
</script>
```  

### Programmatically row height updates

The methods setHeight(), getHeight() are available for the developer to update the row height via javascript.

[See this example in action](/jspreadsheet/v3/examples/programmatically-updates#setHeight)

## Column types

Jspreadsheet has available some extra native column types in addition to the default input text. It means you have extended nice responsive ways to get data into your spreadsheet. In addition to that is available integration methods to facilitate you to bring any custom column to your tables. This makes the Jspreadsheet plugin a very flexible tool to enhance the user experience of your applications.

Jspreadsheet is integrate with jSuites, so it brings some native columns, such as: _**text, numeric, hidden, dropdown, autocomplete, checkbox, radio, calendar, image and color.**_

{.ignore}
```html
<script>
jexcel(document.getElementById('spreadsheet'), {
    data:data,
    columns: [
        { title:'Model', width:300, type:'text'; },
        { title:'Price', width:80, type:'numeric' },
        { title:'Date', width:100, type:'calendar', options: { format:'DD/MM/YYYY' } },
        { title:'Photo', width:150, type:'image' },
        { title:'Condition', width:150, type:'dropdown', source:['New','Used'] },
        { title:'Color', width:80, type:'color' },
        { title:'Available', width:80, type:'checkbox' },
    ]
});
</script>
```

### Calendar type

When using the calendar column, you can change the behavior behavior of your calendar by sending some extra options as example above. The possible values are:

```javascript
{
    options: {
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
        weekdays:['Sunday','Monday','Tuesday','Wednesday','Thursday', 'Friday','Saturday'],
        weekdays_short:['S', 'M', 'T', 'W', 'T', 'F', 'S'],
        // Value
        value:null,
        // Events
        onclose:null,
        onchange:null,
        // Fullscreen (this is automatic set for screensize < 800)
        fullscreen:false,
    }
}
```

[See a working example](/jspreadsheet/v3/examples/date-and-datetime-picker)

  

### Dropdown and autocomplete type

There are different ways to work with dropdowns using Jspreadsheet. It is possible to define the parameter _source_ as a simple or key-value array. It is also possible to use the param _url_ to populate your dropdown from an external json format source. In addition to that it is possible to have conditional values. Basically, the values from one dropdown can be conditional to other dropdowns in your table.

You can set the autocomplete dropdown through the initial param _autocomplete:true_ and the multiple picker can be activate by _multiple:true_ property as shown in the following example:

{.ignore}
```html
<script>
let data = [
    ['Honda', 1, 'Civic', '4'],
    ['Peugeot', 3,'1007', '2'],
    ['Smart', 3,'Cabrio', '4;5'],
];

jexcel(document.getElementById('spreadsheet'), {
    data:data,
    columns: [
        {
            type:'dropdown',
            title:'Region',
            source:['South East','South West','North','London'],
            width:'200',
        },
        {
            type:'dropdown',
            title:'Available in',
            multiple:true,
            source:[{id:1, name:'Red'},{id:2, name:'Yellow'},{id:3,name:'Blue'}],
            width:'200',
        },
        {
            type:'autocomplete',
            title:'Region',
            url:'values.json',
            width:'200',
        },
    ]
});
</script>
```

[See a working example](/jspreadsheet/v3/examples/dropdown-and-autocomplete)

### Custom type

Jspreadsheet makes possible to extend third party javascript plugins to create your custom columns. Basically to use this feature, you should implement some basic methods such as: openEditor, closeEditor, getValue, setValue as following.

{.ignore}
```html
<script>
let data2 = [
    ['PHP', '14:00'],
    ['Javascript', '16:30'],
];

var customColumn = {
    // Methods
    closeEditor : function(cell, save) {
        var value = cell.children[0].value;
        cell.innerHTML = value;
        return value;
    },
    openEditor : function(cell) {
        // Create input
        var element = document.createElement('input');
        element.value = cell.innerHTML;
        // Update cell
        cell.classList.add('editor');
        cell.innerHTML = '';
        cell.appendChild(element);
        $(element).clockpicker({
            afterHide:function() {
                setTimeout(function() {
                    // To avoid double call
                    if (cell.children[0]) {
                        spreadsheet.closeEditor(cell, true);
                    }
                });
            }
        });
        // Focus on the element
        element.focus();
    },
    getValue : function(cell) {
        return cell.innerHTML;
    },
    setValue : function(cell, value) {
        cell.innerHTML = value;
    }
}

spreadsheet = jexcel(document.getElementById('custom'), {
    data:data2,
    columns: [
        { type: 'text', title:'Course Title', width:300 },
        { type: 'text', title:'Time', width:100,editor:customColumn },
     ]
});
</script>
```

[See a working example](/jspreadsheet/v3/examples/column-types#custom)

  
  

## Define a minimum table dimension size.

The follow example will create a data table with a minimum number of ten columns and five rows:

{.ignore}
```html
<script>
let data3 = [
    ['Mazda', 2001, 2000],
    ['Peugeot', 2010, 5000],
    ['Honda Fit', 2009, 3000],
    ['Honda CRV', 2010, 6000],
];

jexcel(document.getElementById('minExample'), {
    data:data3,
    minDimensions:[10,5],
});
</script>
```

