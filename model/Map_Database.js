const User = require('./User');
const Map_Information = require('./Map_Information');

function Map_Database(Sequelize, DataTypes) {
    // sequelize 객체의 define이라는 메소드를 이용해서 모델(테이블)을 정의한다.
    return Sequelize.define(
        'Map_Database', // 테이블 이름
        {
        reviewNumber: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        storeID: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        reviewComment: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        createAta: {
            type: DataTypes.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        },
        updatedAt: {
            type: DataTypes.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            onUpdate: 'CURRENT_TIMESTAMP'
        }
        },
        {
            tableName: "Map_Database",
            freezeTableName: true,
            timestamps: true,
        })
}


Map_Database.belongsTo(User, { foreignKey: 'id' });
Map_Database.belongsTo(Map_Information, { foreignKey: 'storeID' });


module.exports = Map_Database;