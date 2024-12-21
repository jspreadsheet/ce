title: Unit Tests for Jspreadsheet
keywords: Jspreadsheet, Jexcel, JavaScript, Web-based Applications, Web-based Spreadsheet, Unit Tests
description: Enhance your application quality by creating unit tests for Jspreadsheet.

# Testing

## Introduction

Unit testing ensures robust Jspreadsheet integrations by validating functionality and catching regressions early. This guide uses Mocha, Chai, and JSDOM to test data grid behaviour in a simulated browser environment.

## Environment Setup

Set up a basic environment to implement Jspreadsheet testing. Follow these steps or clone our GitHub example project.

### Step 1: Clone the Project

Clone a setup with Jspreadsheet pre-installed and a test file:

```bash
git clone https://github.com/jspreadsheet/tests.git
cd tests
```

### Step 2: Install the Dependencies

Install required libraries using npm:

```bash
npm install jspreadsheet-ce@5.0.0-beta.3
```

### Step 3: Configure Mocha

Create or edit the `mocha.config.js` file in the project root to configure Mocha and emulate the browser environment using JSDOM.

{.ignore}
```javascript
#! /usr/bin/env node

require('jsdom-global')(undefined, { url: 'https://localhost' });
const jspreadsheet = require('jspreadsheet');

global.jspreadsheet = jspreadsheet;

global.root = document.createElement('div');
global.root.style.width = '100%';
global.root.style.height = '100%';
document.body.appendChild(global.root);

exports.mochaHooks = {
    afterEach(done) {
        jspreadsheet.destroyAll();
        done();
    },
};
```

### Step 4: Create your first test

Inside the `test` folder, create a file named `data.js`:

{.ignore}
```javascript
const { expect } = require('chai');

describe("Data", () => {
  it("Testing data", () => {
    let test = jspreadsheet(root, {
      worksheets: [
        {
          data: [
            ["Mazda", 2001, 2000],
            ["Peugeot", 2010, 5000],
            ["Honda Fit", 2009, 3000],
            ["Honda CRV", 2010, 6000],
          ],
          minDimensions: [4, 4]
        },
      ],
    });

    expect(test[0].getValue("A1", true)).to.equal("Mazda");
    expect(test[0].getValue("A2", true)).to.equal("Peugeot");
    expect(test[0].getValue("B1", true)).to.equal("2001");
  });
});
```

### Step 5: Running the Tests

After writing your tests, you can run them with the following command:

```bash
npm run test
```

