const formAddProduct = document.getElementById("products-form");
const con_photo = document.querySelector('.con-photo');
const p_mainPhoto = document.getElementById('p_mainPhoto');
let p_photos = document.getElementById('p_photos');
let mainPhotoName = null;
var fileList = [];

p_photos.addEventListener('change', function(e) {
    var files = e.target.files;
    for (var i = 0; i < files.length; i++) {
      fileList.push(files[i]);
    }
});

p_mainPhoto.addEventListener('change', function(e) {
    var file = e.target.file;
    mainPhotoName = e.target.file.name;
    fileList.push(file[i]);
});

formAddProduct.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(formAddProduct);

    formData.delete("p_photos");
    formData.delete("p_MainPhoto");

    formData.append("p_MainPhoto", mainPhotoName)


    fileList.forEach((file, index) => {
        formData.append("files", file); 
    });

    const xhr = new XMLHttpRequest();
    const url = "/add_product";
    xhr.open("POST", url, true);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                console.log("Product added");
            } else {
                console.error("Request failed");
            }
        }
    };

    xhr.send(formData);
});