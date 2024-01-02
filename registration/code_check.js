const fs = require("fs")

let userInput = document.querySelector("#code")
let check = document.querySelector("#check")

const jsonString = fs.readFileSync('codes.json', 'utf8');
const jsonData = JSON.parse(jsonString);


check.addEventListener('click' , () =>{
    if (jsonData.hasOwnProperty(userInput)) {
        window.location.href = window.location.href.replace(/login/g, '') + 'reg_completed';
    }
})
