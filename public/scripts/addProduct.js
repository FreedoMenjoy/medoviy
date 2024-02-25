const modal = document.querySelector('.modal-pa')
const fileInput = document.getElementById('p_photos');
var fileList = []
modal.style.display = "none";

const itemList = [
    "p_cooking",
    "p_goods",
    "p_Mass",
    "p_Suitability",
    "p_EValue",
    "p_fats",
    "p_carbs",
    "p_proteins",
    "p_compound",
    "p_categories",
    "p_description",
    "p_price",
    "p_name"
]

function openPA() {
    modal.style.display = 'block';
}

function closePA() {
    modal.style.display = 'none';
}

fileInput.addEventListener('change', function () {
    if (fileInput.files.length > 1){
        fileInput.files.forEach(file => {
            fileList.append(file)
        }) 
    } else {
        const file = fileInput.files[0]
        fileList.push(file)
    }
});

function submitProductsForm() {
    var form = new FormData()

}