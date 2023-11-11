const express = require("express");
const controller = require("../controller/index");
const router = express.Router();

router.get("/", controller.index);

// 지도 페이지
router.get("/map", controller.map);

// 게시판 페이지 -> 지원님 페이지 merge되면 board_del 부분 지원님껄로 변경해야함.
// controller에서도 "board_del" 부분 지원님껄로 변경해야 함.
router.get("/board", controller.board);

// 로그인 페이지 -> 지원님 페이지 merge되면 login_del 부분 지원님껄로 변경해야함.
// controller에서도 "login_del" 부분 지원님껄로 변경해야 함.
router.get("/signin", controller.signin);



router.get("/mapBackend", controller.mapBackend);

router.get("/getReview", controller.getReview);

router.post("/uplodeReview", controller.uplodeReview);



module.exports = router;
