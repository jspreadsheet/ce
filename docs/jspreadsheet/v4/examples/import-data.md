title: Load data from CSV or JSON or XLSX
keywords: Jexcel, javascript, excel-like, spreadsheet, loading data, csv, json, xlsx.
description: How to import data from an external CSV, json file or XLSX.

# Create a javascript spreadsheet

There are a few different ways to load data to your javascript spreadsheet shown in the next four examples below

  

## Based on a external CSV file

The example below helps you to create a javascript spreadsheet table based on a remote CSV file, including the headers.

### Source code

```html
<html>
<script src="https://bossanova.uk/jspreadsheet/v4/jspreadsheet.js"></script>
<link rel="stylesheet" href="https://bossanova.uk/jspreadsheet/v4/jspreadsheet.css" type="text/css" />
<script src="https://jsuites.net/v5/jsuites.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v5/jsuites.css" type="text/css" />

<div id="spreadsheet"></div>

<p><button id='download'>Export my spreadsheet as CSV</button></p>

<script>
let table = jspreadsheet(document.getElementById('spreadsheet'), {
    csv:'/jspreadsheet/arts.csv',
    csvHeaders:true,
    tableOverflow:true,
    columns: [
        { type:'text', width:300 },
        { type:'text', width:80 },
        { type:'dropdown', width:120, source:['England','Wales','Northern Ireland','Scotland'] },
        { type:'text', width:120 },
        { type:'text', width:120 },
     ]
});

document.getElementById('download').onclick = function () {
    table.download();
}
</script>
</html>
```  
  

## Based on an external JSON file

In a similar way, you can create a table based on an external JSON file format by using the _url: directive_ as below.

### Source code

```html
<html>
<script src="https://bossanova.uk/jspreadsheet/v4/jspreadsheet.js"></script>
<link rel="stylesheet" href="https://bossanova.uk/jspreadsheet/v4/jspreadsheet.css" type="text/css" />
<script src="https://jsuites.net/v5/jsuites.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v5/jsuites.css" type="text/css" />

<div id="spreadsheet2"></div>

<script>
jspreadsheet(document.getElementById('spreadsheet2'), {
    url: '/jspreadsheet/test.json',
    columns: [
        { type:'text', width:300 },
        { type:'text', width:100 },
     ]
});
</script>
</html>
```  
  
  

## Based on an JSON object

The data directiva can be used to define a JSON object. In this case you can define by the name directive the order of the columns.


### Source code

```html
<html>
<script src="https://bossanova.uk/jspreadsheet/v4/jspreadsheet.js"></script>
<link rel="stylesheet" href="https://bossanova.uk/jspreadsheet/v4/jspreadsheet.css" type="text/css" />
<script src="https://jsuites.net/v5/jsuites.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v5/jsuites.css" type="text/css" />

<div id="spreadsheet"></div>

<script>
jspreadsheet(document.getElementById('spreadsheet'), {
    data:[
        {
            name:'Paulo',
            id:'3',
            age:'40',
            gender:'Male'
        },
        {
            name:'Cosme Sergio',
            id:'4',
            age:'48',
            gender:'Male'
        },
        {
            name:'Jorgina Santos',
            id:'5',
            age:'32',
            gender:'Female'
        },
    ],
    columns: [
        {
            type:'text',
            width:'40',
            name:'id',
            title:'Id',
        },
        {
            type:'text',
            width:'200',
            name:'name',
            title:'Name',
        },
        {
            type:'text',
            width:'100',
            name:'age',
            title:'Age',
        },
        {
            type:'hidden',
            name:'gender'
        },
     ]
});
</script>
</html>
```  
  
  

## Importing from a XLSX file

The following example imports the data from a XLSX file using a thirdy party library, slighly customized in order to improve the CSS parser.

IMPORTANT: This is an experimental implementation and there is no garantee your spreadsheet will be correctly parsed.


### Source code

```html
<html>
<script src="https://bossanova.uk/jspreadsheet/v4/jspreadsheet.js"></script>
<link rel="stylesheet" href="https://bossanova.uk/jspreadsheet/v4/jspreadsheet.css" type="text/css" />
<script src="https://jsuites.net/v5/jsuites.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v5/jsuites.css" type="text/css" />

<script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.13.5/jszip.js"></script>
<script src="https://bossanova.uk/jspreadsheet/v3/xlsx.js"></script>

<div id="jspreadsheet"></div>

<script>
jspreadsheet.fromSpreadsheet('/jspreadsheet/list.xlsx', function(result) {
    if (! result.length) {
        console.error('jspreadsheet: Something went wrong.');
    } else {
        if (result.length == 1) {
            jspreadsheet(document.getElementById('jspreadsheet'), result[0]);
        } else {
            jspreadsheet.createTabs(document.getElementById('jspreadsheet'), result);
        }
    }
});
</script>
</html>
```

**NOTE** : This example is based on a customized version of the free version of [Sheetjs](https://sheetjs.com/). There is no garantee in the use of this library. Please consider purchase their professional version.

  
  

