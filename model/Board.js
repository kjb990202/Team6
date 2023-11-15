
// // 게시글 작성
module.exports = (sequelize, DataTypes) => {
  const Board = sequelize.define(
    "board",
    {

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
        type: DataTypes.TEXT,
        allowNull: true,
      },
      content: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      views: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      createBoard: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      modifiedBoard: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      id: {
        type: DataTypes.INTEGER,
        allowNull: true,
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
