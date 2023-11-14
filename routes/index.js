const express = require("express");
const controller = require("../controller/index");
const router = express.Router();
const Cmap_Database = require("../controller/Cmap_Database");
const Cmap_Information = require("../controller/Cmap_Information");
const user = require("../controller/Cuser");

router.get("/", controller.index);

router.get("/mapBackend", controller.mapBackend);
router.post("/uploadStore", Cmap_Information.uploadStore);
router.get("/getReview", Cmap_Database.getReview);
router.post("/uplodeReview", Cmap_Database.uplodeReview);

// 맛집 지도 메인 페이지
router.get("/mapMain", controller.mapMain);

// 게시판 메인 페이지
router.get("/boardMain", controller.boardMain);

// 게시판 작성 페이지
router.get("/boardEdit", controller.boardEdit);

// 게시판 작성 화면 -> 게시글 등록
router.post("/boardSubmit", async (req, res) => {
  try {
    const { boardID, id, title, category, content } = req.body;
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

// 회원가입 페이지
router.get("/signup", user.signup);
router.post("/signup", user.post_signup);

// 아이디 중복확인
router.post("/checkid", user.checkId);

// 닉네임 중복확인
router.post("/checknickname", user.checkNickname);

// 로그인 페이지
router.get("/signin", user.signin);
router.post("/signin", user.post_signin);

// 아이디 찾기
router.get("/findId", user.findId);
router.post("/findId", user.post_findId);

// 비밀번호 찾기
router.get("/findPassword", user.findPassword);
router.post("/findPassword", user.postFindPassword);

// 비밀번호 변경페이지
router.get("/changePassword", user.changePassword);
router.post("/changePassword", user.updatePassword);

// router.post("/user/profile", user.profile)
// router.patch("/user/profile/edit/:id", user.profile_edit)
// router.delete("/user/profile/delete/:id", user.profile_delete)
module.exports = router;
