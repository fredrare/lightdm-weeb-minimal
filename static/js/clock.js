const spanMonth = document.getElementById("month")
const spanDay = document.getElementById("day")
const spanWeekday = document.getElementById("weekday")
const spanHours = document.getElementById("hours")
const spanMinutes = document.getElementById("minutes")
const spanSeconds = document.getElementById("seconds")

const weekdays = ['日', '月', '火', '水', '木', '金', '土']

const updateTime = () => {
  const now = new Date()
  const month = now.getMonth() + 1
  const day = now.getDate()
  const weekday = now.getDay()
  const hours = now.getHours().toString().padStart(2, "0")
  const minutes = now.getMinutes().toString().padStart(2, "0")
  const seconds = now.getSeconds().toString().padStart(2, "0")
  spanMonth.textContent = `${month}月`
  spanDay.textContent = `${day}日`
  spanWeekday.textContent = weekdays[weekday % 7]
  spanHours.textContent = hours
  spanMinutes.textContent = minutes
  spanSeconds.textContent = seconds
}

setInterval(updateTime, 100)
