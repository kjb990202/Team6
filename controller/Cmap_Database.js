const { Map_Database, User } = require("../model");

// 리뷰 조회
exports.getReview = (req, res) => {
  Map_Database.findAll({
      where: {
        storeID: req.query.storeID,
      },
      include: [{model: User, attributes: ["nickname"]}]
    }).then((results) => {
      if (results.length > 0) {
        const data = results.map((result) => ({
          id: result.dataValues.id,
          reviewNumber: result.dataValues.reviewNumber,
          storeID: result.dataValues.storeID,
          reviewComment: result.dataValues.reviewComment,
          rating: result.dataValues.rating,
          createdAt: result.dataValues.createdAt,
          updatedAt: result.dataValues.updatedAt,
          nickname: result.dataValues.user.nickname
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
      },
      include: [{model: User, attributes: ["nickname"]}]

    }).then((results) => {
      res.send(results.dataValues);
    }).catch((error) => {
      console.log(error);
      res.status(500).send("Internal Server Error");
    });
  });
  
};

exports.updateReview = (req, res) => {
  const data = {
    rating: req.body.rating,
    reviewComment: req.body.reviewComment
  };
  Map_Database.update(data, {
    where: {
      reviewNumber: req.body.reviewNumber
    },
  }).then((result) => {
    if (result == 1) {
      Map_Database.findOne({
        where: {
          reviewNumber: req.body.reviewNumber
      },
      include: [{model: User, attributes: ["nickname"]}]
      }).then((results) => {
        res.send(results.dataValues);
      })
    } else if (result == 0) {
      res.send(false);
    } else {
      res.status(500).send("Internal Server Error");
    }
  }).catch((error) => {
    console.log(error);
    res.status(500).send("Internal Server Error");
  });
};

exports.reviewDelete = (req, res) => {
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
