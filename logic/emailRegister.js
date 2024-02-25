const nodemailer = require('nodemailer');
const MongoHandler = require("./mongoClass")
const config = require("./config.js")

class eRegister {
    constructor(userName, userPassword , userEmail){
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
        }, 5 * 60 * 1000);

    }

    generateCode(){
        return  Math.floor(Math.random() * 1000000);
    }

    async checkCode(code, email){
        const data = await this.MHandler.getData("registrations", {"code": code}); 
        if (data != null && data.email === email){ 
            return true;
        }
        return false;
    }

    async checkUnique(data) {
        const item = (data === "name") ? this.username : this.email;
        const unique = await this.MHandler.getData("users", { [data]: item });
        if (unique != null) { 
            return false;
        }
        return true;
    }

    async checkData(){
        if (await this.checkUnique("name")){
            if (await this.checkUnique("email")){
                return null; // Всё хорошо
            } else {
                return "emailIsUsed"; // Email уже используется
            }
        } else {
            return "loginExists"; // Имя пользователя уже существует
        }
    }
}

module.exports = eRegister;