// // 게시글 작성
module.exports = (sequelize, DataTypes) => {
  const Submit = sequelize.define(
    "board",
    {
      // 모델 정의
      boardID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      title: {
        type: DataTypes.TEXT,
        allowNull: false,
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
    },
    {
      // 모델 옵션
      sequelize,
      modelName: "Board",
      tableName: "board", // 실제 데이터베이스의 테이블 이름
      timestamps: false, // createdAt과 updatedAt 컬럼을 사용하지 않음
    }
  );

  return Submit;
};
