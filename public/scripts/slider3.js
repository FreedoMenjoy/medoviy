let offset_s3 = 0;
let nowSlide_s3 = 1;
setDot_s3()

const sliderLine_s3 = document.querySelector('.slider3-line');
document.getElementById('next_s3').addEventListener('click', function(){
  offset_s3 += 700;
  nowSlide_s3 += 1;
    if (offset_s3 > 1400) {
        offset_s3 = 0;
        nowSlide_s3 = 1;
    }
    sliderLine_s3.style.left = -offset_s3 + 'px';
    setDot_s3()
});

document.getElementById('prev_s3').addEventListener('click', function () {
  offset_s3 -= 700;
  nowSlide_s3 += -1;
    if (offset_s3 < 0) {
      offset_s3 = 1400;
      nowSlide_s3 = 3;
    }
    sliderLine_s3.style.left = -offset_s3 + 'px';
    setDot_s3()
});

function moveToSlide_s3(slide){
  offset_s3 = (slide-1) * 700
  sliderLine_s3.style.left = -offset_s3 + 'px';
  nowSlide_s3 = slide
  setDot_s3()
}

function setDot_s3(){
  const dots = document.querySelectorAll(".dot_s3")
  dots.forEach(dot => { dot.classList.remove("active"); });
  dots[nowSlide_s3-1].classList.add("active");
}