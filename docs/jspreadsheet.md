title: Jspreadsheet CE - The JavaScript Data Grid with Spreadsheet Controls  
keywords: Jspreadsheet CE, JavaScript spreadsheet, data grid, Excel-like functionality, JavaScript plugins, web components, data table, interactive spreadsheets, customizable grid, spreadsheet integration  
description: Jspreadsheet CE is a lightweight JavaScript data grid with powerful spreadsheet controls. Easily create interactive, customizable, and Excel-compatible web-based spreadsheets for seamless data management and enhanced user experience.
canonical: https://bossanova.uk/jspreadsheet

<div class="home homepage">

<div class="row">
    <div class="column f5">
        <div class="limit-75">
            <h1>JavaScript component to create web applications with spreadsheet UI</h1>
            <p>Free and open-source JavaScript component to create web applications with spreadsheet UI.</p>
            <button class="button main" style="width: 130px; margin-top: 20px"><a href="/jspreadsheet/docs">Get Started</a></button>
        </div>
    </div>
    <div class="column f4 big-screen-only">
        <img src="img/home/title-image.svg" alt="Worksheet" style="width: 100%;">
   </div>
</div>

<div class="space100"></div>

<div class="stats">
    <div class="stats-item">
        <img src="img/home/npm-logo.svg" alt="NPM Logo" style="height: 22px;">
        <div>
            <h4>23k+</h4>
            <span>Weekly downloads</span>
        </div>
    </div>
    <div class="stats-item">
        <img src="img/home/github-logo.svg" alt="GitHub Logo" style="height: 36px;">
        <div>
            <h4>6700+</h4>
            <span>GitHub stars</span>
        </div>
    </div>
    <div class="stats-item">
        <img src="img/home/license-icon.svg" alt="MIT License Icon" style="height: 36px;">
        <div>
            <h4>MIT License</h4>
            <span>Free and open-source</span>
        </div>
    </div>
</div>

<div class="space100"></div>

<div class="row center frameworks" style="justify-content: center;">
    <div class="column" style="max-width: 520px;">
        <h2>Compatible with<br>React, Angular, and Vue.</h2>
        <p>Jspreadsheet CE provides compatibility across different environments, ensuring your spreadsheet solution fits perfectly into your chosen stack.</p>
        <br><br>
        <img src="img/javascript.png" alt="JavaScript" />
        <img src="img/angular.png" alt="Angular" />
        <img src="img/react.png" alt="ReactJS" />
        <img src="img/vuejs.png" alt="VueJS" />
        <img src="img/lemonadejs.png" alt="LemonadeJS" />
    </div>
</div>

<div class="space200"></div>

<div class="row big-screen-only">
    <div class="column f4">
        <div>
            <h2>A complete solution to make rich and user-friendly web applications</h2>
            <p>Fully customizable JavaScript spreadsheet library, offering various components to enhance web development projects.</p>
            <div>
                <div class="example-selectable-card selected" onclick="showText('home-column-types', this)">
                    <h4>Column Types</h4>
                    <p>A variety of customisable column types</p>
                </div>
                <div class="example-selectable-card" onclick="showText('home-nested-headers', this)">
                    <h4>Nested Headers</h4>
                    <p>Create multi-level column headers</p>
                </div>
                <div class="example-selectable-card" onclick="showText('home-cell-comments', this)">
                    <h4>Cell Comments</h4>
                    <p>Add comments to your spreadsheet cells</p>
                </div>
                <div class="example-selectable-card" onclick="showText('home-custom-toolbar', this)">
                    <h4>Custom Toolbar</h4>
                    <p>Personalize your spreadsheet toolbar</p>
                </div>
            </div>
        </div>
    </div>
    <div class="column f5 code-block-col">

<div id="home-column-types" class="code-block active">

