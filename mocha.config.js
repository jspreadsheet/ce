#! /usr/bin/env node

require("jsdom-global")(undefined, { url: "https://localhost" });

global.root = document.createElement("div");
global.root.style.width = "100%";
global.root.style.height = "100%";
global.root.innerHTML = "";
document.body.appendChild(global.root);

exports.mochaHooks = {
  afterEach(done) {
    // destroy datagrid component
    global.root.innerHTML = "";
    done();
  },
};
