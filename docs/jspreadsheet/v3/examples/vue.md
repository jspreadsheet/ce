title: Jspreadsheet with Vue
keywords: Jexcel, javascript, using Jspreadsheet and Vue
description: A full example on how to integrate Jspreadsheet with Vue

[Back to Examples](/jspreadsheet/v3/examples "Back to the examples section")

# The Javascript spreadsheet with Vue

Integrating jspreadsheet with Vue

[See a full example on codesandbox](https://codesandbox.io/embed/vue-default-template-p4hwn)

[Get a source code of a sample Vue project](https://github.com/jspreadsheet/jexcel-with-vue)  

```html
<html>
<script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.6.10/vue.min.js"></script>

<script src="https://bossanova.uk/jspreadsheet/v3/jexcel.js"></script>
<script src="https://jsuites.net/v3/jsuites.js"></script>
<link rel="stylesheet" href="https://bossanova.uk/jspreadsheet/v3/jexcel.css" type="text/css" />
<link rel="stylesheet" href="https://jsuites.net/v3/jsuites.css" type="text/css" />

<div id="spreadsheet"></div><br>

<input type="button" value="Add new row" id="addRow" />

<script>
let options = {
    data:[[]],
    minDimensions:[10,10],
}

let vm = new Vue({
    el: '#spreadsheet',
    mounted: function() {
        let spreadsheet = jspreadsheet(this.$el, options);
        Object.assign(this, spreadsheet);
    }
}); 

document.getElementById("addRow").onclick = () => vm.insertRow()
</script>
</html>
```

