// 게시판 작성 화면 -> 게시글 등록
const { Board } = require("../model"); // Board 모델 가져오기
exports.boardSubmit = async (req, res) => {
  try {
    const { boardID, title, category, content } = req.body;

    // Board 모델을 사용하여 데이터베이스에 저장
    await Board.create({
      boardID,
      title,
      category,
      content,
    });

    res.status(200).json({ message: "게시글이 성공적으로 등록되었습니다." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "서버 오류 발생" });
  }
};