```html
<html>
<script src="https://bossanova.uk/jspreadsheet/v5/jspreadsheet.js"></script>
<script src="https://jsuites.net/v5/jsuites.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v5/jsuites.css" type="text/css" />
<link rel="stylesheet" href="https://bossanova.uk/jspreadsheet/v5/jspreadsheet.css" type="text/css" />


<div id="spreadsheet"></div>

<script>
let table = jspreadsheet(document.getElementById('spreadsheet'), {
    worksheets: [{
        data: [
            ['Hello', 13123, '', 'Yes', true, '#AA4411'],
            ['World!', 8, '', 'No', false, '#99BE23']
        ],
        columns: [
            { type: 'text', title: 'Text' },
            { type: 'numeric', title: 'Numeric', mask:'$ #.##,00', decimal: ',' },
            { type: 'calendar', title: 'Calendar' },
            { type: 'dropdown', source: ['Yes', 'No', 'Maybe'] },
            { type: 'checkbox', title: 'Checkbox' },
            { type: 'color', title: 'Color', width: 50, render: 'square' }
        ]
    }]
});
</script>
</html>
```
```jsx
import React, { useRef } from "react";
import { Spreadsheet, Worksheet } from "@jspreadsheet-ce/react";
import "jspreadsheet-ce/dist/jspreadsheet.css";

export default function App() {
    // Spreadsheet array of worksheets
    const spreadsheet = useRef();
    // Data
    const data = [
        ['Hello', 13123, '', 'Yes', true, '#AA4411'],
        ['World!', 8, '', 'No', false, '#99BE23']
    ];
    // Columns
    const columns = [
        { type: 'text', title: 'Text' },
        { type: 'numeric', title: 'Numeric', mask:'$ #.##,00', decimal: ',' },
        { type: 'calendar', title: 'Calendar' },
        { type: 'dropdown', source: ['Yes', 'No', 'Maybe'] },
        { type: 'checkbox', title: 'Checkbox' },
        { type: 'color', title: 'Color', width: 50, render: 'square' }
    ];

    // Render component
    return (
        <Spreadsheet ref={spreadsheet}>
            <Worksheet data={data} columns={columns} />
        </Spreadsheet>
    );
}
```
```vue
<template>
    <Spreadsheet ref="spreadsheetRef">
        <Worksheet 
            :data="data" 
            :columns="columns" 
        />
    </Spreadsheet>
</template>

<script setup>
import { ref } from 'vue';
import { Spreadsheet, Worksheet } from "@jspreadsheet-ce/vue";
import "jspreadsheet-ce/dist/jspreadsheet.css";

// Spreadsheet ref
const spreadsheetRef = ref(null);

// Data
const data = ref([
    ['Hello', 13123, '', 'Yes', true, '#AA4411'],
    ['World!', 8, '', 'No', false, '#99BE23']
]);

// Columns
const columns = ref([
    { type: 'text', title: 'Text' },
    { type: 'numeric', title: 'Numeric', mask:'$ #.##,00', decimal: ',' },
    { type: 'calendar', title: 'Calendar' },
    { type: 'dropdown', source: ['Yes', 'No', 'Maybe'] },
    { type: 'checkbox', title: 'Checkbox' },
    { type: 'color', title: 'Color', width: 50, render: 'square' }
]);
</script>
```
```angularjs
import { Component, ViewChild, ElementRef } from "@angular/core";
import jspreadsheet from "jspreadsheet-ce";
import "jspreadsheet-ce/dist/jspreadsheet.css"

// Create component
@Component({
    standalone: true,
    selector: "app-root",
    template: `<div #spreadsheet></div>`,
})
export class AppComponent {
    @ViewChild("spreadsheet") spreadsheet: ElementRef;
    // Worksheets
    worksheets: jspreadsheet.worksheetInstance[];
    // Create a new data grid
    ngAfterViewInit() {
        // Create spreadsheet
        this.worksheets = jspreadsheet(this.spreadsheet.nativeElement, {
            worksheets: [{
                data: [
                    ['Hello', 13123, '', 'Yes', true, '#AA4411'],
                    ['World!', 8, '', 'No', false, '#99BE23']
                ],
                columns: [
                    { type: 'text', title: 'Text' },
                    { type: 'numeric', title: 'Numeric', mask:'$ #.##,00', decimal: ',' },
                    { type: 'calendar', title: 'Calendar' },
                    { type: 'dropdown', source: ['Yes', 'No', 'Maybe'] },
                    { type: 'checkbox', title: 'Checkbox' },
                    { type: 'color', title: 'Color', width: 50, render: 'square' }
                ]
            }],
        });
    }
}
```

</div>
<div id="home-nested-headers" class="code-block">

```html
<html>
<script src="https://bossanova.uk/jspreadsheet/v5/jspreadsheet.js"></script>
<script src="https://jsuites.net/v5/jsuites.js"></script>
<link rel="stylesheet" href="https://bossanova.uk/jspreadsheet/v5/jspreadsheet.css" type="text/css" />
<link rel="stylesheet" href="https://jsuites.net/v5/jsuites.css" type="text/css" />


