const express = require("express");
const path = require("path");
const pR = require("./registration/phoneRegister")
const codeCheck = require('./registration/code_input')

const app = express();

app.set("view engine", 'ejs')
app.use(express.urlencoded({extended : false}))
app.use(express.static("public"))

app.get("/", (req, res) => {
    res.render("index");
});

app.get("/login", (req, res) => {
    res.render("login");
});

app.get("/market", (req, res) => {
    res.render("index2");
});

app.post("/code_input", (req, res) => {
    res.render("code_input.ejs");
    const phoneValue = req.body.phone;
    console.log(phoneValue)
    const register = new pR.PhoneRegister(phoneValue);
    register.sendMessage()
});

app.post("/reg_completed", (req, res) => {
    res.render("reg_completed.ejs");
    const code = req.body.code
    codeCheck.checkCode(code)
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Connected to http://localhost:${PORT}`);
});