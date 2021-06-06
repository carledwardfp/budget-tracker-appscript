const generateDoc = () => {
  const {
    BUDGET_FOLDER_ID,
    BUDGET_SHEET_ID,
    BUDGET_SHEET_NAME,
    BUDGET_SUMMARY_DOC_ID,
    LOG_SHEET_NAME,
    Logger,
    UI,
  } = init();

  if (isUserAuthorized()) {
    const spreadSheet = SpreadsheetApp.openById(BUDGET_SHEET_ID);
    const dataSheet = spreadSheet.getSheetByName(BUDGET_SHEET_NAME);
    const logSheet = spreadSheet.getSheetByName(LOG_SHEET_NAME);
    const columnHeaders = dataSheet.getRange("2:2").getDisplayValues()[0];
    const rows = dataSheet.getDataRange().getValues();

    /* ------------------- Clear logs before generating -------------------- */
    clearLogs(logSheet);
    Logger.log("ℹ️: Cleared previous logs");

    rows.forEach((row, index) => {
      /* --------------------- Skip column header rows --------------------- */
      if (index === 0 || index === 1) {
        return;
      }

      let year = row[columnHeaders.indexOf("Year")];
      let month = row[columnHeaders.indexOf("Month")];
      let cutoff = row[columnHeaders.indexOf("Cutoff")];
      let income = row[columnHeaders.indexOf("Income")];
      let startDate = row[columnHeaders.indexOf("Start Date")];
      let endDate = row[columnHeaders.indexOf("End Date")];
      let numDays = row[columnHeaders.indexOf("No. of Days")];
      let totalFixed = row[columnHeaders.indexOf("Total Fixed")];
      let totalVariable = row[columnHeaders.indexOf("Total Variable")];
      let twoWeekExpense = row[columnHeaders.indexOf("2-Week Expense")];
      let savings = row[columnHeaders.indexOf("Savings")];
      let savingsOverride = row[columnHeaders.indexOf("Savings Override")];
      let remaining = row[columnHeaders.indexOf("Remaining")];
      let totalSavings = row[columnHeaders.indexOf("Total Savings")];
      let notes = row[columnHeaders.indexOf("Notes")];

      /* ------------------------- Skip done rows -------------------------- */
      if (notes.toLowerCase() === "skip" || notes.toLowerCase() === "done") {
        Logger.log(`ℹ️: ${month} ${cutoff} ${year} SKIPPED`);
        return;
      }

      /* ---------------------- Initialize document  ----------------------- */
      let destinationFolder = DriveApp.getFolderById(BUDGET_FOLDER_ID);
      let sourceDocument = DriveApp.getFileById(BUDGET_SUMMARY_DOC_ID);
      let documentName = `${month} ${cutoff} ${year}`;
      let file = sourceDocument.makeCopy(documentName, destinationFolder);
      let document = DocumentApp.openById(file.getId());
      let body = document.getBody();

      try {
        /* -------------------- Overwrite Header Table  -------------------- */
        body.replaceText("#HeaderTable#", "");
        body.replaceText("{Month}", month);
        body.replaceText("{Cutoff}", cutoff);
        body.replaceText("{Year}", year);
        body.replaceText("{Income}", formatMoney(income));

        /* --------------------- Overwrite Main Table  --------------------- */
        body.replaceText("#MainTable#", "");
        body.replaceText("{Total Fixed}", formatMoney(totalFixed));
        body.replaceText("{Total Variable}", formatMoney(totalVariable));
        let totalExpenses = totalFixed + totalVariable;
        body.replaceText("{Total Expenses}", formatMoney(totalExpenses));
        body.replaceText("{Current}", formatMoney(savings));
        let previous = savingsOverride
          ? totalSavings - savingsOverride - remaining
          : totalSavings - savings - remaining;
        body.replaceText("{Previous}", formatMoney(previous));
        body.replaceText("{Total Savings}", formatMoney(totalSavings));

        /* -------------------- Overwrite Daily Table  --------------------- */
        let dailyTableRange = body.findText("#DailyTable#");
        let dailyTable = body
          .findElement(DocumentApp.ElementType.TABLE, dailyTableRange)
          .getElement()
          .asTable();
        body.replaceText("#DailyTable#", "");
        body.replaceText("{Start Date}", formatDate(startDate));
        body.replaceText("{End Date}", formatDate(endDate));

        let date = startDate;
        for (let i = 1; i <= numDays; i++) {
          dailyTable.getRow(0).getChild(i).asText().setText(date.getDate());
          let trueSavings = savingsOverride || savings;
          dailyTable
            .getRow(1)
            .getChild(i)
            .asText()
            .setText(formatMoney(trueSavings / numDays));
          dailyTable
            .getRow(3)
            .getChild(i)
            .asText()
            .setText(formatMoney(twoWeekExpense / numDays));
          date.setTime(date.getTime() + 86400000);
        }

        if (numDays == "15") {
          dailyTable.getRow(0).getChild(16).asText().setText("");
        }

        document.saveAndClose();

        /* ------------------------ Convert to PDF  ------------------------ */
        convertDocToPdf(destinationFolder, file);

        dataSheet
          .getRange(index + 1, columnHeaders.indexOf("Notes") + 1)
          .setValue("Done");

        Logger.log(`ℹ️: ${month} ${cutoff} ${year} DONE`);
      } catch (error) {
        Logger.log(`ℹ️: ${month} ${cutoff} ${year} ERRORS: ${error}`);
        dataSheet
          .getRange(index + 1, columnHeaders.indexOf("Notes") + 1)
          .setValue("Error: " + error);
      }
    });
  } else {
    UI.alert(
      "Error",
      "You are unauthorized to perform this action.",
      UI.ButtonSet.OK
    );
  }
};
