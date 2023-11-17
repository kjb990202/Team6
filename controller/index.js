// 메인 화면
exports.index = (req, res) => {
  res.render("index");
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
}

// 게시판 메인 화면
exports.boardMain = (req, res) => {
  res.render("board/boardMain");
};

// 게시판 작성 화면
exports.boardEdit = (req, res) => {
  res.render("board/boardEdit");
};

// 댓글 관련
const Comment = require("../model/index");

exports.comment = (req, res) => {
  res.render("comment/comment");
}

exports.comment = (req, res) => {
  Comment.getComments((rows) => {
    res.render("comment", { data: rows });
  });
};

// POST /comment => 댓글 insert
exports.postComment = (req, res) => {
  console.log("req.body", req.body);
  Comment.insertComment(req.body, (commentID) => {
    console.log("ctrl postComment ", commentID);
    res.send({
      ...req.body,
      commentID,
    });
  });
};

// DELETE /comment/:commentID => 댓글 삭제
exports.deleteComment = (req, res) => {
  console.log(req.params);
  Comment.delComment(req.params.commentID, (result) => {
    res.send({ result: result });
  });
};

// GET /comment/:commentID => 댓글 하나 조회
exports.getCommentById = (req, res) => {
  Comment.getCommentById(req.params.commentID, (result) => {
    console.log("ctrl getCommentById: ", result);
    res.send(result);
  });
};

// PATCH /comment/:commentID => 댓글 수정
exports.patchComment = (req, res) => {
  console.log(req.body);
  Comment.patchComment(req.body, (result) => {
    console.log("ctrl getCommentById: patchComment", result);
    res.send({ result: true });
  });
};
