// const {  } = require("../model");

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
