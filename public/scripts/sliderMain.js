// let currentSlide = 1;

// function showSlide(slideIndex) {
//     const slider = document.querySelector('.slider-container');
//     const slides = slider.querySelectorAll('li');
//     const buttons = document.querySelectorAll('.button');

//     slides.forEach(slide => slide.style.display = 'none');
//     buttons.forEach(button => button.classList.remove('active'));

//     const currentSlideElement = document.getElementById(`slide${slideIndex}`);
//     currentSlideElement.style.display = 'block';
//     buttons[slideIndex - 1].classList.add('active');
// }

// function changeSlide(index) {
//     currentSlide = index;
//     showSlide(currentSlide);
// }

// function nextSlide() {
//     currentSlide = currentSlide % 2 + 1;
//     showSlide(currentSlide);
// }

// showSlide(currentSlide);
// setInterval(nextSlide, 7000);


    


let activeSlide = 0;

function showSlide(slideIndex){
    const slider = document.querySelector('.slider');
    const slides = slider.querySelectorAll('li');
    const buttons = document.querySelectorAll('.button');

    buttons.forEach(button => button.classList.remove('active'));

    const slideCount = 2;
    slides[slideIndex].classList.remove('active');
    slides[slideIndex].classList.add('inactive');
    slideIndex++;
    if (slideIndex === slideCount) {
        slideIndex = 0;
    }
    slides[slideIndex].classList.remove('inactive');
    slides[slideIndex].classList.add('active');
    buttons[slideIndex].classList.add('active');
}

function changeSlide(index) {
    activeSlide = index;
    showSlide(activeSlide);
}

function nextSlide() {
    activeSlide = (activeSlide === 0) ? 1 : 0;
    showSlide(activeSlide);
}

showSlide(activeSlide);
setInterval(nextSlide, 13500);