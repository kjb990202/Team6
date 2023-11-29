const express = require("express");
const app = express();
const session = require("express-session");
const PORT = 8000;

const { Map_Database } = require("./model");
const { Comment } = require("./model");
const { Board } = require("./model");

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
// 마이페이지 게시글, 댓글, 리뷰 수 카운트하여 불러오는 함수
app.use(async (req, res, next) => {
  if (req.session.isAuthenticated) {
    const commentCount = await Comment.count({
      where: { id: req.session.user.id },
    });
    const Map_DatabaseCount = await Map_Database.count({
      where: { id: req.session.user.id },
    });
    const boardCount = await Board.count({
      where: { id: req.session.user.id },
    });

    res.locals.commentCount = commentCount;
    res.locals.Map_DatabaseCount = Map_DatabaseCount;
    res.locals.boardCount = boardCount;
  }

  next();
});

const router = require("./routes");
app.use("/", router);

app.get("*", function (req, res) {
  res.render("404");
});

app.listen(PORT, () => {
  console.log("Server Port : ", PORT);
});
