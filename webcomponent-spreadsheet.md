# Javascript

```
class Jexcel extends HTMLElement {
    constructor() {
        super();
    }

    init(o) {
        // Shadow root
        const shadowRoot = this.attachShadow({mode: 'open'});

        // Style
        const cssJexcel = document.createElement('link');
        cssJexcel.rel = 'stylesheet';
        cssJexcel.type = 'text/css'
        cssJexcel.href = 'https://bossanova.uk/jexcel/v4/jexcel.css';
        shadowRoot.appendChild(cssJexcel);

        const cssJsuites = document.createElement('link');
        cssJsuites.rel = 'stylesheet';
        cssJsuites.type = 'text/css'
        cssJsuites.href = 'https://bossanova.uk/jexcel/v4/jsuites.css';
        shadowRoot.appendChild(cssJsuites);

        // Jexcel container
        var container = document.createElement('div'); 
        shadowRoot.appendChild(container);

        // Create jexcel element
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

window.customElements.define('jexcel-spreadsheet', Jexcel);
```

# HTML

```<html>
<script type="text/javascript" src="/jexcel/v4/jexcel.js"></script>
<script type="text/javascript" src="/jsuites/v2/jsuites.js"></script>
<script type="text/javascript" src="/jexcel/v4/jexcel.webcomponent.js"></script>

<jexcel-spreadsheet></jexcel-spreadsheet>

</html>
```
