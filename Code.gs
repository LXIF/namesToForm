function updateForm() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheets()[0]; // Assumes the first sheet is the one with form responses
  var data = sheet.getDataRange().getValues(); // Gets all data in the sheet

  var formId = 'ENTER_FORM_ID'; //found in your google form between /d/ and /edit
  var form = FormApp.openById(formId);
  var items = form.getItems();
  var withdrawingMembers = [];
  var solidaritySignatories = [];

  // Skip the first row, as it contains the headers
  for (var i = 1; i < data.length; i++) {
    var row = data[i];
    var name = row[2]; // Assuming the name is in the third column
    var isMember = row[3]; // Assuming the "member" response is in the fourth column
    var solidarity = row[5]; // Assuming the "solidarity" response is in the fifth column
    var pledge = row[6]; // Assuming the "pledge" response is in the sixth column

    if (isMember.toLowerCase() === 'yes' && pledge.toLowerCase() === 'yes') {
      withdrawingMembers.push(name);
    } else if (solidarity.toLowerCase() === 'yes') {
      solidaritySignatories.push(name);
    }
  }

  // Output to Logger (or handle it as you need)
  Logger.log("Withdrawing Members:\n" + withdrawingMembers.join('\n'));
  Logger.log("Signatories in Solidarity:\n" + solidaritySignatories.join('\n'));

  items.forEach(function(item) {
    Logger.log(item.getType());
  //the script assumes there are two Section Header Items with the below-mentioned titles
      if (item.getTitle() === 'Withdrawing Members:' || item.getTitle() === 'Signatories in Solidarity:') {
        var paragraphItem = item.asSectionHeaderItem();
        var text = '';
        if (item.getTitle() === 'Withdrawing Members:') {
          text = withdrawingMembers.join('\n');
        } else {
          text = solidaritySignatories.join('\n');
        }
        paragraphItem.setHelpText(text); // Update the text
      }  
  });
}

// Add a trigger or run the function manually to execute