<div id="spreadsheet"></div>

<script>
jspreadsheet(document.getElementById('spreadsheet'), {
    worksheets: [{
        data: [[]],
        minDimensions: [5, 2],
        nestedHeaders:[
            [
                {
                    title: 'Supermarket information',
                    colspan: '6',
                },
            ],
            [
                {
                    title: 'Location',
                    colspan: '1',
                },
                {
                    title: ' Other Information',
                    colspan: '2'
                },
                {
                    title: ' Costs',
                    colspan: '3'
                }
            ],
        ]
    }]
});
</script>
</html>
```
```jsx
import React, { useRef } from "react";
import { Spreadsheet, Worksheet } from "@jspreadsheet-ce/react";
import "jsuites/dist/jsuites.css";
import "jspreadsheet-ce/dist/jspreadsheet.css";

export default function App() {
    // Spreadsheet array of worksheets
    const spreadsheet = useRef();
    // Nested headers
    const nestedHeaders = [
        [
            {
                title: 'Supermarket information',
                colspan: '6',
            },
        ],
        [
            {
                title: 'Location',
                colspan: '1',
            },
            {
                title: ' Other Information',
                colspan: '2'
            },
            {
                title: ' Costs',
                colspan: '3'
            }
        ],
    ];
    // Render component
    return (
        <>
            <Spreadsheet ref={spreadsheet}>
                <Worksheet nestedHeaders={nestedHeaders} minDimensions={[5,2]} />
            </Spreadsheet>
        </>
    );
}
```
```vue
<template>
  <Spreadsheet ref="spreadsheet">
      <Worksheet 
          :nestedHeaders="nestedHeaders" 
          :minDimensions="[5,2]" 
      />
  </Spreadsheet>
</template>

<script setup>
import { ref } from 'vue'
import { Spreadsheet, Worksheet } from "@jspreadsheet-ce/vue";
import "jsuites/dist/jsuites.css";
import "jspreadsheet-ce/dist/spreadsheet.css";

// Nested headers
const nestedHeaders = ref([
  [
      {
          title: 'Supermarket information',
          colspan: '6',
      },
  ],
  [
      {
          title: 'Location',
          colspan: '1',
      },
      {
          title: ' Other Information',
          colspan: '2'
      },
      {
          title: ' Costs',
          colspan: '3'
      }
  ],
]);

const spreadsheet = ref(null);
</script>
```
```angularjs
import { Component, ViewChild, ElementRef } from "@angular/core";
import jspreadsheet from "jspreadsheet-ce";
import "jspreadsheet-ce/dist/jspreadsheet.css"
import "jsuites/dist/jsuites.css"

// Create component
@Component({
    standalone: true,
    selector: "app-root",
    template: `<div #spreadsheet></div>`,
})
export class AppComponent {
    @ViewChild("spreadsheet") spreadsheet: ElementRef;
    // Worksheets
    worksheets: jspreadsheet.worksheetInstance[];
    // Create a new data grid
    ngAfterViewInit() {
        // Create spreadsheet
        this.worksheets = jspreadsheet(this.spreadsheet.nativeElement, {
            worksheets: [{
                data: [[]],
                minDimensions: [5, 2],
                nestedHeaders:[
                    [
                        {
                            title: 'Supermarket information',
                            colspan: '6',
                        },
                    ],
                    [
                        {
                            title: 'Location',
                            colspan: '1',
                        },
                        {
                            title: ' Other Information',
                            colspan: '2'
                        },
                        {
                            title: ' Costs',
                            colspan: '3'
                        }
                    ],
                ]
            }]
        });
    }
}
```

</div>
<div id="home-cell-comments" class="code-block">

```html
<html>
<script src="https://bossanova.uk/jspreadsheet/v5/jspreadsheet.js"></script>
<link rel="stylesheet" href="https://bossanova.uk/jspreadsheet/v5/jspreadsheet.css" type="text/css" />
<script src="https://jsuites.net/v5/jsuites.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v5/jsuites.css" type="text/css" />


<div id="spreadsheet"></div>

