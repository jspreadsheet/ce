/**
 * Jexcel extensions
 */

jexcel.createTabs = function(tabs, result) {
    // Create tab container
    tabs.innerHTML = '';
    tabs.classList.add('jexcel_tabs');
    var spreadsheet = []
    var link = [];
    for (var i = 0; i < result.length; i++) {
        // Spreadsheet container
        spreadsheet[i] = document.createElement('div');
        spreadsheet[i].classList.add('jexcel_tab');
        // Tab link
        link[i] = document.createElement('div');
        link[i].classList.add('jexcel_tab_link');
        link[i].setAttribute('data-spreadsheet', i);
        link[i].innerHTML = result[i].sheetName;
        link[i].onclick = function() {
            for (var j = 0; j < spreadsheet.length; j++) {
                spreadsheet[j].style.display = 'none';
                link[j].classList.remove('selected');
            }
            var i = this.getAttribute('data-spreadsheet');
            spreadsheet[i].style.display = 'block';
            link[i].classList.add('selected')
        }
        tabs.appendChild(link[i]);
    }

    // Append spreadsheet
    for (var i = 0; i < spreadsheet.length - 1; i++) {
        tabs.appendChild(spreadsheet[i]);
        jexcel(spreadsheet[i], result[i]);
    }

    // First tab
    spreadsheet[0].style.display = 'block';
    link[0].classList.add('selected')
}

jexcel.fromSpreadsheet = function(file, __callback) {
    var convert = function(workbook) {
        var spreadsheets = [];
        workbook.SheetNames.forEach(function(sheetName) {
            var spreadsheet = {};
            spreadsheet.rows = [];
            spreadsheet.columns = [];
            spreadsheet.data = [];
            spreadsheet.style = {};
            spreadsheet.sheetName = sheetName;

            // Column widths
            var temp = workbook.Sheets[sheetName]['!cols'];
            if (temp && temp.length) {
                for (var i = 0; i < temp.length; i++) {
                    spreadsheet.columns[i] = {};
                    spreadsheet.columns[i].width = temp[i].wpx + 'px';
                }
            }
            // Rows heights
            var temp = workbook.Sheets[sheetName]['!rows'];
            if (temp && temp.length) {
                for (var i = 0; i < temp.length; i++) {
                    if (temp[i] && temp[i].hpx) {
                        spreadsheet.rows[i] = {};
                        spreadsheet.rows[i].height = temp[i].hpx + 'px';
                    }
                }
            }
            // Merge cells
            var temp = workbook.Sheets[sheetName]['!merges'];
            if (temp && temp.length > 0) {
                spreadsheet.mergeCells = [];
                for (var i = 0; i < temp.length; i++) {
                    var x1 = temp[i].s.c;
                    var y1 = temp[i].s.r;
                    var x2 = temp[i].e.c;
                    var y2 = temp[i].e.r;
                    var key = jexcel.getColumnNameFromId([x1,y1]);
                    spreadsheet.mergeCells[key] = [ x2-x1+1, y2-y1+1 ];
                }
            }
            // Data container
            var max_x = 0;
            var max_y = 0;
            var temp = Object.keys(workbook.Sheets[sheetName]);
            for (var i = 0; i < temp.length; i++) {
                if (temp[i].substr(0,1) != '!') {
                    var cell = workbook.Sheets[sheetName][temp[i]];
                    var info = jexcel.getIdFromColumnName(temp[i], true);
                    if (! spreadsheet.data[info[1]]) {
                        spreadsheet.data[info[1]] = [];
                    }
                    spreadsheet.data[info[1]][info[0]] = cell.f ? '=' + cell.f : cell.w;
                    if (max_x < info[0]) {
                        max_x = info[0];
                    }
                    if (max_y < info[1]) {
                        max_y = info[1];
                    }
                    // Style
                    if (cell.style && Object.keys(cell.style).length > 0) {
                        spreadsheet.style[temp[i]] = cell.style;
                    }
                    if (cell.s && cell.s.fgColor) {
                        if (spreadsheet.style[temp[i]]) {
                            spreadsheet.style[temp[i]] += ';';
                        }
                        spreadsheet.style[temp[i]] += 'background-color:#' + cell.s.fgColor.rgb;
                    }
                }
            }
            var numColumns = spreadsheet.columns;
            for (var j = 0; j <= max_y; j++) {
                for (var i = 0; i <= max_x; i++) {
                    if (! spreadsheet.data[j]) {
                        spreadsheet.data[j] = [];
                    }
                    if (! spreadsheet.data[j][i]) {
                        if (numColumns < i) {
                            spreadsheet.data[j][i] = '';
                        }
                    }
                }
            }
            spreadsheets.push(spreadsheet);
        });

        return spreadsheets;
    }

    var oReq;
    oReq = new XMLHttpRequest();
    oReq.open("GET", file, true);

    if(typeof Uint8Array !== 'undefined') {
        oReq.responseType = "arraybuffer";
        oReq.onload = function(e) {
            var arraybuffer = oReq.response;
            var data = new Uint8Array(arraybuffer);
            var wb = XLSX.read(data, {type:"array", cellFormula:true, cellStyles:true });
            __callback(convert(wb))
        };
    } else {
        oReq.setRequestHeader("Accept-Charset", "x-user-defined");  
        oReq.onreadystatechange = function() { if(oReq.readyState == 4 && oReq.status == 200) {
            var ff = convertResponseBodyToText(oReq.responseBody);
            var wb = XLSX.read(ff, {type:"binary", cellFormula:true, cellStyles:true });
            __callback(convert(wb))
        }};
    }

    oReq.send();
}
