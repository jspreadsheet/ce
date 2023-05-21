#! /usr/bin/env node

require('jsdom-global')(undefined, { url: 'https://localhost' });
const jSuites = require("jsuites");
global.jSuites = jSuites;

const jspreadsheet = require("./src/index.js");

global.jspreadsheet = jspreadsheet;
global.root =  document.createElement('div');
global.root.style.width = '100%';
global.root.style.height = '100%';
document.body.appendChild(global.root);

exports.mochaHooks = {
    afterEach(done) {
        jspreadsheet.destroy(root);
        done();
    },
};