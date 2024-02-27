const formCode = document.getElementById("code-reg");
let regComplete = document.querySelector(".complete_reg")
console.log(regComplete)

formCode.addEventListener("submit", (e) => {
    e.preventDefault();

    const regCode = document.getElementById("regCode").value;
    var xhr = new XMLHttpRequest();
    var url = "/reg_code_check"; 
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");

    var data = {
        code : regCode
    };

    xhr.onreadystatechange = function () {
        if (xhr.status === 200) {
            if (!regComplete.classList.contains("active")) {
                regComplete.classList.add("active");
            }
            window.location.href = "#"
            setTimeout(() => {
                regComplete.classList.remove("active");
                window.location.href = "/u"
            }, 3 * 1000);
        } else if (xhr.status === 400){
            console.log("Error")
        }
    };
    
    var jsonData = JSON.stringify(data);
    xhr.send(jsonData);
});