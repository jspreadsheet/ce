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
        cssJexcel.href = 'jexcel.css';
        shadowRoot.appendChild(cssJexcel);

        const cssJsuites = document.createElement('link');
        cssJsuites.rel = 'stylesheet';
        cssJsuites.type = 'text/css'
        cssJsuites.href = 'jsuites.css';
        shadowRoot.appendChild(cssJsuites);

        // Jexcel container
        var container = document.createElement('div'); 
        shadowRoot.appendChild(container);

        // Garantee all elements are rendered
        setTimeout(function() {
            // Parse JSON
            var config = JSON.parse(o.innerHTML);
            // Root
            config.root = shadowRoot;
            // Reset container
            o.innerHTML = '';
            // Create jexcel element
            jexcel(container, config);
        }, 0);
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