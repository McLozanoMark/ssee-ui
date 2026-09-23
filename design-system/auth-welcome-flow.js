function bindAuthWelcomeFlow({ continueButton, authPage, authWelcome, authType }) {
  if (!continueButton || !authPage || !authWelcome) return;
  continueButton.addEventListener("click", () => {
    authPage.hidden = true;
    mountAuthWelcome(authWelcome, authType);
  });
}
