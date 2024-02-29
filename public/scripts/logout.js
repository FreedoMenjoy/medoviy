const logoutBtn = document.querySelector(".logout");

logoutBtn.addEventListener('click', function() {
    var xhr = new XMLHttpRequest();
    var url = "/logout"; 
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                window.location.href = '/guest';
            } 
        }
    };

    xhr.send();
});