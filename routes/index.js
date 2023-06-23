const express = require('express');
const router = express.Router()
const passport = require('passport');
const homeController = require('../controllers/HomeController')
const studentController = require('../controllers/StudentController')


router.get('/',passport.checkAuthentication,homeController.Home)
router.use('/users',require('./user'))
router.use('/students',require('./student'))
router.use('/interviews',require('./interview'))


module.exports = router