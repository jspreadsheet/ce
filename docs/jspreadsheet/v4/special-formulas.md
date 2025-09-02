title: Special Formulas in Jspreadsheet
keywords: Jspreadsheet, spreadsheet formulas, custom methods, JavaScript spreadsheets, special formulas, progress bar, star rating, spreadsheet custom features
description: Explore Jspreadsheet's special formulas and custom methods to enhance spreadsheet functionality.
canonical: https://bossanova.uk/jspreadsheet/v4/docs/special-formulas

# Special formulas

Jspreadsheet supports spreadsheet-like formulas, along with special formulas designed to enhance usability and functionality.

## Custom Jspreadsheet Methods

| Method                                                                                                                                      | Example                                              |
| ------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| **=PROGRESS(int, string)** Create a progress bar.<br/>**Parameters:**<br/>`int` percent (0-100)<br/>`string` color (Hex value)              | [Example](/jspreadsheet/v4/cases/project-management) |
| **=RATING(int)** Create a star rating based on an integer.<br/>**Parameters:**<br/>`int` value (0-5)                                        | [Example](/jspreadsheet/v4/cases/food-store)         |
| **=TABLE()** Return the Jspreadsheet table instance.                                                                                        |                                                      |
| **=COLUMN()** Return the column number where the formula is executed.                                                                       |                                                      |
| **=ROW()** Return the row number where the formula is executed.                                                                             |                                                      |
| **=CELL()** Return the cell string identification.                                                                                          |                                                      |
| **=VALUE(int, int)** Return the cell value based on the column and row numbers.<br/>**Parameters:**<br/>`int` colNumber<br/>`int` rowNumber |                                                      |
