const { Map_Information } = require("../model");

// 가게 마커를 누르면 가게 정보를 조회 후 정보가 없으면 DB에 업로드 됨
exports.uploadStore = (req, res) => {
  const data = {
    storeID: req.body.storeID,
    placeName: req.body.placeName,
    address: req.body.address,
  };

  Map_Information.findOne({
    where: {
      storeID: req.body.storeID,
    },
  }).then((result) => {
    if (result) {
      res.send("already exists");
    } else {
      Map_Information.create(data).then(() => {
        res.send("store upload complete");
      });
    }
  });
};
