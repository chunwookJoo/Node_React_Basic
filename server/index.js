const express = require("express");
const app = express();

const { User } = require("./models/User");
const { auth } = require("./middleware/auth");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const config = require("./config/key");

// 데이터 분석하는 친구
app.use(bodyParser.urlencoded({ extended: true }));

// json타입으로 된 데이터 분석하는 친구
app.use(bodyParser.json());
app.use(cookieParser());

const mongoose = require("mongoose");
mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Connected..."))
  .catch((err) => console.log(err));

app.get("/", (req, res) => res.send("hello worrrld kkk"));

app.get("/api/hello", (req, res) => {
  res.send("안녕하십니까");
});

// ** 회원가입을 위한 route **
app.post("/api/users/register", (req, res) => {
  // 회원 가입 할 떄 필요한 정보들을 client에서 가져오면
  // 그것들을 데이터 베이스에 넣어준다.

  const user = new User(req.body);

  // 비밀번호 암호화

  // mongodb에서 오는 메소드
  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
});

// ** 로그인을 위한 route **
app.post("/api/users/login", (req, res) => {
  // 요청된 이메일이 데이터베이스에 있는지 확인
  User.findOne({ email: req.body.email }, (err, user) => {
    // 들어온 이메일이 데이터베이스에 하나도 없다면
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "이메일에 해당하는 유저가 없습니다.",
      });
    }
    // 이메일이 데이터베이스에 있다면 비밀번호가 맞는지 확인
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        // 비밀번호가 같지 않다면
        return res.json({
          loginSuccess: false,
          message: "비밀번호가 틀렸습니다.",
        });

      // 비밀번호가 맞다면 그에 맞는 token 생성
      user.generateToken((err, user) => {
        // 에러가 있다면 에러 송출
        if (err) return res.status(400).send(err);

        // 에러가 없다면 토큰을 저장한다. 어디에?? 쿠키, 로컬스토리지
        res
          .cookie("x_auth", user.token)
          .status(200)
          .json({ loginSuccess: true, userId: user._id });
      });
    });
  });
});

// role 1 어드민
// role 0 일반 유저
app.get("/api/users/auth", auth, (req, res) => {
  // 여기까지 왔다면 Auth이 True 라는 말
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image,
  });
});

app.get("/api/users/logout", auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, user) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).send({
      success: true,
    });
  });
});

const port = 5000;
app.listen(port, () => console.log(port));
