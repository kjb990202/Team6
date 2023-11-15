const { Op } = require('sequelize');
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

// //게시글 표시
//  exports.getBoard = async (req,res) =>{
//   //Board모델을 사용하여 데이터 가져오기
//   Board.findAll({
//     where: {
//       //특정 조건을 맞추는 부분
//       boardID: 8,
//     }
//   }).then((result)=>{
//     let data ={
//       title :  result[0].dataValues.title,
//       category: result[0].dataValues.category,
//       content: result[0].dataValues.content,
//       views: result[0].dataValues.views,
//       createBoard: result[0].dataValues.createBoard,
//       modifiedBoard: result[0].dataValues.modifiedBoard,

//     }
//     console.log(data);
//     res.send(data)//json 형태
//   })
//  }


exports.getBoard = async (req, res) => {
  // let cursor = req.query.cursor;
  // console.log("커서값",cursor);
  // Board.findAll({
  //   where: {
  //     boardID: {
  //       [Op.gt]: cursor 
  //     },
  //   },
  //   order: [['boardID', 'DESC']],
  //   limit: 12,
  // })
  //   .then((results) => {
  //     // 결과를 처리하고 JSON으로 전송
  //     res.json(results);
  //   })
  //   .catch((error) => {
  //     console.error("보드 데이터를 불러오는데 실패했습니다", error);
  //     res.status(500).json({ error: "Internal Server Error" });
  //   });
  
};