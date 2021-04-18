// Clear Logs
function clearLogs(logSheet) {
  for (let rowCounter = 2; rowCounter <= logSheet.getLastRow(); rowCounter++) {
    logSheet.getRange(rowCounter, 1).clearContent();
  }
}

function isRowEmpty(columnHeaders, row) {
  return (
    row[columnHeaders.indexOf("On The Go Wallet")] === "" &&
    row[columnHeaders.indexOf("BDO")] === "" &&
    row[columnHeaders.indexOf("Metrobank")] === "" &&
    row[columnHeaders.indexOf("Home Wallet")] === "" &&
    row[columnHeaders.indexOf("GCash")] === "" &&
    row[columnHeaders.indexOf("Coins PH")] === "" &&
    row[columnHeaders.indexOf("Binance")] === "" &&
    row[columnHeaders.indexOf("E-wallet No. 4")] === ""
  );
}
