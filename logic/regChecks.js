class regCheck{
    static checkUsername(username) {
        if(username.length < 1){ 
            return false
        }
        if(!/^[a-zA-Z0-9.]+$/.test(username)){
            return false
        };
        return true
    }
    
    static checkPassword(password) {
        if (password.length < 8) {
            return false;
        }
        if (!/[A-Z]/.test(password)) {
            return false;
        }
        if (!/[a-z]/.test(password)) {
            return false;
        }
        if (!/\d/.test(password)) {
            return false;
        }
        if (!/^[A-Za-z0-9\.\-_]+$/.test(password)) {
            return false;
        }
        return true;
    }
}


module.exports = regCheck;
