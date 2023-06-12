let currentUserIndex = 0
let selectedUser = null
let password = null
const userField = document.getElementById("name")
const passwordField = document.getElementById("login-password")
const loginPicture = document.getElementById("login-picture")
const nextButton = document.getElementById("next")
const lastButton = document.getElementById("last")
const usernameToIndex =
  lightdm.users?.reduce((acc, { name }, index) => ({ ...acc, [name]: index }), {}) || {}

const show_error = error => console.error(error)

const showMessage = msg => {
  document.getElementById("login-response").innerHTML = msg
}

const setupUserList = () => {
  lightdm.users?.forEach(user => {
    const userOption = document.createElement("option")
    userOption.setAttribute("value", user.username)
    userOption.innerText = user.display_name
    userField.appendChild(userOption)
  })
  if (userField.childElementCount > 1) return
  nextButton.style.visibility = "hidden"
  lastButton.style.visibility = "hidden"
}

// Selection by GUI
const selectUserFromList = ({ userIndex = 0, err, fromKeyboard }) => {
  if (!err) displayUserPicture(userIndex)
  if (lightdm.authentication_user) lightdm.cancel_authentication()
  startAuthentication(lightdm.users[userIndex]?.username)
  if (fromKeyboard) return
  userField.value = lightdm.users[userIndex]?.username
  passwordField.focus()
}

// Selection by tabs
userField.addEventListener("change", e => {
  const userIndex = usernameToIndex[e.target.value]
  selectUserFromList({ userIndex, fromKeyboard: true })
})

const startAuthentication = username => {
  lightdm.cancel_autologin()
  selectedUser = username
  lightdm.authenticate(username)
  showMessage("&nbsp")
}

const authenticationComplete = () => {
  if (lightdm.is_authenticated)
    lightdm.start_session(
      lightdm.users[currentUserIndex]?.session || lightdm.default_session?.name || "gnome"
    )
  else {
    selectUserFromList({ userIndex: currentUserIndex, err: true })
    showMessage("Wrong password!")
  }
}

const displayUserPicture = userIndex =>
  loginPicture.setAttribute("src", lightdm.users[userIndex]?.image)

const provideSecret = () => {
  if (passwordField.value !== null) lightdm.respond(passwordField.value)
}

// Start the greeter
lightdm.authentication_complete.connect(authenticationComplete)
setupUserList()
selectUserFromList({ userIndex: 0 })
showMessage("&nbsp")
lastButton.addEventListener("click", () => {
  currentUserIndex--
  if (currentUserIndex < 0) currentUserIndex = userField.childElementCount - 1
  if (userField.childElementCount != 1) selectUserFromList({ userIndex: currentUserIndex })
  showMessage("&nbsp")
})

nextButton.addEventListener("click", () => {
  currentUserIndex++
  if (currentUserIndex >= userField.childElementCount) currentUserIndex = 0
  if (userField.childElementCount != 1) selectUserFromList({ userIndex: currentUserIndex })
  showMessage("&nbsp")
})
