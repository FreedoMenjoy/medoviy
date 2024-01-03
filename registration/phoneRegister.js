const twilio = require("twilio")
const fs = require('fs');

const accountSid = "ACd16fec134e271f4ee6d33efb6b77e0d7"
const authToken = '0167bc0893ca06f92d05c515a71cd491';
const phoneNumber = "+19496122231"
const client = require('twilio')(accountSid, authToken);

class PhoneRegister {
    constructor(clienNumber) {
        this.clientNumber = clienNumber
        this.code = NaN
    }

    sendMessage() {
        this.code = this.generateCode()
        client.messages
            .create({
                body: `Проверочный код: ${this.code}`,
                from: phoneNumber,
                to: this.clientNumber
            })
            .then(message => console.log(message.sid))
            .catch(error => console.error(error));
    }

    generateCode() {
        this.code = Math.floor(100000 + Math.random() * 900000); // Генерация случайного шестизначного кода
        const data = { [this.code] : [this.phoneNumber]};
      
        fs.writeFileSync('codes.json', JSON.stringify(data));
      
        setTimeout(() => {
            deleteCode();
        }, 120000);

        return this.code
      }
      
    deleteCode() {
        const fileData = fs.readFileSync('codes.json', 'utf-8');
        const data = JSON.parse(fileData);
    
        if (data.hasOwnProperty(this.phoneNumber)) {
            delete data[this.code];
            fs.writeFileSync('codes.json', JSON.stringify(data));
        } 
        this.code = NaN
      }
}

module.exports = { PhoneRegister };