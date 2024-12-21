title: Unit Tests for Jspreadsheet in React
keywords: Jspreadsheet, Jexcel, JavaScript, Web-based Applications, Web-based Spreadsheet, Unit Tests, React, Next, NextJS, ReactJS
description: Enhance your application quality by creating unit tests for Jspreadsheet inside your React application.

# Testing Jspreadsheet in React with Jest

## Introduction

In modern React applications, unit testing is essential to ensure components work correctly and prevent regressions. Jspreadsheet integrates easily into React, enabling you to add spreadsheet functionality to your web applications. This guide will walk you through setting up and running tests for Jspreadsheet in a React project using Jest as the testing framework.

In this section, we’ll guide you through setting up a **React environment** specifically for testing **Jspreadsheet** using **Jest** and **JSDOM**. This will help you create a solid foundation for **running unit tests** for your Jspreadsheet instances.

## Environment Setup

We’ll set up a React environment for testing Jspreadsheet using Jest and JSDOM. Follow these steps to prepare your project.

### Step 1: Clone or Create a Project

You can either clone an existing project or create a new React project using `create-next-app`:

```bash
npx create-next-app jspreadsheet-react-testing
cd jspreadsheet-react-testing
```

Alternatively, clone our setup from [GitHub](??).

### Step 2: Install Dependencies

Next, install the necessary dependencies, including `jspreadsheet`, Jest, and `jest-environment-jsdom`:

```bash
npm install jspreadsheet-ce@5.0.0-beta.3
npm install --save-dev jest@29.7.0 jest-environment-jsdom@29.7.0
```

### Step 3: Configure Jest for Jspreadsheet

To integrate Jspreadsheet properly in a Jest testing environment, you'll need to set up JSDOM. First, create a `jest.setup.js` file in the root of your project:

```javascript
// jest.setup.js

const jspreadsheet = require('jspreadsheet-ce');

  // Code that runs between each test
beforeEach(() => {
    if (typeof document !== 'undefined') {
        jspreadsheet.destroyAll();

        if (!global.jspreadsheet && !global.root) {
            global.jspreadsheet = jspreadsheet;

            global.root = document.createElement('div');
            global.root.style.width = '100%';
            global.root.style.height = '100%';

            document.body.appendChild(global.root);
        }
    }
});
```

Next, configure Jest to use this setup by adding the following entry to your `package.json`:

```json
{
  "jest": {
    "setupFilesAfterEnv": ["<rootDir>/jest.setup.js"],
  }
}
```

This configuration ensures JSDOM will emulate the DOM environment required to run Jspreadsheet within Jest.

### Step 4: Create a Test

Create a folder inside your project if it doesn't exist, then inside this folder create a file named `jspreadsheet.test.js`.

```javascript
// */tests/jspreadsheet.test.js

/**
 * @jest-environment jsdom
 */

test("Testing data", () => {
    let instance = jspreadsheet(root, {
        worksheets: [
            {
                data: [
                    ["Mazda", 2001, 2000],
                    ["Peugeot", 2010, 5000],
                    ["Honda Fit", 2009, 3000],
                    ["Honda CRV", 2010, 6000],
                ],
                minDimensions: [4, 4],
            },
        ],
    });

    expect(instance[0].getValue("A1", true)).toEqual("Mazda");
    expect(instance[0].getValue("A2", true)).toEqual("Peugeot");
    expect(instance[0].getValue("B1", true)).toEqual("2001");
});
```

This test verifies that a basic Jspreadsheet instance is created and that the data values are correctly placed. You can modify it to check whatever you want to test.

## Running the Tests

Ensure you add the following line to the `scripts` section of your `package.json`:

```json
"test": "jest"
```

After creating your tests and updating `package.json`, you can run them using the following command:

```bash
npm test
```

Jest will run all the tests in your project and display the results in the console. If everything is configured correctly, your tests should pass.
