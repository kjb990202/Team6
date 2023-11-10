const express = require("express");
const router = express.Router();
const controller = require("../controller/Creview")

router.get("/", controller.mapMain);


module.exports = router;