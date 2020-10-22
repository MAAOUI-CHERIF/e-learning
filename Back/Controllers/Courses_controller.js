const CourseModel = require('../Sources/Models/BlogCoursesModels');

module.exports= {
        getAllCourses(req,res){
            CourseModel.find().then((courses)=>{
                res.send(courses)
            })
        },
        getCourses(req,res){
            const type = req.params.courseType;
            CourseModel.find({type:type}).then((typeCourses)=>{
                res.send(typeCourses)
            })
        }
}