const fs = require("fs")


function checkCode(userInput){

    const jsonString = fs.readFileSync('codes.json', 'utf8');
    const jsonData = JSON.parse(jsonString);


    if (jsonData.hasOwnProperty(userInput)) {
        window.location.href = window.location.href.replace('/login/code_input', '') + '/reg_completed';
        return true
    }
    return false
}

module.exports = { checkCode };