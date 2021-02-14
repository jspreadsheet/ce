#Jspreadsheet as a webcomponent

Jspreadsheet v4+ can run as a javascript webcomponent.

```
<html>
<script type="text/javascript" src="https://bossanova.uk/jspreadsheet/v4/jexcel.js"></script>
<script type="text/javascript" src="https://bossanova.uk/jspreadsheet/v4/jexcel.webcomponent.js"></script>

<script type="text/javascript" src="https://jsuites.net/v4/jsuites.js"></script>

<!-- The configuration goes as a inline JSON string -->
<j-spreadsheet>
{
    "minDimensions": [10,10],
    "columns": [
        {
            "width": "200px",
            "title": "Name"
        }
    ]
}
</j-spreadsheet>


</html>
```