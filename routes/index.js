const express = require("express");
const controller = require("../controller/index");
const router = express.Router();
const user = require("../controller/Cuser");

router.get("/", controller.index);

// 지도 페이지
router.get("/map", controller.map);

// 게시판 페이지 -> 지원님 페이지 merge되면 board_del 부분 지원님껄로 변경해야함.
// controller에서도 "board_del" 부분 지원님껄로 변경해야 함.
router.get("/board", controller.board);

// 로그인 페이지 -> 지원님 페이지 merge되면 login_del 부분 지원님껄로 변경해야함.
// controller에서도 "login_del" 부분 지원님껄로 변경해야 함.
router.get("/signin", controller.signin);

// 메인 페이지
router.get("/", user.index);
// 회원가입 페이지
router.get("/user/signup", user.signup);
// 회원가입 페이지
router.post("/user/signup", user.post_signup);
// 아이디 중복확인 
router.post('/checkid', user.checkId);
// 닉네임 중복확인 
router.post('/checknickname', user.checkNickname);
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
