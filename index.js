const express = require("express");
const app = express();
const PORT = 8000;

app.set("view engine", "ejs");
app.use("/static", express.static("static"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const router = require("./routes");
app.use("/", router);

app.get("*", function(req, res){
  res.render("404")
});

app.listen(PORT, () => {
  console.log("Server Port : ", PORT);
});
