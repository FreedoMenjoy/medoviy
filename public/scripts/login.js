const formLogin = document.getElementById("login-reg");
let authComplete = document.querySelector(".complete_auth")
const errorsLogin= document.querySelector('.errorsLogin');
errorsLogin.innerHTML = '';

formLogin.addEventListener("submit", (e) => {
    e.preventDefault();

    const loginUsername = document.getElementById("usernameLogin").value;
    const loginPassword = document.getElementById("passwordLogin").value;

    var xhr = new XMLHttpRequest();
    var url = "/login"; 
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");

    var data = {
        username : loginUsername,
        password : loginPassword
    };

    xhr.onreadystatechange = function () {
        errorsLogin.innerHTML = '';
        if (xhr.status === 200) {
            var responseData = JSON.parse(xhr.responseText);
            if (!authComplete.classList.contains("active")) {
                authComplete.classList.add("active");
            }
            window.location.href = "#"
            setTimeout(() => {
                regComplete.classList.remove("active");
                window.location.href = `/${responseData.role}`
            }, 3 * 1000);
        } else if (xhr.status === 400){
            var errorResponce = JSON.parse(xhr.responseText);
            if (errorResponce.message === "wrongPasswordOrLogin"){
                errorsLogin.innerHTML += `<p class="wrong active">Неверный логин или пароль</p>`
            }
        }
    };
    
    var jsonData = JSON.stringify(data);
    xhr.send(jsonData);
});