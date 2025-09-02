import { parseValue } from "./internal.js";

export const setFooter = function (data) {
  const obj = this;

  if (data) {
    obj.options.footers = data;
  }

  if (obj.options.footers) {
    if (!obj.tfoot) {
      obj.tfoot = document.createElement("tfoot");
      obj.table.appendChild(obj.tfoot);
    }

    for (let j = 0; j < obj.options.footers.length; j++) {
      let tr;

      if (obj.tfoot.children[j]) {
        tr = obj.tfoot.children[j];
      } else {
        tr = document.createElement("tr");
        const td = document.createElement("td");
        tr.appendChild(td);
        obj.tfoot.appendChild(tr);
      }
      for (let i = 0; i < obj.headers.length; i++) {
        if (!obj.options.footers[j][i]) {
          obj.options.footers[j][i] = "";
        }

        let td;

        if (obj.tfoot.children[j].children[i + 1]) {
          td = obj.tfoot.children[j].children[i + 1];
        } else {
          td = document.createElement("td");
          tr.appendChild(td);

          // Text align
          const colAlign =
            obj.options.columns[i].align ||
            obj.options.defaultColAlign ||
            "center";
          td.style.textAlign = colAlign;
        }
        td.textContent = parseValue.call(
          obj,
          +obj.records.length + i,
          j,
          obj.options.footers[j][i]
        );

        // Hide/Show with hideColumn()/showColumn()
        td.style.display = obj.cols[i].colElement.style.display;
      }
    }
  }
};
