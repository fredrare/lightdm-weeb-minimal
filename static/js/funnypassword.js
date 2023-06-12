{
  // Manage scoped reusable variables
  const passwordField = document.getElementById("login-password")
  const maskField = document.getElementById("password-mask")

  // Handle password mask
  const maskPassword = () => {
    const minCharCode = 33
    const maxCharCode = 126
    let mask = ""
    for (let i = 0; i < passwordField.value.length; i++) {
      const charCode = Math.floor(Math.random() * (maxCharCode - minCharCode + 1) + minCharCode)
      mask += String.fromCharCode(charCode)
    }
    maskField.value = mask
  }

  document.getElementById("login-password").addEventListener("keyup", maskPassword)
  document.getElementById("login-password").addEventListener("keydown", maskPassword)

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
    if (!passwordVisible) return maskPassword()
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
