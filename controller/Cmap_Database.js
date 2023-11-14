const { Map_Database } = require("../model");

// 리뷰 조회
exports.getReview = (req, res) => {
  Map_Database.findAll({
      where: {
        storeID: req.query.storeID,
    }
    }).then((results) => {
      if (results.length > 0) {
        const data = results.map((result) => ({
          reviewNumber: result.dataValues.reviewNumber,
          storeID: result.dataValues.storeID,
          reviewComment: result.dataValues.reviewComment,
          rating: result.dataValues.rating,
          createdAt: result.dataValues.createdAt,
          updatedAt: result.dataValues.updatedAt,
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
  }

  
// 리뷰 업로드
exports.uplodeReview = (req, res) => {
  const data = {
    id: req.body.id,
    storeID: req.body.storeID,
    reviewComment: req.body.reviewComment,
    rating: req.body.rating
  }

  Map_Database.create(data).then(() => {
    Map_Database.findOne({
      where: {
        id: req.body.id,
        storeID: req.body.storeID,
        reviewComment: req.body.reviewComment,
        rating: req.body.rating
    }
  }).then((results) => {
    res.send(results.dataValues);
  })
  });
  
};

exports.updateReview = (req, res) => {
  console.log(req.body)
  const data = {
    rating: req.body.rating,
    reviewComment: req.body.reviewComment
  };
  Map_Database.update(data, {
    where: {
      reviewNumber: req.body.reviewNumber
    },
  }).then((result) => {
    console.log("update result: ", result);
    res.send(req.body.reviewNumber);
  });
};

exports.reviewDelete = (req, res) => {
  console.log("나 여기있다", req.params)
  Map_Database.destroy({
    where: {
      reviewNumber: req.params.reviewNumber
    },
  }).then((result) => {
    if (result == 1) {
      res.send("리뷰가 삭제되었습니다.");
    }
    else {
      res.send("이미 삭제된 리뷰입니다.");
    }
  });
};
