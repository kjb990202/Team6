const { Map_Information } = require("../model");


exports.uploadStore = (req, res) => {
    Map_Information.findOne({
        where: {
            storeID: req.body.storeID,
        }
    }).then((result) => {
        if (result) {
            // console.log("DB에 존재하는 가게입니다.");
            res.send("already exists");
        }
        else {
            // console.log("새로운 가게의 정보를 업로드 했습니다.");
            res.send("upload complete");
        }
    });
};