function Map_Database(Sequelize, DataTypes) {
  // sequelize 객체의 define이라는 메소드를 이용해서 모델(테이블)을 정의한다.
  return Sequelize.define(
    "Map_Database", // 테이블 이름
    {
      reviewNumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      id: {
        type: DataTypes.INTEGER,
      },
      storeID: {
        type: DataTypes.STRING(50),
      },
      reviewComment: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        onUpdate: "CURRENT_TIMESTAMP",
      },
    },
    {
      tableName: "Map_Database",
      freezeTableName: true,
      timestamps: true,
    }
  );
}

module.exports = Map_Database;
