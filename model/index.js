const Sequelize = require("sequelize");
const config = require("../config/config.json")["development"];

const db = {};
// sequelize 객체 생성
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;


db.Map_Information = require("./Map_Information")(sequelize, Sequelize);
db.Map_Database = require("./Map_Database")(sequelize, Sequelize);
db.User = require("./User")(sequelize, Sequelize);
db.Submit = require("./Board")(sequelize, Sequelize);
db.Comment = require("./Comment")(sequelize, Sequelize);

module.exports = db;
