title: Jspreadsheet | Examples | Text wrap
keywords: Jexcel, jquery, javascript, excel-like, spreadsheet, jquery plugin, text wrapping
description: How to change the text wrap behavior in a Jspreadsheet column

[Back to Examples](/jspreadsheet/v2/examples)

# Text wrapping

The javascript spreadsheet default configuration does not wrap the text. But, you can change this behavior by using the wordWrap option in the jquery plugin initialization. In the most recent version of Jspreadsheet, alt+enter will allow the user to add a new line when editing the text when the wrap is enabled

## Source code

```html
<html>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>

<script src="https://cdnjs.cloudflare.com/ajax/libs/jexcel/2.1.0/js/jquery.jexcel.js"></script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jexcel/2.1.0/css/jquery.jexcel.min.css" type="text/css" />

<div id="my"></div>

<script>
let data = [
        ['Spyro Trilogy Reignited (PS4)', '29.99', 'Edition: Standard Edition\nSpyro`s back and he`s all scaled up!\nThe original roast master is back! Same sick burns, same smoldering attitude, now all scaled up in stunning HD. Spyro is bringing the heat like never before in the SpyroTM Reignited Trilogy game collection\nAll 3 original Spyro games fully remastered in HD\nIncludes Spyro the Dragon, Spyro 2: Ripto`s Rage! and Spyro: Year of the Dragon\n\n100+ levels, remastered with breathtaking graphical updates and improved gameplay controls'],
        ['Call of Duty: Black Ops 4 (PS4)', '49.99', 'Forget what you know\nTune in to the call of duty: Black ops four community reveal event: May 17, 2018'],
];
    
$('#my').jexcel({
    data:data,
    colHeaders: [ 'Game', 'Price', 'Description' ],
    colWidths: [200, 100, 400],
    colAlignments: [ 'center', 'center', 'left' ],
    columns: [
        { type:'text' },
        { type:'text' },
        { type:'text', wordWrap:true },
    ]
});
</script>
</html>
```

