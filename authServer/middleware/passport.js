const passport = require ('passport');
const LocalStrategy = require('passport-local');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const userController=require('../controller/user.controller');

/*
const localLogin = new LocalStrategy(
    {
        usernameFeild:'email'
        
    },
    async(email, password, done) => {
        const user = await userController.login(email,password);
        return user 
        ? done(null, user)
        : done(null, false, {
            error:'Login Details are not Valid. please try again'
            });
    }
);
*/

const jwtLogin = new JwtStrategy(
    {
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: 'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTYxMDcxMzU4MSwiaWF0IjoxNjEwNzEzNTgxfQ.wKJfIDU_UiLHYyMLW5NoHOpskN3tDsUGBJz6X5LQV3A'
    },
    async ( payload , done) => {
        console.log(payload.id);
        const user = await userController.getUserById(payload.id);
        return user
        ? done(null, user)
        : done(null, false, {
            error:'Login Details are not Valid. please try again'
        });
    }
)


module.exports = passport.use(jwtLogin);