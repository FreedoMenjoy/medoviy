const form = document.getElementById("register-reg");
const errors_container = document.querySelector('.errors');
errors_container.innerHTML = '';
const errors_texts = {
    "loginExists" : "Такой логин уже существует",
    "badPassword" : "Пароль должен содержать не менее 8 символов, включать заглавные и строчные буквы, цифры, и хотя бы один из знаков (.-_)",
    "emailIsUsed" : "Такая почта уже зарегистрирована",
    "passwordAreNotTheSame" : "Пароли не совпадают",
    "wrongLogin" : "Имя пользователя может содержать буквы латинского алфавита (a–z), цифры (0–9) и точки (.)"
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const regUsername = document.getElementById("usernameReg").value;
    const regPassword = document.getElementById("passwordReg").value;
    const regPasswordCheck = document.getElementById("passwordRegCheck").value;
    const regEmail = document.getElementById("emailReg").value;
    
    if (checkUsername(regUsername) === false){
        errors_container.innerHTML = '';
        errors_container.innerHTML += makeErrorP(errors_texts["wrongLogin"])
        return
    }

    if(checkPassword(regPassword) === false){
        errors_container.innerHTML = '';
        errors_container.innerHTML += makeErrorP(errors_texts["badPassword"])
        return
    }

    if (regPassword != regPasswordCheck) {
        errors_container.innerHTML = '';
        errors_container.innerHTML += makeErrorP(errors_texts["passwordAreNotTheSame"])
        return
    }

    var xhr = new XMLHttpRequest();
    var url = "/reg"; 
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");

    var data = {
        username: regUsername,
        email : regEmail,
        password: regPassword
    };

    xhr.onreadystatechange = function () {
        errors_container.innerHTML = '';
        if (xhr.status === 200) {
            errors_container.innerHTML = '';
            codereg();
        } else if (xhr.status === 400) {
            errors_container.innerHTML = '';
            var errorResponce = JSON.parse(xhr.responseText);
            var errorMessage = errorResponce.message;
            if (errorMessage in errors_texts){
                errors_container.innerHTML += makeErrorP(errors_texts[errorMessage]);
                return
            } else {
                alert(errorMessage);
                return
            }
        }
    };

    var jsonData = JSON.stringify(data);
    xhr.send(jsonData);
});

function makeErrorP(error) {
    return `<p class="wrong active">${error}</p>`
}

function checkUsername(username) {
    var pattern = /^[a-zA-Z0-9.]+$/;
    return pattern.test(username);
}

function checkPassword(password) {
    if (password.length < 8) {
        return false;
    }
    if (!/[A-Z]/.test(password)) {
        return false;
    }
    if (!/[a-z]/.test(password)) {
        return false;
    }
    if (!/\d/.test(password)) {
        return false;
    }
    if (!/[.-_]/.test(password)) {
        return false;
    }
    return true;
}