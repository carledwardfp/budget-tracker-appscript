function onOpen(e) {
  SpreadsheetApp.getUi()
    .createMenu("Run Script")
    .addSeparator()
    .addItem("Generate Budget Summary", "generateDoc")
    .addSeparator()
    .addToUi();
}
