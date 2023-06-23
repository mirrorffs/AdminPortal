const express = require('express');
const router = express.Router()
const passport = require('passport');
const studentController = require('../controllers/StudentController')

//GET
router.get('/create',passport.checkAuthentication,studentController.addStudent)
router.get('/delete/:id',passport.checkAuthentication,studentController.deleteStudent)

//POST
router.post('/create-student',passport.checkAuthentication,studentController.createStudent)


module.exports = router