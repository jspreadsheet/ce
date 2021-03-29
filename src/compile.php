<?php

if ($handle = opendir('js')) {
    $js = '';
    $css = '';
    while (false !== ($entry = readdir($handle))) {
        echo "reading { $entry }\n";
        if ($entry != "." && $entry != ".." && (! isset($modules) || in_array(substr($entry, 0, strpos($entry, '.')), $modules))) {
            $js .= file_get_contents('js/'.$entry) . "\r\n\r\n";
        }
    }
    closedir($handle);

    $js = "
/**
 * Jspreadsheet v4
 *
 * Website: https://bossanova.uk/jexcel/
 * Description: Create amazing web based spreadsheets.
 *
 * This software is distribute under MIT License
 */

 if (! jSuites && typeof(require) === 'function') {
    var jSuites = require('jsuites');
    require('jsuites/dist/jsuites.css');
}

;(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    global.jexcel = factory();
}(this, (function () {

    'use strict';

$js

    return jexcel;

})));";

    file_put_contents('../dist/index.js', $js);
}