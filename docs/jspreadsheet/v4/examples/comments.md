title: Allow comments in your javascript table
keywords: Jexcel, spreadsheet, javascript, cell comments, javascript table
description: Allow comments in your table spreadsheet.

# Spreadsheet comments

The javascript spreadsheet plugin allows the user to set custom comments for each individual cells. By allowComments in the initialization, the user will be able to add comments in the rigth click contextMenu.

## Manage cell comments programmatically

To apply comments via javascript, you can use the methods setComments or getComments, as follow:

### Source code

```html
<html>
<script src="https://bossanova.uk/jspreadsheet/v4/jspreadsheet.js"></script>
<link rel="stylesheet" href="https://bossanova.uk/jspreadsheet/v4/jspreadsheet.css" type="text/css" />

<script src="https://jsuites.net/v5/jsuites.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v5/jsuites.css" type="text/css" />

<div id="spreadsheet"></div>

<script>
let table = jspreadsheet(document.getElementById('spreadsheet'), {
    data: [
        ['US', 'Cheese', '2019-02-12'],
        ['CA', 'Apples', '2019-03-01'],
        ['CA', 'Carrots', '2018-11-10'],
        ['BR', 'Oranges', '2019-01-12'],
    ],
    columns: [
        {
            type: 'dropdown',
            url:'/jspreadsheet/countries',
            width:200,
        },
        {
            type: 'text',
            width:200,
        },
        {
            type: 'calendar',
            width:200,
        }
     ],
     allowComments:true,
});

document.getElementById("setComments").onclick = () => table.setComments('A1', 'This is the comments from A1');
document.getElementById("getComments").onclick = () => alert(table.getComments('A1'));
document.getElementById("resetComments").onclick = () => table.setComments('A1', '');
</script>

<br/>
<button type="button" id="setComments" style="width:220px;">Set A1 comments</button>
<button type="button" id="getComments" style="width:220px;">Get A1 comments</button>
<button type="button" id="resetComments" style="width:220px;">Reset A1 comments</button>
</html>
```

