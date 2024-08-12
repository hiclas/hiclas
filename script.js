let slideIndex = 0;
showSlides(slideIndex);

function changeSlide(n) {
    showSlides(slideIndex += n);
}

function showSlides(n) {
    let slides = document.querySelectorAll('.carousel-images img');
    if (n >= slides.length) { slideIndex = 0 }
    if (n < 0) { slideIndex = slides.length - 1 }
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = 'none';
    }
    slides[slideIndex].style.display = 'block';
}

// Modal for enlarging image
let modal = document.getElementById("modal");
let modalImg = document.getElementById("modal-image");
let captionText = document.getElementById("caption");

document.querySelectorAll('.photo-item img, .carousel-images img').forEach(img => {
    img.addEventListener('click', function() {
        modal.style.display = "block";
        modalImg.src = this.src;
        captionText.innerHTML = this.alt;
    });
});

function closeModal() {
    modal.style.display = "none";
}

document.querySelector(".close").onclick = function() {
    modal.style.display = "none";
}
