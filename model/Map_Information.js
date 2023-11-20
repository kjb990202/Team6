function Map_Information(Sequelize, DataTypes) {
    // sequelize 객체의 define이라는 메소드를 이용해서 모델(테이블)을 정의한다.
    return Sequelize.define(
        'Map_Information', // 테이블 이름
        {
            storeID: {
                type: DataTypes.STRING(50),
                allowNull: false,
                primaryKey: true
            },
            placeName: {
                type: DataTypes.STRING(30),
                allowNull: false,
            },
            address: {
                type: DataTypes.STRING(30),
                allowNull: false
            }
        },
        {
            modelName: 'Map_Information',
            tableName: "Map_Information",
            freezeTableName: true,
            timestamps: false,
        });
};

module.exports = Map_Information;