document.addEventListener("DOMContentLoaded", () => {
  const serviceItems = document.querySelectorAll(".service-item")
  const selectedDate = document.querySelector(".selected-date")
  const calendarContainer = document.querySelector(".calendar-container")
  const calendarDays = document.querySelector(".days")
  const currentMonthElement = document.querySelector(".current-month")
  const prevMonthButton = document.querySelector(".prev-month")
  const nextMonthButton = document.querySelector(".next-month")
  const prevYearButton = document.querySelector(".prev-year")
  const nextYearButton = document.querySelector(".next-year")
  const todayButton = document.querySelector(".today")
  const selectedTime = document.querySelector(".selected-time")
  const timeOptions = document.querySelector(".time-options")
  const timeOptionElements = document.querySelectorAll(".time-option")
  const submitButton = document.querySelector(".submit-button")
  const successMessage = document.querySelector(".success-message")
  const closeSuccessButton = document.querySelector(".close-success")
  const scheduleButton = document.querySelector(".schedule-button")
  const servicesList = document.getElementById("services-list")

  let currentDate = new Date()
  let selectedDateValue = null
  let selectedTimeValue = null
  let selectedServiceValue = null

  const urlParams = new URLSearchParams(window.location.search)
  const doctorCategory = urlParams.get("category") || "medic"
  const doctorName = urlParams.get("name") || "Doctor"
  const doctorSpecialty = urlParams.get("specialty") || "Specialist"
  const doctorClinic = urlParams.get("clinic") || "Clinica"

  document.getElementById("doctor-name").textContent = doctorName
  document.getElementById("doctor-specialty").textContent = doctorSpecialty

  loadProfessionServices(doctorCategory)

  updateCalendar(currentDate)

  function loadProfessionServices(category) {
    let services = []

    switch (category) {
      case "medic":
        services = [
          "Consultație generală",
          "Control periodic",
          "Eliberare rețetă",
          "Eliberare adeverință medicală",
          "Interpretare analize",
        ]
        break
      case "dentist":
        services = [
          "Consultație stomatologică",
          "Detartraj și periaj profesional",
          "Tratament carie",
          "Extracție dentară",
          "Albire dentară",
        ]
        break
      case "psiholog":
        services = [
          "Ședință terapie individuală",
          "Evaluare psihologică",
          "Consiliere psihologică",
          "Terapie de cuplu",
          "Terapie de grup",
        ]
        break
      case "fitness":
        services = [
          "Antrenament personal",
          "Evaluare fizică",
          "Program personalizat",
          "Antrenament de grup",
          "Consultanță nutrițională",
        ]
        break
      case "nutritionist":
        services = [
          "Consultație nutrițională",
          "Plan alimentar personalizat",
          "Monitorizare progres",
          "Analiză compoziție corporală",
          "Consiliere pentru afecțiuni specifice",
        ]
        break
      default:
        services = [
          "Consultație generală",
          "Programare control",
          "Evaluare stare de sănătate",
          "Consiliere specializată",
          "Monitorizare tratament",
        ]
    }

    servicesList.innerHTML = ""

    services.forEach((service) => {
      const serviceItem = document.createElement("div")
      serviceItem.className = "service-item"
      serviceItem.innerHTML = `<span class="service-name">${service}</span>`
      servicesList.appendChild(serviceItem)

      serviceItem.addEventListener("click", function () {
        document.querySelectorAll(".service-item").forEach((item) => item.classList.remove("active"))

        this.classList.add("active")

        selectedServiceValue = this.querySelector(".service-name").textContent
      })
    })

    if (servicesList.children.length > 0) {
      servicesList.children[0].classList.add("active")
      selectedServiceValue = services[0]
    }
  }

  serviceItems.forEach((item) => {
    item.addEventListener("click", function () {
      serviceItems.forEach((i) => i.classList.remove("active"))

      this.classList.add("active")

      // Store selected service
      selectedServiceValue = this.querySelector(".service-name").textContent
    })
  })

  // Date selection
  selectedDate.addEventListener("click", () => {
    calendarContainer.classList.toggle("active")
    timeOptions.classList.remove("active") // Close time options if open
  })

  // Calendar navigation
  prevMonthButton.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() - 1)
    updateCalendar(currentDate)
  })

  nextMonthButton.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() + 1)
    updateCalendar(currentDate)
  })

  prevYearButton.addEventListener("click", () => {
    currentDate.setFullYear(currentDate.getFullYear() - 1)
    updateCalendar(currentDate)
  })

  nextYearButton.addEventListener("click", () => {
    currentDate.setFullYear(currentDate.getFullYear() + 1)
    updateCalendar(currentDate)
  })

  todayButton.addEventListener("click", () => {
    currentDate = new Date()
    updateCalendar(currentDate)
  })

  // Time selection
  selectedTime.addEventListener("click", () => {
    timeOptions.classList.toggle("active")
    calendarContainer.classList.remove("active") // Close calendar if open
  })

  timeOptionElements.forEach((option) => {
    option.addEventListener("click", function () {
      // Remove selected class from all options
      timeOptionElements.forEach((o) => o.classList.remove("selected"))

      // Add selected class to clicked option
      this.classList.add("selected")

      // Update selected time text and store value
      selectedTimeValue = this.textContent
      selectedTime.textContent = selectedTimeValue

      // Close time options
      timeOptions.classList.remove("active")
    })
  })

  // Submit appointment
  submitButton.addEventListener("click", () => {
    if (selectedDateValue && selectedTimeValue && selectedServiceValue) {
      // Show success message
      successMessage.classList.add("active")

      // Add animation class for smooth appearance
      successMessage.querySelector(".success-content").classList.add("animate-in")
    } else {
      alert("Te rugăm să selectezi un serviciu, o dată și o oră pentru programare.")
    }
  })

  // Close success message
  closeSuccessButton.addEventListener("click", () => {
    // Add animation class for smooth exit
    successMessage.querySelector(".success-content").classList.add("animate-out")

    // Wait for animation to complete before hiding
    setTimeout(() => {
      successMessage.classList.remove("active")
      successMessage.querySelector(".success-content").classList.remove("animate-in", "animate-out")

      // Reset form
      selectedDate.textContent = "Selectează o dată"
      selectedTime.textContent = "Selectează o oră"
      selectedDateValue = null
      selectedTimeValue = null

      // Remove selected class from time options
      timeOptionElements.forEach((o) => o.classList.remove("selected"))
    }, 300)
  })

  // Schedule button
  scheduleButton.addEventListener("click", () => {
    if (selectedDateValue && selectedTimeValue && selectedServiceValue) {
      // Show success message
      successMessage.classList.add("active")
      successMessage.querySelector(".success-content").classList.add("animate-in")
    } else {
      alert("Te rugăm să selectezi un serviciu, o dată și o oră pentru programare.")
    }
  })

  // Close dropdowns when clicking outside
  document.addEventListener("click", (event) => {
    if (!event.target.closest(".date-selector") && !calendarContainer.contains(event.target)) {
      calendarContainer.classList.remove("active")
    }

    if (!event.target.closest(".time-selector") && !timeOptions.contains(event.target)) {
      timeOptions.classList.remove("active")
    }
  })

  // Calendar functions
  function updateCalendar(date) {
    const year = date.getFullYear()
    const month = date.getMonth()

    // Update month and year display
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ]
    currentMonthElement.textContent = `${monthNames[month]} ${year}`

    // Clear previous days
    calendarDays.innerHTML = ""

    // Get first day of month and last day of month
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)

    // Get day of week for first day (0 = Sunday, 6 = Saturday)
    const firstDayIndex = firstDay.getDay()

    // Get total days in month
    const totalDays = lastDay.getDate()

    // Get today's date for highlighting
    const today = new Date()

    // Add days from previous month
    const prevMonthLastDay = new Date(year, month, 0).getDate()
    for (let i = firstDayIndex - 1; i >= 0; i--) {
      const dayElement = document.createElement("div")
      dayElement.classList.add("day", "inactive")
      dayElement.textContent = prevMonthLastDay - i
      calendarDays.appendChild(dayElement)
    }

    // Add days for current month
    for (let i = 1; i <= totalDays; i++) {
      const dayElement = document.createElement("div")
      dayElement.classList.add("day")
      dayElement.textContent = i

      // Check if this day is today
      if (year === today.getFullYear() && month === today.getMonth() && i === today.getDate()) {
        dayElement.classList.add("today")
      }

      // Add click event to select date
      dayElement.addEventListener("click", function () {
        // Remove selected class from all days
        document.querySelectorAll(".day").forEach((day) => day.classList.remove("selected"))

        // Add selected class to clicked day
        this.classList.add("selected")

        // Update selected date text and store value
        const selectedDay = this.textContent
        const selectedMonth = month + 1 // Month is 0-indexed
        selectedDateValue = `${selectedDay}/${selectedMonth}/${year}`
        selectedDate.textContent = selectedDateValue

        // Close calendar
        calendarContainer.classList.remove("active")
      })

      calendarDays.appendChild(dayElement)
    }

    // Add days from next month to fill the grid
    const totalCells = 42 // 6 rows of 7 days
    const remainingCells = totalCells - (firstDayIndex + totalDays)

    for (let i = 1; i <= remainingCells; i++) {
      const dayElement = document.createElement("div")
      dayElement.classList.add("day", "inactive")
      dayElement.textContent = i
      calendarDays.appendChild(dayElement)
    }
  }
})

