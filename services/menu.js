function onOpen(e) {
  SpreadsheetApp.getUi()
    .createMenu("BUDGET")
    .addSeparator()
    .addItem("Generate Budget Summary", "budgetSummary")
    .addSeparator()
    .addToUi();
}
