const mongo = require("./mongoClass");

class UserLogin {
    constructor(username, password) {
        this.username =username
        this.password = password;
        this.mongo = new mongo();
        this.mongoUser = null;
        if (username.indexOf("@") == -1){
            this.type = "name";
        } else{ this.type = "email"; }
    }

    async checkIsUser() {
        try {
            if (this.type == "name"){
                this.mongoUser = await this.mongo.getData("users", {name : this.username });
            } else if(this.type == "email"){
                this.mongoUser = await this.mongo.getData("users", {email : this.username });
            }
            return this.mongoUser !== null;
        } catch (error) {
            console.error("Error checking user:", error);
            return false;
        }
    }
    
    checkPassword() {
        if (this.mongoUser && this.mongoUser.password === this.password) {
            return true;
        }
        return false;
    }

    async allCheck() {
        const isUser = await this.checkIsUser();
        if (isUser && this.checkPassword()) {
            return [true, this.mongoUser];
        }
        return [false, null];
    }
}

module.exports = UserLogin;