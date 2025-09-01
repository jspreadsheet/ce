import js from '@eslint/js';
import globals from 'globals';

export default [
    js.configs.recommended,
    {
        ignores: ['dist/**', 'node_modules/**'],
    },
    {
        files: ['**/*.{js,mjs,cjs}'],
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: 'module',
            globals: {
                ...globals.browser,
                ...globals.node,
                ...globals.es2022,
                jspreadsheet: 'readonly',
            },
        },
        rules: {
            'no-unused-vars': 'off',
        },
    },
    {
        files: ['test/**/*.js', 'mocha.config.js'],
        languageOptions: {
            globals: {
                ...globals.node,
                ...globals.mocha,
                describe: 'readonly',
                it: 'readonly',
                before: 'readonly',
                after: 'readonly',
                beforeEach: 'readonly',
                afterEach: 'readonly',
                root: 'readonly',
            },
        },
    },
    {
        files: ['webpack.config.js', 'build.cjs'],
        languageOptions: {
            globals: {
                ...globals.node,
                __dirname: 'readonly',
                __filename: 'readonly',
                module: 'readonly',
                require: 'readonly',
                exports: 'readonly',
                process: 'readonly',
            },
        },
    },
];
