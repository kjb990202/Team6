const express = require("express");
const app = express();
const PORT = 8000;

app.set("view engine", "ejs");
app.use("/static", express.static("static"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const router = require("./routes");
app.use("/", router);

// 페이지네이션 라우터
const boardP=require("./routes/boardPage");
app.use("/boardp", boardP);

app.get("*", function (req, res) {
  res.render("404");
});

app.listen(PORT, () => {
  console.log("Server Port : ", PORT);
});
