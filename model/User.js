const Map_Database = require('./Map_Database');

function User(Sequelize, DataTypes) {
    // sequelize 객체의 define이라는 메소드를 이용해서 모델(테이블)을 정의한다.
    return Sequelize.define(
        'User', // 테이블 이름
        {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            userid: {
                type: DataTypes.STRING(20),
                allowNull: false
            },
            password: {
                type: DataTypes.STRING(20),
                allowNull: false
            },
            email: {
                type: DataTypes.STRING(50),
                allowNull: false
            },
            nickname: {
                type: DataTypes.STRING(20),
                allowNull: false
            }
        },
        {
            tableName: "User",
            freezeTableName: true,
            timestamps: false,
        });
        
};

User.hasMany(Map_Database, {foreignKey: 'id'});

module.exports = User;