<script>
jspreadsheet(document.getElementById('spreadsheet'), {
    worksheets: [{
        data: [
            ['US', 'Cheese', '2019-02-12'],
            ['CA', 'Apples', '2019-03-01'],
        ],
        columns: [
            {width: '170px'},
            {width: '170px'},
            {width: '170px'},
        ],
        allowComments: true,
        comments: {
            B1: 'Initial comments on B1',
            C1: 'Initial comments on C1'
        },
    }]
});
</script>
</html>
```
```jsx
import React, { useRef } from "react";
import { Spreadsheet, Worksheet } from "@jspreadsheet-ce/react";
import "jsuites/dist/jsuites.css";
import "jspreadsheet-ce/dist/jspreadsheet.css";

export default function App() {
const spreadsheet = useRef();

    const data = [
        ['US', 'Cheese', '2019-02-12'],
        ['CA', 'Apples', '2019-03-01'],
    ];

    const columns = [
        { width: '170px' },
        { width: '170px' },
        { width: '170px' },
    ];

    const comments = {
        B1: 'Initial comments on B1',
        C1: 'Initial comments on C1'
    };

    return (
        <>
            <Spreadsheet ref={spreadsheet}>
                <Worksheet data={data} columns={columns} comments={comments} allowComments />
            </Spreadsheet>
        </>
    );
}
```
```vue
<template>
  <Spreadsheet ref="spreadsheetRef">
      <Worksheet 
          :data="data" 
          :columns="columns" 
          :comments="comments" 
      />
  </Spreadsheet>
</template>

<script setup>
import { ref } from 'vue';
import { Spreadsheet, Worksheet } from "@jspreadsheet-ce/vue";
import "jsuites/dist/jsuites.css";
import "jspreadsheet-ce/dist/spreadsheet.css";

// Spreadsheet ref
const spreadsheetRef = ref(null);

// Data
const data = ref([
  ["US", "Cheese", "2019-02-12"],
  ["CA", "Apples", "2019-03-01"],
]);

// Columns configuration
const columns = ref([
  { width: "170px" },
  { width: "170px" },
  { width: "170px" }
]);

// Initial comments
const comments = ref({
  B1: "Initial comments on B1",
  C1: "Initial comments on C1",
});
</script>
```
```angularjs
import { Component, ViewChild, ElementRef } from "@angular/core";
import jspreadsheet from "jspreadsheet-ce";

import "jsuites/dist/jsuites.css";
import "jspreadsheet-ce/dist/jspreadsheet.css";

@Component({
    standalone: true,
    selector: "app-root",
    template: `<div #spreadsheet></div>`
})
export class AppComponent {
    @ViewChild("spreadsheet") spreadsheet: ElementRef;
    worksheets: jspreadsheet.worksheetInstance[];

    ngAfterViewInit() {
        this.worksheets = jspreadsheet(this.spreadsheet.nativeElement, {
            worksheets: [
                {
                    data: [
                        ['US', 'Cheese', '2019-02-12'],
                        ['CA', 'Apples', '2019-03-01'],
                        ['CA', 'Carrots', '2018-11-10'],
                        ['BR', 'Oranges', '2019-01-12'],
                    ],
                    columns: [
                        { width: '170px' },
                        { width: '170px' },
                        { width: '170px' },
                    ],
                    allowComments: true,
                    comments: {
                        B1: 'Initial comments on B1',
                        C1: 'Initial comments on C1'
                    },
                }
            ],
        });
    }
}
```

</div>
<div id="home-custom-toolbar" class="code-block">

```html
<html>
<script src="https://bossanova.uk/jspreadsheet/v5/jspreadsheet.js"></script>
<link rel="stylesheet" href="https://bossanova.uk/jspreadsheet/v5/jspreadsheet.css" type="text/css" />
<script src="https://jsuites.net/v5/jsuites.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v5/jsuites.css" type="text/css" />


<div id="spreadsheet"></div>

<script>
jspreadsheet(document.getElementById('spreadsheet'), {
    toolbar: function(toolbar) {
        // Add a new custom item in the end of my toolbar
        toolbar.items.push({
            tooltip: 'My custom item',
            content: 'share',
            onclick: function() {
                alert('Custom click');
            }
        });

        return toolbar;
    },
    worksheets: [{
        minDimensions: [6, 2]
    }]
});
</script>
</html>
```
```jsx
import React, { useRef } from "react";
import { Spreadsheet, Worksheet } from "@jspreadsheet-ce/react";
import "jsuites/dist/jsuites.css";
import "jspreadsheet-ce/dist/jspreadsheet.css";

