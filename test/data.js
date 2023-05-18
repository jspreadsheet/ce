const { expect } = require("chai");

describe("Data", () => {
  it("Testing data", () => {
    let test = jspreadsheet(root, {
      data: [
        ["Mazda", 2001, 2000, 1],
        ["Peugeot", 2010, 5000, "=B2+C2"],
        ["Honda Fit", 2009, 3000, "=B3+C3"],
        ["Honda CRV", 2010, 6000, "=B4+C4"],
      ],
    });

    test.setValue("D1", "=B1+C1");
    expect(test.getValue("D1")).to.equal("=B1+C1");
    expect(test.getValue("D1", true)).to.equal("4001");

    test.setData([
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [9, 10, 11, 12],
      [13, 14, 15, 16],
    ]);

    expect(test.getData()).to.eql([
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [9, 10, 11, 12],
      [13, 14, 15, 16],
    ]);
  });
});
