function income(columnHeaders, row) {
  const WALLET = parseInt(row[columnHeaders.indexOf("On The Go Wallet")]) || 0;
  const BDO = parseInt(row[columnHeaders.indexOf("BDO")]) || 0;
  const METROBANK = parseInt(row[columnHeaders.indexOf("Metrobank")]) || 0;
  const HOME = parseInt(row[columnHeaders.indexOf("Home Wallet")]) || 0;
  const GCASH = parseInt(row[columnHeaders.indexOf("GCash")]) || 0;
  const COINSPH = parseInt(row[columnHeaders.indexOf("Coins PH")]) || 0;
  const BINANCE = parseInt(row[columnHeaders.indexOf("Binance")]) || 0;
}
