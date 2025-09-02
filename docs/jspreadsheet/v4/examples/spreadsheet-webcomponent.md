title: Jspreadsheet Webcomponent
keywords: Jexcel, javascript, javascript vanilla, javascript plugin, plugin, excel-like, spreadsheet, table, tables, grid, datatables, data, webcomponent
description: Use the Jspreadsheet datagrid as webcomponent

# Javascript web component online spreadsheet

## Create a online javascript spreadsheet using Jspreadsheet Ce.

### Javascript

{.ignore}

```javascript
class Jspreadsheet extends HTMLElement {
  constructor() {
    super();
  }

  init(o) {
    // Shadow root
    const shadowRoot = this.attachShadow({ mode: "open" });

    // Style
    const css = document.createElement("link");
    css.rel = "stylesheet";
    css.type = "text/css";
    css.href = "https://bossanova.uk/spreadsheet/v4/spreadsheet.css";
    shadowRoot.appendChild(css);

    const css2 = document.createElement("link");
    css2.rel = "stylesheet";
    css2.type = "text/css";
    css2.href = "https://bossanova.uk/spreadsheet/v4/jsuites.css";
    shadowRoot.appendChild(css2);

    // Jspreadsheet container
    var container = document.createElement("div");
    shadowRoot.appendChild(container);

    // Create element
    this.el = jspreadsheet(container, {
      root: shadowRoot,
      minDimensions: [10, 10],
    });
  }

  connectedCallback() {
    this.init(this);
  }

  disconnectedCallback() {}

  attributeChangedCallback() {}
}

window.customElements.define("j-spreadsheet", Jspreadsheet);
```

### HTML

```html
<html>
  <script
    type="text/javascript"
    src="/jspreadsheet/v4/jspreadsheet.js"
  ></script>
  <script type="text/javascript" src="/jsuites/v3/jsuites.js"></script>
  <script
    type="text/javascript"
    src="/spreadsheet/v4/spreadsheet.webcomponent.js"
  ></script>

  <j-spreadsheet></j-spreadsheet>
</html>
```
