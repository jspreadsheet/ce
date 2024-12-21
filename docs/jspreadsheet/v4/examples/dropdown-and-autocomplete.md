title: Advanced dropdown column type
keywords: Jexcel, jquery, javascript, excel-like, spreadsheet, jquery plugin, sorting, table, grid, order by
description: Full examples on how to handle simple, advanced, multiple, autocomplete and conditional dropdowns. Create amazing javascript tables using categories and images in your dropdowns.

# Dropdown and autocomplete column type

Jspreadsheet brings a very powerful, flexible and responsive dropdown column type to support a better user experience through your applications. The new dropdown column options include autocomplete, multiple options, data picker, different template types and much more advantages, such as:

  * Create a simple dropdown from array
  * Value or key-value select is available
  * Populate a dropdown from a external JSON request
  * Dynamic autocomplete search based on another column value
  * Conditional dropdowns: options from a dropdown based on a method return
  * Multiple selection and internal dropdown search
  * Responsive data picker with multiple render types
  * Image icon and group items

  

## Multiple and autocomplete options

The highlight features introduced in the most version of the vanilla javascript spreadsheet is definitely the autocomplete and multiple options.

The following example shows the column Product Origin with the autocomplete and multiple directives initiated as true.

  
  

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
    data: [
        ['US', 'Wholemeal', 'Yes', '2019-02-12'],
        ['CA;US;UK', 'Breakfast Cereals', 'Yes', '2019-03-01'],
        ['CA;BR', 'Grains', 'No', '2018-11-10'],
        ['BR', 'Pasta', 'Yes', '2019-01-12'],
    ],
    columns: [
        { type:'dropdown', width:'300', title:'Product Origin', url:'/jspreadsheet/countries', autocomplete:true, multiple:true },
        { type:'text', width:'200', title:'Description' },
        { type:'dropdown', width:'100', title:'Stock', source:['No','Yes'] },
        { type:'calendar', width:'100', title:'Best before' },
    ]
});    
</script>
</html>
```  

## Conditional dropdown

The example below shows the dependency of the second column in relation to the first.

```html
<html>
<script src="https://bossanova.uk/jspreadsheet/v4/jspreadsheet.js"></script>
<link rel="stylesheet" href="https://bossanova.uk/jspreadsheet/v4/jspreadsheet.css" type="text/css" />

<script src="https://jsuites.net/v5/jsuites.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v5/jsuites.css" type="text/css" />

<div id="spreadsheet"></div>

<script>
const dropdownFilter = function(instance, cell, c, r, source) {
    var value = instance.jexcel.getValueFromCoords(c - 1, r);
    if (value == 1) {
        return ['Apples','Bananas','Oranges'];
    } else if (value == 2) {
        return ['Carrots'];
    } else {
        return source;
    }
}

jspreadsheet(document.getElementById('spreadsheet'), {
    data: [
        [3, 'Cheese', true],
        [1, 'Apples', true],
        [2, 'Carrots', true],
        [1, 'Oranges', false],
    ],
    columns: [
        { type:'dropdown', title:'Category', width:'300', source:[ {'id':'1', 'name':'Fruits'}, {'id':'2', 'name':'Legumes'}, {'id':'3', 'name':'General Food'} ] },
        { type:'dropdown', title:'Food', width:'200', source:['Apples','Bananas','Carrots','Oranges','Cheese'], filter:dropdownFilter },
        { type: 'checkbox', title:'Buy', width:'100' },
    ],
    onchange:function(instance, cell, c, r, value) {
        if (c == 0) {
            var columnName = jspreadsheet.getColumnNameFromId([c + 1, r]);
            instance.jexcel.setValue(columnName, '');
        }
    }
});
</script>
</html>
```  

## Group, images, and advanced render options

Improve the user experience with a responsive data picker.

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
    data: [
        [1, 'Morning'],
        [2, 'Morning'],
        [3, 'Afternoon'],
        [3, 'Evening'],
    ],
    columns: [
        {
            type:'dropdown',
            title:'Category',
            width:'300',
            source:[
                { id:'1', name:'Paulo', image:'/templates/default/img/1.jpg', title:'Admin', group:'Secretary' },
                { id:'2', name:'Cosme Sergio', image:'/templates/default/img/2.jpg', title:'Teacher', group:'Docent' },
                { id:'3', name:'Rose Mary', image:'/templates/default/img/3.png', title:'Teacher', group:'Docent' },
                { id:'4', name:'Fernanda', image:'/templates/default/img/3.png', title:'Admin', group:'Secretary' },
                { id:'5', name:'Roger', image:'/templates/default/img/3.png', title:'Teacher', group:'Docent' },
            ]
        },
        {
            type:'dropdown',
            title:'Working hours',
            width:'200',
            source:['Morning','Afternoon','Evening'],
            options: { type:'picker' },
        },
    ]
});
</script>
</html>
```

More options for the dropdowns, please refer to the [jSuites documentation](https://jsuites.net/v4).

  
  

