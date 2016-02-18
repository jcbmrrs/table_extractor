function getFiles() {
  var folders = DriveApp.getFoldersByName("Trivia Questions");
  while (folders.hasNext()) {
    var folder = folders.next();
    var files = folder.getFiles();
    while (files.hasNext()) {
      var file = files.next();
      if (!file.isStarred()) {
        addBonusQuestions(file);
        addGameOneQuestions(file);
        addGameTwoQuestions(file);
        file.setStarred(starred);
      }
   }
 }
}

function addBonusQuestions(file) {
  var docID = file.getId();
  var doc = DocumentApp.openById(docID);
  var name = doc.getName().split(" ")[3];
  name = name.replace("-", "/");
  name = name.replace("-", "/20");
  var date = new Date(name);
  var sheet = SpreadsheetApp.openByUrl('https://docs.google.com/spreadsheets/d/1fGhGJgBcJ3QUF7kn89DMItel3RQkGyoKGVQI7-Dy92A/edit');
  sheet.setActiveSheet(sheet.getSheets()[0]);
  var body = doc.getBody();
  var tables = body.getTables();
  var bonusQ = tables[2];
  
  //for loop
  for (var i = 0; i < bonusQ.getNumRows(); i++) {
    //log each table
    if(i == 0) { } else {
      var row = bonusQ.getRow(i);
      sheet.appendRow([name, row.getCell(0).getText(), row.getCell(1).getText(), row.getCell(2).getText(),row.getCell(3).getText()]);
      Logger.log(name + row.getCell(0).getText() + row.getCell(1).getText() + row.getCell(2).getText() + row.getCell(3).getText());
      } 
    }
}

function addGameOneQuestions(file) {
  var docID = file.getId();
  var doc = DocumentApp.openById(docID);
  var name = doc.getName().split(" ")[3];
  name = name.replace("-", "/");
  name = name.replace("-", "/20");
  var date = new Date(name);
  var sheet = SpreadsheetApp.openByUrl('https://docs.google.com/spreadsheets/d/1fGhGJgBcJ3QUF7kn89DMItel3RQkGyoKGVQI7-Dy92A/edit');
  sheet.setActiveSheet(sheet.getSheets()[1]);
  var body = doc.getBody();
  var tables = body.getTables();
  var game1Q = tables[0];
  
  //for loop
  for (var i = 0; i < game1Q.getNumRows(); i++) {
    //log each table
    if(i == 0 | i == 1 | i == 7 | i == 13 | i == 14 ) { } else {
      var row = game1Q.getRow(i);
      sheet.appendRow([date, row.getCell(0).getText(), row.getCell(1).getText(), row.getCell(2).getText(),row.getCell(3).getText()]);
      //Logger.log(date + row.getCell(0).getText() + row.getCell(1).getText() + row.getCell(2).getText() + row.getCell(3).getText());
      } 
    }
}

function addGameTwoQuestions(file) {
  var docID = file.getId();
  var doc = DocumentApp.openById(docID);
  var name = doc.getName().split(" ")[3];
  name = name.replace("-", "/");
  name = name.replace("-", "/20");
  var date = new Date(name);
  var sheet = SpreadsheetApp.openByUrl('https://docs.google.com/spreadsheets/d/1fGhGJgBcJ3QUF7kn89DMItel3RQkGyoKGVQI7-Dy92A/edit');
  sheet.setActiveSheet(sheet.getSheets()[2]);
  var body = doc.getBody();
  var tables = body.getTables();
  var game2Q = tables[1];
  
  //for loop
  for (var i = 0; i < game2Q.getNumRows(); i++) {
    //log each table
    if(i == 0 | i == 6 | i == 12 ) { } else {
      var row = game2Q.getRow(i);
      sheet.appendRow([date, row.getCell(0).getText(), row.getCell(1).getText(), row.getCell(2).getText(),row.getCell(3).getText()]);
      //Logger.log(date + row.getCell(0).getText() + row.getCell(1).getText() + row.getCell(2).getText() + row.getCell(3).getText());
      } 
    }
}
