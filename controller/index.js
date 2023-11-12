// 메인 화면
exports.index = (req, res) => {
  res.render("index");
};

// 맛집 지도 메인 화면
exports.mapMain = (req, res) => {
  res.render("map/mapMain");
};

// 로그인 화면
exports.signin = (req, res) => {
  res.render("user/signin");
};

// 게시판 메인 화면
exports.boardMain = (req, res) => {
  res.render("board/boardMain");
};

// 게시판 작성 화면
exports.boardEdit = (req, res) => {
  res.render("board/boardEdit");
};
