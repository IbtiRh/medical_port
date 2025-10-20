// Smooth scroll for navigation links
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault()
    const targetId = this.getAttribute("href")
    const targetSection = document.querySelector(targetId)

    if (targetSection) {
      targetSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Navbar scroll effect
let lastScroll = 0
const navbar = document.querySelector(".navbar")

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset

  if (currentScroll > 100) {
    navbar.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.15)"
  } else {
    navbar.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)"
  }

  lastScroll = currentScroll
})

// Testimonials Carousel
const testimonialCards = document.querySelectorAll(".testimonial-card")
const prevBtn = document.querySelector(".prev-btn")
const nextBtn = document.querySelector(".next-btn")
const dotsContainer = document.querySelector(".carousel-dots")

let currentTestimonial = 0

// Create dots
testimonialCards.forEach((_, index) => {
  const dot = document.createElement("div")
  dot.classList.add("dot")
  if (index === 0) dot.classList.add("active")
  dot.addEventListener("click", () => goToTestimonial(index))
  dotsContainer.appendChild(dot)
})

const dots = document.querySelectorAll(".dot")

function showTestimonial(index) {
  testimonialCards.forEach((card) => card.classList.remove("active"))
  dots.forEach((dot) => dot.classList.remove("active"))

  testimonialCards[index].classList.add("active")
  dots[index].classList.add("active")
}

function goToTestimonial(index) {
  currentTestimonial = index
  showTestimonial(currentTestimonial)
}

function nextTestimonial() {
  currentTestimonial = (currentTestimonial + 1) % testimonialCards.length
  showTestimonial(currentTestimonial)
}

function prevTestimonial() {
  currentTestimonial = (currentTestimonial - 1 + testimonialCards.length) % testimonialCards.length
  showTestimonial(currentTestimonial)
}

nextBtn.addEventListener("click", nextTestimonial)
prevBtn.addEventListener("click", prevTestimonial)

// Auto-advance testimonials
setInterval(nextTestimonial, 5000)

// Form Validation
const appointmentForm = document.getElementById("appointmentForm")
const successMessage = document.getElementById("successMessage")

appointmentForm.addEventListener("submit", (e) => {
  e.preventDefault()

  let isValid = true

  // Clear previous errors
  document.querySelectorAll(".form-group").forEach((group) => {
    group.classList.remove("error")
  })

  // Name validation
  const nameInput = document.getElementById("name")
  if (nameInput.value.trim().length < 2) {
    showError(nameInput, "Please enter a valid name")
    isValid = false
  }

  // Email validation
  const emailInput = document.getElementById("email")
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(emailInput.value)) {
    showError(emailInput, "Please enter a valid email address")
    isValid = false
  }

  // Phone validation
  const phoneInput = document.getElementById("phone")
  const phoneRegex = /^[\d\s\-+$$$$]{10,}$/
  if (!phoneRegex.test(phoneInput.value)) {
    showError(phoneInput, "Please enter a valid phone number")
    isValid = false
  }

  // Service validation
  const serviceInput = document.getElementById("service")
  if (serviceInput.value === "") {
    showError(serviceInput, "Please select a service")
    isValid = false
  }

  if (isValid) {
    // Hide form and show success message
    appointmentForm.style.display = "none"
    successMessage.classList.add("show")

    // Reset form
    appointmentForm.reset()

    // Show form again after 5 seconds
    setTimeout(() => {
      appointmentForm.style.display = "block"
      successMessage.classList.remove("show")
    }, 5000)
  }
})

function showError(input, message) {
  const formGroup = input.closest(".form-group")
  formGroup.classList.add("error")
  const errorMessage = formGroup.querySelector(".error-message")
  errorMessage.textContent = message
}

// Clear error on input
document.querySelectorAll(".form-group input, .form-group select").forEach((input) => {
  input.addEventListener("input", function () {
    const formGroup = this.closest(".form-group")
    formGroup.classList.remove("error")
  })
})

// Scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1"
      entry.target.style.transform = "translateY(0)"
    }
  })
}, observerOptions)

// Observe all sections and cards
document.querySelectorAll("section, .service-card, .article-card, .expertise-card").forEach((el) => {
  el.style.opacity = "0"
  el.style.transform = "translateY(30px)"
  el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
  observer.observe(el)
})

// Mobile menu toggle (basic implementation)
const mobileMenuToggle = document.querySelector(".mobile-menu-toggle")
const navMenu = document.querySelector(".nav-menu")

mobileMenuToggle.addEventListener("click", () => {
  navMenu.style.display = navMenu.style.display === "flex" ? "none" : "flex"

  if (navMenu.style.display === "flex") {
    navMenu.style.position = "absolute"
    navMenu.style.top = "100%"
    navMenu.style.left = "0"
    navMenu.style.right = "0"
    navMenu.style.backgroundColor = "white"
    navMenu.style.flexDirection = "column"
    navMenu.style.padding = "1rem"
    navMenu.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)"
  }
})
