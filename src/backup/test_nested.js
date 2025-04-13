import jspreadsheet from './index.js';

import './jspreadsheet.css';
import 'jsuites/dist/jsuites.css';

window.jss = jspreadsheet;

window.instance = jspreadsheet(root, {
    worksheets: [
        {
            minDimensions: [40,20],
            tableOverflow: true,
            lazyLoading: true,
            tableWidth: '1000px',
            freezeColumns: 2,    
            filters: true,
            nestedHeaders:[
                [
                    {
                        title: 'Supermarket information',
                        colspan: '2',
                    },
                    {
                        title: ' Other Information',
                        colspan: '38'
                    }
                ],
                [
                    {
                        title: 'Location',
                        colspan: '1',
                    },
                    {
                        title: 'Location',
                        colspan: '1',
                    },
                    {
                        title: 'Location',
                        colspan: '3',
                    },
                    {
                        title: ' Other Information',
                        colspan: '35'
                    }
                ],
            ]
        },
        {
            minDimensions: [40,20],
            tableOverflow: true,
            lazyLoading: true,
            tableWidth: '1000px',
            freezeColumns: 2,    
            filters: true,
            nestedHeaders:[
                [
                    {
                        title: 'Supermarket information 2',
                        colspan: '2',
                    },
                    {
                        title: ' Other Information',
                        colspan: '38'
                    }
                ],
                [
                    {
                        title: 'Location',
                        colspan: '1',
                    },
                    {
                        title: 'Location',
                        colspan: '1',
                    },
                    {
                        title: 'Location',
                        colspan: '3',
                    },
                    {
                        title: ' Other Information',
                        colspan: '35'
                    }
                ],
            ]
        },
        {
            minDimensions: [200,20],
            tableOverflow: true,
            lazyLoading: true,
            tableWidth: '1000px',
            freezeColumns: 2,    
            filters: true,
        }
    ],
})

let worksheets = window.instance;