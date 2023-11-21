const mysql = require("mysql");

// createConnection : mysql 연결 정보를 받아서 mysql과 연결
// db 연결한다 > host, user, password, database 이름
const conn = mysql.createConnection({
  host: "localhost",
  user: "teamsix",
  password: "1234qwer*",
  database: "projectteamsix",
});

exports.getComments = (cb) => {
  conn.query(`SELECT * FROM comment`, (err, rows) => {
    // err 변수가 빈 값이 아니라면, err가 발생했다는 것.
    if (err) {
      throw err;
    }

    console.log("comment", rows);
    cb(rows);
  });
};

exports.insertComment = (data, cb) => {
  const sql = `insert into comment (commentID, boardID, id, Field, createComment) values ('${data.commentID}','${data.boardID}','${data.id}','${data.Field}','${data.createComment}')`;

  conn.query(sql, (err, result) => {
    // err 변수가 빈 값이 아니라면, err가 발생했다는 것.
    if (err) {
      throw err;
    }

    console.log("comment insert", result);
    cb(result.insertId);
  });
};

exports.delComment = (commentID, cb) => {
  const sql = `delete from comment where commentID = ${commentID}`;

  conn.query(sql, (err, result) => {
    if (err) {
      throw err;
    }

    let flag = false;
    if (result.affectedRows) {
      flag = true;
    }

    console.log("comment delete", result);
    cb(flag);
    // cb(true);
  });
};

exports.getCommentById = (commentID, cb) => {
  conn.query(`SELECT * FROM comment WHERE commentID=${commentID}`, (err, rows) => {
    if (err) {
      throw err;
    }

    console.log("Comment.js: ", rows);
    cb(rows[0]);
  });
};

exports.patchComment = (data, cb) => {
  const sql = `UPDATE comment SET commentID='${data.commentID}', Field='${data.Field}' WHERE commentID=${data.commentID}`;
  conn.query(sql, (err, result) => {
    if (err) {
      throw err;
    }

    console.log("Comment.js: ", result);
    cb(result);
  });
};
