title: Jspreadsheet | Examples | Your jquery table with toolbars
keywords: Jexcel, jquery, javascript, excel-like, spreadsheet, jquery plugin, sorting, jquery table, toolbars
description: Full examples how to load a autocomplete dropdown.

[Back to Examples](/jspreadsheet/v2/examples)

# Add a custom toolbar in your jquery tables

The following example will show how to integrate a custom native toolbar in your spreadsheet plugin.

## Instructions

The toolbar can be customized with a few parameters. 

| | |
| ---|---  |
| _**type**_ |  could be **i** for icon, **select** for a dropdown, **spectrum** or a colorpicker.  |
| _**content**_ |  defines the icon (from material icons) when you use type:i; [click here for all possible keys](https://material.io/tools/icons/) |  
| _**k**_ |  means the style should be apply to the cell;  |
| _**v**_ |  means the value of the style should be apply to the cell; When type:select, you can define an array of possibles values;  |
| _**method**_ |  can be used together with type:i to implement any custom method. The method will receive the spreadsheet instance and all marked cells by default.  |
  

## Source code

```html
<html>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jexcel/2.1.0/js/jquery.jexcel.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jexcel/2.1.0/js/jquery.jdropdown.js"></script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jexcel/2.1.0/css/jquery.jexcel.min.css" type="text/css" />
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jexcel/2.1.0/css/jquery.jdropdown.min.css" type="text/css" />

<script src="https://cdnjs.cloudflare.com/ajax/libs/spectrum/1.8.0/spectrum.min.js"></script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/spectrum/1.8.0/spectrum.min.css" type="text/css" />

<link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css?family=Material+Icons" />

<div id="my"></div>

<script>
data = [
    ['BR', 'Cheese', 1],
    ['CA', 'Apples', 0],
    ['US', 'Carrots', 1],
    ['GB', 'Oranges', 0],
];

$('#my').jexcel({
    data:data,
    colHeaders: ['Country', 'Food', 'Stock'],
    colWidths: [ 300, 100, 100 ],
    columns: [
        { type: 'autocomplete', url:'/jspreadsheet/countries' },
        { type: 'dropdown', source:['Apples','Bananas','Carrots','Oranges','Cheese'] },
        { type: 'checkbox' },
    ],
    toolbar:[
        { type:'i', content:'undo', method:undo },
        { type:'i', content:'redo', method:redo },
        { type:'i', content:'save', method:function (instance, selectedCell) { $(instance).jexcel('download'); } },
        { type:'select', k:'font-family', v:['Arial','Verdana'] },
        { type:'select', k:'font-size', v:['9px','10px','11px','12px','13px','14px'] },
        { type:'i', content:'format_align_left', k:'text-align', v:'left' },
        { type:'i', content:'format_align_center', k:'text-align', v:'center' },
        { type:'i', content:'format_align_right', k:'text-align', v:'right' },
        { type:'i', content:'format_bold', k:'font-weight', v:'bold' },
        { type:'spectrum', content:'format_color_text', k:'color' },
        { type:'spectrum', content:'format_color_fill', k:'background-color' },
    ],
});

function undo(instance, selectedCell)
{
    $(instance).jexcel('undo');
}

function redo(instance, selectedCell)
{
    $(instance).jexcel('redo');
}
</script>
</html>
```

**NOTE:** It is important to have google material fonts loaded.

