const { expect } = require("chai");

const jspreadsheet = require("../dist/index.js");

describe("Use footers", () => {
  it("Start the worksheet with a footer", () => {
    const instance = jspreadsheet(root, {
      tabs: true,
      worksheets: [
        {
          minDimensions: [7, 7],
          freezeColumns: 2,
          data: [
            ["Hello", "World"],
            ["Testing", "CE"],
          ],
          footers: [
            ["a", "b", "c"],
            [1, 2, 3],
          ],
        },
      ],
    });

    const footerTag = root.querySelector("tfoot");

    const firstRow = footerTag.children[0];

    expect(firstRow.children[1].innerHTML).to.equal("a");
    expect(firstRow.children[2].innerHTML).to.equal("b");
    expect(firstRow.children[3].innerHTML).to.equal("c");

    const secondRow = footerTag.children[1];

    expect(secondRow.children[1].innerHTML).to.equal("1");
    expect(secondRow.children[2].innerHTML).to.equal("2");
    expect(secondRow.children[3].innerHTML).to.equal("3");
  });
});
