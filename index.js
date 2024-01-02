const express = require("express");
const path = require("path");

const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "registration/modules/login.html"));
});

app.get("/login/code_input", (req, res) => {
    res.sendFile(path.join(__dirname, "registration/modules/code_input.html"));
});

app.get("/reg_completed", (req, res) => {
    res.sendFile(path.join(__dirname, "registration/modules/reg_completed.html"));
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Connected to http://localhost:${PORT}`);
});
