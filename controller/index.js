// 메인 화면
exports.index = (req, res) => {
  res.render("index");
};

// 메인 페이지 (디자인테스트 후 해당 코드 삭제)
exports.index2 = (req, res) => {
  res.render("index2");
};

exports.map = (req, res) => {
  res.render("map/map");
};

// 맛집 지도 메인 화면
exports.mapMain = (req, res) => {
  res.render("map/mapMain");
};

// 로그인 화면
exports.signin = (req, res) => {
  res.render("user/signin");
};

exports.board = (req, res) => {
  res.render("board/board");
};

exports.mapBackend = (req, res) => {
  res.render("map/mapBackend");
};

// 게시판 메인 화면
exports.boardMain = (req, res) => {
  res.render("board/boardMain");
};

// 게시판 작성 화면
exports.boardEdit = (req, res) => {
  res.render("board/boardEdit");
};
