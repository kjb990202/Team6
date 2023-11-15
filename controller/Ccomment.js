const Comment = require('../model');

// 댓글 목록을 가져오는 함수
exports.getComment = async (req, res) => {
  try {
    // 게시판에 해당하는 댓글 목록을 조회하는 로직
    const comment = await Comment.findAll();
    res.render('comment', { comment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '댓글을 불러오는 중에 오류가 발생했습니다.' });
  }
};

// 새 댓글을 생성하는 함수
exports.createComment = async (req, res) => {
  const { boardID, id, Field } = req.body;

  try {
    // 댓글을 생성하는 로직
    const newComment = await Comment.create({
      boardID: boardID,
      id: id,
      Field: Field,
      createComment: new Date(),
    });

    res.status(201).json(newComment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '댓글을 작성하는 중에 오류가 발생했습니다.' });
  }
};