const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { json } = require('body-parser');
const saltRounds = 10; //saltRounds란 salt가 몇글자인지를 나타냄. 10자리인 salt를 만들어 이 salt를 이용해 비밀번호를 암호화한다.
                       //salt를 먼저 생성 -> salt를 이용해서 비밀번호를 암호화해야됨
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        minlength: 5
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: {
        type: Number,
        default: 0
    },
    image: String,
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }
})

userSchema.pre('save', function(next){
    var user = this;

    if(user.isModified('password')){//password 변했을 때만 비밀번호 암호화를 해준다.
        //비밀번호를 암호화 시킨다.
        bcrypt.genSalt(saltRounds, function (err, salt){
            if(err) return next(err) //에러가 발생하면 index.js 파일의 user.save 콜백함수 수행

            bcrypt.hash(user.password, salt, function(err, hash){ //hash: 암호화 된 비밀번호
                if(err) return next(err)
                user.password = hash
                next()
            }) //user.password는 plainPassword
        })
    }else{
        next()
    }
})

userSchema.methods.comparePassword = function(plainPassword, cb){
    //plainPassword 1234567     암호화된 비밀번호 $2b$10$5xoIpkOdGa8Zg7NuvYuly.AEesQPOXb567wTxk5YkSIjlIVO8T0ne
    bcrypt.compare(plainPassword, this.password, function(err, isMatch){
        if(err) return cb(err)
        cb(null, isMatch)
    })
}

userSchema.methods.generateToken = function(cb){//index.js 파일의 generateToken에 파라미터가 callBack Function 하나만 들어있으므로 맞춰줌
    var user= this;
    
    //jsonwebtoken을 이용하여 token을 생성하기
    var token = jwt.sign(user._id.toHexString(), 'secretToken')
    //user._id + 'secretToken' = token
    // ->
    // 'secretToken' -> user._id

    user.token = token;
    user.save(function(err, user){
        if(err) return cb(err)
        cb(null, user)
    })
}

userSchema.statics.findByToken = function( token, cb) {
    var user = this;

    //토큰을 decode 한다.
    jwt.verify(token, 'secretToken', function(err, decoded){
        //유저 ID를 이용해서 유저를 찾음 -> 클라이언트에서 가져온 token이랑 DB에 보관된 토큰이 일치하는지 확인
        user.findOne({"_id": decoded, "token": token}, function(err, user){
            if(err) return cb(err);
            cb(null, user) //에러가 없다면 유저 정보를 전달해준다.
        })
    })
}

const User = mongoose.model('User',userSchema)

module.exports = { User }