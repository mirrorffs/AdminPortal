const express = require('express')
const expressEjsLayouts = require('express-ejs-layouts')
const db = require('./configs/mongoose')
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('passport');
const passportLocal = require('./configs/passport_local_strategy');
const app = express()
const port = 8000

app.use(session({
    name: 'PlacementCell',
    secret: 'cell',
    resave: false,
    saveUninitialized: false,
	cookie:{
        maxAge: (600*10000)
    },
    store: MongoStore.create({
        mongoUrl:'mongodb+srv://mirror:1234@cluster0.vpn52ur.mongodb.net/',
        autoRemove: 'disabled'
    })
}))

//EJS Setups
app.use(express.urlencoded({ extended: true }));
app.use(expressEjsLayouts)
app.set('view engine', 'ejs')
app.set('views', './views')
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

//Passport Auth Setup
app.use(passport.initialize())
app.use(passport.session())
app.use(passport.setAuthenticatedUser)

//Server Setups
app.use('/',require('./routes'))
app.listen(port,function(error){
    if(error){
        console.log('Error in server',error)
    }
    console.log('Server is running '+port)
})