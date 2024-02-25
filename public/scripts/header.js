function extractRoleFromUrl(url) {
    var urlWithoutFragment = url.split('#')[0];
    var urlObject = new URL(urlWithoutFragment);
    var role = urlObject.pathname.split('/')[1];
    return role;
}
var currentLink = window.location.href;
var role = extractRoleFromUrl(currentLink);
var domain = window.location.host;
var roleLink = "http://" + domain + "/" + role;
var marketLink = roleLink + "/market";
var profileLink = roleLink + "/profile";

var market = document.getElementById("productsLink");
market.addEventListener("click", function(event) {
    event.preventDefault();
    window.location.href = marketLink;
});

var profile = document.getElementById("profileLink");   
profile.addEventListener("click", function(event) {
    event.preventDefault();
    window.location.href = profileLink;
});

var logins = document.querySelectorAll(".login");
var profiles = document.querySelectorAll(".profile");

if (role == "a" || role == "u") {
    logins.forEach(login => {
            if (login.classList.contains("active")) {
                login.classList.remove("active");
            }
        });

        profiles.forEach(profile => {
            if (!profile.classList.contains("active")) {
                profile.classList.add("active");
            }
        });
    } else {
        logins.forEach(login => {
            if (!login.classList.contains("active")) {
                login.classList.add("active");
            }
        });

        profiles.forEach(profile => {
            if (profile.classList.contains("active")) {
                profile.classList.remove("active");
            }
        });
    }
var logIn = document.getElementById("login-reg");
var register = document.getElementById("register-reg");
var forgotpassword = document.getElementById("forgot-password");
var button = document.getElementById("btn-reg");
var logreg = document.getElementById("tabs-reg");
var coderegs = document.getElementById("code-reg");
var codeforgots = document.getElementById("code-forgot");
var conreg = document.getElementById("container-reg");

function registration() {
    logIn.style.left = "-400px";
    register.style.left = "60px";
    button.style.left = "130px";
    forgotpassword.style.left = "-400px";
    logreg.style.left = "0px";
    coderegs.style.left = "-400px";
    codeforgots.style.left = "-400px";
    conreg.style.height = "480px"
}

function login() {
    logIn.style.left = "60px";
    register.style.left = "450px";
    button.style.left = "0px";
    forgotpassword.style.left = "-400px";
    logreg.style.left = "0px";
    coderegs.style.left = "-400px";
    codeforgots.style.left = "-400px";
    conreg.style.height = "480px"
}

function forgot() {
    logIn.style.left = "-400px";
    register.style.left = "450px";
    forgotpassword.style.left = "60px";
    logreg.style.left = "-400px";
    coderegs.style.left = "-400px";
    codeforgots.style.left = "-400px";
    conreg.style.height = "400px"
}

function codereg() {
    logIn.style.left = "-400px";
    register.style.left = "450px";
    forgotpassword.style.left = "-400px";
    logreg.style.left = "-400px";
    coderegs.style.left = "60px";
    codeforgots.style.left = "-400px";
    conreg.style.height = "400px"
}

function codeforgot() {
    logIn.style.left = "-400px";
    register.style.left = "450px";
    forgotpassword.style.left = "-400px";
    logreg.style.left = "-400px";
    coderegs.style.left = "-400px";
    codeforgots.style.left = "60px";
    conreg.style.height = "400px"
}

function back() {
    logIn.style.left = "60px";
    register.style.left = "450px";
    button.style.left = "0px";
    forgotpassword.style.left = "-400px";
    logreg.style.left = "0px";
    coderegs.style.left = "-400px";
    codeforgots.style.left = "-400px";
    conreg.style.height = "480px"
}

const inputLogin = document.getElementById('passwordLogin');
const checkBox = document.getElementById("checkboxs");

function show_hide_password(checkbox) {
if (inputLogin .getAttribute('type') === 'password') {
inputLogin .setAttribute('type', 'text');
checkBox.checked = true;
} else {
inputLogin .setAttribute('type', 'password');
checkBox.checked = false;
}
}

const input = document.getElementById('passwordReg');
const input2 = document.getElementById('passwordRegCheck');
const checkBox2 = document.getElementById("checkboxs2");

function show_hide_password_req(checkbox) {
if (input.getAttribute('type') === 'password') {
    input.setAttribute('type', 'text');
    input2.setAttribute('type', 'text');
    checkBox2.checked = true;
    } else {
    input.setAttribute('type', 'password');
    input2.setAttribute('type', 'password');
    checkBox2.checked = false;
    }
} 