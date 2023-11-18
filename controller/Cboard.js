const { Op } = require('sequelize');
const { User } = require("../model");
// 게시판 작성 화면 -> 게시글 등록
const { Board } = require("../model"); // Board 모델 가져오기
Board.belongsTo(User, { foreignKey: 'id' });
exports.boardSubmit = async (req, res) => {
  try {
    const { id, title, category, content } = req.body;

    // Board 모델을 사용하여 데이터베이스에 저장
    await Board.create({
      id,
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

exports.boardDetail = async (req, res) => {
  const boardID =  parseInt(req.params.boardID, 10);//문자열로 넘어갔기때문에 int형으로 변환해줘야함(트러블 슈팅에 추가예정)
  console.log("보드 아이디 값",boardID)//잘넘어옴
  try {
    const result = await Board.findOne({
      where: { boardID : boardID },
      include: [{ model: User, attributes: ['nickname'] }],
    });
    console.log("result 값:",result);
     if (result) {
      // 데이터가 존재할 때 템플릿에 전달
      console.log("result 값:",result);
      const { title, content ,user,createBoard,modifiedBoard,views,category, } = result;
      const{ nickname } =user;
      
      res.render('board/boardDetail', {title, content ,nickname,createBoard,modifiedBoard,views,category });
      console.log("닉네임:",nickname);
    } else {
      // 데이터가 존재하지 않을 때 처리
      res.status(404).render("404");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('서버 에러');
  }
};