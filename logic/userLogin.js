const mongo = require("./mongoClass");

class UserLogin {
    constructor(username, password) {
        this.username = username;
        this.password = password;
        this.mongo = new mongo();
        this.mongoUser = null;
    }

    // Checks if there is a user in the database and puts him into this.mongoUser that can be used later in checkPassword
    async checkIsUser() {
        try {
            // Using await to wait for the asynchronous operation to complete
            this.mongoUser = await this.mongo.getData("users", { name: this.username });
            return this.mongoUser !== null;
        } catch (error) {
            console.error("Error checking user:", error);
            return false;
        }
    }

    // Just checks the password. --Should be used after checkIsUser--
    checkPassword() {
        if (this.mongoUser && this.mongoUser.password === this.password) {
            return true;
        }
        return false;
    }

    // Performs all checks to pass the user to the site if he has entered the right password and exists
    async allCheck() {
        const isUser = await this.checkIsUser();
        if (isUser && this.checkPassword()) {
            return [true, this.mongoUser];
        }
        return [false, null];
    }
}

module.exports = UserLogin;
