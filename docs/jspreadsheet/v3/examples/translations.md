title: Jspreadsheet Translations
keywords: Jexcel, spreadsheet, javascript, javascript table, translate, translations
description: How to translate the default Jspreadsheet text and controls.

[Back to Examples](/jspreadsheet/v3/examples "Back to the examples section")

# Internationalization

How to update the default texts from Jspreadsheet.

```html
<html>
  <script src="https://bossanova.uk/jspreadsheet/v3/jexcel.js"></script>
  <script src="https://jsuites.net/v3/jsuites.js"></script>
  <link
    rel="stylesheet"
    href="https://bossanova.uk/jspreadsheet/v3/jexcel.css"
    type="text/css"
  />
  <link
    rel="stylesheet"
    href="https://jsuites.net/v3/jsuites.css"
    type="text/css"
  />

  <div id="spreadsheet"></div>

  <script>
    jexcel(document.getElementById("spreadsheet"), {
      data: [
        ["Mazda", 2001, 2000, "2006-01-01"],
        ["Peugeot", 2010, 5000, "2005-01-01"],
        ["Honda Fit", 2009, 3000, "2004-01-01"],
        ["Honda CRV", 2010, 6000, "2003-01-01"],
      ],
      columns: [
        { type: "text", width: 300 },
        { type: "text", width: 100 },
        { type: "text", width: 100 },
        { type: "calendar", width: 100 },
      ],
      text: {
        noRecordsFound: "Nenhum registro encontrado",
        showingPage: "Mostrando página {0} de {1} entradas",
        show: "Show",
        entries: "entradas",
        insertANewColumnBefore: "Inserir uma nova coluna antes de",
        insertANewColumnAfter: "Inserir uma nova coluna depois de",
        deleteSelectedColumns: "Excluir colunas selecionadas",
        renameThisColumn: "Renomear esta coluna",
        orderAscending: "ordem ascendente",
        orderDescending: "Order decrescente",
        insertANewRowBefore: "Inserir uma nova linha antes de",
        insertANewRowAfter: "Inserir uma nova linha depois de",
        deleteSelectedRows: "Excluir linhas selecionadas",
        editComments: "Editar comentários",
        addComments: "Adicionar comentários",
        comments: "Comentários",
        clearComments: "Limpar comentários",
        copy: "Copiar ...",
        paste: "Colar ...",
        saveAs: "Salvar como ...",
        areYouSureToDeleteTheSelectedRows:
          "Tem certeza de excluir as linhas selecionadas?",
        areYouSureToDeleteTheSelectedColumns:
          "Tem certeza de excluir as colunas selecionadas?",
        thisActionWillDestroyAnyExistingMergedCellsAreYouSure:
          "Esta ação irá destruir todas as células mescladas existentes. Você tem certeza?",
        thisActionWillClearYourSearchResultsAreYouSure:
          "Esta ação limpará seus resultados de pesquisa. Você tem certeza?",
        thereIsAConflictWithAnotherMergedCell:
          "Há um conflito com outra célula mesclada",
        invalidMergeProperties: "Propriedades mescladas inválidas",
        cellAlreadyMerged: "Cell já mesclado",
        noCellsSelected: "Nenhuma célula selecionada",
      },
    });
  </script>
</html>
```
