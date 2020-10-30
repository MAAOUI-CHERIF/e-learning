const CourseModel = require('../Sources/Models/BlogCoursesModels');
const UserModel = require("../Sources/Models/UsersModels")

module.exports = {
    getAllCourses(req, res) {
        CourseModel.find().then((courses) => {
            res.send(courses)
        })
    },
    getCoursesByType(req, res) {
        const type = req.params.courseType;
        CourseModel.find({ type: type }).then((typeCourses) => {
            res.send(typeCourses)
        })
    },
    getUserCourses(req, res) {
        UserModel.findOne({ mail: req.user.mail }).then((user) => {
            CourseModel.find({ _id: { $in: user.blogCourses } }).then((courses) => {
                res.send(courses)
            })
        })
    },
    deleteUserCourse(req, res) {
        const courseID = req.params.id;
        UserModel.updateOne({ mail: req.user.mail }, { $pull: { blogCourses: courseID } }).then()
        res.send('Cours supprimé pour cet utilisateur')
    },
    addCourse(req,res){
        if(req.body.name !== '' && req.body.difficulty !== '' && req.body.type !== '')
        {
            const newCourse = new CourseModel({
                name: req.body.name,
                difficulty : req.body.difficulty,
                summary:req.body.summary,
                description: req.body.description,
                content: req.body.content,
                type: req.body.type
            })
            newCourse.save((err,course)=>{
                if(err){
                    res.sendStatus(400)
                }else{
                    res.sendStatus(201)
                }
            })
        }
    },
    addUserCourse(req, res) {
        const courseID = req.params.id;
        if (req.body.blogCourses !== "" && req.body.blogCourses !== null) {
            UserModel.findOne({ mail: req.user.mail }).then((user) => {
                if(!user.blogCourses.includes(courseID)){
                    user.blogCourses.push(courseID);
                    user.save();
                    res.sendStatus(201)
                }else{
                    res.sendStatus(406)
                }
        })
    }else{
        res.send("Pas de cours à ajouter")
    }
}
}

