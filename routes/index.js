const express = require("express");
const controller = require("../controller/index");
const router = express.Router();
const user = require("../controller/Cuser");

router.get("/", controller.index);

// 맛집 지도 메인 페이지
router.get("/mapMain", controller.mapMain);

// 게시판 메인 페이지
router.get("/boardMain", controller.boardMain);

// 게시판 작성 페이지
router.get("/boardEdit", controller.boardEdit);

// 게시판 작성 화면 -> 게시글 등록
router.post("/boardSubmit", async (req, res) => {
  try {
    const { category_id, title, content, nickname } = req.body;
    // 게시글 저장 로직
    const newSubmit = await dbSubmit.create({
      boardID: boardID,
      id: id,
      title: title,
      category: category,
      content: content,
    });

    res.status(201).json(newSubmit);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "에러가 발생했습니다." });
  }
});
// 로그인 페이지
router.get("/signin", controller.signin);

// 메인 페이지
router.get("/", user.index);
// 회원가입 페이지
router.get("/user/signup", user.signup);
// 회원가입 페이지
router.post("/user/signup", user.post_signup);
// 아이디 중복확인
router.post("/checkid", user.checkId);
// 닉네임 중복확인
router.post("/checknickname", user.checkNickname);
// 로그인 페이지
router.get("/user/signin", user.signin);
// 로그인 페이지
router.post("/user/signin", user.post_signin);
// 아이디 찾기
router.get("/user/findId", user.findId);
// 아아디 찾기
router.post("/user/findId", user.post_findId);
// 비밀번호 찾기
router.get("/user/findPassword", user.findPassword);

// router.post("/user/profile", user.profile)
// router.patch("/user/profile/edit/:id", user.profile_edit)
// router.delete("/user/profile/delete/:id", user.profile_delete)
module.exports = router;