export default function App() {
    const spreadsheet = useRef();

    const toolbar = function(toolbar) {
        // Add a new custom item in the end of my toolbar
        toolbar.items.push({
            tooltip: 'My custom item',
            content: 'share',
            onclick: function() {
                alert('Custom click');
            }
        });

        return toolbar;
    }

    return (
        <>
            <Spreadsheet ref={spreadsheet} toolbar={toolbar}>
                <Worksheet minDimensions={[6, 2]} />
            </Spreadsheet>
        </>
    );
}
```
```vue
<template>
  <Spreadsheet ref="spreadsheetRef" :toolbar="toolbar">
      <Worksheet 
          :minDimensions="[5, 2]"
      />
  </Spreadsheet>
</template>

<script setup>
import { ref } from 'vue';
import { Spreadsheet, Worksheet } from "@jspreadsheet-ce/vue";
import "jsuites/dist/jsuites.css";
import "jspreadsheet-ce/dist/spreadsheet.css";

// Spreadsheet ref
const spreadsheetRef = ref(null);

const toolbar = (toolbar) => {
    // Add a new custom item in the end of my toolbar
    toolbar.items.push({
        tooltip: 'My custom item',
        content: 'share',
        onclick: function() {
            alert('Custom click');
        }
    });
    return toolbar;
}
</script>
```
```angularjs
import { Component, ViewChild, ElementRef } from "@angular/core";
import jspreadsheet from "jspreadsheet-ce";

import "jspreadsheet-ce/dist/jspreadsheet.css"
import "jsuites/dist/jsuites.css"

