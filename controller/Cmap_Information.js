const { Map_Information } = require("../model");

// SB: 마커를 클릭하면 findOne으로 가게 정보를 조회한 후, 정보의 유무에 따라 다른 안내문구를 res로 보내는 함수입니다.
exports.uploadStore = (req, res) => {
    // SB: DB에 넣을 데이터를 정의합니다.
    const data = {
        storeID: req.body.storeID,
        placeName: req.body.placeName,
        address: req.body.address
    };

    // SB: DB에 동일한 가게 정보가 없는지 확인합니다.
    Map_Information.findOne({
        where: {
            storeID: req.body.storeID,
        }
    }).then((result) => {
        if (result) {
            // SB: DB에 동일한 가게 정보가 있다면 해당 문구를 전송합니다.
            res.send("already exists");
        }
        else {
            // SB: DB에 동일한 가게 정보가 없다면 create로 데이터를 만들고 성공하면 해당 문구를 전송합니다.
            Map_Information.create(data).then(() => {
                res.send("store upload complete");
            });
        }
    });
};