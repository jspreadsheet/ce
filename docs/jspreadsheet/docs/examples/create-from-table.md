title: Create from an HTML Table  
keywords: Jexcel, JavaScript, dynamic spreadsheet, create table, HTML table element, Jspreadsheet table, interactive table  
description: Learn how to create a dynamic Jspreadsheet table from a static HTML table element with a complete example.  

# Create from an HTML Table  

Starting with v4+, Jspreadsheet allows you to create an online spreadsheet dynamically from a static HTML table element.  

```html
<html>
<script src="https://bossanova.uk/jspreadsheet/v5/jspreadsheet.js"></script>
<script src="https://jsuites.net/v5/jsuites.js"></script>
<link rel="stylesheet" href="https://bossanova.uk/jspreadsheet/v5/jspreadsheet.css" type="text/css" />
<link rel="stylesheet" href="https://jsuites.net/v5/jsuites.css" type="text/css" />

<h4>The Official Top 40 biggest albums of 2019</h4>

<table id="spreadsheet">
<thead>
<tr>
<td colspan='4'>General</td>
</tr>
<tr>
<td colspan='3'>Info</td>
<td colspan='1'>Stats</td>
</tr>
<tr>
<td id='pos'>POS</td>
<td id='title'>TITLE</td>
<td id='artist'>ARTIST</td>
<td id='peak'>PEAK</td>
</tr>
</thead>
<tbody>
<tr>
<td>1</td>
<td>DIVINELY UNINSPIRED TO A HELLISH EXTENT</td>
<td>LEWIS CAPALDI</td>
<td>1</td>
</tr>
<tr>
<td>2</td>
<td>NO 6 COLLABORATIONS PROJECT</td>
<td>ED SHEERAN</td>
<td>1</td>
</tr>
<tr>
<td>3</td>
<td>THE GREATEST SHOWMAN</td>
<td>MOTION PICTURE CAST RECORDING</td>
<td>1</td>
</tr>
<tr>
<td>4</td>
<td>WHEN WE ALL FALL ASLEEP WHERE DO WE GO</td>
<td>BILLIE EILISH</td>
<td>1</td>
</tr>
<tr>
<td>5</td>
<td>STAYING AT TAMARA'S</td>
<td>GEORGE EZRA</td>
<td>1</td>
</tr>
<tr>
<td>6</td>
<td>BOHEMIAN RHAPSODY - OST</td>
<td>QUEEN</td>
<td>3</td>
</tr>
<tr>
<td>7</td>
<td>THANK U NEXT</td>
<td>ARIANA GRANDE</td>
<td>1</td>
</tr>
<tr>
<td>8</td>
<td>WHAT A TIME TO BE ALIVE</td>
<td>TOM WALKER</td>
<td>1</td>
</tr>
<tr>
<td>9</td>
<td>A STAR IS BORN</td>
<td>MOTION PICTURE CAST RECORDING</td>
<td>1</td>
</tr>
<tr>
<td>10</td>
<td>YOU'RE IN MY HEART</td>
<td>ROD STEWART</td>
<td>1</td>
</tr>
</tbody>
<tfoot>
<tr>
<td></td>
<td></td>
<td></td>
<td>=SUM(B1,B2,B3)</td>
</tr>
</tfoot>
</table>

<br>

<script>
jspreadsheet(document.getElementById('spreadsheet')); 
</script>
</html>
```
```jsx
import React, { useRef, useEffect } from "react";
import { jspreadsheet } from "@jspreadsheet-ce/react";
import "jsuites/dist/jsuites.css";
import "jspreadsheet-ce/dist/jspreadsheet.css";

export default function App() {
    // Spreadsheet array of worksheets
    const spreadsheet = useRef();

    useEffect(() => {
        if (spreadsheet.current) {
            jspreadsheet(spreadsheet.current);
        }
    }, [])

    // Render component
    return (
        <>
            <table ref={"spreadsheet"}>
            <thead>
            <tr>
            <td colspan='4'>General</td>
            </tr>
            <tr>
            <td colspan='3'>Info</td>
            <td colspan='1'>Stats</td>
            </tr>
            <tr>
            <td id='pos'>POS</td>
            <td id='title'>TITLE</td>
            <td id='artist'>ARTIST</td>
            <td id='peak'>PEAK</td>
            </tr>
            </thead>
            <tbody>
            <tr>
            <td>1</td>
            <td>DIVINELY UNINSPIRED TO A HELLISH EXTENT</td>
            <td>LEWIS CAPALDI</td>
            <td>1</td>
            </tr>
            <tr>
            <td>2</td>
            <td>NO 6 COLLABORATIONS PROJECT</td>
            <td>ED SHEERAN</td>
            <td>1</td>
            </tr>
            <tr>
            <td>3</td>
            <td>THE GREATEST SHOWMAN</td>
            <td>MOTION PICTURE CAST RECORDING</td>
            <td>1</td>
            </tr>
            <tr>
            <td>4</td>
            <td>WHEN WE ALL FALL ASLEEP WHERE DO WE GO</td>
            <td>BILLIE EILISH</td>
            <td>1</td>
            </tr>
            <tr>
            <td>5</td>
            <td>STAYING AT TAMARA'S</td>
            <td>GEORGE EZRA</td>
            <td>1</td>
            </tr>
            <tr>
            <td>6</td>
            <td>BOHEMIAN RHAPSODY - OST</td>
            <td>QUEEN</td>
            <td>3</td>
            </tr>
            <tr>
            <td>7</td>
            <td>THANK U NEXT</td>
            <td>ARIANA GRANDE</td>
            <td>1</td>
            </tr>
            <tr>
            <td>8</td>
            <td>WHAT A TIME TO BE ALIVE</td>
            <td>TOM WALKER</td>
            <td>1</td>
            </tr>
            <tr>
            <td>9</td>
            <td>A STAR IS BORN</td>
            <td>MOTION PICTURE CAST RECORDING</td>
            <td>1</td>
            </tr>
            <tr>
            <td>10</td>
            <td>YOU'RE IN MY HEART</td>
            <td>ROD STEWART</td>
            <td>1</td>
            </tr>
            </tbody>
            <tfoot>
            <tr>
            <td></td>
            <td></td>
            <td></td>
            <td>=SUM(B1,B2,B3)</td>
            </tr>
            </tfoot>
            </table>
        </>
    );
}
```
```vue
<template>
    <table ref="spreadsheetRef">
        <thead>
            <tr>
                <td colspan='4'>General</td>
            </tr>
            <tr>
                <td colspan='3'>Info</td>
                <td colspan='1'>Stats</td>
            </tr>
            <tr>
                <td id='pos'>POS</td>
                <td id='title'>TITLE</td>
                <td id='artist'>ARTIST</td>
                <td id='peak'>PEAK</td>
            </tr>
        </thead>
        <tbody>
            <tr>
               <td>1</td>
               <td>DIVINELY UNINSPIRED TO A HELLISH EXTENT</td>
               <td>LEWIS CAPALDI</td>
               <td>1</td>
            </tr>
            <tr>
                <td>2</td>
                <td>NO 6 COLLABORATIONS PROJECT</td>
                <td>ED SHEERAN</td>
                <td>1</td>
            </tr>
            <tr>
                <td>3</td>
                <td>THE GREATEST SHOWMAN</td>
                <td>MOTION PICTURE CAST RECORDING</td>
                <td>1</td>
            </tr>
            <tr>
                <td>4</td>
                <td>WHEN WE ALL FALL ASLEEP WHERE DO WE GO</td>
                <td>BILLIE EILISH</td>
                <td>1</td>
            </tr>
            <tr>
                <td>5</td>
                <td>STAYING AT TAMARA'S</td>
                <td>GEORGE EZRA</td>
                <td>1</td>
            </tr>
            <tr>
                <td>6</td>
                <td>BOHEMIAN RHAPSODY - OST</td>
                <td>QUEEN</td>
                <td>3</td>
            </tr>
            <tr>
                <td>7</td>
                <td>THANK U NEXT</td>
                <td>ARIANA GRANDE</td>
                <td>1</td>
            </tr>
            <tr>
                <td>8</td>
                <td>WHAT A TIME TO BE ALIVE</td>
                <td>TOM WALKER</td>
                <td>1</td>
            </tr>
            <tr>
                <td>9</td>
                <td>A STAR IS BORN</td>
                <td>MOTION PICTURE CAST RECORDING</td>
                <td>1</td>
            </tr>
            <tr>
                <td>10</td>
                <td>YOU'RE IN MY HEART</td>
                <td>ROD STEWART</td>
                <td>1</td>
            </tr>
        </tbody>
        <tfoot>
            <tr>
                <td></td>
                <td></td>
                <td></td>
                <td>=SUM(B1,B2,B3)</td>
            </tr>
        </tfoot>
    </table>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { jspreadsheet } from "@jspreadsheet-ce/vue";
import "jsuites/dist/jsuites.css";
import "jspreadsheet-ce/dist/jspreadsheet.css";

// Spreadsheet ref
const spreadsheetRef = ref(null);

onMounted(() => {
    if (spreadsheetRef.value) {
        jspreadsheet(spreadsheetRef.value);
    }
});
</script>
```