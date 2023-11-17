const { Comment } = require("../model/index");

exports.home = (req, res) => {
  res.render("index");
};

// GET /comments => 기존 댓글 전체 조회 후 render("comment")
exports.comment = (req, res) => {
  // select * from comment;
  Comment.findAll().then((result) => {
    console.log("findAll result: ", result);
    console.log("0 index의 id", result.id);
    res.render("./comment/comment", { data: result });
  });
};
 
// POST /comment => 댓글 insert
// exports.postComment = async (req, res) => {
//   const data = {
//     id: req.body.id,
//     Field: req.body.Field,
//   };
//   const createComment = await Comment.create(data);
//   res.send(createComment);
// };

// // DELETE /comment/:commentID => 댓글 삭제
// exports.deleteComment = (req, res) => {
//   Comment.destroy({
//     where: {
//       commentID: req.params.commentID,
//     },
//   }).then((result) => {
//     console.log("destroy result: ", result);
//     res.send({ result: true });
//   });
// };

// // GET /comment/:commentID => 댓글 하나 조회
// exports.getCommentById = (req, res) => {
//   // select * from comment where id = ?? limit 1;
//   Comment.findOne({
//     where: {
//       commentID: req.params.commentID,
//     },
//   }).then((result) => {
//     console.log("findOne result: ", result);
//     res.send(result);
//   });
// };

// // PATCH /comment/:id => 방명록 수정
// exports.patchComment = (req, res) => {
//   const data = {
//     username: req.body.username,
//     Field: req.body.Field,
//   };
//   // update comment set username='??', comment='???' where id = ?;
//   Comment.update(data, {
//     where: {
//       commentID: req.body.commentID,
//     },
//   }).then((result) => {
//     console.log("update result: ", result);
//     res.send({ result: true });
//   });
// };

// exports.getTest = (req, res) => {
//   // select username from comment where id = 2 order by username ASC
//   Comment.findAll({
//     attributes: ["id", "commentID"],
//     order: [["id", "ASC"]],
//   }).then((result) => {
//     console.log("findOne result: ", result);
//     res.send(result);
//   });
// };
