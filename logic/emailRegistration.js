const nodemailer = require('nodemailer');
const MongoHandler = require("./mongoClass.js")
const config = require("./config.js")
const regCheck = require("./regChecks.js")

class eRegister {
    constructor(userName = null , userPassword = null, userEmail = null){
        this.username = userName
        this.password = userPassword
        this.email = userEmail  
        this.MHandler = new MongoHandler();

        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: config.EMAIL, 
                pass: config.EMAIL_PASSWORD 
            },
            tls: {
                rejectUnauthorized: false
            }
        });
    }

    async sendCode(){
        var code = this.generateCode()
        let mailOptions = {
            from: config.EMAIL,
            to: this.email,
            subject: 'Код для регистрации на HoneyFather', 
            html: `
                <h1>Код аутентификации</h1>
                <p>Для продолжения процесса аутентификации введите следующий код:</p>
                <h2 style="font-size: 36px; color: #007bff;">${code}</h2>
            `
        };

        this.MHandler.addRegistartion(this.email, code, this.username, this.password )

        this.transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
        });

        setTimeout(() => {
            this.MHandler.deleteData({"email" : this.email}, "registrations");
        }, 3 * 60 * 1000);

    }

    generateCode(){
        let a;
        do {
            a = Math.floor(Math.random() * 1000000);
        } while (a < 100000);
        return  a.toString();
    }

    async checkUnique(data) {
        const item = (data === "name") ? this.username : this.email;
        let unique = null;
        if (data == "name"){
            unique = await this.MHandler.getData("users", { name: item });
        } else if(data == "email"){
            unique = await this.MHandler.getData("users", { email: item });
        }
        if (unique != null) { 
            return false;
        }
        return true;
    }

    async deleteEmailCodes(){
        let data = await this.MHandler.getData("registrations", { email: this.email });
        while (data != null){
            await this.MHandler.deleteData("registrations", { email:  this.email })
            data = await this.MHandler.getData("registrations", { email:  this.email });
        }
    }

    async checkData(){
        await this.deleteEmailCodes(this.email)
        if (regCheck.checkUsername(this.username) === false){
            return "wrongLogin"; //Логин не соответствует требованиям
        }
        if (regCheck.checkPassword(this.password) === false){
            return "badPassword"; // Пароль не соответствует требованиям
        }
        if (await this.checkUnique("name") === false){
            return "loginExists";// Имя пользователя уже существует
        }
        if (await this.checkUnique("email") === false){
            return "emailIsUsed"; // Email уже используется
        }

        return null;
    }

    async checkCode(code){
        const data = await this.MHandler.getData("registrations", {"code": code, "email": this.email}); 
        return data;
    }
    
}

module.exports = eRegister;
