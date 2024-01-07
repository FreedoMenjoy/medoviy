let offset_s2 = 0;
let nowSlide_s2 = 1;

setDot_s2()

const sliderLine_s2 = document.querySelector('.slider2-line');

document.getElementById('next_s2').addEventListener('click', function(){
  offset_s2 += 700;
  nowSlide_s2 += 1;
    if (offset_s2 > 2800) {
      offset_s2 = 0;
      nowSlide_s2 = 1;
    }
    sliderLine_s2.style.left = -offset_s2 + 'px';
    setDot_s2()
});

document.getElementById('prev_s2').addEventListener('click', function () {
  offset_s2 -= 700;
  nowSlide_s2 += -1;
    if (offset_s2 < 0) {
      offset_s2 = 2800;
      nowSlide_s2 = 5;
    }
    sliderLine_s2.style.left = -offset_s2 + 'px';
    setDot_s2()
});

function moveToSlide_s2(slide){
  offset_s2 = (slide-1) * 700
  sliderLine_s2.style.left = -offset_s2 + 'px';
  nowSlide_s2 = slide
  setDot_s2()
}

function setDot_s2(){
  const dots = document.querySelectorAll(".dot_s2")
  dots.forEach(dot => { dot.classList.remove("active"); });
  dots[nowSlide_s2-1].classList.add("active");
}