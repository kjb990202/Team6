//작성된 게시글 db가져와서 boardMain 페이지에 표시

const {Board} =require("../model/Board");//Board 모델 가져오기

exports.getBoards =async(cursor,limit) =>{
    
        //보드모델을 사용하여 데이터베이스에서 자료 가져오기
    try{
        const boars = await Board.findAll({
            where: {
              boardID: {
                [cursor ? 'lt' : 'lte']: cursor || Number.MAX_SAFE_INTEGER,
              },
            },
            limit,
            order: [['id', 'DESC']], // id를 기반으로 내림차순
          });
          return boards;//정상적으로 검색되면 아이템들을 반환 
    }catch(error){
       
        console.error(error);
        res.status(500).json( {message : "서버 오류 발생" } );
    }
    
}
