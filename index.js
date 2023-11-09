const express = require("express");
const app = express();
const PORT = 8000;

app.set("view engine", "ejs");
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get("/", function (req, res) {
    res.render("index copy");
});

app.get("/1", function (req, res) {
    res.render("index01");
});

app.get("/2", function (req, res) {
    res.render("index02");
});

app.get("/3", function (req, res) {
    res.render("index03");
});


app.get("/4", function (req, res) {
    res.render("index04");
});

app.get("/5", function (req, res) {
    res.render("index05");
});


app.listen(PORT, function () {
    console.log(`Sever Open: ${PORT}`);
});