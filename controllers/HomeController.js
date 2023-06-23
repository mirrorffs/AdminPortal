const Student = require("../models/student")


module.exports.Home = async function(req, res){
    try{
        studentList = await Student.find({})
        res.render('home_page',{
            title: 'Dashboard',
            student_list: studentList
        })
    }catch(error){
        console.log(error)
    }
}