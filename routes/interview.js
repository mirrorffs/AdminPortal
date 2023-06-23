const express = require('express');
const router = express.Router()
const passport = require('passport');
const interviewController = require('../controllers/InterviewController')

//GET
router.get('/upcoming',passport.checkAuthentication,interviewController.interviewsPage)
router.get('/create',passport.checkAuthentication,interviewController.addInterview)


//POST
router.post('/create-interview',passport.checkAuthentication,interviewController.createInterview)
router.post('/update-status/:id',passport.checkAuthentication,interviewController.resultStatus)

module.exports = router