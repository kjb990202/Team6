const Sequelize = require("sequelize");
// SB: 로컬 서버용
const config = require("../config/config.json")["development"];
// SB: 클라우드 서버용
// const config = require("../config/config.json")["production"];

const db = {};
// sequelize 객체 생성
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  { ...config, logging: console.log }
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Map_Information = require("./Map_Information")(sequelize, Sequelize);
db.Map_Database = require("./Map_Database")(sequelize, Sequelize);
db.User = require("./User")(sequelize, Sequelize);

db.Submit = require("./Board")(sequelize, Sequelize);
db.Comment = require("./Comment")(sequelize, Sequelize);

db.Board = require("./Board")(sequelize, Sequelize);

db.Comment.belongsTo(db.Board, { foreignKey: "boardID" });
db.Board.hasMany(db.Comment, { foreignKey: "boardID" });

db.Comment.belongsTo(db.User, { foreignKey: "id", onDelete: "CASCADE" });
db.User.hasMany(db.Comment, { foreignKey: "id" });

db.Map_Database.belongsTo(db.User, { foreignKey: "id", onDelete: "CASCADE" });
db.User.hasMany(db.Map_Database, { foreignKey: "id" });

db.Board.belongsTo(db.User, { foreignKey: "id", onDelete: "CASCADE" });
db.User.hasMany(db.Board, { foreignKey: "id" });

db.Map_Database.belongsTo(db.Map_Information, { foreignKey: "storeID" });
db.Map_Information.hasMany(db.Map_Database, { foreignKey: "storeID" });

module.exports = db;
