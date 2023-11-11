const { Review } = require("../model");

exports.index = (req, res) => {
  res.render("index");
};

exports.map = (req, res) => {
  res.render("map/map");
};

exports.signin = (req, res) => {
  res.render("user/signin");
};

exports.board = (req, res) => {
  res.render("board/board");
};

exports.mapBackend = (req, res) => {
  res.render("map/mapBackend");
};



// 리뷰 조회
exports.getReview = (req, res) => {
  Review.findAll({
    where: {
      placeName: req.query.placeName,
  }
  }).then((result) => {
    console.log("findOne result: ", result);
    res.send(result);
  })
};

// 리뷰 업로드
exports.uplodeReview = (req, res) => {
  const data = {
    placeName: req.body.placeName,
    nickname: req.body.nickname,
    reviewComment: req.body.reviewComment
  }

  console.log(data)
  // key 정보는 컬럼명이라서 맘대로 정하는 거 아니다
  Review.create(data).then((result) => {
      console.log("create result: ", result)
      // res.send(result)
  });
};

// console.log(req.query.placeName);

//   let reviewList = Review.reviewInfos()[0];

//   for (let i = 0; i < reviewList.length; i++) {
//     if (reviewList[i].placeName == req.query.placeName) {
//       // let reviewResponse = {
//       //   isTrue: true,
//       //   reviewOne: reviewList[i]
//       // }
//       console.log(reviewList[i])
//       res.send(reviewList[i]);
      
//       return

//     } else {
//         // document.getElementById("messageDiv").innerHTML =
//         // `<button type="button" onclick="postReview()">내 리뷰가 첫 리뷰라니!</button>
//         // <div>작성된 리뷰가 없습니다ㅠㅠ</div>`
//         console.log("false")
//         res.send(false);
//         return
//     };
//   };




// exports.login = (req, res) => {
//   let userList = User.userInfos()[0].split("\n    ");
//   for (let i = 0; i < userList.length; i++) {
//       if (req.body.id == userList[i].split("//")[0] && req.body.pw == userList[i].split("//")[1] ) {
//           // let userName = userList[i].split("//")[2]
//           // res.send(true, userName)
//           let data = {
//               isSuccess: true,
//               userName: userList[i].split("//")[2]
//           }
//           res.send(data)
//           break;
//       } else {
//           res.send(false)
//           break;
//       }
//   }
// }


