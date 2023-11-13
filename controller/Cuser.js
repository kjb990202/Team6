const {User} = require ("../model")
const crypto = require('crypto');

// 홈화면 랜더링
exports.index = (req, res) => {
  res.render("index")
}
// 회원가입 페이지 랜더링
exports.signup = (req, res) => {
  res.render("./user/signup")
}
// 회원가입 페이지 랜더링
exports.post_signup = async (req, res) => {
  const salt = crypto.randomBytes(16).toString('base64');
  const iterations = 100;
  const keylen = 64;
  const digest = 'sha512';
  const hashedPassword = crypto.pbkdf2Sync(req.body.password, salt, iterations, keylen, digest).toString('base64');

  const data = {
      userid: req.body.userid,
      password: hashedPassword, // 암호화된 비밀번호 저장
      salt: salt, // 솔트 저장
      email: req.body.email,
      nickname: req.body.nickname
  }
  const createUser = await User.create(data)
  res.send(createUser)
};
// 아이디 중복확인
exports.checkId = (req, res) => {
  User.findAll({
      where:{
          userid: req.body.userid
      }
  })
  .then((result) => {
      if (result.length > 0) {
          // 이미 사용 중인 아이디가 있음
          res.send({ duplicate: true });
      } else {
          // 사용 가능한 아이디
          res.send({ duplicate: false });
      }
  })
};

// 닉네임 중복확인
exports.checkNickname = (req, res) => {
  User.findAll({
      where:{
          nickname: req.body.nickname
      }
  })
  .then((result) => {
      if (result.length > 0) {
          // 이미 사용 중인 닉네임이 있음
          res.send({ duplicate: true });
      } else {
          // 사용 가능한 닉네임
          res.send({ duplicate: false });
      }
  })
};
// 로그인 화면 랜더링
exports.signin = (req, res) => {
  res.render("./user/signin")
}
// 로그인 화면 랜더링
exports.post_signin = async (req, res) => {
  const user = await User.findOne({ where: { userid: req.body.userid } });
  
  if (!user) {
    return res.send({ result: false });
  }

  const iterations = 100;
  const keylen = 64;
  const digest = 'sha512';
  const hashedPassword = crypto.pbkdf2Sync(req.body.password, user.salt, iterations, keylen, digest).toString('base64');

  if (user.password === hashedPassword) {
    req.session.user = user; // 세션에 사용자 정보 저장
    console.log('세션 생성:', req.session); // 세션 상태 출력
    res.send({ result: true, id: user.id });
  } else {
    res.send({ result: false });
  }
}; // 이 부분에 중괄호를 추가했습니다.

// 로그아웃
exports.logOut = (req, res) => {
  req.session.destroy((err) => { // 세션 삭제
    if (err) {
      console.error(err);
    } else {
      console.log('세션 삭제, 현재 세션 상태:', req.session); // 세션 상태 출력
      res.redirect("/"); // 로그인 페이지로 리다이렉트
    }
  });
};

// 아이디 찾기 페이지 랜더링
exports.findId = (req, res) => {
    res.render("./user/findId")
  }
//
exports.post_findId = (req, res) => {
  User.findOne({
      where:{
          email: req.body.email
      }
  })
  .then((result) => {
      if (result) {
          // 해당 이메일로 등록된 아이디가 있음
          res.send({ userid: result.userid });
      } else {
          // 해당 이메일로 등록된 아이디가 없음
          res.send({ userid: null });
      }
  })
};

// 비밀번호 찾기 페이지 랜더링
exports.findPassword = (req, res) => {
    res.render("./user/findPassword")
  }



// exports.profile = (req, res) => {
//   User.findOne({
//     where:{
//         id: req.body.id,
//     }
//   }).then((result)=>{
//     if (result) res.render("profile", { data: result })
//     else res.redirect('/signin')
//   })
    
//   }


// exports.profile_edit = (req, res) => {
//     const data = {
//         ...req.body,
//         id: req.params.id,
//     };
//     User.update(data,{
//         where :{
//             id: data.id,
//         },
//     }).then((result)=> {
//         res.send({result: true})
//     })
// }

// exports.profile_delete = (req, res) => {
//     User.destroy ({
//         where: {
//             id:req.params.id,
//         },
//     }).then((result)=> {
//         console.log("destroy: " ,result)
//         res.send({result:true})
//     })
// }
