title: Jspreadsheet with Vue
keywords: Jexcel, javascript, using jspreadsheet and Vue
description: A full example on how to integrate Jspreadsheet with Vue

# The Javascript spreadsheet with Vue

Integrating Jspreadsheet with Vue

[See a full example on codesandbox](https://codesandbox.io/embed/vue-default-template-p4hwn)

[Get a source code of a sample Vue project](https://github.com/jspreadsheet/jexcel-with-vue)  
  

### Source code

```html
<html>
<script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.6.10/vue.min.js"></script>

<script src="https://bossanova.uk/jspreadsheet/v4/jspreadsheet.js"></script>
<script src="https://jsuites.net/v5/jsuites.js"></script>
<link rel="stylesheet" href="https://bossanova.uk/jspreadsheet/v4/jspreadsheet.css" type="text/css" />
<link rel="stylesheet" href="https://jsuites.net/v5/jsuites.css" type="text/css" />

<div id="spreadsheet"></div>

<br/>
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

