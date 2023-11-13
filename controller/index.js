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

// 게시판 작성 화면 -> 게시글 등록
const { Board } = require("../model"); // Board 모델 가져오기
exports.boardSubmit = async (req, res) => {
  try {
    const { category_id, title, content, nickname } = req.body;

    // Board 모델을 사용하여 데이터베이스에 저장
    await Board.create({
      category_id,
      title,
      content,
      nickname,
    });

    res.status(200).json({ message: "게시글이 성공적으로 등록되었습니다." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "서버 오류 발생" });
  }
};
