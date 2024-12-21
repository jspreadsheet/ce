title: React Spreadsheet
keywords: Jspreadsheet, Jexcel, javascript, React, data grid, spreadsheet-like controls, React data grid, Jspreadsheet integration, React integration, JavaScript data grid, spreadsheet controls in React
description: Description: How to integrate spreadsheet-like features into your React applications with Jspreadsheet.

# React Spreadsheet

Jspreadsheet CE is a lightweight JavaScript data grid library with spreadsheet controls. It integrates seamlessly with React, enabling developers to create highly interactive and customizable spreadsheet-like application components. This guide walks you through the process of integrating Jspreadsheet CE into a React project.

## Install

### Install the Package

Install Jspreadsheet React Data Grid wrapper using NPM.

```bash
npm install @jspreadsheet-ce/react@5.0.0-beta.3
```

### Import Required Styles

Import the necessary Spreadsheet CSS style to your project.

{.ignore}
```javascript
import "jsuites/dist/jsuites.css";
import "jspreadsheet-ce/dist/jspreadsheet.css";
```

To ensure icons display correctly, include Material Icons in your application. Add the following code to your main HTML file:

{.ignore}
```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Material+Icons" />
```

## Example

### React Wrapper

Create your first React grid with spreadsheet controls using the Jspreadsheet React wrapper.

{.ignore}
```jsx
import React, { useRef, useEffect } from "react";
import { Spreadsheet, Worksheet } from "@jspreadsheet-ce/react";

import "jspreadsheet-ce/dist/jspreadsheet.css";
import "jsuites/dist/jsuites.css";

export default function App() {
    // Spreadsheet array of worksheets
    const spreadsheet = useRef();

    // Render component
    return (
        <Spreadsheet ref={spreadsheet} tabs={true} toolbar={true}>
            <Worksheet minDimensions={[6, 6]} />
        </Spreadsheet>
    );
}
```

### React Component

You can create your React component using the library directly for better control.

{.ignore}
```jsx
import React, { useRef, useEffect } from "react";
import jspreadsheet from "@jspreadsheet-ce/react";

import "jspreadsheet-ce/dist/jspreadsheet.css";
import "jsuites/dist/jsuites.css";

export default function App() {
    const jssRef = useRef(null);

    useEffect(() => {
        // Create the spreadsheet only once
        if (!jssRef.current.jspreadsheet) {
            jspreadsheet(jssRef.current, {
                worksheets: [{
                    minDimensions: [10, 10]
                }],
            });
        }
    }, null);

    return (<div ref={jssRef} />);
}
```

## Overview

Jspreadsheet operates with simple objects, including big datasets. It manages object references internally to optimize performance, minimize overhead, and maintain efficient data handling. For this reason, proprietary methods and events are provided to interact with its internal states.

### Integration with React

#### States

Due to its architecture, Jspreadsheet does not work directly with React States. To integrate, you must declare Jspreadsheet events and use them to synchronize with React.

#### Events

Events can be declared at the spreadsheet level. Refer to the [events documentation](/jspreadsheet/docs/events) for available events and usage examples.

{.ignore}
```jsx
import React, { useRef, useEffect } from "react";
import { Spreadsheet, Worksheet } from "@jspreadsheet-ce/react";

import "jspreadsheet-ce/dist/jspreadsheet.css";
import "jsuites/dist/jsuites.css";

export default function App() {
    // Spreadsheet array of worksheets
    const spreadsheet = useRef();

    const afterchanges = function() {
        // There were changes on the data
    }
    
    // Render component
    return (
        <Spreadsheet ref={spreadsheet} onafterchanges={afterchanges}>
            <Worksheet minDimensions={[6, 6]} />
        </Spreadsheet>
    );
}
```


## Jspreadsheet Pro with React

### Real-Time React Spreadsheet

Create a Real-time JavaScript Spreadsheet with React and TypeScript using Jspreadsheet.

* [Real-Time Collaboration](https://github.com/jspreadsheet/spreadsheet-react-server)

#### More React Spreadsheet Examples

* [React Spreadsheet](https://codesandbox.io/p/sandbox/react-components-on-jspreadsheet-zx9zxr)
Basic react spreadsheet with translations. 
* [React Spreadsheet Cell Editors](https://codesandbox.io/s/react-spreadsheet-with-a-custom-editor-ic6h3l)
How to create a custom data grid cell editor with React. 
* [Custom React Components](https://codesandbox.io/s/react-components-on-jspreadsheet-k7wc4c)
Integrate a custom React component (Recharts) with Jspreadsheet. 
* [React Spreadsheet as React Classes](https://codesandbox.io/p/sandbox/react-spreadsheet-kkz3s8)
Create a basic react spreadsheet using React classes 
* [React Data Grid Validations](https://codesandbox.io/s/online-spreadsheet-with-validations-with-jspreadsheetxy777)
How to crate a data grid with cell validations
* [MUI React as a Custom Editor](https://codesandbox.io/p/sandbox/custom-editors-with-react-mui-y4v8lj)
React Calendar with Antd
* [Antd React Calendar Cell Editor](https://stackblitz.com/edit/vitejs-vite-kwqcwy)
React Calendar with MUI
* [MUI React Calendar as a Custom Editor](https://codesandbox.io/p/sandbox/custom-editors-with-react-mui-forked-6hw4vz)


#### NextJS integration

* [Online XLSX NextJS reader](https://codesandbox.io/s/jspreadsheet-and-nextjs-6fhsz)
Creating an online XLSX reader with NextJS and Jspreadsheet 
* [Import a Excel file to NextJS](https://codesandbox.io/s/nextjs-spreadsheet-52mr2z)
How to import an Excel file in NextJS using Jspreadsheet. 

