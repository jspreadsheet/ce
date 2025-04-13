// Basic version information
export default {
    title: 'Kspreadsheet',
    version: '2.0.0',
    type: 'Jspreadsheet CE',
    host: 'https://github.com/kekefreedog/kspreadsheet/',
    license: 'MIT',
    print: function() {
        return [[ this.title, this.version, this.host, this.license ].join('\r\n')];
    }
};