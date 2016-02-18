function getFiles() {
  var folders = DriveApp.getFoldersByName("Trivia Questions");
  while (folders.hasNext()) {
    var folder = folders.next();
    var files = folder.getFiles();
    while (files.hasNext()) {
      var file = files.next();
      if (!file.isStarred()) {
        addBonusQuestions(file);
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
