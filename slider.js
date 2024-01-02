let currentSlide = 1;

function showSlide(slideIndex) {
    const slides = document.querySelectorAll('.slide');
    const buttons = document.querySelectorAll('.button');

    slides.forEach(slide => slide.style.display = 'none');
    buttons.forEach(button => button.classList.remove('active'));

    const currentSlideElement = document.getElementById(`slide${slideIndex}`);
    currentSlideElement.style.display = 'block';
    buttons[slideIndex - 1].classList.add('active');
}

function changeSlide(index) {
    currentSlide = index;
    showSlide(currentSlide);
}

function nextSlide() {
    currentSlide = currentSlide % 2 + 1;
    showSlide(currentSlide);
}

showSlide(currentSlide);
setInterval(nextSlide, 7000);