// Create component
@Component({
    standalone: true,
    selector: "app-root",
    template: `<div #spreadsheet></div>`,
})
export class AppComponent {
    @ViewChild("spreadsheet") spreadsheet: ElementRef;
    // Worksheets
    worksheets: jspreadsheet.worksheetInstance[];
    // Create a new data grid
    ngAfterViewInit() {
        // Create spreadsheet
        this.worksheets = jspreadsheet(this.spreadsheet.nativeElement, {
            toolbar: function(toolbar) {
                // Add a new custom item in the end of my toolbar
                toolbar.items.push({
                    tooltip: 'My custom item',
                    content: 'share',
                    onclick: function() {
                        alert('Custom click');
                    }
                });
        
                return toolbar;
            },
            worksheets: [{
                minDimensions: [6, 2]
            }]
        });
    }
}
```

</div>

</div>
</div>

<div class="space200 line"></div>

<div class="row">
    <div class="column f1">
        <div style="max-width: 500px;">
            <h2>Create an online spreadsheet from various data formats</h2>
            <p>With Jspreadsheet, you can quickly create online spreadsheets using JavaScript arrays, JSON, CSV, and XLSX files. This flexibility simplifies data integration and minimizes your application's need for complex processing.</p>
        </div>
   </div>
    <div class="column f1 video-wrapper big-screen-only">
        <video src="media/home-video.mp4" playsinline autoplay muted loop type="video/mp4" style="width:95%;height: 95%;"></video>
    </div>
</div>

<div class="space200 line"></div>

<div class="container center" style="max-width: 680px;">
    <h2>Deliver high-quality interfaces and applications to your end-user</h2>
    <p>Jspreadsheet reduces customers development time.<br>Here are some of their experiences.</p>
    <br>
</div>

<div class="box" data-number="3">
    <div>
        <img src="img/home/grid/rich-interfaces.svg" style="height: 36px; width: 36px;" alt="Rich Interfaces">
        <h4>Rich Interfaces</h4>
        <p>Make rich and user-friendly web interfaces and applications</p>
    </div>
    <div>
        <img src="img/home/grid/user-friendly-inputs.svg" style="height: 36px; width: 36px;" alt="User-Friendly Inputs">
        <h4>User-Friendly Inputs</h4>
        <p>You can easily handle complicated data inputs in a way users are used to</p>
    </div>
    <div>
        <img src="img/home/grid/enhanced-experience.svg" style="height: 36px; width: 36px;" alt="Enhanced Experience">
        <h4>Enhanced Experience</h4>
        <p>Improve your user software experience</p>
    </div>
    <div>
        <img src="img/home/grid/beautiful-cruds.svg" style="height: 36px; width: 36px;" alt="Beautiful CRUDs">
        <h4>Beautiful CRUDs</h4>
        <p>Create rich CRUDS and beautiful UI</p>
    </div>
    <div>
        <img src="img/home/grid/compatibility-with-excel.svg" style="height: 36px; width: 36px;" alt="Compatibility with excel spreadsheets">
        <h4>Compatibility with excel spreadsheets</h4>
        <p>Users can move data around with common copy and paste shortcuts</p>
    </div>
    <div>
        <img src="img/home/grid/easy-customization.svg" style="height: 36px; width: 36px;" alt="Easy Customization">
        <h4>Easy Customization</h4>
        <p>Easy customizations with easy third-party plugin integrations</p>
    </div>
    <div>
        <img src="img/home/grid/fast-and-simple.svg" style="height: 36px; width: 36px;" alt="Fast and Simple">
        <h4>Fast and Simple</h4>
        <p>Lean, fast and simple to use</p>
    </div>
    <div>
        <img src="img/home/grid/faster-data-entry.svg" style="height: 36px; width: 36px;" alt="Faster Data Entry">
        <h4>Faster Data Entry</h4>
        <p>Speed up your work dealing with difficult data entry in a web-based software</p>
    </div>
    <div>
        <img src="img/home/grid/shareable-spreadsheets.svg" style="height: 36px; width: 36px;" alt="Shareable Spreadsheets">
        <h4>Shareable Spreadsheets</h4>
        <p>Create and share amazing online spreadsheets</p>
    </div>
</div>

<div class="space200 line"></div>

<div class="container center p20" style="max-width: 650px;">
    <h2>Component Ecosystem</h2>
    <p>Explore the powerful and versatile components designed to elevate your productivity. From data management to collaboration, our ecosystem seamlessly integrates to meet your needs.</p>
    <br>
</div>

<div class="box" data-number="2">
    <div>
        <a href="https://jspreadsheet.com"><img src="img/logo/jspreadsheet-pro-logo.svg" style="height: 44px; width: 44px;" alt="Jspreadsheet Pro - JavaScript Data Grid With Spreadsheet Controls"></a>
        <h4>Jspreadsheet Pro</h4>
        <p>Enterprise JavaScript data grid component to integrate spreadsheet UI into your web-based application.</p>
    </div>
    <div>
        <a href="https://intrasheets.com"><img src="img/logo/intrasheets-logo.svg" style="height: 44px; width: 44px;" alt="Intrasheets - Collaborative Private Spreadsheets"></a>
        <h4>Intrasheets</h4>
        <p>Collaborate with ease using Intrasheets, an intuitive tool for managing spreadsheets across teams, ensuring that everyone stays on the same page.</p>
    </div>
    <div>
        <a href="https://jsuites.net"><img src="img/logo/jsuites-logo.svg" style="height: 44px; width: 44px;" alt="jSuites - JavaScript Plugins"></a>
        <h4>Jsuites</h4>
        <p>Comprehensive JavaScript plugins and web components for diverse web-based applications and requirements.</p>
    </div>
    <div>
        <a href="https://lemonadejs.com"><img src="img/logo/lemonadejs-logo.svg" style="height: 44px; width: 44px;"  alt="LemonadeJS - Micro Agnostic JavaScript Reactive library"></a>
        <h4>LemonadeJS</h4>
        <p>A light and easy-to-use solution for creating elegant UI elements, giving your web apps a refreshing boost in both style and functionality.</p>
    </div>
</div>

<div class="space100"></div>
<div class="bg-section" style="background-color: #46077a27; height: 450px;"></div>
<div class="space100"></div>

<div class="row middle center" style="justify-content: center;">
    <div class="column">
        <br><br>
        <h2>Subscribe to our newsletter</h2>
        <p>Tech news, tips and technical advice</p>
        <div>
            <div id="mc_embed_signup">
                <form action="https://bossanova.us20.list-manage.com/subscribe/post?u=f9b5adf8223e3d5a8f575b0bb&amp;id=37f97a936c" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank" novalidate>
                    <div id="mc_embed_signup_scroll">
                        <div class="mc-field-group">
                            <input type="email" value="" name="EMAIL" class="required email" id="mce-EMAIL" placeholder="user@email.com"> <input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" class='main button'>
                        </div>
                        <div id="mce-responses" class="clear">
                            <div class="response" id="mce-error-response" style="display:none"></div>
                            <div class="response" id="mce-success-response" style="display:none"></div>
                        </div>    <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->
                        <div style="position: absolute; left: -5000px;" aria-hidden="true"><input type="text" name="b_f9b5adf8223e3d5a8f575b0bb_37f97a936c" tabindex="-1" value=""></div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

<div class="space100"></div>

<div class="block-space"></div>

</div>
