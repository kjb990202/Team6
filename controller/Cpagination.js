// 작성된 게시글 db 가져와서 boardMain 페이지에 표시

const { Board } = require("../model/Board"); // Board 모델 가져오기

exports.getBoards = async (cursor, limit) => {
  try {
    const boards = await Board.findAll({
      where: {
        boardID: {
          [cursor ? 'lt' : 'lte']: cursor || Number.MAX_SAFE_INTEGER,
        },
      },
      limit,
      order: [['id', 'DESC']],
    });

    // 정상적으로 검색되면 아이템들을 반환
    return boards;
  } catch (error) {
    console.error(error);
    throw error; // 에러를 던져서 catch로 전달
  }
};
