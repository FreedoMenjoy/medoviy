const formAddProduct = document.getElementById("products-form");
const con_photo = document.querySelector('.con-photo');
let p_photos = document.getElementById('p_photos');
var fileList = [];

p_photos.addEventListener('change', function(e) {
    var files = e.target.files;
    for (var i = 0; i < files.length; i++) {
      fileList.push(files[i]);
    }
  });

formAddProduct.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    fileList.forEach(file => {
        formData.append('files', file);
    });

    formData.forEach((key, value) =>{
        console.log(formData);
    })
});