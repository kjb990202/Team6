function Comment(Sequelize, DataTypes) {
    // sequelize 객체의 define이라는 메소드를 이용해서 모델(테이블)을 정의한다.
    return Sequelize.define(
        'Comment', // 테이블 이름
        {
            commentID: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement : true,
                primaryKey: true
            },
            boardID: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            id: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            Field: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            createComment: {
                type: DataTypes.DATE,
                allowNull: true,
            },
        },
        {
            tableName: "comment",
            freezeTableName: true,
            timestamps: false,
        });
};


module.exports = Comment;