const Student = require('../models/student');
const User = require('../models/user')
const fs = require('fs')
const fastCsv = require('fast-csv')

module.exports.signIn = async function(req,res){
    try{
        if(req.isAuthenticated()) {
            res.redirect('back');
        }
        res.render('signin',{
            title: 'Sign-In'
        })
    }catch(error){
        console.log('error in signIn',error)
    }
}

module.exports.signOut = async function(req,res){
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/users/signin');
        });
    }

module.exports.signUp = async function(req,res){
    try{
        if(req.isAuthenticated()) {
            res.redirect('back');
        }
        res.render('signup',{
            title: 'Sign-Up'
        })
    }catch(error){
        console.log('error in signUp',error)
    }
}

module.exports.createUser = async function(req,res){
    try{
        const {name,password,email,confirmPassword} = req.body
        console.log(req.body)
        if(password != confirmPassword){
            console.log('Passwords not matching')
            return res.redirect('back')
        }
        let user = await User.findOne({ email });
        if(user){
            console.log('User Exists')
            return res.redirect('/users/signin')
        }
        let newUser = await User.create({
            name,
            email,
            password
        })
        await newUser.save()

        console.log(newUser)
        return res.redirect('/users/signin')
    }catch(error){
        console.log('Error in creating user',error)
    }
}

module.exports.createSession = async function(req, res){
    try{ 
        console.log('Session created');
        return res.redirect('/')
    }catch(error){
        console.log('Error in createSession',error)
    }
}

module.exports.downloadCsv = async function(req,res){
    try{
        const students = await Student.find({});

		let data = '';
		let no = 1;
		let csv = 'S.No, Name, Email, College, Placemnt, Contact Number, Batch, DSA Score, WebDev Score, React Score, Interview, Date, Result';

        for(let student of students){
            data= no+','+student.name+','+student.email+','+student.college+','+student.phone+','+student.batch+','+student.webd+','+student.dsa+','+student.react
            if(student.interviews.length>0){
                for(let details of student.interviews){
                    data+=details.company+','+details.date+','+details.result
                }
            }
            no++
            csv+='\n'+data
        }

        let csvFile = fs.writeFile('reports/data.csv',csv,function(error){
            if(error){
                console.log('error in writing csv file',error)
                return res.redirect('/')
            }else{
                console.log('Report generated')
                return res.download('reports/data.csv')
            }
        })

    }catch(error){
        console.log('Error in createSession',error)
        return res.redirect('/')
    }
}
