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
            tableName: "Map_Information",
            freezeTableName: true,
            timestamps: false,
        });
};

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

User.hasMany(Map_Database, {foreignKey: 'id'});
Map_Database.belongsTo(User, { foreignKey: 'id' });

Map_Information.hasMany(Map_Database, {foreignKey: 'storeID'});
Map_Database.belongsTo(Map_Information, { foreignKey: 'storeID' });



module.exports = {
    User,
    Map_Information,
    Map_Database
};