// init.js

function init() {
  /*
   * Returns credentials based on the selected environment
   */

  const BUDGET_FOLDER_ID = "1NAhAtNQ8dX1ykA-i_CBhM5SblBycCwZI";
  const BUDGET_SHEET_ID = "1I-2N_cjZN6RbjjQKOaGPvtnpaM9LTFsHp3h_sSt4fCo";
  const BUDGET_SCRIPT_ID =
    "1hYpZOFXAjFNkschEfxXcG6lVHBRdG9uVg3KucLFeFK2io76387CBH8ws";
  const BUDGET_SUMMARY_DOC_ID = "14B2dLbpf_OHymUwQRQfd6FKsxX80TanWdLhhTt2ZzAw";
  const BUDGET_SHEET_NAME = "Budget V2";
  const LOG_SHEET_NAME = "LOGS";

  const currentSheet = SpreadsheetApp.getActiveSpreadsheet().getId();
  const Logger = BetterLog.useSpreadsheet(currentSheet, "LOGS");
  const UI = SpreadsheetApp.getUi();

  return {
    BUDGET_FOLDER_ID,
    BUDGET_SHEET_ID,
    BUDGET_SCRIPT_ID,
    BUDGET_SUMMARY_DOC_ID,
    LOG_SHEET_NAME,
    BUDGET_SHEET_NAME,
    Logger,
    UI,
  };
}
