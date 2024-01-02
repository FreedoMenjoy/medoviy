const phoneRegister = require("./phoneRegister")

let phone = document.querySelector("#phone")
let register = document.querySelector("#register")

register.addEventListener('click' , () =>{
    let pR= new phoneRegister.phoneRegister(phone.value)
    pR.sendMessage()
    window.location.href = window.location.href + '/code_input';
})

