const express = require('express');
const router = express.Router()
const passport = require('passport');
const session = require('express-session')
const userController = require('../controllers/UserController')

//GET
router.get('/signin',userController.signIn)
router.get('/signup',userController.signUp)
router.get('/download-csv',userController.downloadCsv)


//POST
router.post('/create',userController.createUser)
router.post('/create-session',passport.authenticate('local', { failureRedirect: '/users/signin' }),userController.createSession)
router.post('/signout',userController.signOut)

module.exports = router