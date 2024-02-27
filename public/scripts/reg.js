const formReg = document.getElementById("register-reg");
const errorsReg= document.querySelector('.errorsReg');
errorsReg.innerHTML = '';
const errors_texts = {
    "loginExists" : "Такой логин уже существует",
    "badPassword" : "Пароль должен содержать не менее 8 символов, включать заглавные и строчные буквы, цифры, хотя бы один из знаков .\-_)(",
    "emailIsUsed" : "Такая почта уже зарегистрирована",
    "passwordAreNotTheSame" : "Пароли не совпадают",
    "wrongLogin" : "Имя пользователя может содержать буквы латинского алфавита (a–z), цифры (0–9) и точки (.)"
}

formReg.addEventListener("submit", (e) => {
    e.preventDefault();

    const regUsername = document.getElementById("usernameReg").value;
    const regPassword = document.getElementById("passwordReg").value;
    const regPasswordCheck = document.getElementById("passwordRegCheck").value;
    const regEmail = document.getElementById("emailReg").value;
    errorsReg.innerHTML = '';
    
    if (regPassword != regPasswordCheck) {
        errorsReg.innerHTML += makeErrorP(errors_texts["passwordAreNotTheSame"])
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
        errorsReg.innerHTML = '';
        if (xhr.status === 200) {
            codereg();
        } else if (xhr.status === 400) {
            var errorResponce = JSON.parse(xhr.responseText);
            var errorMessage = errorResponce.message;
            if (errorMessage in errors_texts){
                errorsReg.innerHTML += makeErrorP(errors_texts[errorMessage]);
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