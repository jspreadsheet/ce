#Jexcel as a webcomponent

Jexcel v4+ can run as a javascript webcomponent.

```
<html>
<script type="text/javascript" src="/jexcel/v4/jexcel.js"></script>
<script type="text/javascript" src="/jexcel/v4/jexcel.webcomponent.js"></script>

<script type="text/javascript" src="/jsuites/v3/jsuites.js"></script>

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