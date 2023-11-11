function Review(Sequelize, DataTypes) {
    // sequelize 객체의 define이라는 메소드를 이용해서 모델(테이블)을 정의한다.
    return Sequelize.define(
        'Review', // 테이블 이름
        {
            reviewNumber: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            placeName: {
                type: DataTypes.STRING(20),
                allowNull: false,
            },
            reviewComment: {
                type: DataTypes.TEXT("medium"),
                allowNull: false
            },
            nickname: {
                type: DataTypes.STRING(20),
                defaulteValue: "닉네임 연결 안했습니다"
            }
        },
        {
            tableName: "review",
            freezeTableName: true,
            timestamps: false,
            // insert, update 시에 그 시간을 자동을 저장하겠다.
            // 기본값이 true. 그래서 false로 바꿔준다.
            // 왜냐면 시간 등을 자동적으로 컬럼 이름(createAta)을 만들어 insert하는데
            // 우리는 그 컬럼을 만들어 두지 않아서 오류가 난다.
        })
}


module.exports = Review;