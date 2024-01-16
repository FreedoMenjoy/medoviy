const modal = document.querySelector('.modal-pa')
modal.style.display = "none";

function openPA() {
    modal.style.display = 'block';
}

function closePA() {
    modal.style.display = 'none';
}


function submitProductsForm() {
    var formData = new FormData(document.getElementById('products-form'));
    formData.append("formType", "products");

    // Создаем объект для передачи дополнительных данных в JSON-формате
    var jsonData = {};
    formData.forEach((value, key) => {
        jsonData[key] = value;
    });

    fetch("/a/profile", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonData),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            console.log('Data received successfully:', data.message);
        } else {
            console.error('Server returned success: false', data.message);
        }
    })
    .catch(error => console.error('Error:', error));
}

