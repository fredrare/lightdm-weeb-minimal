{
  // Manage scoped reusable variables
  const passwordField = document.getElementById("login-password")
  const maskField = document.getElementById("password-mask")

  // Handle password mask
  const maskPassword = length => {
    const minCharCode = 33
    const maxCharCode = 126
    let mask = ""
    for (let i = 0; i < length; i++) {
      const charCode = Math.floor(Math.random() * (maxCharCode - minCharCode + 1) + minCharCode)
      mask += String.fromCharCode(charCode)
    }
    maskField.value = mask
  }

  passwordField.addEventListener("keydown", e => {
    // Only mutate for valid chars, backspace & delete
    if (e.key.length > 1 && e.key !== "Backspace" && e.key !== "Delete") return
    // Only allow backspace after the first letter, no selection
    if (e.key === "Backspace" && e.target.selectionEnd === 0) return
    // Only allow delete before the last letter, no selection
    if (e.key === "Delete" && e.target.selectionStart === passwordField.value.length) return

    // Update mask with delay
    setTimeout(() => maskPassword(e.target.value.length), 1)
  })

  // passwordField.addEventListener("keypress", console.log)

  // Handle password visibility
  let passwordVisible = false
  let currentTimeout
  const visibilityStateButtons = {
    true: document.getElementById("show-password"),
    false: document.getElementById("hide-password"),
  }

  const handlePasswordVisibility = newVisibility => {
    passwordVisible = newVisibility
    // Handle which icon to show
    visibilityStateButtons[passwordVisible].style.display = "none"
    visibilityStateButtons[!passwordVisible].style.display = "block"
    // Show/hide password
    if (!passwordVisible) return maskPassword(passwordField.value.length)
    maskField.value = passwordField.value
    clearTimeout(currentTimeout)
    currentTimeout = setTimeout(() => handlePasswordVisibility(false), 5000)
  }

  visibilityStateButtons[true].addEventListener("click", () =>
    handlePasswordVisibility(!passwordVisible)
  )
  visibilityStateButtons[false].addEventListener("click", () =>
    handlePasswordVisibility(!passwordVisible)
  )
}
