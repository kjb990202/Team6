const { Op, where } = require("sequelize");
const { User } = require("../model");
const { Comment } = require("../model");
// 게시판 작성 화면 -> 게시글 등록
const { Board } = require("../model"); // Board 모델 가져오기
Board.belongsTo(User, { foreignKey: "id" });
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
  console.log("쿼리에 담긴 어쩌고", req.query);
  try {
    // 현재 가장 큰 boardID 값 가져오기
    const maxBoardID = await Board.max("boardID");

    let cursor = req.query.cursor || maxBoardID + 1;

    const results = await Board.findAll({
      where: {
        boardID: {
          [Op.lt]: cursor,
        },
      },
      include: [{ model: User, attributes: ["nickname", "image"] }],
      order: [["boardID", "DESC"]],
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
  const boardID = parseInt(req.params.boardID, 10);
  console.log("보드 아이디 값", boardID);
  try {
    const result = await Board.findOne({
      where: { boardID: boardID },
      include: [
        { model: User, attributes: ["id", "nickname", "image"] },
        {
          model: Comment, // Comment 모델 추가
          include: [{ model: User, attributes: ["id", "nickname", "image"] }],
        },
      ],
    });

    if (result) {
      // 데이터가 존재할 때 템플릿에 전달

      const {
        boardID,
        title,
        content,
        User,
        createBoard,
        modifiedBoard,
        viewCount,
        category,
        Comments,
      } = result;
      const { nickname, id, image } = User;

      res.render("board/boardDetail", {
        boardID,
        title,
        content,
        nickname,
        createBoard,
        modifiedBoard,
        viewCount,
        category,
        image: User.image,
        id: result.id,
        data: Comments, // 템플릿에 Comments 변수로 댓글 데이터 전달
      });
    } else {
      // 데이터가 존재하지 않을 때 처리
      res.status(404).render("404");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("서버 에러");
  }
};

//게시글 삭제
exports.boardDelete = (req, res) => {
  Board.destroy({
    where: {
      boardID: req.params.boardID,
    },
  }).then((result) => {
    res.send("게시글이 삭제 되었습니다");
  });
};

//게시글 수정페이지 이동
exports.boardModify = (req, res) => {
  const boardID = parseInt(req.params.boardID, 10);
  Board.findOne({
    where: { boardID: boardID },
    include: [{ model: User, attributes: ["nickname"] }],
  }).then((result) => {
    const {
      boardID,
      title,
      content,
      User,
      createBoard,
      modifiedBoard,
      viewCount,
      category,
    } = result;

    const { nickname, id } = User;

    res.render("board/boardModify", {
      boardID,
      title,
      content,
      nickname,
      createBoard,
      modifiedBoard,
      viewCount,
      category,
      id: result.id,
    }); //랜더
  });
};

//게시글 수정
exports.updateBoard = async (req, res) => {
  const boardID = parseInt(req.params.boardID, 10);
  const { category, title, content } = req.body;

  try {
    // 게시글 존재 여부 확인
    const existingBoard = await Board.findByPk(boardID);
    if (!existingBoard) {
      return res.status(404).send("게시글을 찾을 수 없습니다.");
    }

    // 게시글 수정
    await Board.update(
      {
        category: category,
        title: title,
        content: content,
      },
      {
        where: {
          boardID: boardID,
        },
      }
    );

    res.send("게시글이 성공적으로 수정되었습니다.");
  } catch (error) {
    console.error(error);
    res.status(500).send("게시글 수정 중에 오류가 발생했습니다.");
  }
};

exports.increaseViewCount = async (req, res) => {
  try {
    const { boardID } = req.params;
    const board = await Board.findByPk(boardID);
    if (!board) {
      res.status(404).send("Board not found");
      return;
    }
    board.viewCount += 1;
    await board.save();
    res.json(board);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
