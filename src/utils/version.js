// Basic version information
export default {
    version: '5.0.0',
    host: 'https://bossanova.uk/jspreadsheet',
    license: 'MIT',
    print: function() {
        return [[ 'Jspreadsheet CE', this.version, this.host, this.license ].join('\r\n')];
    }
};