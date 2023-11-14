const express = require("express");
const pagination = require("../controller/Cpagination");
const router =express.Router();

//작성된 게시글 db가져와서 boardMain 페이지에 표시
// router.get('/loadMorePosts', pagination.getBoard);


router.get("/api/boards", async (req, res) => {
    try {
      const boards = await pagination.getBoards(req.query.cursor, req.query.limit);
      res.json(boards);
    } catch (error) {
      console.error(error);
      res.status(500).send("서버에러");
    }
  });
  

module.exports = router;
//클라이언트에서는 무한 스크롤을 구현할 때 JavaScript로 페이지의 끝에 도달했을 때 /boardp/loadMorePosts 경로로 GET 요청을 보내도록 설정.