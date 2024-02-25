const photos = document.getElementById('p_photos');
const imageNameContainer = document.getElementById("image-name-container");
const uploadedFiles = []; 

photos.addEventListener('change', function(event)  {
    var files = event.target.files;
    for (let i = 0; i < files.length; i++) {
        const fileName = files[i].name;
        if (!uploadedFiles.includes(fileName)) {
            uploadedFiles.push(fileName);
            imageNameContainer.innerHTML += `<ul>${fileName}</ul>`;
        }
    }
});
