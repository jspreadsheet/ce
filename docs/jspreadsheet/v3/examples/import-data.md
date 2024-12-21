title: Load data from CSV or JSON or XLSX
keywords: Jexcel, javascript, excel-like, spreadsheet, loading data, csv, json, xlsx.
description: How to import data from an external CSV, json file or XLSX.

[Back to Examples](/jspreadsheet/v3/examples "Back to the examples section")

# Create a javascript spreadsheet

There are a few different ways to load data to your javascript spreadsheet shown in the next four examples below

## Based on a external CSV file

The example below helps you to create a javascript spreadsheet table based on a remote CSV file, including the headers.

```html
<html>
<script src="https://bossanova.uk/jspreadsheet/v3/jexcel.js"></script>
<link rel="stylesheet" href="https://bossanova.uk/jspreadsheet/v3/jexcel.css" type="text/css" />
<script src="https://jsuites.net/v3/jsuites.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v3/jsuites.css" type="text/css" />

<div id="spreadsheet1"></div>

<p><button id='download'>Export my spreadsheet as CSV</button></p>

<script>
mySpreadsheet = jexcel(document.getElementById('spreadsheet1'), {
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
    mySpreadsheet.download();
}
</script>
</html>
```  

## Based on an external JSON file

In a similar way, you can create a table based on an external JSON file format by using the _url: directive_ as below.


```html
<html>
<script src="https://bossanova.uk/jspreadsheet/v3/jexcel.js"></script>
<link rel="stylesheet" href="https://bossanova.uk/jspreadsheet/v3/jexcel.css" type="text/css" />
<script src="https://jsuites.net/v3/jsuites.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v3/jsuites.css" type="text/css" />

<div id="spreadsheet2"></div>

<script>
jexcel(document.getElementById('spreadsheet2'), {
    url:'/jspreadsheet/test.json',
    columns: [
        { type:'text', width:300 },
        { type:'text', width:100 },
     ]
});
</script>
</html>
```  

## Based on an JSON object

The data directive can be used to define a JSON object. In this case you can define by the name directive the order of the columns.

### Source code

```html
<html>
<script src="https://bossanova.uk/jspreadsheet/v3/jexcel.js"></script>
<link rel="stylesheet" href="https://bossanova.uk/jspreadsheet/v3/jexcel.css" type="text/css" />
<script src="https://jsuites.net/v3/jsuites.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v3/jsuites.css" type="text/css" />

<div id="spreadsheet3"></div>

<script>
    jexcel(document.getElementById('spreadsheet3'), {
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
                width:'300',
                name:'id'
            },
            {
                type:'text',
                width:'200',
                name:'name'
            },
            {
                type:'text',
                width:'100',
                name:'age'
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

**NOTE** : This example is based on a customized version of the free version of SheetsJS. There is no guarantee in the use of this library. Please consider purchase their professional version.

  
  

