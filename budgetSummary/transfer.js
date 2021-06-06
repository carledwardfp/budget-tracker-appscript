function transfer(columnHeaders, row) {
  const WALLET = {
    column: "On The Go Wallet",
    value: parseInt(row[columnHeaders.indexOf("On The Go Wallet")]) || 0,
  };
  const BDO = {
    column: "BDO",
    value: parseInt(row[columnHeaders.indexOf("BDO")]) || 0,
  };
  const METROBANK = {
    column: "Metrobank",
    value: parseInt(row[columnHeaders.indexOf("Metrobank")]) || 0,
  };
  const HOME = {
    column: "Home Wallet",
    value: parseInt(row[columnHeaders.indexOf("Home Wallet")]) || 0,
  };
  const GCASH = {
    column: "GCash",
    value: parseInt(row[columnHeaders.indexOf("GCash")]) || 0,
  };
  const COINSPH = {
    column: "Coins PH",
    value: parseInt(row[columnHeaders.indexOf("Coins PH")]) || 0,
  };
  const BINANCE = {
    column: "Binance",
    value: parseInt(row[columnHeaders.indexOf("Binance")]) || 0,
  };

  let values = [];
  values.push(WALLET);
  values.push(BDO);
  values.push(METROBANK);
  values.push(HOME);
  values.push(GCASH);
  values.push(COINSPH);
  values.push(BINANCE);

  let cashout = values.filter((money) => money.value < 0);
  let cashin = values.filter((money) => money.value > 0);

  return { cashin, cashout };
}

function transferMessage(cashin, cashout, columnHeaders, row) {
  message =
    cashout[0].column +
    " → " +
    cashin[0].column +
    ": " +
    cashin[0].value.toLocaleString("en-PH", {
      currency: "PHP",
      style: "currency",
    }) +
    " (" +
    row[columnHeaders.indexOf("Date")].toLocaleDateString() +
    ")";

  return message;
}
