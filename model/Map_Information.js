const Map_Database = require('./Map_Database');

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
                type: DataTypes.STRING(20),
                allowNull: false,
            },
            address: {
                type: DataTypes.STRING(20),
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

// Map_Information.hasMany(Map_Database, {foreignKey: 'storeID'});
// Map_Database.belongsTo(Map_Information, { foreignKey: 'storeID' });

module.exports = Map_Information;