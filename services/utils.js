// Clear Logs
function clearLogs(logSheet) {
  for (let rowCounter = 2; rowCounter <= logSheet.getLastRow(); rowCounter++) {
    logSheet.getRange(rowCounter, 1).clearContent();
  }
}

// Error handling for existing folder name
function setFolderName(parentFolder, folderName, emailName) {
  let finalFolderName;
  let folders = parentFolder.getFolders();
  if (folders.hasNext()) {
    while (folders.hasNext()) {
      let folder = folders.next();
      if (folder.getName() === folderName) {
        finalFolderName = emailName;
        break;
      } else {
        finalFolderName = folderName;
      }
    }
  } else {
    finalFolderName = folderName;
  }
  return finalFolderName;
}

// Copy Job Description file
function copyJobDescription(
  folder,
  destinationFolder,
  name,
  row,
  columnHeaders,
  position
) {
  let defaultName = `${position} Job Description`; // Critical (do not change job offer name)
  let site = row[columnHeaders.indexOf("Site")];
  let filesList = [];
  let finalFile;
  let fileName;

  let files = folder.getFiles();
  while (files.hasNext()) {
    let file = files.next();
    filesList.push(file);
  }
  for (let i = 0; i < filesList.length; i++) {
    if (filesList[i].getName().includes(site)) {
      finalFile = filesList[i];
      fileName = `[${name}] ${filesList[i].getName()}`;
    }
  }
  if (finalFile === undefined) {
    // if (!finalFile)
    let files = folder.getFilesByName(defaultName);
    finalFile = files.next();
    fileName = `[${name}] ${defaultName}`;
  }
  let newFile = finalFile.makeCopy(fileName, destinationFolder);
}

// Copy files with name
function copyFilesWithName(
  folder,
  destinationFolder,
  name,
  row,
  columnHeaders
) {
  let convertedDocObject = {};

  let files = folder.getFiles();
  while (files.hasNext()) {
    let file = files.next();
    // Change Job Offer and Contract Doc Names
    let newFileName;
    if (file.getName().includes("JO")) {
      newFileName = `[${name}] Job Offer`;
    } else if (file.getName().includes("CONTRACT")) {
      newFileName = `[${name}] ${
        row[columnHeaders.indexOf("Contract Type")]
      } Contract`;
    } else {
      newFileName = `[${name}] ${file.getName()}`;
    }
    let newFile = file.makeCopy(newFileName, destinationFolder);
    convertedDocObject[file.getName()] = newFile.getId();
  }

  return convertedDocObject;
}

// Get Day "MONTH D, YYYY"
function getDay(date) {
  let day = date.getDate();
  let year = date.getFullYear();
  let month = date.getMonth();

  switch (month) {
    case 0:
      month = "January";
      break;
    case 1:
      month = "February";
      break;
    case 2:
      month = "March";
      break;
    case 3:
      month = "April";
      break;
    case 4:
      month = "May";
      break;
    case 5:
      month = "June";
      break;
    case 6:
      month = "July";
      break;
    case 7:
      month = "August";
      break;
    case 8:
      month = "September";
      break;
    case 9:
      month = "October";
      break;
    case 10:
      month = "November";
      break;
    case 11:
      month = "December";
      break;
  }
  return month + " " + day + ", " + year;
}

function getContractDay(date) {
  let day = date.getDate();
  day = getOrdinalNum(day);
  let year = date.getFullYear();
  let month = date.getMonth();

  switch (month) {
    case 0:
      month = "January";
      break;
    case 1:
      month = "February";
      break;
    case 2:
      month = "March";
      break;
    case 3:
      month = "April";
      break;
    case 4:
      month = "May";
      break;
    case 5:
      month = "June";
      break;
    case 6:
      month = "July";
      break;
    case 7:
      month = "August";
      break;
    case 8:
      month = "September";
      break;
    case 9:
      month = "October";
      break;
    case 10:
      month = "November";
      break;
    case 11:
      month = "December";
      break;
  }
  return { month, day, year };
}

function getOrdinalNum(number) {
  let selector;
  if (number <= 0) {
    selector = 4;
  } else if ((number > 3 && number < 21) || number % 10 > 3) {
    selector = 0;
  } else {
    selector = number % 10;
  }
  return number + ["th", "st", "nd", "rd", ""][selector];
}

function convertDocToPdf(folder, file) {
  let BLOBPDF = file.getAs(MimeType.PDF);
  let pdf = folder.createFile(BLOBPDF);
  pdf = pdf.setName(file.getName());
  file.setTrashed(true);

  return pdf;
}
