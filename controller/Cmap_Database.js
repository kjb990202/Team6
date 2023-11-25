const { Map_Database, User, Map_Information } = require("../model");

// SB: 리뷰 조회 기능입니다.
exports.getReview = (req, res) => {
  // SB: storeID를 통해 해당 가게에 리뷰가 있는지 확인하고,
  Map_Database.findAll({
    where: {
      storeID: req.query.storeID,
    },
    include: [
      { model: User, attributes: ["nickname"] },
      { model: User, attributes: ["image"] },
    ],
  })
    .then((results) => {
      // SB: 응답으로는 리뷰를 보여줄 때 필요한 여러 정보들을 넘깁니다.
      if (results.length > 0) {
        const data = results.map((result) => ({
          id: result.dataValues.id,
          reviewNumber: result.dataValues.reviewNumber,
          storeID: result.dataValues.storeID,
          reviewComment: result.dataValues.reviewComment,
          rating: result.dataValues.rating,
          createdAt: result.dataValues.createdAt,
          updatedAt: result.dataValues.updatedAt,
          nickname: result.dataValues.User.nickname,
          image: result.dataValues.User.image,
        }));
        res.send(data);
      } else {
        res.send(false);
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send("Internal Server Error");
    });
};

// SB: 리뷰 작성 기능입니다. 받아온 데이터는 DB에 작성할 리뷰 정보입니다.
exports.uplodeReview = (req, res) => {
  // SB: 사용자의 아이디, 가게식별자, 리뷰내용, 별점을 요청으로 받아왔습니다.
  const data = {
    id: req.body.id,
    storeID: req.body.storeID,
    reviewComment: req.body.reviewComment,
    rating: req.body.rating
  };

  // SB: data를 DB에 업로드합니다.
  Map_Database.create(data).then(() => {
    // SB: 업데이트에 성공하면 업데이트 한 내용을 찾아 사용자 정보인 닉네임과 이미지를 포함하여 응답으로 전송합니다.
    Map_Database.findOne({
      where: {
        id: req.body.id,
        storeID: req.body.storeID,
        reviewComment: req.body.reviewComment,
        rating: req.body.rating,
      },
      include: [
        { model: User, attributes: ["nickname"] },
        { model: User, attributes: ["image"] },
      ],
    })
      .then((results) => {
        res.send(results.dataValues);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send("Internal Server Error");
      });
  });
};

// SB: 리뷰 수정 기능입니다.
exports.updateReview = (req, res) => {
  // SB: 요청으로 받은 데이터는 리뷰 수정에 필요한 별점과 리뷰 내용입니다.
  const data = {
    rating: req.body.rating,
    reviewComment: req.body.reviewComment,
  };

  // SB: 받아온 데이터를 기반으로 DB를 업데이트 합니다.
  Map_Database.update(data, {
    where: {
      reviewNumber: req.body.reviewNumber,
    },
  })
    .then((result) => {
      // SB: 업데이트 성공의 결과로 나온 result를 이용한 조건문입니다.
      if (result == 1) {
        // SB: 업데이트 성공시 reviewNumber로 해당 리뷰의 정보를 찾아 닉네임, 프로필이미지, 가게 이름과 주소를 응답으로 보냅니다.
        Map_Database.findOne({
          where: {
            reviewNumber: req.body.reviewNumber,
          },
          include: [
            { model: User, attributes: ["nickname"] },
            { model: User, attributes: ["image"] },
            { model: Map_Information, attributes: ["placeName"] },
            { model: Map_Information, attributes: ["address"] },
          ],
        }).then((results) => {
          res.send(results.dataValues);
        });
      } else if (result == 0) {
        res.send(false);
      } else {
        res.status(500).send("Internal Server Error");
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send("Internal Server Error");
    });
};

// SB: 리뷰 수정 기능입니다. reviewNumber로 해당 리뷰를 찾아 destroy합니다.
exports.reviewDelete = (req, res) => {
  Map_Database.destroy({
    where: {
      reviewNumber: req.params.reviewNumber,
    },
  }).then((result) => {
    if (result == 1) {
      res.send("리뷰가 삭제되었습니다.");
    } else {
      res.send("이미 삭제된 리뷰입니다.");
    }
  });
};
