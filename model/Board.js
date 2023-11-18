const Map_Database = require('./Map_Database');

function Board(Sequelize, DataTypes) {
    // sequelize 객체의 define이라는 메소드를 이용해서 모델(테이블)을 정의한다.
    return Sequelize.define(
        'board', // 테이블 이름
        {
// // 게시글 작성
// module.exports = (sequelize, DataTypes) => {
//   const Board = sequelize.define(
//     "board",
//     {

      // 모델 정의
      boardID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      title: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      category: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      views: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      createBoard: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      modifiedBoard: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      // 모델 옵션
      tableName: "board",
      frezzeTableName: true,
      timestamps: false, // createdAt과 updatedAt 컬럼을 사용하지 않음
      freezeTableName: true,
    }
  );


  return Board;

};

module.exports = Board;
