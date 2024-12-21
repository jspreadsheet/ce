title: How to Translate the Default Messages in Jspreadsheet  
keywords: Jexcel, JavaScript, spreadsheet, JavaScript table, translate messages, Jspreadsheet translations, internationalization  
description: Learn how to translate and customize the default messages in Jspreadsheet for internationalization.

# Jspreadsheet Internationalization

Learn how to update and customize the default texts in your online spreadsheet for better internationalization.

### Source code

```html
<html>
<script src="https://bossanova.uk/jspreadsheet/v5/jspreadsheet.js"></script>
<script src="https://jsuites.net/v5/jsuites.js"></script>
<link rel="stylesheet" href="https://bossanova.uk/jspreadsheet/v5/jspreadsheet.css" type="text/css" />
<link rel="stylesheet" href="https://jsuites.net/v5/jsuites.css" type="text/css" />

<div id="spreadsheet"></div>

<script>
jspreadsheet.setDictionary({
    'Search': '検索',
    'Show': '表示',
    'entries': 'エントリ',
    'Insert a new column before': '新しい列を前に挿入',
    'Insert a new column after': '新しい列を後に挿入',
    'Delete selected columns': '選択した列を削除',
    'Rename this column': 'この列の名前を変更',
    'Column name': '列名',
    'Order ascending': '昇順に並べ替え',
    'Order descending': '降順に並べ替え',
    'Insert a new row before': '新しい行を前に挿入',
    'Insert a new row after': '新しい行を後に挿入',
    'Edit comments': 'コメントを編集',
    'Add comments': 'コメントを追加',
    'Comments': 'コメント',
    'Clear comments': 'コメントをクリア',
    'Copy': 'コピー',
    'Paste': '貼り付け',
    'Save as': '名前を付けて保存',
    'About': '情報',
    'Are you sure to delete the selected rows?': '選択した行を削除してもよろしいですか？',
    'Are you sure to delete the selected columns?': '選択した列を削除してもよろしいですか？',
    'No cells selected': 'セルが選択されていません',
    'No records found': '記録が見つかりません',
    'Showing page {0} of {1} entries': '{1}件中{0}ページを表示',
    'Merge the selected cells': '選択したセルを結合',
    'There is a conflict with another merged cell': '別の結合されたセルとの競合があります',
    'Invalid merged properties': '無効な結合プロパティ',
    'Cell already merged': 'セルはすでに結合されています',
    'This action will destroy any existing merged cells. Are you sure?': 'この操作により、既存の結合セルが削除されます。よろしいですか？',
    'The merged cells will retain the value of the top-left cell only. Are you sure?': '結合セルは左上のセルの値のみを保持します。よろしいですか？',
    'This action will clear your search results. Are you sure?': 'この操作により検索結果がクリアされます。よろしいですか？'
});

jspreadsheet(document.getElementById('spreadsheet'), {
    worksheets: [
        { minDimensions: [6,6] },
    ]
});
</script>
</html>
```
```jsx
import React, { useRef } from "react";
import { Spreadsheet, Worksheet, jspreadsheet } from "@jspreadsheet-ce/react";
import "jsuites/dist/jsuites.css";
import "jspreadsheet-ce/dist/jspreadsheet.css";

jspreadsheet.setDictionary({
    'Search': '検索',
    'Show': '表示',
    'entries': 'エントリ',
    'Insert a new column before': '新しい列を前に挿入',
    'Insert a new column after': '新しい列を後に挿入',
    'Delete selected columns': '選択した列を削除',
    'Rename this column': 'この列の名前を変更',
    'Column name': '列名',
    'Order ascending': '昇順に並べ替え',
    'Order descending': '降順に並べ替え',
    'Insert a new row before': '新しい行を前に挿入',
    'Insert a new row after': '新しい行を後に挿入',
    'Edit comments': 'コメントを編集',
    'Add comments': 'コメントを追加',
    'Comments': 'コメント',
    'Clear comments': 'コメントをクリア',
    'Copy': 'コピー',
    'Paste': '貼り付け',
    'Save as': '名前を付けて保存',
    'About': '情報',
    'Are you sure to delete the selected rows?': '選択した行を削除してもよろしいですか？',
    'Are you sure to delete the selected columns?': '選択した列を削除してもよろしいですか？',
    'No cells selected': 'セルが選択されていません',
    'No records found': '記録が見つかりません',
    'Showing page {0} of {1} entries': '{1}件中{0}ページを表示',
    'Merge the selected cells': '選択したセルを結合',
    'There is a conflict with another merged cell': '別の結合されたセルとの競合があります',
    'Invalid merged properties': '無効な結合プロパティ',
    'Cell already merged': 'セルはすでに結合されています',
    'This action will destroy any existing merged cells. Are you sure?': 'この操作により、既存の結合セルが削除されます。よろしいですか？',
    'The merged cells will retain the value of the top-left cell only. Are you sure?': '結合セルは左上のセルの値のみを保持します。よろしいですか？',
    'This action will clear your search results. Are you sure?': 'この操作により検索結果がクリアされます。よろしいですか？'
});

export default function App() {
    const spreadsheet = useRef();

    return (
        <Spreadsheet ref={spreadsheet}>
            <Worksheet />
        </Spreadsheet>
    );
};
```
```vue
<template>
    <Spreadsheet ref="spreadsheet">
        <Worksheet />
    </Spreadsheet>
</template>

<script>
import { Spreadsheet, Worksheet } from "@jspreadsheet-ce/vue";
import "jsuites/dist/jsuites.css";
import "jspreadsheet-ce/dist/jspreadsheet.css";

jspreadsheet.setDictionary({
  'Search': '検索',
  'Show': '表示',
  'entries': 'エントリ',
  'Insert a new column before': '新しい列を前に挿入',
  'Insert a new column after': '新しい列を後に挿入',
  'Delete selected columns': '選択した列を削除',
  'Rename this column': 'この列の名前を変更',
  'Column name': '列名',
  'Order ascending': '昇順に並べ替え',
  'Order descending': '降順に並べ替え',
  'Insert a new row before': '新しい行を前に挿入',
  'Insert a new row after': '新しい行を後に挿入',
  'Edit comments': 'コメントを編集',
  'Add comments': 'コメントを追加',
  'Comments': 'コメント',
  'Clear comments': 'コメントをクリア',
  'Copy': 'コピー',
  'Paste': '貼り付け',
  'Save as': '名前を付けて保存',
  'About': '情報',
  'Are you sure to delete the selected rows?': '選択した行を削除してもよろしいですか？',
  'Are you sure to delete the selected columns?': '選択した列を削除してもよろしいですか？',
  'No cells selected': 'セルが選択されていません',
  'No records found': '記録が見つかりません',
  'Showing page {0} of {1} entries': '{1}件中{0}ページを表示',
  'Merge the selected cells': '選択したセルを結合',
  'There is a conflict with another merged cell': '別の結合されたセルとの競合があります',
  'Invalid merged properties': '無効な結合プロパティ',
  'Cell already merged': 'セルはすでに結合されています',
  'This action will destroy any existing merged cells. Are you sure?': 'この操作により、既存の結合セルが削除されます。よろしいですか？',
  'The merged cells will retain the value of the top-left cell only. Are you sure?': '結合セルは左上のセルの値のみを保持します。よろしいですか？',
  'This action will clear your search results. Are you sure?': 'この操作により検索結果がクリアされます。よろしいですか？'
});

export default {
    components: {
        Spreadsheet,
        Worksheet,
    },
    setup() {
        return {};
    }
}
</script>
```
