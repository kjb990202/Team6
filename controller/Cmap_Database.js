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
    res.send("리뷰 작성이 완료되었습니다.");
  });
  Map_Database.findOne({
    where: {
      id: req.body.id,
      storeID: req.body.storeID,
      reviewComment: req.body.reviewComment,
      rating: req.body.rating
  }
  })
};