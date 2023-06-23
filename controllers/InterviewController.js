const Interview = require("../models/interview")
const Student = require("../models/student")


module.exports.interviewsPage = async function(req,res){
    try{
        let students = await Student.find({})
        let interview = await Interview.find({}).populate({
            path: 'students',
            populate:{
                path: 'student'
            }
        })
        //let list=[]
        // for(let student of students){
        //     list.push(student.batch)
        // }
        // batchList = [...new Set(list)];
        return res.render('interview_page',{
            title:'Add Interview',
            interview_list: interview,
            student_list: students
            // batchList
        })
    }catch(error){
        console.log('error in addInterview', error)
        return res.redirect('/')
    }
}

module.exports.addInterview = async function(req,res){
    try{
        let students = await Student.find({})
        //let list=[]
        // for(let student of students){
        //     list.push(student.batch)
        // }
        // batchList = [...new Set(list)];
        return res.render('add_interview',{
            title:'Add Interview',
            studentList: students
            // batchList
        })
    }catch(error){
        console.log('error in addInterview', error)
        return res.redirect('/')
    }
}

module.exports.createInterview = async function(req,res){
    try{
        const{company,date,id} = req.body
        let interview = await Interview.findOne({company})
        let studentObj = {
            student: id,
            date,
            result: 'Pending',
          }
        if(!interview){
            let newInterview = await Interview.create({
                company
            })
            newInterview.students.push(studentObj)
            await newInterview.save()
        }else{
            for(let student of interview.students){
                if(student._id == id){
                    console.log('Interview already scheduled')
                    return res.redirect('back')
                }
            }
        interview.students.push(studentObj);
        await interview.save()
        }
        
        let student = await Student.findById(id);
        if (student) {
            let interviewObj = {
              company,
              date,
              result: 'Pending'
            }
            student.interviews.push(interviewObj)
            await student.save()
            console.log('Interview scheduled')
            return res.redirect('back')
          }
    }catch(error){
        console.log('error in createStudent', error)
        return res.redirect('/')
    }
}

module.exports.resultStatus = async function(req,res){
    try{
        let id = req.params.id
        let result = req.body.result
        let company = req.body.company

        let student = await Student.findById(id);
        selectedCompany = await Interview.findOne({company})

        if(student && student.interviews.length>0){
            for(let interview of student.interviews){
                if(interview.company == company){
                    interview.result = result
                    await student.save()
                    break
                }
                
            }
            if(selectedCompany && selectedCompany.students.length>0){
                for(selectedStudent of selectedCompany.students){
                    if(selectedStudent.student.toString() == student._id){
                        selectedStudent.result = result
                        await selectedCompany.save()
                        break;
                    }
                }
            }

            console.log('Student status changed')
            return res.redirect('back')
        }
    }catch(error){
        console.log('error in updateStatus', error)
        return res.redirect('/')
    }
}