// Configuration
var SPREADSHEET_URL = 'https://docs.google.com/spreadsheets/d/1fGhGJgBcJ3QUF7kn89DMItel3RQkGyoKGVQI7-Dy92A/edit';
var FOLDER_NAME = "Trivia Questions";

// Sheet indices
var SHEET_BONUS = 0;
var SHEET_GAME_ONE = 1;
var SHEET_GAME_TWO = 2;

// Table indices
var TABLE_GAME_ONE = 0;
var TABLE_GAME_TWO = 1;
var TABLE_BONUS = 2;

// Rows to skip for each game type
var SKIP_ROWS_BONUS = [0];
var SKIP_ROWS_GAME_ONE = [0, 1, 7, 13, 14];
var SKIP_ROWS_GAME_TWO = [0, 6, 12];

/**
 * Main function to process all unstarred files in the Trivia Questions folder
 */
function getFiles() {
  var folders = DriveApp.getFoldersByName(FOLDER_NAME);

  while (folders.hasNext()) {
    var folder = folders.next();
    var files = folder.getFiles();

    while (files.hasNext()) {
      var file = files.next();
      if (!file.isStarred()) {
        try {
          addBonusQuestions(file);
          addGameOneQuestions(file);
          addGameTwoQuestions(file);
          file.setStarred(true);
        } catch (error) {
          Logger.log('Error processing file ' + file.getName() + ': ' + error.toString());
        }
      }
    }
  }
}

/**
 * Extracts date from document name
 * Expected format: "... ... ... MM-DD-YY ..."
 */
function extractDate(doc) {
  var name = doc.getName().split(" ")[3];
  name = name.replace("-", "/");
  name = name.replace("-", "/20");
  return new Date(name);
}

/**
 * Extracts row data from table row as array
 */
function getRowData(row) {
  return [
    row.getCell(0).getText(),
    row.getCell(1).getText(),
    row.getCell(2).getText(),
    row.getCell(3).getText()
  ];
}

/**
 * Generic function to add questions from a specific table to a specific sheet
 */
function addQuestionsToSheet(file, sheetIndex, tableIndex, skipRows, useDateForFirstColumn) {
  var docID = file.getId();
  var doc = DocumentApp.openById(docID);
  var dateValue = extractDate(doc);

  var sheet = SpreadsheetApp.openByUrl(SPREADSHEET_URL);
  sheet.setActiveSheet(sheet.getSheets()[sheetIndex]);

  var body = doc.getBody();
  var tables = body.getTables();
  var table = tables[tableIndex];

  for (var i = 0; i < table.getNumRows(); i++) {
    if (skipRows.indexOf(i) === -1) {
      var row = table.getRow(i);
      var rowData = getRowData(row);
      var firstColumn = useDateForFirstColumn ? dateValue : dateValue.toLocaleDateString();
      sheet.appendRow([firstColumn].concat(rowData));
    }
  }
}

/**
 * Adds bonus questions (table 2) to sheet 0
 */
function addBonusQuestions(file) {
  addQuestionsToSheet(file, SHEET_BONUS, TABLE_BONUS, SKIP_ROWS_BONUS, false);
}

/**
 * Adds Game One questions (table 0) to sheet 1
 */
function addGameOneQuestions(file) {
  addQuestionsToSheet(file, SHEET_GAME_ONE, TABLE_GAME_ONE, SKIP_ROWS_GAME_ONE, true);
}

/**
 * Adds Game Two questions (table 1) to sheet 2
 */
function addGameTwoQuestions(file) {
  addQuestionsToSheet(file, SHEET_GAME_TWO, TABLE_GAME_TWO, SKIP_ROWS_GAME_TWO, true);
}
