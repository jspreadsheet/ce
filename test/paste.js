const { expect } = require("chai");

describe("Paste", () => {
  it("no expand", () => {
    let test = jspreadsheet(root, {
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
    let test = jspreadsheet(root, {
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
    let test = jspreadsheet(root, {
      data: [
        ["Mazda", 2001, 2000, 1],
        ["Peugeot", 2010, 5000, "=B2+C2"],
        ["Honda Fit", 2009, 3000, "=B3+C3"],
        ["Honda CRV", 2010, 6000, "=B4+C4"],
      ],
    });

    const pasteText = "0-0\t0-1";
    test.updateSelectionFromCoords(0, 0, 3, 0);
    test.paste(test.selectedCell[0], test.selectedCell[1], pasteText);

    expect(test.getData()).to.eql([
      ["0-0", "0-1", "0-0", "0-1"],
      ["Peugeot", 2010, 5000, "=B2+C2"],
      ["Honda Fit", 2009, 3000, "=B3+C3"],
      ["Honda CRV", 2010, 6000, "=B4+C4"],
    ]);
  });

  it("repeat vertical", () => {
    let test = jspreadsheet(root, {
      data: [
        ["Mazda", 2001, 2000, 1],
        ["Peugeot", 2010, 5000, "=B2+C2"],
        ["Honda Fit", 2009, 3000, "=B3+C3"],
        ["Honda CRV", 2010, 6000, "=B4+C4"],
      ],
    });

    const pasteText = "0-0\n1-0";
    test.updateSelectionFromCoords(0, 0, 0, 3);
    test.paste(test.selectedCell[0], test.selectedCell[1], pasteText);

    expect(test.getData()).to.eql([
      ["0-0", 2001, 2000, 1],
      ["1-0", 2010, 5000, "=B2+C2"],
      ["0-0", 2009, 3000, "=B3+C3"],
      ["1-0", 2010, 6000, "=B4+C4"],
    ]);
  });

  it("repeat rectangle", () => {
    let test = jspreadsheet(root, {
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
    let test = jspreadsheet(root, {
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

    expect(count).to.eql({
      onafterchanges: 1,
      onbeforechange: 20000,
      onbeforeinsertcolumn: 19,
      onbeforeinsertrow: 999,
      onbeforepaste: 1,
      onchange: 20000,
      onfocus: 1,
      oninsertcolumn: 19,
      oninsertrow: 999,
      onload: 1,
      onpaste: 1,
      onselection: 1020,
    });
  }).timeout(120 * 1000);
});
