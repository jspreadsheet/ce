# Javascript webcomponent online spreadsheet

Create a online javascript spreadsheet using Jspreadsheet CE.

(Jexcel v4)(https://bossanova.uk/jspreadsheet/v4)

## Javascript

```
class Jspreadsheet extends HTMLElement {
    constructor() {
        super();
    }

    init(o) {
        // Shadow root
        const shadowRoot = this.attachShadow({mode: 'open'});

        // Style
        const css = document.createElement('link');
        css.rel = 'stylesheet';
        css.type = 'text/css'
        css.href = 'https://bossanova.uk/jspreadsheet/v4/jexcel.css';
        shadowRoot.appendChild(css);

        const css2 = document.createElement('link');
        css2.rel = 'stylesheet';
        css2.type = 'text/css'
        css2.href = 'https://jsuites.net/v4/jsuites.css';
        shadowRoot.appendChild(css2);

        // Jexcel container
        var container = document.createElement('div'); 
        shadowRoot.appendChild(container);

        // Create element
        this.el = jexcel(container, {
            root: shadowRoot,
            minDimensions: [10,10]
        });
    }

    connectedCallback() {
        this.init(this);
    }

    disconnectedCallback() {
    }

    attributeChangedCallback() {
    }
}

window.customElements.define('j-spreadsheet', Jspreadsheet);
```

## HTML

```<html>
<script type="text/javascript" src="https://bossanova.uk/jspreadsheet/v4/jexcel.js"></script>
<script type="text/javascript" src="https://bossanova.uk/jspreadsheet/v4/jexcel.webcomponent.js"></script>
<script type="text/javascript" src="https://jsuites.net/v3/jsuites.js"></script>

<j-spreadsheet></j-spreadsheet>

</html>
```
