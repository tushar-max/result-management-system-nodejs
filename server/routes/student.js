const express = require('express');
const router = express.Router();
const resultController = require('../controllers/resultController');
const studentTeacherController = require('../controllers/studentTeacherController');

router.get('/resultdb', resultController.resultdb);

router.get('/' , resultController.homepage);

// router.get('/teacher', resultController.teacherLogin);

router.get('/add', resultController.addStudent);
router.post('/add', resultController.postStudent);

router.get('/view/:id', resultController.view);

router.get('/edit/:id', resultController.edit);
router.put('/edit/:id', resultController.editPost);
router.delete('/edit/:id', resultController.deleteStudent);




router.get('/student', studentTeacherController.studentLogin);
router.post('/viewResult',studentTeacherController.viewResult);

router.get('/logout', studentTeacherController.logout);

router.get('/teacher', studentTeacherController.teacherLogin);
router.post('/login', studentTeacherController.login);

module.exports=router;