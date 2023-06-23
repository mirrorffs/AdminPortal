const Interview = require("../models/interview")
const Student = require("../models/student")


module.exports.addStudent = async function(req,res){
    try{
        return res.render('add_student',{
            title:'Add Student'
        })
    }catch(error){
        console.log('error in createStudent', error)
    }
}

module.exports.createStudent = async function(req,res){
    try{
        const{name,email,dsa,batch,college,placement,phone,webd,react} = req.body
        let student = await Student.findOne({email})
        if(student){
            console.log('Student exists')
            return res.redirect('back')
        }
        let newStudent = await Student.create({
            name,
            email,
            placement,
            college,
            dsa,
            batch,
            phone,
            webd,
            react
        })
        await newStudent.save()
        console.log(newStudent)

        return res.redirect('/')
    }catch(error){
        console.log('error in createStudent', error)
        return res.redirect('/')
    }
}

module.exports.deleteStudent = async function(req,res){
    try{
        let id=req.params.id
        console.log(req.params.id)
        let student = await Student.findById(id)

        if(student && student.interviews.length>0){
            for(let interview of student.interviews){
                let company = await Interview.findOne({company: interview.company})
                if(company){
                    for(let i=0;i<company.students.length;i++){
                        company.students.splice(i,1)
                        await company.save()
                        break
                    }
                }
            }
        }
        await Student.findByIdAndDelete(student._id)
        res.redirect('back')
    }catch(error){
        console.log('error in deleteStudent', error)
        res.redirect('back')
    }
}