function budgetSummary() {
  const {
    BUDGET_FOLDER_ID,
    BUDGET_SHEET_ID,
    EXPENSES_TRACKER_SHEET_NAME,
    LOG_SHEET_NAME,
    Logger,
    UI,
  } = init();

  if (isUserAuthorized()) {
    // Get IDs and NAMEs
    const spreadSheet = SpreadsheetApp.openById(BUDGET_SHEET_ID);
    const dataSheet = spreadSheet.getSheetByName(EXPENSES_TRACKER_SHEET_NAME);
    const logSheet = spreadSheet.getSheetByName(LOG_SHEET_NAME);
    const columnHeaders = dataSheet.getRange("A17:M17").getDisplayValues()[0];
    const dataSheetRange = dataSheet.getRange("A18:M");
    let dataValues = dataSheetRange.getValues();

    // Clear logs before generating
    clearLogs(logSheet);
    Logger.log("ℹ️: Cleared previous logs");

    let wallet = 0;
    dataValues.forEach(function (row, index) {
      // Check Row
      if (isRowEmpty(columnHeaders, row)) {
        return;
      } else {
        const TRANSACTION = row[columnHeaders.indexOf("Transactions")];
        switch (TRANSACTION) {
          case "Income":
            break;
          case "Expense":
            break;
          case "Transfer":
            break;
          case "Savings":
            break;
          default:
            return;
        }
      }
    });

    Logger.log("ℹ️: " + wallet);
  } else {
    UI.alert(
      "Error",
      "You are unauthorized to perform this action.",
      UI.ButtonSet.OK
    );
  }
}
