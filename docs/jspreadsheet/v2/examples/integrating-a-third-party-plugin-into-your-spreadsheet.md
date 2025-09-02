title: Jspreadsheet | Examples | Custom column and integrating plugins on your table
keywords: Jexcel, jquery, javascript, excel-like, spreadsheet, jquery plugin, sorting, table, grid, order by
description: How to create custom column types based on a third party jquery plugin

[Back to Examples](/jspreadsheet/v2/examples)

# Create a custom column based on a third party jquery plugin

This particular example shows how to create a custom color picker column type using the [Spectrum Jquery Plugin](https://bgrins.github.io/spectrum/). This example illustrates how to create your own custom columns based on any third party jquery plugin.

[See this example on jsFiddle](https://jsfiddle.net/spreadsheet/rp0876b1/)

## Source code

```html
<html>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/spectrum/1.8.0/spectrum.min.js"></script>
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/spectrum/1.8.0/spectrum.min.css"
    type="text/css"
  />

  <script src="https://cdnjs.cloudflare.com/ajax/libs/jexcel/2.1.0/js/jquery.jexcel.js"></script>
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/jexcel/2.1.0/css/jquery.jexcel.min.css"
    type="text/css"
  />

  <div id="my"></div>

  <script>
    var spectrumEditor = {
      // Methods
      closeEditor: function (cell, save) {
        // Get value
        var value = $(cell).find(".editor").spectrum("get").toHexString();

        // Set visual value
        $(cell).html(value);
        $(cell).css("color", value);

        // Close edition
        $(cell).removeClass("edition");

        // Save history
        return value;
      },
      openEditor: function (cell) {
        // Get current content
        var html = $(cell).html();

        // Create the editor
        var editor = document.createElement("div");
        $(cell).html(editor);
        $(editor).prop("class", "editor");

        // Create the instance of the plugin
        $(editor).spectrum({
          color: html,
          preferredFormat: "hex",
          hide: function (color) {
            // Close editor
            $("#" + $.fn.jexcel.current).jexcel("closeEditor", $(cell), true);
          },
        });

        // Run
        $(editor).spectrum("show");
      },
      getValue: function (cell) {
        return $(cell).html();
      },
      setValue: function (cell, value) {
        $(cell).html(value);
        $(cell).css("color", value);

        return true;
      },
    };

    let data = [
      ["Google", "#542727"],
      ["Yahoo", "#724f4f"],
      ["Bing", "#b43131"],
    ];

    $("#my").jexcel({
      data: data,
      colHeaders: ["Name", "Custom color"],
      colWidths: [300, 200],
      columns: [{ type: "text" }, { type: "text", editor: spectrumEditor }],
    });
  </script>
</html>
```
