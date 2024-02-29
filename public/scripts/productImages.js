const enlargedImage = document.querySelector(".enlarged-image")

function changeImage(photoName){
    enlargedImage.innerHTML = `<img src="/product_photos/${photoName}">`
}