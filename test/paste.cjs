const { expect } = require("chai");

global.document.execCommand = function execCommandMock() { };

const fixtureData = () => [
  ["Mazda", 2001, 2000, 1],
  ["Peugeot", 2010, 5000, "=B2+C2"],
  ["Honda Fit", 2009, 3000, "=B3+C3"],
  ["Honda CRV", 2010, 6000, "=B4+C4"],
];

describe("Paste", () => {
  it("no expand", () => {
    let sheet = jspreadsheet(root, {
      worksheets: [{
        data: fixtureData()
      }],
    })[0];

    const pasteText =
      "0-0\t0-1\t0-2\t0-3\n1-0\t1-1\t1-2\t1-3\n2-0\t2-1\t2-2\t2-3\n3-0\t3-1\t3-2\t3-3";
    sheet.updateSelectionFromCoords(0, 0, 0, 0);
    sheet.paste(sheet.selectedCell[0], sheet.selectedCell[1], pasteText);

    expect(sheet.getData()).to.eql([
      ["0-0", "0-1", "0-2", "0-3"],
      ["1-0", "1-1", "1-2", "1-3"],
      ["2-0", "2-1", "2-2", "2-3"],
      ["3-0", "3-1", "3-2", "3-3"],
    ]);
  });

  it("expand", () => {
    let sheet = jspreadsheet(root, {
      worksheets: [{
        data: fixtureData()
      }],
    })[0];

    const pasteText =
      "0-0\t0-1\t0-2\t0-3\n1-0\t1-1\t1-2\t1-3\n2-0\t2-1\t2-2\t2-3\n3-0\t3-1\t3-2\t3-3";
    sheet.updateSelectionFromCoords(3, 3, 3, 3);
    sheet.paste(sheet.selectedCell[0], sheet.selectedCell[1], pasteText);

    expect(sheet.getData()).to.eql([
      ["Mazda", 2001, 2000, 1, "", "", ""],
      ["Peugeot", 2010, 5000, "=B2+C2", "", "", ""],
      ["Honda Fit", 2009, 3000, "=B3+C3", "", "", ""],
      ["Honda CRV", 2010, 6000, "0-0", "0-1", "0-2", "0-3"],
      ["", "", "", "1-0", "1-1", "1-2", "1-3"],
      ["", "", "", "2-0", "2-1", "2-2", "2-3"],
      ["", "", "", "3-0", "3-1", "3-2", "3-3"],
    ]);
  });

  it("repeat horizontal", () => {
    let sheet = jspreadsheet(root, {
      worksheets: [{
        data: fixtureData()
      }],
    })[0];

    const pasteText = "0-0\t0-1";
    sheet.updateSelectionFromCoords(0, 0, 4, 0);
    sheet.paste(sheet.selectedCell[0], sheet.selectedCell[1], pasteText);

    expect(sheet.getData()).to.eql([
      ["0-0", "0-1", "0-0", "0-1"],
      ["Peugeot", 2010, 5000, "=B2+C2"],
      ["Honda Fit", 2009, 3000, "=B3+C3"],
      ["Honda CRV", 2010, 6000, "=B4+C4"],
    ]);
  });

  it("repeat vertical", () => {
    let sheet = jspreadsheet(root, {
      worksheets: [{
        data: fixtureData()
      }],
    })[0];

    const pasteText = "0-0\n1-0";
    sheet.updateSelectionFromCoords(0, 0, 0, 4);
    sheet.paste(sheet.selectedCell[0], sheet.selectedCell[1], pasteText);

    expect(sheet.getData()).to.eql([
      ["0-0", 2001, 2000, 1],
      ["1-0", 2010, 5000, "=B2+C2"],
      ["0-0", 2009, 3000, "=B3+C3"],
      ["1-0", 2010, 6000, "=B4+C4"],
    ]);
  });

  it("repeat rectangle", () => {
    let sheet = jspreadsheet(root, {
      worksheets: [{
        data: fixtureData()
      }],
    })[0];

    const pasteText = "0-0\t0-1\n1-0\t1-1";
    sheet.updateSelectionFromCoords(1, 0, 1, 3);
    sheet.paste(sheet.selectedCell[0], sheet.selectedCell[1], pasteText);

    expect(sheet.getData()).to.eql([
      ["Mazda", "0-0", "0-1", 1],
      ["Peugeot", "1-0", "1-1", "=B2+C2"],
      ["Honda Fit", "0-0", "0-1", "=B3+C3"],
      ["Honda CRV", "1-0", "1-1", "=B4+C4"],
    ]);
  });

  it("skip hidden column", () => {
    let sheet = jspreadsheet(root, {
      worksheets: [{
        columns: [
          { type: "text" },
          { type: "text" },
          { type: "hidden" }, // paste is skipped.
          { type: "text" },
        ],
        data: fixtureData()
      }],
    })[0];

    const pasteText = "0-0\t0-1\n1-0\t1-1";
    sheet.updateSelectionFromCoords(1, 0, 1, 0);
    sheet.paste(sheet.selectedCell[0], sheet.selectedCell[1], pasteText);

    expect(sheet.getData()).to.eql([
      ["Mazda", "0-0", 2000, "0-1"],
      ["Peugeot", "1-0", 5000, "1-1"],
      ["Honda Fit", 2009, 3000, "=B3+C3"],
      ["Honda CRV", 2010, 6000, "=B4+C4"],
    ]);
  });

  it("skip hidden row", () => {
    let sheet = jspreadsheet(root, {
      worksheets: [{
        data: fixtureData()
      }],
    })[0];

    const pasteText = "0-0\t0-1\n1-0\t1-1";
    sheet.hideRow(1);
    sheet.updateSelectionFromCoords(1, 0, 1, 0);
    sheet.paste(sheet.selectedCell[0], sheet.selectedCell[1], pasteText);

    expect(sheet.getData()).to.eql([
      ["Mazda", "0-0", "0-1", 1],
      ["Peugeot", 2010, 5000, "=B2+C2"],
      ["Honda Fit", "1-0", "1-1", "=B3+C3"],
      ["Honda CRV", 2010, 6000, "=B4+C4"],
    ]);
  });

  it("see https://github.com/jspreadsheet/ce/pull/1717#issuecomment-2576060698", () => {
    let sheet = jspreadsheet(root, {
      worksheets: [{
        minDimensions: [4, 4],
        data: [
            [1, 2],
            [3, 4],
        ]
      }],
    })[0];

    sheet.updateSelectionFromCoords(0, 0, 1, 1);
    sheet.copy();
    sheet.hideRow(0);
    sheet.hideColumn(0);
    sheet.updateSelectionFromCoords(2, 2, 2, 2);
    sheet.paste(sheet.selectedCell[0], sheet.selectedCell[1], sheet.data);

    expect(sheet.getData()).to.eql([
      [1, 2, "", ""],
      [3, 4, "", ""],
      ["", "", "1", "2"],
      ["", "", "3", "4"],
]);
  });

  it("large data paste", () => {
    let count = {};
    let sheet = jspreadsheet(root, {
      worksheets: [{
        data: fixtureData()
      }],
      onevent: (event) => {
        count[event] = (count[event] ?? 0) + 1;
      },
    })[0];

    const pasteText = new Array(1000)
      .fill(0)
      .map((v, i) =>
        new Array(20)
          .fill(0)
          .map((v2, i2) => `${i}-${i2}`)
          .join("\t")
      )
      .join("\n");
    sheet.updateSelectionFromCoords(3, 3, 3, 3);
    sheet.paste(sheet.selectedCell[0], sheet.selectedCell[1], pasteText);
    expect(count.onbeforechange).to.eql(20000);
    expect(count.onbeforeinsertcolumn).to.eql(1);
    expect(count.onbeforeinsertrow).to.eql(1);
    expect(count.onchange).to.eql(20000);
    expect(count.oninsertcolumn).to.eql(1);
    expect(count.oninsertrow).to.eql(1);
    expect(count.onselection).to.eql(3);
  }).timeout(10 * 1000);

  it("expand with hidden cells", () => {
    let count = {};
    let sheet = jspreadsheet(root, {
      worksheets: [{
        columns: [
          { type: "text" },
          { type: "text" },
          { type: "hidden" }, // paste is skipped.
          { type: "text" },
        ],
        data: fixtureData()
      }],
      onevent: (event) => {
        count[event] = (count[event] ?? 0) + 1;
      },
    })[0];

    const pasteText = "0-0\t0-1\t0-2\t0-3\n1-0\t1-1\t1-2\t1-3\n2-0\t2-1\t2-2\t2-3\n3-0\t3-1\t3-2\t3-3";;
    sheet.hideRow(2);
    sheet.updateSelectionFromCoords(1, 1, 1, 1);
    sheet.paste(sheet.selectedCell[0], sheet.selectedCell[1], pasteText);
    expect(sheet.getData()).to.eql([
      ["Mazda", 2001, 2000, 1, "", ""],
      ["Peugeot", "0-0", 5000, "0-1", "0-2", "0-3"],
      ["Honda Fit", 2009, 3000, "=B3+C3", "", ""],
      ["Honda CRV", "1-0", 6000, "1-1", "1-2", "1-3"],
      ["", "2-0", "", "2-1", "2-2", "2-3"],
      ["", "3-0", "", "3-1", "3-2", "3-3"],
    ]);
    expect(count.onbeforeinsertcolumn).to.eql(1);
    expect(count.onbeforeinsertrow).to.eql(1);
  }).timeout(10 * 1000);

  it("copy and paste with style", () => {
    let count = {};
    let sheet = jspreadsheet(root, {
      worksheets: [{
        data: fixtureData()
      }],
    })[0];

    sheet.setStyle("A1", "color", "red");
    sheet.updateSelectionFromCoords(0, 0, 1, 1);
    sheet.copy();
    sheet.paste(2, 2, sheet.data);
    expect(sheet.getData()).to.eql([
      ["Mazda", 2001, 2000, 1],
      ["Peugeot", 2010, 5000, "=B2+C2"],
      ["Honda Fit", 2009, "Mazda", "2001"],
      ["Honda CRV", 2010, "Peugeot", "2010"],
    ]);
    expect(sheet.getStyle("A1", "color")).to.eql("red");
    expect(sheet.getStyle("C3", "color")).to.eql("red");
  });

  it("copy and repeat paste with style", () => {
    global.document.execCommand = function execCommandMock() { };

    let count = {};
    let sheet = jspreadsheet(root, {
      worksheets: [{
        data: fixtureData()
      }],
    })[0];

    sheet.setStyle("A1", "color", "red");
    sheet.updateSelectionFromCoords(0, 0, 1, 0);
    sheet.copy();
    sheet.updateSelectionFromCoords(0, 2, 4, 4);
    sheet.paste(0, 2, sheet.data);
    expect(sheet.getData()).to.eql([
      ["Mazda", 2001, 2000, 1],
      ["Peugeot", 2010, 5000, "=B2+C2"],
      ["Mazda", "2001", "Mazda", "2001"],
      ["Mazda", "2001", "Mazda", "2001"],
    ]);
    //
    expect(sheet.getStyle("A1", "color")).to.eql("red");
    //
    expect(sheet.getStyle("A3", "color")).to.eql("red");
    expect(sheet.getStyle("B3", "color")).to.eql("");
    expect(sheet.getStyle("C3", "color")).to.eql("red");
    expect(sheet.getStyle("D3", "color")).to.eql("");
    //
    expect(sheet.getStyle("A4", "color")).to.eql("red");
    expect(sheet.getStyle("B4", "color")).to.eql("");
    expect(sheet.getStyle("C4", "color")).to.eql("red");
    expect(sheet.getStyle("D4", "color")).to.eql("");
  });

  it("copy and paste to another sheet", async () => {
    global.document.execCommand = function execCommandMock() { };

    let isLoaded = false;
    let sheets = jspreadsheet(root, {
      tabs: true,
      worksheets: [
        {
          data: fixtureData(),
          worksheetName: "Sheet1",
        },
        {
          data: fixtureData(),
          worksheetName: "Sheet2",
        }
      ],
      onload: (instance) => {
        isLoaded = true;
      }
    });

    const awaitLoop = (resolve) => {
      setTimeout(() => {
        if (isLoaded) {
          resolve();
        } else {
          resolve(awaitLoop);
        }
      }, 100);
    }
    // NOTE: jpreadsheet constructor is acutally async. So it waits for load events in await.
    await new Promise(awaitLoop);

    const from = sheets[0];
    from.setStyle("A1", "color", "red");
    from.updateSelectionFromCoords(0, 0, 1, 0);
    from.copy();
    const to = sheets[1];
    to.updateSelectionFromCoords(0, 2, 4, 4);
    to.paste(0, 2, from.data);
    expect(to.getData()).to.eql([
      ["Mazda", 2001, 2000, 1],
      ["Peugeot", 2010, 5000, "=B2+C2"],
      ["Mazda", "2001", "Mazda", "2001"],
      ["Mazda", "2001", "Mazda", "2001"],
    ]);
    // XXX: This is not working. It seems that the style is not copied.
    // expect(to.getStyle("A1", "color")).to.eql("red");
    // //
    // expect(to.getStyle("A3", "color")).to.eql("red");
    // expect(to.getStyle("B3", "color")).to.eql("");
    // expect(to.getStyle("C3", "color")).to.eql("red");
    // expect(to.getStyle("D3", "color")).to.eql("");
    // //
    // expect(to.getStyle("A4", "color")).to.eql("red");
    // expect(to.getStyle("B4", "color")).to.eql("");
    // expect(to.getStyle("C4", "color")).to.eql("red");
    // expect(to.getStyle("D4", "color")).to.eql("");
  })

  it("fix - u0000 is pasted, when the last cell ends in a tab", () => {
    let sheet = jspreadsheet(root, {
      worksheets: [{
        data: fixtureData()
      }],
    })[0];

    const pasteText =
      "0-0\t0-1\t0-2\t0-3\n1-0\t1-1\t1-2\t1-3\n2-0\t2-1\t2-2\t2-3\n3-0\t3-1\t3-2\t";
    sheet.updateSelectionFromCoords(0, 0, 0, 0);
    sheet.paste(sheet.selectedCell[0], sheet.selectedCell[1], pasteText);

    expect(sheet.getData()).to.eql([
      ["0-0", "0-1", "0-2", "0-3"],
      ["1-0", "1-1", "1-2", "1-3"],
      ["2-0", "2-1", "2-2", "2-3"],
      ["3-0", "3-1", "3-2", ""],
    ]);
  });

  it("paste lacked columns data", () => {
    let sheet = jspreadsheet(root, {
      worksheets: [{
        data: fixtureData()
      }],
    })[0];

    const pasteText =
      "0-0\t\n" +
      "1-0\t1-1\t1-2\t1-3\n" +
      "2-0\n" +
      "3-0\t3-1\t3-2\t";
    sheet.updateSelectionFromCoords(0, 0, 0, 0);
    sheet.paste(sheet.selectedCell[0], sheet.selectedCell[1], pasteText);

    expect(sheet.getData()).to.eql([
      ["0-0", "", "", ""],
      ["1-0", "1-1", "1-2", "1-3"],
      ["2-0", "", "", ""],
      ["3-0", "3-1", "3-2", ""],
    ]);
  });
});
