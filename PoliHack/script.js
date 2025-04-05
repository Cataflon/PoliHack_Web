document.addEventListener("DOMContentLoaded", () => {
  const scrollButton = document.getElementById("scrollButton")
  const servicesSection = document.getElementById("services")
  const servicesGrid = document.querySelector(".services-grid")
  const serviceItems = document.querySelectorAll(".service-item")
  const serviceCards = document.querySelectorAll(".service-card")
  const profileButton = document.getElementById("profileButton")
  const registrationModal = document.getElementById("registrationModal")
  const toggleOptions = document.querySelectorAll(".toggle-option")
  const toggleSlider = document.querySelector(".toggle-slider")
  const slides = document.querySelectorAll(".slide")
  const dots = document.querySelectorAll(".dot")
  const createAccountBtn = document.querySelector(".create-account-btn")
  const categoryDetail = document.getElementById("category-detail")
  const closeCategory = document.querySelector(".close-category")
  const overlay = document.querySelector(".overlay")
  const categoryTabs = document.querySelectorAll(".category-tab")
  const backButton = document.querySelector(".back-button")
  const doctorCards = document.querySelectorAll(".doctor-card")
  const searchInput = document.querySelector(".search-input")
  const searchDropdown = document.querySelector(".search-dropdown")
  const searchResults = document.querySelectorAll(".search-result")

  if (scrollButton) {
    scrollButton.addEventListener("click", () => {
      servicesSection.scrollIntoView({ behavior: "smooth" })
    })
  }

  if (servicesSection && servicesGrid) {
    const servicesObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          servicesGrid.classList.add("visible")

          serviceItems.forEach((item, index) => {
            setTimeout(() => {
              item.classList.add("visible")
            }, 200 * index) 
          })

          servicesObserver.disconnect()
        }
      },
      {
        threshold: 0.1, 
      },
    )

    servicesObserver.observe(servicesSection)
  }

  serviceCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      const color = this.getAttribute("data-color")
      this.style.backgroundColor = color
      this.style.color = "white"
    })

    card.addEventListener("mouseleave", function () {
      this.style.backgroundColor = "#f3f4f6" // Reset to default gray
      this.style.color = ""
    })
  })

  const searchForm = document.querySelector(".search-form")
  if (searchForm) {
    searchForm.addEventListener("submit", function (e) {
      e.preventDefault()
      const searchInput = this.querySelector(".search-input")
      console.log("Search query:", searchInput.value)
    })
  }

  if (searchInput && searchDropdown) {
    searchInput.addEventListener("focus", () => {
      searchDropdown.classList.add("active")
    })

    searchInput.addEventListener("blur", (e) => {
      setTimeout(() => {
        searchDropdown.classList.remove("active")
      }, 200)
    })
  }

  if (searchResults) {
    searchResults.forEach((result) => {
      result.addEventListener("click", function () {
        const doctorName = this.querySelector(".search-result-name").textContent
        const specialty = this.querySelector(".search-result-specialty").textContent
        console.log(`Selected doctor: ${doctorName}, Specialty: ${specialty}`)

        let category = "medic"
        if (specialty.toLowerCase().includes("dentist")) {
          category = "dentist"
        } else if (specialty.toLowerCase().includes("psiholog")) {
          category = "psiholog"
        } else if (specialty.toLowerCase().includes("fitness") || specialty.toLowerCase().includes("antrenor")) {
          category = "fitness"
        } else if (specialty.toLowerCase().includes("nutriti")) {
          category = "nutritionist"
        }

        window.location.href = `appointment.html?name=${encodeURIComponent(doctorName)}&specialty=${encodeURIComponent(specialty)}&clinic=Clinica&category=${category}`
      })
    })
  }

  const newsletterForm = document.querySelector(".newsletter-form")
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault()
      const emailInput = this.querySelector(".newsletter-input")
      console.log("Newsletter subscription:", emailInput.value)
      emailInput.value = ""
      alert("Thank you for subscribing to our newsletter!")
    })
  }

  if (profileButton && registrationModal) {
    profileButton.addEventListener("click", (e) => {
      e.preventDefault()
      registrationModal.classList.add("active")
    })

    registrationModal.addEventListener("click", (e) => {
      if (e.target === registrationModal) {
        registrationModal.classList.remove("active")
      }
    })

    const closeModal = document.querySelector(".close-modal")
    if (closeModal) {
      closeModal.addEventListener("click", () => {
        registrationModal.classList.remove("active")
      })
    }
  }

  // Toggle switch functionality
  if (toggleOptions && toggleSlider) {
    toggleOptions.forEach((option) => {
      option.addEventListener("click", function () {
        const role = this.getAttribute("data-role")

        // Update active class
        toggleOptions.forEach((opt) => opt.classList.remove("active"))
        this.classList.add("active")

        // Move slider
        if (role === "doctor") {
          toggleSlider.classList.add("doctor")
        } else {
          toggleSlider.classList.remove("doctor")
        }
      })
    })
  }

  // Slideshow functionality
  if (slides.length > 0) {
    let currentSlide = 0
    const slideCount = slides.length

    function showSlide(index) {
      // Hide all slides
      slides.forEach((slide) => slide.classList.remove("active"))
      if (dots) {
        dots.forEach((dot) => dot.classList.remove("active"))
      }

      // Show selected slide
      slides[index].classList.add("active")
      if (dots && dots[index]) {
        dots[index].classList.add("active")
      }

      currentSlide = index
    }

    // Auto-advance slideshow
    let slideshowInterval = setInterval(() => {
      const nextSlide = (currentSlide + 1) % slideCount
      showSlide(nextSlide)
    }, 5000)

    // Click on dots to change slide
    if (dots) {
      dots.forEach((dot) => {
        dot.addEventListener("click", function () {
          clearInterval(slideshowInterval)
          const index = Number.parseInt(this.getAttribute("data-index"))
          showSlide(index)

          // Restart auto-advance
          slideshowInterval = setInterval(() => {
            const nextSlide = (currentSlide + 1) % slideCount
            showSlide(nextSlide)
          }, 5000)
        })
      })
    }
  }

  // Create account button animation
  if (createAccountBtn) {
    createAccountBtn.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-5px)"
      this.style.boxShadow = "0 8px 15px rgba(93, 208, 184, 0.3)"
    })

    createAccountBtn.addEventListener("mouseleave", function () {
      this.style.transform = ""
      this.style.boxShadow = ""
    })
  }

  // Service item click - updated to match requirements
  serviceItems.forEach((item) => {
    item.addEventListener("click", function () {
      const category = this.getAttribute("data-category")
      const color = this.getAttribute("data-color")

      // Update category title and color
      document.querySelector(".category-title").textContent = this.querySelector(".service-title").textContent
      document.querySelector(".category-icon").style.backgroundColor = color

      // Show category detail
      categoryDetail.classList.add("active")

      // Animate category tabs with delay
      categoryTabs.forEach((tab, index) => {
        setTimeout(() => {
          tab.classList.add("active")
        }, 100 * index)
      })

      // Darken the background
      servicesSection.classList.add("dimmed")
      overlay.classList.add("active")
    })
  })

  // Category tab click
  categoryTabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      const category = this.getAttribute("data-category")
      const color = this.querySelector(".category-tab-icon").style.backgroundColor

      // Update category title and color
      document.querySelector(".category-title").textContent = this.querySelector(".category-tab-name").textContent
      document.querySelector(".category-icon").style.backgroundColor = color

      console.log(`Switched to category: ${category}`)
    })
  })

  // Category detail section
  if (categoryDetail && closeCategory && overlay) {
    // Close category detail
    closeCategory.addEventListener("click", () => {
      closeCategoryDetail()
    })

    // Back button click
    if (backButton) {
      backButton.addEventListener("click", () => {
        closeCategoryDetail()
      })
    }

    // Close when clicking overlay
    overlay.addEventListener("click", () => {
      closeCategoryDetail()
    })

    function closeCategoryDetail() {
      // Reset category tabs animation
      if (categoryTabs) {
        categoryTabs.forEach((tab) => {
          tab.classList.remove("active")
        })
      }

      // Hide category detail with delay
      setTimeout(() => {
        categoryDetail.classList.remove("active")
      }, 300)

      overlay.classList.remove("active")
      if (servicesSection) {
        servicesSection.classList.remove("dimmed")
      }
    }
  }

  // Make doctor cards clickable
  doctorCards.forEach((card) => {
    card.addEventListener("click", function () {
      const doctorName = this.querySelector(".doctor-name").textContent
      console.log("Selected doctor:", doctorName)
      // Here you would normally navigate to the doctor's profile
    })
  })

  // Doctor Help Button Animation
  const doctorHelpButton = document.querySelector(".doctor-help-button")
  if (doctorHelpButton) {
    doctorHelpButton.addEventListener("mouseenter", function () {
      const questionMarks = this.querySelectorAll(".question-mark")
      questionMarks.forEach((mark, index) => {
        mark.style.opacity = "1"
        mark.style.animation = `float-question ${1.5 + index * 0.2}s ease-in-out infinite ${index * 0.2}s`
      })
    })

    doctorHelpButton.addEventListener("mouseleave", function () {
      const questionMarks = this.querySelectorAll(".question-mark")
      questionMarks.forEach((mark) => {
        mark.style.opacity = "0"
        mark.style.animation = ""
      })
    })

    // Add click event to open the form modal
    doctorHelpButton.addEventListener("click", () => {
      openDoctorHelpModal()
    })
  }

  // Doctor Help Modal Functions
  function openDoctorHelpModal() {
    // Create modal container
    const modalContainer = document.createElement("div")
    modalContainer.className = "doctor-help-modal"

    // Create modal content
    modalContainer.innerHTML = `
      <div class="doctor-help-modal-content">
        <div class="doctor-help-modal-header">
          <div class="doctor-help-modal-icon">+</div>
          <h2>Ce se întâmplă, doctore?</h2>
        </div>
        <p class="doctor-help-modal-subtitle">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
        
        <div class="doctor-help-modal-form">
          <div class="form-group">
            <label for="doctor-message">Mesaj</label>
            <textarea id="doctor-message" placeholder="Scrie mesajul aici..."></textarea>
          </div>
          
          <div class="form-group">
            <label>Incarca fotografii (optional)</label>
            <div class="file-upload-area">
              <div class="file-upload-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="17 8 12 3 7 8"></polyline>
                  <line x1="12" y1="3" x2="12" y2="15"></line>
                </svg>
              </div>
              <p class="file-upload-text">Incarca fisiere de pe dispozitiv</p>
              <input type="file" id="doctor-files" multiple class="file-upload-input">
            </div>
          </div>
        </div>
        
        <button class="doctor-help-modal-submit">Trimite</button>
        <button class="doctor-help-modal-close">&times;</button>
      </div>
    `

    // Add modal to body
    document.body.appendChild(modalContainer)

    // Add event listener to close button
    const closeButton = modalContainer.querySelector(".doctor-help-modal-close")
    closeButton.addEventListener("click", () => {
      document.body.removeChild(modalContainer)
    })

    // Add event listener to submit button
    const submitButton = modalContainer.querySelector(".doctor-help-modal-submit")
    submitButton.addEventListener("click", () => {
      const message = document.getElementById("doctor-message").value
      const files = document.getElementById("doctor-files").files

      console.log("Message:", message)
      console.log("Files:", files)

      // Here you would normally send the data to a server
      alert("Mesajul a fost trimis!")
      document.body.removeChild(modalContainer)
    })

    // Close modal when clicking outside
    modalContainer.addEventListener("click", (e) => {
      if (e.target === modalContainer) {
        document.body.removeChild(modalContainer)
      }
    })
  }

  // Handle registration form submission
  const registerForm = document.querySelector(".register-form")
  if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
      e.preventDefault()
      const nume = document.getElementById("nume").value
      const prenume = document.getElementById("prenume").value
      const email = document.getElementById("email").value

      alert(`Contul a fost creat cu succes pentru ${nume} ${prenume}!`)
      registrationModal.classList.remove("active")
    })
  }
})

