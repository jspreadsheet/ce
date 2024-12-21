title: Jspreadsheet Distributions Comparison
keywords: Jspreadsheet, Jexcel, data grid, JavaScript, Excel-like, spreadsheet, table, documentation, performance, version differences, distribution comparison
description: Explore a detailed comparison highlighting the key differences between various Jspreadsheet distributions.

# Comparison Table

The main differences between the JSS distributions:

| Package                                         |    CE distribution    |  Pro distribution   |  Pro distribution   |
|-------------------------------------------------|:---------------------:|:-------------------:|:-------------------:|
| Distribution                                    |        **CE**         |      **Base**       |     **Premium**     |
| License                                         |      Free (MIT)       |      Required       |      Required       |
| Spreadsheet-like formulas                       |          Yes          |      Advanced       |      Advanced       |
| Copy and paste features                         |          Yes          |      Advanced       |      Advanced       |
| Viewport                                        |     Lazy loading      |   Smart loading*    |   Smart loading*    |
| Plugins support                                 |          Yes          |         Yes         |         Yes         |
| Advance filtering and multiple column filtering |          No           |         Yes         |         Yes         |
| Worksheets management                           |        Limited        |         Yes         |         Yes         |
| Native persistence features                     |        Limited        |         Yes         |         Yes         |
| Automatic formula update on copy and paste      |          No           |         Yes         |         Yes         |
| Automatic formula update on corner copy         |          No           |         Yes         |         Yes         |
| Formula returning DOM objects to cells.         |          No           |         Yes         |         Yes         |
| Cell renderer                                   |          No           |         Yes         |         Yes         |
| Editor definitions at a cell level              |          No           |         Yes         |         Yes         |
| Cross worksheet calculations                    |          No           |         No          |         Yes         |
| Native validations                              |          No           |         No          |         Yes         |
| Column and row grouping                         |          No           |         No          |         Yes         |
| Defined names (Range and variables)             |          No           |         No          |         Yes         |
| Extensions                                      |          No           |         No          |         Yes         |
| Formula Picker                                  |          No           |         No          |         Yes         |

## More Details

### Worksheet Management

Pro includes dragging-and-drop, deleting or renaming worksheets, adding a new worksheet button, and configuring the context menu.

### Persistence Support

Pro offers native persistence features such as internal row IDs and sequences, updated row IDs, saving methods, and integration with persistence plugins.

### Advanced Lazy Loading

Provides efficient DOM management with pagination and lazy loading, creating and displaying DOM elements only when required. From version 8, lazy loading leverages the viewport and extends virtual DOM management to columns.

### Cell-Level Definitions

The Pro distribution enables developers to configure properties like masking, format, type, and other attributes at the cell level.
