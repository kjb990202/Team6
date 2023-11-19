const express = require("express");
const app = express();
const session = require("express-session");
const PORT = 8000;

app.set("view engine", "ejs");
app.use("/static", express.static("static"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  session({
    secret: "secret key", // 비밀키를 설정합니다.
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 60 * 60 * 1000, // 세션 유지 시간을 한 시간으로 설정합니다.
    },
  })
);

// 미들웨어를 사용하여 모든 뷰에 로그인 상태(세션)를 전달
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isAuthenticated;
  res.locals.user = req.session.user;
  console.log(res.locals.user);
  next();
});

app.get("/check-session", function (req, res) {
  if (req.session.user) {
    // 세션이 유효한 경우
    res.status(200).send("Session active");
  } else {
    // 세션 만료 또는 존재하지 않는 경우
    res.status(401).send("Session expired");
  }
});

// 세션 확인 후 로그아웃되었을 시 로그인 메시지 출력
app.get("/check-session", function (req, res) {
  if (req.session.user) {
    // 세션이 유효한 경우
    res.status(200).send("Session active");
  } else {
    // 세션 만료 또는 존재하지 않는 경우
    res.status(401).send("Session expired");
  }
});

const router = require("./routes");
app.use("/", router);

app.get("*", function (req, res) {
  res.render("404");
});

app.listen(PORT, () => {
  console.log("Server Port : ", PORT);
});
