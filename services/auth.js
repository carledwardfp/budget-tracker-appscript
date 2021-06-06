function isUserAuthorized() {
  let DEFAULT_PERMISSIONS = [
    "carlpahuyo755@gmail.com",
    "official.carlpahuyo@gmail.com",
    "cpahuyo@medgrocer.com",
    "cyrapahuyo@gmail.com",
    "kmafable@up.edu.ph",
  ];
  let CURRENT_USER = Session.getActiveUser().getEmail();

  let FINAL_PERMISSIONS = DEFAULT_PERMISSIONS;
  return FINAL_PERMISSIONS.includes(CURRENT_USER);
}
