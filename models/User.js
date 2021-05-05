const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    trim: true,
    unique: 1,
  },
  password: {
    type: String,
    minlength: 5,
  },
  lastname: {
    type: String,
    maxlength: 50,
  },
  role: {
    type: Number,
    default: 0,
  },
  image: String,
  token: {
    type: String,
  },
  tokenExp: {
    type: Number,
  },
});

userSchema.pre("save", function (next) {
  // 비밀번호를 암호화 시킨다.
  var user = this;
  if (user.isModified("password")) {
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);

      bcrypt.hash(user.password, salt, function (err, hash) {
        // hash = 암호화된 비밀번호
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

userSchema.methods.comparePassword = function (plainPassword, cb) {
  // plainPassword : 12345 <=> 암호화된 비밀번호 $2b$10$Nn/jsuArb0metcENDChseOHKfDd5Pu89FiYN0IJAMWfBKXzWq9cby
  // 입력받은 비밀번호 (plainPassword 12345) 와 암호화된 비밀번호가 일치하는지 확인
  // 암호화된 비밀번호를 복호화 할 수는 없기 때문에 입력받은 plainPassword를 bcrypt로 암호화 시킨 후 compare로 비교
  bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

userSchema.methods.generateToken = function (cb) {
  var user = this;
  // jsonwebtoken을 이용해서 token을 생성하기
  var token = jwt.sign(user._id.toHexString(), "Token");
  // user._id + 'Token' = token
  user.token = token;
  user.save(function (err, user) {
    if (err) return cb(err);
    cb(null, user);
  });
};

userSchema.statics.findByToken = function (token, cb) {
  var user = this;

  user._id;
  // 토큰 decode
  jwt.verify(token, "Token", function (err, decoded) {
    user.findOne(
      {
        _id: decoded,
        token: token,
      },
      function (err, user) {
        if (err) return cb(err);
        cb(null, user);
      }
    );
  });
};

const User = mongoose.model("User", userSchema);

module.exports = { User };
