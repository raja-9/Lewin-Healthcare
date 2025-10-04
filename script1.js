let currentIndex = 0;
let slides = [];
let totalSlides = 0;

const doctorSlides = {
    "Dr Anuradha ": [
        "ferro2.jpg",
        "ferro3.jpg",
        "rara2.jpg"
    ],
    "Dr C.A.A.Jose": [
        "chen1.jpg",
        "chen2.jpg"
    ],
    "Dr.Vasantha jose ": [
        "emily1.jpg",
        "emily2.jpg",
        "emily3.jpg",
        "emily4.jpg"
    ]
};

// Show slideshow for selected doctor
function showSlideshow(doctorName) {
    document.getElementById("homePage").style.display = "none";
    document.getElementById("slideshowPage").style.display = "block";
    document.getElementById("selectedDoctor").textContent = doctorName;

    history.pushState({ page: "slideshow" }, "", "#slideshow");


    const slideshowContainer = document.getElementById("slidesContainer");
    slideshowContainer.innerHTML = ""; // clear old slides

    // Get doctor-specific images
    const images = doctorSlides[doctorName] || [];
    totalSlides = images.length;

    // Create slides dynamically
    if (images.length > 0) {
        images.forEach((imgSrc, index) => {
            const slideDiv = document.createElement("div");
            slideDiv.classList.add("slide");
            if (index === 0) slideDiv.classList.add("active");

            const imgTag = document.createElement("img");
            imgTag.src = imgSrc;
            imgTag.alt = `Medicine ${index + 1}`;
            slideDiv.appendChild(imgTag);
            slideshowContainer.appendChild(slideDiv);
        });
    } else {
        // Fallback if no images found
        const placeholder = document.createElement("div");
        placeholder.classList.add("slide", "active");
        placeholder.innerHTML = `<div class="placeholder-img">No images available for this doctor</div>`;
        slideshowContainer.appendChild(placeholder);
        totalSlides = 1;
    }

    slides = document.querySelectorAll(".slide");
    currentIndex = 0;
    updateSlideshow();
}

function goBack() {
    document.getElementById("homePage").style.display = "block";
    document.getElementById("slideshowPage").style.display = "none";
}

function updateSlideshow() {
    slides.forEach((slide, index) => {
        slide.classList.remove("active");
        if (index === currentIndex) slide.classList.add("active");
    });

    document.getElementById("currentSlide").textContent = currentIndex + 1;
    document.getElementById("totalSlides").textContent = totalSlides;

    document.querySelector(".nav-btn:first-child").disabled = currentIndex === 0;
    document.querySelector(".nav-btn:last-child").disabled = currentIndex === totalSlides - 1;
}

function nextSlide() {
    if (currentIndex < totalSlides - 1) {
        currentIndex++;
        updateSlideshow();
    }
}

function prevSlide() {
    if (currentIndex > 0) {
        currentIndex--;
        updateSlideshow();
    }
}

// Keyboard navigation
document.addEventListener("keydown", (e) => {
    if (document.getElementById("slideshowPage").style.display === "block") {
        if (e.key === "ArrowRight") nextSlide();
        if (e.key === "ArrowLeft") prevSlide();
        if (e.key === "Escape") goBack();
    }
});

// Touch swipe support
let touchStartX = 0;
let touchEndX = 0;

document.querySelector(".slideshow-container").addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

document.querySelector(".slideshow-container").addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    if (touchEndX < touchStartX - 50) nextSlide();
    if (touchEndX > touchStartX + 50) prevSlide();
}
// Handle browser/tablet BACK button navigation
window.addEventListener("popstate", (event) => {
    // If slideshow is currently shown → go back to home page
    if (document.getElementById("slideshowPage").style.display === "block") {
        goBack();
    }
});
