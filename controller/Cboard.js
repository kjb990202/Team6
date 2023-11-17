const { Op } = require('sequelize');
const { User } = require("../model");
// 게시판 작성 화면 -> 게시글 등록
const { Board } = require("../model"); // Board 모델 가져오기
Board.belongsTo(User, { foreignKey: 'id' });
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




exports.getBoard = async (req, res) => {
  try {
    // 현재 가장 큰 boardID 값 가져오기
    const maxBoardID = await Board.max('boardID');

    let cursor = req.query.cursor || maxBoardID + 1;
    console.log("커서 값:", cursor);

    const results = await Board.findAll({
      where: {
        boardID: {
          [Op.lt]: cursor,
        },
      },
      include: [{ model: User, attributes: ['nickname'] }],
      order: [['boardID', 'DESC']],
      limit: 12,
    });
    res.json(results);
  } catch (error) {
    console.error("보드 데이터를 불러오는데 실패했습니다", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
