window.onload = function() {
    var firstImage = document.getElementById("product-slider").querySelector(".product-img");
    firstImage.classList.add('selected');
    console.log(firstImage.src)
    changeImage(firstImage.src, firstImage);
};

function changeImage(imageSrc, clickedImage) {
    var enlargedImage = document.getElementById('enlarged-image');
    enlargedImage.innerHTML = '<img src="' + imageSrc + '">';
    console.log('<img src="' + imageSrc + '">')
    var images = document.querySelectorAll('.product-slider .product-img');
    images.forEach(function(image) {
        image.classList.remove('selected');
    });
    clickedImage.classList.add('selected');
}
