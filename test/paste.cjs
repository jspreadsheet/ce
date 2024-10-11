const { expect } = require("chai");

function jspreadsheetFix(root, option) {
  return jspreadsheet(root, {
    worksheets: [
      option
    ],
    ...option
  })[0]
}
describe("Paste", () => {
  it("no expand", () => {
    let test = jspreadsheetFix(root, {
      data: [
        ["Mazda", 2001, 2000, 1],
        ["Peugeot", 2010, 5000, "=B2+C2"],
        ["Honda Fit", 2009, 3000, "=B3+C3"],
        ["Honda CRV", 2010, 6000, "=B4+C4"],
      ],
    });

    const pasteText =
      "0-0\t0-1\t0-2\t0-3\n1-0\t1-1\t1-2\t1-3\n2-0\t2-1\t2-2\t2-3\n3-0\t3-1\t3-2\t3-3";
    test.updateSelectionFromCoords(0, 0, 0, 0);
    test.paste(test.selectedCell[0], test.selectedCell[1], pasteText);

    expect(test.getData()).to.eql([
      ["0-0", "0-1", "0-2", "0-3"],
      ["1-0", "1-1", "1-2", "1-3"],
      ["2-0", "2-1", "2-2", "2-3"],
      ["3-0", "3-1", "3-2", "3-3"],
    ]);
  });

  it("expand", () => {
    let test = jspreadsheetFix(root, {
      data: [
        ["Mazda", 2001, 2000, 1],
        ["Peugeot", 2010, 5000, "=B2+C2"],
        ["Honda Fit", 2009, 3000, "=B3+C3"],
        ["Honda CRV", 2010, 6000, "=B4+C4"],
      ],
    });

    const pasteText =
      "0-0\t0-1\t0-2\t0-3\n1-0\t1-1\t1-2\t1-3\n2-0\t2-1\t2-2\t2-3\n3-0\t3-1\t3-2\t3-3";
    test.updateSelectionFromCoords(3, 3, 3, 3);
    test.paste(test.selectedCell[0], test.selectedCell[1], pasteText);

    expect(test.getData()).to.eql([
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
    let test = jspreadsheetFix(root, {
      data: [
        ["Mazda", 2001, 2000, 1],
        ["Peugeot", 2010, 5000, "=B2+C2"],
        ["Honda Fit", 2009, 3000, "=B3+C3"],
        ["Honda CRV", 2010, 6000, "=B4+C4"],
      ],
    });

    const pasteText = "0-0\t0-1";
    test.updateSelectionFromCoords(0, 0, 4, 0);
    test.paste(test.selectedCell[0], test.selectedCell[1], pasteText);

    expect(test.getData()).to.eql([
      ["0-0", "0-1", "0-0", "0-1"],
      ["Peugeot", 2010, 5000, "=B2+C2"],
      ["Honda Fit", 2009, 3000, "=B3+C3"],
      ["Honda CRV", 2010, 6000, "=B4+C4"],
    ]);
  });

  it("repeat vertical", () => {
    let test = jspreadsheetFix(root, {
      data: [
        ["Mazda", 2001, 2000, 1],
        ["Peugeot", 2010, 5000, "=B2+C2"],
        ["Honda Fit", 2009, 3000, "=B3+C3"],
        ["Honda CRV", 2010, 6000, "=B4+C4"],
      ],
    });

    const pasteText = "0-0\n1-0";
    test.updateSelectionFromCoords(0, 0, 0, 4);
    test.paste(test.selectedCell[0], test.selectedCell[1], pasteText);

    expect(test.getData()).to.eql([
      ["0-0", 2001, 2000, 1],
      ["1-0", 2010, 5000, "=B2+C2"],
      ["0-0", 2009, 3000, "=B3+C3"],
      ["1-0", 2010, 6000, "=B4+C4"],
    ]);
  });

  it("repeat rectangle", () => {
    let test = jspreadsheetFix(root, {
      data: [
        ["Mazda", 2001, 2000, 1],
        ["Peugeot", 2010, 5000, "=B2+C2"],
        ["Honda Fit", 2009, 3000, "=B3+C3"],
        ["Honda CRV", 2010, 6000, "=B4+C4"],
      ],
    });

    const pasteText = "0-0\t0-1\n1-0\t1-1";
    test.updateSelectionFromCoords(1, 0, 1, 3);
    test.paste(test.selectedCell[0], test.selectedCell[1], pasteText);

    expect(test.getData()).to.eql([
      ["Mazda", "0-0", "0-1", 1],
      ["Peugeot", "1-0", "1-1", "=B2+C2"],
      ["Honda Fit", "0-0", "0-1", "=B3+C3"],
      ["Honda CRV", "1-0", "1-1", "=B4+C4"],
    ]);
  });

  it("large data paste", () => {
    let count = {};
    let test = jspreadsheetFix(root, {
      data: [
        ["Mazda", 2001, 2000, 1],
        ["Peugeot", 2010, 5000, "=B2+C2"],
        ["Honda Fit", 2009, 3000, "=B3+C3"],
        ["Honda CRV", 2010, 6000, "=B4+C4"],
      ],
      onevent: (event) => {
        count[event] = (count[event] ?? 0) + 1;
      },
    });

    const pasteText = new Array(1000)
      .fill(0)
      .map((v, i) =>
        new Array(20)
          .fill(0)
          .map((v2, i2) => `${i}-${i2}`)
          .join("\t")
      )
      .join("\n");
    test.updateSelectionFromCoords(3, 3, 3, 3);
    test.paste(test.selectedCell[0], test.selectedCell[1], pasteText);
    expect(count.onbeforechange).to.eql(20000);
    expect(count.onbeforeinsertcolumn).to.eql(19);
    expect(count.onbeforeinsertrow).to.eql(999);
    expect(count.onchange).to.eql(20000);
    expect(count.oninsertcolumn).to.eql(19);
    expect(count.oninsertrow).to.eql(999);
    expect(count.onselection).to.eql(1020);
  }).timeout(120 * 1000);
});
