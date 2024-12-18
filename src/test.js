// import jspreadsheet from './jspreadsheet.js';
import jspreadsheet from '../dist/index.js';

import '../dist/style.css';
import 'jsuites/dist/jsuites.css';
// import { plugin } from './plugin.js';

let editorValue;

const Editor = {
    updateCell: function(cell, value, x, y, instance) {
        console.log('updateCell')
        console.log(arguments)

        if (cell) {
            cell.innerText = value + ' AM';
        }

        return value + ' original';
    },
    createCell: function(cell, value, x, y, instance) {
        console.log('createCell')
        console.log(arguments)

        if (cell) {
            cell.innerText = value + ' AM';
        }

        return value + ' original';
    },
    openEditor: function(cell, value, x, y, instance, options, event) {
        console.log('openEditor')
        console.log(event)
        // Create input
        var element = document.createElement('input');
        element.value = cell.innerHTML;
        // Update cell
        cell.classList.add('editor');
        cell.innerHTML = '';
        cell.appendChild(element);
        $(element).clockpicker({
            afterHide:function() {
                setTimeout(function() {
                    // To avoid double call
                    editorValue = element.value;
                    instance.closeEditor(cell, true);
                });
            }
        });
        // Focus on the element
        element.focus();
    },
    closeEditor: function(cell, save, x, y, instance) {
        console.log('closeEditor')
        console.log(arguments)
        return editorValue;
    },
    get: function(options, val) {
        console.log('get')
        console.log(arguments)
        return cell.innerHTML;
    }
}

const data = [
    [1, 2, 3, 4, 5, '<span style="color: red">teste</span>'],
    [6, 7, 8, 9, 10, ""],
    [11, 12, 13, 14, 15, ""],
    [16, 17, 18, 19, 20, ""],
    [21, 22, 23, 24, 25, ""],
    [26, 27, 28, 29, 30, ""]
];

// data[120] = ['teste'];

console.log('aqui')
console.log(jspreadsheet.setDictionary)

jspreadsheet.setDictionary({
    'October': 'Outubro'
});

window.instance = jspreadsheet(root, {
    toolbar: true,
    tabs: true,
    // plugins: { plugin },
    autoIncrement: false,
    oncopy: function() {
        console.log(arguments)
    },
    parseHTML: true,
    worksheets: [
        {
            // wordWrap: true,
            filters: true,
            copyCompatibility: true,
            minDimensions: [20, 1000],
            freezeColumns: 2,
            tableOverflow: true,
            lazyLoading:true,
            tableWidth: 500,
            tableHeight: 500,
            // mergeCells: {
            //     D8: [2, 2]
            // },
            // pagination: 10,
            data: data,
            includeHeadersOnCopy: true,
            // updateTable: function (instance, cell, col, row, val, label) {
            //     console.log('updateTable')
            //     console.log(arguments)
            // },
            nestedHeaders:[
                [
                    {
                        title: 'Supermarket information',
                        colspan: 10,
                    },
                ],
                [
                    {
                        title: 'Location',
                        colspan: 3,
                    },
                    {
                        title: ' Other Information',
                        colspan: 7
                    }
                ],
            ],
            footers: [
                ['teste'],
                ['teste 2'],
            ],
            columns: [
                {
                    align: 'right'
                    // render: (cell, value, x, y, instance, options) => {
                    //     console.log(cell, value, x, y, instance, options)
                    //     if (value || Number(value)) {
                    //         let size = options.digits||0;
                    //         value = value.toString();
                    //         while (value.length < size) {
                    //             value = "0" + value;
                    //         }

                    //         setTimeout(() => {
                    //             cell.innerText = value;
                    //         }, 5000)
                    //     }
                    // },
                    // digits: 6,
                },
                // {
                //     type: 'color',
                //     render: 'square'
                // },
                {
                    type: 'text',
                    title:'Description',
                    readOnly: true,
                },
                {
                    // type: Editor
                },
                // {
                //     type: 'dropdown',
                //     width:'300',
                //     source:[
                //         { id:'1', name:'Paulo', image:'/templates/default/img/1.jpg', title:'Admin', group:'Secretary' },
                //         { id:'2', name:'Cosme Sergio', image:'/templates/default/img/2.jpg', title:'Teacher', group:'Docent' },
                //     ]
                // },
                {},
                {},
                {
                    // type: 'calendar',
                    // options: {
                    //     today: false,
                    // }
                    // format: 'DD/MMMM/YYYY',
                },
                {
                    type: 'image',
                    onchange: function() {
                        console.log('teste')
                    }
                }
            ],
        },
    ]
})

// jspreadsheet(root2, {
//     toolbar: true,
//     tabs: true,
//     worksheets: [
//         {
//             minDimensions: [10 ,10],
//         }
//     ]
// })

