const {User} = require ("../model")

// 홈화면 랜더링
exports.index = (req, res) => {
  res.render("index")
}
// 회원가입 페이지 랜더링
exports.signup = (req, res) => {
  res.render("./user/signup")
}
// 회원가입 페이지 랜더링
exports.post_signup = (req, res) => {
    const data = {
        userid: req.body.userid,
        password : req.body.password,
        email : req.body.email,
        nickname : req.body.nickname
    }
    const createUser =  User.create(data)
    res.send(createUser)
}
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
exports.post_signin = (req, res) => {
    User.findAll({
      where:{
        userid: req.body.userid,
        password: req.body.password}
    })
    .then((result)=>{
    if (result.length > 0) res.send({ result: true, id: result[0].id })
    else res.send({ result: false })
})

  }
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
