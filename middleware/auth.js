const { User } = require("../models/User");


let auth = (req, res, next) => {
    //인증 처리를 하는 곳

    // Client 쿠키에서 토큰을 가져옴
    let token = req.cookies.x_auth;

    // 토큰을 복호화 한 후 유저를 찾는다.
    User.findByToken(token, (err, user) => {
        if(err) throw err; 
        if(!user) return res.json({ isAuth: false, error: true }) // 유저가 없으면 인증 No !

        // 유저가 있으면 인증 Okay
        req.token = token; //req.token에 넣어주면 index.js의 콜백부분에서 사용할 수 있음
        req.user = user;
        next(); //next 하는 이유: index.js의 api/users/auth부분에 middle ware인 auth에서 콜백펑션으로 갈 수 있게 next()를 해줘야함
                //안해주면 콜백펑션으로 안넘어가고 auth에서 갇혀있게됨
    })    
}

module.expoert( auth );