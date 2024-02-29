const {Router} = require('express')
const redis = require('redis');
const router = new Router()

const studentController = require('./controller.js')



router.get('/',(req,res)=>{
    studentController.getStudents(res,req);
  } )



 router.get('/:id',(req,res)=>{
    studentController.getStudentById(res,req);
  } )

    router.post('/',(req,res)=>{
    studentController.addsStudent(res,req);
    }
    )

    router.put('/:id',(req,res)=>{
    studentController.updateStudent(res,req);
    }
    )

    router.delete('/:id',(req,res)=>{
    studentController.deleteStudent(res,req);
    })

module.exports = router;