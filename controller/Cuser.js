const { User } = require("../model");
const crypto = require("crypto");

// 홈화면 랜더링
exports.index = (req, res) => {
  res.render("index");
};
// 회원가입 페이지 랜더링
exports.signup = (req, res) => {
  res.render("./user/signup");
};
// 회원가입 페이지 랜더링
exports.post_signup = async (req, res) => {
  const salt = crypto.randomBytes(16).toString("base64");
  const iterations = 100;
  const keylen = 64;
  const digest = "sha512";
  const hashedPassword = crypto
    .pbkdf2Sync(req.body.password, salt, iterations, keylen, digest)
    .toString("base64");

  const data = {
    userid: req.body.userid,
    password: hashedPassword, // 암호화된 비밀번호 저장
    salt: salt, // 솔트 저장
    email: req.body.email,
    nickname: req.body.nickname,
  };
  const createUser = await User.create(data);
  res.send(createUser);
};
// 아이디 중복확인
exports.checkId = (req, res) => {
  User.findAll({
    where: {
      userid: req.body.userid,
    },
  }).then((result) => {
    if (result.length > 0) {
      // 이미 사용 중인 아이디가 있음
      res.send({ duplicate: true });
    } else {
      // 사용 가능한 아이디
      res.send({ duplicate: false });
    }
  });
};

// 닉네임 중복확인
exports.checkNickname = (req, res) => {
  User.findAll({
    where: {
      nickname: req.body.nickname,
    },
  }).then((result) => {
    if (result.length > 0) {
      // 이미 사용 중인 닉네임이 있음
      res.send({ duplicate: true });
    } else {
      // 사용 가능한 닉네임
      res.send({ duplicate: false });
    }
  });
};
// 로그인 화면 랜더링
exports.signin = (req, res) => {
  res.render("./user/signin");
};
// 로그인 화면 랜더링
exports.post_signin = async (req, res) => {
  const user = await User.findOne({ where: { userid: req.body.userid } });

  if (!user) {
    return res.send({ result: false });
  }

  const iterations = 100;
  const keylen = 64;
  const digest = "sha512";
  const hashedPassword = crypto
    .pbkdf2Sync(req.body.password, user.salt, iterations, keylen, digest)
    .toString("base64");

  if (user.password === hashedPassword) {
    req.session.user = user; // 세션에 사용자 정보 저장
    req.session.isAuthenticated = true; // 로그인 상태를 true로 설정
    console.log("세션 생성:", req.session); // 세션 상태 출력
    res.send({ result: true, id: user.id });
  } else {
    res.send({ result: false });
  }
};

// 아이디 찾기 페이지 랜더링
exports.findId = (req, res) => {
  res.render("./user/findId");
};
//
exports.post_findId = (req, res) => {
  User.findOne({
    where: {
      email: req.body.email,
    },
  }).then((result) => {
    if (result) {
      // 해당 이메일로 등록된 아이디가 있음
      res.send({ userid: result.userid });
    } else {
      // 해당 이메일로 등록된 아이디가 없음
      res.send({ userid: null });
    }
  });
};

// 비밀번호 찾기 페이지 랜더링
exports.findPassword = (req, res) => {
  res.render("./user/findPassword");
};
// 비밀번호 찾기 검증
exports.postFindPassword = async (req, res) => {
  const { userid, email } = req.body;
  const user = await User.findOne({
    where: {
      userid: userid,
      email: email,
    },
  });
  const valid = user !== null;
  res.json({ success: valid });
};

// 비밀번호 변경 페이지 랜더링
exports.changePassword = (req, res) => {
  res.render("./user/changePassword");
};
// 비밀번호 변경 암호화
exports.updatePassword = async (req, res) => {
  const { userid, changePassword } = req.body;
  const user = await User.findOne({ where: { userid: userid } });

  if (!user) {
    return res.send({ result: false, message: "유저를 찾을 수 없습니다." });
  }

  const salt = crypto.randomBytes(16).toString("base64");
  const iterations = 100;
  const keylen = 64;
  const digest = "sha512";
  const hashedPassword = crypto
    .pbkdf2Sync(changePassword, salt, iterations, keylen, digest)
    .toString("base64");

  user.password = hashedPassword;
  user.salt = salt;
  await user.save();

  res.send({ result: true, message: "비밀번호가 성공적으로 변경되었습니다." });
};

// 마이페이지 랜더링
exports.mypage = (req, res) => {
  res.render("user/mypage", {
    user: req.session.user,
    isAuthenticated: req.session.isAuthenticated,
  });
};

exports.updateProfile = async (req, res) => {
  const { id, nickname, email, password } = req.body;

  const salt = crypto.randomBytes(16).toString("base64");
  const iterations = 100;
  const keylen = 64;
  const digest = "sha512";
  const hashedPassword = crypto
    .pbkdf2Sync(password, salt, iterations, keylen, digest)
    .toString("base64");

  const user = await User.findOne({ where: { id: id } });

  if (user) {
    user.nickname = nickname;
    user.email = email;
    user.password = hashedPassword;
    user.salt = salt;
    await user.save();

    res.send({ result: true, message: "프로필이 성공적으로 수정되었습니다." });
  } else {
    res.send({ result: false, message: "유저를 찾을 수 없습니다." });
  }
};
exports.deleteAccount = async function (req, res) {
  const { id, password } = req.body;

  const user = await User.findOne({ where: { id: id } });

  const iterations = 100;
  const keylen = 64;
  const digest = "sha512";
  const hashedPassword = crypto
    .pbkdf2Sync(password, user.salt, iterations, keylen, digest)
    .toString("base64");

  if (user.password === hashedPassword) {
    await User.destroy({ where: { id: id } });
    // 세션 삭제
    req.session.destroy((err) => {
      if (err) {
        // 에러 처리
        console.log(err);
        res.send({
          result: false,
          message: "세션 삭제 중 오류가 발생했습니다.",
        });
      } else {
        // 세션 삭제 후 리다이렉트
        res.send({
          result: true,
          message: "계정이 성공적으로 삭제되었습니다.",
        });
      }
    });
  } else {
    res.send({ result: false, message: "비밀번호가 일치하지 않습니다." });
  }
};

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
