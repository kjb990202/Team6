const { Comment, User } = require("../model/index");

exports.home = (req, res) => {
  res.render("index");
};

// GET /comments => 기존 댓글 전체 조회 후 render("comment")
exports.comment = (req, res) => {
  // select * from comment;
  console.log("user: ", req.session.user);
  Comment.findAll({
    // where: {
    //   id: req.session.user.id
    // },
    include: [{model: User, attributes: ["nickname"]}]
  }).then((result) => {
    // console.log("findAll result: ", result);
    // console.log("0 index의 id", result.id);
    // console.log("0 index의 user", result.User);

    console.log("여기입니다!!!!:", result)
    // res.render("./comment/comment", { data: result  });
    res.render("./comment/comment", {user: req.session.user, data: result});

  });
};
 
// POST /comment => 댓글 insert
exports.postComment = async (req, res) => {
  // Check if user is authenticated
  if (!req.body.id) {
    // User is not authenticated, send alert message
    res.status(400).send({ error: "로그인 후 이용 가능합니다." });
    return;
  }

  const data = {
    id: req.body.id,
    boardID: req.body.boardID,
    Field: req.body.Field,
    createComment: req.body.createComment,
    nickname: req.body.nickname
  };

  try {
    const createComment = await Comment.create(data);
   
    // 서버에서 새로운 댓글을 생성하고 클라이언트에게 해당 댓글을 전송
    console.log("여기다!!!!:", createComment)
    res.send({ result: true, comment: createComment });
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).send({ error: "서버 에러" });
  }
};
// DELETE /comment/:commentID => 댓글 삭제
exports.deleteComment = (req, res) => {
  Comment.destroy({
    where: {
      commentID: req.params.commentID,
    },
  }).then((result) => {
    console.log("destroy result: ", result);
    res.send({ result: true });
  });
};

// GET /comment/:commentID => 댓글 하나 조회
exports.getCommentById = (req, res) => {
  // select * from comment where id = ?? limit 1;

  Comment.findOne({
    where: {
      commentID: req.params.commentID,
    },
    include: [{model: User, attributes: ["nickname"]}]
  }).then((result) => {
    console.log("findOne result: ", result);
    res.send(result);
  });
};

// PATCH /comment/:id => 댓글 수정
exports.patchComment = (req, res) => {
  const data = {
    Field: req.body.Field,
  };

  Comment.update(data, {
    where: {
      commentID: req.body.commentID
    },
    // returning: true, // 업데이트된 레코드를 반환하도록 설정
  })
    .then((result) => {
      if (result[0] > 0) {
        // 업데이트가 성공한 경우
        // const updatedComment = updatedComments[0].get(); // 업데이트된 댓글 정보
        res.send({ result: true });
        
      } else {
        // 업데이트가 실패한 경우
        res.status(400).send({ error: "댓글 업데이트에 실패했습니다." });
      }
    })
    .catch((error) => {
      console.error("Error updating comment:", error);
      res.status(500).send({ error: "서버 에러" });
    });
};

