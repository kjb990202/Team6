function User(Sequelize, DataTypes) {
    return Sequelize.define(
        "user",
        {
            id : {
                type:DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            userid :{  
                    type : DataTypes.STRING(20),
                    allowNull: false

            },
            password: {
                    type : DataTypes.STRING(255),

            },
            salt: {
                    type: DataTypes.STRING(100),
                    allowNull: false,
            },    
            email: {
                    type : DataTypes.STRING(50),

            },
            nickname: {
                    type : DataTypes.STRING(20),
            }   
        }, 
        {
            tableName : "user",
            frezzeTableName: true,
            timestamps : false,
            // insert, update 시에 그 시간을 자동으로 저장하겠다. (저장을 하는것이 기본값)
            // 저장시키지 않기위해 false로 지정 
            // createAt, updateAt
        }
    )
    
};

module.exports = User;