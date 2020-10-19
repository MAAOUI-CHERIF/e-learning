const mongoose= require('mongoose')
const assert = require('assert')
const UserModel = require('../Sources/Models/UsersModels')
const BlogCoursesModel = require('../Sources/Models/BlogCoursesModels')
const CommentModel = require('../Sources/Models/CommentModels')


describe('Test de références', ()=>{

    beforeEach((done)=>{
        const firstUser = new UserModel({
            name: "oinoi",
            firstname: 'oijoijoij',
            mail:'jfjfjeijfiejfoijj@jfjfh.fr',
            age: 18
        })
        const blogCourse = new BlogCoursesModel({
            name: 'Le Django Argentin',
            summary : 'On apprend à danser et à coder'
        })
        const comment = new CommentModel({
            content : 'Olé!'
        })
        firstUser.blogCourses.push(blogCourse);
        blogCourse.comments.push(comment);
        comment.user = firstUser;
        Promise.all([firstUser.save(),blogCourse.save(),comment.save()]).then(()=>{
            done();
        })
    })

     it("Test le nom du cours d'un utilisateur",(done)=>{
         UserModel.findOne({name: "oinoi"}).populate('blogCourses').then((userFound)=>{
            assert(userFound.blogCourses[0].name === 'Le Django Argentin');
            done();
         })
     })
     it("Test commentaire d'un utilisateur", (done)=>{
        UserModel.findOne({name: "oinoi"}).populate({
            path:"blogCourses",
            populate:{
                path:'comments',
                model:'Comment'
            }
        }).then((userFound)=>{
            assert(userFound.blogCourses[0].comments[0].content === 'Olé!');
            done();
        })
     })
})