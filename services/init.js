// init.js

function init() {
  /*
   * Returns credentials based on the selected environment
   */

  const BUDGET_FOLDER_ID = "1NAhAtNQ8dX1ykA-i_CBhM5SblBycCwZI";
  const EXPENSES_TRACKER_SHEET_NAME = "Expenses Tracker";
  const LOG_SHEET_NAME = "LOGS";

  const CURRENT_SCRIPT_ID = ScriptApp.getScriptId();
  const DEVELOP_SCRIPT_ID =
    "1hYpZOFXAjFNkschEfxXcG6lVHBRdG9uVg3KucLFeFK2io76387CBH8ws";
  const PRODUCTION_SCRIPT_ID =
    "1uQqNJntNIdC20q9ZuhJz65j10xh0xsVkwTk8l9ROwwP5HgPWKTsR220F";

  const currentSheet = SpreadsheetApp.getActiveSpreadsheet().getId();
  const Logger = BetterLog.useSpreadsheet(currentSheet, "LOGS");
  const UI = SpreadsheetApp.getUi();

  switch (CURRENT_SCRIPT_ID) {
    case DEVELOP_SCRIPT_ID:
      return {
        BUDGET_FOLDER_ID,
        BUDGET_SHEET_ID: "1I-2N_cjZN6RbjjQKOaGPvtnpaM9LTFsHp3h_sSt4fCo",
        EXPENSES_TRACKER_SHEET_NAME,
        LOG_SHEET_NAME,
        Logger,
        UI,
      };

    case PRODUCTION_SCRIPT_ID:
      return {
        BUDGET_FOLDER_ID,
        BUDGET_SHEET_ID: "1g1Bt0o_EJ69_rCsroJUvR9A3xyNcteZh-kDKLyQhktY",
        EXPENSES_TRACKER_SHEET_NAME,
        LOG_SHEET_NAME,
        Logger,
        UI,
      };
  }
}
