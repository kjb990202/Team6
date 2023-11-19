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



//게시글 커서기반 페이지네이션
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

//상세페이지 이동
exports.boardDetail = async (req, res) => {
  const boardID =  parseInt(req.params.boardID, 10);//문자열로 넘어갔기때문에 int형으로 변환해줘야함(트러블 슈팅에 추가예정)
  console.log("보드 아이디 값",boardID)//잘넘어옴
  try {
    const result = await Board.findOne({
      where: { boardID : boardID },
      include: [{ model: User, attributes: ['nickname'] }],
    });
   
     if (result) {
      // 데이터가 존재할 때 템플릿에 전달
      
      const { boardID,title, content ,user,createBoard,modifiedBoard,views,category, } = result;
      const{ nickname,id } =user;
      console.log(result.id);
      res.render('board/boardDetail', { boardID, title, content ,nickname,createBoard,modifiedBoard,views,category,id:result.id });
      //JW:여기서 궁금한점:여기서 닉네임값은 result.nickname 으로 안넘겨도 넘어가는데 왜 유저id값은 result.id로 보내야 하는가... 누가 알려주세요
    } else {
      // 데이터가 존재하지 않을 때 처리
      res.status(404).render("404");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('서버 에러');
  }
};

//게시글 삭제
exports.boardDelete = (req,res) => {
  // const boardID =req.params.boardID;
  console.log("없앨보드의 숫자",req.params.boardID);
  Board.destroy({
    where:{
      boardID:req.params.boardID,
    },
  }).then((result) => {
      res.send("리뷰가 삭제 되었습니다");
    
  })
}


//게시글 수정
//하... 수정버튼누르면 특정한 쿼리이름을 가진 보드에딧으로 넘긴다음 그 보드에딧에 value값들을 불러오고(등록버튼도 수정버튼으로 바꿔야함...)그값들을 수정데이터로 보내야함 귀찮다증말로,,,,