title: Meta information
keywords: Javascript spreadsheet, javascript, javascript table, meta information
description: Keep hidden information about your cells using meta information methods

# Meta information

This feature helps you keep import information about the cells hidden from users.

You can define any meta information during the initialization or programatically after that thought getMeta or setMeta methods.

Set meta data for multiple columns Set a meta information for B2 Get the meta information for A1 Get all meta information  


### Source code

```html
<html>
<script src="https://bossanova.uk/jspreadsheet/v4/jspreadsheet.js"></script>
<script src="https://jsuites.net/v5/jsuites.js"></script>
<link rel="stylesheet" href="https://bossanova.uk/jspreadsheet/v4/jspreadsheet.css" type="text/css" />
<link rel="stylesheet" href="https://jsuites.net/v5/jsuites.css" type="text/css" />

<div id="spreadsheet"></div>
<div id="console"></div>

<script>
let table = jspreadsheet(document.getElementById('spreadsheet'), {
    data: [
        ['US', 'Apples', 'Yes', '2019-02-12'],
        ['CA;US;UK', 'Carrots', 'Yes', '2019-03-01'],
        ['CA;BR', 'Oranges', 'No', '2018-11-10'],
        ['BR', 'Coconuts', 'Yes', '2019-01-12'],
    ],
    columns: [
        { type: 'dropdown', title: 'Product Origin', width: '300px', url: '/jspreadsheet/countries', autocomplete: true, multiple: true },
        { type: 'text', title: 'Description', width: '200px' },
        { type: 'dropdown', title: 'Stock', width: '100px', source: ['No','Yes'] },
        { type: 'calendar', title: 'Best before', width: '100px' },
    ],
    meta:{
        A1: { myMeta: 'this is just a test', otherMetaInformation: 'other test' },
        A2: { info: 'test' }
    }
});

document.getElementById("setForMultiple").onclick = () => table.setMeta({ C1: { id:'1', y:'2019' }, C2: { id:'2' } });
document.getElementById("setForB2").onclick = () => table.setMeta('B2', 'myMetaData', prompt('myMetaData:'));
document.getElementById("getFromA1").onclick = () => document.getElementById('console').innerHTML = JSON.stringify(table.getMeta('A1'));
document.getElementById("getAll").onclick = () =>  document.getElementById('console').innerHTML =JSON.stringify(table.getMeta());
</script>

<br/>
<button type="button" id="setForMultiple">Set meta data for multiple columns</button>
<button type="button" id="setForB2">Set a meta information for B2</button>
<button type="button" id="getFromA1">Get the meta information from A1</button>
<button type="button" id="getAll">Get all meta information</button>
</html>
```

