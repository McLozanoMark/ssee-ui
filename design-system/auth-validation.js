export function hasRequiredValues(values) {
  return values.every((value) => String(value ?? "").trim().length > 0);
}

export function validatePassportAccess({ documentNumber, password, user }) {
  return Boolean(user)
    && user.password === password
    && user.documentNumber === documentNumber
    && user.active
    && user.synchronized
    && user.projects > 0
    && user.roles > 0;
}

export function validateDocumentAccess({ documentNumber, birthDate, issueDate, user }) {
  return Boolean(user)
    && user.number === documentNumber
    && user.birthDate === birthDate
    && user.issueDate === issueDate
    && user.active
    && user.valid
    && user.projects > 0
    && user.roles > 0;
}

export function validateAutoregisterAccess({ email, password, account, periodState }) {
  return periodState === "open"
    && Boolean(account)
    && account.email === email
    && account.password === password
    && account.active;
}
