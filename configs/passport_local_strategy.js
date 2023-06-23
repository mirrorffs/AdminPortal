const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')

passport.use(new LocalStrategy({
    usernameField: 'email'
},function(email,password,done){
    User.findOne({email}).then((user)=>{
        if(!user || !user.isPasswordCorrect(password)){
            return done(null,false)
        }
        else{
            return done(null,user)
        }
    }).catch(error=>{
        console.log('Error in LocalStrategy',error)
        return done(error)
    })
}))

passport.serializeUser(function(user,done){
    return done(null,user.id)
})

passport.deserializeUser(function(id,done){
    User.findById(id).then((user)=>{
        return done(null, user)
    }).catch(error=>{
        return done(error)
    })
})

passport.checkAuthentication = function(req,res,next){
    if(req.isAuthenticated()){
        return next()
    }else{
        return res.redirect('/users/signin')
    }
   
}

passport.setAuthenticatedUser = function (req, res, next) {
    if(req.isAuthenticated()){
        
      res.locals.user = req.user;
    }
    return next()
}

module.exports = passport