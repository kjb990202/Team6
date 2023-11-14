const express = require("express");
const controller = require("../controller/index");
const router = express.Router();
const Cmap_Database = require("../controller/Cmap_Database");
const Cmap_Information = require("../controller/Cmap_Information");
const user = require("../controller/Cuser");

router.get("/", controller.index);

// 맛집 지도 메인 페이지
router.get("/mapMain", controller.mapMain);



// 맛집 지도 페이지(SB)
router.get("/mapBackend", controller.mapBackend);

// DB(Map_Information)에 사업장 정보 업로드하는 기능
router.post("/uploadStore", Cmap_Information.uploadStore);

// DB(Map_Database)에 리뷰 조회하는 기능
router.get("/getReview", Cmap_Database.getReview);

// DB(Map_Database)에 리뷰 업로드하는 기능
router.post("/uplodeReview", Cmap_Database.uplodeReview);

// DB(Map_Database)에 리뷰 수정하는 기능
router.patch("/updateReview", Cmap_Database.updateReview);

// DB(Map_Database)에 리뷰 삭제하는 기능
router.delete("/reviewDelete/:reviewNumber", Cmap_Database.reviewDelete);



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

// 로그인 페이지
router.get("/signin", controller.signin);
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
// 로그아웃 페이지 구현

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
